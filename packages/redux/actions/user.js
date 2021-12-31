/** @format */

import axios from 'axios';

export const GET_USER_DATA_START = 'GET_USER_DATA_START';
export const GET_USER_DATA_SUCCESS = 'GET_USER_DATA_SUCCESS';
export const GET_USER_DATA_FAILURE = 'GET_USER_DATA_FAILURE';
export const LOGIN_USER_START = 'LOGIN_USER_START';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';
export const LOGOUT_USER = 'LOGOUT_USER';

const API_URL = 'https://api-ana.atlink-official.com/api/users';

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
    dispatch(getUserDataStart());

    const localId = localStorage.getItem('localId') ? localStorage.getItem('localId') : null;

    axios
      .post(`${API_URL}/get`, {
        id: parseInt(localId),
      })
      .then(res => {
        dispatch(getUserDataSuccess(res.data));
      })
      .catch(error => {
        dispatch(getUserDataFailure(error.message));
      });
  };
}

export function LoginStart() {
  return {
    type: LOGIN_USER_START,
  };
}

export function LoginSuccess(data) {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: data,
  };
}

export function LoginFailure(error) {
  return {
    type: LOGIN_USER_FAILURE,
    payload: error,
  };
}

export function Login(username, password) {
  return dispatch => {
    dispatch(LoginStart());

    axios
      .post(`${API_URL}/login`, {
        username,
        password,
      })
      .then(res => {
        localStorage.setItem('authToken', res.data.auth_token);
        localStorage.setItem('localId', res.data.id);

        dispatch(LoginSuccess(res.data));
      })
      .catch(error => {
        dispatch(LoginFailure("Credentialele sunt gresite!"));
      });
  };
}
export function Logout() {
  return {
    type: LOGOUT_USER,
  };
}
