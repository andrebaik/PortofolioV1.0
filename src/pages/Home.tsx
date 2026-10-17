import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "../components/Hero";
import { RoleMarquee, Marquee } from "../components/Marquee";
import { SectionHeader } from "../components/SectionHeader";
import { Seo } from "../components/Seo";
import { ProjectCard } from "../components/ProjectCard";
import { Timeline } from "../components/Timeline";
import LogoLoop from "../components/LogoLoop";
import { projects } from "../data/projects";
import { experiences } from "../data/experience";
import { roleMarquee, site } from "../data/site";
import { useLanguage } from "../context/LanguageContext";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiPostgresql, SiPrisma, SiDocker, SiVercel, SiFigma, SiGit, SiPython, SiTensorflow, SiPytorch, SiHuggingface, SiN8N, SiNotion, SiGithubactions } from "react-icons/si";
import { Bot } from "lucide-react";


const fadeUp = {
  initial: { opacity: 0, y: 20, filter: "blur(6px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
};

const techLogos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
  { node: <SiNodedotjs />, title: "Node.js", href: "https://nodejs.org" },
  { node: <SiPostgresql />, title: "PostgreSQL", href: "https://www.postgresql.org" },
  { node: <SiPrisma />, title: "Prisma", href: "https://www.prisma.io" },
  { node: <SiDocker />, title: "Docker", href: "https://www.docker.com" },
  { node: <SiVercel />, title: "Vercel", href: "https://vercel.com" },
  { node: <SiFigma />, title: "Figma", href: "https://figma.com" },
  { node: <SiGit />, title: "Git", href: "https://git-scm.com" },
];
const aiToolsLogos = [
  { node: <Bot />, title: "OpenAI", href: "https://openai.com" },
  { node: <SiHuggingface />, title: "Hugging Face", href: "https://huggingface.co" },
  { node: <SiPython />, title: "Python", href: "https://www.python.org" },
  { node: <SiTensorflow />, title: "TensorFlow", href: "https://www.tensorflow.org" },
  { node: <SiPytorch />, title: "PyTorch", href: "https://pytorch.org" },
  { node: <SiN8N />, title: "n8n", href: "https://n8n.io" },
  { node: <SiGithubactions />, title: "GitHub Actions", href: "https://github.com/features/actions" },
  { node: <Bot />, title: "Slack", href: "https://slack.com" },
  { node: <SiNotion />, title: "Notion", href: "https://www.notion.com" },
];

export function Home() {
  const { t } = useLanguage();

  const capabilities = [
    {
      code: "01",
      label: t("home.cap.01.label"),
      title: t("home.cap.01.title"),
      desc: t("home.cap.01.desc"),
    },
    {
      code: "02",
      label: t("home.cap.02.label"),
      title: t("home.cap.02.title"),
      desc: t("home.cap.02.desc"),
    },
    {
      code: "03",
      label: t("home.cap.03.label"),
      title: t("home.cap.03.title"),
      desc: t("home.cap.03.desc"),
    },
    {
      code: "04",
      label: t("home.cap.04.label"),
      title: t("home.cap.04.title"),
      desc: t("home.cap.04.desc"),
    },
  ];

  return (
    <div>
      <Seo path="/" description={t("home.about.subtitle")} />
      <Hero />
      <RoleMarquee roles={roleMarquee} />
      <Marquee
        items={[
          t("home.marquee.01"),
          t("home.marquee.02"),
          t("home.marquee.03"),
          t("home.marquee.04"),
          t("home.marquee.05"),
          t("home.marquee.06"),
        ]}
      />

      {/* ── ABOUT / PROFILE SECTION (NO PHOTO, EDITORIAL CAPABILITY LEDGER) ── */}
      <motion.section
        {...fadeUp}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] as const }}
        className="mx-auto max-w-6xl px-4 py-20 md:px-6 md:py-32"
      >
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
          {/* Left Column: Bio Narrative (6 cols) */}
          <div className="lg:col-span-6">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 dark:text-zinc-500">
              {t("home.about.kicker")}
            </p>
            <h2 className="mt-4 font-display text-[32px] font-bold leading-[1.1] tracking-[-0.03em] text-ink dark:text-white sm:text-[40px] md:text-[46px]">
              {t("home.about.title")}
            </h2>
            <p className="mt-4 text-base font-medium text-neutral-700 dark:text-zinc-200">
              {t("home.about.subtitle")}
            </p>
            <p className="mt-4 max-w-[50ch] text-sm leading-relaxed text-neutral-500 dark:text-zinc-400">
              {t("home.about.desc")}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-ink dark:hover:bg-zinc-200"
              >
                <span>{t("home.about.viewMore")}</span>
                <ArrowUpRight size={14} />
              </Link>
              <a
                href={site.cvUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-black/15 px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-black/5 dark:border-white/20 dark:text-white dark:hover:bg-white/5"
              >
                <span>{t("home.about.downloadCv")}</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Capabilities Ledger (6 cols) */}
          <div className="lg:col-span-6">
            <div className="divide-y divide-black/10 border-y border-black/10 dark:divide-white/10 dark:border-white/10">
              {capabilities.map((cap) => (
                <motion.div
                  key={cap.code}
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="group py-6 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between font-mono text-[11px] text-neutral-400 dark:text-zinc-500">
                    <span className="font-semibold uppercase tracking-[0.2em]">
                      {cap.label}
                    </span>
                    <span className="font-mono text-neutral-300 dark:text-zinc-600">
                      [{cap.code}]
                    </span>
                  </div>
                  <h3 className="mt-1.5 font-display text-base font-semibold text-ink transition group-hover:text-neutral-600 dark:text-white dark:group-hover:text-zinc-300">
                    {cap.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-neutral-500 dark:text-zinc-400">
                    {cap.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        {...fadeUp}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] as const }}
        className="py-10 md:py-14"
      >
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <SectionHeader title={t("home.stack.title")} subtitle={t("home.stack.subtitle")} />
        </div>
        <div className="mt-8 overflow-hidden py-8 text-ink dark:text-zinc-300">
          <LogoLoop
            logos={techLogos}
            speed={75}
            direction="left"
            logoHeight={84}
            gap={84}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            ariaLabel="Tech stack"
          />
        </div>
        <div className="mt-4 overflow-hidden py-8 text-ink dark:text-zinc-300">
          <LogoLoop
            logos={aiToolsLogos}
            speed={70}
            direction="right"
            logoHeight={84}
            gap={84}
            hoverSpeed={0}
            scaleOnHover
            fadeOut
            ariaLabel="AI and tools"
          />
        </div>
      </motion.section>

      <motion.section
        {...fadeUp}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] as const }}
        className="mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-28"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeader title={t("home.works.title")} subtitle={t("home.works.subtitle")} />
          <Link to="/projects" className="hidden items-center gap-1 text-sm font-medium text-ink underline decoration-black/10 underline-offset-4 dark:text-white dark:decoration-white/20 md:inline-flex">
            {t("home.works.viewAll")} <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <ProjectCard key={p.slug} p={p} />
          ))}
        </div>
        <Link to="/projects" className="mt-6 inline-flex text-sm font-medium underline dark:text-white md:hidden">
          {t("home.works.viewAll")} →
        </Link>
      </motion.section>

      <motion.section
        {...fadeUp}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] as const }}
        className="mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-28"
      >
        <div className="flex items-end justify-between gap-4">
          <SectionHeader title={t("home.exp.title")} />
          <Link to="/experience" className="text-sm font-medium underline decoration-black/10 underline-offset-4 dark:text-white dark:decoration-white/20">
            {t("home.exp.viewAll")}
          </Link>
        </div>
        <div className="mt-8">
          <Timeline items={experiences.slice(0, 3)} />
        </div>
      </motion.section>

    </div>
  );
}
