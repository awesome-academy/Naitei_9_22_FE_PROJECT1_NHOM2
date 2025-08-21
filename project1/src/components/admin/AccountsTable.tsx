"use client";

import React, { useState } from "react";
import { IconButton } from "@/components/ui/icon-button";
import { EditIcon, DeleteIcon } from "@/assets/icons";
import { User } from "@/types/User";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import TablePagination from "./TablePagination";

interface AccountsTableProps {
  accounts: User[];
  onEditAccount: (account: User) => void;
  onDeleteAccount: (account: User) => void;
}

export default function AccountsTable({
  accounts,
  onEditAccount,
  onDeleteAccount,
}: AccountsTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(accounts.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Tính toán dữ liệu cho trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, accounts.length);
  const currentAccounts = accounts.slice(startIndex, endIndex);

  return (
    <div>
      {/* Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="min-w-[60px]">STT</TableHead>
              {[
                { label: "Họ tên" },
                { label: "Email" },
                { label: "SĐT" },
                { label: "Vai trò" },
                { label: "Địa chỉ" },
                { label: "Thao tác" },
              ].map((col) => (
                <TableHead key={col.label}>{col.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentAccounts.map((account, idx) => (
              <TableRow key={account.id} className="hover:bg-gray-50">
                <TableCell>{startIndex + idx + 1}</TableCell>
                <TableCell>{account.fullName}</TableCell>
                <TableCell>{account.email}</TableCell>
                <TableCell>{account.phone || "N/A"}</TableCell>
                <TableCell>
                  <span
                    className={
                      account.role === "admin"
                        ? "px-2 py-1 rounded-full text-xs bg-red-100 text-red-800"
                        : "px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                    }
                  >
                    {account.role === "admin" ? "Admin" : "Customer"}
                  </span>
                </TableCell>
                <TableCell>{account.address || "N/A"}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <IconButton
                      icon={<EditIcon className="w-5 h-5" />}
                      tooltip="Sửa tài khoản"
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                      onClick={() => onEditAccount(account)}
                    />
                    <IconButton
                      icon={<DeleteIcon className="w-5 h-5" />}
                      tooltip="Xóa tài khoản"
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-800 hover:bg-red-50"
                      onClick={() => onDeleteAccount(account)}
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
        totalItems={accounts.length}
        label="tài khoản"
      />
    </div>
  );
}
