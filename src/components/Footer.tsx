import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowUp, MapPin } from "lucide-react";
import { SiGithub, SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { site, navLinks } from "../data/site";
import { useLanguage } from "../context/LanguageContext";

const CURRENT_YEAR = 2026;
const WORDMARK_LETTERS = "VICRYANDRE".split("");


export function Footer() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-black/10 bg-white transition-colors duration-300 dark:border-white/10 dark:bg-[#070709]">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        {/* Top Header: Editorial Callout & Back to Top */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-black/10 pb-16 dark:border-white/10 md:flex-row md:items-end">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 dark:text-zinc-500">
              {t("footer.collab")}
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink dark:text-white sm:text-4xl md:text-5xl">
              {t("footer.headline")}
            </h2>
            <p className="mt-3 max-w-xl text-base text-neutral-600 dark:text-zinc-400">
              {t("footer.desc")}
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 rounded-lg border border-black/15 px-4 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-ink transition hover:bg-black/5 dark:border-white/20 dark:text-white dark:hover:bg-white/5"
            aria-label="Back to top"
          >
            <span>{t("footer.top")}</span>
            <ArrowUp size={14} className="transition group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Middle Navigation & Directory Grid */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Identity & Bio (5 cols) */}
          <div className="space-y-4 lg:col-span-5">
            <h3 className="font-display text-lg font-bold tracking-tight text-ink dark:text-white">
              {site.name}
            </h3>
            <p className="max-w-sm text-sm leading-relaxed text-neutral-600 dark:text-zinc-400">
              {t("hero.tagline")}
            </p>
            <div className="flex flex-col gap-2 pt-2 font-mono text-xs text-neutral-500 dark:text-zinc-400">
              <span className="flex items-center gap-2">
                <MapPin size={13} />
                <span>{site.location} (GMT+7)</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>{t("footer.status")}</span>
              </span>
            </div>
          </div>

          {/* Directory Links (3 cols) */}
          <div className="lg:col-span-3">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 dark:text-zinc-500">
              {t("footer.directory")}
            </p>
            <ul className="mt-5 space-y-2.5 text-sm font-medium">
              {navLinks.map((n) => (
                <li key={n.href}>
                  <Link
                    to={n.href}
                    className="text-neutral-600 transition hover:text-ink dark:text-zinc-400 dark:hover:text-white"
                  >
                    {t(n.i18nKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Dispatch (4 cols) */}
          <div className="lg:col-span-4">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400 dark:text-zinc-500">
              {t("footer.connect")}
            </p>
            <ul className="mt-5 space-y-3 font-mono text-xs">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="group flex items-center justify-between text-neutral-600 transition hover:text-ink dark:text-zinc-400 dark:hover:text-white"
                >
                  <span>Email / {site.email}</span>
                  <ArrowUpRight size={13} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
              <li>
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between text-neutral-600 transition hover:text-ink dark:text-zinc-400 dark:hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <SiGithub size={13} /> GitHub / andrebaik
                  </span>
                  <ArrowUpRight size={13} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between text-neutral-600 transition hover:text-ink dark:text-zinc-400 dark:hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <FaLinkedin size={13} /> LinkedIn / andrebaik
                  </span>
                  <ArrowUpRight size={13} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
              <li>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between text-neutral-600 transition hover:text-ink dark:text-zinc-400 dark:hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    <SiInstagram size={13} /> Instagram / @andrebaik
                  </span>
                  <ArrowUpRight size={13} className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Giant Dynamic Light Wave Brand Signature */}
        <div className="relative overflow-hidden border-t border-black/10 pt-12 pb-6 select-none dark:border-white/10">
          <p className="flex flex-wrap justify-center font-display text-[clamp(2.5rem,8vw,7rem)] font-black uppercase leading-none tracking-[-0.04em] sm:justify-start">
            {WORDMARK_LETTERS.map((char, i) => (
              <motion.span
                key={i}
                className="inline-block transition-transform duration-200"
                animate={{
                  color: isDark
                    ? ["#27272a", "#3f3f46", "#ffffff", "#D6FF2A", "#ffffff", "#3f3f46", "#27272a"]
                    : ["#e4e4e7", "#a1a1aa", "#09090b", "#18181b", "#09090b", "#a1a1aa", "#e4e4e7"],
                  y: [0, 0, -8, -12, -8, 0, 0],
                  scale: [1, 1, 1.05, 1.08, 1.05, 1, 1],
                  filter: isDark
                    ? [
                        "drop-shadow(0 0 0px rgba(214,255,42,0))",
                        "drop-shadow(0 0 4px rgba(214,255,42,0.25))",
                        "drop-shadow(0 0 24px rgba(214,255,42,0.85)) drop-shadow(0 0 45px rgba(255,255,255,0.6))",
                        "drop-shadow(0 0 32px rgba(214,255,42,1)) drop-shadow(0 0 60px rgba(255,255,255,0.75))",
                        "drop-shadow(0 0 24px rgba(214,255,42,0.85)) drop-shadow(0 0 45px rgba(255,255,255,0.6))",
                        "drop-shadow(0 0 4px rgba(214,255,42,0.25))",
                        "drop-shadow(0 0 0px rgba(214,255,42,0))",
                      ]
                    : [
                        "drop-shadow(0 0 0px rgba(0,0,0,0))",
                        "drop-shadow(0 0 2px rgba(0,0,0,0.1))",
                        "drop-shadow(0 0 14px rgba(0,0,0,0.3))",
                        "drop-shadow(0 0 18px rgba(0,0,0,0.4))",
                        "drop-shadow(0 0 14px rgba(0,0,0,0.3))",
                        "drop-shadow(0 0 2px rgba(0,0,0,0.1))",
                        "drop-shadow(0 0 0px rgba(0,0,0,0))",
                      ],
                }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  delay: i * 0.16,
                  times: [0, 0.28, 0.44, 0.5, 0.56, 0.72, 1],
                  ease: "easeInOut",
                }}
              >
                {char}
              </motion.span>
            ))}
          </p>
        </div>

        {/* Bottom Colophon Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-black/5 pt-6 font-mono text-xs text-neutral-400 dark:border-white/5 dark:text-zinc-500 sm:flex-row">
          <span>
            © {CURRENT_YEAR} {site.name}. {t("footer.rights")}
          </span>
          <span className="flex items-center gap-2">
            <span>BUILT WITH REACT 19 • TAILWIND • WEBGL</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
