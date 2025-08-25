"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/contexts/AuthContext";
import SWRProvider from "@/providers/SWRProvider";
import AdminHeaderWrapper from "../components/header/AdminHeaderWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <SWRProvider>
            {isAdminPage ? (
              <AdminHeaderWrapper />
            ) : (
              <div className="sticky top-0 z-50 bg-white shadow-sm">
                <Header />
              </div>
            )}

            {children}

            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />

            {!isAdminPage && <Footer />}
          </SWRProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
