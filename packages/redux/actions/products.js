import axios from 'axios';

export const GET_PRODUCTS_START = 'GET_PRODUCTS_START';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCTS_FAILURE = 'GET_PRODUCTS_FAILURE';
export const SET_PRODUCTS_FILTER = 'SET_PRODUCTS_FILTER';
export const SET_PRODUCTS_CATEGORY = 'SET_PRODUCTS_CATEGORY';

export function getProductsStart() {
    return {
        type: GET_PRODUCTS_START,
    };
};

export function getProductsSuccess(data) {
    return {
        type: GET_PRODUCTS_SUCCESS,
        payload: data
    };
};

export function getProductsFailure(error) {
    return {
        type: GET_PRODUCTS_FAILURE,
        payload: error
    };
};

export function setProductsFilter(data) {
    return {
        type: SET_PRODUCTS_FILTER,
        payload: data
    };
};

export function setProductsCategory(data) {
    return {
        type: SET_PRODUCTS_CATEGORY,
        payload: data
    };
};

export function getProducts() {
    return dispatch => {
        getProductsStart();

        axios.post(`${process.env.REACT_APP_API_KEY}/products`, {})
        .then(res => {
            dispatch(getProductsSuccess(res.data.payload.products));
        })
        .catch(error => {
            dispatch(getProductsFailure(error.message));
        });
    };
};
