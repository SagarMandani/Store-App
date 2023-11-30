import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ActivityIndicator, Pressable, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { Button, TextInput } from '@component';
import { Icons, Colors, Constants, CommonStyles, Utils } from '@common';
import styles from './style';
import { useDispatch, useSelector } from 'react-redux';
import { getStore, uploadImageToStore, addStoreInfo } from '@actions';
import realm, { deleteAllStoreImage, getAllStoreImage, deleteStoreImage } from '../../database/databaseMethod';
import storage from '@react-native-firebase/storage';

const Dashboard = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [storeData, setStoreData] = useState([]);
    const [tempStoreData, setTempStoreData] = useState([]);
    const [, setState] = useState({});
    const dispatch = useDispatch();
    const store = useSelector(state => state.store);
    const [search, setSearch] = useState(false);
    const authData = useSelector(state => state.auth);

    useEffect(() => {
        setStoreData(store?.storeList);
        setTempStoreData(store?.storeList);
    }, [store?.storeList])

    useEffect(() => {
        getStore(dispatch);
        syncData();
    }, [])

    const syncData = async () => {
        let isConnect = await Utils.checkConnectivity();
        if (isConnect) {
            let tempStoreImg = []
            await getAllStoreImage().then((res) => {
                let response = JSON.parse(JSON.stringify(res));
                tempStoreImg = response;
            });
            await Promise.all(tempStoreImg.map((p, i) => uploadImage(p))).then(() => deleteAllData());
        }
    }

    const addStore = async (downloadURLs, storeId) => {
        let updateImage = [downloadURLs];
        let dbRef = 'store_info/' + authData.user.uid + '/' + String(storeId);
        addStoreInfo(dbRef, updateImage);
    }

    const uploadImage = async (imgObj) => {
        let path = imgObj?.image;
        let downloadURL
        if(path?.startsWith("http")) {
            downloadURL = path;
            addStore(path, imgObj?.storeId);
        } else {
            const response = await uploadImageToStore(path);
            const { dbRef } = response;      
            downloadURL = await storage().ref(dbRef).getDownloadURL();
            addStore(downloadURL, imgObj?.storeId);
        }     
        return downloadURL;
    };

    const deleteAllData = async () => {
        // whole store image delete
        await deleteAllStoreImage().then((res) => console.log(res));
        // single item store image delete
        // await getAllStoreImage().then((res) => {
        //     let resData = JSON.parse(JSON.stringify(res));
        //     resData && resData.length > 0 ?
        //     resData.map((item) => {
        //         deleteStoreImage(item._id);
        //         })
        //         : null;
        // });
    }

    const renderItem = (item, index) => {
        return (
            <Pressable key={index} onPress={() => navigation.navigate(Constants.Screen.StoreDetails, { item })} style={[styles.listItem, { marginRight: index % 2 == 0 ? 10 : 0 }]}>
                <View style={styles.imageStyle}>
                    <Text>{item?.name}</Text>
                </View>
            </Pressable>
        );
    };

    const onLogout = () => {
        auth()
            .signOut()
            .then(() => {
                navigation.reset({
                    index: 0,
                    routes: [{ name: Constants.Screen.AuthStack }]
                })
            });
    }

    const searchFilterFunction = (text) => {
        if (text) {
            const newData = tempStoreData.filter(
                function (item) {
                    const name = item?.name ? item.name.toUpperCase() : '';
                    const textData = text.toUpperCase();
                    return name.indexOf(textData) > -1;
                }
            );
            setStoreData(newData);
            setSearch(text);
        } else {
            setStoreData(tempStoreData);
            setSearch(text);
        }
    };

    return (
        <View style={styles.container}>
            <SafeAreaView style={CommonStyles.backgroundPrimary} />
            <Text style={styles.title}>Store</Text>
            <View style={styles.subContainer}>
                <TextInput
                    label="Search store name"
                    returnKeyType="done"
                    value={search}
                    onChangeText={(text) => searchFilterFunction(text)}
                    autoCapitalize="none"
                />
                {store?.storeLoading ?
                    <ActivityIndicator color={Colors.Black} />
                    :
                    storeData?.length > 0 ?
                        <FlatList
                            data={storeData}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            bounces={false}
                            renderItem={({ item, index }) => renderItem(item, index)}
                            numColumns={2}
                        />
                        :
                        <View style={styles.emptyView}>
                            <Text>Store not found</Text>
                        </View>
                }
            </View>
            <View style={styles.btnView}>
                <Button mode="outlined" onPress={() => onLogout()}>Logout</Button>
            </View>
        </View>
    )
}
export default Dashboard;