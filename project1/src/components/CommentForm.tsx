import React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FORM_PLACEHOLDERS, MESSAGES } from "@/constants/blog";

interface CommentFormProps {
  isLoggedIn?: boolean; // Thêm prop để check đăng nhập
  onSubmit?: (formData: { comment: string }) => void;
  onLoginRequired?: () => void; // Callback khi cần đăng nhập
}

const CommentForm: React.FC<CommentFormProps> = ({
  isLoggedIn = false,
  onSubmit,
  onLoginRequired,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Kiểm tra đăng nhập trước khi submit
    if (!isLoggedIn) {
      onLoginRequired?.();
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = {
      comment: formData.get("comment") as string,
    };

    onSubmit?.(data);
  };

  return (
    <div className="flex flex-col gap-5">
      <h3 className="uppercase text-gray-500 font-semibold">viết bình luận</h3>

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
          {/* Người dùng đã đăng nhập, chỉ cần nhập comment */}
          <Textarea
            name="comment"
            placeholder={FORM_PLACEHOLDERS.COMMENT}
            className="h-[200px]"
            required
          />

          <div className="flex justify-end">
            <Button
              type="submit"
              className="w-[150px] h-[50px] rounded-[20px] bg-green-600 hover:bg-green-700 text-white"
            >
              {MESSAGES.SUBMIT_BUTTON}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CommentForm;
