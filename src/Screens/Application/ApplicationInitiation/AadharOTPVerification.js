import React, { useState, useRef, useEffect } from 'react';
import {
    Animated,
    StyleSheet,
    View,
    ScrollView,
    Dimensions,
    Text,
    Keyboard,
    Alert,
    BackHandler,
    TouchableOpacity,
    PermissionsAndroid,
    Platform
} from 'react-native';
import apiInstance from '../../../Utils/apiInstance';
import apiInstancelocal from '../../../Utils/apiInstancelocal';
import Colors from '../../../Utils/Colors';
import MyStatusBar from '../../../Components/MyStatusBar';
import Loading from '../../../Components/Loading';
import TextComp from '../../../Components/TextComp';
import { connect } from 'react-redux';
import { languageAction } from '../../../Utils/redux/actions/languageAction';
import { language } from '../../../Utils/LanguageString';
import Commonstyles from '../../../Utils/Commonstyles';
import HeadComp from '../../../Components/HeadComp';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Common from '../../../Utils/Common';
import ButtonViewComp from '../../../Components/ButtonViewComp';
import ErrorMessageModal from '../../../Components/ErrorMessageModal';
import DedupeModal from '../../../Components/DedupeModal';
import RNFS, { writeFile } from 'react-native-fs';
import Share from 'react-native-share';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import CheckBoxComp from '../../../Components/CheckBoxComp';
import Entypo from 'react-native-vector-icons/Entypo';
const { Value, Text: AnimatedText } = Animated;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Menu, Divider } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import ErrorModal from '../../../Components/ErrorModal';
import AadharSuccessModal from '../../../Components/AadharSuccessModal';
import tbl_client from '../../../Database/Table/tbl_client';
import tbl_clientaddressinfo from '../../../Database/Table/tbl_clientaddressinfo';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { updateClientDetails, updateLoanInitiationDetails } from '../../../Utils/redux/actions/loanInitiationAction';

const CELL_COUNT = 3;
const CELL_SIZE = 46;
const CELL_BORDER_RADIUS = 8;
const DEFAULT_CELL_BG_COLOR = '#F4F5F7';
const NOT_EMPTY_CELL_BG_COLOR = Colors.darkblue;
const ACTIVE_CELL_BG_COLOR = '#f7fafe';
const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({ hasValue, index, isFocused }) => {
    Animated.parallel([
        Animated.timing(animationsColor[index], {
            useNativeDriver: false,
            toValue: isFocused ? 1 : 0,
            duration: 250,
        }),
        Animated.spring(animationsScale[index], {
            useNativeDriver: false,
            toValue: hasValue ? 0 : 1,
            duration: hasValue ? 300 : 250,
        }),
    ]).start();
};


const AadharOTPVerification = (props, { navigation }) => {
    const [mobileOTP, setMobileOTP] = useState('');
    const [aadharNumber, setaadharNumber] = useState('');
    const [loading, setLoading] = useState(false);
    const [isManualKYC, setIsManualKYC] = useState(false);
    const [Visible, setVisible] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [value, setValue] = useState('');
    const [timeLeft, setTimeLeft] = useState(60);
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });

    const institutionIDRef = useRef(null);
    const challengeCodeRef = useRef(null);
    let Url = Common.CS_URL; // Initialize with your initial URL
    let goForRetry = true;

    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');
    const [navAlertVisible, setNavAlertVisible] = useState(false);

    const [pdfDmsID, setpdfDmsID] = useState('');
    const [pdfBase64, setpdfBase64] = useState('');
    const [aadharPdfPath, setaadharPdfPath] = useState('');

    const [menuvisible, setMenuVisible] = React.useState(false);
    const [instance, setInstance] = React.useState('LIV');
    const openMenu = () => setMenuVisible(true);

    const closeMenu = () => setMenuVisible(false);

    const isScreenVisible = useIsFocused();


    const renderCell = ({ index, symbol, isFocused }) => {
        const hasValue = Boolean(symbol);
        const animatedCellStyle = {
            backgroundColor: hasValue
                ? animationsScale[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
                })
                : animationsColor[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
                }),
            borderRadius: animationsScale[index].interpolate({
                inputRange: [0, 1],
                outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
            }),
            transform: [
                {
                    scale: animationsScale[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.2, 1],
                    }),
                },
            ],
        };

        // Run animation on next event loop tik
        // Because we need first return new style prop and then animate this value
        setTimeout(() => {
            animateCell({ hasValue, index, isFocused });
        }, 0);

        return (
            <AnimatedText
                key={index}
                style={[styles.cell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
            </AnimatedText>
        );
    };

    const renderCellCode = ({ index, symbol, isFocused }) => {
        let textChild = null;

        if (symbol) {
            textChild = true ? '•' : symbol;
        } else if (isFocused) {
            textChild = <Cursor />;
        }

        return (
            <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {textChild}
            </Text>
        );
    };


    useEffect(() => {
        props.navigation
            .getParent()
            ?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const timer = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            } else {
                clearInterval(timer);
                // Timer has ended; you can add code for what happens when the timer finishes here
            }
        }, 1000); // Update every second (1000 milliseconds)

        return () => {
            clearInterval(timer); // Clean up the timer when the component unmounts
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
        };
    }, [props.navigation, timeLeft, isScreenVisible]);

    useFocusEffect(
        React.useCallback(() => {

            setaadharNumber(props.route.params.aadharNumber);

            return () => {

            };
        }, []),
    );


    const generateAadharOTP = () => {

        const appDetails =
        {
            "clientId": global.CLIENTID,
            "aadharNumber": aadharNumber,
            "createdBy": global.USERID
        }
        const baseURL = '8901';
        setLoading(true);
        apiInstancelocal(baseURL)
            .post('/api/v2/aadharOtp/generate/otp', appDetails)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log('AadharOTPApiResponse::' + JSON.stringify(response.data),);

                if (response.status == 200) {
                    setTimeLeft(60)
                    setMobileOTP('')
                } else if (response.data.statusCode === 202) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                }

                setLoading(false);



            })
            .catch(error => {
                // Handle the error
                if (global.DEBUG_MODE) console.log('AadharOTPApiResponse::::' + JSON.stringify(error.response));
                setLoading(false);
                if (error.response.data != null) {
                    setApiError('Service Unavailable');
                    setErrorModalVisible(true)
                }
            });

    };

    const validateOTP = () => {

        const appDetails = {
            "aadharNumber": aadharNumber,
            "otp": mobileOTP,
            "clientId": global.CLIENTID,
            "createdBy": global.USERID
        }
        const baseURL = '8901';
        setLoading(true);
        apiInstancelocal(baseURL)
            .post('/api/v2/aadharOtp/verify/otp', appDetails)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log('AadharOTPVerifyApiResponseVerify::' + JSON.stringify(response.data));
                if (global.DEBUG_MODE) console.log('AadharOTPVerifyApiResponseStatus::' + JSON.stringify(response.data.statusCode));
                setLoading(false);
                if (response.status == 200) {
                    //alert(JSON.stringify(response.data.aadharResultDetails))
                    //setAadhaarResponse(response.data.aadharResultDetails)
                    global.isAadharVerified = "1";
                    //setpdfDmsID(response.data.aadharResultDetails.docDmsId)
                    getImage(response.data.aadharDocDmsId);
                    insertData(response.data);

                } if (response.data.statusCode == 202) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true)
                } else if (response.data.statusCode === 201) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                }

            })
            .catch(error => {
                // Handle the error
                if (global.DEBUG_MODE) console.log('AadharOTPVerifyApiResponseError::::' + JSON.stringify(error.response));
                setLoading(false);
                if (error.response.data != null) {
                    setApiError(error.response.data.message);
                    setErrorModalVisible(true)
                }
            });

    };


    const getImage = (dmsID) => {

        Common.getNetworkConnection().then(value => {
            if (value.isConnected == true) {
                setLoading(true)
                const baseURL = '8094'
                apiInstance(baseURL).get(`/api/documents/document/${parseInt(dmsID)}`)
                    .then(async (response) => {
                        // Handle the response data
                        //  console.log("GetPhotoApiResponse::" + JSON.stringify(response.data));

                        setpdfBase64('data:application/pdf;base64,' + response.data.base64Content)
                        var base64pdf = response.data.base64Content;
                        var fileName = response.data.fileName;
                        saveBase64Pdf(base64pdf, fileName)

                        // props.navigation.navigate('LeadManagement', { fromScreen: 'LeadCompletion' })
                        setLoading(false)

                    })
                    .catch((error) => {
                        // Handle the error
                        setLoading(false)
                        if (global.DEBUG_MODE) console.log("GetPhotoApiResponse::" + JSON.stringify(error));
                        if (error.response.data != null) {
                            setApiError(error.response.data.message);
                            setErrorModalVisible(true)
                        } else if (error.response.httpStatusCode == 500) {
                            setApiError(error.response.message);
                            setErrorModalVisible(true)
                        }
                    });
            } else {
                setApiError(language[0][props.language].str_errinternetimage);
                setErrorModalVisible(true)

            }

        })
    }

    const saveBase64Pdf = async (base64Data, filename) => {
        const path = RNFS.ExternalDirectoryPath + `/${filename}`;

        try {
            await RNFS.writeFile(path, base64Data, 'base64');
            setaadharPdfPath(path);
            console.log('PDF saved successfully at:', path);
            return path;
        } catch (error) {
            console.error('Error saving PDF:', error);
            return null;
        }
    };

    const openWithThirdPartyApp = async (pdfPath) => {
        if (pdfPath) {
            try {
                const fileExists = await RNFS.exists(pdfPath);
                if (fileExists) {
                    const options = {
                        url: `file://${pdfPath}`,
                    };
                    await Share.open(options);
                } else {
                    console.error('PDF file does not exist.');
                }
            } catch (error) {
                console.error('Error opening with third-party app:', error);
            }
        }
    };

    const updateLoanStatus = (value) => {

        var module = ''; var page = '';

        if (global.CLIENTTYPE == 'APPL') {
            module = 'PRF_SHRT_APLCT';
            page = 'PRF_SHRT_APLCT_BSC_DTLS';
        } else if (global.CLIENTTYPE == 'CO-APPL') {
            module = 'PRF_SHRT_COAPLCT';
            page = 'PRF_SHRT_COAPLCT_BSC_DTLS';
        } else if (global.CLIENTTYPE == 'GRNTR') {
            module = 'PRF_SHRT_GRNTR';
            page = 'PRF_SHRT_GRNTR_BSC_DTLS';
        }

        const appDetails = {
            "loanApplicationId": global.LOANAPPLICATIONID,
            "loanWorkflowStage": "LN_APP_INITIATION",
            "subStageCode": "PRF_SHRT",
            "moduleCode": module,
            "pageCode": page,
            "status": "Completed"
        }
        const baseURL = '8901';
        setLoading(true);
        apiInstancelocal(baseURL)
            .post(`/api/v2/loan-application-status/updateStatus`, appDetails)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log('UpdateStatusApiResponse::' + JSON.stringify(response.data),);
                setLoading(false);
                if (global.CLIENTTYPE == 'APPL') {
                    global.COMPLETEDMODULE = 'PRF_SHRT_APLCT';
                    global.COMPLETEDPAGE = 'PRF_SHRT_APLCT_BSC_DTLS';
                } else if (global.CLIENTTYPE == 'CO-APPL') {
                    global.COMPLETEDMODULE = 'PRF_SHRT_COAPLCT';
                    global.COMPLETEDPAGE = 'PRF_SHRT_COAPLCT_BSC_DTLS';
                } else if (global.CLIENTTYPE == 'GRNTR') {
                    global.COMPLETEDMODULE = 'PRF_SHRT_GRNTR';
                    global.COMPLETEDPAGE = 'PRF_SHRT_GRNTR_BSC_DTLS';
                }
                if (value == "0") {
                    setIsManualKYC(false);
                    setMobileOTP('');
                    props.navigation.replace('ProfileShortKYCVerificationStatus', { 'isAadharVerified': '0' });
                } else {
                    setNavAlertVisible(true)
                }

            })
            .catch(error => {
                // Handle the error
                if (global.DEBUG_MODE) console.log('UpdateStatusApiResponse' + JSON.stringify(error.response));
                setLoading(false);
                if (error.response.data != null) {
                    setApiError(error.response.data.message);
                    setErrorModalVisible(true)
                }
            });

    };

    const insertData = async (aadhaarResponse) => {
        // let landmark = ""
        // if (aadhaarResponse.landmark === null) {
        //     landmark = ""
        // } else {
        //     landmark = aadhaarResponse.landmark
        // }
        // const data = aadhaarResponse;

        // var name = data.name;
        // var dob = Common.convertDateFormat(data.dob);
        // var gender = data.gender;
        // var fatherName = '';
        // if ('fatherName' in data && data.fatherName !== null) {
        //     fatherName = data.fatherName;
        // } else if ('relativeName' in data && data.relativeName !== null) {
        //     fatherName = data.relativeName;
        // }
        // //var fatherName = data.fatherName ? data.fatherName : data.relativeName ? data.relativeName : '';
        // var spouseName = data.spouseName;
        // var image = data.imgDmsId;
        // var dmsId = data.docDmsId;
        // var age = Common.calculateAge(dob);

        await tbl_client.updateAadharData(aadhaarResponse.firstName, Common.convertDateFormat(aadhaarResponse.dateOfBirth), aadhaarResponse.age, aadhaarResponse.gender, aadhaarResponse.fatherName, aadhaarResponse.spouseName, '', '', global.LOANAPPLICATIONID, global.CLIENTTYPE);

        // if (global.DEBUG_MODE) console.log('Gender::' + JSON.stringify(gender));
        // if (global.DEBUG_MODE) console.log('FatherName::' + JSON.stringify(fatherName));

        props.updateClientDetails(global.LOANAPPLICATIONID, aadhaarResponse.id, 'clientDetail', aadhaarResponse)

        // if (aadhaarResponse.clientAddress.length > 0) {
        //     await tbl_clientaddressinfo.insertClientAddress(
        //         global.LOANAPPLICATIONID,
        //         aadhaarResponse.clientAddress[0].id,
        //         global.CLIENTID,
        //         global.CLIENTTYPE,
        //         aadhaarResponse.clientAddress[0].addressType,
        //         aadhaarResponse.clientAddress[0].addressLine1,
        //         aadhaarResponse.clientAddress[0].addressLine2,
        //         aadhaarResponse.clientAddress[0].landmark,
        //         aadhaarResponse.clientAddress[0].pincode,
        //         aadhaarResponse.clientAddress[0].city,
        //         aadhaarResponse.clientAddress[0].district,
        //         aadhaarResponse.clientAddress[0].state,
        //         aadhaarResponse.clientAddress[0].country,
        //         "",
        //         "",
        //         "",
        //         "",
        //         "",
        //         "",
        //         "",
        //         "",
        //         "true",
        //         global.USERID,
        //         new Date(),
        //         global.USERID,
        //         new Date(),
        //         global.USERID,
        //         new Date(),
        //         "1"
        //     )
        //         .then(result => {
        //             if (global.DEBUG_MODE) console.log('Inserted Address detail:', result);
        //         })
        //         .catch(error => {
        //             if (global.DEBUG_MODE) console.error('Error Inserting Address detail:', error);
        //         });
        // }

        global.isAadharVerified = "1";
        updateLoanStatus("1");

    }
    const proceedClick = (value) => {
        if (value === 'proceed') {
            setNavAlertVisible(false)
            setIsManualKYC(false);
            setMobileOTP('');
            props.navigation.replace('ProfileShortKYCVerificationStatus');
        }
    }

    const handleClick = () => {

    }

    const manualKYC = () => {
        if (isManualKYC) {
            global.isAadharVerified = "0";
            updateApplicantDetails();

        } else {
            if (mobileOTP.length < 6) {
                setApiError('Please Enter OTP');
                setErrorModalVisible(true)
                return;
            }
            validateOTP();
        }
    }

    const updateApplicantDetails = () => {

        const appDetails = {
            "isActive": true,
            "createdBy": global.USERID,
            "id": global.CLIENTID,
            "isKycManual": true
        }
        const baseURL = global.PORT1;
        setLoading(true);
        apiInstance(baseURL)
            .put(`/api/v2/profile-short/personal-details/${global.CLIENTID}`, appDetails)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log('PersonalDetailApiResponse::' + JSON.stringify(response.data));
                //  await tbl_client.updatePersonalDetails(TitleLabel, firstName, middleName, lastName, DOB, Age, GenderLabel, FatherName, SpouseName, CasteLabel, ReligionLabel, MotherTongueLabel, EADLabel, gpslatlon, id, global.LOANAPPLICATIONID);

                setLoading(false);
                if (response.status == 200) {
                    props.updateLoanInitiationDetails(parseInt(global.LOANAPPLICATIONID), [], 'clientDetail', response.data.id, response.data)
                    updateLoanStatus("0");
                }
                else if (response.data.statusCode === 201) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                } else if (response.data.statusCode === 202) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                }
            })
            .catch(error => {
                // Handle the error
                setLoading(false);
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

    };

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
                    manualKYC();
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


    const getCheckbox = (componentName, value) => {
        setIsManualKYC(value)
    };

    const closeErrorModal = () => {
        setErrorModalVisible(false);
    };

    const onGoBack = () => {
        props.navigation.goBack();
    }

    const onViewClick = () => {

        openWithThirdPartyApp(aadharPdfPath)
    }

    return (

        <View style={{ flex: 1, backgroundColor: Colors.lightwhite }}>
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

            <AadharSuccessModal isVisible={navAlertVisible} onClose={handleClick} textContent={language[0][props.language].str_aadharsuccess} textClose={language[0][props.language].str_proceed} textMainContent={language[0][props.language].str_aadhaarpdfopen} textViewContent={language[0][props.language].str_view} proceedClick={proceedClick} onViewClick={onViewClick} />


            <ErrorModal isVisible={errorModalVisible} onClose={closeErrorModal} textContent={apiError} textClose={language[0][props.language].str_ok} />
            <View style={{ width: '100%', height: 56, alignItems: 'center', justifyContent: 'center', }}>

                <HeadComp textval={language[0][props.language].str_aadharotpverification} props={props} onGoBack={onGoBack} />

            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
                {loading ? <Loading /> : null}
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>


                    <TextComp textVal={language[0][props.language].str_aadharverifynewcust} textStyle={{ width: '70%', color: Colors.lightgrey, fontSize: 14, marginTop: 34 }} />

                    <TextComp textVal={language[0][props.language].str_aadharverifydesc} textStyle={{ width: '70%', color: Colors.lightgrey, fontSize: 14, marginTop: 14 }} />


                    <CodeField
                        ref={challengeCodeRef}
                        {...props}
                        value={mobileOTP}
                        autoFocus={false}
                        onChangeText={(txt) => {
                            if (txt.length > 0) {
                                if (Common.integerPattern.test(txt))
                                    setMobileOTP(txt)
                            } else {
                                setMobileOTP(txt)
                            }

                        }}
                        cellCount={6}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        onSubmitEditing={Keyboard.dismiss}
                        renderCell={renderCellCode}
                    />
                    {timeLeft != 0 &&
                        <Text style={{ color: Colors.darkblue, marginTop: 20, fontFamily: 'Poppins-Medium', }}>{`${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? '0' : ''}${timeLeft % 60}`}</Text>
                    }
                    {timeLeft == 0 &&
                        <TouchableOpacity onPress={() => { generateAadharOTP() }} style={{ width: '70%' }}>
                            <Text style={{ color: Colors.darkblue, marginTop: 20, alignSelf: 'flex-end', fontFamily: 'Poppins-Medium', }}>Resend?</Text>
                        </TouchableOpacity>
                    }


                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 19, }}>
                        <CheckBoxComp
                            Disable={false}
                            Visible={false}
                            textCaption={'Select Manual KYC'}
                            handleClick={getCheckbox}
                        />
                    </View>


                </View>

                <ButtonViewComp textValue={language[0][props.language].str_submit.toUpperCase()} textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }} viewStyle={[Commonstyles.buttonView, { marginTop: 60, marginBottom: 20 }]} innerStyle={Commonstyles.buttonViewInnerStyle} handleClick={manualKYC} />


            </ScrollView>




        </View>
    );
};


const mapStateToProps = (state) => {
    const { language } = state.languageReducer;
    const { loanInitiationDetails } = state.loanInitiationReducer;
    return {
        language: language,
        loanInitiationDetails: loanInitiationDetails,
    }
}

const mapDispatchToProps = (dispatch) => ({
    languageAction: (item) => dispatch(languageAction(item)),
    updateClientDetails: (loanApplicationId, clientId, key, data) => dispatch(updateClientDetails(loanApplicationId, clientId, key, data)),
    updateLoanInitiationDetails: (loanApplicationId, loanData, key, clientId, updatedDetails) => dispatch(updateLoanInitiationDetails(loanApplicationId, loanData, key, clientId, updatedDetails)),
});


export default connect(mapStateToProps, mapDispatchToProps)(AadharOTPVerification);

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    bottomView: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 8,
    },

    welcome: {
        margin: 16,
        fontSize: 20,
        textAlign: 'center',
    },

    bottomView: {
        width: '100%', alignItems: 'center', justifyContent: 'flex-end',
        marginTop: 5, position: 'absolute', bottom: 0, marginBottom: 25
    }, codeFieldRoot: {
        height: CELL_SIZE,
        marginTop: 24,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    cell: {
        marginHorizontal: 6,
        height: CELL_SIZE,
        width: CELL_SIZE,
        lineHeight: CELL_SIZE - 5,
        ...Platform.select({ web: { lineHeight: 65 } }),
        fontSize: 17,
        textAlign: 'center',
        borderRadius: CELL_BORDER_RADIUS,
        color: Colors.black,
        backgroundColor: '#F4F5F7',

        // IOS
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,

        // Android
        elevation: 3,
    },

    // =======================

    root: {
        minHeight: 0,
        padding: 20,
    },
    title: {
        paddingTop: 40,
        color: '#000',
        fontSize: 25,
        fontWeight: '700',
        textAlign: 'center',
        paddingBottom: 40,
    },
    icon: {
        width: 217 / 2.4,
        height: 158 / 2.4,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    subTitle: {
        paddingTop: 30,
        color: '#000',
        textAlign: 'center',
    },
    nextButton: {
        marginTop: 30,
        borderRadius: 55,
        height: 55,
        backgroundColor: '#3557b7',
        justifyContent: 'center',
        minWidth: 10,
        marginBottom: 0,
    },
    nextButton1: {
        marginTop: 30,
        borderRadius: 55,
        height: 55,
        backgroundColor: '#808B96',
        justifyContent: 'center',
        minWidth: 10,
        marginBottom: 0,
    },
    nextButtonText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#fff',
        fontWeight: '700',
    }, modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButton: {
        marginTop: 10,
        padding: 10,
    },
});
