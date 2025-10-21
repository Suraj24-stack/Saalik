import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllWaitlist,
  updateWaitlistStatus,
  clearSuccess,
  clearError,
} from "../../../store/slices/waitlistSlice";
import {
  Search,
  Eye,
  Trash2,
  X,
  Calendar,
  MapPin,
  Users,
  Phone,
  Mail,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  MessageSquare,
  Download,
} from "lucide-react";

const AdminGuideWaitlistPage = () => {
  const dispatch = useDispatch();
  const { waitlist, stats, loading, error, success } = useSelector(
    (state) => state.waitlist
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    dispatch(fetchAllWaitlist());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setShowDetailsModal(false);
      dispatch(clearSuccess());
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (error) {
      setTimeout(() => dispatch(clearError()), 5000);
    }
  }, [error, dispatch]);

  const handleViewDetails = (entry) => {
    setSelectedEntry(entry);
    setShowDetailsModal(true);
  };

  const handleStatusChange = (entryId, newStatus) => {
    if (window.confirm(`Are you sure you want to change the status to "${newStatus}"?`)) {
      dispatch(updateWaitlistStatus({ id: entryId, status: newStatus }));
    }
  };

  const exportToCSV = () => {
    const headers = ["Name", "Email", "Phone", "Destination", "Travel Date", "Group Size", "Status", "Created At"];
    const csvData = filteredEntries.map(entry => [
      entry.name || "",
      entry.email || "",
      entry.phone || "",
      entry.destination || "",
      entry.travel_date ? new Date(entry.travel_date).toLocaleDateString() : "",
      entry.group_size || "",
      entry.status || "",
      entry.created_at ? new Date(entry.created_at).toLocaleDateString() : ""
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `guide-waitlist-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredEntries = waitlist.filter((entry) => {
    const matchesSearch =
      entry.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.phone?.includes(searchTerm);

    const matchesFilter =
      filterStatus === "all" || entry.status === filterStatus;

    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    const colors = {
      pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
      contacted: "bg-blue-500/20 text-blue-400 border-blue-500/50",
      approved: "bg-green-500/20 text-green-400 border-green-500/50",
      rejected: "bg-red-500/20 text-red-400 border-red-500/50",
    };
    return colors[status] || colors.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Clock className="w-4 h-4" />,
      contacted: <MessageSquare className="w-4 h-4" />,
      approved: <CheckCircle className="w-4 h-4" />,
      rejected: <XCircle className="w-4 h-4" />,
    };
    return icons[status] || icons.pending;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-green-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Guide Booking Waitlist
          </h1>
          <p className="text-slate-400">
            Manage and track all guide booking waitlist requests
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-gradient-to-br from-slate-800/80 to-slate-700/50 p-4 rounded-xl border border-slate-600/50 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-sm">Total</span>
              <Users className="w-5 h-5 text-slate-400" />
            </div>
            <p className="text-3xl font-bold text-white">{stats.total}</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 p-4 rounded-xl border border-yellow-500/30 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-yellow-400 text-sm">Pending</span>
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-3xl font-bold text-yellow-400">{stats.pending}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 p-4 rounded-xl border border-blue-500/30 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-blue-400 text-sm">Contacted</span>
              <MessageSquare className="w-5 h-5 text-blue-400" />
            </div>
            <p className="text-3xl font-bold text-blue-400">{stats.contacted}</p>
          </div>

          <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 p-4 rounded-xl border border-green-500/30 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-400 text-sm">Approved</span>
              <CheckCircle className="w-5 h-5 text-green-400" />
            </div>
            <p className="text-3xl font-bold text-green-400">{stats.approved}</p>
          </div>

          <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 p-4 rounded-xl border border-red-500/30 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-red-400 text-sm">Rejected</span>
              <XCircle className="w-5 h-5 text-red-400" />
            </div>
            <p className="text-3xl font-bold text-red-400">{stats.rejected}</p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6 bg-slate-800/50 p-4 rounded-xl backdrop-blur-sm border border-slate-700/50">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, destination, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white placeholder-slate-400"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>

          <button
            onClick={exportToCSV}
            className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
          >
            <Download className="w-5 h-5" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-lg text-green-400 flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            <span>Operation successful!</span>
          </div>
        )}

        {/* Waitlist Table */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-700/50 border-b border-slate-600">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      Destination
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      Travel Date
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      Group Size
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {filteredEntries.map((entry) => (
                    <tr
                      key={entry.id}
                      className="hover:bg-slate-700/30 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                            {entry.name?.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">
                              {entry.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-slate-300">
                          <div className="flex items-center gap-2 mb-1">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span>{entry.email}</span>
                          </div>
                          {entry.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="w-3 h-3 text-slate-400" />
                              <span>{entry.phone}</span>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                          <MapPin className="w-4 h-4 text-green-400" />
                          <span>{entry.destination || "Not specified"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                          <Calendar className="w-4 h-4 text-blue-400" />
                          <span>
                            {entry.travel_date
                              ? new Date(entry.travel_date).toLocaleDateString()
                              : "Not specified"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-slate-300">
                          <Users className="w-4 h-4 text-purple-400" />
                          <span>{entry.group_size || "N/A"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={entry.status}
                          onChange={(e) =>
                            handleStatusChange(entry.id, e.target.value)
                          }
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            entry.status
                          )} bg-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500`}
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="approved">Approved</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewDetails(entry)}
                            className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all border border-green-500/30"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredEntries.length === 0 && !loading && (
              <div className="text-center py-16">
                <Users className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <p className="text-slate-400 text-lg">No waitlist entries found</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Details Modal */}
      {showDetailsModal && selectedEntry && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-slate-700 shadow-2xl">
            <div className="sticky top-0 bg-slate-800 border-b border-slate-700 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Waitlist Entry Details</h2>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="p-2 hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status Badge */}
              <div className="flex items-center gap-3">
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium border flex items-center gap-2 ${getStatusColor(
                    selectedEntry.status
                  )}`}
                >
                  {getStatusIcon(selectedEntry.status)}
                  {selectedEntry.status.toUpperCase()}
                </span>
              </div>

              {/* Personal Information */}
              <div className="bg-slate-700/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-green-400">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 text-sm">Full Name</label>
                    <p className="text-white font-medium">
                      {selectedEntry.name}
                    </p>
                  </div>
                  <div>
                    <label className="text-slate-400 text-sm">Email</label>
                    <p className="text-white font-medium">
                      {selectedEntry.email}
                    </p>
                  </div>
                  {selectedEntry.phone && (
                    <div>
                      <label className="text-slate-400 text-sm">Phone</label>
                      <p className="text-white font-medium">
                        {selectedEntry.phone}
                      </p>
                    </div>
                  )}
                  {selectedEntry.country && (
                    <div>
                      <label className="text-slate-400 text-sm">Country</label>
                      <p className="text-white font-medium">
                        {selectedEntry.country}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Travel Details */}
              <div className="bg-slate-700/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-blue-400">
                  Travel Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedEntry.destination && (
                    <div>
                      <label className="text-slate-400 text-sm">Destination</label>
                      <p className="text-white font-medium">
                        {selectedEntry.destination}
                      </p>
                    </div>
                  )}
                  {selectedEntry.travel_date && (
                    <div>
                      <label className="text-slate-400 text-sm">Travel Date</label>
                      <p className="text-white font-medium">
                        {new Date(selectedEntry.travel_date).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {selectedEntry.duration && (
                    <div>
                      <label className="text-slate-400 text-sm">Duration</label>
                      <p className="text-white font-medium">
                        {selectedEntry.duration}
                      </p>
                    </div>
                  )}
                  {selectedEntry.group_size && (
                    <div>
                      <label className="text-slate-400 text-sm">Group Size</label>
                      <p className="text-white font-medium">
                        {selectedEntry.group_size}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Special Requests */}
              {selectedEntry.special_requests && (
                <div className="bg-slate-700/30 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-purple-400">
                    Special Requests
                  </h3>
                  <p className="text-slate-300 whitespace-pre-wrap">
                    {selectedEntry.special_requests}
                  </p>
                </div>
              )}

              {/* Message/Comments */}
              {selectedEntry.message && (
                <div className="bg-slate-700/30 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-3 text-yellow-400">
                    Message
                  </h3>
                  <p className="text-slate-300 whitespace-pre-wrap">
                    {selectedEntry.message}
                  </p>
                </div>
              )}

              {/* Timestamps */}
              <div className="bg-slate-700/30 p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-3 text-slate-400">
                  Timestamps
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <label className="text-slate-400">Submitted At</label>
                    <p className="text-white">
                      {selectedEntry.created_at
                        ? new Date(selectedEntry.created_at).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <label className="text-slate-400">Last Updated</label>
                    <p className="text-white">
                      {selectedEntry.updated_at
                        ? new Date(selectedEntry.updated_at).toLocaleString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-3 pt-4 border-t border-slate-700">
                <button
                  onClick={() => handleStatusChange(selectedEntry.id, "contacted")}
                  className="flex-1 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-all border border-blue-500/30 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Mark as Contacted
                </button>
                <button
                  onClick={() => handleStatusChange(selectedEntry.id, "approved")}
                  className="flex-1 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-all border border-green-500/30 flex items-center justify-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminGuideWaitlistPage;