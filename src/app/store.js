import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
  // The key for the reducer is dynamically set using `apiSlice.reducerPath`
  // which is typically a string representing the API slice's path.
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // The default middleware is used, and the API slice middleware is added
  // to handle async actions such as API requests.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  // Enabling Redux DevTools in the browser
  devTools: true,
});
