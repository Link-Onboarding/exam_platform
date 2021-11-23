/** @format */

import { updateObject } from '../../components/Common';
import { GET_ALL_USERS_START, GET_ALL_USERS_FAILURE, GET_ALL_USERS_SUCCESS } from '../actions/getAllUsers';

const initialState = {
  data: null,
  error: null,
  loading: false,
};

export function getAllUsersStart(state, action) {
  return updateObject(state, {
    loading: true,
  });
}

export function getAllUsersFailure(state, action) {
  const { error } = action;
  return updateObject(state, {
    error,
  });
}

export function getAllUsersSuccess(state, action) {
  const { payload } = action;
  return updateObject(state, {
    data: payload,
  });
}

export default function getAllUsersReducer(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case GET_ALL_USERS_START:
      return getAllUsersStart(state, action);
    case GET_ALL_USERS_FAILURE:
      return getAllUsersFailure(state, action);
    case GET_ALL_USERS_SUCCESS:
      return getAllUsersSuccess(state, action);
    default:
      return state;
  }
}
