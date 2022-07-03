import { createSlice } from '@reduxjs/toolkit'


const uiSlice = createSlice({
    name: 'ui',
    initialState: {isInAdminMode: false},
    reducers:{
        runAdminMode (state){
            state.isInAdminMode = true;
        }
    }
})
export const uiActions = uiSlice.actions;
export default uiSlice.reducer;