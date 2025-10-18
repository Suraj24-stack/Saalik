import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import HomePage from "./pages/HomePage.jsx";
import StoriesPage from "./pages/StoriesPage.jsx";
import GuideBookingPage from "./pages/GuideBookingPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import Login from "./pages/Login.jsx";
import Footer from "./components/Footer.jsx";
import SaalikAdminDashboard from "./dashboard/adminDashboard.jsx";
import SaalikuserDashboard from "./dashboard/userDashboard.jsx";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const [showContact, setShowContact] = useState(false);

  return (
    <>
      <Navbar onContact={() => setShowContact(true)} />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stories" element={<StoriesPage />} />
        <Route path="/guide-booking" element={<GuideBookingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<SaalikAdminDashboard />} />
        <Route path="/user" element={<SaalikuserDashboard />} />
      </Routes>

      {/* Contact Modal */}
      <AnimatePresence>
        {showContact && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setShowContact(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              {/* Modal Container */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20 
                }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-md"
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowContact(false)}
                  className="absolute -top-2 -right-2 z-10 bg-green-500 hover:bg-green-600 text-white rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
                  aria-label="Close contact modal"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </button>

                {/* Contact Card */}
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border-2 border-green-500 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
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
                        className="text-white text-xl hover:text-green-400 transition-colors duration-300 break-all"
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
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}

export default App;