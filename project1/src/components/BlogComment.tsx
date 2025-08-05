"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { getUsersForComment } from "@/services/UserService";
import { isAuthenticated, getCurrentUser } from "@/services/auth";
import {
  mapCommentsWithUsers,
  groupCommentsByParent,
  getTotalCommentsCount,
} from "@/utils/commentUtils";
import { MESSAGES } from "@/constants/blog";

import type { Blog } from "@/types/Blog";
import type { Comment } from "@/types/Comment";
import type { UserForComment } from "@/types/UserForComment";
import type { User } from "@/types/User";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { addComment } from "@/services/BlogService";

interface BlogCommentProps {
  selectedBlog: Blog;
  comments: Comment[];
}

export default function BlogComment({
  selectedBlog,
  comments,
}: BlogCommentProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<UserForComment[]>([]);

  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Reply state
  const [replyToComment, setReplyToComment] = useState<number | null>(null);
  const [showReplyForm, setShowReplyForm] = useState<number | null>(null);

  // Local comments state for immediate updates
  const [localComments, setLocalComments] = useState<Comment[]>(comments);

  // Update local comments when props change
  useEffect(() => {
    setLocalComments(comments);
  }, [comments]);

  /* ------------ Kiểm tra trạng thái đăng nhập ------------ */
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        setAuthLoading(true);

        // Kiểm tra token có tồn tại không
        const authenticated = isAuthenticated();

        if (authenticated) {
          // Lấy thông tin user hiện tại
          const user = await getCurrentUser();

          if (user) {
            setIsLoggedIn(true);
            setCurrentUser(user);
          } else {
            // Token có nhưng không lấy được user info
            setIsLoggedIn(false);
            setCurrentUser(null);
          }
        } else {
          setIsLoggedIn(false);
          setCurrentUser(null);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsLoggedIn(false);
        setCurrentUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  /* ------------ Gộp logic xử lý comments với useMemo ------------ */
  const processedComments = useMemo(() => {
    if (!selectedBlog || !localComments || !users.length) return [];

    // Filter comments for this blog
    const blogComments = localComments.filter(
      (c) => c.blogId === Number(selectedBlog.id)
    );

    // Map comments with users và group by parent
    const commentsWithUsers = mapCommentsWithUsers(blogComments, users);
    const groupedComments = groupCommentsByParent(commentsWithUsers);

    return groupedComments;
  }, [selectedBlog, localComments, users]);

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

  /* ------------ Xử lý reply comment ------------ */
  const handleReplyClick = (commentId: number, userName: string) => {
    if (showReplyForm === commentId) {
      // Nếu đang hiển thị form reply cho comment này thì đóng lại
      setReplyToComment(null);
      setShowReplyForm(null);
    } else {
      // Hiển thị form reply cho comment này
      setReplyToComment(commentId);
      setShowReplyForm(commentId);
      toast.info(`Đang trả lời bình luận của ${userName}`);
    }
  };

  const handleCancelReply = () => {
    setReplyToComment(null);
    setShowReplyForm(null);
  };

  /* ------------ Xử lý submit reply ------------ */
  const handleReplySubmit = async (data: { comment: string }) => {
    if (!isLoggedIn || !currentUser || !replyToComment) {
      toast.error("Bạn cần đăng nhập để bình luận");
      return;
    }

    try {
      const newComment: Omit<Comment, "id"> = {
        blogId: Number(selectedBlog.id),
        userId: currentUser.id,
        content: data.comment,
        date: new Date().toISOString(),
        replyTo: replyToComment,
      };

      const savedComment = await addComment(newComment);

      const commentWithId: Comment = {
        ...newComment,
        id: savedComment.id || Date.now(),
      };

      setLocalComments((prev) => [...prev, commentWithId]);
      toast.success("Phản hồi đã được gửi thành công!");

      // Reset reply state
      setReplyToComment(null);
      setShowReplyForm(null);
    } catch (error) {
      console.error("Error submitting reply:", error);
      toast.error("Có lỗi xảy ra khi gửi phản hồi");
    }
  };

  /* ------------ Xử lý submit comment mới ------------ */
  const handleCommentSubmit = async (data: { comment: string }) => {
    if (!isLoggedIn || !currentUser) {
      toast.error("Bạn cần đăng nhập để bình luận");
      return;
    }

    try {
      const newComment: Omit<Comment, "id"> = {
        blogId: Number(selectedBlog.id),
        userId: currentUser.id,
        content: data.comment,
        date: new Date().toISOString(),
        replyTo: undefined, // Comment mới không reply ai
      };

      const savedComment = await addComment(newComment);

      const commentWithId: Comment = {
        ...newComment,
        id: savedComment.id || Date.now(),
      };

      setLocalComments((prev) => [...prev, commentWithId]);
      toast.success("Bình luận đã được gửi thành công!");
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Có lỗi xảy ra khi gửi bình luận");
    }
  };

  /* ------------ Xử lý yêu cầu đăng nhập ------------ */
  const handleLoginRequired = () => {
    toast.info("Vui lòng đăng nhập để bình luận");
    router.push("/login");
  };

  if (loading || authLoading) return <p>{MESSAGES.LOADING_COMMENTS}</p>;
  if (error) return <p className="text-red-500">Lỗi: {error}</p>;

  /* ------------ UI ------------ */
  return (
    <div className="flex flex-col gap-8">
      <h3 className="uppercase text-gray-500 font-semibold">
        bình luận ({getTotalCommentsCount(processedComments)})
      </h3>

      {/* Hiển thị thông tin user đang đăng nhập */}
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
            {showReplyForm === c.id && (
              <div className="ml-8 mt-4">
                <CommentForm
                  isLoggedIn={isLoggedIn}
                  onLoginRequired={handleLoginRequired}
                  onSubmit={handleReplySubmit}
                  onCancelReply={handleCancelReply}
                  isReplyForm={true}
                  placeholder={`Trả lời bình luận của ${
                    c.user?.fullName || "người dùng"
                  }...`}
                />
              </div>
            )}

            {idx !== processedComments.length - 1 && (
              <div className="my-[0.1]" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* --- Form viết bình luận mới --- */}
      <CommentForm
        isLoggedIn={isLoggedIn}
        onLoginRequired={handleLoginRequired}
        onSubmit={handleCommentSubmit}
        placeholder="Viết bình luận của bạn..."
      />
    </div>
  );
}

