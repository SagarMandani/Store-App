import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Platform, Alert, Modal, Image } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';
import DeviceInfo from "react-native-device-info";
import { check, checkMultiple, requestMultiple, PERMISSIONS, openSettings } from 'react-native-permissions';
import styles from './style';
import { Icons } from '@common';

/*
* ImagePicker design
*/

const ImagePickerModel = (props) => {
    const [apiLevel, setApiLevel] = useState(0);

    useEffect(() => {
        DeviceInfo.getApiLevel().then((apiLevel) => {
            setApiLevel(apiLevel)
        });
        requestMultiple(Platform.OS == 'ios' ? [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.PHOTO_LIBRARY] :
            [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.READ_MEDIA_IMAGES]).then((statuses) => {

            });
    }, [])

    const onImageAndCameraPick = async (type) => {
        let photoPermissions = Platform.OS == 'android' ? apiLevel < 33 ? PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES : PERMISSIONS.IOS.PHOTO_LIBRARY;
        let cameraPermissions = Platform.OS == 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA;
        check(type === 'gallery' ? photoPermissions : cameraPermissions).then(
            (status) => {
                if (status == 'granted') {
                    const options = {
                        mediaType: 'photo'
                    }
                    if (type === 'gallery') {
                        ImagePicker.openPicker({
                            width: 300,
                            height: 400,
                            cropping: true,
                            multiple: true
                        }).then(response => {
                            props.onSelectPickerResult(response);
                        });
                        // launchImageLibrary(options).then(response => {
                        //     props.onSelectPickerResult(response);
                        // }).catch(err => { });
                    } else {
                        ImagePicker.openCamera({
                            width: 300,
                            height: 400,
                            cropping: true,
                            multiple: true
                        }).then(response => {
                            props.onSelectPickerResult(response);
                        });
                        // launchCamera(options).then(response => {
                        //     props.onSelectPickerResult(response);
                        // }).catch(err => { });
                    }
                } else {
                    setTimeout(() => {
                        Alert.alert('Store App',
                            'Please allow photo permission for an open setting.',
                            [
                                { text: 'No' },
                                {
                                    text: 'Yes', style: 'cancel', onPress: () => openSettings().catch(() => console.warn('cannot open settings'))
                                }
                            ]);
                    }, 200);
                }
            }
        );
    }

    return (
        <Modal visible={props.visible} transparent>
            <View style={styles.container}>
                <View style={styles.dialog}>
                    <Text style={styles.imageTitle}>Choose photo</Text>
                    <View style={styles.selectionOption}>
                        <TouchableOpacity style={{ marginRight: 30 }} onPress={() => onImageAndCameraPick('camera')}>
                            <Image source={Icons.camera} style={styles.imageStyle} />
                            <Text style={styles.selectPhotoTitle}>Camera</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onImageAndCameraPick('gallery')}>
                            <Image source={Icons.gallery} style={styles.imageStyle} />
                            <Text style={styles.selectImgTitle}>Gallery</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.separateLine} />
                    <View style={styles.rowView}>
                        <TouchableOpacity style={styles.cancelView} onPress={() => props.openImagePicker(false)}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ImagePickerModel;