import {
    SET_CATEGORIES_START,
    SET_CATEGORIES_SUCCESS,
    SET_CATEGORIES_FAILURE,
} from '../actions/category';

const initialState = [];


export function setCategoryStart(state, action) {
    return [];
}

export function setCategorySuccess(state, action) {
    return action.payload;
}

export function setCategoryFailure(state, action) {
    return [];
}

export function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case SET_CATEGORIES_START: return setCategoryStart(state, action);
        case SET_CATEGORIES_SUCCESS: return setCategorySuccess(state, action);
        case SET_CATEGORIES_FAILURE: return setCategoryFailure(state, action);
        default: return state;
    }
};
