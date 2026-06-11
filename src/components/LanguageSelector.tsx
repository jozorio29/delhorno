"use client";

import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { Lang, LANG_NAMES, LANGS } from "@/lib/i18n/translations";

export default function LanguageSelector() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onOutsideClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t("lang_aria")}
        aria-expanded={open}
        className="flex h-10 items-center gap-1.5 rounded-full border border-[#cfc2ae] bg-white/75 px-2.5 text-xs font-bold uppercase tracking-wide text-[var(--text)] transition hover:border-[var(--brand)] dark:border-[#604536] dark:bg-[#2a1d16] dark:hover:bg-[#342219] sm:px-3"
      >
        <GlobeAltIcon className="h-4 w-4" />
        <span className="hidden min-[360px]:inline">{lang.toUpperCase()}</span>
      </button>

      {open && (
        <ul
          role="listbox"
          aria-label={t("lang_aria")}
          className="absolute right-0 top-full z-50 mt-2 w-40 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] py-1 shadow-xl"
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
