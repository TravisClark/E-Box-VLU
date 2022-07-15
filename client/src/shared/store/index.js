import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth-slice'
import uiReducer from './ui-slice'
import itemReducer from './item-slice'
import pageReducer from './page-slice'
const store = configureStore({
    reducer: {auth: authReducer, ui: uiReducer, item: itemReducer, page: pageReducer}
})

export default store;