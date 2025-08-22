export interface Product {
  id: number;
  name: string;
  oldPrice: number;
  price: number; // Giá sau khi giảm giá
  discount: number;
  images: string[];
  description: string;
  category: string;
  rating: number;
  inStock: boolean;
  specifications?: Record<string, string>;
  newArrival: boolean;
  type?: string[];
  tags?: string[]; // Thêm trường tags để sử dụng khi tạo/update
}


export interface Review {
  id: number;
  userId: number;
  productId: number;
  rating: number;
  comment: string;
  userName: string;
  createdAt: string;
}

// Helper function to calculate current price from oldPrice
export const getCurrentPrice = (product: Product): number => {
  return product.discount > 0 
    ? Math.round(product.oldPrice * (1 - product.discount / 100))
    : product.oldPrice;
};

// Helper function to format price with dots (200000 -> 200.000)
export const formatPrice = (price: number): string => {
  return Math.round(price).toLocaleString("de-DE");
};

// Helper function to format oldPrice directly
export const formatOldPrice = (product: Product): string => {
  return formatPrice(product.oldPrice);
};

// Helper function to format current price from oldPrice
export const formatCurrentPrice = (product: Product): string => {
  return formatPrice(getCurrentPrice(product));
};

