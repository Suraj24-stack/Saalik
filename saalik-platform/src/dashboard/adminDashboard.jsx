'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectIsAuthenticated, 
  selectUser,
  logout 
} from '../../store/slices/authSlice';

function SaalikAdminDashboard() {
  const router = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/Login');
      return;
    }

    if (user && user.role !== 'admin') {
      router.push('/user_dashboard');
    }
  }, [isAuthenticated, user, router]);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/Login');
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

  const getUserInitials = () => {
    if (user?.name) {
      return user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return 'A';
  };

  const platformStats = [
    { 
      title: 'Total Users', 
      value: '2,847', 
      change: '+12%',
      icon: '👥', 
      bgColor: 'from-emerald-500 to-teal-600',
      description: 'Active platform users'
    },
    { 
      title: 'Stories Published', 
      value: '156', 
      change: '+8',
      icon: '📖', 
      bgColor: 'from-teal-500 to-cyan-600',
      description: 'Cultural narratives'
    },
    { 
      title: 'Guide Bookings', 
      value: '432', 
      change: '+23%',
      icon: '🎫', 
      bgColor: 'from-cyan-500 to-blue-600',
      description: 'This month'
    },
    { 
      title: 'Revenue', 
      value: '$45.2K', 
      change: '+18%',
      icon: '💰', 
      bgColor: 'from-blue-500 to-indigo-600',
      description: 'Monthly earnings'
    },
  ];

  const recentBookings = [
    {
      id: 1,
      user: 'Rajesh Thapa',
      guide: 'Pemba Sherpa',
      tour: 'Durbar Square Heritage Walk',
      date: '2025-10-20',
      status: 'confirmed',
      amount: '$85'
    },
    {
      id: 2,
      user: 'Sarah Johnson',
      guide: 'Mingma Dorje',
      tour: 'Kaal Bhairab Temple Tour',
      date: '2025-10-22',
      status: 'pending',
      amount: '$120'
    },
    {
      id: 3,
      user: 'Anita Gurung',
      guide: 'Tenzin Lama',
      tour: 'Kathmandu Valley Exploration',
      date: '2025-10-25',
      status: 'confirmed',
      amount: '$95'
    }
  ];

  const untoldStories = [
    { id: 1, title: 'Tale of Kaal Bhairab', views: '12.5K', status: 'published', category: 'Mythology' },
    { id: 2, title: 'Kumari: Living Goddess', views: '8.3K', status: 'published', category: 'Tradition' },
    { id: 3, title: 'Newari Architecture', views: '6.7K', status: 'draft', category: 'Heritage' },
  ];

  const registeredGuides = [
    { id: 1, name: 'Pemba Sherpa', expertise: 'Mountain Heritage', rating: 4.9, bookings: 127 },
    { id: 2, name: 'Mingma Dorje', expertise: 'Temple Tours', rating: 4.8, bookings: 98 },
    { id: 3, name: 'Tenzin Lama', expertise: 'Cultural Tours', rating: 4.7, bookings: 82 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-950">
      {/* Header Navigation */}
      <nav className="bg-gradient-to-r from-emerald-900 to-teal-900 shadow-lg border-b border-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-emerald-900 font-bold text-lg shadow-lg">
                S
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  SAALIK <span className="text-emerald-400">ADMIN</span>
                </h1>
                <p className="text-xs text-emerald-300">Heritage Platform Dashboard</p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setActiveTab('overview')}
                className={`px-3 py-2 text-sm font-medium transition-all ${
                  activeTab === 'overview' 
                    ? 'text-emerald-300 border-b-2 border-emerald-400' 
                    : 'text-emerald-100 hover:text-white'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`px-3 py-2 text-sm font-medium transition-all ${
                  activeTab === 'users' 
                    ? 'text-emerald-300 border-b-2 border-emerald-400' 
                    : 'text-emerald-100 hover:text-white'
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setActiveTab('stories')}
                className={`px-3 py-2 text-sm font-medium transition-all ${
                  activeTab === 'stories' 
                    ? 'text-emerald-300 border-b-2 border-emerald-400' 
                    : 'text-emerald-100 hover:text-white'
                }`}
              >
                Stories
              </button>
              <button
                onClick={() => setActiveTab('guides')}
                className={`px-3 py-2 text-sm font-medium transition-all ${
                  activeTab === 'guides' 
                    ? 'text-emerald-300 border-b-2 border-emerald-400' 
                    : 'text-emerald-100 hover:text-white'
                }`}
              >
                Guides
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-3 py-2 text-sm font-medium transition-all ${
                  activeTab === 'bookings' 
                    ? 'text-emerald-300 border-b-2 border-emerald-400' 
                    : 'text-emerald-100 hover:text-white'
                }`}
              >
                Bookings
              </button>
            </div>

            {/* Admin Menu */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-emerald-300 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-emerald-900 font-bold text-sm">
                  {getUserInitials()}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-white">{user.name}</p>
                  <p className="text-xs text-emerald-300">Administrator</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-emerald-300 hover:text-red-400 hover:bg-emerald-800 rounded-lg transition-all duration-200"
                  title="Logout"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 mb-8 text-white shadow-2xl border border-emerald-500">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}! 🏛️</h1>
          <p className="text-emerald-100">Manage SAALIK's cultural heritage platform and empower travelers to discover Nepal's untold stories.</p>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {platformStats.map((stat, index) => (
                <div key={index} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 p-6 hover:shadow-2xl hover:border-emerald-600 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${stat.bgColor} flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {stat.icon}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                      <p className="text-xs text-emerald-400 font-semibold">{stat.change}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-emerald-100">{stat.title}</p>
                  <p className="text-xs text-slate-400 mt-1">{stat.description}</p>
                </div>
              ))}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Bookings */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 overflow-hidden">
                <div className="p-6 border-b border-emerald-800 bg-gradient-to-r from-emerald-900/50 to-teal-900/50">
                  <h2 className="text-xl font-semibold text-white">Recent Guide Bookings</h2>
                  <p className="text-sm text-emerald-300 mt-1">Latest tour reservations</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentBookings.map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700 transition-colors border border-slate-600">
                        <div className="flex-1">
                          <h3 className="font-medium text-white">{booking.tour}</h3>
                          <div className="flex items-center space-x-3 text-sm text-slate-300 mt-2">
                            <span>👤 {booking.user}</span>
                            <span>|</span>
                            <span>🎯 {booking.guide}</span>
                          </div>
                          <div className="flex items-center space-x-3 text-xs text-slate-400 mt-1">
                            <span>📅 {new Date(booking.date).toLocaleDateString()}</span>
                            <span className="font-semibold text-emerald-400">{booking.amount}</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          booking.status === 'confirmed' 
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500' 
                            : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                    View All Bookings
                  </button>
                </div>
              </div>

              {/* Untold Stories */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 overflow-hidden">
                <div className="p-6 border-b border-emerald-800 bg-gradient-to-r from-emerald-900/50 to-teal-900/50">
                  <h2 className="text-xl font-semibold text-white">Untold Stories</h2>
                  <p className="text-sm text-emerald-300 mt-1">Cultural narratives management</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {untoldStories.map((story) => (
                      <div key={story.id} className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700 transition-colors border border-slate-600">
                        <div className="flex-1">
                          <h3 className="font-medium text-white">{story.title}</h3>
                          <div className="flex items-center space-x-3 text-sm text-slate-300 mt-2">
                            <span className="flex items-center">
                              <span className="text-emerald-400 mr-1">👁️</span>
                              {story.views}
                            </span>
                            <span className="px-2 py-0.5 bg-teal-500/20 text-teal-300 rounded text-xs border border-teal-500">
                              {story.category}
                            </span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          story.status === 'published' 
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500' 
                            : 'bg-slate-500/20 text-slate-300 border border-slate-500'
                        }`}>
                          {story.status}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium">
                    Manage Stories
                  </button>
                </div>
              </div>
            </div>

            {/* Registered Guides Section */}
            <div className="mt-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 overflow-hidden">
              <div className="p-6 border-b border-emerald-800 bg-gradient-to-r from-emerald-900/50 to-teal-900/50">
                <h2 className="text-xl font-semibold text-white">Top Registered Guides</h2>
                <p className="text-sm text-emerald-300 mt-1">Certified heritage specialists</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {registeredGuides.map((guide) => (
                    <div key={guide.id} className="p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700 transition-all border border-slate-600 group">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-emerald-900 font-bold">
                          {guide.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-white group-hover:text-emerald-300 transition-colors">{guide.name}</h3>
                          <p className="text-xs text-slate-400">{guide.expertise}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="flex items-center text-yellow-400">
                          ⭐ {guide.rating}
                        </span>
                        <span className="text-emerald-400 font-semibold">{guide.bookings} bookings</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Platform Management</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button className="p-4 bg-gradient-to-r from-emerald-600/20 to-emerald-700/20 rounded-xl hover:from-emerald-600/40 hover:to-emerald-700/40 transition-all group border border-emerald-600">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">👥</div>
                  <p className="text-sm font-medium text-emerald-200">Manage Users</p>
                </button>
                <button className="p-4 bg-gradient-to-r from-teal-600/20 to-teal-700/20 rounded-xl hover:from-teal-600/40 hover:to-teal-700/40 transition-all group border border-teal-600">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📖</div>
                  <p className="text-sm font-medium text-teal-200">Add Story</p>
                </button>
                <button className="p-4 bg-gradient-to-r from-cyan-600/20 to-cyan-700/20 rounded-xl hover:from-cyan-600/40 hover:to-cyan-700/40 transition-all group border border-cyan-600">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🎯</div>
                  <p className="text-sm font-medium text-cyan-200">Approve Guides</p>
                </button>
                <button className="p-4 bg-gradient-to-r from-blue-600/20 to-blue-700/20 rounded-xl hover:from-blue-600/40 hover:to-blue-700/40 transition-all group border border-blue-600">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📊</div>
                  <p className="text-sm font-medium text-blue-200">Analytics</p>
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'users' && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">User Management</h2>
            <p className="text-slate-300">Manage platform users, verify accounts, and handle user permissions.</p>
          </div>
        )}

        {activeTab === 'stories' && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Untold Stories Management</h2>
            <p className="text-slate-300">Create, edit, and publish cultural narratives about Nepal's heritage.</p>
          </div>
        )}

        {activeTab === 'guides' && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Guide Management</h2>
            <p className="text-slate-300">Review guide applications, manage certifications, and monitor performance.</p>
          </div>
        )}

        {activeTab === 'bookings' && (
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Booking Management</h2>
            <p className="text-slate-300">Oversee all guide bookings, handle disputes, and process refunds.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default SaalikAdminDashboard;