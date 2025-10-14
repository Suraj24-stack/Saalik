import React, { useState } from 'react';
import HeroCarousel from '../components/HeroCarousel';
import AboutSection from '../components/AboutSection';
import StoriesPreview from '../components/StoriesPreview';
import GuideBookingSection from './GuideBookingSection';
import PartnersSection from '../components/PartnersSection';
import InitiativesCarousel from '../components/InitiativesCarousel';
import Modal from '../components/Modal';

const HomePage = ({ setCurrentPage, setSelectedStory }) => {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleWaitlistSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      alert('Please fill in all required fields');
      return;
    }

    console.log('Waitlist submission:', formData);
    alert('Thank you for joining the waitlist!');
    
    setFormData({ name: '', email: '', message: '' });
    setShowWaitlist(false);
  };

  return (
    <div>
      <HeroCarousel />
      <AboutSection />
      <StoriesPreview 
        onViewAll={() => setCurrentPage('stories')} 
        onStoryClick={(id) => { 
          setSelectedStory(id); 
          setCurrentPage('story-detail'); 
        }} 
      />
      <GuideBookingSection onJoinWaitlist={() => setShowWaitlist(true)} />
      <PartnersSection />
      <InitiativesCarousel />
      
      {showWaitlist && (
        <Modal onClose={() => setShowWaitlist(false)} title="Join Waitlist">
          <form onSubmit={handleWaitlistSubmit} className="space-y-4">
            <div>
              <label className="block text-white mb-2 text-sm font-medium">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                required
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:border-green-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-white mb-2 text-sm font-medium">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                placeholder="your.email@example.com"
                required
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:border-green-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-white mb-2 text-sm font-medium">
                Message <span className="text-gray-500">(Optional)</span>
              </label>
              <textarea
                placeholder="Any special requests or questions..."
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:border-green-400 outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded-lg transition-all"
            >
              Join Waitlist
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default HomePage;