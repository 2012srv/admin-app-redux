import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isFetching: false,
    error: null,
    theme: localStorage.getItem("theme") || 'light'
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        themeChange: (state, action) => {
            state.theme = action.payload
        },
        loginStart: (state) => {
            state.user = null;
            state.isFetching = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isFetching = false;
            state.error = null;
        },
        loginFailure: (state, action) => {
            state.user = null;
            state.isFetching = false;
            state.error = action.payload;
        },
        logOut: (state) => {
            state.user = null;
            state.isFetching = false;
            state.error = null;
        },
    }
});

export const { themeChange, loginStart, loginFailure, loginSuccess, logOut } = authSlice.actions;
export default authSlice.reducer;