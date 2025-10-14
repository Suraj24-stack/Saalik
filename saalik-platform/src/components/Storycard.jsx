import React from 'react';

const StoryCard = ({ story, onClick }) => {
  return (
    <div 
      onClick={() => onClick(story)}
      className="cursor-pointer group transition-all duration-300"
    >
      <div className="relative overflow-hidden rounded-2xl border-2 border-green-500 transition-all duration-300 group-hover:border-green-400 group-hover:shadow-xl group-hover:shadow-green-500/50 group-hover:scale-105">
        <img 
          src={story.image} 
          alt={story.title}
          className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      </div>
      <h3 className="text-white text-sm mt-3 text-center font-normal">
        {story.title}
      </h3>
    </div>
  );
};

export default StoryCard;