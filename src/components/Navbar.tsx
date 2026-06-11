"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import NavIcons from "./NavIcons";

const NAV = [
  { href: "/#promos", label: "Promos" },
  { href: "/#opiniones", label: "Opiniones" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contacto", label: "Contacto" },
];

const Navbar = () => {
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
      <div className="container-shell flex min-h-20 items-center justify-between gap-5 py-2">
        <Link href="/" className="shrink-0" aria-label="Del Horno, inicio">
          <span className="relative block h-10 w-36 sm:h-12 sm:w-48 md:h-14 md:w-56">
            <Image
              src="/del-horno-brand-v2.png"
              alt="Logo Del Horno Pizza y Birra"
              fill
              priority
              sizes="(max-width: 768px) 192px, 224px"
              className="object-contain object-left"
            />
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-4">
          <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
            {NAV.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#51493d] transition hover:text-[var(--brand)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/arma-tu-pizza"
            className="hidden shrink-0 rounded-full border border-[#d8c9b4] bg-transparent px-6 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--brand)] hover:bg-white/55 hover:text-[var(--brand)] lg:inline-flex"
          >
            Armá tu pizza
          </Link>

          <div className="shrink-0">
            <NavIcons />
          </div>

          <button
            className="grid h-10 w-10 place-items-center rounded-full border border-[#d8cdbb] bg-white/45 lg:hidden"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Abrir menú</span>
            <div className="flex w-4 flex-col gap-1">
              <span className="h-0.5 w-full bg-zinc-900" />
              <span className="h-0.5 w-full bg-zinc-900" />
              <span className="h-0.5 w-full bg-zinc-900" />
            </div>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[#d8cdbb]/80 bg-[rgba(250,246,239,0.96)] px-4 py-3 shadow-xl backdrop-blur-xl lg:hidden">
          <div className="container-shell flex flex-col gap-2 px-0">
            {NAV.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#fff0e2]"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/arma-tu-pizza"
              className="mt-1 rounded-full border border-[#d8c9b4] bg-transparent px-4 py-3 text-center text-sm font-semibold text-[var(--text)]"
              onClick={() => setOpen(false)}
            >
              Armá tu pizza
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
