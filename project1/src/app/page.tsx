"use client";
import NewArrival from "@/components/NewArrival";
import FeaturedProducts from "../components/LandingProduct";
import MostBuy from "../components/MostBuy";
import OnSale from "../components/OnSale";
import Slider from "../components/Slider";
import Image from "next/image";
import NewsCard from "@/components/NewsCard";
import Loading from "@/components/Loading";
import img_demo from "../../public/slider/banner.png";
import NewsletterPopup from "@/components/Popup";
import { useBlogData } from "@/hooks/useBlogData";

export default function Home() {
  const { blogs, loading, error } = useBlogData();
  
  // Lấy 3 blog mới nhất
  const latestBlogs = blogs.slice(0, 3);

  return (
    <>
      <NewsletterPopup delay={50} />
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
          {loading ? (
            <Loading message="Đang tải tin tức..." />
          ) : error ? (
            <div className="text-red-500 text-center py-8">
              <p>Lỗi khi tải tin tức: {error}</p>
            </div>
          ) : latestBlogs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {latestBlogs.map((blog) => (
                <NewsCard 
                  key={blog.id} 
                  image={blog.images[0] || '/dataset/unavailable.JPG'}
                  date={blog.date}
                  title={blog.title}
                  description={blog.description || blog.contents.substring(0, 100) + '...'}
                />
              ))}
            </div>
          ) : (
            <div className="text-gray-500 text-center py-8">
              <p>Chưa có tin tức nào.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}


