/** @format */

import axios from 'axios';

export const REQUEST_START = 'REQUEST_START';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';

export function requestStart() {
  return {
    type: REQUEST_START,
  };
}

export function requestFailure(error) {
  return {
    type: REQUEST_FAILED,
    error,
  };
}

export function requestSuccess(data) {
  return {
    type: REQUEST_SUCCESS,
    payload: data,
  };
}

export function makeRequest(api) {
  return dispatch => {
    dispatch(requestStart());
    axios
      .get(`https://api-ana.atlink-official.com/api/${api}`)
      .then(res => {
        dispatch(requestSuccess(res.data));
      })
      .catch(err => {
        dispatch(requestFailure(err));
      });
  };
}
