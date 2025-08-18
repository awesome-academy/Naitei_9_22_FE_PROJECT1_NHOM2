"use client";

import React from "react";
import { Trash } from "lucide-react";
import { useCartStore } from "@/store/zustand/Zustand"; // import zustand store
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";

const CartTable: React.FC = () => {
  // Lấy state và actions từ zustand
  const { items: cart, setQuantity, removeFromCart } = useCartStore();

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setQuantity(id, quantity);
  };

  const headers = [
    { label: "Hình ảnh", className: "w-20 md:w-32" },
    { label: "Tên sản phẩm" },
    { label: "Đơn giá", className: "hidden md:table-cell" },
    { label: "Số lượng" },
    { label: "Thành tiền", className: "hidden md:table-cell" },
    { label: "Xóa" },
  ];

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-green-600 text-white">
            {headers.map((h) => (
              <th
                key={h.label}
                className={`p-2 border border-gray-300 uppercase ${
                  h.className ?? ""
                }`}
              >
                {h.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {cart.map((item) => (
            <tr key={item.product_id} className="text-center">
              {/* hình */}
              <td className="border-l border-b border-gray-300 p-2 flex justify-center">
                <Image
                  src={item.images[0]}
                  alt={item.name}
                  width={128}
                  height={128}
                  className="w-20 h-24 object-cover md:w-32 md:h-36"
                />
              </td>

              {/* tên */}
              <td className="border border-gray-300 p-2 text-green-600 font-medium uppercase">
                {item.name}
              </td>

              {/* đơn giá */}
              <td className="border border-gray-300 p-2 hidden md:table-cell">
                {formatCurrency(item.price)}
              </td>

              {/* số lượng – Input shadcn */}
              <td className="border border-gray-300 p-2">
                <Input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.product_id, parseInt(e.target.value))
                  }
                  className="w-16 text-center"
                />
              </td>

              {/* thành tiền */}
              <td className="border border-gray-300 p-2 hidden md:table-cell">
                {formatCurrency(item.price * item.quantity)}
              </td>

              {/* nút xoá */}
              <td className="border border-gray-300 p-2">
                <button
                  onClick={() => removeFromCart(item.product_id)}
                  className="text-gray-700 hover:text-red-500"
                >
                  <Trash size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default CartTable;

