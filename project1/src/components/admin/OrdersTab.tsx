"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import OrdersTable from "./OrdersTable";
import OrderSearchFilter from "./OrderSearchFilter";
import { getAllOrders } from "@/services/OrderService";
import { Order } from "@/types/Order";
import { OrderStatus } from "@/types/StatusEnum";

export default function OrdersTab() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | OrderStatus>("all");
  const [dateRangeFilter, setDateRangeFilter] = useState<{
    startDate: string;
    endDate: string;
  } | null>(null);

  // Fetch orders từ API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const ordersData = await getAllOrders();
      // Sắp xếp theo thời gian mới nhất đến cũ nhất
      const sortedOrders = ordersData.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setOrders(sortedOrders);
    } catch (err) {
      setError("Không thể tải dữ liệu đơn hàng");
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Lọc và tìm kiếm orders
  const processedOrders = useMemo(() => {
    let result = [...orders];

    // Tìm kiếm theo email hoặc số điện thoại
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (order) =>
          order.email.toLowerCase().includes(term) ||
          order.phone.toLowerCase().includes(term)
      );
    }

    // Lọc theo trạng thái
    if (statusFilter && statusFilter !== "all") {
      result = result.filter((order) => order.status === statusFilter);
    }

    // Lọc theo khoảng thời gian
    if (dateRangeFilter?.startDate && dateRangeFilter?.endDate) {
      const startDate = new Date(dateRangeFilter.startDate);
      const endDate = new Date(dateRangeFilter.endDate);
      endDate.setHours(23, 59, 59, 999);

      result = result.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= startDate && orderDate <= endDate;
      });
    }

    return result;
  }, [orders, searchTerm, statusFilter, dateRangeFilter]);

  // Cập nhật filtered orders khi processed orders thay đổi
  useEffect(() => {
    setFilteredOrders(processedOrders);
    // Chỉ reset về trang 1 khi có thay đổi filter, không reset khi cập nhật status
    // Kiểm tra xem có phải thay đổi filter không
    const hasFilterChange =
      searchTerm || statusFilter !== "all" || dateRangeFilter;
    if (hasFilterChange) {
      setCurrentPage(1);
    }
  }, [processedOrders, searchTerm, statusFilter, dateRangeFilter]);

  // Xử lý tìm kiếm
  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  // Xử lý lọc theo trạng thái
  const handleStatusFilter = useCallback((status: string) => {
    // Nếu status là "all" thì giữ nguyên, còn lại ép kiểu về OrderStatus
    if (status === "all") {
      setStatusFilter("all");
    } else {
      setStatusFilter(status as OrderStatus);
    }
  }, []);

  // Xử lý lọc theo khoảng thời gian
  const handleDateRangeFilter = useCallback(
    (startDate: string, endDate: string) => {
      setDateRangeFilter({ startDate, endDate });
    },
    []
  );

  // Xóa tất cả bộ lọc
  const handleClearFilters = useCallback(() => {
    setSearchTerm("");
    setStatusFilter("all");
    setDateRangeFilter(null);
  }, []);

  // Xử lý cập nhật đơn hàng (Không đổi trang)
  const handleOrderUpdate = useCallback(async () => {
    try {
      const ordersData = await getAllOrders();
      // Sắp xếp theo thời gian mới nhất đến cũ nhất
      const sortedOrders = ordersData.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setOrders(sortedOrders);
      // Không reset currentPage để giữ nguyên trang hiện tại
    } catch (err) {
      console.error("Error refreshing orders:", err);
    }
  }, []);

  // Tính toán thống kê từ filtered orders
  const totalOrders = filteredOrders.length;
  const pendingOrders = filteredOrders.filter(
    (o) => o.status === OrderStatus.PENDING
  ).length;
  const processingOrders = filteredOrders.filter(
    (o) => o.status === OrderStatus.PROCESSING
  ).length;
  const shippedOrders = filteredOrders.filter(
    (o) => o.status === OrderStatus.SHIPPED
  ).length;
  const deliveredOrders = filteredOrders.filter(
    (o) => o.status === OrderStatus.DELIVERED
  ).length;
  const cancelledOrders = filteredOrders.filter(
    (o) => o.status === OrderStatus.CANCELLED
  ).length;

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Đang tải dữ liệu...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý đơn hàng</h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900">Tổng đơn hàng</h3>
          <p className="text-2xl font-bold text-blue-600">{totalOrders}</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-semibold text-yellow-800">Chờ xử lý</h3>
          <p className="text-2xl font-bold text-yellow-800">{pendingOrders}</p>
        </div>
        <div className="bg-orange-100 p-4 rounded-lg border border-orange-200">
          <h3 className="text-lg font-semibold text-orange-800">Đang xử lý</h3>
          <p className="text-2xl font-bold text-orange-800">
            {processingOrders}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-4 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-blue-800">Đã giao</h3>
          <p className="text-2xl font-bold text-blue-800">{shippedOrders}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg border border-green-200">
          <h3 className="text-lg font-semibold text-green-800">Hoàn thành</h3>
          <p className="text-2xl font-bold text-green-800">{deliveredOrders}</p>
        </div>
        <div className="bg-red-100 p-4 rounded-lg border border-red-200">
          <h3 className="text-lg font-semibold text-red-800">Đã hủy</h3>
          <p className="text-2xl font-bold text-red-800">{cancelledOrders}</p>
        </div>
      </div>

      {/* Tìm kiếm và lọc */}
      <OrderSearchFilter
        onSearch={handleSearch}
        onStatusFilter={handleStatusFilter}
        onDateRangeFilter={handleDateRangeFilter}
        onClearFilters={handleClearFilters}
      />

      {/* Bảng đơn hàng */}
      <OrdersTable
        orders={filteredOrders}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onOrderUpdate={handleOrderUpdate}
      />
    </div>
  );
}
