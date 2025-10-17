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
      </Routes>

      {/* Contact Page as Modal */}
      <AnimatePresence>
  {showContact && (
    <motion.div
      key="backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 mt-10 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50"
    >
      <motion.div
        key="modal"
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 40 }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}
        className="relative bg-[#0a0a0a] border border-green-500/30 rounded-2xl shadow-2xl w-[90%] max-w-2xl p-6 text-white"
      >
        {/* Close Button */}
        <button
          onClick={() => setShowContact(false)}
          className="absolute top-3 right-4 text-gray-400 hover:text-green-400 text-2xl font-semibold transition-colors"
        >
          ✕
        </button>

        <ContactPage />
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      <Footer />
    </>
  );
}

export default App;
