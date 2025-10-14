import React from 'react';
import StoryCard from '../components/Storycard';
import { mockStories } from '../data/mockData';

const StoryDetailPage = ({ story, setSelectedStory, setCurrentPage }) => {
  return (
    <div className="bg-black min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">
          THE <span className="text-green-400">SELF EMERGING</span> STATUE OF <span className="text-green-400">KALI</span>
        </h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 leading-relaxed mb-6">
            The sacred grounds of Pashupati Temple in Kathmandu, Nepal, harbor one of the most enigmatic and spiritually significant statues in Hindu mythology - the Self-Emerging Statue of Kali. This ancient statue is revered as a profound symbol of power, protection, and spiritual transformation.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 my-8">
            <img 
              src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600" 
              alt="Kali Statue"
              className="w-full rounded-lg border-2 border-green-500"
            />
            <img 
              src="https://images.unsplash.com/photo-1548013146-72479768bada?w=600" 
              alt="Temple"
              className="w-full rounded-lg border-2 border-green-500"
            />
          </div>
          
          <h2 className="text-2xl font-bold text-green-400 mb-4">Historical Origins</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            The statue of Bhagavathi was erected during the reign of the Kirat dynasty, one of Nepal's most ancient ruling families. Archaeological excavations have confirmed ancient structures in the Pashupati complex dating back to the 2nd century BCE.
          </p>
          
          <h2 className="text-2xl font-bold text-green-400 mb-4">The Legend</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            According to ancient Hindu Purana tradition and local Kirat mythology, Vijnpakhala was a child from a poor family who embarked on a quest to find his missing father.
          </p>
          
          <h2 className="text-2xl font-bold text-green-400 mb-4">Conclusion</h2>
          <p className="text-gray-300 leading-relaxed mb-8">
            The self-emerging statue represents far more than an ancient religious artifact. It embodies Nepal's profound spiritual and cultural heritage.
          </p>
        </div>
        
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-white mb-8 text-center">Explore More Stories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mockStories.map((relatedStory, idx) => (
              <StoryCard 
                key={idx} 
                story={relatedStory} 
                onClick={(story) => {
                  setSelectedStory(story);
                  window.scrollTo(0, 0);
                }} 
              />
            ))}
          </div>
          <div className="text-center mt-8">
            <button 
              onClick={() => setCurrentPage('stories')}
              className="bg-green-500 text-black px-8 py-3 rounded-full font-semibold hover:bg-green-400 transition-all"
            >
              Explore More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetailPage;