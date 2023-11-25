import { configureStore } from '@reduxjs/toolkit';
// import authSlice from './auth/authSlice';
import { auth } from './auth/authThunk';

export const store = configureStore({
  reducer: {},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(auth.middleware),
});
