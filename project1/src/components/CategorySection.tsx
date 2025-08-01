"use client";

import React from "react";
import {
  IoIosArrowForward,
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Blog } from "@/types/Blog";
import { Category } from "@/types/Category";

interface CategorySectionProps {
  categories: Category[];
  categoryCounts: Record<number, number>;
  selectedCategory: number;
  setSelectedCategory: (category: number) => void;
  setSelectedBlog: (blog: Blog | null) => void;
  isMobile: boolean;
  openCate: boolean;
  setOpenCate: (open: boolean) => void;
}

export default function CategorySection({
  categories,
  categoryCounts,
  selectedCategory,
  setSelectedCategory,
  setSelectedBlog,
  isMobile,
  openCate,
  setOpenCate,
}: CategorySectionProps) {
  const handleSelectCategory = (id: number) => {
    setSelectedCategory(id);
    setSelectedBlog(null);
  };

  return (
    <section className="flex flex-col gap-4">
      <header className="flex justify-between items-center">
        <h2 className="text-green-600 font-semibold">Danh mục sản phẩm</h2>

        {selectedCategory > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedCategory(0);
              setSelectedBlog(null);
            }}
            className="ml-3"
          >
            &times; Hủy
          </Button>
        )}

        {isMobile &&
          (openCate ? (
            <IoIosArrowDropupCircle
              onClick={() => setOpenCate(false)}
              className="text-[26px] text-green-600 cursor-pointer"
            />
          ) : (
            <IoIosArrowDropdownCircle
              onClick={() => setOpenCate(true)}
              className="text-[26px] text-green-600 cursor-pointer"
            />
          ))}
      </header>
      <Separator className="bg-green-600" />

      <div
        className={`flex flex-col gap-3 transition-all duration-300 ${
          openCate
            ? "max-h-[500px] opacity-100 scale-y-100"
            : "max-h-0 opacity-0 scale-y-95"
        } overflow-hidden`}
      >
        {categories.map((c) => (
          <div
            key={c.id}
            onClick={() => handleSelectCategory(c.id)}
            className="flex flex-col gap-2 cursor-pointer hover:font-semibold"
          >
            <div className="flex items-center gap-3">
              <IoIosArrowForward
                className={`text-[14px] ${
                  selectedCategory === c.id ? "text-green-600" : "text-gray-500"
                }`}
              />
              <span
                className={`text-[14px] ${
                  selectedCategory === c.id
                    ? "text-green-600 font-semibold"
                    : "text-gray-500"
                }`}
              >
                {c.name} ({categoryCounts[c.id] || 0})
              </span>
            </div>
            <Separator />
          </div>
        ))}
      </div>
    </section>
  );
}
