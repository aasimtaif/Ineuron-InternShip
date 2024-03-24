import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {},
}
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        resetUser: (state) => {
            state.user = {}
        }
    }
})

export const { setUser, resetUser } = authSlice.actions
export default authSlice.reducer;