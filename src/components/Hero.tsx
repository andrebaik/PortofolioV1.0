import { useEffect, useState, useRef } from "react";
import { PatternWaves } from "./PatternWaves";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";
import { TechText } from "./TechText";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "../data/site";

const ease = [0.32, 0.72, 0, 1] as const;

// Pisah per kata biar bisa kontrol baris
const nameParts = ["MOCHAMAD", "VICRYANDRE", "NURDIN"];

export function Hero() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [heroActive, setHeroActive] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const textParallaxY = useTransform(scrollYProgress, [0, 1], ["0px", "120px"]);
  const photoParallaxY = useTransform(scrollYProgress, [0, 1], ["0px", "50px"]);
  const wavesOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);
  useEffect(() => {
    const handleIntroDone = () => setHeroActive(true);
    window.addEventListener("intro_complete", handleIntroDone);

    // Fallback: in case returning from another route or intro already played
    const timer = setTimeout(() => {
      setHeroActive(true);
    }, 4400);

    return () => {
      window.removeEventListener("intro_complete", handleIntroDone);
      clearTimeout(timer);
    };
  }, []);
  return (
    <section ref={heroRef} className="relative w-full overflow-hidden py-16 md:py-24 lg:py-32">
      {/* ── BACKGROUND WAVES (FULL WIDTH EDGE-TO-EDGE) ── */}
      <motion.div style={{ opacity: wavesOpacity }} className="pointer-events-none absolute inset-0 z-0">
        <PatternWaves
          preset="lines"
          color={theme === "dark" ? "#ffffff" : "#27272a"}
          backgroundColor="transparent"
          fade="bottom"
          fadeSize={0.3}
          interactive
          cursorSize={50}
          cursorStrength={0.6}
          pattern="line"
          spacing={12}
          markSize={0.42}
          depth={0.9}
          shine={0.6}
          speed={0.3}
        />
      </motion.div>

      {/* ── CONTENT CONTAINER ── */}
      <div className="relative z-10 mx-auto w-full max-w-[1600px] px-4 sm:px-6 md:px-10 lg:px-16">
        {/* ── LAYERED BLOCK ── */}
      <div className="relative flex items-end min-h-[520px] md:min-h-[640px] lg:min-h-[720px]">

        {/* NAME — z-10, di belakang foto, interaktif dengan style TechText */}
        <motion.div
          aria-label={site.name}
          className="absolute inset-0 flex flex-col justify-end z-10 select-none pb-4"
          style={{ y: textParallaxY }}
          initial={{ opacity: 0 }}
          animate={heroActive ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.7, ease }}
        >
          {nameParts.map((word) => (
            <div key={word} className="h-[85px] sm:h-[115px] md:h-[145px] lg:h-[175px] w-full">
              <TechText
                text={word}
                fontWeight={700}
                fontSize={160}
                color={theme === "dark" ? "#ffffff" : "#0a0a0a"}
                accentColor={theme === "dark" ? "#D6FF2A" : "#18181b"}
                reveal="letter"
                dashLength={4}
                dashGap={2}
                specks={15}
                selection
                labels
                draggable
                sweep
                speed={1}
              />
            </div>
          ))}
        </motion.div>

        {/* FOTO — z-20, di atas nama, jeda lebih lama */}
        <motion.div
          className="pointer-events-none relative z-20 ml-auto w-[min(68vw,520px)] flex-shrink-0"
          style={{ y: photoParallaxY }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={heroActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
          transition={{ delay: 0.45, duration: 0.9, ease }}
        >
          <img
            src="/img/andre.webp"
            alt={site.name}
            className="w-full object-contain drop-shadow-2xl"
            loading="eager"
            decoding="async"
          />
        </motion.div>
      </div>

      {/* ── BAWAH: tagline ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={heroActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ delay: 0.85, duration: 0.55, ease }}
        className="relative z-20 mt-8 flex flex-col gap-4"
      >
        <p className="max-w-[52ch] text-[16px] leading-7 text-neutral-500 dark:text-zinc-400 md:text-[18px] md:leading-8">
          {t("hero.tagline")}
        </p>
      </motion.div>
      </div>
    </section>
  );
}
