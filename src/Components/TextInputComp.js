import React from 'react';
import { TextInput, View } from 'react-native';
import Colors from '../Utils/Colors';
import Commonstyles from '../Utils/Commonstyles';

const TextInputComp = ({
  textValue,
  textStyle,
  Disable,
  type,
  ComponentName,
  reference,
  returnKey,
  handleClick,
  handleReference,
}) => {
  const setValue = txt => {
    handleClick(ComponentName, txt);
  };

  return (
    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, borderBottomWidth: 1, borderBottomColor: '#e2e2e2' }}>

      <TextInput
        value={textValue}
        onChangeText={txt => { setValue(txt) }}
        placeholder={''}
        editable={!Disable}
        placeholderTextColor={Colors.lightgrey}
        secureTextEntry={false}
        keyboardType={type}
        autoCapitalize="characters"
        style={[textStyle, { color: !Disable ? Colors.black : Colors.lightgrey }]}
        ref={reference}
        returnKeyType={returnKey}
        onSubmitEditing={() => { handleReference(ComponentName) }}
      />

    </View>
  );
};

export default TextInputComp;
