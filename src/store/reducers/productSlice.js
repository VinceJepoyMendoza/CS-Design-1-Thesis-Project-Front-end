import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    currProduct: {
      name: '',
      category: '',
      price: 0,
      stock: 0,
      size: '',
      color: '',
      flavor: '',
    },
  },
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    setCurrProduct(state, action) {
      state.currProduct = { ...state.currProduct, ...action.payload };
    },
    resetCurrProduct(state, action) {
      state.currProduct = {
        name: '',
        category: '',
        price: 0,
        stock: 0,
        size: '',
        color: '',
        flavor: '',
      };
    },
    setCurrProdName(state, action) {
      state.currProduct.name = action.payload;
    },
    setCurrProdCategory(state, action) {
      state.currProduct.category = action.payload;
    },
    setCurrProdPrice(state, action) {
      state.currProduct.price = action.payload;
    },
    setCurrProdStock(state, action) {
      state.currProduct.stock = action.payload;
    },
    setCurrProdSize(state, action) {
      state.currProduct.size = action.payload;
    },
    setCurrProdColor(state, action) {
      state.currProduct.color = action.payload;
    },
    setCurrProdFlavor(state, action) {
      state.currProduct.flavor = action.payload;
    },
  },
});

export const productActions = productSlice.actions;
export default productSlice;
