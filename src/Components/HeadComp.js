import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Colors from '../Utils/Colors';

const HeadComp = ({ textval, props }) => {
  return (
    <View style={{ width: '93%', flexDirection: 'row' }}>
      <TouchableOpacity
        onPress={() => props.navigation.goBack()}
        style={{ width: '10%', height: 56, justifyContent: 'center' }}>
        <View>
          <Entypo name="chevron-left" size={25} color={Colors.darkblack} />
        </View>
      </TouchableOpacity>
      <View style={{ width: '80%', height: 56, justifyContent: 'center' }}>
        <Text style={{ fontSize: 18, color: Colors.darkblack, fontFamily: 'Poppins-Medium', marginTop: 3 }}>
          {textval}
        </Text>
      </View>
    </View>
  );
};

export default HeadComp;
