"use client";

import { useI18n } from "@/lib/i18n/LanguageProvider";
import { formatPY } from "@/lib/money";
import { useCart } from "@/store/useCart";
import Image from "next/image";
import Link from "next/link";
import { TrashIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

export default function CartDrawer() {
  const { t } = useI18n();
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
      className="glass-surface z-50 flex max-h-[calc(100dvh-6.5rem)] w-full flex-col gap-6 overflow-y-auto rounded-2xl p-4 text-[var(--text)] sm:w-80"
    >
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
          <ShoppingCartIcon className="h-12 w-12 text-gray-400" />
          <h3 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
            {t("cart_empty_title")}
          </h3>
          <p className="text-sm text-gray-500 dark:text-[#b3a48f]">
            {t("cart_empty_copy")}
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-xl">{t("drawer_title")}</h2>
          <div className="flex flex-col gap-8">
            {/* Cart Item */}
            {items.map((item) => (
              <div className="flex min-w-0 gap-3 sm:gap-4" key={item.productId}>
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

                <div className="flex min-w-0 w-full flex-col justify-between">
                  {/* TOP */}
                  <div>
                    {/* TITLE */}
                    <div className="flex min-w-0 items-start justify-between gap-2">
                      <h3 className="min-w-0 truncate font-semibold">
                        {item.name}
                      </h3>

                      <div className="shrink-0 rounded-sm bg-gray-50 p-1 text-sm dark:bg-white/10">
                        {formatPY(item.price)}
                      </div>
                    </div>
                    {/* DESCRIPTION */}
                    {item.description && (
                      <div className="text-sm text-gray-600 dark:text-[#b3a48f]">
                        {item.description}
                      </div>
                    )}
                  </div>
                  {/* BOTTOM */}
                  <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => dec(item.productId)}
                        disabled={item.quantity <= 1}
                        className="h-6 w-6 rounded ring-1 ring-gray-300 hover:bg-gray-50 dark:ring-[#4d4136] dark:hover:bg-white/10"
                        aria-label={t("cart_dec")}
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => inc(item.productId)}
                        className="h-6 w-6 rounded ring-1 ring-gray-300 hover:bg-gray-50 dark:ring-[#4d4136] dark:hover:bg-white/10"
                        aria-label={t("cart_inc")}
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
              <span>{t("cart_subtotal")}</span>
              <span>{formatPY(subtotal)}</span>
            </div>
            <p className="mb-4 mt-2 text-sm text-gray-600 dark:text-[#b3a48f]">
              {t("cart_ship_note")}
            </p>
            <div className="flex justify-between text-sm">
              <Link
                href="/cart"
                onClick={() => toggle(false)}
                className="rounded-md py-3 px-4 ring-1 ring-gray-300 dark:ring-[#4d4136]"
              >
                {t("cart_view")}
              </Link>{" "}
              <Link
                href="/cart"
                onClick={() => toggle(false)}
                className="rounded-lg bg-[var(--brand)] px-4 py-3 font-semibold text-white shadow-lg transition hover:bg-[#a34726]"
              >
                {t("cart_checkout")}
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
