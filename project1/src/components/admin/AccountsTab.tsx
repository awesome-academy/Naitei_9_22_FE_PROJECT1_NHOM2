'use client';

import React from "react";
import usersData from "../../../db.json";
import AccountsTable from "./AccountsTable";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

// Thêm các trường bổ sung
const mockAccounts = usersData.users.map((user) => ({
  ...user,
  status: 'active',
  role: 'user',
  createdAt: '2025-27-07'
}));

// Danh sách option cho vai trò
const roleOptions = [
  { value: "all", label: "Tất cả vai trò" },
  { value: "user", label: "Customer" },
  { value: "admin", label: "Admin" },
];

// Danh sách option cho trạng thái
const statusOptions = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
];

export default function AccountsTab() {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Quản lý tài khoản
        </h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          + Thêm tài khoản
        </button>
      </div>

      {/* Tìm kiếm */}
      <div className="mb-6 flex gap-4">
        <Input
          type="text"
          placeholder="Tìm kiếm tài khoản..."
          className="flex-1"
        />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tất cả vai trò" />
          </SelectTrigger>
          <SelectContent>
            {roleOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tất cả trạng thái" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <AccountsTable />
    </div>
  );
} 