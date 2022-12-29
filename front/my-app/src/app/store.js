import { configureStore, combineReducers } from "@reduxjs/toolkit";
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
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
//reducers
import cartReducer from "./Slices/cartSlice";
import productReducer from "./Slices/productSlice";
import userReducer from "./Slices/userSlice";
import orderReducer from "./Slices/orderSlice";
import adminReducer from "./Slices/adminSlice";

const persistConfig = {
  //takes all variables from reducers and saves them to local storage
  key: "root",
  storage,
  blacklist: ["admin", "cart", "order"], //ignored reducers
};

const cartPersistConfig = {
  //config which variables will be ignored by persist in a specific reducer
  key: "cart",
  storage,
  blacklist: ["cartShownStatus"],
};

const orderPersistConfig = {
  key: "order",
  storage,
  blacklist: ["formSubmit", "paymentMethod"],
};

const rootReducer = combineReducers({
  //makes combinate reducer from all reducers and their configurations
  admin: adminReducer,
  user: userReducer,
  product: productReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
  order: persistReducer(orderPersistConfig, orderReducer),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
