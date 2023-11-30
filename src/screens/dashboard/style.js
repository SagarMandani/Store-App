import { StyleSheet, Dimensions } from 'react-native';
import { Colors, Theme } from '@common';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    subContainer: {
        flex: 1,
        padding: 20,
        paddingTop: 0,
    },
    appLogo: {
        height: 50,
        width: 150,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10
    },
    listItem: {
        marginBottom: 20,
        borderRadius: 5,
        borderColor: Theme.colors.primary,
        borderWidth: 1,
    },
    imageStyle: {
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        width: (width - 55) / 2,
        height: 80,
        overflow: 'hidden'
    },
    btnView: {
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20 
    },
    emptyView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center' 
    }
})

export default styles;