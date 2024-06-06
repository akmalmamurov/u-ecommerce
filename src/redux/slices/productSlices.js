import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.min(item.quantity + action.payload.quantity, 10);
      } else {
        state.products.push({ ...action.payload, quantity: Math.min(action.payload.quantity, 10) });
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter((item) => item.id !== action.payload);
    },
    deleteItems: (state, action) => {
      const idsToDelete = action.payload;
      state.products = state.products.filter((item) => !idsToDelete.includes(item.id));
    },
    incrementQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      if (item) item.quantity = Math.min(item.quantity + 1, 10);
    },
    decrementQuantity: (state, action) => {
      const item = state.products.find((item) => item.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          state.products = state.products.filter((product) => product.id !== action.payload);
        }
      }
    },
    resetCart: (state) => {
      state.products = [];
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  resetCart,
  deleteItem,
  deleteItems,
} = productSlice.actions;

export default productSlice.reducer;
