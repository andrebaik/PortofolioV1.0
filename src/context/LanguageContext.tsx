import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "en" | "id";
type Ctx = { lang: Language; setLang: (l: Language) => void; t: (key: string) => string };

const STORAGE_KEY = "lang";

const dict: Record<Language, Record<string, string>> = {
  en: {
    // nav
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.gallery": "Gallery",
    "nav.experience": "Experience",
    "nav.contact": "Contact",
    "nav.aiAssistant": "AI Assistant",
    // hero (current)
    "hero.availability": "Available for Work",
    "hero.collab": "Available for Collaboration",
    // home sections
    "home.about.title": "Hi, I'm 7Dynnn.",
    "home.about.subtitle": "I ship products from DB to UI — APIs, dashboards, and storefronts that are fast, accessible, and maintainable.",
    "home.about.desc": "Focused on React + TypeScript on the frontend and Node/Express + PostgreSQL on the backend. Clean contracts, optimistic UI, and deploys that just work on Vercel.",
    "home.about.viewMore": "View More",
    "home.about.downloadCv": "Download CV",
    "home.about.available": "Available for new projects",
    "home.about.reply": "Reply within 24h",
    "home.about.contactMe": "Contact Me",
    "home.stack.kicker": "Tech Stack",
    "home.stack.title": "Stack that ships.",
    "home.stack.subtitle": "Tools I reach for on every serious build.",
    "home.about.kicker": "About",
    "home.about.focus": "Focus",
    "home.about.location": "Location",
    "home.works.kicker": "Selected Works",
    "home.works.title": "Selected Works",
    "home.works.subtitle": "Functional web solutions — accurate, fast, and user-centered.",
    "home.works.viewAll": "View All Projects",
    "home.exp.kicker": "Experience",
    "home.exp.title": "Where I put skills to work.",
    "home.exp.viewAll": "View all →",
    "home.cta.kicker": "Let's talk",
    "home.cta.title": "Got a project idea? Let's make it real.",
    "home.cta.contact": "Contact Me",
    "footer.rights": "All rights reserved.",
  },
  id: {
    "nav.home": "Beranda",
    "nav.about": "Tentang",
    "nav.projects": "Proyek",
    "nav.gallery": "Galeri",
    "nav.experience": "Pengalaman",
    "nav.contact": "Kontak",
    "nav.aiAssistant": "Asisten AI",
    "hero.availability": "Tersedia untuk Kerja",
    "hero.collab": "Tersedia untuk Kolaborasi",
    "home.about.kicker": "Tentang",
    "home.about.title": "Hai, saya 7Dynnn.",
    "home.about.subtitle": "Membangun produk dari DB ke UI — API, dashboard, dan storefront yang cepat, aksesibel, dan mudah dirawat.",
    "home.about.desc": "Fokus di React + TypeScript di frontend dan Node/Express + PostgreSQL di backend. Kontrak yang jelas, UI optimistis, dan deploy yang mulus di Vercel.",
    "home.about.viewMore": "Lihat Selengkapnya",
    "home.about.downloadCv": "Unduh CV",
    "home.about.available": "Tersedia untuk proyek baru",
    "home.about.reply": "Balas dalam 24 jam",
    "home.about.contactMe": "Hubungi Saya",
    "home.stack.kicker": "Tech Stack",
    "home.stack.title": "Stack yang siap produksi.",
    "home.stack.subtitle": "Tools yang saya pakai di setiap build serius.",
    "home.about.focus": "Fokus",
    "home.about.location": "Lokasi",
    "home.works.kicker": "Karya Pilihan",
    "home.works.title": "Karya Pilihan",
    "home.works.subtitle": "Solusi web fungsional — akurat, cepat, dan berpusat pada pengguna.",
    "home.works.viewAll": "Lihat Semua Proyek",
    "home.exp.kicker": "Pengalaman",
    "home.exp.title": "Tempat saya menerapkan keahlian.",
    "home.exp.viewAll": "Lihat semua →",
    "home.cta.kicker": "Mari ngobrol",
    "home.cta.title": "Punya ide proyek? Mari wujudkan.",
    "home.cta.contact": "Hubungi Saya",
    "footer.rights": "Hak cipta dilindungi.",
  },
};

const LanguageContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (k) => k });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved === "en" || saved === "id") return saved;
    return navigator.language.startsWith("id") ? "id" : "en";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: (key: string) => dict[lang][key] ?? dict.en[key] ?? key,
    }),
    [lang],
  );
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
