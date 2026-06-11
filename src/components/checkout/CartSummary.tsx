"use client";

import Row from "@/components/Row";
import { formatPY } from "@/lib/money";
import {
  buildWhatsAppOrderUrl,
  OrderDetails,
} from "@/lib/whatsapp";
import { useCart } from "@/store/useCart";
import { FormEvent, useState } from "react";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_ORDER_NUMBER ?? "";

export default function CartSummary({ subtotal }: { subtotal: number }) {
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

    if (!WHATSAPP_NUMBER) {
      setError("No se configuró el número de WhatsApp del local.");
      return;
    }

    if (items.length === 0) {
      setError("El carrito está vacío.");
      return;
    }

    const url = buildWhatsAppOrderUrl(WHATSAPP_NUMBER, {
      items,
      subtotal,
      details,
    });

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <aside
      className="glass-surface reveal reveal-2 h-max rounded-2xl p-5 md:sticky md:top-24"
    >
      <h2 className="mb-4 text-lg font-semibold text-zinc-900">
        Resumen
      </h2>

      <div className="mt-4 flex flex-col gap-2">
        <Row label="Subtotal" value={formatPY(subtotal)} />
        <Row label="Envío" value="" muted />
        <div className="border-t border-[#e7cfbd] pt-3" />
        <Row label="Total" value={formatPY(subtotal)} strong />
      </div>

      <form className="mt-6 space-y-4" onSubmit={sendOrder}>
        <div>
          <label
            htmlFor="customer-name"
            className="mb-1.5 block text-sm font-semibold text-zinc-800"
          >
            Nombre
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
            placeholder="Nombre del cliente"
            className="w-full rounded-lg border border-[var(--line-strong)] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[var(--brand)]"
          />
        </div>

        <div>
          <label
            htmlFor="fulfillment"
            className="mb-1.5 block text-sm font-semibold text-zinc-800"
          >
            Tipo de entrega
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
            className="w-full rounded-lg border border-[var(--line-strong)] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[var(--brand)]"
          >
            <option value="delivery">Delivery</option>
            <option value="pickup">Retiro en el local</option>
          </select>
        </div>

        {details.fulfillment === "delivery" && (
          <div>
            <label
              htmlFor="delivery-address"
              className="mb-1.5 block text-sm font-semibold text-zinc-800"
            >
              Dirección
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
              placeholder="Barrio, calle y referencia"
              className="w-full rounded-lg border border-[var(--line-strong)] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[var(--brand)]"
            />
          </div>
        )}

        <div>
          <label
            htmlFor="payment-method"
            className="mb-1.5 block text-sm font-semibold text-zinc-800"
          >
            Forma de pago
          </label>
          <select
            id="payment-method"
            value={details.paymentMethod}
            onChange={(event) =>
              updateDetails("paymentMethod", event.target.value)
            }
            className="w-full rounded-lg border border-[var(--line-strong)] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[var(--brand)]"
          >
            <option>Efectivo</option>
            <option>Transferencia</option>
            <option>Tarjeta al recibir</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="order-notes"
            className="mb-1.5 block text-sm font-semibold text-zinc-800"
          >
            Aclaraciones
          </label>
          <textarea
            id="order-notes"
            rows={3}
            value={details.notes}
            onChange={(event) => updateDetails("notes", event.target.value)}
            placeholder="Ej.: sin cebolla, pagaré con 100.000"
            className="w-full resize-none rounded-lg border border-[var(--line-strong)] bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[var(--brand)]"
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
          Enviar pedido por WhatsApp
        </button>
        <p className="text-xs text-[var(--muted)]">
          Se abrirá WhatsApp con el pedido listo para enviar.
        </p>
      </form>
    </aside>
  );
}
