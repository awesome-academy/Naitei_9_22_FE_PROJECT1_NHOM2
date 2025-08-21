"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FaPhone, FaShoppingBasket } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

export default function HeaderLogoSearchCart({ cartCount }: { cartCount: number }) {
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/search');
    }
  };

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
              <form onSubmit={handleSearch} className="relative flex-1 flex">
                <Input 
                  type="text" 
                  placeholder="Tìm kiếm sản phẩm..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="rounded-l-full pr-4 border-r-0 focus:border-r-0" 
                />
                <Button
                  type="button"
                  onClick={handleSearchClick}
                  className="rounded-r-full px-4 bg-emerald-500 hover:bg-emerald-600"
                >
                  <FiSearch className="h-4 w-4" />
                </Button>
              </form>
              <Link href="/cart" className="flex items-center gap-2 text-sm text-gray-700 whitespace-nowrap hover:text-emerald-500 transition-colors">
                <FaShoppingBasket className="text-lg" />
                <span>{cartCount} Sản phẩm</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Image src="/images.png" alt="Logo" width={40} height={40} className="h-10 w-10 object-contain" />
              <div>
                <h1 className="text-2xl text-emerald-500 font-light">
                  Green<span className="italic font-semibold">Shop</span>
                </h1>
              </div>
            </div>
            <Link href="/cart" className="flex items-center gap-2 text-sm text-gray-700 hover:text-emerald-500 transition-colors">
              <FaShoppingBasket className="text-lg" />
              <span>{cartCount}</span>
            </Link>
          </div>
          
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input 
              type="text" 
              placeholder="Tìm kiếm sản phẩm..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 rounded-full"
            />
            <Button
              type="button"
              onClick={handleSearchClick}
              size="sm"
              className="rounded-full px-4 bg-emerald-500 hover:bg-emerald-600"
            >
              <FiSearch className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
