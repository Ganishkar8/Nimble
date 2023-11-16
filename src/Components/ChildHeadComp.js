import React from 'react';
import { Text, TouchableOpacity, Image, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../Utils/Colors';

const ChildHeadComp = ({ textval }) => {
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={require('../Images/applicantimage.png')}
          style={{ width: 14, height: 32 }}
        />
        <Text
          style={{
            marginLeft: 10,
            fontSize: 14,
            fontFamily: 'Poppins-Medium',
            color: Colors.mediumgrey,
          }}>
          {textval}
        </Text>
      </View>
    </View>
  );
};

export default ChildHeadComp;
