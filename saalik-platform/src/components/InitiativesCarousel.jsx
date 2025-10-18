import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { mockData } from "../data/MockData";

const InitiativesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const initiatives = mockData.initiatives;
  const itemsPerView = 4;

  const totalSlides = Math.ceil(initiatives.length / itemsPerView);

  return (
    <section className="bg-gradient-to-b from-gray-900 to-black py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          <span className="text-white">OUR </span>
          <span className="text-green-400">INITIATIVES</span>
        </h2>

        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 px-12">
            {initiatives
              .slice(
                currentIndex * itemsPerView,
                currentIndex * itemsPerView + itemsPerView
              )
              .map((initiative) => (
                <div 
                  key={initiative.id} 
                  className="flex flex-col items-center text-center group cursor-pointer"
                >
                  
                  {/* Logo Image */}
                  <div className="relative w-32 h-32 mb-6 flex items-center justify-center">
                    {initiative.logo ? (
                      <img
                        src={initiative.logo}
                        alt={initiative.name}
                        className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          console.error('Logo failed to load:', initiative.logo);
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800/50 rounded-lg">
                        <span className="text-5xl opacity-30">🏛️</span>
                      </div>
                    )}
                  </div>

                 
                </div>
              ))}
          </div>

          {/* Navigation Arrows */}
          {initiatives.length > itemsPerView && (
            <>
              <button
                onClick={() =>
                  setCurrentIndex(
                    (prev) => (prev - 1 + totalSlides) % totalSlides
                  )
                }
                className="absolute left-0 top-1/2 -translate-y-1/2 text-green-400 hover:text-green-300 transition-colors bg-green-400/10 hover:bg-green-400/20 rounded-full p-2 backdrop-blur-sm"
                aria-label="Previous"
              >
                <ChevronLeft size={32} strokeWidth={2.5} />
              </button>
              <button
                onClick={() =>
                  setCurrentIndex((prev) => (prev + 1) % totalSlides)
                }
                className="absolute right-0 top-1/2 -translate-y-1/2 text-green-400 hover:text-green-300 transition-colors bg-green-400/10 hover:bg-green-400/20 rounded-full p-2 backdrop-blur-sm"
                aria-label="Next"
              >
                <ChevronRight size={32} strokeWidth={2.5} />
              </button>
            </>
          )}
        </div>

        {/* Optional: Pagination Dots */}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? "bg-green-400 w-8"
                    : "bg-gray-600 w-2 hover:bg-gray-500"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default InitiativesCarousel;