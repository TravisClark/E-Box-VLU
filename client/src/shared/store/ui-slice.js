import { createSlice } from '@reduxjs/toolkit'


const uiSlice = createSlice({
    name: 'ui',
    initialState: {isInAdminMode: false, notification: {message: '', showUp: false}},
    reducers:{
        runAdminMode (state){
            state.isInAdminMode = !state.isInAdminMode;
        },
        popUpNotification(state, action){
            state.notification.message = action.payload
            state.notification.showUp = true
            setTimeout(()=>{
                state.notification.showUp = !state.notification.showUp
            },3000)
        }
    }
})
export const uiActions = uiSlice.actions;
export default uiSlice.reducer;