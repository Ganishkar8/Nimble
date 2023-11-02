import React, { useState } from 'react';
import { Text, Image, View, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Colors from '../Utils/Colors';

const CheckBoxComp = ({ textCaption, textStyle, Visible, Disable }) => {
  const [isSelected, setSelection] = useState(false);

  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '93%',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <CheckBox
          value={isSelected}
          enabled={!Disable}
          onValueChange={setSelection}
          color="#000000"
          style={styles.checkbox}
          tintColors={{ true: Colors.darkblue }}
        />
        <Text style={{ color: Colors.black }}>
          {textCaption}
          {Visible && <Text style={{ color: 'red' }}>*</Text>}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    alignSelf: 'center',
    borderColor: Colors.black
  },
});

export default CheckBoxComp;
