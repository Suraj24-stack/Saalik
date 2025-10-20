import React, { useState } from 'react';

function SaalikUserDashboard() {
  // Mock user data - replace with actual Redux/context in your app
  const [user] = useState({
    name: 'Rajesh Thapa',
    email: 'rajesh.thapa@email.com',
    role: 'user'
  });
  
  const [activeTab, setActiveTab] = useState('overview');

  const getUserInitials = () => {
    if (user?.name) {
      return user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return 'U';
  };

  const handleLogout = () => {
    alert('Logout functionality - integrate with your auth system');
  };

  const userStats = [
    { 
      title: 'Tours Booked', 
      value: '8', 
      icon: '🎫', 
      bgColor: 'from-emerald-500 to-teal-600',
      description: 'Total experiences'
    },
    { 
      title: 'Stories Read', 
      value: '23', 
      icon: '📖', 
      bgColor: 'from-teal-500 to-cyan-600',
      description: 'Cultural narratives'
    },
    { 
      title: 'Saved Stories', 
      value: '12', 
      icon: '❤️', 
      bgColor: 'from-cyan-500 to-blue-600',
      description: 'Your favorites'
    },
    { 
      title: 'Rewards Points', 
      value: '450', 
      icon: '⭐', 
      bgColor: 'from-blue-500 to-indigo-600',
      description: 'Loyalty points'
    },
  ];

  const myBookings = [
    {
      id: 1,
      guide: 'Pemba Sherpa',
      guidePic: 'PS',
      tour: 'Durbar Square Heritage Walk',
      date: '2025-10-20',
      time: '09:00 AM',
      status: 'upcoming',
      amount: '$85',
      duration: '3 hours',
      rating: 4.9
    },
    {
      id: 2,
      guide: 'Mingma Dorje',
      guidePic: 'MD',
      tour: 'Kaal Bhairab Temple Tour',
      date: '2025-10-22',
      time: '02:00 PM',
      status: 'upcoming',
      amount: '$120',
      duration: '4 hours',
      rating: 4.8
    },
    {
      id: 3,
      guide: 'Tenzin Lama',
      guidePic: 'TL',
      tour: 'Kathmandu Valley Exploration',
      date: '2025-10-18',
      time: '10:00 AM',
      status: 'completed',
      amount: '$95',
      duration: '5 hours',
      rating: 4.7
    }
  ];

  const savedStories = [
    { 
      id: 1, 
      title: 'Tale of Kaal Bhairab', 
      category: 'Mythology',
      readTime: '8 min read',
      image: '🏛️',
      excerpt: 'Discover the ancient legend of the fearsome deity...'
    },
    { 
      id: 2, 
      title: 'Kumari: Living Goddess', 
      category: 'Tradition',
      readTime: '6 min read',
      image: '👸',
      excerpt: 'The sacred tradition of Nepal\'s living goddess...'
    },
    { 
      id: 3, 
      title: 'Newari Architecture', 
      category: 'Heritage',
      readTime: '10 min read',
      image: '🏯',
      excerpt: 'Exploring the intricate woodwork and design...'
    },
  ];

  const availableGuides = [
    { 
      id: 1, 
      name: 'Pemba Sherpa', 
      expertise: 'Mountain Heritage', 
      rating: 4.9, 
      tours: 127,
      price: '$85/tour',
      languages: ['English', 'Nepali', 'Sherpa']
    },
    { 
      id: 2, 
      name: 'Mingma Dorje', 
      expertise: 'Temple Tours', 
      rating: 4.8, 
      tours: 98,
      price: '$120/tour',
      languages: ['English', 'Nepali', 'Hindi']
    },
    { 
      id: 3, 
      name: 'Tenzin Lama', 
      expertise: 'Cultural Tours', 
      rating: 4.7, 
      tours: 82,
      price: '$95/tour',
      languages: ['English', 'Nepali', 'Tibetan']
    },
    { 
      id: 4, 
      name: 'Karma Tamang', 
      expertise: 'Historical Sites', 
      rating: 4.8, 
      tours: 65,
      price: '$100/tour',
      languages: ['English', 'Nepali', 'Tamang']
    },
  ];

  const exploreStories = [
    { 
      id: 1, 
      title: 'Festivals of Kathmandu Valley',
      category: 'Culture',
      views: '15.2K',
      image: '🎭'
    },
    { 
      id: 2, 
      title: 'Ancient Trade Routes',
      category: 'History',
      views: '9.8K',
      image: '🛤️'
    },
    { 
      id: 3, 
      title: 'Traditional Crafts',
      category: 'Arts',
      views: '7.5K',
      image: '🎨'
    },
    { 
      id: 4, 
      title: 'Sacred Rivers',
      category: 'Spirituality',
      views: '11.3K',
      image: '🌊'
    },
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
                  SAALIK
                </h1>
                <p className="text-xs text-emerald-300">Discover Nepal's Heritage</p>
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
                onClick={() => setActiveTab('bookings')}
                className={`px-3 py-2 text-sm font-medium transition-all ${
                  activeTab === 'bookings' 
                    ? 'text-emerald-300 border-b-2 border-emerald-400' 
                    : 'text-emerald-100 hover:text-white'
                }`}
              >
                My Bookings
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
                Find Guides
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-3 py-2 text-sm font-medium transition-all ${
                  activeTab === 'profile' 
                    ? 'text-emerald-300 border-b-2 border-emerald-400' 
                    : 'text-emerald-100 hover:text-white'
                }`}
              >
                Profile
              </button>
            </div>

            {/* User Menu */}
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
                  <p className="text-xs text-emerald-300">Explorer</p>
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
          <h1 className="text-3xl font-bold mb-2">Namaste, {user.name}! 🙏</h1>
          <p className="text-emerald-100">Explore Nepal's untold stories and connect with expert local guides for authentic cultural experiences.</p>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {userStats.map((stat, index) => (
                <div key={index} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 p-6 hover:shadow-2xl hover:border-emerald-600 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${stat.bgColor} flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {stat.icon}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-emerald-100">{stat.title}</p>
                  <p className="text-xs text-slate-400 mt-1">{stat.description}</p>
                </div>
              ))}
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* My Upcoming Bookings */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 overflow-hidden">
                <div className="p-6 border-b border-emerald-800 bg-gradient-to-r from-emerald-900/50 to-teal-900/50">
                  <h2 className="text-xl font-semibold text-white">My Bookings</h2>
                  <p className="text-sm text-emerald-300 mt-1">Your tour schedule</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {myBookings.slice(0, 2).map((booking) => (
                      <div key={booking.id} className="p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700 transition-colors border border-slate-600">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-emerald-900 font-bold text-sm">
                              {booking.guidePic}
                            </div>
                            <div>
                              <h3 className="font-medium text-white">{booking.tour}</h3>
                              <p className="text-sm text-slate-400">with {booking.guide}</p>
                            </div>
                          </div>
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            booking.status === 'upcoming' 
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500' 
                              : 'bg-slate-500/20 text-slate-300 border border-slate-500'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-300">
                          <div className="flex items-center space-x-3">
                            <span>📅 {new Date(booking.date).toLocaleDateString()}</span>
                            <span>🕐 {booking.time}</span>
                          </div>
                          <span className="font-semibold text-emerald-400">{booking.amount}</span>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-xs text-slate-400">⏱️ {booking.duration}</span>
                          <span className="text-xs text-yellow-400">⭐ {booking.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setActiveTab('bookings')}
                    className="w-full mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                  >
                    View All Bookings
                  </button>
                </div>
              </div>

              {/* Saved Stories */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 overflow-hidden">
                <div className="p-6 border-b border-emerald-800 bg-gradient-to-r from-emerald-900/50 to-teal-900/50">
                  <h2 className="text-xl font-semibold text-white">Saved Stories</h2>
                  <p className="text-sm text-emerald-300 mt-1">Your favorite narratives</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {savedStories.map((story) => (
                      <div key={story.id} className="p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700 transition-colors border border-slate-600 group cursor-pointer">
                        <div className="flex items-start space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center text-2xl">
                            {story.image}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-white group-hover:text-emerald-300 transition-colors">{story.title}</h3>
                            <p className="text-xs text-slate-400 mt-1 line-clamp-1">{story.excerpt}</p>
                            <div className="flex items-center space-x-3 mt-2">
                              <span className="px-2 py-0.5 bg-teal-500/20 text-teal-300 rounded text-xs border border-teal-500">
                                {story.category}
                              </span>
                              <span className="text-xs text-slate-400">📖 {story.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button 
                    onClick={() => setActiveTab('stories')}
                    className="w-full mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
                  >
                    Explore More Stories
                  </button>
                </div>
              </div>
            </div>

            {/* Explore Stories Section */}
            <div className="mt-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 overflow-hidden">
              <div className="p-6 border-b border-emerald-800 bg-gradient-to-r from-emerald-900/50 to-teal-900/50">
                <h2 className="text-xl font-semibold text-white">Explore Cultural Stories</h2>
                <p className="text-sm text-emerald-300 mt-1">Discover Nepal's untold narratives</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {exploreStories.map((story) => (
                    <div key={story.id} className="p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700 transition-all border border-slate-600 group cursor-pointer hover:scale-105">
                      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{story.image}</div>
                      <h3 className="font-medium text-white group-hover:text-emerald-300 transition-colors mb-2">{story.title}</h3>
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded border border-cyan-500">
                          {story.category}
                        </span>
                        <span className="text-slate-400">👁️ {story.views}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button 
                  onClick={() => setActiveTab('guides')}
                  className="p-4 bg-gradient-to-r from-emerald-600/20 to-emerald-700/20 rounded-xl hover:from-emerald-600/40 hover:to-emerald-700/40 transition-all group border border-emerald-600"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">🎯</div>
                  <p className="text-sm font-medium text-emerald-200">Find Guides</p>
                </button>
                <button 
                  onClick={() => setActiveTab('stories')}
                  className="p-4 bg-gradient-to-r from-teal-600/20 to-teal-700/20 rounded-xl hover:from-teal-600/40 hover:to-teal-700/40 transition-all group border border-teal-600"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📚</div>
                  <p className="text-sm font-medium text-teal-200">Read Stories</p>
                </button>
                <button 
                  onClick={() => setActiveTab('bookings')}
                  className="p-4 bg-gradient-to-r from-cyan-600/20 to-cyan-700/20 rounded-xl hover:from-cyan-600/40 hover:to-cyan-700/40 transition-all group border border-cyan-600"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">📅</div>
                  <p className="text-sm font-medium text-cyan-200">My Tours</p>
                </button>
                <button 
                  onClick={() => setActiveTab('profile')}
                  className="p-4 bg-gradient-to-r from-blue-600/20 to-blue-700/20 rounded-xl hover:from-blue-600/40 hover:to-blue-700/40 transition-all group border border-blue-600"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">👤</div>
                  <p className="text-sm font-medium text-blue-200">My Profile</p>
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 p-6">
              <h2 className="text-2xl font-bold text-white mb-4">My Tour Bookings</h2>
              <div className="space-y-4">
                {myBookings.map((booking) => (
                  <div key={booking.id} className="p-5 bg-slate-700/50 rounded-xl border border-slate-600 hover:border-emerald-500 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-emerald-900 font-bold">
                          {booking.guidePic}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{booking.tour}</h3>
                          <p className="text-slate-300">Guide: {booking.guide}</p>
                          <span className="text-xs text-yellow-400">⭐ {booking.rating} rating</span>
                        </div>
                      </div>
                      <span className={`px-4 py-2 text-sm font-medium rounded-full ${
                        booking.status === 'upcoming' 
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500' 
                          : booking.status === 'completed'
                          ? 'bg-slate-500/20 text-slate-300 border border-slate-500'
                          : 'bg-yellow-500/20 text-yellow-300 border border-yellow-500'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="text-slate-300">
                        <p className="text-slate-500 text-xs mb-1">Date</p>
                        <p>📅 {new Date(booking.date).toLocaleDateString()}</p>
                      </div>
                      <div className="text-slate-300">
                        <p className="text-slate-500 text-xs mb-1">Time</p>
                        <p>🕐 {booking.time}</p>
                      </div>
                      <div className="text-slate-300">
                        <p className="text-slate-500 text-xs mb-1">Duration</p>
                        <p>⏱️ {booking.duration}</p>
                      </div>
                      <div className="text-emerald-400 font-semibold">
                        <p className="text-slate-500 text-xs mb-1">Amount</p>
                        <p>{booking.amount}</p>
                      </div>
                    </div>
                    {booking.status === 'upcoming' && (
                      <div className="mt-4 flex space-x-3">
                        <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
                          View Details
                        </button>
                        <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm font-medium">
                          Cancel Booking
                        </button>
                      </div>
                    )}
                    {booking.status === 'completed' && (
                      <div className="mt-4">
                        <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium">
                          Write a Review
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stories' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Cultural Stories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[...savedStories, ...exploreStories.slice(0, 1)].map((story) => (
                  <div key={story.id} className="p-5 bg-slate-700/50 rounded-xl border border-slate-600 hover:border-teal-500 transition-all group cursor-pointer">
                    <div className="flex items-start space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                        {story.image}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors mb-2">
                          {story.title}
                        </h3>
                        {story.excerpt && (
                          <p className="text-sm text-slate-400 mb-3">{story.excerpt}</p>
                        )}
                        <div className="flex items-center space-x-3">
                          <span className="px-2 py-1 bg-teal-500/20 text-teal-300 rounded text-xs border border-teal-500">
                            {story.category}
                          </span>
                          {story.readTime && (
                            <span className="text-xs text-slate-400">📖 {story.readTime}</span>
                          )}
                          {story.views && (
                            <span className="text-xs text-slate-400">👁️ {story.views}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button className="w-full mt-4 px-4 py-2 bg-teal-600/20 text-teal-300 rounded-lg hover:bg-teal-600/40 transition-colors text-sm font-medium border border-teal-600">
                      Read Story
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'guides' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">Find Expert Guides</h2>
                  <p className="text-slate-300 mt-1">Connect with certified heritage specialists</p>
                </div>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                  Filter Guides
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {availableGuides.map((guide) => (
                  <div key={guide.id} className="p-5 bg-slate-700/50 rounded-xl border border-slate-600 hover:border-emerald-500 transition-all group">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-emerald-900 font-bold text-lg">
                          {guide.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors">
                            {guide.name}
                          </h3>
                          <p className="text-sm text-slate-400">{guide.expertise}</p>
                          <span className="text-sm text-yellow-400">⭐ {guide.rating} ({guide.tours} tours)</span>
                        </div>
                      </div>
                      <span className="text-lg font-bold text-emerald-400">{guide.price}</span>
                    </div>
                    <div className="mb-4">
                      <p className="text-xs text-slate-500 mb-2">Languages:</p>
                      <div className="flex flex-wrap gap-2">
                        {guide.languages.map((lang, idx) => (
                          <span key={idx} className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs border border-cyan-500">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                        Book Now
                      </button>
                      <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors">
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 p-6">
              <h2 className="text-2xl font-bold text-white mb-6">My Profile</h2>
              <div className="flex items-start space-x-6 mb-8">
                <div className="w-24 h-24 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-emerald-900 font-bold text-3xl">
                  {getUserInitials()}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{user.name}</h3>
                  <p className="text-slate-300 mb-2">{user.email}</p>
                  <div className="flex items-center space-x-4">
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-sm border border-emerald-500">
                      Explorer Level
                    </span>
                    <span className="text-slate-400">Member since Oct 2025</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium">
                  Edit Profile
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-slate-700/50 rounded-xl border border-slate-600">
                  <h4 className="text-lg font-semibold text-white mb-3">Account Settings</h4>
                  <div className="space-y-2 text-slate-300">
                    <p className="flex items-center justify-between">
                      <span>Email Notifications</span>
                      <span className="text-emerald-400">Enabled</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span>Two-Factor Auth</span>
                      <span className="text-yellow-400">Disabled</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span>Privacy Level</span>
                      <span className="text-cyan-400">Public</span>
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-slate-700/50 rounded-xl border border-slate-600">
                  <h4 className="text-lg font-semibold text-white mb-3">Preferences</h4>
                  <div className="space-y-2 text-slate-300">
                    <p className="flex items-center justify-between">
                      <span>Language</span>
                      <span className="text-emerald-400">English</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span>Currency</span>
                      <span className="text-emerald-400">USD ($)</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span>Timezone</span>
                      <span className="text-emerald-400">Asia/Kathmandu</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default SaalikUserDashboard;