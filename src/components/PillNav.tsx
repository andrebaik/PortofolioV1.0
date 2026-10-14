import { NavLink } from "react-router-dom";
import "./PillNav.css";

export interface PillNavItem {
  label: string;
  href: string;
  ariaLabel?: string;
}

export interface PillNavProps {
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string;
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  initialLoadAnimation?: boolean;
  onItemClick?: (item: PillNavItem) => void;
}
export default function PillNav({
  items,
  activeHref,
  className = "",
  baseColor = "#ffffff",
  pillColor = "#0a0a0d",
  hoveredPillTextColor = "#000000",
  pillTextColor,
  onItemClick,
}: PillNavProps) {
  const resolvedPillTextColor = pillTextColor ?? "#ffffff";

  const cssVars = {
    ["--base" as string]: baseColor,
    ["--pill-bg" as string]: pillColor,
    ["--hover-text" as string]: hoveredPillTextColor,
    ["--pill-text" as string]: resolvedPillTextColor,
  } as React.CSSProperties;

  return (
    <nav className={`pill-nav ${className}`} aria-label="Primary" style={cssVars}>
      <div className="pill-nav-items desktop-only">
        <ul className="pill-list" role="menubar">
          {items.map((item) => {
            const isActive = activeHref === item.href;
            const href = item.href;
            const external =
              href.startsWith("http://") ||
              href.startsWith("https://") ||
              href.startsWith("//") ||
              href.startsWith("mailto:") ||
              href.startsWith("tel:");
            const content = (
              <>
                <span className="hover-circle" aria-hidden="true" />
                <span className="label-stack">
                  <span className="pill-label">{item.label}</span>
                  <span className="pill-label-hover" aria-hidden="true">
                    {item.label}
                  </span>
                </span>
              </>
            );

            if (external) {
              return (
                <li key={item.href} role="none">
                  <a
                    role="menuitem"
                    href={item.href}
                    className={`pill${isActive ? " is-active" : ""}`}
                    aria-label={item.ariaLabel || item.label}
                    onClick={() => onItemClick?.(item)}
                  >
                    {content}
                  </a>
                </li>
              );
            }

            return (
              <li key={item.href} role="none">
                <NavLink
                  role="menuitem"
                  to={item.href}
                  className={() => `pill${isActive ? " is-active" : ""}`}
                  aria-label={item.ariaLabel || item.label}
                  onClick={() => onItemClick?.(item)}
                >
                  {content}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
