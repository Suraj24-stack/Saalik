import React from "react";
import { mockData } from "../data/MockData"; 

const PartnersSection = () => (
  <section className="relative py-20 md:py-28 px-4 overflow-hidden" style={{ backgroundColor: '#001410' }}>
    
    {/* Background Pattern - Dark Green Grid */}
    <div className="absolute inset-0 opacity-[0.03]">
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='1'%3E%3Cpath d='M0 0h1v1H0V0zm10 0h1v1h-1V0zm10 0h1v1h-1V0zm10 0h1v1h-1V0zm10 0h1v1h-1V0zm10 0h1v1h-1V0zm10 0h1v1h-1V0zm10 0h1v1h-1V0zM0 10h1v1H0v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zM0 20h1v1H0v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zM0 30h1v1H0v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zM0 40h1v1H0v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zM0 50h1v1H0v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zM0 60h1v1H0v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zM0 70h1v1H0v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '80px 80px',
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
        <div className="relative border-2 border-green-500/40 rounded-3xl p-8 md:p-12 backdrop-blur-sm" style={{ backgroundColor: 'rgba(0, 30, 20, 0.3)' }}>
          
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
              
              {/* SAALIK Main Logo */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 group">
                  {/* Glow */}
                  <div className="absolute inset-0 bg-green-400/30 rounded-full blur-xl scale-110" />
                  
                  {/* Logo Image */}
                  <div className="relative w-full h-full rounded-full bg-transparent flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <img 
                      src={mockData.saalikGroup.mainLogo} 
                      alt="SAALIK Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
              </div>
              
              {/* SAALIK DESIGNS Logo */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 group">
                  {/* Glow */}
                  <div className="absolute inset-0 bg-green-400/20 rounded-lg blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  {/* Logo Image */}
                  <div className="relative w-full h-full rounded-2xl bg-transparent flex items-center justify-center hover:scale-110 transition-all duration-300">
                    <img 
                      src={mockData.saalikGroup.designsLogo} 
                      alt="SAALIK DESIGNS Logo" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

        {/* Corner Decorations - REMOVED */}
      </div>

    </div>
  </section>
);

export default PartnersSection;