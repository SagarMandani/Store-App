import { StyleSheet } from 'react-native';
import { Theme } from '@common';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginTitle: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    appLogo: {
        height: 50,
        width: 150,
        marginBottom: 20
    },
    forgotPassword: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },
    forgot: {
        fontSize: 13,
        color: Theme.colors.secondary,
    },
    link: {
        fontWeight: 'bold',
        color: Theme.colors.primary,
    },
})

export default styles;