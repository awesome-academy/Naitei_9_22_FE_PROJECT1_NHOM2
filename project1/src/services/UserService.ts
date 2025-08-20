import axiosInstance from "./AxiosCustom";
import { User } from "@/types/User";
import { UserForComment } from "@/types/UserForComment";

export const getUsers = async (): Promise<User[]> => {
  const { data } = await axiosInstance.get<User[]>("/users");
  return data;
};

export const getUsersForComment = async (): Promise<UserForComment[]> => {
  const { data } = await axiosInstance.get<User[]>("/users");
  return data.map((user) => ({
    id: user.id,
    fullName: user.fullName
  }));
};

export const getUserById = async (id: string) => {
  const { data } = await axiosInstance.get<User>(`/users/${id}`);
  return data;
};

export const createUser = async (userData: Partial<User>): Promise<User> => {
  const { data } = await axiosInstance.post<User>("/users", userData);
  return data;
};

export const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
  const { data } = await axiosInstance.put<User>(`/users/${id}`, userData);
  return data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/users/${id}`);
};
