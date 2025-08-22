"use client";

import React from "react";
import { Order } from "@/types/Order";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/utils/formatCurrency";

interface OrderSummaryProps {
  order: Order;
}

export default function OrderSummary({ order }: OrderSummaryProps) {
  const totalItems = order.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Tính tạm tính dựa trên tổng price của từng món (giá gốc)
  const subtotal = Math.round(
    order.items.reduce((total, item) => total + item.price * item.quantity, 0)
  );

  // Tính VAT 10% của tạm tính
  const vatAmount = Math.round(subtotal * 0.1);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Tổng kết đơn hàng</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Tổng số sản phẩm:</span>
            <span className="font-medium">{totalItems} sản phẩm</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tạm tính:</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Thuế VAT (10%):</span>
            <span>{formatCurrency(vatAmount)}</span>
          </div>
          <Separator />
          <div className="flex justify-between text-xl font-bold">
            <span>Tổng cộng:</span>
            <span className="text-blue-600">
              {formatCurrency(subtotal + vatAmount)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
