import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: "HOME", path: "/" },
    { label: "STORIES", path: "/stories" },
    { label: "GUIDE BOOKING", path: "/guide-booking" },
    { label: "CONTACT", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-md z-50 border-b border-green-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-black" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
              </svg>
            </div>
            <span className="text-white text-xl font-bold tracking-wider">SAALIK</span>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `px-2 py-1 font-medium transition-colors ${
                    isActive ? "text-green-400" : "text-white hover:text-green-400"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            {/* Login Button */}
            <NavLink
              to="/login"
              className="px-3 py-1 rounded border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-colors"
            >
              LOGIN
            </NavLink>
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
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block w-full text-left py-2 px-4 rounded transition-colors ${
                    isActive ? "text-green-400 bg-green-500/10" : "text-white hover:text-green-400 hover:bg-green-500/5"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <NavLink
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-left py-2 px-4 rounded border border-green-400 text-green-400 hover:bg-green-400 hover:text-black transition-colors"
            >
              LOGIN
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
