"use client";

import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import ColorFilter from "./ColorFilter";
import ActiveFilters from "./ActiveFilters";

type PriceRange = [number, number];

interface FilterState {
  categories: string[];
  priceRange: PriceRange | null;
  colors: string[];
}

interface ProductFilterProps {
  onFilter: (filters: FilterState) => void;
}

export default function ProductFilter({ onFilter }: ProductFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: null,
    colors: []
  });

  // Handle filter changes
  const handleCategoryChange = (categories: string[]) => {
    const newFilters = { ...filters, categories };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handlePriceChange = (priceRange: PriceRange | null) => {
    const newFilters = { ...filters, priceRange };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const handleColorChange = (colors: string[]) => {
    const newFilters = { ...filters, colors };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  // Clear specific filter functions
  const clearCategory = (categoryName: string) => {
    const newCategories = filters.categories.filter(c => c !== categoryName);
    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearPriceRange = () => {
    const newFilters = { ...filters, priceRange: null };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearColor = (color: string) => {
    const newColors = filters.colors.filter(c => c !== color);
    const newFilters = { ...filters, colors: newColors };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearAllFilters = () => {
    const newFilters = { categories: [], priceRange: null, colors: [] };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  return (
    <div className="p-4">
      {/* Active Filters Display */}
      <ActiveFilters
        categories={filters.categories}
        priceRange={filters.priceRange}
        colors={filters.colors}
        onClearCategory={clearCategory}
        onClearPriceRange={clearPriceRange}
        onClearColor={clearColor}
        onClearAll={clearAllFilters}
      />

      {/* Individual Filter Components */}
      <CategoryFilter
        selectedCategories={filters.categories}
        onCategoryChange={handleCategoryChange}
      />

      <PriceFilter
        selectedPriceRange={filters.priceRange}
        onPriceChange={handlePriceChange}
      />

      <ColorFilter
        selectedColors={filters.colors}
        onColorChange={handleColorChange}
      />
    </div>
  );
}
