import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Hero } from "../components/Hero";
import { RoleMarquee, Marquee } from "../components/Marquee";
import { SectionHeader } from "../components/SectionHeader";
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
  return (
    <div>

      <Hero />
      <RoleMarquee roles={roleMarquee} />
      <Marquee items={["Ready to Work", "Open to Collaborate", "Available for Projects", "Let's Build Together", "Hire Me", "Ready for Joki tugas"]} />

      <motion.section
        {...fadeUp}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] as const }}
        className="mx-auto max-w-6xl px-4 py-24 md:px-6 md:py-36"
      >
        <div className="grid gap-10 md:grid-cols-5 md:gap-12">
          <div className="md:col-span-3">
            <SectionHeader title={t("home.about.title")} subtitle={t("home.about.subtitle")} />
            <p className="mt-5 max-w-[52ch] text-[15px] leading-7 text-neutral-500 dark:text-zinc-400">{t("home.about.desc")}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/about" className="rounded-full bg-white px-6 py-3 text-sm font-medium text-ink ring-1 ring-black/5 hover:bg-neutral-50 dark:bg-zinc-900 dark:text-white dark:ring-white/10 dark:hover:bg-zinc-800">
                {t("home.about.viewMore")}
              </Link>
              <a href={site.cvUrl} className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white dark:bg-white dark:text-ink">
                {t("home.about.downloadCv")} <ArrowUpRight size={14} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="rounded-[2rem] bg-black/[0.04] p-1.5 ring-1 ring-black/5 dark:bg-white/[0.06] dark:ring-white/10">
              <div className="overflow-hidden rounded-[calc(2rem-6px)] bg-white dark:bg-zinc-900">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&auto=format&fit=crop"
                  alt="work"
                  className="aspect-[4/3.4] w-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between rounded-[1.5rem] bg-white p-5 ring-1 ring-black/5 dark:bg-zinc-900 dark:ring-white/10">
              <div>
                <p className="text-sm font-semibold dark:text-white">{t("home.about.available")}</p>
                <p className="text-xs text-neutral-400 dark:text-zinc-500">{t("home.about.reply")}</p>
              </div>
              <Link to="/contact" className="rounded-full bg-ink px-5 py-2.5 text-xs font-semibold text-white dark:bg-white dark:text-ink">
                {t("home.about.contactMe")}
              </Link>
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
