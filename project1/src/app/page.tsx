import NewArrival from "@/components/NewArrival";
import FeaturedProducts from "../components/LandingProduct";
import MostBuy from "../components/MostBuy";
import OnSale from "../components/OnSale";
import Slider from "../components/Slider";
import Image from "next/image";
import NewsCard from "@/components/NewsCard";

const newsList = [
  {
    image: "/dataset/spx2-3.png",
    date: "Thứ 7 ,ngày 31, tháng 12, năm 2015",
    title: "15 thiết kế phòng ngủ tuyệt đẹp làm vạn người mê",
    description:
      "Cùng Sài Gòn Hoa tìm hiểu một vài xu hướng thiết kế sân vườn được ưa chuộng hiện nay nhé! Kết hợp hàng rào",
  },
  {
    image: "/dataset/spx2-4.png",
    date: "Thứ 7 ,ngày 31, tháng 12, năm 2015",
    title: "Tạo Tiểu Cảnh Góc Sân Cho Nhà Phố, Biệt Thự Đẹp",
    description:
      "Khi bước từ ngoài ngõ vào hay từ trong nhà đi ra, góc sân luôn là điểm nhìn đầu tiên của chúng ta.",
  },
  {
    image: "/dataset/spx2-5.png",
    date: "Thứ 7 ,ngày 31, tháng 12, năm 2015",
    title: "Cách bố trí hoa chậu trước cửa ấn tượng",
    description:
      "Như thể hiện sự thân thiện cũng như sự hiểu khách của gia chủ, phần không gian trước cửa",
  },
];

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
            <MostBuy/>
          </div>
          <div className="lg:col-span-5">
            <OnSale />
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

    <NewArrival/>

    <section className="py-10">
      <div className="max-w-[1200px] mx-auto px-6">
        <h2 className="text-xl font-semibold border-b-2 border-green-600 mb-5 text-green-600">
          Tin tức
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsList.map((news, idx) => (
            <NewsCard key={idx} {...news} />
          ))}
        </div>
      </div>
    </section>


    </div>
  );
}
