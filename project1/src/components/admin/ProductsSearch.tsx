"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductsSearchProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  selectedStatus: string;
  onStatusChange: (value: string) => void;
  sortBy: "default" | "price-asc" | "price-desc";
  onSortChange: (value: "default" | "price-asc" | "price-desc") => void;
  types: string[];
}

export default function ProductsSearch({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  selectedStatus,
  onStatusChange,
  sortBy,
  onSortChange,
  types,
}: ProductsSearchProps) {
  return (
    <div className="mb-6">
      <div className="flex gap-4 items-end">
        <div className="w-300">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tìm kiếm sản phẩm
          </label>
          <Input
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Nhập tên sản phẩm..."
          />
        </div>

        <div className="w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Danh mục
          </label>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="Tất cả danh mục" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả danh mục</SelectItem>
              {types.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Trạng thái
          </label>
          <Select value={selectedStatus} onValueChange={onStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="Tất cả trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tất cả trạng thái</SelectItem>
              <SelectItem value="active">Còn hàng</SelectItem>
              <SelectItem value="inactive">Hết hàng</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sắp xếp
          </label>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sắp xếp" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Mặc định</SelectItem>
              <SelectItem value="price-asc">Giá tăng dần</SelectItem>
              <SelectItem value="price-desc">Giá giảm dần</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
