import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice;
