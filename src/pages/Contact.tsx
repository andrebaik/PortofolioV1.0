import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Clock } from "lucide-react";
import { SiGithub, SiInstagram } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { SlideCommit } from "../components/SlideCommit";
import { Seo } from "../components/Seo";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { site } from "../data/site";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] as const },
};

export function Contact() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);

  const handleConfirm = () => {
    const form = formRef.current;
    if (!form) return;

    const nameInput = form.elements.namedItem("name") as HTMLInputElement | null;
    const emailInput = form.elements.namedItem("email") as HTMLInputElement | null;
    const messageInput = form.elements.namedItem("message") as HTMLTextAreaElement | null;

    if (!nameInput?.value.trim() || !emailInput?.value.trim() || !messageInput?.value.trim()) {
      throw new Error(t("contact.slide.error"));
    }

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const data = new FormData(form);
        const subject = encodeURIComponent(String(data.get("subject") || "Portfolio Inquiry"));
        const body = encodeURIComponent(
          `Sender: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`
        );
        window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
        resolve();
      }, 450);
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
      <Seo path="/contact" title={t("contact.title")} description={t("contact.subtitle")} />
      {/* Header */}
      <motion.div {...fadeUp}>
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 dark:text-zinc-500">
          {t("contact.tag")}
        </p>
        <h1 className="mt-4 font-display text-[32px] font-bold leading-[1.1] tracking-[-0.03em] text-ink dark:text-white sm:text-[44px] lg:text-[50px]">
          {t("contact.title")}
        </h1>
        <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-neutral-600 dark:text-zinc-400">
          {t("contact.subtitle")}
        </p>
      </motion.div>

      {/* Main 2-Column Section */}
      <div className="mt-12 grid gap-12 border-t border-black/10 pt-12 dark:border-white/10 lg:grid-cols-12">

        {/* Contact Info Ledger (5 cols) */}
        <div className="space-y-8 lg:col-span-5">
          <div className="space-y-6 divide-y divide-black/10 dark:divide-white/10">

            {/* Direct Email */}
            <div className="pb-6">
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 dark:text-zinc-500">
                {t("contact.email")}
              </span>
              <a
                href={`mailto:${site.email}`}
                className="mt-2 block font-display text-lg font-bold text-ink underline decoration-black/20 underline-offset-4 transition hover:decoration-ink dark:text-white dark:decoration-white/20 dark:hover:decoration-white"
              >
                {site.email}
              </a>
            </div>

            {/* Location & Timezone */}
            <div className="py-6">
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 dark:text-zinc-500">
                {t("contact.base")}
              </span>
              <p className="mt-2 flex items-center gap-2 font-display text-base font-semibold text-ink dark:text-white">
                <MapPin size={16} className="text-neutral-400" />
                {site.location} (GMT+7)
              </p>
            </div>

            {/* Availability */}
            <div className="py-6">
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 dark:text-zinc-500">
                {t("contact.sla")}
              </span>
              <p className="mt-2 flex items-center gap-2 font-display text-base font-semibold text-ink dark:text-white">
                <Clock size={16} className="text-neutral-400" />
                {t("contact.slaValue")}
              </p>
            </div>

            {/* Social Channels */}
            <div className="pt-6">
              <span className="font-mono text-xs uppercase tracking-wider text-neutral-400 dark:text-zinc-500">
                {t("contact.socials")}
              </span>
              <div className="mt-4 flex flex-col gap-3 font-mono text-xs">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-neutral-600 transition hover:text-ink dark:text-zinc-400 dark:hover:text-white"
                >
                  <SiGithub size={15} /> GitHub / andrebaik <ArrowUpRight size={12} />
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-neutral-600 transition hover:text-ink dark:text-zinc-400 dark:hover:text-white"
                >
                  <FaLinkedin size={15} /> LinkedIn / andrebaik <ArrowUpRight size={12} />
                </a>
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-neutral-600 transition hover:text-ink dark:text-zinc-400 dark:hover:text-white"
                >
                  <SiInstagram size={15} /> Instagram / @andrenrdn_ <ArrowUpRight size={12} />
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* Message Form (7 cols) */}
        <div className="lg:col-span-7">
          <form
            ref={formRef}
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="block font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-zinc-400">
                  {t("contact.form.name")}
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  placeholder="e.g. Andre baik"
                  className="w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-ink dark:border-white/20 dark:bg-zinc-900 dark:text-white dark:focus:border-white"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="block font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-zinc-400">
                  {t("contact.form.email")}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="example@gmail.com"
                  className="w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-ink dark:border-white/20 dark:bg-zinc-900 dark:text-white dark:focus:border-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="block font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-zinc-400">
                {t("contact.form.subject")}
              </label>
              <input
                id="subject"
                name="subject"
                placeholder="Project proposal / Collaboration inquiry"
                className="w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-ink dark:border-white/20 dark:bg-zinc-900 dark:text-white dark:focus:border-white"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="block font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-zinc-400">
                {t("contact.form.message")}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Outline the timeline, technical requirements, or role overview..."
                className="w-full rounded-lg border border-black/15 bg-white px-4 py-3 text-sm text-ink outline-none transition focus:border-ink dark:border-white/20 dark:bg-zinc-900 dark:text-white dark:focus:border-white"
              />
            </div>

            <div className="pt-2">
              <SlideCommit
                label={t("contact.slide.label")}
                doneLabel={t("contact.slide.done")}
                errorLabel={t("contact.slide.error")}
                onConfirm={handleConfirm}
                width={300}
                height={52}
                radius={12}
                speed={50}
                trackColor={theme === "dark" ? "#27272a" : "#e4e4e7"}
                handleColor={theme === "dark" ? "#ffffff" : "#09090b"}
                successColor="#10b981"
                dangerColor="#ef4444"
              />
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
export default Contact;
