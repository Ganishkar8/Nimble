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
  length, multilines
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
        contextMenuHidden={true}
        placeholderTextColor={Colors.lightgrey}
        secureTextEntry={false}
        keyboardType={type}
        multiline={multilines ? true : false}
        maxLength={length}
        autoCapitalize="characters"
        style={[textStyle, { color: !Disable ? Colors.black : Colors.lightgrey, overflow: 'scroll' }]}
        ref={reference}
        returnKeyType={returnKey}
        onSubmitEditing={() => { handleReference(ComponentName) }}
      />

    </View>
  );
};

export default TextInputComp;
