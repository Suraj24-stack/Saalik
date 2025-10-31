import React from "react";
import { mockData } from "../data/MockData";
import { useNavigate } from "react-router-dom";

const StoriesPreview = ({ onViewAll, onStoryClick }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/stories");
  };

  return (
    <section className="relative bg-gradient-to-br from-emerald-950 via-black to-emerald-950 py-16 md:py-24 overflow-hidden w-full">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
          {/* Left Side - Text Content */}
          <div className="w-full flex flex-col justify-center text-left pl-[5%]">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 700 }}
            >
              <span className="text-white"> UNTOLD </span>
              <span className="text-green-400">STORIES</span>
            </h2>

            <div
              className="text-white text-base md:text-lg lg:text-xl leading-relaxed text-justify font-normal mt-4"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              <p>
                Browse through <span className="text-green-400 font-semibold">SAALIK's</span> ever growing{" "}
                <span className="text-green-400 font-semibold">database of statues</span> and{" "}
                <span className="text-green-400 font-semibold">sculptures</span> from across Nepal, where each piece carries{" "}
                <span className="text-green-400 font-semibold">a story of kings, gods, artisans, and civilizations</span>.
                More than just stone and metal, these statues embody centuries of history, faith, and craftsmanship inviting you to{" "}
                <span className="text-green-400 font-semibold">explore the cultural heartbeat of Nepal</span>.
              </p>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="w-full h-[400px] md:h-[500px] lg:h-[550px] flex justify-center items-center">
            {mockData.stories[0]?.image ? (
              <img
                src={mockData.stories[0].image}
                alt="Cultural Heritage"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-9xl opacity-40">🏛️</span>
              </div>
            )}
          </div>
        </div>

        {/* Centered Button Below Content & Image */}
        <div className="flex justify-center mt-12">
          <button
            onClick={handleClick}
            className="bg-green-500 hover:bg-green-400 text-white font-black text-base md:text-lg py-4 md:py-5 px-12 md:px-16 rounded-full transition-all duration-300 hover:scale-105 shadow-2xl shadow-green-500/40 tracking-wider uppercase"
          >
            READ STORIES
          </button>
        </div>
      </div>
    </section>
  );
};

export default StoriesPreview;
