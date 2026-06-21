"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle({ className = "" }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = resolvedTheme === "dark";
  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`grid h-9 w-9 place-items-center rounded-xl border border-ink-200 text-ink-600 transition hover:border-brand-400 hover:text-brand-500 dark:border-ink-700 dark:text-ink-200 ${className}`}
    >
      {mounted ? (isDark ? <FiSun className="h-[18px] w-[18px]" /> : <FiMoon className="h-[18px] w-[18px]" />) : <span className="h-[18px] w-[18px]" />}
    </button>
  );
}