import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

// =====================
// Async Thunks
// =====================

// Fetch all waitlist entries (Admin - with optional filters)
export const fetchAllWaitlist = createAsyncThunk(
  "waitlist/fetchAll",
  async ({ status = null, sortBy = 'created_at', order = 'desc' } = {}, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      let url = `${API_BASE_URL}/waitlist?sortBy=${sortBy}&order=${order}`;
      
      if (status) {
        url += `&status=${status}`;
      }
      
      const response = await axios.get(url, {
        headers: { 
          Authorization: `Bearer ${token}` 
        },
      });
      console.log('Fetch All Waitlist Response:', response.data);
      return response.data.data || response.data;
    } catch (err) {
      console.error('Fetch All Waitlist Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Fetch single waitlist entry by ID (Admin)
export const fetchWaitlistById = createAsyncThunk(
  "waitlist/fetchById",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/waitlist/${id}`, {
        headers: { 
          Authorization: `Bearer ${token}` 
        },
      });
      console.log('Fetch Waitlist By ID Response:', response.data);
      return response.data.data || response.data;
    } catch (err) {
      console.error('Fetch Waitlist By ID Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Create new waitlist entry (Public submission - no auth required)
export const createWaitlistEntry = createAsyncThunk(
  "waitlist/create",
  async (entryData, thunkAPI) => {
    try {
      // Public endpoint - no auth required
      // IP address and user_agent will be captured by backend
      const data = {
        name: entryData.name,
        email: entryData.email,
        message: entryData.message || null,
      };
      
      console.log('Creating waitlist entry...', data);
      
      const res = await axios.post(`${API_BASE_URL}/waitlist`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log('Create Waitlist Entry Response:', res.data);
      return res.data.data || res.data;
    } catch (err) {
      console.error('Create Waitlist Entry Error:', err.response?.data || err.message);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update waitlist entry (Admin - full update)
export const updateWaitlistEntry = createAsyncThunk(
  "waitlist/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      
      const updateData = {
        name: data.name,
        email: data.email,
        message: data.message !== undefined ? data.message : undefined,
        status: data.status !== undefined ? data.status : undefined,
      };
      
      // Remove undefined values
      Object.keys(updateData).forEach(key => 
        updateData[key] === undefined && delete updateData[key]
      );
      
      console.log('Updating waitlist entry with ID:', id, updateData);
      
      const res = await axios.put(`${API_BASE_URL}/waitlist/${id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log('Update Waitlist Entry Response:', res.data);
      return res.data.data || res.data;
    } catch (err) {
      console.error('Update Waitlist Entry Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update waitlist entry status (Admin - quick status change)
export const updateWaitlistStatus = createAsyncThunk(
  "waitlist/updateStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      
      console.log('Updating waitlist status:', id, status);
      
      const res = await axios.patch(
        `${API_BASE_URL}/waitlist/${id}/status`,
        { status },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );
      console.log('Update Status Response:', res.data);
      return res.data.data || res.data;
    } catch (err) {
      console.error('Update Status Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete waitlist entry (Admin)
export const deleteWaitlistEntry = createAsyncThunk(
  "waitlist/delete",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/waitlist/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Delete Waitlist Entry Success for ID:', id);
      return id;
    } catch (err) {
      console.error('Delete Waitlist Entry Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Mark as contacted (Admin)
export const markAsContacted = createAsyncThunk(
  "waitlist/markAsContacted",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${API_BASE_URL}/waitlist/${id}/status`,
        { status: 'contacted' },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );
      console.log('Mark As Contacted Response:', res.data);
      return res.data.data || res.data;
    } catch (err) {
      console.error('Mark As Contacted Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Mark as converted (Admin)
export const markAsConverted = createAsyncThunk(
  "waitlist/markAsConverted",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${API_BASE_URL}/waitlist/${id}/status`,
        { status: 'converted' },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );
      console.log('Mark As Converted Response:', res.data);
      return res.data.data || res.data;
    } catch (err) {
      console.error('Mark As Converted Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Mark as cancelled (Admin)
export const markAsCancelled = createAsyncThunk(
  "waitlist/markAsCancelled",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${API_BASE_URL}/waitlist/${id}/status`,
        { status: 'cancelled' },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );
      console.log('Mark As Cancelled Response:', res.data);
      return res.data.data || res.data;
    } catch (err) {
      console.error('Mark As Cancelled Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Export waitlist to CSV (Admin)
export const exportWaitlistToCSV = createAsyncThunk(
  "waitlist/exportCSV",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/waitlist/export/csv`, {
        headers: { 
          Authorization: `Bearer ${token}` 
        },
        responseType: 'blob',
      });
      
      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `waitlist_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      return { success: true };
    } catch (err) {
      console.error('Export CSV Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// =====================
// Slice
// =====================
const waitlistSlice = createSlice({
  name: "waitlist",
  initialState: {
    waitlist: [],
    selectedEntry: null,
    loading: false,
    submitLoading: false,
    error: null,
    success: false,
    submitSuccess: false,
    successMessage: null,
    // Statistics for dashboard
    stats: {
      total: 0,
      pending: 0,
      contacted: 0,
      converted: 0,
      cancelled: 0,
    },
  },
  reducers: {
    clearError: (state) => { 
      state.error = null; 
    },
    clearSuccess: (state) => { 
      state.success = false;
      state.successMessage = null;
    },
    clearSubmitSuccess: (state) => { 
      state.submitSuccess = false; 
    },
    setSelectedEntry: (state, action) => {
      state.selectedEntry = action.payload;
    },
    clearSelectedEntry: (state) => {
      state.selectedEntry = null;
    },
    resetWaitlistState: (state) => {
      state.waitlist = [];
      state.selectedEntry = null;
      state.loading = false;
      state.submitLoading = false;
      state.error = null;
      state.success = false;
      state.submitSuccess = false;
      state.successMessage = null;
      state.stats = {
        total: 0,
        pending: 0,
        contacted: 0,
        converted: 0,
        cancelled: 0,
      };
    },
    // Calculate statistics from waitlist data
    calculateStats: (state) => {
      state.stats.total = state.waitlist.length;
      state.stats.pending = state.waitlist.filter(e => e.status === 'pending').length;
      state.stats.contacted = state.waitlist.filter(e => e.status === 'contacted').length;
      state.stats.converted = state.waitlist.filter(e => e.status === 'converted').length;
      state.stats.cancelled = state.waitlist.filter(e => e.status === 'cancelled').length;
    },
  },
  extraReducers: (builder) => {
    // Helper function to update stats
    const updateStats = (state) => {
      state.stats.total = state.waitlist.length;
      state.stats.pending = state.waitlist.filter(e => e.status === 'pending').length;
      state.stats.contacted = state.waitlist.filter(e => e.status === 'contacted').length;
      state.stats.converted = state.waitlist.filter(e => e.status === 'converted').length;
      state.stats.cancelled = state.waitlist.filter(e => e.status === 'cancelled').length;
    };

    builder
      // Fetch All Waitlist Entries
      .addCase(fetchAllWaitlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllWaitlist.fulfilled, (state, action) => {
        state.loading = false;
        state.waitlist = action.payload;
        updateStats(state);
      })
      .addCase(fetchAllWaitlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Waitlist Entry By ID
      .addCase(fetchWaitlistById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWaitlistById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEntry = action.payload;
      })
      .addCase(fetchWaitlistById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Waitlist Entry (Public)
      .addCase(createWaitlistEntry.pending, (state) => {
        state.submitLoading = true;
        state.error = null;
        state.submitSuccess = false;
      })
      .addCase(createWaitlistEntry.fulfilled, (state, action) => {
        state.submitLoading = false;
        state.waitlist.unshift(action.payload);
        state.submitSuccess = true;
        state.successMessage = "Thank you for joining our waitlist! We'll be in touch soon.";
        updateStats(state);
      })
      .addCase(createWaitlistEntry.rejected, (state, action) => {
        state.submitLoading = false;
        state.error = action.payload;
      })
      
      // Update Waitlist Entry (Full)
      .addCase(updateWaitlistEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.successMessage = null;
      })
      .addCase(updateWaitlistEntry.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.waitlist.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.waitlist[index] = action.payload;
        }
        state.selectedEntry = action.payload;
        state.success = true;
        state.successMessage = "Waitlist entry updated successfully";
        updateStats(state);
      })
      .addCase(updateWaitlistEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Waitlist Status
      .addCase(updateWaitlistStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.successMessage = null;
      })
      .addCase(updateWaitlistStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.waitlist.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.waitlist[index] = action.payload;
        }
        if (state.selectedEntry?.id === action.payload.id) {
          state.selectedEntry = action.payload;
        }
        state.success = true;
        state.successMessage = `Status updated to ${action.payload.status}`;
        updateStats(state);
      })
      .addCase(updateWaitlistStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete Waitlist Entry
      .addCase(deleteWaitlistEntry.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.successMessage = null;
      })
      .addCase(deleteWaitlistEntry.fulfilled, (state, action) => {
        state.loading = false;
        state.waitlist = state.waitlist.filter(e => e.id !== action.payload);
        if (state.selectedEntry?.id === action.payload) {
          state.selectedEntry = null;
        }
        state.success = true;
        state.successMessage = "Waitlist entry deleted successfully";
        updateStats(state);
      })
      .addCase(deleteWaitlistEntry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Mark As Contacted
      .addCase(markAsContacted.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markAsContacted.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.waitlist.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.waitlist[index] = action.payload;
        }
        if (state.selectedEntry?.id === action.payload.id) {
          state.selectedEntry = action.payload;
        }
        state.success = true;
        state.successMessage = "Marked as contacted";
        updateStats(state);
      })
      .addCase(markAsContacted.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Mark As Converted
      .addCase(markAsConverted.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markAsConverted.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.waitlist.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.waitlist[index] = action.payload;
        }
        if (state.selectedEntry?.id === action.payload.id) {
          state.selectedEntry = action.payload;
        }
        state.success = true;
        state.successMessage = "Marked as converted";
        updateStats(state);
      })
      .addCase(markAsConverted.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Mark As Cancelled
      .addCase(markAsCancelled.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markAsCancelled.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.waitlist.findIndex(e => e.id === action.payload.id);
        if (index !== -1) {
          state.waitlist[index] = action.payload;
        }
        if (state.selectedEntry?.id === action.payload.id) {
          state.selectedEntry = action.payload;
        }
        state.success = true;
        state.successMessage = "Marked as cancelled";
        updateStats(state);
      })
      .addCase(markAsCancelled.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Export to CSV
      .addCase(exportWaitlistToCSV.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(exportWaitlistToCSV.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.successMessage = "Waitlist exported successfully";
      })
      .addCase(exportWaitlistToCSV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// =====================
// Selectors
// =====================
export const selectAllWaitlist = (state) => state.waitlist.waitlist;

export const selectWaitlistByStatus = (state, status) => {
  if (status === 'all') return state.waitlist.waitlist;
  return state.waitlist.waitlist.filter(e => e.status === status);
};

export const selectPendingWaitlist = (state) => 
  state.waitlist.waitlist.filter(e => e.status === 'pending');

export const selectContactedWaitlist = (state) => 
  state.waitlist.waitlist.filter(e => e.status === 'contacted');

export const selectConvertedWaitlist = (state) => 
  state.waitlist.waitlist.filter(e => e.status === 'converted');

export const selectCancelledWaitlist = (state) => 
  state.waitlist.waitlist.filter(e => e.status === 'cancelled');

export const selectSelectedEntry = (state) => state.waitlist.selectedEntry;

export const selectWaitlistLoading = (state) => state.waitlist.loading;

export const selectWaitlistSubmitLoading = (state) => state.waitlist.submitLoading;

export const selectWaitlistError = (state) => state.waitlist.error;

export const selectWaitlistSuccess = (state) => state.waitlist.success;

export const selectWaitlistSubmitSuccess = (state) => state.waitlist.submitSuccess;

export const selectWaitlistSuccessMessage = (state) => state.waitlist.successMessage;

export const selectWaitlistStats = (state) => state.waitlist.stats;

// Get recent waitlist entries
export const selectRecentWaitlist = (state, limit = 10) => 
  [...state.waitlist.waitlist]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, limit);

// Get entries that need attention (pending)
export const selectEntriesNeedingAttention = (state) => 
  state.waitlist.waitlist.filter(e => e.status === 'pending');

// Calculate conversion rate
export const selectConversionRate = (state) => {
  const total = state.waitlist.stats.total;
  const converted = state.waitlist.stats.converted;
  return total > 0 ? ((converted / total) * 100).toFixed(2) : 0;
};

// Exports
export const { 
  clearError, 
  clearSuccess, 
  clearSubmitSuccess,
  setSelectedEntry, 
  clearSelectedEntry,
  resetWaitlistState,
  calculateStats 
} = waitlistSlice.actions;

export default waitlistSlice.reducer;
