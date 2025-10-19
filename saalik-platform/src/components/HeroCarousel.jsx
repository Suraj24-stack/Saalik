import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { mockData } from "../data/MockData";

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

  const currentSlideData = slides[currentSlide];
  const hasImage = currentSlideData.image && currentSlideData.image !== "/" && currentSlideData.image !== "";

  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[550px] w-full overflow-hidden bg-gradient-to-br from-black via-emerald-950/20 to-black pt-14 md:pt-20">
      
      {/* Content Container */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex items-center justify-between gap-8">
            
            {/* Left Side - Text Content */}
            <div className="flex-1 max-w-5xl z-10">
              
              

              {/* Main Title */}
              <div className="space-y-3 md:space-y-4">
                <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-green-400 tracking-[0.3em] uppercase leading-none">
                  {currentSlideData.title}
                </h2>
                
                
              </div>

            </div>

            {/* Right Side - Image (CENTERED DISPLAY) */}
            <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[50%] xl:w-[55%]">
              <div className="relative w-full h-full flex items-center justify-center">
                
                {hasImage ? (
                  <img
                    src={currentSlideData.image}
                    alt={currentSlideData.highlight}
                    className="w-full h-full object-contain object-center opacity-100 scale-110"
                    onError={(e) => {
                      console.error('Image failed to load:', currentSlideData.image);
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-9xl opacity-30">
                      {currentSlideData.icon || "🏛️"}
                    </span>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>

        {/* Left Arrow */}
        <button
          onClick={() =>
            setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
          }
          className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-green-400/70 hover:text-green-400 transition-all duration-300 z-20 bg-green-400/10 hover:bg-green-400/20 rounded-full p-1.5 md:p-2 backdrop-blur-sm border border-green-400/30"
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} className="md:w-8 md:h-8" strokeWidth={2.5} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={() =>
            setCurrentSlide((prev) => (prev + 1) % slides.length)
          }
          className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-green-400/70 hover:text-green-400 transition-all duration-300 z-20 bg-green-400/10 hover:bg-green-400/20 rounded-full p-1.5 md:p-2 backdrop-blur-sm border border-green-400/30"
          aria-label="Next slide"
        >
          <ChevronRight size={28} className="md:w-8 md:h-8" strokeWidth={2.5} />
        </button>
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-green-400 w-8 md:w-10"
                : "bg-white/30 w-1.5 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroCarousel;