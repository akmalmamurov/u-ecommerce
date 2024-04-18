import { createSlice } from "@reduxjs/toolkit";

export const productSlices = createSlice({
  name: "product",
  initialState: {
    products: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
  },
});
export const { addToCart } = productSlices.actions;

export default productSlices;
