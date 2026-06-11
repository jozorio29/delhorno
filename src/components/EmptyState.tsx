"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n/LanguageProvider";

export default function EmptyState() {
  const { t } = useI18n();

  return (
    <div
      className="glass-surface reveal reveal-2 flex min-h-[38vh] flex-col items-center justify-center gap-4 rounded-3xl border-dashed p-8 text-center"
    >
      <p className="text-lg font-medium text-zinc-800 dark:text-zinc-100">
        {t("cart_empty_title")}.
      </p>
      <p className="max-w-md text-sm text-[var(--muted)]">
        {t("cart_empty_copy2")}
      </p>
      <Link
        href="/menu"
        className="rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#a34726]"
      >
        {t("cart_explore")}
      </Link>
    </div>
  );
}
