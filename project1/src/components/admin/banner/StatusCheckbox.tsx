import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface StatusCheckboxProps {
  isActive: boolean;
  onChange: (isActive: boolean) => void;
  disabled?: boolean;
}

export default function StatusCheckbox({
  isActive,
  onChange,
  disabled,
}: StatusCheckboxProps) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="is_active"
        checked={isActive}
        onCheckedChange={(checked) => onChange(!!checked)}
        disabled={disabled}
      />
      <Label htmlFor="is_active" className="text-sm font-medium">
        Hiển thị banner trên trang chủ
      </Label>
    </div>
  );
}
