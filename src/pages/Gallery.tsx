import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { DriftWall, type DriftWallItem } from "../components/DriftWall";
import { Seo } from "../components/Seo";
import { gallery } from "../data/gallery";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.32, 0.72, 0, 1] as const },
};

export function Gallery() {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [active, setActive] = useState<string | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const items = useMemo<DriftWallItem[]>(
    () =>
      gallery.map((img, i) => ({
        image: img,
        title: `Memory #${String(i + 1).padStart(2, "0")}`,
      })),
    []
  );

  return (
    <div className="w-full pt-12 pb-20 md:pt-16 md:pb-28">
      <Seo path="/gallery" title={t("gallery.title")} description={t("gallery.subtitle")} />
      {/* Editorial Header */}
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <motion.div {...fadeUp}>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400 dark:text-zinc-500">
            {t("gallery.tag")}
          </p>
          <h1 className="mt-4 font-display text-[32px] font-bold leading-[1.1] tracking-[-0.03em] text-ink dark:text-white sm:text-[44px] lg:text-[50px]">
            {t("gallery.title")}
          </h1>
          <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-neutral-600 dark:text-zinc-400">
            {t("gallery.subtitle")}
          </p>
        </motion.div>
      </div>

      {/* FULL-BLEED 3D DRIFT WALL (NO BORDER, EDGE-TO-EDGE) */}
      <div className="relative mt-8 h-[75vh] min-h-[640px] max-h-[900px] w-full overflow-hidden">
        <DriftWall
          items={items}
          columns={6}
          tileWidth={230}
          tileHeight={155}
          gap={22}
          tilt={15}
          turn={-12}
          perspective={1100}
          depth={100}
          speed={40}
          direction="up"
          variance={0.45}
          parallax={0.7}
          lift={76}
          fade={0.45}
          dim={0.65}
          overlayColor={theme === "dark" ? "#09090b" : "#f4f4f5"}
          onTileClick={(item) => setActive(item.image)}
        />
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {active ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            onClick={() => setActive(null)}
          >
            <div
              className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-xl border border-white/20 bg-zinc-950 p-2 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-lg bg-black/60 text-white backdrop-blur-sm transition hover:bg-black"
                aria-label="Close image preview"
              >
                <X size={18} />
              </button>
              <img
                src={active}
                alt="Full preview"
                className="max-h-[82vh] w-auto max-w-full rounded-lg object-contain"
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
