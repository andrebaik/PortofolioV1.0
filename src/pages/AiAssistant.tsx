import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Bot, Terminal } from "lucide-react";
import { projects } from "../data/projects";
import { skillGroups } from "../data/skills";

type Msg = { role: "user" | "assistant"; text: string };

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] as const },
};

function mockReply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("project") || q.includes("projek") || q.includes("karya")) {
    return `Currently displaying ${projects.length} featured engineering systems:\n` +
      projects.map((p) => `• ${p.title} (${p.category}) — Tech: ${p.tags.slice(0, 4).join(", ")}`).join("\n") +
      "\n\nType 'tell me about <project>' or visit /projects to view complete case studies.";
  }
  if (q.includes("skill") || q.includes("tech") || q.includes("stack") || q.includes("keahlian")) {
    return "Technical capabilities:\n" +
      skillGroups.map((g) => `• ${g.title}: ${g.items.join(", ")}`).join("\n");
  }
  if (q.includes("contact") || q.includes("email") || q.includes("hire") || q.includes("hubungi")) {
    return "Contact routes:\n• Email: dynn.dev@gmail.com\n• Form: Navigate to /contact to send a direct inquiry.\n• GitHub: https://github.com/andrebaik";
  }
  const hit = projects.find((p) => q.includes(p.slug) || q.includes(p.title.toLowerCase()));
  if (hit) {
    return `[System: ${hit.title}]\nCategory: ${hit.category}\nTags: ${hit.tags.join(", ")}\n\n${hit.longDescription}`;
  }
  return "Query processed. You can ask about:\n1. 'What projects have you built?'\n2. 'What is your AI and full-stack tech stack?'\n3. 'How can I get in touch?'";
}

export function AiAssistant() {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: "assistant",
      text: "System ready. I am Mochamad Vicryandre's portfolio console agent. Ask about full-stack projects, AI implementations, or contact information.",
    },
  ]);
  const [input, setInput] = useState("");

  function send() {
    if (!input.trim()) return;
    const user: Msg = { role: "user", text: input };
    const reply: Msg = { role: "assistant", text: mockReply(input) };
    setMsgs((m) => [...m, user, reply]);
    setInput("");
  }

  const samplePrompts = [
    "What projects have you built?",
    "What is your tech stack?",
    "Tell me about the Chatbot RAG",
    "How can I contact you?",
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 md:px-6 md:py-20">
      {/* Header */}
      <motion.div {...fadeUp}>
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 dark:text-zinc-500">
          <Terminal size={14} /> Console / Agent Interface
        </div>
        <h1 className="mt-4 font-display text-[32px] font-bold leading-[1.1] tracking-[-0.03em] text-ink dark:text-white sm:text-[44px] lg:text-[50px]">
          Interactive Query Console
        </h1>
        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-neutral-600 dark:text-zinc-400">
          Query the portfolio database directly for information on architecture, published projects, and engineering capabilities.
        </p>
      </motion.div>

      {/* Main Terminal Window */}
      <div className="mt-12 overflow-hidden rounded-xl border border-black/10 bg-white dark:border-white/10 dark:bg-zinc-900">
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-3.5 font-mono text-xs dark:border-white/10">
          <div className="flex items-center gap-2 text-neutral-500 dark:text-zinc-400">
            <Bot size={15} />
            <span>AGENT_ID // VICRYANDRE_V2</span>
          </div>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> ONLINE
          </span>
        </div>

        {/* Message Viewport */}
        <div className="flex h-[420px] flex-col gap-4 overflow-y-auto p-6 font-mono text-sm">
          {msgs.map((m, i) => (
            <div
              key={i}
              className={`max-w-[85%] rounded-lg p-4 text-[13px] leading-relaxed ${
                m.role === "user"
                  ? "self-end bg-ink text-white dark:bg-white dark:text-ink"
                  : "self-start border border-black/10 bg-neutral-50 text-neutral-800 dark:border-white/10 dark:bg-zinc-800/80 dark:text-zinc-200"
              }`}
            >
              <div className="mb-1 text-[10px] font-semibold tracking-wider opacity-60">
                {m.role === "user" ? "DISPATCH // YOU" : "RESPONSE // SYSTEM"}
              </div>
              <div className="whitespace-pre-wrap">{m.text}</div>
            </div>
          ))}
        </div>

        {/* Sample Prompt Chips */}
        <div className="border-t border-black/5 bg-neutral-50/50 p-4 dark:border-white/5 dark:bg-zinc-800/30">
          <p className="mb-2.5 font-mono text-[11px] uppercase tracking-wider text-neutral-400 dark:text-zinc-500">
            Suggested Queries:
          </p>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setInput(p)}
                className="rounded-md border border-black/10 bg-white px-3 py-1 font-mono text-xs text-neutral-600 transition hover:border-black/30 hover:text-ink dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-white/30 dark:hover:text-white"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="border-t border-black/10 p-4 dark:border-white/10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Query projects, tech stack, or contact..."
              className="flex-1 rounded-lg border border-black/15 bg-white px-4 py-2.5 font-mono text-xs text-ink outline-none transition focus:border-ink dark:border-white/20 dark:bg-zinc-800 dark:text-white dark:focus:border-white"
            />
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 rounded-lg bg-ink px-5 py-2.5 font-mono text-xs font-semibold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-ink"
            >
              <Send size={13} /> Run
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
