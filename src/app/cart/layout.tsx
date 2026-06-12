import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tu carrito",
  description: "Revisá tu pedido de Del Horno Pizzería.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
