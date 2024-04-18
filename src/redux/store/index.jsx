import { configureStore } from "@reduxjs/toolkit";
import modalReducer from "../slices/modalSlise";
import navbarReducer from "../slices/navbarSlice";
import categoryServices from "../services/categoryServices";
import productAllServices from "../services/productAllServices";
import productSlices from "../slices/productSlices";
import favouritSlices from "../slices/favouritSlices";

export const store = configureStore({
  reducer: {
    modal: modalReducer.reducer,
    navbar: navbarReducer.reducer,
    product: productSlices.reducer,
    favourit: favouritSlices.reducer,
    [categoryServices.reducerPath]: categoryServices.reducer,
    [productAllServices.reducerPath]: productAllServices.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoryServices.middleware,
      productAllServices.middleware
    ),
});
