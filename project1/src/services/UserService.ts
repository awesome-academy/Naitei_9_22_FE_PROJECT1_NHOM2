import axiosInstance from "./AxiosCustom";
import { User } from "@/types/User";

export const getUsers = async (): Promise<User[]> => {
  const { data } = await axiosInstance.get<User[]>("/users");
  return data;
};
