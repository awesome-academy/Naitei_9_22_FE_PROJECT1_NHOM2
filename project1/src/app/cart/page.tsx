"use client";

import React, { useEffect } from "react";
import CartTable from "@/components/CartTable";
import CartActions from "@/components/CartActions";
import CartSummary from "@/components/CartSummary";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setCartSuccess } from "@/redux/cart/cartSlice";
import { toast } from "react-toastify";

export default function CartPage() {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.items);

  // Lấy dữ liệu từ localStorage khi component được mount
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          dispatch(setCartSuccess({ products: parsedCart }));
          return; 
        }
      } catch (error: any) {
        toast.error("Error parsing cart from localStorage");
      }
    }

    
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="w-full md:w-[1200px]">
        <h1 className="text-green-600 font-semibold mb-6">GIỎ HÀNG</h1>

        {cart.length === 0 ? (
          <p className="text-gray-500">Giỏ hàng trống.</p>
        ) : (
          <>
            <CartTable />
            <CartActions />
            <CartSummary cart={cart} />
          </>
        )}
      </div>
    </div>
  );
}
