import { FaSearch, FaStar } from "react-icons/fa";
import Image from "next/image";
import { Product, formatCurrentPrice, formatOldPrice, getCurrentPrice } from "../types/Product";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { addToCart } from "@/redux/cart/cartSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({
  product,
  className = "",
}: ProductCardProps) {
  const { name, images, newArival, discount} = product;
  const hasDiscount = discount > 0;
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const cartItem = {
      ...product,
      price: getCurrentPrice(product),
      quantity: 1,
    };
    dispatch(addToCart(cartItem));
    toast.success("Sản phẩm đã được thêm vào giỏ hàng!");
  };

  return (
    <div
      className={`relative border rounded-lg shadow hover:shadow-xl overflow-hidden bg-white group transition-all duration-300 h-full flex flex-col ${className}`}
    >
      <div className="relative">
        <Image
          src={images[0]}
          alt={name}
          width={400}
          height={300}
          className="w-full aspect-square sm:aspect-[4/3] xl:aspect-[16/9] object-cover group-hover:brightness-75 transition-all duration-300"
        />
        {hasDiscount && (
          <Badge
            variant="destructive"
            className="absolute top-1 left-1 sm:top-2 sm:left-2 text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 z-10"
          >
            -{discount}%
          </Badge>
        )}
        {newArival && (
          <Badge
            className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-green-600 text-white text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 z-10 hover:bg-green-600"
          >
            NEW
          </Badge>
        )}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1 sm:gap-2 transition duration-300">
          <Button
            size="sm"
            className="bg-green-500 text-white px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm hover:bg-green-600"
            aria-label="Buy Now"
            onClick={handleAddToCart}
          >
            <span className="hidden sm:inline">MUA NGAY</span>
            <span className="sm:hidden">MUA</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-white border border-gray-300 p-1.5 sm:p-2 hover:bg-gray-50"
            aria-label="View Details"
          >
            <FaSearch className="text-gray-600 text-xs sm:text-sm" />
          </Button>
        </div>
      </div>

      <div className="p-2 sm:p-3 lg:p-4 text-center flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-sm sm:text-base lg:text-lg font-medium mb-1 line-clamp-2">
            {name}
          </h3>
          <div className="flex justify-center gap-0.5 mb-1">
            {Array.from({ length: 5 }, (_, index) => (
              <FaStar
                key={index}
                className="text-yellow-500 text-xs sm:text-sm"
              />
            ))}
          </div>
          <div className="text-red-600 font-semibold text-sm sm:text-base lg:text-lg">
            {formatCurrentPrice(product)} đ
            {hasDiscount && (
              <span className="line-through text-gray-400 text-xs sm:text-sm ml-1 sm:ml-2 block sm:inline">
                {formatOldPrice(product)} đ
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

