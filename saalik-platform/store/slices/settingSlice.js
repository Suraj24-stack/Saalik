import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Configure your API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Async thunks for API calls

// Fetch all settings
export const fetchAllSettings = createAsyncThunk(
  'setting/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/settings`);
      return response.data.data; // Assuming response format: { success: true, data: [...] }
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch setting by key
export const fetchSettingByKey = createAsyncThunk(
  'setting/fetchByKey',
  async (key, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/settings/${key}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update setting
export const updateSetting = createAsyncThunk(
  'setting/update',
  async ({ key, setting_value }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/settings/${key}`, { setting_value });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Initial state
const initialState = {
  settings: [],
  selectedSetting: null,
  settingsMap: {}, // Key-value map for quick access: { key: value }
  loading: false,
  error: null,
  success: false,
};

// Create slice
const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    clearSelectedSetting: (state) => {
      state.selectedSetting = null;
    },
    // Helper to update settings map from array
    updateSettingsMap: (state) => {
      state.settingsMap = state.settings.reduce((acc, setting) => {
        acc[setting.setting_key] = setting.setting_value;
        return acc;
      }, {});
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all settings
      .addCase(fetchAllSettings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSettings.fulfilled, (state, action) => {
        state.loading = false;
        state.settings = action.payload;
        // Create a map for easy access to settings by key
        state.settingsMap = action.payload.reduce((acc, setting) => {
          acc[setting.setting_key] = setting.setting_value;
          return acc;
        }, {});
        state.error = null;
      })
      .addCase(fetchAllSettings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch setting by key
      .addCase(fetchSettingByKey.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSettingByKey.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedSetting = action.payload;
        state.error = null;
      })
      .addCase(fetchSettingByKey.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update setting
      .addCase(updateSetting.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateSetting.fulfilled, (state, action) => {
        state.loading = false;
        // Update in settings array
        const index = state.settings.findIndex(
          setting => setting.setting_key === action.payload.setting_key
        );
        if (index !== -1) {
          state.settings[index] = action.payload;
        }
        // Update in settings map
        state.settingsMap[action.payload.setting_key] = action.payload.setting_value;
        // Update selected setting if it matches
        if (state.selectedSetting?.setting_key === action.payload.setting_key) {
          state.selectedSetting = action.payload;
        }
        state.success = true;
        state.error = null;
      })
      .addCase(updateSetting.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { 
  clearError, 
  clearSuccess, 
  clearSelectedSetting, 
  updateSettingsMap 
} = settingSlice.actions;

export default settingSlice.reducer;