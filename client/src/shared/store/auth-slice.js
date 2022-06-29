import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false, account: {}, token: ''},
    reducers:{
        loginHandler(state, action) {
            localStorage.setItem('account', JSON.stringify(action.payload))
            state.isLoggedIn = true;
            state.account = action.payload
        },
        saveUserHandler(state, action) {
            state.account = action.payload
        },
        autoLoginHandler(state) {
            state.account = JSON.parse(localStorage.getItem('account'));
            state.account ? (state.isLoggedIn = true) : (state.isLoggedIn = false);
        },
        logoutHandler(state) {
            state.account = {}
            localStorage.removeItem('account')
            state.isLoggedIn = false;
        },
        changePasswordHandler(state, action) {
            const {username, password} = action.payload;
            localStorage.clear();
            localStorage.setItem('account', JSON.stringify(username, password));
        }
    }
})
export const authActions = authSlice.actions;
export default authSlice.reducer;