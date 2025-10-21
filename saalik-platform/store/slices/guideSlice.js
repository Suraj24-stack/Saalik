// store/slices/guideBookingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'YOUR_API_URL_HERE';

// Async thunk to fetch guide booking data
export const fetchGuideBookingData = createAsyncThunk(
  'guideBooking/fetchGuideBookingData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/guide-booking`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch guide booking data');
    }
  }
);

const guideBookingSlice = createSlice({
  name: 'guideBooking',
  initialState: {
    guideBookingData: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuideBookingData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGuideBookingData.fulfilled, (state, action) => {
        state.loading = false;
        state.guideBookingData = action.payload;
      })
      .addCase(fetchGuideBookingData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default guideBookingSlice.reducer;