import React from "react";
import { mockData } from "../data/MockData";

const AboutSection = () => (
  <section className="relative bg-black py-20 md:py-32 px-4 overflow-hidden">
    
    {/* Decorative background elements */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-20 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
    </div>

    <div className="max-w-7xl mx-auto relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Side - Image */}
        <div className="relative flex justify-center lg:justify-start">
          <div className="relative w-full max-w-md lg:max-w-lg">
            
            {mockData.aboutImage ? (
              <img
                src={mockData.aboutImage}
                alt="Deity Statue"
                className="w-full h-auto object-contain"
              />
            ) : (
              <div className="w-full aspect-square flex items-center justify-center">
                <span className="text-9xl opacity-40">🕉️</span>
              </div>
            )}

          </div>
        </div>
        
        {/* Right Side - Text Content */}
        <div className="space-y-6 lg:pl-8 py-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl leading-tight tracking-wide" style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 700 }}>
            <span className="text-white">WHAT IS </span>
            <span className="text-green-400">SAALIK?</span>
          </h2>
          
          <div className="space-y-5 text-gray-300 text-base md:text-lg leading-relaxed text-justify">
            <p>
              <span className="text-green-400 font-bold">SAALIK</span> is a cultural tourism and heritage platform dedicated to{" "}
              <span className="text-green-400 font-semibold">preserving</span>, promoting, and showcasing{" "}
              <span className="text-green-400 font-semibold">Nepal's statues and sculptures/culture</span>. By blending technology with tradition, we provide travelers, researchers, and culture enthusiasts with an{" "}
              <span className="text-green-400 font-semibold">authentic digital experience</span>. Our mission is to centralize and{" "}
              <span className="text-green-400 font-semibold">digitalize information</span> on Nepal's cultural heritage, making it accessible worldwide. We envision becoming the leading platform for digital heritage tourism and{" "}
              <span className="text-green-400 font-semibold">cultural preservation</span> in Nepal, bridging the gap between history and innovation. With features such as{" "}
              <span className="text-green-400 font-semibold">AI based statue recognition</span>, a verified{" "}
              <span className="text-green-400 font-semibold">guide booking system</span>, personalized{" "}
              <span className="text-green-400 font-semibold">travel itineraries</span> and{" "}
              <span className="text-green-400 font-semibold">emergency help support</span>, SAALIK is committed to safeguarding Nepal's timeless legacy while empowering travelers and local communities alike.
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
);

export default AboutSection;