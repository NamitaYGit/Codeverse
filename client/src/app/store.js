import rootReducer from "./rootReducer";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import { authApi } from "../features/api/authApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { courseApi } from "../features/api/courseApi";
import { purchaseApi } from "../features/api/purchaseApi";
import { courseProgressApi } from "../features/api/courseProgressApi";
export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (defaultMiddleware) =>
    defaultMiddleware().concat(authApi.middleware,courseApi.middleware,purchaseApi.middleware,courseProgressApi.middleware),
});
setupListeners(appStore.dispatch);
const initializeApp =async ()=>
{
    await appStore.dispatch(authApi.endpoints.loadUser.initiate({},{forceRefetch:true}))
}
initializeApp();
