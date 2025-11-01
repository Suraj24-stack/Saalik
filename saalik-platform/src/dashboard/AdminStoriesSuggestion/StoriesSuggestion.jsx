// AdminStoriesSuggestionPage.jsx - COMPLETE VERSION
import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  fetchAllStorySuggestions,
  updateStorySuggestionStatus,
  deleteStorySuggestion,
  approveSuggestion,
  rejectSuggestion,
  markAsReviewing,
  clearError,
  clearSuccess,
  selectAllSuggestions,
  selectSuggestionLoading,
  selectSuggestionError,
  selectSuggestionSuccess,
  selectSuggestionSuccessMessage,
  selectSuggestionStats
} from '../../../store/slices/storysuggestionSlice';

const AdminStoriesSuggestionPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state
  const suggestions = useSelector(selectAllSuggestions);
  const loading = useSelector(selectSuggestionLoading);
  const error = useSelector(selectSuggestionError);
  const success = useSelector(selectSuggestionSuccess);
  const successMessage = useSelector(selectSuggestionSuccessMessage);
  const stats = useSelector(selectSuggestionStats);

  // Local state
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedSuggestion, setSelectedSuggestion] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAdminNotesModal, setShowAdminNotesModal] = useState(false);
  const [adminNotes, setAdminNotes] = useState('');
  const [actionType, setActionType] = useState(null); // 'approve' or 'reject'

  // Check authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to access this page');
      navigate('/login');
      return;
    }
  }, [navigate]);

  // Fetch suggestions on mount
  useEffect(() => {
    dispatch(fetchAllStorySuggestions({ sortBy, order: sortOrder }));
  }, [dispatch, sortBy, sortOrder]);

  // Handle success/error messages
  useEffect(() => {
    if (success) {
      alert(successMessage || 'Operation successful!');
      dispatch(clearSuccess());
    }
  }, [success, successMessage, dispatch]);

  useEffect(() => {
    if (error) {
      alert('Error: ' + error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Filter and search suggestions
  const filteredSuggestions = useMemo(() => {
    let filtered = [...suggestions];

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(s => s.status === filterStatus);
    }

    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        s =>
          s.title?.toLowerCase().includes(query) ||
          s.location?.toLowerCase().includes(query) ||
          s.description?.toLowerCase().includes(query) ||
          s.submitted_by_name?.toLowerCase().includes(query) ||
          s.submitted_by_email?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [suggestions, filterStatus, searchQuery]);

  // Handle status change
  const handleStatusChange = async (suggestion, newStatus) => {
    if (newStatus === 'approved' || newStatus === 'rejected') {
      // Show modal for admin notes
      setSelectedSuggestion(suggestion);
      setActionType(newStatus);
      setAdminNotes(suggestion.admin_notes || '');
      setShowAdminNotesModal(true);
    } else {
      // Direct status change
      await dispatch(updateStorySuggestionStatus({ id: suggestion.id, status: newStatus }));
    }
  };

  // Handle approve/reject with notes
  const handleApproveReject = async () => {
    if (!selectedSuggestion) return;

    if (actionType === 'approved') {
      await dispatch(approveSuggestion({ id: selectedSuggestion.id, admin_notes: adminNotes }));
    } else if (actionType === 'rejected') {
      await dispatch(rejectSuggestion({ id: selectedSuggestion.id, admin_notes: adminNotes }));
    }

    setShowAdminNotesModal(false);
    setSelectedSuggestion(null);
    setAdminNotes('');
    setActionType(null);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this suggestion? This action cannot be undone.')) {
      await dispatch(deleteStorySuggestion(id));
    }
  };

  // Handle view details
  const handleViewDetails = (suggestion) => {
    setSelectedSuggestion(suggestion);
    setShowDetailModal(true);
  };

  // Get status badge color
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'reviewing':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'published':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">📚 Story Suggestions</h1>
        <p className="text-gray-400">Review and manage story suggestions from the community</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="text-2xl font-bold text-white">{stats.total}</div>
          <div className="text-sm text-gray-400">Total</div>
        </div>
        <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
          <div className="text-2xl font-bold text-yellow-500">{stats.pending}</div>
          <div className="text-sm text-gray-400">Pending</div>
        </div>
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-500">{stats.reviewing}</div>
          <div className="text-sm text-gray-400">Reviewing</div>
        </div>
        <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-500">{stats.approved}</div>
          <div className="text-sm text-gray-400">Approved</div>
        </div>
        <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
          <div className="text-2xl font-bold text-red-500">{stats.rejected}</div>
          <div className="text-sm text-gray-400">Rejected</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="🔍 Search by title, location, name, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500"
            />
          </div>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
          >
            <option value="all">All Status ({stats.total})</option>
            <option value="pending">Pending ({stats.pending})</option>
            <option value="reviewing">Reviewing ({stats.reviewing})</option>
            <option value="approved">Approved ({stats.approved})</option>
            <option value="rejected">Rejected ({stats.rejected})</option>
          </select>

          {/* Sort */}
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={(e) => {
              const [field, order] = e.target.value.split('-');
              setSortBy(field);
              setSortOrder(order);
              dispatch(fetchAllStorySuggestions({ sortBy: field, order }));
            }}
            className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-green-500"
          >
            <option value="created_at-desc">Newest First</option>
            <option value="created_at-asc">Oldest First</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {loading && suggestions.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <div className="w-12 h-12 border-4 border-gray-700 border-t-green-500 rounded-full animate-spin mb-4"></div>
          <p>Loading suggestions...</p>
        </div>
      )}

      {/* No Results */}
      {!loading && filteredSuggestions.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <p className="text-xl mb-4">📭 No suggestions found</p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="px-5 py-2 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition-colors"
            >
              Clear search
            </button>
          )}
        </div>
      )}

      {/* Suggestions Table */}
      {!loading && filteredSuggestions.length > 0 && (
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Title</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Location</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Submitted By</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredSuggestions.map((suggestion) => (
                  <tr key={suggestion.id} className="hover:bg-gray-700/50 transition-colors">
                    <td className="px-4 py-3 text-white">
                      <div className="font-medium line-clamp-2">{suggestion.title}</div>
                    </td>
                    <td className="px-4 py-3 text-gray-400">
                      {suggestion.location || '—'}
                    </td>
                    <td className="px-4 py-3 text-gray-400">
                      <div className="text-sm">
                        {suggestion.submitted_by_name || 'Anonymous'}
                        {suggestion.submitted_by_email && (
                          <div className="text-xs text-gray-500">{suggestion.submitted_by_email}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-400 text-sm">
                      {new Date(suggestion.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusBadgeColor(suggestion.status)}`}>
                        {suggestion.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => handleViewDetails(suggestion)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded transition-colors"
                        >
                          View
                        </button>
                        
                        {suggestion.status === 'pending' && (
                          <button
                            onClick={() => handleStatusChange(suggestion, 'reviewing')}
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded transition-colors"
                            disabled={loading}
                          >
                            Review
                          </button>
                        )}
                        
                        {(suggestion.status === 'pending' || suggestion.status === 'reviewing') && (
                          <>
                            <button
                              onClick={() => handleStatusChange(suggestion, 'approved')}
                              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold rounded transition-colors"
                              disabled={loading}
                            >
                              ✓ Approve
                            </button>
                            <button
                              onClick={() => handleStatusChange(suggestion, 'rejected')}
                              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded transition-colors"
                              disabled={loading}
                            >
                              ✕ Reject
                            </button>
                          </>
                        )}
                        
                        <button
                          onClick={() => handleDelete(suggestion.id)}
                          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded transition-colors"
                          disabled={loading}
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedSuggestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border-2 border-gray-700">
            <div className="p-6 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-white">Suggestion Details</h3>
              <button
                onClick={() => setShowDetailModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-400">Title</label>
                <p className="text-white text-lg mt-1">{selectedSuggestion.title}</p>
              </div>
              
              {selectedSuggestion.location && (
                <div>
                  <label className="text-sm font-semibold text-gray-400">Location</label>
                  <p className="text-white mt-1">{selectedSuggestion.location}</p>
                </div>
              )}
              
              {selectedSuggestion.description && (
                <div>
                  <label className="text-sm font-semibold text-gray-400">Description</label>
                  <p className="text-white mt-1 whitespace-pre-wrap">{selectedSuggestion.description}</p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-400">Submitted By</label>
                  <p className="text-white mt-1">{selectedSuggestion.submitted_by_name || 'Anonymous'}</p>
                </div>
                
                {selectedSuggestion.submitted_by_email && (
                  <div>
                    <label className="text-sm font-semibold text-gray-400">Email</label>
                    <p className="text-white mt-1">{selectedSuggestion.submitted_by_email}</p>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-400">Status</label>
                  <div className="mt-1">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadgeColor(selectedSuggestion.status)}`}>
                      {selectedSuggestion.status}
                    </span>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-gray-400">Submitted On</label>
                  <p className="text-white mt-1">{new Date(selectedSuggestion.created_at).toLocaleString()}</p>
                </div>
              </div>
              
              {selectedSuggestion.admin_notes && (
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <label className="text-sm font-semibold text-gray-400">Admin Notes</label>
                  <p className="text-white mt-2 whitespace-pre-wrap">{selectedSuggestion.admin_notes}</p>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-700">
              <button
                onClick={() => setShowDetailModal(false)}
                className="w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Admin Notes Modal for Approve/Reject */}
      {showAdminNotesModal && selectedSuggestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-gray-900 rounded-2xl shadow-2xl max-w-lg w-full border-2 border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-xl font-bold text-white">
                {actionType === 'approved' ? '✓ Approve' : '✕ Reject'} Suggestion
              </h3>
              <p className="text-gray-400 text-sm mt-1">Add notes for this decision (optional)</p>
            </div>
            <div className="p-6">
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Enter admin notes here..."
                rows="4"
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 resize-y"
              />
            </div>
            <div className="p-6 border-t border-gray-700 flex gap-3">
              <button
                onClick={handleApproveReject}
                disabled={loading}
                className={`flex-1 px-6 py-3 font-semibold rounded-lg transition-colors disabled:opacity-50 ${
                  actionType === 'approved'
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                {loading ? 'Processing...' : `Confirm ${actionType === 'approved' ? 'Approval' : 'Rejection'}`}
              </button>
              <button
                onClick={() => {
                  setShowAdminNotesModal(false);
                  setSelectedSuggestion(null);
                  setAdminNotes('');
                  setActionType(null);
                }}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminStoriesSuggestionPage;