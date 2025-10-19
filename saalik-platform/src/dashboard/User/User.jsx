import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Dummy users data (you can replace it with API or Redux state)
const allUsers = [
  { id: 1, name: 'Rajesh Thapa', email: 'rajesh@email.com', role: 'user', status: 'active', bookings: 8, spent: '$680' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah@email.com', role: 'guide', status: 'active', bookings: 45, spent: '$3,240' },
  { id: 3, name: 'Anita Gurung', email: 'anita@email.com', role: 'user', status: 'active', bookings: 5, spent: '$425' },
  { id: 4, name: 'Michael Chen', email: 'michael@email.com', role: 'user', status: 'inactive', bookings: 2, spent: '$170' },
  { id: 5, name: 'Pemba Sherpa', email: 'pemba@email.com', role: 'guide', status: 'active', bookings: 127, spent: '$10,795' },
];

export default function SaalikUserPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = allUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen mt-10 bg-gradient-to-br from-slate-900 via-emerald-950 to-teal-950 p-8">
      <h1 className="text-3xl font-bold text-white mb-6">User Management</h1>

      {/* Search and Add User */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-3 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-emerald-500 focus:outline-none"
        />
        <button
          onClick={() => alert('Add User clicked')}
          className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium"
        >
          + Add User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-lg border border-emerald-800 overflow-hidden">
        <div className="p-6 border-b border-emerald-800 bg-gradient-to-r from-emerald-900/50 to-teal-900/50">
          <p className="text-slate-300">Total Users: {allUsers.length}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-700/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">Bookings</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">Spent</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-emerald-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full flex items-center justify-center text-emerald-900 font-bold text-sm">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.name}</p>
                        <p className="text-slate-400 text-sm">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      user.role === 'guide' 
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500'
                        : 'bg-blue-500/20 text-blue-300 border border-blue-500'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      user.status === 'active' 
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500'
                        : 'bg-slate-500/20 text-slate-300 border border-slate-500'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white">{user.bookings}</td>
                  <td className="px-6 py-4 text-emerald-400 font-semibold">{user.spent}</td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 text-sm">Edit</button>
                      <button className="px-3 py-1 bg-slate-600 text-white rounded hover:bg-slate-700 text-sm">View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
