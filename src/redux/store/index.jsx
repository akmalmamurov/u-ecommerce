import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../slices/modalSlise";
import navbarReducer from "../slices/navbarSlice";

export const store = configureStore({
  reducer: {
    modal: modalReducer.reducer,
    navbar: navbarReducer.reducer,
  },
});
