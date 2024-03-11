import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './store'
import AuthReducer from './authStore'
export const store = configureStore({
    reducer: {
        counter: cartReducer,
        auth: AuthReducer
    },
})
