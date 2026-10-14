import { site } from "../data/site";
import { useLanguage } from "../context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="border-t border-black/5 bg-white dark:border-white/10 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-10 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.7fr_0.7fr]">
          <div>
            <p className="font-display text-[15px] font-bold tracking-tight dark:text-white">{site.name}</p>
            <p className="mt-2 max-w-[36ch] text-sm leading-6 text-neutral-500 dark:text-zinc-400">{site.tagline}</p>
            <p className="mt-3 text-xs text-neutral-400 dark:text-zinc-500">📍 {site.location}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400 dark:text-zinc-500">Quick links</p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-neutral-600 dark:text-zinc-400">
              <a href="/" className="hover:text-ink dark:hover:text-white">{t("nav.home")}</a>
              <a href="/projects" className="hover:text-ink dark:hover:text-white">{t("nav.projects")}</a>
              <a href="/experience" className="hover:text-ink dark:hover:text-white">{t("nav.experience")}</a>
              <a href="/contact" className="hover:text-ink dark:hover:text-white">{t("nav.contact")}</a>
            </div>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400 dark:text-zinc-500">Connect</p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-neutral-600 dark:text-zinc-400">
              <a href={site.github} className="hover:text-ink dark:hover:text-white">GitHub</a>
              <a href={site.linkedin} className="hover:text-ink dark:hover:text-white">LinkedIn</a>
              <a href={`mailto:${site.email}`} className="hover:text-ink dark:hover:text-white">Email</a>
              <a href={site.cvUrl} className="hover:text-ink dark:hover:text-white">Resume</a>
            </div>
          </div>
        </div>
        <p className="mt-10 border-t border-black/5 pt-6 text-center text-xs text-neutral-400 dark:border-white/10 dark:text-zinc-500">
          © {new Date().getFullYear()} {site.name} • {t("footer.rights")} • Built with React • Tailwind • Framer Motion • Vercel
        </p>
      </div>
    </footer>
  );
}
