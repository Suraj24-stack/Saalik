import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllInitiatives } from "../../store/slices/initiativeSlice";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

const InitiativesCarousel = () => {
  const dispatch = useDispatch();
  const { initiatives, loading, error } = useSelector(state => state.initiative);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;

  useEffect(() => { dispatch(fetchAllInitiatives()); }, [dispatch]);
  const totalSlides = Math.ceil(initiatives.length / itemsPerView);
  const API_BASE_URL = import.meta.env.VITE_API_URL;

  if (loading) return <Loader2 className="animate-spin text-green-400" size={48} />;

  if (error) return <p className="text-red-500 text-center mt-4">Failed to load initiatives: {error}</p>;

  if (initiatives.length === 0) return <p className="text-gray-400 text-center mt-4">No initiatives available.</p>;

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-black via-gray-900 to-black">
      <h2 className="text-3xl font-bold text-center mb-12 text-white">
        OUR <span className="text-green-400">INITIATIVES</span>
      </h2>

      <div className="relative max-w-6xl mx-auto">
        <div className="flex justify-center gap-8 overflow-hidden">
          {initiatives
            .slice(currentIndex * itemsPerView, currentIndex * itemsPerView + itemsPerView)
            .map(i => (
              <div key={i.id} className="w-32 h-32 flex items-center justify-center">
                {i.logo_url && (
                  <img
                    src={i.logo_url.startsWith("http") ? i.logo_url : `${API_BASE_URL}${i.logo_url}`}
                    alt={i.name}
                    className="object-contain w-full h-full hover:scale-110 transition-transform"
                  />
                )}
              </div>
            ))}
        </div>

        {initiatives.length > itemsPerView && (
          <>
            <button
              onClick={() => setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-green-400/20 hover:bg-green-400/40 p-2 rounded-full"
            >
              <ChevronLeft size={32} className="text-white" />
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % totalSlides)}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-green-400/20 hover:bg-green-400/40 p-2 rounded-full"
            >
              <ChevronRight size={32} className="text-white" />
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default InitiativesCarousel;
