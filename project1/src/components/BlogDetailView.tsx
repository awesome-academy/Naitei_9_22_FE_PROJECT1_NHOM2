"use client";

import React from "react";

import BlogDetail from "./BlogDetail";
import BlogComment from "./BlogComment";

import type { Blog } from "@/types/Blog";
import type { Comment } from "@/types/Comment";
import type { Category } from "@/types/Category";

interface BlogDetailViewProps {
  selectedBlog: Blog;
  comments: Comment[];
  categories: Category[];
  setSelectedCategory: (id: number) => void;
  onBack: () => void;
}

export default function BlogDetailView({
  selectedBlog,
  comments,
  categories,
  setSelectedCategory,
  onBack,
}: BlogDetailViewProps) {
  return (
    <div className="flex flex-col gap-5 md:gap-[50px]">
      <BlogDetail
        selectedBlog={selectedBlog}
        comments={comments}
        categories={categories}
        setSelectedCategory={setSelectedCategory}
        onBack={onBack}
      />
      <BlogComment selectedBlog={selectedBlog} comments={comments} />
    </div>
  );
}
