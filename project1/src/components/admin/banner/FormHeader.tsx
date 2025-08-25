import React from "react";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface FormHeaderProps {
  isEdit: boolean;
}

export default function FormHeader({ isEdit }: FormHeaderProps) {
  return (
    <DialogHeader>
      <DialogTitle className="text-xl font-bold">
        {isEdit ? "Sửa Banner" : "Thêm Banner Mới"}
      </DialogTitle>
    </DialogHeader>
  );
}
