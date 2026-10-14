import type { Experience } from "../data/experience";

export function Timeline({ items }: { items: Experience[] }) {
  return (
    <div className="divide-y divide-black/10 border-y border-black/10 dark:divide-white/10 dark:border-white/10">
      {items.map((e) => (
        <div
          key={e.id}
          className="grid gap-4 py-8 sm:grid-cols-12 sm:items-start md:py-10"
        >
          {/* Period & Index */}
          <div className="sm:col-span-3">
            <span className="font-mono text-xs font-semibold text-neutral-400 dark:text-zinc-500">
              [{e.id}]
            </span>
            <p className="mt-1 font-mono text-xs font-medium uppercase tracking-wider text-neutral-500 dark:text-zinc-400">
              {e.period}
            </p>
          </div>

          {/* Role & Org */}
          <div className="sm:col-span-4">
            <h3 className="font-display text-lg font-bold tracking-tight text-ink dark:text-white">
              {e.role}
            </h3>
            <p className="mt-1 font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-zinc-400">
              {e.org}
            </p>
          </div>

          {/* Description */}
          <div className="sm:col-span-5">
            <p className="text-sm leading-relaxed text-neutral-600 dark:text-zinc-300">
              {e.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
