import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Configure your API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// Async thunks for API calls

// Fetch all contact submissions
export const fetchAllContacts = createAsyncThunk(
  'contact/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/contacts`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Fetch contact submission by ID
export const fetchContactById = createAsyncThunk(
  'contact/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/contacts/${id}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Create new contact submission (CLIENT FORM)
export const createContact = createAsyncThunk(
  'contact/create',
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/contacts`, contactData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update contact submission status
export const updateContactStatus = createAsyncThunk(
  'contact/updateStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/contacts/${id}/status`, { status });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Initial state
const initialState = {
  contacts: [],
  selectedContact: null,
  loading: false,
  error: null,
  success: false,
  // Statistics for dashboard
  stats: {
    total: 0,
    new: 0,
    in_progress: 0,
    resolved: 0,
    closed: 0,
  },
};

// Create slice
const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    clearSelectedContact: (state) => {
      state.selectedContact = null;
    },
    // Calculate statistics from contacts data
    calculateStats: (state) => {
      state.stats.total = state.contacts.length;
      state.stats.new = state.contacts.filter(item => item.status === 'new').length;
      state.stats.in_progress = state.contacts.filter(item => item.status === 'in_progress').length;
      state.stats.resolved = state.contacts.filter(item => item.status === 'resolved').length;
      state.stats.closed = state.contacts.filter(item => item.status === 'closed').length;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all contact submissions
      .addCase(fetchAllContacts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllContacts.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts = action.payload;
        state.error = null;
        // Auto-calculate stats
        state.stats.total = action.payload.length;
        state.stats.new = action.payload.filter(item => item.status === 'new').length;
        state.stats.in_progress = action.payload.filter(item => item.status === 'in_progress').length;
        state.stats.resolved = action.payload.filter(item => item.status === 'resolved').length;
        state.stats.closed = action.payload.filter(item => item.status === 'closed').length;
      })
      .addCase(fetchAllContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch contact submission by ID
      .addCase(fetchContactById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContactById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedContact = action.payload;
        state.error = null;
      })
      .addCase(fetchContactById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create new contact submission
      .addCase(createContact.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createContact.fulfilled, (state, action) => {
        state.loading = false;
        state.contacts.unshift(action.payload); // Add to beginning of array
        state.success = true;
        state.error = null;
      })
      .addCase(createContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      // Update contact status
      .addCase(updateContactStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateContactStatus.fulfilled, (state, action) => {
        state.loading = false;
        // Update in contacts array
        const index = state.contacts.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.contacts[index] = action.payload;
        }
        // Update selected contact if it matches
        if (state.selectedContact?.id === action.payload.id) {
          state.selectedContact = action.payload;
        }
        // Recalculate stats
        state.stats.total = state.contacts.length;
        state.stats.new = state.contacts.filter(item => item.status === 'new').length;
        state.stats.in_progress = state.contacts.filter(item => item.status === 'in_progress').length;
        state.stats.resolved = state.contacts.filter(item => item.status === 'resolved').length;
        state.stats.closed = state.contacts.filter(item => item.status === 'closed').length;
        
        state.success = true;
        state.error = null;
      })
      .addCase(updateContactStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { 
  clearError, 
  clearSuccess, 
  clearSelectedContact,
  calculateStats 
} = contactSlice.actions;

// Selectors for filtering
export const selectContactsByStatus = (state, status) => {
  if (status === 'all') return state.contact.contacts;
  return state.contact.contacts.filter(item => item.status === status);
};

export const selectNewContacts = (state) => {
  return state.contact.contacts.filter(item => item.status === 'new');
};

export const selectUnresolvedContacts = (state) => {
  return state.contact.contacts.filter(item => 
    item.status === 'new' || item.status === 'in_progress'
  );
};

export default contactSlice.reducer;