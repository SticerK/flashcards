import { createSlice } from '@reduxjs/toolkit';
import { authRegister } from './authThunk';

export interface AuthInterface {
  user: any;
  token: string;
}

const initialState: AuthInterface = {
  user: null,
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authRegister.fulfilled, (state, action) => {
      state.user = action.payload;
    });
  },
});

export default authSlice.reducer;
