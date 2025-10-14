import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { mockData } from "../data/mockData"; // adjust path

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = mockData.heroSlides;

  useEffect(() => {
    const timer = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % slides.length),
      5000
    );
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative h-screen bg-gradient-to-br from-black via-gray-900 to-green-900">
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative h-full flex items-center justify-center px-4">
        {/* Left arrow */}
        <button
          onClick={() =>
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
          }
          className="absolute left-4 md:left-12 text-green-400 hover:text-green-300 hover:scale-110 transition-all z-10 bg-black/30 rounded-full p-2"
        >
          <ChevronLeft size={48} />
        </button>

        {/* Slide Content */}
        <div className="text-center max-w-5xl">
          <p className="text-green-400 text-lg md:text-xl mb-6 tracking-wide">
            {slides[currentSlide].subtitle}
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-2">
            {slides[currentSlide].title}
          </h1>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-green-400">
            {slides[currentSlide].highlight}
          </h2>
        </div>

        {/* Right arrow */}
        <button
          onClick={() =>
            setCurrentSlide((prev) => (prev + 1) % slides.length)
          }
          className="absolute right-4 md:right-12 text-green-400 hover:text-green-300 hover:scale-110 transition-all z-10 bg-black/30 rounded-full p-2"
        >
          <ChevronRight size={48} />
        </button>
      </div>

      {/* Dots navigation */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all ${
              index === currentSlide
                ? "bg-green-400 w-12"
                : "bg-white/40 w-2 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
