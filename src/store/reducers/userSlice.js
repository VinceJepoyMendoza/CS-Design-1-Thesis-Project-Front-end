import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    info: {
      fname: '',
      mname: '',
      lname: '',
      contact: '',
      email: '',
    },
    userList: [],
  },
  reducers: {
    setUserInfo(state, action) {
      state.info = action.payload;
    },
    setUserFname(state, action) {
      state.info.fname = action.payload;
    },
    setUserMname(state, action) {
      state.info.mname = action.payload;
    },
    setUserLname(state, action) {
      state.info.lname = action.payload;
    },
    setUserContact(state, action) {
      state.info.contact = action.payload;
    },
    setUserEmail(state, action) {
      state.info.email = action.payload;
    },
    setUsers(state, action) {
      state.userList = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice;
