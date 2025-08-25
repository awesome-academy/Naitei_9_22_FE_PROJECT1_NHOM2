"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { uploadImagesToServer } from "@/services/CloudinaryService";
import { createBanner, updateBanner } from "@/services/BannerService";
import {
  Banner,
  CreateBannerRequest,
  UpdateBannerRequest,
} from "@/types/Banner";
import { toast } from "react-toastify";

// Import các component nhỏ
import FormHeader from "./banner/FormHeader";
import TitleInput from "./banner/TitleInput";
import ImageInputSection from "./banner/ImageInputSection";
import ImagePreview from "./banner/ImagePreview";
import StatusCheckbox from "./banner/StatusCheckbox";
import FormActions from "./banner/FormActions";

interface BannerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  banner?: Banner | null;
  onSuccess?: () => void;
}

export default function BannerFormModal({
  isOpen,
  onClose,
  banner,
  onSuccess,
}: BannerFormModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    image_url: "",
    is_active: true,
  });
  const [imageInputType, setImageInputType] = useState<"url" | "upload">("url");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const MAX_IMG_SIZE = 5; //MB

  const isEdit = !!banner;

  useEffect(() => {
    if (banner) {
      setFormData({
        title: banner.title,
        image_url: banner.image_url,
        is_active: banner.is_active,
      });
      setPreviewUrl(banner.image_url);
      setImageInputType("url");
    } else {
      setFormData({
        title: "",
        image_url: "",
        is_active: true,
      });
      setPreviewUrl("");
      setImageInputType("url");
    }
    setSelectedFile(null);
  }, [banner, isOpen]);

  const handleImageUrlChange = (url: string) => {
    setFormData({ ...formData, image_url: url });
    setPreviewUrl(url);
    setSelectedFile(null);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Vui lòng chọn file ảnh!");
      return;
    }

    // Validate file size (5MB)
    if (file.size > MAX_IMG_SIZE * 1024 * 1024) {
      toast.error(`File ảnh không được vượt quá ${MAX_IMG_SIZE}MB!`);
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setFormData({ ...formData, image_url: "" }); // Clear URL when file selected
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Vui lòng nhập tiêu đề banner!");
      return;
    }

    // Validate image
    if (imageInputType === "url") {
      if (!formData.image_url.trim()) {
        toast.error("Vui lòng nhập URL ảnh!");
        return;
      }
    } else {
      // For upload mode, check if file is selected (similar to BlogForm)
      const fileInput = document.getElementById(
        "banner-image-upload"
      ) as HTMLInputElement;
      if (
        !isEdit &&
        (!fileInput || !fileInput.files || fileInput.files.length === 0)
      ) {
        toast.error("Vui lòng chọn ảnh để upload!");
        return;
      }
    }

    setSubmitting(true);

    try {
      let imageUrl = formData.image_url;

      // Upload image if file selected (similar to BlogForm approach)
      if (imageInputType === "upload") {
        const fileInput = document.getElementById(
          "banner-image-upload"
        ) as HTMLInputElement;
        if (fileInput && fileInput.files && fileInput.files.length > 0) {
          setUploading(true);
          try {
            const imageUrls = await uploadImagesToServer(
              Array.from(fileInput.files)
            );
            if (imageUrls && imageUrls.length > 0) {
              imageUrl = imageUrls[0];
            } else {
              toast.error("Upload ảnh thất bại!");
              return;
            }
          } catch (err) {
            console.error("Image upload error:", err);
            toast.error("Lỗi upload ảnh!");
            return;
          }
          setUploading(false);
        } else if (!isEdit) {
          toast.error("Vui lòng chọn ảnh để upload!");
          return;
        }
      }

      const submitData = {
        title: formData.title.trim(),
        image_url: imageUrl,
        is_active: formData.is_active,
      };

      if (isEdit && banner) {
        const updateData: UpdateBannerRequest = {
          ...submitData,
          order: banner.order, // Keep existing order
        };
        await updateBanner(banner.id, updateData);
        toast.success("Cập nhật banner thành công!");
      } else {
        await createBanner(submitData as CreateBannerRequest);
        toast.success("Thêm banner thành công!");
      }

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Submit banner error:", error);
      toast.error(
        isEdit ? "Cập nhật banner thất bại!" : "Thêm banner thất bại!"
      );
    } finally {
      setUploading(false);
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (submitting || uploading) {
      return; // Prevent closing while processing
    }
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <FormHeader isEdit={isEdit} />

        <form onSubmit={handleSubmit} className="space-y-6">
          <TitleInput
            title={formData.title}
            onChange={(title) => setFormData({ ...formData, title })}
            disabled={submitting || uploading}
          />

          <ImageInputSection
            imageInputType={imageInputType}
            onImageTypeChange={(type) => {
              setImageInputType(type);
              if (type === "url") {
                setSelectedFile(null);
                // Clear file input when switching to URL
                const fileInput = document.getElementById(
                  "banner-image-upload"
                ) as HTMLInputElement;
                if (fileInput) fileInput.value = "";
              } else {
                setFormData({ ...formData, image_url: "" });
                setPreviewUrl("");
              }
            }}
            imageUrl={formData.image_url}
            onImageUrlChange={handleImageUrlChange}
            onFileChange={handleFileChange}
            disabled={submitting || uploading}
          />

          <ImagePreview
            previewUrl={previewUrl}
            imageInputType={imageInputType}
            onImageError={() => {
              setPreviewUrl("");
              toast.error("Không thể tải ảnh từ URL này!");
            }}
          />

          <StatusCheckbox
            isActive={formData.is_active}
            onChange={(isActive) =>
              setFormData({ ...formData, is_active: isActive })
            }
            disabled={submitting || uploading}
          />

          <FormActions
            onCancel={handleClose}
            onSubmit={handleSubmit}
            isUploading={uploading}
            isSubmitting={submitting}
            isEdit={isEdit}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
}
