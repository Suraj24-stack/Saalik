const StoryCard = ({ story, onClick }) => (
  <div onClick={onClick} className="group cursor-pointer bg-gray-900/50 rounded-2xl overflow-hidden border-2 border-green-500/30 hover:border-green-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20">
    <div className="aspect-square overflow-hidden bg-gray-800">
      <img src={story.image} alt={story.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
    </div>
    <div className="p-4">
      <h3 className="text-white font-semibold text-lg group-hover:text-green-400 transition-colors">{story.title}</h3>
    </div>
  </div>
);