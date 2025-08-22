"use client";

import React, { useState } from "react";
import Image from "next/image";
import { IconButton } from "@/components/ui/icon-button";
import productsData from "../../../db.json";
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
  onEditProduct: (product: Product) => void;
}

const mockProducts = productsData.products.map((product) => ({
  ...product,
  stock: 50,
  status: product.inStock ? "active" : "inactive",
  createdAt: "2025-01-01",
}));

const getStatusColor = (status: string) => {
  return status === "active"
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";
};

const getStatusText = (status: string) => {
  return status === "active" ? "Còn hàng" : "Hết hàng";
};

export default function ProductsTable({ onEditProduct }: ProductsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const totalPages = Math.ceil(mockProducts.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Tính toán dữ liệu cho trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, mockProducts.length);
  const currentProducts = mockProducts.slice(startIndex, endIndex);

  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              {[
                "ID",
                "Hình ảnh",
                "Tên sản phẩm",
                "Danh mục",
                "Giá",
                "Tồn kho",
                "Trạng thái",
                "Ngày tạo",
                "Thao tác",
              ].map((header) => (
                <TableHead key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentProducts.map((product) => (
              <TableRow key={product.id} className="hover:bg-gray-50">
                <TableCell>{product.id}</TableCell>
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
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      product.stock > 10
                        ? "bg-green-100 text-green-800"
                        : product.stock > 0
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {product.stock}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                      product.status
                    )}`}
                  >
                    {getStatusText(product.status)}
                  </span>
                </TableCell>
                <TableCell>{product.createdAt}</TableCell>
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
                      onClick={() => console.log("View product:", product.id)}
                      tooltip="Xem chi tiết"
                      variant="ghost"
                      size="sm"
                      className="text-green-600 hover:text-green-800 hover:bg-green-50"
                    />
                    <IconButton
                      icon={<DeleteIcon className="w-5 h-5" />}
                      onClick={() => console.log("Delete product:", product.id)}
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
        totalItems={mockProducts.length}
        label="sản phẩm"
      />
    </div>
  );
}
