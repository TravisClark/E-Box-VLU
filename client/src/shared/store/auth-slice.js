import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false, account: {}},
    reducers:{
        loginHandler(state, action) {
            localStorage.setItem('account', JSON.stringify(action.payload))
            state.isLoggedIn = true;
            state.account = action.payload
        },
        autoLoginHandler(state) {
            state.account = JSON.parse(localStorage.getItem('account'));
            state.account ? (state.isLoggedIn = true) : (state.isLoggedIn = false);
        },
        logoutHandler(state) {
            localStorage.removeItem('account');
            state.isLoggedIn = false;
        }
    }
})
export const authActions = authSlice.actions;
export default authSlice.reducer;