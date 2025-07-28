import { FaSearch, FaStar } from "react-icons/fa";
import Image from "next/image";
import { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({
  product,
  className = "",
}: ProductCardProps) {
  const { name, price, oldPrice, image, isNew, discount } = product;
  const hasDiscount = discount > 0;
  const hasPriceChange = price !== oldPrice;

  return (
    <div
      className={`relative border rounded-lg shadow hover:shadow-xl overflow-hidden bg-white group transition-all duration-300 h-full flex flex-col ${className}`}
    >
      <div className="relative">
        <Image
          src={image}
          alt={name}
          width={400}
          height={300}
          className="w-full aspect-square sm:aspect-[4/3] xl:aspect-[16/9] object-cover group-hover:brightness-75 transition-all duration-300"
        />
        {hasDiscount && (
          <span className="absolute top-1 left-1 sm:top-2 sm:left-2 bg-red-600 text-white text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full z-10">
            -{discount}%
          </span>
        )}
        {isNew && (
          <span className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-green-600 text-white text-[10px] sm:text-xs px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full z-10">
            NEW
          </span>
        )}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1 sm:gap-2 transition duration-300">
          <button
            className="bg-green-500 text-white px-2 py-1 sm:px-3 sm:py-1 text-xs sm:text-sm rounded hover:bg-green-600 transition-colors"
            aria-label="Buy Now"
          >
            <span className="hidden sm:inline">MUA NGAY</span>
            <span className="sm:hidden">MUA</span>
          </button>
          <button
            className="bg-white border border-gray-300 p-1.5 sm:p-2 rounded hover:bg-gray-50 transition-colors"
            aria-label="View Details"
          >
            <FaSearch className="text-gray-600 text-xs sm:text-sm" />
          </button>
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
            {price.toLocaleString("vi-VN")} đ
            {hasPriceChange && (
              <span className="line-through text-gray-400 text-xs sm:text-sm ml-1 sm:ml-2 block sm:inline">
                {oldPrice.toLocaleString("vi-VN")} đ
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

