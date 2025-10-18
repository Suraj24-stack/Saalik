import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // ✅ Import hooks
import { ChevronLeft } from 'lucide-react';
import StoryCard from '../components/Storycard';
import { mockData } from '../data/MockData';  // ✅ Fixed import

const StoryDetailPage = () => {
  const { id } = useParams();  // ✅ Get ID from URL
  const navigate = useNavigate();  // ✅ Initialize navigate
  
  const story = mockData.stories.find(s => s.id === parseInt(id)) || mockData.stories[0];
  const relatedStories = mockData.stories.filter(s => s.id !== parseInt(id)).slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/stories')}  // ✅ Navigate back
          className="text-green-400 hover:text-green-300 mb-8 flex items-center space-x-2"
        >
          <ChevronLeft size={20} />
          <span>Back to Stories</span>
        </button>

        <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-8">
          {story.title.toUpperCase()}
        </h1>

        <div className="mb-8 rounded-2xl overflow-hidden">
          <img 
            src={story.image} 
            alt={story.title} 
            className="w-full h-96 object-cover" 
          />
        </div>

        <div className="prose prose-invert prose-green max-w-none">
          <div className="text-gray-300 leading-relaxed space-y-6">
            {story.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-justify">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="text-center my-16">
          <button className="bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-green-500/50">
            Explore More
          </button>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold text-white mb-6">Related Stories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedStories.map((relatedStory) => (
              <StoryCard 
                key={relatedStory.id} 
                story={relatedStory}
                onClick={() => { 
                  navigate(`/stories/${relatedStory.id}`);  // ✅ Navigate to related story
                  window.scrollTo(0, 0); 
                }} 
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetailPage;