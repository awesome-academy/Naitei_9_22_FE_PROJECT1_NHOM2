"use client";

import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type PriceRange = [number, number];

interface ActiveFiltersProps {
  categories: string[];
  priceRange: PriceRange | null;
  colors: string[];
  onClearCategory: (category: string) => void;
  onClearPriceRange: () => void;
  onClearColor: (color: string) => void;
  onClearAll: () => void;
}

export default function ActiveFilters({
  categories,
  priceRange,
  colors,
  onClearCategory,
  onClearPriceRange,
  onClearColor,
  onClearAll
}: ActiveFiltersProps) {
  const hasActiveFilters = categories.length > 0 || priceRange !== null || colors.length > 0;

  if (!hasActiveFilters) return null;

  const priceRanges = [
    { label: "200.000 Đ - 400.000 Đ", value: [200000, 400000] as PriceRange },
    { label: "400.000 Đ - 600.000 Đ", value: [400000, 600000] as PriceRange },
    { label: "600.000 Đ - 800.000 Đ", value: [600000, 800000] as PriceRange },
    { label: "800.000 Đ - 1.000.000 Đ", value: [800000, 1000000] as PriceRange },
    { label: "1.000.000 Đ - 2.000.000 Đ", value: [1000000, 2000000] as PriceRange }
  ];

  const colorsData = [
    { name: "Xanh cây", value: "green" },
    { name: "Đỏ cam", value: "orange" },
    { name: "Vàng", value: "yellow" },
    { name: "Xanh trời", value: "blue" },
    { name: "Tím", value: "purple" },
    { name: "Hồng", value: "pink" },
  ];

  // Get price range label
  const getPriceRangeLabel = (range: PriceRange) => {
    const priceRange = priceRanges.find(p => p.value[0] === range[0] && p.value[1] === range[1]);
    return priceRange ? priceRange.label : `${range[0].toLocaleString()} Đ - ${range[1].toLocaleString()} Đ`;
  };

  // Get color name by value
  const getColorName = (colorValue: string) => {
    const color = colorsData.find(c => c.value === colorValue);
    return color ? color.name : colorValue;
  };

  return (
    <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-medium text-gray-800">Bộ lọc đã áp dụng</h4>
        <button 
          onClick={onClearAll}
          className="text-xs text-red-600 hover:text-red-800 underline"
        >
          Xóa tất cả
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {/* Category filters */}
        {categories.map((category) => (
          <Badge 
            key={`category-${category}`}
            variant="secondary" 
            className="bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200"
          >
            {category}
            <button 
              onClick={() => onClearCategory(category)}
              className="ml-2 hover:text-emerald-900"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
        
        {/* Price filter */}
        {priceRange && (
          <Badge 
            variant="secondary" 
            className="bg-blue-100 text-blue-800 border border-blue-300 hover:bg-blue-200"
          >
            {getPriceRangeLabel(priceRange)}
            <button 
              onClick={onClearPriceRange}
              className="ml-2 hover:text-blue-900"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        )}
        
        {/* Color filters */}
        {colors.map((color) => (
          <Badge 
            key={`color-${color}`}
            variant="secondary" 
            className="bg-purple-100 text-purple-800 border border-purple-300 hover:bg-purple-200"
          >
            {getColorName(color)}
            <button 
              onClick={() => onClearColor(color)}
              className="ml-2 hover:text-purple-900"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
} 
