import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../client';

// Async thunk to fetch notifications
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/c/c3fe-1100-48fa-90f3'); // Mock API endpoint
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch notifications');
    }
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default notificationSlice.reducer;

// Custom hook for useNotifications
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

export const useNotifications = () => {
  const dispatch = useDispatch();
  const { data, isLoading, error } = useSelector((state) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications());
  }, [dispatch]);

  return { data, isLoading, error };
};
