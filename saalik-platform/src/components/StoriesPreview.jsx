import React from "react";
import StoryCard from "./Storycard"; // adjust path if needed
import { mockData } from "../data/MockData"; // adjust path

const StoriesPreview = ({ onViewAll, onStoryClick }) => (
  <section className="bg-black py-20 px-4">
    <div className="max-w-6xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
        <span className="text-white">UNTOLD </span>
        <span className="text-green-400">STORIES</span>
      </h2>
      <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
        Browse through SAALIK's ever-growing database of statues and sculptures
        from across Nepal, where each piece carries a{" "}
        <span className="text-green-400">
          story of kings, gods, artisans, and civilizations
        </span>
        .
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mockData.stories.slice(0, 4).map((story) => (
          <StoryCard
            key={story.id}
            story={story}
            onClick={() => onStoryClick(story.id)}
          />
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={onViewAll}
          className="bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-green-500/50"
        >
          SEE OUR STORIES
        </button>
      </div>
    </div>
  </section>
);

export default StoriesPreview;
