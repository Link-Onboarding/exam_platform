/** @format */

import axios from 'axios';

export const REQUEST_START = 'REQUEST_START';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const REQUEST_SUCCESS = 'REQUEST_SUCCESS';
export const REQUEST_SUCCESS_LEFT = 'REQUEST_SUCCESS_LEFT';
export const REQUEST_SUCCESS_RIGHT = 'REQUEST_SUCCESS_RIGHT';

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
    payload: data
  };
}

export function requestSuccessLeft(data) {
  return {
    type: REQUEST_SUCCESS_LEFT,
    payload: data
  };
}

export function requestSuccessRight(data) {
  return {
    type: REQUEST_SUCCESS_RIGHT,
    payload: data
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

export function makeRequestLeft(api) {
  return dispatch => {
    dispatch(requestStart());
    axios
      .get(`https://api-ana.atlink-official.com/api/${api}`)
      .then(res => {
        dispatch(requestSuccessLeft(res.data));
      })
      .catch(err => {
        dispatch(requestFailure(err));
      });
  };
}

export function makeRequestRight(api) {
  return dispatch => {
    dispatch(requestStart());
    axios
      .get(`https://api-ana.atlink-official.com/api/${api}`)
      .then(res => {
        dispatch(requestSuccessRight(res.data));
      })
      .catch(err => {
        dispatch(requestFailure(err));
      });
  };
}
