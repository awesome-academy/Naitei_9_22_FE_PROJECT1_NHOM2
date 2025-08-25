"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";

interface OrderSearchFilterProps {
  onSearch: (searchTerm: string) => void;
  onStatusFilter: (status: string) => void;
  onDateRangeFilter: (startDate: string, endDate: string) => void;
  onClearFilters: () => void;
}

const ORDER_STATUS_OPTIONS = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "pending", label: "Chờ xử lý" },
  { value: "processing", label: "Đang xử lý" },
  { value: "shipped", label: "Đã giao hàng" },
  { value: "delivered", label: "Hoàn thành" },
  { value: "cancelled", label: "Đã hủy" },
];

export default function OrderSearchFilter({
  onSearch,
  onStatusFilter,
  onDateRangeFilter,
  onClearFilters,
}: OrderSearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [hasActiveFilters, setHasActiveFilters] = useState(false);

  // Memoize các callback functions để tránh infinite loop
  const memoizedOnSearch = useCallback(onSearch, [onSearch]);
  const memoizedOnStatusFilter = useCallback(onStatusFilter, [onStatusFilter]);
  const memoizedOnDateRangeFilter = useCallback(onDateRangeFilter, [
    onDateRangeFilter,
  ]);

  // Tự động tìm kiếm
  useEffect(() => {
    memoizedOnSearch(searchTerm);
  }, [searchTerm, memoizedOnSearch]);

  // Tự động lọc trạng thái
  useEffect(() => {
    memoizedOnStatusFilter(selectedStatus);
  }, [selectedStatus, memoizedOnStatusFilter]);

  // Tự động lọc theo khoảng thời gian
  useEffect(() => {
    if (startDate && endDate) {
      memoizedOnDateRangeFilter(startDate, endDate);
    }
  }, [startDate, endDate, memoizedOnDateRangeFilter]);

  // Kiểm tra xem có filter active
  useEffect(() => {
    const hasFilters =
      searchTerm || selectedStatus !== "all" || startDate || endDate;
    setHasActiveFilters(!!hasFilters);
  }, [searchTerm, selectedStatus, startDate, endDate]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status);
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(e.target.value);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setSelectedStatus("all");
    setStartDate("");
    setEndDate("");
    onClearFilters();
  };

  return (
    <div className="mb-6">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Ô tìm kiếm dài hơn chút nữa */}
        <div className="relative" style={{ minWidth: 0 }}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            type="text"
            placeholder="Tìm kiếm email hoặc SĐT..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 pr-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-[480px]"
            style={{ minWidth: '340px', maxWidth: '600px' }}
          />
        </div>

        {/* Bộ lọc */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Bộ lọc:</span>
        </div>

        {/* Lọc theo trạng thái */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Trạng thái:</label>
          <Select value={selectedStatus} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Tất cả trạng thái" />
            </SelectTrigger>
            <SelectContent>
              {ORDER_STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Lọc theo khoảng thời gian */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Từ ngày:</label>
          <Input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            max={endDate || undefined}
            className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Đến ngày:</label>
          <Input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            min={startDate || undefined}
            className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Nút xóa bộ lọc */}
        {hasActiveFilters && (
          <Button
            onClick={handleClearFilters}
            variant="outline"
            className="px-4 py-2 border-red-300 text-red-600 rounded-lg hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            <X className="w-4 h-4 mr-2" />
            Xóa bộ lọc
          </Button>
        )}
      </div>
    </div>
  );
}
