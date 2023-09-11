import React from 'react';
import { Image } from 'react-native';

const ImageComp = ({ imageSrc, imageStylee }) => {
    return (
        <Image
            source={imageSrc}
            style={imageStylee} />
    );
};

export default ImageComp;