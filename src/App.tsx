import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { OpeningScreen } from "./components/OpeningScreen";
import { Home } from "./pages/Home";

const About = lazy(() => import("./pages/About").then((m) => ({ default: m.About })));
const Projects = lazy(() => import("./pages/Projects").then((m) => ({ default: m.Projects })));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail").then((m) => ({ default: m.ProjectDetail })));
const Gallery = lazy(() => import("./pages/Gallery").then((m) => ({ default: m.Gallery })));
const Experience = lazy(() => import("./pages/Experience").then((m) => ({ default: m.Experience })));
const Contact = lazy(() => import("./pages/Contact").then((m) => ({ default: m.Contact })));
const AiAssistant = lazy(() => import("./pages/AiAssistant").then((m) => ({ default: m.AiAssistant })));
const NotFound = lazy(() => import("./pages/NotFound").then((m) => ({ default: m.NotFound })));

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <HelmetProvider>
          <BrowserRouter>
            <div className="min-h-screen bg-paper dark:bg-zinc-950 transition-colors duration-300">
              <OpeningScreen />
              <ScrollToTop />
              <Navbar />
              <AnimatePresence mode="wait">
                <Suspense fallback={null}>
                  <main>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/projects" element={<Projects />} />
                      <Route path="/projects/:slug" element={<ProjectDetail />} />
                      <Route path="/gallery" element={<Gallery />} />
                      <Route path="/experience" element={<Experience />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/ai-assistant" element={<AiAssistant />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                </Suspense>
              </AnimatePresence>
              <Footer />
            </div>
          </BrowserRouter>
        </HelmetProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}
