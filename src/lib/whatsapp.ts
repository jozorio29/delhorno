import { formatPY } from "@/lib/money";
import { CartItem } from "@/types/cart";

export type OrderDetails = {
  customerName: string;
  fulfillment: "delivery" | "pickup";
  address: string;
  paymentMethod: string;
  notes: string;
};

type WhatsAppOrder = {
  items: CartItem[];
  subtotal: number;
  details: OrderDetails;
};

const cleanPhoneNumber = (phoneNumber: string) =>
  phoneNumber.replace(/\D/g, "");

export function buildWhatsAppOrderMessage({
  items,
  subtotal,
  details,
}: WhatsAppOrder) {
  const orderId = `WEB-${Date.now().toString().slice(-6)}`;
  const createdAt = new Intl.DateTimeFormat("es-PY", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "America/Asuncion",
  }).format(new Date());

  const itemLines = items.flatMap((item, index) => [
    `${index + 1}. ${item.quantity} x ${item.name}`,
    ...(item.description ? [`   ${item.description}`] : []),
    `   ${formatPY(item.price)} c/u | ${formatPY(
      item.price * item.quantity
    )}`,
  ]);

  return [
    "*NUEVO PEDIDO WEB - DEL HORNO*",
    `Pedido: *${orderId}*`,
    `Fecha: ${createdAt}`,
    "",
    "*DATOS DEL CLIENTE*",
    `Nombre: ${details.customerName.trim()}`,
    `Entrega: ${
      details.fulfillment === "delivery" ? "Delivery" : "Retiro en el local"
    }`,
    ...(details.fulfillment === "delivery"
      ? [`Dirección: ${details.address.trim()}`]
      : []),
    `Pago: ${details.paymentMethod}`,
    "",
    "*DETALLE DEL PEDIDO*",
    ...itemLines,
    "",
    `*TOTAL: ${formatPY(subtotal)}*`,
    `Notas: ${details.notes.trim() || "Sin observaciones"}`,
    "",
    "_Pedido generado desde la web._",
  ].join("\n");
}

export function buildWhatsAppOrderUrl(
  phoneNumber: string,
  order: WhatsAppOrder
) {
  const phone = cleanPhoneNumber(phoneNumber);
  const message = buildWhatsAppOrderMessage(order);

  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
