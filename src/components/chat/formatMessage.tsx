import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Copy, ExternalLink } from "lucide-react";

export interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="my-3 overflow-hidden rounded-xl border border-neutral-700/60 bg-neutral-950 text-neutral-200 shadow-sm dark:border-zinc-800">
      <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900/90 px-3.5 py-1.5 text-[11px] font-mono text-neutral-400">
        <span className="uppercase tracking-wider text-neutral-400 dark:text-zinc-500">
          {language || "code"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 rounded px-2 py-0.5 text-[11px] font-mono text-neutral-300 transition hover:bg-neutral-800 hover:text-white"
          aria-label={copied ? "Copied code" : "Copy code"}
        >
          {copied ? (
            <>
              <Check size={12} className="text-emerald-400" />
              <span className="font-medium text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-neutral-100">
        <code>{code}</code>
      </pre>
    </div>
  );
}

export interface FormatMessageProps {
  content: string;
  className?: string;
}

export function FormatMessage({ content, className = "" }: FormatMessageProps) {
  if (!content) return null;

  return (
    <div className={`prose-sm max-w-none text-neutral-800 dark:text-zinc-200 ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="mt-4 mb-2 text-lg sm:text-xl font-bold tracking-tight text-neutral-900 dark:text-zinc-100 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-3.5 mb-1.5 text-base sm:text-lg font-bold tracking-tight text-neutral-900 dark:text-zinc-100 first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-3 mb-1 text-sm sm:text-base font-semibold tracking-tight text-neutral-900 dark:text-zinc-100 first:mt-0">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="mt-2.5 mb-1 text-xs sm:text-sm font-semibold tracking-tight text-neutral-900 dark:text-zinc-100 first:mt-0">
              {children}
            </h4>
          ),
          p: ({ children }) => (
            <p className="my-2 leading-relaxed text-xs sm:text-sm text-neutral-800 dark:text-zinc-200 first:mt-0 last:mb-0">
              {children}
            </p>
          ),
          ul: ({ children }) => (
            <ul className="my-2 space-y-1 pl-4 text-xs sm:text-sm list-disc marker:text-red-500 dark:marker:text-red-400">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-2 space-y-1 pl-4 text-xs sm:text-sm list-decimal marker:text-neutral-500 dark:marker:text-zinc-400">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed text-neutral-800 dark:text-zinc-200">
              {children}
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-2.5 border-l-2 border-red-500 pl-3.5 italic text-neutral-600 dark:text-zinc-400">
              {children}
            </blockquote>
          ),
          hr: () => (
            <hr className="my-4 border-t border-black/10 dark:border-white/10" />
          ),
          table: ({ children }) => (
            <div className="my-3 overflow-x-auto rounded-xl border border-black/10 dark:border-white/10">
              <table className="min-w-full text-xs text-left">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-neutral-100/80 dark:bg-zinc-800/80 border-b border-black/10 dark:border-white/10 font-semibold text-neutral-900 dark:text-zinc-100">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-neutral-50/50 dark:hover:bg-zinc-800/40 transition-colors">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-3.5 py-2 font-medium">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3.5 py-2">
              {children}
            </td>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 font-medium text-red-600 underline underline-offset-2 hover:text-red-500 dark:text-red-400 dark:hover:text-red-300"
            >
              <span>{children}</span>
              <ExternalLink size={11} className="inline opacity-70 ml-0.5" />
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-neutral-900 dark:text-zinc-100">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-neutral-800 dark:text-zinc-200">
              {children}
            </em>
          ),
          code: (props) => {
            const { className: codeClassName, children, ...rest } = props;
            const match = /language-(\w+)/.exec(codeClassName || "");
            const codeString = String(children).replace(/\n$/, "");
            const isMultiline = codeString.includes("\n");

            // Fenced code block
            if (match || isMultiline) {
              return (
                <CodeBlock
                  code={codeString}
                  language={match ? match[1] : undefined}
                />
              );
            }

            // Inline code
            return (
              <code
                className="rounded-md border border-black/10 bg-neutral-100 px-1.5 py-0.5 font-mono text-[12px] font-medium text-neutral-800 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-200"
                {...rest}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export default FormatMessage;
