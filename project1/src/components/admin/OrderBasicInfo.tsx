"use client";

import React from "react";
import { Order } from "@/types/Order";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/utils/formatDate";

interface OrderBasicInfoProps {
  order: Order;
}

// Gán màu cho trạng thái đơn hàng
const statusColorMap: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  processing: "bg-orange-100 text-orange-800",
  shipped: "bg-blue-100 text-blue-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

const getStatusColor = (status: string) => {
  return statusColorMap[status] || "bg-gray-100 text-gray-800";
};

// Tên hiển thị trạng thái
const statusTextMap: Record<string, string> = {
  pending: "Chờ xử lý",
  processing: "Đang xử lý",
  shipped: "Đã giao hàng",
  delivered: "Hoàn thành",
  cancelled: "Đã hủy",
};

const getStatusText = (status: string) => {
  return statusTextMap[status] || status;
};

export default function OrderBasicInfo({ order }: OrderBasicInfoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Thông tin đơn hàng</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Mã đơn hàng:</span>
            <span className="font-mono text-sm">{order._id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Trạng thái:</span>
            <Badge className={getStatusColor(order.status)}>
              {getStatusText(order.status)}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Ngày đặt:</span>
            <span>{formatDate(order.createdAt)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Cập nhật lần cuối:</span>
            <span>{formatDate(order.updatedAt)}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Thông tin khách hàng</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Email:</span>
            <span>{order.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Số điện thoại:</span>
            <span>{order.phone}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Phương thức thanh toán:</span>
            <span>{order.payment_method}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
