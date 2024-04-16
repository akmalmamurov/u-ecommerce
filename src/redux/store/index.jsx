import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../slices/modalSlise";
import navbarReducer from "../slices/navbarSlice";
import categoryServices from "../services/categoryServices";
import productAllServices from "../services/productAllServices";

export const store = configureStore({
  reducer: {
    modal: modalReducer.reducer,
    navbar: navbarReducer.reducer,
    [categoryServices.reducerPath]: categoryServices.reducer,
    [productAllServices.reducerPath]: productAllServices.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoryServices.middleware,
      productAllServices.middleware
    ),
});
