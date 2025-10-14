import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navigation = ({ currentPage, setCurrentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "HOME", page: "home" },
    { label: "STORIES", page: "stories" },
    { label: "GUIDE BOOKING", page: "guide-booking" },
    { label: "CONTACT", page: "contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-md z-50 border-b border-green-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => setCurrentPage("home")}
          >
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center group-hover:bg-green-400 transition-colors">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 text-black"
                fill="currentColor"
              >
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
              </svg>
            </div>
            <span className="text-white text-xl font-bold tracking-wider">
              SAALIK
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => setCurrentPage(item.page)}
                className={`relative px-2 py-1 font-medium transition-colors ${
                  currentPage === item.page
                    ? "text-green-400"
                    : "text-white hover:text-green-400"
                }`}
              >
                {item.label}
                {currentPage === item.page && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-400"></span>
                )}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
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
          <div className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  setCurrentPage(item.page);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-2 px-4 rounded transition-colors ${
                  currentPage === item.page
                    ? "text-green-400 bg-green-500/10"
                    : "text-white hover:text-green-400 hover:bg-green-500/5"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
