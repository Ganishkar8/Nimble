import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  Button,
} from 'react-native';
import apiInstance from '../../../Utils/apiInstance';
import apiInstancelocal from '../../../Utils/apiInstancelocal';
import Colors from '../../../Utils/Colors';
import MyStatusBar from '../../../Components/ MyStatusBar';
import Loading from '../../../Components/Loading';
import TextComp from '../../../Components/TextComp';
import {connect} from 'react-redux';
import {languageAction} from '../../../Utils/redux/actions/languageAction';
import {language} from '../../../Utils/LanguageString';
import Commonstyles from '../../../Utils/Commonstyles';
import HeadComp from '../../../Components/HeadComp';
import ProgressComp from '../../../Components/ProgressComp';
import tbl_SystemMandatoryFields from '../../../Database/Table/tbl_SystemMandatoryFields';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Common from '../../../Utils/Common';
import tbl_SystemCodeDetails from '../../../Database/Table/tbl_SystemCodeDetails';
import TextInputComp from '../../../Components/TextInputComp';
import PickerComp from '../../../Components/PickerComp';
import ButtonViewComp from '../../../Components/ButtonViewComp';
import ErrorMessageModal from '../../../Components/ErrorMessageModal';
import {Directions} from 'react-native-gesture-handler';
import ChildHeadComp from '../../../Components/ChildHeadComp';
import CheckBoxComp from '../../../Components/CheckBoxComp';
import DocumentPicker from 'react-native-document-picker';

const ProfileShortBasicDetails = (props, {navigation}) => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
  const showBottomSheet = () => setBottomErrorSheetVisible(true);
  const hideBottomSheet = () => setBottomErrorSheetVisible(false);
  const [KYC1Caption, setKYC1Caption] = useState('KYC 1');
  const [KYC1, setKYC1] = useState(false);
  const [KYC2Caption, setKYC2Caption] = useState('KYC 2');
  const [KYC2, setKYC2] = useState(false);

  const [LoanApplicationID, setLoanApplicationID] = useState('');
  const [LoanApplicationIDCaption, setLoanApplicationIDCaption] = useState(
    'Loan APPLICATION ID',
  );
  const [LoanApplicationIDMan, setLoanApplicationIDMan] = useState(false);
  const [LoanApplicationIDVisible, setLoanApplicationIDVisible] =
    useState(true);
  const [LoanApplicationIDDisable, setLoanApplicationIDDisable] =
    useState(false);
  const LoanApplicationIDRef = useRef(null);

  const [KycTypeMan, setKycTypeMan] = useState(false);
  const [KycTypeVisible, setKycTypeVisible] = useState(true);
  const [KycTypeDisable, setKycTypeDisable] = useState(false);
  const [KycTypeData, setKycTypeData] = useState([]);
  const [KycTypeCaption, setKycTypeCaption] = useState('KYC TYPE1');
  const [KycTypeLabel, setKycTypeLabel] = useState('');
  const [KycTypeIndex, setKycTypeIndex] = useState('');

  const [KycType1Man, setKycType1Man] = useState(false);
  const [KycType1Visible, setKycType1Visible] = useState(true);
  const [KycType1Disable, setKycType1Disable] = useState(false);
  const [KycType1Data, setKycType1Data] = useState([]);
  const [KycType1Caption, setKycType1Caption] = useState('KYC TYPE1');
  const [KycType1Label, setKycType1Label] = useState('');
  const [KycType1Index, setKycType1Index] = useState('');

  const [KycType2Man, setKycType2Man] = useState(false);
  const [KycType2Visible, setKycType2Visible] = useState(true);
  const [KycType2Disable, setKycType2Disable] = useState(false);
  const [KycType2Data, setKycType2Data] = useState([]);
  const [KycType2Caption, setKycType2Caption] = useState('KYC TYPE2');
  const [KycType2Label, setKycType2Label] = useState('');
  const [KycType2Index, setKycType2Index] = useState('');

  const [kycID, setkycID] = useState('');
  const [kycIDCaption, setkycIDCaption] = useState('KYC ID');
  const [kycIDMan, setkycIDMan] = useState(false);
  const [kycIDVisible, setkycIDVisible] = useState(true);
  const [kycIDDisable, setkycIDDisable] = useState(false);
  const KycIDRef = useRef(null);

  const [kycID1, setkycID1] = useState('');
  const [kycID1Caption, setkycID1Caption] = useState('KYC ID1');
  const [kycID1Man, setkycID1Man] = useState(false);
  const [kycID1Visible, setkycID1Visible] = useState(true);
  const [kycID1Disable, setkycID1Disable] = useState(false);
  const KycID1Ref = useRef(null);

  const [kycID2, setkycID2] = useState('');
  const [kycID2Caption, setkycID2Caption] = useState('KYC ID1');
  const [kycID2Man, setkycID2Man] = useState(false);
  const [kycID2Visible, setkycID2Visible] = useState(true);
  const [kycID2Disable, setkycID2Disable] = useState(false);
  const KycID2Ref = useRef(null);

  const [KycSourceMan, setKycSourceMan] = useState(false);
  const [KycSourceVisible, setKycSourceVisible] = useState(true);
  const [KycSourceDisable, setKycSourceDisable] = useState(false);
  const [KycSourceData, setKycSourceData] = useState([]);
  const [KycSourceCaption, setKycSourceCaption] = useState('KYC SOURCE');
  const [KycSourceLabel, setKycSourceLabel] = useState('');
  const [KycSourceIndex, setKycSourceIndex] = useState('');

  const [selectedDocument, setSelectedDocument] = useState(null);

  useEffect(() => {
    props.navigation
      .getParent()
      ?.setOptions({tabBarStyle: {display: 'none'}, tabBarVisible: false});
    makeSystemMandatoryFields();
    pickerData();

    return () =>
      props.navigation
        .getParent()
        ?.setOptions({tabBarStyle: undefined, tabBarVisible: undefined});
  }, [navigation]);

  const pickerData = async () => {
    tbl_SystemCodeDetails
      .getSystemCodeDetailsBasedOnID('KycSource')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);

          for (var i = 0; i < value.length; i++) {
            if (value[i].IsDefault === '1') {
              setKycSourceLabel(value[i].SubCodeID);
              setKycSourceIndex(i + 1);
            }
          }

          setKycSourceData(value);
        }
      });

    tbl_SystemCodeDetails
      .getSystemCodeDetailsBasedOnID('KycType')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);

          for (var i = 0; i < value.length; i++) {
            if (value[i].IsDefault === '1') {
              setKycTypeLabel(value[i].SubCodeID);
              setKycTypeIndex(i + 1);
            }
          }

          setKycTypeData(value);
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

    tbl_SystemCodeDetails
      .getSystemCodeDetailsBasedOnID('KycType2')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);

          for (var i = 0; i < value.length; i++) {
            if (value[i].IsDefault === '1') {
              setKycType2Label(value[i].SubCodeID);
              setKycType2Index(i + 1);
            }
          }

          setKycType2Data(value);
        }
      });
  };

  const makeSystemMandatoryFields = () => {
    tbl_SystemMandatoryFields
      .getSystemMandatoryFieldsBasedOnFieldUIID('sp_loanapplicationid')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);
          setLoanApplicationIDCaption(value[0].FieldName);
          if (value[0].IsMandatory == '1') {
            setLoanApplicationIDMan(true);
          }
          if (value[0].IsHide == '1') {
            setLoanApplicationIDVisible(false);
          }
          if (value[0].IsDisable == '1') {
            setLoanApplicationIDDisable(true);
          }
          if (value[0].IsCaptionChange == '1') {
            setLoanApplicationIDCaption(value[0].FieldCaptionChange);
          }
        }
      });

    tbl_SystemMandatoryFields
      .getSystemMandatoryFieldsBasedOnFieldUIID('sp_kycsource')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);
          setKycSourceCaption(value[0].FieldName);
          if (value[0].IsMandatory == '1') {
            setKycSourceMan(true);
          }
          if (value[0].IsHide == '1') {
            setKycSourceVisible(false);
          }
          if (value[0].IsDisable == '1') {
            setKycSourceDisable(true);
          }
          if (value[0].IsCaptionChange == '1') {
            setKycSourceCaption(value[0].FieldCaptionChange);
          }
        }
      });

    tbl_SystemMandatoryFields
      .getSystemMandatoryFieldsBasedOnFieldUIID('sp_kyctype')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);
          setKycTypeCaption(value[0].FieldName);
          if (value[0].IsMandatory == '1') {
            setKycTypeMan(true);
          }
          if (value[0].IsHide == '1') {
            setKycTypeVisible(false);
          }
          if (value[0].IsDisable == '1') {
            setKycTypeDisable(true);
          }
          if (value[0].IsCaptionChange == '1') {
            setKycTypeCaption(value[0].FieldCaptionChange);
          }
        }
      });

    tbl_SystemMandatoryFields
      .getSystemMandatoryFieldsBasedOnFieldUIID('sp_kyctype1')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);
          setKycType1Caption(value[0].FieldName);
          if (value[0].IsMandatory == '1') {
            setKycType1Man(true);
          }
          if (value[0].IsHide == '1') {
            setKycType1Visible(false);
          }
          if (value[0].IsDisable == '1') {
            setKycType1Disable(true);
          }
          if (value[0].IsCaptionChange == '1') {
            setKycType1Caption(value[0].FieldCaptionChange);
          }
        }
      });

    tbl_SystemMandatoryFields
      .getSystemMandatoryFieldsBasedOnFieldUIID('sp_kyctype2')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);
          setKycType2Caption(value[0].FieldName);
          if (value[0].IsMandatory == '1') {
            setKycType2Man(true);
          }
          if (value[0].IsHide == '1') {
            setKycType2Visible(false);
          }
          if (value[0].IsDisable == '1') {
            setKycType2Disable(true);
          }
          if (value[0].IsCaptionChange == '1') {
            setKycType2Caption(value[0].FieldCaptionChange);
          }
        }
      });

    tbl_SystemMandatoryFields
      .getSystemMandatoryFieldsBasedOnFieldUIID('sp_kycid')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);
          setkycIDCaption(value[0].FieldName);
          if (value[0].IsMandatory == '1') {
            setkycIDMan(true);
          }
          if (value[0].IsHide == '1') {
            setkycIDVisible(false);
          }
          if (value[0].IsDisable == '1') {
            setkycIDDisable(true);
          }
          if (value[0].IsCaptionChange == '1') {
            setkycIDCaption(value[0].FieldCaptionChange);
          }
        }
      });

    tbl_SystemMandatoryFields
      .getSystemMandatoryFieldsBasedOnFieldUIID('et_kycID1')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);
          setkycID1Caption(value[0].FieldName);
          if (value[0].IsMandatory == '1') {
            setkycID1Man(true);
          }
          if (value[0].IsHide == '1') {
            setkycID1Visible(false);
          }
          if (value[0].IsDisable == '1') {
            setkycID1Disable(true);
          }
          if (value[0].IsCaptionChange == '1') {
            setkycID1Caption(value[0].FieldCaptionChange);
          }
        }
      });

    tbl_SystemMandatoryFields
      .getSystemMandatoryFieldsBasedOnFieldUIID('et_kycID2')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);
          setkycID2Caption(value[0].FieldName);
          if (value[0].IsMandatory == '1') {
            setkycID2Man(true);
          }
          if (value[0].IsHide == '1') {
            setkycID2Visible(false);
          }
          if (value[0].IsDisable == '1') {
            setkycID2Disable(true);
          }
          if (value[0].IsCaptionChange == '1') {
            setkycID2Caption(value[0].FieldCaptionChange);
          }
        }
      });
  };

  const buttonNext = () => {
    if (validate()) {
      showBottomSheet();
    } else {
      const appDetails = {
        createdBy: global.USERID,
        createdOn: '',
        isActive: true,
        branchId: 1180,
        leadCreationBasicDetails: {
          createdBy: global.USERID,
          createdOn: '',
          customerCategoryId: 5,
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          mobileNumber: 7647865789,
        },
        leadCreationBusinessDetails: {},
        leadCreationLoanDetails: {},
        leadCreationDms: {},
      };
      const baseURL = '8901';
      setLoading(true);
      apiInstancelocal(baseURL)
        .post('/api/v1/lead-creation-initiation', appDetails)
        .then(async response => {
          // Handle the response data
          console.log(
            'LeadCreationBasicApiResponse::' + JSON.stringify(response.data),
          );
          global.leadID = response.data.id;
          setLoading(false);
          props.navigation.navigate('LeadCreationBusiness');
        })
        .catch(error => {
          // Handle the error
          console.log('Error' + JSON.stringify(error.response));
          setLoading(false);
          alert(error);
        });
    }
  };

  const validate = () => {
    var flag = false;
    var i = 1;
    var errorMessage = '';

    if (LoanApplicationIDMan && LoanApplicationIDVisible) {
      if (LoanApplicationID.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          LoanApplicationIDCaption +
          '\n';
        i++;
        flag = true;
      }
    }

    if (KycSourceMan && KycSourceVisible) {
      if (KycSourceLabel.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsselect +
          KycSourceCaption +
          '\n';
        i++;
        flag = true;
      }
    }

    if (KycTypeMan && KycTypeVisible) {
      if (KycTypeLabel.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsselect +
          KycTypeCaption +
          '\n';
        i++;
        flag = true;
      }
    }

    if (kycIDMan && kycIDVisible) {
      if (kycID.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          kycIDCaption +
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

    if (kycID2Man && kycID2Visible) {
      if (kycID2.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          kycID2Caption +
          '\n';
        i++;
        flag = true;
      }
    }
    setErrMsg(errorMessage);
    return flag;
  };

  const handleClick = (componentName, textValue) => {
    if (componentName === 'LoanApplicationID') {
      setLoanApplicationID(textValue);
    } else if (componentName === 'kycID') {
      setkycID(textValue);
    } else if (componentName === 'kycID1') {
      setkycID1(textValue);
    } else if (componentName === 'kycID2') {
      setkycID2(textValue);
    }
  };

  const handleReference = componentName => {
    if (componentName === 'LoanApplicationID') {
      KycIDRef.current.focus();
    } else if (componentName === 'kycID') {
      KycID1Ref.current.focus();
    } else if (componentName === 'kycID1') {
      KycID2Ref.current.focus();
    } else if (componentName === 'kycID2') {
      mobileNumberRef.current.focus();
    }
  };

  const handlePickerClick = (componentName, label, index) => {
    if (componentName == 'KycSourcePicker') {
      setKycSourceLabel(label);
      setKycSourceIndex(index);
    } else if (componentName == 'KycTypePicker') {
      setKycTypeLabel(label);
      setKycTypeIndex(index);
    } else if (componentName == 'KycType1Picker') {
      setKycType1Label(label);
      setKycType1Index(index);
    } else if (componentName == 'KycType2Picker') {
      setKycType2Label(label);
      setKycType2Index(index);
    }
  };

  const onClick = () => {
    setKYC1(!KYC1);
  };
  const onClickKYC2 = () => {
    setKYC2(!KYC2);
  };
  const onClickVerify = () => {
    alert('Hii');
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      setSelectedDocument(result);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };
  return (
    // enclose all components in this View tag
    <SafeAreaView
      style={[styles.parentView, {backgroundColor: Colors.lightwhite}]}>
      <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {loading ? <Loading /> : null}
        <View style={{flex: 1}}>
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

          <View style={{width: '100%', alignItems: 'center', marginTop: '3%'}}>
            <View style={{width: '90%', marginTop: 3}}>
              <TextComp
                textStyle={{
                  color: Colors.mediumgrey,
                  fontSize: 15,
                  fontWeight: '500',
                }}
                textVal={
                  language[0][props.language].str_kycverificationstatus
                }></TextComp>

              <ProgressComp progressvalue={0.5} textvalue="2 of 4" />
            </View>
          </View>

          {LoanApplicationIDVisible && (
            <View
              style={{
                width: '100%',
                marginTop: 19,
                paddingHorizontal: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{width: '90%', marginTop: 3, paddingHorizontal: 0}}>
                <TextComp
                  textVal={LoanApplicationIDCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={LoanApplicationIDMan}
                />
              </View>

              <TextInputComp
                textValue={LoanApplicationID}
                textStyle={Commonstyles.textinputtextStyle}
                type="numeric"
                Disable={LoanApplicationIDDisable}
                ComponentName="LoanApplicationID"
                reference={LoanApplicationIDRef}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
              />
            </View>
          )}

          {KycSourceVisible && (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: '4%',
              }}>
              <View style={{width: '90%', marginTop: 3, paddingHorizontal: 0}}>
                <TextComp
                  textVal={KycSourceCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={KycSourceMan}
                />
              </View>

              <PickerComp
                textLabel={KycSourceLabel}
                pickerStyle={Commonstyles.picker}
                Disable={KycSourceDisable}
                pickerdata={KycSourceData}
                componentName="KycSourcePicker"
                handlePickerClick={handlePickerClick}
              />
            </View>
          )}

          {KycTypeVisible && (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: '4%',
              }}>
              <View style={{width: '90%', marginTop: 3, paddingHorizontal: 0}}>
                <TextComp
                  textVal={KycTypeCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={KycTypeMan}
                />
              </View>

              <PickerComp
                textLabel={KycTypeLabel}
                pickerStyle={Commonstyles.picker}
                Disable={KycTypeDisable}
                pickerdata={KycTypeData}
                componentName="KycTypePicker"
                handlePickerClick={handlePickerClick}
              />
            </View>
          )}

          {kycIDVisible && (
            <View
              style={{
                width: '100%',
                marginTop: 19,
                paddingHorizontal: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{width: '90%', marginTop: 3, paddingHorizontal: 0}}>
                <TextComp
                  textVal={kycIDCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={kycIDMan}
                />
              </View>

              <TextInputComp
                textValue={kycID}
                textStyle={Commonstyles.textinputtextStyle}
                type="email-address"
                Disable={kycIDDisable}
                ComponentName="kycID"
                reference={KycIDRef}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
              />
              <View
                style={{
                  width: '100%',
                  marginTop: 19,
                  paddingHorizontal: 0,
                  alignItems: 'right',
                  justifyContent: 'right',
                }}></View>
            </View>
          )}

          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '90%',
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <TouchableOpacity onPress={pickDocument} activeOpacity={0}>
                <FontAwesome6 name="cloud-arrow-up" size={35} color="#b5b6b6" />
              </TouchableOpacity>
              <Text style={{marginLeft: 70}}>
                {selectedDocument?.name || 'None'}
              </Text>
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
                  width: '90%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <TextComp
                  textVal={KYC1Caption}
                  textStyle={Commonstyles.HeaderStyle}
                />
                {KYC1 ? (
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
          {KYC1 ? (
            <View>
              {KycType1Visible && (
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    marginTop: '4%',
                  }}>
                  <View
                    style={{width: '90%', marginTop: 3, paddingHorizontal: 0}}>
                    <TextComp
                      textVal={KycType1Caption}
                      textStyle={Commonstyles.inputtextStyle}
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
                    style={{width: '90%', marginTop: 3, paddingHorizontal: 0}}>
                    <TextComp
                      textVal={kycID1Caption}
                      textStyle={Commonstyles.inputtextStyle}
                      Visible={kycID1Man}
                    />
                  </View>

                  <TextInputComp
                    textValue={kycID1}
                    textStyle={Commonstyles.textinputtextStyle}
                    type="email-address"
                    Disable={kycID1Disable}
                    ComponentName="kycID1"
                    reference={KycID1Ref}
                    returnKey="next"
                    handleClick={handleClick}
                    handleReference={handleReference}
                  />
                  <View
                    style={{
                      width: '100%',
                      marginTop: 19,
                      paddingHorizontal: 0,
                      alignItems: 'right',
                      justifyContent: 'right',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          width: '80%',
                          color: 'green',
                        }}></View>
                      <View
                        style={{
                          width: '20%',
                          marginTop: 3,
                          color: 'green',
                        }}>
                        <TouchableOpacity
                          onPress={onClickVerify}
                          activeOpacity={0}>
                          <Text
                            style={{
                              color: Colors.green,
                            }}>
                            Verified
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
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
            <TouchableOpacity onPress={onClickKYC2} activeOpacity={1}>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 20,
                }}>
                <TextComp
                  textVal={KYC2Caption}
                  textStyle={Commonstyles.HeaderStyle}
                />
                {KYC2 ? (
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
          {KYC2 ? (
            <View>
              {KycType2Visible && (
                <View
                  style={{
                    width: '100%',
                    alignItems: 'center',
                    marginTop: '4%',
                  }}>
                  <View
                    style={{width: '90%', marginTop: 3, paddingHorizontal: 0}}>
                    <TextComp
                      textVal={KycType2Caption}
                      textStyle={Commonstyles.inputtextStyle}
                      Visible={KycType2Man}
                    />
                  </View>

                  <PickerComp
                    textLabel={KycType2Label}
                    pickerStyle={Commonstyles.picker}
                    Disable={KycType2Disable}
                    pickerdata={KycType2Data}
                    componentName="KycType2Picker"
                    handlePickerClick={handlePickerClick}
                  />
                </View>
              )}
              {kycID2Visible && (
                <View
                  style={{
                    width: '100%',
                    marginTop: 19,
                    paddingHorizontal: 0,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <View
                    style={{width: '90%', marginTop: 3, paddingHorizontal: 0}}>
                    <TextComp
                      textVal={kycID2Caption}
                      textStyle={Commonstyles.inputtextStyle}
                      Visible={kycID2Man}
                    />
                  </View>

                  <TextInputComp
                    textValue={kycID2}
                    textStyle={Commonstyles.textinputtextStyle}
                    type="email-address"
                    Disable={kycID2Disable}
                    ComponentName="kycID2"
                    reference={KycID2Ref}
                    returnKey="next"
                    handleClick={handleClick}
                    handleReference={handleReference}
                  />
                  <View
                    style={{
                      width: '100%',
                      marginTop: 19,
                      paddingHorizontal: 0,
                      alignItems: 'right',
                      justifyContent: 'right',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          width: '80%',
                          color: 'green',
                        }}></View>
                      <View
                        style={{
                          width: '20%',
                          marginTop: 3,
                          color: 'green',
                        }}>
                        <TouchableOpacity
                          onPress={onClickVerify}
                          activeOpacity={0}>
                          <Text
                            style={{
                              color: Colors.green,
                            }}>
                            Verified
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </View>
          ) : (
            <View></View>
          )}
        </View>

        <ButtonViewComp
          textValue={language[0][props.language].str_next.toUpperCase()}
          textStyle={{color: Colors.white, fontSize: 13, fontWeight: 500}}
          viewStyle={Commonstyles.buttonView}
          innerStyle={Commonstyles.buttonViewInnerStyle}
          handleClick={buttonNext}
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

const mapStateToProps = state => {
  const {language} = state.languageReducer;
  return {
    language: language,
  };
};

const mapDispatchToProps = dispatch => ({
  languageAction: item => dispatch(languageAction(item)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileShortBasicDetails);
