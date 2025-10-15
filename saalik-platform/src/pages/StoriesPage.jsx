import React, { useState } from 'react';
import { Search } from 'lucide-react';
import StoryCard from '../components/Storycard';
import Modal from '../components/Modal';
// Do this in every file:
import mockData, { mockData as mockDataNamed } from "../data/mockData"; // choose default OR named (see below)


const StoriesPage = ({ setCurrentPage, setSelectedStory }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestModal, setShowSuggestModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: ''
  });

  const filteredStories = mockData.stories.filter(story => 
    story.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSuggestSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.location || !formData.description) {
      alert('Please fill in all fields');
      return;
    }

    console.log('Story Suggestion:', formData);
    alert('Thank you for your suggestion!');
    
    setFormData({ title: '', location: '', description: '' });
    setShowSuggestModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-12">
          <span className="text-white">THE </span>
          <span className="text-green-400">UNTOLD STORIES </span>
          <span className="text-white">OF </span>
          <span className="text-green-400">NEPAL</span>
        </h1>

        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search stories..." 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-900 border border-green-500/30 rounded-full text-white placeholder-gray-500 focus:border-green-400 outline-none" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredStories.map((story) => (
            <StoryCard 
              key={story.id} 
              story={story} 
              onClick={() => { 
                setSelectedStory(story.id); 
                setCurrentPage('story-detail'); 
              }} 
            />
          ))}
        </div>

        <div className="text-center">
          <button 
            onClick={() => setShowSuggestModal(true)} 
            className="bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-green-500/50"
          >
            SUGGEST STORIES
          </button>
        </div>
      </div>

      {showSuggestModal && (
        <Modal onClose={() => setShowSuggestModal(false)} title="Suggest a Story">
          <form onSubmit={handleSuggestSubmit} className="space-y-4">
            <div>
              <label className="block text-white mb-2 text-sm font-medium">
                Story Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter the story title"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:border-green-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-white mb-2 text-sm font-medium">
                Location <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                placeholder="Where is this story from?"
                required
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:border-green-400 outline-none"
              />
            </div>

            <div>
              <label className="block text-white mb-2 text-sm font-medium">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                placeholder="Tell us about this story..."
                rows={5}
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:border-green-400 outline-none resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded-lg transition-all"
            >
              Submit Suggestion
            </button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default StoriesPage;