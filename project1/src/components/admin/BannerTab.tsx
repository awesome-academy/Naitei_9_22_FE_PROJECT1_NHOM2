"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { IconButton } from "@/components/ui/icon-button";
import {
  EditIcon,
  DeleteIcon,
  UpArrowIcon,
  DownArrowIcon,
} from "@/assets/icons";
import {
  getBanners,
  deleteBannerWithReorder,
  swapBannerOrder,
  reorderBannersAfterDelete,
} from "@/services/BannerService";
import { Banner } from "@/types/Banner";
import { toast } from "react-toastify";
import Image from "next/image";
import ConfirmModal from "@/components/ConfirmModal";
import BannerFormModal from "./BannerFormModal";

export default function BannerTab() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteConfirm, setDeleteConfirm] = useState<{
    isOpen: boolean;
    banner: Banner | null;
  }>({
    isOpen: false,
    banner: null,
  });
  const [formModal, setFormModal] = useState<{
    isOpen: boolean;
    banner: Banner | null;
  }>({
    isOpen: false,
    banner: null,
  });

  // Load banners khi component mount
  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    try {
      setLoading(true);
      const data = await getBanners();
      setBanners(data);
    } catch (error) {
      console.error("Load banners error:", error);
      toast.error("Lỗi khi tải danh sách banner!");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (banner: Banner) => {
    setDeleteConfirm({
      isOpen: true,
      banner,
    });
  };

  const handleDeleteConfirm = async () => {
    if (deleteConfirm.banner) {
      try {
        // Optimistic update: Cập nhật UI ngay lập tức
        const reorderedBanners = reorderBannersAfterDelete(
          banners,
          deleteConfirm.banner.id
        );
        setBanners(reorderedBanners);
        setDeleteConfirm({ isOpen: false, banner: null });

        // Thực hiện xóa và reorder trên server
        await deleteBannerWithReorder(deleteConfirm.banner.id);
        toast.success(
          "Xóa banner thành công! Các banner khác đã được sắp xếp lại."
        );

        // Reload để đảm bảo đồng bộ với server
        loadBanners();
      } catch (error) {
        console.error("Delete banner error:", error);
        toast.error("Xóa banner thất bại!");
        // Rollback: Reload lại danh sách từ server
        loadBanners();
      }
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirm({ isOpen: false, banner: null });
  };

  const handleAddBanner = () => {
    setFormModal({
      isOpen: true,
      banner: null,
    });
  };

  const handleEditBanner = (banner: Banner) => {
    setFormModal({
      isOpen: true,
      banner,
    });
  };

  const handleFormModalClose = () => {
    setFormModal({
      isOpen: false,
      banner: null,
    });
  };

  const handleFormModalSuccess = () => {
    loadBanners(); // Reload danh sách sau khi thêm/sửa thành công
  };

  const handleMoveUp = async (banner: Banner) => {
    const currentIndex = banners.findIndex((b) => b.id === banner.id);
    if (currentIndex > 0) {
      const previousBanner = banners[currentIndex - 1];
      try {
        await swapBannerOrder(banner.id, previousBanner.id);
        toast.success("Đã di chuyển banner lên!");
        loadBanners(); // Reload danh sách
      } catch (error) {
        console.error("Move up error:", error);
        toast.error("Lỗi khi di chuyển banner!");
      }
    }
  };

  const handleMoveDown = async (banner: Banner) => {
    const currentIndex = banners.findIndex((b) => b.id === banner.id);
    if (currentIndex < banners.length - 1) {
      const nextBanner = banners[currentIndex + 1];
      try {
        await swapBannerOrder(banner.id, nextBanner.id);
        toast.success("Đã di chuyển banner xuống!");
        loadBanners(); // Reload danh sách
      } catch (error) {
        console.error("Move down error:", error);
        toast.error("Lỗi khi di chuyển banner!");
      }
    }
  };

  const getStatusColor = (isActive: boolean) => {
    return isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  const getStatusText = (isActive: boolean) => {
    return isActive ? "Hiển thị" : "Ẩn";
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center py-12">
          <div className="text-gray-500">Đang tải danh sách banner...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Quản lý Banner
          </h2>
          <p className="text-gray-600">
            Quản lý các banner hiển thị trên trang chủ
          </p>
        </div>
        <Button
          onClick={handleAddBanner}
          className="bg-blue-600 hover:bg-blue-700"
        >
          + Thêm Banner
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        {banners.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">Chưa có banner nào</div>
            <div className="text-gray-400 text-sm">
              Hãy thêm banner đầu tiên cho trang chủ
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  {[
                    "STT",
                    "Hình ảnh",
                    "Tiêu đề",
                    "Thứ tự",
                    "Trạng thái",
                    "Ngày tạo",
                    "Thao tác",
                  ].map((header) => (
                    <TableHead key={header}>{header}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {banners.map((banner, index) => (
                  <TableRow key={banner.id} className="hover:bg-gray-50">
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <div className="w-20 h-12 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                        {banner.image_url ? (
                          <Image
                            src={banner.image_url}
                            alt={banner.title}
                            width={80}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-500 text-xs">IMG</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {banner.title}
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {banner.order}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          banner.is_active
                        )}`}
                      >
                        {getStatusText(banner.is_active)}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(banner.createdAt).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {/* Move Up */}
                        <IconButton
                          icon={<UpArrowIcon className="w-4 h-4" />}
                          onClick={() => handleMoveUp(banner)}
                          tooltip="Di chuyển lên"
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                          disabled={index === 0}
                        />
                        {/* Move Down */}
                        <IconButton
                          icon={<DownArrowIcon className="w-4 h-4" />}
                          onClick={() => handleMoveDown(banner)}
                          tooltip="Di chuyển xuống"
                          variant="ghost"
                          size="sm"
                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                          disabled={index === banners.length - 1}
                        />
                        {/* Edit */}
                        <IconButton
                          icon={<EditIcon className="w-4 h-4" />}
                          onClick={() => handleEditBanner(banner)}
                          tooltip="Sửa banner"
                          variant="ghost"
                          size="sm"
                          className="text-green-600 hover:text-green-800 hover:bg-green-50"
                        />
                        {/* Delete */}
                        <IconButton
                          icon={<DeleteIcon className="w-4 h-4" />}
                          onClick={() => handleDeleteClick(banner)}
                          tooltip="Xóa banner"
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
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteConfirm.isOpen}
        title="Xác nhận xóa banner"
        message={`Bạn có chắc chắn muốn xóa banner "${deleteConfirm.banner?.title}"? Hành động này không thể hoàn tác.`}
        confirmText="Xóa"
        cancelText="Hủy"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

      {/* Banner Form Modal */}
      <BannerFormModal
        isOpen={formModal.isOpen}
        onClose={handleFormModalClose}
        banner={formModal.banner}
        onSuccess={handleFormModalSuccess}
      />
    </div>
  );
}
