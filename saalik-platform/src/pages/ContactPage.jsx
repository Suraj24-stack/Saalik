import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createContact } from '../../store/slices/contactSlice';
import { Mail, User, MessageSquare, Send } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-950 flex items-center justify-center p-4">
      <div className="relative w-full max-w-2xl">
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 md:p-12 border-2 border-green-500 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
          
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-green-400 mb-3 tracking-wide">
              Get in Touch
            </h2>
            <p className="text-gray-400 text-lg">
              Have questions? We'd love to hear from you.
            </p>
          </div>

          {success && (
            <div className="mb-6 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 text-center font-semibold">
                ✓ Message sent successfully! We'll get back to you soon.
              </p>
            </div>
          )}

          {error && (
            <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="border-l-4 border-green-500 pl-6 py-2">
              <label className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-2 flex items-center gap-2">
                <User size={16} />
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div className="border-l-4 border-green-500 pl-6 py-2">
              <label className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-2 flex items-center gap-2">
                <Mail size={16} />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-colors"
                placeholder="john@example.com"
              />
            </div>

            <div className="border-l-4 border-green-500 pl-6 py-2">
              <label className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-2 flex items-center gap-2">
                <MessageSquare size={16} />
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-colors"
                placeholder="How can we help?"
              />
            </div>

            <div className="border-l-4 border-green-500 pl-6 py-2">
              <label className="text-green-400 text-xs font-semibold uppercase tracking-widest mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                className="w-full bg-black/50 border border-green-500/30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-colors resize-none"
                placeholder="Tell us more about your inquiry..."
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-white font-bold py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 text-lg shadow-lg hover:shadow-green-500/50"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-green-500/20">
            <p className="text-center text-gray-400 text-sm">
              Or reach us directly at{' '}
              <a href="mailto:info@saalik.com" className="text-green-400 hover:text-green-300 transition-colors">
                info@saalik.com
              </a>
            </p>
          </div>
        </div>

        <div className="absolute inset-0 bg-green-500/10 blur-3xl rounded-3xl -z-10"></div>
      </div>
    </div>
  );
};

export default ContactPage;