import { useState, useMemo, useEffect } from "react";
import type { Blog } from "@/types/Blog";

const ITEMS_PER_PAGE = 3;

interface UseBlogFilterReturn {
  // Filter state
  selectedCategory: number;
  selectedTag: number;
  setSelectedCategory: (id: number) => void;
  setSelectedTag: (id: number) => void;
  clearFilters: () => void;

  // Pagination state
  currentPage: number;
  setCurrentPage: (page: number) => void;

  // Computed values
  filteredBlogs: Blog[];
  currentBlogs: Blog[];
  totalPages: number;
  hasFilters: boolean;
}

export const useBlogFilter = (blogs: Blog[]): UseBlogFilterReturn => {
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedTag, setSelectedTag] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter blogs based on selected category and tag
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      if (selectedCategory && !blog.categories.includes(selectedCategory)) {
        return false;
      }
      if (selectedTag && !blog.tags.includes(selectedTag)) {
        return false;
      }
      return true;
    });
  }, [blogs, selectedCategory, selectedTag]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);

  const currentBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredBlogs.slice(startIndex, endIndex);
  }, [filteredBlogs, currentPage]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedTag]);

  const clearFilters = () => {
    setSelectedCategory(0);
    setSelectedTag(0);
  };

  const hasFilters = selectedCategory > 0 || selectedTag > 0;

  return {
    selectedCategory,
    selectedTag,
    setSelectedCategory,
    setSelectedTag,
    clearFilters,
    currentPage,
    setCurrentPage,
    filteredBlogs,
    currentBlogs,
    totalPages,
    hasFilters,
  };
};
