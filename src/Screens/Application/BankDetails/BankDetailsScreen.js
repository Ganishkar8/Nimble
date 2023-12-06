import { View, Text, ScrollView, SafeAreaView, StyleSheet, BackHandler } from 'react-native';
import { React, useState, useRef, useEffect } from 'react';
import MyStatusBar from '../../../Components/MyStatusBar';
import HeadComp from '../../../Components/HeadComp';
import { connect } from 'react-redux';
import { languageAction } from '../../../Utils/redux/actions/languageAction';
import { language } from '../../../Utils/LanguageString';
import Commonstyles from '../../../Utils/Commonstyles';
import Colors from '../../../Utils/Colors';
import Loading from '../../../Components/Loading';
import ErrorMessageModal from '../../../Components/ErrorMessageModal';
import SystemMandatoryField from '../../../Components/SystemMandatoryField';
import ButtonViewComp from '../../../Components/ButtonViewComp';
import TextComp from '../../../Components/TextComp';
import PickerComp from '../../../Components/PickerComp';
import TextInputComp from '../../../Components/TextInputComp';
import Common from '../../../Utils/Common';
import tbl_loanaddressinfo from '../../../Database/Table/tbl_loanaddressinfo';
import tbl_bankdetails from '../../../Database/Table/tbl_bankdetails';
import apiInstancelocal from '../../../Utils/apiInstancelocal';
import ErrorModal from '../../../Components/ErrorModal';
import tbl_client from '../../../Database/Table/tbl_client';
import apiInstance from '../../../Utils/apiInstance';
import ChildHeadComp from '../../../Components/ChildHeadComp';
import ProgressComp from '../../../Components/ProgressComp';

const BankDetailsScreen = (props, { navigation }) => {
    const [loading, setLoading] = useState(false);
    // const [Data, setNewData] = useState();
    const [DataArray, setNewDataArray] = useState([]);
    const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
    const showBottomSheet = () => setBottomErrorSheetVisible(true);
    const hideBottomSheet = () => setBottomErrorSheetVisible(false);

    const [errMsg, setErrMsg] = useState('');
    let errorCounter = 1;

    const accountHolderNameRef = useRef(null);
    const ifscCodeRef = useRef(null);
    const bankNameRef = useRef(null);
    const branchNameRef = useRef(null);
    const accountNumberRef = useRef(null);
    const confirmAccountNumberRef = useRef(null);
    const bankLinkedMobileNumberRef = useRef(null);
    const upiIdRef = useRef(null);

    const [isNew, setIsNew] = useState(props.route.params.bankType);

    const [accountTypeLabel, setAccountTypeLabel] = useState('');
    const [accountTypeIndex, setAccountTypeIndex] = useState('');
    const [accountTypeCaption, setAccountTypeCaption] = useState('ACCOUNT TYPE');
    const [accountTypeMan, setAccountTypeMan] = useState(true);
    const [accountTypeVisible, setAccountTypeVisible] = useState(true);
    const [accountTypeDisable, setAccountTypeDisable] = useState(false);
    const [accountTypeData, setAccountTypeData] = useState([]);

    const [accountHolderName, setAccountHolderName] = useState('');
    const [accountHolderNameCaption, setAccountHolderNameCaption] = useState('ACCOUNT HOLDER NAME AS PER BANK');
    const [accountHolderNameMan, setAccountHolderNameMan] = useState(true);
    const [accountHolderNameVisible, setAccountHolderNameVisible] = useState(true);
    const [accountHolderNameDisable, setAccountHolderNameDisable] = useState(false);

    const [ifscCode, setIfscCode] = useState('');
    const [ifscCodeCaption, setIfscCodeCaption] = useState('IFSC CODE');
    const [ifscCodeMan, setIfscCodeMan] = useState(false);
    const [ifscCodeVisible, setIfscCodeVisible] = useState(true);
    const [ifscCodeDisable, setIfscCodeDisable] = useState(false);

    const [bankName, setBankName] = useState('');
    const [bankNameCaption, setBankNameCaption] = useState('BANK NAME');
    const [bankNameMan, setBankNameMan] = useState(false);
    const [bankNameVisible, setBankNameVisible] = useState(true);
    const [bankNameDisable, setBankNameDisable] = useState(true);

    const [branchName, setBranchName] = useState('');
    const [branchNameCaption, setBranchNameCaption] = useState('BRANCH NAME');
    const [branchNameMan, setBranchNameMan] = useState(false);
    const [branchNameVisible, setBranchNameVisible] = useState(true);
    const [branchNameDisable, setBranchNameDisable] = useState(true);

    const [accountNumber, setAccountNumber] = useState('');
    const [accountNumberCaption, setAccountNumberCaption] = useState('ACCOUNT NUMBER');
    const [accountNumberMan, setAccountNumberMan] = useState(true);
    const [accountNumberVisible, setAccountNumberVisible] = useState(true);
    const [accountNumberDisable, setAccountNumberDisable] = useState(false);

    const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
    const [confirmAccountNumberCaption, setConfirmAccountNumberCaption] = useState('CONFIRM ACCOUNT NUMBER');
    const [confirmAccountNumberMan, setConfirmAccountNumberMan] = useState(true);
    const [confirmAccountNumberVisible, setConfirmAccountNumberVisible] = useState(true);
    const [confirmAccountNumberDisable, setConfirmAccountNumberDisable] = useState(false);

    const [bankLinkedMobNo, setBankLinkedMobNo] = useState('');
    const [bankLinkedMobNoCaption, setBankLinkedMobNoCaption] = useState('BANK LINKED MOBILE NUMBER');
    const [bankLinkedMobNoMan, setBankLinkedMobNoMan] = useState(true);
    const [bankLinkedMobNoVisible, setBankLinkedMobNoVisible] = useState(true);
    const [bankLinkedMobNoDisable, setBankLinkedMobNoDisable] = useState(false);

    const [upiID, setUpiID] = useState('');
    const [upiIDCaption, setUpiIDCaption] = useState('UPI ID');
    const [upiIDMan, setUpiIDMan] = useState(true);
    const [upiIDVisible, setUpiIDVisible] = useState(true);
    const [upiIDDisable, setUpiIDDisable] = useState(false);


    const [systemCodeDetail, setSystemCodeDetail] = useState(props.mobilecodedetail.leadSystemCodeDto);
    const [userCodeDetail, setUserCodeDetail] = useState(props.mobilecodedetail.leadUserCodeDto);
    const [systemMandatoryField, setSystemMandatoryField] = useState(props.mobilecodedetail.leadSystemMandatoryFieldDto);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');

    const [addressID, setAddressID] = useState('');
    const [isKYC, setIsKYC] = useState('');


    const [postorput, setPostORPut] = useState('post');
    const [kycManual, setKYCManual] = useState('0');

    const [pincodeResponse, setPincodeResponse] = useState('');

    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        getSystemCodeDetail()
        getExistingData()


        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }
    }, [props.navigation]);

    const handleBackButton = () => {
        onGoBack();
        return true; // Prevent default back button behavior
    };

    const getExistingData = () => {

        tbl_client.getClientBasedOnID(global.LOANAPPLICATIONID, global.CLIENTTYPE).then(value => {
            if (value !== undefined && value.length > 0) {

                setKYCManual(value[0].isKycManual)

                if (global.USERTYPEID == 1163) {
                    if (!(value[0].isKycManual == '1')) {
                        fieldsDisable();
                    }
                }

            }
        })


        if (isNew != 'new') {
            setPostORPut('put')
            getExistingAddressData(isNew.loanApplicationId, isNew.client_type)
        } else {
            setPostORPut('post');
        }
    }

    const fieldsDisable = () => {


    }

    const getExistingAddressData = (loanAppId, id) => {
        tbl_bankdetails.getAllBankDetailsDetailsForLoanID(loanAppId, id)
            .then(data => {
                if (global.DEBUG_MODE) console.log('Bank Detail:', data);
                setAccountTypeLabel(data[0].account_type)
                setAccountHolderName(data[0].account_holder_name)
                setIfscCode(data[0].ifsc_code)
                setBankName(data[0].bank_name)
                setBranchName(data[0].branch_name)
                setAccountNumber(data[0].account_number)
                setConfirmAccountNumber(data[0].account_number)
                setBankLinkedMobNo(data[0].mobile_number)
                setUpiID(data[0].upi_id)
                setLoading(false)
            })
            .catch(error => {
                if (global.DEBUG_MODE) console.error('Error fetching Bank details:', error);
                setLoading(false)
            });
    }

    const disableAadharFields = (data) => {
    }

    const getSystemCodeDetail = () => {

        const filterAccountTypeData = systemCodeDetail.filter((data) => data.masterId === 'ACCOUNT_TYPE');
        setAccountTypeData(filterAccountTypeData)

    }

    const makeSystemMandatoryFields = () => {

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_addresstype' && data.pageId === 1).map((value, index) => {

            if (value.mandatory) {
                setAddressTypeMan(true);
            }
            if (value.hide) {
                setAddressTypeVisible(false);
            }
            if (value.disable) {
                setAddressTypeDisable(true);
            }
            if (value.captionChange) {
                setAddressTypeCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_addressline1' && data.pageId === 1).map((value, index) => {

            if (value.mandatory) {
                setAddressLine1Man(true);
            }
            if (value.hide) {
                setAddressLine1Visible(false);
            }
            if (value.disable) {
                setAddressLine1Disable(true);
            }
            if (value.captionChange) {
                setAddressLine1Caption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_addressline2' && data.pageId === 1).map((value, index) => {

            if (value.mandatory) {
                setAddressLine2Man(true);
            }
            if (value.hide) {
                setAddressLine2Visible(false);
            }
            if (value.disable) {
                setAddressLine2Disable(true);
            }
            if (value.captionChange) {
                setAddressLine2Caption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_landmark' && data.pageId === 1).map((value, index) => {

            if (value.mandatory) {
                setLandmarkMan(true);
            }
            if (value.hide) {
                setLandmarkVisible(false);
            }
            if (value.disable) {
                setLandmarkDisable(true);
            }
            if (value.captionChange) {
                setLandmarkCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_pincode' && data.pageId === 1).map((value, index) => {

            if (value.mandatory) {
                setPincodeMan(true);
            }
            if (value.hide) {
                setPincodeVisible(false);
            }
            if (value.disable) {
                setPincodeDisable(true);
            }
            if (value.captionChange) {
                setPincodeCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_city' && data.pageId === 1).map((value, index) => {

            if (value.mandatory) {
                setCityMan(true);
            }
            if (value.hide) {
                setCityVisible(false);
            }
            if (value.disable) {
                setCityDisable(true);
            }
            if (value.captionChange) {
                setCityCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_district' && data.pageId === 1).map((value, index) => {

            if (value.mandatory) {
                setDistrictMan(true);
            }
            if (value.hide) {
                setDistrictVisible(false);
            }
            if (value.disable) {
                setDistrictDisable(true);
            }
            if (value.captionChange) {
                setDistrictCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_state' && data.pageId === 1).map((value, index) => {

            if (value.mandatory) {
                setStateMan(true)
            }
            if (value.hide) {
                setStateVisible(false)
            }
            if (value.disable) {
                setStateDisable(true)
            }
            if (value.captionChange) {
                setStateCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_country' && data.pageId === 1).map((value, index) => {

            if (value.mandatory) {
                setCountryMan(true)
            }
            if (value.hide) {
                setCountryVisible(false)
            }
            if (value.disable) {
                setCountryDisable(true)
            }
            if (value.captionChange) {
                setCountryCaption(value[0].fieldCaptionChange)
            }
        });



    }

    const validateData = () => {
        var flag = false;
        var i = 1;
        var errorMessage = '';

        if (accountTypeMan && accountTypeVisible) {
            if (accountTypeLabel.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + accountTypeCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (accountHolderNameMan && accountHolderNameVisible) {
            if (accountHolderName.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + accountHolderNameCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (ifscCodeMan && ifscCodeVisible) {
            if (ifscCode.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + ifscCodeCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (bankNameMan && bankNameVisible) {
            if (bankName.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + bankNameCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (branchNameMan && branchNameVisible) {
            if (branchName.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + branchNameCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (accountNumberMan && accountNumberVisible) {
            if (accountNumber.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + accountNumberCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (confirmAccountNumberMan && confirmAccountNumberVisible) {
            if (confirmAccountNumber.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + confirmAccountNumberCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (confirmAccountNumber.length > 0 && accountNumber.length > 0) {
            if (confirmAccountNumber != accountNumber) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_accoutnnonotmatching  + '\n';
                i++;
                flag = true;
            }
        }

        if (bankLinkedMobNoMan && bankLinkedMobNoVisible) {
            if (bankLinkedMobNo.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + bankLinkedMobNoCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (upiIDMan && upiIDVisible) {
            if (upiID.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + upiIDCaption + '\n';
                i++;
                flag = true;
            }
        }

        setErrMsg(errorMessage);
        return flag;
    };

    const bankSubmit = () => {

        if (global.USERTYPEID == 1163) {
            if (!(kycManual == '1')) {
                props.navigation.replace('BankList')
                return;
            }
        }

        // if (addressID.length <= 0) {
        //     postAddressData();
        // } else {
        //     updateAddressData();
        // }
        if (validateData()) {
            showBottomSheet();
            //alert(errMsg)
        } else {
            insertData()
        }

    }

    const postAddressData = () => {
        if (validateData()) {
            showBottomSheet();
            //alert(errMsg)
        } else {
            // alert(addressTypeLabel+" "+addressLine1+" "+addressLine2+" "+landmark+" "+pincode+" "+city+" "+
            // district+" "+state+" "+country+" "+geoClassificationLabel+" "+yearsAtResidence+" "+yearsAtCity+" "+
            // addressOwnerTypeLabel+" "+ownerDetailsLabel+" "+ownerName)
            const appDetails = [{
                "isActive": true,
                "createdBy": global.USERID,
                "createdDate": new Date(),
                "modifiedBy": global.USERID,
                "modifiedDate": new Date(),
                "supervisedBy": global.USERID,
                "addressType": addressTypeLabel,
                "addressLine1": addressLine1,
                "addressLine2": addressLine2,
                "landmark": landmark,
                "pincode": pincode,
                "city": city,
                "district": district,
                "state": state,
                "country": country,
                "mobileOrLandLineNumber": "",
                "emailId": "",
                "addressOwnership": addressOwnerTypeLabel,
                "ownerDetails": ownerDetailsLabel,
                "ownerName": ownerName,
                "geoClassification": '',
                "yearsAtResidence": '',
                "yearsInCurrentCityOrTown": '',
                "supervisedDate": new Date()
            }]
            const baseURL = '8901';
            setLoading(true);
            apiInstancelocal(baseURL)
                .post(`api/v2/profile-short/address-details/${global.CLIENTID}`, appDetails)
                .then(async response => {
                    // Handle the response data
                    if (global.DEBUG_MODE) console.log('PostAddressResponse::' + JSON.stringify(response.data),);

                    setLoading(false);
                    insertData(response.data[0].id)
                })
                .catch(error => {
                    // Handle the error
                    if (global.DEBUG_MODE) console.log('PostAddressError' + JSON.stringify(error.response));
                    setLoading(false);
                    if (error.response.data != null) {
                        setApiError(error.response.data.message);
                        setErrorModalVisible(true)
                    }
                });
            //insertData()
        }
    };

    const updateAddressData = () => {
        if (validateData()) {
            showBottomSheet();
            //alert(errMsg)
        } else {
            // alert(addressTypeLabel+" "+addressLine1+" "+addressLine2+" "+landmark+" "+pincode+" "+city+" "+
            // district+" "+state+" "+country+" "+geoClassificationLabel+" "+yearsAtResidence+" "+yearsAtCity+" "+
            // addressOwnerTypeLabel+" "+ownerDetailsLabel+" "+ownerName)
            const appDetails = {
                "isActive": true,
                "createdBy": global.USERID,
                "createdDate": new Date(),
                "modifiedBy": global.USERID,
                "modifiedDate": new Date(),
                "supervisedBy": global.USERID,
                "addressType": addressTypeLabel,
                "addressLine1": addressLine1,
                "addressLine2": addressLine2,
                "landmark": landmark,
                "pincode": pincode,
                "city": city,
                "district": district,
                "state": state,
                "country": country,
                "mobileOrLandLineNumber": "",
                "emailId": "",
                "addressOwnership": addressOwnerTypeLabel,
                "ownerDetails": ownerDetailsLabel,
                "ownerName": ownerName,
                "geoClassification": '',
                "yearsAtResidence": '',
                "yearsInCurrentCityOrTown": '',
                "supervisedDate": new Date()
            }
            const baseURL = '8901';
            setLoading(true);
            apiInstancelocal(baseURL)
                .put(`api/v2/profile-short/address-details/${addressID}`, appDetails)
                .then(async response => {
                    // Handle the response data
                    if (global.DEBUG_MODE) console.log('UpdateAddressResponse::' + JSON.stringify(response.data),);
                    insertData(addressID)
                    setLoading(false);
                })
                .catch(error => {
                    // Handle the error
                    if (global.DEBUG_MODE) console.log('UpdateAddressError' + JSON.stringify(error.response));
                    setLoading(false);
                    if (error.response.data != null) {
                        setApiError(error.response.data.message);
                        setErrorModalVisible(true)
                    }
                });
            //insertData()
        }
    };


    const getIFSCCode = (ifsc) => {
        let IFSC = '';
        IFSC = ifsc.toUpperCase()

        const baseURL = '8082';
        setLoading(true);
        apiInstance(baseURL)
            .get(`api/v1/ifsc-config/getByIfsc/${IFSC}`)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log('IFSCApiResponse::' + JSON.stringify(response.data));
                setBankName(response.data.bankName)
                setBranchName(response.data.branchName)
                setLoading(false);
            })
            .catch(error => {
                // Handle the error
                if (global.DEBUG_MODE) console.log('IFSCApiError' + JSON.stringify(error.response));
                setLoading(false);
                if (error.response.data != null) {
                    setApiError(error.response.data.message);
                    setErrorModalVisible(true)
                }
            });

    };

    const insertData = () => {
        tbl_bankdetails.insertBankDetails(
            '123',
            global.CLIENTID,
            global.CLIENTTYPE,
            accountTypeLabel.trim(),
            accountHolderName.trim(),
            ifscCode.trim(),
            bankName.trim(),
            branchName.trim(),
            accountNumber.trim(),
            bankLinkedMobNo.trim(),
            upiID.trim()
        )
            .then(result => {
                if (global.DEBUG_MODE) console.log('Inserted Bank detail:', result);
                props.navigation.replace('BankList')
            })
            .catch(error => {
                if (global.DEBUG_MODE) console.error('Error Inserting Bank detail:', error);
            });
    }

    const handlePickerClick = (componentName, label, index) => {
        if (componentName === 'AccountTypePicker') {
            setAccountTypeLabel(label);
            setAccountTypeIndex(index);
        }
    }

    const handleClick = (componentName, textValue) => {

        if (componentName === 'accountHolderName') {
            if (textValue.length > 0) {
                if (Common.isValidText(textValue))
                    setAccountHolderName(textValue)
            } else {
                setAccountHolderName(textValue)
            }
        } else if (componentName === 'ifsccode') {
            if (textValue.length > 0) {
                setIfscCode(textValue)
            } else {
                setIfscCode(textValue)
            }
        } else if (componentName === 'bankname') {
            if (textValue.length > 0) {
                if (Common.isValidText(textValue))
                    setBankName(textValue)
            } else {
                setBankName(textValue)
            }
        } else if (componentName === 'branchname') {
            if (textValue.length > 0) {
                if (Common.isValidText(textValue))
                    setBranchName(textValue)
            } else {
                setBranchName(textValue)
            }
        } else if (componentName === 'accountnumber') {
            if (textValue.length > 0) {
                setAccountNumber(textValue)
            } else {
                setAccountNumber(textValue)
            }
        } else if (componentName === 'confirmaccountnumber') {
            if (textValue.length > 0) {
                setConfirmAccountNumber(textValue)
            } else {
                setConfirmAccountNumber(textValue)
            }
        } else if (componentName === 'banklinkedmobilenumber') {
            if (textValue.length > 0) {
                setBankLinkedMobNo(textValue)
            } else {
                setBankLinkedMobNo(textValue)
            }
        } else if (componentName === 'upiid') {
            if (textValue.length > 0) {
                setUpiID(textValue)
            } else {
                setUpiID(textValue)
            }
        }

    }

    const handleReference = (componentName) => {

        if (componentName === 'accountHolderName') {

        } else if (componentName === 'ifsccode') {
            if (ifscCode.length > 0) {
                getIFSCCode(ifscCode)
            }
        }

    };

    const closeErrorModal = () => {
        setErrorModalVisible(false);
    };

    const onGoBack = () => {
        props.navigation.goBack();
    }

    return (
        <SafeAreaView style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
            <ErrorModal isVisible={errorModalVisible} onClose={closeErrorModal} textContent={apiError} textClose={language[0][props.language].str_ok} />

            <ErrorMessageModal
                isVisible={bottomErrorSheetVisible}
                hideBottomSheet={hideBottomSheet}
                errMsg={errMsg}
                textError={language[0][props.language].str_error}
                textClose={language[0][props.language].str_ok}
            />
            <View style={{ width: '100%', height: 56, alignItems: 'center', justifyContent: 'center', }}>
                <HeadComp textval={language[0][props.language].str_loanDemographics} props={props} onGoBack={onGoBack} />
            </View>
            <ChildHeadComp
                textval={global.CLIENTTYPE == 'APPL' ? language[0][props.language].str_applicantdetails : global.CLIENTTYPE == 'CO-APPL' ? language[0][props.language].str_coapplicantdetails : language[0][props.language].str_guarantordetails}
            />
            <View style={{ width: '100%', alignItems: 'center', marginTop: '3%' }}>
                <View style={{ width: '90%', marginTop: 3 }}>
                    <TextComp
                        textStyle={{
                            color: Colors.mediumgrey,
                            fontSize: 15,
                            fontFamily: 'Poppins-Medium'
                        }}
                        textVal={
                            language[0][props.language].str_bankdetail
                        }></TextComp>

                    <ProgressComp progressvalue={1} textvalue="6 of 6" />
                </View>
            </View>

            <ScrollView style={styles.scrollView}
                contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                {loading ? <Loading /> : null}

                {accountTypeVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={accountTypeCaption} textStyle={Commonstyles.inputtextStyle} Visible={accountTypeMan} />
                    </View>
                    <PickerComp textLabel={accountTypeLabel} pickerStyle={Commonstyles.picker} Disable={accountTypeDisable} pickerdata={accountTypeData} componentName='AccountTypePicker' handlePickerClick={handlePickerClick} />
                </View>}

                {accountHolderNameVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={accountHolderNameCaption} textStyle={Commonstyles.inputtextStyle} Visible={accountHolderNameMan} />
                    </View>
                    <TextInputComp textValue={accountHolderName} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={accountHolderNameDisable} ComponentName='accountHolderName' reference={accountHolderNameRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}

                {ifscCodeVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={ifscCodeCaption} textStyle={Commonstyles.inputtextStyle} Visible={ifscCodeMan} />
                    </View>
                    <TextInputComp textValue={ifscCode} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={ifscCodeDisable} ComponentName='ifsccode' reference={ifscCodeRef} returnKey="done" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}

                {bankNameVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={bankNameCaption} textStyle={Commonstyles.inputtextStyle} Visible={bankNameMan} />
                    </View>
                    <TextInputComp textValue={bankName} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={bankNameDisable} ComponentName='bankname' reference={bankNameRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}

                {branchNameVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={branchNameCaption} textStyle={Commonstyles.inputtextStyle} Visible={branchNameMan} />
                    </View>
                    <TextInputComp textValue={branchName} textStyle={Commonstyles.textinputtextStyle} type='number-pad' Disable={branchNameDisable} ComponentName='branchname' reference={branchNameRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}

                {accountNumberVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={accountNumberCaption} textStyle={Commonstyles.inputtextStyle} Visible={accountNumberMan} />
                    </View>
                    <TextInputComp textValue={accountNumber} textStyle={Commonstyles.textinputtextStyle} type='number-pad' Disable={accountNumberDisable} ComponentName='accountnumber' reference={accountNumberRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}

                {confirmAccountNumberVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={confirmAccountNumberCaption} textStyle={Commonstyles.inputtextStyle} Visible={confirmAccountNumberMan} />
                    </View>
                    <TextInputComp textValue={confirmAccountNumber} textStyle={Commonstyles.textinputtextStyle} type='number-pad' Disable={confirmAccountNumberDisable} ComponentName='confirmaccountnumber' reference={confirmAccountNumberRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}

                {bankLinkedMobNoVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={bankLinkedMobNoCaption} textStyle={Commonstyles.inputtextStyle} Visible={bankLinkedMobNoMan} />
                    </View>
                    <TextInputComp textValue={bankLinkedMobNo} textStyle={Commonstyles.textinputtextStyle} type='number-pad' Disable={bankLinkedMobNoDisable} ComponentName='banklinkedmobilenumber' reference={bankLinkedMobileNumberRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}

                {upiIDVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={upiIDCaption} textStyle={Commonstyles.inputtextStyle} Visible={upiIDMan} />
                    </View>
                    <TextInputComp textValue={upiID} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={upiIDDisable} ComponentName='upiid' reference={upiIdRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}


                <ButtonViewComp
                    textValue={language[0][props.language].str_next.toUpperCase()}
                    textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
                    viewStyle={Commonstyles.buttonView}
                    innerStyle={Commonstyles.buttonViewInnerStyle}
                    handleClick={bankSubmit}
                />
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

const mapStateToProps = state => {
    const { language } = state.languageReducer;
    const { profileDetails } = state.profileReducer;
    const { mobileCodeDetails } = state.mobilecodeReducer;
    return {
        language: language,
        profiledetail: profileDetails,
        mobilecodedetail: mobileCodeDetails
    }
};

const mapDispatchToProps = dispatch => ({
    languageAction: item => dispatch(languageAction(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BankDetailsScreen);
