import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api";
import basketReducer from "./basket";
import shoppingListReducer from "./shoppingList";
import authReducer from "./auth";
import favouritesReducer from "./favourites";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    basket: basketReducer,
    shoppingList: shoppingListReducer,
    auth: authReducer,
    favourites: favouritesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
export type RootState = ReturnType<typeof store.getState>;
