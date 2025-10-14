import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const InitiativesCarousel = ({ initiatives }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;
  
  const next = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerView >= initiatives.length ? 0 : prev + itemsPerView
    );
  };
  
  const prev = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, initiatives.length - itemsPerView) : Math.max(0, prev - itemsPerView)
    );
  };
  
  return (
    <div className="relative">
      <div className="flex items-center justify-center space-x-8 overflow-hidden">
        {initiatives.slice(currentIndex, currentIndex + itemsPerView).map((initiative, idx) => (
          <div key={idx} className="text-center">
            <div className="text-green-400 text-3xl font-bold">{initiative.logo}</div>
          </div>
        ))}
      </div>
      {initiatives.length > itemsPerView && (
        <div className="flex justify-center mt-6 space-x-4">
          <button 
            onClick={prev}
            className="bg-green-500 text-black p-2 rounded-full hover:bg-green-400 transition-all"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={next}
            className="bg-green-500 text-black p-2 rounded-full hover:bg-green-400 transition-all"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default InitiativesCarousel;