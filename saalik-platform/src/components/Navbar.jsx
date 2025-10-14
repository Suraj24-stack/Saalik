import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);
  const links = [
    { name: "HOME", path: "/" },
    { name: "STORIES", path: "/stories" },
    { name: "GUIDE BOOKING", path: "/guide-booking" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-black bg-opacity-90 backdrop-blur-sm z-50 border-b border-green-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-2">
              <span className="text-black font-bold">S</span>
            </div>
            <span className="text-white text-xl font-bold tracking-wider">
              SAALIK
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-center gap-10">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide px-3 py-1 transition-colors duration-200 ${
                    isActive
                      ? "text-green-400 border-b-2 border-green-400"
                      : "text-white hover:text-green-400"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMenu && (
        <div className="md:hidden bg-black border-t border-green-900">
          <div className="px-4 py-4 space-y-3">
            {links.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setShowMenu(false)}
                className={({ isActive }) =>
                  `block w-full text-left py-2 text-sm font-medium ${
                    isActive ? "text-green-400" : "text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
