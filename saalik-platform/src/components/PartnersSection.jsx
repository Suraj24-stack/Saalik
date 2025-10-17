import React from "react";
import { mockData } from "../data/MockData"; 

const PartnersSection = () => (
  <section className="relative bg-gradient-to-b from-black via-emerald-950/20 to-black py-20 md:py-28 px-4 overflow-hidden">
    
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
    </div>

    <div className="max-w-7xl mx-auto relative">
      
      {/* Title */}
      <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 md:mb-20">
        <span className="text-white">IN </span>
        <span className="text-green-400">ASSOCIATION</span>
        <span className="text-white"> WITH</span>
      </h2>

      {/* Partners Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20 md:mb-28">
        {mockData.partners.map((partner) => (
          <div
            key={partner.id}
            className="flex flex-col items-center text-center group"
          >
            {/* Logo Container */}
            <div className="relative w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 mb-4 md:mb-6">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-green-400/20 rounded-full blur-2xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Logo Circle */}
              <div className="relative w-full h-full rounded-full bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/40 group-hover:border-green-400 flex items-center justify-center transition-all duration-300 shadow-xl group-hover:shadow-green-500/30">
                {partner.logo ? (
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-20 h-20 md:w-24 md:h-24 object-contain"
                  />
                ) : (
                  <span className="text-5xl md:text-6xl opacity-50">🏛️</span>
                )}
              </div>
            </div>
            
            {/* Partner Name */}
            <p className="text-green-400 text-sm md:text-base font-semibold leading-tight max-w-[180px]">
              {partner.name}
            </p>
          </div>
        ))}
      </div>

      {/* SAALIK Group Section */}
      <div className="relative max-w-5xl mx-auto">
        {/* Bordered Container */}
        <div className="relative border-2 border-green-500/30 rounded-3xl p-8 md:p-12 bg-gradient-to-br from-emerald-950/20 to-transparent backdrop-blur-sm">
          
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-green-400/5 rounded-3xl blur-2xl" />
          
          <div className="relative flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
            
            {/* Text */}
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold whitespace-nowrap">
              <span className="text-green-400">SAALIK</span>
              <span className="text-white"> GROUP:</span>
            </h3>
            
            {/* Logos */}
            <div className="flex items-center gap-6 md:gap-8">
              
              {/* SAALIK Logo */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 group">
                  {/* Glow */}
                  <div className="absolute inset-0 bg-green-400/30 rounded-full blur-xl scale-110" />
                  
                  {/* Circle with Gear Icon */}
                  <div className="relative w-full h-full rounded-full bg-green-500 flex items-center justify-center shadow-xl shadow-green-500/50 hover:scale-110 transition-transform duration-300">
                    <svg className="w-16 h-16 md:w-20 md:h-20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="12" r="3" fill="currentColor" />
                      <path d="M12 1v6m0 6v6m6-11h-6m-6 0h6m5.196-3.464L13.5 10.5m-3 3l-3.696 3.696M21 12h-6m-6 0H3m16.196 4.464L15.5 13.5m-3-3l-3.696-3.696" stroke="currentColor" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                <p className="text-green-400 text-xs md:text-sm font-semibold tracking-wider">SAALIK</p>
              </div>
              
              {/* SAALIK DESIGNS Logo */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 group">
                  {/* Glow */}
                  <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Circle with Text */}
                  <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-emerald-900 to-black border-2 border-green-500 flex flex-col items-center justify-center shadow-xl hover:shadow-green-500/30 hover:scale-110 transition-all duration-300">
                    <span className="text-green-400 font-bold text-xl md:text-2xl">SAALIK</span>
                    <span className="text-green-400 font-bold text-xs md:text-sm -mt-1">DESIGNS</span>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Corner Decorations */}
        <div className="absolute -top-3 -left-3 w-16 h-16 border-t-2 border-l-2 border-green-400/40 rounded-tl-2xl" />
        <div className="absolute -bottom-3 -right-3 w-16 h-16 border-b-2 border-r-2 border-green-400/40 rounded-br-2xl" />
      </div>

    </div>
  </section>
);

export default PartnersSection;