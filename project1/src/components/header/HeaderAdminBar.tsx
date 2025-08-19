"use client";
import Link from "next/link";
import { FaSignOutAlt, FaSignInAlt } from "react-icons/fa";

export default function HeaderAdminBar({ isLoggedIn, handleLogout }: { 
  isLoggedIn: boolean; 
  handleLogout: () => void;
}) {
  return (
    <div className="bg-black text-white px-4 py-1 text-xs">
      <div className="max-w-screen-lg mx-auto flex justify-end items-center space-x-4">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="hover:text-gray-300 flex items-center gap-1"
          >
            <FaSignOutAlt /> Đăng xuất
          </button>
        ) : (
          <Link href="/login" className="hover:text-gray-300 flex items-center gap-1">
            <FaSignInAlt /> Đăng nhập
          </Link>
        )}
      </div>
    </div>
  );
}
