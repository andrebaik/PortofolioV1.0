import { useState, useRef, useCallback, useEffect } from "react";

export interface ChatMessageData {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface UseChatReturn {
  messages: ChatMessageData[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  resetChat: () => void;
}

const STORAGE_KEY = "portfolio.chat.v1";
const MAX_PERSISTED_MESSAGES = 40;

interface StoredMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

function createId(): string {
  return typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function readPersistedMessages(): ChatMessageData[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return (parsed as StoredMessage[])
      .filter(
        (m) =>
          m &&
          typeof m.id === "string" &&
          (m.role === "user" || m.role === "assistant") &&
          typeof m.content === "string" &&
          m.content.trim().length > 0
      )
      .map((m) => ({
        id: m.id,
        role: m.role,
        content: m.content,
        timestamp: new Date(m.timestamp),
      }));
  } catch {
    return [];
  }
}

function persistMessages(messages: ChatMessageData[]): void {
  if (typeof window === "undefined") return;
  try {
    const payload: StoredMessage[] = messages
      .filter((m) => m.content.trim().length > 0)
      .slice(-MAX_PERSISTED_MESSAGES)
      .map((m) => ({
        id: m.id,
        role: m.role,
        content: m.content,
        timestamp: m.timestamp.toISOString(),
      }));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Quota or privacy mode — chat still works for the current session.
  }
}

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessageData[]>(readPersistedMessages);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isLoadingRef = useRef<boolean>(false);
  const messagesRef = useRef<ChatMessageData[]>(messages);
  const abortRef = useRef<AbortController | null>(null);

  // Mirror state into a ref so sendMessage can build history synchronously.
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  // Persist the settled transcript, never a half-streamed reply.
  useEffect(() => {
    if (isLoading) return;
    if (messages.length > 0) persistMessages(messages);
  }, [messages, isLoading]);

  // Drop the in-flight stream when the page unmounts.
  useEffect(() => {
    return () => {
      abortRef.current?.abort();
      abortRef.current = null;
    };
  }, []);

  const sendMessage = useCallback(async (content: string): Promise<void> => {
    const trimmed = content.trim();
    if (!trimmed || isLoadingRef.current) return;

    const userMessageId = createId();
    const assistantMessageId = createId();

    const userMsg: ChatMessageData = {
      id: userMessageId,
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    const placeholderAssistantMsg: ChatMessageData = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
    };

    const updatedHistory = [...messagesRef.current, userMsg].map((m) => ({
      role: m.role,
      content: m.content,
    }));

    setMessages((prev) => [...prev, userMsg, placeholderAssistantMsg]);
    // Keep the question even if the user navigates away mid-stream.
    persistMessages([...messagesRef.current, userMsg]);
    setIsLoading(true);
    isLoadingRef.current = true;
    setError(null);

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: updatedHistory }),
        signal: controller.signal,
      });

      if (!response.ok) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText || "Request failed"}`;
        try {
          const errJson = await response.json();
          if (errJson?.error) {
            errorMessage =
              typeof errJson.error === "string"
                ? errJson.error
                : JSON.stringify(errJson.error);
          }
        } catch {
          // Keep the status-based message when the body is not JSON.
        }
        throw new Error(errorMessage);
      }

      if (!response.body) {
        throw new Error("Response body is empty / Response stream tidak tersedia");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        accumulated += decoder.decode(value, { stream: true });
        const snapshot = accumulated;

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId ? { ...msg, content: snapshot } : msg
          )
        );
      }
    } catch (err: unknown) {
      // An aborted request is intentional (unmount or a newer message).
      if (err instanceof DOMException && err.name === "AbortError") {
        setMessages((prev) => prev.filter((msg) => msg.id !== assistantMessageId));
        return;
      }

      const errorMessage =
        err instanceof Error
          ? err.message
          : "Gagal memproses pesan / Failed to process message";
      setError(errorMessage);

      setMessages((prev) =>
        prev.filter(
          (msg) => msg.id !== assistantMessageId || msg.content.trim().length > 0
        )
      );
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
      setIsLoading(false);
      isLoadingRef.current = false;
    }
  }, []);

  const resetChat = useCallback((): void => {
    abortRef.current?.abort();
    abortRef.current = null;
    setMessages([]);
    setError(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage failures.
    }
  }, []);

  return { messages, isLoading, error, sendMessage, resetChat };
}

export default useChat;
