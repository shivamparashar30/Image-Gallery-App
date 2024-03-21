import { Image, StyleSheet, View, Dimensions } from 'react-native'
import React from 'react'

const photos = (item) => {
    const SCREEN_WIDTH = Dimensions.get('window').width;
    // console.log(item);
    const getChildrenStyle = () => {
        return {
            width: (SCREEN_WIDTH - 18) / 2,
            height: Number(Math.random() * 20 + 12) * 10,
            backgroundColor: 'gray',
            margin: 4,
            borderRadius: 18,
        };
    };
    return (
        <View style={getChildrenStyle()} key={item.id}>
            <View style={styles.avatarImage}>
                <Image
                    onError={() => { }}
                    style={styles.img}
                    source={{
                        uri: item.url,
                    }}
                    resizeMode={'cover'}
                />
            </View>
        </View>
    )
}

export default photos

const styles = StyleSheet.create({
    img: {
        width: '100%',
        height: '100%',
    },
    avatarImage: {
        height: '100%',
        width: '100%',
        overflow: 'hidden',
        borderRadius: 18,
    },
})