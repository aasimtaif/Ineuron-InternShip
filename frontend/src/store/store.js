import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        incremenQuantity: (state, action) => {
            const itemInCart = state.cart.find((item) => item.id === action.payload.id);
            if (itemInCart) {
                itemInCart.quantity++;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload.id);
            item.quantity--;
            if (item.quantity == 0) {
                const removeItem = state.cart.filter((item) => item.id !== action.payload.id);
                state.cart = removeItem;
            }
        },
        resetCart: (state) => {
            state.cart = [];
        }
    },
})

export const { incremenQuantity, decrementQuantity ,resetCart } = cartSlice.actions

export default cartSlice.reducer;
