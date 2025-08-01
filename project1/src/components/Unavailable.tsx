import React from "react";
import Image from "next/image";
import { SUBJECTS } from "@/constants/blog";

interface UnavailableProps {
  subject?: string; // mặc định là "bài viết" nếu không truyền
}

export default function Unavailable({
  subject = SUBJECTS.POSTS,
}: UnavailableProps) {
  return (
    <div className="w-full flex flex-col items-center py-10 text-gray-500">
      <Image
        src="/dataset/unavailable.jpg"
        alt={`No ${subject}`}
        width={500}
        height={200}
        className="object-cover"
      />
      <h2 className="text-lg font-semibold mb-2">
        Không tìm thấy {subject} phù hợp
      </h2>
      <p>Vui lòng thử lại với bộ lọc khác hoặc xoá bộ lọc hiện tại.</p>
    </div>
  );
}
