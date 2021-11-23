/** @format */

import { combineReducers } from 'redux';
import { userReducer } from './reducers/user';
import getAllUsersReducer from './reducers/getAllUsers';
import tableData from './reducers/makeRequest';

const rootReducer = combineReducers({
  table: tableData,
  user: userReducer,
  allUsers: getAllUsersReducer,
});

export default rootReducer;
