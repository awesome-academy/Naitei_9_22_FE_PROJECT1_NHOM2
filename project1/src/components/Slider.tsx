"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import type { CarouselApi } from "@/components/ui/carousel";
import { getActiveBanners } from "@/services/BannerService";
import { Banner } from "@/types/Banner";
import slider1 from "../../public/slider/slider_1.webp";
import slider2 from "../../public/slider/slider_2.webp";
import { Button } from "@/components/ui/button";

// Fallback slides nếu không có banner từ API
const fallbackSlides = [slider1, slider2];

export default function Slider() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        setLoading(true);
        const activeBanners = await getActiveBanners();
        if (activeBanners && activeBanners.length > 0) {
          // Sắp xếp theo thứ tự
          const sortedBanners = activeBanners.sort((a, b) => a.order - b.order);
          setBanners(sortedBanners);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    loadBanners();
  }, []);

  // Sử dụng banners từ API hoặc fallback slides
  const slides = banners.length > 0 ? banners : null;
  const shouldUseFallback = !slides && !loading;

  if (loading) {
    return (
      <div className="relative w-full h-48 sm:h-64 md:h-96 lg:h-[500px] bg-gray-200 animate-pulse">
        <div className="flex items-center justify-center h-full">
          <div className="text-gray-500">Đang tải banner...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        className="w-full"
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {slides
            ? // Hiển thị banners từ API
              slides.map((banner, index) => (
                <CarouselItem key={banner.id}>
                  <div className="relative w-full h-48 sm:h-64 md:h-96 lg:h-[500px]">
                    <Image
                      src={banner.image_url}
                      alt={banner.title}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      sizes="100vw"
                    />
                  </div>
                </CarouselItem>
              ))
            : shouldUseFallback
            ? // Hiển thị fallback slides
              fallbackSlides.map((slide, index) => (
                <CarouselItem key={index}>
                  <div className="relative w-full h-48 sm:h-64 md:h-96 lg:h-[500px]">
                    <Image
                      src={slide}
                      alt={`Slide ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                      sizes="100vw"
                    />
                  </div>
                </CarouselItem>
              ))
            : null}
        </CarouselContent>

        <CarouselPrevious className="hidden md:flex left-4" />
        <CarouselNext className="hidden md:flex right-4" />

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {(slides || (shouldUseFallback ? fallbackSlides : [])).map(
            (_, index) => (
              <Button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`w-[12px] h-[12px] min-w-0 min-h-0 p-0 rounded-full transition-colors ${
                  current === index ? "bg-white" : "bg-white/50"
                }`}
                style={{ minWidth: 0, minHeight: 0 }}
              />
            )
          )}
        </div>
      </Carousel>
    </div>
  );
}
