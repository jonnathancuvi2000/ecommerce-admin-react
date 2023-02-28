import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest, userRequestPut } from "../requestMethods";
import { addProductFailure, addProductStart, addProductSuccess, deleteProductFailure, deleteProductStart, deleteProductSuccess, getProductFailure, getProductStart, getProductSuccess, updateProductFailure, updateProductStart, updateProductSuccess } from "./productRedux";
import { getUsersFailure, getUsersStart, getUsersSuccess } from "./usersRedux";


export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};

export const register = async (dispatch, user) => {
    console.log(user);
    dispatch(loginStart());
    try {
        const res = await publicRequest.post("/auth/register", user);
        dispatch(loginSuccess(res.data));
    } catch (err) {
        dispatch(loginFailure());
    }
};

export const getProducts = async (dispatch) => {
    dispatch(getProductStart());
    try {
        const res = await publicRequest.get("/products");
        dispatch(getProductSuccess(res.data));
    } catch (err) {
        dispatch(getProductFailure());
    }
};

export const getUsers = async (dispatch) => {
    dispatch(getUsersStart());
    try {
        const res = await  userRequest.get("/users");
        dispatch(getUsersSuccess(res.data));
    } catch (err) {
        dispatch(getUsersFailure());
    }
};

export const deleteProduct = async (dispatch, id) => {
    dispatch(deleteProductStart());
    try {
        // const res = await userRequest.delete(`/products/${id}`);
        dispatch(deleteProductSuccess(id));
    } catch (err) {
        dispatch(deleteProductFailure());
    }
};

export const updateProduct = async (dispatch, product, id) => {
    dispatch(updateProductStart());
    try {
        // update
        dispatch(updateProductSuccess({
            id: id, // I can write just "id" (minute 2:49:19)
            product: product // I can write just "product"
        }));
    } catch (err) {
        dispatch(updateProductFailure());
    }
};

export const addProduct = async (dispatch, product) => {
    dispatch(addProductStart()); // minuto 2:51:00
    try {
        const res = await userRequest.post(`/products`, product);
        dispatch(addProductSuccess(res.data));
    } catch (err) {
        dispatch(addProductFailure());
    }
};

export const updagteUser = async (dispatch, user) => {
    // dispatch(loginStart());
    try {
        const res = await userRequestPut.put(`/users/${user._id}`, user);
        // dispatch(loginUpdate(res.data));
    } catch (err) {
        // dispatch(loginFailure());
    }
};