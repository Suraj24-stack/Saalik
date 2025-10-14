const HomePage = ({ setCurrentPage, setSelectedStory }) => {
  const [showWaitlist, setShowWaitlist] = useState(false);
  return (
    <div>
      <HeroCarousel />
      <AboutSection />
      <StoriesPreview onViewAll={() => setCurrentPage('stories')} onStoryClick={(id) => { setSelectedStory(id); setCurrentPage('story-detail'); }} />
      <GuideBookingSection onJoinWaitlist={() => setShowWaitlist(true)} />
      <PartnersSection />
      <InitiativesCarousel />
      <WaitlistModal isOpen={showWaitlist} onClose={() => setShowWaitlist(false)} />
    </div>
  );
};

const StoriesPage = ({ setCurrentPage, setSelectedStory }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestModal, setShowSuggestModal] = useState(false);
  const filteredStories = mockData.stories.filter(story => story.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-12">
          <span className="text-white">THE </span><span className="text-green-400">UNTOLD STORIES </span>
          <span className="text-white">OF </span><span className="text-green-400">NEPAL</span>
        </h1>
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input type="text" placeholder="Search stories..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-gray-900 border border-green-500/30 rounded-full text-white placeholder-gray-500 focus:border-green-400 outline-none" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredStories.map((story) => (
            <StoryCard key={story.id} story={story} onClick={() => { setSelectedStory(story.id); setCurrentPage('story-detail'); }} />
          ))}
        </div>
        <div className="text-center">
          <button onClick={() => setShowSuggestModal(true)} className="bg-green-500 hover:bg-green-400 text-black font-bold py-3 px-8 rounded-full transition-all hover:scale-105 shadow-lg shadow-green-500/50">
            SUGGEST STORIES
          </button>
        </div>
      </div>
      <SuggestStoryModal isOpen={showSuggestModal} onClose={() => setShowSuggestModal(false)} />
    </div>
  );
};

const StoryDetailPage = ({ storyId, setCurrentPage, setSelectedStory }) => {
  const story = mockData.stories.find(s => s.id === storyId) || mockData.stories[0];
  const relatedStories = mockData.stories.filter(s => s.id !== storyId).slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => setCurrentPage('stories')} className="text-green-400 hover:text-green-300 mb-8 flex items-center space-x-2">
          <ChevronLeft size={20} /><span>Back to Stories</span>
        </button>
        <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-8">{story.title.toUpperCase()}</h1>
        <div className="mb-8 rounded-2xl overflow-hidden">
          <img src={story.image} alt={story.title} className="w-full h-96 object-cover" />
        </div>
        <div className="prose prose-invert prose-green max-w-none">
          <div className="text-gray-300 leading-relaxed space-y-6">
            {story.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-justify">{paragraph}</p>
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
              <StoryCard key={relatedStory.id} story={relatedStory}
                onClick={() => { setSelectedStory(relatedStory.id); window.scrollTo(0, 0); }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const GuideBookingPage = () => {
  const [showWaitlist, setShowWaitlist] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-8">
          <span className="text-green-400">GUIDE</span><span className="text-white"> BOOKING</span>
        </h1>
        <div className="bg-gray-900 rounded-2xl p-12 border-2 border-green-500/30">
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-green-500 to-green-700 flex items-center justify-center">
              <span className="text-6xl">🗺️</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Coming Soon!</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              We're working hard to bring you the best guide booking experience. Join our waitlist to be notified when we launch.
            </p>
          </div>
          <button onClick={() => setShowWaitlist(true)} className="bg-green-500 hover:bg-green-400 text-black font-bold py-4 px-12 rounded-full transition-all hover:scale-105 shadow-lg shadow-green-500/50">
            JOIN WAITLIST
          </button>
        </div>
      </div>
      <WaitlistModal isOpen={showWaitlist} onClose={() => setShowWaitlist(false)} />
    </div>
  );
};

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields');
      return;
    }
    alert('Thank you for contacting us!');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-24 pb-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-12">
          <span className="text-white">CONTACT </span><span className="text-green-400">US</span>
        </h1>
        <div className="bg-gray-900 rounded-2xl p-8 border-2 border-green-500/30">
          <div className="space-y-6">
            <div>
              <label className="block text-white mb-2">Name</label>
              <input type="text" required value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white focus:border-green-400 outline-none" />
            </div>
            <div>
              <label className="block text-white mb-2">Email</label>
              <input type="email" required value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white focus:border-green-400 outline-none" />
            </div>
            <div>
              <label className="block text-white mb-2">Message</label>
              <textarea rows={6} required value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white focus:border-green-400 outline-none resize-none" />
            </div>
            <button onClick={handleSubmit} className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded-lg transition-all hover:scale-105">
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};