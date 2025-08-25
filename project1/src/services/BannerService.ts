import axiosInstance from "./AxiosCustom";
import {
  Banner,
  CreateBannerRequest,
  UpdateBannerRequest,
  SwapOrderRequest,
  BannerApiResponse,
} from "@/types/Banner";

// Lấy danh sách tất cả banners (sắp xếp theo order và createdAt)
export async function getBanners(): Promise<Banner[]> {
  try {
    const response = await axiosInstance.get<Banner[]>("/banners");
    return response.data;
  } catch (error) {
    console.error("Get banners error:", error);
    throw error;
  }
}

// Lấy danh sách banner đang active (để hiển thị trên trang chủ)
export async function getActiveBanners(): Promise<Banner[]> {
  try {
    const banners = await getBanners();
    return banners
      .filter(banner => banner.is_active)
      .sort((a, b) => a.order - b.order);
  } catch (error) {
    console.error("Get active banners error:", error);
    throw error;
  }
}

// Tạo banner mới
export async function createBanner(data: CreateBannerRequest): Promise<Banner> {
  try {
    const response = await axiosInstance.post<BannerApiResponse>("/banners", data);
    
    if (response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Failed to create banner");
    }
  } catch (error) {
    console.error("Create banner error:", error);
    throw error;
  }
}

// Cập nhật banner
export async function updateBanner(id: string, data: UpdateBannerRequest): Promise<Banner> {
  try {
    const response = await axiosInstance.put<BannerApiResponse>(`/banners/${id}`, data);
    
    if (response.data.success && response.data.data) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Failed to update banner");
    }
  } catch (error) {
    console.error("Update banner error:", error);
    throw error;
  }
}

// Xóa banner
export async function deleteBanner(id: string): Promise<void> {
  try {
    const response = await axiosInstance.delete<BannerApiResponse>(`/banners/${id}`);
    
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to delete banner");
    }
  } catch (error) {
    console.error("Delete banner error:", error);
    throw error;
  }
}

// Hoán đổi thứ tự giữa 2 banner
export async function swapBannerOrder(firstId: string, secondId: string): Promise<void> {
  try {
    const data: SwapOrderRequest = { firstId, secondId };
    const response = await axiosInstance.post<BannerApiResponse>("/banners/swap-order", data);
    
    if (!response.data.success) {
      throw new Error(response.data.message || "Failed to swap banner order");
    }
  } catch (error) {
    console.error("Swap banner order error:", error);
    throw error;
  }
}

// Xóa banner và tự động reorder các banner phía sau
export async function deleteBannerWithReorder(id: string): Promise<void> {
  try {
    // Lấy danh sách banner hiện tại để biết order của banner bị xóa
    const banners = await getBanners();
    const bannerToDelete = banners.find(b => b.id === id);
    
    if (!bannerToDelete) {
      throw new Error("Banner not found");
    }
    
    // Xóa banner
    await deleteBanner(id);
    
    // Tìm các banner có order lớn hơn banner bị xóa
    const bannersToReorder = banners.filter(b => b.order > bannerToDelete.order);
    
    if (bannersToReorder.length === 0) {
      return; // Không có banner nào cần reorder
    }
    
    // Cập nhật order cho từng banner (giảm đi 1)
    const updatePromises = bannersToReorder.map(banner => {
      const updateData: UpdateBannerRequest = {
        title: banner.title,
        image_url: banner.image_url,
        order: banner.order - 1,
        is_active: banner.is_active,
      };
      
      return updateBanner(banner.id, updateData).catch(error => {
        console.error(`Failed to reorder banner ${banner.id}:`, error);
        return null; // Return null for failed updates
      });
    });
    
    // Chờ tất cả updates hoàn thành
    await Promise.all(updatePromises);
    
  } catch (error) {
    console.error("Delete banner with reorder error:", error);
    throw error;
  }
}

// Client-side helper để reorder banners locally
export function reorderBannersAfterDelete(banners: Banner[], deletedBannerId: string): Banner[] {
  const bannerToDelete = banners.find(b => b.id === deletedBannerId);
  if (!bannerToDelete) return banners;
  
  return banners
    .filter(b => b.id !== deletedBannerId) // Loại bỏ banner đã xóa
    .map(banner => {
      // Giảm order của các banner có order lớn hơn banner bị xóa
      if (banner.order > bannerToDelete.order) {
        return { ...banner, order: banner.order - 1 };
      }
      return banner;
    })
    .sort((a, b) => a.order - b.order); // Sắp xếp lại theo order
}
