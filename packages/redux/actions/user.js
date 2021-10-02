import axios from 'axios';

export const GET_USER_DATA_START = 'GET_USER_DATA_START';
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILURE = 'GET_USER_DATA_FAILURE';

export function getUserDataStart() {
    return {
        type: GET_USER_DATA_START,
    };
}

export function getUserDataSuccess(data) {
    return {
        type: GET_USER_DATA_SUCCESS,
        payload: data,
    };
}

export function getUserDataFailure(error) {
    return {
        type: GET_USER_DATA_FAILURE,
        payload: error.message,
    };
}

export function getUserData() {
    return dispatch => {
        const API_URL = 'http://localhost:3001/api/user';

        const token = localStorage.getItem("authToken")?localStorage.getItem("authToken"):null;

        axios.post(`${API_URL}/`, {
            token: token
        })
        .then(res => {
            dispatch(getUserDataSuccess(res.data.payload));
        })
        .catch(error => {
            dispatch(getUserDataFailure(error.message));
        });
    };
}

export function setUserData({first_name, last_name, email, phone}) {
    return dispatch => {
        const API_URL = 'http://localhost:3001/api/user';

        const token = localStorage.getItem("authToken")?localStorage.getItem("authToken"):null;

        axios.post(`${API_URL}/edit`, {
            token,
            first_name,
            last_name,
            email,
            phone
        })
        .then(res => {
            if (!res.data.error) {
                dispatch(getUserDataSuccess(
                    {
                        first_name,
                        last_name,
                        email,
                        phone
                    }
                ));
            }
        })
        .catch(error => {
            dispatch(getUserDataFailure(error.message));
        });
    };
}
