import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    SafeAreaView,
    ScrollView,
} from 'react-native';
import apiInstance from '../../../Utils/apiInstance';
import apiInstancelocal from '../../../Utils/apiInstancelocal';
import Colors from '../../../Utils/Colors';
import MyStatusBar from '../../../Components/ MyStatusBar';
import Loading from '../../../Components/Loading';
import TextComp from '../../../Components/TextComp';
import { connect } from 'react-redux';
import { languageAction } from '../../../Utils/redux/actions/languageAction';
import { language } from '../../../Utils/LanguageString';
import Commonstyles from '../../../Utils/Commonstyles';
import HeadComp from '../../../Components/HeadComp';
import ProgressComp from '../../../Components/ProgressComp';
import tbl_SystemMandatoryFields from '../../../Database/Table/tbl_SystemMandatoryFields';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Common from '../../../Utils/Common';
import tbl_SystemCodeDetails from '../../../Database/Table/tbl_SystemCodeDetails';
import TextInputComp from '../../../Components/TextInputComp';
import PickerComp from '../../../Components/PickerComp';
import ButtonViewComp from '../../../Components/ButtonViewComp';
import ErrorMessageModal from '../../../Components/ErrorMessageModal';
import tbl_lead_creation_lead_details from '../../../Database/Table/tbl_lead_creation_lead_details';
import tbl_lead_creation_loan_details from '../../../Database/Table/tbl_lead_creation_loan_details';
import tbl_lead_creation_basic_details from '../../../Database/Table/tbl_lead_creation_basic_details';
import SystemMandatoryField from '../../../Components/SystemMandatoryField';
import { profileAction } from '../../../Utils/redux/actions/ProfileAction';

const LeadCreationBasic = (props, { navigation, route }) => {
    const [profileDetail, setProfileDetail] = useState(props.profiledetail.userPersonalDetailsDto);

    const [leadType, setLeadType] = useState(global.LEADTYPE);
    const [loading, setLoading] = useState(false);
    const [custCatgLabel, setCustCatgLabel] = useState('');
    const [custCatgIndex, setCustCatgIndex] = useState('');
    const [custCatgCaption, setCustCatgCaption] = useState('CUSTOMER CATEGORY');
    const [firstName, setFirstName] = useState('');
    const [firstNameCaption, setFirstNameCaption] = useState('FIRST NAME');
    const [firstNameMan, setFirstNameMan] = useState(false);
    const [firstNameVisible, setFirstNameVisible] = useState(true);
    const [firstNameDisable, setFirstNameDisable] = useState(false);
    const [firstNameErrorVisible, setFirstNameErrorVisible] = useState(true);
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

    const [titleCaption, setTitleCaption] = useState('TITLE');
    const [titleMan, setTitleMan] = useState(false);
    const [titleVisible, setTitleVisible] = useState(true);
    const [titleDisable, setTitleDisable] = useState(false);
    const [titleLabel, setTitleLabel] = useState('');
    const [titleIndex, setTitleIndex] = useState('');
    const [titleData, setTitleData] = useState([]);


    const [genderCaption, setGenderCaption] = useState('GENDER');
    const [genderMan, setGenderMan] = useState(false);
    const [genderVisible, setGenderVisible] = useState(true);
    const [genderDisable, setGenderDisable] = useState(false);
    const [genderLabel, setGenderLabel] = useState('');
    const [genderIndex, setGenderIndex] = useState('');
    const [genderData, setGenderData] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
    const showBottomSheet = () => setBottomErrorSheetVisible(true);
    const hideBottomSheet = () => setBottomErrorSheetVisible(false);
    const firstNameRef = useRef(null);
    const middleNameRef = useRef(null);
    const lastNameRef = useRef(null);
    const mobileNumberRef = useRef(null);


    const [DataArray, setNewDataArray] = useState([]);
    let errorCounter = 1;

    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });

        makeSystemMandatoryFields();
        //pickerData();
        getData();

        //callPickerApi();
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
                        setCustCatgIndex(i + 1);
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

        tbl_SystemMandatoryFields.getSystemMandatoryFieldsBasedOnFieldUIID('sp_title').then(value => {
            if (value !== undefined && value.length > 0) {
                console.log(value[0])
                setTitleCaption(value[0].FieldName)
                if (value[0].IsMandatory == "1") {
                    setTitleMan(true);
                }
                if (value[0].IsHide == "1") {
                    setTitleVisible(false);
                }
                if (value[0].IsDisable == "1") {
                    setTitleDisable(true);
                }
                if (value[0].IsCaptionChange == "1") {
                    setTitleCaption(value[0].FieldCaptionChange)
                }
            }
        })

        tbl_SystemMandatoryFields.getSystemMandatoryFieldsBasedOnFieldUIID('sp_gender').then(value => {
            if (value !== undefined && value.length > 0) {
                console.log(value[0])
                setGenderCaption(value[0].FieldName)
                if (value[0].IsMandatory == "1") {
                    setGenderMan(true);
                }
                if (value[0].IsHide == "1") {
                    setGenderVisible(false);
                }
                if (value[0].IsDisable == "1") {
                    setGenderDisable(true);
                }
                if (value[0].IsCaptionChange == "1") {
                    setGenderCaption(value[0].FieldCaptionChange)
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

    const updateLeadDetails = async () => {

        if (global.LEADTYPE == 'COMP') {
            props.navigation.navigate('LeadCreationBusiness', { leadData: props.route.params.leadData })
        } else if (validate()) {
            showBottomSheet();
        } else if (global.leadID.length != '') {
            Common.getNetworkConnection().then(async (value) => {
                if (value.isConnected == true) {
                    leadPutApi();
                } else {
                    //insertLead(global.leadID, true)
                    await tbl_lead_creation_basic_details.insertLeadCreationBasicDetails(global.leadID, custCatgLabel, titleLabel, firstName, middleName, lastName, genderLabel, mobileNumber, global.USERID);
                    props.navigation.navigate('LeadCreationBusiness', { leadData: [] })
                }
            })
        }
        else {
            leadPostApi();
        }


    }

    const leadPostApi = () => {
        const appDetails = {
            "createdBy": global.USERID,
            "createdOn": '',
            "isActive": true,
            "branchId": profileDetail.branchId,
            "leadCreationBasicDetails": {
                "createdBy": global.USERID,
                "createdOn": '',
                "customerCategoryId": custCatgLabel,
                "titleId": titleLabel,
                "firstName": firstName,
                "middleName": middleName,
                "lastName": lastName,
                "mobileNumber": mobileNumber,
                "genderId": genderLabel
            },
            "leadCreationBusinessDetails": {},

            "leadCreationLoanDetails": {},

            "leadCreationDms": {}
        }
        const baseURL = '8901'
        setLoading(true)
        apiInstancelocal(baseURL).post('/api/v1/lead-creation-initiation', appDetails)
            .then(async (response) => {
                // Handle the response data
                console.log("LeadCreationBasicApiResponse::" + JSON.stringify(response.data));
                global.leadID = response.data.id;
                global.leadNumber = response.data.leadNumber;
                setLoading(false)
                //alert(JSON.stringify(response.data))
                insertLead(response.data, true)

            })
            .catch((error) => {
                // Handle the error
                console.log("Error" + JSON.stringify(error.response))
                setLoading(false)
                alert(error);
            });
    }

    const leadPutApi = () => {
        const appDetails = {

            "leadCreationBasicDetails": {
                "createdBy": global.USERID,
                "createdOn": '',
                "customerCategoryId": custCatgLabel,
                "titleId": titleLabel,
                "firstName": firstName,
                "middleName": middleName,
                "lastName": lastName,
                "mobileNumber": mobileNumber,
                "genderId": genderLabel
            }
        }
        const baseURL = '8901'
        setLoading(true)
        apiInstancelocal(baseURL).put(`/api/v1/lead-creation-initiation/${global.leadID}`, appDetails)
            .then(async (response) => {
                // Handle the response data
                console.log("LeadCreationBasicApiResponse::" + JSON.stringify(response.data));
                global.leadID = response.data.id;
                global.leadNumber = response.data.leadNumber;
                setLoading(false)
                //alert(JSON.stringify(response.data))
                insertLead(response.data, false)

            })
            .catch((error) => {
                // Handle the error
                console.log("Error" + JSON.stringify(error.response))
                setLoading(false)
                alert(error);
            });
    }

    const insertLead = async (leadData, showToast) => {
        await tbl_lead_creation_lead_details.insertLeadCreationLeadDetails(leadData.id, leadData.leadNumber, leadData.branchId, leadData.isActive, leadData.createdBy, Common.getCurrentDateTime());
        await tbl_lead_creation_basic_details.insertLeadCreationBasicDetails(leadData.id, custCatgLabel, titleLabel, firstName, middleName, lastName, genderLabel, mobileNumber, global.USERID);

        tbl_lead_creation_lead_details.getLeadCreationLeadDetailsBasedOnLeadID(leadData.id).then(value => {
            console.log("LeadDetails::::" + JSON.stringify(value))
        })

        tbl_lead_creation_basic_details.getLeadCreationBasicDetailsBasedOnLeadID(leadData.id).then(value => {
            console.log("LeadBasicDetails::::" + JSON.stringify(value))
        })
        props.navigation.navigate('LeadCreationBusiness', { leadData: [], showToast: showToast })

    }

    const getData = () => {

        if (leadType == 'DRAFT') {
            setLoading(true);
            tbl_lead_creation_basic_details.getLeadCreationBasicDetailsBasedOnLeadID(global.leadID).then(value => {
                if (value !== undefined && value.length > 0) {
                    setCustCatgLabel(parseInt(value[0].customer_category_id.toString()));
                    setFirstName(value[0].first_name);
                    setMiddleName(value[0].middle_name);
                    setLastName(value[0].last_name);
                    setGenderLabel(parseInt(value[0].gender_id));
                    setTitleLabel(parseInt(value[0].title_id));
                    setMobileNumber(value[0].mobile_number);
                    callPickerApi();

                }
            })
        } else if (leadType == 'NEW') {
            callPickerApi();
        } else if (leadType == 'COMP') {
            const data = props.route.params.leadData;
            setCustCatgLabel(parseInt(data.leadCreationBasicDetails.customerCategoryId));
            setFirstName(data.leadCreationBasicDetails.firstName);
            setMiddleName(data.leadCreationBasicDetails.middleName);
            setLastName(data.leadCreationBasicDetails.lastName);
            setGenderLabel(parseInt(data.leadCreationBasicDetails.genderId));
            setTitleLabel(parseInt(data.leadCreationBasicDetails.titleId));
            setMobileNumber(data.leadCreationBasicDetails.mobileNumber.toString());
            callPickerApi();
            setCustCatgDisable(true)
            setTitleDisable(true)
            setFirstNameDisable(true)
            setMiddleNameDisable(true)
            setLastNameDisable(true)
            setGenderDisable(true)
            setMobileNumberDisable(true)
        }

    }

    const callPickerApi = () => {

        const baseURL = '8082'
        setLoading(true)
        var customerresponse = false; var genderresponse = false; var titleresponse = false;
        apiInstancelocal(baseURL).get('/api/v1/system-code/master/CUSTOMER_CATEGORY')
            .then(async (response) => {
                customerresponse = true;
                if (customerresponse && genderresponse && titleresponse) {
                    setLoading(false);
                }
                setCustCatData(response.data)
            })
            .catch((error) => {
                if (global.DEBUG_MODE) console.log("Error" + JSON.stringify(error.response))
                setLoading(false)
                alert(error);
            });
        apiInstancelocal(baseURL).get('/api/v1/user-code/master/TITLE')
            .then(async (response) => {
                titleresponse = true;
                if (customerresponse && genderresponse && titleresponse) {
                    setLoading(false);
                }
                setTitleData(response.data)
            })
            .catch((error) => {
                if (global.DEBUG_MODE) console.log("Error" + JSON.stringify(error.response))
                setLoading(false)
                alert(error);
            });
        apiInstancelocal(baseURL).get('/api/v1/system-code/master/GENDER')
            .then(async (response) => {
                genderresponse = true;
                if (customerresponse && genderresponse && titleresponse) {
                    setLoading(false);
                }
                setGenderData(response.data)
            })
            .catch((error) => {
                if (global.DEBUG_MODE) console.log("Error" + JSON.stringify(error.response))
                setLoading(false)
                alert(error);
            });


    }

    const validate = () => {
        var flag = false; var i = 1;
        var errorMessage = '';

        if (custCatgMan && custCatgVisible) {
            if (custCatgLabel === 'Select') {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + custCatgCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (titleMan && titleVisible) {
            if (custCatgLabel === '') {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + titleCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (genderMan && genderVisible) {
            if (genderLabel === '') {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + genderCaption + '\n';
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


        if (titleVisible && genderVisible) {
            if (titleLabel === 225) {
                if (genderLabel == 519) {
                    errorMessage = errorMessage + i + ')' + ' ' + titleCaption + ' AND ' + genderCaption + ' Not matching' + '\n';
                    i++;
                    flag = true;
                }
            } else if (titleLabel === 226 || titleLabel === 227) {
                if (genderLabel == 518) {
                    errorMessage = errorMessage + i + ')' + ' ' + titleCaption + ' AND ' + genderCaption + ' Not matching' + '\n';
                    i++;
                    flag = true;
                }
            }
        }

        setErrMsg(errorMessage);
        return flag;
    }

    const updateDatainParent = (
        fieldName,
        newValue,
        isMandatory,
        IsHide,
        IsDisable,
        isPicker,
    ) => {
        // Find the index of the object in DataArray with the matching fieldName
        const dataIndex = DataArray.findIndex(item => item.fieldName === fieldName);

        if (dataIndex !== -1) {
            // If the object with the same fieldName exists, get the existing object
            const existingData = DataArray[dataIndex];

            // Create a new object by merging the existingData with the new data
            const newDataObject = {
                fieldName: fieldName,
                fieldValue: newValue,
                isMandatory:
                    isMandatory !== undefined ? isMandatory : existingData.isMandatory,
                isDisable: IsDisable !== undefined ? IsDisable : existingData.isDisable,
                IsHide: IsHide !== undefined ? IsHide : existingData.IsHide,
                isPicker: existingData.isPicker || false,
            };

            // Update the object in DataArray with the merged data
            DataArray[dataIndex] = newDataObject;
        } else {
            // If not, add the new object to the array with the provided data
            const newDataObject = {
                fieldName: fieldName,
                fieldValue: newValue,
                isMandatory: isMandatory,
                isDisable: IsDisable,
                IsHide: IsHide,
                isPicker: isPicker || false,
            };

            setNewDataArray(prevDataArray => [...prevDataArray, newDataObject]);
        }

        console.log('DataArray:', DataArray);
    };

    const validateData = () => {
        let flag = false;
        let errMsg = '';

        DataArray.forEach(item => {
            if (
                (item.IsHide === '' || item.IsHide === '0') &&
                item.isMandatory === '1' &&
                (item.fieldValue === '' || item.fieldValue === undefined)
            ) {
                errMsg += `${errorCounter}) Please Select ${item.fieldName}\n`;
                errorCounter++;
                // console.log('errMsg:', errMsg);
            }
        });

        if (errMsg !== '') {
            setErrMsg(errMsg);
            flag = true;
        }

        return flag;
    };

    const handleClick = (componentName, textValue) => {

        if (componentName === 'firstName') {
            if (textValue.length > 0) {
                if (Common.isValidText(textValue))
                    setFirstName(textValue)
            } else {
                setFirstName(textValue)
            }
        } else if (componentName === 'middleName') {
            if (textValue.length > 0) {
                if (Common.isValidText(textValue))
                    setMiddleName(textValue)
            } else {
                setMiddleName(textValue)
            }
        } else if (componentName === 'lastName') {
            if (textValue.length > 0) {
                if (Common.isValidText(textValue))
                    setLastName(textValue)
            } else {
                setLastName(textValue)
            }
        } else if (componentName === 'mobileNumber') {
            if (textValue.length > 0) {
                if (Common.numberRegex.test(textValue))
                    setMobileNumber(textValue)
            } else {
                setMobileNumber(textValue)
            }
        }

    }

    const handleReference = (componentName) => {

        if (componentName === 'firstName') {
            if (middleNameVisible) {
                middleNameRef.current.focus();
            } else if (lastNameVisible) {
                lastNameRef.current.focus();
            } else if (mobileNumberVisible) {
                mobileNumberRef.current.focus();
            }
        } else if (componentName === 'middleName') {
            if (lastNameVisible) {
                lastNameRef.current.focus();
            } else if (mobileNumberVisible) {
                mobileNumberRef.current.focus();
            }
        } else if (componentName === 'lastName') {
            if (mobileNumberVisible)
                mobileNumberRef.current.focus();
        }

    };

    const handlePickerClick = (componentName, label, index) => {

        if (componentName === 'custCategoryPicker') {
            setCustCatgLabel(label);
            setCustCatgIndex(index);
        } else if (componentName === 'titlePicker') {
            setTitleLabel(label);
            setTitleIndex(index);
        } else if (componentName === 'genderPicker') {
            setGenderLabel(label);
            setGenderIndex(index);
        }

    }

    return (
        // enclose all components in this View tag
        <SafeAreaView style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>

            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
            <View style={{ width: '100%', height: 56, alignItems: 'center', justifyContent: 'center', }}>

                <HeadComp textval={leadType != 'COMP' ? language[0][props.language].str_leadcreation : language[0][props.language].str_captureddetails} props={props} />

            </View>
            <View style={{ width: '100%', justifyContent: 'center', alignItems: 'flex-end' }}>
                <Text style={{
                    fontSize: 14, color: Colors.mediumgrey, marginRight: 23, fontFamily: 'PoppinsRegular'
                }}>{language[0][props.language].str_leadid} :  <Text style={{ color: Colors.black, fontFamily: 'PoppinsRegular' }}>{global.leadNumber}</Text></Text>
            </View>
            <ScrollView style={styles.scrollView}
                contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                {loading ? <Loading /> : null}
                <View style={{ flex: 1 }}>

                    <ErrorMessageModal isVisible={bottomErrorSheetVisible} hideBottomSheet={hideBottomSheet} errMsg={errMsg} textError={language[0][props.language].str_error} textClose={language[0][props.language].str_ok} />

                    <View style={{ width: '100%', alignItems: 'center', marginTop: '3%' }}>

                        <View style={{ width: '90%', marginTop: 3, }}>

                            <TextComp textStyle={{ color: Colors.mediumgrey, fontSize: 15, fontFamily: 'Poppins-Medium' }} textVal={language[0][props.language].str_basicdetails}></TextComp>

                            <ProgressComp progressvalue={0.25} textvalue="1 of 4" />

                        </View>


                    </View>

                    {custCatgVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>

                            <TextComp textVal={custCatgCaption} textStyle={Commonstyles.inputtextStyle} Visible={custCatgMan} />

                        </View>

                        <PickerComp textLabel={custCatgLabel} pickerStyle={Commonstyles.picker} Disable={custCatgDisable} pickerdata={custCatData} componentName='custCategoryPicker' handlePickerClick={handlePickerClick} />


                    </View>}


                    {titleVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>

                            <TextComp textVal={titleCaption} textStyle={Commonstyles.inputtextStyle} Visible={titleMan} />

                        </View>

                        <PickerComp textLabel={titleLabel} pickerStyle={Commonstyles.picker} Disable={titleDisable} pickerdata={titleData} componentName='titlePicker' handlePickerClick={handlePickerClick} />


                    </View>}



                    {firstNameVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={firstNameCaption} textStyle={Commonstyles.inputtextStyle} Visible={firstNameMan} />
                        </View>

                        <TextInputComp textValue={firstName} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={firstNameDisable} ComponentName='firstName' reference={firstNameRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />



                    </View>}

                    {/* <SystemMandatoryField
                        fielduiid="et_firstname"
                        type="email-address"
                        textvalue={firstName}
                        // Disable={false}
                        isInput={1}
                        updateDataInParent={updateDatainParent}
                    // updateDataErrorinParent={updateDataErrorinParent}
                    /> */}

                    {middleNameVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={middleNameCaption} textStyle={Commonstyles.inputtextStyle} Visible={middleNameMan} />
                        </View>


                        <TextInputComp textValue={middleName} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={middleNameDisable} ComponentName='middleName' reference={middleNameRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />

                    </View>}

                    {lastNameVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={lastNameCaption} textStyle={Commonstyles.inputtextStyle} Visible={lastNameMan} />
                        </View>

                        <TextInputComp textValue={lastName} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={lastNameDisable} ComponentName='lastName' reference={lastNameRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />


                    </View>}

                    {genderVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>

                            <TextComp textVal={genderCaption} textStyle={Commonstyles.inputtextStyle} Visible={genderMan} />

                        </View>

                        <PickerComp textLabel={genderLabel} pickerStyle={Commonstyles.picker} Disable={genderDisable} pickerdata={genderData} componentName='genderPicker' handlePickerClick={handlePickerClick} />


                    </View>}

                    {mobileNumberVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={mobileNumberCaption} textStyle={Commonstyles.inputtextStyle} Visible={mobileNumberMan} />
                        </View>


                        <TextInputComp textValue={mobileNumber} textStyle={Commonstyles.textinputtextStyle} type='numeric' Disable={mobileNumberDisable} ComponentName='mobileNumber' reference={mobileNumberRef} returnKey="done" handleClick={handleClick} handleReference={handleReference} length={10} />


                    </View>}

                </View>


                <ButtonViewComp textValue={language[0][props.language].str_next.toUpperCase()} textStyle={{ color: Colors.white, fontSize: 14, fontWeight: 800, letterSpacing: 1, }} viewStyle={Commonstyles.buttonView} innerStyle={Commonstyles.buttonViewInnerStyle} handleClick={updateLeadDetails} />


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
    const { profileDetails } = state.profileReducer;
    return {
        language: language,
        profiledetail: profileDetails,
    }
}

const mapDispatchToProps = (dispatch) => ({
    languageAction: (item) => dispatch(languageAction(item)),
    profileAction: (item) => dispatch(profileAction(item)),
});


export default connect(mapStateToProps, mapDispatchToProps)(LeadCreationBasic);
