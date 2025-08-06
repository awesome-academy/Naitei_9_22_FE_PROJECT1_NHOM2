import React from "react";
import { toast } from "react-toastify";
import { MESSAGES } from "@/constants/blog";
import { useAuth } from "@/contexts/AuthContext";
import useCommentActions from "@/hooks/useCommentActions";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

interface BlogCommentProps {
  selectedBlog: Blog;
  comments: Comment[];
}

export default function BlogComment({ selectedBlog, comments }: BlogCommentProps) {
  // Use custom hook for handling comments and replies
  const {
    loading,
    authLoading,
    error,
    processedComments,
    commentText,
    replyText,
    handleReplyClick,
    handleCancelReply,
    handleReplySubmit,
    handleCommentSubmit,
    handleLoginRequired,
    handleCommentTextChange,
    handleReplyTextChange,
  } = useCommentActions({ selectedBlog, comments });

  const { isLoggedIn, currentUser } = useAuth();

  if (loading || authLoading) return <p>{MESSAGES.LOADING_COMMENTS}</p>;
  if (error) return <p className="text-red-500">Lỗi: {error}</p>;

  return (
    <div className="flex flex-col gap-8">
      <h3 className="uppercase text-gray-500 font-semibold">
        Bình luận ({processedComments.length})
      </h3>

      {/* Display user info when logged in */}
      {isLoggedIn && currentUser && (
        <div className="bg-green-50 p-3 rounded-lg border border-green-200">
          <p className="text-sm text-green-700">
            Đăng nhập với tài khoản: <strong>{currentUser.fullName}</strong>
          </p>
        </div>
      )}

      <div className="flex flex-col gap-6">
        {processedComments.map((c, idx) => (
          <React.Fragment key={c.id}>
            <CommentItem
              data={c}
              onReply={handleReplyClick}
              isLoggedIn={isLoggedIn}
            />

            {/* Inline reply form */}
            {handleReplyTextChange === c.id && (
              <div className="ml-8 mt-4">
                <CommentForm
                  isLoggedIn={isLoggedIn}
                  onLoginRequired={handleLoginRequired}
                  onSubmit={handleReplySubmit}
                  onCancelReply={handleCancelReply}
                  isReplyForm={true}
                  placeholder="Trả lời bình luận"
                  value={replyText}  // Bind reply text state
                  onChange={handleReplyTextChange}  // Handle reply text change
                />
              </div>
            )}

            {idx !== processedComments.length - 1 && <div className="my-[0.1]" />}
          </React.Fragment>
        ))}
      </div>

      {/* --- Form for submitting new comment --- */}
      <CommentForm
        isLoggedIn={isLoggedIn}
        onLoginRequired={handleLoginRequired}
        onSubmit={handleCommentSubmit}
        placeholder="Viết bình luận của bạn..."
        value={commentText}  // Bind comment text state
        onChange={handleCommentTextChange}  // Handle comment text change
      />
    </div>
  );
}

