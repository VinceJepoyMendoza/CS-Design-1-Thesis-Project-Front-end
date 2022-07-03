import { configureStore } from '@reduxjs/toolkit';
import generalSlice from './reducers/generalSlice';
import userSlice from './reducers/userSlice';
import productSlice from './reducers/productSlice';
import saleSlice from './reducers/salesSlice';

const store = configureStore({
  reducer: {
    general: generalSlice.reducer,
    user: userSlice.reducer,
    products: productSlice.reducer,
    sales: saleSlice.reducer,
  },
});

export default store;
