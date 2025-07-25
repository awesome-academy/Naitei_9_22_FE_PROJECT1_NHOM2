'use client'

import ProductCard from "./ProductCard";
import { Product } from "../types/Product";
import { useEffect, useState } from "react";
import { getPromotions } from "@/services/ProductService";



export default function OnSale() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
        getPromotions().then(setProducts).catch(console.error);
      }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold border-b-2 border-green-600 mb-4 text-green-600">
        Sản phẩm khuyến mãi
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[1000px] overflow-hidden">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

