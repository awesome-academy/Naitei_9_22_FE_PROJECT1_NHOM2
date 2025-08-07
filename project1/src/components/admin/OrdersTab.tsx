'use client';

import React from "react";
import dbData from "../../../db.json";
import OrdersTable from "./OrdersTable";
import {Button} from "../ui/button"


// Generate dữ liệu test
const mockOrders = dbData.users.slice(0, 4).map((user, index) => {
  const randomProduct = dbData.products[Math.floor(Math.random() * dbData.products.length)];
  const statuses = ['pending', 'completed', 'shipped', 'cancelled'];
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const randomItems = Math.floor(Math.random() * 5) + 1;
  const randomAmount = randomProduct.oldPrice * randomItems;
  
  return {
    id: `ORD${String(index + 1).padStart(3, '0')}`,
    customerName: user.fullName,
    customerEmail: user.email,
    totalAmount: randomAmount,
    status: randomStatus,
    orderDate: '2025-02-02',
    items: randomItems,
    productName: randomProduct.name
  };
});

export default function OrdersTab() {
  const totalOrders = mockOrders.length;
  const pendingOrders = mockOrders.filter((o) => o.status === "pending").length;
  const completedOrders = mockOrders.filter(
    (o) => o.status === "completed"
  ).length;
  const shippedOrders = mockOrders.filter((o) => o.status === "shipped").length;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Quản lý đơn hàng
        </h1>
        {/* <Button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          + Tạo đơn hàng mới
        </Button> */}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900">Tổng đơn hàng</h3>
          <p className="text-2xl font-bold text-blue-600">{totalOrders}</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-semibold text-yellow-900">Chờ xử lý</h3>
          <p className="text-2xl font-bold text-yellow-600">{pendingOrders}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-900">Hoàn thành</h3>
          <p className="text-2xl font-bold text-green-600">{completedOrders}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <h3 className="text-lg font-semibold text-purple-900">Đã giao</h3>
          <p className="text-2xl font-bold text-purple-600">{shippedOrders}</p>
        </div>
      </div>

      {/* Tìm kiếm */}
      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Tìm kiếm đơn hàng..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="">Tất cả trạng thái</option>
          <option value="pending">Chờ xử lý</option>
          <option value="completed">Hoàn thành</option>
          <option value="shipped">Đã giao hàng</option>
          <option value="cancelled">Đã hủy</option>
        </select>
        <input
          type="date"
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <OrdersTable />
    </div>
  );
} 