import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SaalikUserPage from "./User/User";
import {
  selectIsAuthenticated,
  selectUser,
  logout,
} from '../../store/slices/authSlice';
import Sidebar from "./AdminSidebar/Sidebar";
import AdminStoriesPage from "./AdminStoriesPage/AdminStoriesPage";
import AdminAssociationPage from "./AdminAssociation/Association";
import AdminContactPage from "./AdminContact/Contact";
import AdminGuideBookingPage from "./AdminGuide/Guide";
import AdminTicketBookingPage from "./AdminTicket/Ticket";
import AdminStoriesSuggestionPage from "./AdminStoriesSuggestion/StoriesSuggestion";
import Admininitiatives from "./Admininitiatives/Admininitiatives";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const [activeTab, setActiveTab] = useState("Users");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (user && user.role !== "super_admin") {
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-900 to-teal-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400 mx-auto mb-4"></div>
          <p className="text-emerald-100">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="flex min-h-screen bg-gradient-to-br mt-15 from-slate-900 via-emerald-950 to-teal-950">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 flex flex-col">
        {/* Main Content */}
        <main className="flex-1 text-white p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/admin/users" replace />} />
            <Route path="initiatives" element={<Admininitiatives/>} />
            <Route path="users" element={<SaalikUserPage />} />
            <Route path="story" element={<AdminStoriesPage />} />
            <Route path="ticket-booking" element={<AdminTicketBookingPage />} />
            <Route path="stories-suggestion" element={<AdminStoriesSuggestionPage />} />
            <Route path="guide-booking" element={<AdminGuideBookingPage />} />
            <Route path="contact" element={<AdminContactPage />} />
            <Route path="in-association" element={<AdminAssociationPage />} />
          </Routes>
        </main>
      </div>
    </div>
    <Footer/>
    </>
  );
}
