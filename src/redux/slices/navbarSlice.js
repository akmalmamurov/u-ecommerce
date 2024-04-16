import { createSlice } from "@reduxjs/toolkit";

export const navbarReducer = createSlice({
  name: "navbar",
  initialState: {
    categories: [],
    error: null,
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
      state.error = null; 
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCategories, setError } = navbarReducer.actions;

export default navbarReducer;
