/** @format */

import { combineReducers } from 'redux';
import { userReducer } from './reducers/user';
import getAllUsersReducer from './reducers/getAllUsers';
const rootReducer = combineReducers({
  user: userReducer,
  allReducers: getAllUsersReducer,
});

export default rootReducer;
