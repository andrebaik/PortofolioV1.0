import { GoogleGenerativeAI } from '@google/generative-ai'
import type { GenerateContentStreamResult } from '@google/generative-ai'
import react from '@vitejs/plugin-react'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { buildChatSystemPrompt } from './src/lib/chat-knowledge.ts'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatRequestBody {
  messages?: ChatMessage[]
}

const OPENROUTER_MODELS = [
  "openrouter/free",
];

const GEMINI_FALLBACK_MODELS = [
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'gemini-1.5-pro',
]

async function* parseOpenRouterStream(
  stream: ReadableStream<Uint8Array>
): AsyncGenerator<string, void, unknown> {
  const reader = stream.getReader()
  const decoder = new TextDecoder('utf-8')
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed || !trimmed.startsWith('data: ')) continue

        const dataStr = trimmed.slice(6).trim()
        if (dataStr === '[DONE]') {
          return
        }

        try {
          const json = JSON.parse(dataStr)
          const content = json.choices?.[0]?.delta?.content
          if (content) {
            yield content
          }
        } catch {
          // Ignore JSON parse errors for malformed SSE lines
        }
      }
    }

    if (buffer.trim()) {
      const trimmed = buffer.trim()
      if (trimmed.startsWith('data: ')) {
        const dataStr = trimmed.slice(6).trim()
        if (dataStr !== '[DONE]') {
          try {
            const json = JSON.parse(dataStr)
            const content = json.choices?.[0]?.delta?.content
            if (content) {
              yield content
            }
          } catch {
            // Ignore
          }
        }
      }
    }
  } finally {
    reader.releaseLock()
  }
}

async function handleOpenRouterStream(
  res: ServerResponse,
  openrouterKey: string,
  formattedMessages: ChatMessage[]
): Promise<void> {
  const systemPrompt = buildChatSystemPrompt()
  let lastError: string | null = null

  for (const modelName of OPENROUTER_MODELS) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${openrouterKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://github.com/andrebaik/portfolv2',
          'X-Title': 'Mochamad Vicryandre Portfolio',
        },
        body: JSON.stringify({
          model: modelName,
          messages: [
            { role: 'system', content: systemPrompt },
            ...formattedMessages,
          ],
          stream: true,
        }),
      })

      if (!response.ok) {
        const errText = await response.text()
        console.warn(`[Vite Dev] OpenRouter model ${modelName} returned HTTP ${response.status}:`, errText)
        lastError = `Model ${modelName}: HTTP ${response.status} - ${errText}`
        continue
      }

      if (!response.body) {
        console.warn(`[Vite Dev] OpenRouter model ${modelName} returned empty body`)
        lastError = `Model ${modelName} returned empty body`
        continue
      }

      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.setHeader('Cache-Control', 'no-cache')

      try {
        for await (const chunk of parseOpenRouterStream(response.body)) {
          if (chunk) {
            res.write(chunk)
          }
        }
        res.end()
        return
      } catch (streamErr) {
        console.error('[Vite Dev] OpenRouter streaming error:', streamErr)
        if (!res.headersSent) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify({ error: 'Terjadi kesalahan saat streaming respons.' }))
        } else {
          res.end()
        }
        return
      }
    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err)
      console.warn(`[Vite Dev] OpenRouter model ${modelName} request failed:`, err)
    }
  }

  res.statusCode = 502
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(
    JSON.stringify({
      error: `Semua model OpenRouter gagal merespons. ${lastError || ''}`.trim(),
    })
  )
}

async function handleGeminiStream(
  res: ServerResponse,
  geminiKey: string,
  recentMessages: ChatMessage[]
): Promise<void> {
  const lastMsg = recentMessages[recentMessages.length - 1]
  const currentPrompt = lastMsg.content
  const historyCandidate = recentMessages.slice(0, recentMessages.length - 1)

  interface HistoryItem {
    role: 'user' | 'model'
    parts: [{ text: string }]
  }

  const formattedHistory: HistoryItem[] = []
  const firstUserIdx = historyCandidate.findIndex((m) => m.role === 'user')
  if (firstUserIdx !== -1) {
    for (let i = firstUserIdx; i < historyCandidate.length; i++) {
      const msg = historyCandidate[i]
      const mappedRole: 'user' | 'model' =
        msg.role === 'assistant' ? 'model' : 'user'

      if (
        formattedHistory.length === 0 ||
        formattedHistory[formattedHistory.length - 1].role !== mappedRole
      ) {
        formattedHistory.push({
          role: mappedRole,
          parts: [{ text: msg.content }],
        })
      }
    }
  }

  if (
    formattedHistory.length > 0 &&
    formattedHistory[formattedHistory.length - 1].role === 'user'
  ) {
    formattedHistory.pop()
  }

  const systemInstruction = buildChatSystemPrompt()
  const genAI = new GoogleGenerativeAI(geminiKey)

  let streamResult: GenerateContentStreamResult | null = null
  let lastError: unknown = null

  for (const modelName of GEMINI_FALLBACK_MODELS) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction,
      })

      const chat = model.startChat({
        history: formattedHistory,
      })

      streamResult = await chat.sendMessageStream(currentPrompt)
      break
    } catch (err) {
      lastError = err
      console.warn(`[Vite Dev] Model ${modelName} failed, falling back to next...`, err)
    }
  }

  if (!streamResult) {
    const errorDetails =
      lastError instanceof Error ? lastError.message : 'Gagal memproses AI.'
    res.statusCode = 502
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(
      JSON.stringify({
        error: `Semua model AI gagal merespons. ${errorDetails}`,
      })
    )
    return
  }

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.setHeader('Cache-Control', 'no-cache')

  try {
    for await (const chunk of streamResult.stream) {
      const text = chunk.text()
      if (text) {
        res.write(text)
      }
    }
    res.end()
  } catch (streamErr) {
    console.error('[Vite Dev] Streaming error:', streamErr)
    if (!res.headersSent) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json; charset=utf-8')
      res.end(JSON.stringify({ error: 'Terjadi kesalahan saat streaming respons.' }))
    } else {
      res.end()
    }
  }
}

function chatAssistantPlugin(openrouterApiKey?: string, geminiApiKey?: string): Plugin {
  return {
    name: 'chat-assistant-plugin',
    configureServer(server) {
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next) => {
        const url = req.url ? req.url.split('?')[0] : ''
        if (url !== '/api/chat') {
          return next()
        }

        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(JSON.stringify({ error: 'Method not allowed. Only POST is supported.' }))
          return
        }

        if (!openrouterApiKey && !geminiApiKey) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(
            JSON.stringify({
              error:
                'Chat assistant belum dikonfigurasi. Pastikan OPENROUTER_API_KEY atau GEMINI_API_KEY sudah diset di file .env.',
            })
          )
          return
        }

        let bodyText = ''
        req.on('data', (chunk) => {
          bodyText += chunk
        })

        req.on('end', async () => {
          let body: ChatRequestBody
          try {
            body = JSON.parse(bodyText) as ChatRequestBody
          } catch {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify({ error: 'Invalid JSON request body.' }))
            return
          }

          const rawMessages = body.messages
          if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(
              JSON.stringify({
                error: "Body harus menyertakan array 'messages' yang tidak kosong.",
              })
            )
            return
          }

          const validMessages = rawMessages.filter(
            (m) =>
              m &&
              (m.role === 'user' || m.role === 'assistant') &&
              typeof m.content === 'string' &&
              m.content.trim().length > 0
          )

          if (validMessages.length === 0) {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify({ error: 'Pesan tidak valid atau kosong.' }))
            return
          }

          const recentMessages = validMessages.slice(-12)
          const lastMsg = recentMessages[recentMessages.length - 1]
          if (lastMsg.role !== 'user') {
            res.statusCode = 400
            res.setHeader('Content-Type', 'application/json; charset=utf-8')
            res.end(JSON.stringify({ error: "Pesan terakhir harus berasal dari role 'user'." }))
            return
          }

          if (openrouterApiKey) {
            await handleOpenRouterStream(res, openrouterApiKey, recentMessages)
            return
          }

          await handleGeminiStream(res, geminiApiKey!, recentMessages)
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const openrouterApiKey = env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY
  const geminiApiKey = env.GEMINI_API_KEY || process.env.GEMINI_API_KEY

  return {
    plugins: [react(), chatAssistantPlugin(openrouterApiKey, geminiApiKey)],
  }
})
