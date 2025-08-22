"use client";

import { useAuth } from "@/contexts/AuthContext";
import { logout } from "@/services/auth";
import { ADMIN_ROLE } from "@/constants/role";
import HeaderAdminBar from "./HeaderAdminBar";

export default function AdminHeaderWrapper() {
  const { isLoggedIn, currentUser, loading, refreshAuth } = useAuth();

  const handleLogout = () => {
    logout();
    refreshAuth(); // Refresh auth state sau khi logout
  };

  // Hiển thị loading state
  if (loading) {
    return (
      <div className="sticky top-0 z-50 bg-black">
        <div className="bg-black text-white px-4 py-1 text-xs">
          <div className="max-w-screen-lg mx-auto flex justify-end items-center">
            <span>Đang tải...</span>
          </div>
        </div>
      </div>
    );
  }

  // Kiểm tra xem user có phải admin không
  const isAdmin = currentUser?.role === ADMIN_ROLE;

  return (
    <div className="sticky top-0 z-50 bg-black">
      <HeaderAdminBar
        isLoggedIn={isLoggedIn && isAdmin}
        handleLogout={handleLogout}
      />
    </div>
  );
}
