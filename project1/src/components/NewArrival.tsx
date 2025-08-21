"use client";

import ProductCard from "./ProductCard";
import SectionLayout from "./SectionLayout";
import { Product } from "../types/Product";
import React, { useEffect, useMemo } from "react";
import { getProducts } from "@/services/ProductService";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import useSWR from "swr";

export default function NewArrival() {
  const [currentPage, setCurrentPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(4);

  // Replace useState and useEffect with useSWR
  const { data: allProducts = [], error, isLoading } = useSWR<Product[]>('/products', getProducts);

  // Filter new arrival products using useMemo
  const products = useMemo(() => {
    return allProducts.filter(product => product.newArival === true);
  }, [allProducts]);

  // Update items per page based on screen size
  useEffect(() => {
    const updateItemsPerPage = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(4);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(6);
      } else {
        setItemsPerPage(8);
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  if (error) {
    return <div className="text-center py-8 text-red-500">Error loading products</div>;
  }

  if (isLoading) {
    return <div className="text-center py-8">Đang tải sản phẩm mới...</div>;
  }

  // Show message if no new products found
  if (products.length === 0) {
    return (
      <SectionLayout title="Sản phẩm mới">
        <div className="text-center py-8 text-gray-500">
          Hiện tại không có sản phẩm mới nào.
        </div>
      </SectionLayout>
    );
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

  const navigationButtons = (
    <div className="flex gap-2">
      <Button
        onClick={handlePrevious}
        variant="outline"
        size="icon"
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
        disabled={totalPages <= 1 || currentPage === 0}
      >
        <FaChevronLeft className="text-gray-500 text-xs" />
      </Button>
      <Button
        onClick={handleNext}
        variant="outline"
        size="icon"
        className="w-7 h-7 sm:w-8 sm:h-8 rounded-full"
        disabled={totalPages <= 1 || currentPage === totalPages - 1}
      >
        <FaChevronRight className="text-gray-500 text-xs" />
      </Button>
    </div>
  );

  return (
    <SectionLayout
      title={`Sản phẩm mới (${products.length} sản phẩm)`}
      headerActions={navigationButtons}
      className="[&_img]:!aspect-[4/3]"
    >
      {/* Products Grid - Mobile optimized */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {currentProducts.map((product, index) => (
          <ProductCard key={`${product.id}-${index}`} product={product} className="w-full" />
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
    </SectionLayout>
  );
}

