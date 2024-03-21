import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    SafeAreaView,
    ActivityIndicator,
} from 'react-native';
import StaggeredList, {
    AnimationType,
} from '@mindinventory/react-native-stagger-view';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import photos from '../components/photos.js';
import { isConnected } from '../Connection.js';

const Home = () => {


    const route = useRoute();
    const selectedAnimType = route && route.params && route.params.animationType;
    const [imageURL, setImageURL] = useState([]);
    const [prevImageURL, setPrevImageURL] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const addUrls = (data) => {
        return data.map(({ height_s, width_s, url_s, id }) => ({
            id: id,
            height: height_s,
            width: width_s,
            url: url_s
        }))
    }

    const getImages = () => {
        AsyncStorage.getItem("imageData").then(apiResponse => {
            if (apiResponse === null) {
                fetchImages();
            } else {
                // console.log(JSON.parse(apiResponse));
                let jsonData = JSON.parse(apiResponse);

                setImageURL(addUrls(jsonData.data.photos.photo));

            }
        }).catch((err) => {
            // console.log("Image" + err)

        });
    }

    useEffect(() => {
        // getImages();
        isConnected()
            .then(() => {
                console.log('internet connected');
                removeData();
                fetchImages();
            })
            .catch(() => {
                console.log('internet not connected');
                getImages();
            })
        const fetchDataInterval = setInterval(() => {
            fetchImages();
        }, 20000);

        return () => clearInterval(fetchDataInterval);

    }, []);

    const removeData = () => {
        AsyncStorage.removeItem("imageData").then(response => {
            console.log("Data Removed");
        }).catch(err => {
            console.log("Delete  Error " + err);
        });

    }

    const fetchImages = () => {
        setIsLoading(true)
        axios({
            method: 'get',
            url: 'https://api.flickr.com/services/rest/',
            headers: { 'Content-Type': 'application/json', 'charset': 'utf-8' },
            params: {
                method: 'flickr.photos.getRecent',
                per_page: '20',
                page: '1',
                api_key: '6f102c62f41998d151e5a1b48713cf13',
                format: 'json',
                nojsoncallback: '1',
                extras: 'url_s'
            },

        }).then((apiResponse) => {
            setIsLoading(false);
            // console.log('====================================');
            // console.log(apiResponse.data.photos.photo);
            if (JSON.stringify(apiResponse.data.photos.photo) !== JSON.stringify(prevImageURL)) {
                handleAsyncStorage(JSON.stringify(apiResponse));
                setImageURL(addUrls(apiResponse.data.photos.photo));
                prevImageURL(addUrls(apiResponse.data.photos.photo));
            }

            // console.log(imageURL);
            // console.log('====================================');

        }).catch((err) => {
            // console.log(err);
            setIsLoading(false);
        });
    };

    const handleAsyncStorage = (data) => {
        AsyncStorage.setItem('imageData', data).then(() => {
            // console.log("Images Saved")

        }).catch(error => {
            // console.log("Data Was Not Stored: " + error)
            // fetchImages();
        })
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.mainWrapperView}>
                {isLoading ? (
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator color={'black'} size={'large'} />
                    </View>
                ) : (
                    <StaggeredList
                        data={imageURL}
                        animationType={selectedAnimType}
                        contentContainerStyle={styles.contentContainer}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => photos(item)}
                        LoadingView={
                            <View style={styles.activityIndicatorWrapper}>
                                <ActivityIndicator color={'black'} size={'large'} />
                            </View>
                        }
                    />

                )}
            </View>
        </SafeAreaView>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: 'gray',
    },
    mainWrapperView: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 20,
    },
    activityIndicatorWrapper: {
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    contentContainer: {
        paddingHorizontal: 0,
        alignSelf: 'stretch',
    },
})