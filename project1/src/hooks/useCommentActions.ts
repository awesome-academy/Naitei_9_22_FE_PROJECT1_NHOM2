import { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { getUsersForComment } from "@/services/UserService";
import {
  mapCommentsWithUsers,
  groupCommentsByParent,
} from "@/utils/commentUtils";
import { MESSAGES } from "@/constants/blog";
import { useAuth } from "@/contexts/AuthContext";
import { addComment, deleteComment } from "@/services/BlogService";
import type { Blog } from "@/types/Blog";
import type { Comment } from "@/types/Comment";
import type { UserForComment } from "@/types/UserForComment";

interface UseCommentActionsProps {
  selectedBlog: Blog;
  comments: Comment[];
}

export default function useCommentActions({
  selectedBlog,
  comments,
}: UseCommentActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<UserForComment[]>([]);
  const [localComments, setLocalComments] = useState<Comment[]>(comments);

  const { isLoggedIn, currentUser, loading: authLoading } = useAuth();
  const [replyToComment, setReplyToComment] = useState<number | null>(null);
  const [showReplyForm, setShowReplyForm] = useState<number | null>(null);

  // Reset comments state when the comments prop changes
  useEffect(() => {
    setLocalComments(comments);
  }, [comments]);

  // Fetch users for comments
  useEffect(() => {
    if (!selectedBlog || !comments) return;

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const users = await getUsersForComment();
        setUsers(users);
      } catch (err) {
        setError(err instanceof Error ? err.message : MESSAGES.ERROR_FETCH);
        console.error("Error fetching users:", err);
        toast.error("Không thể tải bình luận. Vui lòng thử lại!");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [selectedBlog, comments]);

  // Process comments
  const processedComments = useMemo(() => {
    if (!selectedBlog || !localComments || !users.length) return [];
    let blogComments = localComments.filter(
      (c) => c.blogId === Number(selectedBlog.id)
    );
    // Sort by date (newest first)
    blogComments = blogComments.sort((a, b) => {
      // date is string in dd/mm/yyyy or ISO format
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    const commentsWithUsers = mapCommentsWithUsers(blogComments, users);
    return groupCommentsByParent(commentsWithUsers);
  }, [selectedBlog, localComments, users]);

  // Handle click to show reply form
  const handleReplyClick = (commentId: number, userName: string) => {
    if (showReplyForm === commentId) {
      setReplyToComment(null);
      setShowReplyForm(null);
    } else {
      setReplyToComment(commentId);
      setShowReplyForm(commentId);
      toast.info(`Đang trả lời bình luận của ${userName}`);
    }
  };

  // Handle cancel reply
  const handleCancelReply = () => {
    setReplyToComment(null);
    setShowReplyForm(null);
  };

  // Handle reply submit
  const handleReplySubmit = async (data: { comment: string }) => {
    if (!isLoggedIn || !currentUser || !replyToComment) {
      toast.error("Bạn cần đăng nhập để bình luận");
      return;
    }

    try {
      const newComment: Omit<Comment, "id"> = {
        blogId: Number(selectedBlog.id),
        userId: String(currentUser.id),
        content: data.comment,
        date: new Date().toISOString(),
        replyTo: replyToComment,
      };

      const savedComment = await addComment(newComment);
      setLocalComments((prev) => [savedComment, ...prev]);
      toast.success("Phản hồi đã được gửi thành công!");

      // Reset relevant states
      resetStates();
    } catch (error) {
      console.error("Error submitting reply:", error);
      toast.error("Có lỗi xảy ra khi gửi phản hồi");
    }
  };

  // Handle comment submit
  const handleCommentSubmit = async (data: { comment: string }) => {
    if (!isLoggedIn || !currentUser) {
      toast.error("Bạn cần đăng nhập để bình luận");
      return { success: false };
    }

    try {
      const newComment: Omit<Comment, "id"> = {
        blogId: Number(selectedBlog.id),
        userId: String(currentUser.id),
        content: data.comment,
        date: new Date().toISOString(),
        replyTo: undefined,
      };

      const savedComment = await addComment(newComment);
      setLocalComments((prev) => [savedComment, ...prev]);
      toast.success("Bình luận đã được gửi thành công!");

      // Reset relevant states
      resetStates();

      return { success: true, comment: savedComment };
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Có lỗi xảy ra khi gửi bình luận");
      return { success: false };
    }
  };

  // Reset states
  const resetStates = () => {
    setReplyToComment(null);
    setShowReplyForm(null);
  };

  // Handle comment delete
  const handleCommentDelete = async (commentId: number) => {
    try {
      await deleteComment(commentId);
      // Remove comment from local state
      setLocalComments((prev) =>
        prev.filter(
          (comment) => comment.id !== commentId && comment.replyTo !== commentId
        )
      );
      toast.success("Đã xóa bình luận thành công!");
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Có lỗi xảy ra khi xóa bình luận");
    }
  };

  // Handle login redirect
  const handleLoginRequired = () => {
    toast.info("Vui lòng đăng nhập để bình luận");
    router.push("/login");
  };

  return {
    loading,
    authLoading,
    error,
    processedComments,
    showReplyForm,
    handleReplyClick,
    handleCancelReply,
    handleReplySubmit,
    handleCommentSubmit,
    handleCommentDelete,
    handleLoginRequired,
    setLocalComments,
  };
}
