"use client";

import React, { useState } from "react";
import productsData from "../../../db.json";
import ProductsTable from "./ProductsTable";
import ProductFormModal from "./ProductFormModal";
import { Button } from "../ui/button";

interface ProductVariant {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

interface ProductSpecification {
  [key: string]: string;
}

interface Product {
  id?: string;
  name: string;
  oldPrice: number;
  discount: number;
  type: string[];
  images: string[];
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  variants: ProductVariant[];
  specifications: ProductSpecification;
  care_instructions: string;
  color: string[];
  newArival: boolean;
}

const mockProducts = productsData.products.map((product) => ({
  ...product,
  stock: 50,
  status: product.inStock ? "active" : "inactive",
  createdAt: "2025-01-01",
}));

export default function ProductsTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const totalProducts = mockProducts.length;
  const activeProducts = mockProducts.filter(
    (p) => p.status === "active"
  ).length;
  const outOfStock = mockProducts.filter((p) => p.stock === 0).length;
  const categories = [...new Set(mockProducts.map((p) => p.category))].length;

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleSaveProduct = async (productData: Product) => {
    // Test chức năng
    console.log("Saving product:", productData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý sản phẩm</h1>
        <Button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={handleAddProduct}
        >
          + Thêm sản phẩm mới
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h3 className="text-lg font-semibold text-purple-900">
            Tổng sản phẩm
          </h3>
          <p className="text-2xl font-bold text-purple-600">{totalProducts}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-900">Còn hàng</h3>
          <p className="text-2xl font-bold text-green-600">{activeProducts}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-semibold text-yellow-900">Hết hàng</h3>
          <p className="text-2xl font-bold text-yellow-600">{outOfStock}</p>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900">Danh mục</h3>
          <p className="text-2xl font-bold text-blue-600">{categories}</p>
        </div>
      </div>

      {/* Tìm kiếm */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Tất cả danh mục</option>
          {[...new Set(mockProducts.map((p) => p.category))].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Tất cả trạng thái</option>
          <option value="active">Hoạt động</option>
          <option value="inactive">Không hoạt động</option>
        </select>
      </div>

      <ProductsTable onEditProduct={handleEditProduct} />

      {/* Product Form Modal */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        product={editingProduct}
      />
    </div>
  );
}
