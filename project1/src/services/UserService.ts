import axiosInstance from "./AxiosCustom";
import { User } from "@/types/User";
import { UserForComment } from "@/types/UserForComment";

// Transform user data từ frontend format sang backend format
const transformToBackend = (userData: Partial<User>) => {
  const { fullName, ...rest } = userData;
  return {
    ...rest,
    full_name: fullName, // Chuyển fullName thành full_name
  };
};

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
  const backendData = transformToBackend(userData);
  const { data } = await axiosInstance.post<User>("/users", backendData);
  return data;
};

export const updateUser = async (id: string, userData: Partial<User>): Promise<User> => {
  const backendData = transformToBackend(userData);
  const { data } = await axiosInstance.put<User>(`/users/${id}`, backendData);
  return data;
};

export const deleteUser = async (id: string): Promise<void> => {
  await axiosInstance.delete(`/users/${id}`);
};
