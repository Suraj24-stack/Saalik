import React from 'react';
import { X } from 'lucide-react';

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Contact Information Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border-2 border-green-500 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
          {/* Close Button */}
          <button className="absolute top-4 right-4 text-white hover:text-green-400 transition-colors">
            <X size={24} />
          </button>

          {/* Header */}
          <h2 className="text-3xl font-bold text-green-400 mb-10 text-center tracking-wide">
            Contact Information
          </h2>

          {/* Email Section */}
          <div className="mb-8">
            <div className="border-l-4 border-green-500 pl-6 py-2">
              <div className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-2">
                EMAIL
              </div>
              <a 
                href="mailto:saalik130@gmail.com" 
                className="text-white text-xl hover:text-green-400 transition-colors duration-300"
              >
                saalik130@gmail.com
              </a>
            </div>
          </div>

          {/* Phone Section */}
          <div className="mb-10">
            <div className="border-l-4 border-green-500 pl-6 py-2">
              <div className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-2">
                PHONE
              </div>
              <a 
                href="tel:+9779840836892" 
                className="text-white text-xl hover:text-green-400 transition-colors duration-300"
              >
                +977-9840836892
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-green-500/30 mb-8"></div>

          {/* Connect With Us Section */}
          <div>
            <h3 className="text-green-400 text-lg font-bold mb-6 tracking-wide">
              Connect With Us
            </h3>
            
            <div className="space-y-5">
              {/* Facebook */}
              <div className="flex items-center justify-between py-2 border-b border-gray-800 hover:border-green-500/30 transition-colors">
                <span className="text-white font-medium">Facebook</span>
                <a 
                  href="https://facebook.com/saalik" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 transition-colors duration-300"
                >
                  /saalik
                </a>
              </div>

              {/* YouTube */}
              <div className="flex items-center justify-between py-2 border-b border-gray-800 hover:border-green-500/30 transition-colors">
                <span className="text-white font-medium">YouTube</span>
                <a 
                  href="https://youtube.com/@saalik0" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 transition-colors duration-300"
                >
                  /saalik0
                </a>
              </div>

              {/* Instagram */}
              <div className="flex items-center justify-between py-2 border-b border-gray-800 hover:border-green-500/30 transition-colors">
                <span className="text-white font-medium">Instagram</span>
                <a 
                  href="https://instagram.com/saalik0" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:text-green-300 transition-colors duration-300"
                >
                  /saalik0
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 bg-green-500/10 blur-3xl rounded-3xl -z-10"></div>
      </div>
    </div>
  );
};

export default ContactPage;