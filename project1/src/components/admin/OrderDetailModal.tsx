"use client";

import React from "react";
import { Order } from "@/types/Order";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import OrderBasicInfo from "./OrderBasicInfo";
import OrderProductDetails from "./OrderProductDetails";
import OrderSummary from "./OrderSummary";

interface OrderDetailModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function OrderDetailModal({
  order,
  isOpen,
  onClose,
}: OrderDetailModalProps) {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto !max-w-[1000] w-[95vw]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Chi tiết đơn hàng
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Thông tin cơ bản */}
          <OrderBasicInfo order={order} />

          {/* Địa chỉ giao hàng */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Địa chỉ giao hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{order.shipping_address}</p>
            </CardContent>
          </Card>

          {/* Chi tiết sản phẩm */}
          <OrderProductDetails order={order} />

          {/* Tổng kết đơn hàng */}
          <OrderSummary order={order} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
