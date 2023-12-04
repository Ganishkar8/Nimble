import React, { useEffect, useState } from 'react';
import {
    View,
    StatusBar,
    Text,
    Image,
    FlatList,
    StyleSheet,
    TextInput,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    ToastAndroid
} from 'react-native';
import TextComp from '../../../../Components/TextComp';
import Colors from '../../../../Utils/Colors';
import MyStatusBar from '../../../../Components/MyStatusBar';
import Loading from '../../../../Components/Loading';
import { connect } from 'react-redux';
import { languageAction } from '../../../../Utils/redux/actions/languageAction';
import { language } from '../../../../Utils/LanguageString';
import HeadComp from '../../../../Components/HeadComp';
import ButtonViewComp from '../../../../Components/ButtonViewComp';
import Commonstyles from '../../../../Utils/Commonstyles';
import tbl_SystemCodeDetails from '../../../../Database/Table/tbl_SystemCodeDetails';
import PickerComp from '../../../../Components/PickerComp';
import TextInputComp from '../../../../Components/TextInputComp';
import ErrorMessageModal from '../../../../Components/ErrorMessageModal';
import apiInstancelocal from '../../../../Utils/apiInstancelocal';
import ErrorModal from '../../../../Components/ErrorModal';

const BusinessIncome = (props) => {

    const [itemLabel, setItemLabel] = useState('');
    const [itemIndex, setItemIndex] = useState('');
    const [itemData, setItemData] = useState([]);
    const [leaduserCodeDetail, setLeadUserCodeDetail] = useState(props.mobilecodedetail.leadUserCodeDto);

    const [incomeAmount, setIncomeAmount] = useState('');

    const [systemCodeDetail, setSystemCodeDetail] = useState(props.mobilecodedetail.leadSystemCodeDto);

    useEffect(() => {

        getSystemCodeDetail();

    }, []);



    const handleClick = (componentName, textValue) => {

        setIncomeAmount(textValue)

    }

    const handlePickerClick = (componentName, label, index) => {

        if (componentName === 'ItemPicker') {
            setItemLabel(label);
            setItemIndex(index);
        }

    }

    const validate = () => {
        var flag = false; var i = 1;
        var errorMessage = '';

        return flag;
    }

    const addItem = () => {
        if (itemLabel.length <= 0 && incomeAmount.length <= 0) {
            showToast();
        } else {
            props.addIncome(itemLabel, incomeAmount, props.componentName)
            props.onCloseIncome();
        }

    }

    const showToast = () => {
        ToastAndroid.showWithGravityAndOffset(
            'Please Enter All Details',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
    };

    const getSystemCodeDetail = () => {

        if (props.componentName == 'Income') {

            const excludedMasterIds = props.incomeList.map(item => item.incomeLabel);

            const filteredItemData = leaduserCodeDetail
                .filter(data => data.masterId === 'BUSINESS_INCOME' && !excludedMasterIds.includes(data.subCodeId))
                .sort((a, b) => a.displayOrder - b.displayOrder);

            setItemData(filteredItemData);
        } else if (props.componentName == 'OtherIncome') {

            const excludedMasterIds = props.otherIncomeList.map(item => item.incomeLabel);

            const filteredItemData = leaduserCodeDetail
                .filter(data => data.masterId === 'OTHER_SOURCE_INCOME' && !excludedMasterIds.includes(data.subCodeId))
                .sort((a, b) => a.displayOrder - b.displayOrder);

            setItemData(filteredItemData);
        } else if (props.componentName == 'Expenses') {

            const excludedMasterIds = props.otherIncomeList.map(item => item.incomeLabel);

            const filteredItemData = leaduserCodeDetail
                .filter(data => data.masterId === 'BUSINESS_EXPENSES' && !excludedMasterIds.includes(data.subCodeId))
                .sort((a, b) => a.displayOrder - b.displayOrder);

            setItemData(filteredItemData);
        } else if (props.componentName == 'OtherExpense') {

            const excludedMasterIds = props.otherIncomeList.map(item => item.incomeLabel);

            const filteredItemData = leaduserCodeDetail
                .filter(data => data.masterId === 'OTHER_SOURCE_EXPENSES' && !excludedMasterIds.includes(data.subCodeId))
                .sort((a, b) => a.displayOrder - b.displayOrder);

            setItemData(filteredItemData);
        }

    }


    return (

        <SafeAreaView style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">
                <View style={{ flex: 1 }}>

                    <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>

                            <TextComp textVal={props.componentName} textStyle={Commonstyles.inputtextStyle} Visible={true} />

                        </View>

                        <PickerComp textLabel={itemLabel} pickerStyle={Commonstyles.picker} Disable={false} pickerdata={itemData} componentName='ItemPicker' handlePickerClick={handlePickerClick} />


                    </View>

                    <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={language[0][props.language].str_amount.toUpperCase()} textStyle={Commonstyles.inputtextStyle} Visible={true} />
                        </View>

                        <TextInputComp textValue={incomeAmount} textStyle={[Commonstyles.textinputtextStyle, { maxHeight: 100 }]} type='numeric' Disable={false} ComponentName='incomeAmount' returnKey="done" handleClick={handleClick} length={10} multilines={true} />

                    </View>

                    <View style={{ alignItems: 'flex-end', marginTop: 25 }}>

                        <ButtonViewComp textValue={language[0][props.language].str_add.toUpperCase()} textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }} viewStyle={[Commonstyles.buttonView, { width: 100, height: 20 }]} innerStyle={[Commonstyles.buttonViewInnerStyle, { height: 35 }]} handleClick={addItem} />
                    </View>

                </View>



            </ScrollView>

        </SafeAreaView>
    );
};

const mapStateToProps = (state) => {
    const { language } = state.languageReducer;
    const { profileDetails } = state.profileReducer;
    const { mobileCodeDetails } = state.mobilecodeReducer;
    return {
        language: language,
        profiledetail: profileDetails,
        mobilecodedetail: mobileCodeDetails
    }
}

const mapDispatchToProps = (dispatch) => ({
    languageAction: (item) => dispatch(languageAction(item)),
});


export default connect(mapStateToProps, mapDispatchToProps)(BusinessIncome);

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f8fa',
        alignItems: 'center'
    },
    parentView: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {

        paddingBottom: 50,
        flexGrow: 1
    },
    headerView: {
        width: ('100%'),
        paddingVertical: 15,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewStyle: {
        alignItems: 'center',
        paddingHorizontal: 20, marginLeft: 9, marginRight: 4,
        borderColor: '#e3e3e3',
        marginBottom: 4,
        marginStart: 12,
        paddingVertical: 7,
        borderWidth: 1,
        borderRadius: 8,
    },
    bottomNavigationView: {
        backgroundColor: '#fff',
        width: '100%',
        height: 400,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    textColor: {
        color: '#000',
        fontSize: 14,
        fontWeight: '400'
    },
    viewStyleFilter: {
        alignItems: 'center', justifyContent: 'center',
    },
    viewStyleStatusData: {
        alignItems: 'center'
    },
    picker: {
        height: 50,
        width: '85%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlign: 'center'
    },
    pendingbackground: {
        width: 90, borderColor: Colors.pendingBorder, backgroundColor: Colors.pendingBg, alignItems: 'center', padding: 3, borderRadius: 15, borderWidth: 1
    },
    approvedbackground: {
        width: 90, borderColor: Colors.approvedBorder, backgroundColor: Colors.approvedBg, alignItems: 'center', padding: 3, borderRadius: 15, borderWidth: 1
    },
    line: {
        backgroundColor: '#f1f1f1', // Change the color as needed
        height: 1,
        width: '90%', marginLeft: '5%',
        marginTop: '5%', alignItems: 'center'         // Adjust the height as needed
    },
    disableBg: {
        width: '88%', height: 50, backgroundColor: Colors.disableBg,
        borderRadius: 45, alignItems: 'center', justifyContent: 'center'
    },
    enableBg: {
        width: '88%', height: 50, backgroundColor: Colors.enableBg,
        borderRadius: 45, alignItems: 'center', justifyContent: 'center'
    }, fab: {
        position: 'absolute',
        margin: 0,
        right: 0,
        bottom: 12,
        width: '100%',

    },

});