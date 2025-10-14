export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedStory, setSelectedStory] = useState(null);

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage setCurrentPage={setCurrentPage} setSelectedStory={setSelectedStory} />;
      case 'stories': return <StoriesPage setCurrentPage={setCurrentPage} setSelectedStory={setSelectedStory} />;
      case 'story-detail': return <StoryDetailPage storyId={selectedStory} setCurrentPage={setCurrentPage} setSelectedStory={setSelectedStory} />;
      case 'guide-booking': return <GuideBookingPage />;
      case 'contact': return <ContactPage />;
      default: return <HomePage setCurrentPage={setCurrentPage} setSelectedStory={setSelectedStory} />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
}