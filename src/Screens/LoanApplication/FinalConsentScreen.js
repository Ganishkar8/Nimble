import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ImageBackground,
    View,
    Platform,
    TouchableOpacity,
    Alert,
    Image,
    StatusBar,
    Text,
    BackHandler,
    ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../Utils/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MyStatusBar from '../../Components/MyStatusBar';
import Loading from '../../Components/Loading';
import { Dimensions } from 'react-native';
import apiInstance from '../../Utils/apiInstance';
import { connect } from 'react-redux';
import { languageAction } from '../../Utils/redux/actions/languageAction';
import { profileAction } from '../../Utils/redux/actions/ProfileAction';
import { useIsFocused } from '@react-navigation/native';
import ConsentModal from '../../Components/ConsentModal';
import ErrorModal from '../../Components/ErrorModal';
import { language } from '../../Utils/LanguageString';
import Common from '../../Utils/Common';
import tbl_client from '../../Database/Table/tbl_client';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const FinalConsentScreen = (props) => {

    const [loading, setLoading] = useState(false);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const [mobileNumber, setMobileNumber] = useState('');
    const isScreenVisible = useIsFocused();

    const [consentVisible, setConsentVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');

    const [systemValuesDetail, setSystemValuesDetail] = useState(props.mobilecodedetail.systemValues);
    const [consentValue, setConsentValue] = useState('  ');


    useEffect(() => {

        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        const filteredConsent = systemValuesDetail?.filter((data) => data.systemCode === 'LOANSUBMISSION_CONSENT')

        if (filteredConsent && filteredConsent?.length > 0) {
            setConsentValue(filteredConsent[0].value)
        }

        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }
    }, [isScreenVisible]);

    useEffect(() => {

        getMobileNumber();

    }, [props.navigation]);

    useFocusEffect(
        React.useCallback(() => {

            setConsentVisible(true);
            return () => {

            };
        }, []),
    );

    const handleBackButton = () => {
        props.navigation.goBack();
        return true; // Prevent default back button behavior
    };

    const getMobileNumber = async () => {
        await tbl_client
            .getClientBasedOnID(global.LOANAPPLICATIONID, 'APPL')
            .then(data => {
                if (global.DEBUG_MODE) console.log('Applicant Data:', data);
                if (data !== undefined && data.length > 0) {
                    setMobileNumber(data[0].mobileNumber);
                }
            })
            .catch(error => {
                if (global.DEBUG_MODE)
                    console.error('Error fetching Applicant details:', error);
            });
    }

    const nextScreen = (value) => {
        if (value == 'Agree') {
            finalConsent();
        } else {
            props.navigation.goBack();
        }

    }

    const finalConsent = () => {

        const appDetails = {
            "finalConsent": true
        }

        const baseURL = '8901'
        setLoading(true)
        apiInstance(baseURL).put(`/api/v2/profile-short/basic-details/${global.LOANAPPLICATIONID}`, appDetails)
            .then(async (response) => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log("FinalConsentApiResponse::" + JSON.stringify(response));
                if (response.status == 200) {
                    if (response.data != null) {
                        if (global.DEBUG_MODE) console.log("FinalConsentApiResponse::" + JSON.stringify(response.data));
                        generateOTP();

                    } else {
                        setApiError('Not a Valid Response from Api');
                        setErrorModalVisible(true)
                    }
                }
                setLoading(false)


            })
            .catch((error) => {
                setLoading(false)
                if (global.DEBUG_MODE) console.log("TempIDCreationApiResponse::" + JSON.stringify(error.response));
                //props.navigation.replace('LoanApplicationMain')
                //global.TEMPAPPID = '1115153454';
                if (error.response.data != null) {
                    setApiError(error.response.data.message);
                    setErrorModalVisible(true)
                }
            });



    }

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
        apiInstance(baseURL)
            .post('/api/v1/otp/send-otp', appDetails)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log('MobileOTPApiResponse::' + JSON.stringify(response.data),);

                if (response.status == 200) {
                    setConsentVisible(false);
                    props.navigation.navigate('ConsentOTPVerification', { mobileNumber: mobileNumber })
                }
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

    const closeErrorModal = () => {
        setErrorModalVisible(false);
    };


    return (



        <View style={{ flex: 1 }}>
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
            <ErrorModal isVisible={errorModalVisible} onClose={closeErrorModal} textContent={apiError} textClose={language[0][props.language].str_ok} />
            {loading ? <Loading /> : null}

            <View style={{ flex: 1 }}>
                <ScrollView style={styles.scrollView}
                    contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" >
                    <View style={{ flex: 1 }}>

                        <ConsentModal consentVisible={consentVisible} nextScreen={nextScreen} textContent={consentValue}></ConsentModal>

                    </View>
                </ScrollView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    parentView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        flexDirection: 'column',
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageStyle1: {
        width: 230,
        height: 100,
        resizeMode: 'contain',
    },
    imageStyleLogo: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    tinyLogo: {
        width: 17,
        height: 21,
        justifyContent: 'center',
    },
    circularView: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#e3dbd4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circularView1: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#AAF2D4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circularView2: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#d7f0db',
        justifyContent: 'center',
        alignItems: 'center',
    },
    circularView3: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#cceaff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollView: {
        flex: 1,
        alignSelf: 'center',
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 50,
        flexGrow: 1,
    },
});

const mapStateToProps = (state) => {
    const { language } = state.languageReducer;
    const { profiledetail } = state.profileReducer;
    return {
        language: language,
        profiledetail: profiledetail,
    }
}

const mapDispatchToProps = (dispatch) => ({
    languageAction: (item) => dispatch(languageAction(item)),
    profileAction: (item) => dispatch(profileAction(item)),
});


export default connect(mapStateToProps, mapDispatchToProps)(FinalConsentScreen);

