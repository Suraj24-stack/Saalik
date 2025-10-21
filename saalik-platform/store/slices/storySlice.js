import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Configure your API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('token'); // or your storage method
  return {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }
  };
};

// Async thunks for API calls

// Fetch all stories
export const fetchAllStories = createAsyncThunk(
  'story/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stories`, getAuthHeaders());
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch story by ID
export const fetchStoryById = createAsyncThunk(
  'story/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stories/${id}`, getAuthHeaders());
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Create new story
export const createStory = createAsyncThunk(
  'story/create',
  async (storyData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/stories`, storyData, getAuthHeaders());
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update story
export const updateStory = createAsyncThunk(
  'story/update',
  async ({ id, storyData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/stories/${id}`, storyData, getAuthHeaders());
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Delete story
export const deleteStory = createAsyncThunk(
  'story/delete',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/stories/${id}`, getAuthHeaders());
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Initial state
const initialState = {
  stories: [],
  selectedStory: null,
  loading: false,
  error: null,
  success: false,
};

// Create slice
const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    clearSelectedStory: (state) => {
      state.selectedStory = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all stories
      .addCase(fetchAllStories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStories.fulfilled, (state, action) => {
        state.loading = false;
        state.stories = action.payload;
        state.error = null;
      })
      .addCase(fetchAllStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch story by ID
      .addCase(fetchStoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedStory = action.payload;
        state.error = null;
      })
      .addCase(fetchStoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create story
      .addCase(createStory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createStory.fulfilled, (state, action) => {
        state.loading = false;
        state.stories.unshift(action.payload);
        state.success = true;
        state.error = null;
      })
      .addCase(createStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Update story
      .addCase(updateStory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateStory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.stories.findIndex(story => story.id === action.payload.id);
        if (index !== -1) {
          state.stories[index] = action.payload;
        }
        if (state.selectedStory?.id === action.payload.id) {
          state.selectedStory = action.payload;
        }
        state.success = true;
        state.error = null;
      })
      .addCase(updateStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Delete story
      .addCase(deleteStory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteStory.fulfilled, (state, action) => {
        state.loading = false;
        state.stories = state.stories.filter(story => story.id !== action.payload);
        if (state.selectedStory?.id === action.payload) {
          state.selectedStory = null;
        }
        state.success = true;
        state.error = null;
      })
      .addCase(deleteStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { clearError, clearSuccess, clearSelectedStory } = storySlice.actions;
export default storySlice.reducer;