import React from "react";

interface LoadingProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

const Loading: React.FC<LoadingProps> = ({
  message = "Đang tải...",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 gap-4">
      <div
        className={`${sizeClasses[size]} border-4 border-green-200 border-t-green-600 rounded-full animate-spin`}
      />
      <p className="text-gray-600">{message}</p>
    </div>
  );
};

export default Loading;
