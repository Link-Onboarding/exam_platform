/** @format */

import axios from 'axios';

export const ADD_USER_START = 'ADD_USER_START';
export const ADD_USER_FAILURE = 'ADD_USER_FAILURE';
export const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';

export function addUserStart() {
  return {
    type: ADD_USER_START,
  };
}

export function addUserFailure(error) {
  return {
    type: ADD_USER_FAILURE,
    error,
  };
}

export function addUserSuccess(data) {
  return {
    type: ADD_USER_SUCCESS,
    payload: data,
  };
}

export function addUser(data) {
  return dispatch => {
    if (data) {
      axios
        .post('https://api-ana.atlink-official.com/api/users/register', data)
        .then(res => dispatch(addUserSuccess(res.data)))
        .catch(err => dispatch(addUserFailure(err)));
    }
  };
}
