import React, { useState } from 'react';

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
    <div className="min-h-screen bg-black pt-24 pb-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-6">
          <span className="text-white">CONTACT </span>
          <span className="text-green-400">US</span>
        </h1>
        
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Have questions or suggestions? We'd love to hear from you. 
          Fill out the form below and we'll get back to you as soon as possible.
        </p>

        <div className="max-w-md mx-auto mb-12">
          <div className="bg-black rounded-2xl p-8 border-2 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.5)]">
            <h2 className="text-2xl font-bold text-green-400 mb-8 text-center">Contact Information</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-green-500 pl-4">
                <div className="text-green-400 text-xs uppercase tracking-wider mb-1">EMAIL</div>
                <a href="mailto:info@saalik.com" className="text-white text-lg hover:text-green-400 transition-colors">
                  info@saalik.com
                </a>
              </div>

              <div className="border-l-4 border-green-500 pl-4">
                <div className="text-green-400 text-xs uppercase tracking-wider mb-1">PHONE</div>
                <a href="tel:+9779876543210" className="text-white text-lg hover:text-green-400 transition-colors">
                  +977-9876543210
                </a>
              </div>

              <div className="pt-4 border-t border-green-500/30">
                <div className="text-green-400 text-lg font-semibold mb-4">Connect With Us</div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-white">Facebook</span>
                    <a href="#" className="text-green-400 hover:text-green-300 transition-colors">/saalik</a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">YouTube</span>
                    <a href="#" className="text-green-400 hover:text-green-300 transition-colors">/saalik0</a>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Instagram</span>
                    <a href="#" className="text-green-400 hover:text-green-300 transition-colors">/saalik0</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;