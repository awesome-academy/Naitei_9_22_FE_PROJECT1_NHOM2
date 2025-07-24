import { Product } from "../types/Product";

export async function getProducts(): Promise<Product[]> {
  const res = await fetch("http://localhost:3001/landingProduct");
  if (!res.ok) throw new Error("Failed to fetch products");
  return await res.json();
}

