import { createSlice } from '@reduxjs/toolkit'

const questionSlice = createSlice({
    name: 'auth',
    initialState: {selectedType: '', itemSearching: ''},
    reducers:{
        getSelected(state, action){
            state.selectedType = action.payload
        },
        searchItem(state, action){
            state.itemSearching = action.payload.item
        }
    }
})
export const questionActions = questionSlice.actions;
export default questionSlice.reducer;