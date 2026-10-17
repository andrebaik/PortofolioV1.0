export type Experience = {
  id: string;
  role: string;
  org: string;
  period: string;
  description: string;
  href?: string;
};

export const experiences: Experience[] = [
  {
    id: "01",
    role: "Full Stack Developer - Himatif ITG",
    org: "Himpunan Mahasiswa Teknik Informatika (Himatif) ITG",
    period: "2024 — Present",
    description: "Shipping React + Node apps for SMEs — dashboards, APIs, and storefronts.",
  },
  {
    id: "02",
    role: "Frontend Developer - Desa Mekarjaya",
    org: "Desa Mekarjaya, Kabupaten Cikajang, Jawa Barat",
    period: "2026",
    description: "Built maps and dashboards for village data and public services using React + TypeScript.",
  },
  {
    id: "03",
    role: "Teaching Assistant, Grafik Komputer",
    org: "Institut Teknologi Garut (ITG)",
    period: "2026 — Present",
    description: "Assisting students in learning computer graphics concepts and practical applications using OpenGL and WebGL.",
  },
  {
    id: "04",
    role: "Teaching Assistant, Jaringan Komputer",
    org: "Institut Teknologi Garut (ITG)",
    period: "2026 — Present",
    description: "Assisting students in learning computer networking concepts and practical applications using various tools and technologies.",
  },
];
