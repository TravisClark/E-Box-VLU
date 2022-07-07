import { createSlice } from '@reduxjs/toolkit'

const questionSlice = createSlice({
    name: 'auth',
    initialState: {selectedType: ''},
    reducers:{
        getSelected(state, action){
            state.selectedType = action.payload
        }
    }
})
export const questionActions = questionSlice.actions;
export default questionSlice.reducer;