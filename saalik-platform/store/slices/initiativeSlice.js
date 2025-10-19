import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Configure your API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Async thunks for API calls

// Fetch all initiatives
export const fetchAllInitiatives = createAsyncThunk(
  'initiative/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/initiatives`);
      return response.data.data; // Assuming response format: { success: true, data: [...] }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch initiative by ID
export const fetchInitiativeById = createAsyncThunk(
  'initiative/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/initiatives/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Create new initiative
export const createInitiative = createAsyncThunk(
  'initiative/create',
  async (initiativeData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/initiatives`, initiativeData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update initiative
export const updateInitiative = createAsyncThunk(
  'initiative/update',
  async ({ id, initiativeData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/initiatives/${id}`, initiativeData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete initiative
export const deleteInitiative = createAsyncThunk(
  'initiative/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/initiatives/${id}`);
      return id; // Return the deleted initiative's ID
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Initial state
const initialState = {
  initiatives: [],
  selectedInitiative: null,
  loading: false,
  error: null,
  success: false,
};

// Create slice
const initiativeSlice = createSlice({
  name: 'initiative',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    clearSelectedInitiative: (state) => {
      state.selectedInitiative = null;
    },
    // Manual reordering of initiatives (useful for drag-and-drop)
    reorderInitiatives: (state, action) => {
      state.initiatives = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all initiatives
      .addCase(fetchAllInitiatives.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllInitiatives.fulfilled, (state, action) => {
        state.loading = false;
        state.initiatives = action.payload;
        state.error = null;
      })
      .addCase(fetchAllInitiatives.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch initiative by ID
      .addCase(fetchInitiativeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInitiativeById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedInitiative = action.payload;
        state.error = null;
      })
      .addCase(fetchInitiativeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create initiative
      .addCase(createInitiative.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createInitiative.fulfilled, (state, action) => {
        state.loading = false;
        // Add new initiative and sort by display_order
        state.initiatives.push(action.payload);
        state.initiatives.sort((a, b) => a.display_order - b.display_order);
        state.success = true;
        state.error = null;
      })
      .addCase(createInitiative.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Update initiative
      .addCase(updateInitiative.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateInitiative.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.initiatives.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.initiatives[index] = action.payload;
          // Re-sort after update (in case display_order changed)
          state.initiatives.sort((a, b) => a.display_order - b.display_order);
        }
        if (state.selectedInitiative?.id === action.payload.id) {
          state.selectedInitiative = action.payload;
        }
        state.success = true;
        state.error = null;
      })
      .addCase(updateInitiative.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Delete initiative
      .addCase(deleteInitiative.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteInitiative.fulfilled, (state, action) => {
        state.loading = false;
        state.initiatives = state.initiatives.filter(item => item.id !== action.payload);
        if (state.selectedInitiative?.id === action.payload) {
          state.selectedInitiative = null;
        }
        state.success = true;
        state.error = null;
      })
      .addCase(deleteInitiative.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { 
  clearError, 
  clearSuccess, 
  clearSelectedInitiative,
  reorderInitiatives 
} = initiativeSlice.actions;

export default initiativeSlice.reducer;