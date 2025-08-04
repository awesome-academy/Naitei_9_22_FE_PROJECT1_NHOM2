"use client";

import ProductCard from "./ProductCard";
import { Product } from "../types/Product";
import { useEffect, useState, useMemo } from "react";
import { getProducts } from "@/services/ProductService";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function OnSale() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  // Responsive items per page: mobile 4, tablet 6, desktop 6
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const products = useMemo(() => {
    return allProducts.filter((product) => product.discount > 0);
  }, [allProducts]);

  const currentProducts = useMemo(() => {
    return products.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    );
  }, [products, currentPage, itemsPerPage]);

  const totalPages = useMemo(() => {
    return Math.ceil(products.length / itemsPerPage);
  }, [products.length, itemsPerPage]);

  useEffect(() => {
    getProducts()
      .then((allProducts) => {
        setAllProducts(allProducts);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Update items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      setItemsPerPage(window.innerWidth < 640 ? 4 : 6);
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">Đang tải sản phẩm khuyến mãi...</div>
    );
  }

  // Show message if no sale products found
  if (products.length === 0) {
    return (
      <section className="py-6 sm:py-8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2 className="text-lg sm:text-xl font-semibold border-b-2 border-green-600 text-green-600 pb-1 mb-4">
            Sản phẩm khuyến mãi
          </h2>
          <div className="text-center py-8 text-gray-500">
            Hiện tại không có sản phẩm nào đang khuyến mãi.
          </div>
        </div>
      </section>
    );
  }

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <section className="py-6 sm:py-8 [&_img]:!aspect-[4/3]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header with navigation buttons */}
        <div className="flex justify-between items-center mb-4 sm:mb-5">
          <h2 className="text-lg sm:text-xl font-semibold border-b-2 border-green-600 text-green-600 pb-1">
            Sản phẩm khuyến mãi ({products.length} sản phẩm)
          </h2>

          {/* Navigation Buttons */}
          {totalPages > 1 && (
            <div className="flex gap-2">
              <Button
                onClick={handlePrevious}
                variant="outline"
                size="icon"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
                disabled={currentPage === 0}
              >
                <FaChevronLeft className="text-gray-500 text-xs" />
              </Button>
              <Button
                onClick={handleNext}
                variant="outline"
                size="icon"
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
                disabled={currentPage === totalPages - 1}
              >
                <FaChevronRight className="text-gray-500 text-xs" />
              </Button>
            </div>
          )}
        </div>

        {/* Products Grid - Mobile optimized */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {currentProducts.map((product, index) => (
            <ProductCard
              key={`${product.id}-${index}`}
              product={product}
              className="w-full"
            />
          ))}
        </div>

        {/* Page indicators for mobile */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 sm:hidden">
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <Button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  variant={i === currentPage ? "default" : "outline"}
                  size="sm"
                  className={`w-8 h-8 p-0 rounded-full transition-colors ${
                    i === currentPage
                      ? "bg-green-600 hover:bg-green-700 border-green-600"
                      : "bg-white hover:bg-gray-50 border-gray-300"
                  }`}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}






