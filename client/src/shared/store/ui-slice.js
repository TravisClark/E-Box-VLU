import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isInAdminMode: false,
    notification: {
      message: "",
      isShowing: false,
      data: {},
      request: { url: "", method: "GET", body: null, headers: {} },
      successMessage:'',
      type: ''
    },
    successNotification: {
      isShowing: false,
      message: "",
      refresh: false
    },
  },
  reducers: {
    runAdminMode(state) {
      state.isInAdminMode = !state.isInAdminMode;
    },
    showNotification(state, action) {
      state.notification.isShowing = true;
      state.notification.message = action.payload.message;
      state.notification.data = action.payload.data;
      state.notification.request = action.payload.request;
      state.notification.successMessage = action.payload.successMessage
      state.notification.type = action.payload.type
    },
    closeNotification(state) {
      state.notification.isShowing = false;
      state.notification.message = "";
      state.notification.data = {};
      state.notification.request = {};
      state.notification.successMessage = ''
    },
    showSuccessNotification(state, action) {
      state.successNotification.isShowing = true;
      state.successNotification.message = action.payload;
      state.successNotification.refresh = !state.successNotification.refresh
    },
    closeSuccessNotification(state){
        state.successNotification.isShowing = false;
        state.successNotification.message = ''
    }
  },
});
export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
