import React from "react";

const AdminNavbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mt-20 mx-auto flex space-x-4">
        <a href="#home" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
          Home
        </a>
        <a href="#services" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
          Services
        </a>
        <a href="#about" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
          About
        </a>
        <a href="#contact" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
          Contact
        </a>
      </div>
    </nav>
  );
};

export default AdminNavbar;
