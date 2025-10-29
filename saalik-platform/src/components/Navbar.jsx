import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { mockData } from "../data/MockData";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavigate = (path) => {
    setMobileMenuOpen(false);
    navigate(path);
    window.scrollTo(0, 0);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm z-50 border-b border-green-500/10 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-full bg-green-500/10 blur-3xl pointer-events-none"></div>
      <div className="absolute top-0 right-20 w-64 h-full bg-green-400/5 blur-2xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-20">
          <button onClick={() => handleNavigate("/")} className="focus:outline-none group">
            <img src={mockData.navbar.logo} alt={`${mockData.navbar.brandName} Logo`} className="w-12 h-12 object-cover hover:scale-110 transition-transform duration-300" />
          </button>

          <div className="flex items-center space-x-1">
            {!isMobile && (
              <>
                <button onClick={() => handleNavigate("/")} className={`px-4 py-2 text-sm font-semibold tracking-wider uppercase transition-colors ${isActive("/") ? "text-green-400" : "text-white hover:text-green-400"}`}>
                  HOME
                </button>
                <button onClick={() => handleNavigate("/stories")} className={`px-4 py-2 text-sm font-semibold tracking-wider uppercase transition-colors ${isActive("/stories") ? "text-green-400" : "text-white hover:text-green-400"}`}>
                  STORIES
                </button>
                <button onClick={() => handleNavigate("/guide-booking")} className={`px-4 py-2 text-sm font-semibold tracking-wider uppercase transition-colors ${isActive("/guide-booking") ? "text-green-400" : "text-white hover:text-green-400"}`}>
                  GUIDE BOOKING
                </button>
                <button onClick={() => handleNavigate("/contact")} className={`px-4 py-2 text-sm font-semibold tracking-wider uppercase transition-colors ${isActive("/contact") ? "text-green-400" : "text-white hover:text-green-400"}`}>
                  CONTACT
                </button>
              </>
            )}

            <button className="text-green-400 hover:text-green-300 transition-colors p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {isMobile && mobileMenuOpen && (
        <div className="bg-black/98 border-t border-green-500/20 backdrop-blur-sm">
          <div className="px-4 py-6 space-y-1 flex flex-col">
            <button onClick={() => handleNavigate("/")} className={`py-3 px-4 rounded-lg text-left font-semibold tracking-wider uppercase transition-colors ${isActive("/") ? "text-green-400 bg-green-500/10" : "text-white hover:text-green-400 hover:bg-green-500/10"}`}>
              HOME
            </button>
            <button onClick={() => handleNavigate("/stories")} className={`py-3 px-4 rounded-lg text-left font-semibold tracking-wider uppercase transition-colors ${isActive("/stories") ? "text-green-400 bg-green-500/10" : "text-white hover:text-green-400 hover:bg-green-500/10"}`}>
              STORIES
            </button>
            <button onClick={() => handleNavigate("/guide-booking")} className={`py-3 px-4 rounded-lg text-left font-semibold tracking-wider uppercase transition-colors ${isActive("/guide-booking") ? "text-green-400 bg-green-500/10" : "text-white hover:text-green-400 hover:bg-green-500/10"}`}>
              GUIDE BOOKING
            </button>
            <button onClick={() => handleNavigate("/contact")} className={`py-3 px-4 rounded-lg text-left font-semibold tracking-wider uppercase transition-colors ${isActive("/contact") ? "text-green-400 bg-green-500/10" : "text-white hover:text-green-400 hover:bg-green-500/10"}`}>
              CONTACT
            </button>
          </div>
        </div>
      )}

      {!isMobile && mobileMenuOpen && (
        <div className="bg-black/98 border-t border-green-500/20 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6 grid grid-cols-3 gap-8">
              
              <div>
                <h3 className="text-green-400 font-bold text-lg mb-3 uppercase tracking-wider">Quick Links</h3>
                <div className="space-y-2">
                  <button onClick={() => handleNavigate("/")} className="block text-white hover:text-green-400 transition-colors text-sm uppercase tracking-wider">Home</button>
                  <button onClick={() => handleNavigate("/stories")} className="block text-white hover:text-green-400 transition-colors text-sm uppercase tracking-wider">Stories</button>
                  <button onClick={() => handleNavigate("/guide-booking")} className="block text-white hover:text-green-400 transition-colors text-sm uppercase tracking-wider">Guide Booking</button>
                </div>
              </div>

              <div>
                <h3 className="text-green-400 font-bold text-lg mb-3 uppercase tracking-wider">Connect</h3>
                <div className="space-y-2">
                  <button onClick={() => handleNavigate("/contact")} className="block text-white hover:text-green-400 transition-colors text-sm uppercase tracking-wider">Contact Us</button>
                  <a href="mailto:saalik130@gmail.com" className="block text-white hover:text-green-400 transition-colors text-sm uppercase tracking-wider">Email Us</a>
                  <a href="tel:+9779840836892" className="block text-white hover:text-green-400 transition-colors text-sm uppercase tracking-wider">Call Us</a>
                </div>
              </div>

              <div>
                <h3 className="text-green-400 font-bold text-lg mb-3 uppercase tracking-wider">Explore</h3>
                <div className="space-y-2">
                  <button onClick={() => handleNavigate("/login")} className="block text-white hover:text-green-400 transition-colors text-sm uppercase tracking-wider">Login</button>
                  <button onClick={() => handleNavigate("/stories")} className="block text-white hover:text-green-400 transition-colors text-sm uppercase tracking-wider">Discover Stories</button>
                  <button onClick={() => handleNavigate("/guide-booking")} className="block text-white hover:text-green-400 transition-colors text-sm uppercase tracking-wider">Find a Guide</button>
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