import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/types/Cart";

interface CartState {
  items: CartItem[];
  cartCount: number;
  totalPrice: number;
  isLoaded: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  setQuantity: (id: number, quantity: number) => void;
  setCartStart: () => void;
  setCartSuccess: (products: CartItem[]) => void;
  toggleCartItem: (id: number, actionType: "inc" | "dec") => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      cartCount: 0,
      totalPrice: 0,
      isLoaded: false,
      addToCart: (item) => {
        const items = [...get().items];
        const idx = items.findIndex((i) => i.product_id === item.product_id);
        if (idx !== -1) {
          items[idx].quantity += item.quantity;
        } else {
          items.push(item);
        }
        set({
          items,
          cartCount: items.reduce((t, i) => t + i.quantity, 0),
          totalPrice: items.reduce((t, i) => t + i.quantity * i.price, 0),
        });
      },
      removeFromCart: (id) => {
        const items = get().items.filter((i) => i.product_id !== id);
        set({
          items,
          cartCount: items.reduce((t, i) => t + i.quantity, 0),
          totalPrice: items.reduce((t, i) => t + i.quantity * i.price, 0),
        });
      },
      clearCart: () => set({ items: [], cartCount: 0, totalPrice: 0, isLoaded: false }),
      setQuantity: (id, quantity) => {
        const items = get().items.map((i) =>
          i.product_id === id ? { ...i, quantity } : i
        );
        set({
          items,
          cartCount: items.reduce((t, i) => t + i.quantity, 0),
          totalPrice: items.reduce((t, i) => t + i.quantity * i.price, 0),
        });
      },
      setCartStart: () => {
        set({ items: [], cartCount: 0, totalPrice: 0, isLoaded: false });
      },
      setCartSuccess: (products) => {
        set({
          items: products,
          cartCount: products.reduce((t, i) => t + i.quantity, 0),
          totalPrice: products.reduce((t, i) => t + i.quantity * i.price, 0),
          isLoaded: true,
        });
      },
      toggleCartItem: (id, actionType) => {
        const items = [...get().items];
        const idx = items.findIndex((i) => i.product_id === id);
        if (idx !== -1) {
          if (actionType === "inc") {
            items[idx].quantity += 1;
          } else if (actionType === "dec") {
            items[idx].quantity -= 1;
            if (items[idx].quantity <= 0) {
              items.splice(idx, 1);
            }
          }
        }
        set({
          items,
          cartCount: items.reduce((t, i) => t + i.quantity, 0),
          totalPrice: items.reduce((t, i) => t + i.quantity * i.price, 0),
        });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
