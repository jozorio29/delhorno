"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import type { DictKey } from "@/lib/i18n/translations";

const STATS: { value: string; labelKey: DictKey }[] = [
  { value: "4.9", labelKey: "hero_stat_rating" },
  { value: "30 min", labelKey: "hero_stat_delivery" },
  { value: "+900", labelKey: "hero_stat_orders" },
];

const Hero = () => {
  const { t } = useI18n();

  return (
    <section className="hero-section relative flex min-h-[calc(100dvh-5rem)] items-center overflow-hidden text-center">
      <div className="container-shell relative z-10 w-full py-12 md:py-16">
        <div className="hero-fade mx-auto max-w-3xl">
          <p className="text-xs font-semibold tracking-[0.25em] text-[var(--brand)]">
            {t("hero_location")}
          </p>
          <h1 className="mt-5 text-4xl leading-tight md:text-6xl">
            Del Horno
            <br />
            {t("hero_title_2")}
          </h1>
          <p className="section-copy mx-auto mt-5 max-w-md text-base md:text-lg">
            {t("hero_copy")}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/menu"
              className="rounded-full bg-[var(--brand)] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-deep)]"
            >
              {t("hero_cta")}
            </Link>
            <Link
              href="/arma-tu-pizza"
              className="rounded-full border border-[var(--line-strong)] bg-[var(--surface)]/55 px-7 py-3 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--brand)] hover:bg-[var(--surface)] hover:text-[var(--brand)]"
            >
              {t("nav_build")}
            </Link>
          </div>

          <div className="mt-10 flex items-center justify-center gap-8 md:gap-12">
            {STATS.map((stat) => (
              <div key={stat.labelKey} className="text-sm">
                <span className="font-semibold text-[var(--text)]">
                  {stat.value}
                </span>{" "}
                <span className="text-[var(--muted)]">{t(stat.labelKey)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
