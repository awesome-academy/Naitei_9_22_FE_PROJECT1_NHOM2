"use client";

import React, { useState } from "react";
import AccountsTable from "./AccountsTable";
import AccountFormModal from "./AccountFormModal";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

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

interface Account {
  id?: string;
  fullName: string;
  email: string;
  phone?: string;
  website?: string;
  address?: string;
  password?: string;
}

export default function AccountsTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);

  const handleAddAccount = () => {
    setEditingAccount(null);
    setIsModalOpen(true);
  };

  const handleEditAccount = (account: Account) => {
    setEditingAccount(account);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAccount(null);
  };

  const handleSaveAccount = async (accountData: Account) => {
    // Test chức năng
    console.log("Saving account:", accountData);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Quản lý tài khoản</h1>
        <Button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={handleAddAccount}
        >
          + Thêm tài khoản
        </Button>
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

      <AccountsTable onEditAccount={handleEditAccount} />

      {/* Account Form Modal */}
      <AccountFormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveAccount}
        account={editingAccount}
      />
    </div>
  );
}
