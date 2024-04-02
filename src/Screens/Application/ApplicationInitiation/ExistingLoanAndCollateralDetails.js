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
    BackHandler
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

const ExistingLoanAndCollateralDetails = (props, { navigation }) => {
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
    const [lmsData, setlmsData] = useState([]);
    const [losData, setlosData] = useState([]);

    const [leadsystemCodeDetail, setLeadSystemCodeDetail] = useState(props.mobilecodedetail.leadSystemCodeDto);
    const [systemCodeDetail, setSystemCodeDetail] = useState(props.mobilecodedetail.t_SystemCodeDetail);
    const [leaduserCodeDetail, setLeadUserCodeDetail] = useState(props.mobilecodedetail.leadUserCodeDto);

    useEffect(() => {

    }, [props.navigation]);


    useEffect(() => {
        props.navigation
            .getParent()
            ?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleBackButton,
        );

        return () => {
            props.navigation
                .getParent()
                ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        };
    }, [isScreenVisible]);

    const onButtonClick = (value) => {

        if (value == 'Proceed') {
            if (lmsDedupeCheck) {
                setLmsDedupeCheck(false);
                setLosDedupeCheck(true);
            } else {
                props.navigation.navigate('ProfileShortExistingClientDetails')
            }
        }


    };

    const loanOriginationDedupeCheck = () => {
        const clientDetail = props.loanInitiationDetails.filter(item => item.id === parseInt(global.LOANAPPLICATIONID))[0].clientDetail.find(client => client.id === parseInt(global.CLIENTID));

        const appDetails = {
            "clientId": 1,
            "loanApplicationId": 1,
            "clientType": "APPL",

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

    const handleBackButton = () => {
        onGoBack();
        return true; // Prevent default back button behavior
    };

    const onGoBack = () => {

        props.navigation.goBack();

    };

    const LoanView = ({ item, index }) => {
        return (

            <View style={{ width: '90%', alignSelf: 'center' }}>

                <Text style={{ color: Colors.black, fontSize: 16, fontFamily: 'Poppins-Medium', marginTop: 14 }}>{`Loan ${index + 1}`}</Text>

                <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>

                    <Text style={[Commonstyles.inputtextStyle, { color: Colors.mediumgrey, width: '50%', fontFamily: 'Poppins-Medium' }]}>{language[0][props.language].str_accopendate}</Text>
                    <Text style={[Commonstyles.inputtextStyle, { color: Colors.black, width: '50%', marginTop: 0.2 }]}>{Common.formatDate(item.accountOpenedDate)}</Text>

                </View>

                <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>

                    <Text style={[Commonstyles.inputtextStyle, { color: Colors.mediumgrey, width: '50%', fontFamily: 'Poppins-Medium' }]}>{language[0][props.language].str_loantype.toUpperCase()}</Text>
                    <Text style={[Commonstyles.inputtextStyle, { color: Colors.black, width: '50%', marginTop: 0.2 }]}>{Common.getSystemCodeDescription(leaduserCodeDetail, 'LoanStatusID', item.loanStatus)}</Text>

                </View>

                <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>

                    <Text style={[Commonstyles.inputtextStyle, { color: Colors.mediumgrey, width: '50%', fontFamily: 'Poppins-Medium' }]}>{language[0][props.language].str_productId.toUpperCase()}</Text>
                    <Text style={[Commonstyles.inputtextStyle, { color: Colors.black, width: '50%', marginTop: 0.2 }]}>{Common.getSystemCodeDescription(leadsystemCodeDetail, 'PD', item.productId)}</Text>

                </View>

                <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>

                    <Text style={[Commonstyles.inputtextStyle, { color: Colors.mediumgrey, width: '50%', fontFamily: 'Poppins-Medium' }]}>{language[0][props.language].str_loansacamount.toUpperCase()}</Text>
                    <Text style={[Commonstyles.inputtextStyle, { color: Colors.black, width: '50%', marginTop: 0.2 }]}>₹ {item.loanSanctionedAmount}</Text>

                </View>

                <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>

                    <Text style={[Commonstyles.inputtextStyle, { color: Colors.mediumgrey, width: '50%', fontFamily: 'Poppins-Medium' }]}>{language[0][props.language].str_loannum.toUpperCase()}</Text>
                    <Text style={[Commonstyles.inputtextStyle, { color: Colors.black, width: '50%', marginTop: 0.2 }]}>{item.lmsLoanAccountNumber}</Text>

                </View>

                <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>

                    <Text style={[Commonstyles.inputtextStyle, { color: Colors.mediumgrey, width: '50%', fontFamily: 'Poppins-Medium' }]}>{language[0][props.language].str_loanassclass.toUpperCase()}</Text>
                    <Text style={[Commonstyles.inputtextStyle, { color: Colors.black, width: '50%', marginTop: 0.2 }]}>{Common.getSystemCodeDescription(leaduserCodeDetail, 'AssetClassID', item.loanAssetClassification)}</Text>

                </View>

                <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>

                    <Text style={[Commonstyles.inputtextStyle, { color: Colors.mediumgrey, width: '50%', fontFamily: 'Poppins-Medium' }]}>{language[0][props.language].str_dpddays.toUpperCase()}</Text>
                    <Text style={[Commonstyles.inputtextStyle, { color: Colors.black, width: '50%', marginTop: 0.2 }]}>{item.dpdDays}</Text>

                </View>

                <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>

                    <Text style={[Commonstyles.inputtextStyle, { color: Colors.mediumgrey, width: '50%', fontFamily: 'Poppins-Medium' }]}>{language[0][props.language].str_outstandingamt.toUpperCase()}</Text>
                    <Text style={[Commonstyles.inputtextStyle, { color: Colors.black, width: '50%', marginTop: 0.2 }]}>₹ {item.outstandingAmount}</Text>

                </View>

                <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>

                    <Text style={[Commonstyles.inputtextStyle, { color: Colors.mediumgrey, width: '50%', fontFamily: 'Poppins-Medium' }]}>{language[0][props.language].str_overdueamt.toUpperCase()}</Text>
                    <Text style={[Commonstyles.inputtextStyle, { color: Colors.black, width: '50%', marginTop: 0.2 }]}>₹ {item.overdueAmount}</Text>

                </View>


            </View>

        )

    }

    const CollateralView = ({ item, index }) => {
        return (

            <View style={{ width: '90%', alignSelf: 'center' }}>

                <Text style={{ color: Colors.black, fontSize: 16, fontFamily: 'Poppins-Medium', marginTop: 14 }}>{`Collateral ${index + 1}`}</Text>

                <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>

                    <Text style={[Commonstyles.inputtextStyle, { color: Colors.mediumgrey, width: '50%', fontFamily: 'Poppins-Medium' }]}>{language[0][props.language].str_collateralCategory}</Text>
                    <Text style={[Commonstyles.inputtextStyle, { color: Colors.black, width: '50%', marginTop: 0.2 }]}>{item.collateralCategoryId}</Text>

                </View>

                <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>

                    <Text style={[Commonstyles.inputtextStyle, { color: Colors.mediumgrey, width: '50%', fontFamily: 'Poppins-Medium' }]}>{language[0][props.language].str_collateraltype.toUpperCase()}</Text>
                    <Text style={[Commonstyles.inputtextStyle, { color: Colors.black, width: '50%', marginTop: 0.2 }]}>{item.collateralTypeId}</Text>

                </View>

                <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>

                    <Text style={[Commonstyles.inputtextStyle, { color: Colors.mediumgrey, width: '50%', fontFamily: 'Poppins-Medium' }]}>{language[0][props.language].str_collateralvalue.toUpperCase()}</Text>
                    <Text style={[Commonstyles.inputtextStyle, { color: Colors.black, width: '50%', marginTop: 0.2 }]}>₹ {item.collateralValue}</Text>

                </View>

                <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>

                    <Text style={[Commonstyles.inputtextStyle, { color: Colors.mediumgrey, width: '50%', fontFamily: 'Poppins-Medium' }]}>{language[0][props.language].str_collateralutilization.toUpperCase()}</Text>
                    <Text style={[Commonstyles.inputtextStyle, { color: Colors.black, width: '50%', marginTop: 0.2 }]}>₹ {item.collateralUtilization}</Text>

                </View>

                <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>

                    <Text style={[Commonstyles.inputtextStyle, { color: Colors.mediumgrey, width: '50%', fontFamily: 'Poppins-Medium' }]}>{language[0][props.language].str_freecollateral.toUpperCase()}</Text>
                    <Text style={[Commonstyles.inputtextStyle, { color: Colors.black, width: '50%', marginTop: 0.2 }]}>₹ {item.freeCollateral}</Text>

                </View>

            </View>

        )

    }

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
                        textval={props.route.params.isLoan ? 'Existing Loan Details' : 'Collateral Details'}
                        props={props}
                        onGoBack={onGoBack}
                    />
                </View>

                <View style={{ width: '100%', marginBottom: 50 }}>
                    <FlatList
                        data={props.route.params.isLoan ? props.route.params.LoanData : props.route.params.CollateralData}
                        renderItem={props.route.params.isLoan ? LoanView : CollateralView}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>



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
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(ExistingLoanAndCollateralDetails);
