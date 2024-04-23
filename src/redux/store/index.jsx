import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import categoryServices from "../services/categoryServices";
import productAllServices from "../services/productAllServices";
import favouritReducer from "../slices/favouritSlices";
import productReducer from "../slices/productSlices";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["modal", "categoryServices", "productAllServices"],
};

const persistedProductReducer = persistReducer(persistConfig, productReducer);
const persistedFavouritReducer = persistReducer(persistConfig, favouritReducer);

export const store = configureStore({
  reducer: {
    product: persistedProductReducer,
    favourit: persistedFavouritReducer,
    [categoryServices.reducerPath]: categoryServices.reducer,
    [productAllServices.reducerPath]: productAllServices.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(categoryServices.middleware, productAllServices.middleware),
});

export const persistor = persistStore(store);
