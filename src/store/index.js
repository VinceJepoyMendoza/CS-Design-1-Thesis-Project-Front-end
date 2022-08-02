import { configureStore } from '@reduxjs/toolkit';
import generalSlice from './reducers/generalSlice';
import userSlice from './reducers/userSlice';
import productSlice from './reducers/productSlice';

const store = configureStore({
  reducer: {
    general: generalSlice.reducer,
    user: userSlice.reducer,
    products: productSlice.reducer,
  },
});

export default store;
