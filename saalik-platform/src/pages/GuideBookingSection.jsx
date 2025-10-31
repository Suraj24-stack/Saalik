import React from "react";
import { mockData } from "../data/MockData";
import { useNavigate } from "react-router-dom";

const GuideBookingSection = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/guide-booking");
  };

  const guideBookingData = mockData.guideBooking;

  return (
    <section className="bg-gradient-to-b from-black via-black to-green-900 py-20 border-t border-green-600/30 w-full">
      <div className="w-full">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          {/* Image - LEFT SIDE (3 columns = 60%) */}
          <div className="md:col-span-3 flex justify-center">
            {guideBookingData.image ? (
              <img
                src={guideBookingData.image}
                alt={guideBookingData.imageAlt || "Guide Booking"}
                className="w-full object-cover mix-blend-lighten drop-shadow-2xl"
              />
            ) : (
              <div className="w-full h-96 flex items-center justify-center bg-gray-800 rounded-lg">
                <span className="text-6xl opacity-30">🗺️</span>
              </div>
            )}
          </div>

          {/* Text Content - RIGHT SIDE (2 columns = 40%) with 5% left padding */}
          <div className="md:col-span-2 pl-[5%]">
            <h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8"
              style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 700 }}
            >
              <span className="text-white">GUIDE </span>
              <span className="text-green-400">BOOKING</span>
            </h2>

            <div className="space-y-6 text-white text-base md:text-lg lg:text-xl leading-relaxed text-justify">
              <p>
                Discover Nepal with confidence by{" "}
                <span className="font-semibold text-green-400">
                  booking verified local guides
                </span>{" "}
                through SAALIK. Our{" "}
                <span className="font-semibold text-green-400">
                  trusted guides
                </span>{" "}
                bring culture, history, and spirituality to life while ensuring
                your journey is both{" "}
                <span className="font-semibold text-green-400">
                  safe and insightful
                </span>
                . With expertise ranging from heritage walks to temple tours, they
                help you{" "}
                <span className="font-semibold text-green-400">
                  experience Nepal
                </span>{" "}
                beyond the surface.
              </p>
            </div>
          </div>
        </div>

        {/* Centered Button Below Both Image and Text */}
        <div className="flex justify-center mt-12">
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
