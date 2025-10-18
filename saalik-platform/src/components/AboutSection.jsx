import React from "react";
import { mockData } from "../data/MockData";

const AboutSection = () => (
  <section className="relative bg-gradient-to-br from-emerald-950/40 via-black to-emerald-950/40 py-20 md:py-28 px-4 overflow-hidden">
    
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute inset-0" style={{
        backgroundImage: "/2.png",
      }} />
    </div>

    <div className="max-w-7xl mx-auto relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        {/* Left Side - Deity Statue Image */}
        <div className="relative flex justify-center lg:justify-start">
          <div className="relative w-full max-w-md lg:max-w-lg">
            
            {/* Green Glow Behind */}
            <div className="absolute inset-0 bg-green-400/20 blur-[100px] scale-110" />
            
            {/* Circular Frame Container */}
            <div className="relative aspect-square">
              
              {/* Outer Green Glow Ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400/30 to-emerald-600/30 blur-xl animate-pulse" />
              
              {/* Main Circular Border */}
              <div className="absolute inset-0 rounded-full border-4 border-green-400/40 shadow-2xl shadow-green-500/30" />
              
              {/* Inner Circle with Image */}
              <div className="absolute inset-4 rounded-full overflow-hidden bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/30">
                
                {mockData.aboutImage ? (
                  <img
                    src={mockData.aboutImage}
                    alt="Deity Statue"
                    className="w-full h-full object-cover opacity-90"
                    style={{
                      filter: 'contrast(1.1) brightness(0.95)'
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                    <span className="text-9xl opacity-40">🕉️</span>
                  </div>
                )}
                
                {/* Green Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-transparent to-emerald-600/20 mix-blend-overlay" />
                
                {/* Vignette Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/60" />
              </div>

              {/* Decorative Spikes/Rays (optional - for deity aura effect) */}
              <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-6 bg-gradient-to-t from-green-400/60 to-transparent"
                    style={{
                      top: '50%',
                      left: '50%',
                      transformOrigin: '0 0',
                      transform: `rotate(${i * 30}deg) translateY(-${200}px)`,
                      opacity: 0.4
                    }}
                  />
                ))}
              </div>

              {/* REMOVED: Corner Accent Decorations */}
            </div>
          </div>
        </div>

        {/* Right Side - Text Content */}
        <div className="space-y-6 lg:pl-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-white">WHAT IS </span>
            <span className="text-green-400">SAALIK ?</span>
          </h2>
          
          <div className="space-y-4 text-gray-300 text-base md:text-lg leading-relaxed">
            <p>
              <span className="text-green-400 font-bold">SAALIK</span> is a cultural tourism and heritage platform dedicated to{" "}
              <span className="text-green-400 font-semibold">preserving</span>, promoting, and showcasing{" "}
              <span className="text-green-400 font-semibold">Nepal's statues and sculptures/culture</span>. By blending technology with tradition, we provide travelers, researchers, and culture enthusiasts with an{" "}
              <span className="text-green-400 font-semibold">authentic</span> digital experience. Our mission is to centralize and{" "}
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