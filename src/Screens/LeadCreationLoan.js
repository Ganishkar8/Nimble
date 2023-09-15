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
    PermissionsAndroid,
    TextInput,
    Alert,
    Platform,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import apiInstance from '../Utils/apiInstance';
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
import tbl_SystemCodeDetails from '../Database/Table/tbl_SystemCodeDetails';
import tbl_SystemMandatoryFields from '../Database/Table/tbl_SystemMandatoryFields';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import apiInstancelocal from '../Utils/apiInstancelocal';


const LeadCreationLoan = (props, { navigation }) => {

    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [checked, setChecked] = React.useState('');
    const [loanTypeLabel, setLoanTypeLabel] = useState('');
    const [loanTypeIndex, setLoanTypeIndex] = useState('');
    const [loanTypeCaption, setLoanTypeCaption] = useState('LOAN TYPE');
    const [loanTypeMan, setLoanTypeMan] = useState(false);
    const [loanTypeVisible, setLoanTypeVisible] = useState(true);
    const [loanTypeDisable, setLoanTypeDisable] = useState(false);
    const [loanPurposeLabel, setLoanPurposeLabel] = useState('');
    const [loanPurposeIndex, setLoanPurposeIndex] = useState('');
    const [loanPurposeCaption, setLoanPurposeCaption] = useState('LOAN PURPOSE');
    const [loanPurposeMan, setLoanPurposeMan] = useState(false);
    const [loanPurposeVisible, setLoanPurposeVisible] = useState(true);
    const [loanPurposeDisable, setLoanPurposeDisable] = useState(false);
    const [leadTypeLabel, setLeadTypeLabel] = useState('');
    const [leadTypeIndex, setLeadTypeIndex] = useState('');
    const [leadTypeCaption, setLeadTypeCaption] = useState('LEAD TYPE');
    const [leadTypeMan, setLeadTypeMan] = useState(false);
    const [leadTypeVisible, setLeadTypeVisible] = useState(true);
    const [leadTypeDisable, setLeadTypeDisable] = useState(false);
    const [loanAmount, setLoanAmount] = useState('');
    const [loanAmountCaption, setLoanAmountCaption] = useState("LOAN AMOUNT (MULTIPLE OF 5000's)");
    const [loanAmountMan, setLoanAmountMan] = useState(false);
    const [loanAmountVisible, setLoanAmountVisible] = useState(true);
    const [loanAmountDisable, setLoanAmountDisable] = useState(false);
    const [loanTypeData, setLoanTypeData] = useState([]);
    const [loanPurposeData, setLoanPurposeData] = useState([]);
    const [leadTypeData, setLeadTypeData] = useState([]);

    const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
    const showBottomSheet = () => setBottomErrorSheetVisible(true);
    const hideBottomSheet = () => setBottomErrorSheetVisible(false);

    const showLocationBottomSheet = () => setLocationSheetVisible(true);
    const hideLocationBottomSheet = () => setLocationSheetVisible(false);

    const [locationSheetVisible, setLocationSheetVisible] = useState(false);


    useEffect(() => {
        pickerData();
        makeSystemMandatoryFields();
    }, []);




    const checkPermissions = async () => {
        const permissionsToRequest = [];

        if (Platform.OS === 'android') {
            // Camera permission
            const cameraPermission = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.CAMERA
            );
            if (cameraPermission !== PermissionsAndroid.RESULTS.GRANTED) {
                permissionsToRequest.push(PermissionsAndroid.PERMISSIONS.CAMERA);
            }

            // Location permission
            const locationPermission = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (locationPermission !== PermissionsAndroid.RESULTS.GRANTED) {
                permissionsToRequest.push(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            }

            // Request all pending permissions
            return requestPermissions(permissionsToRequest);
        } else {
            // For iOS and other platforms, use react-native-permissions
            const cameraResult = await check(PERMISSIONS.IOS.CAMERA);
            const locationResult = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

            const permissionsToRequest = [];

            if (cameraResult !== RESULTS.GRANTED) {
                permissionsToRequest.push(PERMISSIONS.IOS.CAMERA);
            }

            if (locationResult !== RESULTS.GRANTED) {
                permissionsToRequest.push(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            }

            // Request all pending permissions
            request(permissionsToRequest);
        }
    };

    const requestPermissions = async (permissions) => {
        if (Platform.OS === 'android') {
            try {
                const grantedPermissions = await PermissionsAndroid.requestMultiple(permissions);
                const allPermissionsGranted = Object.values(grantedPermissions).every(
                    status => status === PermissionsAndroid.RESULTS.GRANTED
                );

                if (allPermissionsGranted) {
                    // All permissions granted

                } else {

                    // Handle denied permissions
                }
                return allPermissionsGranted
            } catch (error) {
                console.error(error);
            }
        } else {
            // For iOS and other platforms, use react-native-permissions
            const results = await request(permissions);

            if (results.every(result => result === RESULTS.GRANTED)) {
                // All permissions granted
            } else {
                // Handle denied permissions
            }
        }
    };


    const pickerData = async () => {

        tbl_SystemCodeDetails.getSystemCodeDetailsBasedOnID('LNTP').then(value => {
            if (value !== undefined && value.length > 0) {
                console.log(value)

                for (var i = 0; i < value.length; i++) {
                    if (value[i].IsDefault === '1') {
                        setLoanTypeLabel(value[i].SubCodeID);
                        setLoanTypeIndex(i + 1);
                    }
                }

                setLoanTypeData(value)

            }
        })

        tbl_SystemCodeDetails.getSystemCodeDetailsBasedOnID('LNPUR').then(value => {
            if (value !== undefined && value.length > 0) {
                console.log(value)

                for (var i = 0; i < value.length; i++) {
                    if (value[i].IsDefault === '1') {
                        setLoanPurposeLabel(value[i].SubCodeID);
                        setLoanPurposeIndex(i + 1);
                    }
                }

                setLoanPurposeData(value)

            }
        })

        tbl_SystemCodeDetails.getSystemCodeDetailsBasedOnID('LeadType').then(value => {
            if (value !== undefined && value.length > 0) {
                console.log(value)

                for (var i = 0; i < value.length; i++) {
                    if (value[i].IsDefault === '1') {
                        setLeadTypeLabel(value[i].SubCodeID);
                        setLeadTypeIndex(i + 1);
                    }
                }

                setLeadTypeData(value)

            }
        })

    }

    const makeSystemMandatoryFields = () => {

        tbl_SystemMandatoryFields.getSystemMandatoryFieldsBasedOnFieldUIID('sp_loantype').then(value => {
            if (value !== undefined && value.length > 0) {
                console.log(value[0])
                setLoanTypeCaption(value[0].FieldName)
                if (value[0].IsMandatory == "1") {
                    setLoanTypeMan(true);
                }
                if (value[0].IsHide == "1") {
                    setLoanTypeVisible(false);
                }
                if (value[0].IsDisable == "1") {
                    setLoanTypeDisable(true);
                }
                if (value[0].IsCaptionChange == "1") {
                    setLoanTypeCaption(value[0].FieldCaptionChange)
                }
            }
        })

        //firstName
        tbl_SystemMandatoryFields.getSystemMandatoryFieldsBasedOnFieldUIID('sp_loanpurpose').then(value => {
            if (value !== undefined && value.length > 0) {
                console.log(value[0])
                setLoanPurposeCaption(value[0].FieldName)
                if (value[0].IsMandatory == "1") {
                    setLoanPurposeMan(true);
                }
                if (value[0].IsHide == "1") {
                    setLoanPurposeVisible(false);
                }
                if (value[0].IsDisable == "1") {
                    setLoanPurposeDisable(true);
                }
                if (value[0].IsCaptionChange == "1") {
                    setLoanPurposeCaption(value[0].FieldCaptionChange)
                }
            }
        })

        tbl_SystemMandatoryFields.getSystemMandatoryFieldsBasedOnFieldUIID('et_loanamount').then(value => {


            if (value !== undefined && value.length > 0) {
                console.log(value)
                setLoanAmountCaption(value[0].FieldName)
                if (value[0].IsMandatory == "1") {
                    setLoanAmountMan(true);
                }
                if (value[0].IsHide == "1") {
                    setLoanAmountVisible(false);
                }
                if (value[0].IsDisable == "1") {
                    setLoanAmountDisable(true);
                }
                if (value[0].IsCaptionChange == "1") {
                    setLoanAmountCaption(value[0].FieldCaptionChange)
                }
            }
        })

        tbl_SystemMandatoryFields.getSystemMandatoryFieldsBasedOnFieldUIID('sp_leadtype').then(value => {
            if (value !== undefined && value.length > 0) {
                console.log(value)
                setLeadTypeCaption(value[0].FieldName)
                if (value[0].IsMandatory == "1") {
                    setLeadTypeMan(true);
                }
                if (value[0].IsHide == "1") {
                    setLeadTypeVisible(false);
                }
                if (value[0].IsDisable == "1") {
                    setLeadTypeDisable(true);
                }
                if (value[0].IsCaptionChange == "1") {
                    setLeadTypeCaption(value[0].FieldCaptionChange)
                }
            }
        })



    }


    const updateLeadDetails = () => {

        if (validate()) {
            showBottomSheet();
        }

        else {

            const appDetails = {
                "leadCreationLoanDetails": {
                    "createdBy": global.USERID,
                    "createdOn": '',
                    "loanTypeId": 5,
                    "loanPurposeId": 6,
                    "leadTypeId": 7,
                    "loanAmount": loanAmount
                }
            }
            const baseURL = '8901'
            setLoading(true)
            apiInstancelocal(baseURL).put(`/api/v1/lead-creation-initiation/${global.leadID}`, appDetails)
                .then(async (response) => {
                    // Handle the response data
                    console.log("LeadCreationLoanApiResponse::" + JSON.stringify(response.data));

                    checkPermissions().then(res => {
                        if (res == true) {
                            getOneTimeLocation();
                            setLoading(false)
                        } else {
                            setLoading(false)
                            alert('Permission Not Granted')
                        }
                    });

                })
                .catch((error) => {
                    // Handle the error
                    console.log("Error" + JSON.stringify(error.response))
                    setLoading(false)
                    alert(error);
                });


        }


    }

    const getOneTimeLocation = () => {
       showLocationBottomSheet();
        Geolocation.getCurrentPosition(
            //Will give you the current location
            (position) => {



                //getting the Longitude from the location json
                const currentLongitude =
                    JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude =
                    JSON.stringify(position.coords.latitude);

                hideLocationBottomSheet();
                props.navigation.navigate('LeadCreationCustomerPhoto')

            },
            (error) => {

                console.log(error)
            },
            {
                enableHighAccuracy: true,
                timeout: 30000,
                maximumAge: 1000
            },
        );
    };

    const validate = () => {
        var flag = false; var i = 1;
        var errorMessage = '';

        if (loanTypeMan && loanTypeVisible) {
            if (loanTypeLabel === 'Select') {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + loanTypeCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (loanPurposeMan && loanPurposeVisible) {
            if (loanPurposeLabel === 'Select') {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + loanPurposeCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (loanAmountMan && loanAmountVisible) {
            if (loanAmount.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + loanAmountCaption + '\n';
                i++;
                flag = true;
            } else if (!isMultipleOf5000(loanAmount)) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + loanAmountCaption + ' ' + language[0][props.language].str_mulfive + '\n';
                i++;
                flag = true;
            }
        }

        if (leadTypeMan && leadTypeVisible) {
            if (leadTypeLabel === 'Select') {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + leadTypeCaption + '\n';
                i++;
                flag = true;
            }
        }

        setErrMsg(errorMessage);
        return flag;
    }

    function isMultipleOf5000(number) {
        return number % 5000 === 0;
    }


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


                    <Modal
                        isVisible={locationSheetVisible}
                        onBackdropPress={() => {}}
                        backdropOpacity={0.5}
                        style={styles.modal}
                    >
                        <View style={styles.modalContent}>
                            <View style={{ alignItems: 'center' }}>

                                <View style={{ width: '100%', flexDirection: 'row',alignItems:'center',justifyContent:'center' }}>

                                    <TextComp textVal={"Fetching Location......"} textStyle={{ fontSize: 14, color: Colors.black, fontWeight: 600,marginTop:30,marginBottom:30 }} Visible={false} />

                                
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

                            <TextComp textStyle={{ color: Colors.mediumgrey, fontSize: 15, fontWeight: '500' }} textVal={language[0][props.language].str_loandetails}></TextComp>

                            <ProgressComp progressvalue={0.75} textvalue="3 of 4" />

                        </View>


                    </View>



                    {loanTypeVisible &&<View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={loanTypeCaption} textStyle={Commonstyles.inputtextStyle} Visible={loanTypeMan} />

                        </View>
                        <View style={{
                            width: '95%',
                        }}>

                            <Picker
                                selectedValue={loanTypeLabel}
                                style={styles.picker}
                                enabled={loanTypeDisable}
                                onValueChange={(itemValue, itemIndex) => {
                                    setLoanTypeLabel(itemValue);
                                    setLoanTypeIndex(itemIndex);
                                }}>
                                {
                                    loanTypeData.map(item => {
                                        return <Picker.Item value={item.SubCodeID} label={item.Label} />
                                    })
                                }
                            </Picker>

                        </View>
                        <View style={{
                            width: '90%', marginTop: 6, flexDirection: 'row',
                            borderBottomWidth: 1, borderBottomColor: '#e2e2e2', position: 'absolute', bottom: 3
                        }}></View>
                    </View>}


                    {loanPurposeVisible &&<View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={loanPurposeCaption} textStyle={Commonstyles.inputtextStyle} Visible={loanPurposeMan} />

                        </View>
                        <View style={{
                            width: '95%',
                        }}>

                            <Picker
                                selectedValue={loanPurposeLabel}
                                style={styles.picker}
                                enabled={loanPurposeDisable}
                                onValueChange={(itemValue, itemIndex) => {
                                    setLoanPurposeLabel(itemValue);
                                    setLoanPurposeIndex(itemIndex);
                                }}>
                                {
                                    loanPurposeData.map(item => {
                                        return <Picker.Item value={item.SubCodeID} label={item.Label} />
                                    })
                                }
                            </Picker>

                        </View>
                        <View style={{
                            width: '90%', marginTop: 6, flexDirection: 'row',
                            borderBottomWidth: 1, borderBottomColor: '#e2e2e2', position: 'absolute', bottom: 3
                        }}></View>
                    </View>}


                    {loanAmountVisible &&<View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={loanAmountCaption} textStyle={Commonstyles.inputtextStyle} Visible={loanAmountMan} />
                        </View>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, borderBottomWidth: 1, borderBottomColor: '#e2e2e2' }}>

                            <TextInput
                                value={loanAmount}
                                onChangeText={txt => setLoanAmount(txt)}
                                placeholder={''}
                                editable={loanAmountDisable}
                                placeholderTextColor={Colors.lightgrey}
                                secureTextEntry={false}
                                autoCapitalize="none"
                                keyboardType="numeric"
                                style={Commonstyles.textinputtextStyle}
                            />

                        </View>

                    </View>}


                    {leadTypeVisible &&<View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={leadTypeCaption} textStyle={Commonstyles.inputtextStyle} Visible={leadTypeMan} />

                        </View>
                        <View style={{
                            width: '95%',
                        }}>

                            <Picker
                                selectedValue={leadTypeLabel}
                                style={styles.picker}
                                enabled={leadTypeDisable}
                                onValueChange={(itemValue, itemIndex) => {
                                    setLeadTypeLabel(itemValue);
                                    setLeadTypeIndex(itemIndex);
                                }}>
                                {
                                    leadTypeData.map(item => {
                                        return <Picker.Item value={item.SubCodeID} label={item.Label} />
                                    })
                                }
                            </Picker>

                        </View>
                        <View style={{
                            width: '90%', marginTop: 6, flexDirection: 'row',
                            borderBottomWidth: 1, borderBottomColor: '#e2e2e2', position: 'absolute', bottom: 3
                        }}></View>
                    </View>}




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


export default connect(mapStateToProps, mapDispatchToProps)(LeadCreationLoan);
