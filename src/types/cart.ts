export type ProductForCart = {
  _id: string;
  name: string;
  slug?: string;
  image?: string;
  price: number;
  description?: string;
};

export type CartItem = {
  productId: string;
  quantity: number;
  name: string;
  price: number;
  image?: string;
  description?: string;
};

export type CartState = {
  items: CartItem[];
  isCartOpen: boolean;
};

export type CartActions = {
  toggle: (open?: boolean) => void;
  add: (p: ProductForCart, quantity?: number) => void;
  setQty: (productId: string, quantity: number) => void;
  inc: (productId: string) => void;
  dec: (productId: string) => void;
  remove: (productId: string) => void;
  clear: () => void;
  // _setHasHydrated: (v: boolean) => void; // interno
};

export type CartDerived = {
  count: number;
  subtotal: number;
};
