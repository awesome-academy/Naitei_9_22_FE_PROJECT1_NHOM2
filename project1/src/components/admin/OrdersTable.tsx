"use client";

import React, { useState } from "react";
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
import OrderStatusActions from "./OrderStatusActions";
import { Order } from "@/types/Order";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatDateShort } from "@/utils/formatDate";
import {
  getStatusColor,
  getStatusText,
  getTotalItems,
} from "@/utils/orderUtils";

interface OrdersTableProps {
  orders: Order[];
  currentPage: number;
  onPageChange: (page: number) => void;
  onOrderUpdate?: () => void; // refresh data
}

export default function OrdersTable({
  orders,
  currentPage,
  onPageChange,
  onOrderUpdate,
}: OrdersTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(orders.length / itemsPerPage);

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
                  <OrderStatusActions
                    order={order}
                    onOrderUpdate={onOrderUpdate}
                    onViewOrder={handleViewOrder}
                  />
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
        onPageChange={onPageChange}
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
