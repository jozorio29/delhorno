"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/LanguageProvider";

export default function ThemeToggle({
  compact = false,
}: {
  compact?: boolean;
}) {
  const { t } = useI18n();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const syncTheme = () => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem("dh-theme");
      } catch {
        // ignore
      }

      const next = saved ? saved === "dark" : media.matches;
      document.documentElement.classList.toggle("dark", next);
      setIsDark(next);
    };

    setMounted(true);
    syncTheme();
    media.addEventListener("change", syncTheme);
    window.addEventListener("dh-theme-change", syncTheme);

    return () => {
      media.removeEventListener("change", syncTheme);
      window.removeEventListener("dh-theme-change", syncTheme);
    };
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("dh-theme", next ? "dark" : "light");
    } catch {
      // ignore
    }
    window.dispatchEvent(new Event("dh-theme-change"));
  };

  const label = isDark ? t("theme_light") : t("theme_dark");

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`grid place-items-center rounded-full border border-[#cfc2ae] bg-white/75 text-[var(--text)] transition hover:border-[var(--brand)] dark:border-[#604536] dark:bg-[#2a1d16] dark:text-[#ffd6ad] dark:hover:bg-[#342219] ${
        compact ? "h-8 w-8" : "h-10 w-10"
      }`}
    >
      {mounted && isDark ? (
        <SunIcon className={compact ? "h-4 w-4" : "h-5 w-5"} />
      ) : (
        <MoonIcon className={compact ? "h-4 w-4" : "h-5 w-5"} />
      )}
    </button>
  );
}
