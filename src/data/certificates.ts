export type Certificate = {
  id: string;
  title: string;
  issuer: string;
  credentialId: string;
  credentialUrl: string;
  image: string;
  skills: string[];
  description: string;
};

export const certificates: Certificate[] = [
  {
    id: "dicoding-react-fundamental",
    title: "Belajar Fundamental Aplikasi Web dengan React",
    issuer: "Dicoding Indonesia",
    credentialId: "81P2KNK2QXOY",
    credentialUrl: "https://www.dicoding.com/certificates/81P2KNK2QXOY",
    image: "/certificates/dicoding-react-fundamental.webp",
    skills: ["React", "Component-Driven", "React Hooks", "State Management", "SPA Routing"],
    description: "Membangun Single Page Applications (SPA) dengan React, komponen modular terisolasi, arsitektur data unidirectional, hooks lifecycle, dan best practices performa.",
  },
  {
    id: "dicoding-frontend-pemula",
    title: "Belajar Membuat Front-End Web untuk Pemula",
    issuer: "Dicoding Indonesia",
    credentialId: "0LZ0J2OJQX65",
    credentialUrl: "https://www.dicoding.com/certificates/0LZ0J2OJQX65",
    image: "/certificates/dicoding-frontend-pemula.webp",
    skills: ["DOM Manipulation", "Web Storage", "Event Handling", "Responsive UI"],
    description: "Pengembangan aplikasi web interaktif sisi klien dengan manipulasi DOM modern, validasi formulir interaktif, web storage API, dan custom event handling.",
  },
  {
    id: "dicoding-javascript-dasar",
    title: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding Indonesia",
    credentialId: "1RXYD6R13XVM",
    credentialUrl: "https://www.dicoding.com/certificates/1RXYD6R13XVM",
    image: "/certificates/dicoding-javascript-dasar.webp",
    skills: ["JavaScript ES6+", "OOP", "Functional Programming", "Async/Await", "Promises"],
    description: "Penguasaan JavaScript modern (ES6+), struktur data, OOP, asynchronous programming, modularitas kode, dan penanganan error.",
  },
  {
    id: "dicoding-web-dasar",
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia",
    credentialId: "MRZMVD11LZYQ",
    credentialUrl: "https://www.dicoding.com/certificates/MRZMVD11LZYQ",
    image: "/certificates/dicoding-web-dasar.webp",
    skills: ["HTML5", "CSS3", "Flexbox", "Responsive Web Design", "Semantic Markup"],
    description: "Fondasi arsitektur web modern, semantic HTML, layouting CSS Flexbox, serta pembuatan antarmuka web yang responsif dan terstruktur rapi.",
  },
  {
    id: "dicoding-dasar-ai",
    title: "Belajar Dasar AI",
    issuer: "Dicoding Indonesia",
    credentialId: "07Z6Q5J6MZQR",
    credentialUrl: "https://www.dicoding.com/certificates/07Z6Q5J6MZQR",
    image: "/certificates/dicoding-dasar-ai.webp",
    skills: ["Artificial Intelligence", "Machine Learning", "Generative AI", "LLM Prompting", "Ethics in AI"],
    description: "Pemahaman dasar kecerdasan buatan (AI), machine learning, etika AI, pemanfaatan generative AI, serta pemahaman alur kerja data untuk model AI modern.",
  },
  {
    id: "dicoding-git-github",
    title: "Belajar Dasar Git dengan GitHub",
    issuer: "Dicoding Indonesia",
    credentialId: "EYX4ORDRJXDL",
    credentialUrl: "https://www.dicoding.com/certificates/EYX4ORDRJXDL",
    image: "/certificates/dicoding-git-github.webp",
    skills: ["Git", "GitHub", "Version Control", "Branching & Merging", "Team Collaboration"],
    description: "Praktik industri dalam manajemen repositori kode, branching strategy, pull requests, resolving merge conflicts, dan kolaborasi tim profesional.",
  },
  {
    id: "dicoding-logika-pemrograman",
    title: "Pengenalan ke Logika Pemrograman (Programming Logic 101)",
    issuer: "Dicoding Indonesia",
    credentialId: "GRX50GE72Z0M",
    credentialUrl: "https://www.dicoding.com/certificates/GRX50GE72Z0M",
    image: "/certificates/dicoding-logika-pemrograman.webp",
    skills: ["Logic Flowcharts", "Pseudocode", "Algorithms", "Problem Solving", "Control Structures"],
    description: "Penguasaan logika algoritmik, struktur kontrol percabangan dan perulangan, serta pemecahan masalah komputasi secara terstruktur.",
  },
  {
    id: "dicoding-dasar-pemrograman",
    title: "Memulai Dasar Pemrograman untuk Menjadi Pengembang Software",
    issuer: "Dicoding Indonesia",
    credentialId: "2VX3VNM5QPYQ",
    credentialUrl: "https://www.dicoding.com/certificates/2VX3VNM5QPYQ",
    image: "/certificates/dicoding-dasar-pemrograman.webp",
    skills: ["Software Engineering", "Computational Thinking", "Code Architecture", "Best Practices"],
    description: "Pemahaman mendasar tentang konsep pemrograman komputer, metodologi pengembangan perangkat lunak, dan dasar arsitektur komputasi.",
  },
];
