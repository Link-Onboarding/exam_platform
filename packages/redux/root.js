/** @format */

import { combineReducers } from 'redux';
import { userReducer } from './reducers/user';
import tableData from './reducers/makeRequest';

const rootReducer = combineReducers({
  table: tableData,
  user: userReducer
});

export default rootReducer;
