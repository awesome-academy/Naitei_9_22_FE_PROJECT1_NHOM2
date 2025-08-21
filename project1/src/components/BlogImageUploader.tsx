import React from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface BlogImageUploaderProps {
  uploading: boolean;
  onChange: (files: FileList | null) => void;
}

const BlogImageUploader: React.FC<BlogImageUploaderProps> = ({
  uploading,
  onChange,
}) => (
  <div className="mb-3">
    <Label htmlFor="blog-images" className="mb-1 font-semibold">
      Chọn ảnh
    </Label>
    <Input
      id="blog-images"
      type="file"
      multiple
      accept="image/*"
      disabled={uploading}
      onChange={(e) => onChange(e.target.files)}
    />
  </div>
);

export default BlogImageUploader;
