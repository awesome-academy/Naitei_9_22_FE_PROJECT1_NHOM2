import FeaturedProducts from "../components/LandingProduct";
import MostBuy from "../components/MostBuy";
import OnSale from "../components/OnSale";
import Slider from "../components/Slider";
import { Product } from "../types/Product";
import Image from "next/image";

// ✅ Hàm gắn id tự động
function addIdsToProducts(products: Omit<Product, "id">[]): Product[] {
  return products.map((product, index) => ({
    ...product,
    id: index + 1,
  }));
}

const bestSellers: Product[] = addIdsToProducts([
  {
    name: "Cây chân chim",
    price: 250000,
    oldPrice: 250000,
    image: "/dataset/spx2-4.png",
    discount: 0,
  },
  {
    name: "Cây Dạ Lam",
    price: 150000,
    oldPrice: 150000,
    image: "/dataset/spx2-5.png",
    discount: 0,
  },
  {
    name: "Cây Danh Dự",
    price: 450000,
    oldPrice: 450000,
    image: "/dataset/spx2-15.png",
    discount: 0,
  },
  {
    name: "Cây dạ búp đỏ",
    price: 200000,
    oldPrice: 200000,
    image: "/dataset/spx2-6.png",
    discount: 0,
  },
  {
    name: "Cây cọ ta",
    price: 300000,
    oldPrice: 300000,
    image: "/dataset/spx2-1.png",
    discount: 0,
  },
  {
    name: "Cây dứa nhỏ",
    price: 275000,
    oldPrice: 275000,
    image: "/dataset/spx2-13.png",
    discount: 0,
  },
]);

const promotions: Product[] = addIdsToProducts([
  {
    name: "Cây Danh Dự",
    price: 475000,
    oldPrice: 250000,
    image: "/dataset/spx2-15.png",
    discount: 25,
  },
  {
    name: "Cây dứa nhỏ",
    price: 668000,
    oldPrice: 250000,
    image: "/dataset/spx2-13.png",
    discount: 10,
  },
  {
    name: "Cây cọ ta",
    price: 770000,
    oldPrice: 250000,
    image: "/dataset/spx2-1.png",
    discount: 0,
  },
  {
    name: "Cây Dạ Lam",
    price: 555000,
    oldPrice: 250000,
    image: "/dataset/spx2-5.png",
    discount: 0,
  },
  {
    name: "Cây Danh Dự",
    price: 780000,
    oldPrice: 250000,
    image: "/dataset/spx2-15.png",
    discount: 0,
  },
  {
    name: "Cây dứa nhỏ",
    price: 680000,
    oldPrice: 250000,
    image: "/dataset/spx2-13.png",
    discount: 0,
  },
]);

export default function Home() {
  return (
    <div className="space-y-5">
      {/* Slider Section - Full Width */}
      <Slider />

      {/* Featured Products Section Header */}
      <div className="max-w-[1200px] mx-auto px-6 mt-[12px]">
        <h2 className="text-xl font-semibold border-b-2 border-green-600 mb-5 text-green-600 ">
          Sản phẩm nổi bật
        </h2>
      </div>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Most Buy & On Sale - Combined */}
      <div className="max-w-[1200px] mx-auto px-6 -mt-70 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          <div className="lg:col-span-2">
            <MostBuy products={bestSellers} />
          </div>
          <div className="lg:col-span-5">
            <OnSale products={promotions.slice(0, 6)} />
          </div>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 mb-8">
        <Image
          src="/slider/banner.png"
          alt="Xương rồng Đà Lạt"
          width={1200}
          height={300}
          className="w-full h-auto object-cover rounded-lg shadow-md"
        />
      </div>


    </div>
  );
}
