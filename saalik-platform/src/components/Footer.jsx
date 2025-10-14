const Footer = () => (
  <footer className="bg-black border-t border-green-500/20 py-12 px-4">
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-black font-bold text-sm">S</span>
            </div>
            <span className="text-white text-xl font-bold">SAALIK</span>
          </div>
          <p className="text-gray-400 text-sm">Delivering innovative technology solutions with excellence and integrity.</p>
        </div>
        <div>
          <h3 className="text-white font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {['Home', 'Stories', 'Guide Booking', 'Contact'].map((link) => (
              <li key={link}><a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">{link}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-white font-bold mb-4">Company</h3>
          <ul className="space-y-2">
            {['About', 'Team'].map((link) => (
              <li key={link}><a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">{link}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-white font-bold mb-4">Connect With Us</h3>
          <div className="space-y-2">
            <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors text-sm">
              <Facebook size={16} /><span>Facebook /saalik</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors text-sm">
              <Youtube size={16} /><span>YouTube /saalik0</span>
            </a>
            <a href="#" className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors text-sm">
              <Instagram size={16} /><span>Instagram /saalikl</span>
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-green-500/20 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-gray-500 text-sm">© 2025 SAALIK TECH PVT. LTD. All rights reserved</p>
        <div className="flex space-x-4 text-sm">
          <a href="#" className="text-gray-500 hover:text-green-400">Privacy Policy</a>
          <span className="text-gray-700">|</span>
          <a href="#" className="text-gray-500 hover:text-green-400">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);
