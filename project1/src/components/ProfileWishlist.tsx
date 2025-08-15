"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/types/Product";
import { getWishlist, removeFromWishlist } from "@/services/ProductService";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImageSkeleton } from "@/components/ui/skeletons";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface ProfileWishlistProps {}

const ProfileWishlist: React.FC<ProfileWishlistProps> = () => {
  const [items, setItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const router = useRouter();
  const load = async () => {
    try {
      setLoading(true);
      const data = await getWishlist();
      setItems(data);
    } catch (e) {
      toast.error("Không tải được wishlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onRemove = async (productId: number) => {
    try {
      await removeFromWishlist(productId);
      setItems(prev => prev.filter(p => String(p.id) !== String(productId)));
      toast.success("Đã xóa khỏi danh sách yêu thích");
    } catch (e) {
      toast.error("Xóa thất bại");
    }
  };

  const handleClickProduct = (productId: number) => {
    router.push(`/products/${productId}`);
  };

  if (loading) return <div>Đang tải danh sách yêu thích...</div>;

  if (items.length === 0) return <div>Danh sách yêu thích trống.</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((p) => {
        const img = p.images?.[0] || null;
        return (
          <div key={p.id} className="flex gap-4 p-4 border border-gray-200 rounded cursor-pointer"
            onClick={() => handleClickProduct(p.id)}
          >
            <div className="relative w-28 h-28 bg-gray-100 overflow-hidden">
              {img && !imageErrors[img] ? (
                <Image src={img} alt={p.name} fill className="object-cover" onError={() => setImageErrors(prev => ({...prev, [img]: true}))} />
              ) : (
                <ImageSkeleton className="w-full h-full" />
              )}
            </div>
            <div className="flex-1">
              <div className="font-medium text-gray-900 mb-1">{p.name}</div>
              <div className="text-sm text-gray-600 mb-2 line-clamp-2">{p.description}</div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={(e) => {
                  e.stopPropagation();
                  onRemove(p.id);
                }}>
                  Xóa
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileWishlist;


