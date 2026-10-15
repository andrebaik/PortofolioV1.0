import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Timeline } from "../components/Timeline";
import { experiences } from "../data/experience";
import { site } from "../data/site";
import { useLanguage } from "../context/LanguageContext";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] as const },
};

export function Experience() {
  const { t } = useLanguage();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
      {/* Header */}
      <motion.div {...fadeUp}>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 dark:text-zinc-500">
          {t("experience.tag")}
        </p>
        <h1 className="mt-4 font-display text-[32px] font-bold leading-[1.1] tracking-[-0.03em] text-ink dark:text-white sm:text-[44px] lg:text-[50px]">
          {t("experience.title")}
        </h1>
        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-neutral-600 dark:text-zinc-400">
          {t("experience.subtitle")}
        </p>
      </motion.div>

      {/* Main Ledger */}
      <div className="mt-12">
        <Timeline items={experiences} />
      </div>

      {/* Resume CTA */}
      <div className="mt-16 flex flex-col items-start justify-between gap-6 border-t border-black/10 py-10 dark:border-white/10 sm:flex-row sm:items-center">
        <div>
          <h2 className="font-display text-xl font-bold tracking-tight text-ink dark:text-white">
            {t("experience.cv.title")}
          </h2>
          <p className="mt-1 text-sm text-neutral-500 dark:text-zinc-400">
            {t("experience.cv.subtitle")}
          </p>
        </div>
        <a
          href={site.cvUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-ink"
        >
          <Download size={15} /> {t("experience.cv.button")}
        </a>
      </div>
    </div>
  );
}
export default Experience;
