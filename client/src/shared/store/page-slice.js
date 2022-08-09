import { createSlice } from "@reduxjs/toolkit";

const pageSlice = createSlice({
  name: "ui",
  initialState: {
    pagination: { currentPage: "", itemsPerPage: '', currentItems:[], items:[], isSortingItems: false},
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
    resetPagination(state, action) {
      state.pagination.items = []
      state.pagination.currentPage = ''
      state.pagination.itemsPerPage = ''
      state.pagination.currentItems = []
    },
    storeItemSelected(state, action){
      state.selectedItem = action.payload
    },
    SortItemsByType(state, action){
      state.isSortingItems = true;
    }
  },
});
export const pageActions = pageSlice.actions;
export default pageSlice.reducer;
