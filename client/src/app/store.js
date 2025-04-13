import rootReducer from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import { authApi } from "../features/api/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { courseApi } from "../features/api/courseApi";
export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(authApi.middleware,courseApi.middleware),
});
setupListeners(appStore.dispatch);
