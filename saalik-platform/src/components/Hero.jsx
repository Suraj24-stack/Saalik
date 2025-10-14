import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroCarousel = ({ stories }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % stories.length);
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + stories.length) % stories.length);
  };
  
  return (
    <div className="relative h-96 bg-gradient-to-b from-green-900 to-black overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center z-10 px-4">
          <p className="text-green-400 text-sm mb-2">Discover the Untold Stories of Nepal</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">
            DURBAR SQUARE'S
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="text-white">TALE OF </span>
            <span className="text-green-400">KAAL BHAIRAB</span>
          </h2>
        </div>
      </div>
      
      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all z-20"
      >
        <ChevronLeft className="text-white" size={24} />
      </button>
      
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all z-20"
      >
        <ChevronRight className="text-white" size={24} />
      </button>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
        {stories.slice(0, 4).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentSlide ? 'bg-green-400 w-8' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;