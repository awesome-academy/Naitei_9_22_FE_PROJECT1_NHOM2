"use client";

import { Product } from "@/types/Product";
import ProductCard from "@/components/ProductCard";
import ProductListCard from "@/components/ProductListCard";
import ProductGridSkeleton from "@/components/ProductGridSkeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ProductGridProps {
  products: Product[];
  loading: boolean;
  viewMode: 'grid' | 'list';
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function ProductGrid({ 
  products, 
  loading, 
  viewMode, 
  currentPage, 
  totalPages, 
  onPageChange 
}: ProductGridProps) {
  
  if (loading) {
    return <ProductGridSkeleton viewMode={viewMode} />;
  }

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-12 text-center">
        <div className="max-w-md mx-auto">
          <Image 
            src="/no-products.svg" 
            alt="Không tìm thấy sản phẩm"
            width={64} 
            height={64} 
            className="w-16 h-16 mx-auto text-gray-300 mb-4"
          />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy sản phẩm</h3>
          <p className="text-gray-500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Products Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 [&_img]:!aspect-[4/3]">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {products.map((product) => (
            <ProductListCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) onPageChange(currentPage - 1);
                  }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                >
                  <ChevronLeft />
                  <span className="hidden sm:block">Trước</span>
                </PaginationPrevious>
              </PaginationItem>
              
              {/* First page */}
              {currentPage > 3 && (
                <>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onPageChange(1);
                      }}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                </>
              )}

              {/* Page numbers around current page */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                if (pageNum > 0 && pageNum <= totalPages) {
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          onPageChange(pageNum);
                        }}
                        isActive={pageNum === currentPage}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
                return null;
              })}

              {/* Last page */}
              {currentPage < totalPages - 2 && (
                <>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onPageChange(totalPages);
                      }}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}

              <PaginationItem>
                <PaginationNext 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) onPageChange(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                >
                  <span className="hidden sm:block">Sau</span>
                  <ChevronRight />
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
}
