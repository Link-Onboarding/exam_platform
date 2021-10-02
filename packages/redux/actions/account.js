import axios from 'axios';

export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILED = 'AUTH_FAILED';
export const LOG_OUT = 'LOG_OUT';

export function authStart() {
    return {
        type: AUTH_START,
    };
}

export function authSuccess(authToken) {
    return {
        type: AUTH_SUCCESS,
        authToken: authToken
    };
}

export function authFailed(error) {
    return {
        type: AUTH_FAILED,
        error: error,
    };
}

export function logOut() {
    localStorage.clear();

    setTimeout(() => {
        window.location.reload();
    }, 1000);

    return {
        type: LOG_OUT,
    };
}

export function authInProcess(payload, hasAccount) {
    return dispatch => {
        dispatch(authStart());

        let AUTH_URL;

        if (hasAccount) {
            AUTH_URL = `${process.env.REACT_APP_API_KEY}/user/login`;
        } else {
            AUTH_URL = `${process.env.REACT_APP_API_KEY}/user/register`;
        }

        axios.post(AUTH_URL, payload)
            .then(response => {
                console.log(response.data)
                if (!response.data.error) {
                    const authToken = localStorage.getItem('authToken')?localStorage.getItem('authToken'):response.data.payload.authToken;
                    localStorage.setItem('authToken', authToken);
                    dispatch(authSuccess(authToken));
                }
                else
                {
                    dispatch(authFailed(response.data.error.message));
                }
            })
            .catch(error => console.log(error));
    };
}