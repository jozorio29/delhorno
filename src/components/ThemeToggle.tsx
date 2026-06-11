"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/LanguageProvider";

export default function ThemeToggle() {
  const { t } = useI18n();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
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
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? t("theme_light") : t("theme_dark")}
      title={isDark ? t("theme_light") : t("theme_dark")}
      className="grid h-10 w-10 place-items-center rounded-full border border-[#cfc2ae] bg-white/75 text-[var(--text)] transition hover:border-[var(--brand)] dark:border-[#604536] dark:bg-[#2a1d16] dark:text-[#ffd6ad] dark:hover:bg-[#342219]"
    >
      {mounted && isDark ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  );
}
