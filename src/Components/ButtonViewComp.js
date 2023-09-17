import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Colors from '../Utils/Colors';
import Commonstyles from '../Utils/Commonstyles';
import TextComp from './TextComp';

const ButtonViewComp = ({ textValue, textStyle, viewStyle, innerStyle, handleClick }) => {

    const onClick = () => {
        handleClick();
    };

    return (
        <View
            style={viewStyle}>
            <TouchableOpacity onPress={onClick} activeOpacity={0.8} style={innerStyle}>
                <View >
                    <TextComp textVal={textValue} textStyle={textStyle} />

                </View>
            </TouchableOpacity>
        </View>
    );
};

export default ButtonViewComp;
