import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || {},
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        updateUser: (state, action) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        resetUser: (state) => {
            state.user = {}
            localStorage.removeItem('user')
            localStorage.removeItem('token')
        }
    }
})

export const { setUser, resetUser,updateUser } = authSlice.actions
export default authSlice.reducer;