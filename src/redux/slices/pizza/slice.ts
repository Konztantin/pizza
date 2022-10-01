import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { PizzaItem, FetchPizzasArgs, PizzaSlise, Status } from "../pizza/types";

export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzasArgs>("pizza/fetchPizzasStatus", async (params) => {
  const { category, search, sort, pagecount } = params;
  const { data } = await axios.get<PizzaItem[]>(
    `https://632d75870d7928c7d24b77a3.mockapi.io/items?page=${pagecount}&limit=4&${category}&sortBy=${sort.sort.replace(
      "-",
      ""
    )}&order=${sort.desc}${search}`
  );

  return data;
});

const initialState: PizzaSlise = {
  items: [],
  isLoading: Status.LOADING,
};

export const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.items = [];
      state.isLoading = Status.LOADING;
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = Status.SUCCESS;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.isLoading = Status.ERROR;
    });
  }
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
