import { createSlice } from "@reduxjs/toolkit";

export const favouritSlices = createSlice({
  name: "favourit",
  initialState: {
    favourites: [],
  },
  reducers: {
    addToFavourit: (state, action) => {
        const item = state.favourites.find((item) => item.id === action.payload.id);
        if (item) {
          item.quantity += action.payload.quantity;
        } else {
          state.favourites.push(action.payload);
        }
      },
  },
});

export const { addToFavourit } = favouritSlices.actions;
export default favouritSlices;
