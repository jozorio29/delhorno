"use client";

import { useI18n } from "@/lib/i18n/LanguageProvider";
import type { DictKey } from "@/lib/i18n/translations";

const STEPS: {
  number: string;
  placeKey: DictKey;
  titleKey: DictKey;
  textKey: DictKey;
}[] = [
  { number: "01", placeKey: "hist_1_place", titleKey: "hist_1_title", textKey: "hist_1_text" },
  { number: "02", placeKey: "hist_2_place", titleKey: "hist_2_title", textKey: "hist_2_text" },
  { number: "03", placeKey: "hist_3_place", titleKey: "hist_3_title", textKey: "hist_3_text" },
  { number: "04", placeKey: "hist_4_place", titleKey: "hist_4_title", textKey: "hist_4_text" },
];

const Historia = () => {
  const { t } = useI18n();

  return (
    <section className="container-shell reveal py-16 md:py-20">
      <div className="reveal reveal-1 mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold tracking-[0.3em] text-[#8b1718] dark:text-[#e08a6a]">
          — {t("hist_eyebrow")} —
        </p>
        <h1 className="mt-5 text-4xl italic leading-tight md:text-6xl">
          {t("hist_title_1")}
        </h1>
        <p className="mt-3 text-2xl font-black uppercase tracking-tight text-[#285721] dark:text-[#9ec98b] md:text-4xl">
          {t("hist_title_2")}
        </p>
        <p className="section-copy mx-auto mt-7 max-w-xl text-base">
          {t("hist_intro")}
        </p>
      </div>

      <div className="stagger-grid mx-auto mt-14 grid max-w-5xl overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] sm:grid-cols-2">
        {STEPS.map((step) => (
          <article
            key={step.number}
            className="border-[var(--line)] p-8 md:p-10 [&:nth-child(2)]:border-t sm:[&:nth-child(2)]:border-t-0 sm:[&:nth-child(2)]:border-l [&:nth-child(3)]:border-t [&:nth-child(4)]:border-t sm:[&:nth-child(4)]:border-l"
          >
            <div className="flex items-baseline justify-between gap-4 border-b border-[var(--line-strong)] pb-4">
              <span className="text-2xl font-black text-[#8b1718] dark:text-[#e08a6a]">
                {step.number}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--muted)]">
                {t(step.placeKey)}
              </span>
            </div>
            <h2 className="mt-6 text-2xl italic md:text-3xl">
              {t(step.titleKey)}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--muted)] md:text-base">
              {t(step.textKey)}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Historia;
