"use client";

import { useI18n } from "@/lib/i18n/LanguageProvider";
import { useCart, useHydration } from "@/store/useCart";
import { ProductForCart } from "@/types/cart";
import { useRouter } from "next/navigation";

export function AddToCartButton({ product }: { product: ProductForCart }) {
  const { t } = useI18n();
  const add = useCart((s) => s.add);
  const isHydrated = useHydration();
  const router = useRouter();

  return (
    <button
      onClick={() => {
        if (!isHydrated) return;
        add(product, 1);
        router.push("/cart");
      }}
      disabled={!isHydrated}
      className="w-full rounded-full border border-[var(--line-strong)] bg-transparent px-4 py-2.5 text-sm font-semibold text-[var(--text)] transition hover:border-[var(--brand)] hover:bg-[var(--brand)] hover:text-white"
    >
      {t("add_to_cart")}
    </button>
  );
}
