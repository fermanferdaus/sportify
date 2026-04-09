import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import api from '../lib/api';
import type { RootState } from '../store';

interface FavoriteItem {
  id: number;
  team_id: string;
  team_name: string;
  team_badge: string;
  league_name: string;
}

interface FavoritesState {
  items: FavoriteItem[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: FavoritesState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchFavorites = createAsyncThunk('favorites/fetch', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('/favorites');
    return response.data.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data.message || 'Failed to fetch favorites');
  }
});

export const addFavorite = createAsyncThunk('favorites/add', async (team: { team_id: string, team_name: string, team_badge: string, league_name: string }, { rejectWithValue }) => {
  try {
    const response = await api.post('/favorites', team);
    return response.data.data;
  } catch (err: any) {
    return rejectWithValue(err.response.data.message || 'Failed to add favorite');
  }
});

export const removeFavorite = createAsyncThunk('favorites/remove', async (favoriteId: number, { rejectWithValue }) => {
  try {
    await api.delete(`/favorites/${favoriteId}`);
    return favoriteId;
  } catch (err: any) {
    return rejectWithValue(err.response.data.message || 'Failed to remove favorite');
  }
});

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFavorites.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<FavoriteItem[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(addFavorite.fulfilled, (state, action: PayloadAction<FavoriteItem>) => {
        state.items.push(action.payload);
      })
      .addCase(removeFavorite.fulfilled, (state, action: PayloadAction<number>) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export const selectFavorites = (state: RootState) => state.favorites.items;
export const selectIsTeamFavorite = (state: RootState, teamId?: string) => 
  state.favorites.items.find(item => item.team_id === teamId);

export default favoritesSlice.reducer;
