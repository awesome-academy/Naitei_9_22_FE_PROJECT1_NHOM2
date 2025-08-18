import axiosInstance from "./AxiosCustom";
import { Blog } from "@/types/Blog";
import { Category } from "@/types/Category";
import { Comment } from "@/types/Comment";
import { Tag } from "@/types/Tag";

/* ------ BLOGS ------ */
export const getBlogs = async (): Promise<Blog[]> => {
  const { data } = await axiosInstance.get<Blog[]>("/blogs");
  return data;
};

export const getBlog = async (id: number): Promise<Blog> => {
  const { data } = await axiosInstance.get<Blog>(`/blogs/${id}`);
  return data;
};

/* ------ CATEGORIES & TAGS ------ */
export const getCategories = async (): Promise<Category[]> => {
  const { data } = await axiosInstance.get<Category[]>("/categories");
  return data;
};

export const getTags = async (): Promise<Tag[]> => {
  const { data } = await axiosInstance.get<Tag[]>("/tags");
  return data;
};

/* ------ COMMENTS ------ */
export const getComments = async (): Promise<Comment[]> => {
  const { data } = await axiosInstance.get<Comment[]>("/comments");
  return data;
};

export const getCommentsByBlog = async (blogId: number): Promise<Comment[]> => {
  const { data } = await axiosInstance.get<Comment[]>(
    `/comments?blogId=${blogId}`
  );
  return data;
};

export const addComment = async (
  comment: Omit<Comment, "id">
): Promise<Comment> => {
  try {
    // JSON server sẽ tự động tạo ID khi POST
    const response = await axiosInstance.post<Comment>("/comments", comment);
    return response.data;
  } catch (error) {
    console.error("Error adding comment:", error);
    throw error;
  }
};

export const deleteComment = async (commentId: number): Promise<void> => {
  try {
    await axiosInstance.delete(`/comments/${commentId}`);
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
};
