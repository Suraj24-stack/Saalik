import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  
  const menuItems = [
    { label: "Users", path: "/admin/users", icon: "👥" },
    { label: "Stories", path: "/admin/story", icon: "📖" },
    // { label: "Ticket Booking", path: "/admin/ticket-booking", icon: "🎫" },
    { label: "Stories Suggestion", path: "/admin/stories-suggestion", icon: "💡" },
    { label: "Guide Booking", path: "/admin/guide-booking", icon: "🎯" },
    { label: "Contact", path: "/admin/contact", icon: "📧" },
    { label: "In Association", path: "/admin/in-association", icon: "🤝" },
    { label: "initiatives", path: "/admin/initiatives", icon: "📖"},
  ];

  const handleClick = (item) => {
    setActiveTab(item.label);
    navigate(item.path);
  };

  return (
    <aside className="w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex-shrink-0 min-h-screen shadow-2xl border-r border-emerald-900/30">
      {/* Header */}
      <div className="p-6 border-b border-emerald-800/50 bg-gradient-to-r from-emerald-900/30 to-teal-900/30">
        <div className="flex items-center space-x-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-lg flex items-center justify-center text-emerald-900 font-bold text-lg shadow-lg">
            S
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Admin Panel</h2>
            <p className="text-xs text-emerald-300">SAALIK Dashboard</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="mt-6 px-3">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <button
                onClick={() => handleClick(item)}
                className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 flex items-center space-x-3 group ${
                  activeTab === item.label
                    ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/30 scale-105"
                    : "text-slate-300 hover:bg-slate-700/50 hover:text-white hover:scale-102"
                }`}
              >
                <span className={`text-2xl transition-transform duration-300 ${
                  activeTab === item.label ? "scale-110" : "group-hover:scale-110"
                }`}>
                  {item.icon}
                </span>
                <span className="flex-1">{item.label}</span>
                {activeTab === item.label && (
                  <svg 
                    className="w-5 h-5 text-emerald-300" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 5l7 7-7 7" 
                    />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-emerald-800/50 bg-gradient-to-r from-emerald-900/20 to-teal-900/20">
        <div className="text-center">
          <p className="text-xs text-slate-400">SAALIK Admin v1.0</p>
          <p className="text-xs text-emerald-400 mt-1">Heritage Platform</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

