import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import cartslice from "./slices/cartSlice";
import filterSlice from "./slices/filterSlice";
import pizzasSlice from "./slices/pizzasSlice";

export const store = configureStore({
  reducer: {
    filter: filterSlice,
    cart: cartslice,
    pizzas: pizzasSlice
  },
});

export type RootState = ReturnType<typeof store.getState>

 type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
