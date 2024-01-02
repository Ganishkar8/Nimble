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


const FinalConsentScreen = (props, { navigation }) => {

    const [loading, setLoading] = useState(false);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const [mobileNumber, setMobileNumber] = useState('');
    const isScreenVisible = useIsFocused();

    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');

    useEffect(() => {

        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        getMobileNumber();
        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }
    }, [navigation, isScreenVisible]);

    const handleBackButton = () => {
        props.navigation.goBack();
        return true; // Prevent default back button behavior
    };

    const getMobileNumber = async () => {
        await tbl_client
            .getClientBasedOnID(global.LOANAPPLICATIONID, global.CLIENTTYPE)
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
            generateOTP();
        } else {
            props.navigation.goBack()
        }

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

                        <ConsentModal nextScreen={nextScreen} textContent={"I, hereby provide my informed consent you to proceed with my loan application. I acknowledge that I have received, read, and understood all the loan terms and conditions, as well as the associated costs, fees, and interest rates. I understand that the loan application process will involve the collection, processing, and verification of my personal and financial information.I consent to the following:1. The collection of necessary personal and financial information for the purpose of assessing and processing my loan application.2. The verification of my credit history and financial background as required by [Your Company Name or Bank].3. The disclosure of my credit score and related information to relevant credit reporting agencies for the purpose of this loan application.4. The sharing of my application and credit information with any necessary third parties such as underwriters, appraisers, or legal entities involved in the loan processing.5. The use of electronic signatures and documents as part of the application process.I acknowledge my responsibility to repay the loan in accordance with the terms and conditions specified in the loan agreement. I am aware that any false or misleading information provided in this application may result in the denial of my loan request.By signing this consent form, I confirm that I am providing my full consent and understanding of the loan application process as described."}></ConsentModal>

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

