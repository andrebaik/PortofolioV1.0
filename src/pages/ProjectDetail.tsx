import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Globe } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { projects } from "../data/projects";
import { Seo } from "../components/Seo";
import { useLanguage } from "../context/LanguageContext";

export function ProjectDetail() {
  const { slug } = useParams();
  const { t } = useLanguage();
  const p = projects.find((x) => x.slug === slug);

  if (!p) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-20 md:px-6">
        <Seo title={t("projects.notFound")} path={`/projects/${slug}`} noindex />
        <h1 className="font-display text-2xl font-bold dark:text-white">{t("projects.notFound")}</h1>
        <p className="mt-2 text-neutral-500 dark:text-zinc-400">{t("projects.notFoundDesc")}</p>
        <Link
          to="/projects"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-white dark:bg-white dark:text-ink"
        >
          <ArrowLeft size={16} /> {t("projects.back")}
        </Link>
      </div>
    );
  }

  return (
    <article className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-20">
      <Seo title={p.title} description={p.description} path={`/projects/${p.slug}`} />
      {/* Back button */}
      <div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-neutral-500 transition hover:text-ink dark:text-zinc-400 dark:hover:text-white"
        >
          <ArrowLeft size={14} /> {t("projects.back")}
        </Link>
      </div>

      {/* Header */}
      <div className="mt-6">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 dark:text-zinc-500">
          {t("projects.caseStudy")} / {p.category}
        </span>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink dark:text-white sm:text-4xl md:text-5xl">
          {p.title}
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-600 dark:text-zinc-300 sm:text-lg">
          {p.description}
        </p>
      </div>

      {/* Project Meta Bar */}
      <div className="mt-8 grid gap-6 border-y border-black/10 py-6 dark:border-white/10 sm:grid-cols-12 sm:items-center">
        <div className="sm:col-span-8">
          <p className="font-mono text-xs uppercase tracking-wider text-neutral-400 dark:text-zinc-500">
            {t("projects.tech")}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span
                key={t}
                className="font-mono text-xs text-neutral-700 dark:text-zinc-300"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3 sm:col-span-4 sm:justify-end">
          {p.links.github ? (
            <a
              href={p.links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-black/15 px-4 py-2 text-xs font-semibold text-ink transition hover:bg-black/5 dark:border-white/20 dark:text-white dark:hover:bg-white/5"
            >
              <SiGithub size={14} /> {t("projects.source")}
            </a>
          ) : null}
          {p.links.live ? (
            <a
              href={p.links.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-4 py-2 text-xs font-semibold text-white transition hover:bg-neutral-800 dark:bg-white dark:text-ink"
            >
              <Globe size={14} /> {t("projects.visit")} <ArrowUpRight size={14} />
            </a>
          ) : null}
        </div>
      </div>

      {/* Main Feature Image */}
      <div className="mt-8 overflow-hidden rounded-xl border border-black/10 bg-neutral-100 dark:border-white/10 dark:bg-zinc-800">
        <img src={p.image} alt={p.title} className="w-full object-cover" loading="eager" />
      </div>

      {/* In-depth Overview */}
      <div className="mt-12 border-t border-black/10 pt-10 dark:border-white/10">
        <h2 className="font-display text-xl font-bold tracking-tight text-ink dark:text-white">
          {t("projects.overview")}
        </h2>
        <div className="mt-4 max-w-3xl space-y-4 text-base leading-relaxed text-neutral-600 dark:text-zinc-300">
          <p>{p.longDescription}</p>
        </div>
      </div>
    </article>
  );
}
export default ProjectDetail;
