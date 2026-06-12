"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import type { DictKey } from "@/lib/i18n/translations";
import LanguageSelector from "./LanguageSelector";
import NavIcons from "./NavIcons";
import ThemeToggle from "./ThemeToggle";

const NAV: { href: string; labelKey: DictKey }[] = [
  { href: "/#promos", labelKey: "nav_promos" },
  { href: "/historia", labelKey: "nav_historia" },
  { href: "/#opiniones", labelKey: "nav_opiniones" },
  { href: "/#faq", labelKey: "nav_faq" },
  { href: "/#contacto", labelKey: "nav_contacto" },
];

const Navbar = () => {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateNavbar = () => setIsScrolled(window.scrollY > 24);

    updateNavbar();
    window.addEventListener("scroll", updateNavbar, { passive: true });
    return () => window.removeEventListener("scroll", updateNavbar);
  }, []);

  return (
    <header
      className={`site-navbar sticky top-0 z-40 ${
        isScrolled ? "site-navbar--scrolled" : ""
      }`}
    >
      <div className="flex min-h-20 w-full items-center justify-between gap-2 px-4 py-2 sm:gap-5 md:px-8 lg:px-12">
        <Link href="/" className="shrink-0" aria-label={t("nav_home_aria")}>
          <span className="relative block h-10 w-24 sm:h-12 sm:w-48 md:h-14 md:w-56">
            <Image
              src="/del-horno-brand-v2.png"
              alt="Logo Del Horno Pizza y Birra"
              fill
              priority
              sizes="(max-width: 768px) 192px, 224px"
              className="object-contain object-left dark:hidden"
            />
            <Image
              src="/del-horno-brand-dark.png"
              alt=""
              fill
              priority
              aria-hidden="true"
              sizes="(max-width: 768px) 192px, 224px"
              className="hidden object-contain object-left dark:block"
            />
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
          <nav className="hidden flex-1 items-center justify-center gap-7 lg:flex">
            {NAV.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#51493d] transition hover:text-[var(--brand)] dark:text-[#cfc2ae]"
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>

          <div className="shrink-0">
            <NavIcons />
          </div>

          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-[#d8cdbb] bg-white/45 dark:border-[#4d4136] dark:bg-white/10 lg:hidden"
            aria-label={t("nav_open_menu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{t("nav_open_menu")}</span>
            <div className="flex w-4 flex-col gap-1">
              <span className="h-0.5 w-full bg-zinc-900 dark:bg-zinc-100" />
              <span className="h-0.5 w-full bg-zinc-900 dark:bg-zinc-100" />
              <span className="h-0.5 w-full bg-zinc-900 dark:bg-zinc-100" />
            </div>
          </button>

          <div className="flex shrink-0 items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t border-[#d8cdbb]/80 bg-[rgba(var(--bg-veil),0.96)] px-4 py-3 shadow-xl backdrop-blur-xl dark:border-[#4d4136]/80 lg:hidden">
          <div className="container-shell flex flex-col gap-2 px-0">
            {NAV.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#fff0e2] dark:hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
