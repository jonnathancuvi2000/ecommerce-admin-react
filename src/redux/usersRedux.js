import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name: "users",
    initialState: {
        users: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        // Get all users
        getUsersStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        getUsersSuccess: (state, action) => {
            state.isFetching = false
            state.users = action.payload
        },
        getUsersFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
    },
});

export const { getUsersFailure, getUsersSuccess, getUsersStart } = usersSlice.actions;
export default usersSlice.reducer;