import { motion } from "framer-motion";
import { ProjectCard } from "../components/ProjectCard";
import { projects } from "../data/projects";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] as const },
};

export function Projects() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
      <motion.div {...fadeUp}>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 dark:text-zinc-500">
          Index / Works
        </p>
        <h1 className="mt-4 font-display text-[32px] font-bold leading-[1.1] tracking-[-0.03em] text-ink dark:text-white sm:text-[44px] lg:text-[50px]">
          Selected Works & Systems
        </h1>
        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-neutral-600 dark:text-zinc-400">
          A showcase of full-stack applications, Retrieval-Augmented Generation (RAG) AI engines, and interactive web platforms built for reliability and speed.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-8 border-t border-black/10 pt-12 dark:border-white/10 md:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.slug} p={p} />
        ))}
      </div>
    </div>
  );
}
