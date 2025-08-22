"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { IconButton } from "@/components/ui/icon-button";
import { EditIcon, ViewIcon, DeleteIcon } from "@/assets/icons";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import TablePagination from "./TablePagination";
import { Product } from "@/types/Product";

interface ProductsTableProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (productId: number | string) => Promise<void>;
}

const getStatusColor = (inStock: boolean) => {
  return inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
};

const getStatusText = (inStock: boolean) => {
  return inStock ? "Còn hàng" : "Hết hàng";
};

// Hàm hiển thị các tag loại sản phẩm
const renderTypeTags = (types: string[]) => {
  if (!types || types.length === 0) {
    return <span className="text-gray-400">-</span>;
  }

  if (types.length <= 2) {
    return (
      <div className="flex flex-wrap gap-1">
        {types.map((type, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
          >
            {type}
          </span>
        ))}
      </div>
    );
  }

  // Show first 2 tags + count of remaining
  return (
    <div className="flex flex-wrap gap-1">
      {types.slice(0, 2).map((type, index) => (
        <span
          key={index}
          className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
        >
          {type}
        </span>
      ))}
      <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
        +{types.length - 2}
      </span>
    </div>
  );
};

export default function ProductsTable({
  products,
  onEditProduct,
  onDeleteProduct,
}: ProductsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Reset về trang 1 khi products thay đổi
  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Tính toán dữ liệu cho trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, products.length);
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              {[
                "STT",
                "Hình ảnh",
                "Tên sản phẩm",
                "Danh mục",
                "Giá",
                "Discount",
                "Đánh giá",
                "Trạng thái",
                "Thao tác",
              ].map((header) => (
                <TableHead key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProducts.map((product, index) => (
              <TableRow key={product.id} className="hover:bg-gray-50">
                <TableCell className="text-center font-medium">
                  {startIndex + index + 1}
                </TableCell>
                <TableCell>
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                    {product.images && product.images[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-500 text-xs flex">IMG</span>
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="max-w-[200px]">
                  {renderTypeTags(product.type || [])}
                </TableCell>
                <TableCell>
                  {product.oldPrice.toLocaleString("vi-VN")} VNĐ
                </TableCell>
                <TableCell>
                  {product.discount > 0 ? (
                    <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-medium">
                      -{product.discount}%
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <span className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span>{product.rating}</span>
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                      product.inStock
                    )}`}
                  >
                    {getStatusText(product.inStock)}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <IconButton
                      icon={<EditIcon className="w-5 h-5" />}
                      onClick={() => onEditProduct(product)}
                      tooltip="Sửa sản phẩm"
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                    />
                    <IconButton
                      icon={<ViewIcon className="w-5 h-5" />}
                      tooltip="Xem chi tiết"
                      variant="ghost"
                      size="sm"
                      className="text-green-600 hover:text-green-800 hover:bg-green-50"
                    />
                    <IconButton
                      icon={<DeleteIcon className="w-5 h-5" />}
                      onClick={() => onDeleteProduct(product.id)}
                      tooltip="Xóa sản phẩm"
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={products.length}
        label="sản phẩm"
      />
    </div>
  );
}
