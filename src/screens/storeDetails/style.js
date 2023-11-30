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
        paddingTop: 5,
        paddingBottom: 0
    },
    appLogo: {
        height: 50,
        width: 150,
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 15
    },
    listItem: {
        marginBottom: 20,
        borderRadius: 5,
        borderColor: Theme.colors.primary,
        borderWidth: 1,
        width: (width - 55) / 2,
        height: 100,
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
    },
    progressBar: {
        height: 20,
        flexDirection: "row",
        width: '100%',
        borderColor: Colors.Grey,
        borderWidth: 2,
        borderRadius: 5
    }
})

export default styles;