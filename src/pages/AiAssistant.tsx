import { useState, useRef, useEffect } from "react";
import { Trash2, AlertCircle, ArrowUp, ArrowDown, User, Copy, Check } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useChat } from "../hooks/useChat";
import { Seo } from "../components/Seo";
import { FormatMessage } from "../components/chat/formatMessage";
import { TypingIndicator } from "../components/chat/TypingIndicator";
import { ClearChatDialog } from "../components/chat/ClearChatDialog";
import { LiquidMultimodalInput } from "../components/ui/liquid-multimodal-input";

export function AiAssistant() {
  const { t, lang } = useLanguage();
  const isId = lang === "id";

  const { messages, isLoading, error, sendMessage, resetChat } = useChat();
  const [isClearDialogOpen, setIsClearDialogOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showScrollBottom, setShowScrollBottom] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const isAutoScrollEnabledRef = useRef(true);

  // Smart scroll: track user scroll position
  const handleScroll = () => {
    const el = viewportRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const isAtBottom = distanceFromBottom <= 120;
    isAutoScrollEnabledRef.current = isAtBottom;
    setShowScrollBottom(!isAtBottom);
  };

  // Only auto-scroll down if user was already at the bottom
  useEffect(() => {
    const el = viewportRef.current;
    if (el && isAutoScrollEnabledRef.current && messages.length > 0) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleInputSubmit = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed || isLoading) return;
    isAutoScrollEnabledRef.current = true;
    setShowScrollBottom(false);
    sendMessage(trimmed);
  };

  const scrollToBottom = () => {
    const el = viewportRef.current;
    if (!el) return;
    isAutoScrollEnabledRef.current = true;
    setShowScrollBottom(false);
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  };

  const copyMessage = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Fallback
    }
  };

  const bentoCards = isId
    ? [
        {
          id: "rag",
          title: "Arsitektur Chatbot RAG",
          desc: "Bagaimana sistem RAG dibangun dengan context retrieval & model inference?",
          prompt: "Jelaskan bagaimana arsitektur Chatbot RAG yang Anda kembangkan dan teknologi apa saja yang digunakan.",
          tag: "Architecture",
        },
        {
          id: "stack",
          title: "Keahlian & Tech Stack",
          desc: "Full-stack framework, TypeScript, Tailwind, Python AI ecosystem, dan tooling.",
          prompt: "Apa saja core engineering tech stack dan keahlian teknis utama yang Anda kuasai?",
          tag: "Skills",
        },
        {
          id: "projects",
          title: "Proyek yang Dikembangkan",
          desc: "Production apps: Work'in, Xolearn, dan integrasi intelligence berbasis web.",
          prompt: "Ceritakan proyek-proyek unggulan yang telah Anda selesaikan beserta dampaknya.",
          tag: "Showcase",
        },
        {
          id: "contact",
          title: "Kontak & Kolaborasi",
          desc: "Ketersediaan untuk peluang kerja, freelance, dan cara berkolaborasi.",
          prompt: "Bagaimana cara menghubungi Mochamad Vicryandre Nurdin untuk berkolaborasi atau mendiskusikan peluang kerja?",
          tag: "Contact",
        },
      ]
    : [
        {
          id: "rag",
          title: "Chatbot RAG Architecture",
          desc: "How the RAG pipeline is built with context retrieval and LLM inference.",
          prompt: "Explain your Chatbot RAG architecture, vector retrieval flow, and tech stack.",
          tag: "Architecture",
        },
        {
          id: "stack",
          title: "Core Engineering Stack",
          desc: "Full-stack web, TypeScript, React, Python AI ecosystem, and performance engineering.",
          prompt: "What is your primary engineering stack and core technical skill set?",
          tag: "Skills",
        },
        {
          id: "projects",
          title: "Production Projects",
          desc: "Shipped products: Work'in, Xolearn, and modern web intelligence integrations.",
          prompt: "What major projects have you built, and what technical challenges did you solve?",
          tag: "Showcase",
        },
        {
          id: "contact",
          title: "Contact & Collaboration",
          desc: "Availability for high-impact roles, engineering contracts, and getting in touch.",
          prompt: "How can I contact Mochamad Vicryandre Nurdin for work opportunities or technical collaboration?",
          tag: "Contact",
        },
      ];

  const samplePills = isId
    ? [
        "Arsitektur Chatbot RAG",
        "Keahlian & Tech Stack",
        "Proyek Work'in & Xolearn",
        "Hubungi Vicryandre",
      ]
    : [
        "Chatbot RAG Architecture",
        "Core Tech Stack",
        "Work'in & Xolearn Projects",
        "Contact Vicryandre",
      ];

  const placeholderText = isLoading
    ? isId
      ? "Menunggu respon asisten..."
      : "Waiting for assistant response..."
    : isId
      ? "Tanyakan apapun tentang Vicryandre..."
      : "Ask anything about Vicryandre...";

  return (
    <div className="mx-auto flex h-[calc(100dvh-4rem)] max-w-4xl flex-col px-4 py-3 md:px-6">
      <Seo path="/ai-assistant" title={t("ai.title")} description={t("ai.subtitle")} />
      {/* Discreet Header: Only clear button when messages exist */}
      {messages.length > 0 && (
        <div className="flex shrink-0 items-center justify-end pb-2">
          <button
            type="button"
            onClick={() => setIsClearDialogOpen(true)}
            title={isId ? "Hapus riwayat chat" : "Clear chat history"}
            aria-label={isId ? "Hapus riwayat chat" : "Clear chat history"}
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs text-neutral-500 transition hover:bg-neutral-100 hover:text-red-500 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-red-400"
          >
            <Trash2 size={13} />
            <span>{isId ? "Bersihkan" : "Clear"}</span>
          </button>
        </div>
      )}

      {/* Main Content Area */}
      {messages.length === 0 ? (
        <div className="my-auto flex w-full flex-col items-center justify-center py-6">
          {/* Center Greeting */}
          <div className="w-full max-w-2xl text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-zinc-100">
              7Dynn - AI Asistant 
            </h1>
            <p className="mt-2 text-sm sm:text-base font-medium text-neutral-500 dark:text-zinc-400">
              {isId ? "Asisten Portofolio" : "Portfolio Assistant"}
            </p>
          </div>

          {/* Liquid Multimodal Input (Centered) */}
          <div className="w-full max-w-2xl mb-8">
            <LiquidMultimodalInput
              placeholder={placeholderText}
              isProcessing={isLoading}
              onSubmit={(val) => handleInputSubmit(val)}
            />
          </div>

          {/* 4 Interactive Query Cards */}
          <div className="grid w-full max-w-2xl grid-cols-1 sm:grid-cols-2 gap-3">
            {bentoCards.map((card) => (
              <button
                key={card.id}
                type="button"
                disabled={isLoading}
                onClick={() => {
                  isAutoScrollEnabledRef.current = true;
                  setShowScrollBottom(false);
                  sendMessage(card.prompt);
                }}
                className="group flex flex-col justify-between rounded-xl p-4 text-left transition-all duration-150 hover:bg-neutral-100/70 dark:hover:bg-zinc-800/60 disabled:opacity-50"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-semibold tracking-wider uppercase text-neutral-400 dark:text-zinc-500">
                      {card.tag}
                    </span>
                    <ArrowUp
                      size={13}
                      className="rotate-45 text-neutral-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-neutral-900 dark:text-zinc-500 dark:group-hover:text-zinc-100"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-neutral-900 group-hover:text-red-600 dark:text-zinc-100 dark:group-hover:text-red-400">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-zinc-400 leading-relaxed line-clamp-2">
                    {card.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative flex flex-1 flex-col min-h-0">
          {/* Message Viewport with data-lenis-prevent and native scrolling */}
          <div
            ref={viewportRef}
            data-lenis-prevent
            onScroll={handleScroll}
            className="flex-1 min-h-0 overflow-y-auto overscroll-contain py-3 px-1 scroll-smooth flex flex-col gap-6 scrollbar-hide [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {messages.map((m) => {
              const isUser = m.role === "user";
              const isEmptyAssistant = !isUser && !m.content.trim();

              if (isEmptyAssistant) {
                return (
                  <div key={m.id} className="flex justify-start items-center gap-3">
                    <img src="/favicon.ico" alt="AI Assistant" className="h-8 w-8 rounded-full object-contain bg-white p-1 shadow-xs shrink-0 border border-black/10 dark:border-white/10" width={32} height={32} />
                    <TypingIndicator isIndonesian={isId} />
                  </div>
                );
              }

              if (isUser) {
                return (
                  <div key={m.id} className="flex justify-end items-end gap-2.5">
                    <div className="max-w-[85%] sm:max-w-[75%] rounded-3xl rounded-tr-md bg-neutral-900 text-white dark:bg-zinc-100 dark:text-zinc-950 px-5 py-3.5 shadow-sm text-sm sm:text-[15px] leading-relaxed">
                      <div className="whitespace-pre-wrap">{m.content}</div>
                    </div>
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-neutral-700 dark:bg-zinc-800 dark:text-zinc-300 text-xs font-semibold">
                      <User size={14} />
                    </div>
                  </div>
                );
              }

              // Assistant response bubble
              return (
                <div key={m.id} className="flex justify-start items-start gap-3">
                  <img src="/favicon.ico" alt="7Dynn" className="h-8 w-8 rounded-full object-contain bg-white p-1 shadow-xs shrink-0 mt-1 border border-black/10 dark:border-white/10" width={32} height={32} />
                  <div className="flex-1 min-w-0 flex flex-col gap-2">
                    <div className="rounded-3xl rounded-tl-md border border-black/[0.08] bg-white/85 dark:border-white/[0.08] dark:bg-zinc-900/75 p-5 text-sm sm:text-[15px] leading-relaxed text-neutral-800 dark:text-zinc-200 shadow-xs backdrop-blur-md">
                      <FormatMessage content={m.content} />
                    </div>
                    <div className="flex items-center gap-3 px-2 text-[11px] text-neutral-400 dark:text-zinc-500">
                      <button
                        type="button"
                        onClick={() => copyMessage(m.content, m.id)}
                        className="inline-flex items-center gap-1 hover:text-neutral-700 dark:hover:text-zinc-300 transition-colors"
                      >
                        {copiedId === m.id ? (
                          <>
                            <Check size={12} className="text-emerald-500" />
                            <span className="text-emerald-500 font-medium">
                              {isId ? "Tersalin" : "Copied"}
                            </span>
                          </>
                        ) : (
                          <>
                            <Copy size={12} />
                            <span>{isId ? "Salin" : "Copy"}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* In-flight typing indicator before assistant placeholder arrives */}
            {isLoading && messages.length > 0 && messages[messages.length - 1].role === "user" && (
              <div className="flex justify-start items-center gap-3">
                <img src="/favicon.ico" alt="AI Assistant" className="h-8 w-8 rounded-full object-contain bg-white p-1 shadow-xs shrink-0 border border-black/10 dark:border-white/10" width={32} height={32} />
                <TypingIndicator isIndonesian={isId} />
              </div>
            )}
            {/* Screen-reader status: announces the turn, not every streamed token */}
            <p aria-live="polite" className="sr-only">
              {isLoading
                ? isId
                  ? "Asisten sedang menulis jawaban."
                  : "Assistant is writing a reply."
                : messages.length > 0
                  ? isId
                    ? "Jawaban selesai."
                    : "Reply complete."
                  : ""}
            </p>
            {/* Error Banner */}
            {error && (
              <div
                role="alert"
                className="flex items-start gap-2.5 rounded-xl bg-red-500/10 p-4 text-xs text-red-600 dark:bg-red-400/10 dark:text-red-400"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <div className="flex-1">
                  <div className="font-semibold tracking-wide">
                    {isId ? "Terjadi Kesalahan" : "Error Occurred"}
                  </div>
                  <p className="mt-1 leading-relaxed">
                    {error.includes("GROQ_API_KEY") || error.includes("OPENROUTER_API_KEY")
                      ? isId
                        ? "API Key belum diset. Tambahkan GROQ_API_KEY atau OPENROUTER_API_KEY ke file .env Anda."
                        : "API Key is not configured. Add GROQ_API_KEY or OPENROUTER_API_KEY to your .env file."
                      : error}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Floating Scroll to Bottom Button */}
          {showScrollBottom && (
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30">
              <button
                type="button"
                onClick={scrollToBottom}
                className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/90 px-3.5 py-1.5 text-xs font-medium text-neutral-700 shadow-md backdrop-blur-md transition-all hover:bg-neutral-100 hover:scale-105 active:scale-95 dark:border-white/10 dark:bg-zinc-800/90 dark:text-zinc-200 dark:hover:bg-zinc-700"
              >
                <ArrowDown size={13} />
                <span>{isId ? "Gulir ke bawah" : "Scroll to bottom"}</span>
              </button>
            </div>
          )}

          {/* Bottom Area: Suggestions + Liquid Input */}
          <div className="shrink-0 pt-3 pb-1">
            {/* Subtle suggestion pills */}
            <div className="mb-2.5 flex flex-wrap items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 dark:text-zinc-500 mr-1">
                {t("ai.suggested")}:
              </span>
              {samplePills.map((pill) => (
                <button
                  key={pill}
                  type="button"
                  disabled={isLoading}
                  onClick={() => {
                    isAutoScrollEnabledRef.current = true;
                    setShowScrollBottom(false);
                    sendMessage(pill);
                  }}
                  className="rounded-full bg-neutral-100 px-3 py-1 text-[11px] text-neutral-600 transition hover:bg-neutral-200 hover:text-neutral-900 disabled:opacity-50 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700 dark:hover:text-white"
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Liquid Multimodal Input */}
            <LiquidMultimodalInput
              placeholder={placeholderText}
              isProcessing={isLoading}
              onSubmit={(val) => handleInputSubmit(val)}
            />
          </div>
        </div>
      )}

      {/* Clear Chat Confirmation Modal */}
      <ClearChatDialog
        isOpen={isClearDialogOpen}
        onClose={() => setIsClearDialogOpen(false)}
        onConfirm={resetChat}
        isIndonesian={isId}
      />
    </div>
  );
}

export default AiAssistant;
