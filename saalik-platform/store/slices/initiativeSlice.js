import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

// =====================
// Async Thunks
// =====================

// Fetch all initiatives (FIXED: Added authentication)
export const fetchAllInitiatives = createAsyncThunk(
  "initiative/fetchAll",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/initiatives`, {
        headers: { 
          Authorization: `Bearer ${token}` 
        },
      });
      console.log('Fetch All Response:', response.data);
      return response.data.data;
    } catch (err) {
      console.error('Fetch All Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Fetch single initiative by ID (FIXED: Added authentication)
export const fetchInitiativeById = createAsyncThunk(
  "initiative/fetchById",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/initiatives/${id}`, {
        headers: { 
          Authorization: `Bearer ${token}` 
        },
      });
      console.log('Fetch By ID Response:', response.data);
      return response.data.data;
    } catch (err) {
      console.error('Fetch By ID Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Create new initiative (Admin)
export const createInitiative = createAsyncThunk(
  "initiative/create",
  async (initiativeData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      
      // Log the FormData contents for debugging
      console.log('Creating initiative...');
      for (let pair of initiativeData.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }
      
      const res = await axios.post(`${API_BASE_URL}/initiatives`, initiativeData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log('Create Response:', res.data);
      return res.data.data;
    } catch (err) {
      console.error('Create Error:', err.response?.data || err.message);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update initiative (Admin)
export const updateInitiative = createAsyncThunk(
  "initiative/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      
      // Log the FormData contents for debugging
      console.log('Updating initiative with ID:', id);
      for (let pair of data.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      
      const res = await axios.put(`${API_BASE_URL}/initiatives/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log('Update Response:', res.data);
      return res.data.data;
    } catch (err) {
      console.error('Update Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete initiative (Admin)
export const deleteInitiative = createAsyncThunk(
  "initiative/delete",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/initiatives/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Delete Success for ID:', id);
      return id;
    } catch (err) {
      console.error('Delete Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// =====================
// Slice
// =====================
const initiativeSlice = createSlice({
  name: "initiative",
  initialState: {
    initiatives: [],
    currentInitiative: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearError: (state) => { 
      state.error = null; 
    },
    clearSuccess: (state) => { 
      state.success = false; 
    },
    setCurrentInitiative: (state, action) => {
      state.currentInitiative = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAllInitiatives.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllInitiatives.fulfilled, (state, action) => {
        state.loading = false;
        state.initiatives = action.payload;
      })
      .addCase(fetchAllInitiatives.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch By ID
      .addCase(fetchInitiativeById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInitiativeById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentInitiative = action.payload;
      })
      .addCase(fetchInitiativeById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create
      .addCase(createInitiative.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createInitiative.fulfilled, (state, action) => {
        state.loading = false;
        state.initiatives.push(action.payload);
        state.success = true;
      })
      .addCase(createInitiative.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update
      .addCase(updateInitiative.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateInitiative.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.initiatives.findIndex(i => i.id === action.payload.id);
        if (index !== -1) {
          state.initiatives[index] = action.payload;
        }
        state.currentInitiative = action.payload;
        state.success = true;
      })
      .addCase(updateInitiative.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete
      .addCase(deleteInitiative.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteInitiative.fulfilled, (state, action) => {
        state.loading = false;
        state.initiatives = state.initiatives.filter(i => i.id !== action.payload);
        state.success = true;
      })
      .addCase(deleteInitiative.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Exports
export const { clearError, clearSuccess, setCurrentInitiative } = initiativeSlice.actions;
export default initiativeSlice.reducer;