import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "../data/projects";

export function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-xl border border-black/10 bg-white transition duration-300 hover:border-black/30 dark:border-white/10 dark:bg-zinc-900 dark:hover:border-white/30">
      <div>
        <Link to={`/projects/${p.slug}`} className="block overflow-hidden bg-neutral-100 dark:bg-zinc-800">
          <img
            src={p.image}
            alt={p.title}
            className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
            loading="lazy"
          />
        </Link>
        <div className="p-6 md:p-7">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 dark:text-zinc-500">
              {p.category}
            </span>
          </div>

          <Link
            to={`/projects/${p.slug}`}
            className="mt-2.5 inline-flex items-center gap-1.5 font-display text-xl font-bold tracking-tight text-ink transition hover:opacity-75 dark:text-white"
          >
            <span>{p.title}</span>
            <ArrowUpRight size={16} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-zinc-400">
            {p.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="font-mono text-[11px] text-neutral-500 dark:text-zinc-400"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-black/5 px-6 py-4 dark:border-white/5 md:px-7">
        <div className="flex items-center justify-between text-xs font-medium">
          <Link
            to={`/projects/${p.slug}`}
            className="font-display text-sm font-semibold text-ink underline decoration-black/20 underline-offset-4 transition hover:decoration-ink dark:text-white dark:decoration-white/20 dark:hover:decoration-white"
          >
            View Details
          </Link>
          {p.links.live ? (
            <a
              href={p.links.live}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-500 transition hover:text-ink dark:text-zinc-400 dark:hover:text-white"
            >
              Live Demo ↗
            </a>
          ) : p.links.github ? (
            <a
              href={p.links.github}
              target="_blank"
              rel="noreferrer"
              className="text-neutral-500 transition hover:text-ink dark:text-zinc-400 dark:hover:text-white"
            >
              GitHub Repo ↗
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function ProjectCardRow({ p, reverse }: { p: Project; reverse?: boolean }) {
  return (
    <article className={`grid gap-8 py-10 md:grid-cols-12 md:items-center ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
      <div className="overflow-hidden rounded-xl border border-black/10 bg-neutral-100 dark:border-white/10 dark:bg-zinc-800 md:col-span-6">
        <Link to={`/projects/${p.slug}`}>
          <img src={p.image} alt={p.title} className="aspect-[16/10] w-full object-cover transition duration-500 hover:scale-[1.02]" loading="lazy" />
        </Link>
      </div>
      <div className="md:col-span-6">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 dark:text-zinc-500">{p.category}</span>
        <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink dark:text-white">{p.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-zinc-400">{p.longDescription}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span key={t} className="font-mono text-xs text-neutral-500 dark:text-zinc-400">
              #{t}
            </span>
          ))}
        </div>
        <div className="mt-6 flex items-center gap-4">
          <Link to={`/projects/${p.slug}`} className="rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-ink">
            View Details
          </Link>
          {p.links.live ? (
            <a href={p.links.live} target="_blank" rel="noreferrer" className="text-sm font-medium underline decoration-black/20 underline-offset-4 dark:text-white">
              Live Preview ↗
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
