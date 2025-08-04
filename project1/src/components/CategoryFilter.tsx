"use client";

import { useState, useEffect } from "react";
import { ChevronRight } from "lucide-react";
import { getCategories } from "@/services/ProductService";

interface CategoryFilterProps {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
}

export default function CategoryFilter({ selectedCategories, onCategoryChange }: CategoryFilterProps) {
  const [categories, setCategories] = useState<{ name: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const categoriesData = await getCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryChange = (categoryName: string) => {
    const newCategories = selectedCategories.includes(categoryName)
      ? selectedCategories.filter(c => c !== categoryName)
      : [...selectedCategories, categoryName];
    
    onCategoryChange(newCategories);
  };

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="p-3 text-emerald-600 border-b-2 border-emerald-600 bg-gray-50">
        <h4 className="font-bold text-lg">Danh mục sản phẩm</h4>
      </div>
      <div className="p-3 space-y-2">
        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="flex items-center space-x-2 pb-2 border-b border-gray-300">
                <div className="w-3 h-3 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded animate-pulse flex-1"></div>
              </div>
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-4 text-gray-500 text-sm">
            Không có danh mục nào
          </div>
        ) : (
          categories.map((category) => (
            <div 
              key={category.name} 
              className={`flex pb-2 items-center space-x-2 cursor-pointer text-sm border-b border-gray-300 hover:text-emerald-600 ${
                selectedCategories.includes(category.name) 
                  ? 'bg-emerald-50 text-emerald-700 font-medium' 
                  : ''
              }`}
              onClick={() => handleCategoryChange(category.name)}
            >
              <ChevronRight className="w-3 h-3 text-gray-500" />
              <span className="text-gray-700">
                {category.name}
                {category.count > 0 && (
                  <span className="text-gray-500"> ({category.count})</span>
                )}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 
