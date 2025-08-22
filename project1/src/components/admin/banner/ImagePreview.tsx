import React from "react";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface ImagePreviewProps {
  previewUrl: string;
  imageInputType: "url" | "upload";
  onImageError?: () => void;
}

export default function ImagePreview({
  previewUrl,
  imageInputType,
  onImageError,
}: ImagePreviewProps) {
  if (!previewUrl) return null;

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Xem trước</Label>
      <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden border">
        <Image
          src={previewUrl}
          alt="Preview"
          fill
          className="object-cover"
          sizes="(max-width: 600px) 100vw, 600px"
          onError={() => {
            if (imageInputType === "url") {
              onImageError?.();
            }
          }}
        />
      </div>
    </div>
  );
}
