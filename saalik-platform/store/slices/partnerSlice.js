import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Configure your API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Async thunks for API calls

// Fetch all partners
export const fetchAllPartners = createAsyncThunk(
  'partner/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/partners`);
      return response.data.data; // Assuming response format: { success: true, data: [...] }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch partner by ID
export const fetchPartnerById = createAsyncThunk(
  'partner/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/partners/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Create new partner
export const createPartner = createAsyncThunk(
  'partner/create',
  async (partnerData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/partners`, partnerData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update partner
export const updatePartner = createAsyncThunk(
  'partner/update',
  async ({ id, partnerData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/partners/${id}`, partnerData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete partner
export const deletePartner = createAsyncThunk(
  'partner/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/partners/${id}`);
      return id; // Return the deleted partner's ID
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Initial state
const initialState = {
  partners: [],
  selectedPartner: null,
  loading: false,
  error: null,
  success: false,
};

// Create slice
const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    clearSelectedPartner: (state) => {
      state.selectedPartner = null;
    },
    // Manual reordering of partners (useful for drag-and-drop)
    reorderPartners: (state, action) => {
      state.partners = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all partners
      .addCase(fetchAllPartners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPartners.fulfilled, (state, action) => {
        state.loading = false;
        state.partners = action.payload;
        state.error = null;
      })
      .addCase(fetchAllPartners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch partner by ID
      .addCase(fetchPartnerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPartnerById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPartner = action.payload;
        state.error = null;
      })
      .addCase(fetchPartnerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create partner
      .addCase(createPartner.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createPartner.fulfilled, (state, action) => {
        state.loading = false;
        // Add new partner and sort by display_order
        state.partners.push(action.payload);
        state.partners.sort((a, b) => a.display_order - b.display_order);
        state.success = true;
        state.error = null;
      })
      .addCase(createPartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Update partner
      .addCase(updatePartner.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updatePartner.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.partners.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.partners[index] = action.payload;
          // Re-sort after update (in case display_order changed)
          state.partners.sort((a, b) => a.display_order - b.display_order);
        }
        if (state.selectedPartner?.id === action.payload.id) {
          state.selectedPartner = action.payload;
        }
        state.success = true;
        state.error = null;
      })
      .addCase(updatePartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Delete partner
      .addCase(deletePartner.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deletePartner.fulfilled, (state, action) => {
        state.loading = false;
        state.partners = state.partners.filter(item => item.id !== action.payload);
        if (state.selectedPartner?.id === action.payload) {
          state.selectedPartner = null;
        }
        state.success = true;
        state.error = null;
      })
      .addCase(deletePartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { 
  clearError, 
  clearSuccess, 
  clearSelectedPartner,
  reorderPartners 
} = partnerSlice.actions;

export default partnerSlice.reducer;