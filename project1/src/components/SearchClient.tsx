"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getProducts, searchProducts } from "@/services/ProductService";
import { getCurrentPrice, Product } from "@/types/Product";
import { toast } from "react-toastify";
import ProductFilter from "@/components/ProductFilter";
import ProductGrid from "@/components/ProductGrid";
import ProductHeaderControls from "@/components/ProductHeaderControls";

export default function SearchClient() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [sortBy, setSortBy] = useState("name");

  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || searchParams.get("search") || "";

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const data = await getProducts();
        setAllProducts(data);
      } catch (error) {
        console.error("Error loading all products:", error);
      }
    };
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const performSearch = async () => {
      setLoading(true);
      try {
        if (searchQuery.trim()) {
          const results = await searchProducts(searchQuery);
          setSearchResults(results);
          setFilteredProducts(results);
        } else {
          setSearchResults(allProducts);
          setFilteredProducts(allProducts);
        }
      } catch {
        toast.error("Lỗi khi tìm kiếm sản phẩm");
      } finally {
        setLoading(false);
      }
    };
    if (allProducts.length > 0) performSearch();
  }, [searchQuery, allProducts]);

  useEffect(() => setCurrentPage(1), [searchQuery]);

  const handleFilter = (filters: {
    categories: string[];
    priceRange: [number, number] | null;
    colors: string[];
  }) => {
    let filtered = [...searchResults];
    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) => filters.categories.includes(p.category));
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filtered = filtered.filter((p) => {
        const price = getCurrentPrice(p) || 0;
        return price >= min && price <= max;
      });
    }
    if (filters.colors.length > 0) {
      filtered = filtered.filter((p) =>
        filters.colors.some(
          (c) => p.type?.includes(c) || p.name.toLowerCase().includes(c)
        )
      );
    }
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const sortStrategies = {
    "price-low-high": (a: Product, b: Product) =>
      (getCurrentPrice(a) || 0) - (getCurrentPrice(b) || 0),
    "price-high-low": (a: Product, b: Product) =>
      (getCurrentPrice(b) || 0) - (getCurrentPrice(a) || 0),
    name: (a: Product, b: Product) => a.name.localeCompare(b.name),
    rating: (a: Product, b: Product) => b.rating - a.rating,
    default: () => 0,
  } as const;

  const handleSort = (sortOption: string) => {
    const sorter =
      (sortStrategies as any)[sortOption] ?? (sortStrategies as any).default;
    setSortBy(sortOption);
    setFilteredProducts((prev) => [...prev].sort(sorter));
  };

  const viewModeButtons = [
    { mode: "grid", title: "Hiển thị dạng lưới", icon: "/grid.svg" },
    { mode: "list", title: "Hiển thị dạng danh sách", icon: "/list.svg" },
  ] as const;

  const sortOptions = [
    { value: "name", label: "Tên A-Z" },
    { value: "price-low-high", label: "Giá thấp - cao" },
    { value: "price-high-low", label: "Giá cao - thấp" },
    { value: "rating", label: "Đánh giá cao nhất" },
  ];

  const showOptions = [
    { value: "15", label: "15" },
    { value: "20", label: "20" },
    { value: "25", label: "25" },
  ];

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6 mt-6">
          <div className="w-80 flex-shrink-0">
            <ProductFilter onFilter={handleFilter} />
          </div>
          <div className="flex-1">
            <ProductHeaderControls
              viewMode={viewMode}
              setViewMode={setViewMode}
              sortBy={sortBy}
              handleSort={handleSort}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              sortOptions={sortOptions}
              showOptions={showOptions}
              viewModeButtons={viewModeButtons as any}
            />
            <ProductGrid
              products={paginatedProducts}
              loading={loading}
              viewMode={viewMode}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

