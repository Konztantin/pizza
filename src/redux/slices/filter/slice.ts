import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FilterSlicaState, SortItem } from "./types";


const initialState: FilterSlicaState = {
  sort: { name: "популярности (DESC)", sort: "rating", desc: "desc" },
  categoryId: 0,
  pagecount: 1,
  searchValue: ""
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSortId(state, action: PayloadAction<SortItem>) {
      state.sort = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pagecount = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSlicaState>) {
      if (Object.keys(action.payload).length) {
        state.sort = action.payload.sort;
        state.pagecount = Number(action.payload.pagecount);
        state.categoryId = Number(action.payload.categoryId);
      } else {
        state.sort = { name: "популярности (DESC)", sort: "rating", desc: "desc" };
        state.pagecount = 1;
        state.categoryId = 0;
      }

    },
  },
});

export const { setSortId, setCategoryId, setPageCount, setFilters, setSearchValue } = filterSlice.actions;


export default filterSlice.reducer;
