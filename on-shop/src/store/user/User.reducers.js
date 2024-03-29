import { createSlice } from '@reduxjs/toolkit';
import { checkLoginStatus, loginUser } from '../auth/Auth.actions';

const initialState = {};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.fullfilled, (state, action) => {
            const { user } = action.payload;
            Object.assign(state, user);
        })
        .addCase(checkLoginStatus.fullfilled, (state, action) => {
            const { user } = action.payload;
            Object.assign(state, user);
        })
    }
});

export default userSlice.reducer;