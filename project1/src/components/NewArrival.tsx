"use client";
import ProductCard from "./ProductCard";
import { Product } from "../types/Product";
import React, { useEffect } from "react";
import { getNewArrival } from "@/services/ProductService";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "@/components/ui/button"; // Import Button component

export default function NewArrival() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(0);
  // Responsive items per page: mobile 4, tablet 6, desktop 8
  const [itemsPerPage, setItemsPerPage] = React.useState(4);

  useEffect(() => {
    getNewArrival()
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Update items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(4); // Mobile: 2 columns x 2 rows
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(6); // Tablet: 3 columns x 2 rows
      } else {
        setItemsPerPage(8); // Desktop: 4 columns x 2 rows
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  if (loading) {
    return <div className="text-center py-8">Đang tải sản phẩm mới...</div>;
  }

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const currentProducts = products.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePrevious = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <section className="py-6 sm:py-8">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Header with navigation buttons */}
        {/* Header with navigation buttons */}
        <div className="flex justify-between items-center mb-4 sm:mb-5">
          <h2 className="text-lg sm:text-xl font-semibold border-b-2 border-green-600 text-green-600 pb-1">
            Sản phẩm mới
          </h2>

          {/* Navigation Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handlePrevious}
              variant="outline"
              size="icon"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
              disabled={totalPages <= 1}
            >
              <FaChevronLeft className="text-gray-500 text-xs" />
            </Button>
            <Button
              onClick={handleNext}
              variant="outline"
              size="icon"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
              disabled={totalPages <= 1}
            >
              <FaChevronRight className="text-gray-500 text-xs" />
            </Button>
          </div>
        </div>

        {/* Products Grid - Mobile optimized */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {currentProducts.map((product, index) => (
            <ProductCard key={index} product={product} className="w-full" />
          ))}
        </div>

        {/* Page indicators for mobile */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 sm:hidden">
            <div className="flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === currentPage ? "bg-green-600" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}


