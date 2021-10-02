import updateObject from '../updateObject';

import {
    AUTH_START,
    AUTH_SUCCESS,
    AUTH_FAILED,
    LOG_OUT,
} from '../actions/account';

const initialState = {
    loading: false,
    authToken: null,
    error: null,
};

export function authStart(state, action) {
    return updateObject(state, {
        loading: true,
    });
}

export function authSuccess(state, action) {
    return updateObject(state, {
        authToken: action.authToken,
        loading: false,
    });
}

export function authFailed(state, action) {
    return updateObject(state, {
        error: action.error,
        loading: false,
    });
}

export function logOut(state, action) {
    return updateObject(state, {
        authToken: null,
    });
}

export function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_START: return authStart(state, action);
        case AUTH_SUCCESS: return authSuccess(state, action);
        case AUTH_FAILED: return authFailed(state, action);
        case LOG_OUT: return logOut(state, action);
        default: return state;
    }
}