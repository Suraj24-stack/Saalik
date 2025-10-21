import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStories } from '../../store/slices/storySlice';
import { ChevronLeft, MapPin, Calendar, Eye, Loader } from 'lucide-react';
import StoryCard from '../components/Storycard';

const StoryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Get stories from Redux store
  const { stories, loading, error } = useSelector((state) => state.story);

  // Fetch stories on component mount
  useEffect(() => {
    dispatch(fetchAllStories());
  }, [dispatch]);

  // Scroll to top when story changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Find current story by ID
  const story = stories.find(s => s.id === parseInt(id));
  
  // Get related published stories (exclude current story)
  const relatedStories = stories
    .filter(s => s.id !== parseInt(id) && (s.is_published === true || s.is_published === 'true'))
    .slice(0, 4);

  // Loading state
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #0a3d2e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#2ecc71'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            display: 'inline-block',
            width: '50px',
            height: '50px',
            border: '5px solid rgba(46, 204, 113, 0.3)',
            borderTop: '5px solid #2ecc71',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <p style={{ marginTop: '20px', fontSize: '18px' }}>Loading story...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #0a3d2e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '40px',
          background: 'rgba(231, 76, 60, 0.1)',
          border: '2px solid #e74c3c',
          borderRadius: '15px',
          color: '#e74c3c',
          maxWidth: '500px'
        }}>
          <p style={{ fontSize: '18px', marginBottom: '20px' }}>Error loading story: {error}</p>
          <button
            onClick={() => navigate('/stories')}
            style={{
              background: '#2ecc71',
              color: '#000',
              border: 'none',
              padding: '12px 30px',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Back to Stories
          </button>
        </div>
      </div>
    );
  }

  // Story not found
  if (!story) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #000000 0%, #0a3d2e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '40px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '2px solid #2ecc71',
          borderRadius: '15px',
          color: '#fff',
          maxWidth: '500px'
        }}>
          <p style={{ fontSize: '24px', marginBottom: '10px', color: '#2ecc71' }}>Story Not Found</p>
          <p style={{ fontSize: '16px', marginBottom: '30px', color: 'rgba(255, 255, 255, 0.7)' }}>
            The story you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/stories')}
            style={{
              background: '#2ecc71',
              color: '#000',
              border: 'none',
              padding: '14px 35px',
              borderRadius: '25px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Back to Stories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #0a3d2e 100%)',
      paddingTop: '100px',
      paddingBottom: '60px',
      color: '#fff'
    }}>
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        padding: '0 20px'
      }}>
        {/* Back Button */}
        <button 
          onClick={() => navigate('/stories')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            border: 'none',
            color: '#2ecc71',
            fontSize: '16px',
            cursor: 'pointer',
            marginBottom: '30px',
            transition: 'all 0.3s ease',
            padding: '10px 0'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#27ae60';
            e.target.style.transform = 'translateX(-5px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#2ecc71';
            e.target.style.transform = 'translateX(0)';
          }}
        >
          <ChevronLeft size={20} />
          <span>Back to Stories</span>
        </button>

        {/* Story Header */}
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: 'bold',
          marginBottom: '20px',
          lineHeight: '1.2',
          color: '#2ecc71',
          textShadow: '0 0 20px rgba(46, 204, 113, 0.3)'
        }}>
          {story.title}
        </h1>

        {/* Story Meta Info */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '30px',
          paddingBottom: '20px',
          borderBottom: '1px solid rgba(46, 204, 113, 0.3)',
          fontSize: '14px',
          color: 'rgba(255, 255, 255, 0.7)'
        }}>
          {story.location && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin size={16} style={{ color: '#2ecc71' }} />
              <span>{story.location}</span>
            </div>
          )}
          {story.published_at && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={16} style={{ color: '#2ecc71' }} />
              <span>{new Date(story.published_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          )}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Eye size={16} style={{ color: '#2ecc71' }} />
            <span>{story.views || 0} views</span>
          </div>
        </div>

        {/* Featured Image */}
        {story.featured_image && (
          <div style={{
            marginBottom: '40px',
            borderRadius: '15px',
            overflow: 'hidden',
            border: '2px solid rgba(46, 204, 113, 0.3)',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
          }}>
            <img 
              src={story.featured_image}
              alt={story.image_alt || story.title}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '500px',
                objectFit: 'cover',
                display: 'block'
              }}
            />
          </div>
        )}

        {/* Story Summary */}
        {story.summary && (
          <div style={{
            background: 'rgba(46, 204, 113, 0.1)',
            border: '1px solid rgba(46, 204, 113, 0.3)',
            borderRadius: '10px',
            padding: '20px',
            marginBottom: '30px',
            fontSize: '18px',
            fontStyle: 'italic',
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: '1.6'
          }}>
            {story.summary}
          </div>
        )}

        {/* Story Content */}
        <div style={{
          fontSize: '17px',
          lineHeight: '1.8',
          color: 'rgba(255, 255, 255, 0.85)',
          marginBottom: '50px'
        }}>
          {story.content.split('\n\n').map((paragraph, index) => (
            <p key={index} style={{
              marginBottom: '20px',
              textAlign: 'justify'
            }}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Explore More Button */}
        <div style={{
          textAlign: 'center',
          margin: '60px 0'
        }}>
          <button 
            onClick={() => navigate('/stories')}
            style={{
              background: '#2ecc71',
              color: '#000',
              border: 'none',
              padding: '16px 50px',
              borderRadius: '50px',
              fontSize: '16px',
              fontWeight: 'bold',
              letterSpacing: '1px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textTransform: 'uppercase',
              boxShadow: '0 5px 20px rgba(46, 204, 113, 0.4)'
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
            Explore More Stories
          </button>
        </div>

        {/* Related Stories */}
        {relatedStories.length > 0 && (
          <div style={{ marginTop: '80px' }}>
            <h2 style={{
              fontSize: '32px',
              fontWeight: 'bold',
              marginBottom: '30px',
              color: '#fff',
              borderLeft: '4px solid #2ecc71',
              paddingLeft: '20px'
            }}>
              Related Stories
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '20px'
            }}>
              {relatedStories.map((relatedStory) => (
                <div
                  key={relatedStory.id}
                  onClick={() => navigate(`/stories/${relatedStory.id}`)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '2px solid rgba(46, 204, 113, 0.3)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px)';
                    e.currentTarget.style.borderColor = '#2ecc71';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(46, 204, 113, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(46, 204, 113, 0.3)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    width: '100%',
                    aspectRatio: '1',
                    background: 'linear-gradient(135deg, #1a1a1a 0%, #2d3436 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    {relatedStory.featured_image ? (
                      <img
                        src={relatedStory.featured_image}
                        alt={relatedStory.image_alt || relatedStory.title}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          filter: 'grayscale(100%)',
                          transition: 'filter 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.filter = 'grayscale(0%)'}
                        onMouseLeave={(e) => e.target.style.filter = 'grayscale(100%)'}
                      />
                    ) : (
                      <span style={{ fontSize: '60px', opacity: 0.3 }}>📖</span>
                    )}
                  </div>
                  <div style={{ padding: '15px' }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      textAlign: 'center',
                      marginBottom: '5px',
                      color: '#fff'
                    }}>
                      {relatedStory.title}
                    </div>
                    {relatedStory.location && (
                      <div style={{
                        fontSize: '12px',
                        textAlign: 'center',
                        color: '#2ecc71'
                      }}>
                        {relatedStory.location}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryDetailPage;