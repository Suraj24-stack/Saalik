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
          <h2 className="text-5xl font-extrabold text-white mb-6">
            <span className="text-green-500">GUIDE</span> BOOKING
          </h2>
          <div className="space-y-6 text-green-300 leading-relaxed mb-10">
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
            className="bg-green-600 hover:bg-green-500 text-black font-bold py-4 px-10 rounded-full transition-all hover:scale-105 shadow-lg shadow-green-600/70"
          >
            LAUNCHING SOON
          </button>
        </div>
      </div>
    </section>
  );
};

export default GuideBookingSection;
