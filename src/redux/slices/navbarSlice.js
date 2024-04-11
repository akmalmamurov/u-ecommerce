import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

const navbarReducer = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    setCategories(state, action) {
      state.data = action.payload;
    },
  },
});

export const { setCategories } = navbarReducer.actions;

export default navbarReducer;
