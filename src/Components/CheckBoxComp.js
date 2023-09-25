import React, {useState} from 'react';
import {Text, Image, View, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Colors from '../Utils/Colors';

const CheckBoxComp = ({textCaption, textStyle, Visible, Disable}) => {
  const [isSelected, setSelection] = useState(false);

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
        <CheckBox
          value={isSelected}
          enabled={!Disable}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        <Text style={textStyle}>
          {textCaption}
          {Visible && <Text style={{color: 'red'}}>*</Text>}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    alignSelf: 'center',
  },
});

export default CheckBoxComp;
