import axiosInstance from "./AxiosCustom";
import { User } from "@/types/User";
import { UserForComment } from "@/types/UserForComment";

export const getUsers = async (): Promise<User[]> => {
  const { data } = await axiosInstance.get<User[]>("/users");
  return data;
};

// Service tối ưu cho comment - chỉ lấy thông tin cần thiết
export const getUsersForComment = async (): Promise<UserForComment[]> => {
  const { data } = await axiosInstance.get<User[]>("/users");
  // Chỉ trả về những field cần thiết cho comment
  return data.map((user) => ({
    id: user.id,
    fullName: user.fullName,
    image: user.image,
  }));
};

export const getUserById = async (id: string) => {
  const { data } = await axiosInstance.get<User>(`/users/${id}`);
  return data;
};

export const updateUser = async (id: string, userData: Partial<User>) => {
  const { data } = await axiosInstance.put<User>(`/users/${id}`, userData);
  return data;
};
