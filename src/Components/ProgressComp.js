import React from 'react';
import { Image, Text, View } from 'react-native';
import Colors from '../Utils/Colors';
import TextComp from './TextComp';
import { ProgressBar, MD3Colors } from 'react-native-paper';

const ProgressComp = ({ progressvalue, imageStylee }) => {
    return (
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <View style={{ width: '88%', justifyContent: 'center' }}>

                <ProgressBar progress={progressvalue} color={Colors.green} style={{ height: 5, borderRadius: 5, }} />

            </View>

            <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center' }}>

                <TextComp textVal="1 of 4" textStyle={{ fontSize: 12, color: Colors.lightgrey, textAlign: 'center' }}></TextComp>

            </View>



        </View>
    );
};

export default ProgressComp;