import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  
  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Please fill in all fields');
      return;
    }
    alert('Thank you for contacting us!');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };
  
  return (
    <div className="bg-black min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-8">
          <span className="text-green-400">CONTACT</span> US
        </h1>
        
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Get in Touch</h2>
            <p className="text-gray-300 mb-6">
              Have questions about Nepal's heritage? We'd love to hear from you.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="text-green-400 mr-4 mt-1">📧</div>
                <div>
                  <h3 className="text-white font-semibold">Email</h3>
                  <p className="text-gray-400">info@saalik.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-green-400 mr-4 mt-1">📱</div>
                <div>
                  <h3 className="text-white font-semibold">Phone</h3>
                  <p className="text-gray-400">+977 1234567890</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="text-green-400 mr-4 mt-1">📍</div>
                <div>
                  <h3 className="text-white font-semibold">Location</h3>
                  <p className="text-gray-400">Kathmandu, Nepal</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-green-500 focus:outline-none focus:border-green-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-green-500 focus:outline-none focus:border-green-400"
              />
              <input
                type="text"
                placeholder="Subject"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
                className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-green-500 focus:outline-none focus:border-green-400"
              />
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg border border-green-500 focus:outline-none focus:border-green-400 h-32 resize-none"
              />
              <button
                onClick={handleSubmit}
                className="w-full bg-green-500 text-black py-3 rounded-lg font-semibold hover:bg-green-400 transition-all"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;