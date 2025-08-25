"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { ADMIN_ROLE } from "@/constants/role";
import Loading from "@/components/Loading";
import { AlertTriangle } from "lucide-react"; // shadcn sử dụng icon này

interface AdminRouteProps {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { isLoggedIn, currentUser, loading, refreshAuth } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    refreshAuth();
  }, []);

  useEffect(() => {
    // Chỉ kiểm tra quyền khi không còn loading và đã có thông tin user
    if (!loading && currentUser !== undefined) {
      if (isLoggedIn && currentUser?.role === ADMIN_ROLE) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
      setAuthChecked(true);
    }
  }, [isLoggedIn, currentUser, loading]);

  if (loading || !authChecked) {
    return <Loading />;
  }

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center flex flex-col items-center">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Bạn không có quyền truy cập trang này
          </h1>
          <p className="text-gray-600">Trang này chỉ dành cho quản trị viên</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
