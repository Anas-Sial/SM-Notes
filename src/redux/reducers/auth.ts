import { User } from "@/models/User"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface AuthState {
    userData: User
    isFirstTime: boolean
}

const initialState: AuthState = {
    userData: {
        id: 0,
        username: "",
        email: "",
        firstName: "",
        lastName: "",
        gender: "",
        image: "",
        token: "",
    },
    isFirstTime: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        saveUserData: (state, action: PayloadAction<User>) => {
            state.userData = action.payload;
        },
        changeFirstTime: (state, action: PayloadAction<boolean>) => {
            state.isFirstTime = action.payload;
        },
        clearData: (state) => {
            state.userData = {
                id: 0,
                username: "",
                email: "",
                firstName: "",
                lastName: "",
                gender: "",
                image: "",
                token: "",
            };
            state.isFirstTime = false;
        },
    },
});

export const { changeFirstTime, saveUserData, clearData } = authSlice.actions;

export default authSlice.reducer;