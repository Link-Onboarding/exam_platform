import updateObject from '../updateObject';

import {
    GET_USER_DATA_START,
    GET_USER_DATA_SUCCESS,
    GET_USER_DATA_FAILURE,
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER,
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

export function LoginStart(state, action) {
    return updateObject(state, {
        loading: true,
    });
}

export function LoginSuccess(state, action) {
    return updateObject(state, {
        loading: false,
        data: action.payload
    });
}

export function LoginFailure(state, action) {
    return updateObject(state, {
        loading: false,
        error: action.payload
    });
}

export function LogoutUser(state, action) {
    localStorage.clear();

    return updateObject(state, {
        data: null
    });
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USER_DATA_START: return getUserDataStart(state, action);
        case GET_USER_DATA_SUCCESS: return getUserDataSuccess(state, action);
        case GET_USER_DATA_FAILURE: return getUserDataFailure(state, action);
        case LOGIN_USER_START: return LoginStart(state, action);
        case LOGIN_USER_SUCCESS: return LoginSuccess(state, action);
        case LOGIN_USER_FAILURE: return LoginFailure(state, action);
        case LOGOUT_USER: return LogoutUser(state, action);
        default: return state;
    }
}