import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PizzaConfigurator from "@/components/PizzaConfigurator";
import { T } from "@/lib/i18n/LanguageProvider";
import { getProducts } from "@/lib/products";

const PIZZA_CATEGORIES = new Set([
  "pizzas-clasicas",
  "pizzas-especiales",
  "pizzas-de-la-casa",
]);

export const metadata: Metadata = {
  title: "Armá tu pizza",
  description:
    "Elegí el tamaño y combiná tus sabores favoritos para armar una pizza personalizada de Del Horno en Encarnación.",
  alternates: {
    canonical: "/arma-tu-pizza",
  },
  openGraph: {
    title: "Armá tu pizza | Del Horno Pizzería",
    description:
      "Elegí el tamaño y combiná tus sabores favoritos en una pizza artesanal.",
    url: "/arma-tu-pizza",
  },
};

export default async function BuildYourPizzaPage() {
  const products = await getProducts();
  const pizzaProducts = products.filter((product) =>
    PIZZA_CATEGORIES.has(product.category?.slug ?? "")
  );

  return (
    <>
      <Navbar />
      <main className="container-shell py-12 md:py-16">
        <div className="mb-8 md:mb-10">
          <p className="text-xs font-bold tracking-[0.22em] text-[var(--brand)]">
            <T k="btp_eyebrow" />
          </p>
          <h1 className="section-title mt-2">
            <T k="btp_title" />
          </h1>
          <p className="section-copy mt-3 max-w-xl">
            <T k="btp_copy" />
          </p>
        </div>

        <PizzaConfigurator products={pizzaProducts} />
      </main>
      <Footer />
    </>
  );
}
