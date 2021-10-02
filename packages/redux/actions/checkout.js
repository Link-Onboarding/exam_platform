import axios from 'axios';

export const CHECKOUT_START = 'CHECKOUT_START';
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS';
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE';

export function checkoutStart() {
    return {
        type: CHECKOUT_START,
    };
};

export function checkoutSuccess(payload) {
    return {
        type: CHECKOUT_SUCCESS,
        payload: payload,
    };
};

export function checkoutFailure(error) {
    return {
        type: CHECKOUT_FAILURE,
        payload: error.message,
    };
};

export function checkout(address, phone, obs) {
    return dispatch => {
        checkoutStart();

        const API_URL = 'http://localhost:3001/api/commands';

        axios.post(`${API_URL}/add`, {
            authToken: localStorage.getItem("authToken"),
            adress: address,
            phone: phone,
            bag: localStorage.getItem("bag"),
            obs: obs
        })
        .then(res => {
            dispatch(checkoutSuccess(res.data.payload));
        })
        .catch(error => {
            dispatch(checkoutFailure(error));
        });
    };
};
