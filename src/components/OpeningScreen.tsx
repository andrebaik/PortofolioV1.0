import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// 9 wide deterministic directional origins for each letter of "ANDREBAIK"
const ORIGINS: { x: number; y: number }[] = [
  { x: -320, y: 0 },    // A — terbang jauh dari kiri
  { x: 0, y: -260 },    // N — meluncur deras dari atas
  { x: 0, y: 260 },     // D — meluncur deras dari bawah
  { x: 320, y: 0 },     // R — terbang jauh dari kanan
  { x: -240, y: -200 }, // E — terbang dari atas-kiri
  { x: 0, y: 280 },     // B — meluncur deras dari bawah
  { x: 240, y: -200 },  // A — terbang dari atas-kanan
  { x: -260, y: 180 },  // I — terbang dari bawah-kiri
  { x: 280, y: 190 },   // K — terbang dari bawah-kanan
];

const WORDS = ["ANDREBAIK"];
const INITIAL_DELAY = 0.45; // Jeda awal agar browser selesai mount & render sebelum huruf pertama 'A' masuk
const STAGGER = 0.14; // Jeda antar-huruf yang teratur dan jelas
const TOTAL_CHARS = 9;

const FADEOUT_AT = 3900; // mulai fade out setelah slash selesai
const UNMOUNT_AFTER = 4800; // unmount setelah fade selesai

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
        duration: prefersReducedMotion ? 0.3 : 0.85,
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

        {/* ── NAME CONTAINER ── */}
        <div className="relative inline-block px-4 py-2">
          {/* Assembled Name: ANDREBAIK with Impact Shake on Slash */}
          <motion.h1
            className="relative z-10 flex justify-center text-4xl font-black uppercase tracking-tight text-ink dark:text-white sm:text-6xl md:text-7xl lg:text-8xl"
            aria-label="ANDREBAIK"
            animate={
              prefersReducedMotion
                ? {}
                : {
                    x: [0, -3, 3, -1, 0],
                  }
            }
            transition={{
              delay: 2.95,
              duration: 0.28,
              ease: "easeOut",
            }}
          >
            {WORDS[0].split("").map((char, i) => {
              const origin = ORIGINS[i] ?? { x: 0, y: -100 };

              if (prefersReducedMotion) {
                return (
                  <span key={i} className="inline-block">
                    {char}
                  </span>
                );
              }

              return (
                <motion.span
                  key={i}
                  className="inline-block font-display"
                  initial={{
                    opacity: 0,
                    x: origin.x,
                    y: origin.y,
                    scale: 0.4,
                    filter: "blur(6px)",
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    delay: INITIAL_DELAY + i * STAGGER,
                    duration: 0.72,
                    ease: [0.22, 1, 0.36, 1], // kurva pegas mantap
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
          </motion.h1>
        </div>

        {/* Subtitle PORTFOLIO */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: prefersReducedMotion ? 0 : INITIAL_DELAY + TOTAL_CHARS * STAGGER + 0.25,
            duration: 0.6,
            ease: "easeOut",
          }}
          className="mt-4 font-mono text-xs font-bold uppercase tracking-[0.32em] text-neutral-500 dark:text-zinc-400 sm:text-sm md:text-base"
        >
          PORTFOLIO
        </motion.p>
      </div>

      {/* ── FULL-SCREEN CROSS-VIEWPORT LASER SLASH (FROM LEFT TO RIGHT ACROSS WHOLE SCREEN) ── */}
      {!prefersReducedMotion && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
          {/* Thin, laser-sharp beam sweeping edge-to-edge */}
          <motion.div
            className="h-[3px] sm:h-[4px] w-[250vw] origin-center"
            style={{
              transform: "rotate(-24deg)",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(214,255,42,0.35) 25%, #ffffff 50%, rgba(214,255,42,0.35) 75%, transparent 100%)",
              boxShadow:
                "0 0 10px #D6FF2A, 0 0 25px #ffffff, 0 0 45px #D6FF2A",
            }}
            initial={{ x: "-150vw", opacity: 0 }}
            animate={{
              x: ["-150vw", "0vw", "150vw"],
              opacity: [0, 1, 0],
            }}
            transition={{
              delay: 2.8,
              duration: 0.44,
              times: [0, 0.45, 1],
              ease: [0.16, 1, 0.3, 1], // high-speed continuous slice
            }}
          />

          {/* Central Lens-Flare Flash Spark */}
          <motion.div
            className="absolute h-24 w-24 rounded-full bg-white blur-md"
            style={{
              boxShadow: "0 0 40px #D6FF2A, 0 0 80px #ffffff",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 2.2, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              delay: 2.95,
              duration: 0.28,
              ease: "easeOut",
            }}
          />
        </div>
      )}
    </motion.div>
  );
}
export default OpeningScreen;
