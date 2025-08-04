import { Product } from "@/types/Product";

interface ProductInfoTabProps {
  product: Product;
}

export default function ProductInfoTab({ product }: ProductInfoTabProps) {
  return (
    <div className="p-6 border-1 border-t-0 border-gray-300">
      <div className="prose max-w-none text-sm">
        <p className="text-gray-700 text-sm leading-relaxed mt-4">
          <span>Tên phổ thông: </span>
          {product.name}
        </p>
        
        {product.specifications && (
          <div className="mt-4 space-y-4 text-sm">
            <ul className="space-y-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <li key={key} className="text-gray-700">
                  <span>{key}:</span> {String(value)}
                </li>
              ))}
            </ul>
          </div>
        )}
        <p className="text-gray-700 text-sm leading-relaxed mt-4">
          {product.description}
        </p>
      </div>
    </div>
  );
}
