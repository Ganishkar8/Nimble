import { View, ScrollView, SafeAreaView, Text, BackHandler } from 'react-native';
import { React, useState, useRef, useEffect } from 'react';
import MyStatusBar from '../../../Components/MyStatusBar';
import HeadComp from '../../../Components/HeadComp';
import { connect } from 'react-redux';
import { languageAction } from '../../../Utils/redux/actions/languageAction';
import { language } from '../../../Utils/LanguageString';
import Commonstyles from '../../../Utils/Commonstyles';
import Colors from '../../../Utils/Colors';
import Loading from '../../../Components/Loading';
import ErrorMessageModal from '../../../Components/ErrorMessageModal';
import SystemMandatoryField from '../../../Components/SystemMandatoryField';
import ButtonViewComp from '../../../Components/ButtonViewComp';
import { validateData } from '../../../Components/helpers/validateData';
import ProgressComp from '../../../Components/ProgressComp';
import ChildHeadComp from '../../../Components/ChildHeadComp';
import commonstyles from '../../../Utils/Commonstyles';
import ErrorModal from '../../../Components/ErrorModal';
import TextComp from '../../../Components/TextComp';
import PickerComp from '../../../Components/PickerComp';
import TextInputComp from '../../../Components/TextInputComp';

const BankDetails = (props, { navigation }) => {
  const [loading, setLoading] = useState(false);
  const [DataArray, setNewDataArray] = useState([]);
  const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
  const showBottomSheet = () => setBottomErrorSheetVisible(true);
  const hideBottomSheet = () => setBottomErrorSheetVisible(false);
  const [errMsg, setErrMsg] = useState('');

  const [accountTypeLabel, setAccountTypeLabel] = useState('');
  const [accountTypeIndex, setAccountTypeIndex] = useState('');
  const [accountTypeCaption, setAccountTypeCaption] = useState('ACCOUNT TYPE');
  const [accountTypeMan, setAccountTypeMan] = useState(true);
  const [accountTypeVisible, setAccountTypeVisible] = useState(true);
  const [accountTypeDisable, setAccountTypeDisable] = useState(false);
  const [accountTypeData, setAccountTypeData] = useState([]);

  const [accountHolderName, setAccountHolderName] = useState('');
  const [accountHolderNameCaption, setAccountHolderNameCaption] = useState('ACCOUNT HOLDER NAME AS PER BANK');
  const [accountHolderNameMan, setAccountHolderNameMan] = useState(true);
  const [accountHolderNameVisible, setAccountHolderNameVisible] = useState(true);
  const [accountHolderNameDisable, setAccountHolderNameDisable] = useState(false);
  const accountHolderRef = useRef(null);

  const [ifscCode, setIFSCCode] = useState('');
  const [ifscCodeCaption, setIFSCCodeCaption] = useState('ACCOUNT HOLDER NAME AS PER BANK');
  const [ifscCodeMan, setIFSCCodeMan] = useState(true);
  const [ifscCodeVisible, setIFSCCodeVisible] = useState(true);
  const [ifscCodeDisable, setIFSCCodeDisable] = useState(false);
  const ifscCodeRef = useRef(null);

  const [bankName, setBankName] = useState('');
  const [bankNameCaption, setBankNameCaption] = useState('BANK NAME');
  const [bankNameMan, setBankNameMan] = useState(true);
  const [bankNameVisible, setBankNameVisible] = useState(true);
  const [bankNameDisable, setBankNameDisable] = useState(false);
  const bankNameRef = useRef(null);

  const [branchName, setBranchName] = useState('');
  const [branchNameCaption, setBranchNameCaption] = useState('BRANCH NAME');
  const [branchNameMan, setBranchNameMan] = useState(true);
  const [branchNameVisible, setBranchNameVisible] = useState(true);
  const [branchNameDisable, setBranchNameDisable] = useState(false);
  const branchNameRef = useRef(null);

  const [accountNumber, setAccountNumber] = useState('');
  const [accountNumberCaption, setAccountNumberCaption] = useState('ACCOUNT NUMBER');
  const [accountNumberMan, setAccountNumberMan] = useState(true);
  const [accountNumberVisible, setAccountNumberVisible] = useState(true);
  const [accountNumberDisable, setAccountNumberDisable] = useState(false);
  const accountNumberRef = useRef(null);

  const [confirmaccountNumber, setConfirmAccountNumber] = useState('');
  const [confirmaccountNumberCaption, setConfirmAccountNumberCaption] = useState('ACCOUNT NUMBER');
  const [confirmaccountNumberMan, setConfirmAccountNumberMan] = useState(true);
  const [confirmaccountNumberVisible, setConfirmAccountNumberVisible] = useState(true);
  const [confirmaccountNumberDisable, setConfirmAccountNumberDisable] = useState(false);
  const confirmaccountNumberRef = useRef(null);

  const [bankLinkedNumber, setBankLinkedNumber] = useState('');
  const [bankLinkedNumberCaption, setBankLinkedNumberCaption] = useState('BANK LINKED MOBILE NUMBER');
  const [bankLinkedNumberMan, setBankLinkedNumberMan] = useState(true);
  const [bankLinkedNumberVisible, setBankLinkedNumberVisible] = useState(true);
  const [bankLinkedNumberDisable, setBankLinkedNumberDisable] = useState(false);
  const bankLinkedNumberRef = useRef(null);

  const [upiID, setUPIID] = useState('');
  const [upiIDCaption, setUPIIDCaption] = useState('BANK LINKED MOBILE NUMBER');
  const [upiIDMan, setUPIIDMan] = useState(true);
  const [upiIDVisible, setUPIIDVisible] = useState(true);
  const [upiIDDisable, setUPIIDDisable] = useState(false);
  const upiIDRef = useRef(null);

  const [leadsystemCodeDetail, setLeadSystemCodeDetail] = useState(props.mobilecodedetail.leadSystemCodeDto);
  const [systemCodeDetail, setSystemCodeDetail] = useState(props.mobilecodedetail.t_SystemCodeDetail);
  const [leaduserCodeDetail, setLeadUserCodeDetail] = useState(props.mobilecodedetail.leadUserCodeDto);
  const [userCodeDetail, setUserCodeDetail] = useState(props.mobilecodedetail.t_UserCodeDetail);
  const [bankUserCodeDetail, setBankUserCodeDetail] = useState(props.mobilecodedetail.t_BankUserCode);
  const [systemMandatoryField, setSystemMandatoryField] = useState(props.mobilecodedetail.processSystemMandatoryFields);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [apiError, setApiError] = useState('');
  const [pageId, setPageId] = useState(global.CURRENTPAGEID);

  useEffect(() => {
    props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    getSystemCodeDetail()
    makeSystemMandatoryFields();

    return () => {
      props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
      backHandler.remove();
    }
  }, [props.navigation]);

  const handleBackButton = () => {
    onGoBack();
    return true; // Prevent default back button behavior
  };

  const getSystemCodeDetail = () => {

    const filterAccountTypeData = leadsystemCodeDetail.filter((data) => data.masterId === 'ACCOUNT_TYPE').sort((a, b) => a.Description.localeCompare(b.Description));
    setaddressTypeData(filterAccountTypeData)

  }

  const makeSystemMandatoryFields = () => {

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_accounttype' && data.pageId === pageId).map((value, index) => {
      setAccountTypeCaption(value.fieldName)

      if (value.mandatory) {
        setAccountTypeMan(true);
      }
      if (value.hide) {
        setAccountTypeVisible(false);
      }
      if (value.disable) {
        setAccountTypeDisable(true);
      }
      if (value.captionChange) {
        setAddressTypeCaption(value.fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_aacholderName' && data.pageId === pageId).map((value, index) => {
      setAccountHolderNameCaption(value.fieldName)

      if (value.mandatory) {
        setAccountTypeMan(true);
      }
      if (value.hide) {
        setAccountHolderNameVisible(false);
      }
      if (value.disable) {
        setAccountHolderNameDisable(true);
      }
      if (value.captionChange) {
        setAccountHolderNameCaption(value.fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_ifscCode' && data.pageId === pageId).map((value, index) => {
      setIFSCCodeCaption(value.fieldName)

      if (value.mandatory) {
        setIFSCCodeMan(true);
      }
      if (value.hide) {
        setIFSCCodeVisible(false);
      }
      if (value.disable) {
        setIFSCCodeDisable(true);
      }
      if (value.captionChange) {
        setIFSCCodeCaption(value.fieldCaptionChange)
      }
    });


    systemMandatoryField.filter((data) => data.fieldUiid === 'et_bankName' && data.pageId === pageId).map((value, index) => {
      setBankNameCaption(value.fieldName)

      if (value.mandatory) {
        setBankNameMan(true);
      }
      if (value.hide) {
        setBankNameVisible(false);
      }
      if (value.disable) {
        setBankNameDisable(true);
      }
      if (value.captionChange) {
        setBankNameCaption(value.fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_branchName' && data.pageId === pageId).map((value, index) => {
      setBranchNameCaption(value.fieldName)

      if (value.mandatory) {
        setBranchNameMan(true);
      }
      if (value.hide) {
        setBranchNameVisible(false);
      }
      if (value.disable) {
        setBranchNameDisable(true);
      }
      if (value.captionChange) {
        setBranchNameCaption(value.fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_accountNum' && data.pageId === pageId).map((value, index) => {
      setAccountNumberCaption(value.fieldName)

      if (value.mandatory) {
        setAccountNumberMan(true);
      }
      if (value.hide) {
        setAccountNumberVisible(false);
      }
      if (value.disable) {
        setAccountNumberDisable(true);
      }
      if (value.captionChange) {
        setAccountNumberCaption(value.fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_confirmaccountNum' && data.pageId === pageId).map((value, index) => {
      setConfirmAccountNumberCaption(value.fieldName)

      if (value.mandatory) {
        setConfirmAccountNumberMan(true);
      }
      if (value.hide) {
        setConfirmAccountNumberVisible(false);
      }
      if (value.disable) {
        setConfirmAccountNumberDisable(true);
      }
      if (value.captionChange) {
        setConfirmAccountNumberCaption(value.fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_banklinkedmob' && data.pageId === pageId).map((value, index) => {
      setBankLinkedNumberCaption(value.fieldName)

      if (value.mandatory) {
        setBankLinkedNumberMan(true);
      }
      if (value.hide) {
        setBankLinkedNumberVisible(false);
      }
      if (value.disable) {
        setBankLinkedNumberDisable(true);
      }
      if (value.captionChange) {
        setBankLinkedNumberCaption(value.fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_upiid' && data.pageId === pageId).map((value, index) => {
      setUPIIDCaption(value.fieldName)

      if (value.mandatory) {
        setUPIIDMan(true);
      }
      if (value.hide) {
        setUPIIDVisible(false);
      }
      if (value.disable) {
        setUPIIDDisable(true);
      }
      if (value.captionChange) {
        setUPIIDCaption(value.fieldCaptionChange)
      }
    });

  }

  const validateData = () => {
    var flag = false;
    var i = 1;
    var errorMessage = '';

    if (accountTypeMan && accountTypeVisible) {
      if (accountTypeLabel.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + accountTypeCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (accountHolderNameMan && accountHolderNameVisible) {
      if (accountHolderName.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + accountHolderNameCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (ifscCodeMan && ifscCodeVisible) {
      if (ifscCode.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + ifscCodeCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (bankNameMan && bankNameVisible) {
      if (bankName.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + bankNameCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (branchNameMan && branchNameVisible) {
      if (branchName.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + branchNameCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (accountNumberMan && accountNumberVisible) {
      if (accountNumber.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + accountNumberCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (confirmaccountNumberMan && confirmaccountNumberVisible) {
      if (confirmaccountNumber.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + confirmaccountNumberCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (bankLinkedNumberMan && bankLinkedNumberVisible) {
      if (bankLinkedNumber.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + bankLinkedNumberCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (upiIDMan && upiIDVisible) {
      if (upiID.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + upiIDCaption + '\n';
        i++;
        flag = true;
      }
    }


    setErrMsg(errorMessage);
    return flag;
  };

  const handlePickerClick = (componentName, label, index) => {

    if (componentName === 'AccountTypePicker') {
      setAccountTypeLabel(label);
      setAccountTypeIndex(index);
    }

  }

  const handleClick = (componentName, textValue) => {

    if (componentName === 'AccountHolderName') {
      if (textValue.length > 0) {
        if (Common.isValidText(textValue))
          setAccountHolderName(textValue)
      } else {
        setAccountHolderName(textValue)
      }
    }

  }


  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  const onGoBack = () => {
    props.navigation.goBack();
  }

  return (
    <SafeAreaView style={Commonstyles.parentView}>
      <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
      <ErrorModal isVisible={errorModalVisible} onClose={closeErrorModal} textContent={apiError} textClose={language[0][props.language].str_ok} />
      <ScrollView
        style={Commonstyles.scrollView}
        contentContainerStyle={Commonstyles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {loading ? <Loading /> : null}
        <View
          style={{
            width: '100%',
            height: 56,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <HeadComp
            textval={language[0][props.language].str_loanDemographics}
            props={props}
          />
        </View>

        <View>
          <ChildHeadComp textval={language[0][props.language].str_Guarantor} />
        </View>

        <View
          style={{ width: '90%', flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 14,
              fontWeight: 500,
              color: Colors.mediumgrey,
            }}>
            {language[0][props.language].str_bankDetailsOptional}
          </Text>
        </View>

        <ProgressComp progressvalue={1} textvalue="6 of 6" />
        <View style={{ flex: 1 }}>
          <ErrorMessageModal
            isVisible={bottomErrorSheetVisible}
            hideBottomSheet={hideBottomSheet}
            errMsg={errMsg}
            textError={language[0][props.language].str_error}
            textClose={language[0][props.language].str_ok}
          />

          {accountTypeVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>

              <TextComp textVal={accountTypeCaption} textStyle={Commonstyles.inputtextStyle} Visible={accountTypeMan} />

            </View>

            <PickerComp textLabel={accountTypeLabel} pickerStyle={Commonstyles.picker} Disable={accountTypeDisable} pickerdata={accountTypeData} componentName='AccountTypePicker' handlePickerClick={handlePickerClick} />


          </View>}


          {accountHolderNameVisible && (
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
                  textVal={accountHolderNameCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={accountHolderNameMan}
                />
              </View>

              <TextInputComp
                textValue={accountHolderName}
                textStyle={Commonstyles.textinputtextStyle}
                type="email-address"
                Disable={accountHolderNameDisable}
                ComponentName="AccountHolderName"
                reference={accountHolderRef}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
              />
            </View>
          )}

        </View>

        <ButtonViewComp
          textValue={language[0][props.language].str_next.toUpperCase()}
          textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
          viewStyle={Commonstyles.buttonView}
          innerStyle={Commonstyles.buttonViewInnerStyle}
          handleClick={demographicAddressSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  // eslint-disable-next-line no-shadow
  const { language } = state.languageReducer;
  return {
    language: language,
  };
};

const mapDispatchToProps = dispatch => ({
  languageAction: item => dispatch(languageAction(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BankDetails);
