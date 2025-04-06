import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice"
import rootReducer from "./rootReducer";
import { authApi } from "../features/api/authApi";
import { setupListeners } from "@reduxjs/toolkit/query/react";
export  const appStore = configureStore({

    reducer: rootReducer,
    middelware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(authApi.middleware),
});
setupListeners(appStore.dispatch);

export default appStore;
