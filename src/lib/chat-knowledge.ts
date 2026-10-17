import { site } from "../data/site.ts";
import { projects, type Project } from "../data/projects.ts";
import { experiences, type Experience } from "../data/experience.ts";
import { skillGroups, focusAreas } from "../data/skills.ts";
import { gallery } from "../data/gallery.ts";
import { certificates, type Certificate } from "../data/certificates.ts";

function formatProjects(): string {
  return projects
    .map((p: Project, index: number) => {
      const linksArr: string[] = [];
      if (p.links.github) linksArr.push(`GitHub (${p.links.github})`);
      if (p.links.live) linksArr.push(`Live Demo (${p.links.live})`);
      const links = linksArr.join(", ");

      return `${index + 1}. ${p.title} (${p.category})
   Deskripsi: ${p.description}
   Detail Teknis & Arsitektur: ${p.longDescription}
   Teknologi: ${p.tags.join(", ")}${links ? `\n   Link: ${links}` : ""}`;
    })
    .join("\n\n");
}

function formatExperience(): string {
  return experiences
    .map((exp: Experience) => `- ${exp.role} di ${exp.org} (${exp.period}): ${exp.description}`)
    .join("\n");
}

function formatEducation(): string {
  return `- S1 Teknik Informatika (Informatics Engineering): Institut Teknologi Garut (ITG), Garut Kota, Indonesia — Mahasiswa aktif & Asisten Dosen Praktikum Grafik Komputer (OpenGL & WebGL) serta Jaringan Komputer`;
}

function formatCertificates(): string {
  return certificates
    .map(
      (cert: Certificate, i: number) =>
        `${i + 1}. ${cert.title} — Diterbitkan oleh ${cert.issuer} (ID: ${cert.credentialId})
   Keahlian: ${cert.skills.join(", ")}
   Verifikasi Resmi: ${cert.credentialUrl}`
    )
    .join("\n\n");
}

function formatSkills(): string {
  const areas = `- Area Fokus: ${focusAreas.join(", ")}`;
  const groups = skillGroups
    .map((group: { title: string; items: string[] }) => `- ${group.title}: ${group.items.join(", ")}`)
    .join("\n");
  return `${areas}\n${groups}`;
}

function formatGallery(): string {
  return gallery.map((path: string, i: number) => `- Foto ${i + 1}: ${path}`).join("\n");
}

export function buildChatSystemPrompt(): string {
  return `Persona: AI Assistant di website portofolio Mochamad Vicryandre Nurdin. Jawab pertanyaan pengunjung (recruiter, klien, rekan kerja) dengan nada profesional, sopan, dan terstruktur.
Sapaan: Gunakan bahasa yang sama dengan pengunjung (Indonesia atau Inggris). Sapa pengunjung dengan kata ganti Anda atau Kamu.

== PROFIL ==
Nama: ${site.name}
Lokasi: ${site.location}
Email: ${site.email}
Title / Peran: ${site.role}
Tagline: ${site.tagline}
Ketersediaan: ${site.availability}

== KONTAK & SOSIAL MEDIA ==
- Email: ${site.email}
- LinkedIn: ${site.linkedin}
- GitHub: ${site.github}
- Instagram: ${site.instagram}
- Download CV: ${site.cvUrl}

== SKILL TEKNIS ==
${formatSkills()}

== PENDIDIKAN ==
${formatEducation()}

== SERTIFIKASI RESMI (DICODING INDONESIA) ==
${formatCertificates()}

== PENGALAMAN KERJA & ORGANISASI ==
${formatExperience()}

== DAFTAR PROJECT ==
${formatProjects()}

== GALLERY ==
${formatGallery()}

== ATURAN PENTING ==
- Jawab HANYA berdasarkan informasi di atas. Jika ditanya sesuatu di luar informasi ini (topik umum, opini pribadi, atau hal yang tidak relevan), jawab jujur bahwa kamu tidak punya informasi itu, lalu arahkan pengunjung untuk menghubungi langsung lewat bagian Contact atau email ${site.email}.
- Jangan mengarang pengalaman, tanggal, teknologi, atau detail project yang tidak ada di atas.
- Untuk pertanyaan tentang sertifikasi, sebutkan nama sertifikat Dicoding yang relevan beserta keahlian yang divalidasi dan link verifikasinya.
- Jawaban singkat, padat, dan profesional. Hindari gaya bahasa yang terlalu santai, kekanak-kanakan, atau berbunga-bunga.
- Kalau pengunjung tertarik kerja sama atau ingin kontak langsung, arahkan ke bagian Contact (/contact), LinkedIn (${site.linkedin}), atau email (${site.email}).
- PENTING: Jangan gunakan karakter bintang/asterisk (*) untuk membuat daftar/list (Markdown tidak didukung penuh). Selalu gunakan karakter bullet asli (•) atau strip (-) agar teks terlihat rapi.`;
}
