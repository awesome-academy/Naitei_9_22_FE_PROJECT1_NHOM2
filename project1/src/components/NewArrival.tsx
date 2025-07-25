'use client';
import ProductCard from "./ProductCard";
import { Product } from "../types/Product";
import React, { useEffect } from "react";
import { getNewArrival } from "@/services/ProductService";

export default function NewArrival() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    getNewArrival()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center py-8">Đang tải sản phẩm mới...</div>;
  }

  return (
    <section className="py-8">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-xl font-semibold border-b-2 border-green-600 mb-5 text-green-600">
          Sản phẩm mới
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

