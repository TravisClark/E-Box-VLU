import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "item",
  initialState: {
    typeList: [],
    selectedType: "",
    selectedTypeChanged: "",
    newSortType: "",
    itemSearching: "",
    items: [],
  },
  reducers: {
    getSelected(state, action) {
      state.selectedType = action.payload.type;
    },
    searchItem(state, action) {
      state.itemSearching = action.payload.item;
    },
    fetchItems(state, action) {
      state.items = action.payload.items;
    },
    changeSortType(state, action) {
      state.newSortType = action.payload.type;
    },
    changeSelectedType(state, action) {
      state.selectedTypeChanged = action.payload.type;
    },
    storeTypes(state, action) {
      state.typeList = action.payload.typeList;
    },
  },
});
export const itemActions = itemSlice.actions;
export default itemSlice.reducer;
