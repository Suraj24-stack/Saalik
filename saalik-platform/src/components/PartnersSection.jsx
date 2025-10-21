import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPartners } from '../../store/slices/partnerSlice';

const PartnersSection = () => {
  const [hoveredPartner, setHoveredPartner] = useState(null);
  const dispatch = useDispatch();
  
  // Get partners from Redux store
  const { partners, loading, error } = useSelector((state) => state.partner);

  // Fetch partners on component mount
  useEffect(() => {
    dispatch(fetchAllPartners());
  }, [dispatch]);

  // Filter only active partners for frontend display and sort by display_order
  const activePartners = partners
    .filter(partner => partner.is_active === true || partner.is_active === 'true')
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

  return (
    <section className="relative py-20 md:py-28 px-4 overflow-hidden" style={{ backgroundColor: '#001410' }}>
      
      {/* Background Pattern - Dark Green Grid */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='1'%3E%3Cpath d='M0 0h1v1H0V0zm10 0h1v1h-1V0zm10 0h1v1h-1V0zm10 0h1v1h-1V0zm10 0h1v1h-1V0zm10 0h1v1h-1V0zm10 0h1v1h-1V0zm10 0h1v1h-1V0zM0 10h1v1H0v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zM0 20h1v1H0v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zM0 30h1v1H0v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zM0 40h1v1H0v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zM0 50h1v1H0v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zM0 60h1v1H0v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zM0 70h1v1H0v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1zm10 0h1v1h-1v-1z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        
        {/* Title */}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 md:mb-20">
          <span className="text-white">IN </span>
          <span className="text-green-400">ASSOCIATION</span>
          <span className="text-white"> WITH</span>
        </h2>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16 mb-20 md:mb-28">
            <div style={{
              display: 'inline-block',
              width: '50px',
              height: '50px',
              border: '5px solid rgba(16, 185, 129, 0.3)',
              borderTop: '5px solid #10b981',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <p className="text-green-400 mt-4 text-base md:text-lg font-medium">
              Loading partners...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="mb-20 md:mb-28 max-w-2xl mx-auto">
            <div 
              className="text-center py-8 px-6 rounded-2xl border-2"
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                borderColor: 'rgba(239, 68, 68, 0.4)'
              }}
            >
              <svg 
                className="mx-auto h-12 w-12 mb-4" 
                style={{ color: '#ef4444' }}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                />
              </svg>
              <p className="text-red-400 text-base md:text-lg font-medium">
                Error loading partners: {error}
              </p>
            </div>
          </div>
        )}

        {/* Partners Grid */}
        {!loading && !error && activePartners.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-20 md:mb-28">
            {activePartners.map((partner) => (
              <div
                key={partner.id}
                className="flex flex-col items-center text-center group"
                onMouseEnter={() => setHoveredPartner(partner.id)}
                onMouseLeave={() => setHoveredPartner(null)}
              >
                {/* Logo Container */}
                <div className="relative w-28 h-28 md:w-32 md:h-32 lg:w-36 lg:h-36 mb-4 md:mb-6">
                  {/* Glow Effect */}
                  <div 
                    className="absolute inset-0 bg-green-400/20 rounded-full blur-2xl scale-110 transition-opacity duration-300"
                    style={{
                      opacity: hoveredPartner === partner.id ? 1 : 0
                    }}
                  />
                  
                  {/* Logo Circle */}
                  <div 
                    className="relative w-full h-full rounded-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center transition-all duration-300 shadow-xl cursor-pointer"
                    style={{
                      border: hoveredPartner === partner.id 
                        ? '2px solid #10b981' 
                        : '2px solid rgba(16, 185, 129, 0.4)',
                      boxShadow: hoveredPartner === partner.id 
                        ? '0 0 30px rgba(16, 185, 129, 0.3)' 
                        : '0 0 0 rgba(0, 0, 0, 0)'
                    }}
                    onClick={() => {
                      if (partner.website) {
                        window.open(partner.website, '_blank', 'noopener,noreferrer');
                      }
                    }}
                  >
                    {partner.logo_url ? (
                      <img
                        src={partner.logo_url}
                        alt={partner.name}
                        className="w-20 h-20 md:w-24 md:h-24 object-contain p-2"
                        style={{
                          filter: hoveredPartner === partner.id ? 'brightness(1.1)' : 'brightness(1)',
                          transition: 'filter 0.3s ease'
                        }}
                      />
                    ) : (
                      <span className="text-5xl md:text-6xl opacity-50">🏛️</span>
                    )}

                    {/* Website Link Indicator on Hover */}
                    {partner.website && hoveredPartner === partner.id && (
                      <div 
                        className="absolute inset-0 rounded-full flex items-center justify-center"
                        style={{
                          background: 'rgba(16, 185, 129, 0.15)',
                          backdropFilter: 'blur(4px)'
                        }}
                      >
                        <span 
                          className="text-xs font-bold px-3 py-1 rounded-full"
                          style={{
                            background: '#10b981',
                            color: '#000'
                          }}
                        >
                          Visit
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Partner Name */}
                <p className="text-green-400 text-sm md:text-base font-semibold leading-tight max-w-[180px]">
                  {partner.name}
                </p>

                {/* Optional: Description on hover */}
                {partner.description && hoveredPartner === partner.id && (
                  <p 
                    className="text-gray-400 text-xs mt-2 max-w-[180px] leading-relaxed"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      animation: 'fadeIn 0.3s ease-in'
                    }}
                  >
                    {partner.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* No Partners State */}
        {!loading && !error && activePartners.length === 0 && (
          <div className="text-center py-16 mb-20 md:mb-28">
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-gray-900 to-black border-2 border-green-500/40 mb-6">
              <span className="text-4xl md:text-5xl opacity-50">🤝</span>
            </div>
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
              No Partners Yet
            </h3>
            <p className="text-gray-400 text-sm md:text-base">
              Check back soon for our partnership announcements
            </p>
          </div>
        )}

      </div>

      {/* CSS Animation for spinner and fade */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;