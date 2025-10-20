import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminNavbar from "./AdminNavbar/AdminNavbar";
import Sidebar from "./AdminSidebar/Sidebar";
import SaalikUserPage from "./User/User";
// Import other admin pages
// import StoriesAdminPage from "./Stories/StoriesAdminPage";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("Users"); // default tab

  return (
    <div className="flex min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col">
        <AdminNavbar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 bg-gray-900 text-white p-6">
          <Routes>
            <Route path="users" element={<SaalikUserPage />} />
            {/* <Route path="stories" element={<StoriesAdminPage />} /> */}
            {/* Add more dashboard routes here */}
          </Routes>
        </main>
      </div>
    </div>
  );
}
