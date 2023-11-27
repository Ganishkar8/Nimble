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

const aadharJSON = [{ "id": 10, "clientId": 0, "aadharNumber": "717485993554", "requestId": "222933c2-f353-4447-ba88-a72630adb9dc", "isConsent": "Y", "statusCode": 101, "statusMessage": null, "otp": "205365", "otpSentMsg": "OTP sent to registered mobile number", "otpVerifiedTime": "2023-11-23T09:05:35.32327601", "caseId": "1000", "shareCode": "3554", "createdBy": "329", "createdDate": "2023-11-23T09:04:32.314335", "aadharResultDetails": { "id": 4, "aadharDetailId": null, "resultGeneratedTime": "2023-11-23 09:05:08.726", "maskedAadhaarNumber": "XXXX XXXX 3554", "name": "Ajith A", "dob": "1998-04-20", "gender": "M", "address": "NEW NO -49/84 OLD NO -49/32B, VELLAMODI VILAI, Agastheeswaram, Kanyakumari, Agasteeswaram, Eathamozhi, Tamil Nadu, India, 629501", "mobileHash": "f7b3836fc99631bc09b630961302ff60af4a54a43dd1a44e24758a5d363c0b25", "emailHash": "31960ecc93b7257bce32f0d2dddaa948da91eb16d521cff44370e70306d759af", "fatherName": null, "resultMessage": "Aadhaar XML file downloaded successfully", "imgDmsId": 3715, "docDmsId": 3716, "createdBy": "329", "createdDate": "2023-11-23T09:05:35.343698967" } }]

const newAadharJson = [{
    "aadharResultDetails": {
        "id": 5,
        "aadharDetailId": null,
        "resultGeneratedTime": "2023-11-24 13:23:45.231",
        "maskedAadhaarNumber": "XXXX XXXX 9303",
        "name": "GANISHKAR S",
        "dob": "1998-07-31",
        "gender": "M",
        "address": "NO 204, PUDUKOTTAI, Tirupathur, Vellore, Madapalli, TIRUPATTUR, Pudukottai, Tamil Nadu, India, 635602",
        "mobileHash": "550019f61b6cad6a754a2604b2ef3466814d5a5efa0c6c9bc6e91edd0eb71619",
        "emailHash": "2db9681832074c1657b2c0f1bd3c3c5a4a847a6c8e480790adcb8180a0516e80",
        "fatherName": "Sivakumar",
        "resultMessage": "Aadhaar XML file downloaded successfully",
        "imgDmsId": 3745,
        "docDmsId": 3746,
        "createdBy": "",
        "createdDate": "2023-11-24T13:23:57.963951047",
        "spouseName": null,
        "relativeName": null,
        "houseNumber": "NO 204",
        "street": "PUDUKOTTAI",
        "landmark": null,
        "subDistrict": "Tirupathur",
        "district": "Vellore",
        "vtcName": "Madapalli",
        "location": "TIRUPATTUR",
        "postOffice": "Pudukottai",
        "state": "Tamil Nadu",
        "country": "India",
        "pinCode": "635602"
    }
}]

const AadharOTPVerification = (props, { navigation }) => {
    const [mobileOTP, setMobileOTP] = useState('');
    const [aadharNumber, setaadharNumber] = useState(props.route.params.aadharNumber);
    const [loading, setLoading] = useState(false);
    const [isManualKYC, setIsManualKYC] = useState(false);
    const [Visible, setVisible] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [value, setValue] = useState('');
    const [timeLeft, setTimeLeft] = useState(10);
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
        };
    }, [timeLeft, isScreenVisible]);



    const generateAadharOTP = () => {

        const appDetails =
        {
            "clientId": 0,
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
                }

                setLoading(false);



            })
            .catch(error => {
                // Handle the error
                if (global.DEBUG_MODE) console.log('AadharOTPApiResponse::::' + JSON.stringify(error.response));
                setLoading(false);
                if (error.response.data != null) {
                    setApiError(error.response.data.message);
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
                if (response.data.statusCode === 101) {
                    //alert(JSON.stringify(response.data.aadharResultDetails))
                    //setAadhaarResponse(response.data.aadharResultDetails)
                    global.isAadharVerified = "1";
                    insertData(response.data.aadharResultDetails);
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

                } else {
                    alert(response.data.statusCode)
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

    const updateLoanStatus = () => {

        const appDetails = {
            "loanApplicationId": global.LOANAPPLICATIONID,
            "loanWorkflowStage": "LN_APP_INITIATION",
            "subStageCode": "PRF_SHRT",
            "moduleCode": global.COMPLETEDMODULE,
            "pageCode": global.COMPLETEDPAGE,
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
                setNavAlertVisible(true)
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
        let landmark = ""
        if (aadhaarResponse.landmark === null) {
            landmark = ""
        } else {
            landmark = aadhaarResponse.landmark
        }
        const data = aadhaarResponse;

        var name = data.name;
        var dob = Common.convertDateFormat(data.dob);
        var gender = data.gender;
        var fatherName = '';
        var spouseName = '';
        var image = data.imgDmsId;
        var dmsId = data.docDmsId;
        var age = Common.calculateAge(dob);

        await tbl_client.updateAadharData(name, dob, age, gender, fatherName, spouseName, image, dmsId, global.LOANAPPLICATIONID);


        await tbl_clientaddressinfo.insertClientAddress(
            global.LOANAPPLICATIONID,
            "",
            global.CLIENTID,
            global.COMPLETEDMODULE,
            "P",
            aadhaarResponse.houseNumber + " " + aadhaarResponse.street,
            aadhaarResponse.vtcName + " " + aadhaarResponse.location,
            landmark,
            aadhaarResponse.pinCode,
            "",
            aadhaarResponse.district,
            aadhaarResponse.state,
            aadhaarResponse.country,
            "",
            "",
            "",
            "",
            aadhaarResponse.name,
            "",
            "",
            "",
            "true",
            global.USERID,
            new Date(),
            global.USERID,
            new Date(),
            global.USERID,
            new Date(),
            "1"
        )
            .then(result => {
                if (global.DEBUG_MODE) console.log('Inserted Address detail:', result);
            })
            .catch(error => {
                if (global.DEBUG_MODE) console.error('Error Inserting Address detail:', error);
            });
        global.isAadharVerified = "1";
        updateLoanStatus();

    }
    const proceedClick = (value) => {
        if (value === 'proceed') {
            setNavAlertVisible(false)
            setMobileOTP('')
            props.navigation.navigate('ProfileShortKYCVerificationStatus');
        }
    }

    const handleClick = () => {

    }

    const manualKYC = () => {
        if (isManualKYC) {
            global.isAadharVerified = "0";
            props.navigation.navigate('ProfileShortKYCVerificationStatus', { 'isAadharVerified': '0' });
        } else {
            if (mobileOTP.length < 6) {
                setApiError('Please Enter OTP');
                setErrorModalVisible(true)
                return;
            }
            validateOTP();
        }
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

    return (

        <View style={{ flex: 1, backgroundColor: Colors.lightwhite }}>
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

            <AadharSuccessModal isVisible={navAlertVisible} onClose={handleClick} textContent={language[0][props.language].str_aadharsuccess} textClose={language[0][props.language].str_proceed} textMainContent={language[0][props.language].str_aadhaarpdfopen} textViewContent={language[0][props.language].str_view} proceedClick={proceedClick} />


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
    return {
        language: language
    }
}

const mapDispatchToProps = (dispatch) => ({
    languageAction: (item) => dispatch(languageAction(item)),
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
