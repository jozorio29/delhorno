"use client";

import { formatPY } from "@/lib/money";
import { useCart } from "@/store/useCart";
import Image from "next/image";
import Link from "next/link";
import { TrashIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function CartDrawer() {
  const items = useCart((s) => s.items);
  const remove = useCart((s) => s.remove);
  const inc = useCart((s) => s.inc);
  const dec = useCart((s) => s.dec);
  const toggle = useCart((s) => s.toggle);
  const subtotal = useCart((s) =>
    s.items.reduce((acc, it) => acc + it.price * it.quantity, 0)
  );

  return (
    <div
      className="glass-surface z-50 flex w-80 max-w-[90vw] flex-col gap-6 rounded-2xl p-4 text-zinc-900"
    >
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
          <ShoppingCartIcon className="h-12 w-12 text-gray-400" />
          <h3 className="text-lg font-semibold text-zinc-800">
            Tu carrito está vacío
          </h3>
          <p className="text-sm text-gray-500">
            Agrega productos para comenzar tu pedido.
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-xl">Mi carrito</h2>
          <div className="flex flex-col gap-8">
            {/* Cart Item */}
            {items.map((item) => (
              <div className="flex gap-4" key={item.productId}>
                {item.image && item.image !== "/placeholder.png" ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={72}
                    height={96}
                    className="rounded-md object-cover ring-1 ring-black/5"
                  />
                ) : (
                  <div className="grid h-20 w-20 shrink-0 place-items-center rounded-full border-4 border-[#d6a65e] bg-[#f3ca72] px-2 text-center text-[10px] font-black uppercase text-[#6b351c]">
                    Del Horno
                  </div>
                )}

                <div className="flex flex-col justify-between w-full">
                  {/* TOP */}
                  <div>
                    {/* TITLE */}
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="font-semibold">{item.name}</h3>

                      <div className="flex items-center gap-2 rounded-sm bg-gray-50 p-1">
                        {formatPY(item.price)}
                      </div>
                    </div>
                    {/* DESCRIPTION */}
                    {item.description && (
                      <div className="text-sm text-gray-600">
                        {item.description}
                      </div>
                    )}
                  </div>
                  {/* BOTTOM */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => dec(item.productId)}
                        disabled={item.quantity <= 1}
                        className="h-6 w-6 rounded ring-1 ring-gray-300 hover:bg-gray-50"
                        aria-label="Disminuir cantidad"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => inc(item.productId)}
                        className="h-6 w-6 rounded ring-1 ring-gray-300 hover:bg-gray-50"
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => remove(item.productId)}
                      className="text-rose-500"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div>
            <div className="flex justify-between items-center font-semibold">
              <span>Subtotal</span>
              <span>{formatPY(subtotal)}</span>
            </div>
            <p className="mb-4 mt-2 text-sm text-gray-600">
              El envío se confirma por WhatsApp.
            </p>
            <div className="flex justify-between text-sm">
              <Link
                href="/cart"
                onClick={() => toggle(false)}
                className="rounded-md py-3 px-4 ring-1 ring-gray-300"
              >
                Ver carrito
              </Link>{" "}
              <Link
                href="/cart"
                onClick={() => toggle(false)}
                className="rounded-lg bg-[var(--brand)] px-4 py-3 font-semibold text-white shadow-lg transition hover:bg-[#a34726]"
              >
                Finalizar pedido
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
