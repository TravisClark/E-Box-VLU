import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "item",
  initialState: { selectedType: "", itemSearching: ""},
  reducers: {
    getSelected(state, action) {
      state.selectedType = action.payload;
    },
    searchItem(state, action) {
      state.itemSearching = action.payload.item;
    },
  },
});
export const itemActions = itemSlice.actions;
export default itemSlice.reducer;
