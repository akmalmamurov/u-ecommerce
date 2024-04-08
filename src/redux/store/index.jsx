import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../slices/modalSlise";

export const store = configureStore({
  reducer: {
    modal: modalReducer.reducer,
  },
});
