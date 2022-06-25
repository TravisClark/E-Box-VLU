import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false, account: {}},
    reducers:{
        loginHandler(state, action) {
            localStorage.setItem('account', JSON.stringify(action.payload))
            state.isLoggedIn = true;
            state.account = action.payload
        }
    }
})
export const authActions = authSlice.actions;
export default authSlice.reducer;