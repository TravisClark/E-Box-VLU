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
    error: {
      isShowing: false,
      message: "",
    }
  },
  reducers: {
    runAdminMode(state, action) {
      if(action.payload.type === 'RUN_ADMIN_MODE'){
        state.isInAdminMode = true;
        localStorage.setItem('isInAdminMode', state.isInAdminMode);
      }
      else if(action.payload.type === 'REFRESH_ADMIN_PAGE'){
        state.isInAdminMode = JSON.parse(localStorage.getItem('isInAdminMode'))
      }
    },
    runStudentMode(state) {
      state.isInAdminMode = false;
      localStorage.removeItem('isInAdminMode');
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
    },
    catchError (state, action){
      state.error.isShowing = true;
      state.error.message = action.payload.message;
    },
    clearError(state){
      state.error.isShowing = false;
      state.error.message = ''
    }
  },
});
export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
