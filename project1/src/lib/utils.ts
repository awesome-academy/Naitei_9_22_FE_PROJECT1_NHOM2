import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as React from "react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (value: number) =>
  `${value.toLocaleString("vi-VN")} đ`;

export const formatDate = (raw: string) => {
  const m = raw.match(/ngày (\d{1,2}), tháng (\d{1,2}), năm (\d{4})/);
  if (!m) return raw;
  const [, d, mo, y] = m;
  return `${d.padStart(2, "0")}/${mo.padStart(2, "0")}/${y}`;
};

export const parseTextWithBold = (text: string): (string | React.ReactNode)[] => {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      // Remove ** and make bold
      const boldText = part.slice(2, -2);
      return React.createElement(
        "strong",
        { key: index, className: "font-semibold" },
        boldText
      );
    }
    return part;
  });
};
