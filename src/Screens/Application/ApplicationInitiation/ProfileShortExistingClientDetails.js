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
import { deleteDedupe } from '../../../Utils/redux/actions/ProfileAction';
import ProgressComp from '../../../Components/ProgressComp';
import tbl_SystemMandatoryFields from '../../../Database/Table/tbl_SystemMandatoryFields';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Common from '../../../Utils/Common';
import tbl_SystemCodeDetails from '../../../Database/Table/tbl_SystemCodeDetails';
import TextInputComp from '../../../Components/TextInputComp';
import PickerComp from '../../../Components/PickerComp';
import ButtonViewComp from '../../../Components/ButtonViewComp';
import ErrorMessageModal from '../../../Components/ErrorMessageModal';
import { Directions } from 'react-native-gesture-handler';
import ChildHeadComp from '../../../Components/ChildHeadComp';
import CheckBoxComp from '../../../Components/CheckBoxComp';
import { useIsFocused } from '@react-navigation/native';

const ProfileShortExistingClientDetails = (props, { navigation }) => {
  const [loading, setLoading] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [mobileNumberCaption, setMobileNumberCaption] =
    useState('MOBILE NUMBER');
  const [mobileNumberMan, setMobileNumberMan] = useState(false);
  const [mobileNumberVisible, setMobileNumberVisible] = useState(true);
  const [mobileNumberDisable, setMobileNumberDisable] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
  const showBottomSheet = () => setBottomErrorSheetVisible(true);
  const hideBottomSheet = () => setBottomErrorSheetVisible(false);
  const mobileNumberRef = useRef(null);

  const [ClientID, setClientID] = useState('');
  const [ClientIDCaption, setClientIDCaption] = useState('Client ID');
  const [ClientIDMan, setClientIDMan] = useState(false);
  const [ClientIDVisible, setClientIDVisible] = useState(true);
  const [ClientIDDisable, setClientIDDisable] = useState(false);
  const ClientIDRef = useRef(null);
  const [ActiveBasicDetials, setActiveBasicDetials] = useState(true);
  const [ExistingLoanDetails, setExistingLoanDetails] = useState(false);

  const [CustomerSubCategoryMan, setCustomerSubCategoryMan] = useState(false);
  const [CustomerSubCategoryVisible, setCustomerSubCategoryVisible] =
    useState(true);
  const [CustomerSubCategoryDisable, setCustomerSubCategoryDisable] =
    useState(false);
  const [CustomerSubCategoryData, setCustomerSubCategoryData] = useState([]);
  const [CustomerSubCategoryCaption, setCustomerSubCategoryCaption] = useState(
    'CUSTOMER SUB CATEGORY',
  );
  const [CustomerSubCategoryLabel, setCustomerSubCategoryLabel] = useState('');
  const [CustomerSubCategoryIndex, setCustomerSubCategoryIndex] = useState('');

  const [KycType1Man, setKycType1Man] = useState(false);
  const [KycType1Visible, setKycType1Visible] = useState(true);
  const [KycType1Disable, setKycType1Disable] = useState(false);
  const [KycType1Data, setKycType1Data] = useState([]);
  const [KycType1Caption, setKycType1Caption] = useState('KYC TYPE 1');
  const [KycType1Label, setKycType1Label] = useState('');
  const [KycType1Index, setKycType1Index] = useState('');

  const [KycType2Caption, setKycType2Caption] = useState('KYC TYPE 2');
  const [KycType2Label, setKycType2Label] = useState('');
  const [KycType3Caption, setKycType3Caption] = useState('KYC TYPE 3');
  const [KycType3Label, setKycType3Label] = useState('');
  const [KycType4Caption, setKycType4Caption] = useState('KYC TYPE 4');
  const [KycType4Label, setKycType4Label] = useState('');

  //kycid1 -- TextInput
  const [kycID1, setkycID1] = useState('');
  const [kycID2, setkycID2] = useState('');
  const [kycID3, setkycID3] = useState('');
  const [kycID4, setkycID4] = useState('');
  const [kycID1Caption, setkycID1Caption] = useState('KYC ID 1');
  const [kycID2Caption, setkycID2Caption] = useState('KYC ID 2');
  const [kycID3Caption, setkycID3Caption] = useState('KYC ID 3');
  const [kycID4Caption, setkycID4Caption] = useState('KYC ID 4');
  const [kycID1Man, setkycID1Man] = useState(false);
  const [kycID1Visible, setkycID1Visible] = useState(true);
  const [kycID1Disable, setkycID1Disable] = useState(false);
  const KycID1Ref = useRef(null);

  const [Email, setEmail] = useState('');
  const [EmailCaption, setEmailCaption] = useState('EMAIL');
  const [EmailMan, setEmailMan] = useState(false);
  const [EmailVisible, setEmailVisible] = useState(true);
  const [EmailDisable, setEmailDisable] = useState(false);
  const EmailRef = useRef(null);

  const [CustomerName, setCustomerName] = useState('');
  const [CustomerNameCaption, setCustomerNameCaption] =
    useState('CUSTOMER NAME');
  const [CustomerNameMan, setCustomerNameMan] = useState(false);
  const [CustomerNameVisible, setCustomerNameVisible] = useState(true);
  const [CustomerNameDisable, setCustomerNameDisable] = useState(false);
  const CustomerNameRef = useRef(null);

  const [BranchID, setBranchID] = useState('');
  const [BranchIDCaption, setBranchIDCaption] = useState('BRANCH ID');
  const [BranchIDMan, setBranchIDMan] = useState(false);
  const [BranchIDVisible, setBranchIDVisible] = useState(true);
  const [BranchIDDisable, setBranchIDDisable] = useState(false);
  const BranchIDRef = useRef(null);

  const [BasicDetailsCaption, setBasicDetailsCaption] =
    useState('Basic Details');
  const [ExistingLoanDetailsCaption, setExistingLoanDetailsCaption] = useState(
    'Existing Loan Details',
  );

  const [apiError, setApiError] = useState('');
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const isScreenVisible = useIsFocused();

  const [existingData, setExistingData] = useState([]);

  const [leadsystemCodeDetail, setLeadSystemCodeDetail] = useState(props.mobilecodedetail.leadSystemCodeDto);
  const [systemCodeDetail, setSystemCodeDetail] = useState(props.mobilecodedetail.t_SystemCodeDetail);
  const [leaduserCodeDetail, setLeadUserCodeDetail] = useState(props.mobilecodedetail.leadUserCodeDto);
  const [userCodeDetail, setUserCodeDetail] = useState(props.mobilecodedetail.t_UserCodeDetail);
  const [bankUserCodeDetail, setBankUserCodeDetail] = useState(props.mobilecodedetail.t_BankUserCode);

  useEffect(() => {

    getExistingClientDetail();
    pickerData();

  }, [props.navigation]);

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

  const pickerData = async () => {
    const filteredCustomerSubCategoryData = leaduserCodeDetail
      .filter(data => data.masterId === 'CUSTOMER_SUBCATEGORY')
      .sort((a, b) => a.Description.localeCompare(b.Description));
    setCustomerSubCategoryData(filteredCustomerSubCategoryData);


    const filteredKYCData = bankUserCodeDetail
      .filter(data => data.ID === 'IndIdentitySettingID')
      .sort((a, b) => a.Description.localeCompare(b.Description));
    setKycType1Data(filteredKYCData);


  };

  const getExistingClientDetail = () => {
    //props.dedupeDetail.clientExistingDetails[0].lmsClientId 1105000055
    const clientDetail = props.loanInitiationDetails.filter(item => item.id === parseInt(global.LOANAPPLICATIONID))[0].clientDetail.find(client => client.id === parseInt(global.CLIENTID));

    const baseURL = '8100';
    setLoading(true);
    apiInstance(baseURL)
      .post(
        `/api/v1/lms-get-api/getDetailsByClientId/userID/${global.USERID}/clientId/${clientDetail.lmsClientId}`,
      )
      .then(async response => {
        // Handle the response data
        if (global.DEBUG_MODE) console.log('DedupeApiResponse::' + JSON.stringify(response.data));
        //await tbl_client.deleteAllClient();
        if (response.status == 200) {
          setLoading(false);
          if (response.data) {

            setExistingData(response.data)

            if (response.data.clientExistingDetails) {

              setClientID(response.data.clientExistingDetails[0].lmsClientId)
              setBranchID(response.data.clientExistingDetails[0].branchId)
              setCustomerName(response.data.clientExistingDetails[0].lmsCustomerName)
              setCustomerSubCategoryLabel(Common.getSystemCodeDescription(leaduserCodeDetail, 'CUSTOMER_SUBCATEGORY', response.data.clientExistingDetails[0].customerSubCategoryId))
              if (response.data.clientExistingDetails[0].kycTypeId1) {
                setKycType1Label(Common.getBankCodeDescription(bankUserCodeDetail, 'IndIdentitySettingID', response.data.clientExistingDetails[0].kycTypeId1))
                setkycID1(response.data.clientExistingDetails[0].kycIdValue1)
              }
              if (response.data.clientExistingDetails[0].kycTypeId2) {
                setKycType2Label(Common.getBankCodeDescription(bankUserCodeDetail, 'IndIdentitySettingID', response.data.clientExistingDetails[0].kycTypeId2))
                setkycID2(response.data.clientExistingDetails[0].kycIdValue2)
              }
              if (response.data.clientExistingDetails[0].kycTypeId3) {
                setKycType3Label(Common.getBankCodeDescription(bankUserCodeDetail, 'IndIdentitySettingID', response.data.clientExistingDetails[0].kycTypeId3))
                setkycID3(response.data.clientExistingDetails[0].kycIdValue3)
              }
              if (response.data.clientExistingDetails[0].kycTypeId4) {
                setKycType4Label(Common.getBankCodeDescription(bankUserCodeDetail, 'IndIdentitySettingID', response.data.clientExistingDetails[0].kycTypeId4))
                setkycID4(response.data.clientExistingDetails[0].kycIdValue4)
              }

            }

          }
        } else if (response.data.statusCode === 201) {
          setApiError(response.data.message);
          setErrorModalVisible(true);
          setLoading(false);
        } else if (response.data.statusCode === 202) {
          setApiError(response.data.message);
          setErrorModalVisible(true);
          setLoading(false);
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

  const onGoBack = () => {

    props.navigation.goBack();
  };

  const onButtonClick = () => {
    props.deleteDedupe();
    props.navigation.replace('ProfileShortBasicDetails');
  };


  const onClick = () => {
    setActiveBasicDetials(!ActiveBasicDetials);
  };

  const onClickExistingLoanDetails = (isCollateral, isLoan, LoanData, CollateralData) => {
    props.navigation.navigate('ExistingLoanAndCollateralDetails', { 'isCollateral': isCollateral, 'isLoan': isLoan, 'LoanData': LoanData, 'CollateralData': CollateralData })
    //setExistingLoanDetails(!ExistingLoanDetails);
  };



  return (
    // enclose all components in this View tag
    <SafeAreaView
      style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>
      <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
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
              textval={language[0][props.language].str_profileshort}
              props={props}
              onGoBack={onGoBack}
            />
          </View>
          <ChildHeadComp
            textval={global.CLIENTTYPE == 'APPL'
              ? language[0][props.language].str_applicantdetails
              : global.CLIENTTYPE == 'CO-APPL'
                ? language[0][props.language].str_coapplicantdetails
                : language[0][props.language].str_guarantordetails}
          />

          <View style={{ width: '100%', alignItems: 'center', marginTop: '3%' }}>
            <View style={{ width: '90%', marginTop: 3 }}>
              <TextComp
                textStyle={{
                  color: Colors.mediumgrey,
                  fontSize: 15,
                  fontFamily: 'Poppins-Medium'
                }}
                textVal={
                  language[0][props.language].str_existingclientdetails
                }></TextComp>
            </View>
          </View>

          <View
            style={{
              width: '100%',
              marginTop: 19,
              paddingHorizontal: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
              <TextComp
                textVal={ClientIDCaption}
                textStyle={[Commonstyles.inputtextStyle, { color: Colors.lightgrey }]}
                Visible={ClientIDMan}
              />
              <TextComp
                textVal={ClientID}
                textStyle={[Commonstyles.inputtextStyle, { color: Colors.black, fontSize: 14, marginTop: 3 }]}
                Visible={ClientIDMan}
              />
            </View>

          </View>

          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={onClick} activeOpacity={1}>
              <View
                style={{
                  width: '93%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <TextComp
                  textVal={BasicDetailsCaption}
                  textStyle={Commonstyles.HeaderStyle}
                />
                {ActiveBasicDetials ? (
                  <MaterialIcons
                    name="keyboard-arrow-up"
                    size={20}
                    color="#343434"
                  />
                ) : (
                  <MaterialIcons
                    name="keyboard-arrow-down"
                    size={20}
                    color="#343434"
                  />
                )}
              </View>
            </TouchableOpacity>
          </View>
          {ActiveBasicDetials ? (
            <View>
              {BranchID && (
                <View
                  style={{
                    width: '100%',
                    marginTop: 19,
                    paddingHorizontal: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                    <TextComp
                      textVal={BranchIDCaption}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.lightgrey }]}
                      Visible={BranchIDMan}
                    />

                    <TextComp
                      textVal={BranchID}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.black, fontSize: 14, marginTop: 3 }]}
                      Visible={ClientIDMan}
                    />

                  </View>

                </View>
              )}

              {CustomerName && (
                <View
                  style={{
                    width: '100%',
                    marginTop: 19,
                    paddingHorizontal: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                    <TextComp
                      textVal={CustomerNameCaption}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.lightgrey }]}
                      Visible={CustomerNameMan}
                    />

                    <TextComp
                      textVal={CustomerName}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.black, fontSize: 14, marginTop: 3 }]}
                      Visible={ClientIDMan}
                    />

                  </View>

                </View>
              )}

              {CustomerSubCategoryLabel && (
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    marginTop: '4%',
                  }}>
                  <View
                    style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                    <TextComp
                      textVal={CustomerSubCategoryCaption}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.lightgrey }]}
                      Visible={CustomerSubCategoryMan}
                    />
                  </View>

                  <TextComp
                    textVal={CustomerSubCategoryLabel}
                    textStyle={[Commonstyles.inputtextStyle, { color: Colors.black, fontSize: 14, marginTop: 3 }]}
                    Visible={ClientIDMan}
                  />
                </View>
              )}

              {KycType1Label && (
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    marginTop: '4%',
                  }}>
                  <View
                    style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                    <TextComp
                      textVal={KycType1Caption}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.lightgrey }]}
                      Visible={KycType1Man}
                    />

                    <TextComp
                      textVal={KycType1Label}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.black, fontSize: 14, marginTop: 3 }]}
                      Visible={ClientIDMan}
                    />

                  </View>


                </View>
              )}

              {KycType1Label && (
                <View
                  style={{
                    width: '100%',
                    marginTop: 19,
                    paddingHorizontal: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                    <TextComp
                      textVal={kycID1Caption}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.lightgrey }]}
                      Visible={kycID1Man}
                    />

                    <TextComp
                      textVal={kycID1}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.black, fontSize: 14, marginTop: 3 }]}
                      Visible={ClientIDMan}
                    />

                  </View>

                </View>
              )}

              {KycType2Label && (
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    marginTop: '4%',
                  }}>
                  <View
                    style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                    <TextComp
                      textVal={KycType2Caption}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.lightgrey }]}
                      Visible={KycType1Man}
                    />

                    <TextComp
                      textVal={KycType2Label}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.black, fontSize: 14, marginTop: 3 }]}
                      Visible={ClientIDMan}
                    />

                  </View>


                </View>
              )}

              {KycType2Label && (
                <View
                  style={{
                    width: '100%',
                    marginTop: 19,
                    paddingHorizontal: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                    <TextComp
                      textVal={kycID2Caption}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.lightgrey }]}
                      Visible={kycID1Man}
                    />

                    <TextComp
                      textVal={kycID2}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.black, fontSize: 14, marginTop: 3 }]}
                      Visible={ClientIDMan}
                    />

                  </View>

                </View>
              )}

              {KycType3Label && (
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    marginTop: '4%',
                  }}>
                  <View
                    style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                    <TextComp
                      textVal={KycType3Caption}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.lightgrey }]}
                      Visible={KycType1Man}
                    />

                    <TextComp
                      textVal={KycType3Label}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.black, fontSize: 14, marginTop: 3 }]}
                      Visible={ClientIDMan}
                    />

                  </View>


                </View>
              )}

              {KycType3Label && (
                <View
                  style={{
                    width: '100%',
                    marginTop: 19,
                    paddingHorizontal: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                    <TextComp
                      textVal={kycID3Caption}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.lightgrey }]}
                      Visible={kycID1Man}
                    />

                    <TextComp
                      textVal={kycID3}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.black, fontSize: 14, marginTop: 3 }]}
                      Visible={ClientIDMan}
                    />

                  </View>

                </View>
              )}

              {KycType4Label && (
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    marginTop: '4%',
                  }}>
                  <View
                    style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                    <TextComp
                      textVal={KycType4Caption}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.lightgrey }]}
                      Visible={KycType1Man}
                    />

                    <TextComp
                      textVal={KycType4Label}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.black, fontSize: 14, marginTop: 3 }]}
                      Visible={ClientIDMan}
                    />

                  </View>


                </View>
              )}

              {KycType4Label && (
                <View
                  style={{
                    width: '100%',
                    marginTop: 19,
                    paddingHorizontal: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                    <TextComp
                      textVal={kycID4Caption}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.lightgrey }]}
                      Visible={kycID1Man}
                    />

                    <TextComp
                      textVal={kycID4}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.black, fontSize: 14, marginTop: 3 }]}
                      Visible={ClientIDMan}
                    />

                  </View>

                </View>
              )}

              {mobileNumber && (
                <View
                  style={{
                    width: '100%',
                    marginTop: 19,
                    paddingHorizontal: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                    <TextComp
                      textVal={mobileNumberCaption}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.lightgrey }]}
                      Visible={mobileNumberMan}
                    />

                    <TextComp
                      textVal={mobileNumber}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.black, fontSize: 14, marginTop: 3 }]}
                      Visible={ClientIDMan}
                    />

                  </View>

                </View>
              )}

              {Email && (
                <View
                  style={{
                    width: '100%',
                    marginTop: 19,
                    paddingHorizontal: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                    <TextComp
                      textVal={EmailCaption}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.lightgrey }]}
                      Visible={EmailMan}
                    />

                    <TextComp
                      textVal={Email}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.black, fontSize: 14, marginTop: 3 }]}
                      Visible={ClientIDMan}
                    />

                  </View>

                </View>
              )}
            </View>
          ) : (
            <View></View>
          )}

          {existingData.clientExistingLoanDetails &&
            <View
              style={{
                width: '100%',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => { onClickExistingLoanDetails(false, true, existingData.clientExistingLoanDetails) }}
                activeOpacity={1}>
                <View
                  style={{
                    width: '93%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <TextComp
                    textVal={ExistingLoanDetailsCaption}
                    textStyle={Commonstyles.HeaderStyle}
                  />

                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={20}
                    color="#343434"
                  />

                </View>
              </TouchableOpacity>

            </View>
          }

          {existingData.clientExistingCollateralDetails &&
            <View
              style={{
                width: '100%',
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => { onClickExistingLoanDetails(true, false, [], existingData.clientExistingCollateralDetails) }}
                activeOpacity={1}>
                <View
                  style={{
                    width: '93%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 20,
                  }}>
                  <TextComp
                    textVal={'Collateral Details'}
                    textStyle={Commonstyles.HeaderStyle}
                  />

                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={20}
                    color="#343434"
                  />

                </View>
              </TouchableOpacity>
            </View>
          }

        </View>

        <ButtonViewComp
          textValue={language[0][props.language].str_next.toUpperCase()}
          textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
          viewStyle={Commonstyles.buttonView}
          innerStyle={Commonstyles.buttonViewInnerStyle}
          handleClick={onButtonClick}
        />
      </ScrollView>
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
    paddingBottom: 20,
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
  deleteDedupe: item => dispatch(deleteDedupe()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileShortExistingClientDetails);
