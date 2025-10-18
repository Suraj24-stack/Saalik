// src/pages/GuideBookingPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigate hook
import GuideBookingSection from "./GuideBookingSection";

export default function GuideBookingPage() {
  const navigate = useNavigate(); // ✅ Initialize navigation

  const handleJoinWaitlist = () => {
    // Instead of alert, navigate to the form page
    navigate("/GuideBookingForm");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <GuideBookingSection onJoinWaitlist={handleJoinWaitlist} />
    </div>
  );
}
