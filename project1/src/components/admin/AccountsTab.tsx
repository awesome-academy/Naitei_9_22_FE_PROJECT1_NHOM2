"use client";

import React, { useState, useEffect, useMemo } from "react";
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
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/services/UserService";
import { User } from "@/types/User";

// Danh sách option cho vai trò
const roleOptions = [
  { value: "all", label: "Tất cả vai trò" },
  { value: "user", label: "Customer" },
  { value: "admin", label: "Admin" },
];

export default function AccountsTab() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAccount, setEditingAccount] = useState<User | null>(null);
  const [accounts, setAccounts] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");

  // Fetch accounts from API
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        setLoading(true);
        const users = await getUsers();
        setAccounts(users);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  // Filter accounts based on search and filters
  const filteredAccounts = useMemo(() => {
    return accounts.filter((account) => {
      const matchesSearch =
        account.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        account.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole =
        selectedRole === "all" || account.role === selectedRole;

      return matchesSearch && matchesRole;
    });
  }, [accounts, searchTerm, selectedRole]);

  const handleAddAccount = () => {
    setEditingAccount(null);
    setIsModalOpen(true);
  };

  const handleEditAccount = (account: User) => {
    setEditingAccount(account);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAccount(null);
  };

  const handleSaveAccount = async (accountData: Partial<User>) => {
    try {
      if (editingAccount) {
        // Cập nhật tài khoản hiện có
        await updateUser(editingAccount.id, accountData);
      } else {
        // Thêm tài khoản mới
        await createUser(accountData);
      }

      // Refresh danh sách tài khoản
      const users = await getUsers();
      setAccounts(users);

      // Đóng modal
      handleCloseModal();
    } catch (error) {}
  };

  const handleDeleteAccount = async (account: User) => {
    if (
      window.confirm(`Bạn chắc chắn muốn xóa tài khoản "${account.fullName}"?`)
    ) {
      try {
        await deleteUser(account.id);

        // Refresh danh sách tài khoản
        const users = await getUsers();
        setAccounts(users);
      } catch (error) {}
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-center items-center h-32">
          <div className="text-gray-500">Đang tải dữ liệu...</div>
        </div>
      </div>
    );
  }

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
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={selectedRole} onValueChange={setSelectedRole}>
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
      </div>

      <AccountsTable
        accounts={filteredAccounts}
        onEditAccount={handleEditAccount}
        onDeleteAccount={handleDeleteAccount}
      />

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
