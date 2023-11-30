import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ActivityIndicator, FlatList, Image, } from 'react-native';
import { Text } from 'react-native-paper';
import { ImagePickerModel, Header, Button } from '@component';
import { Icons, Theme, Colors, CommonStyles, Utils } from '@common';
import styles from './style';
import { useDispatch, useSelector } from 'react-redux';
import storage from '@react-native-firebase/storage';
import { getStoreImg, uploadImageToStore, addStoreInfo } from '@actions';
import realm, { createStoreImage, getAllStoreImage } from '../../database/databaseMethod';

const StoreDetails = ({ navigation, route }) => {
    const auth = useSelector(state => state.auth);
    const [loading, setLoading] = useState(false);
    const [progressCount, setProgressCount] = useState('');
    const [progressPer, setProgressPer] = useState(0);
    const [selectedStoreData, setSelectedStoreData] = useState([]);
    const [, setState] = useState({});
    const dispatch = useDispatch();
    const [photos, setPhotos] = useState();
    const [pickerVisibility, setPickerVisibility] = useState(false);
    const [selectStore, setSelectStore] = useState(route?.params?.item);
    const store = useSelector(state => state.store);

    useEffect(() => {
        setSelectedStoreData(store?.storeImgList);
    }, [store?.storeImgList])

    useEffect(() => {
        getStoreImgAPI();
    }, [])

    const getStoreImgAPI = async () => {
        let storeId = String(selectStore?.id);
        let dbRef = 'store_info/' + auth.user.uid + '/' + storeId;
        getStoreImg(dbRef, storeId, dispatch);
    }

    const openImagePicker = (visible) => {
        setPickerVisibility(visible);
    }

    const onSelectPickerResult = (result) => {
        openImagePicker(false);
        setPhotos(result);
        setState({})
        if (selectedStoreData?.length > 1000) {
            Utils.showToast('!Error', 'Maximum upload the 1000 store image');
        } else {
            uploadPhotos(result);
        }
    }

    const renderItem = (item, index) => {
        return (
            <Image key={index}
                style={[styles.listItem, { marginRight: index % 2 == 0 ? 10 : 0 }]}
                source={{ uri: item }} />
        );
    };

    const addStore = async (downloadURLs) => {
        let updateImage = selectedStoreData?.length > 0 ? [...selectedStoreData, ...downloadURLs] : downloadURLs;
        let dbRef = 'store_info/' + auth.user.uid + '/' + String(selectStore?.id);
        addStoreInfo(dbRef, updateImage);
        setLoading(false);
        setProgressPer(0);
        setProgressCount('0/0');
        getStoreImgAPI();
    }

    const uploadImage = async (imgObj, index, total) => {
        setProgressPer(0);
        setProgressCount(`${index + 1}/${total}`);
        setState({})
        const response = await uploadImageToStore(imgObj?.path);
        const { snapshot, dbRef } = response;
        let downloadURL;
        if (snapshot) {
            const progress = (snapshot?.bytesTransferred / snapshot?.totalBytes) * 100;
            setProgressPer(progress);
            downloadURL = await storage().ref(dbRef).getDownloadURL();
        } else {
            setProgressPer(0);
            setProgressCount(`0/0`);
        }
        setState({})
        return downloadURL;
    };

    const uploadPhotos = async (result) => {
        let isConnect = await Utils.checkConnectivity();
        if (isConnect) {
            setLoading(true)
            setProgressCount(`0/${result.length}`);
            const downloadURLs = await Promise.all(result.map((p, i) => uploadImage(p, i, result.length)));
            await addStore(downloadURLs);
        } else {
            await Promise.all(result.map((item, i) => {
                let obj = {};
                const time = new Date().getTime().toString();
                obj["_id"] = String(time);
                obj["storeId"] = String(selectStore?.id);
                obj["image"] = item?.path;
                let res = createStoreImage(obj);
            })).then(() => {
                getStoreImgAPI();
            });
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={CommonStyles.backgroundPrimary} />
            <Header title='Store Details' goBack={() => navigation.goBack()} />
            <View style={styles.subContainer}>
                {
                    loading && <View style={{ marginBottom: 10 }}>
                        <Text>Loading..... {progressCount} <Text>({progressPer}%)</Text></Text>
                        <View style={[styles.progressBar, { backgroundColor: progressPer > 0 ? Theme.colors.primary : Colors.White }]} />
                    </View>
                }
                {store?.storeImgLoading ?
                    <ActivityIndicator color={Colors.Black} />
                    :
                    selectedStoreData?.length > 0 ?
                        <FlatList
                            data={selectedStoreData}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            bounces={false}
                            renderItem={({ item, index }) => renderItem(item, index)}
                            numColumns={2}
                        />
                        :
                        <View style={styles.emptyView}>
                            <Text>Store Image not found</Text>
                        </View>
                }
            </View>
            <View style={styles.btnView}>
                <Button mode="outlined" onPress={() => openImagePicker(true)}>Add Image</Button>
            </View>
            {
                pickerVisibility &&
                <ImagePickerModel
                    visible={pickerVisibility}
                    openImagePicker={(visible) => openImagePicker(visible)}
                    onSelectPickerResult={(response) => onSelectPickerResult(response)}
                />
            }
        </View >
    )
}
export default StoreDetails;