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
import tbl_loanApplication from '../../Database/Table/tbl_loanApplication';

const ConsentScreen = (props, { navigation }) => {

    const [loading, setLoading] = useState(false);
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const [userName, setUserName] = useState('');
    const isScreenVisible = useIsFocused();

    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');
    const [leadData, setLeadData] = useState(props.route.params.leadData[0]);
    const [profileDetail, setProfileDetail] = useState(props.profiledetail.userPersonalDetailsDto);

    useEffect(() => {

        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }
    }, [navigation, isScreenVisible]);

    const handleBackButton = () => {
        props.navigation.goBack();
        return true; // Prevent default back button behavior
    };

    const insertLeadData = async (loanID, tempNum) => {
        let leadData = props.route.params.leadData[0]

        await tbl_client.insertClient(
            '',
            loanID,
            'APPL',
            '',
            leadData.id,
            leadData.leadCreationBasicDetails.title,
            leadData.leadCreationBasicDetails.firstName + ' ' + leadData.leadCreationBasicDetails.middleName + ' ' + leadData.leadCreationBasicDetails.lastName,
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            leadData.leadCreationBasicDetails.gender,
            '',
            leadData.leadCreationBasicDetails.mobileNumber,
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '0',
            '0',
            '0',
            '',
            '',
            '',
            '',
            '1',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
        );

        await tbl_loanApplication.insertLoanApplication(
            loanID,
            'APPL',
            tempNum,
            tempNum,
            profileDetail.branchId,
            leadData.id,
            leadData.leadCreationBasicDetails.customerCategory,
            '',
            '',
            leadData.leadCreationLoanDetails.loanType,
            leadData.leadCreationLoanDetails.loanPurpose,
            leadData.leadCreationLoanDetails.loanProduct,
            leadData.leadCreationLoanDetails.loanAmount,
            '',
            '',
            'true',
            'true',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
            '',
        );

        props.navigation.replace('LoanApplicationMain', { fromScreen: 'ConsentScreen' })

    }

    const callTempID = () => {
        Common.getNetworkConnection().then(value => {
            if (value.isConnected == true) {
                createTempID();
            } else {
                setApiError(language[0][props.language].str_errinternet);
                setErrorModalVisible(true)
                //alert(language[0][props.language].str_errinternet)
            }

        })
    }

    const createTempID = () => {

        const appDetails = {
            "createdBy": global.USERID,
            "consent": true,
        }

        const baseURL = global.PORT1
        setLoading(true)
        apiInstance(baseURL).post(`api/v2/profile-short/loan-creation`, appDetails)
            .then(async (response) => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log("TempIDCreationApiResponse::" + JSON.stringify(response));
                setLoading(false)
                if (response.status == 200) {
                    if (response.data != null) {
                        if (global.DEBUG_MODE) console.log("TempIDCreationApiResponse::" + JSON.stringify(response.data));
                        global.TEMPAPPID = response.data.tempNumber;
                        global.LOANAPPLICATIONID = response.data.id;

                        if (props.route.params.leadData.length > 0) {
                            insertLeadData(response.data.id, response.data.tempNumber);
                        } else {
                            props.navigation.replace('LoanApplicationMain', { fromScreen: 'ConsentScreen' })
                        }

                    } else {
                        setApiError('Not a Valid Response from Api');
                        setErrorModalVisible(true)
                    }
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
                if (global.DEBUG_MODE) console.log("TempIDCreationApiResponse::" + JSON.stringify(error.response));
                //props.navigation.replace('LoanApplicationMain')
                //global.TEMPAPPID = '1115153454';
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

    const nextScreen = (value) => {
        if (value == 'Agree') {
            createTempID();
        } else {
            props.navigation.goBack()
        }

    }

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

const mapStateToProps = state => {
    const { language } = state.languageReducer;
    const { profileDetails } = state.profileReducer;
    const { mobileCodeDetails } = state.mobilecodeReducer;
    return {
        language: language,
        profiledetail: profileDetails,
        mobilecodedetail: mobileCodeDetails,
    };
};

const mapDispatchToProps = (dispatch) => ({
    languageAction: (item) => dispatch(languageAction(item)),
    profileAction: (item) => dispatch(profileAction(item)),
});


export default connect(mapStateToProps, mapDispatchToProps)(ConsentScreen);

