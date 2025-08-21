import React from "react";
import { Textarea } from "./ui/textarea";

interface BlogContentEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const BlogContentEditor: React.FC<BlogContentEditorProps> = ({
  value,
  onChange,
}) => (
  <Textarea
    placeholder="Nội dung bài viết"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    required
    rows={18}
    className="mb-3"
  />
);

export default BlogContentEditor;
