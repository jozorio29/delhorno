"use client";

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

const CATEGORY_LABELS: Record<string, string> = {
  "pizzas-clasicas": "Clásicas",
  "pizzas-especiales": "Especiales",
  "pizzas-de-la-casa": "De la casa",
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
    const flavorLabel = isHalf
      ? `${firstFlavor.name} / ${secondFlavor.name}`
      : firstFlavor.name;
    const description = isHalf
      ? `Mitad ${firstFlavor.name} y mitad ${secondFlavor.name}.`
      : `Pizza completa de ${firstFlavor.name}.`;
    const productId = isHalf
      ? `pizza:${size}:${firstVariant.id}:${secondVariant.id}`
      : `pizza:${size}:${firstVariant.id}`;

    add({
      _id: productId,
      name: `Pizza ${size} · ${flavorLabel}`,
      price,
      description: `${description} ${
        size === "XS" ? "4 porciones." : "8 porciones."
      }`,
    });
    router.push("/cart");
  };

  if (flavors.length === 0) return null;

  return (
    <section className="overflow-hidden rounded-3xl border border-[#d7c8aa] bg-[#fffdf2] shadow-[0_18px_60px_rgba(74,60,32,0.08)]">
      <div className="grid lg:grid-cols-[1.35fr_0.65fr]">
        <div className="p-5 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5 border-b border-[#c8c19c] pb-6">
            <div>
              <p className="text-xs font-bold tracking-[0.24em] text-[var(--brand)]">
                ARMA TU PEDIDO
              </p>
              <h2 className="mt-2 text-3xl font-bold text-[#285721] md:text-5xl">
                Elegí tu pizza
              </h2>
              <p className="mt-2 max-w-xl text-sm text-[var(--muted)]">
                Seleccioná el tamaño y pedila completa o combiná dos sabores.
              </p>
            </div>

            <div className="flex rounded-full bg-[#f0ead3] p-1">
              {(["XS", "XL"] as PizzaSize[]).map((option) => (
                <button
                  type="button"
                  key={option}
                  onClick={() => setSize(option)}
                  className={`rounded-full px-5 py-2 text-sm font-bold transition ${
                    size === option
                      ? "bg-[#285721] text-white shadow-sm"
                      : "text-[#285721]"
                  }`}
                >
                  {option}
                  <span className="ml-1 text-xs font-normal opacity-75">
                    {option === "XS" ? "4 porciones" : "8 porciones"}
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
                  : "border border-[#d7c8aa] text-[#5b4b36]"
              }`}
            >
              Pizza completa
            </button>
            <button
              type="button"
              onClick={() => setMode("half")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                mode === "half"
                  ? "bg-[var(--brand)] text-white"
                  : "border border-[#d7c8aa] text-[#5b4b36]"
              }`}
            >
              Mitad y mitad
            </button>
          </div>

          <div className="mt-7 space-y-7">
            {Object.entries(CATEGORY_LABELS).map(([category, label]) => {
              const categoryFlavors = availableFlavors.filter(
                (flavor) => flavor.category === category
              );

              if (categoryFlavors.length === 0) return null;

              return (
                <div key={category}>
                  <h3 className="mb-3 text-sm font-black uppercase tracking-[0.16em] text-[#8b1b18]">
                    {label}
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
                              ? "border-[#285721] bg-[#eef2df] ring-1 ring-[#285721]"
                              : "border-[#ddd5bb] bg-white hover:border-[#9aac7b]"
                          }`}
                        >
                          <span>
                            <span className="block font-bold text-[#285721]">
                              {flavor.name}
                            </span>
                            <span className="mt-1 line-clamp-2 block text-xs leading-relaxed text-[#6d6252]">
                              {flavor.description}
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

        <aside className="bg-[#f5eed7] p-5 md:p-8">
          <div className="sticky top-28">
            <p className="text-xs font-bold tracking-[0.22em] text-[var(--brand)]">
              TU COMBINACIÓN
            </p>

            <div
              className={`mx-auto mt-7 grid aspect-square max-w-64 overflow-hidden rounded-full border-[10px] border-[#d6a65e] bg-[#f4c96f] shadow-[inset_0_0_0_4px_#fff3c7] ${
                mode === "half" ? "grid-cols-2" : ""
              }`}
            >
              <div className="grid place-items-center bg-[#e7ad57] p-3 text-center font-bold text-[#5a2d19]">
                {firstFlavor?.name}
              </div>
              {mode === "half" && (
                <div className="grid place-items-center border-l-2 border-dashed border-[#fff3c7] bg-[#f2ca72] p-3 text-center font-bold text-[#5a2d19]">
                  {secondFlavor?.name}
                </div>
              )}
            </div>

            {mode === "half" && (
              <div className="mt-6">
                <label
                  htmlFor="second-flavor"
                  className="mb-2 block text-sm font-bold text-[#285721]"
                >
                  Segundo sabor
                </label>
                <select
                  id="second-flavor"
                  value={secondFlavor?.key}
                  onChange={(event) => setSecondFlavorKey(event.target.value)}
                  className="w-full rounded-xl border border-[#cbbf9c] bg-white px-3 py-3 text-sm outline-none focus:border-[#285721]"
                >
                  {availableFlavors
                    .filter((flavor) => flavor.key !== firstFlavor?.key)
                    .map((flavor) => (
                      <option key={flavor.key} value={flavor.key}>
                        {flavor.name} ·{" "}
                        {formatPY(flavor.variants[size]?.price ?? 0)}
                      </option>
                    ))}
                </select>
                <p className="mt-2 text-xs leading-relaxed text-[#756a55]">
                  En mitad y mitad se cobra el sabor de mayor valor.
                </p>
              </div>
            )}

            <div className="mt-7 border-t border-[#cbbf9c] pt-5">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-sm text-[#756a55]">Total</p>
                  <p className="text-3xl font-black text-[#285721]">
                    {formatPY(price)}
                  </p>
                </div>
                <span className="rounded-full border border-[#cbbf9c] px-3 py-1 text-xs font-bold text-[#5f543f]">
                  {size}
                </span>
              </div>

              <button
                type="button"
                onClick={addConfiguredPizza}
                disabled={!isHydrated || !firstFlavor}
                className="mt-5 w-full rounded-full bg-[var(--brand)] px-5 py-3.5 font-bold text-white transition hover:bg-[var(--brand-deep)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                Agregar y ver carrito
              </button>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
