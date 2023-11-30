
import * as types from '../actions/types';

/*========================================================
     * function Name: storeReducer.js 
     * function Purpose: state management
     * function Parameters: state and action
     * function ReturnType: action type and payload
     * function Description: api calling response action type and set payload of state stored in storeReducer.js
     *=====================================================*/

const INITIAL_STATE = {
    storeLoading: false,
    storeList: [],
    storeError: null,
    storeImgLoading: false,
    storeImgList: [],
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case types.GET_STORE_LOADING:
            return { ...state, storeLoading: true, storeList: [] };
        case types.GET_STORE_SUCCESS:
            return { ...state, storeList: action.payload, storeLoading: false };
        case types.GET_STORE_FAIL:
            return { ...state, storeError: action.payload, storeLoading: false };
        case types.GET_STORE_IMG_LOADING:
            return { ...state, storeImgLoading: true, storeImgList: [] };
        case types.GET_STORE_IMG_SUCCESS:
            return { ...state, storeImgList: action.payload, storeImgLoading: false };
        case types.GET_STORE_IMG_FAIL:
            return { ...state, storeError: action.payload, storeImgLoading: false };
        default:
            return state;
    }
};