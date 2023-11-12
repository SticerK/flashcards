import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import { auth } from './auth/authThunk';

export const store = configureStore({
  reducer: {
    authSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(auth.middleware),
});
