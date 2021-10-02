import updateObject from '../updateObject';

import {
    GET_USER_DATA_START,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_FAILURE,
} from '../actions/user';

const initialState = {
    loading: false,
    error: null,
    data: null
};

export function getUserDataStart(state, action) {
    return updateObject(state, {
        loading: true,
    });
}

export function getUserDataSuccess(state, action) {
    return updateObject(state, {
        loading: false,
        data: action.payload
    });
}

export function getUserDataFailure(state, action) {
    return updateObject(state, {
        loading: false,
        error: action.payload
    });
}


export function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_DATA_START: return getUserDataStart(state, action);
        case GET_USER_DATA_SUCCESS: return getUserDataSuccess(state, action);
        case GET_USER_DATA_FAILURE: return getUserDataFailure(state, action);
        default: return state;
    }
}