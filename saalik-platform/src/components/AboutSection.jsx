import React from "react";

const AboutSection = () => (
  <section className="bg-gradient-to-b from-gray-900 to-black py-20 px-4">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      
      {/* Illustration / Logo */}
      <div className="flex justify-center">
        <div className="w-64 h-64 rounded-full bg-gradient-to-br from-green-500 to-green-700 p-1">
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
            <svg viewBox="0 0 200 200" className="w-48 h-48 text-green-400">
              <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2"/>
              <path d="M100 40 L120 80 L100 120 L80 80 Z" fill="currentColor"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Text */}
      <div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          WHAT IS <span className="text-green-400">SAALIK?</span>
        </h2>
        <div className="space-y-4 text-gray-300 leading-relaxed">
          <p>
            SAALIK is a cultural tourism and heritage platform dedicated to promoting and showcasing{" "}
            <span className="text-green-400 font-semibold">Nepal's statues and sculptural heritage</span>. 
            By blending technology with tradition, we provide travelers, researchers, and culture enthusiasts with{" "}
            <span className="text-green-400 font-semibold">accurate, engaging, and comprehensive information</span> 
            on Nepal's cultural heritage.
          </p>
          <p>
            We envision becoming the single platform for{" "}
            <span className="text-green-400 font-semibold">digital heritage tourism</span>, promoting{" "}
            <span className="text-green-400 font-semibold">community-based statue recognition</span>, a verified{" "}
            <span className="text-green-400 font-semibold">guide booking system</span>, and{" "}
            <span className="text-green-400 font-semibold">emergency support</span>. 
            SAALIK is committed to safeguarding Nepal's timeless legacy.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default AboutSection;
