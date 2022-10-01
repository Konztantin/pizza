import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import cartslice from "./slices/cart/slice";
import filterSlice from "./slices/filter/slice";
import pizzasSlice from "./slices/pizza/slice";

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
