import React, { useState } from 'react';
import Modal from '../components/Modal';

const GuideBookingPage = () => {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [waitlistData, setWaitlistData] = useState({ name: '', email: '', message: '' });
  
  const handleWaitlistSubmit = () => {
    if (!waitlistData.name || !waitlistData.email) {
      alert('Please fill in required fields');
      return;
    }
    alert('Thank you for joining the waitlist!');
    setShowWaitlist(false);
    setWaitlistData({ name: '', email: '', message: '' });
  };
  
  return (
    <div className="bg-black min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
          <span className="text-green-400">GUIDE</span> BOOKING
        </h1>
        
        <div className="w-64 h-80 bg-gradient-to-br from-green-900 to-black rounded-lg flex items-center justify-center mx-auto mb-8">
          <div className="text-9xl">🧑‍🤝‍🧑</div>
        </div>
        
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          Discover Nepal with confidence by <span className="text-green-400">booking certified local guides</span> through SAALIK.
        </p>
        
        <div className="bg-gray-900 border-2 border-green-500 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-green-400 mb-4">Coming Soon!</h2>
          <p className="text-gray-300 mb-6">
            Join our waitlist to be notified when we launch.
          </p>
          <button 
            onClick={() => setShowWaitlist(true)}
            className="bg-green-500 text-black px-8 py-3 rounded-full font-semibold hover:bg-green-400 transition-all"
          >
            JOIN WAITLIST
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="bg-gray-900 p-6 rounded-lg border border-green-500">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-white mb-2">Certified Guides</h3>
            <p className="text-gray-400">Verified professionals with deep local knowledge.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-green-500">
            <div className="text-4xl mb-4">🗺️</div>
            <h3 className="text-xl font-bold text-white mb-2">Custom Itineraries</h3>
            <p className="text-gray-400">Personalized tours tailored to your interests.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg border border-green-500">
            <div className="text-4xl mb-4">💬</div>
            <h3 className="text-xl font-bold text-white mb-2">24/7 Support</h3>
            <p className="text-gray-400">Round-the-clock assistance.</p>
          </div>
        </div>
      </div>
      
      <Modal isOpen={showWaitlist} onClose={() => setShowWaitlist(false)}>
        <h3 className="text-2xl font-bold text-white mb-4">Join Our Waitlist</h3>
        <p className="text-gray-400 mb-6">Be the first to know when we launch!</p>
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

export default GuideBookingPage;
