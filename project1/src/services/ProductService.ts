import { Product, Review } from "../types/Product";
import axiosInstance from "./AxiosCustom";

export async function getProducts(): Promise<Product[]> {
  const response = await axiosInstance.get<Product[]>("/products");
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

export const getProductById = async (id: number): Promise<Product> => {
    try{
        const response = await axiosInstance.get(`/products/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getRelatedProducts = async (category: string, excludeId: number): Promise<Product[]> => {
    try{
        const response = await axiosInstance.get(`/products?category=${category}&_limit=4`);
        return response.data.filter((product: Product) => product.id !== excludeId);
    } catch (error) {
        throw error;
    }
}


export const addToWishlist = async (productId: number) => {
  try{
    const response = await axiosInstance.post(`/wishlist`, {productId});
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getReviews = async (productId: number): Promise<Review[]> => {
  try{
    const response = await axiosInstance.get(`/reviews?productId=${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const submitReview = async (reviewData: Omit<Review, 'id'>): Promise<Review> => {
  try{
    const response = await axiosInstance.post(`/reviews`, reviewData);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getCategories = async (): Promise<{ name: string; count: number }[]> => {
  try {
    const products = await getProducts();
    
    const categoryCount: { [key: string]: number } = {};
    products.forEach((product: Product) => {
      const category = product.category;
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    const categoriesArray = Object.entries(categoryCount)
      .map(([name, count]) => ({
        name,
        count
      }))
      .sort((a, b) => {
        if (b.count !== a.count) {
          return b.count - a.count;
        }
        return a.name.localeCompare(b.name);
      });

    return categoriesArray;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}





