export const dynamic = "force-dynamic"; // hoặc: export const revalidate = 0;

import { Suspense } from "react";
import ProductsClient from "../../components/ProductsClient";

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsClient />
    </Suspense>
  );
}
