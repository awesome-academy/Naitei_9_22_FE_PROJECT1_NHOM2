import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Package,
  DollarSign,
  Percent,
  Tag,
  Image as ImageIcon,
  FileText,
  Palette,
} from "lucide-react";

interface ProductVariant {
  id: string;
  name: string;
  price: number;
  inStock: boolean;
}

interface ProductSpecification {
  [key: string]: string;
}

interface Product {
  id?: string;
  name: string;
  oldPrice: number;
  discount: number;
  type: string[];
  images: string[];
  description: string;
  category: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  variants: ProductVariant[];
  specifications: ProductSpecification;
  care_instructions: string;
  color: string[];
  newArival: boolean;
}

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => Promise<void>;
  product?: Product | null;
  title?: string;
}

const ProductFormModal: React.FC<ProductFormModalProps> = ({
  isOpen,
  onClose,
  onSave,
  product = null,
  title = null,
}) => {
  const [formData, setFormData] = useState<
    Omit<Product, "variants" | "specifications" | "color">
  >({
    name: "",
    oldPrice: 0,
    discount: 0,
    type: [],
    images: [],
    description: "",
    category: "",
    rating: 0,
    reviewCount: 0,
    inStock: true,
    care_instructions: "",
    newArival: false,
  });

  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [specifications, setSpecifications] = useState<ProductSpecification>(
    {}
  );
  const [colors, setColors] = useState<string[]>([]);

  const [newColor, setNewColor] = useState("");
  const [newType, setNewType] = useState("");
  const [newImage, setNewImage] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset from khi đóng mở
  useEffect(() => {
    if (isOpen) {
      if (product) {
        setFormData({
          name: product.name || "",
          oldPrice: product.oldPrice || 0,
          discount: product.discount || 0,
          type: product.type || [],
          images: product.images || [],
          description: product.description || "",
          category: product.category || "",
          rating: product.rating || 0,
          reviewCount: product.reviewCount || 0,
          inStock: product.inStock !== undefined ? product.inStock : true,
          care_instructions: product.care_instructions || "",
          newArival: product.newArival || false,
        });
        setVariants(product.variants || []);
        setSpecifications(product.specifications || {});
        setColors(product.color || []);
      } else {
        setFormData({
          name: "",
          oldPrice: 0,
          discount: 0,
          type: [],
          images: [],
          description: "",
          category: "",
          rating: 0,
          reviewCount: 0,
          inStock: true,
          care_instructions: "",
          newArival: false,
        });
        setVariants([]);
        setSpecifications({});
        setColors([]);
      }
      setErrors({});
    }
  }, [isOpen, product]);

  const handleInputChange = (field: keyof typeof formData, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tên sản phẩm không được để trống";
    }

    if (formData.oldPrice <= 0) {
      newErrors.oldPrice = "Giá cũ phải lớn hơn 0";
    }

    if (formData.discount < 0 || formData.discount > 100) {
      newErrors.discount = "Giảm giá phải từ 0-100%";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Danh mục không được để trống";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Mô tả không được để trống";
    }

    if (formData.rating < 0 || formData.rating > 5) {
      newErrors.rating = "Đánh giá phải từ 0-5";
    }

    if (formData.reviewCount < 0) {
      newErrors.reviewCount = "Số đánh giá không được âm";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const productData: Product = {
        ...formData,
        variants,
        specifications,
        color: colors,
        id: product?.id || Date.now().toString(),
      };

      await onSave(productData);
      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addColor = () => {
    if (newColor && !colors.includes(newColor)) {
      setColors((prev) => [...prev, newColor]);
      setNewColor("");
    }
  };

  const removeColor = (color: string) => {
    setColors((prev) => prev.filter((c) => c !== color));
  };

  const addType = () => {
    if (newType && !formData.type.includes(newType)) {
      handleInputChange("type", [...formData.type, newType]);
      setNewType("");
    }
  };

  const removeType = (type: string) => {
    handleInputChange(
      "type",
      formData.type.filter((t) => t !== type)
    );
  };

  const addImage = () => {
    if (newImage && !formData.images.includes(newImage)) {
      handleInputChange("images", [...formData.images, newImage]);
      setNewImage("");
    }
  };

  const removeImage = (image: string) => {
    handleInputChange(
      "images",
      formData.images.filter((img) => img !== image)
    );
  };

  const modalTitle =
    title || (product ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            {modalTitle}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Tên sản phẩm *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Nhập tên sản phẩm"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category" className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Danh mục *
              </Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                placeholder="Nhập danh mục"
                className={errors.category ? "border-red-500" : ""}
              />
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category}</p>
              )}
            </div>

            {/* Old Price */}
            <div className="space-y-2">
              <Label htmlFor="oldPrice" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Giá cũ (VNĐ) *
              </Label>
              <Input
                id="oldPrice"
                type="text"
                value={
                  formData.oldPrice === 0
                    ? ""
                    : (formData.oldPrice || 0).toLocaleString("vi-VN")
                }
                onChange={(e) => {
                  const value = e.target.value;
                  const numericValue = value.replace(/,/g, "");
                  handleInputChange(
                    "oldPrice",
                    numericValue === "" ? 0 : Number(numericValue)
                  );
                }}
                onInput={(e) => {
                  const target = e.target as HTMLInputElement;
                  target.value = target.value.replace(/[^0-9]/g, "");
                }}
                placeholder="0"
                className={errors.oldPrice ? "border-red-500" : ""}
              />
              {errors.oldPrice && (
                <p className="text-sm text-red-500">{errors.oldPrice}</p>
              )}
            </div>

            {/* Discount */}
            <div className="space-y-2">
              <Label htmlFor="discount" className="flex items-center gap-2">
                <Percent className="h-4 w-4" />
                Giảm giá (%)
              </Label>
              <Input
                id="discount"
                type="number"
                value={formData.discount === 0 ? "" : formData.discount}
                onChange={(e) => {
                  const value = e.target.value;
                  handleInputChange(
                    "discount",
                    value === "" ? 0 : Number(value)
                  );
                }}
                placeholder="0"
                className={errors.discount ? "border-red-500" : ""}
              />
              {errors.discount && (
                <p className="text-sm text-red-500">{errors.discount}</p>
              )}
            </div>

            {/* New Price */}
            <div className="space-y-2">
              <Label htmlFor="oldPrice" className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Giá mới (VNĐ) *
              </Label>
              <Input
                id="newPrice"
                type="number"
                value={
                  0 ||
                  (
                    (formData.oldPrice * (100 - formData.discount)) /
                    100
                  ).toLocaleString("vi-VN")
                }
                onChange={(e) =>
                  handleInputChange("oldPrice", Number(e.target.value))
                }
                placeholder="0"
                className={`${
                  errors.oldPrice ? "border-red-500" : ""
                } text-red-500`}
                readOnly
              />
              {errors.oldPrice && (
                <p className="text-sm text-red-500">{errors.oldPrice}</p>
              )}
            </div>

            {/* Checkboxes */}
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="inStock"
                  checked={formData.inStock}
                  onCheckedChange={(checked) =>
                    handleInputChange("inStock", checked)
                  }
                />
                <Label htmlFor="inStock">Còn hàng</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="newArival"
                  checked={formData.newArival}
                  onCheckedChange={(checked) =>
                    handleInputChange("newArival", checked)
                  }
                />
                <Label htmlFor="newArival">Sản phẩm mới</Label>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Mô tả *
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Nhập mô tả sản phẩm"
                rows={3}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>

            {/* Care Instructions */}
            <div className="space-y-2">
              <Label
                htmlFor="care_instructions"
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Hướng dẫn chăm sóc
              </Label>
              <Textarea
                id="care_instructions"
                value={formData.care_instructions}
                onChange={(e) =>
                  handleInputChange("care_instructions", e.target.value)
                }
                placeholder="Nhập hướng dẫn chăm sóc"
                rows={2}
              />
            </div>

            {/* Types */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Loại sản phẩm
              </Label>
              <div className="flex gap-2 flex-wrap">
                {formData.type.map((type, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center gap-1"
                  >
                    {type}
                    <button
                      type="button"
                      onClick={() => removeType(type)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  placeholder="Thêm loại sản phẩm"
                  className="flex-1"
                />
                <Button type="button" onClick={addType} size="sm">
                  Thêm
                </Button>
              </div>
            </div>

            {/* Colors */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Màu sắc
              </Label>
              <div className="flex gap-2 flex-wrap">
                {colors.map((color, index) => (
                  <span
                    key={index}
                    className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm flex items-center gap-1"
                  >
                    {color}
                    <button
                      type="button"
                      onClick={() => removeColor(color)}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  placeholder="Thêm màu sắc"
                  className="flex-1"
                />
                <Button type="button" onClick={addColor} size="sm">
                  Thêm
                </Button>
              </div>
            </div>

            {/* Images */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                Hình ảnh
              </Label>
              <div className="flex gap-2 flex-wrap">
                {formData.images.map((image, index) => (
                  <span
                    key={index}
                    className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm flex items-center gap-1"
                  >
                    {image.substring(0, 30)}...
                    <button
                      type="button"
                      onClick={() => removeImage(image)}
                      className="text-green-600 hover:text-green-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="Thêm URL hình ảnh"
                  className="flex-1"
                />
                <Button type="button" onClick={addImage} size="sm">
                  Thêm
                </Button>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Hủy
          </Button>
          <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Đang lưu..." : product ? "Cập nhật" : "Thêm mới"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormModal;
