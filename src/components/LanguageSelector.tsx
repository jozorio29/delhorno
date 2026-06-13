"use client";

import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { Lang, LANG_NAMES, LANGS } from "@/lib/i18n/translations";

export default function LanguageSelector({
  floating = false,
}: {
  floating?: boolean;
}) {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const onOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
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

  return (
    <div
      ref={ref}
      style={
        floating
          ? {
              bottom: "calc(5rem + env(safe-area-inset-bottom))",
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateY(0)" : "translateY(12px)",
              pointerEvents: isVisible ? "auto" : "none",
            }
          : undefined
      }
      className={
        floating
          ? "fixed right-4 z-50 transition-[opacity,transform] duration-300 md:hidden"
          : "relative"
      }
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("lang_aria")}
        aria-expanded={open}
        className={
          floating
            ? "flex h-12 items-center gap-2 rounded-full border-2 border-[var(--brand)] bg-white px-4 text-sm font-bold uppercase tracking-wide text-zinc-900 shadow-[0_8px_30px_rgba(88,52,27,0.28)] transition dark:bg-[#2a1d16] dark:text-[#ffd6ad]"
            : "flex h-10 items-center gap-1.5 rounded-full border border-[#cfc2ae] bg-white/75 px-2.5 text-xs font-bold uppercase tracking-wide text-[var(--text)] transition hover:border-[var(--brand)] dark:border-[#604536] dark:bg-[#2a1d16] dark:hover:bg-[#342219] sm:px-3"
        }
      >
        <GlobeAltIcon className={floating ? "h-6 w-6" : "h-4 w-4"} />
        <span className={floating ? "inline" : "hidden min-[360px]:inline"}>
          {lang.toUpperCase()}
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t("lang_aria")}
          className={`absolute right-0 z-50 w-40 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] py-1 shadow-xl ${
            floating ? "bottom-full mb-2" : "top-full mt-2"
          }`}
        >
          {LANGS.map((code: Lang) => (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={code === lang}
                onClick={() => {
                  setLang(code);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-2 text-sm transition hover:bg-[var(--surface-strong)] ${
                  code === lang
                    ? "font-bold text-[var(--brand)]"
                    : "text-[var(--text)]"
                }`}
              >
                {LANG_NAMES[code]}
                <span className="text-[10px] font-bold uppercase text-[var(--muted)]">
                  {code}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
