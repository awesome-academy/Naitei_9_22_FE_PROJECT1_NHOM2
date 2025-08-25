"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/types/Order";
import { getStatusColor, getStatusText } from "@/utils/orderUtils";
import { formatCurrency } from "@/utils/formatCurrency";

interface CancelOrderDialogProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isUpdating: boolean;
}

export default function CancelOrderDialog({
  order,
  isOpen,
  onClose,
  onConfirm,
  isUpdating,
}: CancelOrderDialogProps) {
  if (!order) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-600">
            Xác nhận hủy đơn hàng
          </DialogTitle>
          <DialogDescription>
            Bạn có chắc chắn muốn hủy đơn hàng <strong>#{order._id}</strong>{" "}
            không?
            <br />
            <span className="text-sm text-gray-500 mt-2 block">
              Hành động này không thể hoàn tác. Đơn hàng sẽ được đánh dấu là
              &ldquo;Đã hủy&rdquo;.
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Khách hàng:</span>
            <span className="font-medium">{order.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Trạng thái hiện tại:</span>
            <Badge className={getStatusColor(order.status)}>
              {getStatusText(order.status)}
            </Badge>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tổng tiền:</span>
            <span className="font-medium">
              {formatCurrency(order.total)} VNĐ
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isUpdating}>
            Hủy bỏ
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isUpdating}
          >
            {isUpdating ? "Đang hủy..." : "Xác nhận hủy"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
