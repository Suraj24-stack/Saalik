import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Users", path: "/users" },
    { label: "Stories", path: "/stories" },
    { label: "Ticket Booking", path: "/icket-booking" },
    { label: "Stories Suggestion", path: "/stories-suggestion" },
    { label: "Guide Booking", path: "/guide-booking" },
    { label: "Contact", path: "/contact" },
    { label: "In Association", path: "/in-association" },
  ];

  const handleClick = (item) => {
    setActiveTab(item.label); // highlight the tab
    navigate(item.path);      // update the route
  };

  return (
    <aside className="w-60 mt-15 bg-gray-800 text-white flex-shrink-0">
      <div className="p-6 text-2xl font-bold border-b border-gray-700">
        Admin Panel
      </div>
      <ul className="mt-6">
        {menuItems.map((item) => (
          <li key={item.path}>
            <button
              onClick={() => handleClick(item)}
              className={`w-full text-left px-6 py-3 text-sm font-medium transition-all ${
                activeTab === item.label
                  ? "bg-gray-700 text-emerald-300"
                  : "hover:bg-gray-700 hover:text-white"
              }`}
            >
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
