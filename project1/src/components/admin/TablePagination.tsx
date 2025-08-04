import React from "react";
import { Button } from "@/components/ui/button";

interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  startIndex: number;
  endIndex: number;
  totalItems: number;
  label: string;
  className?: string;
}

export default function TablePagination({
  currentPage,
  totalPages,
  onPageChange,
  startIndex,
  endIndex,
  totalItems,
  label,
  className = "",
}: TablePaginationProps) {
  return (
    <div className={`mt-6 flex justify-between items-center ${className}`}>
      <p className="text-gray-600">
        Hiển thị {startIndex + 1}-{endIndex} của {totalItems} {label}
      </p>
      <div className="flex items-center gap-2">
        <Button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`px-2 py-1 rounded border text-sm transition-colors ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          &lt;
        </Button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-2 py-1 rounded border text-sm transition-colors ${
              currentPage === page
                ? "bg-black text-white border-black"
                : "bg-white text-black hover:bg-gray-50 border-gray-300"
            }`}
          >
            {page}
          </Button>
        ))}
        <Button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`px-2 py-1 rounded border text-sm transition-colors ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
        >
          &gt;
        </Button>
      </div>
    </div>
  );
}
