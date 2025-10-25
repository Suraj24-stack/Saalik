import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

// =====================
// Async Thunks
// =====================

// Fetch all partners (with optional filters)
export const fetchAllPartners = createAsyncThunk(
  "partner/fetchAll",
  async ({ isActive = null, sortBy = 'display_order', order = 'asc' } = {}, thunkAPI) => {
    try {
      let url = `${API_BASE_URL}/partners?sortBy=${sortBy}&order=${order}`;
      
      if (isActive !== null) {
        url += `&isActive=${isActive}`;
      }
      
      const response = await axios.get(url);
      console.log('Fetch All Partners Response:', response.data);
      return response.data.data || response.data;
    } catch (err) {
      console.error('Fetch All Partners Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Fetch single partner by ID
export const fetchPartnerById = createAsyncThunk(
  "partner/fetchById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/partners/${id}`);
      console.log('Fetch Partner By ID Response:', response.data);
      return response.data.data || response.data;
    } catch (err) {
      console.error('Fetch Partner By ID Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Create new partner (Admin)
export const createPartner = createAsyncThunk(
  "partner/create",
  async (partnerData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        return thunkAPI.rejectWithValue("Authentication required. Please login.");
      }
      
      const formData = new FormData();
      
      // Append all fields from the model
      if (partnerData.name) formData.append('name', partnerData.name);
      if (partnerData.description) formData.append('description', partnerData.description);
      if (partnerData.website) formData.append('website', partnerData.website);
      if (partnerData.display_order !== undefined) formData.append('display_order', partnerData.display_order);
      if (partnerData.is_active !== undefined) formData.append('is_active', partnerData.is_active);
      
      // Handle logo file upload
      if (partnerData.logo && partnerData.logo instanceof File) {
        formData.append('logo', partnerData.logo);
      }
      
      // Log the FormData contents for debugging
      console.log('Creating partner...');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }
      
      const res = await axios.post(`${API_BASE_URL}/partners`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log('Create Partner Response:', res.data);
      return res.data.data || res.data;
    } catch (err) {
      console.error('Create Partner Error:', err.response?.data || err.message);
      
      // Handle authentication errors
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return thunkAPI.rejectWithValue("Session expired. Please login again.");
      }
      
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update partner (Admin)
export const updatePartner = createAsyncThunk(
  "partner/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        return thunkAPI.rejectWithValue("Authentication required. Please login.");
      }
      
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
      console.log('Updating partner with ID:', id);
      for (let pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }
      
      const res = await axios.put(`${API_BASE_URL}/partners/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log('Update Partner Response:', res.data);
      return res.data.data || res.data;
    } catch (err) {
      console.error('Update Partner Error:', err);
      
      // Handle authentication errors
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return thunkAPI.rejectWithValue("Session expired. Please login again.");
      }
      
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete partner (Admin)
export const deletePartner = createAsyncThunk(
  "partner/delete",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        return thunkAPI.rejectWithValue("Authentication required. Please login.");
      }
      
      await axios.delete(`${API_BASE_URL}/partners/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Delete Partner Success for ID:', id);
      return id;
    } catch (err) {
      console.error('Delete Partner Error:', err);
      
      // Handle authentication errors
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return thunkAPI.rejectWithValue("Session expired. Please login again.");
      }
      
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Toggle partner active status (Admin)
export const togglePartnerStatus = createAsyncThunk(
  "partner/toggleStatus",
  async ({ id, isActive }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        return thunkAPI.rejectWithValue("Authentication required. Please login.");
      }
      
      const res = await axios.patch(
        `${API_BASE_URL}/partners/${id}/toggle-status`,
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
      
      // Handle authentication errors
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return thunkAPI.rejectWithValue("Session expired. Please login again.");
      }
      
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update display order (Admin)
export const updateDisplayOrder = createAsyncThunk(
  "partner/updateDisplayOrder",
  async (partnersOrder, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        return thunkAPI.rejectWithValue("Authentication required. Please login.");
      }
      
      const res = await axios.put(
        `${API_BASE_URL}/partners/reorder`,
        { partners: partnersOrder },
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
      
      // Handle authentication errors
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        return thunkAPI.rejectWithValue("Session expired. Please login again.");
      }
      
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// =====================
// Slice
// =====================
const partnerSlice = createSlice({
  name: "partner",
  initialState: {
    partners: [],
    selectedPartner: null,
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
    setSelectedPartner: (state, action) => {
      state.selectedPartner = action.payload;
    },
    clearSelectedPartner: (state) => {
      state.selectedPartner = null;
    },
    resetPartnerState: (state) => {
      state.partners = [];
      state.selectedPartner = null;
      state.loading = false;
      state.error = null;
      state.success = false;
      state.successMessage = null;
    },
    // Manual reordering of partners (useful for drag-and-drop UI)
    reorderPartners: (state, action) => {
      state.partners = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Partners
      .addCase(fetchAllPartners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPartners.fulfilled, (state, action) => {
        state.loading = false;
        state.partners = action.payload;
      })
      .addCase(fetchAllPartners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Partner By ID
      .addCase(fetchPartnerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPartnerById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPartner = action.payload;
      })
      .addCase(fetchPartnerById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Partner
      .addCase(createPartner.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.successMessage = null;
      })
      .addCase(createPartner.fulfilled, (state, action) => {
        state.loading = false;
        state.partners.push(action.payload);
        // Sort by display_order after adding
        state.partners.sort((a, b) => a.display_order - b.display_order);
        state.success = true;
        state.successMessage = "Partner created successfully";
      })
      .addCase(createPartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Partner
      .addCase(updatePartner.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.successMessage = null;
      })
      .addCase(updatePartner.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.partners.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.partners[index] = action.payload;
        }
        // Re-sort in case display_order changed
        state.partners.sort((a, b) => a.display_order - b.display_order);
        state.selectedPartner = action.payload;
        state.success = true;
        state.successMessage = "Partner updated successfully";
      })
      .addCase(updatePartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete Partner
      .addCase(deletePartner.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.successMessage = null;
      })
      .addCase(deletePartner.fulfilled, (state, action) => {
        state.loading = false;
        state.partners = state.partners.filter(p => p.id !== action.payload);
        if (state.selectedPartner?.id === action.payload) {
          state.selectedPartner = null;
        }
        state.success = true;
        state.successMessage = "Partner deleted successfully";
      })
      .addCase(deletePartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Toggle Partner Status
      .addCase(togglePartnerStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(togglePartnerStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.partners.findIndex(p => p.id === action.payload.id);
        if (index !== -1) {
          state.partners[index] = action.payload;
        }
        if (state.selectedPartner?.id === action.payload.id) {
          state.selectedPartner = action.payload;
        }
        state.success = true;
        state.successMessage = "Partner status updated successfully";
      })
      .addCase(togglePartnerStatus.rejected, (state, action) => {
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
        state.partners = action.payload;
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
export const selectAllPartners = (state) => state.partner.partners;

export const selectActivePartners = (state) => 
  state.partner.partners.filter(p => p.is_active);

export const selectInactivePartners = (state) => 
  state.partner.partners.filter(p => !p.is_active);

export const selectSelectedPartner = (state) => state.partner.selectedPartner;

export const selectPartnerLoading = (state) => state.partner.loading;

export const selectPartnerError = (state) => state.partner.error;

export const selectPartnerSuccess = (state) => state.partner.success;

export const selectPartnerSuccessMessage = (state) => state.partner.successMessage;

// Get partners sorted by display order
export const selectPartnersByDisplayOrder = (state) => 
  [...state.partner.partners].sort((a, b) => a.display_order - b.display_order);

// Get active partners sorted by display order (for public display)
export const selectActivePartnersByDisplayOrder = (state) => 
  [...state.partner.partners]
    .filter(p => p.is_active)
    .sort((a, b) => a.display_order - b.display_order);

// Exports
export const { 
  clearError, 
  clearSuccess, 
  setSelectedPartner, 
  clearSelectedPartner,
  resetPartnerState,
  reorderPartners 
} = partnerSlice.actions;

export default partnerSlice.reducer;