import { useState, useRef, useCallback } from "react";

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


export function useChat(initialMessages: ChatMessageData[] = []): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessageData[]>(initialMessages);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isLoadingRef = useRef<boolean>(false);

  const sendMessage = useCallback(
    async (content: string): Promise<void> => {
      const trimmed = content.trim();
      if (!trimmed || isLoadingRef.current) {
        return;
      }

      const userMessageId =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      const assistantMessageId =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

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

      // Updated history sends { role, content } up to the current user message
      const updatedHistory = [...messages, userMsg].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // Append user message and empty placeholder assistant message
      setMessages((prev) => [...prev, userMsg, placeholderAssistantMsg]);
      setIsLoading(true);
      isLoadingRef.current = true;
      setError(null);

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ messages: updatedHistory }),
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
            // Ignore JSON parse errors, fallback to status text
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

          const chunk = decoder.decode(value, { stream: true });
          accumulated += chunk;

          const currentAccumulated = accumulated;
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantMessageId
                ? { ...msg, content: currentAccumulated }
                : msg
            )
          );
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "Gagal memproses pesan / Failed to process message";
        setError(errorMessage);

        // If assistant placeholder is still empty, remove it from messages
        setMessages((prev) =>
          prev.filter(
            (msg) =>
              msg.id !== assistantMessageId || msg.content.trim().length > 0
          )
        );
      } finally {
        setIsLoading(false);
        isLoadingRef.current = false;
      }
    },
    [messages]
  );

  const resetChat = useCallback((): void => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    resetChat,
  };
}

export default useChat;
