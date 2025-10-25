import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

// =====================
// Async Thunks
// =====================

// Fetch all stories (with optional filters)
export const fetchAllStories = createAsyncThunk(
  "story/fetchAll",
  async ({ isPublished = null, sortBy = 'created_at', order = 'desc' } = {}, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      let url = `${API_BASE_URL}/stories?sortBy=${sortBy}&order=${order}`;
      
      if (isPublished !== null) {
        url += `&isPublished=${isPublished}`;
      }
      
      const response = await axios.get(url, {
        headers: { 
          Authorization: `Bearer ${token}` 
        },
      });
      console.log('Fetch All Stories Response:', response.data);
      return response.data.data || response.data;
    } catch (err) {
      console.error('Fetch All Stories Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Fetch single story by ID
export const fetchStoryById = createAsyncThunk(
  "story/fetchById",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/stories/${id}`, {
        headers: { 
          Authorization: `Bearer ${token}` 
        },
      });
      console.log('Fetch Story By ID Response:', response.data);
      return response.data.data || response.data;
    } catch (err) {
      console.error('Fetch Story By ID Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Fetch story by slug (for public view)
export const fetchStoryBySlug = createAsyncThunk(
  "story/fetchBySlug",
  async (slug, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stories/slug/${slug}`);
      console.log('Fetch Story By Slug Response:', response.data);
      return response.data.data || response.data;
    } catch (err) {
      console.error('Fetch Story By Slug Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Create new story
export const createStory = createAsyncThunk(
  "story/create",
  async (storyData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      
      const formData = new FormData();
      
      // Append all fields from the model
      if (storyData.title) formData.append('title', storyData.title);
      if (storyData.slug) formData.append('slug', storyData.slug);
      if (storyData.location) formData.append('location', storyData.location);
      if (storyData.summary) formData.append('summary', storyData.summary);
      if (storyData.content) formData.append('content', storyData.content);
      if (storyData.image_alt) formData.append('image_alt', storyData.image_alt);
      if (storyData.is_published !== undefined) formData.append('is_published', storyData.is_published);
      if (storyData.published_at) formData.append('published_at', storyData.published_at);
      
      // Handle featured image file upload
      if (storyData.featured_image && storyData.featured_image instanceof File) {
        formData.append('featured_image', storyData.featured_image);
      }
      
      // Log the FormData contents for debugging
      console.log('Creating story...');
      for (let pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }
      
      const res = await axios.post(`${API_BASE_URL}/stories`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log('Create Story Response:', res.data);
      return res.data.data || res.data;
    } catch (err) {
      console.error('Create Story Error:', err.response?.data || err.message);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update story
export const updateStory = createAsyncThunk(
  "story/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      
      const formData = new FormData();
      
      // Append all fields from the model
      if (data.title) formData.append('title', data.title);
      if (data.slug) formData.append('slug', data.slug);
      if (data.location !== undefined) formData.append('location', data.location);
      if (data.summary !== undefined) formData.append('summary', data.summary);
      if (data.content) formData.append('content', data.content);
      if (data.image_alt !== undefined) formData.append('image_alt', data.image_alt);
      if (data.is_published !== undefined) formData.append('is_published', data.is_published);
      if (data.published_at !== undefined) formData.append('published_at', data.published_at);
      
      // Handle featured image file upload
      if (data.featured_image && data.featured_image instanceof File) {
        formData.append('featured_image', data.featured_image);
      }
      
      // Log the FormData contents for debugging
      console.log('Updating story with ID:', id);
      for (let pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1]);
      }
      
      const res = await axios.put(`${API_BASE_URL}/stories/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log('Update Story Response:', res.data);
      return res.data.data || res.data;
    } catch (err) {
      console.error('Update Story Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete story
export const deleteStory = createAsyncThunk(
  "story/delete",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/stories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Delete Story Success for ID:', id);
      return id;
    } catch (err) {
      console.error('Delete Story Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Publish story
export const publishStory = createAsyncThunk(
  "story/publish",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${API_BASE_URL}/stories/${id}/publish`,
        {},
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );
      console.log('Publish Story Response:', res.data);
      return res.data.data || res.data;
    } catch (err) {
      console.error('Publish Story Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Unpublish story
export const unpublishStory = createAsyncThunk(
  "story/unpublish",
  async (id, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(
        `${API_BASE_URL}/stories/${id}/unpublish`,
        {},
        {
          headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );
      console.log('Unpublish Story Response:', res.data);
      return res.data.data || res.data;
    } catch (err) {
      console.error('Unpublish Story Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Increment story views
export const incrementStoryViews = createAsyncThunk(
  "story/incrementViews",
  async (id, thunkAPI) => {
    try {
      const res = await axios.patch(`${API_BASE_URL}/stories/${id}/view`);
      console.log('Increment Views Response:', res.data);
      return res.data.data || res.data;
    } catch (err) {
      console.error('Increment Views Error:', err);
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// =====================
// Slice
// =====================
const storySlice = createSlice({
  name: "story",
  initialState: {
    stories: [],
    selectedStory: null,
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
    setSelectedStory: (state, action) => {
      state.selectedStory = action.payload;
    },
    clearSelectedStory: (state) => {
      state.selectedStory = null;
    },
    resetStoryState: (state) => {
      state.stories = [];
      state.selectedStory = null;
      state.loading = false;
      state.error = null;
      state.success = false;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Stories
      .addCase(fetchAllStories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllStories.fulfilled, (state, action) => {
        state.loading = false;
        state.stories = action.payload;
      })
      .addCase(fetchAllStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Story By ID
      .addCase(fetchStoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStoryById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedStory = action.payload;
      })
      .addCase(fetchStoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Fetch Story By Slug
      .addCase(fetchStoryBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStoryBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedStory = action.payload;
      })
      .addCase(fetchStoryBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create Story
      .addCase(createStory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.successMessage = null;
      })
      .addCase(createStory.fulfilled, (state, action) => {
        state.loading = false;
        state.stories.unshift(action.payload);
        state.success = true;
        state.successMessage = "Story created successfully";
      })
      .addCase(createStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Update Story
      .addCase(updateStory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.successMessage = null;
      })
      .addCase(updateStory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.stories.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.stories[index] = action.payload;
        }
        state.selectedStory = action.payload;
        state.success = true;
        state.successMessage = "Story updated successfully";
      })
      .addCase(updateStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Delete Story
      .addCase(deleteStory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.successMessage = null;
      })
      .addCase(deleteStory.fulfilled, (state, action) => {
        state.loading = false;
        state.stories = state.stories.filter(s => s.id !== action.payload);
        if (state.selectedStory?.id === action.payload) {
          state.selectedStory = null;
        }
        state.success = true;
        state.successMessage = "Story deleted successfully";
      })
      .addCase(deleteStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Publish Story
      .addCase(publishStory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishStory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.stories.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.stories[index] = action.payload;
        }
        if (state.selectedStory?.id === action.payload.id) {
          state.selectedStory = action.payload;
        }
        state.success = true;
        state.successMessage = "Story published successfully";
      })
      .addCase(publishStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Unpublish Story
      .addCase(unpublishStory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(unpublishStory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.stories.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.stories[index] = action.payload;
        }
        if (state.selectedStory?.id === action.payload.id) {
          state.selectedStory = action.payload;
        }
        state.success = true;
        state.successMessage = "Story unpublished successfully";
      })
      .addCase(unpublishStory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Increment Views
      .addCase(incrementStoryViews.pending, (state) => {
        // Don't set loading for view increment (silent operation)
      })
      .addCase(incrementStoryViews.fulfilled, (state, action) => {
        // Update view count in selected story and stories list
        if (state.selectedStory?.id === action.payload.id) {
          state.selectedStory.views = action.payload.views;
        }
        const index = state.stories.findIndex(s => s.id === action.payload.id);
        if (index !== -1) {
          state.stories[index].views = action.payload.views;
        }
      })
      .addCase(incrementStoryViews.rejected, (state, action) => {
        // Silent fail for view increment
        console.error('Failed to increment views:', action.payload);
      });
  },
});

// =====================
// Selectors
// =====================
export const selectAllStories = (state) => state.story.stories;

export const selectPublishedStories = (state) => 
  state.story.stories.filter(s => s.is_published);

export const selectDraftStories = (state) => 
  state.story.stories.filter(s => !s.is_published);

export const selectSelectedStory = (state) => state.story.selectedStory;

export const selectStoryLoading = (state) => state.story.loading;

export const selectStoryError = (state) => state.story.error;

export const selectStorySuccess = (state) => state.story.success;

export const selectStorySuccessMessage = (state) => state.story.successMessage;

// Get stories sorted by views (most viewed)
export const selectMostViewedStories = (state) => 
  [...state.story.stories]
    .filter(s => s.is_published)
    .sort((a, b) => b.views - a.views);

// Get recent published stories
export const selectRecentPublishedStories = (state, limit = 5) => 
  [...state.story.stories]
    .filter(s => s.is_published && s.published_at)
    .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
    .slice(0, limit);

// Exports
export const { 
  clearError, 
  clearSuccess, 
  setSelectedStory, 
  clearSelectedStory,
  resetStoryState 
} = storySlice.actions;

export default storySlice.reducer;