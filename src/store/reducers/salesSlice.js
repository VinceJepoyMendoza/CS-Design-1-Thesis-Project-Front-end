import { createSlice } from '@reduxjs/toolkit';

const saleSlice = createSlice({
  name: 'sales',
  initialState: {
    trainData: [
      {
        interval: 0,
        price: 0,
        stock: 0,
        sale: 0,
      },
    ],
  },
  reducers: {
    setSales(state, action) {
      state.trainData = action.payload;
    },
    // addSale(state, action) {
    //   state.trainData.push({
    //     interval: 0,
    //     price: 0,
    //     stock: 0,
    //     sale: 0,
    //   });
    // },
    // editSale(state, action) {
    //   const {index, interval, price, stock, sale} = action
    // }
  },
});

export const salesActions = saleSlice.actions;
export default saleSlice;
