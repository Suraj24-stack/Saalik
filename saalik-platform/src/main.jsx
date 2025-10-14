import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import StoriesPage from './pages/StoriesPage';
import StoryDetailPage from './pages/StoryDetailPage';
import GuideBookingPage from './pages/GuideBookingPage';
import ContactPage from './pages/ContactPage';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedStory, setSelectedStory] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  
  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} setSelectedStory={setSelectedStory} />;
      case 'stories':
        return <StoriesPage setSelectedStory={setSelectedStory} setCurrentPage={setCurrentPage} />;
      case 'story-detail':
        return <StoryDetailPage story={selectedStory} setSelectedStory={setSelectedStory} setCurrentPage={setCurrentPage} />;
      case 'guide-booking':
        return <GuideBookingPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} setSelectedStory={setSelectedStory} />;
    }
  };
  
  return (
    <div className="bg-black min-h-screen">
      <Navbar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        showMenu={showMenu} 
        setShowMenu={setShowMenu} 
      />
      <main>{renderPage()}</main>
      <Footer />
    </div>
  );
};

export default App;