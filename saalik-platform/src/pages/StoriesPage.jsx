import React, { useState } from 'react';
import StoryCard from '../components/Storycard';
import Modal from '../components/Modal';
import { mockStories } from '../data/mockData';

const StoriesPage = ({ setSelectedStory, setCurrentPage }) => {
  const [showSuggest, setShowSuggest] = useState(false);
  const [suggestData, setSuggestData] = useState({ title: '', description: '', email: '' });
  
  const handleSuggestSubmit = () => {
    if (!suggestData.title || !suggestData.description || !suggestData.email) {
      alert('Please fill in all fields');
      return;
    }
    alert('Thank you for your story suggestion!');
    setShowSuggest(false);
    setSuggestData({ title: '', description: '', email: '' });
  };
  
  return (
    <div className="bg-black min-h-screen pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
          THE <span className="text-green-400">UNTOLD STORIES</span> OF <span className="text-green-400">NEPAL</span>
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[...mockStories, ...mockStories, ...mockStories, ...mockStories].map((story, idx) => (
            <StoryCard 
              key={idx} 
              story={story} 
              onClick={(story) => {
                setSelectedStory(story);
                setCurrentPage('story-detail');
              }} 
            />
          ))}
        </div>
        
        <div className="text-center">
          <button 
            onClick={() => setShowSuggest(true)}
            className="bg-green-500 text-black px-8 py-3 rounded-full font-semibold hover:bg-green-400 transition-all"
          >
            SUGGEST STORIES
          </button>
        </div>
      </div>
      
      <Modal isOpen={showSuggest} onClose={() => setShowSuggest(false)}>
        <h3 className="text-2xl font-bold text-white mb-4">Suggest a Story</h3>
        <p className="text-gray-400 mb-6">Share an untold story from Nepal's heritage</p>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Story Title"
            value={suggestData.title}
            onChange={(e) => setSuggestData({...suggestData, title: e.target.value})}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-green-500 focus:outline-none focus:border-green-400"
          />
          <textarea
            placeholder="Story Description"
            value={suggestData.description}
            onChange={(e) => setSuggestData({...suggestData, description: e.target.value})}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-green-500 focus:outline-none focus:border-green-400 h-32 resize-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={suggestData.email}
            onChange={(e) => setSuggestData({...suggestData, email: e.target.value})}
            className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-green-500 focus:outline-none focus:border-green-400"
          />
          <button
            onClick={handleSuggestSubmit}
            className="w-full bg-green-500 text-black py-3 rounded-lg font-semibold hover:bg-green-400 transition-all"
          >
            Submit Suggestion
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default StoriesPage;
