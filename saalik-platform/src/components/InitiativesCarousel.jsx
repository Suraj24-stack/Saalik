import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { mockData } from "../data/mockData"; // adjust path if needed

const InitiativesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const initiatives = mockData.initiatives;
  const itemsPerView = 4;

  const totalSlides = Math.ceil(initiatives.length / itemsPerView);

  return (
    <section className="bg-gradient-to-b from-gray-900 to-black py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="text-white">OUR </span>
          <span className="text-green-400">INITIATIVES</span>
        </h2>

        <div className="relative">
          <div className="flex items-center justify-center space-x-8">
            {initiatives
              .slice(
                currentIndex * itemsPerView,
                currentIndex * itemsPerView + itemsPerView
              )
              .map((initiative) => (
                <div key={initiative.id} className="text-center">
                  <div className="text-green-400 text-2xl md:text-3xl font-bold tracking-wider hover:text-green-300 transition-colors cursor-pointer">
                    {initiative.name}
                  </div>
                </div>
              ))}
          </div>

          {initiatives.length > itemsPerView && (
            <>
              <button
                onClick={() =>
                  setCurrentIndex(
                    (prev) => (prev - 1 + totalSlides) % totalSlides
                  )
                }
                className="absolute left-0 top-1/2 -translate-y-1/2 text-green-400 hover:text-green-300"
              >
                <ChevronLeft size={32} />
              </button>
              <button
                onClick={() =>
                  setCurrentIndex((prev) => (prev + 1) % totalSlides)
                }
                className="absolute right-0 top-1/2 -translate-y-1/2 text-green-400 hover:text-green-300"
              >
                <ChevronRight size={32} />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default InitiativesCarousel;
