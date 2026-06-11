"use client";

import { useCart, useHydration } from "@/store/useCart";
import Image from "next/image";
import { useEffect, useRef } from "react";
import CartDrawer from "./CartDrawer";

const NavIcons = () => {
  const isCartOpen = useCart((s) => s.isCartOpen);
  const toggle = useCart((s) => s.toggle);
  const isHydrated = useHydration();
  const cartRef = useRef<HTMLDivElement | null>(null);

  const count = useCart((s) =>
    s.items.reduce((acc, it) => acc + it.quantity, 0)
  );

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!cartRef.current) return;
      if (!cartRef.current.contains(event.target as Node)) {
        toggle(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [toggle]);

  return (
    <div className="ml-auto flex items-center">
      <div
        ref={cartRef}
        className="relative grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-[#cfc2ae] bg-white/75 transition hover:border-[var(--brand)] hover:bg-white"
        onClick={() => {
          if (!isHydrated) return;
          toggle();
        }}
      >
        <Image src="/cart.png" alt="Carrito" width={24} height={24} />
        <div className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--brand)] px-1 text-xs font-bold text-white">
          {isHydrated ? count : 0}
        </div>

        {isHydrated && isCartOpen && (
          <div
            // className="absolute left-1/2 top-full -translate-x-1/2 mt-2 z-50"
            className="absolute right-0 top-full mt-2 z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <CartDrawer />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavIcons;
