"use client";

import Image from "next/image";
import { useState } from "react";
import {
  FaPhone,
  FaUser,
  FaSignInAlt,
  FaShoppingBasket,
  FaBars,
  FaFacebook,
  FaTwitter,
  FaClock
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { Input } from "../components/ui/input";

export default function Header() {
  const [isDesktopMenuCollapsed, setIsDesktopMenuCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { text: "TRANG CHỦ", href: "#", hasDropdown: false },
    { text: "GIỚI THIỆU", href: "#", hasDropdown: false },
    { text: "SẢN PHẨM", href: "#", hasDropdown: true },
    { text: "SẢN PHẨM MỚI", href: "#", hasDropdown: true },
    { text: "TIN TỨC", href: "#", hasDropdown: false },
    { text: "LIÊN HỆ", href: "#", hasDropdown: false },
  ];

  const handleDesktopMenuToggle = () => {
    setIsDesktopMenuCollapsed(!isDesktopMenuCollapsed);
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="text-sm">
      {/* Top Bar - Hidden on mobile */}
      <div className="bg-black text-white px-4 py-1 text-xs hidden lg:block">
        <div className="max-w-screen-lg mx-auto flex justify-center items-center gap-x-48">
          {/* Bên trái: giờ mở cửa */}
          <div className="flex items-center space-x-2 -translate-x-55">
            <FaClock className="text-sm" />
            <span>Open time: 8:00 - 18:00</span>
            <span>|</span>
            <span>Monday - Sunday</span>
            <span>|</span>
            <a href="#" className="hover:text-gray-300">
              <FaFacebook />
            </a>
            <span>|</span>
            <a href="#" className="hover:text-gray-300">
              <FaTwitter />
            </a>
          </div>

          {/* Bên phải: đăng nhập / đăng ký */}
          <div className="flex items-center space-x-4 translate-x-55">
            <a href="#" className="hover:text-gray-300 flex items-center gap-1">
              <FaSignInAlt /> Đăng nhập
            </a>
            <a href="#" className="hover:text-gray-300 flex items-center gap-1">
              <FaUser /> Đăng ký
            </a>
          </div>
        </div>
      </div>

      {/* Logo + Search + Cart */}
      <div className="py-3 lg:py-5 px-4 bg-white">
        <div className="max-w-screen-lg mx-auto">
          {/* Mobile Layout */}
          <div className="lg:hidden">
            {/* Mobile Logo - Centered */}
            <div className="flex flex-col items-center text-center py-4">
              <h1 className="text-5xl text-emerald-500 font-light mb-2">
                Green<span className="italic font-semibold">Shop</span>
              </h1>
              <p className="text-emerald-400 text-base">
                Món quà từ thiên nhiên
              </p>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="hidden lg:flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-4">
              <Image
                src="/images.png"
                alt="Logo"
                width={56}
                height={56}
                className="h-14 w-14 object-contain"
              />
              <div>
                <h1 className="text-4xl text-emerald-500 font-light">
                  Green<span className="italic font-semibold">Shop</span>
                </h1>
                <p className="text-xs text-gray-600 mt-1">
                  Món quà từ thiên nhiên
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center w-full max-w-md gap-2">
              {/* Số điện thoại - nằm trên input, căn giữa */}
              <div className="text-xs text-gray-700 flex items-center gap-1 -translate-x-12.5">
                <FaPhone />
                <span>HỖ TRỢ: (04) 6674 2332 - (04) 3786 8904</span>
              </div>
              {/* Thanh tìm kiếm + giỏ hàng */}
              <div className="flex items-center gap-4 w-full">
                {/* Ô input */}
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Tìm kiếm..."
                    className="rounded-full pr-10"
                  />
                  <FiSearch className="absolute right-3 top-2.5 text-gray-500" />
                </div>

                {/* Giỏ hàng */}
                <div className="flex items-center gap-2 text-sm text-gray-700 whitespace-nowrap">
                  <FaShoppingBasket className="text-lg" />
                  <span>0 Sản phẩm</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-emerald-500 text-white text-sm font-medium">
        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <div className="flex justify-between items-center px-4 py-4">
            <button 
              onClick={handleMobileMenuToggle}
              className="hover:text-emerald-200 transition-colors"
            >
              <FaBars className="text-xl" />
            </button>
            <div className="flex items-center gap-4">
              <FiSearch className="text-xl" />
              <FaShoppingBasket className="text-xl" />
            </div>
          </div>
          
          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="bg-emerald-600 px-4 py-2">
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="block py-2 hover:text-emerald-200 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.text}
                      {item.hasDropdown && " ▾"}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:block relative overflow-hidden">
          <ul className="flex justify-center px-4 py-2 items-center space-x-8 relative">
            <li className="flex items-center gap-1 z-10">
              <button 
                onClick={handleDesktopMenuToggle}
                className="hover:text-emerald-200 transition-colors"
              >
                <FaBars className="text-base" />
              </button>
            </li>
            <div 
              className={`flex items-center space-x-8 transition-all duration-500 ease-in-out ${
                isDesktopMenuCollapsed 
                  ? 'transform -translate-x-full opacity-0' 
                  : 'transform translate-x-0 opacity-100'
              }`}
            >
              {menuItems.map((item, index) => (
                <li key={index} className="flex items-center gap-1">
                  <a
                    href={item.href}
                    className="flex items-center gap-1 hover:text-emerald-200 transition-colors whitespace-nowrap"
                  >
                    {item.text}
                    {item.hasDropdown && " ▾"}
                  </a>
                </li>
              ))}
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
}