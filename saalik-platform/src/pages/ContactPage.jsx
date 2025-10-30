import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createContact } from '../../store/slices/contactSlice';
import { Mail, User, MessageSquare, Send, MapPin, Phone } from 'lucide-react';
import { mockData } from '../data/MockData';

const ContactPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await dispatch(createContact(formData)).unwrap();
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err.message || 'Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-16 px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header with Logo */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img 
              src={mockData.navbar.logo} 
              alt={`${mockData.navbar.brandName} Logo`}
              className="h-16 w-auto object-contain"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4" style={{ fontFamily: "'League Spartan', sans-serif", fontWeight: 700 }}>
            <span className="text-white">GET IN </span>
            <span className="text-green-400">TOUCH</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Have questions about cultural heritage tourism? We're here to help you explore Nepal's rich history.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Side - Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {/* Email Card */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-500/40 transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-green-500/10 p-3 rounded-lg">
                  <Mail className="text-green-400" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Email Us</h3>
                  <a href="mailto:saalik130@gmail.com" className="text-green-400 hover:text-green-300 transition-colors text-sm">
                    saalik130@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Phone Card */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-500/40 transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-green-500/10 p-3 rounded-lg">
                  <Phone className="text-green-400" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Call Us</h3>
                  <a href="tel:+9779840836892" className="text-green-400 hover:text-green-300 transition-colors text-sm">
                    +977 9840836892
                  </a>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-gray-900/50 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-500/40 transition-all">
              <div className="flex items-start gap-4">
                <div className="bg-green-500/10 p-3 rounded-lg">
                  <MapPin className="text-green-400" size={24} />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Visit Us</h3>
                  <p className="text-gray-400 text-sm">
                    Kathmandu, Nepal
                  </p>
                </div>
              </div>
            </div>

            {/* Response Time Info */}
            <div className="bg-gradient-to-br from-green-500/5 to-green-500/10 border border-green-500/30 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-2">Response Time</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                We typically respond within <span className="text-green-400 font-semibold">24-48 hours</span> during business days.
              </p>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-green-500/20 rounded-2xl p-8 md:p-10">
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>

              {success && (
                <div className="mb-6 bg-green-500/10 border border-green-500/50 rounded-lg p-4 flex items-start gap-3">
                  <div className="bg-green-500 rounded-full p-1 mt-0.5">
                    <svg className="w-4 h-4 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-green-400 font-semibold">Message sent successfully!</p>
                    <p className="text-green-300/80 text-sm mt-1">We'll get back to you soon.</p>
                  </div>
                </div>
              )}

              {error && (
                <div className="mb-6 bg-red-500/10 border border-red-500/50 rounded-lg p-4">
                  <p className="text-red-400 text-center">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                    <User size={16} className="text-green-400" />
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                    <Mail size={16} className="text-green-400" />
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>

                {/* Subject Input */}
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                    <MessageSquare size={16} className="text-green-400" />
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all"
                    placeholder="What is this regarding?"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label className="text-gray-300 text-sm font-medium mb-2 block">
                    Your Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400/20 transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-lg shadow-lg hover:shadow-green-500/50 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Info Section */}
        <div className="mt-12 text-center">
          <div className="inline-block bg-gray-900/50 backdrop-blur-sm border border-green-500/20 rounded-xl px-8 py-4">
            <p className="text-gray-400">
              Prefer direct contact?{' '}
              <a href="mailto:saalik130@gmail.com" className="text-green-400 hover:text-green-300 transition-colors font-semibold">
                Email us directly
              </a>
              {' '}or{' '}
              <a href="tel:+9779840836892" className="text-green-400 hover:text-green-300 transition-colors font-semibold">
                give us a call
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;