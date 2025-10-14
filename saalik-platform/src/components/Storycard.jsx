import React from 'react';

const StoryCard = ({ story, onClick }) => {
  return (
    <div 
      onClick={() => onClick(story)}
      className="bg-black border-2 border-green-500 rounded-lg overflow-hidden cursor-pointer transform transition-all hover:scale-105 hover:border-green-400 hover:shadow-lg hover:shadow-green-500/50"
    >
      <div className="aspect-square overflow-hidden">
        <img 
          src={story.image} 
          alt={story.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-white font-medium text-sm text-center">{story.title}</h3>
      </div>
    </div>
  );
};

export default StoryCard;