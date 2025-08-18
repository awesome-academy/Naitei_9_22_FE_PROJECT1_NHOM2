"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product, getCurrentPrice } from "@/types/Product";
import { Button } from "@/components/ui/button";
import StarRating from "@/components/star-rating";
import { ImageSkeleton } from "@/components/ui/skeletons";
import { useCartStore } from "@/store/zustand/Zustand"; // dùng zustand thay redux
import { toast } from "react-toastify";
import { useProductActions } from "@/hooks/useProductActions";
import { Search } from "lucide-react";
import { Heart } from "lucide-react";
import QuantityModal from "@/components/QuantityModal";

interface ProductListCardProps {
  product: Product;
}

export default function ProductListCard({ product }: ProductListCardProps) {
  const [imageError, setImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showQuantityModal, setShowQuantityModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { addToCart } = useCartStore(); // lấy action từ zustand

  const handleImageError = () => {
    setImageError(true);
  };

  const baseButtonClasses =
    "px-8 py-5 cursor-pointer focus:ring-emerald-500 focus:ring-offset-emerald-500 rounded-3xl focus:outline-none focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 w-auto";
  const primaryButtonClasses = `${baseButtonClasses} bg-emerald-500 text-white hover:bg-white hover:text-emerald-500 border-emerald-500 border-1`;
  const secondaryButtonClasses = `${baseButtonClasses} bg-white text-black hover:bg-gray-200 border-gray-300 border-1`;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLoading(true);

    try {
      const cartItem = {
        product_id: product.id,
        name: product.name,
        price: getCurrentPrice(product),
        images: product.images,
        discount: product.discount,
        quantity: 1,
      };
      addToCart(cartItem); // dùng zustand
      toast.success("Đã thêm vào giỏ hàng");
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  const handleProductClick = () => {
    router.push(`/products/${product.id}`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " đ";
  };

  const { search, addWishlist } = useProductActions();

  const handleSearch = (e: React.MouseEvent) => {
    search(product, e);
  };

  const handleAddToWishlist = async (e: React.MouseEvent) => {
    await addWishlist(product.id, e);
  };

  const hasValidImage = product.images && product.images.length > 0;
  const imageUrl = hasValidImage ? product.images[0] : null;

  const handleBuyNowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowQuantityModal(true);
  };

  const closeQuantityModal = () => {
    setShowQuantityModal(false);
    setQuantity(1);
  };

  const handleAddToCartWithQuantity = async () => {
    setIsLoading(true);

    try {
      const cartItem = {
        product_id: product.id,
        name: product.name,
        price: getCurrentPrice(product),
        images: product.images,
        discount: product.discount,
        quantity: quantity,
      };
      addToCart(cartItem); // dùng zustand
      toast.success("Đã thêm vào giỏ hàng");
      closeQuantityModal();
    } catch (error) {
      toast.error("Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  // Action buttons config
  const actionButtons = [
    {
      id: "buy",
      label: "MUA NGAY",
      onClick: handleBuyNowClick,
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

  return (
    <>
      <div
        className="bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
        onClick={handleProductClick}
      >
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="w-54 h-58 flex-shrink-0">
            <div className="relative w-full h-full bg-gray-100 overflow-hidden">
              {imageUrl && !imageError ? (
                <Image
                  src={imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                  onError={handleImageError}
                  priority
                />
              ) : (
                <ImageSkeleton className="w-full h-full" />
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 space-y-2 p-4">
            <div>
              <h1 className="text-xl text-gray-900">{product.name}</h1>
              <div className="flex items-center space-x-2">
                <StarRating rating={product.rating} className="text-lg" />
              </div>
            </div>

            <div className="text-gray-700 leading-relaxed border-gray-200">
              <p className="text-sm line-clamp-2">{product.description}</p>
            </div>
            {/* Price */}
            <div className="space-y-2">
              <div className="flex items-center space-x-4">
                <span className="text-xl font-semibold text-red-600">
                  {formatPrice(getCurrentPrice(product))}
                </span>
                {product.oldPrice && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(product.oldPrice)}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
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
          </div>
        </div>
      </div>

      <QuantityModal
        isOpen={showQuantityModal}
        onClose={closeQuantityModal}
        product={product}
        quantity={quantity}
        onQuantityChange={setQuantity}
        onAddToCart={handleAddToCartWithQuantity}
      />
    </>
  );
}

