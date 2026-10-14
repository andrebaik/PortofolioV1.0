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
├── public/                     # Static public assets
│   ├── favicon.ico             # Site favicon
│   ├── icons.svg               # Vector sprite references
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
│   │   └── ScrollToTop.tsx     # Instant route scroll reset handler
│   ├── context/
│   │   ├── ThemeContext.tsx    # Dark/light theme with View Transitions
│   │   └── LanguageContext.tsx # EN/ID runtime dictionary
│   ├── data/                   # Content registries & configuration
│   │   ├── site.ts             # Metadata, author links, navigation
│   │   ├── projects.ts         # Showcase project catalog & deep details
│   │   ├── experience.ts       # Work experience & academic roles
│   │   ├── skills.ts           # Tech stack groupings
│   │   └── gallery.ts          # Archive image sources
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
├── tailwind.config.js          # Tailwind theme extensions
├── tsconfig.json               # TypeScript workspace configuration
└── vite.config.ts              # Vite bundling configuration
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

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview production bundle:**
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

The repository is configured with a strict, privacy-first `.gitignore` ensuring that:
- Personal documentation and sensitive files (`docs/`, `*.pdf`, `*.docx`) are not committed.
- High-resolution raw photo dumps (`public/img/`, `*.png`, `*.webp`) remain private.
- Personal configuration files and environment secrets (`.env*`, `src/data/`) are excluded from public pushes.

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
