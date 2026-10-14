import { motion } from "framer-motion";

export function Marquee({ items, label }: { items: string[]; label?: string }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden pt-1 pb-4">
      <motion.div
        className="flex w-max items-center gap-14 whitespace-nowrap md:gap-20"
        animate={{ x: ["-50%", "0%"] }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((t, i) => (
          <span
            key={i}
            className="flex items-center gap-14 text-[32px] font-bold uppercase tracking-[0.12em] text-neutral-400 dark:text-zinc-500 md:gap-20 md:text-[52px]"
          >
            {label ? (
              <span className="text-ink dark:text-white">{label}</span>
            ) : null}
            <span>{t}</span>
            <span className="h-2.5 w-2.5 rounded-full bg-black/15 dark:bg-white/15" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function RoleMarquee({ roles }: { roles: string[] }) {
  const doubled = [...roles, ...roles];
  return (
    <div className="overflow-hidden pt-4 pb-1">
      <motion.div
        className="flex w-max gap-14 whitespace-nowrap md:gap-20"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((r, i) => (
          <span
            key={i}
            className="flex items-center gap-14 text-[32px] font-bold uppercase tracking-[0.12em] text-ink dark:text-zinc-100 md:gap-20 md:text-[52px]"
          >
            <span className="font-display tracking-[-0.02em]">{r.toUpperCase()}</span>
            <span className="h-2.5 w-2.5 rounded-full bg-black/15 dark:bg-white/20" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
