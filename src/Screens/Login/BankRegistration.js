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
    TouchableOpacity
} from 'react-native';
import apiInstance from '../../Utils/apiInstance';
import jwtDecode from 'jwt-decode';
import Colors from '../../Utils/Colors';
import MyStatusBar from '../../Components/ MyStatusBar';
import Loading from '../../Components/Loading';
import TextComp from '../../Components/TextComp';
import { connect } from 'react-redux';
import { languageAction } from '../../Utils/redux/actions/languageAction';
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

import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
} from 'react-native-confirmation-code-field';
const { Value, Text: AnimatedText } = Animated;

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
    const { confirmCode, timer } = props;
    const [value, setValue] = useState('');
    const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
    const [, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
    });
    const institutionIDRef = useRef(null);
    const challengeCodeRef = useRef(null);
    let Url = Common.CS_URL; // Initialize with your initial URL
    let goForRetry = true;

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


        if (isFocused) {
            BackHandler.addEventListener('hardwareBackPress', handleBackButton);
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

    const handleBackButton = () => {
        // Close the app
        BackHandler.exitApp();
        return true;
    };


    const callMBSREG = () => {
        const callApi = () => callRetrofitApi(global.DEVICENO, global.DEVICEMODELNAME);
        retryCall(callApi, 2);
    }

    const callRetrofitApi = (deviceNo, deviceModelName) => {
        setLoading(true);
        const formData = new URLSearchParams();
        formData.append('WsName', 'getBank');
        formData.append('BankID', global.BANKID);
        formData.append('DeviceNO', deviceNo);
        formData.append('DeviceModelName', deviceModelName);
        formData.append('PlatFormID', Platform.OS);
        formData.append('ChallengeCode', global.CHANLLENGECODE);
        formData.append('AppInstance', global.INSTANCE);
        formData.append('AppID', global.APPID);
        formData.append('AppVersionNo', global.APPVERSIONNO);
        // Add more key-value pairs as needed
        console.log(global.BANKID + " " + deviceNo + " " + deviceModelName + " " + Platform.OS + " " + global.CHANLLENGECODE + " " + global.INSTANCE + " " + global.APPID + " " + global.APPVERSIONNO)
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
                                setLoading(false);
                                setVisible(true);

                            } else {

                                if (retryCount < numberOfRetries) {
                                    retryCount++;
                                    performCallWithRetry();
                                } else {
                                    setLoading(false)
                                    Alert.alert(language[0][`${props.language}`].eng_unableToConnectToServer);
                                }
                            }
                        }); // Implement getServerData function


                    } else {
                        // Handle non-200 response
                        if (retryCount < numberOfRetries) {
                            retryCount++;
                            performCallWithRetry();
                        } else {
                            Alert.alert(language[0][`${props.language}`].eng_unableToConnectToServer);
                        }
                    }
                })
                .catch(error => {
                    if (retryCount < numberOfRetries) {
                        retryCount++;
                        performCallWithRetry();
                    } else {
                        setLoading(false);
                        Alert.alert(language[0][`${props.language}`].eng_unableToConnectToServer);
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
                if (global.DEBUG_MODE) console.log('Parsed XML:', JSON.stringify(result.Main.BankDetails));
                if (global.DEBUG_MODE) console.log('Parsed XML:', JSON.stringify(result.Main.BankDetails[0].BankURL[0]));
                const bankDetails = result.Main.BankDetails[0];
                global.BANKID = bankDetails.BankID[0];
                global.BASEURL = bankDetails.BankURL[0];
                global.ISBRCONNECT = bankDetails.IsBRConnect[0];
                global.BRCONNECTVERSION = bankDetails.BRConnectVersionNo[0];
                global.BRCONNECTCERTIFICATEHASH = bankDetails.CertificateHash[0];
                const bankURL1 = bankDetails.BankURL1[0];
                const configVersion = bankDetails.ConfigVersion[0];
                const certificateHash = bankDetails.CertificateHash[0];
                global.BRCONNECTAPIKEY = bankDetails.BRConnectAPIKey[0];
                global.BRCONNECTAPPID = bankDetails.BRConnectAPPID[0];
                Bank_Detail_Table.deleteAllBankRecords().then(deleted => {
                    handleInsertBankDetail(global.BANKID, global.BASEURL, "1", global.BASEURL, bankURL1, configVersion, certificateHash)
                })
                validresponse = true;
            }

        });

        return validresponse;
    }

    const handleInsertBankDetail = (bankID, bankURL, isRegistered, bankURL1, bankURL2, configVersion, certificateHash) => {
        Bank_Detail_Table.insertBankDetail(
            bankID,
            bankURL,
            isRegistered,
            bankURL1,
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
        props.navigation.navigate('SetUpMPIN');
    };

    return (

        <View style={{ flex: 1, backgroundColor: Colors.lightwhite }}>
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

            <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
                {loading ? <Loading /> : null}
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-start' }}>

                    <View style={{ width: '100%', flexDirection: 'row', }}>

                        <View style={{ width: '100%', }}>
                            <ImageComp imageSrc={require('../../Images/loginbg.png')} imageStylee={{ width: 160, height: 160, resizeMode: 'contain' }} />
                        </View>

                        <View style={{ width: '55%', }}>

                        </View>

                    </View>

                    <View style={{ width: '100%', marginTop: 30, paddingHorizontal: 16, alignItems: 'center' }}>

                        <TextComp textVal={language[0][props.language].str_appconfig} textStyle={[Commonstyles.boldtextStyle, { fontSize: 16 }]} />
                        <TextComp textVal={language[0][props.language].str_enterinstid} textStyle={{ color: Colors.lightgrey, fontSize: 14, marginTop: 25 }} />
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

                    <TextComp textVal={language[0][props.language].str_enterchallengecode} textStyle={{ color: Colors.lightgrey, fontSize: 14, marginTop: 30 }} />


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
        marginTop: 30,
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