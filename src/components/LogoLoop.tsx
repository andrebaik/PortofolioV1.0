import { useCallback, useEffect, useMemo, useRef, useState, memo } from "react";
import "./LogoLoop.css";

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 };

function toCssLength(value: number | string | undefined): string | undefined {
  if (typeof value === "number") return `${value}px`;
  return (value as string | undefined) ?? undefined;
}

function useResizeObserver(callback: () => void, elements: React.RefObject<HTMLElement | null>[], deps: unknown[]) {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback();
      window.addEventListener("resize", handleResize);
      callback();
      return () => window.removeEventListener("resize", handleResize);
    }
    const observers = elements.map((ref) => {
      if (!ref.current) return null;
      const observer = new ResizeObserver(callback);
      observer.observe(ref.current);
      return observer;
    });
    callback();
    return () => {
      for (const o of observers) o?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callback, ...deps]);
}

function useImageLoader(seqRef: React.RefObject<HTMLElement | null>, onLoad: () => void, deps: unknown[]) {
  useEffect(() => {
    const images = (seqRef.current?.querySelectorAll("img") ?? []) as NodeListOf<HTMLImageElement>;
    if (images.length === 0) {
      onLoad();
      return;
    }
    let remaining = images.length;
    const done = () => {
      remaining -= 1;
      if (remaining === 0) onLoad();
    };
    for (const img of images) {
      if (img.complete) done();
      else {
        img.addEventListener("load", done, { once: true });
        img.addEventListener("error", done, { once: true });
      }
    }
    return () => {
      for (const img of images) {
        img.removeEventListener("load", done);
        img.removeEventListener("error", done);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onLoad, ...deps]);
}

function useAnimationLoop(
  trackRef: React.RefObject<HTMLDivElement | null>,
  targetVelocity: number,
  seqWidth: number,
  seqHeight: number,
  isHovered: boolean,
  hoverSpeed: number | undefined,
  isVertical: boolean,
) {
  const rafRef = useRef<number | null>(null);
  const lastTsRef = useRef<number | null>(null);
  const offsetRef = useRef(0);
  const velocityRef = useRef(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const seqSize = isVertical ? seqHeight : seqWidth;
    if (seqSize > 0) {
      offsetRef.current = ((offsetRef.current % seqSize) + seqSize) % seqSize;
      track.style.transform = isVertical ? `translate3d(0, ${-offsetRef.current}px, 0)` : `translate3d(${-offsetRef.current}px, 0, 0)`;
    }
    const animate = (ts: number) => {
      if (lastTsRef.current === null) lastTsRef.current = ts;
      const dt = Math.max(0, ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;
      const easing = 1 - Math.exp(-dt / ANIMATION_CONFIG.SMOOTH_TAU);
      velocityRef.current += (target - velocityRef.current) * easing;
      if (seqSize > 0) {
        let next = offsetRef.current + velocityRef.current * dt;
        next = ((next % seqSize) + seqSize) % seqSize;
        offsetRef.current = next;
        track.style.transform = isVertical ? `translate3d(0, ${-offsetRef.current}px, 0)` : `translate3d(${-offsetRef.current}px, 0, 0)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTsRef.current = null;
    };
  }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical, trackRef]);
}

export type LogoItem =
  | { node: React.ReactNode; title?: string; href?: string; ariaLabel?: string }
  | { src: string; alt?: string; title?: string; href?: string; srcSet?: string; sizes?: string; width?: number; height?: number };

export type LogoLoopProps = {
  logos: LogoItem[];
  speed?: number;
  direction?: "left" | "right" | "up" | "down";
  width?: number | string;
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number;
  pauseOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string;
  scaleOnHover?: boolean;
  renderItem?: (item: LogoItem, key: React.Key) => React.ReactNode;
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
};

export const LogoLoop = memo(function LogoLoop({
  logos,
  speed = 120,
  direction = "left",
  width = "100%",
  logoHeight = 28,
  gap = 32,
  pauseOnHover,
  hoverSpeed,
  fadeOut = false,
  fadeOutColor,
  scaleOnHover = false,
  renderItem,
  ariaLabel = "Partner logos",
  className,
  style,
}: LogoLoopProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const seqRef = useRef<HTMLUListElement>(null);

  const [seqWidth, setSeqWidth] = useState(0);
  const [seqHeight, setSeqHeight] = useState(0);
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES);
  const [isHovered, setIsHovered] = useState(false);

  const effectiveHoverSpeed = useMemo(() => {
    if (hoverSpeed !== undefined) return hoverSpeed;
    if (pauseOnHover === true) return 0;
    if (pauseOnHover === false) return undefined;
    return 0;
  }, [hoverSpeed, pauseOnHover]);

  const isVertical = direction === "up" || direction === "down";

  const targetVelocity = useMemo(() => {
    const mag = Math.abs(speed);
    const dirMul = isVertical ? (direction === "up" ? 1 : -1) : direction === "left" ? 1 : -1;
    const speedMul = speed < 0 ? -1 : 1;
    return mag * dirMul * speedMul;
  }, [speed, direction, isVertical]);

  const updateDimensions = useCallback(() => {
    const containerWidth = containerRef.current?.clientWidth ?? 0;
    const rect = seqRef.current?.getBoundingClientRect();
    const seqW = rect?.width ?? 0;
    const seqH = rect?.height ?? 0;
    if (isVertical) {
      const parentH = containerRef.current?.parentElement?.clientHeight ?? 0;
      if (containerRef.current && parentH > 0) {
        const th = Math.ceil(parentH);
        if (containerRef.current.style.height !== `${th}px`) containerRef.current.style.height = `${th}px`;
      }
      if (seqH > 0) {
        setSeqHeight(Math.ceil(seqH));
        const viewport = containerRef.current?.clientHeight ?? parentH ?? seqH;
        const needed = Math.ceil(viewport / seqH) + ANIMATION_CONFIG.COPY_HEADROOM;
        setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, needed));
      }
    } else if (seqW > 0) {
      setSeqWidth(Math.ceil(seqW));
      const needed = Math.ceil(containerWidth / seqW) + ANIMATION_CONFIG.COPY_HEADROOM;
      setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, needed));
    }
  }, [isVertical]);

  useResizeObserver(updateDimensions, [containerRef, seqRef as unknown as React.RefObject<HTMLElement | null>], [logos, gap, logoHeight, isVertical]);
  useImageLoader(seqRef as unknown as React.RefObject<HTMLElement | null>, updateDimensions, [logos, gap, logoHeight, isVertical]);
  useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical);

  const cssVars = useMemo(
    () =>
      ({
        "--logoloop-gap": `${gap}px`,
        "--logoloop-logoHeight": `${logoHeight}px`,
        ...(fadeOutColor ? { "--logoloop-fadeColor": fadeOutColor } : {}),
      }) as React.CSSProperties,
    [gap, logoHeight, fadeOutColor],
  );

  const rootClassName = useMemo(
    () =>
      ["logoloop", isVertical ? "logoloop--vertical" : "logoloop--horizontal", fadeOut && "logoloop--fade", scaleOnHover && "logoloop--scale-hover", className]
        .filter(Boolean)
        .join(" "),
    [isVertical, fadeOut, scaleOnHover, className],
  );

  const onEnter = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) setIsHovered(true);
  }, [effectiveHoverSpeed]);
  const onLeave = useCallback(() => {
    if (effectiveHoverSpeed !== undefined) setIsHovered(false);
  }, [effectiveHoverSpeed]);

  const renderLogoItem = useCallback(
    (item: LogoItem, key: React.Key) => {
      if (renderItem) {
        return (
          <li className="logoloop__item" key={key} role="listitem">
            {renderItem(item, key)}
          </li>
        );
      }
      const isNode = "node" in item;
      const content = isNode ? (
        <span className="logoloop__node" aria-hidden={!!item.href && !("ariaLabel" in item && item.ariaLabel)}>
          {(item as Extract<LogoItem, { node: React.ReactNode }>).node}
        </span>
      ) : (
        <img
          src={(item as Extract<LogoItem, { src: string }>).src}
          srcSet={(item as Extract<LogoItem, { src: string }>).srcSet}
          sizes={(item as Extract<LogoItem, { src: string }>).sizes}
          width={(item as Extract<LogoItem, { src: string }>).width}
          height={(item as Extract<LogoItem, { src: string }>).height}
          alt={(item as Extract<LogoItem, { src: string }>).alt ?? ""}
          title={item.title}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      );
      const label = isNode
        ? ((item as Extract<LogoItem, { node: React.ReactNode }>).ariaLabel ?? item.title)
        : ((item as Extract<LogoItem, { src: string }>).alt ?? item.title);
      const inner = item.href ? (
        <a className="logoloop__link" href={item.href} aria-label={label || "logo link"} target="_blank" rel="noreferrer noopener">
          {content}
        </a>
      ) : (
        content
      );
      return (
        <li className="logoloop__item" key={key} role="listitem">
          {inner}
        </li>
      );
    },
    [renderItem],
  );

  const logoLists = useMemo(
    () =>
      Array.from({ length: copyCount }, (_, ci) => (
        <ul className="logoloop__list" key={`copy-${ci}`} role="list" aria-hidden={ci > 0} ref={ci === 0 ? seqRef : undefined}>
          {logos.map((item, idx) => renderLogoItem(item, `${ci}-${idx}`))}
        </ul>
      )),
    [copyCount, logos, renderLogoItem],
  );

  const containerStyle = useMemo(
    () => ({
      width: isVertical ? (toCssLength(width) === "100%" ? undefined : toCssLength(width)) : (toCssLength(width) ?? "100%"),
      ...cssVars,
      ...style,
    }),
    [width, cssVars, style, isVertical],
  );

  return (
    <div ref={containerRef} className={rootClassName} style={containerStyle as React.CSSProperties} role="region" aria-label={ariaLabel}>
      <div className="logoloop__track" ref={trackRef} onMouseEnter={onEnter} onMouseLeave={onLeave}>
        {logoLists}
      </div>
    </div>
  );
});

export default LogoLoop;
