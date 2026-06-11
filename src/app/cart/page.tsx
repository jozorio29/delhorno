"use client";

import CartSummary from "@/components/checkout/CartSummary";
import EmptyState from "@/components/EmptyState";
import { formatPY } from "@/lib/money";
import { useCart, useHydration } from "@/store/useCart";
import { TrashIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

export default function CartPage() {
  const items = useCart((s) => s.items);
  const inc = useCart((s) => s.inc);
  const dec = useCart((s) => s.dec);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const isHydrated = useHydration();

  const isEmpty = items.length === 0;

  const subtotal = useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items]
  );

  if (!isHydrated) {
    return (
      <section className="container-shell py-12">
        <h1 className="section-title mb-5 text-3xl">Tu carrito</h1>
        <div className="space-y-4">
          <div className="h-8 w-1/3 animate-pulse rounded-xl bg-[#eadacb]" />
          <div className="h-28 animate-pulse rounded-2xl bg-[#f4e9dc]" />
          <div className="h-28 animate-pulse rounded-2xl bg-[#f4e9dc]" />
          <div className="h-12 w-1/4 animate-pulse rounded-xl bg-[#eadacb]" />
        </div>
      </section>
    );
  }

  return (
    <section className="container-shell reveal py-12 md:py-16">
      <div className="reveal reveal-1 mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-[#ad4f2b]">
            FINALIZA TU PEDIDO
          </p>
          <h1 className="section-title mt-2 text-4xl md:text-5xl">Tu carrito</h1>
        </div>
        <Link
          href="/menu"
          className="rounded-full border border-[var(--line)] bg-white px-4 py-2 text-sm font-semibold transition hover:bg-[#fff0e2]"
        >
          Seguir comprando
        </Link>
      </div>

      {isEmpty ? (
        <EmptyState />
      ) : (
        <div className="grid gap-8 md:grid-cols-[1fr_340px]">
          <div className="stagger-grid space-y-4">
            {items.map((item) => (
              <article
                key={item.productId}
                className="glass-surface flex items-start gap-4 rounded-2xl p-4 md:p-5"
              >
                {item.image && item.image !== "/placeholder.png" ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="h-24 w-24 rounded-xl object-cover ring-1 ring-black/5"
                  />
                ) : (
                  <div className="grid h-24 w-24 shrink-0 place-items-center rounded-full border-[5px] border-[#d6a65e] bg-[#f3ca72] px-3 text-center text-xs font-black uppercase text-[#6b351c]">
                    Del Horno
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="truncate text-base font-semibold text-zinc-900">
                        {item.name}
                      </h3>
                      {item.description ? (
                        <p className="mt-1 text-sm text-[var(--muted)]">
                          {item.description}
                        </p>
                      ) : null}
                    </div>

                    <div className="shrink-0 rounded-lg bg-[#fff1e3] px-2.5 py-1 text-sm font-semibold text-zinc-800 ring-1 ring-[#f1d0b4]">
                      {formatPY(item.price)}
                    </div>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        className="h-8 w-8 cursor-pointer rounded-md ring-1 ring-[#d9bba3] transition hover:bg-[#fff0e2] disabled:opacity-50"
                        aria-label={`Disminuir cantidad de ${item.name}`}
                        onClick={() => dec(item.productId)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="w-8 text-center text-sm text-zinc-900">
                        {item.quantity}
                      </span>
                      <button
                        className="h-8 w-8 cursor-pointer rounded-md ring-1 ring-[#d9bba3] transition hover:bg-[#fff0e2] disabled:opacity-50"
                        aria-label={`Aumentar cantidad de ${item.name}`}
                        onClick={() => inc(item.productId)}
                      >
                        +
                      </button>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="font-semibold text-zinc-900">
                        {formatPY(item.price * item.quantity)}
                      </div>
                      <button
                        onClick={() => remove(item.productId)}
                        className="cursor-pointer text-rose-600 transition hover:text-rose-800"
                        aria-label={`Quitar ${item.name} del carrito`}
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            <div className="reveal reveal-2 flex items-center justify-end">
              <button
                className="rounded-md px-3 py-2 text-sm text-zinc-700 ring-1 ring-[#d9bba3] transition hover:bg-[#fff0e2] disabled:opacity-50"
                onClick={() => clear()}
              >
                Vaciar carrito
              </button>
            </div>
          </div>

          <CartSummary subtotal={subtotal} />
        </div>
      )}
    </section>
  );
}
