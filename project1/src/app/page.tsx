"use client";
import NewArrival from "@/components/NewArrival";
import FeaturedProducts from "../components/LandingProduct";
import MostBuy from "../components/MostBuy";
import OnSale from "../components/OnSale";
import Slider from "../components/Slider";
import Image from "next/image";
import NewsCard from "@/components/NewsCard";
import img_demo from "../../public/slider/banner.png";
import img3 from "../../public/dataset/spx2-3.png";
import img4 from "../../public/dataset/spx2-4.png";
import img5 from "../../public/dataset/spx2-5.png";

const newsList = [
  {
    image: img3,
    date: "Thứ 7 ,ngày 31, tháng 12, năm 2015",
    title: "15 thiết kế phòng ngủ tuyệt đẹp làm vạn người mê",
    description:
      "Cùng Sài Gòn Hoa tìm hiểu một vài xu hướng thiết kế sân vườn được ưa chuộng hiện nay nhé! Kết hợp hàng rào",
  },
  {
    image: img4,
    date: "Thứ 7 ,ngày 31, tháng 12, năm 2015",
    title: "Tạo Tiểu Cảnh Góc Sân Cho Nhà Phố, Biệt Thự Đẹp",
    description:
      "Khi bước từ ngoài ngõ vào hay từ trong nhà đi ra, góc sân luôn là điểm nhìn đầu tiên của chúng ta.",
  },
  {
    image: img5,
    date: "Thứ 7 ,ngày 31, tháng 12, năm 2015",
    title: "Cách bố trí hoa chậu trước cửa ấn tượng",
    description:
      "Như thể hiện sự thân thiện cũng như sự hiểu khách của gia chủ, phần không gian trước cửa",
  },
];

export default function Home() {
  return (
    <>
      {/* Slider Section - Full Width */}
      <Slider />

      {/* Featured Products Section Header */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mt-4 sm:mt-6">
        <h2 className="text-lg sm:text-xl font-semibold border-b-2 border-green-600 mb-4 sm:mb-5 text-green-600 pb-1">
          Sản phẩm nổi bật
        </h2>
      </div>

      <FeaturedProducts />

      {/* Most Buy & On Sale - Combined - Conditional margin */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-8 sm:mb-20 -mt-4 sm:-mt-60 lg:-mt-72">
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-6 sm:gap-8">
          {/* MostBuy - Full width on mobile, 2 cols on desktop */}
          <div className="lg:col-span-2 order-2 lg:order-1 mt-2 sm:mt-3">
            <MostBuy />
          </div>
          {/* OnSale - Full width on mobile, 5 cols on desktop */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <OnSale />
          </div>
        </div>
      </div>

      {/* Banner Image */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mb-6 sm:mb-8">
        <Image
          src={img_demo}
          alt="Xương rồng Đà Lạt"
          width={1200}
          height={300}
          className="w-full h-auto object-cover rounded-lg shadow-md"
          priority={false}
        />
      </div>

      {/* New Arrival */}
      <NewArrival />

      {/* News Section */}
      <section className="py-6 sm:py-10">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <h2 className="text-lg sm:text-xl font-semibold border-b-2 border-green-600 mb-4 sm:mb-5 text-green-600 pb-1">
            Tin tức
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {newsList.map((news, idx) => (
              <NewsCard key={idx} {...news} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

