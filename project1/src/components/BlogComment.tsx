"use client";
import React, { useEffect, useState } from "react";
import { MESSAGES } from "@/constants/blog";
import { useAuth } from "@/contexts/AuthContext";
import useCommentActions from "@/hooks/useCommentActions";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import type { Blog } from "@/types/Blog";
import type { Comment as BlogComment } from "@/types/Comment";
import useCommentSocket from "@/hooks/useCommentSocket";

interface BlogCommentProps {
  selectedBlog: Blog;
  comments: BlogComment[];
}

export default function BlogComment({
  selectedBlog,
  comments,
}: BlogCommentProps) {
  // Use custom hook for handling comments and replies
  const {
    loading,
    authLoading,
    error,
    processedComments,
    showReplyForm,
    handleReplyClick,
    handleReplySubmit,
    handleCommentSubmit,
    handleCommentDelete,
    handleLoginRequired,
    setLocalComments,
  } = useCommentActions({ selectedBlog, comments });

  const { handleSubmitWithSocket } = useCommentSocket({
    selectedBlog,
    setLocalComments,
    handleCommentSubmit,
  });

  const { isLoggedIn, currentUser } = useAuth();

  if (loading || authLoading) return <p>{MESSAGES.LOADING_COMMENTS}</p>;
  if (error) return <p className="text-red-500">Lỗi: {error}</p>;

  return (
    <div className="flex flex-col gap-8">
      <h3 className="uppercase text-gray-500 font-semibold">
        Bình luận ({processedComments.length})
      </h3>

      <div className="flex flex-col gap-6">
        {processedComments.map((c) => (
          <React.Fragment key={c.id}>
            <CommentItem
              data={c}
              onReply={(commentId) =>
                handleReplyClick(commentId, c.userName || "Người dùng")
              }
              onDelete={handleCommentDelete}
              currentUser={currentUser}
            />

            {/* Inline reply form */}
            {showReplyForm === c.id && (
              <div className="ml-8 mt-4">
                <CommentForm
                  isLoggedIn={isLoggedIn}
                  onLoginRequired={handleLoginRequired}
                  onSubmit={handleReplySubmit}
                  isReplyForm={true}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* --- Form for submitting new comment --- */}
      <CommentForm
        isLoggedIn={isLoggedIn}
        onLoginRequired={handleLoginRequired}
        onSubmit={handleSubmitWithSocket}
      />
    </div>
  );
}
