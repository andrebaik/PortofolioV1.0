import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ui/theme-toggle";
import { navLinks } from "../data/site";
import { useLanguage } from "../context/LanguageContext";
import RubberSegment from "./RubberSegment";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const activeValue = (() => {
    const idx = navLinks.findIndex((n) => (n.href === "/" ? pathname === "/" : pathname.startsWith(n.href)));
    if (idx >= 0) return t(navLinks[idx]!.i18nKey).toUpperCase();
    return t(navLinks[0]!.i18nKey).toUpperCase();
  })() as string;

  function handleNavClick(href: string) {
    if (href === "/") {
      if (pathname !== "/") {
        navigate("/");
        requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: "smooth" }));
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      setOpen(false);
      return;
    }
    navigate(href);
    setOpen(false);
  }

  return (
    <>
      <header className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-[999] w-[94vw] max-w-5xl xl:max-w-6xl">
        <div className="w-full flex items-center justify-between gap-3 bg-[#0a0a0e]/95 backdrop-blur-xl rounded-full px-3 py-1.5 sm:px-4 sm:py-2 shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
          <div className="flex items-center flex-1 justify-start">
            <Link to="/" aria-label="Home" className="flex items-center">
              <img src="/favicon.ico" alt="Logo" className="h-8 w-8 rounded-full object-contain bg-white p-1" width={32} height={32} />
            </Link>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <RubberSegment
              items={navLinks.map((n) => ({ value: t(n.i18nKey).toUpperCase(), label: t(n.i18nKey).toUpperCase() }))}
              value={activeValue}
              onChange={(_, idx) => handleNavClick(navLinks[idx]!.href)}
              trackColor="#1a1a1e"
              thumbColor="#fafafa"
              textColor="#fafafa"
              activeTextColor="#0a0a0e"
              size="md"
              radius={999}
              inset={3}
              equalSlots={false}
              stretch={90}
              squash={3}
              speed={1}
              glide={75}
              draggable
              aria-label="Primary navigation"
            />
          </div>

          <div className="flex items-center flex-1 justify-end gap-2">
            <div className="hidden sm:flex items-center gap-1 text-xs font-semibold tracking-wide">
              <button type="button" onClick={() => setLang("id")} aria-label="Bahasa Indonesia" className={`px-1.5 py-0.5 rounded transition-colors ${lang === "id" ? "text-white" : "text-white/40 hover:text-white/80"}`}>
                ID
              </button>
              <span className="text-white/20">/</span>
              <button type="button" onClick={() => setLang("en")} aria-label="English" className={`px-1.5 py-0.5 rounded transition-colors ${lang === "en" ? "text-white" : "text-white/40 hover:text-white/80"}`}>
                EN
              </button>
              <span className="mx-1 h-4 w-px bg-white/20" aria-hidden />
            </div>
            <ThemeToggle />
            <button onClick={() => setOpen((v) => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} className="relative flex h-9 w-9 items-center justify-center rounded-full bg-white text-black md:hidden">
              <span className={`absolute h-0.5 w-4 bg-black transition duration-300 ${open ? "rotate-45" : "-translate-y-1.5"}`} />
              <span className={`absolute h-0.5 w-4 bg-black transition duration-300 ${open ? "-rotate-45" : "translate-y-1.5"}`} />
            </button>
          </div>
        </div>
      </header>

      <div aria-hidden className="h-[72px] sm:h-[76px]" />

      <AnimatePresence>
        {open ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[998] bg-white/85 backdrop-blur-3xl dark:bg-zinc-950/85 md:hidden" onClick={() => setOpen(false)}>
            <div className="mx-auto flex min-h-screen w-[92vw] max-w-md flex-col px-6 py-10 pt-24" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => setLang("id")} className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition ${lang === "id" ? "bg-black text-white ring-black dark:bg-white dark:text-black" : "bg-white text-black/60 ring-black/10 dark:bg-zinc-900 dark:text-white/60 dark:ring-white/10"}`}>
                    ID
                  </button>
                  <button type="button" onClick={() => setLang("en")} className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition ${lang === "en" ? "bg-black text-white ring-black dark:bg-white dark:text-black" : "bg-white text-black/60 ring-black/10 dark:bg-zinc-900 dark:text-white/60 dark:ring-white/10"}`}>
                    EN
                  </button>
                  <ThemeToggle />
                </div>
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white dark:bg-white dark:text-black">
                  ✕
                </button>
              </div>
              <nav className="mt-8 flex flex-col">
                {navLinks.map((n) => (
                  <button key={n.href} type="button" onClick={() => handleNavClick(n.href)} className="border-b border-black/5 py-4 text-left font-display text-2xl font-semibold tracking-tight dark:border-white/10 dark:text-white">
                    {t(n.i18nKey)}
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
