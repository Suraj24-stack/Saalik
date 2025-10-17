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

  return (
    <section className="relative h-[350px] md:h-[400px] w-full overflow-hidden bg-gradient-to-br from-black via-emerald-950/30 to-black pt-14 md:pt-20">
      
      {/* Content Container */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 md:px-8 lg:px-12">
          <div className="flex items-center justify-between gap-8">
            
            {/* Left Side - Text Content */}
            <div className="flex-1 max-w-3xl z-10">
              
              {/* Subtitle */}
              <p className="text-[10px] md:text-xs text-gray-400 mb-3 md:mb-4 tracking-[0.2em] uppercase font-light">
                Discover the <span className="text-green-400">Untold Stories</span> of Nepal
              </p>

              {/* Main Title - Single Line */}
              <div className="space-y-1">
                <h2 className="text-lg md:text-2xl lg:text-3xl font-bold text-green-400 tracking-[0.15em] uppercase leading-tight">
                  {slides[currentSlide].title}
                </h2>
                
                <h1 className="text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-[0.08em] uppercase leading-tight">
                  <span className="text-white">TALE OF </span>
                  <span className="text-green-400">{slides[currentSlide].highlight}</span>
                </h1>
              </div>

            </div>

            {/* Right Side - Blended Image */}
            <div className="hidden lg:block relative flex-shrink-0">
              <div className="relative w-[300px] xl:w-[350px] h-[250px] xl:h-[300px]">
                
                {/* Green Glow Effect Behind */}
                <div className="absolute inset-0 bg-green-400/20 blur-3xl rounded-full scale-110" />
                
                {/* Image Container with Gradient Border */}
                <div className="relative w-full h-full rounded-2xl overflow-hidden">
                  
                  {/* Gradient Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 via-green-500 to-emerald-600 opacity-40 rounded-2xl" />
                  
                  {/* Inner Container */}
                  <div className="absolute inset-[3px] bg-gradient-to-br from-black/90 to-emerald-950/80 rounded-2xl overflow-hidden">
                    
                    {slides[currentSlide].image ? (
                      <img
                        src={slides[currentSlide].image}
                        alt={slides[currentSlide].highlight}
                        className="w-full h-full object-cover opacity-80 mix-blend-lighten"
                        style={{
                          filter: 'contrast(1.1) brightness(0.9)'
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-emerald-950">
                        <span className="text-8xl opacity-30">
                          {slides[currentSlide].icon || "🏛️"}
                        </span>
                      </div>
                    )}
                    
                    {/* Blend Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-green-400/10 to-black/40" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                </div>

                {/* Corner Accents */}
                <div className="absolute -top-2 -right-2 w-16 h-16 border-t-2 border-r-2 border-green-400/60 rounded-tr-2xl" />
                <div className="absolute -bottom-2 -left-2 w-16 h-16 border-b-2 border-l-2 border-green-400/60 rounded-bl-2xl" />
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