import Navbar from "@/components/Navbar";
import ProductGridByCategory from "@/components/ProductGridByCategory";
import { T } from "@/lib/i18n/LanguageProvider";
import { getProducts } from "@/lib/products";
import Link from "next/link";

export default async function MenuPage() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <section className="container-shell py-14 md:py-20">
        <div className="mb-8 md:mb-10">
          <p className="text-xs font-bold tracking-[0.2em] text-[#ad4f2b] dark:text-[#e08a6a]">
            <T k="menu_eyebrow" />
          </p>
          <h1 className="section-title mt-2">
            <T k="menu_title" />
          </h1>
          <p className="section-copy mt-3 max-w-xl">
            <T k="menu_copy" />
          </p>
        </div>

        <div className="mb-12 flex flex-col justify-between gap-5 rounded-3xl border border-[#d7c8aa] bg-[#fffdf2] p-6 dark:border-[#4d4136] dark:bg-[#221a13] sm:flex-row sm:items-center md:p-8">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-[var(--brand)]">
              <T k="menu_banner_eyebrow" />
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#285721] dark:text-[#9ec98b] md:text-3xl">
              <T k="menu_banner_title" />
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              <T k="menu_banner_copy" />
            </p>
          </div>
          <Link
            href="/arma-tu-pizza"
            className="shrink-0 rounded-full bg-[var(--brand)] px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-[var(--brand-deep)]"
          >
            <T k="menu_banner_cta" />
          </Link>
        </div>

        <ProductGridByCategory products={products} />
      </section>
    </>
  );
}
