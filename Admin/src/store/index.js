import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './authStore'
export const store = configureStore({
    reducer: AuthReducer,
})
