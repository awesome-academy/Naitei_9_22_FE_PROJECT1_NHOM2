import React from "react";
import { Button } from "@/components/ui/button";

interface FormActionsProps {
  onCancel: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isUploading: boolean;
  isSubmitting: boolean;
  isEdit: boolean;
}

export default function FormActions({
  onCancel,
  onSubmit,
  isUploading,
  isSubmitting,
  isEdit,
}: FormActionsProps) {
  return (
    <div className="flex justify-end gap-3 pt-4">
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isSubmitting || isUploading}
      >
        Hủy
      </Button>
      <Button
        type="submit"
        onClick={onSubmit}
        disabled={isUploading || isSubmitting}
        className="bg-blue-600 hover:bg-blue-700"
      >
        {isUploading
          ? "Đang upload..."
          : isSubmitting
          ? "Đang xử lý..."
          : isEdit
          ? "Cập nhật"
          : "Thêm mới"}
      </Button>
    </div>
  );
}
