"use client";

import Image from "next/image";
import { Product, formatCurrentPrice, formatOldPrice, getCurrentPrice } from "../types/Product";
import { useEffect, useState, useMemo } from "react";
import { getProducts } from "@/services/ProductService";
import { FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/cart/cartSlice";
import { toast } from "react-toastify";

// Function to get random products
const getRandomProducts = (products: Product[], count: number = 7): Product[] => {
  const shuffled = [...products].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function MostBuy() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeProduct, setActiveProduct] = useState<number | null>(null);
  const dispatch = useDispatch();
  
  const displayProducts = useMemo(() => {
    return getRandomProducts(products, 7);
  }, [products]);

  useEffect(() => {
    getProducts()
      .then((allProducts) => {
        setProducts(allProducts);
      })
      .catch((error) => {
        toast.error("Không thể tải sản phẩm: " + error.message);
      });
  }, []);

  const handleAddToCart = (product: Product) => {
    const cartItem = {
      ...product,
      price: getCurrentPrice(product),
      quantity: 1
    };
    dispatch(addToCart(cartItem));
    toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
    setActiveProduct(null);
  };

  const handleItemClick = (index: number) => {
    setActiveProduct(activeProduct === index ? null : index);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-xl font-semibold text-green-600 mb-4 pb-2 border-b-2 border-green-600">
        Sản phẩm mua nhiều
      </h2>
      <div className="space-y-3">
        {displayProducts.map((product, index) => {
          const hasDiscount = product.discount > 0;

          return (
            <div
              key={`${product.id}-${index}`}
              className="relative flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
              onClick={() => handleItemClick(index)}
            >
              <Image
                src={product.images[0]}
                alt={product.name}
                width={60}
                height={60}
                className="rounded object-cover bg-gray-100"
              />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-800 mb-1">
                  {product.name}
                </div>
                <div className="text-red-600 text-sm font-semibold">
                  {formatCurrentPrice(product)} đ
                  {hasDiscount && (
                    <span className="line-through text-gray-400 text-xs ml-2">
                      {formatOldPrice(product)} đ
                    </span>
                  )}
                </div>
              </div>
              
              {activeProduct === index && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-white p-1 rounded-md shadow-md z-10">
                  <Button
                    size="sm"
                    className="bg-green-500 text-white px-2 py-1 text-xs hover:bg-green-600"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product);
                    }}
                  >
                    MUA NGAY
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white border border-gray-300 p-1.5 hover:bg-gray-50"
                    aria-label="View Details"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaSearch className="text-gray-600 text-xs" />
                  </Button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

