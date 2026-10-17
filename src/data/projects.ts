export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tags: string[];
  image: string;
  links: { github?: string; live?: string };
};

export const projects: Project[] = [
  {
    slug: "chatbot-rag-ai",
    title: "Chatbot RAG (Qwen2.5 + FastAPI)",
    category: "AI & Full Stack",
    description: "Sistem AI Chatbot RAG berbahasa Indonesia dengan LLM Qwen2.5-3B, ChromaDB vector store, dan streaming response.",
    longDescription: "Aplikasi Retrieval-Augmented Generation (RAG) cerdas yang menggabungkan model LLM Qwen2.5-3B-Instruct (4-bit quantized) dengan ChromaDB untuk menjawab pertanyaan berbasis dokumen PDF secara akurat. Backend dibangun menggunakan FastAPI dengan arsitektur streaming SSE, diintegrasikan ke antarmuka web modern React dan TailwindCSS dengan evaluasi skor ROUGE.",
    tags: ["Python", "FastAPI", "ChromaDB", "Qwen 2.5", "RAG", "React", "TailwindCSS"],
    image: "/img/chatbot.webp",
    links: { github: "https://github.com/andrebaik/UAS-KecerdasanBuatan.git" },
  },
  {
    slug: "workin-job-board",
    title: "Work'in — Job Board Platform",
    category: "Full Stack Web",
    description: "Platform pencarian kerja dan manajemen lowongan multi-role (Seeker, Employer, Admin) dengan tracking real-time.",
    longDescription: "Solusi platform rekrutmen lengkap yang menghubungkan pencari kerja dengan perusahaan. Dilengkapi autentikasi berbasis peran (Job Seeker, Employer, Admin), posting lowongan interaktif, sistem pelacakan lamaran kerja real-time, dan dashboard analitik manajemen talenta dengan performa tinggi berbasis Express.js dan MySQL.",
    tags: ["React 19", "Express.js", "MySQL", "TailwindCSS", "Node.js", "Vite"],
    image: "/img/job-board.webp",
    links: { github: "https://github.com/andrebaik/Job-Board.git", live: "https://job-board-tau-rosy.vercel.app" },
  },
  {
    slug: "xolearn-diagnostic-platform",
    title: "Xolearn — Diagnostic Learning Platform",
    category: "EdTech & Web",
    description: "Platform Evidence-Based Learning Diagnostic untuk memetakan asesmen konsep, mendeteksi gap, dan remediasi terarah.",
    longDescription: "Platform diagnostik pembelajaran adaptif yang menganalisis bukti jawaban siswa untuk mengidentifikasi akar kelemahan pemahaman materi (root-cause navigator). Membantu pengajar dan siswa dengan visualisasi penguasaan konsep, rekomendasi materi belajar yang dipersonalisasi, dan pelacakan perkembangan belajar berbasis data analitik akurat.",
    tags: ["React", "TypeScript", "TailwindCSS", "PostgreSQL", "Data Analytics"],
    image: "/img/xoralearn.webp",
    links: { github: "https://github.com/eeqyy/xora-tim-patapim.git" },
  },
  {
    slug: "webgis-desa-mekarjaya",
    title: "WebGIS Desa Mekarjaya",
    category: "WebGIS & Spatial Data",
    description: "Sistem Informasi Geografis pemetaan wilayah, batas administratif, dan infrastruktur desa berbasis peta digital interaktif.",
    longDescription: "Platform WebGIS interaktif untuk digitalisasi tata kelola desa Mekarjaya, Cikajang. Menampilkan pemetaan batas wilayah, fasilitas umum, demografi spasial, dan infrastruktur desa dengan visualisasi data spasial interaktif menggunakan React, TypeScript, Leaflet / GeoJSON, dan TailwindCSS.",
    tags: ["React", "TypeScript", "Leaflet", "WebGIS", "GeoJSON", "TailwindCSS"],
    image: "/img/webgis.webp",
    links: { github: "https://github.com/andrebaik/webgis-mekarjaya.git" },
  },
  {
    slug: "web-absensi-digital",
    title: "Sistem Presensi & Absensi Web",
    category: "Full Stack Web",
    description: "Sistem manajemen absensi dan kehadiran real-time berbasis web dengan verifikasi presensi dan rekapitulasi data otomatis.",
    longDescription: "Aplikasi manajemen kehadiran digital yang memfasilitasi pencatatan presensi, pelacakan riwayat kehadiran harian/bulanan, rekapitulasi data otomatis, serta panel admin untuk monitoring kehadiran pegawai atau anggota secara akurat dan transparan.",
    tags: ["Full Stack", "JavaScript", "REST API", "MySQL", "TailwindCSS"],
    image: "/img/web-absen.webp",
    links: { github: "https://github.com/andrebaik/web-absensi.git" },
  },
  {
    slug: "himatif-itg-portal",
    title: "HIMATIF ITG Official Portal",
    category: "Web Portal",
    description: "Portal resmi Himpunan Mahasiswa Teknik Informatika ITG dengan animasi interaktif GSAP & Framer Motion.",
    longDescription: "Website resmi Himpunan Mahasiswa Teknik Informatika Institut Teknologi Garut. Menampilkan profil organisasi, struktur kepengurusan, warta kegiatan divisi, kalender program kerja, dan wadah informasi mahasiswa dengan pengalaman visual interaktif berkinerja tinggi menggunakan GSAP dan Framer Motion.",
    tags: ["React", "TypeScript", "GSAP", "Framer Motion", "TailwindCSS"],
    image: "/img/himatif.webp",
    links: { github: "https://github.com/andrebaik/web-himatif.git" },
  },
  {
    slug: "portfolio-v1-archive",
    title: "Portfolio V1 — Interactive Showcase",
    category: "Frontend Engineering",
    description: "Arsip website portofolio generasi pertama dengan eksplorasi micro-interactions dan arsitektur frontend modular.",
    longDescription: "Portofolio web generasi pertama yang memamerkan karya awal, profil teknis, dan eksplorasi antarmuka digital dengan performa tinggi, animasi interaktif, dan arsitektur frontend modular berbasis React dan TailwindCSS.",
    tags: ["React", "JavaScript", "TailwindCSS", "Framer Motion", "Vite"],
    image: "/img/portfolio.webp",
    links: { github: "https://github.com/andrebaik/PortofolioV1.0.git" },
  },
];
