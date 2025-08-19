import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FORM_PLACEHOLDERS, MESSAGES } from "@/constants/blog";

interface CommentFormProps {
  isLoggedIn?: boolean;
  onSubmit?: (formData: { comment: string }) => Promise<void> | void;
  onLoginRequired?: () => void;
  resetTrigger?: boolean; // Trigger để reset form từ bên ngoài
  isReplyForm?: boolean; // Phân biệt form reply
}

const CommentForm: React.FC<CommentFormProps> = ({
  isLoggedIn = false,
  onSubmit,
  onLoginRequired,
  resetTrigger = false,
  isReplyForm = false,
}) => {
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form khi resetTrigger thay đổi
  useEffect(() => {
    if (resetTrigger) {
      setComment("");
    }
  }, [resetTrigger]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Kiểm tra đăng nhập trước khi submit
    if (!isLoggedIn) {
      onLoginRequired?.();
      return;
    }

    if (!comment.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const data = { comment: comment.trim() };
      await onSubmit?.(data);
      setComment(""); // Clear form sau khi submit thành công
    } catch (error) {
      console.error("Error submitting comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {!isReplyForm && (
        <h3 className="uppercase text-gray-500 font-semibold">
          viết bình luận
        </h3>
      )}

      {!isLoggedIn ? (
        // Hiển thị khi chưa đăng nhập
        <div className="flex flex-col gap-4 p-6 bg-gray-50 rounded-lg border">
          <p className="text-gray-600 text-center">
            Bạn cần đăng nhập để viết bình luận
          </p>
          <div className="flex justify-center">
            <Button
              onClick={onLoginRequired}
              className="w-[150px] h-[50px] rounded-[20px] bg-green-600 hover:bg-green-700 text-white"
            >
              Đăng nhập
            </Button>
          </div>
        </div>
      ) : (
        // Form bình luận khi đã đăng nhập
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Textarea
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder={FORM_PLACEHOLDERS.COMMENT}
            className={isReplyForm ? "h-[120px]" : "h-[200px]"}
            required
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={isSubmitting || !comment.trim()}
              className="w-[150px] h-[50px] rounded-[20px] bg-green-600 hover:bg-green-700 text-white disabled:opacity-50"
            >
              {isSubmitting
                ? "Đang gửi..."
                : isReplyForm
                ? "Gửi phản hồi"
                : MESSAGES.SUBMIT_BUTTON}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommentForm;
