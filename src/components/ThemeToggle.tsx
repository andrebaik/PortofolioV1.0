import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      onClick={(e) => toggle(e)}
      aria-label="toggle theme"
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow-soft ring-1 ring-black/5 transition hover:scale-[1.03] active:scale-[0.97] dark:bg-zinc-900 dark:text-zinc-100 dark:ring-white/10"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
