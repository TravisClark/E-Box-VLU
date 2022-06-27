import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false, account: {}, token: ''},
    reducers:{
        loginHandler(state, action) {
            localStorage.setItem('token', JSON.stringify(action.payload.token))
            state.isLoggedIn = true;
            state.token = action.payload
        },
        saveUserHandler(state, action) {
            state.account = action.payload
        },
        autoLoginHandler(state) {
            state.token = JSON.parse(localStorage.getItem('token'));
            state.token ? (state.isLoggedIn = true) : (state.isLoggedIn = false);
        },
        logoutHandler(state) {
            state.account = {}
            localStorage.removeItem('token')
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