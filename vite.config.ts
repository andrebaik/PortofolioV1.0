import react from '@vitejs/plugin-react'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import { buildChatSystemPrompt } from './src/lib/chat-knowledge.ts'
import { publicRoutes } from './src/data/routes.ts'
import { projects } from './src/data/projects.ts'

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

interface ChatRequestBody {
  messages?: ChatMessage[]
}

const GROQ_MODELS = [
  "openai/gpt-oss-120b",
  "qwen/qwen3.8-27b",
  "openai/gpt-oss-20b",
];

const OPENROUTER_MODELS = [
  "openrouter/free",
];

async function* parseSseStream(
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

async function streamLlmToResponse(
  res: ServerResponse,
  endpoint: string,
  apiKey: string,
  models: string[],
  formattedMessages: ChatMessage[],
  extraHeaders: Record<string, string> = {}
): Promise<boolean> {
  const systemPrompt = buildChatSystemPrompt()

  for (const modelName of models) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          ...extraHeaders,
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

      if (!response.ok || !response.body) {
        const errText = await response.text()
        console.warn(`[Vite Dev] Model ${modelName} returned status ${response.status}:`, errText)
        continue
      }

      res.statusCode = 200
      res.setHeader('Content-Type', 'text/plain; charset=utf-8')
      res.setHeader('Cache-Control', 'no-cache')
      res.setHeader('Transfer-Encoding', 'chunked')

      const stream = response.body
      for await (const chunk of parseSseStream(stream)) {
        if (chunk) {
          res.write(chunk)
        }
      }

      res.end()
      return true
    } catch (err) {
      console.warn(`[Vite Dev] Model ${modelName} request failed:`, err)
    }
  }

  return false
}

function chatAssistantPlugin(groqApiKey?: string, openrouterApiKey?: string): Plugin {
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

        if (!groqApiKey && !openrouterApiKey) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(
            JSON.stringify({
              error:
                'Chat assistant belum dikonfigurasi. Pastikan GROQ_API_KEY atau OPENROUTER_API_KEY sudah diset di file .env.',
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

          // 1. Try Groq first
          if (groqApiKey) {
            const success = await streamLlmToResponse(
              res,
              'https://api.groq.com/openai/v1/chat/completions',
              groqApiKey,
              GROQ_MODELS,
              recentMessages
            )
            if (success) return
          }

          // 2. Fallback to OpenRouter
          if (openrouterApiKey) {
            const success = await streamLlmToResponse(
              res,
              'https://openrouter.ai/api/v1/chat/completions',
              openrouterApiKey,
              OPENROUTER_MODELS,
              recentMessages,
              {
                'HTTP-Referer': 'https://github.com/andrebaik/portfolv2',
                'X-Title': 'Mochamad Vicryandre Portfolio',
              }
            )
            if (success) return
          }

          res.statusCode = 502
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          res.end(
            JSON.stringify({
              error: 'Semua model AI (Groq & OpenRouter) gagal merespons. Silakan coba sesaat lagi.',
            })
          )
        })
      })
    },
  }
}

function sitemapPlugin(siteUrl?: string): Plugin {
  return {
    name: 'sitemap-plugin',
    apply: 'build',
    generateBundle() {
      const robotsBase = 'User-agent: *\nAllow: /\n\nDisallow: /api/\n'

      if (!siteUrl) {
        this.warn('SITE_URL is not set — skipping sitemap.xml generation.')
        this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsBase })
        return
      }

      const origin = (/^https?:\/\//.test(siteUrl) ? siteUrl : `https://${siteUrl}`).replace(/\/$/, '')
      const today = new Date().toISOString().slice(0, 10)

      const entries = [
        ...publicRoutes.map((route) => ({
          loc: `${origin}${route.path}`,
          changefreq: route.changefreq,
          priority: route.priority,
        })),
        ...projects.map((project) => ({
          loc: `${origin}/projects/${project.slug}`,
          changefreq: 'monthly' as const,
          priority: '0.7',
        })),
      ]

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`

      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: xml })
      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `${robotsBase}\nSitemap: ${origin}/sitemap.xml\n`,
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const groqApiKey = env.GROQ_API_KEY || process.env.GROQ_API_KEY
  const openrouterApiKey = env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY
  const siteUrl = env.SITE_URL || process.env.SITE_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL

  return {
    plugins: [
      react(),
      chatAssistantPlugin(groqApiKey, openrouterApiKey),
      sitemapPlugin(siteUrl),
    ],
  }
})
