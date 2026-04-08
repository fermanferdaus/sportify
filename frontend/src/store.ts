import { configureStore } from '@reduxjs/toolkit';
import sportsReducer from './features/sportsSlice';
import authReducer from './features/authSlice';
import favoritesReducer from './features/favoritesSlice';

export const store = configureStore({
  reducer: {
    sports: sportsReducer,
    auth: authReducer,
    favorites: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
