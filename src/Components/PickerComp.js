import React from 'react';
import { TextInput, View } from 'react-native';
import Colors from '../Utils/Colors';
import Commonstyles from '../Utils/Commonstyles';
import { Picker } from '@react-native-picker/picker';

const PickerComp = ({ textLabel, pickerStyle, Disable, pickerdata, componentName, handlePickerClick }) => {

    const setPicker = (label, index) => {
        handlePickerClick(componentName, label, index);
    };

    return (
        <View style={{ flexDirection: 'row' }}>
            <View style={{ width: '95%' }}>

                <Picker
                    selectedValue={textLabel}
                    style={pickerStyle}
                    enabled={!Disable}
                    onValueChange={(itemValue, itemIndex) => {
                        setPicker(itemValue, itemIndex)
                    }}>

                    {
                        pickerdata.map(item => {
                            return <Picker.Item value={item.SubCodeID} label={item.Label} />
                        })
                    }
                </Picker>
            </View>

            <View style={{
                width: '90%', marginTop: 6, flexDirection: 'row',
                borderBottomWidth: 1, borderBottomColor: '#e2e2e2', position: 'absolute', bottom: 3
            }}></View>

        </View>
    );
};

export default PickerComp;
