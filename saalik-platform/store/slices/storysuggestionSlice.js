import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

// =====================
// Async Thunks
// =====================

// Fetch all story suggestions (with optional filters)
export const fetchAllStorySuggestions = createAsyncThunk(
  "storySuggestion/fetchAll",
  async ({ status = null, sortBy = 'created_at', order = 'desc' } = {}, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      let url = `${API_BASE_URL}/story-suggestions?sortBy=${sortBy}&order=${order}`;
      
      if (status) {
        url += `&status=${status}`;
      }
      
      const config = token ? {
        headers: { 
          Authorization: `Bearer ${token}` 
        }
      } : {};
      
      const response = await axios.get(url, config);
      console.log('Fetch All Story Suggestions Response:', response.data);
      return response.data.data || response.data;
    } catch (err) {
      console.error('Fetch All Story Suggestions Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Fetch single story suggestion by ID
export const fetchStorySuggestionById = createAsyncThunk(
  "storySuggestion/fetchById",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const config = token ? {
        headers: { 
          Authorization: `Bearer ${token}` 
        }
      } : {};
      
      const response = await axios.get(`${API_BASE_URL}/story-suggestions/${id}`, config);
      console.log('Fetch Story Suggestion By ID Response:', response.data);
      return response.data.data || response.data;
    } catch (err) {
      console.error('Fetch Story Suggestion By ID Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Create new story suggestion (public submission)
export const createStorySuggestion = createAsyncThunk(
  "storySuggestion/create",
  async (suggestionData, thunkAPI) => {
    try {
      // Public endpoint - no auth required
      const data = {
        title: suggestionData.title,
        location: suggestionData.location || null,
        description: suggestionData.description || null,
        submitted_by_name: suggestionData.submitted_by_name || null,
        submitted_by_email: suggestionData.submitted_by_email || null,
      };
      
      console.log('Creating story suggestion...', data);
      
      const res = await axios.post(`${API_BASE_URL}/story-suggestions`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log('Create Story Suggestion Response:', res.data);
      return res.data.data || res.data;
    } catch (err) {
      console.error('Create Story Suggestion Error:', err.response?.data || err.message);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update story suggestion (Admin - full update)
export const updateStorySuggestion = createAsyncThunk(
  "storySuggestion/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      
      const updateData = {
        title: data.title,
        location: data.location !== undefined ? data.location : undefined,
        description: data.description !== undefined ? data.description : undefined,
        submitted_by_name: data.submitted_by_name !== undefined ? data.submitted_by_name : undefined,
        submitted_by_email: data.submitted_by_email !== undefined ? data.submitted_by_email : undefined,
        status: data.status !== undefined ? data.status : undefined,
        admin_notes: data.admin_notes !== undefined ? data.admin_notes : undefined,
      };
      
      // Remove undefined values
      Object.keys(updateData).forEach(key => 
        updateData[key] === undefined && delete updateData[key]
      );
      
      console.log('Updating story suggestion with ID:', id, updateData);
      
      const res = await axios.put(`${API_BASE_URL}/story-suggestions/${id}`, updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log('Update Story Suggestion Response:', res.data);
      return res.data.data || res.data;
    } catch (err) {
      console.error('Update Story Suggestion Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update story suggestion status (Admin - quick status change)
export const updateStorySuggestionStatus = createAsyncThunk(
  "storySuggestion/updateStatus",
  async ({ id, status, admin_notes }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      
      const data = {
        status,
        admin_notes: admin_notes || null,
      };
      
      console.log('Updating story suggestion status:', id, data);
      
      const res = await axios.patch(
        `${API_BASE_URL}/story-suggestions/${id}/status`,
        data,
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

// Delete story suggestion (Admin)
export const deleteStorySuggestion = createAsyncThunk(
  "storySuggestion/delete",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/story-suggestions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Delete Story Suggestion Success for ID:', id);
      return id;
    } catch (err) {
      console.error('Delete Story Suggestion Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Change status to 'reviewing' (Admin)
export const markAsReviewing = createAsyncThunk(
  "storySuggestion/markAsReviewing",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${API_BASE_URL}/story-suggestions/${id}/status`,
        { status: 'reviewing' },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );
      console.log('Mark As Reviewing Response:', res.data);
      return res.data.data || res.data;
    } catch (err) {
      console.error('Mark As Reviewing Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Approve suggestion (Admin)
export const approveSuggestion = createAsyncThunk(
  "storySuggestion/approve",
  async ({ id, admin_notes }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${API_BASE_URL}/story-suggestions/${id}/status`,
        { status: 'approved', admin_notes },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );
      console.log('Approve Suggestion Response:', res.data);
      return res.data.data || res.data;
    } catch (err) {
      console.error('Approve Suggestion Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Reject suggestion (Admin)
export const rejectSuggestion = createAsyncThunk(
  "storySuggestion/reject",
  async ({ id, admin_notes }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${API_BASE_URL}/story-suggestions/${id}/status`,
        { status: 'rejected', admin_notes },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );
      console.log('Reject Suggestion Response:', res.data);
      return res.data.data || res.data;
    } catch (err) {
      console.error('Reject Suggestion Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// =====================
// Slice
// =====================
const storySuggestionSlice = createSlice({
  name: "storySuggestion",
  initialState: {
    suggestions: [],
    selectedSuggestion: null,
    loading: false,
    error: null,
    success: false,
    successMessage: null,
    // Statistics for dashboard
    stats: {
      total: 0,
      pending: 0,
      reviewing: 0,
      approved: 0,
      rejected: 0,
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
    setSelectedSuggestion: (state, action) => {
      state.selectedSuggestion = action.payload;
    },
    clearSelectedSuggestion: (state) => {
      state.selectedSuggestion = null;
    },
    resetStorySuggestionState: (state) => {
      state.suggestions = [];
      state.selectedSuggestion = null;
      state.loading = false;
      state.error = null;
      state.success = false;
      state.successMessage = null;
      state.stats = {
        total: 0,
        pending: 0,
        reviewing: 0,
        approved: 0,
        rejected: 0,
      };
    },
    // Calculate statistics from suggestions data
    calculateStats: (state) => {
      state.stats.total = state.suggestions.length;
      state.stats.pending = state.suggestions.filter(s => s.status === 'pending').length;
      state.stats.reviewing = state.suggestions.filter(s => s.status === 'reviewing').length;
      state.stats.approved = state.suggestions.filter(s => s.status === 'approved').length;
      state.stats.rejected = state.suggestions.filter(s => s.status === 'rejected').length;
    },
  },
  extraReducers: (builder) => {
    // Helper function to update stats
    const updateStats = (state) => {
      state.stats.total = state.suggestions.length;
      state.stats.pending = state.suggestions.filter(s => s.status === 'pending').length;
      state.stats.reviewing = state.suggestions.filter(s => s.status === 'reviewing').length;
      state.stats.approved = state.suggestions.filter(s => s.status === 'approved').length;
      state.stats.rejected = state.suggestions.filter(s => s.status === 'rejected').length;
    };

    builder
      // Fetch All Story Suggestions
      .addCase(fetchAllStorySuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStorySuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload;
        updateStats(state);
      })
      .addCase(fetchAllStorySuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Story Suggestion By ID
      .addCase(fetchStorySuggestionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStorySuggestionById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSuggestion = action.payload;
      })
      .addCase(fetchStorySuggestionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Story Suggestion
      .addCase(createStorySuggestion.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.successMessage = null;
      })
      .addCase(createStorySuggestion.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions.unshift(action.payload);
        state.success = true;
        state.successMessage = "Thank you! Your story suggestion has been submitted successfully.";
        updateStats(state);
      })
      .addCase(createStorySuggestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Story Suggestion (Full)
      .addCase(updateStorySuggestion.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.successMessage = null;
      })
      .addCase(updateStorySuggestion.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.suggestions.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.suggestions[index] = action.payload;
        }
        state.selectedSuggestion = action.payload;
        state.success = true;
        state.successMessage = "Story suggestion updated successfully";
        updateStats(state);
      })
      .addCase(updateStorySuggestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Story Suggestion Status
      .addCase(updateStorySuggestionStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.successMessage = null;
      })
      .addCase(updateStorySuggestionStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.suggestions.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.suggestions[index] = action.payload;
        }
        if (state.selectedSuggestion?.id === action.payload.id) {
          state.selectedSuggestion = action.payload;
        }
        state.success = true;
        state.successMessage = `Status updated to ${action.payload.status}`;
        updateStats(state);
      })
      .addCase(updateStorySuggestionStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete Story Suggestion
      .addCase(deleteStorySuggestion.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.successMessage = null;
      })
      .addCase(deleteStorySuggestion.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = state.suggestions.filter(s => s.id !== action.payload);
        if (state.selectedSuggestion?.id === action.payload) {
          state.selectedSuggestion = null;
        }
        state.success = true;
        state.successMessage = "Story suggestion deleted successfully";
        updateStats(state);
      })
      .addCase(deleteStorySuggestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Mark As Reviewing
      .addCase(markAsReviewing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markAsReviewing.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.suggestions.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.suggestions[index] = action.payload;
        }
        if (state.selectedSuggestion?.id === action.payload.id) {
          state.selectedSuggestion = action.payload;
        }
        state.success = true;
        state.successMessage = "Marked as reviewing";
        updateStats(state);
      })
      .addCase(markAsReviewing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Approve Suggestion
      .addCase(approveSuggestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(approveSuggestion.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.suggestions.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.suggestions[index] = action.payload;
        }
        if (state.selectedSuggestion?.id === action.payload.id) {
          state.selectedSuggestion = action.payload;
        }
        state.success = true;
        state.successMessage = "Story suggestion approved successfully";
        updateStats(state);
      })
      .addCase(approveSuggestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Reject Suggestion
      .addCase(rejectSuggestion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectSuggestion.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.suggestions.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.suggestions[index] = action.payload;
        }
        if (state.selectedSuggestion?.id === action.payload.id) {
          state.selectedSuggestion = action.payload;
        }
        state.success = true;
        state.successMessage = "Story suggestion rejected";
        updateStats(state);
      })
      .addCase(rejectSuggestion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// =====================
// Selectors
// =====================
export const selectAllSuggestions = (state) => state.storySuggestion.suggestions;

export const selectSuggestionsByStatus = (state, status) => {
  if (status === 'all') return state.storySuggestion.suggestions;
  return state.storySuggestion.suggestions.filter(s => s.status === status);
};

export const selectPendingSuggestions = (state) => 
  state.storySuggestion.suggestions.filter(s => s.status === 'pending');

export const selectReviewingSuggestions = (state) => 
  state.storySuggestion.suggestions.filter(s => s.status === 'reviewing');

export const selectApprovedSuggestions = (state) => 
  state.storySuggestion.suggestions.filter(s => s.status === 'approved');

export const selectRejectedSuggestions = (state) => 
  state.storySuggestion.suggestions.filter(s => s.status === 'rejected');

export const selectSelectedSuggestion = (state) => state.storySuggestion.selectedSuggestion;

export const selectSuggestionLoading = (state) => state.storySuggestion.loading;

export const selectSuggestionError = (state) => state.storySuggestion.error;

export const selectSuggestionSuccess = (state) => state.storySuggestion.success;

export const selectSuggestionSuccessMessage = (state) => state.storySuggestion.successMessage;

export const selectSuggestionStats = (state) => state.storySuggestion.stats;

// Get recent suggestions
export const selectRecentSuggestions = (state, limit = 10) => 
  [...state.storySuggestion.suggestions]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, limit);

// Get suggestions that need attention (pending + reviewing)
export const selectSuggestionsNeedingAttention = (state) => 
  state.storySuggestion.suggestions.filter(s => 
    s.status === 'pending' || s.status === 'reviewing'
  );

// Exports
export const { 
  clearError, 
  clearSuccess, 
  setSelectedSuggestion, 
  clearSelectedSuggestion,
  resetStorySuggestionState,
  calculateStats 
} = storySuggestionSlice.actions;

export default storySuggestionSlice.reducer;