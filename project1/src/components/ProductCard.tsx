import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = "" }: ProductCardProps) {
  const { name, price, oldPrice, image, isNew, discount } = product;
  const hasDiscount = discount > 0;
  const hasPriceChange = price !== oldPrice;

  return (
    <div className={`relative border rounded-lg shadow hover:shadow-xl overflow-hidden bg-white group transition-all duration-300 h-full flex flex-col ${className}`}>
      <div className="relative">
        <Image
          src={image}
          alt={name}
          width={400}
          height={300}
          className="w-full aspect-[4/3] object-cover group-hover:brightness-75 transition-all duration-300"
        />
        {hasDiscount && (
          <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full z-10">
            -{discount}%
          </span>
        )}
        {isNew && (
          <span className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full z-10">
            NEW
          </span>
        )}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition duration-300">
          <button className="bg-green-500 text-white px-3 py-1 text-sm rounded hover:bg-green-600 transition-colors">
            MUA NGAY
          </button>
          <button className="bg-white border border-gray-300 p-2 rounded hover:bg-gray-50 transition-colors">
            <FaSearch className="text-gray-600 text-sm" />
          </button>
        </div>
      </div>

      <div className="p-4 text-center">
        <h3 className="text-lg font-medium mb-1">{name}</h3>
        <div className="text-yellow-500 text-sm mb-1">★★★★★</div>
        <div className="text-red-600 font-semibold">
          {price.toLocaleString("vi-VN")} đ
          {hasPriceChange && (
            <span className="line-through text-gray-400 text-sm ml-2">
              {oldPrice.toLocaleString("vi-VN")} đ
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

