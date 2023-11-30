import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import styles from './style';
import { Colors, Strings, Theme } from '@common';

// spinner loading
export const Spinner = () => {
    return (
        <View style={styles.container}>
            <View style={styles.spinnerBox}>
                <ActivityIndicator color={Theme.colors.primary} size='large' />
                <Text style={styles.spinnerText}>{Strings.PleaseWait}</Text>
            </View>
        </View>
    )
}

// spinner more loading
export const SpinnerMoreLoading = () => {
    return (
        <View style={styles.moreLoading}>
            <ActivityIndicator color={Theme.colors.primary} size='large' />
        </View>
    )
}