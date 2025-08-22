import { Product, Review } from "../types/Product";
import axiosInstance from "./AxiosCustom";
import { getCookie, COOKIE_NAMES } from "@/utils/cookies";

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
    const response = await axiosInstance.post(`/wishlist`, {productId}, {
      headers: {
        Authorization: `Bearer ${getCookie(COOKIE_NAMES.AUTH_TOKEN)}`
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getWishlist = async () => {
  const res = await axiosInstance.get(`/wishlist`, {
    headers: {
      Authorization: `Bearer ${getCookie(COOKIE_NAMES.AUTH_TOKEN)}`
    }
  });
  return res.data as Product[];
}

export const removeFromWishlist = async (productId: number | string) => {
  const res = await axiosInstance.delete(`/wishlist/${productId}`, {
    headers: {
      Authorization: `Bearer ${getCookie(COOKIE_NAMES.AUTH_TOKEN)}`
    }
  });
  return res.data;
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

export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    if (!query.trim()) {
      return [];
    }
    
    const response = await axiosInstance.get(`/products/search?q=${encodeURIComponent(query)}`);
    
    if (response.data && response.data.products) {
      return response.data.products;
    }
    
    return Array.isArray(response.data) ? response.data : [];
    
  } catch (error) {
    console.error('Error searching products:', error);
    throw error;
  }
};

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
    throw error;
  }
}

export const getAllType = async (): Promise<string[]> => {
  try {
    const products = await getProducts();
    // Gom tất cả các type lại thành một mảng phẳng
    const allTypes: string[] = products
      .filter((product: Product) => Array.isArray(product.type))
      .flatMap((product: Product) => product.type as string[]);
    const uniqueTypes: string[] = [];
    allTypes.forEach((type) => {
      if (!uniqueTypes.includes(type)) {
        uniqueTypes.push(type);
      }
    });
    return uniqueTypes;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách type:", error);
    throw error;
  }
};



// Interface cho API payload (không có trường tags)
interface ProductAPIPayload {
  id?: number;
  name: string;
  oldPrice: number;
  price: number;
  discount: number;
  images: string[];
  description: string;
  category: string;
  rating: number;
  inStock: boolean;
  specifications?: Record<string, string>;
  newArrival: boolean;
  type: string[];
}

// Hàm tạo sản phẩm mới
export const createProduct = async (productData: Omit<Product, "id">): Promise<Product> => {
  try {
    // Tạo payload với trường type từ tags
    const apiPayload: ProductAPIPayload = {
      ...productData,
      type: productData.tags || productData.type || [], // Ưu tiên tags, fallback về type
    };

    const response = await axiosInstance.post<Product>("/products", apiPayload);

    return response.data;
  } catch (error) {
    console.error("Lỗi khi tạo sản phẩm:", error);
    throw error;
  }
};

// Hàm cập nhật sản phẩm theo id
export const updateProductById = async (id: number | string, productData: Partial<Product>): Promise<Product> => {
  try {
    // Tạo payload với trường type từ tags
    const apiPayload: Partial<ProductAPIPayload> = {
      ...productData,
      type: productData.tags || productData.type || [], // Ưu tiên tags, fallback về type
    };

    const response = await axiosInstance.put(`/products/${id}`, apiPayload);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi cập nhật sản phẩm:", error);
    throw error;
  }
};

// Hàm xoá sản phẩm theo id
export const deleteProductById = async (id: number | string): Promise<void> => {
  try {
    await axiosInstance.delete(`/products/${id}`);
  } catch (error) {
    console.error("Lỗi khi xoá sản phẩm:", error);
    throw error;
  }
};



