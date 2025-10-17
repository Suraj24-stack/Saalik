import React from "react";
import { mockData } from '../data/MockData';

const GuideBookingSection = ({ onJoinWaitlist }) => (
  <section className="bg-gradient-to-b from-black via-black to-green-900 py-20 px-4 border-t border-green-600/30">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      
      {/* Image with green shadow - LEFT SIDE */}
      <div className="flex justify-center relative">
        <img
          src={mockData.guideBooking.image}
          alt={mockData.guideBooking.imageAlt}
          className="rounded-2xl border-4 border-green-600 shadow-[0_0_15px_rgba(5,150,105,0.7)] w-full max-w-md object-cover"
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
            <span className="font-semibold text-green-400 underline decoration-green-400">booking certified local guides</span>{" "}
            through SAALIK. Our{" "}
            <span className="font-semibold text-green-400 underline decoration-green-400">expert guides</span> bring culture, history, and spirituality to life.
          </p>
          <p>
            From heritage walks to temple tours, they help you{" "}
            <span className="font-semibold text-green-400 underline decoration-green-400">experience Nepal beyond the surface</span>.
          </p>
        </div>
        <button
          onClick={onJoinWaitlist}
          className="bg-green-600 hover:bg-green-500 text-black font-bold py-4 px-10 rounded-full transition-all hover:scale-105 shadow-lg shadow-green-600/70"
        >
          LAUNCHING SOON
        </button>
      </div>
    </div>
  </section>
);

export default GuideBookingSection;