import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Configure your API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Async thunks for API calls

// Fetch all waitlist entries
export const fetchAllWaitlist = createAsyncThunk(
  'waitlist/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/waitlist`);
      return response.data.data; // Assuming response format: { success: true, data: [...] }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch waitlist entry by ID
export const fetchWaitlistById = createAsyncThunk(
  'waitlist/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/waitlist/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update waitlist entry status
export const updateWaitlistStatus = createAsyncThunk(
  'waitlist/updateStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/waitlist/${id}/status`, { status });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Initial state
const initialState = {
  waitlist: [],
  selectedEntry: null,
  loading: false,
  error: null,
  success: false,
  // Statistics for dashboard
  stats: {
    total: 0,
    pending: 0,
    contacted: 0,
    approved: 0,
    rejected: 0,
  },
};

// Create slice
const waitlistSlice = createSlice({
  name: 'waitlist',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    clearSelectedEntry: (state) => {
      state.selectedEntry = null;
    },
    // Calculate statistics from waitlist data
    calculateStats: (state) => {
      state.stats.total = state.waitlist.length;
      state.stats.pending = state.waitlist.filter(item => item.status === 'pending').length;
      state.stats.contacted = state.waitlist.filter(item => item.status === 'contacted').length;
      state.stats.approved = state.waitlist.filter(item => item.status === 'approved').length;
      state.stats.rejected = state.waitlist.filter(item => item.status === 'rejected').length;
    },
    // Filter waitlist by status (client-side filtering)
    filterByStatus: (state, action) => {
      if (action.payload === 'all') {
        return; // Show all entries
      }
      // This won't modify the state, but you can use a selector instead
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all waitlist entries
      .addCase(fetchAllWaitlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllWaitlist.fulfilled, (state, action) => {
        state.loading = false;
        state.waitlist = action.payload;
        state.error = null;
        // Auto-calculate stats
        state.stats.total = action.payload.length;
        state.stats.pending = action.payload.filter(item => item.status === 'pending').length;
        state.stats.contacted = action.payload.filter(item => item.status === 'contacted').length;
        state.stats.approved = action.payload.filter(item => item.status === 'approved').length;
        state.stats.rejected = action.payload.filter(item => item.status === 'rejected').length;
      })
      .addCase(fetchAllWaitlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch waitlist entry by ID
      .addCase(fetchWaitlistById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWaitlistById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEntry = action.payload;
        state.error = null;
      })
      .addCase(fetchWaitlistById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update waitlist status
      .addCase(updateWaitlistStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateWaitlistStatus.fulfilled, (state, action) => {
        state.loading = false;
        // Update in waitlist array
        const index = state.waitlist.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.waitlist[index] = action.payload;
        }
        // Update selected entry if it matches
        if (state.selectedEntry?.id === action.payload.id) {
          state.selectedEntry = action.payload;
        }
        // Recalculate stats
        state.stats.total = state.waitlist.length;
        state.stats.pending = state.waitlist.filter(item => item.status === 'pending').length;
        state.stats.contacted = state.waitlist.filter(item => item.status === 'contacted').length;
        state.stats.approved = state.waitlist.filter(item => item.status === 'approved').length;
        state.stats.rejected = state.waitlist.filter(item => item.status === 'rejected').length;
        
        state.success = true;
        state.error = null;
      })
      .addCase(updateWaitlistStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { 
  clearError, 
  clearSuccess, 
  clearSelectedEntry,
  calculateStats,
  filterByStatus 
} = waitlistSlice.actions;

// Selectors for filtering
export const selectWaitlistByStatus = (state, status) => {
  if (status === 'all') return state.waitlist.waitlist;
  return state.waitlist.waitlist.filter(item => item.status === status);
};

export const selectPendingWaitlist = (state) => {
  return state.waitlist.waitlist.filter(item => item.status === 'pending');
};

export default waitlistSlice.reducer;