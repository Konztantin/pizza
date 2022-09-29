import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPizzas = createAsyncThunk("pizza/fetchPizzasStatus", async (params) => {
  const { category, search, sort, pagecount } = params;
  const { data } = await axios.get(
    `https://632d75870d7928c7d24b77a3.mockapi.io/items?page=${pagecount}&limit=4&${category}&sortBy=${sort.sort.replace(
      "-",
      ""
    )}&order=${sort.desc}${search}`
  );

  return data;
});

const initialState = {
  items: [],
  isLoading: "loading",
};

export const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.items = [];
      state.isLoading = "loading";
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.isLoading = "success";
    },
    [fetchPizzas.rejected]: (state) => {
      state.isLoading = "error";
      state.items = [];
    },
  },
});

export const selectPizza = state => state.pizzas

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
