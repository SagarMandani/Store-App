import { StyleSheet } from 'react-native';
import { Theme, Colors } from '@common';

const styleSheet = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.White,
        paddingHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: '#00000070'
    },
    dialog: {
        backgroundColor: Colors.White,
        borderRadius: 20,
        overflow: 'hidden'
    },
    imageTitle: {
        paddingTop: 15,
        paddingBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        justifyContent: 'center',
        backgroundColor: Theme.colors.secondary,
        color: Colors.White
    },
    selectionOption: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    selectImgTitle: {
        marginTop: 10,
        textAlign: 'center',
        fontSize: 16,
        paddingBottom: 10,
        color: Colors.Black
    },
    selectPhotoTitle: {
        marginBottom: 10,
        textAlign: 'center',
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10,
        color: Colors.Black
    },
    separateLine: {
        height: 1,
        backgroundColor: Colors.Black
    },
    cancelView: {
        flex: 1,
        alignItems: 'center'
    },
    cancelText: {
        marginTop: 15,
        marginBottom: 15,
        fontSize: 16,
        color: Colors.Black
    },
    imageStyle: {
        height: 50,
        width: 50,
        marginBottom: 10,
    },
    rowView: {
        flexDirection: 'row'
    }
})

export default styleSheet;