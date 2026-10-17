import { buildChatSystemPrompt } from "../src/lib/chat-knowledge";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatRequestBody {
  messages?: ChatMessage[];
}

const GROQ_MODELS = [
  "openai/gpt-oss-120b",
  "qwen/qwen3.8-27b",
  "openai/gpt-oss-20b",
];

const OPENROUTER_MODELS = [
  "openrouter/free",
];

export const config = {
  runtime: "edge",
};

async function* parseSseStream(
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

async function streamLlm(
  endpoint: string,
  apiKey: string,
  models: string[],
  formattedMessages: ChatMessage[],
  extraHeaders: Record<string, string> = {}
): Promise<Response | null> {
  const systemPrompt = buildChatSystemPrompt();

  for (const modelName of models) {
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          ...extraHeaders,
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

      if (!response.ok || !response.body) {
        const errText = await response.text();
        console.warn(`[AI] Model ${modelName} returned status ${response.status}:`, errText);
        continue;
      }

      const streamBody = response.body;
      const encoder = new TextEncoder();
      const stream = new ReadableStream<Uint8Array>({
        async start(controller) {
          try {
            for await (const chunk of parseSseStream(streamBody)) {
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
      console.warn(`[AI] Model ${modelName} request failed:`, err);
    }
  }

  return null;
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

  const groqKey = process.env.GROQ_API_KEY;
  const openrouterKey = process.env.OPENROUTER_API_KEY;

  if (!groqKey && !openrouterKey) {
    return new Response(
      JSON.stringify({
        error:
          "Chat assistant belum dikonfigurasi. Pastikan GROQ_API_KEY atau OPENROUTER_API_KEY sudah diset di file .env.",
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

  const recentMessages = validMessages.slice(-12);

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

  // 1. Try Groq first for ultra-fast response
  if (groqKey) {
    const groqRes = await streamLlm(
      "https://api.groq.com/openai/v1/chat/completions",
      groqKey,
      GROQ_MODELS,
      recentMessages
    );
    if (groqRes) return groqRes;
  }

  // 2. Fallback to OpenRouter
  if (openrouterKey) {
    const openrouterRes = await streamLlm(
      "https://openrouter.ai/api/v1/chat/completions",
      openrouterKey,
      OPENROUTER_MODELS,
      recentMessages,
      {
        "HTTP-Referer": "https://github.com/andrebaik/portfolv2",
        "X-Title": "Mochamad Vicryandre Portfolio",
      }
    );
    if (openrouterRes) return openrouterRes;
  }

  return new Response(
    JSON.stringify({
      error: "Semua model AI (Groq & OpenRouter) gagal merespons. Silakan coba sesaat lagi.",
    }),
    {
      status: 502,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    }
  );
}
