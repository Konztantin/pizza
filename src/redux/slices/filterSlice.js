import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sort: { name: "популярности (DESC)", sort: "raiting", desc: "desc" },
  categoryId: 0,
  pagecount: 1,
  searchValue: ""
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSortId(state, action) {
      state.sort = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setPageCount(state, action) {
      state.pagecount = action.payload;
    },
    setFilters(state, action) {
      state.sort = action.payload.sort;
      state.pagecount = Number(action.payload.pagecount);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const selectSort = (state) => state.filter;

export const { setSortId, setCategoryId, setPageCount, setFilters,setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
