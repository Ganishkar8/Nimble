import React from 'react';
import { Text } from 'react-native';

const TextComp = ({textVal,textStyle,Visible}) => {
    return (
        <Text style = {textStyle}>{textVal} {Visible &&<Text style={{color:'red'}}>*</Text>}</Text>
    );
};

export default TextComp;