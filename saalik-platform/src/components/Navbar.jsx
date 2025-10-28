import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockData } from "../data/MockData";

const Navbar = ({ onContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Check on mount
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Cleanup
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleNavigate = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  return (
    <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm z-50 border-b border-green-500/10 relative overflow-hidden">
      {/* Green glow effect on right side */}
      <div className="absolute top-0 right-0 w-96 h-full bg-green-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute top-0 right-20 w-64 h-full bg-green-400/5 blur-2xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo - LEFT SIDE */}
          <button
            onClick={() => handleNavigate("/")}
            className="flex items-center space-x-3 focus:outline-none group"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/20 rounded-full blur-md group-hover:bg-green-500/30 transition-all"></div>
              <img
                src={mockData.navbar.logo}
                alt={`${mockData.navbar.brandName} Logo`}
                className="relative w-10 h-10 rounded-full object-cover border-2 border-green-500/30"
              />
            </div>
            <span className="text-white text-2xl font-bold tracking-widest uppercase">
              {mockData.navbar.brandName}
            </span>
          </button>

          {/* Navigation + Menu - RIGHT SIDE */}
          <div className="flex items-center space-x-1">
            {/* Desktop Menu - Show only when NOT mobile */}
            {!isMobile && (
              <>
                <button
                  onClick={() => handleNavigate("/")}
                  className="text-green-400 hover:text-green-300 px-4 py-2 text-sm font-semibold tracking-wider uppercase transition-colors relative group"
                >
                  HOME
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-400 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </button>
                <button
                  onClick={() => handleNavigate("/stories")}
                  className="text-white hover:text-green-400 px-4 py-2 text-sm font-semibold tracking-wider uppercase transition-colors relative group"
                >
                  STORIES
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-400 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </button>
                <button
                  onClick={() => handleNavigate("/guide-booking")}
                  className="text-white hover:text-green-400 px-4 py-2 text-sm font-semibold tracking-wider uppercase transition-colors relative group"
                >
                  GUIDE BOOKING
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-400 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </button>
                <button
                  onClick={onContact}
                  className="text-white hover:text-green-400 px-4 py-2 text-sm font-semibold tracking-wider uppercase transition-colors relative group"
                >
                  CONTACT
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-400 scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </button>
              </>
            )}

            {/* Hamburger Menu - Show on both mobile and desktop */}
            <button
              className="text-green-400 hover:text-green-300 transition-colors p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Show only when mobile AND menu is open */}
      {isMobile && mobileMenuOpen && (
        <div className="bg-black/98 border-t border-green-500/20 backdrop-blur-sm">
          <div className="px-4 py-6 space-y-1 flex flex-col">
            <button
              onClick={() => handleNavigate("/")}
              className="py-3 px-4 rounded-lg text-left text-green-400 font-semibold tracking-wider uppercase hover:bg-green-500/10 transition-colors"
            >
              HOME
            </button>
            <button
              onClick={() => handleNavigate("/stories")}
              className="py-3 px-4 rounded-lg text-left text-white font-semibold tracking-wider uppercase hover:text-green-400 hover:bg-green-500/10 transition-colors"
            >
              STORIES
            </button>
            <button
              onClick={() => handleNavigate("/guide-booking")}
              className="py-3 px-4 rounded-lg text-left text-white font-semibold tracking-wider uppercase hover:text-green-400 hover:bg-green-500/10 transition-colors"
            >
              GUIDE BOOKING
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onContact();
              }}
              className="py-3 px-4 rounded-lg text-left text-white font-semibold tracking-wider uppercase hover:text-green-400 hover:bg-green-500/10 transition-colors"
            >
              CONTACT
            </button>
          </div>
        </div>
      )}

      {/* Desktop Menu Dropdown - Show only when NOT mobile AND menu is open */}
      {!isMobile && mobileMenuOpen && (
        <div className="bg-black/98 border-t border-green-500/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6 grid grid-cols-3 gap-8">
              <div>
                <h3 className="text-green-400 font-bold text-lg mb-3 uppercase tracking-wider">
                  Quick Links
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleNavigate("/")}
                    className="block text-white hover:text-green-400 transition-colors text-sm uppercase tracking-wider"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => handleNavigate("/stories")}
                    className="block text-white hover:text-green-400 transition-colors text-sm uppercase tracking-wider"
                  >
                    Stories
                  </button>
                  <button
                    onClick={() => handleNavigate("/guide-booking")}
                    className="block text-white hover:text-green-400 transition-colors text-sm uppercase tracking-wider"
                  >
                    Guide Booking
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-green-400 font-bold text-lg mb-3 uppercase tracking-wider">
                  Connect
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onContact();
                    }}
                    className="block text-white hover:text-green-400 transition-colors text-sm uppercase tracking-wider"
                  >
                    Contact Us
                  </button>
                </div>
              </div>
              <div>
                <h3 className="text-green-400 font-bold text-lg mb-3 uppercase tracking-wider">
                  Explore
                </h3>
                <div className="space-y-2">
                  <button
                    onClick={() => handleNavigate("/stories")}
                    className="block text-white hover:text-green-400 transition-colors text-sm uppercase tracking-wider"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleNavigate("/stories")}
                    className="block text-white hover:text-green-400 transition-colors text-sm uppercase tracking-wider"
                  >
                    Register
                  </button>
                  <button
                    onClick={() => handleNavigate("/stories")}
                    className="block text-white hover:text-green-400 transition-colors text-sm uppercase tracking-wider"
                  >
                    Discover Stories
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;