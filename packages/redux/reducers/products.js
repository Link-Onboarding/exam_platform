import updateObject from '../updateObject';

import {
    GET_PRODUCTS_START,
    GET_PRODUCTS_SUCCESS,
    GET_PRODUCTS_FAILURE,
    SET_PRODUCTS_FILTER,
    SET_PRODUCTS_CATEGORY
} from '../actions/products';

const initialState = {
    loading: false,
    error: null,
    products: null,
    init_products: null,
    filter: 'none',
    category: 0
};

function toDate(input) {
    let dateParts = input.split("-");
    return new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0, 2), dateParts[2].substr(3, 2), dateParts[2].substr(6, 2), dateParts[2].substr(9, 2));
}

export function getProductsStart(state, action) {
    return updateObject(state, {
        loading: true,
    });
}

export function getProductsSuccess(state, action) {
    return updateObject(state, {
        products: action.payload,
        init_products: action.payload,
        loading: false,
    });
}

export function getProductsFailure(state, action) {
    return updateObject(state, {
        error: action.error,
        loading: false,
    });
}

export function setProductsCategory(state, action) {
    return updateObject(state, {
        category: action.payload,
        products: action.payload!=='0'?state.products.filter(elm => elm.category == action.payload):state.init_products
    });
}

export function setProductsFilter(state, action) {
    return updateObject(state, {
        filter: action.payload,
        products: action.payload === 'upprice'?
            state.products?.sort((elm1, elm2) => {
                return elm1.price - elm2.price;
            })
        :
        action.payload === 'downprice'?
            state.products?.sort((elm1, elm2) => {
                return elm2.price - elm1.price; 
            })
        :
        action.payload === 'stock'?
            state.products?.sort((elm1, elm2) => {
                return (elm2.stock - elm1.stock);
            })
        :
        action.payload === 'new'?
            state.products?.sort((elm1, elm2) => {
                return (toDate(elm2.date) - toDate(elm1.date));
            })
        :
        action.payload === 'promo'?
            state.products?.filter(elm => elm.promo > 0)
        :
        action.payload === 'none'?
            state.init_products
        :
        state.init_products,
    });
}

export function productsReducer(state = initialState, action) {
    switch (action.type) {
        case GET_PRODUCTS_START: return getProductsStart(state, action);
        case GET_PRODUCTS_SUCCESS: return getProductsSuccess(state, action);
        case GET_PRODUCTS_FAILURE: return getProductsFailure(state, action);
        case SET_PRODUCTS_FILTER: return setProductsFilter(state, action);
        case SET_PRODUCTS_CATEGORY: return setProductsCategory(state, action);
        default: return state;
    }
}