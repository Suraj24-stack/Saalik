// src/store/slices/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../lib/api';

// ============================================
// ASYNC THUNKS
// ============================================

// Fetch user profile
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users/profile');
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch profile');
    }
  }
);

// Update user profile
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await api.put('/users/profile', profileData);
      
      // Update localStorage with new user data
      if (response.data && typeof window !== 'undefined') {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUser = { ...currentUser, ...response.data };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update profile');
    }
  }
);

// Change password
export const changePassword = createAsyncThunk(
  'user/changePassword',
  async ({ currentPassword, newPassword }, { rejectWithValue }) => {
    try {
      const response = await api.put('/users/change-password', {
        currentPassword,
        newPassword
      });
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to change password');
    }
  }
);

// Upload profile picture
export const uploadProfilePicture = createAsyncThunk(
  'user/uploadProfilePicture',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/profile/picture', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Update localStorage
      if (response.data && typeof window !== 'undefined') {
        const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUser = { ...currentUser, profile_picture: response.data.profile_picture };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      return response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to upload profile picture');
    }
  }
);

// ============================================
// INITIAL STATE
// ============================================

const initialState = {
  profile: null,
  isLoading: false,
  isUpdating: false,
  error: null,
  updateSuccess: false,
  passwordChangeSuccess: false,
  stats: {
    totalApplications: 0,
    approved: 0,
    underReview: 0,
    pending: 0,
    rejected: 0
  }
};

// ============================================
// USER SLICE
// ============================================

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUpdateSuccess: (state) => {
      state.updateSuccess = false;
      state.passwordChangeSuccess = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateStats: (state, action) => {
      state.stats = action.payload;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // ============================================
      // FETCH PROFILE
      // ============================================
      .addCase(fetchUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload.data || action.payload.user || action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // ============================================
      // UPDATE PROFILE
      // ============================================
      .addCase(updateUserProfile.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
        state.updateSuccess = false;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isUpdating = false;
        
        // Handle different response structures
        const userData = action.payload.data || action.payload.user || action.payload;
        state.profile = { ...state.profile, ...userData };
        state.updateSuccess = true;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload;
        state.updateSuccess = false;
      })
      
      // ============================================
      // CHANGE PASSWORD
      // ============================================
      .addCase(changePassword.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
        state.passwordChangeSuccess = false;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isUpdating = false;
        state.passwordChangeSuccess = true;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload;
        state.passwordChangeSuccess = false;
      })
      
      // ============================================
      // UPLOAD PROFILE PICTURE
      // ============================================
      .addCase(uploadProfilePicture.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(uploadProfilePicture.fulfilled, (state, action) => {
        state.isUpdating = false;
        if (state.profile) {
          state.profile.profile_picture = action.payload.data?.profile_picture || action.payload.profile_picture;
        }
        state.updateSuccess = true;
        state.error = null;
      })
      .addCase(uploadProfilePicture.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload;
      });
  }
});

// ============================================
// ACTIONS & SELECTORS
// ============================================

export const { clearUpdateSuccess, clearError, updateStats, setProfile } = userSlice.actions;

// Selectors
export const selectProfile = (state) => state.user.profile;
export const selectIsLoading = (state) => state.user.isLoading;
export const selectIsUpdating = (state) => state.user.isUpdating;
export const selectError = (state) => state.user.error;
export const selectUpdateSuccess = (state) => state.user.updateSuccess;
export const selectPasswordChangeSuccess = (state) => state.user.passwordChangeSuccess;
export const selectStats = (state) => state.user.stats;

export default userSlice.reducer;