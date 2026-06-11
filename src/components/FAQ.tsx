"use client";

import { useI18n } from "@/lib/i18n/LanguageProvider";
import type { DictKey } from "@/lib/i18n/translations";

const ITEMS: { q: DictKey; a: DictKey }[] = [
  { q: "faq1_q", a: "faq1_a" },
  { q: "faq2_q", a: "faq2_a" },
  { q: "faq3_q", a: "faq3_a" },
];

const FAQ = () => {
  const { t } = useI18n();

  return (
    <section id="faq" className="container-shell reveal py-16 md:py-20">
      <div className="mx-auto max-w-3xl reveal reveal-1">
        <p className="text-center text-xs font-bold tracking-[0.2em] text-[#ad4f2b] dark:text-[#e08a6a]">
          {t("faq_eyebrow")}
        </p>
        <h2 className="section-title mt-2 text-center">{t("faq_title")}</h2>
        <div className="stagger-grid mt-8 space-y-3">
          {ITEMS.map((item) => (
            <details
              key={item.q}
              className="glass-surface group rounded-2xl p-5 open:bg-[#fff3e6] dark:open:bg-[#2c2218]"
            >
              <summary className="cursor-pointer list-none pr-8 text-base font-semibold">
                {t(item.q)}
              </summary>
              <p className="mt-3 text-sm text-[var(--muted)]">{t(item.a)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
