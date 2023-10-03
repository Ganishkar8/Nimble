import React, { useState, useRef, useEffect, createRef } from 'react';
import { Text, Image, View, Dimensions } from 'react-native';
import HeadComp from './HeadComp';


const PreviewImage = (props, { navigation, route }) => {
    const [imageName, setImageName] = useState(props.route.params.imageName);
    const [imageUri, setImageUri] = useState(props.route.params.imageUri);
    const [imageHeight, setImageHeight] = useState(null);

    useEffect(() => {

        getImageSize(imageUri);

    }, [imageUri]);


    const getImageSize = (uri) => {
        Image.getSize(uri, (width, height) => {
            // Calculate the height while maintaining the original aspect ratio
            const screenWidth = Dimensions.get('window').width;
            const aspectRatio = width / height;
            const calculatedHeight = screenWidth / aspectRatio;

            setImageHeight(calculatedHeight);
        });
    };
    return (
        <View style={{ backgroundColor: 'white', flex: 1 }}>

            <View style={{
                width: '100%', height: 56, alignItems: 'center', justifyContent: 'center',

            }}>
                <HeadComp textval={imageName} props={props} />
            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000080' }}>
                <Image
                    source={{ uri: imageUri }}
                    style={{ width: '100%', height: imageHeight, marginBottom: 112 }}
                />

            </View>

        </View>
    );
};

export default PreviewImage;