import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-green-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-2">
                <span className="text-black font-bold">S</span>
              </div>
              <span className="text-white text-lg font-bold">SAALIK</span>
            </div>
            <p className="text-gray-400 text-sm">
              Delivering innovative technology solutions with excellence and integrity.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm">Stories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm">Guide Booking</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm">Team</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Connect With Us</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm">Facebook /saalik</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm">YouTube /saalik0</a></li>
              <li><a href="#" className="text-gray-400 hover:text-green-400 text-sm">Instagram /saalik0</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-green-900 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 SAALIK TECH PVT. LTD. All rights reserved</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="text-gray-400 hover:text-green-400 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-green-400 text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;