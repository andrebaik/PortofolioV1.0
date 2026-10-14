import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Download, Mail } from "lucide-react";
import { SiGithub, SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { SectionHeader } from "../components/SectionHeader";
import { SkillGroup } from "../components/SkillGroup";
import { HoloCard } from "../components/HoloCard";
import { site } from "../data/site";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] as const },
};

const profileDetails = [
  {
    label: "EDUCATION",
    title: "Institut Teknologi Garut",
    meta: "S1 Teknik Informatika • 2024 – Present",
    desc: "Undergraduate study focusing on Software Architecture, Intelligent Systems, and Web Engineering. Active member of HIMATIF ITG.",
  },
  {
    label: "SPECIALIZATION",
    title: "Full Stack & Distributed Web",
    meta: "TypeScript • Node.js • React • PostgreSQL",
    desc: "End-to-end web engineering with strict type safety, modular API services, and resilient relational database design.",
  },
  {
    label: "AI SYSTEMS",
    title: "RAG & LLM Workflows",
    meta: "Python • FastAPI • ChromaDB • Qwen 2.5",
    desc: "Developing Retrieval-Augmented Generation architectures, local vector indexing, and low-latency streaming endpoints.",
  },
  {
    label: "COLLABORATION",
    title: "Garut Kota, Indonesia (GMT+7)",
    meta: "Remote & On-site Available",
    desc: "Open for engineering internships, full-time junior developer roles, and freelance contracts with global delivery.",
  },
];

const pillars = [
  {
    index: "01",
    title: "Schema First, Code Second",
    desc: "Designing unambiguous data models, REST/streaming API specifications, and state machines prior to UI implementation. Clear contracts prevent costly architectural rewrites.",
  },
  {
    index: "02",
    title: "Full-Cycle Delivery",
    desc: "Bridging complex backend logic to fluid frontends. Every feature is delivered end-to-end with typed data fetching, optimistic UI updates, and zero unnecessary runtime bloat.",
  },
  {
    index: "03",
    title: "Pragmatic Intelligence",
    desc: "Leveraging generative AI and vector search where they solve concrete user problems, supported by deterministic fallbacks, caching, and sub-second response times.",
  },
];

export function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">

      {/* ── 1. HERO BIO + PHOTO ── */}
      <section className="grid gap-12 lg:grid-cols-12 lg:items-start">

        {/* Bio Narrative */}
        <motion.div {...fadeUp} className="lg:col-span-7">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 dark:text-zinc-500">
            About / Bio
          </p>

          <h1 className="mt-4 font-display text-[32px] font-bold leading-[1.1] tracking-[-0.03em] text-ink dark:text-white sm:text-[44px] lg:text-[50px]">
            Engineering intelligent systems, robust APIs, and modern web interfaces.
          </h1>

          <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-neutral-600 dark:text-zinc-300">
            <p>
              I’m <strong className="font-semibold text-ink dark:text-white">{site.name}</strong>, a Full Stack Developer and undergraduate Informatics Engineering student at{" "}
              <strong className="font-semibold text-ink dark:text-white">Institut Teknologi Garut (ITG)</strong>.
            </p>
            <p>
              My work spans from building custom Retrieval-Augmented Generation (RAG) search pipelines with Python, ChromaDB, and quantized Qwen models, to architecting multi-role web platforms with React, Node.js, and relational databases.
            </p>
            <p>
              I prefer straightforward, maintainable engineering: strictly typed interfaces, minimal dependency overhead, and applications that load fast and stay dependable in production.
            </p>
          </div>

          {/* Action Links */}
          <div className="mt-8 flex flex-wrap items-center gap-4 pt-2">
            <a
              href={site.cvUrl}
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-ink dark:hover:bg-zinc-200"
            >
              <Download size={15} />
              Download Resume
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-black/15 px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-black/5 dark:border-white/20 dark:text-white dark:hover:bg-white/5"
            >
              <Mail size={15} />
              Get in Touch
            </Link>

            {/* Minimal Social Links */}
            <div className="flex items-center gap-3 pl-2 text-neutral-500 dark:text-zinc-400">
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="transition hover:text-ink dark:hover:text-white"
              >
                <SiGithub size={18} />
              </a>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="transition hover:text-ink dark:hover:text-white"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href={site.instagram}
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="transition hover:text-ink dark:hover:text-white"
              >
                <SiInstagram size={18} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Holographic Portrait Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.32, 0.72, 0, 1] as const }}
          className="flex flex-col items-center justify-center lg:col-span-5"
        >
          <HoloCard
            image="/img/andrebgbiru.webp"
            alt={site.name}
            preset="bursts"
            intensity={0.85}
            scale={1}
            edgeSparkle={0.8}
            glare={0.6}
            radius={16}
            width={360}
            shadow={true}
          />
          <div className="mt-4 flex w-full max-w-[360px] items-center justify-between font-mono text-xs text-neutral-500 dark:text-zinc-500">
            <span>{site.name}</span>
            <span>Garut Kota, ID</span>
          </div>
        </motion.div>
      </section>

      {/* ── 2. EDITORIAL SPECIFICATION GRID (HAIRLINE DIVIDERS) ── */}
      <section className="mt-20 border-t border-black/10 pt-10 dark:border-white/10">
        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {profileDetails.map((item) => (
            <div key={item.label} className="flex flex-col">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400 dark:text-zinc-500">
                {item.label}
              </span>
              <h3 className="mt-2 font-display text-base font-semibold text-ink dark:text-white">
                {item.title}
              </h3>
              <p className="mt-1 font-mono text-xs text-neutral-500 dark:text-zinc-400">
                {item.meta}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 dark:text-zinc-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. HOW I WORK (STRUCTURED NUMBERED LIST) ── */}
      <section className="mt-24 border-t border-black/10 pt-12 dark:border-white/10">
        <SectionHeader
          title="Engineering Approach"
          subtitle="A disciplined methodology for shipping features from specification to production."
        />

        <div className="mt-10 divide-y divide-black/10 border-b border-black/10 dark:divide-white/10 dark:border-white/10">
          {pillars.map((p) => (
            <div
              key={p.index}
              className="grid gap-4 py-8 md:grid-cols-12 md:items-baseline"
            >
              <div className="md:col-span-2">
                <span className="font-mono text-sm font-semibold tracking-wider text-neutral-400 dark:text-zinc-500">
                  [{p.index}]
                </span>
              </div>
              <div className="md:col-span-4">
                <h3 className="font-display text-lg font-semibold tracking-tight text-ink dark:text-white">
                  {p.title}
                </h3>
              </div>
              <div className="md:col-span-6">
                <p className="text-sm leading-relaxed text-neutral-600 dark:text-zinc-400">
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. TECHNICAL SKILLS DIRECTORY ── */}
      <section className="mt-24 border-t border-black/10 pt-12 dark:border-white/10">
        <SectionHeader
          title="Technical Skills"
          subtitle="Curated breakdown of core languages, frameworks, AI vector systems, and developer tooling."
        />
        <div className="mt-8">
          <SkillGroup />
        </div>
      </section>

      {/* ── 5. DIRECT CALL TO ACTION ── */}
      <section className="mt-24 border-t border-black/10 py-12 dark:border-white/10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-baseline">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink dark:text-white">
              Available for new projects & full-time roles
            </h2>
            <p className="mt-1 text-sm text-neutral-500 dark:text-zinc-400">
              Have an idea or looking to hire? I reply within 24 hours.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center gap-1.5 font-display text-sm font-semibold text-ink underline decoration-black/30 underline-offset-4 transition hover:decoration-ink dark:text-white dark:decoration-white/30 dark:hover:decoration-white"
          >
            Contact Mochamad Vicryandre
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

    </div>
  );
}
