import axios from 'axios';

export const SET_CATEGORIES_START = 'SET_CATEGORIES_START';
export const SET_CATEGORIES_SUCCESS = 'SET_CATEGORIES_SUCCESS';
export const SET_CATEGORIES_FAILURE = 'SET_CATEGORIES_FAILURE';

export function setCategoriesStart() {
    return {
        type: SET_CATEGORIES_START
    };
};

export function setCategoriesSuccess(data) {
    return {
        type: SET_CATEGORIES_SUCCESS,
        payload: data,
    };
};

export function setCategoriesFailure(error) {
    return {
        type: SET_CATEGORIES_FAILURE,
        error: error
    };
};

export function getCategories() {
    return dispatch => {
        setCategoriesStart();

        axios.post(`${process.env.REACT_APP_API_KEY}/categories`, {})
        .then(res => {
            dispatch(setCategoriesSuccess(res.data.payload.categories));
        }) 
        .catch(error => {
            dispatch(setCategoriesFailure(error.message));
        });
    };
};
