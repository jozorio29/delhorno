import { formatPY } from "@/lib/money";
import type { Product } from "@/lib/products";
import { AddToCartButton } from "./AddToCartButton";

function toNumber(price: number | string) {
  return typeof price === "number"
    ? price
    : Number(price.replace(/[^\d]/g, ""));
}

export default function MenuProductRow({ product }: { product: Product }) {
  const name = product.name ?? product.title ?? "Producto";
  const price = toNumber(product.price);

  return (
    <article className="flex flex-col gap-4 border-b border-[#d7d0b5] py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="max-w-2xl">
        <h4 className="text-xl font-bold uppercase tracking-tight text-[#285721]">
          {name}
        </h4>
        {product.desc && (
          <p className="mt-1 text-sm leading-relaxed text-[#6d6252]">
            {product.desc}
          </p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span className="rounded-md bg-[#285721] px-3 py-2 font-bold text-white">
          {formatPY(price)}
        </span>
        <div className="w-40">
          <AddToCartButton
            product={{
              _id: product._id,
              name,
              price,
              description: product.desc,
            }}
          />
        </div>
      </div>
    </article>
  );
}
