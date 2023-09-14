import React, { useState, useRef, useEffect, createRef } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    StatusBar,
    Keyboard,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    ToastAndroid,
    KeyboardAvoidingView,
    Dimensions,
    ImageBackground,
    TextInput,
    Alert,
    Platform,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import apiInstance from '../Utils/apiInstance';
import apiInstancelocal from '../Utils/apiInstancelocal';
import jwtDecode from 'jwt-decode';
import Colors from '../Utils/Colors';
import MyStatusBar from './ MyStatusBar';
import Loading from './Loading';
import TextComp from '../Components/TextComp';
import { connect } from 'react-redux';
import { languageAction } from '../Utils/redux/actions/languageAction';
import { language } from '../Utils/LanguageString';
import Commonstyles from '../Utils/Commonstyles';
import ImageComp from '../Components/ImageComp';
import Entypo from 'react-native-vector-icons/Entypo';
import HeadComp from '../Components/HeadComp';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import ProgressComp from '../Components/ProgressComp';
import tbl_SystemMandatoryFields from '../Database/Table/tbl_SystemMandatoryFields';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Common from '../Utils/Common';
import tbl_SystemCodeDetails from '../Database/Table/tbl_SystemCodeDetails';

const LeadCreationBasic = (props, { navigation }) => {

    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = React.useState('first');
    const [custCatgLabel, setCustCatgLabel] = useState('');
    const [custCatgIndex, setCustCatgIndex] = useState('');
    const [custCatgCaption, setCustCatgCaption] = useState('CUSTOMER CATEGORY');
    const [firstName, setFirstName] = useState('');
    const [firstNameCaption, setFirstNameCaption] = useState('FIRST NAME');
    const [firstNameMan, setFirstNameMan] = useState(false);
    const [firstNameVisible, setFirstNameVisible] = useState(true);
    const [firstNameDisable, setFirstNameDisable] = useState(false);
    const [middleName, setMiddleName] = useState('');
    const [middleNameMan, setMiddleNameMan] = useState(false);
    const [middleNameCaption, setMiddleNameCaption] = useState('MIDDLE NAME');
    const [middleNameVisible, setMiddleNameVisible] = useState(true);
    const [middleNameDisable, setMiddleNameDisable] = useState(false);
    const [lastName, setLastName] = useState('');
    const [lastNameCaption, setLastNameCaption] = useState('LAST NAME');
    const [lastNameMan, setLastNameMan] = useState(false);
    const [lastNameVisible, setLastNameVisible] = useState(true);
    const [lastNameDisable, setLastNameDisable] = useState(false);
    const [mobileNumber, setMobileNumber] = useState('');
    const [mobileNumberCaption, setMobileNumberCaption] = useState('MOBILE NUMBER');
    const [mobileNumberMan, setMobileNumberMan] = useState(false);
    const [mobileNumberVisible, setMobileNumberVisible] = useState(true);
    const [mobileNumberDisable, setMobileNumberDisable] = useState(false);
    const [custCatgMan, setCustCatgMan] = useState(false);
    const [custCatgVisible, setCustCatgVisible] = useState(true);
    const [custCatgDisable, setCustCatgDisable] = useState(false);
    const [custCatData, setCustCatData] = useState([]);
    const [errMsg, setErrMsg] = useState('');

    const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
    const [deleteVisible, setDeleteVisible] = useState(false);


    const showBottomSheet = () => setBottomErrorSheetVisible(true);
    const hideBottomSheet = () => setBottomErrorSheetVisible(false);

    const firstNameRef = useRef(null);
    const middleNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const mobileNumberRef = useRef(null);

    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        makeSystemMandatoryFields();
        pickerData();

        return () =>
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
    }, [navigation]);


    const pickerData = async () => {
        tbl_SystemCodeDetails.getSystemCodeDetailsBasedOnID('CustomerCategory').then(value => {
            if (value !== undefined && value.length > 0) {
                console.log(value)

                for (var i = 0; i < value.length; i++) {
                    if (value[i].IsDefault === '1') {
                        setCustCatgLabel(value[i].SubCodeID);
                        setCustCatgIndex(i + 2);
                    }
                }

                setCustCatData(value)

            }
        })
    }

    const makeSystemMandatoryFields = () => {

        tbl_SystemMandatoryFields.getSystemMandatoryFieldsBasedOnFieldUIID('sp_custcatg').then(value => {
            if (value !== undefined && value.length > 0) {
                console.log(value[0])
                setCustCatgCaption(value[0].FieldName)
                if (value[0].IsMandatory == "1") {
                    setCustCatgMan(true);
                }
                if (value[0].IsHide == "1") {
                    setCustCatgVisible(false);
                }
                if (value[0].IsDisable == "1") {
                    setCustCatgDisable(true);
                }
                if (value[0].IsCaptionChange == "1") {
                    setCustCatgCaption(value[0].FieldCaptionChange)
                }
            }
        })

        //firstName
        tbl_SystemMandatoryFields.getSystemMandatoryFieldsBasedOnFieldUIID('et_firstname').then(value => {
            if (value !== undefined && value.length > 0) {
                console.log(value[0])
                setFirstNameCaption(value[0].FieldName)
                if (value[0].IsMandatory == "1") {
                    setFirstNameMan(true);
                }
                if (value[0].IsHide == "1") {
                    setFirstNameVisible(false);
                }
                if (value[0].IsDisable == "1") {
                    setFirstNameDisable(true);
                }
                if (value[0].IsCaptionChange == "1") {
                    setFirstNameCaption(value[0].FieldCaptionChange)
                }
            }
        })

        tbl_SystemMandatoryFields.getSystemMandatoryFieldsBasedOnFieldUIID('et_lastname').then(value => {


            if (value !== undefined && value.length > 0) {
                console.log(value)
                setLastNameCaption(value[0].FieldName)
                if (value[0].IsMandatory == "1") {
                    setLastNameMan(true);
                }
                if (value[0].IsHide == "1") {
                    setLastNameVisible(false);
                }
                if (value[0].IsDisable == "1") {
                    setLastNameDisable(true);
                }
                if (value[0].IsCaptionChange == "1") {
                    setLastNameCaption(value[0].FieldCaptionChange)
                }
            }
        })

        tbl_SystemMandatoryFields.getSystemMandatoryFieldsBasedOnFieldUIID('et_middlename').then(value => {
            if (value !== undefined && value.length > 0) {
                console.log(value)
                setMiddleNameCaption(value[0].FieldName)
                if (value[0].IsMandatory == "1") {
                    setMiddleNameMan(true);
                }
                if (value[0].IsHide == "1") {
                    setMiddleNameVisible(false);
                }
                if (value[0].IsDisable == "1") {
                    setMiddleNameDisable(true);
                }
                if (value[0].IsCaptionChange == "1") {
                    setMiddleNameCaption(value[0].FieldCaptionChange)
                }
            }
        })

        tbl_SystemMandatoryFields.getSystemMandatoryFieldsBasedOnFieldUIID('et_mobilenumber').then(value => {
            if (value !== undefined && value.length > 0) {
                console.log(value)
                setMobileNumberCaption(value[0].FieldName)
                if (value[0].IsMandatory == "1") {
                    setMobileNumberMan(true);
                }
                if (value[0].IsHide == "1") {
                    setMobileNumberVisible(false);
                }
                if (value[0].IsDisable == "1") {
                    setMobileNumberDisable(true);
                }
                if (value[0].IsCaptionChange == "1") {
                    setMobileNumberCaption(value[0].FieldCaptionChange)
                }
            }
        })

    }


    const updateLeadDetails = () => {

        if (validate()) {
            showBottomSheet();
        } else {

            const appDetails = {
                "createdBy": global.USERID,
                "createdOn": '',
                "isActive" : true,
                "leadCreationBasicDetails":{
                    "createdBy": global.USERID,
                    "createdOn": '',
                    "customerCategoryId": custCatgLabel,
                    "firstName": firstName,
                    "middleName": middleName,
                    "lastName": lastName,
                    "mobileNumber": mobileNumber
                },
                "leadCreationBusinessDetails":{},
                "leadCreationLoanDetails":{},
                "leadCreationDms":{}
            }
            const baseURL = '8999'
            setLoading(true)
            apiInstancelocal(baseURL).post('/api/v1/lead-creation-initiation',{
                 headers:{
                    'accept': 'application/json',
                 },
                 params: {
                    appDetails
                 }
                })
                .then(async (response) => {
                    // Handle the response data
                    console.log("LeadCreationBasicApiResponse::" + JSON.stringify(response));
                    
                    setLoading(false)
                    props.navigation.navigate('LeadCreationBusiness')
    
                })
                .catch((error) => {
                    // Handle the error
                    console.log("Error"+JSON.stringify(error.response))
                    setLoading(false)
                    alert(error);
                });

            
        }


    }

    const validate = () => {
        var flag = false; var i = 1;
        var errorMessage = '';

        if (custCatgMan && custCatgVisible) {
            if (custCatgLabel === 'Select') {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect+ custCatgCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (firstNameMan && firstNameVisible) {
            if (firstName.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + firstNameCaption + '\n';
                i++;
                flag = true;
            }
        }
        if (middleNameMan && middleNameVisible) {
            if (middleName.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + middleNameCaption + '\n';
                i++;
                flag = true;
            }
        }
        if (lastNameMan && lastNameVisible) {
            if (lastName.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + lastNameCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (mobileNumberMan && mobileNumberVisible) {
            if (mobileNumber.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + mobileNumberCaption + '\n';
                i++;
                flag = true;
            } else if (!Common.isValidPhoneNumber(mobileNumber)) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsentervalid + mobileNumberCaption + '\n';
                i++;
                flag = true;
            }
        }
        setErrMsg(errorMessage);
        return flag;
    }

    const focusInput2 = () => {
        middleNameRef.current.focus();
    };

    return (
        // enclose all components in this View tag
        <SafeAreaView style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>

            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

            <ScrollView style={styles.scrollView}
                contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                {loading ? <Loading /> : null}
                <View style={{ flex: 1 }}>


                    <Modal
                        isVisible={bottomErrorSheetVisible}
                        onBackdropPress={hideBottomSheet}
                        style={styles.modal}
                    >
                        <View style={styles.modalContent}>
                            <View style={{ alignItems: 'center' }}>

                                <View style={{ width: '100%', flexDirection: 'row', }}>

                                    <TextComp textVal={language[0][props.language].str_error} textStyle={{ fontSize: 14, color: Colors.black, fontWeight: 600 }} Visible={false} />

                                    <MaterialIcons name='error' size={20} color={Colors.red} />

                                </View>

                                <View style={{ width: '100%', marginTop: 15 }}>
                                    <TextComp textVal={errMsg} textStyle={{ fontSize: 14, color: Colors.black, lineHeight: 20 }} Visible={false} />
                                </View>




                                <View style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>




                                    <View
                                        style={{
                                            width: '25%',
                                            height: 40,
                                            justifyContent: 'flex-end',
                                            alignItems: 'center',
                                        }}>
                                        <TouchableOpacity onPress={() => { hideBottomSheet() }} activeOpacity={0.5} style={{
                                            width: '88%', height: 40, backgroundColor: '#0294ff',
                                            borderRadius: 35, alignItems: 'center', justifyContent: 'center'
                                        }}>
                                            <View >

                                                <TextComp textVal={language[0][props.language].str_ok} textStyle={{ color: Colors.white, fontSize: 15, fontWeight: 600 }} />

                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                </View>

                            </View>


                        </View>
                    </Modal>


                    <View style={{
                        width: '100%', height: 56, alignItems: 'center', justifyContent: 'center',

                    }}>
                        <HeadComp textval={language[0][props.language].str_leadcreation} props={props} />
                    </View>

                    <View style={{ width: '100%', alignItems: 'center', marginTop: '3%' }}>

                        <View style={{ width: '90%', marginTop: 3, }}>

                            <TextComp textStyle={{ color: Colors.mediumgrey, fontSize: 15, fontWeight: '500' }} textVal={language[0][props.language].str_basicdetails}></TextComp>

                            <ProgressComp progressvalue={0.25} textvalue="1 of 4" />

                        </View>


                    </View>

                    <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={custCatgCaption} textStyle={Commonstyles.inputtextStyle} Visible={custCatgMan} />

                        </View>
                        <View style={{
                            width: '95%',
                        }}>

                            <Picker
                                selectedValue={custCatgLabel}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => {
                                    setCustCatgLabel(itemValue);
                                    setCustCatgIndex(itemIndex);
                                }}>

                                {
                                    custCatData.map(item => {
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


                    <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={firstNameCaption} textStyle={Commonstyles.inputtextStyle} Visible={firstNameMan} />
                        </View>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, borderBottomWidth: 1, borderBottomColor: '#e2e2e2' }}>

                            <TextInput
                                value={firstName}
                                onChangeText={txt => setFirstName(txt)}
                                placeholder={''}
                                placeholderTextColor={Colors.lightgrey}
                                secureTextEntry={false}
                                autoCapitalize="characters"
                                style={Commonstyles.textinputtextStyle}
                                ref={firstNameRef}
                                returnKeyType="next"
                                onSubmitEditing={focusInput2}
                            />

                        </View>

                    </View>

                    <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={middleNameCaption} textStyle={Commonstyles.inputtextStyle} Visible={middleNameMan} />
                        </View>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, borderBottomWidth: 1, borderBottomColor: '#e2e2e2' }}>

                            <TextInput
                                value={middleName}
                                onChangeText={txt => setMiddleName(txt)}
                                placeholder={''}
                                placeholderTextColor={Colors.lightgrey}
                                secureTextEntry={false}
                                autoCapitalize="characters"
                                style={Commonstyles.textinputtextStyle}
                                ref={middleNameRef}
                                returnKeyType="next"
                                onSubmitEditing={() => { lastNameRef.current.focus(); }}
                            />

                        </View>

                    </View>

                    <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={lastNameCaption} textStyle={Commonstyles.inputtextStyle} Visible={lastNameMan} />
                        </View>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, borderBottomWidth: 1, borderBottomColor: '#e2e2e2' }}>

                            <TextInput
                                value={lastName}
                                onChangeText={txt => setLastName(txt)}
                                placeholder={''}
                                placeholderTextColor={Colors.lightgrey}
                                secureTextEntry={false}
                                autoCapitalize="characters"
                                style={Commonstyles.textinputtextStyle}
                                ref={lastNameRef}
                                returnKeyType="next"
                                onSubmitEditing={() => { mobileNumberRef.current.focus(); }}
                            />

                        </View>

                    </View>

                    <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={mobileNumberCaption} textStyle={Commonstyles.inputtextStyle} Visible={mobileNumberMan} />
                        </View>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, borderBottomWidth: 1, borderBottomColor: '#e2e2e2' }}>

                            <TextInput
                                value={mobileNumber}
                                onChangeText={txt => { if (Common.numberRegex.test(txt)) setMobileNumber(txt) }}
                                placeholder={''}
                                keyboardType="numeric"
                                placeholderTextColor={Colors.lightgrey}
                                secureTextEntry={false}
                                autoCapitalize="characters"
                                style={Commonstyles.textinputtextStyle}
                                ref={mobileNumberRef}
                                returnKeyType="done"
                            />

                        </View>

                    </View>

                </View>


                <View
                    style={{
                        width: '100%',
                        height: 50,
                        marginTop: 25,
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}>
                    <TouchableOpacity onPress={() => { updateLeadDetails() }} activeOpacity={10} style={{
                        width: '88%', height: 50, backgroundColor: '#0294ff',
                        borderRadius: 45, alignItems: 'center', justifyContent: 'center'
                    }}>
                        <View >

                            <TextComp textVal={language[0][props.language].str_next} textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }} />

                        </View>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    parentView: {
        flex: 1,

    },
    scrollView: {
        flex: 1,

    },
    contentContainer: {

        paddingBottom: 50,
        flexGrow: 1
    }, line: {
        backgroundColor: '#dbdbdb', // Change the color as needed
        height: 1,
        width: '90%',
        marginTop: '5%'           // Adjust the height as needed
    },
    picker: {
        height: 50,
        width: '100%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlign: 'center'
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 16,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});


const mapStateToProps = (state) => {
    const { language } = state.languageReducer;
    return {
        language: language
    }
}

const mapDispatchToProps = (dispatch) => ({
    languageAction: (item) => dispatch(languageAction(item)),
});


export default connect(mapStateToProps, mapDispatchToProps)(LeadCreationBasic);
