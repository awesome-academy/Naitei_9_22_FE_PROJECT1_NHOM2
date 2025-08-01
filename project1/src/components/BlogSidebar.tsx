"use client";

import React, { useState, useMemo, useEffect } from "react";

import CategorySection from "@/components/CategorySection";
import HotBlogsSection from "@/components/HotBlogsSection";
import TagsSection from "@/components/TagsSection";

import { Blog } from "@/types/Blog";
import { Category } from "@/types/Category";
import { Tag } from "@/types/Tag";

interface BlogSidebarProps {
  blogs: Blog[];
  categories: Category[];
  tags: Tag[];

  selectedCategory: number;
  setSelectedCategory: (category: number) => void;

  selectedTag: number;
  setSelectedTag: (tag: number) => void;

  setSelectedBlog: (blog: Blog | null) => void;
}

export default function BlogSidebar({
  blogs,
  categories,
  tags,
  selectedCategory,
  setSelectedCategory,
  selectedTag,
  setSelectedTag,
  setSelectedBlog,
}: BlogSidebarProps) {
  /* -------- đếm số bài theo category -------- */
  const categoryCounts = useMemo(() => {
    const map: Record<number, number> = {};
    categories.forEach((c) => (map[c.id] = 0));
    blogs.forEach((b) =>
      b.categories.forEach((id) => (map[id] = (map[id] || 0) + 1))
    );
    return map;
  }, [blogs, categories]);

  /* -------- UI state: mở / đóng -------- */
  const [openCate, setOpenCate] = useState(true);
  const [openHot, setOpenHot] = useState(true);
  const [openTag, setOpenTag] = useState(true);

  /* Ẩn dropdown khi desktop */
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const resize = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.innerWidth < 600);
      }
    };
    resize();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", resize);
      return () => window.removeEventListener("resize", resize);
    }
  }, []);
  useEffect(() => {
    if (!isMobile) {
      setOpenCate(true);
      setOpenHot(true);
      setOpenTag(true);
    }
  }, [isMobile]);

  /* -------- render -------- */
  return (
    <aside className="flex flex-col gap-5 md:gap-10">
      {/* ===== CATEGORY ===== */}
      <CategorySection
        categories={categories}
        categoryCounts={categoryCounts}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        setSelectedBlog={setSelectedBlog}
        isMobile={isMobile}
        openCate={openCate}
        setOpenCate={setOpenCate}
      />

      {/* ===== HOT BLOGS ===== */}
      <HotBlogsSection
        blogs={blogs}
        setSelectedBlog={setSelectedBlog}
        isMobile={isMobile}
        openHot={openHot}
        setOpenHot={setOpenHot}
      />

      {/* ===== TAGS ===== */}
      <TagsSection
        tags={tags}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        setSelectedBlog={setSelectedBlog}
        isMobile={isMobile}
        openTag={openTag}
        setOpenTag={setOpenTag}
      />
    </aside>
  );
}
