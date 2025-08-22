"use client";

import React, { useState } from "react";
import { IconButton } from "@/components/ui/icon-button";
import { ViewIcon, UpdateIcon, CancelIcon } from "@/assets/icons";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import TablePagination from "./TablePagination";
import OrderDetailModal from "./OrderDetailModal";
import { Order } from "@/types/Order";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDateShort } from "@/utils/formatDate";

interface OrdersTableProps {
  orders: Order[];
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

const getTotalItems = (order: Order) => {
  return order.items.reduce((total, item) => total + item.quantity, 0);
};

export default function OrdersTable({ orders }: OrdersTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // Tính toán dữ liệu cho trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, orders.length);
  const currentOrders = orders.slice(startIndex, endIndex);

  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="min-w-[80px]">STT</TableHead>
              {[
                "Email khách hàng",
                "Số lượng",
                "Tổng tiền",
                "Trạng thái",
                "Ngày đặt",
                "Thao tác",
              ].map((header) => (
                <TableHead key={header}>{header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentOrders.map((order, index) => (
              <TableRow key={order._id} className="hover:bg-gray-50">
                <TableCell className="font-semibold">
                  {startIndex + index + 1}
                </TableCell>
                <TableCell>{order.email}</TableCell>
                <TableCell>{getTotalItems(order)} sản phẩm</TableCell>
                <TableCell>{formatCurrency(order.total)}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusText(order.status)}
                  </span>
                </TableCell>
                <TableCell>{formatDateShort(order.createdAt)}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <IconButton
                      icon={<ViewIcon className="w-5 h-5" />}
                      onClick={() => handleViewOrder(order)}
                      tooltip="Xem chi tiết"
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                    />
                    <IconButton
                      icon={<UpdateIcon className="w-5 h-5" />}
                      onClick={() => console.log("Update order:", order._id)}
                      tooltip="Cập nhật trạng thái"
                      variant="ghost"
                      size="sm"
                      className="text-green-600 hover:text-green-800 hover:bg-green-50"
                    />
                    <IconButton
                      icon={<CancelIcon className="w-5 h-5" />}
                      onClick={() => console.log("Cancel order:", order._id)}
                      tooltip="Hủy đơn hàng"
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <TablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        startIndex={startIndex}
        endIndex={endIndex}
        totalItems={orders.length}
        label="đơn hàng"
      />

      {/* Order Detail Modal */}
      <OrderDetailModal
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
