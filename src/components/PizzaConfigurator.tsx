"use client";

import { useI18n } from "@/lib/i18n/LanguageProvider";
import { trDesc, trName } from "@/lib/i18n/menu";
import type { DictKey } from "@/lib/i18n/translations";
import { formatPY } from "@/lib/money";
import type { Product } from "@/lib/products";
import { useCart, useHydration } from "@/store/useCart";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type PizzaSize = "XS" | "XL";
type PizzaMode = "whole" | "half";

type PizzaVariant = {
  id: string;
  price: number;
};

type PizzaFlavor = {
  key: string;
  name: string;
  description: string;
  category: string;
  variants: Partial<Record<PizzaSize, PizzaVariant>>;
};

const PIZZA_CATEGORIES = new Set([
  "pizzas-clasicas",
  "pizzas-especiales",
  "pizzas-de-la-casa",
]);

const CATEGORY_LABELS: Record<string, DictKey> = {
  "pizzas-clasicas": "cfg_cat_classic",
  "pizzas-especiales": "cfg_cat_special",
  "pizzas-de-la-casa": "cfg_cat_house",
};

function normalizeFlavorName(name: string) {
  return name.replace(/\s+(XS|XL)$/i, "").trim();
}

function getPizzaSize(name: string): PizzaSize | null {
  const match = name.match(/\s+(XS|XL)$/i);
  return match ? (match[1].toUpperCase() as PizzaSize) : null;
}

function toNumber(price: number | string) {
  return typeof price === "number"
    ? price
    : Number(price.replace(/[^\d]/g, ""));
}

function buildFlavors(products: Product[]): PizzaFlavor[] {
  const flavors = new Map<string, PizzaFlavor>();

  products.forEach((product) => {
    const category = product.category?.slug ?? "";
    const productName = product.name ?? product.title ?? "";
    const size = getPizzaSize(productName);

    if (!PIZZA_CATEGORIES.has(category) || !size) return;

    const name = normalizeFlavorName(productName);
    const key = `${category}:${name}`;
    const current = flavors.get(key) ?? {
      key,
      name,
      description: product.desc?.replace(/\s+\d+\s+porciones\.$/i, "") ?? "",
      category,
      variants: {},
    };

    current.variants[size] = {
      id: product._id,
      price: toNumber(product.price),
    };
    flavors.set(key, current);
  });

  return Array.from(flavors.values()).sort((a, b) => {
    const categoryOrder = [
      "pizzas-clasicas",
      "pizzas-especiales",
      "pizzas-de-la-casa",
    ];
    const categoryDiff =
      categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);

    return categoryDiff || a.name.localeCompare(b.name, "es");
  });
}

export default function PizzaConfigurator({
  products,
}: {
  products: Product[];
}) {
  const router = useRouter();
  const { lang, t } = useI18n();
  const add = useCart((state) => state.add);
  const isHydrated = useHydration();
  const flavors = useMemo(() => buildFlavors(products), [products]);
  const [size, setSize] = useState<PizzaSize>("XL");
  const [mode, setMode] = useState<PizzaMode>("whole");
  const [firstFlavorKey, setFirstFlavorKey] = useState(
    () => flavors[0]?.key ?? ""
  );
  const [secondFlavorKey, setSecondFlavorKey] = useState(
    () => flavors[1]?.key ?? flavors[0]?.key ?? ""
  );

  const availableFlavors = flavors.filter((flavor) => flavor.variants[size]);
  const firstFlavor =
    availableFlavors.find((flavor) => flavor.key === firstFlavorKey) ??
    availableFlavors[0];
  const secondFlavor =
    availableFlavors.find((flavor) => flavor.key === secondFlavorKey) ??
    availableFlavors.find((flavor) => flavor.key !== firstFlavor?.key) ??
    availableFlavors[0];

  const firstVariant = firstFlavor?.variants[size];
  const secondVariant = secondFlavor?.variants[size];
  const price =
    mode === "half"
      ? Math.max(firstVariant?.price ?? 0, secondVariant?.price ?? 0)
      : firstVariant?.price ?? 0;

  const selectFlavor = (key: string) => {
    setFirstFlavorKey(key);
    if (mode === "half" && key === secondFlavorKey) {
      const alternative = availableFlavors.find((flavor) => flavor.key !== key);
      if (alternative) setSecondFlavorKey(alternative.key);
    }
  };

  const addConfiguredPizza = () => {
    if (!isHydrated || !firstFlavor || !firstVariant) return;

    const isHalf = mode === "half" && secondFlavor && secondVariant;
    const firstName = trName(firstFlavor.name, lang);
    const secondName = secondFlavor ? trName(secondFlavor.name, lang) : "";
    const flavorLabel = isHalf ? `${firstName} / ${secondName}` : firstName;
    const description = isHalf
      ? t("cfg_item_half").replace("{a}", firstName).replace("{b}", secondName)
      : t("cfg_item_whole").replace("{a}", firstName);
    const productId = isHalf
      ? `pizza:${size}:${firstVariant.id}:${secondVariant.id}`
      : `pizza:${size}:${firstVariant.id}`;

    add({
      _id: productId,
      name: `Pizza ${size} · ${flavorLabel}`,
      price,
      description: `${description} ${
        size === "XS" ? t("cfg_p4") : t("cfg_p8")
      }.`,
    });
    router.push("/cart");
  };

  if (flavors.length === 0) return null;

  return (
    <section className="overflow-hidden rounded-3xl border border-[#d7c8aa] bg-[#fffdf2] shadow-[0_18px_60px_rgba(74,60,32,0.08)] dark:border-[#4d4136] dark:bg-[#221a13]">
      <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
        <div className="p-5 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5 border-b border-[#c8c19c] pb-6 dark:border-[#4d4136]">
            <div>
              <p className="text-xs font-bold tracking-[0.24em] text-[var(--brand)]">
                {t("cfg_eyebrow")}
              </p>
              <h2 className="mt-2 text-3xl font-bold text-[#285721] dark:text-[#9ec98b] md:text-5xl">
                {t("cfg_title")}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">
                {t("cfg_copy")}
              </p>
            </div>

            <div className="flex rounded-full bg-[#f0ead3] p-1 dark:bg-[#2c2218]">
              {(["XS", "XL"] as PizzaSize[]).map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => setSize(option)}
                  className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                    size === option
                      ? "bg-[#285721] text-white shadow-sm"
                      : "text-[#285721] dark:text-[#9ec98b]"
                  }`}
                >
                  {option}
                  <span className="ml-1 text-xs font-normal opacity-75">
                    {option === "XS" ? t("cfg_p4") : t("cfg_p8")}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <button
              type="button"
              onClick={() => setMode("whole")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                mode === "whole"
                  ? "bg-[var(--brand)] text-white"
                  : "border border-[#d7c8aa] text-[#5b4b36] dark:border-[#4d4136] dark:text-[#cfc2ae]"
              }`}
            >
              {t("cfg_whole")}
            </button>
            <button
              type="button"
              onClick={() => setMode("half")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                mode === "half"
                  ? "bg-[var(--brand)] text-white"
                  : "border border-[#d7c8aa] text-[#5b4b36] dark:border-[#4d4136] dark:text-[#cfc2ae]"
              }`}
            >
              {t("cfg_half")}
            </button>
          </div>

          <div className="mt-7 space-y-7">
            {Object.entries(CATEGORY_LABELS).map(([category, labelKey]) => {
              const categoryFlavors = availableFlavors.filter(
                (flavor) => flavor.category === category
              );

              if (categoryFlavors.length === 0) return null;

              return (
                <div key={category}>
                  <h3 className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-[#8b1b18] dark:text-[#e08a6a]">
                    {t(labelKey)}
                  </h3>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {categoryFlavors.map((flavor) => {
                      const selected = firstFlavor?.key === flavor.key;
                      const variant = flavor.variants[size];

                      return (
                        <button
                          type="button"
                          key={flavor.key}
                          onClick={() => selectFlavor(flavor.key)}
                          className={`flex items-start justify-between gap-4 rounded-xl border px-4 py-3 text-left transition ${
                            selected
                              ? "border-[#285721] bg-[#eef2df] ring-1 ring-[#285721] dark:border-[#9ec98b] dark:bg-[#2c3322] dark:ring-[#9ec98b]"
                              : "border-[#ddd5bb] bg-white hover:border-[#9aac7b] dark:border-[#4d4136] dark:bg-[#2c2218]"
                          }`}
                        >
                          <span>
                            <span className="block font-bold text-[#285721] dark:text-[#9ec98b]">
                              {trName(flavor.name, lang)}
                            </span>
                            <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-[#6d6252] dark:text-[#b3a48f]">
                              {trDesc(flavor.description, lang)}
                            </span>
                          </span>
                          <span className="shrink-0 rounded-md bg-[#285721] px-2 py-1 text-xs font-bold text-white">
                            {formatPY(variant?.price ?? 0)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="bg-[#f5eed7] p-5 dark:bg-[#2c2218] md:p-8">
          <div className="sticky top-28">
            <p className="text-xs font-bold tracking-[0.22em] text-[var(--brand)]">
              {t("cfg_combo")}
            </p>

            <div
              className={`mx-auto mt-7 grid aspect-square max-w-64 overflow-hidden rounded-full border-[10px] border-[#d6a65e] bg-[#f4c96f] shadow-[inset_0_0_0_4px_#fff3c7] ${
                mode === "half" ? "grid-cols-2" : ""
              }`}
            >
              <div className="grid place-items-center bg-[#e7ad57] p-3 text-center font-bold text-[#5a2d19]">
                {trName(firstFlavor?.name, lang)}
              </div>
              {mode === "half" && (
                <div className="grid place-items-center border-l-2 border-dashed border-[#fff3c7] bg-[#f2ca72] p-3 text-center font-bold text-[#5a2d19]">
                  {trName(secondFlavor?.name, lang)}
                </div>
              )}
            </div>

            {mode === "half" && (
              <div className="mt-6">
                <label
                  htmlFor="second-flavor"
                  className="mb-2 block text-sm font-bold text-[#285721] dark:text-[#9ec98b]"
                >
                  {t("cfg_second")}
                </label>
                <select
                  id="second-flavor"
                  value={secondFlavor?.key}
                  onChange={(event) => setSecondFlavorKey(event.target.value)}
                  className="w-full rounded-xl border border-[#cbbf9c] bg-white px-3 py-3 text-sm outline-none focus:border-[#285721] dark:border-[#4d4136] dark:bg-[#221a13] dark:text-zinc-100"
                >
                  {availableFlavors
                    .filter((flavor) => flavor.key !== firstFlavor?.key)
                    .map((flavor) => (
                      <option key={flavor.key} value={flavor.key}>
                        {trName(flavor.name, lang)} ·{" "}
                        {formatPY(flavor.variants[size]?.price ?? 0)}
                      </option>
                    ))}
                </select>
                <p className="mt-2 text-xs leading-relaxed text-[#756a55] dark:text-[#b3a48f]">
                  {t("cfg_half_note")}
                </p>
              </div>
            )}

            <div className="mt-7 border-t border-[#cbbf9c] pt-5 dark:border-[#4d4136]">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-sm text-[#756a55] dark:text-[#b3a48f]">
                    {t("cfg_total")}
                  </p>
                  <p className="text-3xl font-black text-[#285721] dark:text-[#9ec98b]">
                    {formatPY(price)}
                  </p>
                </div>
                <span className="rounded-full border border-[#cbbf9c] px-3 py-1 text-xs font-bold text-[#5f543f] dark:border-[#4d4136] dark:text-[#cfc2ae]">
                  {size}
                </span>
              </div>

              <button
                type="button"
                onClick={addConfiguredPizza}
                disabled={!isHydrated || !firstFlavor}
                className="mt-5 w-full rounded-full bg-[var(--brand)] px-5 py-3.5 font-bold text-white transition hover:bg-[var(--brand-deep)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {t("cfg_add")}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
