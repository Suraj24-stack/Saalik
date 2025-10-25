import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

// =====================
// Async Thunks
// =====================

// Fetch all initiatives (with optional filters)
export const fetchAllInitiatives = createAsyncThunk(
  "initiative/fetchAll",
  async ({ isActive = null, sortBy = 'display_order' } = {}, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      let url = `${API_BASE_URL}/initiatives?sortBy=${sortBy}`;
      
      if (isActive !== null) {
        url += `&isActive=${isActive}`;
      }
      
      const response = await axios.get(url, {
        headers: { 
          Authorization: `Bearer ${token}` 
        },
      });
      console.log('Fetch All Response:', response.data);
      return response.data.data || response.data;
    } catch (err) {
      console.error('Fetch All Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Fetch single initiative by ID
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
      return response.data.data || response.data;
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
      
      const formData = new FormData();
      
      // Append all fields from the model
      if (initiativeData.name) formData.append('name', initiativeData.name);
      if (initiativeData.description) formData.append('description', initiativeData.description);
      if (initiativeData.website) formData.append('website', initiativeData.website);
      if (initiativeData.display_order !== undefined) formData.append('display_order', initiativeData.display_order);
      if (initiativeData.is_active !== undefined) formData.append('is_active', initiativeData.is_active);
      
      // Handle logo file upload
      if (initiativeData.logo && initiativeData.logo instanceof File) {
        formData.append('logo', initiativeData.logo);
      }
      
      // Log the FormData contents for debugging
      console.log('Creating initiative...');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }
      
      const res = await axios.post(`${API_BASE_URL}/initiatives`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log('Create Response:', res.data);
      return res.data.data || res.data;
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
      
      const formData = new FormData();
      
      // Append all fields from the model
      if (data.name) formData.append('name', data.name);
      if (data.description !== undefined) formData.append('description', data.description);
      if (data.website !== undefined) formData.append('website', data.website);
      if (data.display_order !== undefined) formData.append('display_order', data.display_order);
      if (data.is_active !== undefined) formData.append('is_active', data.is_active);
      
      // Handle logo file upload
      if (data.logo && data.logo instanceof File) {
        formData.append('logo', data.logo);
      }
      
      // Log the FormData contents for debugging
      console.log('Updating initiative with ID:', id);
      for (let pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }
      
      const res = await axios.put(`${API_BASE_URL}/initiatives/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log('Update Response:', res.data);
      return res.data.data || res.data;
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

// Toggle initiative active status (Admin)
export const toggleInitiativeStatus = createAsyncThunk(
  "initiative/toggleStatus",
  async ({ id, isActive }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${API_BASE_URL}/initiatives/${id}/toggle-status`,
        { is_active: isActive },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );
      console.log('Toggle Status Response:', res.data);
      return res.data.data || res.data;
    } catch (err) {
      console.error('Toggle Status Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update display order (Admin)
export const updateDisplayOrder = createAsyncThunk(
  "initiative/updateDisplayOrder",
  async (initiativesOrder, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${API_BASE_URL}/initiatives/reorder`,
        { initiatives: initiativesOrder },
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );
      console.log('Update Display Order Response:', res.data);
      return res.data.data || res.data;
    } catch (err) {
      console.error('Update Display Order Error:', err);
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
    successMessage: null,
  },
  reducers: {
    clearError: (state) => { 
      state.error = null; 
    },
    clearSuccess: (state) => { 
      state.success = false;
      state.successMessage = null;
    },
    setCurrentInitiative: (state, action) => {
      state.currentInitiative = action.payload;
    },
    clearCurrentInitiative: (state) => {
      state.currentInitiative = null;
    },
    resetInitiativeState: (state) => {
      state.initiatives = [];
      state.currentInitiative = null;
      state.loading = false;
      state.error = null;
      state.success = false;
      state.successMessage = null;
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
        state.successMessage = null;
      })
      .addCase(createInitiative.fulfilled, (state, action) => {
        state.loading = false;
        state.initiatives.push(action.payload);
        state.success = true;
        state.successMessage = "Initiative created successfully";
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
        state.successMessage = null;
      })
      .addCase(updateInitiative.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.initiatives.findIndex(i => i.id === action.payload.id);
        if (index !== -1) {
          state.initiatives[index] = action.payload;
        }
        state.currentInitiative = action.payload;
        state.success = true;
        state.successMessage = "Initiative updated successfully";
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
        state.successMessage = null;
      })
      .addCase(deleteInitiative.fulfilled, (state, action) => {
        state.loading = false;
        state.initiatives = state.initiatives.filter(i => i.id !== action.payload);
        state.success = true;
        state.successMessage = "Initiative deleted successfully";
      })
      .addCase(deleteInitiative.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Toggle Status
      .addCase(toggleInitiativeStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleInitiativeStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.initiatives.findIndex(i => i.id === action.payload.id);
        if (index !== -1) {
          state.initiatives[index] = action.payload;
        }
        if (state.currentInitiative?.id === action.payload.id) {
          state.currentInitiative = action.payload;
        }
        state.success = true;
        state.successMessage = "Initiative status updated successfully";
      })
      .addCase(toggleInitiativeStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Display Order
      .addCase(updateDisplayOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDisplayOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.initiatives = action.payload;
        state.success = true;
        state.successMessage = "Display order updated successfully";
      })
      .addCase(updateDisplayOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// =====================
// Selectors
// =====================
export const selectAllInitiatives = (state) => state.initiative.initiatives;
export const selectActiveInitiatives = (state) => 
  state.initiative.initiatives.filter(i => i.is_active);
export const selectCurrentInitiative = (state) => state.initiative.currentInitiative;
export const selectInitiativeLoading = (state) => state.initiative.loading;
export const selectInitiativeError = (state) => state.initiative.error;
export const selectInitiativeSuccess = (state) => state.initiative.success;
export const selectInitiativeSuccessMessage = (state) => state.initiative.successMessage;

// Exports
export const { 
  clearError, 
  clearSuccess, 
  setCurrentInitiative, 
  clearCurrentInitiative,
  resetInitiativeState 
} = initiativeSlice.actions;

export default initiativeSlice.reducer;