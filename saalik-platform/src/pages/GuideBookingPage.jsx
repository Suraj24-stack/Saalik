import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllWaitlist } from '../../store/slices/waitlistSlice';

const GuideBookingPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get waitlist entries from Redux store
  const { waitlist, loading, error } = useSelector((state) => state.waitlist);

  // Fetch waitlist entries on component mount
  useEffect(() => {
    dispatch(fetchAllWaitlist());
  }, [dispatch]);

  // Filter only approved/featured guides for frontend display
  // You can change this logic based on what you want to show
  const approvedGuides = waitlist.filter(entry => entry.status === 'approved');

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #0a3d2e 100%)',
      padding: '40px 20px',
      color: '#fff'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h1 style={{
          textAlign: 'center',
          fontSize: 'clamp(36px, 6vw, 64px)',
          fontWeight: 'bold',
          marginBottom: '20px',
          letterSpacing: '3px',
          lineHeight: '1.3',
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)',
          padding: '20px',
          fontFamily: 'Arial, sans-serif'
        }}>
          <span style={{ 
            color: '#fff'
          }}>GUIDE</span> <span style={{ 
            color: '#2ecc71',
            textShadow: '0 0 20px rgba(46, 204, 113, 0.5)'
          }}>BOOKING</span>
        </h1>

        {/* Subtitle/Description */}
        <div style={{
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto 60px',
          fontSize: '18px',
          lineHeight: '1.8',
          color: 'rgba(255, 255, 255, 0.8)'
        }}>
          <p>
            Discover Nepal with confidence by <span style={{ color: '#2ecc71', fontWeight: 'bold' }}>booking verified local guides</span> through SAALIK. 
            Our trusted guides bring culture, history, and spirituality to life while ensuring your journey is both safe and insightful.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            fontSize: '18px',
            color: '#2ecc71'
          }}>
            <div style={{
              display: 'inline-block',
              width: '50px',
              height: '50px',
              border: '5px solid rgba(46, 204, 113, 0.3)',
              borderTop: '5px solid #2ecc71',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            <p style={{ marginTop: '20px' }}>Loading guides...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            background: 'rgba(231, 76, 60, 0.1)',
            border: '2px solid #e74c3c',
            borderRadius: '10px',
            color: '#e74c3c',
            marginBottom: '40px'
          }}>
            <p>Error loading guides: {error}</p>
          </div>
        )}

        {/* Guide Cards Grid (if you want to display approved guides) */}
        {!loading && approvedGuides.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
            marginBottom: '60px'
          }}>
            {approvedGuides.map((guide) => (
              <div
                key={guide.id}
                onMouseEnter={() => setHoveredCard(guide.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '2px solid #2ecc71',
                  borderRadius: '15px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  transform: hoveredCard === guide.id ? 'translateY(-10px)' : 'translateY(0)',
                  boxShadow: hoveredCard === guide.id 
                    ? '0 15px 40px rgba(46, 204, 113, 0.4)' 
                    : '0 5px 15px rgba(0, 0, 0, 0.3)'
                }}
              >
                <div style={{
                  width: '100%',
                  aspectRatio: '1',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #2d3436 100%)'
                }}>
                  <div style={{
                    fontSize: '80px',
                    opacity: 0.3,
                    filter: hoveredCard === guide.id ? 'none' : 'grayscale(100%)',
                    transition: 'filter 0.3s'
                  }}>
                    🗺️
                  </div>
                  
                  {hoveredCard === guide.id && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'rgba(46, 204, 113, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <span style={{
                        background: '#2ecc71',
                        color: '#000',
                        padding: '10px 20px',
                        borderRadius: '25px',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        fontFamily: 'Arial, sans-serif'
                      }}>
                        View Details
                      </span>
                    </div>
                  )}
                </div>

                <div style={{
                  padding: '20px',
                  fontFamily: 'Arial, sans-serif'
                }}>
                  <div style={{
                    textAlign: 'center',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    letterSpacing: '0.5px',
                    marginBottom: '8px'
                  }}>
                    {guide.name}
                  </div>
                  {guide.destination && (
                    <div style={{
                      textAlign: 'center',
                      fontSize: '12px',
                      color: '#2ecc71',
                      fontWeight: '500',
                      marginBottom: '4px'
                    }}>
                      📍 {guide.destination}
                    </div>
                  )}
                  {guide.travel_date && (
                    <div style={{
                      textAlign: 'center',
                      fontSize: '11px',
                      color: 'rgba(255, 255, 255, 0.6)'
                    }}>
                      📅 {new Date(guide.travel_date).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Guides State - Show when no approved guides yet */}
        {!loading && approvedGuides.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.5)',
            marginBottom: '40px',
            fontFamily: 'Arial, sans-serif'
          }}>
            <p>Be the first to join our guide booking waitlist!</p>
          </div>
        )}

        {/* Call to Action Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '40px'
        }}>
          <button 
            onClick={() => {
              navigate('/GuideBookingForm');
              window.scrollTo(0, 0);
            }}
            style={{
              background: '#2ecc71',
              color: '#000',
              border: 'none',
              padding: '18px 60px',
              borderRadius: '50px',
              fontSize: '16px',
              fontWeight: 'bold',
              letterSpacing: '2px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              boxShadow: '0 5px 20px rgba(46, 204, 113, 0.4)',
              fontFamily: 'Arial, sans-serif'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 8px 30px rgba(46, 204, 113, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 5px 20px rgba(46, 204, 113, 0.4)';
            }}
          >
            Join Waitlist
          </button>
        </div>
      </div>

      {/* Add CSS animation for spinner */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default GuideBookingPage;