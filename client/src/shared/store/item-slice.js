import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "item",
  initialState: { selectedType: "", itemSearching: "", items: [] },
  reducers: {
    getSelected(state, action) {
      state.selectedType = action.payload;
    },
    searchItem(state, action) {
      state.itemSearching = action.payload.item;
    },
    fetchItems(state, action) {
      state.items = action.payload.items;
    },
    sortItemsByDate(state, action) {
      const sorted = state.items.sort((a, b) =>
        new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime()
          ? 1
          : -1
      );
      state.items = [...sorted]
      // if (action.payload.type === "ASC") {
      // }
    },
  },
});
export const itemActions = itemSlice.actions;
export default itemSlice.reducer;
