"use client";

import React, { useMemo } from "react";

import { Separator } from "@/components/ui/separator";
import { countCommentsByBlog } from "@/utils/commentUtils";
import { SUBJECTS } from "@/constants/blog";

import type { Blog } from "@/types/Blog";
import type { Comment } from "@/types/Comment";

import Unavailable from "./Unavailable";
import BlogCard from "./BlogCard";

interface ListBlogsProps {
  blogs: Blog[];
  comments: Comment[];
  handleSelectBlog: (blogId: number) => void;
}

export default function ListBlogs({
  blogs,
  comments,
  handleSelectBlog,
}: ListBlogsProps) {
  /* đếm comment */
  const commentCounts = useMemo(
    () => countCommentsByBlog(comments),
    [comments]
  );

  if (blogs.length === 0) return <Unavailable subject={SUBJECTS.POSTS} />;

  return (
    <div className="mx-auto w-full md:w-[740px] flex flex-col flex-shrink-0">
      {blogs.map((blog, idx) => (
        <div key={blog.id}>
          <BlogCard
            blog={blog}
            commentCount={commentCounts[blog.id] ?? 0}
            onClick={handleSelectBlog}
            priority={idx === 0}
          />
          {/* ngăn cách các bài – không áp dụng cho bài cuối */}
          {idx < blogs.length - 1 && <Separator />}
        </div>
      ))}
    </div>
  );
}
