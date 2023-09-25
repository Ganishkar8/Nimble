import React from 'react';
import { View, Text, TextInput } from 'react-native';
import Colors from '../../Utils/Colors';
import TextComp from '../TextComp';

import { connect } from 'react-redux';
import { languageAction } from '../../Utils/redux/actions/languageAction';
import { language } from '../../Utils/LanguageString';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Commonstyles from '../../Utils/Commonstyles';

import { Picker } from '@react-native-picker/picker';

const AgeingComp = ({ props, filterClick }) => {

    const [choosenLabel, setChoosenLabel] = React.useState('Native');
    const [choosenIndex, setChoosenIndex] = React.useState('2');
    const [age, setAge] = React.useState('');


    const updateAgeData = (value,ind,val) => {
        let data = {
            AGE: value,
            Index: ind,
            Label: val
        };

        filterClick('AG', data)
    }
    return (
        <View>
            <View style={{ marginLeft: 15 }}>
                <Text
                    style={{ marginTop: 15, fontSize: 14, color: Colors.dimText }}>
                    {language[0][props.language].str_ageingcap}
                </Text>
            </View>
            <View style={{ width: '100%', alignItems: 'center', marginLeft: 15 }}>

                <View style={{ width: '100%', marginTop: 3 }}>
                    <TextComp textStyle={{ marginTop: 15, fontSize: 14, color: Colors.dimmText, marginLeft: 3 }} textVal={language[0][props.language].str_operator} Visible={true}></TextComp>

                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={{ width: '6%', marginTop: 16 }}>
                            <MaterialIcons name='keyboard-arrow-right' size={20} color={Colors.dimmText} />
                        </View>
                        <View style={{
                            width: '95%',
                        }}>

                            <Picker
                                selectedValue={choosenLabel}
                                style={{
                                    height: 50,
                                    width: '85%',
                                    borderRadius: 8,
                                    borderWidth: 1,
                                    borderColor: '#ccc',
                                    textAlign: 'center'
                                }}
                                onValueChange={(itemValue, itemIndex) => {
                                    setChoosenLabel(itemValue);
                                    setChoosenIndex(itemIndex);
                                    updateAgeData(age,itemIndex,itemValue);
                                }}>
                                <Picker.Item label="Hello" value="Hello" />
                                <Picker.Item label="React" value="React" />
                                <Picker.Item label="Native" value="Native" />
                                <Picker.Item label="How" value="How" />
                                <Picker.Item label="are" value="are" />
                                <Picker.Item label="you" value="you" />
                            </Picker>

                        </View>

                    </View>
                    <View style={{ width: '80%', height: 1.5, backgroundColor: Colors.line, marginLeft: 4 }} />
                </View>
            </View>
            <View style={{ width: '100%', alignItems: 'center', marginLeft: 15 }}>

                <View style={{ width: '100%', marginTop: 3 }}>

                    <TextComp textStyle={{ marginTop: 15, fontSize: 14, color: Colors.dimmText, marginLeft: 3 }} textVal={language[0][props.language].str_age} Visible={true}></TextComp>
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={{ width: '70%' }}>
                            <TextInput
                                value={age}
                                onChangeText={txt => {
                                    setAge(txt);
                                    updateAgeData(txt,choosenIndex,choosenLabel);
                                }}
                                placeholder={''}
                                placeholderTextColor={Colors.lightgrey}
                                secureTextEntry={false}
                                autoCapitalize="none"
                                inputMode='numeric'
                                maxLength={2}
                                style={[Commonstyles.textinputtextStyle, { color: Colors.dimmText }]}
                            />
                        </View>

                    </View>
                    <View style={{ width: '80%', height: 1.5, backgroundColor: Colors.line, marginLeft: 4 }} />
                </View>
            </View>
        </View>
    );
};
const mapStateToProps = (state) => {
    const { language } = state.languageReducer;
    return {
        language: language
    }
}

const mapDispatchToProps = (dispatch) => ({
    languageAction: (item) => dispatch(languageAction(item)),
});


export default connect(mapStateToProps, mapDispatchToProps)(AgeingComp);
