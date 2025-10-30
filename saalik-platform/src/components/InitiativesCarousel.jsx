import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllInitiatives } from "../../store/slices/initiativeSlice";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

const InitiativesCarousel = () => {
  const dispatch = useDispatch();
  const { initiatives, loading, error } = useSelector(state => state.initiative);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;

  // Proper API URL construction
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
  const UPLOADS_BASE_URL = API_BASE_URL.replace('/api/v1', '');

  useEffect(() => {
    dispatch(fetchAllInitiatives());
  }, [dispatch]);

  // Filter only active initiatives and sort by display_order
  const activeInitiatives = initiatives
    .filter(initiative => initiative.is_active === true || initiative.is_active === 'true')
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

  const totalSlides = Math.ceil(activeInitiatives.length / itemsPerView);

  // Helper function to get full logo URL
  const getLogoUrl = (logoUrl) => {
    if (!logoUrl) return null;
    // If it's already a full URL (starts with http), return as is
    if (logoUrl.startsWith('http://') || logoUrl.startsWith('https://')) {
      return logoUrl;
    }
    // Otherwise, prepend the base URL
    return `${UPLOADS_BASE_URL}${logoUrl}`;
  };

  // Auto-advance carousel
  useEffect(() => {
    if (activeInitiatives.length > itemsPerView) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }, 5000); // Change slide every 5 seconds
      return () => clearInterval(interval);
    }
  }, [activeInitiatives.length, itemsPerView, totalSlides]);

  // Loading state
  if (loading) {
    return (
      <section className="py-12 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-green-400" size={48} />
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="py-12 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-8 px-6 rounded-2xl border-2" style={{
            background: 'rgba(239, 68, 68, 0.1)',
            borderColor: 'rgba(239, 68, 68, 0.4)'
          }}>
            <p className="text-red-400 text-base md:text-lg font-medium">
              Failed to load initiatives: {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  // No initiatives state
  if (activeInitiatives.length === 0) {
    return (
      <section className="py-12 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          OUR <span className="text-green-400">INITIATIVES</span>
        </h2>
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/40 mb-6">
            <span className="text-4xl md:text-5xl opacity-50">🚀</span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
            No Initiatives Yet
          </h3>
          <p className="text-gray-400 text-sm md:text-base">
            Check back soon for our latest initiatives
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 text-white">
        OUR <span className="text-green-400">INITIATIVES</span>
      </h2>

      <div className="relative max-w-6xl mx-auto">
        {/* Initiatives Grid */}
        <div className="flex justify-center items-center gap-6 md:gap-8 overflow-hidden px-12">
          {activeInitiatives
            .slice(currentIndex * itemsPerView, currentIndex * itemsPerView + itemsPerView)
            .map((initiative) => {
              const fullLogoUrl = getLogoUrl(initiative.logo_url);
              
              return (
                <div 
                  key={initiative.id} 
                  className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 flex items-center justify-center group"
                  title={initiative.name}
                >
                  {fullLogoUrl ? (
                    <img
                      src={fullLogoUrl}
                      alt={initiative.name}
                      className="object-contain w-full h-full hover:scale-110 transition-transform duration-300 cursor-pointer filter brightness-90 hover:brightness-110"
                      onClick={() => {
                        if (initiative.website) {
                          window.open(initiative.website, '_blank', 'noopener,noreferrer');
                        }
                      }}
                      onError={(e) => {
                        console.error('Initiative logo failed to load:', fullLogoUrl);
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  
                  {/* Fallback icon - shown if no logo or if image fails to load */}
                  <div 
                    className="w-full h-full rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-green-500/40 items-center justify-center"
                    style={{ display: fullLogoUrl ? 'none' : 'flex' }}
                  >
                    <span className="text-4xl opacity-50">🚀</span>
                  </div>
                </div>
              );
            })}
        </div>

        {/* Navigation Buttons - Only show if more initiatives than visible */}
        {activeInitiatives.length > itemsPerView && (
          <>
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-green-400/20 hover:bg-green-400/40 p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Previous initiatives"
            >
              <ChevronLeft size={32} className="text-white" />
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % totalSlides)}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-green-400/20 hover:bg-green-400/40 p-2 md:p-3 rounded-full transition-all duration-300 hover:scale-110"
              aria-label="Next initiatives"
            >
              <ChevronRight size={32} className="text-white" />
            </button>
          </>
        )}

        {/* Pagination Dots */}
        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'w-8 bg-green-400' 
                    : 'w-2 bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Initiative Names (Optional - shows on hover) */}
      <div className="text-center mt-8 min-h-[2rem]">
        <div className="flex justify-center gap-4">
          {activeInitiatives
            .slice(currentIndex * itemsPerView, currentIndex * itemsPerView + itemsPerView)
            .map((initiative) => (
              <p 
                key={`name-${initiative.id}`}
                className="text-green-400 text-xs md:text-sm font-semibold max-w-[120px] md:max-w-[150px] truncate"
              >
                {initiative.name}
              </p>
            ))}
        </div>
      </div>
    </section>
  );
};

export default InitiativesCarousel;