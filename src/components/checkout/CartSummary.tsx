"use client";

import Row from "@/components/Row";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import { formatPY } from "@/lib/money";
import {
  buildWhatsAppOrderUrl,
  OrderDetails,
} from "@/lib/whatsapp";
import { useCart } from "@/store/useCart";
import { FormEvent, useState } from "react";

const DEFAULT_WHATSAPP_NUMBER = "595982000763";
const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_ORDER_NUMBER ?? DEFAULT_WHATSAPP_NUMBER;

export default function CartSummary({ subtotal }: { subtotal: number }) {
  const { t } = useI18n();
  const items = useCart((state) => state.items);
  const [error, setError] = useState("");
  const [details, setDetails] = useState<OrderDetails>({
    customerName: "",
    fulfillment: "delivery",
    address: "",
    paymentMethod: "Efectivo",
    notes: "",
  });

  const updateDetails = <Key extends keyof OrderDetails>(
    key: Key,
    value: OrderDetails[Key]
  ) => {
    setDetails((current) => ({ ...current, [key]: value }));
  };

  const sendOrder = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (items.length === 0) {
      setError(t("sum_empty"));
      return;
    }

    const url = buildWhatsAppOrderUrl(WHATSAPP_NUMBER, {
      items,
      subtotal,
      details,
    });

    window.location.assign(url);
  };

  return (
    <aside
      className="glass-surface reveal reveal-2 h-max rounded-2xl p-5 md:sticky md:top-24"
    >
      <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {t("sum_title")}
      </h2>

      <div className="mt-4 flex flex-col gap-2">
        <Row label={t("cart_subtotal")} value={formatPY(subtotal)} />
        <Row label={t("sum_shipping")} value="" muted />
        <div className="border-t border-[#e7cfbd] pt-3 dark:border-[#4d4136]" />
        <Row label={t("sum_total")} value={formatPY(subtotal)} strong />
      </div>

      <form className="mt-6 space-y-4" onSubmit={sendOrder}>
        <div>
          <label
            htmlFor="customer-name"
            className="mb-1.5 block text-sm font-semibold text-zinc-800 dark:text-zinc-200"
          >
            {t("sum_name")}
          </label>
          <input
            id="customer-name"
            type="text"
            required
            autoComplete="name"
            value={details.customerName}
            onChange={(event) =>
              updateDetails("customerName", event.target.value)
            }
            placeholder={t("sum_name_ph")}
            className="w-full rounded-lg border border-[var(--line-strong)] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[var(--brand)] dark:bg-[#221a13] dark:text-zinc-100"
          />
        </div>

        <div>
          <label
            htmlFor="fulfillment"
            className="mb-1.5 block text-sm font-semibold text-zinc-800 dark:text-zinc-200"
          >
            {t("sum_fulfillment")}
          </label>
          <select
            id="fulfillment"
            value={details.fulfillment}
            onChange={(event) =>
              updateDetails(
                "fulfillment",
                event.target.value as OrderDetails["fulfillment"]
              )
            }
            className="w-full rounded-lg border border-[var(--line-strong)] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[var(--brand)] dark:bg-[#221a13] dark:text-zinc-100"
          >
            <option value="delivery">{t("sum_delivery")}</option>
            <option value="pickup">{t("sum_pickup")}</option>
          </select>
        </div>

        {details.fulfillment === "delivery" && (
          <div>
            <label
              htmlFor="delivery-address"
              className="mb-1.5 block text-sm font-semibold text-zinc-800 dark:text-zinc-200"
            >
              {t("sum_address")}
            </label>
            <input
              id="delivery-address"
              type="text"
              required
              autoComplete="street-address"
              value={details.address}
              onChange={(event) =>
                updateDetails("address", event.target.value)
              }
              placeholder={t("sum_address_ph")}
              className="w-full rounded-lg border border-[var(--line-strong)] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[var(--brand)] dark:bg-[#221a13] dark:text-zinc-100"
            />
          </div>
        )}

        <div>
          <label
            htmlFor="payment-method"
            className="mb-1.5 block text-sm font-semibold text-zinc-800 dark:text-zinc-200"
          >
            {t("sum_payment")}
          </label>
          <select
            id="payment-method"
            value={details.paymentMethod}
            onChange={(event) =>
              updateDetails("paymentMethod", event.target.value)
            }
            className="w-full rounded-lg border border-[var(--line-strong)] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[var(--brand)] dark:bg-[#221a13] dark:text-zinc-100"
          >
            <option value="Efectivo">{t("sum_cash")}</option>
            <option value="Transferencia">{t("sum_transfer")}</option>
            <option value="Tarjeta al recibir">{t("sum_card")}</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="order-notes"
            className="mb-1.5 block text-sm font-semibold text-zinc-800 dark:text-zinc-200"
          >
            {t("sum_notes")}
          </label>
          <textarea
            id="order-notes"
            rows={3}
            value={details.notes}
            onChange={(event) => updateDetails("notes", event.target.value)}
            placeholder={t("sum_notes_ph")}
            className="w-full resize-none rounded-lg border border-[var(--line-strong)] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[var(--brand)] dark:bg-[#221a13] dark:text-zinc-100"
          />
        </div>

        {error && (
          <p role="alert" className="text-sm font-medium text-rose-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full rounded-lg bg-[#25d366] px-4 py-3 text-center font-semibold text-white transition hover:bg-[#1fb85a]"
        >
          {t("sum_send")}
        </button>
        <p className="text-xs text-[var(--muted)]">{t("sum_wa_note")}</p>
      </form>
    </aside>
  );
}
