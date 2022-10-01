import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { calcTotalPrice } from "../../../utils/calcTotalPrice";
import { getCartFromLS } from "../../../utils/getCartFromLS";
import { CartSliseState, CartItemType } from "./types";


const { items, totalPrise } = getCartFromLS()

const initialState: CartSliseState = {
  items: items,
  totalPrise: totalPrise,
};

export const cartslice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id);

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({ ...action.payload, count: 1 });
      }

      state.totalPrise = calcTotalPrice(state.items)
    },

    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((obj) => obj.id === action.payload);

      if (findItem) {
        findItem.count--;
      }

      state.totalPrise = calcTotalPrice(state.items)

    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload);

      state.totalPrise = calcTotalPrice(state.items)
    },
    clearItems(state) {
      state.items = [];
      state.totalPrise = 0;
    },
  },
});

export const { addItem, removeItem, clearItems, minusItem } = cartslice.actions;

export default cartslice.reducer;
