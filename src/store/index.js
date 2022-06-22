import { configureStore } from '@reduxjs/toolkit';
import generalSlice from './reducers/generalSlice';
import userSlice from './reducers/userSlice';

const store = configureStore({
  reducer: {
    general: generalSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
