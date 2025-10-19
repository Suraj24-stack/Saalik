import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Configure your API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
// Async thunks for API calls

// Fetch all story suggestions
export const fetchAllStorySuggestions = createAsyncThunk(
  'storySuggestion/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/story-suggestions`);
      return response.data.data; // Assuming response format: { success: true, data: [...] }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch story suggestion by ID
export const fetchStorySuggestionById = createAsyncThunk(
  'storySuggestion/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/story-suggestions/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update story suggestion status and admin notes
export const updateStorySuggestionStatus = createAsyncThunk(
  'storySuggestion/updateStatus',
  async ({ id, status, admin_notes }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/story-suggestions/${id}/status`, { 
        status, 
        admin_notes 
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Initial state
const initialState = {
  suggestions: [],
  selectedSuggestion: null,
  loading: false,
  error: null,
  success: false,
  // Statistics for dashboard
  stats: {
    total: 0,
    pending: 0,
    under_review: 0,
    approved: 0,
    rejected: 0,
  },
};

// Create slice
const storySuggestionSlice = createSlice({
  name: 'storySuggestion',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    clearSelectedSuggestion: (state) => {
      state.selectedSuggestion = null;
    },
    // Calculate statistics from suggestions data
    calculateStats: (state) => {
      state.stats.total = state.suggestions.length;
      state.stats.pending = state.suggestions.filter(item => item.status === 'pending').length;
      state.stats.under_review = state.suggestions.filter(item => item.status === 'under_review').length;
      state.stats.approved = state.suggestions.filter(item => item.status === 'approved').length;
      state.stats.rejected = state.suggestions.filter(item => item.status === 'rejected').length;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all story suggestions
      .addCase(fetchAllStorySuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStorySuggestions.fulfilled, (state, action) => {
        state.loading = false;
        state.suggestions = action.payload;
        state.error = null;
        // Auto-calculate stats
        state.stats.total = action.payload.length;
        state.stats.pending = action.payload.filter(item => item.status === 'pending').length;
        state.stats.under_review = action.payload.filter(item => item.status === 'under_review').length;
        state.stats.approved = action.payload.filter(item => item.status === 'approved').length;
        state.stats.rejected = action.payload.filter(item => item.status === 'rejected').length;
      })
      .addCase(fetchAllStorySuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch story suggestion by ID
      .addCase(fetchStorySuggestionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStorySuggestionById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSuggestion = action.payload;
        state.error = null;
      })
      .addCase(fetchStorySuggestionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update story suggestion status
      .addCase(updateStorySuggestionStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateStorySuggestionStatus.fulfilled, (state, action) => {
        state.loading = false;
        // Update in suggestions array
        const index = state.suggestions.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.suggestions[index] = action.payload;
        }
        // Update selected suggestion if it matches
        if (state.selectedSuggestion?.id === action.payload.id) {
          state.selectedSuggestion = action.payload;
        }
        // Recalculate stats
        state.stats.total = state.suggestions.length;
        state.stats.pending = state.suggestions.filter(item => item.status === 'pending').length;
        state.stats.under_review = state.suggestions.filter(item => item.status === 'under_review').length;
        state.stats.approved = state.suggestions.filter(item => item.status === 'approved').length;
        state.stats.rejected = state.suggestions.filter(item => item.status === 'rejected').length;
        
        state.success = true;
        state.error = null;
      })
      .addCase(updateStorySuggestionStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { 
  clearError, 
  clearSuccess, 
  clearSelectedSuggestion,
  calculateStats 
} = storySuggestionSlice.actions;

// Selectors for filtering
export const selectSuggestionsByStatus = (state, status) => {
  if (status === 'all') return state.storySuggestion.suggestions;
  return state.storySuggestion.suggestions.filter(item => item.status === status);
};

export const selectPendingSuggestions = (state) => {
  return state.storySuggestion.suggestions.filter(item => item.status === 'pending');
};

export const selectApprovedSuggestions = (state) => {
  return state.storySuggestion.suggestions.filter(item => item.status === 'approved');
};

export default storySuggestionSlice.reducer;