import React, { useState } from "react";
import HeroCarousel from "../components/HeroCarousel";
import AboutSection from "../components/AboutSection";
import StoriesPreview from "../components/StoriesPreview";
import GuideBookingSection from "./GuideBookingSection";
import PartnersSection from "../components/PartnersSection";
import InitiativesCarousel from "../components/InitiativesCarousel";
import { WaitlistModal, SuggestStoryModal } from "../components/Modal";
import GroupSection from "../components/OurGroups";

const HomePage = ({ setCurrentPage, setSelectedStory }) => {
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [showSuggestStory, setShowSuggestStory] = useState(false);

  return (
    <div className="bg-black text-white overflow-x-hidden w-full">
      {/* Center content with 5% gap on left and right → width 90% */}
      <div className="w-[90%] mx-auto">
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
        <GroupSection />
        <InitiativesCarousel />
      </div>

      {/* Modals */}
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
