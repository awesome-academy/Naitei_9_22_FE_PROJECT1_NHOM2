"use client";

import React from "react";
import CartTable from "@/components/CartTable";
import CartActions from "@/components/CartActions";
import CartSummary from "@/components/CartSummary";
import { useCartStore } from "@/store/zustand/Zustand";
import { toast } from "react-toastify";

export default function CartPage() {
  // Lấy dữ liệu giỏ hàng từ zustand
  const { items: cart } = useCartStore();

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

