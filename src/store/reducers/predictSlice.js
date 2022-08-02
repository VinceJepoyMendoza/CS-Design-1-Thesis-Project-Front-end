import { createSlice } from '@reduxjs/toolkit';

const predictSlice = createSlice({
  name: 'predict',
  initialState: {
    datas: {},
  },
  reducers: {
    setDatas(state, action) {
      state.datas = action.payload;
    },
  },
});

export const predictActions = predictSlice.actions;
export default predictSlice;
