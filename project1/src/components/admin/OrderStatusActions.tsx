"use client";

import React, { useState } from "react";
import { IconButton } from "@/components/ui/icon-button";
import { ViewIcon, UpdateIcon, CancelIcon } from "@/assets/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Order } from "@/types/Order";
import { updateOrderStatus } from "@/services/OrderService";
import CancelOrderDialog from "./CancelOrderDialog";
import {
  getStatusColor,
  getStatusText,
  getNextStatus,
} from "@/utils/orderUtils";
import { toast } from "react-toastify";

interface OrderStatusActionsProps {
  order: Order;
  onOrderUpdate?: () => void;
  onViewOrder?: (order: Order) => void;
}

export default function OrderStatusActions({
  order,
  onOrderUpdate,
  onViewOrder,
}: OrderStatusActionsProps) {
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const nextStatus = getNextStatus(order.status);
  const isUpdating = updatingOrderId === order._id;

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      setUpdatingOrderId(orderId);
      await updateOrderStatus(orderId, newStatus);

      // Hiển thị toast thành công
      toast.success(
        `Đơn hàng #${orderId} đã được chuyển sang trạng thái "${getStatusText(
          newStatus
        )}"`,
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );

      // Refresh data sau khi cập nhật
      if (onOrderUpdate) {
        onOrderUpdate();
      }
    } catch (error) {
      console.error("Error updating order status:", error);

      // Hiển thị toast lỗi
      toast.error(
        "Không thể cập nhật trạng thái đơn hàng. Vui lòng thử lại sau.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } finally {
      setUpdatingOrderId(null);
    }
  };

  const handleCancelOrder = async () => {
    try {
      setUpdatingOrderId(order._id);
      await updateOrderStatus(order._id, "cancelled");

      // Hiển thị toast thành công
      toast.success(`Đơn hàng #${order._id} đã được hủy thành công`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Refresh data sau khi cập nhật
      if (onOrderUpdate) {
        onOrderUpdate();
      }
      setShowCancelDialog(false);
    } catch (error) {
      console.error("Error cancelling order:", error);

      // Hiển thị toast lỗi
      toast.error("Không thể hủy đơn hàng. Vui lòng thử lại sau.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setUpdatingOrderId(null);
    }
  };

  return (
    <>
      <div className="flex gap-2">
        {/* Nút xem chi tiết */}
        <IconButton
          icon={<ViewIcon className="w-5 h-5" />}
          onClick={() => onViewOrder?.(order)}
          tooltip="Xem chi tiết"
          variant="ghost"
          size="sm"
          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
        />

        {/* Dropdown cho cập nhật trạng thái */}
        {nextStatus && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton
                icon={<UpdateIcon className="w-5 h-5" />}
                tooltip="Cập nhật trạng thái"
                variant="ghost"
                size="sm"
                className="text-green-600 hover:text-green-800 hover:bg-green-50"
                disabled={isUpdating}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() => handleUpdateStatus(order._id, nextStatus)}
                disabled={isUpdating}
                className="cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <span>Chuyển sang:</span>
                  <Badge className={getStatusColor(nextStatus)}>
                    {getStatusText(nextStatus)}
                  </Badge>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Nút hủy đơn hàng */}
        {order.status !== "cancelled" && order.status !== "delivered" && (
          <IconButton
            icon={<CancelIcon className="w-5 h-5" />}
            onClick={() => setShowCancelDialog(true)}
            tooltip="Hủy đơn hàng"
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-800 hover:bg-red-50"
            disabled={isUpdating}
          />
        )}
      </div>

      {/* Dialog xác nhận hủy đơn hàng */}
      <CancelOrderDialog
        order={order}
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onConfirm={handleCancelOrder}
        isUpdating={isUpdating}
      />
    </>
  );
}
