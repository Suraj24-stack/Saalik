import React, { useState } from "react";
import { mockData } from "../data/MockData";

const GroupSection = () => {
  const [hoveredGroup, setHoveredGroup] = useState(null);

  // Import group data from mockData
  const groups = [
    {
      id: 1,
      name: "SAALIK",
      logo_url: mockData.saalikGroup.mainLogo,
      description: "Main SAALIK brand - Cultural heritage and storytelling",
      website: null,
      is_active: true,
      display_order: 1,
    },
    {
      id: 2,
      name: "SAALIK DESIGNS",
      logo_url: mockData.saalikGroup.designsLogo,
      description: "Creative design and branding solutions",
      website: null,
      is_active: true,
      display_order: 2,
    },
  ];

  // Filter only active groups and sort by display_order
  const activeGroups = groups
    .filter((group) => group.is_active === true)
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

  return (
    <section
      className="relative py-16 md:py-20 px-4 overflow-hidden"
      style={{ backgroundColor: "#000000" }}
    >
      <div className="max-w-7xl mx-auto relative">
        {/* Title and Logos in One Line */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 lg:gap-20">
          {/* Left side - Text */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold whitespace-nowrap">
            <span className="text-green-400">SAALIK</span>
            <span className="text-white"> GROUP:</span>
          </h2>

          {/* Right side - Logos */}
          <div className="flex items-center gap-8 md:gap-12 lg:gap-16">
            {activeGroups.map((group) => (
              <div
                key={group.id}
                className="relative flex flex-col items-center"
                onMouseEnter={() => setHoveredGroup(group.id)}
                onMouseLeave={() => setHoveredGroup(null)}
              >
                {/* Logo Container - Bigger and No Circle */}
                <div
                  className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 flex items-center justify-center transition-all duration-300 cursor-pointer"
                  style={{
                    background: "transparent",
                  }}
                  onClick={() => {
                    if (group.website) {
                      window.open(
                        group.website,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }
                  }}
                >
                  {group.logo_url ? (
                    <img
                      src={group.logo_url}
                      alt={group.name}
                      className="w-full h-full object-contain"
                      style={{
                        filter:
                          hoveredGroup === group.id
                            ? "brightness(1.2) drop-shadow(0 0 10px rgba(16, 185, 129, 0.5))"
                            : "brightness(1)",
                        transition: "filter 0.3s ease",
                      }}
                      onError={(e) => {
                        console.error("Image failed to load:", group.logo_url);
                        e.target.style.display = "none";
                        e.target.nextElementSibling.style.display = "block";
                      }}
                    />
                  ) : null}

                  {/* Fallback icon */}
                  <span
                    className="text-5xl md:text-6xl opacity-50"
                    style={{ display: group.logo_url ? "none" : "block" }}
                  >
                    🏢
                  </span>

                  {/* Website Link Indicator on Hover */}
                  {group.website && hoveredGroup === group.id && (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        background: "rgba(16, 185, 129, 0.2)",
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      <span
                        className="text-sm font-bold px-4 py-2 rounded-full"
                        style={{
                          background: "#10b981",
                          color: "#000",
                        }}
                      >
                        Visit
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* No Groups State */}
        {activeGroups.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/40 mb-6">
              <span className="text-4xl md:text-5xl opacity-50">🏢</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              Coming Soon
            </h3>
            <p className="text-gray-400 text-sm md:text-base">
              Our group companies will be showcased here
            </p>
          </div>
        )}
      </div>

      {/* CSS Animation for fade */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default GroupSection;
