import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, AlertTriangle, X } from "lucide-react";

export interface ClearChatDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isIndonesian?: boolean;
}

export function ClearChatDialog({
  isOpen,
  onClose,
  onConfirm,
  isIndonesian = false,
}: ClearChatDialogProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="clear-chat-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md rounded-xl border border-black/10 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-zinc-900"
          >
            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              aria-label={isIndonesian ? "Tutup dialog" : "Close dialog"}
              className="absolute right-4 top-4 rounded-md p-1 text-neutral-400 transition hover:bg-neutral-100 hover:text-neutral-700 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            >
              <X size={16} />
            </button>

            {/* Icon + Content */}
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 text-red-600 dark:border-red-400/20 dark:bg-red-400/10 dark:text-red-400">
                <AlertTriangle size={18} />
              </div>
              <div className="flex-1 pr-4">
                <h3
                  id="clear-chat-title"
                  className="font-mono text-sm font-semibold tracking-wide text-neutral-900 dark:text-zinc-100"
                >
                  {isIndonesian ? "Hapus Percakapan" : "Clear Conversation"}
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-neutral-600 dark:text-zinc-400">
                  {isIndonesian
                    ? "Apakah Anda yakin ingin menghapus seluruh riwayat percakapan ini? Tindakan ini tidak dapat dibatalkan."
                    : "Are you sure you want to clear the entire chat history? This action cannot be undone."}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-black/10 bg-transparent px-4 py-2 font-mono text-xs font-medium text-neutral-700 transition hover:bg-neutral-100 hover:text-black dark:border-white/10 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
              >
                {isIndonesian ? "Batal" : "Cancel"}
              </button>
              <button
                type="button"
                onClick={() => {
                  onConfirm();
                  onClose();
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-red-600/30 bg-red-600 px-4 py-2 font-mono text-xs font-medium text-white transition hover:bg-red-700 active:scale-[0.98] dark:border-red-500/30 dark:bg-red-500 dark:hover:bg-red-600"
              >
                <Trash2 size={13} />
                {isIndonesian ? "Hapus" : "Clear"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default ClearChatDialog;
