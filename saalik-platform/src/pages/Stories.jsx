import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStories } from '../../store/slices/storySlice';
import { Search, Plus, Minus } from 'lucide-react';
import SuggestStoryModal from './SuggestStoryModal';

const StoriesPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [zoom, setZoom] = useState(1);
  const [showSuggestModal, setShowSuggestModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get stories from Redux store
  const { stories, loading, error } = useSelector((state) => state.story);

  // Fetch stories on component mount
  useEffect(() => {
    dispatch(fetchAllStories());
  }, [dispatch]);

  // Filter only published stories for frontend
  const publishedStories = stories.filter(story => story.is_published === true || story.is_published === 'true');

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(180deg, #000000 0%, #0a3d2e 50%, #1a5a45 100%)',
      padding: '60px 40px',
      color: '#fff'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        {/* Zoom Controls */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '40px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(46, 204, 113, 0.3)',
            borderRadius: '8px',
            padding: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '15px'
          }}>
            <button 
              style={{
                background: 'none',
                border: 'none',
                color: '#2ecc71',
                cursor: 'pointer',
                padding: '5px',
                display: 'flex',
                alignItems: 'center'
              }} 
              onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
            >
              <Minus size={20} />
            </button>
            <Search size={24} style={{ color: '#2ecc71' }} />
            <button 
              style={{
                background: 'none',
                border: 'none',
                color: '#2ecc71',
                cursor: 'pointer',
                padding: '5px',
                display: 'flex',
                alignItems: 'center'
              }} 
              onClick={() => setZoom(Math.min(2, zoom + 0.1))}
            >
              <Plus size={24} />
            </button>
          </div>
        </div>

        <h1 style={{
          textAlign: 'center',
          fontSize: 'clamp(36px, 6vw, 64px)',
          fontWeight: 'bold',
          marginBottom: '80px',
          letterSpacing: '4px',
          lineHeight: '1.3',
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)',
          padding: '20px'
        }}>
          THE <span style={{ 
            color: '#2ecc71',
            textShadow: '0 0 30px rgba(46, 204, 113, 0.6)'
          }}>UNTOLD STORIES</span> OF <span style={{ 
            color: '#2ecc71',
            textShadow: '0 0 30px rgba(46, 204, 113, 0.6)'
          }}>NEPAL</span>
        </h1>

        {/* Loading State */}
        {loading && (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            fontSize: '18px',
            color: '#2ecc71'
          }}>
            <div style={{
              display: 'inline-block',
              width: '60px',
              height: '60px',
              border: '5px solid rgba(46, 204, 113, 0.2)',
              borderTop: '5px solid #2ecc71',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              marginBottom: '20px'
            }} />
            <p style={{ marginTop: '20px', letterSpacing: '2px', fontWeight: '600' }}>LOADING STORIES...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div style={{
            textAlign: 'center',
            padding: '40px 20px',
            background: 'rgba(231, 76, 60, 0.1)',
            border: '2px solid #e74c3c',
            borderRadius: '15px',
            color: '#e74c3c',
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px'
          }}>
            <p style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>Error loading stories</p>
            <p style={{ fontSize: '14px', opacity: 0.8 }}>{error}</p>
          </div>
        )}

        {/* Stories Grid */}
        {!loading && publishedStories.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '30px',
            marginBottom: '80px',
            transform: `scale(${zoom})`,
            transformOrigin: 'top center',
            transition: 'transform 0.3s ease'
          }}>
            {publishedStories.map((story) => (
              <div
                key={story.id}
                onMouseEnter={() => setHoveredCard(story.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => {
                  navigate(`/stories/${story.id}`);
                  window.scrollTo(0, 0);
                }}
                style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: '2px solid #2ecc71',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: hoveredCard === story.id ? 'translateY(-10px) scale(1.02)' : 'translateY(0) scale(1)',
                  boxShadow: hoveredCard === story.id 
                    ? '0 20px 60px rgba(46, 204, 113, 0.5), 0 0 40px rgba(46, 204, 113, 0.3)' 
                    : '0 5px 15px rgba(0, 0, 0, 0.5)'
                }}
              >
                <div style={{
                  width: '100%',
                  height: '250px',
                  background: 'linear-gradient(135deg, #1a1a1a 0%, #2d3436 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {story.featured_image ? (
                    <img
                      src={story.featured_image}
                      alt={story.image_alt || story.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        filter: hoveredCard === story.id ? 'grayscale(0%) brightness(1.1)' : 'grayscale(100%) brightness(0.7)',
                        transition: 'all 0.4s ease',
                        transform: hoveredCard === story.id ? 'scale(1.05)' : 'scale(1)'
                      }}
                    />
                  ) : (
                    <div style={{
                      fontSize: '120px',
                      opacity: 0.3,
                      filter: hoveredCard === story.id ? 'grayscale(0%) brightness(1.2)' : 'grayscale(100%) brightness(0.7)',
                      transition: 'all 0.4s ease',
                      transform: hoveredCard === story.id ? 'scale(1.1)' : 'scale(1)'
                    }}>
                      📖
                    </div>
                  )}
                  
                  {hoveredCard === story.id && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(135deg, rgba(46, 204, 113, 0.2) 0%, rgba(46, 204, 113, 0.05) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      animation: 'fadeIn 0.3s ease'
                    }}>
                      <span style={{
                        background: '#2ecc71',
                        color: '#000',
                        padding: '12px 30px',
                        borderRadius: '30px',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        letterSpacing: '1px',
                        boxShadow: '0 5px 20px rgba(46, 204, 113, 0.4)'
                      }}>
                        READ STORY
                      </span>
                    </div>
                  )}
                </div>

                <div style={{ padding: '20px 15px' }}>
                  <div style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    letterSpacing: '0.5px',
                    color: '#fff',
                    lineHeight: '1.4',
                    minHeight: '42px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {story.title}
                  </div>
                  {story.location && (
                    <div style={{
                      fontSize: '12px',
                      color: '#2ecc71',
                      fontWeight: '500',
                      letterSpacing: '0.5px'
                    }}>
                      📍 {story.location}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Stories State */}
        {!loading && publishedStories.length === 0 && !error && (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.5)'
          }}>
            <div style={{ fontSize: '80px', marginBottom: '20px', opacity: 0.3 }}>📚</div>
            <p style={{ letterSpacing: '1px' }}>No published stories yet. Check back soon!</p>
          </div>
        )}

        {/* Suggest Stories Button */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '40px'
        }}>
          <button 
            onClick={() => setShowSuggestModal(true)}
            style={{
              background: '#2ecc71',
              color: '#000',
              border: 'none',
              padding: '18px 60px',
              borderRadius: '50px',
              fontSize: '14px',
              fontWeight: 'bold',
              letterSpacing: '3px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              boxShadow: '0 10px 30px rgba(46, 204, 113, 0.5)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 15px 40px rgba(46, 204, 113, 0.7)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 10px 30px rgba(46, 204, 113, 0.5)';
            }}
          >
            SUGGEST STORIES
          </button>
        </div>
      </div>

      {/* Suggest Story Modal */}
      <SuggestStoryModal 
        isOpen={showSuggestModal} 
        onClose={() => setShowSuggestModal(false)} 
      />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 1200px) {
          div[style*="gridTemplateColumns: repeat(4, 1fr)"] {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }

        @media (max-width: 900px) {
          div[style*="gridTemplateColumns: repeat(4, 1fr)"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 600px) {
          div[style*="gridTemplateColumns: repeat(4, 1fr)"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default StoriesPage;