"use client";

import { Product } from "@/types/Product";
import ProductInfoTab from "@/components/ProductInfoTab";
import ProductReviewTab from "@/components/ProductReviewTab";
import ProductTagsTab from "@/components/ProductTagsTab";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

interface ProductDetailTabsProps {
  product: Product;
  onWriteReview: () => void;
}

export default function ProductDetailTabs({ product, onWriteReview }: ProductDetailTabsProps) {
  // Custom tab styling to match original design
  const tabTriggerClass = `
    px-6 py-3 rounded-none border border-gray-300 border-t-2 border-t-transparent 
    data-[state=active]:border-t-gray-500 data-[state=active]:border-b-transparent data-[state=active]:bg-white 
    data-[state=active]:text-emerald-600 data-[state=active]:font-semibold
    hover:text-emerald-600 transition-colors text-gray-600
    relative data-[state=active]:z-10
  `.trim().replace(/\s+/g, ' ');

  const tabs = [
    { value: 'info', label: 'THÔNG TIN SẢN PHẨM' },
    { value: 'review', label: 'KHÁCH HÀNG ĐÁNH GIÁ' },
    { value: 'tags', label: 'THẺ / TAG' }
  ];

  return (
    <div className="bg-white mt-24">
      <Tabs defaultValue="info" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-transparent p-0 h-auto rounded-none">
          {tabs.map((tab) => (
            <TabsTrigger 
              key={tab.value}
              value={tab.value} 
              className={tabTriggerClass}
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        
        <TabsContent value="info" className="mt-0">
          <ProductInfoTab product={product} />
        </TabsContent>
        
        <TabsContent value="review" className="mt-0">
          <ProductReviewTab product={product} onWriteReview={onWriteReview} />
        </TabsContent>
        
        <TabsContent value="tags" className="mt-0">
          <ProductTagsTab product={product} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
