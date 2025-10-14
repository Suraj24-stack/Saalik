import React from "react";
import { mockData } from "../data/mockData"; // adjust path if needed

const PartnersSection = () => (
  <section className="bg-black py-16 px-4">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
        <span className="text-white">IN </span>
        <span className="text-green-400">ASSOCIATION </span>
        <span className="text-white">WITH</span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
        {mockData.partners.map((partner) => (
          <div
            key={partner.id}
            className="flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 rounded-full bg-gray-800 border-2 border-green-500/30 flex items-center justify-center mb-3 hover:border-green-400 transition-colors">
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-16 h-16 object-contain"
              />
            </div>
            <p className="text-green-400 text-sm font-medium">{partner.name}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-green-500/20 pt-12 flex justify-center items-center space-x-6">
        <h3 className="text-2xl font-bold">
          <span className="text-green-400">SAALIK</span>
          <span className="text-white"> GROUP:</span>
        </h3>
        <div className="flex space-x-4">
          <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
            <span className="text-black font-bold">S</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-green-500 flex items-center justify-center">
            <span className="text-green-400 font-bold text-xs">SD</span>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default PartnersSection;
