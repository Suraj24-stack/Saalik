import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // ✅ Import useNavigate
import { mockData } from '../data/MockData';

const StoriesPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();  // ✅ Initialize navigate

  const stories = mockData.stories;

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
          marginBottom: '80px',
          letterSpacing: '3px',
          lineHeight: '1.3',
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)',
          padding: '20px'
        }}>
          THE <span style={{ 
            color: '#2ecc71',
            textShadow: '0 0 20px rgba(46, 204, 113, 0.5)'
          }}>UNTOLD STORIES</span> OF <span style={{ 
            color: '#2ecc71',
            textShadow: '0 0 20px rgba(46, 204, 113, 0.5)'
          }}>NEPAL</span>
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px',
          marginBottom: '60px'
        }}>
          {stories.map((story) => (
            <div
              key={story.id}
              onMouseEnter={() => setHoveredCard(story.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => {                           // ✅ Navigate to story detail
                navigate(`/stories/${story.id}`);
                window.scrollTo(0, 0);
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid #2ecc71',
                borderRadius: '15px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: hoveredCard === story.id ? 'translateY(-10px)' : 'translateY(0)',
                boxShadow: hoveredCard === story.id 
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
                {story.image ? (
                  <img
                    src={story.image}
                    alt={story.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: hoveredCard === story.id ? 'grayscale(0%)' : 'grayscale(100%)',
                      transition: 'filter 0.3s ease'
                    }}
                  />
                ) : (
                  <div style={{
                    fontSize: '80px',
                    opacity: 0.3,
                    filter: hoveredCard === story.id ? 'none' : 'grayscale(100%)',
                    transition: 'filter 0.3s'
                  }}>
                    {story.category === 'Mythology' && '🦍'}
                    {story.category === 'Mystery' && '👹'}
                    {story.category === 'Heritage' && '🏛️'}
                    {story.category === 'Archaeology' && '🗿'}
                    {story.category === 'Tradition' && '🪔'}
                  </div>
                )}
                
                {hoveredCard === story.id && (
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
                      fontSize: '14px'
                    }}>
                      Read Story
                    </span>
                  </div>
                )}
              </div>

              <div style={{
                padding: '20px'
              }}>
                <div style={{
                  textAlign: 'center',
                  fontSize: '14px',
                  fontWeight: '500',
                  letterSpacing: '0.5px',
                  marginBottom: '8px'
                }}>
                  {story.title}
                </div>
                <div style={{
                  textAlign: 'center',
                  fontSize: '12px',
                  color: '#2ecc71',
                  fontWeight: '500'
                }}>
                  {story.category}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '40px'
        }}>
          <button style={{
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
            boxShadow: '0 5px 20px rgba(46, 204, 113, 0.4)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
            e.target.style.boxShadow = '0 8px 30px rgba(46, 204, 113, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = '0 5px 20px rgba(46, 204, 113, 0.4)';
          }}>
            Suggest Stories
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoriesPage;