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
import apiInstance from '../../../Utils/apiInstance';
import jwtDecode from 'jwt-decode';
import Colors from '../../../Utils/Colors';
import MyStatusBar from '../../../Components/MyStatusBar';
import Loading from '../../../Components/Loading';
import TextComp from '../../../Components/TextComp';
import { connect } from 'react-redux';
import { languageAction } from '../../../Utils/redux/actions/languageAction';
import { language } from '../../../Utils/LanguageString';
import Commonstyles from '../../../Utils/Commonstyles';
import ImageComp from '../../../Components/ImageComp';
import Entypo from 'react-native-vector-icons/Entypo';
import HeadComp from '../../../Components/HeadComp';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import ProgressComp from '../../../Components/ProgressComp';
import tbl_SystemCodeDetails from '../../../Database/Table/tbl_SystemCodeDetails';
import tbl_SystemMandatoryFields from '../../../Database/Table/tbl_SystemMandatoryFields';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';
import PickerComp from '../../../Components/PickerComp';
import TextInputComp from '../../../Components/TextInputComp';
import tbl_lead_creation_loan_details from '../../../Database/Table/tbl_lead_creation_loan_details';
import Common from '../../../Utils/Common';
import { profileAction } from '../../../Utils/redux/actions/ProfileAction';
import ButtonViewComp from '../../../Components/ButtonViewComp';
import ErrorModal from '../../../Components/ErrorModal';


const LeadCreationLoan = (props, { navigation }) => {

    const [profileDetail, setProfileDetail] = useState(props.profiledetail);

    const [leadType, setLeadType] = useState(global.LEADTYPE);
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

    const [productIdLabel, setProductIdLabel] = useState('');
    const [productIdIndex, setProductIdIndex] = useState('');
    const [productIdCaption, setProductIdCaption] = useState('PRODUCT ID');
    const [productIdMan, setProductIdMan] = useState(true);
    const [productIdVisible, setProductIdVisible] = useState(true);
    const [productIdDisable, setProductIdDisable] = useState(false);
    const [productIdData, setProductIdData] = useState([]);

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
    const loanAmountRef = useRef(null);

    const [minLoanAmount, setMinLoanAmount] = useState(0);
    const [maxLoanAmount, setMaxLoanAmount] = useState(0);


    const [systemCodeDetail, setSystemCodeDetail] = useState(props.mobilecodedetail.leadSystemCodeDto);
    const [userCodeDetail, setUserCodeDetail] = useState(props.mobilecodedetail.leadUserCodeDto);
    const [systemMandatoryField, setSystemMandatoryField] = useState(props.mobilecodedetail.leadSystemMandatoryFieldDto);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');


    useEffect(() => {
        //  pickerData();
        // callPickerApi();
        makeSystemMandatoryFields();
        getData();

    }, []);


    const getSystemCodeDetail = () => {

        const filteredLoanTypeData = systemCodeDetail.filter((data) => data.masterId === 'LNTP').sort((a, b) => a.Description.localeCompare(b.Description));
        setLoanTypeData(filteredLoanTypeData);

        const filteredLoanPurposeData = userCodeDetail.filter((data) => data.masterId === 'LNPS').sort((a, b) => a.Description.localeCompare(b.Description));
        setLoanPurposeData(filteredLoanPurposeData);

        const filteredLeadTypeData = systemCodeDetail.filter((data) => data.masterId === 'LEAD_TYPE').sort((a, b) => a.Description.localeCompare(b.Description));
        setLeadTypeData(filteredLeadTypeData);


    }


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


    const makeSystemMandatoryFields = () => {

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_loantype').map((value, index) => {
            setLoanTypeCaption(value.fieldName)
            if (value.mandatory) {
                setLoanTypeMan(true);
            }
            if (value.hide) {
                setLoanTypeVisible(false);
            }
            if (value.disable) {
                setLoanTypeDisable(true);
            }
            if (value.captionChange) {
                setLoanTypeCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_productid').map((value, index) => {
            setProductIdCaption(value.fieldName)
            if (value.mandatory) {
                setProductIdMan(true);
            }
            if (value.hide) {
                setProductIdVisible(false);
            }
            if (value.disable) {
                setProductIdDisable(true);
            }
            if (value.captionChange) {
                setProductIdCaption(value[0].fieldCaptionChange)
            }
        });


        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_loanpurpose').map((value, index) => {
            setLoanPurposeCaption(value.fieldName)
            if (value.mandatory) {
                setLoanPurposeMan(true);
            }
            if (value.hide) {
                setLoanPurposeVisible(false);
            }
            if (value.disable) {
                setLoanPurposeDisable(true);
            }
            if (value.captionChange) {
                setLoanPurposeCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_loanamount').map((value, index) => {
            setLoanAmountCaption(value.fieldName)
            if (value.mandatory) {
                setLoanAmountMan(true);
            }
            if (value.hide) {
                setLoanAmountVisible(false);
            }
            if (value.disable) {
                setLoanAmountDisable(true);
            }
            if (value.captionChange) {
                setLoanAmountCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_leadtype').map((value, index) => {
            setLeadTypeCaption(value.fieldName)
            if (value.mandatory) {
                setLeadTypeMan(true);
            }
            if (value.hide) {
                setLeadTypeVisible(false);
            }
            if (value.disable) {
                setLeadTypeDisable(true);
            }
            if (value.captionChange) {
                setLeadTypeCaption(value[0].fieldCaptionChange)
            }
        });

    }

    const updateLeadDetails = () => {
        if (global.LEADTYPE == 'COMP') {
            props.navigation.navigate('LeadCreationCustomerPhoto', { leadData: props.route.params.leadData })
        } else if (validate()) {
            showBottomSheet();
        }
        else {
            Common.getNetworkConnection().then(value => {
                if (value.isConnected == true) {
                    callLeadApi();
                } else {
                    insertLead(global.leadID, true)
                }
            })


        }


    }

    const callLeadApi = () => {
        insertLead(global.leadID, false)
        const appDetails = {
            "leadCreationLoanDetails": {
                "createdBy": global.USERID,
                "createdOn": '',
                "loanType": loanTypeLabel,
                "loanPurpose": loanPurposeLabel,
                "leadType": leadTypeLabel,
                "loanAmount": loanAmount,
                "loanProduct": productIdLabel
            }
        }
        const baseURL = global.PORT1
        setLoading(true)
        apiInstance(baseURL).put(`/api/v1/lead-creation-initiation/${global.leadID}`, appDetails)
            .then(async (response) => {
                if (response.status == 200) {
                    if (global.DEBUG_MODE) console.log("LeadCreationLoanApiResponse::" + JSON.stringify(response.data));
                    checkPermissions().then(res => {
                        if (res == true) {
                            getOneTimeLocation();
                            setLoading(false)
                        } else {
                            setLoading(false)
                            setApiError('Permission Not Granted');
                            setErrorModalVisible(true)
                        }
                    });
                } else if (response.data.statusCode === 201) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                } else if (response.data.statusCode === 202) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                }
            })
            .catch((error) => {
                setLoading(false)
                if (global.DEBUG_MODE) console.log("LeadCreationLoanApiResponse::" + JSON.stringify(error.response.data));
                if (error.response.status == 404) {
                    setApiError(Common.error404);
                    setErrorModalVisible(true)
                } else if (error.response.status == 400) {
                    setApiError(Common.error400);
                    setErrorModalVisible(true)
                } else if (error.response.status == 500) {
                    setApiError(Common.error500);
                    setErrorModalVisible(true)
                } else if (error.response.data != null) {
                    setApiError(error.response.data.message);
                    setErrorModalVisible(true)
                }

            });

    }


    const insertLead = async (leadID, nav) => {
        await tbl_lead_creation_loan_details.insertLeadCreationLoanDetails(leadID, loanTypeLabel, productIdLabel, loanPurposeLabel, loanAmount, leadTypeLabel, global.USERID);

        tbl_lead_creation_loan_details.getLeadCreationLoanDetailsBasedOnLeadID(leadID).then(value => {
            console.log("LeadLoanDetails::::" + JSON.stringify(value))
        })

        if (nav == true) {
            checkPermissions().then(res => {
                if (res == true) {
                    getOneTimeLocation();
                    setLoading(false)
                } else {
                    setLoading(false)
                    setApiError('Permission Not Granted');
                    setErrorModalVisible(true)
                }
            });
        }
    }

    const getProductID = (loanType) => {
        let dataArray = [];
        if (props.mobilecodedetail && props.mobilecodedetail.t_ProductLoan) {
            props.mobilecodedetail.t_ProductLoan.forEach((data) => {
                if (data.NatureOfProductId === loanType) {
                    if (props.mobilecodedetail.t_product) {
                        props.mobilecodedetail.t_product.forEach((data1) => {
                            if (data1.ProductID === data.ProductID) {
                                dataArray.push({ 'subCodeId': data.ProductID, Description: data1.Description });
                            }
                        });
                    }
                }
            });
        }
        setProductIdData(dataArray)
    }

    const callLoanAmount = (productID) => {

        const filteredProductIDData = props.mobilecodedetail.t_ProductLoan.filter((data) => data.ProductID === productID);
        setMinLoanAmount(filteredProductIDData[0].MinLoanAmount);
        setMaxLoanAmount(filteredProductIDData[0].MaxLoanAmount);

        // const baseURL = '8083'
        // setLoading(true)
        // apiInstance(baseURL).get(`/api/v1/Product-Loan/productId=${productID}`)
        //     .then(async (response) => {
        //         setLoading(false);
        //         if (response.data.minLoanAmount.length > 0) {
        //             const minAmount = parseInt(response.data.minLoanAmount, 10);
        //             setMinLoanAmount(minAmount)
        //         }

        //         if (response.data.maxLoanAmount.length > 0) {
        //             const maxAmount = parseInt(response.data.maxLoanAmount, 10);
        //             setMaxLoanAmount(maxAmount)
        //         }


        //     })
        //     .catch((error) => {
        //         if (global.DEBUG_MODE) console.log("Error" + JSON.stringify(error.response))
        //         setLoading(false)
        //         alert(error);
        //     });
    }

    const callPickerApi = () => {

        const baseURL = global.PORT4
        setLoading(true)
        var loantyperesponse = false; var productidresponse = false; var loanpurposeresponse = false; var leadtyperesponse = false;
        apiInstance(baseURL).get('/api/v1/generic-master/type?size=100&type=LNTP')
            .then(async (response) => {
                if (response.status == 200) {
                    loantyperesponse = true;
                    if (loantyperesponse && productidresponse && loanpurposeresponse && leadtyperesponse) {
                        setLoading(false);
                    }
                    setLoanTypeData(response.data.content)
                }
                else if (response.data.statusCode === 201) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                } else if (response.data.statusCode === 202) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                }
            })
            .catch((error) => {
                if (global.DEBUG_MODE) console.log("Error" + JSON.stringify(error.response))
                setLoading(false)
                if (error.response.status == 404) {
                    setApiError(Common.error404);
                    setErrorModalVisible(true)
                } else if (error.response.status == 400) {
                    setApiError(Common.error400);
                    setErrorModalVisible(true)
                } else if (error.response.status == 500) {
                    setApiError(Common.error500);
                    setErrorModalVisible(true)
                } else if (error.response.data != null) {
                    setApiError(error.response.data.message);
                    setErrorModalVisible(true)
                }
            });
        apiInstance(baseURL).get('/api/v1/generic-master/type?size=100&type=PD')
            .then(async (response) => {
                if (response.status == 200) {
                    productidresponse = true;
                    if (loantyperesponse && productidresponse && loanpurposeresponse && leadtyperesponse) {
                        setLoading(false);
                    }
                    setProductIdData(response.data.content)
                }
                else if (response.data.statusCode === 201) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                } else if (response.data.statusCode === 202) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                }
            })
            .catch((error) => {
                if (global.DEBUG_MODE) console.log("Error" + JSON.stringify(error.response))
                setLoading(false)
                if (error.response.status == 404) {
                    setApiError(Common.error404);
                    setErrorModalVisible(true)
                } else if (error.response.status == 400) {
                    setApiError(Common.error400);
                    setErrorModalVisible(true)
                } else if (error.response.status == 500) {
                    setApiError(Common.error500);
                    setErrorModalVisible(true)
                } else if (error.response.data != null) {
                    setApiError(error.response.data.message);
                    setErrorModalVisible(true)
                }
            });
        apiInstance(baseURL).get('/api/v1/system-code/master/LEAD_TYPE')
            .then(async (response) => {
                if (response.status == 200) {
                    leadtyperesponse = true;
                    if (loantyperesponse && productidresponse && loanpurposeresponse && leadtyperesponse) {
                        setLoading(false);
                    }
                    setLeadTypeData(response.data)
                }
                else if (response.data.statusCode === 201) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                } else if (response.data.statusCode === 202) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                }
            })
            .catch((error) => {
                if (global.DEBUG_MODE) console.log("Error" + JSON.stringify(error.response))
                setLoading(false)
                if (error.response.status == 404) {
                    setApiError(Common.error404);
                    setErrorModalVisible(true)
                } else if (error.response.status == 400) {
                    setApiError(Common.error400);
                    setErrorModalVisible(true)
                } else if (error.response.status == 500) {
                    setApiError(Common.error500);
                    setErrorModalVisible(true)
                } else if (error.response.data != null) {
                    setApiError(error.response.data.message);
                    setErrorModalVisible(true)
                }
            });
        apiInstance(baseURL).get('/api/v1/system-code/master/LNPS')
            .then(async (response) => {
                if (response.status == 200) {
                    loanpurposeresponse = true;
                    if (loantyperesponse && productidresponse && loanpurposeresponse && leadtyperesponse) {
                        setLoading(false);
                    }
                    setLoanPurposeData(response.data)
                }
                else if (response.data.statusCode === 201) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                } else if (response.data.statusCode === 202) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                }
            })
            .catch((error) => {
                if (global.DEBUG_MODE) console.log("Error" + JSON.stringify(error.response))
                setLoading(false)
                if (error.response.status == 404) {
                    setApiError(Common.error404);
                    setErrorModalVisible(true)
                } else if (error.response.status == 400) {
                    setApiError(Common.error400);
                    setErrorModalVisible(true)
                } else if (error.response.status == 500) {
                    setApiError(Common.error500);
                    setErrorModalVisible(true)
                } else if (error.response.data != null) {
                    setApiError(error.response.data.message);
                    setErrorModalVisible(true)
                }
            });


    }

    const getData = () => {

        if (leadType == 'DRAFT') {
            //setLoading(true);
            tbl_lead_creation_loan_details.getLeadCreationLoanDetailsBasedOnLeadID(global.leadID).then(value => {
                if (value !== undefined && value.length > 0) {
                    setLoanTypeLabel(value[0].loan_type_id);
                    setProductIdLabel(value[0].loan_product_id);
                    setLoanPurposeLabel(value[0].loan_purpose_id);
                    setLoanAmount(value[0].loan_amount);
                    setLeadTypeLabel(value[0].lead_type_id);
                    callLoanAmount(value[0].loan_product_id);
                    //callPickerApi();
                    getSystemCodeDetail();
                    getProductID(value[0].loan_type_id);
                } else {
                    //callPickerApi();
                    getSystemCodeDetail();
                }
            })
        } else if (leadType == 'NEW') {
            // callPickerApi();
            getSystemCodeDetail();
        } else if (leadType == 'COMP') {
            const data = props.route.params.leadData;
            setLoanTypeLabel(data.leadCreationLoanDetails.loanType)
            setProductIdLabel(data.leadCreationLoanDetails.loanProduct);
            setLoanPurposeLabel(data.leadCreationLoanDetails.loanPurpose);
            setLoanAmount(data.leadCreationLoanDetails.loanAmount);
            setLeadTypeLabel(data.leadCreationLoanDetails.leadType);
            callLoanAmount(data.leadCreationLoanDetails.loanProduct);
            setLoanTypeDisable(true)
            setProductIdDisable(true)
            setLoanPurposeDisable(true)
            setLoanAmountDisable(true)
            setLeadTypeDisable(true)
            getProductID(data.leadCreationLoanDetails.loanType)
            //callPickerApi();
            getSystemCodeDetail();
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
                props.navigation.navigate('LeadCreationCustomerPhoto', { leadData: [] })

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
            if (loanTypeLabel.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + loanTypeCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (productIdMan && productIdVisible) {
            if (productIdLabel.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + productIdCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (loanPurposeMan && loanPurposeVisible) {
            if (loanPurposeLabel.length <= 0) {
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
            } else if (productIdLabel != '') {
                if (loanAmount < minLoanAmount) {
                    errorMessage = errorMessage + i + ')' + ' ' + loanAmountCaption + ' ' + language[0][props.language].str_cannotlessthan + ' ' + minLoanAmount + '\n';
                    i++;
                    flag = true;
                } else if (loanAmount > maxLoanAmount) {
                    errorMessage = errorMessage + i + ')' + ' ' + loanAmountCaption + ' ' + language[0][props.language].str_cannotgreaterthan + ' ' + maxLoanAmount + '\n';
                    i++;
                    flag = true;
                }
            }
        }

        if (leadTypeMan && leadTypeVisible) {
            if (leadTypeLabel.length <= 0) {
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

    const handleClick = (componentName, textValue) => {

        if (componentName === 'loanAmount') {
            if (textValue.length > 0) {
                if (Common.numberRegex.test(textValue))
                    setLoanAmount(textValue)
            } else {
                setLoanAmount(textValue)
            }
        }

    }

    const handleReference = (componentName) => {

        if (componentName === 'loanAmount') {

        }

    };

    const handlePickerClick = (componentName, label, index) => {

        if (componentName === 'loanTypePicker') {
            setLoanTypeLabel(label);
            setLoanTypeIndex(index);
            getProductID(label)
        } else if (componentName === 'productIdPicker') {
            setProductIdLabel(label);
            setProductIdIndex(index);
            if (label != '') {
                callLoanAmount(label);
            } else {
                setMinLoanAmount(0);
                setMaxLoanAmount(0);
            }
        } else if (componentName === 'loanPurposePicker') {
            setLoanPurposeLabel(label);
            setLoanPurposeIndex(index);
        } else if (componentName === 'leadTypePicker') {
            setLeadTypeLabel(label);
            setLeadTypeIndex(index);
        }

    }

    const closeErrorModal = () => {
        setErrorModalVisible(false);
    };

    const onGoBack = () => {
        props.navigation.goBack();
    }

    return (
        // enclose all components in this View tag
        <SafeAreaView style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>
            <ErrorModal isVisible={errorModalVisible} onClose={closeErrorModal} textContent={apiError} textClose={language[0][props.language].str_ok} />
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
            <View style={{
                width: '100%', height: 56, alignItems: 'center', justifyContent: 'center',

            }}>
                <HeadComp textval={leadType != 'COMP' ? language[0][props.language].str_leadcreation : language[0][props.language].str_captureddetails} props={props} onGoBack={onGoBack} />
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
                        onBackdropPress={() => { }}
                        backdropOpacity={0.5}
                        style={styles.modal}
                    >
                        <View style={styles.modalContent}>
                            <View style={{ alignItems: 'center' }}>

                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                                    <TextComp textVal={"Fetching Location......"} textStyle={{ fontSize: 14, color: Colors.black, fontWeight: 600, marginTop: 30, marginBottom: 30 }} Visible={false} />


                                </View>




                            </View>


                        </View>
                    </Modal>



                    <View style={{ width: '100%', alignItems: 'center', marginTop: '3%' }}>

                        <View style={{ width: '90%', marginTop: 3, }}>

                            <TextComp textStyle={{ color: Colors.mediumgrey, fontSize: 15, fontFamily: 'Poppins-Medium' }} textVal={language[0][props.language].str_loandetails}></TextComp>

                            <ProgressComp progressvalue={0.75} textvalue="3 of 4" />

                        </View>


                    </View>





                    {loanTypeVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>

                            <TextComp textVal={loanTypeCaption} textStyle={Commonstyles.inputtextStyle} Visible={loanTypeMan} />

                        </View>

                        <PickerComp textLabel={loanTypeLabel} pickerStyle={Commonstyles.picker} Disable={loanTypeDisable} pickerdata={loanTypeData} componentName='loanTypePicker' handlePickerClick={handlePickerClick} />


                    </View>}


                    {productIdVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>

                            <TextComp textVal={productIdCaption} textStyle={Commonstyles.inputtextStyle} Visible={productIdMan} />

                        </View>

                        <PickerComp textLabel={productIdLabel} pickerStyle={Commonstyles.picker} Disable={productIdDisable} pickerdata={productIdData} componentName='productIdPicker' handlePickerClick={handlePickerClick} />


                    </View>}


                    {loanPurposeVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>

                            <TextComp textVal={loanPurposeCaption} textStyle={Commonstyles.inputtextStyle} Visible={loanPurposeMan} />

                        </View>

                        <PickerComp textLabel={loanPurposeLabel} pickerStyle={Commonstyles.picker} Disable={loanPurposeDisable} pickerdata={loanPurposeData} componentName='loanPurposePicker' handlePickerClick={handlePickerClick} />


                    </View>}



                    {loanAmountVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={loanAmountCaption} textStyle={Commonstyles.inputtextStyle} Visible={loanAmountMan} />
                        </View>

                        <TextInputComp textValue={loanAmount} textStyle={Commonstyles.textinputtextStyle} type='numeric' Disable={loanAmountDisable} ComponentName='loanAmount' reference={loanAmountRef} returnKey="done" handleClick={handleClick} handleReference={handleReference} length={10} />

                    </View>}


                    {leadTypeVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>

                            <TextComp textVal={leadTypeCaption} textStyle={Commonstyles.inputtextStyle} Visible={leadTypeMan} />

                        </View>

                        <PickerComp textLabel={leadTypeLabel} pickerStyle={Commonstyles.picker} Disable={leadTypeDisable} pickerdata={leadTypeData} componentName='leadTypePicker' handlePickerClick={handlePickerClick} />


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
    const { mobileCodeDetails } = state.mobilecodeReducer;
    return {
        language: language,
        profiledetail: profileDetails,
        mobilecodedetail: mobileCodeDetails
    }
}

const mapDispatchToProps = (dispatch) => ({
    languageAction: (item) => dispatch(languageAction(item)),
    profileAction: (item) => dispatch(profileAction(item)),
});


export default connect(mapStateToProps, mapDispatchToProps)(LeadCreationLoan);
