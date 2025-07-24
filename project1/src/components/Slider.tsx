"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const slides = [
  "/slider/slider_1.webp",
  "/slider/slider_2.webp"
];

export default function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Create extended slides array for infinite loop
  const extendedSlides = [...slides, ...slides];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => prev + 1);
    }, 10000); // Change slide every 10 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentSlide >= slides.length) {
      // When reaching the duplicated slides, reset without transition
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(0);
        setTimeout(() => {
          setIsTransitioning(true);
        }, 50);
      }, 1000); // Wait for transition to complete
    }
  }, [currentSlide, slides.length]);

  return (
    <div className="relative w-full h-64 md:h-96 lg:h-[500px] overflow-hidden">
      <div 
        ref={sliderRef}
        className={`flex h-full ${isTransitioning ? 'transition-transform duration-1000 ease-in-out' : ''}`}
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {extendedSlides.map((slide, index) => (
          <div key={index} className="min-w-full h-full relative">
            <Image
              src={slide}
              alt={`Slide ${(index % slides.length) + 1}`}
              fill
              className="object-cover w-full h-full"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
      
      {/* Slide indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setCurrentSlide(index);
            }}
            className={`w-3 h-3 rounded-full transition-colors ${
              (currentSlide % slides.length) === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
