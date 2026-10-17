import { Link } from "react-router-dom";
import { Seo } from "../components/Seo";

export function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 text-center md:px-6">
      <Seo title="404" path="/404" noindex />
      <p className="text-sm tracking-widest text-neutral-500 dark:text-zinc-500">404</p>
      <h1 className="mt-2 font-display text-3xl font-bold dark:text-white">Page not found</h1>
      <Link to="/" className="mt-6 inline-flex rounded-full bg-ink px-6 py-2.5 text-sm text-white dark:bg-white dark:text-ink">Go home</Link>
    </div>
  );
}
