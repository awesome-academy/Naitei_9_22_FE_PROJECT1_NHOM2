import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageInputSectionProps {
  imageInputType: "url" | "upload";
  onImageTypeChange: (type: "url" | "upload") => void;
  imageUrl: string;
  onImageUrlChange: (url: string) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

export default function ImageInputSection({
  imageInputType,
  onImageTypeChange,
  imageUrl,
  onImageUrlChange,
  onFileChange,
  disabled,
}: ImageInputSectionProps) {
  return (
    <div className="space-y-4">
      <Label className="text-sm font-medium">Ảnh Banner *</Label>

      {/* Radio buttons cho tùy chọn */}
      <div className="flex gap-6">
        <div className="flex items-center space-x-2">
          <Input
            type="radio"
            id="url-option"
            name="imageInput"
            checked={imageInputType === "url"}
            onChange={() => onImageTypeChange("url")}
            disabled={disabled}
            className="w-4 h-4"
          />
          <Label htmlFor="url-option" className="text-sm">
            Dán link ảnh
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            type="radio"
            id="upload-option"
            name="imageInput"
            checked={imageInputType === "upload"}
            onChange={() => onImageTypeChange("upload")}
            disabled={disabled}
            className="w-4 h-4"
          />
          <Label htmlFor="upload-option" className="text-sm">
            Upload ảnh
          </Label>
        </div>
      </div>

      {/* Input URL */}
      {imageInputType === "url" && (
        <div className="space-y-2">
          <Input
            type="url"
            value={imageUrl}
            onChange={(e) => onImageUrlChange(e.target.value)}
            placeholder="https://example.com/image.jpg"
            disabled={disabled}
            className="w-full"
          />
          <p className="text-xs text-gray-500">
            Dán link ảnh từ internet (JPG, PNG, GIF)
          </p>
        </div>
      )}

      {/* Upload File */}
      {imageInputType === "upload" && (
        <div className="space-y-2">
          <Input
            id="banner-image-upload"
            type="file"
            accept="image/*"
            onChange={onFileChange}
            disabled={disabled}
            className="w-full"
          />
          <p className="text-xs text-gray-500">
            Chọn ảnh từ máy tính (JPG, PNG, GIF). Tối đa 5MB.
          </p>
        </div>
      )}
    </div>
  );
}
