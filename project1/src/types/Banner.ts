// Banner interface dựa trên schema từ backend
export interface Banner {
  id: string;
  title: string;
  image_url: string;
  order: number;
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
}

// Request để tạo banner mới
export interface CreateBannerRequest {
  title: string;
  image_url: string;
  is_active?: boolean;
}

// Request để cập nhật banner
export interface UpdateBannerRequest {
  title: string;
  image_url: string;
  order: number;
  is_active: boolean;
}

// Request để swap order giữa 2 banner
export interface SwapOrderRequest {
  firstId: string;
  secondId: string;
}

// Response format từ API
export interface BannerApiResponse {
  success: boolean;
  data?: Banner;
  message?: string;
  error?: string;
}

// Response format cho list banners
export interface BannerListResponse extends Omit<BannerApiResponse, 'data'> {
  data?: Banner[];
}
