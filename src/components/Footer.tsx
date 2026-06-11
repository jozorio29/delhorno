"use client";

import React from "react";

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-5 w-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4.25" />
    <circle cx="17.4" cy="6.7" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-5 w-5"
    fill="currentColor"
  >
    <path d="M13.7 21v-8h2.8l.4-3.1h-3.2V7.8c0-.9.3-1.6 1.7-1.6H17V3.4c-.5-.1-1.3-.2-2.4-.2-2.4 0-4.1 1.5-4.1 4.3v2.4H8v3.1h2.5v8h3.2Z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="border-t border-[var(--line)] bg-[rgba(var(--bg-veil),0.9)] py-10 text-sm backdrop-blur">
      <div className="container-shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <p className="text-[var(--muted)]">
            © {new Date().getFullYear()} Encarnación, Paraguay
          </p>
          <div className="flex items-center gap-3">
            <span className="font-semibold">Del Horno | Pizza</span>
            <a
              href="https://www.instagram.com/delhornopizzeria/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram de Del Horno Pizzería"
              className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line-strong)] text-[var(--text)] transition hover:border-[var(--brand)] hover:bg-[var(--surface-strong)] hover:text-[var(--brand)]"
            >
              <InstagramIcon />
            </a>
            <a
              href="https://www.facebook.com/people/Del-Horno-Pizzeria/61582955600278/"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook de Del Horno Pizzería"
              className="grid h-9 w-9 place-items-center rounded-full border border-[var(--line-strong)] text-[var(--text)] transition hover:border-[var(--brand)] hover:bg-[var(--surface-strong)] hover:text-[var(--brand)]"
            >
              <FacebookIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
