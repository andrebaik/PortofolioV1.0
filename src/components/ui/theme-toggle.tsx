"use client";

import { Moon, Sun } from "lucide-react";
import { cn } from "../../lib/cn";
import { useTheme } from "../../context/ThemeContext";

export interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "flex h-8 w-16 cursor-pointer rounded-full p-1 transition-all duration-300",
        isDark
          ? "border border-zinc-800 bg-zinc-950"
          : "border border-zinc-200 bg-white",
        className
      )}
      onClick={(e) => toggle(e)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggle();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <div className="flex w-full items-center justify-between">
        <div
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-300",
            isDark
              ? "translate-x-0 bg-zinc-800"
              : "translate-x-8 bg-gray-200"
          )}
        >
          {isDark ? (
            <Moon className="h-3.5 w-3.5 text-white" strokeWidth={1.5} />
          ) : (
            <Sun className="h-3.5 w-3.5 text-gray-700" strokeWidth={1.5} />
          )}
        </div>
        <div
          className={cn(
            "flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-300",
            isDark ? "bg-transparent" : "-translate-x-8"
          )}
        >
          {isDark ? (
            <Sun className="h-3.5 w-3.5 text-gray-500" strokeWidth={1.5} />
          ) : (
            <Moon className="h-3.5 w-3.5 text-black" strokeWidth={1.5} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ThemeToggle;
