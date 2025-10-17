import React from "react";

// Mock data
const guideBookingData = {
  image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=800&fit=crop",
  imageAlt: "Tour Guide in Nepal",
  title: {
    normal: "GUIDE",
    highlighted: "BOOKING"
  },
  description: [
    {
      text: "Discover Nepal with confidence by ",
      highlight: "booking certified local guides",
      continuation: " through SAALIK. Our ",
      highlight2: "expert guides",
      end: " bring culture, history, and spirituality to life."
    },
    {
      text: "From heritage walks to temple tours, they help you ",
      highlight: "experience Nepal beyond the surface",
      end: "."
    }
  ],
  buttonText: "LAUNCHING SOON"
};

const GuideBookingSection = ({ onJoinWaitlist, data = guideBookingData }) => (
  <section className="bg-gradient-to-b from-black via-black to-green-900 py-20 px-4 border-t border-green-600/30">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      
      {/* Image with green shadow */}
      <div className="flex justify-center relative">
        <img
          src={data.image}
          alt={data.imageAlt}
          className="rounded-2xl border-4 border-green-600 shadow-[0_0_15px_rgba(5,150,105,0.7)] w-full max-w-md object-cover"
        />
      </div>

      {/* Text & Button */}
      <div>
        <h2 className="text-5xl font-extrabold text-white mb-6">
          <span className="text-green-500">{data.title.normal}</span> {data.title.highlighted}
        </h2>
        <div className="space-y-6 text-green-300 leading-relaxed mb-10">
          <p>
            {data.description[0].text}
            <span className="font-semibold text-green-400 underline decoration-green-400">
              {data.description[0].highlight}
            </span>
            {data.description[0].continuation}
            <span className="font-semibold text-green-400 underline decoration-green-400">
              {data.description[0].highlight2}
            </span>
            {data.description[0].end}
          </p>
          <p>
            {data.description[1].text}
            <span className="font-semibold text-green-400 underline decoration-green-400">
              {data.description[1].highlight}
            </span>
            {data.description[1].end}
          </p>
        </div>
        <button
          onClick={onJoinWaitlist}
          className="bg-green-600 hover:bg-green-500 text-black font-bold py-4 px-10 rounded-full transition-all hover:scale-105 shadow-lg shadow-green-600/70"
        >
          {data.buttonText}
        </button>
      </div>
    </div>
  </section>
);

export default GuideBookingSection;