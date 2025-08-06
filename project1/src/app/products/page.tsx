"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductFilter from "@/components/ProductFilter";
import ProductGrid from "@/components/ProductGrid";
import ProductHeaderControls from "@/components/ProductHeaderControls";
import { getProducts } from "@/services/ProductService";
import { getCurrentPrice, Product } from "@/types/Product";
import { toast } from "react-toastify";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [itemsPerPage, setItemsPerPage] = useState(15);
  
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const search = searchParams.get('search');

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        toast.error('Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter by category or search
  useEffect(() => {
    let filtered = [...products];
    
    if (category) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    if (search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [category, search, products]);

  // Handle filters from sidebar
  const handleFilter = (filters: {
    categories: string[];
    priceRange: [number, number] | null;
    colors: string[];
  }) => {
    let filtered = [...products];
    
    // Category filter
    if (filters.categories.length > 0) {
      filtered = filtered.filter(product =>
        filters.categories.includes(product.category)
      );
    }
    
    // Price filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange;
      filtered = filtered.filter(product => {
        const price = getCurrentPrice(product) || 0;
        return price >= min && price <= max;
      });
    }
    
    if (filters.colors.length > 0) {
      filtered = filtered.filter(product =>
        filters.colors.some(color => 
          product.type?.includes(color) || product.name.toLowerCase().includes(color)
        )
      );
    }
    
    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  // Sort strategies object map
  const sortStrategies = {
    'price-low-high': (a: Product, b: Product) => (getCurrentPrice(a) || 0) - (getCurrentPrice(b) || 0),
    'price-high-low': (a: Product, b: Product) => (getCurrentPrice(b) || 0) - (getCurrentPrice(a) || 0),
    'name': (a: Product, b: Product) => a.name.localeCompare(b.name),
    'rating': (a: Product, b: Product) => b.rating - a.rating,
    'default': () => 0 
  };

  // Handle sort
  const handleSort = (sortOption: string) => {
    setSortBy(sortOption);
    let sorted = [...filteredProducts];
    
    const sortStrategy = sortStrategies[sortOption as keyof typeof sortStrategies] || sortStrategies.default;
    sorted.sort(sortStrategy);
    
    setFilteredProducts(sorted);
  };

  const viewModeButtons = [
    { 
      mode: 'grid', 
      title: 'Hiển thị dạng lưới',
      icon: '/grid.svg'
    },
    { 
      mode: 'list', 
      title: 'Hiển thị dạng danh sách',
      icon: '/list.svg'
    }
  ];

  const sortOptions = [
    { value: 'name', label: 'Tên A-Z' },
    { value: 'price-low-high', label: 'Giá thấp - cao' },
    { value: 'price-high-low', label: 'Giá cao - thấp' },
    { value: 'rating', label: 'Đánh giá cao nhất' }
  ];

  const showOptions = [
    { value: '15', label: '15' },
    { value: '20', label: '20' },
    { value: '25', label: '25' }
  ];

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">        
        <div className="flex gap-6 mt-6">
          {/* Sidebar Filters */}
          <div className="w-80 flex-shrink-0">
            <ProductFilter onFilter={handleFilter} />
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            {/* Header Controls */}
            <ProductHeaderControls
              viewMode={viewMode}
              setViewMode={setViewMode}
              sortBy={sortBy}
              handleSort={handleSort}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
              sortOptions={sortOptions}
              showOptions={showOptions}
              viewModeButtons={viewModeButtons}
            />
            
            {/* Products Display */}
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



