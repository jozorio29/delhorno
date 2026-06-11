// GlassCard.tsx

import { Product } from "@/lib/products";
import Image from "next/image";
import { AddToCartButton } from "./AddToCartButton";
import { ProductForCart } from "@/types/cart";

type CardProps = {
  product: Product;
  badge?: string | string[];
};

function formatPY(price: number | string) {
  if (typeof price === "string") return price;
  return new Intl.NumberFormat("es-PY", {
    style: "currency",
    currency: "PYG",
  }).format(price);
}

const GlassCard = ({ product, badge }: CardProps) => {
  const title = product.title ?? product.name ?? "Producto sin titulo";
  const desc = product.desc || "";
  const img = product.image || "/placeholder.png";
  const price = formatPY(product.price);
  const badgeText = Array.isArray(badge) ? badge[0] : badge;

  const productForCart: ProductForCart = {
    _id: product._id,
    name: product.name || product.title || "Producto sin titulo",
    slug: product.slug,
    image: product.image,
    price: product.price as number,
    description: product.desc,
  };

  return (
    <div className="group depth-card relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={img}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badgeText && (
          <span className="absolute left-3 top-3 rounded-full bg-[var(--bg)] px-3 py-1 text-xs font-semibold text-[var(--brand-deep)]">
            {badgeText}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex w-full items-baseline justify-between gap-2">
          <h3 className="text-lg tracking-tight text-[var(--text)]">{title}</h3>
          {price && (
            <span className="shrink-0 text-sm font-semibold text-[var(--brand)]">
              {price}
            </span>
          )}
        </div>
        {desc && (
          <p className="mt-1 line-clamp-2 text-sm text-[var(--muted)]">
            {desc.trim()}
          </p>
        )}
        <div className="mt-auto">
          <div className="mt-4">
            <AddToCartButton product={productForCart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlassCard;
