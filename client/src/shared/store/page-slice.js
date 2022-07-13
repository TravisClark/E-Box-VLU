import { createSlice } from "@reduxjs/toolkit";
import { set } from "react-hook-form";

const pageSlice = createSlice({
  name: "ui",
  initialState: {
    pagination: { currentPage: "", itemsPerPage: '', currentItems:[], items:[] },
    selectedItem: {}
  },
  reducers: {
    setCurrentItems(state, action) {
      state.pagination.items = action.payload.items;
      state.pagination.currentPage = action.payload.currentPage
      state.pagination.itemsPerPage = action.payload.itemsPerPage
      const indexOfLastItem = state.pagination.currentPage * state.pagination.itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - state.pagination.itemsPerPage;
      state.pagination.currentItems = state.pagination.items.slice(indexOfFirstItem, indexOfLastItem);
    },
    setCurrentPage(state, action) {
      state.pagination.currentPage = action.payload
      const indexOfLastItem = state.pagination.currentPage * state.pagination.itemsPerPage;
      const indexOfFirstItem = indexOfLastItem - state.pagination.itemsPerPage;
      state.pagination.currentItems = state.pagination.items.slice(indexOfFirstItem, indexOfLastItem);
    },
    storeItemSelected(state, action){
      state.selectedItem = action.payload
    }
  },
});
export const pageActions = pageSlice.actions;
export default pageSlice.reducer;
