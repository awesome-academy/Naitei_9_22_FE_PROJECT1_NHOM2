import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProductImagesSectionProps } from "./types";
import Image from "next/image";

export default function ProductImagesSection({
  images,
  onImagesChange,
}: ProductImagesSectionProps) {
  const [newImage, setNewImage] = useState("");

  const addImage = () => {
    if (newImage.trim()) {
      onImagesChange([...images, newImage.trim()]);
      setNewImage("");
    }
  };

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Label>Hình ảnh *</Label>
      <div className="flex gap-2 mb-2">
        <Input
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
          placeholder="URL hình ảnh"
        />
        <Button type="button" onClick={addImage} variant="outline">
          Thêm ảnh
        </Button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {images.map((image, index) => (
          <div key={index} className="relative">
            <Image
              src={image}
              alt={`Image ${index + 1}`}
              width={100}
              height={100}
              className="w-full h-20 object-cover rounded border"
            />
            <Button
              type="button"
              onClick={() => removeImage(index)}
              variant="destructive"
              size="sm"
              className="absolute top-0 right-0 w-6 h-6 p-0"
            >
              ×
            </Button>
          </div>
        ))}
      </div>
      {images.length === 0 && (
        <p className="text-sm text-gray-500 mt-1">
          Vui lòng thêm ít nhất một hình ảnh
        </p>
      )}
    </div>
  );
}
