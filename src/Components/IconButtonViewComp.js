/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React from 'react';
import {TouchableOpacity, View, Image} from 'react-native';
import Colors from '../Utils/Colors';
import Commonstyles from '../Utils/Commonstyles';
import TextComp from './TextComp';

const IconButtonViewComp = ({
  icon,
  textValue,
  textStyle,
  viewStyle,
  innerStyle,
  handleClick,
}) => {
  const onClick = () => {
    handleClick();
  };

  let iconSource;

  // Determine the icon source based on the `icon` prop value
  if (icon === 'h') {
    iconSource = require('../Images/applicantimage.png');
  } else if (icon === '+') {
    iconSource = require('../Images/materialadd.png');
  }

  return (
    <View style={viewStyle}>
      <TouchableOpacity
        onPress={onClick}
        activeOpacity={0.8}
        style={innerStyle}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {icon && (
            <Image
              source={iconSource}
              style={{width: 12, height: 20, marginRight: 10}}
              resizeMode="contain"
            />
          )}
          <TextComp textVal={textValue} textStyle={textStyle} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default IconButtonViewComp;
