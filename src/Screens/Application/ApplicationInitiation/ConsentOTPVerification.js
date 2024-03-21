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
    TouchableOpacity
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
import Entypo from 'react-native-vector-icons/Entypo';
const { Value, Text: AnimatedText } = Animated;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Menu, Divider } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import ErrorModal from '../../../Components/ErrorModal';
import CenteredModal from '../../../Components/CenteredModal';
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

const ConsentOTPVerification = (props, { navigation }) => {
    const [mobileOTP, setMobileOTP] = useState('');
    const [mobileNumber, setMobileNumber] = useState(props.route.params.mobileNumber);
    const [loading, setLoading] = useState(false);
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
    const [processModuleLength, setProcessModuleLength] = useState(global.FILTEREDPROCESSMODULE.length);

    const [menuvisible, setMenuVisible] = React.useState(false);
    const [instance, setInstance] = React.useState('LIV');
    const openMenu = () => setMenuVisible(true);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');

    const [consentModalVisible, setConsentModalVisible] = useState(false);
    const [description, setDescription] = useState('');

    const closeMenu = () => setMenuVisible(false);

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
    }, [props.navigation, timeLeft]);



    const generateOTP = () => {

        const appDetails = {
            "loanApplicationId": global.LOANAPPLICATIONID,
            "clientId": global.CLIENTID,
            "generatedFor": `91${mobileNumber}`,
            "userId": global.USERID,
            "process": "Profile Short motp",
            "userType": global.USERTYPEID,
            "otpType": "23"
        }
        const baseURL = '8908';
        setLoading(true);
        apiInstancelocal(baseURL)
            .post('/api/v1/otp/send-otp', appDetails)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log('MobileOTPApiResponse::' + JSON.stringify(response.data),);

                if (response.status == 200) {
                    setTimeLeft(60)
                }

                setMobileOTP('')
                setLoading(false);



            })
            .catch(error => {
                // Handle the error
                if (global.DEBUG_MODE) console.log('MobileOTPApiResponse::::' + JSON.stringify(error.response));
                setLoading(false);
                if (error.response.data != null) {
                    setApiError(error.response.data.message);
                    setErrorModalVisible(true)
                }
            });

    };

    const validateOTP = () => {

        if (mobileOTP.length < 6) {
            setApiError('Please Enter OTP');
            setErrorModalVisible(true)

            return;
        }

        const appDetails = {
            "generatedFor": `91${mobileNumber}`,
            "process": "Profile Short motp",
            "otp": mobileOTP,
        }
        const baseURL = '8908';
        setLoading(true);
        apiInstancelocal(baseURL)
            .post('/api/v1/otp/verify-otp', appDetails)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log('MobileOTPVerifyApiResponse::' + JSON.stringify(response.data),);

                if (response.data.statusCode === 202) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true)
                    setMobileOTP('');
                } else if (response.status === 200) {
                    updateLoanStatus();
                }
                setLoading(false);



            })
            .catch(error => {
                // Handle the error
                if (global.DEBUG_MODE) console.log('MobileOTPVerifyApiResponseError::::' + JSON.stringify(error.response));
                setLoading(false);
                if (error.response.data != null) {
                    setApiError(error.response.data.message);
                    setErrorModalVisible(true)
                }
            });

    };

    const handleModalClick = () => {
        setConsentModalVisible(false);
        props.navigation.replace('LoanApplicationMain', { fromScreen: 'BankList' });
    }

    const updateLoanStatus = () => {

        var module = ''; var page = '';

        module = 'BRE';
        page = 'BRE_VIEW';


        const appDetails = {
            "loanApplicationId": global.LOANAPPLICATIONID,
            "loanWorkflowStage": "LN_APP_INITIATION",
            "subStageCode": "BRE",
            "moduleCode": module,
            "pageCode": page,
            "status": "Completed"
        }
        const baseURL = '8901';
        setLoading(true);
        apiInstance(baseURL)
            .post(`/api/v2/loan-application-status/updateStatus`, appDetails)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log('UpdateStatusApiResponse::' + JSON.stringify(response.data),);

                global.COMPLETEDSUBSTAGE = 'BRE';
                global.COMPLETEDMODULE = 'BRE';
                global.COMPLETEDPAGE = 'BRE_VIEW';
                if (global.ISDEVIATIONPRESENT) {
                    //updateLoanStatusDeviation('InProgress');
                    setLoading(false);
                    if (response.data.description) {
                        setDescription(response.data.description)
                        setConsentModalVisible(true);
                    } else {
                        props.navigation.replace('LoanApplicationMain', { fromScreen: 'BREView' });
                    }

                } else {
                    updateLoanStatusDeviation('Completed');
                    //setLoading(false);
                    //props.navigation.replace('LoanApplicationMain', { fromScreen: 'BREView' })
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

    const updateLoanStatusDeviation = (status) => {

        const appDetails = {
            "loanApplicationId": global.LOANAPPLICATIONID,
            "loanWorkflowStage": "LN_APP_DEVIATION",
            "status": status
        }
        const baseURL = '8901';
        setLoading(true);
        apiInstance(baseURL)
            .post(`/api/v2/loan-application-status/updateStatus`, appDetails)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log('UpdateStatusApiResponse::' + JSON.stringify(response.data),);
                setLoading(false);
                if (response.data.description) {
                    setDescription(response.data.description)
                    setConsentModalVisible(true);
                } else {
                    props.navigation.replace('LoanApplicationMain', { fromScreen: 'BREView' });
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

    const sendDataBack = () => {
        props.navigation.replace('LoanApplicationMain', {
            fromScreen: 'ConsentOTP',
        });
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
            <CenteredModal isVisible={consentModalVisible} onClose={handleModalClick} textContent={description} textClose={language[0][props.language].str_ok} />

            <ErrorModal isVisible={errorModalVisible} onClose={closeErrorModal} textContent={apiError} textClose={language[0][props.language].str_ok} />
            <View style={{ width: '100%', height: 56, alignItems: 'center', justifyContent: 'center', }}>

                <HeadComp textval={language[0][props.language].str_consentotpverify} props={props} onGoBack={onGoBack} />

            </View>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
                {loading ? <Loading /> : null}
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>


                    <TextComp textVal={`${language[0][props.language].str_mobileverifydesc}91${mobileNumber}`} textStyle={{ width: '70%', color: Colors.lightgrey, fontSize: 14, marginTop: 34 }} />


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
                        <TouchableOpacity onPress={() => { generateOTP() }} style={{ width: '70%' }}>
                            <Text style={{ color: Colors.darkblue, marginTop: 20, alignSelf: 'flex-end', fontFamily: 'Poppins-Medium', }}>Resend?</Text>
                        </TouchableOpacity>
                    }



                </View>

                <ButtonViewComp textValue={language[0][props.language].str_submit.toUpperCase()} textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }} viewStyle={[Commonstyles.buttonView, { marginTop: 60, marginBottom: 20 }]} innerStyle={Commonstyles.buttonViewInnerStyle} handleClick={validateOTP} />


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


export default connect(mapStateToProps, mapDispatchToProps)(ConsentOTPVerification);

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
