"use client";

import React from "react";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Blog } from "@/types/Blog";
import { Tag } from "@/types/Tag";

interface TagsSectionProps {
  tags: Tag[];
  selectedTag: number;
  setSelectedTag: (tag: number) => void;
  setSelectedBlog: (blog: Blog | null) => void;
  isMobile: boolean;
  openTag: boolean;
  setOpenTag: (open: boolean) => void;
}

export default function TagsSection({
  tags,
  selectedTag,
  setSelectedTag,
  setSelectedBlog,
  isMobile,
  openTag,
  setOpenTag,
}: TagsSectionProps) {
  const handleSelectTag = (id: number) => {
    setSelectedTag(id);
    setSelectedBlog(null);
  };

  return (
    <section className="flex flex-col gap-4">
      <header className="flex justify-between items-center">
        <h2 className="text-green-600 font-semibold">Blog tag</h2>

        {selectedTag > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedTag(0);
              setSelectedBlog(null);
            }}
            className="ml-3"
          >
            &times; Hủy
          </Button>
        )}

        {isMobile &&
          (openTag ? (
            <IoIosArrowDropupCircle
              onClick={() => setOpenTag(false)}
              className="text-[26px] text-green-600 cursor-pointer"
            />
          ) : (
            <IoIosArrowDropdownCircle
              onClick={() => setOpenTag(true)}
              className="text-[26px] text-green-600 cursor-pointer"
            />
          ))}
      </header>
      <Separator className="bg-green-600" />

      <div
        className={`flex flex-wrap gap-3 transition-all duration-300 ${
          openTag
            ? "max-h-[500px] opacity-100 scale-y-100"
            : "max-h-0 opacity-0 scale-y-95"
        } overflow-hidden`}
      >
        {tags.map((t) => (
          <Badge
            key={t.id}
            variant={selectedTag === t.id ? "default" : "outline"}
            onClick={() => handleSelectTag(t.id)}
            className={`cursor-pointer h-[40px] px-3 flex items-center ${
              selectedTag === t.id ? "bg-green-600 text-white" : ""
            }`}
          >
            {t.name}
          </Badge>
        ))}
      </div>
    </section>
  );
}
