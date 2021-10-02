import { combineReducers } from 'redux';
import {bagReducer} from './reducers/bag';
import {authReducer} from './reducers/account';
import {userReducer} from './reducers/user';
import {productsReducer} from './reducers/products';
import {categoryReducer} from './reducers/category';
import {checkoutReducer} from './reducers/checkout';

const rootReducer = combineReducers({
    bag: bagReducer,
    auth: authReducer,
    user: userReducer,
    shop: productsReducer,
    categories: categoryReducer,
    checkout: checkoutReducer
});

export default rootReducer;