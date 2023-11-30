
import { combineReducers } from 'redux';
import authReducer from './authReducer';
import storeReducer from './storeReducer';

import * as types from '../actions/types';

const appReducer = combineReducers({
    auth: authReducer,
    store: storeReducer
});


const rootReducer = (state, action) => {
    return appReducer(state, action)
}

export default rootReducer;