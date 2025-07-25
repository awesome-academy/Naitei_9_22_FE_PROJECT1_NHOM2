import { Product } from "../types/Product";
const API_URL = process.env.NEXT_PUBLIC_API_URL 

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/landingProduct`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return await res.json();
}

export async function getBestSellers(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/bestSellers`);
  if (!res.ok) throw new Error("Failed to fetch best sellers");
  return await res.json();
}

export async function getPromotions(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/promotions`);
  if (!res.ok) throw new Error("Failed to fetch promotions");
  return await res.json();
}

export async function getNewArrival(): Promise<Product[]> {
  const res = await fetch(`${API_URL}/newArrival`);
  if (!res.ok) throw new Error("Failed to fetch new arrivals");
  return await res.json();
}

