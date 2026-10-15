import type { GenerateContentStreamResult } from "@google/generative-ai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { buildChatSystemPrompt } from "../src/lib/chat-knowledge";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequestBody {
  messages?: ChatMessage[];
}

const OPENROUTER_MODELS = [
  "openrouter/free",
];

const GEMINI_FALLBACK_MODELS = [
  "gemini-2.0-flash",
  "gemini-1.5-flash",
];

export const config = {
  runtime: "edge",
};

async function* parseOpenRouterStream(
  stream: ReadableStream<Uint8Array>
): AsyncGenerator<string, void, unknown> {
  const reader = stream.getReader();
  const decoder = new TextDecoder("utf-8");
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith("data: ")) continue;

        const dataStr = trimmed.slice(6).trim();
        if (dataStr === "[DONE]") {
          return;
        }

        try {
          const json = JSON.parse(dataStr);
          const content = json.choices?.[0]?.delta?.content;
          if (content) {
            yield content;
          }
        } catch {
          // Ignore JSON parse errors for malformed SSE lines
        }
      }
    }

    if (buffer.trim()) {
      const trimmed = buffer.trim();
      if (trimmed.startsWith("data: ")) {
        const dataStr = trimmed.slice(6).trim();
        if (dataStr !== "[DONE]") {
          try {
            const json = JSON.parse(dataStr);
            const content = json.choices?.[0]?.delta?.content;
            if (content) {
              yield content;
            }
          } catch {
            // Ignore
          }
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

async function streamOpenRouter(
  openrouterKey: string,
  formattedMessages: ChatMessage[]
): Promise<Response> {
  const systemPrompt = buildChatSystemPrompt();
  let lastError: string | null = null;

  for (const modelName of OPENROUTER_MODELS) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${openrouterKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://github.com/andrebaik/portfolv2",
          "X-Title": "Mochamad Vicryandre Portfolio",
        },
        body: JSON.stringify({
          model: modelName,
          messages: [
            { role: "system", content: systemPrompt },
            ...formattedMessages,
          ],
          stream: true,
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.warn(`OpenRouter model ${modelName} returned status ${response.status}:`, errText);
        lastError = `Model ${modelName}: HTTP ${response.status} - ${errText}`;
        continue;
      }

      if (!response.body) {
        console.warn(`OpenRouter model ${modelName} returned empty body`);
        lastError = `Model ${modelName} returned empty body`;
        continue;
      }

      const openRouterStream = response.body;
      const encoder = new TextEncoder();
      const stream = new ReadableStream<Uint8Array>({
        async start(controller) {
          try {
            for await (const chunk of parseOpenRouterStream(openRouterStream)) {
              if (chunk) {
                controller.enqueue(encoder.encode(chunk));
              }
            }
            controller.close();
          } catch (streamErr) {
            controller.error(streamErr);
          }
        },
      });

      return new Response(stream, {
        status: 200,
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "Cache-Control": "no-cache, no-transform",
          "Transfer-Encoding": "chunked",
        },
      });
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
      console.warn(`OpenRouter model ${modelName} request failed:`, err);
    }
  }

  return new Response(
    JSON.stringify({
      error: `Semua model OpenRouter gagal merespons. ${lastError || ""}`.trim(),
    }),
    {
      status: 502,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
}

async function streamGemini(
  geminiKey: string,
  recentMessages: ChatMessage[]
): Promise<Response> {
  const lastMsg = recentMessages[recentMessages.length - 1];
  const currentPrompt = lastMsg.content;
  const historyCandidate = recentMessages.slice(0, recentMessages.length - 1);

  interface HistoryItem {
    role: "user" | "model";
    parts: [{ text: string }];
  }

  const formattedHistory: HistoryItem[] = [];

  const firstUserIdx = historyCandidate.findIndex((m) => m.role === "user");
  if (firstUserIdx !== -1) {
    for (let i = firstUserIdx; i < historyCandidate.length; i++) {
      const msg = historyCandidate[i];
      const mappedRole: "user" | "model" =
        msg.role === "assistant" ? "model" : "user";

      if (
        formattedHistory.length === 0 ||
        formattedHistory[formattedHistory.length - 1].role !== mappedRole
      ) {
        formattedHistory.push({
          role: mappedRole,
          parts: [{ text: msg.content }],
        });
      }
    }
  }

  if (
    formattedHistory.length > 0 &&
    formattedHistory[formattedHistory.length - 1].role === "user"
  ) {
    formattedHistory.pop();
  }

  const systemInstruction = buildChatSystemPrompt();
  const genAI = new GoogleGenerativeAI(geminiKey);

  let streamResult: GenerateContentStreamResult | null = null;
  let lastError: unknown = null;

  for (const modelName of GEMINI_FALLBACK_MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction,
      });

      const chat = model.startChat({
        history: formattedHistory,
      });

      streamResult = await chat.sendMessageStream(currentPrompt);
      break;
    } catch (err) {
      lastError = err;
      console.warn(`Gemini model ${modelName} failed, falling back to next model...`, err);
    }
  }

  if (!streamResult) {
    const errorDetails =
      lastError instanceof Error ? lastError.message : "Gagal memproses AI.";
    return new Response(
      JSON.stringify({
        error: `Semua model AI gagal merespons. ${errorDetails}`,
      }),
      {
        status: 502,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      }
    );
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of streamResult.stream) {
          const chunkText = chunk.text();
          if (chunkText) {
            controller.enqueue(encoder.encode(chunkText));
          }
        }
        controller.close();
      } catch (streamErr) {
        controller.error(streamErr);
      }
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "Transfer-Encoding": "chunked",
    },
  });
}

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response(
      JSON.stringify({ error: "Method not allowed. Only POST is supported." }),
      {
        status: 405,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      }
    );
  }

  const openrouterKey = process.env.OPENROUTER_API_KEY;
  const geminiKey = process.env.GEMINI_API_KEY;

  if (!openrouterKey && !geminiKey) {
    return new Response(
      JSON.stringify({
        error:
          "Chat assistant belum dikonfigurasi. Pastikan OPENROUTER_API_KEY atau GEMINI_API_KEY sudah diset di file .env.",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      }
    );
  }

  let body: ChatRequestBody;
  try {
    body = (await req.json()) as ChatRequestBody;
  } catch {
    return new Response(
      JSON.stringify({ error: "Invalid JSON request body." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      }
    );
  }

  const rawMessages = body.messages;
  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return new Response(
      JSON.stringify({
        error: "Body harus menyertakan array 'messages' yang tidak kosong.",
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      }
    );
  }

  // Validate message objects and roles
  const validMessages = rawMessages.filter(
    (m) =>
      m &&
      (m.role === "user" || m.role === "assistant") &&
      typeof m.content === "string" &&
      m.content.trim().length > 0
  );

  if (validMessages.length === 0) {
    return new Response(
      JSON.stringify({ error: "Pesan tidak valid atau kosong." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      }
    );
  }

  // Cap at the last 12 messages
  const recentMessages = validMessages.slice(-12);

  // The last message is the current prompt
  const lastMsg = recentMessages[recentMessages.length - 1];
  if (lastMsg.role !== "user") {
    return new Response(
      JSON.stringify({ error: "Pesan terakhir harus berasal dari role 'user'." }),
      {
        status: 400,
        headers: { "Content-Type": "application/json; charset=utf-8" },
      }
    );
  }

  if (openrouterKey) {
    return streamOpenRouter(openrouterKey, recentMessages);
  }

  return streamGemini(geminiKey!, recentMessages);
}
