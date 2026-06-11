import Navbar from "@/components/Navbar";
import ProductGridByCategory from "@/components/ProductGridByCategory";
import { getProducts } from "@/lib/products";
import Link from "next/link";

export default async function MenuPage() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <section className="container-shell py-14 md:py-20">
        <div className="mb-8 md:mb-10">
          <p className="text-xs font-bold tracking-[0.2em] text-[#ad4f2b]">
            CARTA DEL DIA
          </p>
          <h1 className="section-title mt-2">Nuestra carta</h1>
          <p className="section-copy mt-3 max-w-xl">
            Acompañamientos, empanadas, bebidas y opciones para completar tu
            pedido.
          </p>
        </div>

        <div className="mb-12 flex flex-col justify-between gap-5 rounded-3xl border border-[#d7c8aa] bg-[#fffdf2] p-6 sm:flex-row sm:items-center md:p-8">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-[var(--brand)]">
              PIZZAS XS Y XL
            </p>
            <h2 className="mt-2 text-2xl font-bold text-[#285721] md:text-3xl">
              ¿Completa o mitad y mitad?
            </h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Elegí tus sabores y armá la combinación directamente.
            </p>
          </div>
          <Link
            href="/arma-tu-pizza"
            className="shrink-0 rounded-full bg-[var(--brand)] px-6 py-3 text-center text-sm font-bold text-white transition hover:bg-[var(--brand-deep)]"
          >
            Armá tu pizza
          </Link>
        </div>

        <ProductGridByCategory products={products} />
      </section>
    </>
  );
}
