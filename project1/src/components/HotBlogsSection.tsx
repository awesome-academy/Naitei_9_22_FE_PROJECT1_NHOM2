"use client";

import React from "react";
import Image from "next/image";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";

import { Separator } from "@/components/ui/separator";
import { Blog } from "@/types/Blog";

interface HotBlogsSectionProps {
  blogs: Blog[];
  setSelectedBlog: (blog: Blog | null) => void;
  isMobile: boolean;
  openHot: boolean;
  setOpenHot: (open: boolean) => void;
}

export default function HotBlogsSection({
  blogs,
  setSelectedBlog,
  isMobile,
  openHot,
  setOpenHot,
}: HotBlogsSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      <header className="flex justify-between items-center">
        <h2 className="text-green-600 font-semibold">Tin tức nổi bật</h2>
        {isMobile &&
          (openHot ? (
            <IoIosArrowDropupCircle
              onClick={() => setOpenHot(false)}
              className="text-[26px] text-green-600 cursor-pointer"
            />
          ) : (
            <IoIosArrowDropdownCircle
              onClick={() => setOpenHot(true)}
              className="text-[26px] text-green-600 cursor-pointer"
            />
          ))}
      </header>
      <Separator className="bg-green-600" />

      <div
        className={`flex flex-col gap-3 transition-all duration-300 ${
          openHot
            ? "max-h-[800px] opacity-100 scale-y-100"
            : "max-h-0 opacity-0 scale-y-95"
        } overflow-hidden`}
      >
        {blogs.map((b) => (
          <div
            key={b.id}
            onClick={() => setSelectedBlog(b)}
            className="group flex w-full h-[80px] gap-2 cursor-pointer"
          >
            <Image
              src={b.images[0]}
              alt={b.title}
              width={80}
              height={80}
              className="object-cover rounded-sm transition-transform duration-300 group-hover:scale-105"
            />
            <p className="text-[13px] group-hover:font-semibold line-clamp-3">
              {b.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
