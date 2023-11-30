import { View, StyleSheet, Text } from 'react-native';
import { Theme } from '@common';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 12,
    },
    input: {
        backgroundColor: Theme.colors.surface,
    },
    description: {
        fontSize: 13,
        color: Theme.colors.secondary,
        paddingTop: 8,
    },
    error: {
        fontSize: 13,
        color: Theme.colors.error,
        paddingTop: 8,
    },
})

export default styles;