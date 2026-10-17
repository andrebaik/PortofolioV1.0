<div align="center">

# Mochamad Vicryandre Nurdin — Portfolio v2

<p>
  <strong>High-performance, editorial developer portfolio built with React 19, TypeScript, TailwindCSS, and WebGL physics.</strong>
</p>

<p>
  <a href="#-key-features">Key Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-scripts">Scripts</a> •
  <a href="#-license">License</a>
</p>

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black&style=flat-square)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white&style=flat-square)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white&style=flat-square)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-06B6D4?logo=tailwindcss&logoColor=white&style=flat-square)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-14.2-FF0055?logo=framer&logoColor=white&style=flat-square)](https://framer.com/motion)
[![WebGL](https://img.shields.io/badge/WebGL-2.0-990000?logo=webgl&logoColor=white&style=flat-square)](https://www.khronos.org/webgl/)

---

</div>

## Overview

**Portfolio v2** is the personal portfolio and digital playground of **Mochamad Vicryandre Nurdin**, an Informatics Engineering student at Institut Teknologi Garut and Full Stack / AI Developer. 

Engineered with an editorial Swiss-minimalist aesthetic, the site replaces generic card templates with architectural hairline structures, interactive WebGL shaders, tactile physics-driven UI controls, and a smooth bilingual interface.

---

## Key Features

### 1. Cinematic Opening Screen
- **Deterministic Letter Assembly:** Random-origin kinematic entrance animation where the letters of the name assemble with spring physics.
- **Synchronized Entrance:** Coordinates with the Hero section so that text and photos begin their entrance sequence only after the preloader dissolves.
- **Zero-FOUC:** Bundled synchronously at root level without layout shift or raw fallback flashes.

### 2. WebGL & Physics Components
- **PatternWaves Background (`Hero`):** Real-time OGL WebGL shader simulating organic topography contours and fluid waves reacting to pointer movements.
- **TechText (`Hero Wordmark`):** Canvas-rendered typography with dashed vector silhouette tracing, blinking specks, and spring-back draggable characters.
- **HoloCard (`About Photo`):** Interactive WebGL2 holographic trading card featuring gyroscopic 3D perspective tilt, glossy sheen, and foil shimmer.
- **DriftWall (`Gallery`):** Full-bleed, edge-to-edge 3D perspective wall featuring multi-column variable-speed drifting and cursor parallax steering.
- **SlideCommit (`Contact Button`):** Physical drag-to-confirm slider with interactive validation, shake animation on error, and confirmation states.

### 3. Theme & View Transitions
- **Circular Ripple Transition:** Seamless dark/light theme switching using the native View Transition API (`document.startViewTransition`) with a circular clip-path wave originating from the exact toggle button position.
- **Instant LocalStorage Hydration:** Pre-mount inline script in `<head>` preventing dark mode flashes.

### 4. Editorial Design System
- **No AI Card Slop:** Elimination of puffy, bubbly transparent borders in favor of crisp 1px architectural hairline dividers (`border-t border-black/10 dark:border-white/10`).
- **Typography Scale:** Space Grotesk display headings paired with Plus Jakarta Sans body and monospaced technical metadata.
- **Bilingual Support:** Instant runtime switching between English (`EN`) and Bahasa Indonesia (`ID`).
- **Deterministic Scroll-to-Top:** Window and document scroll automatically reset to `(0, 0)` upon every route transition.

### 5. AI Assistant (7Dynn)
- **Provider Chain:** `POST /api/chat` streams from Groq (`openai/gpt-oss-120b` → `qwen/qwen3.8-27b` → `openai/gpt-oss-20b`) and falls back to OpenRouter (`openrouter/free`) before returning `502`.
- **Shared SSE Parser:** `parseSseStream` in `api/chat.ts` and `vite.config.ts` decodes `choices[0].delta.content` for both providers, so local dev and production behave identically.
- **Grounded Prompt:** `api/chat.ts` defines the grounded system prompt based on real portfolio records, keeping answers strictly aligned with published projects and credentials.
- **Resilient Client:** `src/hooks/useChat.ts` aborts in-flight streams on unmount or a newer message, persists only settled transcripts to `localStorage` (`portfolio.chat.v1`, capped at 40 messages), and never surfaces an intentional abort as an error.
- **Route Safety:** Every route is wrapped in `ErrorBoundary` keyed by pathname, so a crash on one page cannot poison the next.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Framework** | [React 19](https://react.dev), [Vite 8](https://vitejs.dev) |
| **Language** | [TypeScript](https://www.typescriptlang.org) (strict types, zero-any policy) |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com), [PostCSS](https://postcss.org), Custom CSS Variables |
| **Animation** | [Framer Motion](https://framer.com/motion), [Motion](https://motion.dev) |
| **3D & Shaders** | [OGL](https://github.com/oframe/ogl), WebGL 2.0 GLSL Shaders |
| **Icons** | [Lucide React](https://lucide.dev), [React Icons](https://react-icons.github.io/react-icons/), [Hugeicons](https://hugeicons.com/) |
| **Tooling & Linter** | [Oxlint](https://oxc.rs/docs/guide/usage/linter) |

---

## Architecture

```text
portfolv2/
├── api/
│   └── chat.ts                 # Serverless chat endpoint (Groq → OpenRouter)
├── public/                     # Static public assets
│   ├── favicon.ico             # Site favicon
│   ├── icons.svg               # Vector sprite references
│   ├── cv.pdf                  # Public résumé download
│   ├── certificates/           # First-page WebP credential previews
│   └── img/                    # Optimized WebP assets & project screenshots
├── src/
│   ├── assets/                 # SVGs and static brand marks
│   ├── components/             # Reusable UI & physics components
│   │   ├── DriftWall.tsx       # 3D Drifting perspective photo wall
│   │   ├── HoloCard.tsx        # WebGL2 holographic trading card
│   │   ├── PatternWaves.tsx    # OGL WebGL fluid contour shader
│   │   ├── TechText.tsx        # Vector dash & draggable typography
│   │   ├── SlideCommit.tsx     # Drag-to-confirm slider control
│   │   ├── OpeningScreen.tsx   # Cinematic letter-assembly preloader
│   │   ├── Navbar.tsx          # Floating header with theme & i18n
│   │   ├── Footer.tsx          # Minimalist site footer
│   │   ├── ProjectCard.tsx     # Architectural case-study card
│   │   ├── Timeline.tsx        # Experience & career ledger
│   │   ├── SkillGroup.tsx      # Hairline technical skills directory
│   │   ├── SectionHeader.tsx   # Uniform section titles
│   │   ├── Seo.tsx             # Per-route title, description, JSON-LD
│   │   ├── ErrorBoundary.tsx   # Route-level crash recovery
│   │   ├── chat/               # Chat transcript renderer & clear dialog
│   │   └── ScrollToTop.tsx     # Instant route scroll reset handler
│   ├── context/
│   │   ├── ThemeContext.tsx    # Dark/light theme with View Transitions
│   │   └── LanguageContext.tsx # EN/ID runtime dictionary
│   ├── data/                   # Content registries & configuration
│   │   ├── site.ts             # Metadata, author links, navigation
│   │   ├── projects.ts         # Showcase project catalog & deep details
│   │   ├── experience.ts       # Work experience & academic roles
│   │   ├── skills.ts           # Tech stack groupings
│   │   ├── routes.ts           # Public route manifest for sitemap.xml
│   │   └── gallery.ts          # Archive image sources
│   ├── hooks/
│   │   └── useChat.ts          # Streaming chat state, abort, persistence
│   ├── lib/                    # Classnames & styling utilities
│   ├── pages/                  # Page-level route views
│   │   ├── Home.tsx            # Hero, role marquee, stack, selected works
│   │   ├── About.tsx           # Bio, HoloCard, bento specs, principles
│   │   ├── Projects.tsx        # Full project catalog index
│   │   ├── ProjectDetail.tsx   # In-depth project case study
│   │   ├── Gallery.tsx         # Full-bleed 3D DriftWall photo archive
│   │   ├── Experience.tsx      # Work history ledger & CV download
│   │   ├── Contact.tsx         # Direct channels & SlideCommit form
│   │   ├── AiAssistant.tsx     # Technical query console agent
│   │   └── NotFound.tsx        # 404 recovery route
│   ├── App.tsx                 # Root layout & route configuration
│   ├── main.tsx                # Client application bootstrap
│   └── index.css               # Design tokens, view transitions, fonts
├── .gitignore                  # Production exclusion rules
├── LICENSE                     # MIT license
├── tailwind.config.js          # Tailwind theme extensions
├── tsconfig.json               # TypeScript workspace configuration
└── vite.config.ts              # Vite bundling + dev chat API + sitemap
```

---

## Getting Started

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **Package Manager**: npm (v9+) or pnpm / yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/andrebaik/portfolv2.git
   cd portfolv2
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   | Variable | Purpose |
   | :--- | :--- |
   | `GROQ_API_KEY` | Primary chat provider ([console.groq.com/keys](https://console.groq.com/keys)) |
   | `OPENROUTER_API_KEY` | Fallback chat provider ([openrouter.ai/keys](https://openrouter.ai/keys)) |
   | `SITE_URL` | Canonical origin baked into `sitemap.xml` and `robots.txt` at build time. On Vercel this is auto-detected from `VERCEL_PROJECT_PRODUCTION_URL`; locally it is optional and the sitemap is skipped when absent. |

   The chat endpoint needs at least one of the two provider keys; without either,
   `POST /api/chat` returns `500`.

4. **Start development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser. Vite serves `/api/chat` locally
   through the same middleware used in production.

5. **Build for production:**
   ```bash
   npm run build
   ```

6. **Preview production bundle:**
   ```bash
   npm run preview
   ```

---

## Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts Vite HMR dev server at `localhost:5173` |
| `npm run build` | Runs TypeScript compilation (`tsc -b`) and Vite production bundle |
| `npm run lint` | Runs [Oxlint](https://oxc.rs) static code analyzer |
| `npm run preview` | Spins up a local server to preview the `dist/` production output |

---

## Security & Privacy in Git

The repository is configured with a privacy-first `.gitignore` that:

- Keeps environment secrets out of history: `.env`, `.env.local`, and `*.local` are ignored; only `.env.example` is committed.
- Keeps source documents private: `docs/`, `*.doc`, `*.docx`, and `*.pdf` are ignored, with an explicit exception for `public/cv.pdf` because the UI links to it.
- Never ships certificate PDFs: `public/certificates/*.pdf` stays local while the first-page WebP previews are committed.
- Excludes build output and tooling caches (`dist/`, `node_modules/`, `.vercel`, `.turbo`).

Runtime assets that Vercel needs — `public/img/`, `public/certificates/*.webp`, and `src/data/` — are intentionally tracked.

---

## Author

**Mochamad Vicryandre Nurdin**
- **Role:** Full Stack Developer & Prompt Engineer hhe
- **Institution:** Institut Teknologi Garut (ITG)
- **Email:** [dynn.dev@gmail.com](mailto:dynn.dev@gmail.com)
- **GitHub:** [@andrebaik](https://github.com/andrebaik)
- **LinkedIn:** [Mochamad Vicryandre Nurdin](https://linkedin.com/in/andrebaikk)

---

## License

This project is licensed under the [MIT License](LICENSE) — feel free to explore, learn from, and adapt the techniques used in this project.
