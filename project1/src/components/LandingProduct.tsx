'use client'

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../services/ProductService";
import { Product } from "../types/Product";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getProducts().then(setProducts).catch(console.error);
  }, []);

  if (products.length === 0) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-4 grid-rows-4 gap-4 p-6 max-w-[1200px] mx-auto -mt-7 ">
      {products[0] && (
        <ProductCard product={products[0]} className="col-span-2 row-span-2" />
      )}
      {products[1] && (
        <ProductCard product={products[1]} className="col-start-3 row-start-1" />
      )}
      {products[2] && (
        <ProductCard product={products[2]} className="col-start-4 row-start-1" />
      )}
      {products[3] && (
        <ProductCard product={products[3]} className="col-start-1 row-start-3" />
      )}
      {products[4] && (
        <ProductCard product={products[4]} className="col-start-2 row-start-3" />
      )}
      {products[5] && (
        <ProductCard
          product={products[5]}
          className="col-span-2 row-span-2 col-start-3 row-start-2"
        />
      )}
    </div>
  );
}

