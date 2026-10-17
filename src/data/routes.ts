export interface PublicRoute {
  path: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: string;
}

/**
 * Static routes rendered without a slug. Project detail pages are generated
 * from `projects` by the sitemap plugin in `vite.config.ts`.
 */
export const publicRoutes: PublicRoute[] = [
  { path: "/", changefreq: "monthly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/projects", changefreq: "weekly", priority: "0.9" },
  { path: "/gallery", changefreq: "monthly", priority: "0.6" },
  { path: "/experience", changefreq: "monthly", priority: "0.8" },
  { path: "/contact", changefreq: "yearly", priority: "0.7" },
  { path: "/ai-assistant", changefreq: "monthly", priority: "0.6" },
];
