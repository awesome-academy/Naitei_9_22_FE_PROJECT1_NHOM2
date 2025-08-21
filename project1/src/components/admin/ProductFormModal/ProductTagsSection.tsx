import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductTagsSectionProps } from "./types";

export default function ProductTagsSection({
  tags,
  onTagsChange,
  existingTags,
}: ProductTagsSectionProps) {
  const [newTag, setNewTag] = useState("");

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      onTagsChange([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const selectExistingTag = (tag: string) => {
    if (!tags.includes(tag)) {
      onTagsChange([...tags, tag]);
    }
  };

  return (
    <div>
      <Label>Danh mục sản phẩm *</Label>

      {/* Chọn từ danh mục có sẵn */}
      {existingTags.length > 0 && (
        <div className="mb-4">
          <Label className="text-sm text-gray-600 mb-2 block">
            Chọn từ danh mục có sẵn:
          </Label>
          <div className="flex flex-wrap gap-2">
            {existingTags.map((tag) => (
              <Badge
                key={tag}
                variant={tags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer hover:bg-blue-50"
                onClick={() => selectExistingTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      <Separator className="my-4" />

      {/* Thêm danh mục mới */}
      <div className="flex gap-2 mb-2">
        <Input
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Nhập danh mục mới"
        />
        <Button type="button" onClick={addTag} variant="outline">
          Thêm danh mục
        </Button>
      </div>

      {/* Hiển thị danh mục đã chọn */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="flex items-center gap-1"
            >
              {tag}
              <Button
                type="button"
                onClick={() => removeTag(tag)}
                variant="ghost"
                size="sm"
                className="w-4 h-4 p-0 hover:bg-red-100 hover:text-red-600"
              >
                ×
              </Button>
            </Badge>
          ))}
        </div>
      )}

      {tags.length === 0 && (
        <p className="text-sm text-gray-500 mt-1">
          Vui lòng chọn hoặc thêm ít nhất một danh mục
        </p>
      )}
    </div>
  );
}
