"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/LanguageProvider";

export default function ThemeToggle({
  floating = false,
}: {
  floating?: boolean;
}) {
  const { t } = useI18n();
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    setMounted(true);
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  useEffect(() => {
    if (!floating) return;

    let frame = 0;
    let showTimer: ReturnType<typeof setTimeout>;
    lastScrollY.current = window.scrollY;

    const updateVisibility = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        const isScrollingDown = currentScrollY > lastScrollY.current;

        setIsVisible(!isScrollingDown || currentScrollY < 40);
        lastScrollY.current = currentScrollY;

        clearTimeout(showTimer);
        showTimer = setTimeout(() => setIsVisible(true), 700);
      });
    };

    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(showTimer);
      window.removeEventListener("scroll", updateVisibility);
    };
  }, [floating]);

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

  const label = isDark ? t("theme_light") : t("theme_dark");

  if (floating) {
    return (
      <button
        type="button"
        onClick={toggle}
        aria-label={label}
        title={label}
        style={{
          bottom: "calc(1.25rem + env(safe-area-inset-bottom))",
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : "translateY(12px)",
          pointerEvents: isVisible ? "auto" : "none",
        }}
        className="fixed right-4 z-50 flex items-center gap-2 rounded-full border-2 border-[var(--brand)] bg-white px-4 py-3 font-semibold text-zinc-900 shadow-[0_8px_30px_rgba(88,52,27,0.28)] transition-[opacity,transform,background-color,color,border-color,box-shadow] duration-300 dark:bg-[#2a1d16] dark:text-[#ffd6ad] md:hidden"
      >
        {mounted && isDark ? (
          <SunIcon className="h-6 w-6 shrink-0" />
        ) : (
          <MoonIcon className="h-6 w-6 shrink-0" />
        )}
        <span className="text-sm">{label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
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
