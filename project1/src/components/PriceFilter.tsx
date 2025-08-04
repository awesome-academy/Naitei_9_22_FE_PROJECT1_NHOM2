"use client";

import { ChevronRight } from "lucide-react";

type PriceRange = [number, number];

interface PriceFilterProps {
  selectedPriceRange: PriceRange | null;
  onPriceChange: (priceRange: PriceRange | null) => void;
}

export default function PriceFilter({ selectedPriceRange, onPriceChange }: PriceFilterProps) {
  const priceRanges = [
    { label: "200.000 Đ - 400.000 Đ", value: [200000, 400000] as PriceRange },
    { label: "400.000 Đ - 600.000 Đ", value: [400000, 600000] as PriceRange },
    { label: "600.000 Đ - 800.000 Đ", value: [600000, 800000] as PriceRange },
    { label: "800.000 Đ - 1.000.000 Đ", value: [800000, 1000000] as PriceRange },
    { label: "1.000.000 Đ - 2.000.000 Đ", value: [1000000, 2000000] as PriceRange }
  ];

  const handlePriceChange = (priceRange: PriceRange) => {
    if (selectedPriceRange && 
        selectedPriceRange[0] === priceRange[0] && 
        selectedPriceRange[1] === priceRange[1]) {
      onPriceChange(null);
    } else {
      onPriceChange(priceRange);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mt-4">
      <div className="p-3 text-emerald-500 border-b-2 border-emerald-500">
        <h4 className="font-bold text-lg">Tìm theo giá</h4>
      </div>
      <div className="p-3 space-y-2">
        {priceRanges.map((range, index) => (
          <div 
            key={index} 
            className={`flex pb-2 items-center space-x-2 cursor-pointer text-sm border-b border-gray-300 hover:text-emerald-600 ${
              selectedPriceRange && 
              selectedPriceRange[0] === range.value[0] && 
              selectedPriceRange[1] === range.value[1]
                ? 'bg-blue-50 text-blue-700 font-medium' 
                : ''
            }`}
            onClick={() => handlePriceChange(range.value)}
          >
            <ChevronRight className="w-3 h-3 text-gray-500" />
            <span className="text-gray-700">{range.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 
