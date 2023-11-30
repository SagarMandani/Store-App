import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
import { Config, Constants } from '@common';

Axios.defaults.baseURL = Config.defaultUrl;

Axios.interceptors.request.use(async (config) => {
    const user = await AsyncStorage.getItem(Constants.Preferences.User);
    let userData = JSON.parse(user);
    const newConfig = {
        ...config,
    };

    if (userData) {
        let token = userData?.tokens?.access?.token;
        newConfig.headers = {
            authorization: `Bearer ${token}`,
            ...config.headers,
        };
    }

    newConfig.timeout = 30000;
    newConfig.baseURL = Config.defaultUrl;
    return newConfig;
});

export const postRequestApi = (url, data, headers) => {
    return new Promise((resolve, reject) => {
        Axios.post(`${URLS.BASE_URL}${url}`, data, { headers })
            .then((response) => {
                resolve(response?.data);
            })
            .catch(async (error) => {
                reject(await getApiError(error));
            });
    });
};

export const postRequestWithFormDataApi = (url, data) => {
    return new Promise((resolve, reject) => {
        Axios.post(`${Config.defaultUrl}${url}`, data, { 'Content-Type': 'multipart/form-data;' })
            .then((response) => {
                resolve(response?.data);
            })
            .catch((error) => {
                reject(getApiError(error));
            });
    });
};

export const deleteRequestApi = (url, data, headers) => {
    return new Promise((resolve, reject) => {
        Axios.delete(`${Config.defaultUrl}${url}`, { data, headers })
            .then((response) => {
                resolve(response?.data);
            })
            .catch(async (error) => {
                reject(await getApiError(error));
            });
    });
};

export const putRequestApi = (url, data, headers) => {
    return new Promise((resolve, reject) => {
        Axios.put(`${Config.defaultUrl}${url}`, data, { headers })
            .then((response) => {
                resolve(response.data);
            })
            .catch(async (error) => {
                reject(await getApiError(error));
            });
    });
};

export const patchRequestApi = (url, data, headers) => {
    return new Promise((resolve, reject) => {
        Axios.patch(`${URLS.BASE_URL}${url}`, data, { headers })
            .then((response) => {
                resolve(response?.data);
            })
            .catch(async (error) => {
                reject(await getApiError(error));
            });
    });
};

export const getRequestApi = (url, params = undefined) => {
    return new Promise((resolve, reject) => {
        Axios.get(params ? `${Config.defaultUrl}${url}?${new URLSearchParams(params).toString()}` : `${Config.defaultUrl}${url}`)
            .then((response) => {
                resolve(response?.data);
            })
            .catch(async (error) => {
                reject(await getApiError(error));
            })
    });
};

export const getApiError = async (error) => {
    return {
        message: Array.isArray(error?.response?.data?.message)
            ? error.response?.data?.message[0]
            : error?.response?.data?.message,
        status: error?.response?.status,
        error: true,
    };
};
