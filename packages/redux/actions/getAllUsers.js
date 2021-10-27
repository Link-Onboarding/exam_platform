/** @format */

import axios from 'axios';

export const GET_ALL_USERS_START = 'GET_ALL_USERS_START';
export const GET_ALL_USERS_FAILURE = 'GET_ALL_USERS_FAILURE';
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';

export function getAllUsersStart() {
  return {
    type: GET_ALL_USERS_SUCCESS,
  };
}

export function getAllUsersFailure(error) {
  return {
    type: GET_ALL_USERS_SUCCESS,
    error,
  };
}

export function getAllUsersSuccess(data) {
  return {
    type: GET_ALL_USERS_SUCCESS,
    payload: data,
  };
}

export function getAllUsers() {
  return dispatch => {
    dispatch(getAllUsersStart());
    axios
      .get('http://188.26.231.81:3001/api/user/all')
      .then(res => {
        console.log(res.data);
        dispatch(getAllUsersSuccess(res.data));
      })
      .catch(err => {
        console.log(err);
        dispatch(getAllUsersFailure(err));
      });
  };
}
