// src/pages/GuideBookingPage.jsx
import React from "react";
import GuideBookingSection from "../pages/GuideBookingSection";

export default function GuideBookingPage() {
  const handleJoinWaitlist = () => {
    alert("Thank you! Guide Booking will launch soon.");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <GuideBookingSection onJoinWaitlist={handleJoinWaitlist} />
    </div>
  );
}
