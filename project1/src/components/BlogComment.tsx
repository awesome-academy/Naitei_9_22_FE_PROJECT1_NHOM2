"use client";

import React, { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";

import { getUsersForComment } from "@/services/UserService";
import {
  mapCommentsWithUsers,
  groupCommentsByParent,
  getTotalCommentsCount,
} from "@/utils/commentUtils";
import { MESSAGES } from "@/constants/blog";

import type { Blog } from "@/types/Blog";
import type { Comment } from "@/types/Comment";
import type { UserForComment } from "@/types/UserForComment";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

interface BlogCommentProps {
  selectedBlog: Blog;
  comments: Comment[];
}

export default function BlogComment({
  selectedBlog,
  comments,
}: BlogCommentProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<UserForComment[]>([]);

  /* ------------ Gộp logic xử lý comments với useMemo ------------ */
  const processedComments = useMemo(() => {
    if (!selectedBlog || !comments || !users.length) return [];

    // Filter comments for this blog
    const blogComments = comments.filter(
      (c) => c.blogId === Number(selectedBlog.id)
    );

    // Map comments with users và group by parent
    const commentsWithUsers = mapCommentsWithUsers(blogComments, users);
    const groupedComments = groupCommentsByParent(commentsWithUsers);

    return groupedComments;
  }, [selectedBlog, comments, users]);

  /* ------------ Chỉ lấy users ------------ */
  useEffect(() => {
    if (!selectedBlog || !comments) return;

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get users - chỉ lấy thông tin cần thiết cho comment
        const users = await getUsersForComment();
        setUsers(users);
      } catch (err) {
        setError(err instanceof Error ? err.message : MESSAGES.ERROR_FETCH);
        console.error("Error processing comments:", err);
        toast.error("Không thể tải bình luận. Vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [selectedBlog, comments]);

  if (loading) return <p>{MESSAGES.LOADING_COMMENTS}</p>;
  if (error) return <p className="text-red-500">Lỗi: {error}</p>;

  /* ------------ UI ------------ */
  return (
    <div className="flex flex-col gap-8">
      <h3 className="uppercase text-gray-500 font-semibold">
        bình luận ({getTotalCommentsCount(processedComments)})
      </h3>
      <div className="flex flex-col gap-6">
        {processedComments.map((c, idx) => (
          <React.Fragment key={c.id}>
            <CommentItem data={c} />
            {idx !== processedComments.length - 1 && (
              <div className="my-[0.1]" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* --- Form viết bình luận --- */}
      <CommentForm
        isLoggedIn={false} // Tạm thời set false để test, thực tế sẽ lấy từ auth context
        onLoginRequired={() => {
          // Chuyển đến trang đăng nhập hoặc hiển thị modal login
          console.log("Chuyển đến trang đăng nhập");
          // Có thể dùng router.push("/login") hoặc mở modal
        }}
        onSubmit={(data) => {
          // Xử lý submit comment
          console.log("Comment submitted:", data);
        }}
      />
    </div>
  );
}
