import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Product } from "@/types/Product";
import { ProductFormData } from "./types";
import ProductBasicInfoSection from "./ProductBasicInfoSection";
import ProductImagesSection from "./ProductImagesSection";
import ProductTagsSection from "./ProductTagsSection";
import ProductSpecificationsSection from "./ProductSpecificationsSection";

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, "id">) => Promise<void>;
  product?: Product | null;
  title?: string;
  existingTags?: string[];
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  product = null,
  title = null,
  existingTags = [],
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    oldPrice: 0,
    discount: 0,
    description: "",
    inStock: true,
    newArrival: false,
  });

  const [images, setImages] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [specifications, setSpecifications] = useState<Record<string, string>>(
    {}
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form khi đóng mở
  useEffect(() => {
    if (isOpen) {
      if (product) {
        setFormData({
          name: product.name || "",
          oldPrice: product.oldPrice || 0,
          discount: product.discount || 0,
          description: product.description || "",
          inStock: product.inStock !== undefined ? product.inStock : true,
          newArrival: product.newArrival || false,
        });
        setImages(product.images || []);
        setTags(product.type || []);
        setSpecifications(product.specifications || {});
      } else {
        setFormData({
          name: "",
          oldPrice: 0,
          discount: 0,
          description: "",
          inStock: true,
          newArrival: false,
        });
        setImages([]);
        setTags([]);
        setSpecifications({});
      }
    }
  }, [isOpen, product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Tính toán giá mới
      const calculatedPrice =
        formData.oldPrice > 0
          ? Math.round(formData.oldPrice * (1 - formData.discount / 100))
          : formData.oldPrice;

      const productData = {
        ...formData,
        images,
        tags,
        specifications,
        price: calculatedPrice,
        rating: 0,
        reviewCount: 0,
        category: "Cây cảnh",
      };

      await onSave(productData);
      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormDataChange = (data: Partial<ProductFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="!w-[35vw] !max-w-none !max-h-[90vh] overflow-y-auto overflow-x-hidden !p-6"
        style={{minWidth: "1000px",}}>
        <DialogHeader>
          <DialogTitle>
            {title || (product ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới")}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="w-full">
          {/* Layout 2 cột 1:1 */}
          <div className="grid grid-cols-1 lg:grid-cols-[500px_420px] gap-8 justify-center w-full">
            <div className="space-y-6 min-w-0">
              {/* Basic Information */}
              <ProductBasicInfoSection
                formData={formData}
                onFormDataChange={handleFormDataChange}
              />

              {/* Images */}
              <ProductImagesSection images={images} onImagesChange={setImages} />
            </div>

            <div className="space-y-6 min-w-0">
              {/* Tags */}
              <ProductTagsSection
                tags={tags}
                onTagsChange={setTags}
                existingTags={existingTags}
              />

              {/* Specifications */}
              <ProductSpecificationsSection
                specifications={specifications}
                onSpecificationsChange={setSpecifications}
              />

              {/* Checkboxes */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inStock"
                    checked={formData.inStock}
                    onCheckedChange={(checked: boolean) =>
                      handleFormDataChange({ inStock: checked })
                    }
                  />
                  <Label htmlFor="inStock">Còn hàng</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="newArrival"
                    checked={formData.newArrival}
                    onCheckedChange={(checked: boolean) =>
                      handleFormDataChange({ newArrival: checked })
                    }
                  />
                  <Label htmlFor="newArrival">Sản phẩm mới</Label>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-8">
            <Button type="button" variant="outline" onClick={onClose}>
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={
                isSubmitting || images.length === 0 || tags.length === 0
              }
            >
              {isSubmitting ? "Đang lưu..." : "Lưu sản phẩm"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormModal;
