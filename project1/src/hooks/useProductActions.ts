"use client";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Product } from "@/types/Product";
import { addToWishlist, getWishlist } from "@/services/ProductService";
import { useCallback } from "react";

export function useProductActions() {
  const router = useRouter();

  const search = useCallback((product: Product, e?: React.MouseEvent) => {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    if (!product) return;
    router.push(`/products/${product.id}`);
  }, [router]);

  const addWishlist = useCallback(async (productId: number, e?: React.MouseEvent) => {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    try {
      const wishlist = await getWishlist();
      const exists = wishlist.some((p) => p.id === productId);
      if (exists) {
        toast.info("Sản phẩm đã có trong danh sách yêu thích");
        return;
      }
      await addToWishlist(productId);
      toast.success("Đã thêm vào danh sách yêu thích");
    } catch (error: any) {
      const status = error?.response?.status;
      if (status === 401) {
        toast.error("Vui lòng đăng nhập để sử dụng danh sách yêu thích");
      } else {
        toast.error("Có lỗi xảy ra");
      }
    }
  }, []);

  return { search, addWishlist };
}


