import React, { useEffect } from 'react'
import { View, Image, SafeAreaView } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { onCheckLogin } from '@actions';
import { Icons, Utils, Constants, CommonStyles } from '@common';
import styles from './style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber;
    }, [])

    const checkLogin = async (user) => {
        let isConnect = await Utils.checkConnectivity();
        let userData;
        if (isConnect) {
            onCheckLogin(user, dispatch);
            userData = user;
            global.databaseName = user?.uid ? `${user?.uid}_store.realm` : 'store.realm';
        } else {
            let userPef = await AsyncStorage.getItem(`${Constants.Preferences.User}`);
            let userVal = JSON.parse(userPef);
            userData = userVal;
            global.databaseName = userVal?.uid ? `${userVal?.uid}_store.realm` : 'store.realm';
            onCheckLogin(userVal, dispatch);
        }
        setTimeout(() => {
            props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: userData ? Constants.Screen.HomeStack : Constants.Screen.AuthStack }],
                })
            );
        }, 3000);
    }

    const onAuthStateChanged = async (user) => {
        checkLogin(user);
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={CommonStyles.backgroundPrimary} />
            <Image source={Icons.logo} style={styles.appLogo} resizeMode="contain" />
        </View>
    );
};

export default Splash;