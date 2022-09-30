import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { SortItem } from "./filterSlice";

type FetchPizzasArgs = {
  category: string;
  search: string;
  pagecount: string;
  sort: SortItem;
}

type PizzaItem = {
  id: string;
  title: string;
  imageUrl: string;
  price: number;
  count: number;
  type: number[];
  size: number[];
}

enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error"
}

interface PizzaSlise {
  items: PizzaItem[];
  isLoading: Status;
}

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

export const selectPizza = (state: RootState) => state.pizzas

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
