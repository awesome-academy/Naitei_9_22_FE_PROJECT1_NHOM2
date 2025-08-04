"use client";

import React from "react";
import StatisticCard from "./StatisticCard";
import dbData from "../../../db.json";
import { MoneyIcon, OrderIcon, AverageIcon, ProductIcon } from "@/assets/icons";
import RevenueLineChart from "./chart/RevenueLineChart";
import CategoryPieChart from "./chart/CategoryPieChart";
import OrderLineChart from "./chart/OrderLineChart";

interface OrderItem {
  id: string;
  quantity: number;
  variant: {
    price: number;
  };
}

const processOrderData = () => {
  const orderItems = dbData.products.slice(0, 10).map((product) => ({
    id: product.id,
    quantity: Math.floor(Math.random() * 5) + 1,
    variant: {
      price: product.oldPrice * (1 - product.discount / 100),
    },
  }));
  const products = dbData.products;

  // Tạo dữ liệu cho biểu đồ doanh thu theo sản phẩm

  interface ProductSale {
    name: string;
    revenue: number;
    quantity: number;
    price: number;
  }

  const productSales: ProductSale[] = orderItems.reduce<ProductSale[]>(
    (acc: ProductSale[], item: OrderItem) => {
      const product = products.find((p: { id: string }) => p.id === item.id);
      if (product) {
        const totalRevenue = item.variant.price * item.quantity;
        const existingProduct = acc.find(
          (p: ProductSale) => p.name === product.name
        );

        if (existingProduct) {
          existingProduct.revenue += totalRevenue;
          existingProduct.quantity += item.quantity;
        } else {
          acc.push({
            name: product.name,
            revenue: totalRevenue,
            quantity: item.quantity,
            price: item.variant.price,
          });
        }
      }
      return acc;
    },
    []
  );

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

  // Tạo dữ liệu cho pie chart
  interface CategoryDistribution {
    name: string;
    value: number;
  }

  const categoryDistribution = products.reduce<CategoryDistribution[]>(
    (acc: CategoryDistribution[], product: { category: string }) => {
      const existingCategory = acc.find(
        (c: CategoryDistribution) => c.name === product.category
      );
      if (existingCategory) {
        existingCategory.value += 1;
      } else {
        acc.push({
          name: product.category,
          value: 1,
        });
      }
      return acc;
    },
    []
  );

  // Tính tổng doanh thu
  const totalRevenue = orderItems.reduce((sum: number, item: OrderItem) => {
    return sum + item.variant.price * item.quantity;
  }, 0);

  // Tính tổng số đơn hàng
  const totalOrders = orderItems.length;

  // Tính trung bình giá trị đơn hàng
  const averageOrderValue = totalRevenue / totalOrders;

  // Tính tổng số sản phẩm đã bán
  const totalProductsSold = orderItems.reduce(
    (sum: number, item: OrderItem) => {
      return sum + item.quantity;
    },
    0
  );

  return {
    productSales: productSales
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10),
    monthlyRevenue,
    categoryDistribution,
    totalRevenue,
    totalOrders,
    averageOrderValue,
    totalProductsSold,
  };
};

export default function StatisticTab() {
  const data = processOrderData();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Thống kê bán hàng</h1>
        <div className="text-sm text-gray-500">
          Cập nhật lần cuối: {new Date().toLocaleDateString("vi-VN")}
        </div>
      </div>

      {/* Thẻ thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatisticCard
          title="Tổng doanh thu"
          value={`${data.totalRevenue.toLocaleString("vi-VN")} VNĐ`}
          color="blue"
          icon={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
          }
          trend={{ value: 12.5, isPositive: true }}
        />
        <StatisticCard
          title="Tổng đơn hàng"
          value={data.totalOrders}
          color="green"
          icon={<OrderIcon className="w-8 h-8" />}
          trend={{ value: 8.2, isPositive: true }}
        />
        <StatisticCard
          title="Giá trị TB/đơn"
          value={`${Math.round(data.averageOrderValue).toLocaleString(
            "vi-VN"
          )} VNĐ`}
          color="purple"
          icon={<AverageIcon className="w-8 h-8" />}
          trend={{ value: 5.3, isPositive: true }}
        />
        <StatisticCard
          title="Sản phẩm đã bán"
          value={data.totalProductsSold}
          color="orange"
          icon={<ProductIcon className="w-8 h-8" />}
          trend={{ value: 15.7, isPositive: true }}
        />
      </div>

      {/* Các biểu đồ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <OrderLineChart />
        <CategoryPieChart />
        <div className="lg:col-span-2">
          <RevenueLineChart />
        </div>
      </div>
    </div>
  );
}
