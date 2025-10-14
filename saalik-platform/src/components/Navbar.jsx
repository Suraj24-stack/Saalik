import React from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = ({ currentPage, setCurrentPage, setShowMenu, showMenu }) => {
  return (
    <nav className="fixed top-0 w-full bg-black bg-opacity-90 backdrop-blur-sm z-50 border-b border-green-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-2">
              <span className="text-black font-bold">S</span>
            </div>
            <span className="text-white text-xl font-bold tracking-wider">SAALIK</span>
          </div>
          
          <div className="hidden md:flex items-center justify-center gap-10">
            {['HOME', 'STORIES', 'GUIDE BOOKING', 'CONTACT'].map((item) => (
         <button
          key={item}
           onClick={() => setCurrentPage(item.toLowerCase().replace(' ', '-'))}
           className={`text-sm font-medium tracking-wide px-3 py-1 transition-colors duration-200 ${
           currentPage === item.toLowerCase().replace(' ', '-')
           ? 'text-green-400 border-b-2 border-green-400'
           : 'text-white hover:text-green-400'
          }`}
         >
          {item}
         </button>
      ))}
     </div>
          
          <button 
            className="md:hidden text-white"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {showMenu && (
        <div className="md:hidden bg-black border-t border-green-900">
          <div className="px-4 py-4 space-y-3">
            {['HOME', 'STORIES', 'GUIDE BOOKING', 'CONTACT'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setCurrentPage(item.toLowerCase().replace(' ', '-'));
                  setShowMenu(false);
                }}
                className={`block w-full text-left py-2 text-sm font-medium ${
                  currentPage === item.toLowerCase().replace(' ', '-')
                    ? 'text-green-400'
                    : 'text-white'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;