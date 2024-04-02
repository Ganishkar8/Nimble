import React, { useEffect, useState, forwardRef } from 'react';
import { View, Text } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Colors from '../../Utils/Colors';
import { connect } from 'react-redux';
import { languageAction } from '../../Utils/redux/actions/languageAction';
import { language } from '../../Utils/LanguageString';

const SortByComp = ({ props, filterClick, selectedValue, from }) => {

    const [sortValue, setSortValue] = React.useState(selectedValue);

    useEffect(() => {

        if (selectedValue) {
            setSortValue(selectedValue)

        }
    }, [selectedValue]);


    const setFilterVal = (value) => {
        if (value == 1) {
            setSortValue('DESC')
            filterClick('SO', 'DESC', from)
        } else {
            setSortValue('ASC')
            filterClick('SO', 'ASC', from)
        }
    }
    return (
        <View>
            <View style={{ marginLeft: 15 }}>
                <Text
                    style={{ marginTop: 15, fontSize: 14, color: Colors.mediumgrey, fontFamily: 'Poppins-Medium' }}>
                    {language[0][props.language].str_sortby}
                </Text>
                <Text
                    style={{ marginTop: 8, fontSize: 14, color: Colors.black, fontFamily: 'Poppins-Medium' }}>
                    {language[0][props.language].str_creationdate}
                </Text>
            </View>
            <View style={{ width: '100%', alignItems: 'center', marginTop: '3%' }}>

                <View style={{ width: '100%', marginTop: 3, marginLeft: 15 }}>

                    <View style={{ flexDirection: 'row', marginTop: '5%' }}>
                        <View style={{ width: '18%', justifyContent: 'center' }}>
                            <RadioButton
                                uncheckedColor={Colors.darkblue}
                                value="DESC"
                                color={Colors.darkblue}
                                status={sortValue === 'DESC' ? 'checked' : 'unchecked'}
                                onPress={() => setFilterVal(1)}
                            />
                        </View>
                        <View style={{ width: '70%', justifyContent: 'center' }}>
                            <Text
                                style={{
                                    color: Colors.black,
                                    fontSize: 15,
                                    fontFamily: 'Poppins-Medium',
                                    marginTop: 4
                                }}>
                                {language[0][props.language].str_lto}
                            </Text>
                        </View>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: '3%' }}>
                        <View style={{ width: '18%', justifyContent: 'center' }}>
                            <RadioButton
                                uncheckedColor={Colors.darkblue}
                                value="ASC"
                                color={Colors.darkblue}
                                status={sortValue === 'ASC' ? 'checked' : 'unchecked'}
                                onPress={() => setFilterVal(2)}
                            />
                        </View>
                        <View style={{ width: '70%', justifyContent: 'center' }}>
                            <Text
                                style={{
                                    color: Colors.black,
                                    fontSize: 15,
                                    fontFamily: 'Poppins-Medium',
                                    marginTop: 4
                                }}>
                                {language[0][props.language].str_otl}
                            </Text>
                        </View>


                    </View>
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


export default connect(mapStateToProps, mapDispatchToProps)(SortByComp);
