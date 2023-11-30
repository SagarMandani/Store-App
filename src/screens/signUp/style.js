import { StyleSheet } from 'react-native'
import { Colors, Theme } from '@common';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer: {
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
    row: {
        flexDirection: 'row',
        marginTop: 4,
    },    
    link: {
        fontWeight: 'bold',
        color: Theme.colors.primary,
    },
})

export default styles;