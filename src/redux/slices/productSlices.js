import { createSlice } from "@reduxjs/toolkit";

export const productSlices = createSlice({
  name: "product",
  initialState: {
    products: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      item ? (item.quantity += action.payload.quantity) : state.products.push(action.payload);
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter( (item) => item.id !== action.payload );
    },
    incrementQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      item.quantity === 1 ? (item.quantity = 1) : item.quantity--;
    },
    resetCart: (state) => {
      state.products = [];
    },
  },
});
export const { addToCart, incrementQuantity, decrementQuantity, resetCart,deleteItem } = productSlices.actions;

export default productSlices.reducer;
