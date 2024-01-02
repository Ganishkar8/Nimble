import React from 'react';
import { TextInput, View } from 'react-native';
import Colors from '../Utils/Colors';
import Commonstyles from '../Utils/Commonstyles';
import { Picker } from '@react-native-picker/picker';

const PickerComp = ({
    textLabel,
    pickerStyle,
    Disable,
    pickerdata,
    componentName,
    handlePickerClick,
}) => {
    const setPicker = (label, index) => {
        handlePickerClick(componentName, label, index);
    };

    return (
        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
            <View style={{ width: '96%', marginTop: 4 }}>

                <Picker
                    selectedValue={textLabel}
                    style={[pickerStyle, { color: !Disable ? Colors.black : Colors.lightgrey, }]}
                    enabled={!Disable}
                    mode='dropdown'
                    dropdownIconColor={!Disable ? Colors.black : Colors.lightgrey}
                    themeVariant='light'
                    onValueChange={(itemValue, itemIndex) => {
                        setPicker(itemValue, itemIndex)
                    }}>
                    {/* {componentName == 'productIdPicker' && */}
                    <Picker.Item key={0} value='' label='Select' style={{ backgroundColor: '#fff', color: '#000', fontFamily: 'PoppinsRegular' }} />
                    {/* } */}

                    {

                        pickerdata.map((item, index) => {
                            let labelValue;

                            // switch (componentName) {
                            //     case 'industryPicker':
                            //     case 'loanTypePicker':
                            //     case 'productIdPicker':
                            //         labelValue = item.genericName;
                            //         break;
                            //     default:
                            //         labelValue = item.label;
                            // }

                            return <Picker.Item key={index + 1} value={item.subCodeId} label={item.Description} style={{ backgroundColor: '#fff', color: '#000', fontFamily: 'PoppinsRegular' }} />
                        })
                    }
                </Picker>
            </View>

            <View
                style={{
                    width: '90%',
                    marginTop: 6,
                    flexDirection: 'row',
                    borderBottomWidth: 1,
                    borderBottomColor: '#e2e2e2',
                    position: 'absolute',
                    bottom: 3,
                }}></View>
        </View>
    );
};

export default PickerComp;
