"use client";

import React from "react";
import { Order } from "@/types/Order";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/utils/formatDate";
import { getStatusColor, getStatusText } from "@/utils/orderUtils";

interface OrderBasicInfoProps {
  order: Order;
}

export default function OrderBasicInfo({ order }: OrderBasicInfoProps) {
  // Tách mảng thông tin khách hàng ra ngoài return
  const customerInfo = [
    { label: "Email", value: order.email },
    { label: "Số điện thoại", value: order.phone },
    { label: "Phương thức thanh toán", value: order.payment_method },
  ];

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
          {customerInfo.map((item) => (
            <div className="flex justify-between" key={item.label}>
              <span className="text-gray-600">{item.label}:</span>
              <span>{item.value}</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
