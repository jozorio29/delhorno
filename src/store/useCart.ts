"use client";

import {
  CartActions,
  CartDerived,
  CartItem,
  CartState,
  ProductForCart,
} from "@/types/cart";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCart = create<CartState & CartActions & CartDerived>()(
  persist(
    (set, get) => ({
      items: [],
      isCartOpen: false,

      toggle: (open) =>
        set((s) => ({
          isCartOpen:
            typeof open === "boolean" ? open : !s.isCartOpen,
        })),

      add: (p: ProductForCart, quantity = 1) => {
        set((s) => {
          const i = s.items.findIndex((it) => it.productId === p._id);
          if (i >= 0) {
            const items = [...s.items];
            items[i] = { ...items[i], quantity: items[i].quantity + quantity };
            return { items };
          }
          return {
            items: [
              ...s.items,
              {
                productId: p._id,
                name: p.name,
                price: Number(p.price),
                image: p.image,
                description: p.description,
                quantity,
              } satisfies CartItem,
            ],
          };
        });
      },

      setQty: (productId, quantity) =>
        set((s) => ({
          items: s.items
            .map((it) =>
              it.productId === productId ? { ...it, quantity } : it
            )
            .filter((it) => it.quantity > 0),
        })),

      inc: (productId) =>
        set((s) => ({
          items: s.items.map((it) =>
            it.productId === productId
              ? { ...it, quantity: it.quantity + 1 }
              : it
          ),
        })),

      dec: (productId) =>
        set((s) => ({
          items: s.items
            .map((it) =>
              it.productId === productId
                ? { ...it, quantity: it.quantity - 1 }
                : it
            )
            .filter((it) => it.quantity > 0),
        })),

      remove: (productId) =>
        set((s) => ({
          items: s.items.filter((it) => it.productId !== productId),
        })),

      clear: () => set({ items: [] }),

      //Getters derivados
      get count() {
        const currentItems = get().items || [];
        return currentItems.reduce((acc, it) => acc + it.quantity, 0);
      },
      get subtotal() {
        const currentItems = get().items || [];
        return currentItems.reduce(
          (acc, it) => acc + (Number(it.price) || 0) * it.quantity,
          0
        );
      },
    }),
    {
      name: "cart-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ items: s.items || [] }), // guarda solo items
      skipHydration: true,
      merge: (persistedState, currentState) => {
        const persisted = persistedState as Partial<CartState> | undefined;
        return {
          ...currentState,
          items: Array.isArray(persisted?.items) ? persisted.items : [],
          isCartOpen: false,
        };
      },
    }
  )
);

export const useHydration = () => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const alreadyHydrated = useCart.persist.hasHydrated();
    if (alreadyHydrated) {
      setIsHydrated(true);
      return;
    }

    const unsubFinishHydration = useCart.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });

    useCart.persist.rehydrate();

    return () => {
      unsubFinishHydration();
    };
  }, []);

  return isHydrated;
};
