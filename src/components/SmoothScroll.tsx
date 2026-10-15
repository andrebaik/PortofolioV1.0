import { useEffect } from "react";
import Lenis from "lenis";
import { useLocation } from "react-router-dom";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.8,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Scroll to top immediately on route change
    lenis.scrollTo(0, { immediate: true });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [pathname]);

  return <>{children}</>;
}

export default SmoothScroll;
