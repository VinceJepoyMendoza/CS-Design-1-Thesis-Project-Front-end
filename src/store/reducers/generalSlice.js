import { createSlice } from '@reduxjs/toolkit';

const generalSlice = createSlice({
  name: 'general',
  initialState: {
    isLoading: false,
    popupMessage: { show: false, type: 'info', message: '' },
  },
  reducers: {
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setPopupMessage(state, action) {
      state.popupMessage = action.payload;
    },
  },
});

export const generalActions = generalSlice.actions;
export default generalSlice;
