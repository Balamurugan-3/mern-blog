import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    userData: {}
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.isLoggedIn = true;
            state.userData = action.payload;
        },
        removeUserData: (state) => {
            state.isLoggedIn = false;
            state.userData = {};
        }
    }
})

export const { setUserData, removeUserData } = userSlice.actions

export default userSlice.reducer