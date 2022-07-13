import {configureStore} from '@reduxjs/toolkit';
import authReducer from './auth-slice'
import uiReducer from './ui-slice'
import questionReducer from './question-slice'
import pageReducer from './page-slice'
const store = configureStore({
    reducer: {auth: authReducer, ui: uiReducer, question: questionReducer, page: pageReducer}
})

export default store;