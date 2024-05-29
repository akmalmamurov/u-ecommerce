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
import menuReducer from "../slices/menuSlices";
import orderServices from "../services/orderServices";
import clientServices from "../services/clientServices";
import clientReducer from "../slices/clientSlices";
import brandServices from "../services/brandServices";

const persistConfig = {
  key: "u-ecommerce",
  storage,
  // blacklist: [
  //   "menu",
  //   "categoryServices",
  //   "productAllServices",
  //   "order",
  //   "authServices",
  //   "basket",
  //   "login",
  //   "verify",
  //   "auth",
  // ],
};

const persistedProductReducer = persistReducer(persistConfig, productReducer);
const persistedFavouritReducer = persistReducer(persistConfig, favouritReducer);
const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedClientReducer = persistReducer(persistConfig, clientReducer);

export const store = configureStore({
  reducer: {
    product: persistedProductReducer,
    favourit: persistedFavouritReducer,
    auth: persistedAuthReducer,
    menu: menuReducer,
    clientLocal: persistedClientReducer,
    [categoryServices.reducerPath]: categoryServices.reducer,
    [productAllServices.reducerPath]: productAllServices.reducer,
    [loginServices.reducerPath]: loginServices.reducer,
    [basketServices.reducerPath]: basketServices.reducer,
    [verifyServices.reducerPath]: verifyServices.reducer,
    [orderServices.reducerPath]: orderServices.reducer,
    [clientServices.reducerPath]: clientServices.reducer,
    [brandServices.reducerPath]: brandServices.reducer,
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
      verifyServices.middleware,
      orderServices.middleware,
      clientServices.middleware,
      brandServices.middleware
    ),
});

export const persistor = persistStore(store);
