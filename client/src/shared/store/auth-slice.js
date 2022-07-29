import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false, account: {}, token: ''},
    reducers:{
        loginHandler(state, action) {
            sessionStorage.setItem('account', JSON.stringify(action.payload))
            state.isLoggedIn = true;
            state.account = action.payload
        },
        saveUserHandler(state, action) {
            state.account = action.payload
        },
        autoLoginHandler(state) {
            state.account = JSON.parse(sessionStorage.getItem('account'));
            state.account && (state.isLoggedIn = true) ;
        },
        logoutHandler(state) {
            state.account = {}
            sessionStorage.removeItem('account')
            state.isLoggedIn = false;
        },
        changePasswordHandler(state, action) {
            const {username, password} = action.payload;
            sessionStorage.clear();
            sessionStorage.setItem('account', JSON.stringify(username, password));
        }
    }
})
export const authActions = authSlice.actions;
export default authSlice.reducer;