"use client";
import { useEffect, useState } from "react";
import { useCartStore } from "@/store/zustand/Zustand";
import { isAuthenticated, logout, getCurrentUser } from "@/services/auth";
import { User } from "@/types/User";
import HeaderAdminBar from "../components/header/HeaderAdminBar";
import HeaderTopBar from "../components/header/HeaderUserBar";
import HeaderLogoSearchCart from "../components/header/HeaderSearchCart";
import HeaderNav from "../components/header/HeaderNav";
import { ADMIN_ROLE } from "@/constants/role"; 

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [role, setRole] = useState<string>("");
  const { cartCount } = useCartStore();

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = isAuthenticated();
      setIsLoggedIn(authenticated);
      if (authenticated) {
        const user = await getCurrentUser();
        setCurrentUser(user);
        setRole(user?.role || "");
      }
    };

    checkAuth();
    window.addEventListener("focus", checkAuth);
    return () => window.removeEventListener("focus", checkAuth);
  }, []);

  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <header className="text-sm">
      {role === ADMIN_ROLE ? (
        <HeaderAdminBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      ) : (
        <>
          <HeaderTopBar isLoggedIn={isLoggedIn} currentUser={currentUser} handleLogout={handleLogout} />
          <HeaderLogoSearchCart cartCount={cartCount} />
          <HeaderNav isLoggedIn={isLoggedIn} currentUser={currentUser} handleLogout={handleLogout} cartCount={cartCount} />
        </>
      )}
    </header>
  );
}

