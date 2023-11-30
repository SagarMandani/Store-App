
import * as types from './types';
import { postRequestApi, getRequestApi } from '../../helper/axiosHelper';
import { Config, Constants, Utils } from '@common';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import realm, { createStoreImage, getAllStoreImage } from '../../database/databaseMethod';
import storeData from '../../dummy/storeData';

/*========================================================
     * function Name: authAction.js
     * function Purpose: method of action
     * function Parameters: api calling with Parameters
     * function ReturnType: dispatch method in redux
     * function Description: api calling using method of action in authAction.js
     *=====================================================*/


export const getStore = async (dispatch) => {
    try {
        dispatch({ type: types.GET_STORE_LOADING });
        let isConnect = await Utils.checkConnectivity();
        if (isConnect) {
            database().ref(`store/`).on('value', function (snapshot) {
                let response = snapshot.val()
                const data = response?.length > 0 ? response : [];
                dispatch({ type: types.GET_STORE_SUCCESS, payload: data });
            });
        } else {
            dispatch({ type: types.GET_STORE_SUCCESS, payload: storeData });
        }
    } catch (error) {
        dispatch({ type: types.GET_STORE_FAIL, payload: error });
    }
};

export const getStoreImg = async (databaseRef, storeId, dispatch) => {
    try {
        dispatch({ type: types.GET_STORE_IMG_LOADING });
        let isConnect = await Utils.checkConnectivity();
        if (isConnect) {
            database().ref(databaseRef).on('value', function (snapshot) {
                let response = snapshot.val();
                const data = response?.length > 0 ? response : [];
                addLocalStoreData(storeId, data);
                dispatch({ type: types.GET_STORE_IMG_SUCCESS, payload: data });
            });
        } else {
            getAllStoreImage().then((res) => {
                let response = JSON.parse(JSON.stringify(res));
                let data = response?.filter(item => item.storeId == storeId)?.map((item) => item?.image);
                dispatch({ type: types.GET_STORE_IMG_SUCCESS, payload: data });
            }).catch((e) => { });
        }

    } catch (error) {
        dispatch({ type: types.GET_STORE_IMG_FAIL, payload: error });
    }
};

export const uploadImageToStore = async (filePath) => {
    try {
        const path = Platform.OS === 'ios' ? filePath.replace('file://', '') : filePath;
        const time = new Date().getTime().toString();
        let fileName = path?.substring(path?.lastIndexOf('/') + 1);
        let uriParts = fileName.split('.');
        let fileType = uriParts[uriParts.length - 1];
        let dbRef = 'store_images/' + uriParts[0] + '_' + time + '.' + fileType;
        const response = await fetch(path);
        const blob = await response.blob();
        const snapshot = await storage().ref(dbRef).put(blob);
        return { snapshot, dbRef };
    } catch (error) {
        Utils.showToast('!Error', 'Image uploading failed');
    }
}

export const addStoreInfo = async (dbRef, updateImage) => {
    try {
        database().ref(dbRef).set(updateImage).then((res) => console.log('addStoreInfo res---',res)).catch((e) => { });
    } catch (error) {
        Utils.showToast('!Error', 'Unable to fetch image list');
    }
}

const addLocalStoreData = (storeId, res) => {
    res && res.length > 0 ?
        res.map((item) => {
            let obj = {};
            const time = new Date().getTime().toString();
            obj["_id"] = String(time);
            obj["storeId"] = storeId;
            obj["image"] = item;
            createStoreImage(obj);
        })
        : null
}