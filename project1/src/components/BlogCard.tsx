"use client";

import React from "react";
import Image from "next/image";
import { FaRegCalendarMinus, FaRegCommentDots } from "react-icons/fa";
import { LuClock9 } from "react-icons/lu";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { MESSAGES } from "@/constants/blog";
import { formatDate } from "@/lib/utils";

import type { Blog } from "@/types/Blog";

interface BlogCardProps {
  blog: Blog;
  commentCount: number;
  onClick: (blogId: number) => void;
  priority?: boolean;
}

export default function BlogCard({
  blog,
  commentCount,
  onClick,
  priority = false,
}: BlogCardProps) {
  return (
    <article
      onClick={() => onClick(blog.id)}
      className="cursor-pointer space-y-4 pb-8 hover:opacity-95 transition-opacity"
    >
      {/* title */}
      <h4 className="text-[20px] font-semibold hover:text-green-600">
        {blog.title}
      </h4>

      {/* meta */}
      <div className="flex flex-wrap items-center gap-5 text-[13px] text-gray-500">
        <span className="flex items-center gap-1">
          <FaRegCalendarMinus className="text-green-600" />
          {formatDate(blog.date)}
        </span>
        <span className="flex items-center gap-1">
          <LuClock9 className="text-green-600" />
          {blog.created_at}
        </span>
        <span className="flex items-center gap-1">
          <FaRegCommentDots className="text-green-600" />
          {commentCount}
          <span className="ml-0.5">{MESSAGES.COMMENTS_COUNT}</span>
        </span>
      </div>

      {/* image 16:9 */}
      <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-md">
        <Image
          src={blog.images[0]}
          alt={blog.title}
          fill
          sizes="(max-width:1024px) 100vw, 740px"
          priority={priority}
          className="object-cover"
        />
      </AspectRatio>

      {/* description */}
      <p className="text-[14px] text-gray-600">{blog.description}</p>
    </article>
  );
}
