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
import apiInstance from '../../../Utils/apiInstance';
import ErrorModal from '../../../Components/ErrorModal';
import tbl_client from '../../../Database/Table/tbl_client';

const LoanAddressDetails = (props, { navigation }) => {
    const [loading, setLoading] = useState(false);
    // const [Data, setNewData] = useState();
    const [DataArray, setNewDataArray] = useState([]);
    const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
    const showBottomSheet = () => setBottomErrorSheetVisible(true);
    const hideBottomSheet = () => setBottomErrorSheetVisible(false);

    const [errMsg, setErrMsg] = useState('');
    let errorCounter = 1;

    const addressLine1Ref = useRef(null);
    const addressLine2Ref = useRef(null);
    const landmarkRef = useRef(null);
    const pincodeRef = useRef(null);
    const cityRef = useRef(null);
    const districtRef = useRef(null);
    const stateRef = useRef(null);
    const countryRef = useRef(null);
    const mobileRef = useRef(null);
    const emailRef = useRef(null);
    const ownerNameRef = useRef(null);

    const [isNew, setIsNew] = useState(props.route.params.addressType);

    const [addressTypeLabel, setAddressTypeLabel] = useState('');
    const [addressTypeIndex, setAddressTypeIndex] = useState('');
    const [addressTypeCaption, setAddressTypeCaption] = useState('ADDRESS TYPE');
    const [addressTypeMan, setAddressTypeMan] = useState(true);
    const [addressTypeVisible, setAddressTypeVisible] = useState(true);
    const [addressTypeDisable, setAddressTypeDisable] = useState(false);
    const [addressTypeData, setaddressTypeData] = useState([]);

    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine1Caption, setAddressLine1Caption] = useState('ADDRESS LINE 1');
    const [addressLine1Man, setAddressLine1Man] = useState(true);
    const [addressLine1Visible, setAddressLine1Visible] = useState(true);
    const [addressLine1Disable, setAddressLine1Disable] = useState(false);

    const [addressLine2, setAddressLine2] = useState('');
    const [addressLine2Caption, setAddressLine2Caption] = useState('ADDRESS LINE 2');
    const [addressLine2Man, setAddressLine2Man] = useState(false);
    const [addressLine2Visible, setAddressLine2Visible] = useState(true);
    const [addressLine2Disable, setAddressLine2Disable] = useState(false);

    const [landmark, setLandmark] = useState('');
    const [landmarkCaption, setLandmarkCaption] = useState('LANDMARK');
    const [landmarkMan, setLandmarkMan] = useState(false);
    const [landmarkVisible, setLandmarkVisible] = useState(true);
    const [landmarkDisable, setLandmarkDisable] = useState(false);

    const [pincode, setPincode] = useState('');
    const [pincodeCaption, setPincodeCaption] = useState('PINCODE');
    const [pincodeMan, setPincodeMan] = useState(true);
    const [pincodeVisible, setPincodeVisible] = useState(true);
    const [pincodeDisable, setPincodeDisable] = useState(false);

    const [city, setCity] = useState('');
    const [cityCaption, setCityCaption] = useState('CITY/VILLAGE');
    const [cityMan, setCityMan] = useState(true);
    const [cityVisible, setCityVisible] = useState(true);
    const [cityDisable, setCityDisable] = useState(false);

    const [district, setDistrict] = useState('');
    const [districtCaption, setDistrictCaption] = useState('DISTRICT');
    const [districtMan, setDistrictMan] = useState(true);
    const [districtVisible, setDistrictVisible] = useState(true);
    const [districtDisable, setDistrictDisable] = useState(false);

    const [state, setState] = useState('');
    const [stateCaption, setStateCaption] = useState('STATE');
    const [stateMan, setStateMan] = useState(true);
    const [stateVisible, setStateVisible] = useState(true);
    const [stateDisable, setStateDisable] = useState(false);

    const [country, setCountry] = useState('');
    const [countryCaption, setCountryCaption] = useState('COUNTRY');
    const [countryMan, setCountryMan] = useState(true);
    const [countryVisible, setCountryVisible] = useState(true);
    const [countryDisable, setCountryDisable] = useState(false);

    const [mobileNo, setMobileNo] = useState('');
    const [mobileNoCaption, setMobileNoCaption] = useState('MOBILE/LANDLINE NUMBER');
    const [mobileNoMan, setMobileNoMan] = useState(false);
    const [mobileNoVisible, setMobileNoVisible] = useState(true);
    const [mobileNoDisable, setMobileNoDisable] = useState(false);

    const [email, setEmail] = useState('');
    const [emailCaption, setEmailCaption] = useState('EMAIL');
    const [emailMan, setEmailMan] = useState(false);
    const [emailVisible, setEmailVisible] = useState(true);
    const [emailDisable, setEmailDisable] = useState(false);

    const [addressOwnerTypeLabel, setAddressOwnerTypeLabel] = useState('');
    const [addressOwnerTypeIndex, setAddressOwnerTypeIndex] = useState('');
    const [addressOwnerTypeCaption, setAddressOwnerTypeCaption] = useState('ADDRESS OWNERSHIP TYPE');
    const [addressOwnerTypeMan, setAddressOwnerTypeMan] = useState(true);
    const [addressOwnerTypeVisible, setAddressOwnerTypeVisible] = useState(true);
    const [addressOwnerTypeDisable, setAddressOwnerTypeDisable] = useState(false);
    const [addressOwnerTypeData, setAddressOwnerTypeData] = useState([]);

    const [ownerDetailsLabel, setOwnerDetailsLabel] = useState('');
    const [ownerDetailsIndex, setOwnerDetailsIndex] = useState('');
    const [ownerDetailsCaption, setOwnerDetailsCaption] = useState('OWNER DETAILS');
    const [ownerDetailsMan, setOwnerDetailsMan] = useState(true);
    const [ownerDetailsVisible, setOwnerDetailsVisible] = useState(true);
    const [ownerDetailsDisable, setOwnerDetailsDisable] = useState(false);
    const [ownerDetailsData, setOwnerDetailsData] = useState([]);

    const [ownerName, setOwnerName] = useState('');
    const [ownerNameCaption, setOwnerNameCaption] = useState('OWNER NAME');
    const [ownerNameMan, setOwnerNameMan] = useState(true);
    const [ownerNameVisible, setOwnerNameVisible] = useState(true);
    const [ownerNameDisable, setOwnerNameDisable] = useState(false);

    const [systemCodeDetail, setSystemCodeDetail] = useState(props.mobilecodedetail.leadSystemCodeDto);
    const [userCodeDetail, setUserCodeDetail] = useState(props.mobilecodedetail.leadUserCodeDto);
    const [systemMandatoryField, setSystemMandatoryField] = useState(props.mobilecodedetail.processSystemMandatoryFields);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');

    const [addressID, setAddressID] = useState('');
    const [isKYC, setIsKYC] = useState('');
    const [onlyView, setOnlyView] = useState(false);


    const [postorput, setPostORPut] = useState('post');
    const [kycManual, setKYCManual] = useState('0');

    const [pincodeResponse, setPincodeResponse] = useState('');
    const [pageId, setPageId] = useState(global.CURRENTPAGEID);

    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        getSystemCodeDetail()
        makeSystemMandatoryFields();
        getExistingData()
        if (global.USERTYPEID == 1163) {
            fieldsDisable();
            setOnlyView(true);
        }

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
            getExistingAddressData(isNew.loanApplicationId, isNew.id)
        } else {
            setPostORPut('post');
        }
    }

    const fieldsDisable = () => {

        setAddressTypeDisable(true);
        setAddressLine1Disable(true);
        setAddressLine2Disable(true);
        setLandmarkDisable(true);
        setPincodeDisable(true);
        setCityDisable(true);
        setDistrictDisable(true);
        setStateDisable(true)
        setCountryDisable(true)
        setAddressOwnerTypeDisable(true);
        setOwnerDetailsDisable(true);
        setOwnerNameDisable(true);

    }

    const getExistingAddressData = (loanAppId, id) => {
        tbl_loanaddressinfo.getAllLoanAddressDetailsForLoanIDAndID(loanAppId, id.toString())
            .then(data => {
                if (global.DEBUG_MODE) console.log('Address Detail:', data);
                setAddressID(data[0].id)
                setAddressLine1(data[0].address_line_1)
                setAddressLine2(data[0].address_line_2)
                setLandmark(data[0].landmark)
                setPincode(data[0].pincode)
                setCity(data[0].city)
                setDistrict(data[0].district)
                setState(data[0].state)
                setCountry(data[0].country)
                setOwnerName(data[0].owner_name)
                setMobileNo(data[0].mobile_or_land_line_number)
                setEmail(data[0].email_id)
                //spinner
                setAddressTypeLabel(data[0].address_type)
                if (data[0].address_type == 'ROA' || data[0].address_type == 'OPA') {
                    setAddressOwnerTypeVisible(false);
                    setOwnerDetailsVisible(false);
                    setOwnerNameVisible(false)
                }
                if (global.DEBUG_MODE) console.log("LoanAddressType::" + data[0].address_type)
                setAddressOwnerTypeLabel(data[0].address_ownership)
                setOwnerDetailsLabel(data[0].owner_details)
                if (data[0].isKyc === "1") {
                    disableAadharFields(data)
                }
                setIsKYC(data[0].isKyc);
                setLoading(false)
            })
            .catch(error => {
                if (global.DEBUG_MODE) console.error('Error fetching bank details:', error);
                setLoading(false)
            });
    }

    const disableAadharFields = (data) => {
        setAddressTypeDisable(true)
        setAddressLine1Disable(true)
        setAddressLine2Disable(true)
        if (data[0].landmark != null && data[0].landmark != "") {
            setLandmarkDisable(true)
        }
        setPincodeDisable(true)
        setDistrictDisable(true)
        setStateDisable(true)
        setCountryDisable(true)
        setOwnerNameDisable(true)
    }

    const getSystemCodeDetail = () => {

        const filterAddressTypeData = userCodeDetail.filter((data) => data.masterId === 'ADDRESS_TYPE');
        setaddressTypeData(filterAddressTypeData)

        const filterOwnershipTypeData = userCodeDetail.filter((data) => data.masterId === 'ADDRESS_OWNERSHIP_TYPE');
        setAddressOwnerTypeData(filterOwnershipTypeData)

        const filterOwnerDetailsData = userCodeDetail.filter((data) => data.masterId === 'OWNER_DETAILS');
        setOwnerDetailsData(filterOwnerDetailsData)

    }

    const makeSystemMandatoryFields = () => {

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_addr_address_type' && data.pageId === pageId).map((value, index) => {

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

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_addr_address_line_1' && data.pageId === pageId).map((value, index) => {

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

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_addr_address_line_2' && data.pageId === pageId).map((value, index) => {

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

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_addr_landmark' && data.pageId === pageId).map((value, index) => {

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

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_addr_pincode' && data.pageId === pageId).map((value, index) => {

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

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_addr_city/village' && data.pageId === pageId).map((value, index) => {

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

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_addr_disrtict' && data.pageId === pageId).map((value, index) => {

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

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_addr_state' && data.pageId === pageId).map((value, index) => {

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

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_addr_country' && data.pageId === pageId).map((value, index) => {

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

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_land_mb_no' && data.pageId === pageId).map((value, index) => {

            if (value.mandatory) {
                setMobileNoMan(true)
            }
            if (value.hide) {
                setMobileNoVisible(false)
            }
            if (value.disable) {
                setMobileNoDisable(true)
            }
            if (value.captionChange) {
                setMobileNoCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_email' && data.pageId === pageId).map((value, index) => {

            if (value.mandatory) {
                setEmailMan(true)
            }
            if (value.hide) {
                setEmailVisible(false)
            }
            if (value.disable) {
                setEmailDisable(true)
            }
            if (value.captionChange) {
                setEmailCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_addr_address ownership type' && data.pageId === pageId).map((value, index) => {

            if (value.mandatory) {
                setAddressOwnerTypeMan(true)
            }
            if (value.hide) {
                setAddressOwnerTypeVisible(false)
            }
            if (value.disable) {
                setAddressOwnerTypeDisable(true)
            }
            if (value.captionChange) {
                setAddressOwnerTypeCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_addr_owner_details' && data.pageId === pageId).map((value, index) => {

            if (value.mandatory) {
                setOwnerDetailsMan(true)
            }
            if (value.hide) {
                setOwnerDetailsVisible(false)
            }
            if (value.disable) {
                setOwnerDetailsDisable(true)
            }
            if (value.captionChange) {
                setOwnerDetailsCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_addr_owner name' && data.pageId === pageId).map((value, index) => {

            if (value.mandatory) {
                setOwnerNameMan(true)
            }
            if (value.hide) {
                setOwnerNameVisible(false)
            }
            if (value.disable) {
                setOwnerNameDisable(true)
            }
            if (value.captionChange) {
                setOwnerNameCaption(value[0].fieldCaptionChange)
            }
        });

    }

    const validateData = () => {
        var flag = false;
        var i = 1;
        var errorMessage = '';

        if (addressTypeMan && addressTypeVisible) {
            if (addressTypeLabel.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + addressTypeCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (addressLine1Man && addressLine1Visible) {
            if (addressLine1.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + addressLine1Caption + '\n';
                i++;
                flag = true;
            }
        }

        if (addressLine2Man && addressLine2Visible) {
            if (addressLine2.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + addressLine2Caption + '\n';
                i++;
                flag = true;
            }
        }

        if (landmarkMan && landmarkVisible) {
            if (landmark.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + landmarkCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (pincodeMan && pincodeVisible) {
            if (pincode.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + pincodeCaption + '\n';
                i++;
                flag = true;
            } else if (pincode.length < 6) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + "Valid " + pincodeCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (cityMan && cityVisible) {
            if (city.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + cityCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (districtMan && districtVisible) {
            if (district.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + districtCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (stateMan && stateVisible) {
            if (state.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + stateCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (countryMan && countryVisible) {
            if (country.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + countryCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (mobileNoMan && mobileNoVisible) {
            if (mobileNo.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + mobileNoCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (mobileNo.length > 0) {
            if (!Common.isValidPhoneNumber(mobileNo)) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsentervalid +
                    mobileNoCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (emailMan && emailVisible) {
            if (email.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + emailCaption + '\n';
                i++;
                flag = true;
            }
        }


        if (email.length > 0) {
            if (!Common.isValidEmail(email)) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsenter +
                    'Valid ' + emailCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (addressOwnerTypeMan && addressOwnerTypeVisible) {
            if (addressOwnerTypeLabel.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + addressOwnerTypeCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (ownerDetailsMan && ownerDetailsVisible) {
            if (ownerDetailsLabel.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + ownerDetailsCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (ownerNameMan && ownerNameVisible) {
            if (ownerName.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + ownerNameCaption + '\n';
                i++;
                flag = true;
            }
        }


        setErrMsg(errorMessage);
        return flag;
    };

    const addressSubmit = () => {

        if (global.USERTYPEID == 1163) {
            props.navigation.replace('LoanAddressList')
            return;
        }

        if (addressID.length <= 0) {
            postAddressData();
        } else {
            updateAddressData();
        }
    }

    const postAddressData = () => {
        if (validateData()) {
            showBottomSheet();
            //alert(errMsg)
        } else {

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
            apiInstance(baseURL)
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
            apiInstance(baseURL)
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


    const getPinCode = (pincode) => {

        const baseURL = '8082';
        setLoading(true);
        apiInstance(baseURL)
            .get(`api/v1/pincode/new/${pincode}`)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log('PincodeApiResponse::' + JSON.stringify(response.data),);

                setLoading(false);

                setPincodeResponse(response.data);
                setDistrict(response.data.city.name);
                setState(response.data.city.state.name);
                setCountry(response.data.city.state.country.name);
                setDistrictDisable(true)
                setStateDisable(true);
                setCountryDisable(true);


            })
            .catch(error => {
                // Handle the error
                if (global.DEBUG_MODE) console.log('PincodeApiError' + JSON.stringify(error.response));
                setLoading(false);
                if (error.response.data != null) {
                    setApiError(error.response.data.message);
                    setErrorModalVisible(true)
                }
            });

    };

    const insertData = (id) => {
        tbl_loanaddressinfo.insertLoanAddress(
            global.LOANAPPLICATIONID,
            id,
            global.CLIENTID,
            global.CLIENTTYPE,
            addressTypeLabel.trim(),
            addressLine1.trim(),
            addressLine2.trim(),
            landmark.trim(),
            pincode.trim(),
            city.trim(),
            district.trim(),
            state.trim(),
            country.trim(),
            mobileNo,
            email,
            addressOwnerTypeLabel.trim(),
            ownerDetailsLabel.trim(),
            ownerName.trim(),
            "true",
            isKYC
        )
            .then(result => {
                if (global.DEBUG_MODE) console.log('Inserted Loan Address detail:', result);
                props.navigation.replace('LoanAddressList')
            })
            .catch(error => {
                if (global.DEBUG_MODE) console.error('Error Inserting Loan Address detail:', error);
            });
    }

    const handlePickerClick = (componentName, label, index) => {

        if (componentName === 'AddressTypePicker') {
            setAddressTypeLabel(label);
            setAddressTypeIndex(index);
            if (label == 'ROA' || label == 'OPA') {
                setAddressOwnerTypeVisible(true);
                setOwnerDetailsVisible(true);
                setOwnerNameVisible(true)
            } else {
                setAddressOwnerTypeVisible(false);
                setOwnerDetailsVisible(false);
                setOwnerNameVisible(false)
            }
        } else if (componentName === 'AddressOwnershipPicker') {
            setAddressOwnerTypeLabel(label);
            setAddressOwnerTypeIndex(index);
        } else if (componentName === 'OwnerDetailsPicker') {
            setOwnerDetailsLabel(label);
            setOwnerDetailsIndex(index);
        }

    }

    const handleClick = (componentName, textValue) => {

        if (componentName === 'addressLine1') {
            // if (textValue.length > 0) {
            //     if (Common.isValidText(textValue))
            //         setAddressLine1(textValue)
            // } else {
            setAddressLine1(textValue)
            // }
        } else if (componentName === 'addressLine2') {
            // if (textValue.length > 0) {
            //     if (Common.isValidText(textValue))
            //         setAddressLine2(textValue)
            // } else {
            setAddressLine2(textValue)
            // }
        } else if (componentName === 'landmark') {
            if (textValue.length > 0) {
                if (Common.isValidText(textValue))
                    setLandmark(textValue)
            } else {
                setLandmark(textValue)
            }
        } else if (componentName === 'pincode') {
            if (textValue.length == 6) {
                getPinCode(textValue)
            }
            setPincode(textValue)
        } else if (componentName === 'city') {
            if (textValue.length > 0) {
                if (Common.isValidText(textValue))
                    setCity(textValue)
            } else {
                setCity(textValue)
            }
        } else if (componentName === 'district') {
            if (textValue.length > 0) {
                if (Common.isValidText(textValue))
                    setDistrict(textValue)
            } else {
                setDistrict(textValue)
            }
        } else if (componentName === 'state') {
            if (textValue.length > 0) {
                if (Common.isValidText(textValue))
                    setState(textValue)
            } else {
                setState(textValue)
            }
        } else if (componentName === 'country') {
            if (textValue.length > 0) {
                if (Common.isValidText(textValue))
                    setCountry(textValue)
            } else {
                setCountry(textValue)
            }
        } else if (componentName === 'mobile') {
            if (textValue.length > 10) {
                if (Common.isValidPhoneNumber(textValue)) {
                    setMobileNo(textValue)
                }
            } else {
                setMobileNo(textValue)
            }
        } else if (componentName === 'email') {
            if (textValue.length > 0) {
                setEmail(textValue)
            } else {
                setEmail(textValue)
            }
        } else if (componentName === 'OwnerName') {
            if (textValue.length > 0) {
                if (Common.isValidText(textValue))
                    setOwnerName(textValue)
            } else {
                setOwnerName(textValue)
            }
        }

    }

    const handleReference = (componentName) => {

        if (componentName === 'addressLine1') {
            if (addressLine2Visible) {
                addressLine2Ref.current.focus();
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

            <ScrollView style={styles.scrollView}
                contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                {loading ? <Loading /> : null}

                {addressTypeVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={addressTypeCaption} textStyle={Commonstyles.inputtextStyle} Visible={addressTypeMan} />
                    </View>
                    <PickerComp textLabel={addressTypeLabel} pickerStyle={Commonstyles.picker} Disable={addressTypeDisable} pickerdata={addressTypeData} componentName='AddressTypePicker' handlePickerClick={handlePickerClick} />
                </View>}

                {addressLine1Visible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={addressLine1Caption} textStyle={Commonstyles.inputtextStyle} Visible={addressLine1Man} />
                    </View>
                    <TextInputComp textValue={addressLine1} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={addressLine1Disable} ComponentName='addressLine1' reference={addressLine1Ref} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={150} />
                </View>}

                {addressLine2Visible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={addressLine2Caption} textStyle={Commonstyles.inputtextStyle} Visible={addressLine2Man} />
                    </View>
                    <TextInputComp textValue={addressLine2} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={addressLine2Disable} ComponentName='addressLine2' reference={addressLine2Ref} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={150} />
                </View>}

                {landmarkVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={landmarkCaption} textStyle={Commonstyles.inputtextStyle} Visible={landmarkMan} />
                    </View>
                    <TextInputComp textValue={landmark} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={landmarkDisable} ComponentName='landmark' reference={landmarkRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}

                {pincodeVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={pincodeCaption} textStyle={Commonstyles.inputtextStyle} Visible={pincodeMan} />
                    </View>
                    <TextInputComp textValue={pincode} textStyle={Commonstyles.textinputtextStyle} type='number-pad' Disable={pincodeDisable} ComponentName='pincode' reference={pincodeRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={6} />
                </View>}

                {cityVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={cityCaption} textStyle={Commonstyles.inputtextStyle} Visible={cityMan} />
                    </View>
                    <TextInputComp textValue={city} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={cityDisable} ComponentName='city' reference={cityRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}

                {districtVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={districtCaption} textStyle={Commonstyles.inputtextStyle} Visible={districtMan} />
                    </View>
                    <TextInputComp textValue={district} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={districtDisable} ComponentName='district' reference={districtRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}

                {stateVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={stateCaption} textStyle={Commonstyles.inputtextStyle} Visible={stateMan} />
                    </View>
                    <TextInputComp textValue={state} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={stateDisable} ComponentName='state' reference={stateRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}

                {countryVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={countryCaption} textStyle={Commonstyles.inputtextStyle} Visible={countryMan} />
                    </View>
                    <TextInputComp textValue={country} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={countryDisable} ComponentName='country' reference={countryRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}

                {mobileNoVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={mobileNoCaption} textStyle={Commonstyles.inputtextStyle} Visible={mobileNoMan} />
                    </View>
                    <TextInputComp textValue={mobileNo} textStyle={Commonstyles.textinputtextStyle} type='number-pad' Disable={mobileNoDisable} ComponentName='mobile' reference={mobileRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={10} />
                </View>}

                {emailVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={emailCaption} textStyle={Commonstyles.inputtextStyle} Visible={emailMan} />
                    </View>
                    <TextInputComp textValue={email} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={emailDisable} ComponentName='email' reference={emailRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}

                {addressOwnerTypeVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={addressOwnerTypeCaption} textStyle={Commonstyles.inputtextStyle} Visible={addressOwnerTypeMan} />
                    </View>
                    <PickerComp textLabel={addressOwnerTypeLabel} pickerStyle={Commonstyles.picker} Disable={addressOwnerTypeDisable} pickerdata={addressOwnerTypeData} componentName='AddressOwnershipPicker' handlePickerClick={handlePickerClick} />
                </View>}

                {ownerDetailsVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={ownerDetailsCaption} textStyle={Commonstyles.inputtextStyle} Visible={ownerDetailsMan} />
                    </View>
                    <PickerComp textLabel={ownerDetailsLabel} pickerStyle={Commonstyles.picker} Disable={ownerDetailsDisable} pickerdata={ownerDetailsData} componentName='OwnerDetailsPicker' handlePickerClick={handlePickerClick} />
                </View>}

                {ownerNameVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={ownerNameCaption} textStyle={Commonstyles.inputtextStyle} Visible={ownerNameMan} />
                    </View>
                    <TextInputComp textValue={ownerName} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={ownerNameDisable} ComponentName='OwnerName' reference={ownerNameRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}


                <ButtonViewComp
                    textValue={language[0][props.language].str_next.toUpperCase()}
                    textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
                    viewStyle={Commonstyles.buttonView}
                    innerStyle={Commonstyles.buttonViewInnerStyle}
                    handleClick={addressSubmit}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoanAddressDetails);
