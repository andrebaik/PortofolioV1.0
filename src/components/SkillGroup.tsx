import { skillGroups } from "../data/skills";

export function SkillGroup() {
  return (
    <div className="divide-y divide-black/10 border-y border-black/10 dark:divide-white/10 dark:border-white/10">
      {skillGroups.map((g) => (
        <div
          key={g.title}
          className="grid gap-3 py-6 sm:grid-cols-12 sm:items-baseline md:py-8"
        >
          <div className="sm:col-span-4 lg:col-span-3">
            <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 dark:text-zinc-500">
              {g.title}
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:col-span-8 lg:col-span-9">
            {g.items.map((it) => (
              <span
                key={it}
                className="text-[15px] font-medium text-ink transition hover:opacity-60 dark:text-zinc-200 dark:hover:text-white"
              >
                {it}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
