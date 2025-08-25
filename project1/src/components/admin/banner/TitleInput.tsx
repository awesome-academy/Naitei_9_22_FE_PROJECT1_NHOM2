import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface TitleInputProps {
  title: string;
  onChange: (title: string) => void;
  disabled?: boolean;
}

export default function TitleInput({
  title,
  onChange,
  disabled,
}: TitleInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="title" className="text-sm font-medium">
        Tiêu đề Banner *
      </Label>
      <Input
        id="title"
        type="text"
        value={title}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Nhập tiêu đề banner..."
        disabled={disabled}
        className="w-full"
      />
    </div>
  );
}
