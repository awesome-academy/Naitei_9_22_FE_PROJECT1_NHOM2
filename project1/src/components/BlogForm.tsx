import React, { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import { createBlog } from "@/services/BlogService";
import { uploadImagesToServer } from "@/services/CloudinaryService";
import { getCategories, getTags } from "@/services/BlogService";
import { Category } from "@/types/Category";
import { Tag } from "@/types/Tag";
import { toast } from "react-toastify";
import BlogContentEditor from "./BlogContentEditor";
import MultiSelectBadge from "./MultiSelectBadge";
import BlogImageUploader from "./BlogImageUploader";
import { useAuth } from "@/contexts/AuthContext";
const BlogForm: React.FC = () => {
  const router = useRouter();
  const { currentUser } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState<number[]>([]);
  const [images, setImages] = useState<string[]>([]); // URLs from backend
  const [uploading, setUploading] = useState(false);
  const [tags, setTags] = useState<number[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<Category[]>([]);
  const [tagOptions, setTagOptions] = useState<Tag[]>([]);

  useEffect(() => {
    getCategories().then((cats) => {
      setCategoryOptions(cats);
    });
    getTags().then((tags) => {
      setTagOptions(tags);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setUploading(true);
      // Upload images via backend API
      const imageInput = document.getElementById(
        "blog-images"
      ) as HTMLInputElement;
      let imageUrls: string[] = [];
      if (imageInput && imageInput.files && imageInput.files.length > 0) {
        try {
          imageUrls = await uploadImagesToServer(Array.from(imageInput.files));
        } catch (err) {
          console.error("Image upload error:", err);
          toast.error("Lỗi upload ảnh!");
          setUploading(false);
          return;
        }
      }
      await createBlog({
        title,
        description,
        contents: content,
        categories,
        images: imageUrls,
        tags,
        author_id: currentUser?.id,
      });
      toast.success("Đăng bài thành công!");
      setTitle("");
      setDescription("");
      setContent("");
      setCategories([]);
      setImages([]);
      setTags([]);
      // Redirect to blog list page
      router.push("/blog");
    } catch (err) {
      console.error("Blog create error:", err);
      toast.error("Đăng bài thất bại!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-green-100">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-green-700 mb-2 tracking-tight">
              Đăng bài Blog mới
            </h2>
            <p className="text-gray-500">
              Chia sẻ thông tin, kinh nghiệm, cảm nhận của bạn!
            </p>
          </div>
          <div>
            <Label htmlFor="blog-title" className="mb-2 block">
              Tiêu đề bài viết
            </Label>
            <Input
              id="blog-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Tiêu đề bài viết"
              required
            />
          </div>
          <div>
            <Label htmlFor="blog-description" className="mb-2 block">
              Mô tả ngắn
            </Label>
            <Textarea
              id="blog-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả ngắn"
              required
              rows={3}
            />
          </div>
          <div>
            <Label htmlFor="blog-content" className="mb-2 block">
              Nội dung bài viết
            </Label>
            <BlogContentEditor value={content} onChange={setContent} />
          </div>
          <MultiSelectBadge
            label="Chọn chuyên mục"
            options={categoryOptions}
            value={categories}
            onChange={setCategories}
          />
          <MultiSelectBadge
            label="Chọn tag"
            options={tagOptions}
            value={tags}
            onChange={setTags}
          />
          <BlogImageUploader
            uploading={uploading}
            onChange={(files) => {
              if (files) {
                setImages(
                  Array.from(files).map((file) => URL.createObjectURL(file))
                );
              } else {
                setImages([]);
              }
            }}
          />
          <button
            type="submit"
            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-700 text-white font-bold rounded-xl shadow hover:from-green-600 hover:to-green-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 transition-all duration-200"
            disabled={uploading}
          >
            {uploading ? "Đang đăng..." : "Đăng bài"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogForm;
