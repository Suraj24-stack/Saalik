import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectUser,
  logout,
} from "../../store/slices/authSlice";

function SaalikAdminDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/Login");
      return;
    }

    if (user && user.role !== "super_admin") {
      navigate("/user_dashboard");
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/Login");
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
      return user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return "A";
  };

  const platformStats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12%",
      trend: "up",
      icon: "👥",
      bgColor: "from-emerald-500 to-teal-600",
      description: "Active platform users",
      subtext: "+342 this month",
    },
    {
      title: "Stories Published",
      value: "156",
      change: "+8",
      trend: "up",
      icon: "📖",
      bgColor: "from-teal-500 to-cyan-600",
      description: "Cultural narratives",
      subtext: "12 pending review",
    },
    {
      title: "Guide Bookings",
      value: "432",
      change: "+23%",
      trend: "up",
      icon: "🎫",
      bgColor: "from-cyan-500 to-blue-600",
      description: "This month",
      subtext: "28 today",
    },
    {
      title: "Revenue",
      value: "$45.2K",
      change: "+18%",
      trend: "up",
      icon: "💰",
      bgColor: "from-blue-500 to-indigo-600",
      description: "Monthly earnings",
      subtext: "$1.8K today",
    },
  ];

  const allUsers = [
    {
      id: 1,
      name: "Rajesh Thapa",
      email: "rajesh@email.com",
      role: "user",
      status: "active",
      joined: "2024-10-15",
      bookings: 8,
      spent: "$680",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah@email.com",
      role: "guide",
      status: "active",
      joined: "2024-09-20",
      bookings: 45,
      spent: "$3,240",
    },
    {
      id: 3,
      name: "Anita Gurung",
      email: "anita@email.com",
      role: "user",
      status: "active",
      joined: "2024-10-10",
      bookings: 5,
      spent: "$425",
    },
    {
      id: 4,
      name: "Michael Chen",
      email: "michael@email.com",
      role: "user",
      status: "inactive",
      joined: "2024-08-05",
      bookings: 2,
      spent: "$170",
    },
    {
      id: 5,
      name: "Pemba Sherpa",
      email: "pemba@email.com",
      role: "guide",
      status: "active",
      joined: "2024-07-12",
      bookings: 127,
      spent: "$10,795",
    },
  ];

  const allBookings = [
    {
      id: 1,
      user: "Rajesh Thapa",
      guide: "Pemba Sherpa",
      tour: "Durbar Square Heritage Walk",
      date: "2025-10-20",
      time: "09:00 AM",
      status: "confirmed",
      amount: "$85",
      duration: "3h",
    },
    {
      id: 2,
      user: "Sarah Johnson",
      guide: "Mingma Dorje",
      tour: "Kaal Bhairab Temple Tour",
      date: "2025-10-22",
      time: "02:00 PM",
      status: "pending",
      amount: "$120",
      duration: "4h",
    },
    {
      id: 3,
      user: "Anita Gurung",
      guide: "Tenzin Lama",
      tour: "Kathmandu Valley Exploration",
      date: "2025-10-25",
      time: "10:00 AM",
      status: "confirmed",
      amount: "$95",
      duration: "5h",
    },
    {
      id: 4,
      user: "Michael Chen",
      guide: "Karma Tamang",
      tour: "Buddhist Monastery Circuit",
      date: "2025-10-18",
      time: "08:00 AM",
      status: "completed",
      amount: "$110",
      duration: "6h",
    },
    {
      id: 5,
      user: "Lisa Anderson",
      guide: "Pemba Sherpa",
      tour: "Ancient Newari Culture Tour",
      date: "2025-10-27",
      time: "11:00 AM",
      status: "confirmed",
      amount: "$90",
      duration: "4h",
    },
  ];

  const allStories = [
    {
      id: 1,
      title: "Tale of Kaal Bhairab",
      author: "Admin",
      views: "12.5K",
      status: "published",
      category: "Mythology",
      date: "2025-10-10",
      likes: 856,
    },
    {
      id: 2,
      title: "Kumari: Living Goddess",
      author: "Admin",
      views: "8.3K",
      status: "published",
      category: "Tradition",
      date: "2025-10-08",
      likes: 623,
    },
    {
      id: 3,
      title: "Newari Architecture",
      author: "Admin",
      views: "6.7K",
      status: "draft",
      category: "Heritage",
      date: "2025-10-15",
      likes: 0,
    },
    {
      id: 4,
      title: "Festivals of Nepal",
      author: "Admin",
      views: "15.2K",
      status: "published",
      category: "Culture",
      date: "2025-10-05",
      likes: 1203,
    },
    {
      id: 5,
      title: "Sacred Rivers and Ghats",
      author: "Admin",
      views: "9.1K",
      status: "published",
      category: "Spirituality",
      date: "2025-10-12",
      likes: 742,
    },
    {
      id: 6,
      title: "Traditional Craftsmanship",
      author: "Admin",
      views: "0",
      status: "draft",
      category: "Arts",
      date: "2025-10-16",
      likes: 0,
    },
  ];

  const allGuides = [
    {
      id: 1,
      name: "Pemba Sherpa",
      expertise: "Mountain Heritage",
      rating: 4.9,
      bookings: 127,
      status: "verified",
      joined: "2024-07-12",
      languages: ["English", "Nepali", "Sherpa"],
      phone: "+977-9841234567",
    },
    {
      id: 2,
      name: "Mingma Dorje",
      expertise: "Temple Tours",
      rating: 4.8,
      bookings: 98,
      status: "verified",
      joined: "2024-08-20",
      languages: ["English", "Nepali", "Hindi"],
      phone: "+977-9841234568",
    },
    {
      id: 3,
      name: "Tenzin Lama",
      expertise: "Cultural Tours",
      rating: 4.7,
      bookings: 82,
      status: "verified",
      joined: "2024-09-05",
      languages: ["English", "Nepali", "Tibetan"],
      phone: "+977-9841234569",
    },
    {
      id: 4,
      name: "Karma Tamang",
      expertise: "Historical Sites",
      rating: 4.8,
      bookings: 65,
      status: "pending",
      joined: "2024-10-01",
      languages: ["English", "Nepali", "Tamang"],
      phone: "+977-9841234570",
    },
    {
      id: 5,
      name: "Dorje Gurung",
      expertise: "Adventure Tours",
      rating: 4.6,
      bookings: 43,
      status: "pending",
      joined: "2024-10-10",
      languages: ["English", "Nepali"],
      phone: "+977-9841234571",
    },
  ];

  const notifications = [
    {
      id: 1,
      type: "booking",
      message: "New booking from Rajesh Thapa",
      time: "5 min ago",
      read: false,
    },
    {
      id: 2,
      type: "guide",
      message: "Guide application from Dorje Gurung",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "story",
      message: 'Story "Newari Architecture" pending review',
      time: "2 hours ago",
      read: true,
    },
    {
      id: 4,
      type: "user",
      message: "10 new user registrations today",
      time: "3 hours ago",
      read: true,
    },
  ];

  /* const filteredUsers = allUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );*/

  /*const filteredBookings = allBookings.filter(booking =>
    selectedFilter === 'all' || booking.status === selectedFilter
  );

  const filteredStories = allStories.filter(story =>
    selectedFilter === 'all' || story.status === selectedFilter
  );

  const filteredGuides = allGuides.filter(guide =>
    selectedFilter === 'all' || guide.status === selectedFilter
  );*/

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-950">
      {/* Header Navigation */}
      <nav className="bg-gradient-to-r from-emerald-900 to-teal-900 shadow-lg border-b border-emerald-700 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
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
                <p className="text-xs text-emerald-300">
                  Heritage Platform Dashboard
                </p>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-3 py-2 text-sm font-medium transition-all ${
                  activeTab === "overview"
                    ? "text-emerald-300 border-b-2 border-emerald-400"
                    : "text-emerald-100 hover:text-white"
                }`}
              >
                Overview
              </button>

              <button
                onClick={() => navigate("/users")}
                className={`px-3 py-2 text-sm font-medium transition-all ${
                  activeTab === "users"
                    ? "text-emerald-300 border-b-2 border-emerald-400"
                    : "text-emerald-100 hover:text-white"
                }`}
              >
                Users
              </button>
              <button
                onClick={() => setActiveTab("stories")}
                className={`px-3 py-2 text-sm font-medium transition-all ${
                  activeTab === "stories"
                    ? "text-emerald-300 border-b-2 border-emerald-400"
                    : "text-emerald-100 hover:text-white"
                }`}
              >
                Stories
              </button>
              <button
                onClick={() => setActiveTab("guides")}
                className={`px-3 py-2 text-sm font-medium transition-all ${
                  activeTab === "guides"
                    ? "text-emerald-300 border-b-2 border-emerald-400"
                    : "text-emerald-100 hover:text-white"
                }`}
              >
                Guides
              </button>
              <button
                onClick={() => setActiveTab("bookings")}
                className={`px-3 py-2 text-sm font-medium transition-all ${
                  activeTab === "bookings"
                    ? "text-emerald-300 border-b-2 border-emerald-400"
                    : "text-emerald-100 hover:text-white"
                }`}
              >
                Bookings
              </button>
            </div>

            {/* Admin Menu */}
            <div className="flex items-center space-x-4">
              {/*   */}

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
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
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
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 mb-8 text-white shadow-2xl border border-emerald-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user.name}! 🏛️
            </h1>
            <p className="text-emerald-100">
              Manage SAALIK's cultural heritage platform and empower travelers
              to discover Nepal's untold stories.
            </p>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {platformStats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 p-6 hover:shadow-2xl hover:border-emerald-600 transition-all duration-300 group cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-r ${stat.bgColor} flex items-center justify-center text-white text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      {stat.icon}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-white">
                        {stat.value}
                      </p>
                      <p
                        className={`text-xs font-semibold flex items-center justify-end ${
                          stat.trend === "up"
                            ? "text-emerald-400"
                            : "text-red-400"
                        }`}
                      >
                        {stat.trend === "up" ? "↑" : "↓"} {stat.change}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-emerald-100">
                    {stat.title}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    {stat.description}
                  </p>
                  <p className="text-xs text-emerald-400 mt-2">
                    {stat.subtext}
                  </p>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Revenue Chart Placeholder */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Revenue Overview
                </h3>
                <div className="h-64 flex items-end justify-around space-x-2">
                  {[65, 45, 80, 55, 70, 90, 75].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-emerald-500 to-teal-600 rounded-t-lg hover:from-emerald-400 hover:to-teal-500 transition-all cursor-pointer"
                      style={{ height: `${height}%` }}
                    ></div>
                  ))}
                </div>
                <div className="flex justify-around mt-4 text-xs text-slate-400">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Sun</span>
                </div>
              </div>

              {/* Popular Tours */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 p-6">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Popular Tours
                </h3>
                <div className="space-y-3">
                  {[
                    {
                      name: "Durbar Square Heritage Walk",
                      bookings: 127,
                      color: "emerald",
                    },
                    {
                      name: "Kaal Bhairab Temple Tour",
                      bookings: 98,
                      color: "teal",
                    },
                    {
                      name: "Kathmandu Valley Exploration",
                      bookings: 82,
                      color: "cyan",
                    },
                    {
                      name: "Buddhist Monastery Circuit",
                      bookings: 65,
                      color: "blue",
                    },
                  ].map((tour, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-white">{tour.name}</span>
                        <span className="text-sm text-emerald-400 font-semibold">
                          {tour.bookings}
                        </span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className={`bg-gradient-to-r from-${tour.color}-500 to-${tour.color}-600 h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${(tour.bookings / 127) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Bookings */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 overflow-hidden">
                <div className="p-6 border-b border-emerald-800 bg-gradient-to-r from-emerald-900/50 to-teal-900/50">
                  <h2 className="text-xl font-semibold text-white">
                    Recent Guide Bookings
                  </h2>
                  <p className="text-sm text-emerald-300 mt-1">
                    Latest tour reservations
                  </p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {allBookings.slice(0, 3).map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700 transition-colors border border-slate-600"
                      >
                        <div className="flex-1">
                          <h3 className="font-medium text-white">
                            {booking.tour}
                          </h3>
                          <div className="flex items-center space-x-3 text-sm text-slate-300 mt-2">
                            <span>👤 {booking.user}</span>
                            <span>|</span>
                            <span>🎯 {booking.guide}</span>
                          </div>
                          <div className="flex items-center space-x-3 text-xs text-slate-400 mt-1">
                            <span>
                              📅 {new Date(booking.date).toLocaleDateString()}
                            </span>
                            <span className="font-semibold text-emerald-400">
                              {booking.amount}
                            </span>
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            booking.status === "confirmed"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500"
                              : booking.status === "pending"
                              ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500"
                              : "bg-slate-500/20 text-slate-300 border border-slate-500"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveTab("bookings")}
                    className="w-full mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                  >
                    View All Bookings
                  </button>
                </div>
              </div>

              {/* Untold Stories */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 overflow-hidden">
                <div className="p-6 border-b border-emerald-800 bg-gradient-to-r from-emerald-900/50 to-teal-900/50">
                  <h2 className="text-xl font-semibold text-white">
                    Untold Stories
                  </h2>
                  <p className="text-sm text-emerald-300 mt-1">
                    Cultural narratives management
                  </p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {allStories.slice(0, 3).map((story) => (
                      <div
                        key={story.id}
                        className="flex items-center justify-between p-4 bg-slate-700/50 rounded-xl hover:bg-slate-700 transition-colors border border-slate-600"
                      >
                        <div className="flex-1">
                          <h3 className="font-medium text-white">
                            {story.title}
                          </h3>
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
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full ${
                            story.status === "published"
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500"
                              : "bg-slate-500/20 text-slate-300 border border-slate-500"
                          }`}
                        >
                          {story.status}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveTab("stories")}
                    className="w-full mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium"
                  >
                    Manage Stories
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                Platform Management
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <button
                  onClick={() => setActiveTab("users")}
                  className="p-4 bg-gradient-to-r from-emerald-600/20 to-emerald-700/20 rounded-xl hover:from-emerald-600/40 hover:to-emerald-700/40 transition-all group border border-emerald-600"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    👥
                  </div>
                  <p className="text-sm font-medium text-emerald-200">
                    Manage Users
                  </p>
                </button>
                <button
                  onClick={() => setActiveTab("stories")}
                  className="p-4 bg-gradient-to-r from-teal-600/20 to-teal-700/20 rounded-xl hover:from-teal-600/40 hover:to-teal-700/40 transition-all group border border-teal-600"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    📖
                  </div>
                  <p className="text-sm font-medium text-teal-200">Add Story</p>
                </button>
                <button
                  onClick={() => setActiveTab("guides")}
                  className="p-4 bg-gradient-to-r from-cyan-600/20 to-cyan-700/20 rounded-xl hover:from-cyan-600/40 hover:to-cyan-700/40 transition-all group border border-cyan-600"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    🎯
                  </div>
                  <p className="text-sm font-medium text-cyan-200">
                    Approve Guides
                  </p>
                </button>
                <button className="p-4 bg-gradient-to-r from-blue-600/20 to-blue-700/20 rounded-xl hover:from-blue-600/40 hover:to-blue-700/40 transition-all group border border-blue-600">
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">
                    📊
                  </div>
                  <p className="text-sm font-medium text-blue-200">Analytics</p>
                </button>
              </div>
            </div>
          </>
        )}

        {activeTab === "users" && (
          <div className="space-y-6">
            {/* Search and Filter Bar */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <button className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium whitespace-nowrap">
                  + Add User
                </button>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 overflow-hidden">
              <div className="p-6 border-b border-emerald-800 bg-gradient-to-r from-emerald-900/50 to-teal-900/50">
                <h2 className="text-2xl font-bold text-white">
                  User Management
                </h2>
                <p className="text-slate-300 mt-1">
                  Total Users: {allUsers.length}
                </p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">
                        Bookings
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">
                        Spent
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-slate-700/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-emerald-900 font-bold text-sm">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </div>
                            <div>
                              <p className="text-white font-medium">
                                {user.name}
                              </p>
                              <p className="text-slate-400 text-sm">
                                {user.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${
                              user.role === "guide"
                                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500"
                                : "bg-blue-500/20 text-blue-300 border border-blue-500"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${
                              user.status === "active"
                                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500"
                                : "bg-slate-500/20 text-slate-300 border border-slate-500"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white">
                          {user.bookings}
                        </td>
                        <td className="px-6 py-4 text-emerald-400 font-semibold">
                          {user.spent}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <button className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm">
                              Edit
                            </button>
                            <button className="px-3 py-1 bg-slate-600 text-white rounded hover:bg-slate-700 text-sm">
                              View
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 p-6">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedFilter("all")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedFilter === "all"
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  All Bookings
                </button>
                <button
                  onClick={() => setSelectedFilter("confirmed")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedFilter === "confirmed"
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  Confirmed
                </button>
                <button
                  onClick={() => setSelectedFilter("pending")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedFilter === "pending"
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  Pending
                </button>
                <button
                  onClick={() => setSelectedFilter("completed")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedFilter === "completed"
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  Completed
                </button>
              </div>
            </div>

            {/* Bookings List */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Booking Management
              </h2>
              <div className="space-y-4">
                {filteredBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-5 bg-slate-700/50 rounded-xl border border-slate-600 hover:border-emerald-500 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {booking.tour}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-slate-300">
                          <span>👤 {booking.user}</span>
                          <span>🎯 {booking.guide}</span>
                        </div>
                      </div>
                      <span
                        className={`px-4 py-2 text-sm font-medium rounded-full ${
                          booking.status === "confirmed"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500"
                            : booking.status === "pending"
                            ? "bg-yellow-500/20 text-yellow-300 border border-yellow-500"
                            : "bg-slate-500/20 text-slate-300 border border-slate-500"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                      <div>
                        <p className="text-slate-500 text-xs mb-1">Date</p>
                        <p className="text-slate-300">
                          📅 {new Date(booking.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs mb-1">Time</p>
                        <p className="text-slate-300">🕐 {booking.time}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs mb-1">Duration</p>
                        <p className="text-slate-300">⏱️ {booking.duration}</p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-xs mb-1">Amount</p>
                        <p className="text-emerald-400 font-semibold">
                          {booking.amount}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
                        View Details
                      </button>
                      {booking.status === "pending" && (
                        <>
                          <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium">
                            Approve
                          </button>
                          <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "stories" && (
          <div className="space-y-6">
            {/* Filter and Action Bar */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 p-6">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setSelectedFilter("all")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedFilter === "all"
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    All Stories
                  </button>
                  <button
                    onClick={() => setSelectedFilter("published")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedFilter === "published"
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    Published
                  </button>
                  <button
                    onClick={() => setSelectedFilter("draft")}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedFilter === "draft"
                        ? "bg-emerald-600 text-white"
                        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                    }`}
                  >
                    Drafts
                  </button>
                </div>
                <button className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium whitespace-nowrap">
                  + Create Story
                </button>
              </div>
            </div>

            {/* Stories Grid */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Untold Stories Management
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredStories.map((story) => (
                  <div
                    key={story.id}
                    className="p-5 bg-slate-700/50 rounded-xl border border-slate-600 hover:border-teal-500 transition-all group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors">
                        {story.title}
                      </h3>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          story.status === "published"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500"
                            : "bg-slate-500/20 text-slate-300 border border-slate-500"
                        }`}
                      >
                        {story.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-slate-300 mb-4">
                      <span className="px-2 py-1 bg-teal-500/20 text-teal-300 rounded text-xs border border-teal-500">
                        {story.category}
                      </span>
                      <span className="flex items-center">
                        <span className="text-emerald-400 mr-1">👁️</span>
                        {story.views}
                      </span>
                      {story.likes > 0 && (
                        <span className="flex items-center">
                          <span className="text-red-400 mr-1">❤️</span>
                          {story.likes}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 mb-4">
                      By {story.author} •{" "}
                      {new Date(story.date).toLocaleDateString()}
                    </div>
                    <div className="flex space-x-3">
                      <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
                        Edit
                      </button>
                      {story.status === "draft" && (
                        <button className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium">
                          Publish
                        </button>
                      )}
                      <button className="px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors text-sm">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "guides" && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 p-6">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setSelectedFilter("all")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedFilter === "all"
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  All Guides
                </button>
                <button
                  onClick={() => setSelectedFilter("verified")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedFilter === "verified"
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  Verified
                </button>
                <button
                  onClick={() => setSelectedFilter("pending")}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedFilter === "pending"
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                >
                  Pending Approval
                </button>
              </div>
            </div>

            {/* Guides Grid */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 p-6">
              <h2 className="text-2xl font-bold text-white mb-6">
                Guide Management
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredGuides.map((guide) => (
                  <div
                    key={guide.id}
                    className="p-5 bg-slate-700/50 rounded-xl border border-slate-600 hover:border-emerald-500 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-emerald-900 font-bold text-lg">
                          {guide.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">
                            {guide.name}
                          </h3>
                          <p className="text-sm text-slate-400">
                            {guide.expertise}
                          </p>
                          <span className="text-sm text-yellow-400">
                            ⭐ {guide.rating}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${
                          guide.status === "verified"
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500"
                            : "bg-yellow-500/20 text-yellow-300 border border-yellow-500"
                        }`}
                      >
                        {guide.status}
                      </span>
                    </div>
                    <div className="space-y-2 mb-4 text-sm text-slate-300">
                      <p>📞 {guide.phone}</p>
                      <p>🎯 {guide.bookings} completed bookings</p>
                      <p>
                        📅 Joined {new Date(guide.joined).toLocaleDateString()}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {guide.languages.map((lang, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded text-xs border border-cyan-500"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium">
                        View Profile
                      </button>
                      {guide.status === "pending" && (
                        <button className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm font-medium">
                          Approve
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default SaalikAdminDashboard;
