import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import storage from "redux-persist/lib/storage";
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
import { emptySplitApi } from "./services/api/emptySplitApi";
import authReducer from "./services/slice/authSlice";
import chatReducer from "./services/slice/chatSlice";
import loadingReducer from "./services/slice/loadingSlice";
import { rtkQueryErrorLogger } from "./services/rtkQueryErrorLogger";
const persistConfig = {
  key: "auth",
  version: 1,
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  loading: loadingReducer,
  [emptySplitApi.reducerPath]: emptySplitApi.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Redux persist
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
      .concat(rtkQueryErrorLogger)
      .concat(emptySplitApi.middleware),
});
export const persistor = persistStore(store);
export default store;

// // optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// // see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(store.dispatch);
