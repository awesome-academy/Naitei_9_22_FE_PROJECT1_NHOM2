"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaShoppingBasket, FaUser, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { User } from "@/types/User";
import { Button } from "../ui/button";

interface HeaderNavProps {
  isLoggedIn: boolean;
  currentUser: User | null;
  handleLogout: () => void;
  cartCount: number;
}

export default function HeaderNav({
  isLoggedIn,
  currentUser,
  handleLogout,
  cartCount,
}: HeaderNavProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuCollapsed, setIsDesktopMenuCollapsed] = useState(false);

  const menuItems = [
    { text: "TRANG CHỦ", href: "/", hasDropdown: false },
    { text: "GIỚI THIỆU", href: "/information", hasDropdown: false },
    { text: "SẢN PHẨM", href: "/products", hasDropdown: false },
    { text: "TIN TỨC", href: "/blog", hasDropdown: false },
    { text: "LIÊN HỆ", href: "/contact", hasDropdown: false },
  ];

  return (
    <nav className="bg-emerald-500 text-white text-sm font-medium">
      {/* Mobile */}
      <div className="lg:hidden">
        <div className="flex justify-between items-center px-4 py-4">
          <Button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="hover:text-emerald-200 transition-colors"
            
          >
            <FaBars className="text-xl" />
          </Button>
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
              <Link
                href="/profile"
                className="hover:text-emerald-200 transition-colors"
              >
                <FaUser className="text-xl" />
              </Link>
            )}
          </div>
        </div>

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
              <li className="border-t border-emerald-500 pt-2 mt-2">
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/profile"
                      className="block py-2 hover:text-emerald-200 transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <FaUser className="inline mr-2" />
                      {currentUser?.fullName || "Tài khoản"}
                    </Link>
                    <Button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left py-2 hover:text-emerald-200 transition-colors"
                    >
                      <FaSignOutAlt className="inline mr-2" />
                      Đăng xuất
                    </Button>
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

      {/* Desktop */}
      <div className="hidden lg:block relative overflow-hidden">
        <ul className="flex justify-center px-4 py-2 items-center space-x-8 relative">
          <li className="flex items-center gap-1 z-10">
            <Button
              onClick={() => setIsDesktopMenuCollapsed(!isDesktopMenuCollapsed)}
              className="hover:text-emerald-200 transition-colors"
            >
              <FaBars className="text-base" />
            </Button>
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
  );
}
