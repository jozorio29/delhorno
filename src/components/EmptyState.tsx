"use client";

import Link from "next/link";

export default function EmptyState() {
  return (
    <div
      className="glass-surface reveal reveal-2 flex min-h-[38vh] flex-col items-center justify-center gap-4 rounded-3xl border-dashed p-8 text-center"
    >
      <p className="text-lg font-medium text-zinc-800">
        Tu carrito está vacío.
      </p>
      <p className="max-w-md text-sm text-[var(--muted)]">
        Agrega algunas pizzas o bebidas y vuelve para revisar tu pedido.
      </p>
      <Link
        href="/menu"
        className="rounded-lg bg-[var(--brand)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#a34726]"
      >
        Explorar menú
      </Link>
    </div>
  );
}
