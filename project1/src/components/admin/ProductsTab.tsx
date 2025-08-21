"use client";

import React, { useState, useEffect, useMemo } from "react";
import ProductsTable from "./ProductsTable";
import ProductFormModal from "./ProductFormModal/index";
import ProductsSearch from "./ProductsSearch";
import { Button } from "../ui/button";
import { Product } from "@/types/Product";
import {
  getProducts,
  getAllType,
  createProduct,
  updateProductById,
  deleteProductById,
} from "@/services/ProductService";

export default function ProductsTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [types, setTypes] = useState<string[]>([]);

  // State cho tìm kiếm và lọc
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState<"default" | "price-asc" | "price-desc">(
    "default"
  );

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Lấy tất cả type hiện có
    const fetchTypes = async () => {
      try {
        const typesData = await getAllType();
        setTypes(typesData);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách type:", error);
      }
    };
    fetchTypes();
  }, []);

  // Lọc và sắp xếp sản phẩm
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Lọc theo tên sản phẩm
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Lọc theo danh mục
      const matchesCategory =
        selectedCategory === "all" ||
        (product.type &&
          product.type.some((type) => type === selectedCategory));

      // Lọc theo trạng thái
      const matchesStatus =
        selectedStatus === "all" ||
        (selectedStatus === "active" && product.inStock) ||
        (selectedStatus === "inactive" && !product.inStock);

      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Sắp xếp sản phẩm
    if (sortBy === "default") {
      return filtered;
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.oldPrice - b.oldPrice;
        case "price-desc":
          return b.oldPrice - a.oldPrice;
        default:
          return 0;
      }
    });

    return sorted;
  }, [products, searchTerm, selectedCategory, selectedStatus, sortBy]);

  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.inStock).length;
  const outOfStock = products.filter((p) => !p.inStock).length;

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

  const handleSaveProduct = async (productData: Omit<Product, "id">) => {
    try {
      if (editingProduct) {
        // Cập nhật sản phẩm
        const updatedProduct = await updateProductById(
          editingProduct.id,
          productData
        );
        setProducts((prev) =>
          prev.map((p) => (p.id === editingProduct.id ? updatedProduct : p))
        );
      } else {
        // Thêm sản phẩm mới
        const newProduct = await createProduct(productData);
        setProducts((prev) => [...prev, newProduct]);
      }

      // Cập nhật danh sách types
      const updatedTypes = await getAllType();
      setTypes(updatedTypes);

      handleCloseModal();
    } catch (error) {
      console.error("Lỗi khi lưu sản phẩm:", error);
    }
  };

  const handleDeleteProduct = async (productId: number | string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      try {
        await deleteProductById(productId);
        setProducts((prev) => prev.filter((p) => p.id !== productId));

        // Cập nhật danh sách types
        const updatedTypes = await getAllType();
        setTypes(updatedTypes);
      } catch (error) {}
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-center items-center h-32">
          <p>Đang tải dữ liệu...</p>
        </div>
      </div>
    );
  }

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
          <p className="text-2xl font-bold text-blue-600">{types.length}</p>
        </div>
      </div>

      {/* Tìm kiếm và lọc */}
      <ProductsSearch
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
        sortBy={sortBy}
        onSortChange={setSortBy}
        types={types}
      />

      <ProductsTable
        products={filteredAndSortedProducts}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
      />

      {/* Product Form Modal */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveProduct}
        product={editingProduct}
        existingTags={types}
      />
    </div>
  );
}
