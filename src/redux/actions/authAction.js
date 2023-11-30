import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Utils, Config, Constants } from '@common';
import * as types from './types';
import { postRequestApi, getRequestApi } from '../../helper/axiosHelper';

/*========================================================
     * function Name: authAction.js
     * function Purpose: method of action
     * function Parameters: api calling with Parameters
     * function ReturnType: dispatch method in redux
     * function Description: api calling using method of action in authAction.js
     *=====================================================*/


export const signInWithEmail = (email, password, navigation, dispatch) => {
    try {
        dispatch({ type: types.LOGIN_LOADING });
        auth().signInWithEmailAndPassword(email, password)
            .then((res) => {
                global.databaseName = res?.user ? `${res?.user?.uid}_store.realm` : 'store.realm';
                dispatch({ type: types.LOGIN_SUCCESS, payload: res?.user });
                Utils.showToast('!Success', 'User account sign in!', 'success');
                setCurrentUser(res?.user);
                navigation.reset({
                    index: 0,
                    routes: [{ name: Constants.Screen.HomeStack }],
                })
            })
            .catch(error => {
                let errorMsg;
                if (error.code === 'auth/email-already-in-use') {
                    errorMsg = 'That email address is already in use!';
                } else if (error.code === 'auth/invalid-email') {
                    errorMsg = 'That email address is invalid!';
                } else if (error.code === 'auth/weak-password') {
                    errorMsg = 'Password should be at least 6 characters';
                } else if (error.code === 'auth/invalid-credential') {
                    errorMsg = 'email and password is invalid';
                } else {
                    errorMsg = 'Please try again! email and password is inValid'
                }
                dispatch({ type: types.LOGIN_FAIL, payload: errorMsg });
                Utils.showToast('!Error', errorMsg);
            });
    } catch (error) {
        dispatch({ type: types.LOGIN_FAIL, payload: error?.message });
    }
};

export const signUpWithEmail = (email, password, navigation, dispatch) => {
    try {
        dispatch({ type: types.SIGNUP_LOADING });
        auth().createUserWithEmailAndPassword(email, password)
            .then((res) => {
                global.databaseName = res?.user ? `${res?.user?.uid}_store.realm` : 'store.realm';
                dispatch({ type: types.SIGNUP_SUCCESS, payload: res?.user });
                Utils.showToast('!Success', 'User account created & signed in!', 'success');
                setCurrentUser(res?.user);
                navigation.reset({
                    index: 0,
                    routes: [{ name: Constants.Screen.HomeStack }],
                })
            })
            .catch(error => {
                let errorMsg;
                if (error.code === 'auth/email-already-in-use') {
                    errorMsg = 'That email address is already in use!';
                } else if (error.code === 'auth/invalid-email') {
                    errorMsg = 'That email address is invalid!';
                } else if (error.code === 'auth/weak-password') {
                    errorMsg = 'Password should be at least 6 characters';
                } else if (error.code === 'auth/invalid-credential') {
                    errorMsg = 'email and password is invalid';
                } else {
                    errorMsg = 'Please try again! email and password is inValid'
                }
                dispatch({ type: types.SIGNUP_ERROR, payload: errorMsg });
                Utils.showToast('!Error', errorMsg);
            });
    } catch (error) {
        dispatch({ type: types.SIGNUP_ERROR, payload: error });
    }

};

export const onCheckLogin = (user, dispatch) => {
    dispatch({ type: types.CHECK_LOGIN, payload: user });
};

export const setCurrentUser = async (data) => {
    try {
        await AsyncStorage.setItem(Constants.Preferences.User, JSON.stringify(data));
    } catch (error) {
        return error;
    }
};
