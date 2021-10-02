import updateObject from '../updateObject';

import {
    CHECKOUT_START,
    CHECKOUT_SUCCESS,
    CHECKOUT_FAILURE,
} from '../actions/checkout';

const initialState = {
    loading: false,
    error: null,
    command: null
};

export function checkoutStart(state, action) {
    return updateObject(state, {
        loading: true,
    });
};

export function checkoutSuccess(state, action) {
    return updateObject(state, {
        command: action.id,
        loading: false,
    });
};

export function checkoutFailure(state, action) {
    return updateObject(state, {
        error: action.error,
        loading: false,
    });
};

export function checkoutReducer(state = initialState, action) {
    switch (action.type) {
        case CHECKOUT_START: return checkoutStart(state, action);
        case CHECKOUT_SUCCESS: return checkoutSuccess(state, action);
        case CHECKOUT_FAILURE: return checkoutFailure(state, action);
        default: return state;
    }
};
