'use client'

import Image from "next/image";
import { Product } from "../types/Product";

interface MostBuyProps {
  products: Product[];
}

export default function MostBuy({ products }: MostBuyProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold text-green-600 mb-4 pb-2 border-b-2 border-green-600">
        Sản phẩm mua nhiều
      </h2>
      <div className="space-y-3">
        {products.map((product, index) => (
          <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
            <Image
              src={product.image}
              alt={product.name}
              width={60}
              height={60}
              className="rounded w-[60px] h-[60px] object-cover bg-gray-100"
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-gray-800 mb-1">{product.name}</div>
              <div className="text-red-600 text-sm font-semibold">
                {product.price.toLocaleString("vi-VN")}đ
              </div>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}