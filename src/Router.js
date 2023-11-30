import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Splash, Login, Dashboard, SignUp, StoreDetails } from './screens';
import { Constants } from '@common';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
    return (
        <Stack.Navigator initialRouteName={Constants.Screen.Dashboard} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={Constants.Screen.Dashboard} component={Dashboard} />
            <Stack.Screen name={Constants.Screen.StoreDetails} component={StoreDetails} />
        </Stack.Navigator>
    );
}

const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName={Constants.Screen.Login} screenOptions={{ headerShown: false }}>
            <Stack.Screen name={Constants.Screen.Login} component={Login} />
            <Stack.Screen name={Constants.Screen.SignUp} component={SignUp} />
        </Stack.Navigator>
    );
}

const AppStackNavigator = () => {
    return (
        <Stack.Navigator initialRouteName={Constants.Screen.Splash} screenOptions={{ headerShown: false }} >
            <Stack.Screen name={Constants.Screen.Splash} component={Splash} />
            <Stack.Screen name={Constants.Screen.AuthStack} component={AuthStack} />
            <Stack.Screen name={Constants.Screen.HomeStack} component={HomeStack} />
        </Stack.Navigator>
    );
}

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <AppStackNavigator />
        </NavigationContainer>
    );
};

export default AppNavigator;