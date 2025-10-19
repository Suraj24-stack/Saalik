import React, { useState, useEffect } from 'react';
import { X, Edit2, Trash2, Plus, Save, Search, Filter, Eye, Check, XCircle } from 'lucide-react';

// Initial Mock Data
const initialUsers = [
  { id: 1, name: 'Rajesh Thapa', email: 'rajesh@email.com', role: 'user', status: 'active', joined: '2024-10-15', bookings: 8, spent: 680 },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', role: 'guide', status: 'active', joined: '2024-09-20', bookings: 45, spent: 3240 },
  { id: 3, name: 'Anita Gurung', email: 'anita@email.com', role: 'user', status: 'active', joined: '2024-10-10', bookings: 5, spent: 425 },
];

const initialStories = [
  { id: 1, title: 'Tale of Kaal Bhairab', author: 'Admin', views: 12500, status: 'published', category: 'Mythology', date: '2025-10-10', likes: 856, content: 'Deep in the heart of Kathmandu...' },
  { id: 2, title: 'Kumari: Living Goddess', author: 'Admin', views: 8300, status: 'published', category: 'Tradition', date: '2025-10-08', likes: 623, content: 'The Kumari tradition...' },
  { id: 3, title: 'Newari Architecture', author: 'Admin', views: 6700, status: 'draft', category: 'Heritage', date: '2025-10-15', likes: 0, content: 'The ancient art of Newari...' },
];

const initialGuides = [
  { id: 1, name: 'Pemba Sherpa', expertise: 'Mountain Heritage', rating: 4.9, bookings: 127, status: 'verified', joined: '2024-07-12', languages: ['English', 'Nepali', 'Sherpa'], phone: '+977-9841234567', email: 'pemba@email.com' },
  { id: 2, name: 'Mingma Dorje', expertise: 'Temple Tours', rating: 4.8, bookings: 98, status: 'verified', joined: '2024-08-20', languages: ['English', 'Nepali', 'Hindi'], phone: '+977-9841234568', email: 'mingma@email.com' },
  { id: 3, name: 'Karma Tamang', expertise: 'Historical Sites', rating: 4.8, bookings: 65, status: 'pending', joined: '2024-10-01', languages: ['English', 'Nepali', 'Tamang'], phone: '+977-9841234570', email: 'karma@email.com' },
];

const initialBookings = [
  { id: 1, user: 'Rajesh Thapa', guide: 'Pemba Sherpa', tour: 'Durbar Square Heritage Walk', date: '2025-10-20', time: '09:00 AM', status: 'confirmed', amount: 85, duration: '3h' },
  { id: 2, user: 'Sarah Johnson', guide: 'Mingma Dorje', tour: 'Kaal Bhairab Temple Tour', date: '2025-10-22', time: '02:00 PM', status: 'pending', amount: 120, duration: '4h' },
  { id: 3, user: 'Anita Gurung', guide: 'Tenzin Lama', tour: 'Kathmandu Valley Exploration', date: '2025-10-25', time: '10:00 AM', status: 'confirmed', amount: 95, duration: '5h' },
];

const SaalikAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState(initialUsers);
  const [stories, setStories] = useState(initialStories);
  const [guides, setGuides] = useState(initialGuides);
  const [bookings, setBookings] = useState(initialBookings);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  
  const [formData, setFormData] = useState({});

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Open modal for creating
  const openCreateModal = (type) => {
    setModalType(type);
    setEditingItem(null);
    setFormData(getEmptyFormData(type));
    setIsModalOpen(true);
  };

  // Open modal for editing
  const openEditModal = (type, item) => {
    setModalType(type);
    setEditingItem(item);
    setFormData(item);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({});
  };

  // Get empty form data based on type
  const getEmptyFormData = (type) => {
    switch(type) {
      case 'user':
        return { name: '', email: '', role: 'user', status: 'active', bookings: 0, spent: 0 };
      case 'story':
        return { title: '', author: 'Admin', category: 'Mythology', status: 'draft', content: '', views: 0, likes: 0 };
      case 'guide':
        return { name: '', email: '', phone: '', expertise: '', rating: 4.5, bookings: 0, status: 'pending', languages: [] };
      case 'booking':
        return { user: '', guide: '', tour: '', date: '', time: '', status: 'pending', amount: 0, duration: '' };
      default:
        return {};
    }
  };

  // Handle submit
  const handleSubmit = () => {
    if (!validateForm()) {
      alert('Please fill in all required fields');
      return;
    }

    if (editingItem) {
      updateItem();
    } else {
      createItem();
    }
    
    closeModal();
  };

  // Validate form
  const validateForm = () => {
    switch(modalType) {
      case 'user':
        return formData.name && formData.email;
      case 'story':
        return formData.title && formData.content;
      case 'guide':
        return formData.name && formData.email && formData.phone;
      case 'booking':
        return formData.user && formData.guide && formData.tour && formData.date;
      default:
        return true;
    }
  };

  // Create new item
  const createItem = () => {
    const newItem = {
      ...formData,
      id: Math.max(...getCurrentList().map(i => i.id), 0) + 1,
      joined: modalType === 'user' || modalType === 'guide' ? new Date().toISOString().split('T')[0] : undefined,
      date: modalType === 'story' ? new Date().toISOString().split('T')[0] : formData.date,
    };

    switch(modalType) {
      case 'user':
        setUsers([...users, newItem]);
        break;
      case 'story':
        setStories([...stories, newItem]);
        break;
      case 'guide':
        setGuides([...guides, newItem]);
        break;
      case 'booking':
        setBookings([...bookings, newItem]);
        break;
    }
  };

  // Update existing item
  const updateItem = () => {
    switch(modalType) {
      case 'user':
        setUsers(users.map(u => u.id === editingItem.id ? { ...formData, id: editingItem.id } : u));
        break;
      case 'story':
        setStories(stories.map(s => s.id === editingItem.id ? { ...formData, id: editingItem.id } : s));
        break;
      case 'guide':
        setGuides(guides.map(g => g.id === editingItem.id ? { ...formData, id: editingItem.id } : g));
        break;
      case 'booking':
        setBookings(bookings.map(b => b.id === editingItem.id ? { ...formData, id: editingItem.id } : b));
        break;
    }
  };

  // Delete item
  const handleDelete = (type, id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    switch(type) {
      case 'user':
        setUsers(users.filter(u => u.id !== id));
        break;
      case 'story':
        setStories(stories.filter(s => s.id !== id));
        break;
      case 'guide':
        setGuides(guides.filter(g => g.id !== id));
        break;
      case 'booking':
        setBookings(bookings.filter(b => b.id !== id));
        break;
    }
  };

  // Get current list based on modal type
  const getCurrentList = () => {
    switch(modalType) {
      case 'user': return users;
      case 'story': return stories;
      case 'guide': return guides;
      case 'booking': return bookings;
      default: return [];
    }
  };

  // Filter functions
  const filteredUsers = users.filter(user => 
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedFilter === 'all' || user.role === selectedFilter || user.status === selectedFilter)
  );

  const filteredStories = stories.filter(story =>
    (story.title.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedFilter === 'all' || story.status === selectedFilter)
  );

  const filteredGuides = guides.filter(guide =>
    (guide.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedFilter === 'all' || guide.status === selectedFilter)
  );

  const filteredBookings = bookings.filter(booking =>
    (booking.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.tour.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedFilter === 'all' || booking.status === selectedFilter)
  );

  // Calculate stats
  const stats = {
    totalUsers: users.length,
    totalStories: stories.length,
    publishedStories: stories.filter(s => s.status === 'published').length,
    totalGuides: guides.length,
    verifiedGuides: guides.filter(g => g.status === 'verified').length,
    totalBookings: bookings.length,
    confirmedBookings: bookings.filter(b => b.status === 'confirmed').length,
    revenue: bookings.reduce((sum, b) => sum + (b.amount || 0), 0),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-950 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 to-teal-900 rounded-2xl p-6 mb-6 border border-emerald-700 shadow-2xl">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">
                SAALIK <span className="text-emerald-400">ADMIN</span>
              </h1>
              <p className="text-emerald-300 text-sm mt-1">Heritage Platform Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              {['overview', 'users', 'stories', 'guides', 'bookings'].map(tab => (
                <button
                  key={tab}
                  onClick={() => { setActiveTab(tab); setSearchTerm(''); setSelectedFilter('all'); }}
                  className={`px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                    activeTab === tab
                      ? 'bg-emerald-600 text-white shadow-lg'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { title: 'Total Users', value: stats.totalUsers, icon: '👥', color: 'emerald' },
                { title: 'Published Stories', value: `${stats.publishedStories}/${stats.totalStories}`, icon: '📖', color: 'teal' },
                { title: 'Verified Guides', value: `${stats.verifiedGuides}/${stats.totalGuides}`, icon: '🎯', color: 'cyan' },
                { title: 'Total Bookings', value: stats.totalBookings, icon: '🎫', color: 'blue' },
              ].map((stat, idx) => (
                <div key={idx} className={`bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-${stat.color}-800 hover:border-${stat.color}-600 transition-all`}>
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-12 h-12 bg-${stat.color}-600 rounded-lg flex items-center justify-center text-2xl`}>
                      {stat.icon}
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold text-white">{stat.value}</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-300">{stat.title}</p>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-emerald-800">
              <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Add User', type: 'user', icon: '👤' },
                  { label: 'Create Story', type: 'story', icon: '📝' },
                  { label: 'Add Guide', type: 'guide', icon: '🎯' },
                  { label: 'New Booking', type: 'booking', icon: '🎫' },
                ].map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => openCreateModal(action.type)}
                    className="p-4 bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all text-white font-medium"
                  >
                    <div className="text-3xl mb-2">{action.icon}</div>
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-emerald-800">
                <h3 className="text-xl font-bold text-white mb-4">Recent Bookings</h3>
                <div className="space-y-3">
                  {bookings.slice(0, 3).map(booking => (
                    <div key={booking.id} className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                      <p className="text-white font-medium">{booking.tour}</p>
                      <p className="text-sm text-slate-400">{booking.user} → {booking.guide}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-slate-500">{booking.date}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          booking.status === 'confirmed' ? 'bg-emerald-600' : 'bg-yellow-600'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-emerald-800">
                <h3 className="text-xl font-bold text-white mb-4">Latest Stories</h3>
                <div className="space-y-3">
                  {stories.slice(0, 3).map(story => (
                    <div key={story.id} className="p-3 bg-slate-700/50 rounded-lg border border-slate-600">
                      <p className="text-white font-medium">{story.title}</p>
                      <p className="text-sm text-slate-400">{story.category}</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-slate-500">{story.views} views</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          story.status === 'published' ? 'bg-emerald-600' : 'bg-slate-600'
                        }`}>
                          {story.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* Search and Actions */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-emerald-800">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                  />
                </div>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                >
                  <option value="all">All Users</option>
                  <option value="user">Regular Users</option>
                  <option value="guide">Guides</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
                <button
                  onClick={() => openCreateModal('user')}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all font-medium flex items-center gap-2"
                >
                  <Plus size={20} /> Add User
                </button>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-emerald-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700/50 border-b border-emerald-800">
                    <tr>
                      <th className="px-6 py-4 text-left text-emerald-300 font-medium">User</th>
                      <th className="px-6 py-4 text-left text-emerald-300 font-medium">Role</th>
                      <th className="px-6 py-4 text-left text-emerald-300 font-medium">Status</th>
                      <th className="px-6 py-4 text-left text-emerald-300 font-medium">Bookings</th>
                      <th className="px-6 py-4 text-left text-emerald-300 font-medium">Spent</th>
                      <th className="px-6 py-4 text-left text-emerald-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {filteredUsers.map(user => (
                      <tr key={user.id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-white font-medium">{user.name}</p>
                            <p className="text-sm text-slate-400">{user.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.role === 'guide' ? 'bg-cyan-600' : 'bg-blue-600'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            user.status === 'active' ? 'bg-emerald-600' : 'bg-slate-600'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white">{user.bookings}</td>
                        <td className="px-6 py-4 text-emerald-400 font-semibold">${user.spent}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => openEditModal('user', user)}
                              className="p-2 bg-emerald-600 rounded hover:bg-emerald-700 transition-all"
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete('user', user.id)}
                              className="p-2 bg-red-600 rounded hover:bg-red-700 transition-all"
                            >
                              <Trash2 size={16} />
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

        {/* Stories Tab */}
        {activeTab === 'stories' && (
          <div className="space-y-6">
            {/* Search and Actions */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-emerald-800">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search stories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                  />
                </div>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                >
                  <option value="all">All Stories</option>
                  <option value="published">Published</option>
                  <option value="draft">Drafts</option>
                </select>
                <button
                  onClick={() => openCreateModal('story')}
                  className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all font-medium flex items-center gap-2"
                >
                  <Plus size={20} /> Create Story
                </button>
              </div>
            </div>

            {/* Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredStories.map(story => (
                <div key={story.id} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-emerald-800 hover:border-teal-600 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{story.title}</h3>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="px-2 py-1 bg-teal-600 rounded text-xs">{story.category}</span>
                        <span className="text-slate-400">👁️ {story.views}</span>
                        <span className="text-slate-400">❤️ {story.likes}</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      story.status === 'published' ? 'bg-emerald-600' : 'bg-slate-600'
                    }`}>
                      {story.status}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-4 line-clamp-2">{story.content}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal('story', story)}
                      className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete('story', story.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Guides Tab */}
        {activeTab === 'guides' && (
          <div className="space-y-6">
            {/* Search and Actions */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-emerald-800">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search guides..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                  />
                </div>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                >
                  <option value="all">All Guides</option>
                  <option value="verified">Verified</option>
                  <option value="pending">Pending</option>
                </select>
                <button
                  onClick={() => openCreateModal('guide')}
                  className="px-6 py-3 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-all font-medium flex items-center gap-2"
                >
                  <Plus size={20} /> Add Guide
                </button>
              </div>
            </div>

            {/* Guides Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredGuides.map(guide => (
                <div key={guide.id} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-emerald-800 hover:border-cyan-600 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start gap-3">
                      <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-emerald-900 font-bold text-xl">
                        {guide.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">{guide.name}</h3>
                        <p className="text-sm text-slate-400">{guide.expertise}</p>
                        <p className="text-sm text-yellow-400">⭐ {guide.rating}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      guide.status === 'verified' ? 'bg-emerald-600' : 'bg-yellow-600'
                    }`}>
                      {guide.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm text-slate-300 mb-4">
                    <p>📧 {guide.email}</p>
                    <p>📞 {guide.phone}</p>
                    <p>🎯 {guide.bookings} bookings</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal('guide', guide)}
                      className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete('guide', guide.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* Search and Actions */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-emerald-800">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-3 text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                  />
                </div>
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                >
                  <option value="all">All Bookings</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button
                  onClick={() => openCreateModal('booking')}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-medium flex items-center gap-2"
                >
                  <Plus size={20} /> New Booking
                </button>
              </div>
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
              {filteredBookings.map(booking => (
                <div key={booking.id} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-6 border border-emerald-800 hover:border-blue-600 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{booking.tour}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-300">
                        <span>👤 {booking.user}</span>
                        <span>🎯 {booking.guide}</span>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                      booking.status === 'confirmed' ? 'bg-emerald-600' :
                      booking.status === 'pending' ? 'bg-yellow-600' :
                      booking.status === 'completed' ? 'bg-blue-600' : 'bg-slate-600'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-slate-500 mb-1">Date</p>
                      <p className="text-white">📅 {booking.date}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 mb-1">Time</p>
                      <p className="text-white">🕐 {booking.time}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 mb-1">Duration</p>
                      <p className="text-white">⏱️ {booking.duration}</p>
                    </div>
                    <div>
                      <p className="text-slate-500 mb-1">Amount</p>
                      <p className="text-emerald-400 font-bold">${booking.amount}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal('booking', booking)}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete('booking', booking.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-emerald-800 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingItem ? 'Edit' : 'Create'} {modalType.charAt(0).toUpperCase() + modalType.slice(1)}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-slate-700 rounded-lg transition-all">
                <X size={24} className="text-white" />
              </button>
            </div>

            <div className="space-y-4">
              {/* User Form */}
              {modalType === 'user' && (
                <>
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Role</label>
                      <select
                        name="role"
                        value={formData.role || 'user'}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                      >
                        <option value="user">User</option>
                        <option value="guide">Guide</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Status</label>
                      <select
                        name="status"
                        value={formData.status || 'active'}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Story Form */}
              {modalType === 'story' && (
                <>
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Title *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Category</label>
                      <select
                        name="category"
                        value={formData.category || 'Mythology'}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                      >
                        <option value="Mythology">Mythology</option>
                        <option value="Tradition">Tradition</option>
                        <option value="Heritage">Heritage</option>
                        <option value="Culture">Culture</option>
                        <option value="Spirituality">Spirituality</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Status</label>
                      <select
                        name="status"
                        value={formData.status || 'draft'}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Content *</label>
                    <textarea
                      name="content"
                      value={formData.content || ''}
                      onChange={handleInputChange}
                      rows="6"
                      className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none resize-vertical"
                    />
                  </div>
                </>
              )}

              {/* Guide Form */}
              {modalType === 'guide' && (
                <>
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Phone *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Expertise</label>
                    <input
                      type="text"
                      name="expertise"
                      value={formData.expertise || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Rating</label>
                      <input
                        type="number"
                        name="rating"
                        step="0.1"
                        min="0"
                        max="5"
                        value={formData.rating || 4.5}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Status</label>
                      <select
                        name="status"
                        value={formData.status || 'pending'}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="verified">Verified</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Booking Form */}
              {modalType === 'booking' && (
                <>
                  <div>
                    <label className="block text-sm text-slate-300 mb-2">Tour Name *</label>
                    <input
                      type="text"
                      name="tour"
                      value={formData.tour || ''}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">User *</label>
                      <input
                        type="text"
                        name="user"
                        value={formData.user || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Guide *</label>
                      <input
                        type="text"
                        name="guide"
                        value={formData.guide || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Date *</label>
                      <input
                        type="date"
                        name="date"
                        value={formData.date || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Time</label>
                      <input
                        type="time"
                        name="time"
                        value={formData.time || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Duration</label>
                      <input
                        type="text"
                        name="duration"
                        placeholder="e.g. 3h"
                        value={formData.duration || ''}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Amount ($)</label>
                      <input
                        type="number"
                        name="amount"
                        value={formData.amount || 0}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-slate-300 mb-2">Status</label>
                      <select
                        name="status"
                        value={formData.status || 'pending'}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                className="w-full mt-6 px-6 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all font-bold text-lg flex items-center justify-center gap-2"
              >
                <Save size={24} />
                {editingItem ? 'Update' : 'Create'} {modalType.charAt(0).toUpperCase() + modalType.slice(1)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaalikAdminDashboard;