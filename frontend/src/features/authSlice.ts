import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import api from '../lib/api';

interface User {
  id: number;
  name: string;
  email: string;
  profile_picture?: string | null;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  status: 'idle',
  error: null,
};

export const loginUser = createAsyncThunk('auth/login', async (credentials: any, { rejectWithValue }) => {
  try {
    const response = await api.post('/login', credentials);
    const { data } = response.data;
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  } catch (err: any) {
    const message = err.response?.data?.errors 
      ? Object.values(err.response.data.errors).flat()[0] 
      : (err.response?.data?.message || 'Login failed');
    return rejectWithValue(message);
  }
});

export const registerUser = createAsyncThunk('auth/register', async (userData: any, { rejectWithValue }) => {
  try {
    const response = await api.post('/register', userData);
    const { data } = response.data;
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  } catch (err: any) {
    const message = err.response?.data?.errors 
      ? Object.values(err.response.data.errors).flat()[0] 
      : (err.response?.data?.message || 'Registration failed');
    return rejectWithValue(message);
  }
});

export const logoutUser = createAsyncThunk('auth/logout', async (_, { }) => {
  try {
    await api.post('/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return null;
  } catch (err: any) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return null;
  }
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (formData: FormData, { rejectWithValue }) => {
  try {
    const response = await api.post('/profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    const { data } = response.data;
    localStorage.setItem('user', JSON.stringify(data));
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data?.message || 'Update profile failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.status = 'idle';
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
