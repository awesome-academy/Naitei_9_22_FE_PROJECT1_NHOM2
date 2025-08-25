"use client"
export const dynamic = "force-dynamic"; // hoặc: export const revalidate = 0;

import { Suspense } from "react";
import SearchClient from "@/components/SearchClient";

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchClient />
    </Suspense>
  );
}
