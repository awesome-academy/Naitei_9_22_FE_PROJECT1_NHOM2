export interface ProductFormData {
  name: string;
  oldPrice: number;
  discount: number;
  description: string;
  inStock: boolean;
  newArrival: boolean;
}

export interface ProductImagesSectionProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
}

export interface ProductTagsSectionProps {
  tags: string[];
  onTagsChange: (tags: string[]) => void;
  existingTags: string[];
}

export interface ProductSpecificationsSectionProps {
  specifications: Record<string, string>;
  onSpecificationsChange: (specs: Record<string, string>) => void;
}

export interface ProductBasicInfoSectionProps {
  formData: ProductFormData;
  onFormDataChange: (data: Partial<ProductFormData>) => void;
} 
