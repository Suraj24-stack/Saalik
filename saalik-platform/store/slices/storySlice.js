// storySlice.js - UPDATED VERSION
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "https://saalik-api.prepedo.com/api/v1";

// =====================
// Async Thunks
// =====================

// Fetch all stories (with optional filters)
export const fetchAllStories = createAsyncThunk(
  "story/fetchAll",
  async ({ isPublished = null, sortBy = "created_at", order = "desc" } = {}, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      let url = `${API_BASE_URL}/stories?sortBy=${sortBy}&order=${order}`;
      if (isPublished !== null) url += `&isPublished=${isPublished}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data || response.data;
    } catch (err) {
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
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data || response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Fetch story by slug (public)
export const fetchStoryBySlug = createAsyncThunk(
  "story/fetchBySlug",
  async (slug, thunkAPI) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stories/slug/${slug}`);
      return response.data.data || response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Upload inline image (for rich text editor)
export const uploadInlineImage = createAsyncThunk(
  "story/uploadInlineImage",
  async (imageFile, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await axios.post(`${API_BASE_URL}/stories/upload-image`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Create story
export const createStory = createAsyncThunk(
  "story/create",
  async (storyData, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      
      Object.entries(storyData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === "featured_image" && value instanceof File) {
            formData.append(key, value);
          } else if (key !== "featured_image") {
            formData.append(key, value);
          }
        }
      });

      const res = await axios.post(`${API_BASE_URL}/stories`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`, 
          "Content-Type": "multipart/form-data" 
        },
      });
      
      return res.data.data || res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update story
export const updateStory = createAsyncThunk(
  "story/update",
  async ({ id, storyData }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      
      Object.entries(storyData).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (key === "featured_image" && value instanceof File) {
            formData.append(key, value);
          } else if (key !== "featured_image") {
            formData.append(key, value);
          }
        }
      });

      const res = await axios.put(`${API_BASE_URL}/stories/${id}`, formData, {
        headers: { 
          Authorization: `Bearer ${token}`, 
          "Content-Type": "multipart/form-data" 
        },
      });
      
      return res.data.data || res.data;
    } catch (err) {
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
      return id;
    } catch (err) {
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
      return res.data.data || res.data;
    } catch (err) {
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
      return res.data.data || res.data;
    } catch (err) {
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
      return res.data.data || res.data;
    } catch (err) {
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
    uploadingImage: false,
    uploadedImageUrl: null,
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
      state.uploadingImage = false;
      state.uploadedImageUrl = null;
    },
    clearUploadedImage: (state) => {
      state.uploadedImageUrl = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
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

      // Fetch By ID
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

      // Fetch By Slug
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

      // Upload Inline Image
      .addCase(uploadInlineImage.pending, (state) => {
        state.uploadingImage = true;
        state.error = null;
      })
      .addCase(uploadInlineImage.fulfilled, (state, action) => {
        state.uploadingImage = false;
        state.uploadedImageUrl = action.payload.url;
      })
      .addCase(uploadInlineImage.rejected, (state, action) => {
        state.uploadingImage = false;
        state.error = action.payload;
      })

      // Create
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

      // Update
      .addCase(updateStory.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
        state.success = false; 
        state.successMessage = null; 
      })
      .addCase(updateStory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.stories.findIndex(s => s.id === action.payload.id);
        if (index !== -1) state.stories[index] = action.payload;
        state.selectedStory = action.payload;
        state.success = true;
        state.successMessage = "Story updated successfully";
      })
      .addCase(updateStory.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      })

      // Delete
      .addCase(deleteStory.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
        state.success = false; 
        state.successMessage = null; 
      })
      .addCase(deleteStory.fulfilled, (state, action) => {
        state.loading = false;
        state.stories = state.stories.filter(s => s.id !== action.payload);
        if (state.selectedStory?.id === action.payload) state.selectedStory = null;
        state.success = true;
        state.successMessage = "Story deleted successfully";
      })
      .addCase(deleteStory.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      })

      // Publish
      .addCase(publishStory.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      })
      .addCase(publishStory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.stories.findIndex(s => s.id === action.payload.id);
        if (index !== -1) state.stories[index] = action.payload;
        if (state.selectedStory?.id === action.payload.id) state.selectedStory = action.payload;
        state.success = true;
        state.successMessage = "Story published successfully";
      })
      .addCase(publishStory.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      })

      // Unpublish
      .addCase(unpublishStory.pending, (state) => { 
        state.loading = true; 
        state.error = null; 
      })
      .addCase(unpublishStory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.stories.findIndex(s => s.id === action.payload.id);
        if (index !== -1) state.stories[index] = action.payload;
        if (state.selectedStory?.id === action.payload.id) state.selectedStory = action.payload;
        state.success = true;
        state.successMessage = "Story unpublished successfully";
      })
      .addCase(unpublishStory.rejected, (state, action) => { 
        state.loading = false; 
        state.error = action.payload; 
      })

      // Increment Views (silent)
      .addCase(incrementStoryViews.fulfilled, (state, action) => {
        const index = state.stories.findIndex(s => s.id === action.payload.id);
        if (index !== -1) state.stories[index].views = action.payload.views;
        if (state.selectedStory?.id === action.payload.id) {
          state.selectedStory.views = action.payload.views;
        }
      })
      .addCase(incrementStoryViews.rejected, (state, action) => { 
        console.error('Increment views failed:', action.payload); 
      });
  },
});

// =====================
// Selectors
// =====================
export const selectAllStories = (state) => state.story.stories;
export const selectPublishedStories = (state) => state.story.stories.filter(s => s.is_published);
export const selectDraftStories = (state) => state.story.stories.filter(s => !s.is_published);
export const selectSelectedStory = (state) => state.story.selectedStory;
export const selectStoryLoading = (state) => state.story.loading;
export const selectStoryError = (state) => state.story.error;
export const selectStorySuccess = (state) => state.story.success;
export const selectStorySuccessMessage = (state) => state.story.successMessage;
export const selectUploadingImage = (state) => state.story.uploadingImage;
export const selectUploadedImageUrl = (state) => state.story.uploadedImageUrl;
export const selectMostViewedStories = (state) =>
  [...state.story.stories].filter(s => s.is_published).sort((a, b) => b.views - a.views);
export const selectRecentPublishedStories = (state, limit = 5) =>
  [...state.story.stories].filter(s => s.is_published && s.published_at)
    .sort((a, b) => new Date(b.published_at) - new Date(a.published_at))
    .slice(0, limit);

// =====================
// Exports
// =====================
export const { 
  clearError, 
  clearSuccess, 
  setSelectedStory, 
  clearSelectedStory, 
  resetStoryState,
  clearUploadedImage 
} = storySlice.actions;

export default storySlice.reducer;