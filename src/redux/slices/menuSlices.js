import { createSlice } from "@reduxjs/toolkit";

const menuSlices = createSlice({
  name: "menu",
  initialState: {
    menuOpen: false,
  },
  reducers: {
    showMenu: (state) => {
      state.menuOpen = true;
    },
    hideMenu: (state,) => {
      state.menuOpen = false;
    },
    toggleMenu: (state) => {
      state.menuOpen = !state.menuOpen;
    },
  },
});

export const { showMenu, hideMenu ,toggleMenu} = menuSlices.actions;
export default menuSlices.reducer;
