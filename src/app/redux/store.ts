import { configureStore } from '@reduxjs/toolkit';
import descSlice from './desc/descSlice';
import { auth } from './auth/authThunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    [auth.reducerPath]: auth.reducer,
    descSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(auth.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
