/** @format */

import { updateObject } from '../../components/Common';
import { REQUEST_START, REQUEST_FAILED, REQUEST_SUCCESS, REQUEST_SUCCESS_LEFT, REQUEST_SUCCESS_RIGHT, REQUEST_SUCCESS_SEC } from '../actions/makeRequest';

const initialState = {
  data: null,
  dataL: null,
  dataR: null,
  dataSec: null,
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

export function requestSuccessRight(state, action) {
  const { payload } = action;
  return updateObject(state, {
    dataR: payload,
  });
}

export function requestSuccessLeft(state, action) {
  const { payload } = action;
  return updateObject(state, {
    dataL: payload,
  });
}

export function requestSuccessSec(state, action) {
  const { payload } = action;
  return updateObject(state, {
    dataSec: payload,
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
      case REQUEST_SUCCESS_LEFT:
        return requestSuccessLeft(state, action);
      case REQUEST_SUCCESS_RIGHT:
        return requestSuccessRight(state, action);
      case REQUEST_SUCCESS_SEC:
        return requestSuccessSec(state, action);
    default:
      return state;
  }
}
