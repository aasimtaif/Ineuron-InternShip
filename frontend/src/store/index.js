import { configureStore } from '@reduxjs/toolkit'
import  cartReducer  from './store'

export const store = configureStore({
    reducer: {
        counter: cartReducer 
    },
})
