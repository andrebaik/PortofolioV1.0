import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Predefined deterministic origins for letter assembly animation
const ORIGINS: { x: number; y: number }[] = [
  { x: -120, y: 0 },
  { x: 0, y: -100 },
  { x: 0, y: 100 },
  { x: 120, y: 0 },
  { x: -100, y: -80 },
  { x: 0, y: 120 },
  { x: 100, y: -80 },
  { x: -120, y: 60 },
  { x: 0, y: -100 },
  { x: 120, y: 80 },
  { x: -80, y: 100 },
  { x: 0, y: -100 },
  { x: 120, y: 0 },
  { x: -100, y: 80 },
  { x: 0, y: 100 },
  { x: 100, y: -90 },
  { x: -110, y: -60 },
  { x: 120, y: -80 },
  { x: -90, y: 110 },
  { x: 0, y: -120 },
  { x: 110, y: 70 },
  { x: -100, y: 0 },
  { x: 0, y: 90 },
  { x: 100, y: 100 },
];

const WORDS = ["MOCHAMAD", "VICRYANDRE", "NURDIN"];
const STAGGER = 0.055; // seconds per letter
const TOTAL_CHARS = WORDS.reduce((acc, w) => acc + w.length, 0);

const FADEOUT_AT = Math.round(TOTAL_CHARS * STAGGER * 1000) + 1400; // time to start fade
const UNMOUNT_AFTER = FADEOUT_AT + 700; // time to completely unmount

export function OpeningScreen({ onComplete }: { onComplete?: () => void }) {
  const prefersReducedMotion = !!useReducedMotion();
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  useEffect(() => {
    if (prefersReducedMotion) {
      const unmount = setTimeout(() => {
        setVisible(false);
        onComplete?.();
      }, 500);
      return () => clearTimeout(unmount);
    }

    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("intro_complete"));
      }
    }, FADEOUT_AT);

    const unmountTimer = setTimeout(() => {
      setVisible(false);
      onComplete?.();
    }, UNMOUNT_AFTER);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(unmountTimer);
    };
  }, [prefersReducedMotion, onComplete]);

  if (!visible) return null;

  let globalCharIndex = 0;

  return (
    <motion.div
      key="opening-screen"
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center overflow-hidden bg-[#f5f5f5] select-none dark:bg-[#0a0a0d]"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at center, rgba(255,255,255,0.06) 0%, transparent 70%)",
      }}
      animate={{
        opacity: isFadingOut ? 0 : 1,
      }}
      transition={{
        duration: prefersReducedMotion ? 0.3 : 0.65,
        ease: "easeInOut",
      }}
      onAnimationComplete={() => {
        if (isFadingOut) {
          setVisible(false);
          onComplete?.();
        }
      }}
    >
      <div className="relative flex flex-col items-center px-6 text-center">
        {/* Assembled Name Letters */}
        <div className="flex flex-col items-center leading-none">
          {WORDS.map((word, wordIndex) => (
            <div
              key={wordIndex}
              className="flex justify-center text-4xl font-black uppercase tracking-tight text-ink dark:text-white sm:text-6xl md:text-7xl lg:text-8xl"
            >
              {word.split("").map((char) => {
                const charIdx = globalCharIndex++;
                const origin = ORIGINS[charIdx % ORIGINS.length] ?? { x: 0, y: -60 };

                if (prefersReducedMotion) {
                  return (
                    <span key={charIdx} className="inline-block">
                      {char}
                    </span>
                  );
                }

                return (
                  <motion.span
                    key={charIdx}
                    className="inline-block font-display"
                    initial={{
                      opacity: 0,
                      x: origin.x,
                      y: origin.y,
                      scale: 0.6,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      y: 0,
                      scale: 1,
                    }}
                    transition={{
                      delay: charIdx * STAGGER,
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1], // snappy spring-like snap
                    }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </div>
          ))}
        </div>

        {/* Subtitle PORTFOLIO */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: prefersReducedMotion ? 0 : TOTAL_CHARS * STAGGER + 0.12,
            duration: 0.5,
            ease: "easeOut",
          }}
          className="mt-4 font-mono text-xs font-bold uppercase tracking-[0.3em] text-neutral-500 dark:text-zinc-400 sm:text-sm md:text-base"
        >
          PORTFOLIO
        </motion.p>
      </div>
    </motion.div>
  );
}
export default OpeningScreen;
