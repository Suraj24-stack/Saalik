import React from "react";
import { mockData } from "../data/MockData";

const StoriesPreview = ({ onViewAll, onStoryClick }) => {
  return (
    <section className="relative bg-gradient-to-br from-emerald-950 via-black to-emerald-950 py-16 md:py-24 px-4 md:px-8 overflow-hidden">
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Side - Text Content */}
          <div className="space-y-6 lg:pr-8">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-white">UNTOLD </span>
              <span className="text-green-400">STORIES</span>
            </h2>
            
            <div className="text-gray-300 text-base md:text-lg leading-relaxed space-y-4">
              <p>
                Browse through <span className="text-green-400 font-semibold">SAALIK's</span> ever-growing{" "}
                <span className="text-green-400 font-semibold">database of statues</span> and{" "}
                <span className="text-green-400 font-semibold">sculptures</span> from across Nepal, where each piece carries a{" "}
                <span className="text-green-400 font-semibold">story of kings, gods, artisans, and civilizations</span>.
                More than just stone and metal, these statues embody centuries of history, faith, and craftsmanship inviting you to{" "}
                <span className="text-green-400 font-semibold">explore the cultural heartbeat of Nepal</span>.
              </p>
            </div>

            <div>
              <button
                onClick={onViewAll}
                className="bg-green-500 hover:bg-green-400 text-black font-bold text-sm md:text-base py-3 md:py-4 px-8 md:px-12 rounded-full transition-all duration-300 hover:scale-105 shadow-xl shadow-green-500/30 tracking-wider uppercase"
              >
                SEE OUR STORIES
              </button>
            </div>
          </div>

          {/* Right Side - Single Image */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[550px]">
            
            {/* Single Image Container */}
            <div className="relative h-full w-full overflow-hidden group">
              
              {/* Main Image */}
              {mockData.stories[1]?.image ? (
                <img
                  src={mockData.stories[0].image}
                  alt="Cultural Heritage"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-9xl opacity-40">🏛️</span>
                </div>
              )}
              
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default StoriesPreview;
