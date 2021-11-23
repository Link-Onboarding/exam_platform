/** @format */

import { updateObject } from '../../components/Common';
import { REQUEST_START, REQUEST_FAILED, REQUEST_SUCCESS } from '../actions/makeRequest';

const initialState = {
  data: null,
  error: null,
  loading: false,
};

export function requestStart(state, action) {
  return updateObject(state, {
    loading: true,
  });
}

export function requestFailure(state, action) {
  const { error } = action;
  return updateObject(state, {
    error,
  });
}

export function requestSuccess(state, action) {
  const { payload } = action;
  return updateObject(state, {
    data: payload,
  });
}

export default function requestReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case REQUEST_START:
      return requestStart(state, action);
    case REQUEST_FAILED:
      return requestFailure(state, action);
    case REQUEST_SUCCESS:
      return requestSuccess(state, action);
    default:
      return state;
  }
}
