import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProductBasicInfoSectionProps } from "./types";

// Hàm format giá tiền theo chuẩn VNĐ
function formatCurrency(value: number): string {
  return value.toLocaleString("vi-VN");
}

export default function ProductBasicInfoSection({
  formData,
  onFormDataChange,
}: ProductBasicInfoSectionProps) {
  const newPrice =
    formData.oldPrice > 0
      ? Math.round(formData.oldPrice * (1 - formData.discount / 100))
      : 0;

  return (
    <>
      {/* Basic Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Tên sản phẩm *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => onFormDataChange({ name: e.target.value })}
            placeholder="Nhập tên sản phẩm"
            required
          />
        </div>
        <div>
          <Label htmlFor="oldPrice">Giá cũ (VNĐ) *</Label>
          <Input
            id="oldPrice"
            type="number"
            value={formData.oldPrice === 0 ? "" : formData.oldPrice}
            onChange={(e) =>
              onFormDataChange({ oldPrice: Number(e.target.value) })
            }
            placeholder="0"
            min="0"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="discount">Giảm giá (%)</Label>
          <Input
            id="discount"
            type="number"
            value={formData.discount === 0 ? "" : formData.discount}
            onChange={(e) =>
              onFormDataChange({ discount: Number(e.target.value) })
            }
            placeholder="0"
            min="0"
            max="100"
          />
        </div>
        {/* Hiển thị giá mới được tính toán */}
        <div>
          <Label>Giá mới (VNĐ)</Label>
          <div className="p-3 bg-green-50 border border-green-200 rounded-md">
            <span className="text-lg font-semibold text-green-600">
              {formatCurrency(newPrice)} VNĐ
            </span>
            {formData.discount > 0 && (
              <span className="ml-2 text-sm text-gray-500">
                (Giảm {formData.discount}%)
              </span>
            )}
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Mô tả</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => onFormDataChange({ description: e.target.value })}
          placeholder="Nhập mô tả sản phẩm"
          rows={3}
        />
      </div>
    </>
  );
}
