import { createSlice } from '@reduxjs/toolkit';
import { IDeckSlice } from './types';

export const initialState: IDeckSlice = {
  filters: {
    currentPage: 1,
    maxCardsCount: 6,
    minCardsCount: 2,
  },
};

const descSlice = createSlice({
  name: 'descSlice',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
});

export default descSlice.reducer;

export const { setFilters } = descSlice.actions;
