import { createSlice } from "@reduxjs/toolkit";

export const favouritSlices = createSlice({
  name: "favourit",
  initialState: {
    favourites: [],
  },
  reducers: {
    toggleFavourit: (state, action) => {
      const itemIndex = state.favourites.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1) {
        state.favourites.splice(itemIndex, 1);
      } else {
        state.favourites.push(action.payload);
      }
    },
  },
});

export const { toggleFavourit } = favouritSlices.actions;
export default favouritSlices.reducer;
