import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        deleteData_user: (state) => {
            state.currentUser = null;
            state.isFetching = false;
            state.error = false;
        }
    },
});

export const { deleteData_user, loginStart, loginSuccess, loginFailure } = userSlice.actions;
export default userSlice.reducer;