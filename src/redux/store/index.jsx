import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import modalReducer from "../slices/modalSlise";
import categoryServices from "../services/categoryServices";
import productAllServices from "../services/productAllServices";
import favouritSlices from "../slices/favouritSlices";
import productSlices from "../slices/productSlices";

const persistConfig = {
  key: "root",
  storage,
};

// const persistedProductReducer = persistReducer(persistConfig, productSlices);
// const persistedFavouritReducer = persistReducer(persistConfig, favouritSlices);

export const store = configureStore({
  reducer: {
    modal: modalReducer.reducer,
    product: productSlices,
    favourit: favouritSlices,
    [categoryServices.reducerPath]: categoryServices.reducer,
    [productAllServices.reducerPath]: productAllServices.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      categoryServices.middleware,
      productAllServices.middleware
    ),
});

// export const persistor = persistStore(store);
