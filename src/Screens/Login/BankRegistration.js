import React, { useState, useEffect, useRef } from 'react';
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
    Modal,
    TouchableOpacity,
    PermissionsAndroid
} from 'react-native';
import apiInstance from '../../Utils/apiInstance';
import jwtDecode from 'jwt-decode';
import Colors from '../../Utils/Colors';
import MyStatusBar from '../../Components/MyStatusBar';
import Loading from '../../Components/Loading';
import TextComp from '../../Components/TextComp';
import { connect } from 'react-redux';
import { languageAction } from '../../Utils/redux/actions/languageAction';
import { addBank } from '../../Utils/redux/actions/bankAction';
import { language } from '../../Utils/LanguageString';
import Commonstyles from '../../Utils/Commonstyles';
import ImageComp from '../../Components/ImageComp';
import ButtonViewComp from '../../Components/ButtonViewComp';
import { getDeviceID, getDeviceName, } from '../../Utils/Common';
import Common from '../../Utils/Common';
import Bank_Detail_Table from '../../Database/Table/Bank_Detail_Table';
import axios from 'axios';
import parser from 'react-native-xml2js';
import { useIsFocused } from '@react-navigation/native';
import CenteredModal from '../../Components/CenteredModal';
import ErrorMessageModal from '../../Components/ErrorMessageModal';
import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import ErrorModal from '../../Components/ErrorModal';
import Entypo from 'react-native-vector-icons/Entypo';
const { Value, Text: AnimatedText } = Animated;
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Menu, Divider } from 'react-native-paper';
import { generateRequest, validateOTP } from '../../Utils/EKYC';
import RNFS, { writeFile } from 'react-native-fs';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

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

const BankRegistration = (props, { navigation }) => {

    const [institutionID, setInstitutionID] = useState('');
    const [challengeCode, setChallengeCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [Visible, setVisible] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [responseErrMsg, setResponseErrMsg] = useState('');
    const { confirmCode, timer } = props;
    const [value, setValue] = useState('');
    const [status, setStatus] = useState('');
    const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
    const showBottomSheet = () => setBottomErrorSheetVisible(true);
    const hideBottomSheet = () => setBottomErrorSheetVisible(false);
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const institutionIDRef = useRef(null);
    const challengeCodeRef = useRef(null);
    let Url = Common.CS_URL; // Initialize with your initial URL
    let goForRetry = true;

    const [menuvisible, setMenuVisible] = React.useState(false);
    const [instance, setInstance] = React.useState('LIV');
    const openMenu = () => setMenuVisible(true);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');

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

    const isFocused = useIsFocused();

    useEffect(() => {
        let isMounted = true;

        //myDisplayy();
        if (isFocused) {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        }

        if (global.DEBUG_MODE) {
            requestWritePermission
            writeToFile('vanka,111111111!')
        }



        const fetchData = async () => {
            try {
                const value = await getDeviceName();
                const value1 = await getDeviceID();
                global.DEVICENO = value;
                global.DEVICEMODELNAME = value1;

            } catch (error) {
                // Handle errors appropriately
            }
        };

        fetchData();
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton);
        };
    }, [isFocused]);

    const requestWritePermission = async () => {
        const result = await check(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

        if (result === RESULTS.GRANTED) {
            // Permission already granted
            return true;
        } else {
            const permissionResult = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);
            return permissionResult === RESULTS.GRANTED;
        }
    };

    const writeToFile = async (content) => {
        try {
            const filePath = RNFS.ExternalDirectoryPath + '/log.txt';

            // Write the content to the file
            await RNFS.writeFile(filePath, content, 'utf8');

            console.log('File written successfully:', filePath);
        } catch (error) {
            console.error('Error writing to file:', error);
        }
    };


    async function myDisplayy() {
        var encryptVal = await generateRequest('717485993554', '6012', '11205764', 'EQT000000001641', 'Equitas Bank           Chennai      TNIN').then(value => { return value })

        var ValidateOTP = await validateOTP('717485993554', '117770', '041154', '1025104154', '041154', '1025', '6012', '11205764', 'EQT000000001641', 'Equitas Bank           Chennai      TNIN').then(value => { return value })

        if (global.DEBUG_MODE) console.log("EncryptedVal::" + encryptVal)
        if (global.DEBUG_MODE) console.log("ValidateOTP::" + ValidateOTP)

    }

    const handleBackButton = () => {
        // Close the app
        BackHandler.exitApp();
        return true;
    };


    const validate = () => {
        var flag = false; var i = 1;
        var errorMessage = '';

        if (institutionID.length <= 0) {
            errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_enterbank + '\n';
            i++;
            flag = true;
        }

        if (challengeCode.length <= 0) {
            errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_enterchallenge + '\n';
            i++;
            flag = true;
        }

        if (institutionID.length < 3 && institutionID.length > 0) {
            errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_entervalidbank + '\n';
            i++;
            flag = true;
        }

        if (challengeCode.length < 6 && challengeCode.length > 0) {
            errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_entervalidchallenge + '\n';
            i++;
            flag = true;
        }

        setErrMsg(errorMessage);
        return flag;
    }


    const callMBSREG = () => {
        if (validate()) {
            showBottomSheet();
            return;
        }
        const callApi = () => callRetrofitApi(global.DEVICENO, global.DEVICEMODELNAME);
        retryCall(callApi, 2);
    }

    const callRetrofitApi = (deviceNo, deviceModelName) => {
        setLoading(true);
        const formData = new URLSearchParams();
        formData.append('WsName', 'getBank');
        formData.append('BankID', institutionID);
        formData.append('DeviceNO', deviceNo);
        formData.append('DeviceModelName', deviceModelName);
        formData.append('PlatFormID', Platform.OS);
        formData.append('ChallengeCode', challengeCode);
        formData.append('AppInstance', instance);
        formData.append('AppID', global.APPID);
        formData.append('AppVersionNo', global.APPVERSIONNO);
        // Add more key-value pairs as needed
        if (global.DEBUG_MODE) console.log(institutionID + " " + deviceNo + " " + deviceModelName + " " + Platform.OS + " " + challengeCode + " " + instance + " " + global.APPID + " " + global.APPVERSIONNO)
        const headers = {
            'Accept-Encoding': 'identity',
            'Content-Type': 'application/x-www-form-urlencoded', // Mimicking form data
        };

        return axios.post(Url, formData.toString(), { headers });

    };


    const retryCall = (call, numberOfRetries) => {
        let retryCount = 0;

        const performCallWithRetry = () => {
            call()
                .then(response => {
                    if (global.DEBUG_MODE) console.log('Response:::::', response.data);
                    if (response.status === 200) {
                        // Handle successful response
                        getServerData(response).then(isValidResponse => {
                            if (global.DEBUG_MODE) console.log('isValidResponse:::::', isValidResponse);
                            if (isValidResponse) {
                                // checkPermissions();

                                //setLoading(false);


                            } else {

                                if (retryCount < numberOfRetries) {
                                    retryCount++;
                                    performCallWithRetry();
                                } else {
                                    setLoading(false)
                                    setApiError(language[0][`${props.language}`].eng_unableToConnectToServer);
                                    setErrorModalVisible(true)
                                    //Alert.alert(language[0][`${props.language}`].eng_unableToConnectToServer);
                                }
                            }
                        }); // Implement getServerData function


                    } else {
                        // Handle non-200 response
                        if (retryCount < numberOfRetries) {
                            retryCount++;
                            performCallWithRetry();
                        } else {
                            //Alert.alert(language[0][`${props.language}`].eng_unableToConnectToServer);
                            setApiError(language[0][`${props.language}`].eng_unableToConnectToServer);
                            setErrorModalVisible(true)
                        }
                    }
                })
                .catch(error => {
                    if (retryCount < numberOfRetries) {
                        retryCount++;
                        performCallWithRetry();
                    } else {
                        setLoading(false);
                        //Alert.alert(language[0][`${props.language}`].eng_unableToConnectToServer);
                        setApiError(language[0][`${props.language}`].eng_unableToConnectToServer);
                        setErrorModalVisible(true)
                    }
                });
        };

        performCallWithRetry();
    };

    async function getServerData(response) {

        let validresponse = false;
        await parser.parseString(response.data, (error, result) => {

            if (error) {
                if (global.DEBUG_MODE) console.error('Error parsing XML:', error);
                validresponse = false;
            } else {
                setStatus(result.Main.Response[0].Status)
                if (result.Main.Response[0].Status == '1') {
                    if (global.DEBUG_MODE) console.log('Parsed XML:', JSON.stringify(result.Main.BankDetails));
                    if (global.DEBUG_MODE) console.log('Parsed XML:', JSON.stringify(result.Main.BankDetails[0].BankURL[0]));
                    const bankDetails = result.Main.BankDetails[0];
                    global.BANKID = bankDetails.BankID[0];
                    var bankURL = bankDetails.BankURL[0];
                    global.BASEURL = bankURL;
                    AsyncStorage.setItem('IsBankRegistered', 'true');
                    //global.ISBRCONNECT = bankDetails.IsBRConnect[0];
                    global.BRCONNECTVERSION = bankDetails.BRConnectVersionNo[0];
                    global.BRCONNECTCERTIFICATEHASH = bankDetails.CertificateHash[0];
                    var bankURL1 = bankDetails.BankURL1[0];
                    const configVersion = bankDetails.ConfigVersion[0];
                    const certificateHash = bankDetails.CertificateHash[0];
                    global.BRCONNECTAPIKEY = bankDetails.BRConnectAPIKey[0];
                    global.BRCONNECTAPPID = bankDetails.BRConnectAPPID[0];
                    addtoRedux(global.BANKID, global.BASEURL, configVersion, bankURL1, global.BRCONNECTVERSION, global.BRCONNECTAPIKEY, global.BRCONNECTAPPID, certificateHash);
                    Bank_Detail_Table.deleteAllBankRecords().then(deleted => {
                        handleInsertBankDetail(global.BANKID, global.BASEURL, "1", global.BASEURL, bankURL1, configVersion, certificateHash)
                    })
                    setLoading(false);
                    setVisible(true);
                } else {
                    setApiError(result.Main.Response[0].ErrMsg);
                    setErrorModalVisible(true)
                    //alert(result.Main.Response[0].ErrMsg)
                    setLoading(false);
                    //setResponseErrMsg(result.Main.Response[0].ErrMsg)
                }
                validresponse = true;
            }

        });

        return validresponse;
    }

    const addtoRedux = (bankId, bankUrl, configVersion, bankUrl1, brConnectVersionNo, brConnectApiKey, brConnectAppId, certificateHash) => {

        var bankDetail = {
            'BankID': bankId,
            'BankURL': bankUrl,
            'ConfigVersion': configVersion,
            'BankURL1': bankUrl1,
            'BRConnectVersionNo': brConnectVersionNo,
            'BRConnectAPIKey': brConnectApiKey,
            'BRConnectAPPID': brConnectAppId,
            'CertificateHash': certificateHash,
            'INSTANCE': instance
        }

        props.addBank(bankDetail);

    }

    const handleInsertBankDetail = (bankID, bankURL, isRegistered, bankURL2, configVersion, certificateHash) => {
        Bank_Detail_Table.insertBankDetail(
            bankID,
            bankURL,
            isRegistered,
            bankURL,
            bankURL2,
            configVersion,
            certificateHash
        )
            .then(result => {
                if (global.DEBUG_MODE) console.log('Inserted bank detail:', result);
                // Refresh the bank details list
                Bank_Detail_Table.getAllBankDetails()
                    .then(data => {
                        if (global.DEBUG_MODE) console.log('bank detail:', data);
                    })
                    .catch(error => {
                        if (global.DEBUG_MODE) console.error('Error fetching bank details:', error);
                    });
            })
            .catch(error => {
                if (global.DEBUG_MODE) console.error('Error inserting bank detail:', error);
            });
    };

    const handleClick = () => {
        //alert(institutionID)
        setVisible(false);
        setInstitutionID('');
        setChallengeCode('');
        props.navigation.navigate('LoginScreen');
    };

    const closeErrorModal = () => {
        setErrorModalVisible(false);
    };

    return (

        <View style={{ flex: 1, backgroundColor: Colors.lightwhite }}>
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

            <ErrorModal isVisible={errorModalVisible} onClose={closeErrorModal} textContent={apiError} textClose={language[0][props.language].str_ok} />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
                {loading ? <Loading /> : null}
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>

                    <ErrorMessageModal isVisible={bottomErrorSheetVisible} hideBottomSheet={hideBottomSheet} errMsg={errMsg} textError={language[0][props.language].str_error} textClose={language[0][props.language].str_ok} />


                    <View style={{ width: '100%', flexDirection: 'row', }}>

                        <View style={{ width: '50%', }}>
                            <ImageComp imageSrc={require('../../Images/loginbg.png')} imageStylee={{ width: 160, height: 160, }} />
                        </View>

                        <View style={{ width: '47%', marginTop: 25, alignItems: 'flex-end', justifyContent: 'flex-start' }}>

                            <Menu
                                visible={menuvisible}
                                onDismiss={closeMenu}
                                contentStyle={{ backgroundColor: Colors.white }}
                                anchor={
                                    <TouchableOpacity onPress={() => { openMenu() }}>
                                        <View>
                                            <Entypo name='dots-three-vertical' color={Colors.black} size={20} />
                                        </View>
                                    </TouchableOpacity>
                                }>
                                <Menu.Item onPress={() => { setInstance('LIV'); closeMenu() }} style={{ backgroundColor: instance == 'LIV' ? Colors.darkblue : Colors.white, }} titleStyle={{ color: instance == 'LIV' ? Colors.white : Colors.black, fontFamily: 'PoppinsRegular' }} title="LIVE" />
                                <Menu.Item onPress={() => { setInstance('UAT'); closeMenu() }} style={{ backgroundColor: instance == 'UAT' ? Colors.darkblue : Colors.white }} titleStyle={{ color: instance == 'UAT' ? Colors.white : Colors.black, fontFamily: 'PoppinsRegular' }} title="UAT" />
                                <Menu.Item onPress={() => { setInstance('DEV'); closeMenu() }} style={{ backgroundColor: instance == 'DEV' ? Colors.darkblue : Colors.white }} titleStyle={{ color: instance == 'DEV' ? Colors.white : Colors.black, fontFamily: 'PoppinsRegular' }} title="DEV" />
                                <Menu.Item onPress={() => { setInstance('DEV'); closeMenu() }} style={{ backgroundColor: instance == 'DEV' ? Colors.darkblue : Colors.white }} titleStyle={{ color: instance == 'QA' ? Colors.white : Colors.black, fontFamily: 'PoppinsRegular' }} title="QA" />
                            </Menu>

                        </View>

                    </View>




                    <View style={{ width: '100%', marginTop: 30, paddingHorizontal: 16, alignItems: 'center' }}>

                        <TextComp textVal={language[0][props.language].str_appconfig} textStyle={[Commonstyles.boldtextStyle, { fontSize: 16 }]} />
                        <TextComp textVal={language[0][props.language].str_enterinstid} textStyle={{ color: Colors.darkblack, fontSize: 14, marginTop: 32, fontFamily: 'PoppinsRegular' }} />
                    </View>


                    <CodeField
                        ref={institutionIDRef}
                        {...props}
                        value={institutionID}
                        autoFocus={true}
                        onChangeText={(txt) => {
                            if (txt.length > 0) {
                                if (Common.integerPattern.test(txt))
                                    setInstitutionID(txt)
                            } else {
                                setInstitutionID(txt)
                            }
                        }}
                        cellCount={3}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        onSubmitEditing={() => {
                            if (challengeCode.length >= 6) {
                                Keyboard.dismiss()
                            } else {
                                challengeCodeRef.current.focus()
                            }
                        }}
                        renderCell={renderCell}
                    />

                    <TextComp textVal={language[0][props.language].str_enterchallengecode} textStyle={{ color: Colors.darkblack, fontSize: 14, marginTop: 34, fontFamily: 'PoppinsRegular' }} />


                    <CodeField
                        ref={challengeCodeRef}
                        {...props}
                        value={challengeCode}
                        autoFocus={false}
                        onChangeText={(txt) => {
                            if (txt.length > 0) {
                                if (Common.integerPattern.test(txt))
                                    setChallengeCode(txt)
                            } else {
                                setChallengeCode(txt)
                            }

                        }}
                        cellCount={6}
                        rootStyle={styles.codeFieldRoot}
                        keyboardType="number-pad"
                        textContentType="oneTimeCode"
                        onSubmitEditing={Keyboard.dismiss}
                        renderCell={renderCellCode}
                    />


                </View>

                <ButtonViewComp textValue={language[0][props.language].str_next.toUpperCase()} textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }} viewStyle={[Commonstyles.buttonView, { marginTop: 60, marginBottom: 20 }]} innerStyle={Commonstyles.buttonViewInnerStyle} handleClick={callMBSREG} />


                <CenteredModal isVisible={Visible} onClose={handleClick} textContent={language[0][props.language].str_instRegistered} textClose={language[0][props.language].str_ok} />

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
    addBank: (item) => dispatch(addBank(item)),
});


export default connect(mapStateToProps, mapDispatchToProps)(BankRegistration);

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
