import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cart: JSON.parse(localStorage.getItem('cart')) || [],
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        incrementQuantity: (state, action) => {
            const itemInCart = state.cart.find((item) => item._id === action.payload._id);
            if (itemInCart) {
                itemInCart.quantity++;
            } else {
                state.cart.push({ ...action.payload, quantity: 1 });
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.cart.find((item) => item._id === action.payload._id);
            item.quantity--;
            if (item.quantity == 0) {
                const removeItem = state.cart.filter((item) => item._id !== action.payload._id);
                state.cart = removeItem;
            }
        },
        resetCart: (state) => {
            state.cart = [];
        }
    },
})

export const { incrementQuantity, decrementQuantity, resetCart } = cartSlice.actions

export default cartSlice.reducer;
