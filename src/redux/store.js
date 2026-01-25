import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { baseApi } from "./baseApi";
import { frameEditorApi } from "./features/frameEditor/frameEditor.api";

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    [frameEditorApi.reducerPath]: frameEditorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      baseApi.middleware,
      frameEditorApi.middleware,
    ),
});

setupListeners(store.dispatch);
