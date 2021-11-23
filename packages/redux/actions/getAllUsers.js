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

export function getAllUsers(type) {
  return dispatch => {
    dispatch(getAllUsersStart());
    axios
      .get(`https://api-ana.atlink-official.com/api/users/all`)
      .then(res => {
        dispatch(getAllUsersSuccess(res.data));
      })
      .catch(err => {
        dispatch(getAllUsersFailure(err));
      });
  };
}

export function makeRequest(api) {
  return dispatch => {
    dispatch(getAllUsersStart());
    axios
      .get(`https://api-ana.atlink-official.com/api/${api}`)
      .then(res => {
        dispatch(getAllUsersSuccess(res.data));
      })
      .catch(err => {
        dispatch(getAllUsersFailure(err));
      });
  };
}
