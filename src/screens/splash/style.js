import { StyleSheet } from 'react-native';
import { Colors } from '@common';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.Primary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    appLogo: {
        height: 50,
        width: 150,
    },
    appName: {
        marginBottom: 20,
        fontSize: 18
    },
})

export default styles;