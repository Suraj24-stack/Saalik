const GuideBookingSection = ({ onJoinWaitlist }) => (
  <section className="bg-gradient-to-b from-black to-gray-900 py-20 px-4">
    <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <div className="flex justify-center">
        <img src="/api/placeholder/400/500" alt="Tour Guide" className="rounded-2xl border-4 border-green-500/30" />
      </div>
      <div>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          <span className="text-green-400">GUIDE</span> BOOKING
        </h2>
        <div className="space-y-4 text-gray-300 leading-relaxed mb-8">
          <p>Discover Nepal with confidence by <span className="text-green-400 font-semibold">booking certified local guides</span> through SAALIK. Our <span className="text-green-400 font-semibold">expert guides</span> bring culture, history, and spirituality to life.</p>
          <p>From heritage walks to temple tours, they help you <span className="text-green-400 font-semibold">experience Nepal beyond the surface</span>.</p>
        </div>
        <button onClick={onJoinWaitlist} className="bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-green-500/50">
          LAUNCHING SOON
        </button>
      </div>
    </div>
  </section>
);
