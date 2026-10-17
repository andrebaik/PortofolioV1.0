import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Language = "en" | "id";
type Ctx = { lang: Language; setLang: (l: Language) => void; t: (key: string) => string };

const STORAGE_KEY = "lang";

const dict: Record<Language, Record<string, string>> = {
  en: {
    // ── Navigation ──
    "nav.home": "Home",
    "nav.about": "About",
    "nav.projects": "Projects",
    "nav.gallery": "Gallery",
    "nav.experience": "Experience",
    "nav.contact": "Contact",
    "nav.aiAssistant": "AI Assistant",

    // ── Hero ──
    "hero.tagline": "Building fast, accessible web experiences — from text to website.",
    "hero.availability": "Available for Work",
    "hero.collab": "Available for Collaboration",

    // ── Home ──
    "home.about.kicker": "About / Profile",
    "home.about.title": "Mochamad Vicryandre Nurdin",
    "home.about.subtitle": "Full Stack Developer & AI Systems Engineer shipping component-driven web applications and retrieval-augmented systems.",
    "home.about.desc": "Informatics Engineering student and Teaching Assistant at Institut Teknologi Garut. Certified across React, modern JavaScript, and AI fundamentals through Dicoding Indonesia, engineering production web solutions from relational databases to fluid interfaces.",
    "home.about.viewMore": "View More",
    "home.about.downloadCv": "Download CV",
    "home.cap.01.label": "FULL STACK WEB",
    "home.cap.01.title": "End-to-End Application Engineering",
    "home.cap.01.desc": "React 19, TypeScript, Node.js, Express, PostgreSQL, MySQL. Strictly typed API contracts.",
    "home.cap.02.label": "INTELLIGENT SYSTEMS",
    "home.cap.02.title": "RAG & Vector Retrieval Workflows",
    "home.cap.02.desc": "FastAPI, ChromaDB, Qwen 2.5 LLMs, and low-latency streaming endpoints.",
    "home.cap.03.label": "INSTITUTION",
    "home.cap.03.title": "Institut Teknologi Garut (ITG)",
    "home.cap.03.desc": "Undergraduate Informatics Engineering • Focus in software architecture & AI systems.",
    "home.cap.04.label": "STATUS & BASE",
    "home.cap.04.title": "Garut Kota, West Java (GMT+7)",
    "home.cap.04.desc": "Available for engineering roles, technical contracts & collaborative builds globally.",
    "home.marquee.01": "Ready to Work",
    "home.marquee.02": "Open to Collaborate",
    "home.marquee.03": "Available for Projects",
    "home.marquee.04": "Let's Build Together",
    "home.marquee.05": "Hire Me",
    "home.marquee.06": "Full Stack & AI Delivery",
    "home.stack.title": "Stack that ships.",
    "home.stack.subtitle": "Tools I reach for on every serious build.",
    "home.works.title": "Selected Works",
    "home.works.subtitle": "Functional web solutions — accurate, fast, and user-centered.",
    "home.works.viewAll": "View All Projects",
    "home.exp.title": "Where I put skills to work.",
    "home.exp.viewAll": "View all →",

    // ── About ──
    "about.tag": "About / Bio",
    "about.headline": "Full-Stack Developer & AI Systems Engineer bridging modern web architectures with retrieval intelligence.",
    "about.p1": "I’m Mochamad Vicryandre Nurdin, a Full Stack Developer and undergraduate Informatics Engineering student at Institut Teknologi Garut (ITG), where I also serve as a Teaching Assistant for Computer Graphics (OpenGL & WebGL) and Computer Networks.",
    "about.p2": "Certified in modern frontend, JavaScript (ES6+), React, and AI fundamentals through Dicoding Indonesia, my technical journey unites rigorous software engineering foundations with practical production builds. I've designed and shipped specialized systems ranging from Chatbot RAG—integrating Qwen2.5-3B (4-bit quantized), FastAPI, ChromaDB, and SSE streaming with ROUGE benchmark evaluation—to multi-role platforms like Work'in and Xolearn using React 19, Express, MySQL, and PostgreSQL.",
    "about.p3": "From algorithmic logic and semantic UI design to asynchronous backend pipelines and local vector search, I prioritize clean architecture: strictly typed interfaces, deterministic data flow, component-driven modularity, and high-performance delivery.",
    "about.resume": "Download Resume",
    "about.talk": "Get in Touch",
    "about.details.01.label": "EDUCATION & TEACHING",
    "about.details.01.title": "Institut Teknologi Garut",
    "about.details.01.meta": "S1 Teknik Informatika • 2022 – Present",
    "about.details.01.desc": "Undergraduate study focusing on Software Architecture, Intelligent Systems, and Web Engineering. Teaching Assistant for Computer Graphics & Computer Networks, and active developer at HIMATIF ITG.",
    "about.details.02.label": "SPECIALIZATION",
    "about.details.02.title": "Full Stack & Modern Web",
    "about.details.02.meta": "TypeScript • React • Node.js • Express • PostgreSQL",
    "about.details.02.desc": "Certified by Dicoding in modern React, JavaScript ES6+, and responsive web architecture. Designing component-driven SPAs with Express/Node.js backends and relational database schemas.",
    "about.details.03.label": "AI SYSTEMS",
    "about.details.03.title": "RAG & LLM Workflows",
    "about.details.03.meta": "Python • FastAPI • ChromaDB • Qwen 2.5",
    "about.details.03.desc": "Certified in AI fundamentals. Developing Retrieval-Augmented Generation architectures, local vector indexing, and low-latency streaming endpoints evaluated against ROUGE metrics.",
    "about.details.04.label": "COLLABORATION",
    "about.details.04.title": "Garut Kota, Indonesia (GMT+7)",
    "about.details.04.meta": "Remote & On-site Available",
    "about.details.04.desc": "Open for engineering internships, full-time junior developer roles, and freelance contracts with global delivery.",
    "about.pillars.title": "Engineering Approach",
    "about.pillars.subtitle": "A disciplined methodology for shipping features from specification to production.",
    "about.pillar.01.title": "Schema First, Code Second",
    "about.pillar.01.desc": "Designing unambiguous data models, REST/streaming API specifications, and state machines prior to UI implementation. Clear contracts prevent costly architectural rewrites.",
    "about.pillar.02.title": "Full-Cycle Delivery",
    "about.pillar.02.desc": "Bridging complex backend logic to fluid frontends. Every feature is delivered end-to-end with typed data fetching, optimistic UI updates, and zero unnecessary runtime bloat.",
    "about.pillar.03.title": "Pragmatic Intelligence",
    "about.pillar.03.desc": "Leveraging generative AI and vector search where they solve concrete user problems, supported by deterministic fallbacks, caching, and sub-second response times.",
    "about.skills.title": "Technical Skills",
    "about.skills.subtitle": "Curated breakdown of core languages, frameworks, AI vector systems, and developer tooling.",
    "about.cta.title": "Available for new projects & full-time roles",
    "about.cta.subtitle": "Have an idea or looking to hire? I reply within 24 hours.",
    "about.cta.button": "Contact Mochamad Vicryandre",

    // ── Projects ──
    "projects.tag": "Index / Works",
    "projects.title": "Selected Works & Systems",
    "projects.subtitle": "A showcase of full-stack applications, Retrieval-Augmented Generation (RAG) AI engines, and interactive web platforms built for reliability and speed.",
    "projects.viewDetails": "View Details",
    "projects.liveDemo": "Live Demo ↗",
    "projects.githubRepo": "GitHub Repo ↗",
    "projects.caseStudy": "Case Study",
    "projects.tech": "Technologies & Tools",
    "projects.source": "Source Code",
    "projects.visit": "Visit Live",
    "projects.overview": "System Overview & Architecture",
    "projects.back": "Back to all projects",
    "projects.notFound": "Project not found",
    "projects.notFoundDesc": "The requested project does not exist.",

    // ── Gallery ──
    "gallery.tag": "Archive / Personal Moments",
    "gallery.title": "Personal Gallery",
    "gallery.subtitle": "A personal visual space to preserve candid memories, everyday snapshots, and moments outside of code. Move your cursor to steer the perspective; click any frame to view full size.",

    // ── Experience ──
    "experience.tag": "History / Career",
    "experience.title": "Experience & Field Work",
    "experience.subtitle": "A track record of engineering full-stack platforms, village public service applications, and instructional lab assistance.",
    "experience.cv.title": "Need a complete curriculum vitae?",
    "experience.cv.subtitle": "Download the comprehensive PDF with verified credentials and coursework.",
    "experience.cv.button": "Download Full CV",

    // ── Contact ──
    "contact.tag": "Inquiries / Communication",
    "contact.title": "Initiate Contact",
    "contact.subtitle": "Have an upcoming web project, an AI architecture to discuss, or an engineering role open on your team? Send a direct dispatch below.",
    "contact.email": "Direct Email",
    "contact.base": "Base & Timezone",
    "contact.sla": "Response SLA",
    "contact.slaValue": "Replies within 24 hours",
    "contact.socials": "Connected Profiles",
    "contact.form.name": "Your Name *",
    "contact.form.email": "Email Address *",
    "contact.form.subject": "Subject",
    "contact.form.message": "Message & Scope *",
    "contact.slide.label": "Slide to dispatch message",
    "contact.slide.done": "Dispatched",
    "contact.slide.error": "Fill required fields",

    // ── AI Assistant ──
    "ai.tag": "Console / Agent Interface",
    "ai.title": "Interactive Query Console",
    "ai.subtitle": "Query the portfolio database directly for information on architecture, published projects, and engineering capabilities.",
    "ai.online": "ONLINE",
    "ai.initialMsg": "System ready. I am Mochamad Vicryandre's portfolio console agent. Ask about full-stack projects, AI implementations, or contact information.",
    "ai.suggested": "Suggested Queries:",
    "ai.placeholder": "Query projects, tech stack, or contact...",
    "ai.run": "Run",

    // ── Footer ──
    "footer.collab": "End of Line // Collaboration",
    "footer.headline": "Let’s build something remarkable.",
    "footer.desc": "Open for full-stack engineering roles, technical internships, and innovative AI web projects.",
    "footer.top": "Back to top",
    "footer.directory": "Directory",
    "footer.connect": "Connect & Source",
    "footer.status": "Available for Opportunities",
    "footer.rights": "All rights reserved.",
  },

  id: {
    // ── Navigasi ──
    "nav.home": "Beranda",
    "nav.about": "Tentang",
    "nav.projects": "Proyek",
    "nav.gallery": "Galeri",
    "nav.experience": "Pengalaman",
    "nav.contact": "Kontak",
    "nav.aiAssistant": "Asisten AI",

    // ── Hero ──
    "hero.tagline": "Membangun pengalaman web yang cepat dan aksesibel — dari teks hingga situs web.",
    "hero.availability": "Tersedia untuk Kerja",
    "hero.collab": "Tersedia untuk Kolaborasi",

    // ── Home ──
    "home.about.kicker": "Tentang / Profil",
    "home.about.title": "Mochamad Vicryandre Nurdin",
    "home.about.subtitle": "Full Stack Developer & AI Systems Engineer yang membangun aplikasi web berbasis komponen dan sistem kecerdasan retrieval.",
    "home.about.desc": "Mahasiswa S1 Teknik Informatika dan Asisten Dosen di Institut Teknologi Garut. Tersertifikasi dalam React, JavaScript modern, dan AI melalui Dicoding Indonesia, mengembangkan solusi web produksi dari database relasional hingga antarmuka responsif.",
    "home.about.viewMore": "Lihat Selengkapnya",
    "home.about.downloadCv": "Unduh CV",
    "home.cap.01.label": "FULL STACK WEB",
    "home.cap.01.title": "Rekayasa Aplikasi Ujung-ke-Ujung",
    "home.cap.01.desc": "React 19, TypeScript, Node.js, Express, PostgreSQL, MySQL. Kontrak API bertipe ketat.",
    "home.cap.02.label": "SISTEM CERDAS",
    "home.cap.02.title": "Alur Kerja RAG & Pencarian Vektor",
    "home.cap.02.desc": "FastAPI, ChromaDB, LLM Qwen 2.5, dan streaming response berlatensi rendah.",
    "home.cap.03.label": "INSTITUSI",
    "home.cap.03.title": "Institut Teknologi Garut (ITG)",
    "home.cap.03.desc": "S1 Teknik Informatika • Fokus pada arsitektur perangkat lunak & sistem AI.",
    "home.cap.04.label": "STATUS & LOKASI",
    "home.cap.04.title": "Garut Kota, Jawa Barat (GMT+7)",
    "home.cap.04.desc": "Tersedia untuk posisi engineer, proyek kontrak, dan kolaborasi jarak jauh secara global.",
    "home.marquee.01": "Siap Bekerja",
    "home.marquee.02": "Terbuka Kolaborasi",
    "home.marquee.03": "Tersedia untuk Proyek",
    "home.marquee.04": "Mari Membangun Bersama",
    "home.marquee.05": "Rekrut Saya",
    "home.marquee.06": "Solusi Full Stack & AI",
    "home.stack.title": "Stack yang siap produksi.",
    "home.stack.subtitle": "Tools yang saya andalkan pada setiap build serius.",
    "home.works.title": "Karya Pilihan",
    "home.works.subtitle": "Solusi web fungsional — akurat, cepat, dan berpusat pada pengguna.",
    "home.works.viewAll": "Lihat Semua Proyek",
    "home.exp.title": "Tempat saya menerapkan keahlian.",
    "home.exp.viewAll": "Lihat semua →",

    // ── About ──
    "about.tag": "Tentang / Profil",
    "about.headline": "Full-Stack Developer & AI Systems Engineer yang memadukan arsitektur web modern dengan sistem kecerdasan retrieval.",
    "about.p1": "Saya Mochamad Vicryandre Nurdin, seorang Full Stack Developer dan mahasiswa S1 Teknik Informatika di Institut Teknologi Garut (ITG), sekaligus Asisten Dosen Praktikum Grafik Komputer (OpenGL & WebGL) dan Jaringan Komputer.",
    "about.p2": "Tersertifikasi resmi dalam pengembangan web modern, JavaScript (ES6+), React, hingga kecerdasan buatan (AI) melalui Dicoding Indonesia, fokus rekayasa saya menggabungkan fondasi logika pemrograman dengan implementasi produksi nyata. Portofolio saya mencakup arsitektur Chatbot RAG (LLM Qwen2.5-3B, FastAPI, ChromaDB, dan streaming SSE dengan evaluasi ROUGE), platform rekrutmen Work'in (React 19, Express, MySQL), hingga platform diagnostik Xolearn berbasis PostgreSQL.",
    "about.p3": "Mulai dari logika komputasi, UI semantik responsif, alur kerja asynchronous backend, hingga pencarian vektor lokal, saya mengutamakan prinsip clean architecture: kontrak antarmuka bertipe ketat (TypeScript), modularitas komponen terisolasi, serta aplikasi yang cepat dan tangguh saat digunakan.",
    "about.resume": "Unduh Resume",
    "about.talk": "Mari Terhubung",
    "about.details.01.label": "PENDIDIKAN & ASISTEN DOSEN",
    "about.details.01.title": "Institut Teknologi Garut",
    "about.details.01.meta": "S1 Teknik Informatika • 2022 – Sekarang",
    "about.details.01.desc": "Studi sarjana berfokus pada Arsitektur Perangkat Lunak, Sistem Cerdas, dan Rekayasa Web. Asisten Dosen Praktikum Grafik Komputer & Jaringan Komputer serta pengembang aktif di HIMATIF ITG.",
    "about.details.02.label": "SPESIALISASI",
    "about.details.02.title": "Full Stack & Web Modern",
    "about.details.02.meta": "TypeScript • React • Node.js • Express • PostgreSQL",
    "about.details.02.desc": "Tersertifikasi oleh Dicoding dalam React modern, JavaScript ES6+, dan arsitektur web responsif. Merancang SPA berbasis komponen modular dengan backend Express/Node.js dan skema database relasional.",
    "about.details.03.label": "SISTEM AI",
    "about.details.03.title": "Alur Kerja RAG & LLM",
    "about.details.03.meta": "Python • FastAPI • ChromaDB • Qwen 2.5",
    "about.details.03.desc": "Tersertifikasi dalam dasar AI. Mengembangkan arsitektur Retrieval-Augmented Generation, pengindeksan vektor lokal, dan endpoint streaming latensi rendah yang dievaluasi dengan skor ROUGE.",
    "about.details.04.label": "KOLABORASI",
    "about.details.04.title": "Garut Kota, Indonesia (GMT+7)",
    "about.details.04.meta": "Tersedia Remote & On-site",
    "about.details.04.desc": "Terbuka untuk program magang engineering, peran junior developer full-time, dan kontrak freelance.",
    "about.pillars.title": "Pendekatan Rekayasa",
    "about.pillars.subtitle": "Metodologi terarah untuk mewujudkan fitur dari spesifikasi hingga siap produksi.",
    "about.pillar.01.title": "Skema Terlebih Dahulu, Kode Kemudian",
    "about.pillar.01.desc": "Merancang model data yang jelas, spesifikasi REST/streaming API, dan alur status sebelum membuat UI. Kontrak yang jelas mencegah perombakan arsitektur di kemudian hari.",
    "about.pillar.02.title": "Pengiriman Menyeluruh",
    "about.pillar.02.desc": "Menjembatani logika backend kompleks dengan antarmuka yang lancar. Setiap fitur diselesaikan end-to-end dengan fetching data bertipe dan update UI optimis.",
    "about.pillar.03.title": "Kecerdasan Pragmatis",
    "about.pillar.03.desc": "Memanfaatkan generative AI dan pencarian vektor untuk memecahkan masalah pengguna secara nyata, didukung fallback deterministik, caching, dan respon secepat kilat.",
    "about.skills.title": "Keahlian Teknis",
    "about.skills.subtitle": "Rincian bahasa pemrograman, framework, sistem vektor AI, dan tools yang saya gunakan.",
    "about.cta.title": "Tersedia untuk proyek baru & posisi full-time",
    "about.cta.subtitle": "Punya ide proyek atau ingin merekrut? Saya membalas dalam 24 jam.",
    "about.cta.button": "Hubungi Mochamad Vicryandre",

    // ── Proyek ──
    "projects.tag": "Indeks / Karya",
    "projects.title": "Karya & Sistem Pilihan",
    "projects.subtitle": "Etalase aplikasi full-stack, mesin AI Retrieval-Augmented Generation (RAG), dan platform web interaktif yang dibangun untuk keandalan dan kecepatan.",
    "projects.viewDetails": "Lihat Detail",
    "projects.liveDemo": "Demo Langsung ↗",
    "projects.githubRepo": "Repositori GitHub ↗",
    "projects.caseStudy": "Studi Kasus",
    "projects.tech": "Teknologi & Perangkat",
    "projects.source": "Kode Sumber",
    "projects.visit": "Kunjungi Situs",
    "projects.overview": "Ikhtisar Sistem & Arsitektur",
    "projects.back": "Kembali ke semua proyek",
    "projects.notFound": "Proyek tidak ditemukan",
    "projects.notFoundDesc": "Proyek yang Anda cari tidak tersedia.",

    // ── Galeri ──
    "gallery.tag": "Arsip / Momen Pribadi",
    "gallery.title": "Galeri Pribadi",
    "gallery.subtitle": "Ruang visual pribadi untuk menyimpan kenangan, momen keseharian, dan jepretan foto di luar rutinitas coding. Gerakkan kursor untuk mengarahkan perspektif 3D; klik foto mana pun untuk melihat ukuran penuh.",

    // ── Pengalaman ──
    "experience.tag": "Riwayat / Karier",
    "experience.title": "Pengalaman & Karya Lapangan",
    "experience.subtitle": "Rekam jejak rekayasa platform full-stack, aplikasi layanan publik desa, dan asisten laboratorium komputer.",
    "experience.cv.title": "Memerlukan Curriculum Vitae lengkap?",
    "experience.cv.subtitle": "Unduh PDF komprehensif berisi kredensial dan riwayat akademik terverifikasi.",
    "experience.cv.button": "Unduh CV Lengkap",

    // ── Kontak ──
    "contact.tag": "Pertanyaan / Komunikasi",
    "contact.title": "Mulai Terhubung",
    "contact.subtitle": "Punya proyek web yang akan datang, arsitektur AI yang ingin didiskusikan, atau posisi engineer di tim Anda? Kirim pesan langsung di bawah.",
    "contact.email": "Email Langsung",
    "contact.base": "Lokasi & Zona Waktu",
    "contact.sla": "Standar Respon",
    "contact.slaValue": "Balas dalam 24 jam",
    "contact.socials": "Profil Terhubung",
    "contact.form.name": "Nama Anda *",
    "contact.form.email": "Alamat Email *",
    "contact.form.subject": "Subjek",
    "contact.form.message": "Pesan & Lingkup Proyek *",
    "contact.slide.label": "Geser untuk kirim pesan",
    "contact.slide.done": "Terkirim",
    "contact.slide.error": "Lengkapi data wajib",

    // ── Asisten AI ──
    "ai.tag": "Konsol / Antarmuka Agen",
    "ai.title": "Konsol Kueri Interaktif",
    "ai.subtitle": "Kueri langsung database portofolio untuk informasi arsitektur, proyek yang dirilis, dan kapabilitas teknis.",
    "ai.online": "AKTIF",
    "ai.initialMsg": "Sistem siap. Saya agen konsol portofolio Mochamad Vicryandre. Tanyakan tentang proyek full-stack, implementasi AI, atau kontak.",
    "ai.suggested": "Saran Kueri:",
    "ai.placeholder": "Kueri proyek, tech stack, atau kontak...",
    "ai.run": "Kirim",

    // ── Footer ──
    "footer.collab": "Penutup // Kolaborasi",
    "footer.headline": "Mari bangun sesuatu yang luar biasa.",
    "footer.desc": "Terbuka untuk posisi full-stack engineer, magang teknis, dan proyek web AI inovatif.",
    "footer.top": "Kembali ke atas",
    "footer.directory": "Direktori",
    "footer.connect": "Koneksi & Sumber",
    "footer.status": "Tersedia untuk Kolaborasi",
    "footer.rights": "Hak cipta dilindungi.",
  },
};

const LanguageContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (k) => k });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window === "undefined") return "en";
    const saved = localStorage.getItem(STORAGE_KEY) as Language | null;
    if (saved === "en" || saved === "id") return saved;
    return "en";
  });

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: (key: string) => dict[lang][key] ?? dict.en[key] ?? key,
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}
