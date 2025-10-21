import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

// =====================
// Async Thunks
// =====================

// Fetch all initiatives
export const fetchAllInitiatives = createAsyncThunk(
  "initiative/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/initiatives`);
      return response.data.data;
    } catch (err) {
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
      const res = await axios.post(`${API_BASE_URL}/initiatives`, initiativeData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data.data;
    } catch (err) {
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
      return id;
    } catch (err) {
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
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearError: (state) => { state.error = null; },
    clearSuccess: (state) => { state.success = false; },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
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
export const { clearError, clearSuccess } = initiativeSlice.actions;
export default initiativeSlice.reducer;
