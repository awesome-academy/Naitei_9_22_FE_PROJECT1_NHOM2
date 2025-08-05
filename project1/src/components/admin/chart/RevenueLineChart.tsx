"use client";

import React from "react";
import {
  CartesianGrid,
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
} from "recharts";

// Tạo dữ liệu cho biểu đồ doanh thu theo tháng (giả lập)
const monthlyRevenue = [
  { month: "T1", revenue: 15000000, orders: 45 },
  { month: "T2", revenue: 18000000, orders: 52 },
  { month: "T3", revenue: 22000000, orders: 68 },
  { month: "T4", revenue: 19000000, orders: 55 },
  { month: "T5", revenue: 25000000, orders: 78 },
  { month: "T6", revenue: 28000000, orders: 85 },
  { month: "T7", revenue: 32000000, orders: 92 },
  { month: "T8", revenue: 35000000, orders: 98 },
  { month: "T9", revenue: 38000000, orders: 105 },
  { month: "T10", revenue: 42000000, orders: 115 },
  { month: "T11", revenue: 45000000, orders: 125 },
  { month: "T12", revenue: 50000000, orders: 135 },
];

export default function RevenueLineChart() {
  // Hàm format số trên trục Y dạng 1.000.000 VNĐ
  const formatYAxis = (value: number) => {
    return `${value.toLocaleString("vi-VN")}`;
  };

  return (
    <div>
      {/* Doanh thu theo tháng */}
      <div className="bg-white p-4 ">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Doanh thu theo tháng
        </h3>
        <ResponsiveContainer width={"100%"} height={220}>
          <AreaChart data={monthlyRevenue}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis tickFormatter={formatYAxis} width={110} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
