"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import {
  FaPhone,
  FaUser,
  FaSignInAlt,
  FaSignOutAlt,
  FaShoppingBasket,
  FaBars,
  FaFacebook,
  FaTwitter,
  FaClock,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { Input } from "../components/ui/input";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux"; // Import useSelector
import { RootState } from "@/redux/store"; // Import RootState
import { isAuthenticated, logout, getCurrentUser } from "@/services/auth";

export default function Header() {
  const [isDesktopMenuCollapsed, setIsDesktopMenuCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const pathname = usePathname();

  const cartCount = useSelector((state: RootState) => state.cart.cartCount); // Lấy cartCount từ Redux store

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = () => {
      const authenticated = isAuthenticated();
      setIsLoggedIn(authenticated);
      if (authenticated) {
        setCurrentUser(getCurrentUser());
      }
    };

    checkAuth();
    // Check auth status when window gains focus (e.g., after login/logout)
    window.addEventListener('focus', checkAuth);
    return () => window.removeEventListener('focus', checkAuth);
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const menuItems = [
    { text: "TRANG CHỦ", href: "/", hasDropdown: false },
    { text: "GIỚI THIỆU", href: "/information", hasDropdown: false },
    { text: "SẢN PHẨM", href: "/products", hasDropdown: false },
    { text: "TIN TỨC", href: "/blog", hasDropdown: false },
    { text: "LIÊN HỆ", href: "/contact", hasDropdown: false },
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
            <Link href="#" className="hover:text-gray-300">
              <FaFacebook />
            </Link>
            <span>|</span>
            <Link href="#" className="hover:text-gray-300">
              <FaTwitter />
            </Link>
          </div>

          {/* Bên phải: đăng nhập / đăng xuất / trang cá nhân */}
          <div className="flex items-center space-x-4 translate-x-55">
            {isLoggedIn ? (
              <>
                <Link
                  href="/profile"
                  className="hover:text-gray-300 flex items-center gap-1"
                >
                  <FaUser /> {currentUser?.name || 'Tài khoản'}
                </Link>
                <button
                  onClick={handleLogout}
                  className="hover:text-gray-300 flex items-center gap-1"
                >
                  <FaSignOutAlt /> Đăng xuất
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="hover:text-gray-300 flex items-center gap-1"
                >
                  <FaSignInAlt /> Đăng nhập
                </Link>
                <Link
                  href="/register"
                  className="hover:text-gray-300 flex items-center gap-1"
                >
                  <FaUser /> Đăng ký
                </Link>
              </>
            )}
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
                <Link
                  href="/cart"
                  className="flex items-center gap-2 text-sm text-gray-700 whitespace-nowrap hover:text-emerald-500 transition-colors"
                >
                  <FaShoppingBasket className="text-lg" />
                  <span>{cartCount} Sản phẩm</span>{" "}
                  {/* Hiển thị số lượng sản phẩm */}
                </Link>
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
              <Link href="/cart" className="relative">
                <FaShoppingBasket className="text-xl" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              {isLoggedIn && (
                <Link href="/profile" className="hover:text-emerald-200 transition-colors">
                  <FaUser className="text-xl" />
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="bg-emerald-600 px-4 py-2">
              <ul className="space-y-2">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className={`block py-2 hover:text-emerald-200 transition-colors ${
                        pathname === item.href ? "bg-emerald-700 rounded" : ""
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.text}
                      {item.hasDropdown && " ▾"}
                    </Link>
                  </li>
                ))}
                
                {/* Auth section in mobile menu */}
                <li className="border-t border-emerald-500 pt-2 mt-2">
                  {isLoggedIn ? (
                    <>
                      <Link
                        href="/profile"
                        className="block py-2 hover:text-emerald-200 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <FaUser className="inline mr-2" />
                        {currentUser?.name || 'Tài khoản'}
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="block w-full text-left py-2 hover:text-emerald-200 transition-colors"
                      >
                        <FaSignOutAlt className="inline mr-2" />
                        Đăng xuất
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="block py-2 hover:text-emerald-200 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <FaSignInAlt className="inline mr-2" />
                        Đăng nhập
                      </Link>
                      <Link
                        href="/register"
                        className="block py-2 hover:text-emerald-200 transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <FaUser className="inline mr-2" />
                        Đăng ký
                      </Link>
                    </>
                  )}
                </li>
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
                  ? "transform -translate-x-full opacity-0"
                  : "transform translate-x-0 opacity-100"
              }`}
            >
              {menuItems.map((item, index) => (
                <li key={index} className="flex items-center gap-1">
                  <Link
                    href={item.href}
                    className={`flex items-center gap-1 hover:text-emerald-200 transition-colors whitespace-nowrap ${
                      pathname === item.href
                        ? "bg-emerald-700 rounded px-2 py-1"
                        : ""
                    }`}
                  >
                    {item.text}
                    {item.hasDropdown && " ▾"}
                  </Link>
                </li>
              ))}
            </div>
          </ul>
        </div>
      </nav>
    </header>
  );
}

