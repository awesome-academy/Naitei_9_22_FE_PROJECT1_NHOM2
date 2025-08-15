"use client";

import React from "react";
import { useProductDetail } from "@/hooks/useProductDetail";
import { getRelatedProducts } from "@/services/ProductService";
import { addToCart } from "@/redux/cart/cartSlice";
import { useState, useEffect, use } from "react";
import { toast } from "react-toastify";
import Image from "next/image";
import { Product, getCurrentPrice } from "@/types/Product";
import { Button } from "@/components/ui/button";
import { ImageSkeleton } from "@/components/ui/skeletons";
import { Heart, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { FaFacebookF, FaTwitter, FaGooglePlusG, FaPlus } from "react-icons/fa";
import ReviewModal from "@/components/ReviewModal";
import { isAuthenticated } from "@/services/auth";
import StarRating from "@/components/star-rating";
import ProductDetailTabs from "@/components/ProductDetailTabs";
import ProductDetailSkeleton from "@/components/ProductDetailSkeleton";
import { useDispatch } from "react-redux";
import { CartItem } from "@/types/Cart";
import { useProductActions } from "@/hooks/useProductActions";

export default function ProductDetail({params}: {params: Promise<{id: number}>}){
    const resolvedParams = use(params);
    const { product, loading, error } = useProductDetail(resolvedParams.id);
    const [quantity, setQuantity] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [imageErrors, setImageErrors] = useState<{[key: string]: boolean}>({});
    const [relatedImageErrors, setRelatedImageErrors] = useState<{[key: string]: boolean}>({});
    const router = useRouter();
    const dispatch = useDispatch();
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [relatedProductsStartIndex, setRelatedProductsStartIndex] = useState(0);

  // Shared button styles
  const baseButtonClasses =
    "px-8 py-5 cursor-pointer focus:ring-emerald-500 focus:ring-offset-emerald-500 rounded-3xl focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 w-auto";
  const primaryButtonClasses = `${baseButtonClasses} bg-emerald-500 text-white hover:bg-white hover:text-emerald-500 border-emerald-500 border-1`;
  const secondaryButtonClasses = `${baseButtonClasses} bg-white text-black hover:bg-gray-200 border-gray-300 border-1`;

  useEffect(() => {
    if (product) {
      setRelatedProductsStartIndex(0);
      // Load related products
      getRelatedProducts(product.category, product.id).then(setRelatedProducts);
    }
  }, [product, resolvedParams.id]);

    const handleAddToCart = async () => {
        if(!product) return;
        
        const cartItem = {
            product_id: product.id,
            name: product.name,
            price: getCurrentPrice(product),
            images: product.images,
            discount: product.discount,
            quantity,
        }
        
        try{
            dispatch(addToCart(cartItem));
            toast.success("Đã thêm vào giỏ hàng");
        } catch (error: any) {
            toast.error("Có lỗi xảy ra");
        }
    }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " đ";
  };

  const handleImageError = (imageUrl: string) => {
    setImageErrors((prev) => ({ ...prev, [imageUrl]: true }));
  };

  const handleRelatedImageError = (imageUrl: string) => {
    setRelatedImageErrors((prev) => ({ ...prev, [imageUrl]: true }));
  };

  const { search, addWishlist } = useProductActions();

  const handleSearch = () => {
    if (!product) return;
    search(product);
  };

  const handleAddToWishlist = async () => {
    if (!product) return;
    await addWishlist(product.id);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Đã sao chép đường dẫn sản phẩm");
  };

  const handleWriteReview = () => {
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
  };

  const handleReviewSubmitted = () => {
    // Call refresh function if it exists
    if ((window as any).refreshProductReviews) {
      (window as any).refreshProductReviews();
    }
  };

  // Check authentication
  useEffect(() => {
    const checkAuth = () => {
      setIsLoggedIn(isAuthenticated());
    };

    checkAuth();
  }, []);

  const handlePrevRelatedProducts = () => {
    setRelatedProductsStartIndex(Math.max(0, relatedProductsStartIndex - 4));
  };

  const handleNextRelatedProducts = () => {
    if (relatedProducts.length > relatedProductsStartIndex + 4) {
      setRelatedProductsStartIndex(relatedProductsStartIndex + 4);
    }
  };

  // Action buttons config
  const actionButtons = [
    {
      id: "buy",
      label: "MUA NGAY",
      onClick: handleAddToCart,
      className: primaryButtonClasses,
      icon: null,
    },
    {
      id: "search",
      label: null,
      onClick: handleSearch,
      className: secondaryButtonClasses,
      icon: <Search />,
    },
    {
      id: "wishlist",
      label: null,
      onClick: handleAddToWishlist,
      className: secondaryButtonClasses,
      icon: <Heart className="text-black" fill="currentColor" />,
    },
  ];

  // Social share buttons config
  const socialButtons = [
    {
      id: "facebook",
      label: "Like",
      icon: <FaFacebookF />,
      onClick: () => window.open(`https://www.facebook.com`, "_blank"),
      className:
        "flex items-center px-1 py-1 bg-[#3b5998] text-white text-xs rounded",
    },
    {
      id: "twitter",
      label: "Tweet",
      icon: <FaTwitter />,
      onClick: () => window.open(`https://www.twitter.com`, "_blank"),
      className:
        "flex items-center px-1 py-1 bg-[#1da1f2] text-white text-xs rounded",
    },
    {
      id: "google",
      label: null,
      icon: <FaGooglePlusG />,
      onClick: () => window.open(`https://www.google.com`, "_blank"),
      className:
        "flex items-center px-1 py-1 bg-[#bd081c] text-white text-xs rounded",
    },
    {
      id: "share",
      label: "Share",
      icon: <FaPlus className="text-xs" />,
      onClick: handleShare,
      className:
        "flex items-center bg-[#ff6633] text-white text-sm font-medium px-3 py-1.5 rounded",
    },
  ];

  // Show error state
  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-500">Lỗi: Không tìm thấy sản phẩm</div>
      </div>
    );

  // Show skeleton while loading
  if (loading || !product) {
    return <ProductDetailSkeleton />;
  }

  // Check if we have valid images
  const hasValidImages =
    product.images &&
    Array.isArray(product.images) &&
    product.images.length > 0;
  const currentImage = hasValidImages
    ? product.images[selectedImageIndex] || product.images[0]
    : null;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="w-full lg:w-96 space-y-4">
            <div className="relative w-96 h-96 bg-gray-100 overflow-hidden">
              {currentImage && !imageErrors[currentImage] ? (
                <Image
                  src={currentImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                  onError={() => handleImageError(currentImage)}
                  priority
                />
              ) : (
                <ImageSkeleton className="w-full h-full" />
              )}
            </div>

            {/* Thumbnail Images */}
            {hasValidImages && product.images.length > 1 && (
              <div className="flex justify-start gap-2 w-96">
                {product.images
                  .slice(0, 5)
                  .map((image: string, index: number) => (
                    <div
                      key={index}
                      className={`relative w-[72px] h-[72px] cursor-pointer overflow-hidden border-2 ${
                        selectedImageIndex === index
                          ? "border-green-500"
                          : "border-gray-300"
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      {!imageErrors[image] ? (
                        <Image
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          fill
                          className="object-cover"
                          onError={() => handleImageError(image)}
                        />
                      ) : (
                        <ImageSkeleton className="w-full h-full" />
                      )}
                    </div>
                  ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-2xl text-gray-900 mb-2">{product.name}</h1>
              <div className="flex items-center space-x-2 mb-2">
                <StarRating rating={product.rating} className="text-lg" />
              </div>
            </div>

            {/* Price */}
            <div className="space-y-2 border-b border-gray-200 pb-4">
              <div className="flex items-center space-x-4">
                <span className="text-2xl font-semibold text-red-600">
                  {formatPrice(getCurrentPrice(product))}
                </span>
                {product.discount > 0 && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>
            </div>

            <div className="text-gray-700 leading-relaxed border-b border-gray-200 py-4">
              <p className="text-sm">{product.description}</p>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-8 border-b border-gray-200 py-4">
                <span className="font-medium text-gray-900">Số lượng</span>
                <div className="flex items-center space-x-2 ">
                  <Button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-white border-gray-300  border-1 text-black px-4.5 py-5 hover:bg-emerald-500 hover:text-white rounded-none"
                  >
                    -
                  </Button>
                  <span className="px-8 py-2 border-1 border-gray-300">
                    {quantity}
                  </span>
                  <Button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-white border-gray-300  border-1 text-black px-4 py-5 hover:bg-emerald-500 hover:text-white rounded-none"
                  >
                    +
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {actionButtons.map((button) => (
                  <Button
                    key={button.id}
                    variant="default"
                    size="default"
                    onClick={button.onClick}
                    className={button.className}
                  >
                    {button.icon}
                    {button.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Social Share */}
            <div className="flex items-center space-x-3 pt-2">
              <div className="flex space-x-2">
                {socialButtons.map((button) => (
                  <Button
                    key={button.id}
                    onClick={button.onClick}
                    variant="default"
                    size="sm"
                    className={button.className}
                  >
                    {button.icon}
                    {button.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <ProductDetailTabs
          product={product}
          onWriteReview={handleWriteReview}
        />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="bg-white mt-8">
            <div className="p-4 border-b border-gray-200 relative">
              <h2 className="text-xl font-semibold text-emerald-600">
                Sản phẩm cùng loại
              </h2>
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex space-x-2">
                {relatedProductsStartIndex > 0 && (
                  <Button
                    onClick={handlePrevRelatedProducts}
                    variant="outline"
                    size="sm"
                    className="p-2 w-8 h-8 rounded-full border-gray-300"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                )}
                {relatedProducts.length > relatedProductsStartIndex + 4 && (
                  <Button
                    onClick={handleNextRelatedProducts}
                    variant="outline"
                    size="sm"
                    className="p-2 w-8 h-8 rounded-full border-gray-300"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {relatedProducts
                  .slice(
                    relatedProductsStartIndex,
                    relatedProductsStartIndex + 4
                  )
                  .map((relatedProduct) => {
                    const hasRelatedImages =
                      relatedProduct.images && relatedProduct.images.length > 0;
                    const relatedImageUrl = hasRelatedImages
                      ? relatedProduct.images[0]
                      : null;

                    return (
                      <div
                        key={relatedProduct.id}
                        onClick={() =>
                          router.push(`/products/${relatedProduct.id}`)
                        }
                        className="text-center border-1 border-gray-200 cursor-pointer"
                      >
                        <div className="relative w-full aspect-square mb-3 bg-gray-100 overflow-hidden">
                          {relatedImageUrl &&
                          !relatedImageErrors[relatedImageUrl] ? (
                            <Image
                              src={relatedImageUrl}
                              alt={relatedProduct.name}
                              fill
                              className="object-cover"
                              onError={() =>
                                handleRelatedImageError(relatedImageUrl)
                              }
                            />
                          ) : (
                            <ImageSkeleton className="w-full h-full" />
                          )}
                        </div>
                        <h3 className="font-medium text-gray-900 mb-2 text-sm">
                          {relatedProduct.name}
                        </h3>
                        <div className="flex justify-center mb-2">
                          <StarRating
                            rating={relatedProduct.rating}
                            className="text-yellow-400 text-sm"
                            size="sm"
                          />
                        </div>
                        <div className="space-x-2 mb-2">
                          <span className="text-red-600 font-bold">
                            {formatPrice(getCurrentPrice(relatedProduct))}
                          </span>
                          {relatedProduct.oldPrice && (
                            <span className="text-gray-500 text-sm line-through">
                              {formatPrice(relatedProduct.oldPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={handleCloseReviewModal}
        productId={product.id}
        productName={product.name}
        onReviewSubmitted={handleReviewSubmitted}
        isLoggedIn={isLoggedIn}
      />
    </div>
  );
}
