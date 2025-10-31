import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllInitiatives } from "../../store/slices/initiativeSlice";
import { Loader2 } from "lucide-react";

const InitiativesCarousel = () => {
  const dispatch = useDispatch();
  const { initiatives, loading, error } = useSelector(
    (state) => state.initiative
  );
  const [isPaused, setIsPaused] = useState(false);

  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";
  const UPLOADS_BASE_URL = API_BASE_URL.replace("/api/v1", "");

  useEffect(() => {
    dispatch(fetchAllInitiatives());
  }, [dispatch]);

  const activeInitiatives = initiatives
    .filter((initiative) => initiative.is_active === true || initiative.is_active === "true")
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

  const getLogoUrl = (logoUrl) => {
    if (!logoUrl) return null;
    if (logoUrl.startsWith("http://") || logoUrl.startsWith("https://")) {
      return logoUrl;
    }
    return `${UPLOADS_BASE_URL}${logoUrl}`;
  };

  const duplicatedInitiatives = [
    ...activeInitiatives,
    ...activeInitiatives,
    ...activeInitiatives,
  ];

  if (loading) {
    return (
      <section className="py-12 px-[2.5%] bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-green-400" size={48} />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 px-[2.5%] bg-gradient-to-b from-black via-gray-900 to-black">
        <div className="max-w-4xl mx-auto">
          <div
            className="text-center py-8 px-6 rounded-2xl border-2"
            style={{
              background: "rgba(239, 68, 68, 0.1)",
              borderColor: "rgba(239, 68, 68, 0.4)",
            }}
          >
            <p className="text-red-400 text-base md:text-lg font-medium">
              Failed to load initiatives: {error}
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (activeInitiatives.length === 0) {
    return (
      <section className="py-12 px-[2.5%] bg-gradient-to-b from-black via-gray-900 to-black">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 text-white">
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
    <section className="relative py-20 md:py-28 px-[2.5%] overflow-hidden">
      <div className="max-w-[95%] mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-12 md:mb-16 text-white">
          OUR <span className="text-green-400">INITIATIVES</span>
        </h2>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden">
            <div
              className="flex"
              style={{
                animation: isPaused ? "none" : "scroll 40s linear infinite",
                width: `${duplicatedInitiatives.length * 18}rem`,
              }}
            >
              {duplicatedInitiatives.map((initiative, index) => {
                const fullLogoUrl = getLogoUrl(initiative.logo_url);
                return (
                  <div
                    key={`${initiative.id}-${index}`}
                    className="flex-shrink-0 w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-72 xl:h-72 flex items-center justify-center mx-2"
                    title={initiative.name}
                  >
                    {fullLogoUrl ? (
                      <img
                        src={fullLogoUrl}
                        alt={initiative.name}
                        className="object-contain w-full h-full transition-all duration-300 cursor-pointer"
                        style={{ filter: "brightness(0.9)" }}
                        onMouseEnter={(e) => {
                          e.target.style.filter =
                            "brightness(1.2) drop-shadow(0 0 10px rgba(16, 185, 129, 0.5))";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.filter = "brightness(0.9)";
                        }}
                        onClick={() => {
                          if (initiative.website) {
                            window.open(
                              initiative.website,
                              "_blank",
                              "noopener,noreferrer"
                            );
                          }
                        }}
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextElementSibling.style.display = "flex";
                        }}
                      />
                    ) : (
                      <div
                        className="w-full h-full rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border-2 items-center justify-center flex"
                      >
                        <span className="text-5xl opacity-50">🚀</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div
            className="absolute top-0 left-0 w-32 h-full pointer-events-none z-10"
            style={{
              background: "linear-gradient(to right, rgb(17, 24, 39), transparent)",
            }}
          />
          <div
            className="absolute top-0 right-0 w-32 h-full pointer-events-none z-10"
            style={{
              background: "linear-gradient(to left, rgb(17, 24, 39), transparent)",
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </section>
  );
};

export default InitiativesCarousel;
