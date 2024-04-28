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
import authReducer from "../slices/authSlices";
import loginServices from "../services/loginServices";
import basketServices from "../services/basketServices";
import verifyServices from "../services/verifyServices";

const persistConfig = {
  key: "root",
  storage,
  blacklist: [
    "modal",
    "categoryServices",
    "productAllServices",
    "authServices",
    "basket",
    "login",
    "verify",
    "auth",
  ],
};

const persistedProductReducer = persistReducer(persistConfig, productReducer);
const persistedFavouritReducer = persistReducer(persistConfig, favouritReducer);
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    product: persistedProductReducer,
    favourit: persistedFavouritReducer,
    auth: persistedAuthReducer,
    [categoryServices.reducerPath]: categoryServices.reducer,
    [productAllServices.reducerPath]: productAllServices.reducer,
    [loginServices.reducerPath]: loginServices.reducer,
    [basketServices.reducerPath]: basketServices.reducer,
    [verifyServices.reducerPath]: verifyServices.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      categoryServices.middleware,
      productAllServices.middleware,
      loginServices.middleware,
      basketServices.middleware,
      verifyServices.middleware
    ),
});

export const persistor = persistStore(store);
