"use client";

import React, { ErrorInfo } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{
    error: Error;
    resetErrorBoundary: () => void;
  }>;
}

const DefaultErrorFallback: React.FC<{
  error: Error;
  resetErrorBoundary: () => void;
}> = ({ error, resetErrorBoundary }) => (
  <div className="container py-10 text-center">
    <h2 className="text-xl font-semibold text-red-600 mb-4">Có lỗi xảy ra</h2>
    <p className="text-gray-600 mb-4">
      {error?.message || "Đã xảy ra lỗi không mong muốn"}
    </p>
    <div className="flex gap-3 justify-center">
      <Button
        onClick={() => window.location.reload()}
        className="bg-green-600 hover:bg-green-700"
      >
        Tải lại trang
      </Button>
      <Button onClick={resetErrorBoundary} variant="outline">
        Thử lại
      </Button>
    </div>
  </div>
);

export default function ErrorBoundary({
  children,
  fallback: FallbackComponent = DefaultErrorFallback,
}: ErrorBoundaryProps) {
  const handleError = (error: Error, errorInfo: ErrorInfo) => {
    console.error("Blog component error:", error, errorInfo);
  };

  return (
    <ReactErrorBoundary
      FallbackComponent={FallbackComponent}
      onError={handleError}
    >
      {children}
    </ReactErrorBoundary>
  );
}
