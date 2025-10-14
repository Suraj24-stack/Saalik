import React, { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '',
    subject: '',
    message: '' 
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all required fields');
      return;
    }

    console.log('Contact form submission:', formData);
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
          <span className="text-white">CONTACT </span>
          <span className="text-green-400">US</span>
        </h1>
        
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Have questions or suggestions? We'd love to hear from you. 
          Fill out the form below and we'll get back to you as soon as possible.
        </p>

        {/* Contact Info Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-900/50 rounded-2xl p-6 border-2 border-green-500/20 hover:border-green-500/40 transition-all text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="text-green-400" size={28} />
            </div>
            <h3 className="text-white font-bold mb-2">Email Us</h3>
            <a href="mailto:info@saalik.com" className="text-green-400 hover:text-green-300 transition-colors">
              info@saalik.com
            </a>
          </div>

          <div className="bg-gray-900/50 rounded-2xl p-6 border-2 border-green-500/20 hover:border-green-500/40 transition-all text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="text-green-400" size={28} />
            </div>
            <h3 className="text-white font-bold mb-2">Call Us</h3>
            <a href="tel:+9779876543210" className="text-green-400 hover:text-green-300 transition-colors">
              +977 98-76543210
            </a>
          </div>

          <div className="bg-gray-900/50 rounded-2xl p-6 border-2 border-green-500/20 hover:border-green-500/40 transition-all text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-green-400" size={28} />
            </div>
            <h3 className="text-white font-bold mb-2">Visit Us</h3>
            <p className="text-green-400">Kathmandu, Nepal</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-900 rounded-2xl p-8 border-2 border-green-500/30">
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Send us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white mb-2 font-medium">
                  Name <span className="text-red-400">*</span>
                </label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:border-green-400 outline-none" 
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white mb-2 font-medium">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input 
                    type="email" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:border-green-400 outline-none" 
                  />
                </div>

                <div>
                  <label className="block text-white mb-2 font-medium">
                    Phone <span className="text-gray-500">(Optional)</span>
                  </label>
                  <input 
                    type="tel" 
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+977 98-12345678"
                    className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:border-green-400 outline-none" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">
                  Subject <span className="text-gray-500">(Optional)</span>
                </label>
                <input 
                  type="text" 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  placeholder="What is this regarding?"
                  className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:border-green-400 outline-none" 
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea 
                  rows={6} 
                  required 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Write your message here..."
                  className="w-full px-4 py-3 bg-black border border-green-500/30 rounded-lg text-white placeholder-gray-500 focus:border-green-400 outline-none resize-none" 
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded-lg transition-all hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;