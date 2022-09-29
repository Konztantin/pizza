import { configureStore } from "@reduxjs/toolkit";
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

