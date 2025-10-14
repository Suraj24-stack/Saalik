import React, { useState } from 'react';
import HeroCarousel from '../components/Hero';
import InitiativesCarousel from '../components/InitiativesCarousel';
import Modal from '../components/Modal';
import { mockStories, mockPartners, mockInitiatives } from '../data/mockData';

const HomePage = ({ setCurrentPage }) => {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [waitlistData, setWaitlistData] = useState({ name: '', email: '', message: '' });
  
  const handleWaitlistSubmit = () => {
    if (!waitlistData.name || !waitlistData.email) {
      alert('Please fill in required fields');
      return;
    }
    alert('Thank you for joining the waitlist! We will contact you soon.');
    setShowWaitlist(false);
    setWaitlistData({ name: '', email: '', message: '' });
  };
  
  return (
    <div className="bg-black min-h-screen">
      <HeroCarousel stories={mockStories} />
      
      {/* What is Saalik */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <div className="w-64 h-64 bg-gradient-to-br from-green-900 to-black rounded-full flex items-center justify-center">
              <div className="text-6xl">🗿</div>
            </div>
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              WHAT IS <span className="text-green-400">SAALIK?</span>
            </h2>
            <p className="text-gray-300 leading-relaxed mb-4">
              SAALIK is a cultural tourism and heritage platform dedicated to promoting and showcasing <span className="text-green-400">Nepal's statues and sculptural heritage</span>. By blending technology with tradition, we provide travelers, researchers, and culture enthusiasts with <span className="text-green-400">comprehensive and accessible information</span> on Nepal's cultural heritage, making it accessible worldwide.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We envision becoming the definitive platform for digital heritage tourism. Through a <span className="text-green-400">knowledge-based status recognition</span>, a verified <span className="text-green-400">guide booking system</span>, personalized <span className="text-green-400">travel itineraries</span> and <span className="text-green-400">emergency help support</span>, SAALIK is committed to safeguarding Nepal's timeless legacy.
            </p>
          </div>
        </div>
      </section>
      
      {/* Untold Stories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              UNTOLD <span className="text-green-400">STORIES</span>
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Browse through SAALIK's ever-growing <span className="text-green-400">database of statues and sculptures</span> from across Nepal, where each place carries a <span className="text-green-400">story of kings, gods, traditions, and mythology</span>. More than just icons and imagery, every sculpture is a testament to Nepal's rich craftsmanship inviting you to <span className="text-green-400">explore the cultural heartbeat of Nepal</span>.
            </p>
            <button 
              onClick={() => setCurrentPage('stories')}
              className="bg-green-500 text-black px-8 py-3 rounded-full font-semibold hover:bg-green-400 transition-all"
            >
              SEE OUR STORIES
            </button>
          </div>
          <div className="flex justify-center">
            <div className="w-full h-64 bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center">
              <div className="text-8xl opacity-50">🏛️</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Guide Booking */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <div className="w-64 h-80 bg-gradient-to-br from-green-900 to-black rounded-lg flex items-center justify-center">
              <div className="text-8xl">🧑‍🤝‍🧑</div>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              <span className="text-green-400">GUIDE</span> BOOKING
            </h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Discover Nepal with confidence by <span className="text-green-400">booking certified local guides</span> through SAALIK. Our <span className="text-green-400">curated guide</span> bring culture, history, and spirituality to life while ensuring you <span className="text-green-400">experience Nepal beyond the surface</span>.
            </p>
            <button 
              onClick={() => setShowWaitlist(true)}
              className="bg-green-500 text-black px-8 py-3 rounded-full font-semibold hover:bg-green-400 transition-all"
            >
              LAUNCHING SOON
            </button>
          </div>
        </div>
      </section>
      
      {/* Partners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          IN <span className="text-green-400">ASSOCIATION</span> WITH
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {mockPartners.map((partner, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-900 to-black rounded-full flex items-center justify-center mb-4 text-4xl">
                {partner.logo}
              </div>
              <p className="text-green-400 text-sm text-center font-medium">{partner.name}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Saalik Group */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="border-2 border-green-500 rounded-lg p-8">
          <div className="flex flex-wrap items-center justify-center gap-8">
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              <span className="text-green-400">SAALIK</span> GROUP:
            </h2>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-2xl">S</span>
              </div>
              <div className="text-green-400 font-bold text-xl">SAALIK<br/>DESIGNS</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Initiatives */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          OUR <span className="text-green-400">INITIATIVES</span>
        </h2>
        <InitiativesCarousel initiatives={mockInitiatives} />
      </section>
      
      {/* Modal */}
      <Modal isOpen={showWaitlist} onClose={() => setShowWaitlist(false)}>
        <h3 className="text-2xl font-bold text-white mb-4">Join Our Waitlist</h3>
        <p className="text-gray-400 mb-6">Be the first to know when guide booking launches!</p>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={waitlistData.name}
            onChange={(e) => setWaitlistData({...waitlistData, name: e.target.value})}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-green-500 focus:outline-none focus:border-green-400"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={waitlistData.email}
            onChange={(e) => setWaitlistData({...waitlistData, email: e.target.value})}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-green-500 focus:outline-none focus:border-green-400"
          />
          <textarea
            placeholder="Message (Optional)"
            value={waitlistData.message}
            onChange={(e) => setWaitlistData({...waitlistData, message: e.target.value})}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-green-500 focus:outline-none focus:border-green-400 h-24 resize-none"
          />
          <button
            onClick={handleWaitlistSubmit}
            className="w-full bg-green-500 text-black py-3 rounded-lg font-semibold hover:bg-green-400 transition-all"
          >
            Join Waitlist
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default HomePage;