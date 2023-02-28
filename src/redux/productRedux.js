import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        isFetching: false,
        error: false,
    },
    reducers: {
        // Get all products
        getProductStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        getProductSuccess: (state, action) => {
            state.isFetching = false
            state.products = action.payload
        },
        getProductFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        // Delete all products
        deleteProductStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        deleteProductSuccess: (state, action) => {
            state.isFetching = false
            // we eliminate the data but just from de array of "products" that is up
            state.products.splice(
                state.products.findIndex(item => item._id === action.payload), 1
            )
        },
        deleteProductFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        // Update all products
        updateProductStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        updateProductSuccess: (state, action) => {
            state.isFetching = false
            state.products[state.products.findIndex(item => item._id === action.payload.id)] = action.payload.product
        },
        updateProductFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        // Add all products
        addProductStart: (state) => {
            state.isFetching = true
            state.error = false
        },
        addProductSuccess: (state, action) => {
            state.isFetching = false
            state.products.push(action.payload)
        },
        addProductFailure: (state) => {
            state.isFetching = false
            state.error = true
        },
        // initializa data 
        deleteData_product: (state) => {
            state.products = null;
            state.isFetching = false;
            state.error = false;
        }
    }
});

export const { getProductStart, getProductSuccess, getProductFailure, deleteData_product,
    deleteProductStart, deleteProductSuccess, deleteProductFailure,
    updateProductStart, updateProductSuccess, updateProductFailure,
    addProductStart, addProductSuccess, addProductFailure
} = productSlice.actions;
export default productSlice.reducer;