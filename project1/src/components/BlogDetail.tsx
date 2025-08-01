"use client";

import Image from "next/image";
import { FaRegCalendarMinus, FaRegCommentDots } from "react-icons/fa";
import { LuClock9 } from "react-icons/lu";
import { IoReturnUpBack } from "react-icons/io5";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import type { Blog } from "@/types/Blog";
import type { Comment } from "@/types/Comment";
import type { Category } from "@/types/Category";

import { formatDate, parseTextWithBold } from "@/lib/utils";
import { MESSAGES } from "@/constants/blog";

/** BlogContent component to render blog content and images */
function BlogContent({
  parts,
  images,
  title,
}: {
  parts: string[];
  images: string[];
  title: string;
}) {
  let hasSetPriority = false; // Track if we've already set priority on an image

  return (
    <div className="blog-content">
      {parts.map((part, idx) => {
        // Odd indices are image placeholders
        if (idx % 2 === 1) {
          const imgIdx = parseInt(part, 10) - 1;
          if (images[imgIdx]) {
            const shouldPrioritize = !hasSetPriority; // First image gets priority
            if (shouldPrioritize) hasSetPriority = true; // Mark that we've set priority

            return (
              <AspectRatio key={idx} ratio={16 / 9} className="my-4">
                <Image
                  src={images[imgIdx]}
                  alt={`${title} - image ${imgIdx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={shouldPrioritize} // First image in content gets priority for LCP
                  className="object-cover rounded-lg"
                />
              </AspectRatio>
            );
          }
          return null;
        }
        // Even indices are text content
        return (
          <p key={idx} className="mb-4 leading-relaxed">
            {parseTextWithBold(part)}
          </p>
        );
      })}
    </div>
  );
}

interface Props {
  selectedBlog: Blog;
  comments: Comment[];
  categories: Category[];
  onBack: () => void;
  setSelectedCategory: (id: number) => void;
}

export default function BlogDetail({
  selectedBlog,
  comments,
  categories,
  onBack,
  setSelectedCategory,
}: Props) {
  const commentCount = comments.filter(
    (c) => c.blogId === Number(selectedBlog.id)
  ).length;

  const parts = selectedBlog.contents.split(/\[img(\d+)]/); // cắt theo tag

  /* --------- UI --------- */
  return (
    <div className="flex flex-col gap-5">
      {/* nút quay lại */}
      <Button
        onClick={onBack}
        className="w-[180px] gap-2 rounded-[20px] bg-green-600 hover:bg-green-700 text-white"
      >
        <IoReturnUpBack /> Quay lại
      </Button>

      {/* tiêu đề & meta */}
      <h4 className="font-semibold text-[20px]">{selectedBlog.title}</h4>
      <div className="flex items-center gap-5 text-sm text-gray-500">
        <span className="flex items-center gap-1">
          <FaRegCalendarMinus className="text-green-600" />
          {formatDate(selectedBlog.date)}
        </span>
        <span className="flex items-center gap-1">
          <LuClock9 className="text-green-600" />
          {selectedBlog.created_at}
        </span>
        <span className="flex items-center gap-1">
          <FaRegCommentDots className="text-green-600" />
          {commentCount} {MESSAGES.COMMENTS_COUNT}
        </span>
      </div>

      {/* danh mục */}
      <div className="flex flex-wrap gap-2">
        {categories
          .filter((c) => selectedBlog.categories.includes(c.id))
          .map((c) => (
            <Badge
              key={c.id}
              variant="outline"
              onClick={() => {
                setSelectedCategory(c.id);
                onBack();
              }}
              className="cursor-pointer hover:bg-green-600 hover:text-white border-green-600 text-green-600 px-3 h-[28px] text-[13px] rounded-full"
            >
              {c.name}
            </Badge>
          ))}
      </div>

      {/* nội dung + chèn ảnh */}
      <BlogContent
        parts={parts}
        images={selectedBlog.images}
        title={selectedBlog.title}
      />
    </div>
  );
}
