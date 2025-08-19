"use client";
import Link from "next/link";
import { FaClock, FaFacebook, FaTwitter, FaUser, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { User } from "@/types/User";

export default function HeaderTopBar({ 
  isLoggedIn, 
  currentUser, 
  handleLogout 
}: { 
  isLoggedIn: boolean; 
  currentUser: User | null; 
  handleLogout: () => void;
}) {
  return (
    <div className="bg-black text-white px-4 py-1 text-xs hidden lg:block">
      <div className="max-w-screen-lg mx-auto flex justify-center items-center gap-x-48">
        <div className="flex items-center space-x-2 -translate-x-55">
          <FaClock className="text-sm" />
          <span>Open time: 8:00 - 18:00</span>
          <span>|</span>
          <span>Monday - Sunday</span>
          <span>|</span>
          <Link href="#" className="hover:text-gray-300"><FaFacebook /></Link>
          <span>|</span>
          <Link href="#" className="hover:text-gray-300"><FaTwitter /></Link>
        </div>

        <div className="flex items-center space-x-4 translate-x-55">
          {isLoggedIn ? (
            <>
              <Link href="/profile" className="hover:text-gray-300 flex items-center gap-1">
                <FaUser /> {currentUser?.fullName || "Tài khoản"}
              </Link>
              <button onClick={handleLogout} className="hover:text-gray-300 flex items-center gap-1">
                <FaSignOutAlt /> Đăng xuất
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-gray-300 flex items-center gap-1">
                <FaSignInAlt /> Đăng nhập
              </Link>
              <Link href="/register" className="hover:text-gray-300 flex items-center gap-1">
                <FaUser /> Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
