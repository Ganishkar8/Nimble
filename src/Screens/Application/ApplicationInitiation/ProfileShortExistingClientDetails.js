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
  const [ActiveBasicDetials, setActiveBasicDetials] = useState(false);
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
  const [KycType1Caption, setKycType1Caption] = useState('KYC TYPE');
  const [KycType1Label, setKycType1Label] = useState('');
  const [KycType1Index, setKycType1Index] = useState('');

  //kycid1 -- TextInput
  const [kycID1, setkycID1] = useState('');
  const [kycID1Caption, setkycID1Caption] = useState('KYC ID');
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

  const [existingClientDetail, setExistingClientDetail] = useState(props.dedupeDetail.clientExistingDetails);
  const [existingClientLoanDetail, setExistingClientLoanDetail] = useState(props.dedupeDetail.clientExistingLoanDetails);

  useEffect(() => {
    props.navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });

    pickerData();
    return () =>
      props.navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
  }, [navigation]);

  const pickerData = async () => {
    tbl_SystemCodeDetails
      .getSystemCodeDetailsBasedOnID('CustomerSubCategory')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);

          for (var i = 0; i < value.length; i++) {
            if (value[i].IsDefault === '1') {
              setCustomerSubCategoryLabel(value[i].SubCodeID);
              setCustomerSubCategoryIndex(i + 1);
            }
          }

          setCustomerSubCategoryData(value);
        }
      });

    tbl_SystemCodeDetails
      .getSystemCodeDetailsBasedOnID('KycType1')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);

          for (var i = 0; i < value.length; i++) {
            if (value[i].IsDefault === '1') {
              setKycType1Label(value[i].SubCodeID);
              setKycType1Index(i + 1);
            }
          }

          setKycType1Data(value);
        }
      });
  };

  const updateLeadDetails = () => {

    props.navigation.navigate('AadharOTPVerification', { aadharNumber: "717485993554" });

  };

  const validate = () => {
    var flag = false;
    var i = 1;
    var errorMessage = '';

    if (ClientIDMan && ClientIDVisible) {
      if (ClientID.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          ClientIDCaption +
          '\n';
        i++;
        flag = true;
      }
    }
    if (BranchIDMan && BranchIDVisible) {
      if (BranchID.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          BranchIDCaption +
          '\n';
        i++;
        flag = true;
      }
    }
    if (CustomerNameMan && CustomerNameVisible) {
      if (CustomerName.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          CustomerNameCaption +
          '\n';
        i++;
        flag = true;
      }
    }

    if (CustomerSubCategoryMan && CustomerSubCategoryVisible) {
      if (CustomerSubCategoryLabel.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsselect +
          CustomerSubCategoryCaption +
          '\n';
        i++;
        flag = true;
      }
    }

    if (KycType1Man && KycType1Visible) {
      if (KycType1Label.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsselect +
          KycType1Caption +
          '\n';
        i++;
        flag = true;
      }
    }

    if (kycID1Man && kycID1Visible) {
      if (kycID1.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          kycID1Caption +
          '\n';
        i++;
        flag = true;
      }
    }

    if (EmailMan && EmailVisible) {
      if (Email.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          EmailCaption +
          '\n';
        i++;
        flag = true;
      }
    }

    if (mobileNumberMan && mobileNumberVisible) {
      if (mobileNumber.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          mobileNumberCaption +
          '\n';
        i++;
        flag = true;
      } else if (!Common.isValidPhoneNumber(mobileNumber)) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsentervalid +
          mobileNumberCaption +
          '\n';
        i++;
        flag = true;
      }
    }

    setErrMsg(errorMessage);
    return flag;
  };

  const handleClick = (componentName, textValue) => {
    if (componentName === 'ClientID') {
      setClientID(textValue);
    } else if (componentName === 'kycID1') {
      setkycID1(textValue);
    } else if (componentName === 'Email') {
      setEmail(textValue);
    } else if (componentName === 'CustomerName') {
      setCustomerName(textValue);
    } else if (componentName === 'BranchID') {
      setBranchID(textValue);
    } else if (componentName === 'mobileNumber') {
      if (textValue.length > 0) {
        if (Common.numberRegex.test(textValue)) setMobileNumber(textValue);
      } else {
        setMobileNumber(textValue);
      }
    }
  };

  const handleReference = componentName => {
    if (componentName === 'ClientID') {
      BranchIDRef.current.focus();
    } else if (componentName === 'CustomerName') {
      KycID1Ref.current.focus();
    } else if (componentName === 'BranchID') {
      CustomerNameRef.current.focus();
    } else if (componentName === 'kycID1') {
      mobileNumberRef.current.focus();
    } else if (componentName === 'mobileNumber') {
      EmailRef.current.focus();
    }
  };

  const handlePickerClick = (componentName, label, index) => {
    if (componentName == 'CustomerSubCategoryPicker') {
      setCustomerSubCategoryLabel(label);
      setCustomerSubCategoryIndex(index);
    } else if (componentName == 'KycType1Picker') {
      setKycType1Label(label);
      setKycType1Index(index);
    }
  };

  const onClick = () => {
    setActiveBasicDetials(!ActiveBasicDetials);
  };

  const onClickExistingLoanDetails = () => {
    setExistingLoanDetails(!ExistingLoanDetails);
  };

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Loan 1',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Loan 2',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Laon 3',
    },
  ];

  const Item = ({ title }) => (
    <View style={Commonstyles.item}>
      <Text style={Commonstyles.HeaderStyle}>{title}</Text>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{ width: '50%', alignItems: 'left' }}>
            <Text style={Commonstyles.inputtextStyle}>{title}</Text>
          </View>

          <View style={{ width: '50%', alignItems: 'left' }}>
            <Text style={Commonstyles.inputtextStyle}>{title}</Text>
          </View>
        </View>
      </View>
    </View>
  );
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
            />
          </View>
          <ChildHeadComp
            textval={language[0][props.language].str_applicantdetails}
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

          {ClientIDVisible && (
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
                  textVal={existingClientDetail.lmsClientId}
                  textStyle={[Commonstyles.inputtextStyle, { color: Colors.black, fontSize: 14, marginTop: 3 }]}
                  Visible={ClientIDMan}
                />
              </View>

            </View>
          )}

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
              {BranchIDVisible && (
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
                      textVal={existingClientDetail.branchId}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.black, fontSize: 14, marginTop: 3 }]}
                      Visible={ClientIDMan}
                    />

                  </View>

                </View>
              )}

              {CustomerNameVisible && (
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
                      textVal={existingClientDetail.lmsCustomerName}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.black, fontSize: 14, marginTop: 3 }]}
                      Visible={ClientIDMan}
                    />

                  </View>

                </View>
              )}

              {CustomerSubCategoryVisible && (
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

                  <PickerComp
                    textLabel={CustomerSubCategoryLabel}
                    pickerStyle={Commonstyles.picker}
                    Disable={CustomerSubCategoryDisable}
                    pickerdata={CustomerSubCategoryData}
                    componentName="CustomerSubCategoryPicker"
                    handlePickerClick={handlePickerClick}
                  />
                </View>
              )}

              {KycType1Visible && (
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
                  </View>

                  <PickerComp
                    textLabel={KycType1Label}
                    pickerStyle={Commonstyles.picker}
                    Disable={KycType1Disable}
                    pickerdata={KycType1Data}
                    componentName="KycType1Picker"
                    handlePickerClick={handlePickerClick}
                  />
                </View>
              )}

              {kycID1Visible && (
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
                      textVal={existingClientDetail.kycTypeId1}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.black, fontSize: 14, marginTop: 3 }]}
                      Visible={ClientIDMan}
                    />

                  </View>

                </View>
              )}

              {mobileNumberVisible && (
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
                      textVal={existingClientDetail.mobileNumber}
                      textStyle={[Commonstyles.inputtextStyle, { color: Colors.black, fontSize: 14, marginTop: 3 }]}
                      Visible={ClientIDMan}
                    />

                  </View>

                </View>
              )}

              {EmailVisible && (
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
                      textVal={existingClientDetail.emailId}
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

          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={onClickExistingLoanDetails}
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
                {ExistingLoanDetails ? (
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
          {ExistingLoanDetails ? (
            <View style={{ width: '100%' }}>
              <FlatList
                data={existingClientLoanDetail}
                renderItem={({ item, index }) => {
                  return (

                    <View style={{ width: '90%', alignSelf: 'center' }}>

                      <Text style={{ color: Colors.black, fontSize: 16, fontFamily: 'Poppins-Medium', marginTop: 14 }}>{`Loan ${index + 1}`}</Text>

                      <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>

                        <Text style={[Commonstyles.inputtextStyle, { color: Colors.mediumgrey, width: '50%', fontFamily: 'Poppins-Medium' }]}>{language[0][props.language].str_accopendate}</Text>
                        <Text style={[Commonstyles.inputtextStyle, { color: Colors.black, width: '50%', marginTop: 0.2 }]}>{item.accountOpenedDate}</Text>

                      </View>

                      <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>

                        <Text style={[Commonstyles.inputtextStyle, { color: Colors.mediumgrey, width: '50%', fontFamily: 'Poppins-Medium' }]}>{language[0][props.language].str_loantype.toUpperCase()}</Text>
                        <Text style={[Commonstyles.inputtextStyle, { color: Colors.black, width: '50%', marginTop: 0.2 }]}>{item.loanTypeId}</Text>

                      </View>

                      <View style={{ flexDirection: 'row', width: '100%', marginTop: 10 }}>

                        <Text style={[Commonstyles.inputtextStyle, { color: Colors.mediumgrey, width: '50%', fontFamily: 'Poppins-Medium' }]}>{language[0][props.language].str_productId.toUpperCase()}</Text>
                        <Text style={[Commonstyles.inputtextStyle, { color: Colors.black, width: '50%', marginTop: 0.2 }]}>{item.productId}</Text>

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
                        <Text style={[Commonstyles.inputtextStyle, { color: Colors.black, width: '50%', marginTop: 0.2 }]}>{item.loanAssetClassification}</Text>

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

                }
                keyExtractor={item => item.id}
              />
            </View>
          ) : (
            <View></View>
          )}
        </View>

        <ButtonViewComp
          textValue={language[0][props.language].str_next.toUpperCase()}
          textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
          viewStyle={Commonstyles.buttonView}
          innerStyle={Commonstyles.buttonViewInnerStyle}
          handleClick={updateLeadDetails}
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
  return {
    language: language,
    profiledetail: profileDetails,
    mobilecodedetail: mobileCodeDetails,
    dedupeDetail: dedupeDetails
  }
}

const mapDispatchToProps = dispatch => ({
  languageAction: item => dispatch(languageAction(item)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileShortExistingClientDetails);
