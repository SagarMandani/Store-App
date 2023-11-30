
import * as types from '../actions/types';

/*========================================================
     * function Name: authReducer.js 
     * function Purpose: state management
     * function Parameters: state and action
     * function ReturnType: action type and payload
     * function Description: api calling response action type and set payload of state stored in authReducer.js
     *=====================================================*/

const INITIAL_STATE = {
    loginLoading: false,
    signUpLoading: false,
    user: null,
    error: null,
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.LOGIN_LOADING:
            return { ...state, loginLoading: true };
        case types.LOGIN_SUCCESS:
            return { ...state, user: action.payload, loginLoading: false };
        case types.LOGIN_FAIL:
            return { ...state, error: action.payload, loginLoading: false };
        case types.CHECK_LOGIN:
            return { ...state, user: action.payload };
        case types.SIGNUP_LOADING:
            return { ...state, signUpLoading: true };
        case types.SIGNUP_SUCCESS:
            return { ...state, user: action.payload, signUpLoading: false };
        case types.SIGNUP_FAIL:
            return { ...state, error: action.payload, signUpLoading: false };
        default:
            return state;
    }
};