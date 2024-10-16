import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type State = { userId?: number };
const initialState: State = { userId: undefined };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<number>) => {
            state.userId = action.payload;
        },
        logout: (state) => {
            state.userId = undefined;
        },
    },
});

export const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;

