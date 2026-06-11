import React from "react";
import { Product } from "@/lib/products";
import ProductGridByCategory from "./ProductGridByCategory";

const Menu = ({ products }: { products: Product[] }) => {
  return (
    <section
      id="menu"
      className="container-shell reveal py-16 md:py-20"
    >
      <div className="reveal reveal-1 mb-8 md:mb-10">
        <p className="text-xs font-bold tracking-[0.2em] text-[#ad4f2b]">
          MENU ARTESANAL
        </p>
        <h2 className="section-title mt-2">Todo el menu</h2>
        <p className="section-copy mt-3 max-w-xl">
          Elegi entre nuestras recetas clasicas y especiales del horno.
        </p>
      </div>
      <ProductGridByCategory products={products} />
    </section>
  );
};

export default Menu;
