import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {isLoggedIn: false, account: {}},
    reducers:{

    }
})
export const authActions = authSlice.actions;
export default authSlice.reducer;