"use client";
import Image from "next/image";
import Link from "next/link";
import { Input } from "../ui/input";
import { FaPhone, FaShoppingBasket } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

export default function HeaderLogoSearchCart({ cartCount }: { cartCount: number }) {
  return (
    <div className="py-3 lg:py-5 px-4 bg-white">
      <div className="max-w-screen-lg mx-auto">
        {/* Desktop */}
        <div className="hidden lg:flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Image src="/images.png" alt="Logo" width={56} height={56} className="h-14 w-14 object-contain" />
            <div>
              <h1 className="text-4xl text-emerald-500 font-light">
                Green<span className="italic font-semibold">Shop</span>
              </h1>
              <p className="text-xs text-gray-600 mt-1">Món quà từ thiên nhiên</p>
            </div>
          </div>

          <div className="flex flex-col items-center w-full max-w-md gap-2">
            <div className="text-xs text-gray-700 flex items-center gap-1 -translate-x-12.5">
              <FaPhone />
              <span>HỖ TRỢ: (04) 6674 2332 - (04) 3786 8904</span>
            </div>

            <div className="flex items-center gap-4 w-full">
              <div className="relative flex-1">
                <Input type="text" placeholder="Tìm kiếm..." className="rounded-full pr-10" />
                <FiSearch className="absolute right-3 top-2.5 text-gray-500" />
              </div>
              <Link href="/cart" className="flex items-center gap-2 text-sm text-gray-700 whitespace-nowrap hover:text-emerald-500 transition-colors">
                <FaShoppingBasket className="text-lg" />
                <span>{cartCount} Sản phẩm</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
