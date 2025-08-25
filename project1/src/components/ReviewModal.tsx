"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X, Star } from "lucide-react";
import { toast } from "react-toastify";
import { submitReview } from "@/services/ProductService";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/services/auth";
import { Textarea } from "@/components/ui/textarea";
import StarRating from "@/components/star-rating";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  productId: number;
  productName: string;
  onReviewSubmitted: () => void;
  isLoggedIn: boolean;
}

const MAX_COMMENT_LENGTH = 500;

export default function ReviewModal({ 
  isOpen, 
  onClose, 
  productId, 
  productName, 
  onReviewSubmitted,
  isLoggedIn,
}: ReviewModalProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  const handleStarClick = (starValue: number) => {
    setRating(starValue);
  };

  const handleStarHover = (starValue: number) => {
    setHoveredRating(starValue);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      toast.error("Vui lòng đăng nhập để viết đánh giá");
      handleLogin();
      return;
    }

    if (rating === 0) {
      toast.error("Vui lòng chọn số sao đánh giá");
      return;
    }

    if (!comment.trim()) {
      toast.error("Vui lòng nhập nội dung đánh giá");
      return;
    }

    if (comment.length > MAX_COMMENT_LENGTH) {
      toast.error(`Nội dung đánh giá không được vượt quá ${MAX_COMMENT_LENGTH} ký tự`);
      return;
    }

    setIsSubmitting(true);
    try {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        toast.error("Không thể lấy thông tin người dùng");
        return;
      }

      const reviewData = {
        productId,
        rating,
        comment,
        userId: currentUser.id,
        userName: currentUser.fullName,
        createdAt: new Date().toISOString()
      };
      await submitReview(reviewData);
      
      toast.success("Đánh giá của bạn đã được gửi thành công!");
      onReviewSubmitted();
      
      // Reset form state
      setRating(0);
      setComment("");
      onClose();
    } catch (error) {
      toast.error("Có lỗi xảy ra khi gửi đánh giá");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogin = () => {
    onClose();
    router.push('/login');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && isSubmitting) {
      e.preventDefault();
    }
  };



  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Viết đánh giá</h2>
          <Button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </Button>
        </div>

        <div className="p-6">
          {!isLoggedIn ? (
            <div className="text-center py-8">
              <div className="mb-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Đăng nhập để đánh giá
                </h3>
                <p className="text-gray-600 mb-6">
                  Bạn cần đăng nhập để có thể viết đánh giá cho sản phẩm này
                </p>
              </div>
              <div className="space-y-3">
                <Button
                  onClick={handleLogin}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
                >
                  Đăng nhập
                </Button>
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="w-full border-gray-300 text-gray-700"
                >
                  Hủy
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-6">
              <div className="text-center pb-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-900">{productName}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Chia sẻ trải nghiệm của bạn về sản phẩm này
                </p>
              </div>

              <div className="text-center">
                <Label className="block text-sm font-medium text-gray-700 mb-3">
                  Đánh giá của bạn
                </Label>
                <div className="flex justify-center mb-2">
                  <StarRating
                    rating={rating}
                    hoveredRating={hoveredRating}
                    interactive={true}
                    size="lg"
                    onStarClick={handleStarClick}
                    onStarHover={handleStarHover}
                    onStarLeave={handleStarLeave}
                  />
                </div>
                <p className="text-sm text-gray-600">
                  {rating > 0 ? `${rating} sao` : "Chọn số sao"}
                </p>
              </div>

              <div>
                <Label className="block text-sm font-medium text-gray-700 mb-2">
                  Nhận xét của bạn
                </Label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
                  className="w-full min-h-24 resize-none"
                  maxLength={MAX_COMMENT_LENGTH}
                />
                <div className="flex justify-between items-center mt-1">
                  <span className={`text-xs ${
                    comment.length > MAX_COMMENT_LENGTH * 0.9 
                      ? 'text-red-500' 
                      : comment.length > MAX_COMMENT_LENGTH * 0.8 
                      ? 'text-orange-500' 
                      : 'text-gray-500'
                  }`}>
                    {comment.length}/{MAX_COMMENT_LENGTH} ký tự
                  </span>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  className="flex-1 border-gray-300 text-gray-700"
                  disabled={isSubmitting}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Đang gửi..." : "Gửi đánh giá"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}



