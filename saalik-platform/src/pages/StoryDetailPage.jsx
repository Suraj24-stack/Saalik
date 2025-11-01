import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllStories } from '../../store/slices/storySlice';
import { ChevronLeft, MapPin, Calendar, Eye } from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-black via-[#0a3d2e] to-[#0a3d2e] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mb-4"></div>
          <p className="text-green-500 text-lg font-semibold tracking-wide">Loading story...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-[#0a3d2e] to-[#0a3d2e] flex items-center justify-center p-5">
        <div className="text-center p-10 bg-red-500/10 border-2 border-red-500 rounded-2xl max-w-lg">
          <p className="text-red-500 text-lg mb-5 font-semibold">Error loading story: {error}</p>
          <button
            onClick={() => navigate('/stories')}
            className="bg-green-500 hover:bg-green-600 text-black font-bold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105"
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
      <div className="min-h-screen bg-gradient-to-br from-black via-[#0a3d2e] to-[#0a3d2e] flex items-center justify-center p-5">
        <div className="text-center p-10 bg-white/5 border-2 border-green-500 rounded-2xl max-w-lg">
          <p className="text-2xl text-green-500 mb-3 font-bold">Story Not Found</p>
          <p className="text-white/70 text-base mb-8">
            The story you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => navigate('/stories')}
            className="bg-green-500 hover:bg-green-600 text-black font-bold px-10 py-4 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/50"
          >
            Back to Stories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-[#0a3d2e] to-[#1a5a45] pt-24 pb-16 text-white">
      <div className="max-w-5xl mx-auto px-5">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/stories')}
          className="flex items-center gap-2 text-green-500 hover:text-green-400 text-base mb-8 transition-all duration-300 hover:-translate-x-1 group"
        >
          <ChevronLeft size={20} className="group-hover:animate-pulse" />
          <span className="font-medium">Back to Stories</span>
        </button>

        {/* Story Header */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-green-500 drop-shadow-[0_0_20px_rgba(46,204,113,0.3)]">
          {story.title}
        </h1>

        {/* Story Meta Info */}
        <div className="flex flex-wrap gap-5 mb-8 pb-6 border-b border-green-500/30 text-sm text-white/70">
          {story.location && (
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-green-500" />
              <span>{story.location}</span>
            </div>
          )}
          {story.published_at && (
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-green-500" />
              <span>{new Date(story.published_at).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Eye size={16} className="text-green-500" />
            <span>{story.views || 0} views</span>
          </div>
        </div>

        {/* Featured Image */}
        {story.featured_image && (
          <div className="mb-10 rounded-2xl overflow-hidden border-2 border-green-500/30 shadow-2xl shadow-black/50">
            <img 
              src={story.featured_image}
              alt={story.image_alt || story.title}
              className="w-full h-auto max-h-[600px] object-cover"
            />
          </div>
        )}

        {/* Story Summary */}
        {story.summary && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 mb-10 text-lg italic text-white/90 leading-relaxed backdrop-blur-sm">
            {story.summary}
          </div>
        )}

        {/* Story Content - CORRECTED HTML RENDERING */}
        <div 
          className="story-content prose prose-invert prose-lg max-w-none mb-16"
          dangerouslySetInnerHTML={{ __html: story.content }}
        />

        {/* Explore More Button */}
        <div className="text-center my-20">
          <button 
            onClick={() => navigate('/stories')}
            className="bg-green-500 hover:bg-green-600 text-black font-bold px-12 py-4 rounded-full text-base tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-green-500/40"
          >
            Explore More Stories
          </button>
        </div>

        {/* Related Stories */}
        {relatedStories.length > 0 && (
          <div className="mt-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white border-l-4 border-green-500 pl-6">
              Related Stories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedStories.map((relatedStory) => (
                <div
                  key={relatedStory.id}
                  onClick={() => navigate(`/stories/${relatedStory.id}`)}
                  className="bg-white/5 border-2 border-green-500/30 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:border-green-500 hover:shadow-xl hover:shadow-green-500/30 group"
                >
                  <div className="w-full aspect-square bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center overflow-hidden">
                    {relatedStory.featured_image ? (
                      <img
                        src={relatedStory.featured_image}
                        alt={relatedStory.image_alt || relatedStory.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 group-hover:scale-110"
                      />
                    ) : (
                      <span className="text-6xl opacity-30">📖</span>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="text-sm font-medium text-center mb-2 text-white line-clamp-2 min-h-[40px]">
                      {relatedStory.title}
                    </div>
                    {relatedStory.location && (
                      <div className="text-xs text-center text-green-500 font-medium">
                        📍 {relatedStory.location}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Custom CSS for Story Content */}
      <style jsx>{`
        .story-content {
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.8;
        }

        /* Paragraphs */
        .story-content p {
          margin-bottom: 1.5rem;
          text-align: justify;
          font-size: 1.125rem;
          line-height: 1.8;
        }

        .story-content p:last-child {
          margin-bottom: 0;
        }

        /* Headings */
        .story-content h1 {
          font-size: 2.5rem;
          font-weight: bold;
          margin: 2.5rem 0 1.5rem 0;
          color: #2ecc71;
          line-height: 1.2;
          text-shadow: 0 0 20px rgba(46, 204, 113, 0.3);
        }

        .story-content h2 {
          font-size: 2rem;
          font-weight: 600;
          margin: 2rem 0 1.25rem 0;
          color: #2ecc71;
          line-height: 1.3;
        }

        .story-content h3 {
          font-size: 1.5rem;
          font-weight: 600;
          margin: 1.75rem 0 1rem 0;
          color: #2ecc71;
          line-height: 1.4;
        }

        /* Images */
        .story-content img {
          max-width: 100%;
          height: auto;
          border-radius: 12px;
          margin: 2rem auto;
          display: block;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
          border: 2px solid rgba(46, 204, 113, 0.3);
        }

        /* Lists */
        .story-content ul,
        .story-content ol {
          margin: 1.5rem 0;
          padding-left: 2rem;
        }

        .story-content ul {
          list-style-type: disc;
        }

        .story-content ol {
          list-style-type: decimal;
        }

        .story-content li {
          margin-bottom: 0.75rem;
          line-height: 1.8;
          font-size: 1.125rem;
        }

        .story-content li::marker {
          color: #2ecc71;
          font-weight: bold;
        }

        /* Blockquotes */
        .story-content blockquote {
          border-left: 4px solid #2ecc71;
          padding: 1rem 1.5rem;
          margin: 2rem 0;
          background: rgba(46, 204, 113, 0.1);
          border-radius: 0 8px 8px 0;
          font-style: italic;
          color: rgba(255, 255, 255, 0.8);
        }

        /* Strong/Bold */
        .story-content strong {
          font-weight: 700;
          color: #2ecc71;
        }

        /* Emphasis/Italic */
        .story-content em {
          font-style: italic;
          color: rgba(255, 255, 255, 0.9);
        }

        /* Underline */
        .story-content u {
          text-decoration: underline;
          text-decoration-color: #2ecc71;
          text-underline-offset: 3px;
        }

        /* Code */
        .story-content code {
          background: rgba(46, 204, 113, 0.1);
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-family: 'Courier New', monospace;
          font-size: 0.95em;
          color: #2ecc71;
        }

        /* Links */
        .story-content a {
          color: #2ecc71;
          text-decoration: underline;
          transition: color 0.3s ease;
        }

        .story-content a:hover {
          color: #27ae60;
        }

        /* Responsive Typography */
        @media (max-width: 768px) {
          .story-content {
            font-size: 1rem;
          }

          .story-content h1 {
            font-size: 2rem;
          }

          .story-content h2 {
            font-size: 1.75rem;
          }

          .story-content h3 {
            font-size: 1.25rem;
          }

          .story-content p,
          .story-content li {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default StoryDetailPage;