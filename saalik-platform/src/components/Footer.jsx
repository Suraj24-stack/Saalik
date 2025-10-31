import React from "react";
import { Facebook, Youtube, Instagram } from "lucide-react";
import { mockData } from "../data/MockData";

const Footer = () => (
  <footer className="bg-black border-t border-green-500/20 py-20">
    <div
      className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12"
      style={{ paddingLeft: '5%', paddingRight: '2.5%' }}
    >
      {/* Brand Logo */}
      <div className="flex-1">
        <div className="mb-6">
          <img 
            src={mockData.navbar.logo} 
            alt={`${mockData.navbar.brandName} Logo`}
            className="h-16 w-auto object-contain"
          />
        </div>
        <p className="text-gray-400 text-sm md:text-base leading-relaxed">
          Delivering innovative technology solutions with excellence and integrity.
        </p>
      </div>

      {/* Quick Links */}
      <div className="flex-1">
        <h3 className="text-white font-bold text-lg md:text-xl mb-6">Quick Links</h3>
        <ul className="space-y-3">
          {['Home', 'Stories', 'Guide Booking', 'Contact'].map((link) => (
            <li key={link}>
              <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm md:text-base">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Connect With Us */}
      <div className="flex-1">
        <h3 className="text-white font-bold text-lg md:text-xl mb-6">Connect With Us</h3>
        <div className="space-y-3">
          <a href="#" className="flex items-center space-x-3 text-gray-400 hover:text-green-400 transition-colors text-sm md:text-base">
            <Facebook size={18} /><span>Facebook /saalik</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-gray-400 hover:text-green-400 transition-colors text-sm md:text-base">
            <Youtube size={18} /><span>YouTube /saalik0</span>
          </a>
          <a href="#" className="flex items-center space-x-3 text-gray-400 hover:text-green-400 transition-colors text-sm md:text-base">
            <Instagram size={18} /><span>Instagram /saalikl</span>
          </a>
        </div>
      </div>
    </div>

    {/* Bottom */}
    <div
      className="border-t border-green-500/20 pt-12 mt-12 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
      style={{ paddingLeft: '5%', paddingRight: '2.5%' }}
    >
      <p className="text-gray-500 text-sm md:text-base">
        © 2025 SAALIK TECH PVT. LTD. All rights reserved
      </p>
      <div className="flex space-x-6 text-sm md:text-base">
        <a href="#" className="text-gray-500 hover:text-green-400">Privacy Policy</a>
        <span className="text-gray-700">|</span>
        <a href="#" className="text-gray-500 hover:text-green-400">Terms of Service</a>
      </div>
    </div>
  </footer>
);

export default Footer;
