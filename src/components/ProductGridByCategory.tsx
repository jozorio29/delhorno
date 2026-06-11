"use client";

import { useI18n } from "@/lib/i18n/LanguageProvider";
import { trCategory } from "@/lib/i18n/menu";
import { Product } from "@/lib/products";
import MenuProductRow from "./MenuProductRow";

const CATEGORY_ORDER = [
  "pizzas-clasicas",
  "pizzas-especiales",
  "pizzas-de-la-casa",
  "entradas",
  "sandwiches",
  "empanadas",
  "calzones",
  "bebidas",
  "tragos",
  "cervezas",
  "agregados",
];

const PIZZA_CATEGORIES = new Set([
  "pizzas-clasicas",
  "pizzas-especiales",
  "pizzas-de-la-casa",
]);

function groupProducts(products: Product[]) {
  const groups = new Map<string, { name: string; slug: string; items: Product[] }>();

  products.forEach((product) => {
    const slug = product.category?.slug ?? "carta";
    const name = product.category?.name ?? "Carta";
    const current = groups.get(slug) ?? { name, slug, items: [] };
    current.items.push(product);
    groups.set(slug, current);
  });

  return Array.from(groups.values()).sort((a, b) => {
    const aIndex = CATEGORY_ORDER.indexOf(a.slug);
    const bIndex = CATEGORY_ORDER.indexOf(b.slug);

    if (aIndex === -1 && bIndex === -1) return a.name.localeCompare(b.name);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
    return aIndex - bIndex;
  });
}

export default function ProductGridByCategory({
  products,
}: {
  products: Product[];
}) {
  const { lang, t } = useI18n();
  const groups = groupProducts(products);
  const otherGroups = groups.filter((group) => !PIZZA_CATEGORIES.has(group.slug));

  return (
    <div className="space-y-12">
      {otherGroups.map((group) => (
        <section id={group.slug} key={group.slug} className="scroll-mt-28">
          <div className="mb-5 flex items-end justify-between gap-3 border-b border-[var(--line)] pb-3">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-[#ad4f2b] dark:text-[#e08a6a]">
                {t("menu_label")}
              </p>
              <h3 className="text-2xl font-bold text-[#25581f] dark:text-[#9ec98b] md:text-4xl">
                {trCategory(group.name, lang)}
              </h3>
            </div>
            <span className="rounded-full bg-[#fff2e4] px-3 py-1 text-xs font-bold text-[#8f3420] ring-1 ring-[#f6c398] dark:bg-[#2c2218] dark:text-[#e0a37e] dark:ring-[#5a4631]">
              {group.items.length}
            </span>
          </div>
          <div className="rounded-2xl border border-[#d7d0b5] bg-[#fffdf2] px-5 dark:border-[#4d4136] dark:bg-[#221a13] md:px-7">
            {group.items.map((p) => (
              <MenuProductRow
                key={p._id ?? p.slug ?? p.title ?? p.name}
                product={p}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
