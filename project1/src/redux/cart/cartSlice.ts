import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/types/Cart";

interface CartState {
  items: CartItem[];
  cartCount: number;
  totalPrice: number;
  isLoaded: boolean;
}

const initialState: CartState = {
  items: [],
  cartCount: 0,
  totalPrice: 0,
  isLoaded: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const { product_id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.product_id === product_id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push(action.payload);
      }

      // Update totals
      state.cartCount = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    },
    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      state.items = state.items.filter((item) => item.product_id !== action.payload.id);

      state.cartCount = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    },
    setQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.product_id === id);
      if (existingItem && quantity > 0) {
        existingItem.quantity = quantity;
      }

      state.cartCount = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    },
    clearCart: (state) => {
      state.items = [];
      state.cartCount = 0;
      state.totalPrice = 0;
      state.isLoaded = false;
    },
    setCartStart: (state) => {
      state.items = [];
      state.cartCount = 0;
      state.totalPrice = 0;
    },
    setCartSuccess: (
      state,
      action: PayloadAction<{ products: CartItem[] }>
    ) => {
      state.items = action.payload.products.map((product) => ({
        ...product,
      }));

      state.cartCount = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
      state.isLoaded = true;
    },
    toggleCartItem: (
      state,
      action: PayloadAction<{ id: number; actionType: "inc" | "dec" }>
    ) => {
      const { id, actionType } = action.payload;
      const existingItem = state.items.find((item) => item.product_id === id);

      if (existingItem) {
        if (actionType === "inc") {
          existingItem.quantity += 1;
        } else if (actionType === "dec") {
          existingItem.quantity -= 1;
          if (existingItem.quantity <= 0) {
            state.items = state.items.filter((item) => !(item.product_id === id));
          }
        }
      }

      state.cartCount = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      state.totalPrice = state.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    },
    removeOrderedItem: (state, action: PayloadAction<CartItem>) => {
      const { product_id, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.product_id === product_id);

      if (existingItem) {
        if (existingItem.quantity >= quantity) {
          existingItem.quantity -= quantity;
        }
        if (existingItem.quantity <= 0) {
          state.items = state.items.filter((item) => item.product_id !== product_id);
        }
      }

      state.cartCount = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );

      state.totalPrice = state.items.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  setCartStart,
  setCartSuccess,
  toggleCartItem,
  setQuantity,
  removeOrderedItem,
} = cartSlice.actions;

export default cartSlice.reducer;

