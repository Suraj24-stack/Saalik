import React from "react";
import { mockData } from "../data/MockData";
import { useNavigate } from "react-router-dom";

const GuideBookingSection = ({ onJoinWaitlist }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/GuideBookingForm"); // navigate when button clicked
  };

  return (
    <section className="bg-gradient-to-b from-black via-black to-green-900 py-20 px-4 border-t border-green-600/30">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Image - LEFT SIDE */}
        <div className="flex justify-center bg-gradient-to-b from-black to-transparent">
          <img
            src={mockData.guideBooking.image}
            alt={mockData.guideBooking.imageAlt}
            className="w-full max-w-md object-cover mix-blend-lighten"
          />
        </div>

        {/* Text & Button - RIGHT SIDE */}
        <div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            <span className="text-white">GUIDE </span>
            <span className="text-green-400">BOOKING</span>
          </h2>
          
          <div className="space-y-6 text-white text-base md:text-lg lg:text-xl leading-relaxed mb-10 text-justify">
            <p>
              Discover Nepal with confidence by{" "}
              <span className="font-semibold text-green-400 underline decoration-green-400">
                booking verified local guides
              </span>{" "}
              through SAALIK. Our{" "}
              <span className="font-semibold text-green-400 underline decoration-green-400">
                trusted guides
              </span>{" "}
              bring culture, history, and spirituality to life while ensuring
              your journey is both{" "}
              <span className="font-semibold text-green-400 underline decoration-green-400">
                safe and insightful
              </span>
              . With expertise ranging from heritage walks to temple tours, they
              help you{" "}
              <span className="font-semibold text-green-400 underline decoration-green-400">
                experience Nepal
              </span>{" "}
              beyond the surface.
            </p>
          </div>

          <button
            onClick={handleClick}
            className="bg-green-500 hover:bg-green-400 text-white font-black text-base md:text-lg py-4 md:py-5 px-12 md:px-16 rounded-full transition-all duration-300 hover:scale-105 shadow-2xl shadow-green-500/40 tracking-wider uppercase"
          >
            JOIN WAITLIST
          </button>
        </div>
      </div>
    </section>
  );
};

export default GuideBookingSection;