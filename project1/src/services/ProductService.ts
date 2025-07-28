import { Product } from "../types/Product";
import axiosInstance from "./AxiosCustom";

export async function getProducts(): Promise<Product[]> {
  const response = await axiosInstance.get<Product[]>("/landingProduct");
  return response.data;
}

export async function getBestSellers(): Promise<Product[]> {
  const response = await axiosInstance.get<Product[]>("/bestSellers");
  return response.data;
}

export async function getPromotions(): Promise<Product[]> {
  const response = await axiosInstance.get<Product[]>("/promotions");
  return response.data;
}

export async function getNewArrival(): Promise<Product[]> {
  const response = await axiosInstance.get<Product[]>("/newArrival");
  return response.data;
}

