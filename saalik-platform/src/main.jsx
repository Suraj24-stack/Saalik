// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import StoriesPreview from "./components/StoriesPreview";
// import StoryDetailPage from "./pages/";
// import GuideBookingPage from "./pages/GuideBookingPage";
// import ContactPage from "./pages/ContactPage";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/stories" element={<StoriesPreview />} />
            {/* <Route path="/story/:id" element={<StoryDetailPage />} />
            <Route path="/guide-booking" element={<GuideBookingPage />} />
            <Route path="/contact" element={<ContactPage />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
