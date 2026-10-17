import { useEffect } from "react";
import { site } from "../data/site";

const DEFAULT_DESCRIPTION =
  "Portfolio of Mochamad Vicryandre Nurdin — Full Stack Developer and AI Systems Engineer building component-driven web architectures and retrieval-augmented AI systems.";

const JSON_LD_ID = "seo-json-ld";

interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  noindex?: boolean;
}

/** Upsert a `<meta name=…>` tag in `<head>` without ever duplicating it. */
function setMeta(name: string, content: string): void {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Upsert the canonical link; removes it on `noindex` routes. */
function setCanonical(href: string | null): void {
  const existing = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]'
  );
  if (!href) {
    existing?.remove();
    return;
  }
  if (existing) {
    existing.setAttribute("href", href);
    return;
  }
  const el = document.createElement("link");
  el.setAttribute("rel", "canonical");
  el.setAttribute("href", href);
  document.head.appendChild(el);
}

/**
 * Per-route document metadata.
 *
 * Updates the tags already declared in `index.html` in place instead of
 * appending new ones, so non-JS crawlers keep the static fallback and rendered
 * pages never carry duplicate `<title>` / `description` tags.
 *
 * Social-preview tags (og:*, twitter:*) stay static in `index.html` — scrapers
 * do not execute JavaScript, and they are origin-independent as written.
 */
export function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  noindex = false,
}: SeoProps) {
  useEffect(() => {
    const fullTitle = title
      ? `${title} — ${site.name}`
      : `${site.name} — ${site.role}`;

    const origin = window.location.origin;
    const canonical = `${origin}${path}`;

    document.title = fullTitle;
    setMeta("description", description);
    setMeta("robots", noindex ? "noindex, nofollow" : "index, follow");
    setCanonical(noindex ? null : canonical);

    let script = document.getElementById(JSON_LD_ID) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = JSON_LD_ID;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: site.name,
      jobTitle: site.role,
      description,
      email: `mailto:${site.email}`,
      url: canonical,
      image: `${origin}/img/andre.webp`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Garut",
        addressCountry: "ID",
      },
      sameAs: [site.github, site.linkedin, site.instagram],
    });
  }, [title, description, path, noindex]);

  return null;
}
