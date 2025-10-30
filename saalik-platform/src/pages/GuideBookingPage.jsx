import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllWaitlist, createWaitlistEntry, clearSubmitSuccess, clearError } from '../../store/slices/waitlistSlice';
import { MapPin, Calendar, Loader2, User, Mail, Phone, MessageSquare } from 'lucide-react';

const GuideBookingPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const dispatch = useDispatch();
  
  const { waitlist, loading, error, submitLoading, submitSuccess } = useSelector((state) => state.waitlist);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travel_date: "",
    destination: "",
    message: "",
  });

  useEffect(() => {
    dispatch(fetchAllWaitlist());
  }, [dispatch]);

  useEffect(() => {
    if (submitSuccess) {
      alert("Form submitted successfully! Our team will contact you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        travel_date: "",
        destination: "",
        message: "",
      });
      dispatch(clearSubmitSuccess());
      dispatch(fetchAllWaitlist()); // Refresh the list
    }
  }, [submitSuccess, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(createWaitlistEntry(formData));
  };

  const approvedGuides = waitlist.filter(entry => entry.status === 'approved');

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-emerald-900 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <h1 className="text-center text-5xl md:text-7xl font-bold mb-6 tracking-wider">
          <span className="text-white">GUIDE</span>{' '}
          <span className="text-green-400 drop-shadow-[0_0_20px_rgba(46,204,113,0.5)]">
            BOOKING
          </span>
        </h1>

        {/* Description */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-lg text-white/80 leading-relaxed">
            Discover Nepal with confidence by{' '}
            <span className="text-green-400 font-bold">booking verified local guides</span>{' '}
            through SAALIK. Our trusted guides bring culture, history, and spirituality to life 
            while ensuring your journey is both safe and insightful.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <Loader2 className="inline-block animate-spin text-green-400 mb-4" size={50} />
            <p className="text-green-400 text-lg">Loading guides...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12 px-6 bg-red-500/10 border-2 border-red-500 rounded-xl text-red-400 mb-12">
            <p>Error: {error}</p>
          </div>
        )}

        {/* Approved Guides Grid */}
        {!loading && approvedGuides.length > 0 && (
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-white text-center mb-10">
              Featured <span className="text-green-400">Guides</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {approvedGuides.map((guide) => (
                <div
                  key={guide.id}
                  onMouseEnter={() => setHoveredCard(guide.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`bg-white/5 border-2 border-green-500 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    hoveredCard === guide.id ? 'transform -translate-y-3 shadow-[0_15px_40px_rgba(46,204,113,0.4)]' : 'shadow-[0_5px_15px_rgba(0,0,0,0.3)]'
                  }`}
                >
                  <div className="aspect-square bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center relative overflow-hidden">
                    <div className={`text-8xl transition-all ${hoveredCard === guide.id ? 'opacity-50' : 'opacity-30 grayscale'}`}>
                      🗺️
                    </div>
                    
                    {hoveredCard === guide.id && (
                      <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center">
                        <span className="bg-green-500 text-black px-6 py-3 rounded-full font-bold text-sm">
                          View Details
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="text-center font-bold text-lg mb-3 text-white">
                      {guide.name}
                    </div>
                    {guide.destination && (
                      <div className="flex items-center justify-center gap-2 text-green-400 text-sm font-medium mb-2">
                        <MapPin size={14} />
                        {guide.destination}
                      </div>
                    )}
                    {guide.travel_date && (
                      <div className="flex items-center justify-center gap-2 text-white/60 text-xs">
                        <Calendar size={12} />
                        {new Date(guide.travel_date).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Booking Form Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
           
            <p className="text-white/70 text-lg">
              Be among the first to experience authentic guided tours in Nepal
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border-2 border-green-500 rounded-3xl p-8 md:p-12 shadow-[0_10px_40px_rgba(46,204,113,0.2)]">
            
            {/* Form Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border-2 border-red-500 rounded-xl text-red-400 text-center text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name Field */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-green-400 mb-2 tracking-wide">
                  <User size={16} />
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required  
                  disabled={submitLoading}
                  className="w-full px-4 py-3 rounded-xl bg-black/30 border-2 border-green-500/30 text-white placeholder-gray-500 focus:border-green-400 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-green-400 mb-2 tracking-wide">
                  <Mail size={16} />
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={submitLoading}
                  className="w-full px-4 py-3 rounded-xl bg-black/30 border-2 border-green-500/30 text-white placeholder-gray-500 focus:border-green-400 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-green-400 mb-2 tracking-wide">
                  <Phone size={16} />
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={submitLoading}
                  className="w-full px-4 py-3 rounded-xl bg-black/30 border-2 border-green-500/30 text-white placeholder-gray-500 focus:border-green-400 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="+977 98xxxxxxxx"
                />
              </div>

              {/* Two Column Layout for Date and Destination */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Travel Date */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-green-400 mb-2 tracking-wide">
                    <Calendar size={16} />
                    Travel Date
                  </label>
                  <input
                    type="date"
                    name="travel_date"
                    value={formData.travel_date}
                    onChange={handleChange}
                    disabled={submitLoading}
                    className="w-full px-4 py-3 rounded-xl bg-black/30 border-2 border-green-500/30 text-white focus:border-green-400 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed [color-scheme:dark]"
                  />
                </div>

                {/* Destination */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-green-400 mb-2 tracking-wide">
                    <MapPin size={16} />
                    Destination
                  </label>
                  <input
                    type="text"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    disabled={submitLoading}
                    className="w-full px-4 py-3 rounded-xl bg-black/30 border-2 border-green-500/30 text-white placeholder-gray-500 focus:border-green-400 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    placeholder="e.g. Kathmandu, Pokhara"
                  />
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-green-400 mb-2 tracking-wide">
                  <MessageSquare size={16} />
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  disabled={submitLoading}
                  className="w-full px-4 py-3 rounded-xl bg-black/30 border-2 border-green-500/30 text-white placeholder-gray-500 focus:border-green-400 focus:outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed resize-vertical"
                  placeholder="Tell us about your travel plans..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitLoading}
                className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-4 rounded-full text-lg tracking-widest uppercase transition-all duration-300 shadow-[0_5px_20px_rgba(46,204,113,0.4)] hover:shadow-[0_8px_30px_rgba(46,204,113,0.6)] hover:scale-105 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
              >
                {submitLoading ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Submitting...
                  </>
                ) : (
                  'Join Waitlist Now'
                )}
              </button>
            </form>

            {/* Trust Badge */}
            <div className="mt-8 pt-6 border-t border-green-500/20 text-center">
              <p className="text-white/60 text-sm">
                🔒 Your information is secure and will only be used to contact you about guide bookings
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-white/5 border border-green-500/30 rounded-2xl px-8 py-6">
            <p className="text-white/70 mb-2">
              Questions about our guide booking service?
            </p>
            <a 
              href="/contact" 
              className="text-green-400 hover:text-green-300 font-semibold transition-colors"
            >
              Contact Us →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideBookingPage;