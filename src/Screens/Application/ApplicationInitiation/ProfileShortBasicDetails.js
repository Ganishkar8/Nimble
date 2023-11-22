import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  CheckBox,
} from 'react-native';
import apiInstance from '../../../Utils/apiInstance';
import apiInstancelocal from '../../../Utils/apiInstancelocal';
import Colors from '../../../Utils/Colors';
import MyStatusBar from '../../../Components/MyStatusBar';
import Loading from '../../../Components/Loading';
import TextComp from '../../../Components/TextComp';
import { connect } from 'react-redux';
import { languageAction } from '../../../Utils/redux/actions/languageAction';
import { dedupeAction } from '../../../Utils/redux/actions/ProfileAction';
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
import DateTimePicker from '@react-native-community/datetimepicker';
import DateComp from '../../../Components/Filter/DateComp';
import DateInputComp from '../../../Components/DateInputComp';
import ErrorModal from '../../../Components/ErrorModal';
import DedupeModal from '../../../Components/DedupeModal';
import { useIsFocused } from '@react-navigation/native';
import tbl_client from '../../../Database/Table/tbl_client';


const ProfileShortBasicDetails = (props, { navigation }) => {
  var aadhar = "";
  const [loading, setLoading] = useState(false);

  const [custCatgLabel, setCustCatgLabel] = useState('');
  const [custCatgIndex, setCustCatgIndex] = useState('');
  const [custCatgCaption, setCustCatgCaption] = useState('CUSTOMER CATEGORY');

  const [mobileNumber, setMobileNumber] = useState('');
  const [isMobileVerified, setIsMobileVerified] = useState('');
  const [mobileNumberCaption, setMobileNumberCaption] =
    useState('MOBILE NUMBER');
  const [mobileNumberMan, setMobileNumberMan] = useState(false);
  const [mobileNumberVisible, setMobileNumberVisible] = useState(true);
  const [mobileNumberDisable, setMobileNumberDisable] = useState(false);
  const [custCatgMan, setCustCatgMan] = useState(false);
  const [custCatgVisible, setCustCatgVisible] = useState(true);
  const [custCatgDisable, setCustCatgDisable] = useState(false);
  const [custCatData, setCustCatData] = useState([]);
  const [errMsg, setErrMsg] = useState('');
  const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
  const showBottomSheet = () => setBottomErrorSheetVisible(true);
  const hideBottomSheet = () => setBottomErrorSheetVisible(false);
  const mobileNumberRef = useRef(null);
  const isScreenVisible = useIsFocused();

  const data = [{ name: 'Ajith', id: '590', branch: '1180' }]


  const [leadID, setLeadID] = useState('');
  const [leadIDCaption, setLeadIDCaption] = useState(
    "LEAD ID",
  );
  const [leadIDMan, setLeadIDMan] = useState(false);
  const [leadIDVisible, setLeadIDVisible] = useState(true);
  const [leadIDDisable, setLeadIDDisable] = useState(true);
  const leadIDRef = useRef(null);

  //loanType - dropdown
  const [loanTypeMan, setLoanTypeMan] = useState(false); //Manditory or not
  const [loanTypeVisible, setLoanTypeVisible] = useState(true); //Hide or not
  const [loanTypeDisable, setLoanTypeDisable] = useState(false); //Enable or Disable
  const [loanTypeData, setLoanTypeData] = useState([]); //DataPicking
  const [loanTypeCaption, setLoanTypeCaption] = useState('LOAN TYPE'); //FieldCaption
  const [loanTypeLabel, setLoanTypeLabel] = useState('');
  const [loanTypeIndex, setLoanTypeIndex] = useState('');

  const [ProductTypeMan, setProductTypeMan] = useState(false);
  const [ProductTypeVisible, setProductTypeVisible] = useState(true);
  const [ProductTypeDisable, setProductTypeDisable] = useState(false);
  const [ProductTypeData, setProductTypeData] = useState([]);
  const [ProductTypeCaption, setProductTypeCaption] = useState('PRODUCT ID');
  const [ProductTypeLabel, setProductTypeLabel] = useState('');
  const [ProductTypeIndex, setProductTypeIndex] = useState('');

  const [workflowIDMan, setWorkflowIDMan] = useState(false);
  const [workflowIDVisible, setWorkflowIDVisible] = useState(true);
  const [workflowIDDisable, setWorkflowIDDisable] = useState(false);
  const [workflowIDData, setWorkflowIDData] = useState([]);
  const [workflowIDCaption, setWorkflowIDCaption] = useState('WORKFLOW ID');
  const [workflowIDLabel, setWorkflowIDLabel] = useState('');
  const [workflowIDIndex, setWorkflowIDIndex] = useState('');

  const [titleCaption, setTitleCaption] = useState('TITLE');
  const [titleMan, setTitleMan] = useState(false);
  const [titleVisible, setTitleVisible] = useState(true);
  const [titleDisable, setTitleDisable] = useState(false);
  const [titleLabel, setTitleLabel] = useState('');
  const [titleIndex, setTitleIndex] = useState('');
  const [titleData, setTitleData] = useState([]);

  const [genderCaption, setGenderCaption] = useState('GENDER');
  const [genderMan, setGenderMan] = useState(false);
  const [genderVisible, setGenderVisible] = useState(true);
  const [genderDisable, setGenderDisable] = useState(false);
  const [genderLabel, setGenderLabel] = useState('');
  const [genderIndex, setGenderIndex] = useState('');
  const [genderData, setGenderData] = useState([]);

  const [LoanAmount, setLoanAmount] = useState('');
  const [LoanAmountCaption, setLoanAmountCaption] = useState(
    "LOAN AMOUNT(IN MULTIPLE OF 5000's)",
  );
  const [LoanAmountMan, setLoanAmountMan] = useState(false);
  const [LoanAmountVisible, setLoanAmountVisible] = useState(true);
  const [LoanAmountDisable, setLoanAmountDisable] = useState(false);
  const LoanAmountRef = useRef(null);

  const [LoanPurposeMan, setLoanPurposeMan] = useState(false);
  const [LoanPurposeVisible, setLoanPurposeVisible] = useState(true);
  const [LoanPurposeDisable, setLoanPurposeDisable] = useState(false);
  const [LoanPurposeData, setLoanPurposeData] = useState([]);
  const [LoanPurposeCaption, setLoanPurposeCaption] = useState('LOAN PURPOSE');
  const [LoanPurposeLabel, setLoanPurposeLabel] = useState('');
  const [LoanPurposeIndex, setLoanPurposeIndex] = useState('');

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

  const [MaritalStatusMan, setMaritalStatusMan] = useState(false);
  const [MaritalStatusVisible, setMaritalStatusVisible] = useState(true);
  const [MaritalStatusDisable, setMaritalStatusDisable] = useState(false);
  const [MaritalStatusData, setMaritalStatusData] = useState([]);
  const [MaritalStatusCaption, setMaritalStatusCaption] =
    useState('MARITAL STATUS');
  const [MaritalStatusLabel, setMaritalStatusLabel] = useState('');
  const [MaritalStatusIndex, setMaritalStatusIndex] = useState('');


  const [clientTypeMan, setClientTypeMan] = useState(false);
  const [clientTypeVisible, setClientTypeVisible] = useState(false);
  const [clientTypeDisable, setClientTypeDisable] = useState(false);
  const [clientTypeData, setClientTypeData] = useState([]);
  const [clientTypeCaption, setClientTypeCaption] = useState('CLIENT TYPE');
  const [clientTypeLabel, setClientTypeLabel] = useState('');
  const [clientTypeIndex, setClientTypeIndex] = useState('');

  const [KycType1Man, setKycType1Man] = useState(false);
  const [KycType1Visible, setKycType1Visible] = useState(true);
  const [KycType1Disable, setKycType1Disable] = useState(false);
  const [KycType1Data, setKycType1Data] = useState([]);
  const [KycType1Caption, setKycType1Caption] = useState('KYC TYPE 1');
  const [KycType1Label, setKycType1Label] = useState('');
  const [KycType1Index, setKycType1Index] = useState('');


  const [expiryDate1, setExpiry1Date] = useState('');
  const [expiryDate2, setExpiry2Date] = useState('');
  const [expiryDate3, setExpiry3Date] = useState('');
  const [expiryDate4, setExpiry4Date] = useState('');
  const [expiryDateCaption, setExpiryDateCaption] = useState("EXPIRY DATE",);
  const [expiryDate1Man, setExpiry1DateMan] = useState(false);
  const [expiryDate2Man, setExpiry2DateMan] = useState(false);
  const [expiryDate3Man, setExpiry3DateMan] = useState(false);
  const [expiryDate4Man, setExpiry4DateMan] = useState(false);
  const [expiryDate1Visible, setExpiry1DateVisible] = useState(false);
  const [expiryDate2Visible, setExpiry2DateVisible] = useState(false);
  const [expiryDate3Visible, setExpiry3DateVisible] = useState(false);
  const [expiryDate4Visible, setExpiry4DateVisible] = useState(false);
  const [expiryDate1Disable, setExpiry1DateDisable] = useState(false);
  const [expiryDate2Disable, setExpiry2DateDisable] = useState(false);
  const [expiryDate3Disable, setExpiry3DateDisable] = useState(false);
  const [expiryDate4Disable, setExpiry4DateDisable] = useState(false);
  const expityDate1Ref = useRef(null);
  const expityDate2Ref = useRef(null);
  const expityDate3Ref = useRef(null);
  const expityDate4Ref = useRef(null);

  const [KycType2Man, setKycType2Man] = useState(false);
  const [KycType2Visible, setKycType2Visible] = useState(true);
  const [KycType2Disable, setKycType2Disable] = useState(false);
  const [KycType2Data, setKycType2Data] = useState([]);
  const [KycType2Caption, setKycType2Caption] = useState('KYC TYPE 2');
  const [KycType2Label, setKycType2Label] = useState('');
  const [KycType2Index, setKycType2Index] = useState('');

  const [KycType3Man, setKycType3Man] = useState(false);
  const [KycType3Visible, setKycType3Visible] = useState(true);
  const [KycType3Disable, setKycType3Disable] = useState(false);
  const [KycType3Data, setKycType3Data] = useState([]);
  const [KycType3Caption, setKycType3Caption] = useState('KYC TYPE 3');
  const [KycType3Label, setKycType3Label] = useState('');
  const [KycType3Index, setKycType3Index] = useState('');

  const [KycType4Man, setKycType4Man] = useState(false);
  const [KycType4Visible, setKycType4Visible] = useState(true);
  const [KycType4Disable, setKycType4Disable] = useState(false);
  const [KycType4Data, setKycType4Data] = useState([]);
  const [KycType4Caption, setKycType4Caption] = useState('KYC TYPE 4');
  const [KycType4Label, setKycType4Label] = useState('');
  const [KycType4Index, setKycType4Index] = useState('');

  //kycid1 -- TextInput
  const [kycID1, setkycID1] = useState('');
  const [kycID1Caption, setkycID1Caption] = useState('KYC ID 1');
  const KycID1Ref = useRef(null);

  const [kycID2, setkycID2] = useState('');
  const [kycID2Caption, setkycID2Caption] = useState('KYC ID 2');
  const KycID2Ref = useRef(null);

  const [kycID3, setkycID3] = useState('');
  const [kycID3Caption, setkycID3Caption] = useState('KYC ID 3');
  const KycID3Ref = useRef(null);

  const [kycID4, setkycID4] = useState('');
  const [kycID4Caption, setkycID4Caption] = useState('KYC ID 4');
  const KycID4Ref = useRef(null);

  const [Email, setEmail] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState('');
  const [EmailCaption, setEmailCaption] = useState('EMAIL');
  const [EmailMan, setEmailMan] = useState(false);
  const [EmailVisible, setEmailVisible] = useState(true);
  const [EmailDisable, setEmailDisable] = useState(false);
  const EmailRef = useRef(null);

  const [Name, setName] = useState('');
  const [NameCaption, setNameCaption] = useState('NAME');
  const [NameMan, setNameMan] = useState(false);
  const [NameVisible, setNameVisible] = useState(true);
  const [NameDisable, setNameDisable] = useState(false);
  const NameRef = useRef(null);

  const [URNumber, setURNumber] = useState('');
  const [URNumberCaption, setURNumberCaption] = useState(
    'UDYAM REGISTRATION NUMBERS',
  );
  const [URNumberMan, setURNumberMan] = useState(false);
  const [URNumberVisible, setURNumberVisible] = useState(true);
  const [URNumberDisable, setURNumberDisable] = useState(false);
  const URNumberRef = useRef(null);

  const [KYCDetalsCaption, setKYCDetailsCaption] = useState('KYC Details');
  const [chkMsme, setchkMsme] = useState(false);
  const [chkMsmeCaption, setchkMsmeCaption] = useState('Is MSME?');
  const [chkMsmeMan, setchkMsmeMan] = useState(false);
  const [chkMsmeVisible, setchkMsmeVisible] = useState(true);
  const [chkMsmeDisable, setchkMsmeDisable] = useState(false);

  const [leadsystemCodeDetail, setLeadSystemCodeDetail] = useState(props.mobilecodedetail.leadSystemCodeDto);
  const [systemCodeDetail, setSystemCodeDetail] = useState(props.mobilecodedetail.t_SystemCodeDetail);
  const [leaduserCodeDetail, setLeadUserCodeDetail] = useState(props.mobilecodedetail.leadUserCodeDto);
  const [userCodeDetail, setUserCodeDetail] = useState(props.mobilecodedetail.t_UserCodeDetail);
  const [bankUserCodeDetail, setBankUserCodeDetail] = useState(props.mobilecodedetail.t_BankUserCode);

  const [systemMandatoryField, setSystemMandatoryField] = useState(props.mobilecodedetail.processSystemMandatoryFields);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [apiError, setApiError] = useState('');

  const [aadharNumber, setAadharNumber] = useState('');

  const [dedupeModalVisible, setDedupeModalVisible] = useState(false);

  useEffect(() => {
    props.navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
    makeSystemMandatoryFields();
    getSystemCodeDetail();

    if (KycType1Label !== null || KycType2Label !== null || KycType3Label !== null || KycType4Label !== null) {
      getID1data();
      getID2data();
    }

    if (isScreenVisible) {
      if (global.isDedupeDone == 1) {
        setClientTypeVisible(true)
      }
    }

    return () =>
      props.navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
  }, [navigation, KycType1Label, KycType2Label, KycType3Label, KycType4Label, isScreenVisible]);

  const getSystemCodeDetail = async () => {

    const filteredLoanTypeData = leadsystemCodeDetail.filter((data) => data.masterId === 'LNTP');
    setLoanTypeData(filteredLoanTypeData);

    const filteredLoanPurposeData = leadsystemCodeDetail.filter((data) => data.masterId === 'LNPC');
    setLoanPurposeData(filteredLoanPurposeData);

    const filteredMaritalStatusData = userCodeDetail.filter((data) => data.ID === 'MaritalStatusID');
    setMaritalStatusData(filteredMaritalStatusData);

    const filteredCustomerCategoryData = leadsystemCodeDetail.filter((data) => data.masterId === 'CUSTOMER_CATEGORY');
    setCustCatData(filteredCustomerCategoryData);

    const filteredCustomerSubCategoryData = userCodeDetail.filter((data) => data.ID === 'BusinessLineID');
    setCustomerSubCategoryData(filteredCustomerSubCategoryData);

    const filteredTitleData = leaduserCodeDetail.filter((data) => data.masterId === 'TITLE');
    setTitleData(filteredTitleData);

    const filteredGenderData = leadsystemCodeDetail.filter((data) => data.masterId === 'GENDER');
    setGenderData(filteredGenderData);

    //alert(JSON.stringify(filteredCustomerSubCategoryData))

    getID1data();
    getID2data();
    getID3data();
    getID4data();

  };

  const getID1data = () => {
    let dataArray = [];
    if (bankUserCodeDetail) {
      bankUserCodeDetail.forEach((data) => {
        if (data.ID === 'IndIdentitySettingID') {
          if (data.SubCodeID != KycType2Label && data.SubCodeID != KycType3Label && data.SubCodeID != KycType4Label)
            dataArray.push({ 'subCodeId': data.SubCodeID, Description: data.Description });
        }
      });
    }
    setKycType1Data(dataArray);
  }

  const getID2data = () => {
    let dataArray = [];
    if (bankUserCodeDetail) {
      bankUserCodeDetail.forEach((data) => {
        if (data.ID === 'IndIdentitySettingID') {
          if (data.SubCodeID != KycType1Label && data.SubCodeID != KycType3Label && data.SubCodeID != KycType4Label)
            dataArray.push({ 'subCodeId': data.SubCodeID, Description: data.Description });
        }
      });
    }
    setKycType2Data(dataArray);
  }
  const getID3data = () => {
    let dataArray = [];
    if (bankUserCodeDetail) {
      bankUserCodeDetail.forEach((data) => {
        if (data.ID === 'IndIdentitySettingID') {
          if (data.SubCodeID != KycType1Label && data.SubCodeID != KycType2Label && data.SubCodeID != KycType4Label)
            dataArray.push({ 'subCodeId': data.SubCodeID, Description: data.Description });
        }
      });
    }
    setKycType3Data(dataArray);
  }

  const getID4data = () => {
    let dataArray = [];
    if (bankUserCodeDetail) {
      bankUserCodeDetail.forEach((data) => {
        if (data.ID === 'IndIdentitySettingID') {
          if (data.SubCodeID != KycType1Label && data.SubCodeID != KycType2Label && data.SubCodeID != KycType3Label)
            dataArray.push({ 'subCodeId': data.SubCodeID, Description: data.Description });
        }
      });
    }
    setKycType4Data(dataArray);
  }

  const getProductID = (loanType) => {
    let dataArray = [];
    if (props.mobilecodedetail && props.mobilecodedetail.t_ProductLoan) {
      props.mobilecodedetail.t_ProductLoan.forEach((data) => {
        if (data.NatureOfProductId === loanType) {
          if (props.mobilecodedetail.t_product) {
            props.mobilecodedetail.t_product.forEach((data1) => {
              if (data1.ProductID === data.ProductID) {
                dataArray.push({ 'subCodeId': data.ProductID, Description: data1.Description });
              }
            });
          }
        }
      });
    }
    setProductTypeData(dataArray)
  }

  const makeSystemMandatoryFields = () => {

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_ld_id' && data.pageId === 1).map((value, index) => {
      setLeadIDCaption(value.fieldName)

      if (value.isMandatory) {
        setLeadIDMan(true);
      }
      if (value.isHide) {
        setLeadIDVisible(false);
      }
      if (value.isDisable) {
        setLeadIDDisable(true);
      }
      if (value.isCaptionChange) {
        setLeadIDCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_ln_type' && data.pageId === 1).map((value, index) => {
      setLoanTypeCaption(value.fieldName)

      if (value.isMandatory) {
        setLoanTypeMan(true);
      }
      if (value.isHide) {
        setLoanTypeVisible(false);
      }
      if (value.isDisable) {
        setLoanTypeDisable(true);
      }
      if (value.isCaptionChange) {
        setLoanTypeCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_gender' && data.pageId === 1).map((value, index) => {
      setGenderCaption(value.fieldName)

      if (value.isMandatory) {
        setGenderMan(true);
      }
      if (value.isHide) {
        setGenderVisible(false);
      }
      if (value.isDisable) {
        setGenderDisable(true);
      }
      if (value.isCaptionChange) {
        setGenderCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_pd_id' && data.pageId === 1).map((value, index) => {
      setProductTypeCaption(value.fieldName)

      if (value.isMandatory) {
        setProductTypeMan(true);
      }
      if (value.isHide) {
        setProductTypeVisible(false);
      }
      if (value.isDisable) {
        setProductTypeDisable(true);
      }
      if (value.isCaptionChange) {
        setProductTypeCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_ln_prps' && data.pageId === 1).map((value, index) => {
      setLoanPurposeCaption(value.fieldName)

      if (value.isMandatory) {
        setLoanPurposeMan(true);
      }
      if (value.isHide) {
        setLoanPurposeVisible(false);
      }
      if (value.isDisable) {
        setLoanPurposeDisable(true);
      }
      if (value.isCaptionChange) {
        setLoanPurposeCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_cust_cat' && data.pageId === 1).map((value, index) => {
      setCustCatgCaption(value.fieldName)

      if (value.isMandatory) {
        setCustCatgMan(true);
      }
      if (value.isHide) {
        setCustCatgVisible(false);
      }
      if (value.isDisable) {
        setCustCatgDisable(true);
      }
      if (value.isCaptionChange) {
        setCustCatgCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_cust_subcat' && data.pageId === 1).map((value, index) => {
      setCustomerSubCategoryCaption(value.fieldName)

      if (value.isMandatory) {
        setCustomerSubCategoryMan(true);
      }
      if (value.isHide) {
        setCustomerSubCategoryVisible(false);
      }
      if (value.isDisable) {
        setCustomerSubCategoryDisable(true);
      }
      if (value.isCaptionChange) {
        setCustomerSubCategoryCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_wf_id' && data.pageId === 1).map((value, index) => {
      setWorkflowIDCaption(value.fieldName)

      if (value.isMandatory) {
        setWorkflowIDMan(true);
      }
      if (value.isHide) {
        setWorkflowIDVisible(false);
      }
      if (value.isDisable) {
        setWorkflowIDDisable(true);
      }
      if (value.isCaptionChange) {
        setWorkflowIDCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_title' && data.pageId === 1).map((value, index) => {
      setTitleCaption(value.fieldName)
      if (value.mandatory) {
        setTitleMan(true);
      }
      if (value.hide) {
        setTitleVisible(false);
      }
      if (value.disable) {
        setTitleDisable(true);
      }
      if (value.captionChange) {
        setTitleCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_ln_amt' && data.pageId === 1).map((value, index) => {
      setLoanAmountCaption(value.fieldName)

      if (value.isMandatory) {
        setLoanAmountMan(true);
      }
      if (value.isHide) {
        setLoanAmountVisible(false);
      }
      if (value.isDisable) {
        setLoanAmountDisable(true);
      }
      if (value.isCaptionChange) {
        setLoanAmountCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_name' && data.pageId === 1).map((value, index) => {
      setNameCaption(value.fieldName)

      if (value.isMandatory) {
        setNameMan(true);
      }
      if (value.isHide) {
        setNameVisible(false);
      }
      if (value.isDisable) {
        setNameDisable(true);
      }
      if (value.isCaptionChange) {
        setNameCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_mrt_sts' && data.pageId === 1).map((value, index) => {
      setMaritalStatusCaption(value.fieldName)

      if (value.isMandatory) {
        setMaritalStatusMan(true);
      }
      if (value.isHide) {
        setMaritalStatusVisible(false);
      }
      if (value.isDisable) {
        setMaritalStatusDisable(true);
      }
      if (value.isCaptionChange) {
        setMaritalStatusCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_kyc_type_1' && data.pageId === 1).map((value, index) => {
      setKycType1Caption(value.fieldName)

      if (value.isMandatory) {
        setKycType1Man(true);
      }
      if (value.isHide) {
        setKycType1Visible(false);
      }
      if (value.isDisable) {
        setKycType1Disable(true);
      }
      if (value.isCaptionChange) {
        setKycType1Caption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_kyc_type_2 ' && data.pageId === 1).map((value, index) => {
      setKycType2Caption(value.fieldName)

      if (value.isMandatory) {
        setKycType2Man(true);
      }
      if (value.isHide) {
        setKycType2Visible(false);
      }
      if (value.isDisable) {
        setKycType2Disable(true);
      }
      if (value.isCaptionChange) {
        setKycType2Caption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_kyctype_3' && data.pageId === 1).map((value, index) => {
      setKycType3Caption(value.fieldName)

      if (value.isMandatory) {
        setKycType3Man(true);
      }
      if (value.isHide) {
        setKycType3Visible(false);
      }
      if (value.isDisable) {
        setKycType3Disable(true);
      }
      if (value.isCaptionChange) {
        setKycType3Caption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_kyc_type_4' && data.pageId === 1).map((value, index) => {
      setKycType4Caption(value.fieldName)

      if (value.isMandatory) {
        setKycType4Man(true);
      }
      if (value.isHide) {
        setKycType4Visible(false);
      }
      if (value.isDisable) {
        setKycType4Disable(true);
      }
      if (value.isCaptionChange) {
        setKycType4Caption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_mbl_no' && data.pageId === 1).map((value, index) => {
      setMobileNumberCaption(value.fieldName)

      if (value.isMandatory) {
        setMobileNumberMan(true);
      }
      if (value.isHide) {
        setMobileNumberVisible(false);
      }
      if (value.isDisable) {
        setMobileNumberDisable(true);
      }
      if (value.isCaptionChange) {
        setMobileNumberCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_email' && data.pageId === 1).map((value, index) => {
      setEmailCaption(value.fieldName)

      if (value.isMandatory) {
        setEmailMan(true);
      }
      if (value.isHide) {
        setEmailVisible(false);
      }
      if (value.isDisable) {
        setEmailDisable(true);
      }
      if (value.isCaptionChange) {
        setEmailCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'chck_is_msme' && data.pageId === 1).map((value, index) => {
      setchkMsmeCaption(value.fieldName)

      if (value.isMandatory) {
        setchkMsmeMan(true);
      }
      if (value.isHide) {
        setchkMsmeVisible(false);
      }
      if (value.isDisable) {
        setchkMsmeDisable(true);
      }
      if (value.isCaptionChange) {
        setchkMsmeCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_udyam_registration_number' && data.pageId === 1).map((value, index) => {
      setURNumberCaption(value.fieldName)

      if (value.isMandatory) {
        setURNumberMan(true);
      }
      if (value.isHide) {
        setURNumberVisible(false);
      }
      if (value.isDisable) {
        setURNumberDisable(true);
      }
      if (value.isCaptionChange) {
        setURNumberCaption(value[0].fieldCaptionChange)
      }
    });


  };

  const checkdetail = () => {
    props.navigation.navigate('OTPVerification', { mobileNumber: mobileNumber });
  }

  const updateBasicDetails = () => {

    if (validate()) {
      showBottomSheet();
    } else {
      const appDetails = {
        "customerCategoryId": custCatgLabel,
        "leadId": 0,
        "customerSubcategoryId": CustomerSubCategoryLabel,
        "customerTypeId": 'NEW',
        "loanTypeId": loanTypeLabel,
        "loanPurposeId": LoanPurposeLabel,
        "productId": ProductTypeLabel,
        "workflowId": 94,
        "consent": true,
        "applicationAppliedBy": global.USERID,
        "clientDetail": [
          {
            "clientTypeId": 'APP',
            "titleId": titleLabel,
            "firstName": Name,
            "middleName": "",
            "lastName": "",
            "maritalStatusId": MaritalStatusLabel,
            "kycTypeId1": KycType1Label,
            "kycIdValue1": kycID1,
            "kycTypeId2": KycType2Label,
            "kycIdValue2": kycID2,
            "kycTypeId3": KycType3Label,
            "kycIdValue3": kycID3,
            "kycTypeId4": KycType4Label,
            "kycIdValue4": kycID4,
            "udyamRegistrationNumber": URNumber,
            "mobileNumber": mobileNumber,
            "email": Email,
            "active": true,
            "aadharNumberVerified": false,
            "udyamRegistrationNumberVerified": false,
            "mobileNumberVerified": true,
            "msme": false,
            "emailVerified": false,
            "panVerified": false
          }
        ],
        "active": true,
        "createdBy": 1
      }
      const baseURL = '8901';
      setLoading(true);
      apiInstancelocal(baseURL)
        .put(`api/v2/profile-short/basic-details/${global.LOANAPPLICATIONID}`, appDetails)
        .then(async response => {
          // Handle the response data
          if (global.DEBUG_MODE) console.log('LeadCreationBasicApiResponse::' + JSON.stringify(response.data),);
          global.leadID = response.data.id;
          setLoading(false);
          internalDedupeCheck();
        })
        .catch(error => {
          // Handle the error
          if (global.DEBUG_MODE) console.log('Error' + JSON.stringify(error.response));
          setLoading(false);
          if (error.response.data != null) {
            setApiError(error.response.data.message);
            setErrorModalVisible(true)
          }
        });
    }
  };

  const internalDedupeCheck = () => {

    if (validate()) {
      showBottomSheet();
    } else {
      // const appDetails = {
      //   "Method": "InternalDedupRequest",
      //   "ID1": kycID1,
      //   "ID1CaptionID": KycType1Label,
      //   "ID2": kycID2,
      //   "ID2CaptionID": KycType2Label,
      //   "ID3": kycID3,
      //   "ID3CaptionID": KycType3Label,
      //   "ID4": kycID4,
      //   "ID4CaptionID": KycType4Label,
      //   "MobileNo": mobileNumber,
      // }
      const appDetails = {
        "Method": "InternalDedupRequest",
        "ID1": KycType1Label,
        "ID1CaptionID": kycID1,
        "ID2": KycType2Label,
        "ID2CaptionID": kycID2,
        "ID3": KycType2Label,
        "ID3CaptionID": kycID3,
        "ID4": KycType1Label,
        "ID4CaptionID": kycID4,
        "MobileNo": mobileNumber,
      }
      const baseURL = '8901';
      setLoading(true);
      apiInstancelocal(baseURL)
        .post(`/api/v2/profile-short/internal-dedupe-check/${global.USERID}`, appDetails)
        .then(async response => {
          // Handle the response data
          if (global.DEBUG_MODE) console.log('DedupeApiResponse::' + JSON.stringify(response.data),);
          //await tbl_client.deleteAllClient();
          await insertData();
          if (response.data.clientExistingDetails == null) {
            setClientTypeLabel('NEW');
          } else {
            props.dedupeAction(response.data)
            setDedupeModalVisible(true);
            setClientTypeLabel('EXT');
          }

          global.isDedupeDone = "1";
          setClientTypeVisible(true)
          setLoading(false);
          generateAadharOTP();

        })
        .catch(error => {
          // Handle the error
          if (global.DEBUG_MODE) console.log('DedupeApiResponse' + JSON.stringify(error));
          setLoading(false);
          if (error.response.data != null) {
            setApiError(error.response.data.message);
            setErrorModalVisible(true)
          }
        });
    }
  };

  const insertData = async () => {

    await tbl_client.insertClient(global.TEMPAPPID, clientTypeLabel, "", titleLabel, Name, "", "", "", "", "", "", "", "", "", "", genderLabel, MaritalStatusLabel, mobileNumber, Email, "",
      KycType1Label, kycID1, expiryDate1, KycType2Label, kycID2, expiryDate2, KycType3Label, kycID3, expiryDate3, KycType4Label, kycID4, expiryDate4, chkMsme, "", "", URNumber, "", isMobileVerified, isEmailVerified, "dedupeCheck", "isDedupePassed", "dmsId", "image", "geoCode", "1", "", "", "", "", "", "", "", "lmsClientId", "lmsCustomerTypeId");

  }

  const generateOTP = () => {

    const appDetails = {
      "loanApplicationId": 0,
      "clientId": 0,
      "generatedFor": `91${mobileNumber}`,
      "userId": global.USERID,
      "process": "Profile Short motp",
      "userType": global.USERTYPEID,
      "otpType": "23"
    }
    const baseURL = '8908';
    setLoading(true);
    apiInstancelocal(baseURL)
      .post('/api/v1/otp/send-otp', appDetails)
      .then(async response => {
        // Handle the response data
        if (global.DEBUG_MODE) console.log('MobileOTPApiResponse::' + JSON.stringify(response.data),);

        if (response.status == 200) {
          props.navigation.navigate('OTPVerification', { mobileNumber: mobileNumber, fromSCreen: 'ApplicantProfileShort' })
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

  const generateAadharOTP = () => {

    const appDetails =
    {
      "clientId": 0,
      "aadharNumber": aadhar,
      "createdBy": global.USERID
    }
    const baseURL = '8901';
    setLoading(true);
    apiInstancelocal(baseURL)
      .post('/api/v2/aadharOtp/generate/otp', appDetails)
      .then(async response => {
        // Handle the response data
        if (global.DEBUG_MODE) console.log('AadharOTPApiResponse::' + JSON.stringify(response.data),);

        if (response.status == 200) {
          props.navigation.navigate('AadharOTPVerification', { aadharNumber: aadharNumber });
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

  const refresh = () => {
    alert('data1')
  }

  const validate = () => {
    var flag = false; isAadharAvailable = false;
    var i = 1;
    var errorMessage = '';

    if (KycType1Label == '001') {
      setAadharNumber(kycID1);
      aadhar = kycID1;
      isAadharAvailable = true;
    } else if (KycType2Label == '001') {
      setAadharNumber(kycID2);
      aadhar = kycID2;
      isAadharAvailable = true;
    } else if (KycType3Label == '001') {
      setAadharNumber(kycID3);
      aadhar = kycID3;
      isAadharAvailable = true;
    } else if (KycType4Label == '001') {
      setAadharNumber(kycID4);
      aadhar = kycID4;
      isAadharAvailable = true;
    }

    if (custCatgMan && custCatgVisible) {
      if (custCatgLabel === 'Select') {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsselect +
          custCatgCaption +
          '\n';
        i++;
        flag = true;
      }
    }

    if (loanTypeMan && loanTypeVisible) {
      if (loanTypeLabel.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsselect +
          loanTypeCaption +
          '\n';
        i++;
        flag = true;
      }
    }

    if (ProductTypeMan && ProductTypeVisible) {
      if (ProductTypeLabel.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsselect +
          ProductTypeCaption +
          '\n';
        i++;
        flag = true;
      }
    }
    if (LoanPurposeMan && LoanPurposeVisible) {
      if (LoanPurposeLabel.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsselect +
          LoanPurposeCaption +
          '\n';
        i++;
        flag = true;
      }
    }
    if (LoanAmountMan && LoanAmountVisible) {
      if (LoanAmount.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          LoanAmountCaption +
          '\n';
        i++;
        flag = true;
      } else if (!isMultipleOf5000(LoanAmount)) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          LoanAmountCaption +
          ' ' +
          language[0][props.language].str_mulfive +
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

    if (MaritalStatusMan && MaritalStatusVisible) {
      if (MaritalStatusLabel.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsselect +
          MaritalStatusCaption +
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

    if (KycType1Label.length > 0) {
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

    if (KycType2Man && KycType2Visible) {
      if (KycType2Label.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsselect +
          KycType2Caption +
          '\n';
        i++;
        flag = true;
      }
    }

    if (KycType2Label.length > 0) {
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

    if (NameMan && NameVisible) {
      if (Name.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          NameCaption +
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
      } else if (global.isMobileVerified.length <= 0 || global.isMobileVerified == '0') {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsverify +
          mobileNumberCaption +
          '\n';
        i++;
        flag = true;
      }
    }

    //alert(global.isMobileVerified)

    if (URNumberMan && URNumberVisible) {
      if (URNumber.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          URNumberCaption +
          '\n';
        i++;
        flag = true;
      }
    }
    if (chkMsmeMan && chkMsmeVisible) {
      if (chkMsme.value == 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          chkMsmeCaption +
          '\n';
        i++;
        flag = true;
      }
    }

    if (!isAadharAvailable) {
      errorMessage =
        errorMessage +
        i +
        ')' +
        ' ' +
        'Please Select Aadhar as a KYC Type' +
        '\n';
      i++;
      flag = true;
    }

    setErrMsg(errorMessage);
    return false;
  };

  const handleClick = (componentName, textValue) => {
    if (componentName === 'LoanAmount') {
      setLoanAmount(textValue);
    } else if (componentName === 'kycID1') {
      setkycID1(textValue);
    } else if (componentName === 'kycID2') {
      setkycID2(textValue);
    } else if (componentName === 'kycID3') {
      setkycID3(textValue);
    } else if (componentName === 'kycID4') {
      setkycID4(textValue);
    }
    else if (componentName === 'Email') {
      setEmail(textValue);
    } else if (componentName === 'Name') {
      setName(textValue);
    } else if (componentName === 'URNumber') {
      const alphanumericInput = textValue.replace(/\W/g, '');

      let formattedText = '';
      for (let i = 0; i < alphanumericInput.length; i++) {
        if (i === 5 || i === 7 || i === 9) {
          formattedText += '-';
        }
        formattedText += alphanumericInput[i];
      }
      setURNumber(formattedText);
    } else if (componentName === 'chkMsme') {
      setchkMsme(textValue);
    } else if (componentName === 'expiryDate1') {
      handleTextChange(componentName, textValue);
    } else if (componentName === 'expiryDate2') {
      handleTextChange(componentName, textValue);
    } else if (componentName === 'mobileNumber') {
      if (textValue.length > 0) {
        if (Common.numberRegex.test(textValue)) setMobileNumber(textValue);
      } else {
        setMobileNumber(textValue);
      }
    }
  };

  const handleTextChange = (componentName, input) => {
    const numericInput = input.replace(/\D/g, '');

    // Insert slashes while typing
    let formattedDate = '';
    for (let i = 0; i < numericInput.length; i++) {
      if (i === 2 || i === 4) {
        formattedDate += '-';
      }
      formattedDate += numericInput[i];
    }
    if (componentName === 'expiryDate1') {
      setExpiry1Date(formattedDate);
    } else if (componentName === 'expiryDate2') {
      setExpiry2Date(formattedDate);
    } else if (componentName === 'expiryDate3') {
      setExpiry3Date(formattedDate);
    } else if (componentName === 'expiryDate4') {
      setExpiry4Date(formattedDate);
    }

  };

  const handleReference = componentName => {
    if (componentName === 'LoanAmount') {
      NameRef.current.focus();
    } else if (componentName === 'Name') {
      KycID1Ref.current.focus();
    } else if (componentName === 'kycID1') {
      KycID2Ref.current.focus();
    } else if (componentName === 'kycID2') {
      mobileNumberRef.current.focus();
    } else if (componentName === 'mobileNumber') {
      EmailRef.current.focus();
    } else if (componentName === 'Email') {
      URNumberRef.current.focus();
    }
  };

  const handlePickerClick = (componentName, label, index) => {
    if (componentName === 'custCategoryPicker') {
      setCustCatgLabel(label);
      setCustCatgIndex(index);
    } else if (componentName == 'LoanTypePicker') {
      setLoanTypeLabel(label);
      setLoanTypeIndex(index);
      getProductID(label);
    } else if (componentName == 'ProductTypePicker') {
      setProductTypeLabel(label);
      setProductTypeIndex(index);
    } else if (componentName == 'LoanPurposePicker') {
      setLoanPurposeLabel(label);
      setLoanPurposeIndex(index);
    } else if (componentName == 'CustomerSubCategoryPicker') {
      setCustomerSubCategoryLabel(label);
      setCustomerSubCategoryIndex(index);
    } else if (componentName == 'MaritalStatusPicker') {
      setMaritalStatusLabel(label);
      setMaritalStatusIndex(index);
    } else if (componentName == 'KycType1Picker') {
      setKycType1Label(label);
      setKycType1Index(index);
    } else if (componentName == 'KycType2Picker') {
      setKycType2Label(label);
      setKycType2Index(index);
    } else if (componentName == 'KycType3Picker') {
      setKycType3Label(label);
      setKycType3Index(index);
    } else if (componentName == 'KycType4Picker') {
      setKycType4Label(label);
      setKycType4Index(index);
    } else if (componentName == 'workFlowIDPicker') {
      setWorkflowIDLabel(label);
      setWorkflowIDIndex(index);
    } else if (componentName === 'titlePicker') {
      setTitleLabel(label);
      setTitleIndex(index);
    } else if (componentName === 'genderPicker') {
      setGenderLabel(label);
      setGenderIndex(index);
    }


  };
  function isMultipleOf5000(number) {
    return number % 5000 === 0;
  }

  const changeSelectedDate = (event, selectedDate) => {
    if (event.type == 'set') {
      const currentDate = selectedDate;
      console.log("SelectedDate::" + currentDate)
      const date = new Date(currentDate);
      //setExpiry1Date(date)
      //setShow(false);

      // Get day, month, and year components from the Date object
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Note: Months are 0-indexed, so we add 1.
      const year = date.getFullYear();

      // Create the formatted date string
      const formattedDate = `${day}-${month}-${year}`;
      const formattedServerDate = `${year}-${month}-${day}`;
      //setFromServerDate(formattedServerDate)
      setExpiry1Date(formattedDate);
    }

  };

  const onClick = () => {
    if (isMobileVerified == '1') {

    } else if (mobileNumber.length <= 0) {
      setApiError(language[0][props.language].str_plsenter + mobileNumberCaption);
      setErrorModalVisible(true);
    } else if (!Common.isValidPhoneNumber(mobileNumber)) {
      setApiError(language[0][props.language].str_plsentervalid + mobileNumberCaption);
      setErrorModalVisible(true);
    } else {
      generateOTP();
    }

  };

  const dedupeAcceptance = (value) => {

    if (value == 'Proceed') {
      props.navigation.navigate('ProfileShortExistingClientDetails');
      setDedupeModalVisible(false);
    } else {
      setDedupeModalVisible(false);
    }
  }

  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  return (
    // enclose all components in this View tag
    <SafeAreaView
      style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>
      <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
      <ErrorModal isVisible={errorModalVisible} onClose={closeErrorModal} textContent={apiError} textClose={language[0][props.language].str_ok} />
      <DedupeModal isVisible={dedupeModalVisible} dedupeDta={data} onClose={dedupeAcceptance} />
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


          <View style={{ width: '100%', alignItems: 'center', marginTop: '3%' }}>
            <View style={{ width: '90%', marginTop: 3 }}>
              <TextComp
                textStyle={{
                  color: Colors.mediumgrey,
                  fontSize: 15,
                  fontFamily: 'Poppins-Medium'
                }}
                textVal={
                  language[0][props.language].str_basicdetails
                }></TextComp>

              <ProgressComp progressvalue={0.25} textvalue="1 of 4" />
            </View>
          </View>


          {leadIDVisible && (
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
                  textVal={leadIDCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={leadIDMan}
                />
              </View>

              <TextInputComp
                textValue={leadID}
                textStyle={Commonstyles.textinputtextStyle}
                Disable={leadIDDisable}
                ComponentName="LeadID"
                reference={leadIDRef}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
              />
            </View>
          )}

          {clientTypeVisible && (
            <View
              style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
              <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                <TextComp
                  textVal={clientTypeCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={clientTypeMan}
                />
              </View>

              <PickerComp
                textLabel={clientTypeLabel}
                pickerStyle={Commonstyles.picker}
                Disable={clientTypeDisable}
                pickerdata={clientTypeData}
                componentName="ClientTypePicker"
                handlePickerClick={handlePickerClick}
              />
            </View>
          )}

          {loanTypeVisible && (
            <View
              style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
              <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                <TextComp
                  textVal={loanTypeCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={loanTypeMan}
                />
              </View>

              <PickerComp
                textLabel={loanTypeLabel}
                pickerStyle={Commonstyles.picker}
                Disable={loanTypeDisable}
                pickerdata={loanTypeData}
                componentName="LoanTypePicker"
                handlePickerClick={handlePickerClick}
              />
            </View>
          )}

          {ProductTypeVisible && (
            <View
              style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
              <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                <TextComp
                  textVal={ProductTypeCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={ProductTypeMan}
                />
              </View>

              <PickerComp
                textLabel={ProductTypeLabel}
                pickerStyle={Commonstyles.picker}
                Disable={ProductTypeDisable}
                pickerdata={ProductTypeData}
                componentName="ProductTypePicker"
                handlePickerClick={handlePickerClick}
              />
            </View>
          )}


          {custCatgVisible && (
            <View
              style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
              <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                <TextComp
                  textVal={custCatgCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={custCatgMan}
                />
              </View>

              <PickerComp
                textLabel={custCatgLabel}
                pickerStyle={Commonstyles.picker}
                Disable={custCatgDisable}
                pickerdata={custCatData}
                componentName="custCategoryPicker"
                handlePickerClick={handlePickerClick}
              />
            </View>
          )}

          {CustomerSubCategoryVisible && (
            <View
              style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
              <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                <TextComp
                  textVal={CustomerSubCategoryCaption}
                  textStyle={Commonstyles.inputtextStyle}
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


          {workflowIDVisible && (
            <View
              style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
              <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                <TextComp
                  textVal={workflowIDCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={workflowIDMan}
                />
              </View>

              <PickerComp
                textLabel={CustomerSubCategoryLabel}
                pickerStyle={Commonstyles.picker}
                Disable={workflowIDDisable}
                pickerdata={workflowIDData}
                componentName="workFlowIDPicker"
                handlePickerClick={handlePickerClick}
              />
            </View>
          )}

          {LoanAmountVisible && (
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
                  textVal={LoanAmountCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={LoanAmountMan}
                />
              </View>

              <TextInputComp
                textValue={LoanAmount}
                textStyle={Commonstyles.textinputtextStyle}
                type="numeric"
                Disable={LoanAmountDisable}
                ComponentName="LoanAmount"
                reference={LoanAmountRef}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
              />
            </View>
          )}

          {LoanPurposeVisible && (
            <View
              style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
              <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                <TextComp
                  textVal={LoanPurposeCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={LoanPurposeMan}
                />
              </View>

              <PickerComp
                textLabel={LoanPurposeLabel}
                pickerStyle={Commonstyles.picker}
                Disable={LoanPurposeDisable}
                pickerdata={LoanPurposeData}
                componentName="LoanPurposePicker"
                handlePickerClick={handlePickerClick}
              />
            </View>
          )}

          {titleVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>

              <TextComp textVal={titleCaption} textStyle={Commonstyles.inputtextStyle} Visible={titleMan} />

            </View>

            <PickerComp textLabel={titleLabel} pickerStyle={Commonstyles.picker} Disable={titleDisable} pickerdata={titleData} componentName='titlePicker' handlePickerClick={handlePickerClick} />


          </View>}


          {NameVisible && (
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
                  textVal={NameCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={NameMan}
                />
              </View>

              <TextInputComp
                textValue={Name}
                textStyle={Commonstyles.textinputtextStyle}
                type="email-address"
                Disable={NameDisable}
                ComponentName="Name"
                reference={NameRef}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
              />
            </View>
          )}

          {genderVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>

              <TextComp textVal={genderCaption} textStyle={Commonstyles.inputtextStyle} Visible={genderMan} />

            </View>

            <PickerComp textLabel={genderLabel} pickerStyle={Commonstyles.picker} Disable={genderDisable} pickerdata={genderData} componentName='genderPicker' handlePickerClick={handlePickerClick} />


          </View>}

          {MaritalStatusVisible && (
            <View
              style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
              <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                <TextComp
                  textVal={MaritalStatusCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={MaritalStatusMan}
                />
              </View>

              <PickerComp
                textLabel={MaritalStatusLabel}
                pickerStyle={Commonstyles.picker}
                Disable={MaritalStatusDisable}
                pickerdata={MaritalStatusData}
                componentName="MaritalStatusPicker"
                handlePickerClick={handlePickerClick}
              />
            </View>
          )}

          <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
              <TextComp
                textVal={KYCDetalsCaption}
                textStyle={[Commonstyles.textinputtextStyle, { color: Colors.mediumgrey }]}
              />
            </View>
          </View>

          {KycType1Visible && (
            <View
              style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
              <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
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

          {KycType1Visible && (
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
                  textVal={kycID1Caption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={KycType1Man}
                />
              </View>

              <TextInputComp
                textValue={kycID1}
                textStyle={Commonstyles.textinputtextStyle}
                type="email-address"
                Disable={KycType1Disable}
                ComponentName="kycID1"
                reference={KycID1Ref}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
              />
            </View>
          )}

          {expiryDate1Visible && (
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
                  textVal={expiryDateCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={expiryDate1Man}
                />
              </View>

              <View style={{ width: '100%', alignItems: 'center' }}>
                <DateInputComp textStyle={[Commonstyles.inputtextStyle, { width: '90%' }]} ComponentName="expiryDate1"
                  textValue={expiryDate1}
                  type="numeric"
                  handleClick={handleClick}
                  handleReference={handleReference} />
              </View>
              {/* <TextInputComp
                textValue={expiryDate1}
                textStyle={Commonstyles.textinputtextStyle}
                type="numeric"
                Disable={expiryDate1Disable}
                ComponentName="expiryDate1"
                reference={expityDate1Ref}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
              /> */}
            </View>
          )}

          {KycType2Visible && (
            <View
              style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
              <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
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

          {KycType2Visible && (
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
                  textVal={kycID2Caption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={KycType2Man}
                />
              </View>

              <TextInputComp
                textValue={kycID2}
                textStyle={Commonstyles.textinputtextStyle}
                type="email-address"
                Disable={KycType2Disable}
                ComponentName="kycID2"
                reference={KycID2Ref}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
              />
            </View>
          )}

          {expiryDate2Visible && (
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
                  textVal={expiryDateCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={expiryDate2Man}
                />
              </View>

              <View style={{ width: '100%', alignItems: 'center' }}>
                <DateInputComp textStyle={[Commonstyles.inputtextStyle, { width: '90%' }]} ComponentName="expiryDate2"
                  textValue={expiryDate2}
                  type="numeric"
                  handleClick={handleClick}
                  handleReference={handleReference} />
              </View>
              {/* <TextInputComp
                textValue={expiryDate1}
                textStyle={Commonstyles.textinputtextStyle}
                type="numeric"
                Disable={expiryDate1Disable}
                ComponentName="expiryDate1"
                reference={expityDate1Ref}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
              /> */}
            </View>
          )}


          {KycType3Visible && (
            <View
              style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
              <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                <TextComp
                  textVal={KycType3Caption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={KycType3Man}
                />
              </View>

              <PickerComp
                textLabel={KycType3Label}
                pickerStyle={Commonstyles.picker}
                Disable={KycType3Disable}
                pickerdata={KycType3Data}
                componentName="KycType3Picker"
                handlePickerClick={handlePickerClick}
              />
            </View>
          )}

          {KycType3Visible && (
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
                  textVal={kycID3Caption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={KycType3Man}
                />
              </View>

              <TextInputComp
                textValue={kycID3}
                textStyle={Commonstyles.textinputtextStyle}
                type="email-address"
                Disable={KycType3Disable}
                ComponentName="kycID3"
                reference={KycID3Ref}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
              />
            </View>
          )}

          {expiryDate3Visible && (
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
                  textVal={expiryDateCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={expiryDate3Man}
                />
              </View>

              <View style={{ width: '100%', alignItems: 'center' }}>
                <DateInputComp textStyle={[Commonstyles.inputtextStyle, { width: '90%' }]} ComponentName="expiryDate3"
                  textValue={expiryDate3}
                  type="numeric"
                  handleClick={handleClick}
                  handleReference={handleReference} />
              </View>
              {/* <TextInputComp
                textValue={expiryDate1}
                textStyle={Commonstyles.textinputtextStyle}
                type="numeric"
                Disable={expiryDate1Disable}
                ComponentName="expiryDate1"
                reference={expityDate1Ref}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
              /> */}
            </View>
          )}

          {KycType4Visible && (
            <View
              style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
              <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                <TextComp
                  textVal={KycType4Caption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={KycType4Man}
                />
              </View>

              <PickerComp
                textLabel={KycType4Label}
                pickerStyle={Commonstyles.picker}
                Disable={KycType4Disable}
                pickerdata={KycType4Data}
                componentName="KycType4Picker"
                handlePickerClick={handlePickerClick}
              />
            </View>
          )}

          {KycType4Visible && (
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
                  textVal={kycID4Caption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={KycType4Man}
                />
              </View>

              <TextInputComp
                textValue={kycID4}
                textStyle={Commonstyles.textinputtextStyle}
                type="email-address"
                Disable={KycType4Disable}
                ComponentName="kycID4"
                reference={KycID4Ref}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
              />
            </View>
          )}

          {expiryDate4Visible && (
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
                  textVal={expiryDateCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={expiryDate4Man}
                />
              </View>

              <View style={{ width: '100%', alignItems: 'center' }}>
                <DateInputComp textStyle={[Commonstyles.inputtextStyle, { width: '90%' }]} ComponentName="expiryDate4"
                  textValue={expiryDate4}
                  type="numeric"
                  handleClick={handleClick}
                  handleReference={handleReference} />
              </View>
              {/* <TextInputComp
                textValue={expiryDate1}
                textStyle={Commonstyles.textinputtextStyle}
                type="numeric"
                Disable={expiryDate1Disable}
                ComponentName="expiryDate1"
                reference={expityDate1Ref}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
              /> */}
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
              <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                <TextComp
                  textVal={mobileNumberCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={mobileNumberMan}
                />
              </View>
              <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center' }}>

                <TextInputComp
                  textValue={mobileNumber}
                  textStyle={[Commonstyles.textinputtextStyle, { width: '65%' }]}
                  type="numeric"
                  Disable={mobileNumberDisable}
                  ComponentName="mobileNumber"
                  reference={mobileNumberRef}
                  returnKey="next"
                  handleClick={handleClick}
                  handleReference={handleReference}
                />

                <View
                  style={{
                    width: '20%',
                    marginTop: 3,
                    paddingHorizontal: 0,
                    borderBottomWidth: 1,
                    borderBottomColor: '#e2e2e2',
                    color: 'darkblue',
                    justifyContent: 'center'
                  }}>
                  {global.isMobileVerified == '0' &&
                    <TouchableOpacity onPress={onClick}>
                      <Text
                        style={{
                          color: Colors.darkblue,
                          fontWeight: 500,
                        }}>
                        Verify
                      </Text>
                    </TouchableOpacity>
                  }

                  {global.isMobileVerified == '1' &&

                    <Text
                      style={{
                        color: Colors.green,
                        fontWeight: 500,
                      }}>
                      Verified
                    </Text>

                  }

                </View>
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
              <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                <TextComp
                  textVal={EmailCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={EmailMan}
                />
              </View>
              {/* <View style={{ flexDirection: 'row', width: '90%', alignSelf: 'center' }}> */}
              <TextInputComp
                textValue={Email}
                textStyle={Commonstyles.textinputtextStyle}
                type="email-address"
                Disable={EmailDisable}
                ComponentName="Email"
                reference={EmailRef}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
              />
              {/* <View
                  style={{
                    width: '11%',
                    marginTop: 3,
                    paddingHorizontal: 0,
                    borderBottomWidth: 1,
                    borderBottomColor: '#e2e2e2',
                  }}>
                  <TouchableOpacity onPress={onClick}>
                    <Text
                      style={{
                        color: Colors.darkblue,
                        fontWeight: 500,
                      }}>
                      Verify
                    </Text>
                  </TouchableOpacity>
                </View> 
              </View>*/}
            </View>
          )}

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 19, }}>
            <CheckBoxComp
              textValue={chkMsme}
              Disable={chkMsmeDisable}
              ComponentName="chkMsme"
              returnKey="next"
              handleClick={handleClick}
              Visible={chkMsmeVisible}
              textCaption={chkMsmeCaption}
            />
          </View>

          {URNumberVisible && (
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
                  textVal={URNumberCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={URNumberMan}
                />
              </View>

              <TextInputComp
                textValue={URNumber}
                textStyle={Commonstyles.textinputtextStyle}
                type="email-address"
                Disable={URNumberDisable}
                ComponentName="URNumber"
                reference={URNumberRef}
                returnKey="done"
                handleClick={handleClick}
                handleReference={handleReference}
              />
            </View>
          )}
        </View>

        <ButtonViewComp
          textValue={global.isDedupeDone == '1' ? language[0][props.language].str_next.toUpperCase() : language[0][props.language].str_dedupecheck.toUpperCase()}
          textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
          viewStyle={Commonstyles.buttonView}
          innerStyle={Commonstyles.buttonViewInnerStyle}
          handleClick={updateBasicDetails}
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
  return {
    language: language,
    profiledetail: profileDetails,
    mobilecodedetail: mobileCodeDetails
  }
}

const mapDispatchToProps = dispatch => ({
  languageAction: item => dispatch(languageAction(item)),
  dedupeAction: item => dispatch(dedupeAction(item)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileShortBasicDetails);
