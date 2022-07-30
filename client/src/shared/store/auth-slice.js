import { createSlice } from '@reduxjs/toolkit'
import jwt_decode from "jwt-decode";
const authSlice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false, account: {}, token: null},
    reducers:{
        loginHandler(state, action) {
            state.token = action.payload.token.token
            sessionStorage.setItem('token', JSON.stringify(state.token))
            state.isLoggedIn = true;
            state.account = jwt_decode(state.token)
        },
        saveUserHandler(state, action) {
            state.account = action.payload
        },
        autoLoginHandler(state) {
            state.token = JSON.parse(sessionStorage.getItem('token'));
            state.token && (state.account = jwt_decode(state.token))
            state.account && (state.isLoggedIn = true) ;
        },
        logoutHandler(state) {
            state.account = {}
            sessionStorage.removeItem('token')
            state.isLoggedIn = false;
            state.token = null
        },
        changePasswordHandler(state, action) {
            const {username, password} = action.payload;
            sessionStorage.clear();
            sessionStorage.setItem('token', JSON.stringify(username, password));
        }
    }
})
export const authActions = authSlice.actions;
export default authSlice.reducer;