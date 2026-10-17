import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowUpRight, Download, Mail, ExternalLink, ShieldCheck } from "lucide-react";
import { SiGithub, SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { SectionHeader } from "../components/SectionHeader";
import { SkillGroup } from "../components/SkillGroup";
import { HoloCard } from "../components/HoloCard";
import { site } from "../data/site";
import { certificates } from "../data/certificates";
import { useLanguage } from "../context/LanguageContext";
const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] as const },
};

export function About() {
  const { t, lang } = useLanguage();
  const isId = lang === "id";

  const profileDetails = [
    {
      label: t("about.details.01.label"),
      title: t("about.details.01.title"),
      meta: t("about.details.01.meta"),
      desc: t("about.details.01.desc"),
    },
    {
      label: t("about.details.02.label"),
      title: t("about.details.02.title"),
      meta: t("about.details.02.meta"),
      desc: t("about.details.02.desc"),
    },
    {
      label: t("about.details.03.label"),
      title: t("about.details.03.title"),
      meta: t("about.details.03.meta"),
      desc: t("about.details.03.desc"),
    },
    {
      label: t("about.details.04.label"),
      title: t("about.details.04.title"),
      meta: t("about.details.04.meta"),
      desc: t("about.details.04.desc"),
    },
  ];

  const pillars = [
    {
      index: "01",
      title: t("about.pillar.01.title"),
      desc: t("about.pillar.01.desc"),
    },
    {
      index: "02",
      title: t("about.pillar.02.title"),
      desc: t("about.pillar.02.desc"),
    },
    {
      index: "03",
      title: t("about.pillar.03.title"),
      desc: t("about.pillar.03.desc"),
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">

      {/* ── 1. HERO BIO + PHOTO ── */}
      <section className="grid gap-12 lg:grid-cols-12 lg:items-start">

        {/* Bio Narrative */}
        <motion.div {...fadeUp} className="lg:col-span-7">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 dark:text-zinc-500">
            {t("about.tag")}
          </p>

          <h1 className="mt-4 font-display text-[32px] font-bold leading-[1.1] tracking-[-0.03em] text-ink dark:text-white sm:text-[44px] lg:text-[50px]">
            {t("about.headline")}
          </h1>

          <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-neutral-600 dark:text-zinc-300">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
          </div>

          {/* Action Links */}
          <div className="mt-8 flex flex-wrap items-center gap-4 pt-2">
            <a
              href={site.cvUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-ink dark:hover:bg-zinc-200"
            >
              <Download size={15} />
              {t("about.resume")}
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg border border-black/15 px-5 py-2.5 text-sm font-medium text-ink transition hover:bg-black/5 dark:border-white/20 dark:text-white dark:hover:bg-white/5"
            >
              <Mail size={15} />
              {t("about.talk")}
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
          title={t("about.pillars.title")}
          subtitle={t("about.pillars.subtitle")}
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
          title={t("about.skills.title")}
          subtitle={t("about.skills.subtitle")}
        />
        <div className="mt-8">
          <SkillGroup />
        </div>
      </section>

      {/* ── 5. CERTIFICATIONS & CREDENTIALS ── */}
      <section className="mt-24 border-t border-black/10 pt-12 dark:border-white/10">
        <SectionHeader
          title={isId ? "SERTIFIKASI RESMI" : "VERIFIED CREDENTIALS"}
          subtitle={
            isId
              ? "Validasi kompetensi teknis dari Dicoding Indonesia — terakreditasi dan terverifikasi secara publik."
              : "Industry-accredited technical certifications from Dicoding Indonesia."
          }
        />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="group relative flex flex-col justify-between rounded-2xl border border-black/[0.08] bg-white/70 p-5 shadow-xs transition-all duration-200 hover:border-black/20 hover:bg-white hover:shadow-sm dark:border-white/[0.08] dark:bg-zinc-900/60 dark:hover:border-white/20 dark:hover:bg-zinc-900"
            >
              <div>
                {/* Certificate Preview Image */}
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative mb-4 overflow-hidden rounded-xl border border-black/5 dark:border-white/10 bg-neutral-100 dark:bg-zinc-800 aspect-[16/11] group-hover:shadow-md transition-shadow"
                >
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 flex items-end p-3">
                    <span className="text-[11px] font-mono text-white flex items-center gap-1.5 font-medium">
                      <ExternalLink size={12} /> {isId ? "Buka Verifikasi Resmi" : "View Credential"}
                    </span>
                  </div>
                </a>

                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-700 dark:text-emerald-400">
                    <ShieldCheck size={12} className="shrink-0" />
                    <span>{cert.issuer}</span>
                  </span>
                  <span className="font-mono text-[11px] text-neutral-400 dark:text-zinc-500">
                    ID: {cert.credentialId}
                  </span>
                </div>

                <h3 className="font-display text-base font-bold tracking-tight text-ink dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {cert.title}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-neutral-600 dark:text-zinc-400">
                  {cert.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cert.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-md border border-black/5 bg-neutral-100/80 px-2 py-0.5 font-mono text-[10px] text-neutral-600 dark:border-white/5 dark:bg-zinc-800/80 dark:text-zinc-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between pt-3.5 border-t border-black/5 dark:border-white/5">
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-900 px-3.5 py-2 font-mono text-xs font-medium text-white transition hover:bg-neutral-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white"
                >
                  <span>{isId ? "Verifikasi Kredensial" : "Verify Credential"}</span>
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* ── 6. DIRECT CALL TO ACTION ── */}
      <section className="mt-24 border-t border-black/10 py-12 dark:border-white/10">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-baseline">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight text-ink dark:text-white">
              {t("about.cta.title")}
            </h2>
            <p className="mt-1 text-sm text-neutral-500 dark:text-zinc-400">
              {t("about.cta.subtitle")}
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex shrink-0 items-center gap-1.5 font-display text-sm font-semibold text-ink underline decoration-black/30 underline-offset-4 transition hover:decoration-ink dark:text-white dark:decoration-white/30 dark:hover:decoration-white"
          >
            {t("about.cta.button")}
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

    </div>
  );
}
export default About;
