import React, { useState } from "react";
import HeroCarousel from "../components/HeroCarousel";
import AboutSection from "../components/AboutSection";
import StoriesPreview from "../components/StoriesPreview";
import GuideBookingSection from "../pages/GuideBookingSection";
import PartnersSection from "../components/PartnersSection";
import InitiativesCarousel from "../components/InitiativesCarousel";
import { WaitlistModal, SuggestStoryModal } from "../components/Modal"; // ✅ Correct import

const HomePage = ({ setCurrentPage, setSelectedStory }) => {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [showSuggestStory, setShowSuggestStory] = useState(false);

  return (
    <div className="bg-black text-white">
      <HeroCarousel />
      <AboutSection />

      <StoriesPreview
        onViewAll={() => setCurrentPage("stories")}
        onStoryClick={(id) => {
          setSelectedStory(id);
          setCurrentPage("story-detail");
        }}
      />

      <GuideBookingSection onJoinWaitlist={() => setShowWaitlist(true)} />
      <PartnersSection />
      <InitiativesCarousel />

      {/* ✅ Only include modals (no <Modal />) */}
      <WaitlistModal
        isOpen={showWaitlist}
        onClose={() => setShowWaitlist(false)}
      />
      <SuggestStoryModal
        isOpen={showSuggestStory}
        onClose={() => setShowSuggestStory(false)}
      />
    </div>
  );
};

export default HomePage;
