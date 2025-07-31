import { useState, useEffect } from "react";
import {
  getBlogs,
  getCategories,
  getTags,
  getComments,
} from "@/services/BlogService";
import type { Blog } from "@/types/Blog";
import type { Category } from "@/types/Category";
import type { Comment } from "@/types/Comment";
import type { Tag } from "@/types/Tag";

interface UseBlogDataReturn {
  blogs: Blog[];
  categories: Category[];
  tags: Tag[];
  comments: Comment[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useBlogData = (): UseBlogDataReturn => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [blogsData, categoriesData, tagsData, commentsData] =
        await Promise.all([
          getBlogs(),
          getCategories(),
          getTags(),
          getComments(),
        ]);

      setBlogs(blogsData);
      setCategories(categoriesData);
      setTags(tagsData);
      setComments(commentsData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Có lỗi xảy ra khi tải dữ liệu"
      );
      console.error("Error fetching blog data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    blogs,
    categories,
    tags,
    comments,
    loading,
    error,
    refetch: fetchData,
  };
};
