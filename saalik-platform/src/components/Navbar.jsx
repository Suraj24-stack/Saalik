import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockData } from "../data/MockData"; // adjust as needed

const Navbar = ({ onContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-md z-50 border-b border-green-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => handleNavigate("/")}
            className="flex items-center space-x-2 focus:outline-none"
          >
            <img
              src={mockData.navbar.logo}
              alt={`${mockData.navbar.brandName} Logo`}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-white text-xl font-bold tracking-wider">
              {mockData.navbar.brandName}
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <button
              onClick={() => handleNavigate("/")}
              className="text-white hover:text-green-400 px-2 py-1 font-medium transition-colors"
            >
              HOME
            </button>
            <button
              onClick={() => handleNavigate("/stories")}
              className="text-white hover:text-green-400 px-2 py-1 font-medium transition-colors"
            >
              STORIES
            </button>
            <button
              onClick={() => handleNavigate("/guide-booking")}
              className="text-white hover:text-green-400 px-2 py-1 font-medium transition-colors"
            >
              GUIDE BOOKING
            </button>
            <button
              onClick={onContact}
              className="text-white hover:text-green-400 px-2 py-1 font-medium transition-colors"
            >
              CONTACT
            </button>
            <button
              onClick={() => handleNavigate("/login")}
              className="px-3 py-1 rounded border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-colors"
            >
              LOGIN
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white hover:text-green-400 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/98 border-t border-green-500/20">
          <div className="px-4 py-4 space-y-3 flex flex-col">
            <button
              onClick={() => handleNavigate("/")}
              className="py-2 px-4 rounded text-left text-white hover:text-green-400 hover:bg-green-500/5"
            >
              HOME
            </button>
            <button
              onClick={() => handleNavigate("/stories")}
              className="py-2 px-4 rounded text-left text-white hover:text-green-400 hover:bg-green-500/5"
            >
              STORIES
            </button>
            <button
              onClick={() => handleNavigate("/guide-booking")}
              className="py-2 px-4 rounded text-left text-white hover:text-green-400 hover:bg-green-500/5"
            >
              GUIDE BOOKING
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onContact();
              }}
              className="py-2 px-4 rounded text-left text-white hover:text-green-400 hover:bg-green-500/5"
            >
              CONTACT
            </button>
            <button
              onClick={() => handleNavigate("/login")}
              className="block w-full text-left py-2 px-4 rounded border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-colors"
            >
              LOGIN
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
