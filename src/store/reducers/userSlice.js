import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    info: {},
    experiment: '',
  },
  reducers: {
    setUserInfo(state, action) {
      state.info = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
