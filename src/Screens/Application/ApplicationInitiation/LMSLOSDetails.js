import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Image,
    Text,
    FlatList,
} from 'react-native';
import apiInstance from '../../../Utils/apiInstance';
import Colors from '../../../Utils/Colors';
import MyStatusBar from '../../../Components/MyStatusBar';
import Loading from '../../../Components/Loading';
import { connect } from 'react-redux';
import { languageAction } from '../../../Utils/redux/actions/languageAction';
import { language } from '../../../Utils/LanguageString';
import Commonstyles from '../../../Utils/Commonstyles';
import HeadComp from '../../../Components/HeadComp';
import Common from '../../../Utils/Common';
import ButtonViewComp from '../../../Components/ButtonViewComp';
import ErrorMessageModal from '../../../Components/ErrorMessageModal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
import { addLoanInitiationDetails, updateLoanInitiationDetails, deleteLoanInitiationDetails, updateClientDetails } from '../../../Utils/redux/actions/loanInitiationAction';


const LMSLOSDetails = (props, { navigation }) => {
    const [loading, setLoading] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
    const showBottomSheet = () => setBottomErrorSheetVisible(true);
    const hideBottomSheet = () => setBottomErrorSheetVisible(false);
    const mobileNumberRef = useRef(null);

    const isScreenVisible = useIsFocused();
    const [ActiveBasicDetials, setActiveBasicDetials] = useState(false);
    const [ExistingLoanDetails, setExistingLoanDetails] = useState(false);

    const [apiError, setApiError] = useState('');
    const [errorModalVisible, setErrorModalVisible] = useState(false);

    const [BasicDetailsCaption, setBasicDetailsCaption] =
        useState('Basic Details');
    const [ExistingLoanDetailsCaption, setExistingLoanDetailsCaption] = useState(
        'Existing Loan Details',
    );

    const [existingClientDetail, setExistingClientDetail] = useState(props.dedupeDetail.clientExistingDetails);
    const [existingClientLoanDetail, setExistingClientLoanDetail] = useState(props.dedupeDetail.clientExistingLoanDetails);
    const [lmsDedupeCheck, setLmsDedupeCheck] = useState(true);
    const [losDedupeCheck, setLosDedupeCheck] = useState(false);
    const [onlyLOS, setOnlyLOS] = useState(false);
    const [lmsData, setlmsData] = useState([]);
    const [losData, setlosData] = useState([]);

    useEffect(() => {
        if (Common.DEBUG_MODE) console.log(JSON.stringify(props.dedupeDetail))
        //alert(JSON.stringify(props.loanInitiationDetails))
        loanOriginationDedupeCheck();
        updateBasicDedupe();

    }, [props.navigation, isScreenVisible]);


    useEffect(() => {

        props.navigation
            .getParent()
            ?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });

        return () => {
            props.navigation
                .getParent()
                ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
        };
    }, [isScreenVisible]);

    const onButtonClick = (value) => {

        if (value == 'Proceed') {
            if (lmsDedupeCheck) {
                setLmsDedupeCheck(false);
                setLosDedupeCheck(true);
            } else {
                if (onlyLOS) {
                    props.navigation.replace('ProfileShortBasicDetails');
                } else {
                    props.navigation.navigate('ProfileShortExistingClientDetails')
                }

            }
        }


    };


    const updateBasicDedupe = () => {

        const clientDetail = props.loanInitiationDetails.filter(item => item.id === parseInt(global.LOANAPPLICATIONID))[0].clientDetail.find(client => client.id === parseInt(global.CLIENTID));


        const appDetails = {
            "isActive": true,
            "createdBy": global.USERID,
            "id": global.CLIENTID,
            "dedupeCheck": true,
            "dedupeCheckDate": new Date(),
        }

        if (clientDetail.lmsClientId) {
            appDetails.customerType = "EXISTING";
        } else {
            appDetails.customerType = "NEW";
        }

        if (props.dedupeDetail.clientExistingDetails) {
            appDetails.lmsClientId = props.dedupeDetail.clientExistingDetails[0].lmsClientId;
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
                    if (global.CLIENTTYPE == 'APPL') {
                        props.updateLoanInitiationDetails(parseInt(global.LOANAPPLICATIONID), { customerType: appDetails.customerType }, 'clientDetail', response.data.id, response.data)
                    } else {
                        props.updateLoanInitiationDetails(parseInt(global.LOANAPPLICATIONID), [], 'clientDetail', response.data.id, response.data)
                    }

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


    const loanOriginationDedupeCheck = () => {
        const clientDetail = props.loanInitiationDetails.filter(item => item.id === parseInt(global.LOANAPPLICATIONID))[0].clientDetail.find(client => client.id === parseInt(global.CLIENTID));

        const appDetails = {
            "clientId": global.CLIENTID,
            "loanApplicationId": global.LOANAPPLICATIONID,
            "clientType": global.CLIENTTYPE,
        };

        if (props.dedupeDetail) {
            if (props.dedupeDetail.clientExistingDetails) {
                appDetails.clientExistingDetails = props.dedupeDetail.clientExistingDetails[0];
                setLmsDedupeCheck(true);
                setLosDedupeCheck(false);
            } else {
                appDetails.clientExistingDetails = {
                    "kycTypeId1": clientDetail.kycTypeId1,
                    "kycIdValue1": clientDetail.kycIdValue1,
                    "kycTypeId2": clientDetail.kycTypeId2,
                    "kycIdValue2": clientDetail.kycIdValue2,
                    "kycTypeId3": clientDetail.kycTypeId3,
                    "kycIdValue3": clientDetail.kycIdValue3,
                    "kycTypeId4": clientDetail.kycTypeId4,
                    "kycIdValue4": clientDetail.kycIdValue4,
                    "emailId": clientDetail.email,
                    "mobileNumber": clientDetail.mobileNumber
                }
                setLmsDedupeCheck(false);
                setLosDedupeCheck(true);
                setOnlyLOS(true);
            }
        }

        const baseURL = global.PORT1;
        setLoading(true);
        apiInstance(baseURL)
            .post(
                `/api/v2/profile-short/los-dedupe-check`, appDetails,
                appDetails,
            )
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log('DedupeApiResponse::' + JSON.stringify(response.data));
                //await tbl_client.deleteAllClient();
                if (response.status == 200) {
                    setLoading(false);
                    if (response.data) {

                        const lmsData = response.data.filter(item => item.businessRuleCode == 'LMS_DEDUPE')
                        const losData = response.data.filter(item => item.businessRuleCode == 'LOS_DEDUPE')
                        setlmsData(lmsData);
                        setlosData(losData);

                    }
                } else if (response.data.statusCode === 201) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                } else if (response.data.statusCode === 202) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                }
            })
            .catch(error => {
                // Handle the error
                if (global.DEBUG_MODE)
                    console.log('DedupeApiResponse' + JSON.stringify(error));
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
        //}
    };

    const navigateToRemarks = (remarks) => {
        props.navigation.navigate('RemarksScreen', { "remarks": remarks });
    }

    const onGoBack = () => {
        if (lmsDedupeCheck) {
            props.navigation.goBack();
        } else {
            setLosDedupeCheck(false);
            setLmsDedupeCheck(true);
        }
    };

    return (
        // enclose all components in this View tag
        <SafeAreaView
            style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

            {loading ? <Loading /> : null}
            <View style={{ flex: 1 }}>
                <ErrorMessageModal
                    isVisible={bottomErrorSheetVisible}
                    hideBottomSheet={hideBottomSheet}
                    errMsg={errMsg}
                    textError={language[0][props.language].str_error}
                    textClose={language[0][props.language].str_ok}
                />

                <View
                    style={{
                        width: '100%',
                        height: 56,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                    <HeadComp
                        textval={lmsDedupeCheck ? language[0][props.language].str_lmsdedupeResult : language[0][props.language].str_losdedupeResult}
                        props={props}
                        onGoBack={onGoBack}
                    />
                </View>

                <View style={{ width: '100%', marginBottom: 50 }}>
                    <FlatList
                        data={lmsDedupeCheck ? lmsData : losData}
                        renderItem={({ item, index }) => {
                            return (

                                <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', minHeight: 80, marginTop: 10, alignItems: 'center', backgroundColor: '#F5F5F5', borderRadius: 10 }}>


                                    <View style={{ flexDirection: 'row', width: '90%', alignItems: 'center' }}>

                                        <Text style={[Commonstyles.inputtextStyle, { color: Colors.black, marginLeft: 15 }]}>{item.label}</Text>

                                    </View>

                                    {item.remarks &&
                                        <TouchableOpacity onPress={() => navigateToRemarks(item.remarks)} style={{ justifyContent: 'center', alignItems: 'center', width: '10%' }}>
                                            <View >

                                                <AntDesign name='eye' size={23} color={Colors.darkblue} />

                                            </View>
                                        </TouchableOpacity>
                                    }

                                </View>

                            )
                        }

                        }
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>



            </View>

            <View style={{ marginBottom: 20, flexDirection: 'row' }}>
                <ButtonViewComp
                    textValue={language[0][props.language].str_proceed.toUpperCase()}
                    textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
                    viewStyle={[Commonstyles.buttonView, { width: '50%' }]}
                    innerStyle={Commonstyles.buttonViewInnerStyle}
                    handleClick={onButtonClick}
                    value={'Proceed'}
                />
                <ButtonViewComp
                    textValue={language[0][props.language].str_reject.toUpperCase()}
                    textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
                    viewStyle={[Commonstyles.buttonView, { width: '50%' }]}
                    innerStyle={Commonstyles.buttonViewInnerStyle}
                    handleClick={onButtonClick}
                    value={'Reject'}
                />
            </View>


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
        flexGrow: 1,
    },
    line: {
        backgroundColor: '#dbdbdb', // Change the color as needed
        height: 1,
        width: '90%',
        marginTop: '5%', // Adjust the height as needed
    },
    picker: {
        height: 50,
        width: '100%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlign: 'center',
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
    const { dedupeDetails } = state.profileReducer;
    const { loanInitiationDetails } = state.loanInitiationReducer;
    return {
        language: language,
        profiledetail: profileDetails,
        mobilecodedetail: mobileCodeDetails,
        dedupeDetail: dedupeDetails,
        loanInitiationDetails: loanInitiationDetails,
    }
}

const mapDispatchToProps = dispatch => ({
    languageAction: item => dispatch(languageAction(item)),
    updateClientDetails: (loanApplicationId, clientId, key, data) => dispatch(updateClientDetails(loanApplicationId, clientId, key, data)),
    updateLoanInitiationDetails: (loanApplicationId, loanData, key, clientId, updatedDetails) => dispatch(updateLoanInitiationDetails(loanApplicationId, loanData, key, clientId, updatedDetails)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LMSLOSDetails);