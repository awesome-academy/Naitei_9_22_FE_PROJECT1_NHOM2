"use client";

import { useState, useEffect } from "react";
import { Product, Review } from "@/types/Product";
import { getReviews } from "@/services/ProductService";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/star-rating";

interface ProductReviewTabProps {
  product: Product;
  onWriteReview: () => void;
}

export default function ProductReviewTab({ product, onWriteReview }: ProductReviewTabProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      setReviewsLoading(true);
      try {
        const reviewsData = await getReviews(product.id);
        setReviews(reviewsData);
      } catch (error) {
        toast.error('Không thể tải đánh giá');
      } finally {
        setReviewsLoading(false);
      }
    };

    loadReviews();
  }, [product.id]);

  const refreshReviews = async () => {
    try {
      const reviewsData = await getReviews(product.id);
      setReviews(reviewsData);
    } catch (error) {
      toast.error("Có lỗi xảy ra: " + error);
    }
  };

  useEffect(() => {
    (window as any).refreshProductReviews = refreshReviews;
    
    return () => {
      delete (window as any).refreshProductReviews;
    };
  }, [product.id]);

  return (
    <div className="p-6 border-1 border-t-0 border-gray-300">
      <div className="space-y-6">
        {/* Review Summary */}
        <div className="border-b border-gray-200 pb-4">
          <div className="flex items-center space-x-4 mb-4">
            <div className="text-3xl font-bold text-gray-900">{product.rating.toFixed(1)}</div>
            <div>
              <div className="text-lg mb-1">
                <StarRating rating={product.rating} className="text-yellow-400" />
              </div>
              <div className="text-sm text-gray-600">{reviews.length} đánh giá</div>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        {reviewsLoading ? (
          <div className="text-center py-8">
            <div className="text-lg">Đang tải đánh giá...</div>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews && reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                      {(review.userName && review.userName.charAt(0).toUpperCase()) || '?'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900">{review.userName || 'Ẩn danh'}</h4>
                        <StarRating rating={review.rating} className="text-yellow-400 text-sm" size="sm" />
                      </div>
                      <p className="text-gray-700 text-sm mb-2">{review.comment}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{new Date(review.createdAt).toLocaleDateString('vi-VN')}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Chưa có đánh giá nào cho sản phẩm này.</p>
                <p className="text-sm mt-2">Hãy là người đầu tiên đánh giá sản phẩm!</p>
              </div>
            )}
          </div>
        )}

        {/* Write Review Button */}
        <div className="border-t border-gray-200 pt-4">
          <Button
            onClick={onWriteReview}
            variant="outline"
            className="w-full cursor-pointer border-emerald-500 text-emerald-500 hover:bg-emerald-50"
          >
            Viết đánh giá
          </Button>
        </div>
      </div>
    </div>
  );
}

