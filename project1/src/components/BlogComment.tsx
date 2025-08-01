"use client";

import React, { useEffect, useState } from "react";

import { getUsers } from "@/services/UserService";
import {
  mapCommentsWithUsers,
  groupCommentsByParent,
  getTotalCommentsCount,
  type CommentWithUser,
} from "@/utils/commentUtils";
import { MESSAGES } from "@/constants/blog";

import type { Blog } from "@/types/Blog";
import type { Comment } from "@/types/Comment";
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
  const [groups, setGroups] = useState<CommentWithUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* ------------ process comments ------------ */
  useEffect(() => {
    if (!selectedBlog || !comments) return;

    const processComments = async () => {
      try {
        setLoading(true);
        setError(null);

        // Filter comments for this blog
        const blogComments = comments.filter(
          (c) => c.blogId === Number(selectedBlog.id)
        );

        // Get users
        const users = await getUsers();

        const commentsWithUsers = mapCommentsWithUsers(blogComments, users);

        const groupedComments = groupCommentsByParent(commentsWithUsers);

        setGroups(groupedComments);
      } catch (err) {
        setError(err instanceof Error ? err.message : MESSAGES.ERROR_FETCH);
        console.error("Error processing comments:", err);
      } finally {
        setLoading(false);
      }
    };

    processComments();
  }, [selectedBlog, comments]);

  if (loading) return <p>{MESSAGES.LOADING_COMMENTS}</p>;
  if (error) return <p className="text-red-500">Lỗi: {error}</p>;

  /* ------------ UI ------------ */
  return (
    <div className="flex flex-col gap-8">
      <h3 className="uppercase text-gray-500 font-semibold">
        bình luận ({getTotalCommentsCount(groups)})
      </h3>
      <div className="flex flex-col gap-6">
        {groups.map((c, idx) => (
          <React.Fragment key={c.id}>
            <CommentItem data={c} />
            {idx !== groups.length - 1 && <hr />}
          </React.Fragment>
        ))}
      </div>

      {/* --- Form viết bình luận --- */}
      <CommentForm />
    </div>
  );
}
