import React from "react";
import { mockData } from "../data/MockData";

const AboutSection = () => (
  <section className="relative bg-black py-20 md:py-32 px-4 overflow-hidden border-t border-green-500/5">
    
    {/* Top shadow gradient for separation */}
    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none"></div>
    
    {/* Decorative background elements */}
    <div className="absolute inset-0 opacity-10">
      <div className="absolute top-20 right-0 w-96 h-96 bg-green-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
    </div>

    <div className="max-w-7xl mx-auto relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* Left Side - Deity Statue Image */}
        <div className="relative flex justify-center lg:justify-start order-2 lg:order-1">
          <div className="relative w-full max-w-md lg:max-w-lg">
            
            {/* Large Green Glow Behind */}
            <div className="absolute inset-0 bg-green-400/20 blur-[120px] scale-125" />
            
            {/* Circular Frame Container */}
            <div className="relative aspect-square">
              
              {/* Animated Outer Glow Ring */}
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-green-400/20 to-emerald-600/20 blur-2xl animate-pulse" />
              
              {/* Main Circular Border with spikes pattern */}
              <div className="absolute inset-0 rounded-full border-[3px] border-green-400/50 shadow-2xl shadow-green-500/40" 
                   style={{
                     filter: 'drop-shadow(0 0 30px rgba(34, 197, 94, 0.3))'
                   }} />
              
              {/* Inner Circle with Image */}
              <div className="absolute inset-3 rounded-full overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900 border border-green-500/20">
                
                {mockData.aboutImage ? (
                  <img
                    src={mockData.aboutImage}
                    alt="Deity Statue"
                    className="w-full h-full object-cover"
                    style={{
                      filter: 'contrast(1.15) brightness(0.9) saturate(0.8)'
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                    <span className="text-9xl opacity-40">🕉️</span>
                  </div>
                )}
                
                {/* Green Tint Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-transparent to-green-600/10 mix-blend-screen" />
                
                {/* Dark Vignette */}
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/70" />
              </div>

              {/* Decorative Spikes/Rays around the circle */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(24)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-gradient-to-t from-green-400/40 via-green-400/20 to-transparent"
                    style={{
                      width: '2px',
                      height: '16px',
                      top: '50%',
                      left: '50%',
                      transformOrigin: '1px 0',
                      transform: `rotate(${i * 15}deg) translateY(-${115}%)`,
                      opacity: i % 2 === 0 ? 0.6 : 0.3
                    }}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>
        
        {/* Right Side - Text Content */}
        <div className="space-y-6 lg:pl-8 order-1 lg:order-2 py-6" style={{ fontFamily: 'Arial, sans-serif' }}>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight" >
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
