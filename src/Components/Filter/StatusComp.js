import React, { useState, useRef, useEffect, createRef } from 'react';
import { View, Text, FlatList } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Colors from '../../Utils/Colors';

import { connect } from 'react-redux';
import { languageAction } from '../../Utils/redux/actions/languageAction';
import { language } from '../../Utils/LanguageString';

const StatusComp = ({ props, statusData, filterClick, reload }) => {

    const [statusFilterData, setStatusFilterData] = React.useState(statusData);
    const [refreshFlatlist, setRefreshFlatList] = React.useState(false);

    useEffect(() => {
        if (statusData) {
            setStatusFilterData(statusData)
        }
    }, [statusData]);

    const updateStatusData = (item) => {
        let fiterStatusPosition = statusFilterData
        for (let i = 0; i < fiterStatusPosition.length; i++) {
            if (fiterStatusPosition[i].id == item.id) {
                fiterStatusPosition[i].checked = true
            } else {
                fiterStatusPosition[i].checked = false
            }
        }
        setStatusFilterData(fiterStatusPosition)
        setRefreshFlatList(!refreshFlatlist)
        filterClick('ST', fiterStatusPosition)
    }
    return (
        <View>
            <View style={{ marginLeft: 15 }}>
                <Text
                    style={{ marginTop: 15, fontSize: 14, color: Colors.dimText }}>
                    {language[0][props.language].str_statuscap}
                </Text>
            </View>
            <View style={{ width: '100%', alignItems: 'center' }}>

                <View style={{ width: '100%', marginTop: 3, marginLeft: 15 }}>

                    <FlatList
                        data={statusFilterData}
                        extraData={refreshFlatlist}
                        horizontal={false}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item, index) => item.id}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={{ flexDirection: 'row', marginTop: 2, alignItems: 'center' }}>

                                    <View style={{ flexDirection: 'row', marginTop: '2%' }}>
                                        <View style={{ width: '18%', justifyContent: 'center' }}>
                                            <RadioButton
                                                uncheckedColor={Colors.darkblue}
                                                color={Colors.darkblue}
                                                status={item.checked ? 'checked' : 'unchecked'}
                                                //status={checked === 'second' ? 'checked' : 'unchecked'}
                                                onPress={() => updateStatusData(item)}
                                            />
                                        </View>
                                        <View style={{ width: '70%', justifyContent: 'center' }}>
                                            <Text
                                                style={{
                                                    color: Colors.black,
                                                    fontSize: 15,
                                                }}>
                                                {item.name}
                                            </Text>
                                        </View>

                                    </View>
                                </View>
                            )
                        }}
                    />
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


export default connect(mapStateToProps, mapDispatchToProps)(StatusComp);
