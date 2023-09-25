import React, {useState, useRef, useEffect} from 'react';
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
import Common from '../../../Utils/Common';
import tbl_SystemCodeDetails from '../../../Database/Table/tbl_SystemCodeDetails';
import TextInputComp from '../../../Components/TextInputComp';
import PickerComp from '../../../Components/PickerComp';
import ButtonViewComp from '../../../Components/ButtonViewComp';
import ErrorMessageModal from '../../../Components/ErrorMessageModal';
import {Directions} from 'react-native-gesture-handler';
import ChildHeadComp from '../../../Components/ChildHeadComp';
import CheckBoxComp from '../../../Components/CheckBoxComp';

const ProfileShortBasicDetails = (props, {navigation}) => {
  const [loading, setLoading] = useState(false);
  const [custCatgLabel, setCustCatgLabel] = useState('');
  const [custCatgIndex, setCustCatgIndex] = useState('');
  const [custCatgCaption, setCustCatgCaption] = useState('CUSTOMER CATEGORY');
  const [mobileNumber, setMobileNumber] = useState('');
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
  const [ProductTypeCaption, setProductTypeCaption] = useState('PRODUCT TYPE');
  const [ProductTypeLabel, setProductTypeLabel] = useState('');
  const [ProductTypeIndex, setProductTypeIndex] = useState('');

  const [LoanAmount, setLoanAmount] = useState('');
  const [LoanAmountCaption, setLoanAmountCaption] = useState(
    "Loan Amount(IN MULTIPLE OF 5000's)",
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

  //kycid1 -- TextInput
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

  const [Email, setEmail] = useState('');
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
      .getSystemCodeDetailsBasedOnID('CustomerCategory')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);

          for (var i = 0; i < value.length; i++) {
            if (value[i].IsDefault === '1') {
              setCustCatgLabel(value[i].SubCodeID);
              setCustCatgIndex(i + 1);
            }
          }

          setCustCatData(value);
        }
      });
    tbl_SystemCodeDetails.getSystemCodeDetailsBasedOnID('LNTP').then(value => {
      if (value !== undefined && value.length > 0) {
        console.log(value);

        for (var i = 0; i < value.length; i++) {
          if (value[i].IsDefault === '1') {
            setLoanTypeLabel(value[i].SubCodeID);
            setLoanTypeIndex(i + 1);
          }
        }

        setLoanTypeData(value);
      }
    });
    tbl_SystemCodeDetails
      .getSystemCodeDetailsBasedOnID('ProductType')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);

          for (var i = 0; i < value.length; i++) {
            if (value[i].IsDefault === '1') {
              setProductTypeLabel(value[i].SubCodeID);
              setProductTypeIndex(i + 1);
            }
          }

          setProductTypeData(value);
        }
      });
    tbl_SystemCodeDetails.getSystemCodeDetailsBasedOnID('LNPUR').then(value => {
      if (value !== undefined && value.length > 0) {
        console.log(value);

        for (var i = 0; i < value.length; i++) {
          if (value[i].IsDefault === '1') {
            setLoanPurposeLabel(value[i].SubCodeID);
            setLoanPurposeIndex(i + 1);
          }
        }

        setLoanPurposeData(value);
      }
    });
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
      .getSystemCodeDetailsBasedOnID('MaritalStatus')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);

          for (var i = 0; i < value.length; i++) {
            if (value[i].IsDefault === '1') {
              setMaritalStatusLabel(value[i].SubCodeID);
              setMaritalStatusIndex(i + 1);
            }
          }

          setMaritalStatusData(value);
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
      .getSystemMandatoryFieldsBasedOnFieldUIID('sp_custcatg')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value[0]);
          setCustCatgCaption(value[0].FieldName);
          if (value[0].IsMandatory == '1') {
            setCustCatgMan(true);
          }
          if (value[0].IsHide == '1') {
            setCustCatgVisible(false);
          }
          if (value[0].IsDisable == '1') {
            setCustCatgDisable(true);
          }
          if (value[0].IsCaptionChange == '1') {
            setCustCatgCaption(value[0].FieldCaptionChange);
          }
        }
      });

    tbl_SystemMandatoryFields
      .getSystemMandatoryFieldsBasedOnFieldUIID('sp_loantype')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value[0]);
          setLoanTypeCaption(value[0].FieldName);
          if (value[0].IsMandatory == '1') {
            setLoanTypeMan(true);
          }
          if (value[0].IsHide == '1') {
            setLoanTypeVisible(false);
          }
          if (value[0].IsDisable == '1') {
            setLoanTypeDisable(true);
          }
          if (value[0].IsCaptionChange == '1') {
            setLoanTypeCaption(value[0].FieldCaptionChange);
          }
        }
      });

    tbl_SystemMandatoryFields
      .getSystemMandatoryFieldsBasedOnFieldUIID('sp_producttype')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value[0]);
          setProductTypeCaption(value[0].FieldName);
          if (value[0].IsMandatory == '1') {
            setProductTypeMan(true);
          }
          if (value[0].IsHide == '1') {
            setProductTypeVisible(false);
          }
          if (value[0].IsDisable == '1') {
            setProductTypeDisable(true);
          }
          if (value[0].IsCaptionChange == '1') {
            setProductTypeCaption(value[0].FieldCaptionChange);
          }
        }
      });
    tbl_SystemMandatoryFields
      .getSystemMandatoryFieldsBasedOnFieldUIID('sp_loanpurpose')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value[0]);
          setLoanPurposeCaption(value[0].FieldName);
          if (value[0].IsMandatory == '1') {
            setLoanPurposeMan(true);
          }
          if (value[0].IsHide == '1') {
            setLoanPurposeVisible(false);
          }
          if (value[0].IsDisable == '1') {
            setLoanPurposeDisable(true);
          }
          if (value[0].IsCaptionChange == '1') {
            setLoanPurposeCaption(value[0].FieldCaptionChange);
          }
        }
      });

    tbl_SystemMandatoryFields
      .getSystemMandatoryFieldsBasedOnFieldUIID('et_loanamount')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);
          setLoanAmountCaption(value[0].FieldName);
          if (value[0].IsMandatory == '1') {
            setLoanAmountMan(true);
          }
          if (value[0].IsHide == '1') {
            setLoanAmountVisible(false);
          }
          if (value[0].IsDisable == '1') {
            setLoanAmountDisable(true);
          }
          if (value[0].IsCaptionChange == '1') {
            setLoanAmountCaption(value[0].FieldCaptionChange);
          }
        }
      });
    tbl_SystemMandatoryFields
      .getSystemMandatoryFieldsBasedOnFieldUIID('sp_customersubcategory')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);
          setCustomerSubCategoryCaption(value[0].FieldName);
          if (value[0].IsMandatory == '1') {
            setCustomerSubCategoryMan(true);
          }
          if (value[0].IsHide == '1') {
            setCustomerSubCategoryVisible(false);
          }
          if (value[0].IsDisable == '1') {
            setCustomerSubCategoryDisable(true);
          }
          if (value[0].IsCaptionChange == '1') {
            setCustomerSubCategoryCaption(value[0].FieldCaptionChange);
          }
        }
      });

    tbl_SystemMandatoryFields
      .getSystemMandatoryFieldsBasedOnFieldUIID('sp_maritalstatus')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);
          setMaritalStatusCaption(value[0].FieldName);
          if (value[0].IsMandatory == '1') {
            setMaritalStatusMan(true);
          }
          if (value[0].IsHide == '1') {
            setMaritalStatusVisible(false);
          }
          if (value[0].IsDisable == '1') {
            setMaritalStatusDisable(true);
          }
          if (value[0].IsCaptionChange == '1') {
            setMaritalStatusCaption(value[0].FieldCaptionChange);
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

    tbl_SystemMandatoryFields
      .getSystemMandatoryFieldsBasedOnFieldUIID('sp_email')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);
          setEmailCaption(value[0].FieldName);
          if (value[0].IsMandatory == '1') {
            setEmailMan(true);
          }
          if (value[0].IsHide == '1') {
            setEmailVisible(false);
          }
          if (value[0].IsDisable == '1') {
            setEmailDisable(true);
          }
          if (value[0].IsCaptionChange == '1') {
            setEmailCaption(value[0].FieldCaptionChange);
          }
        }
      });

    tbl_SystemMandatoryFields
      .getSystemMandatoryFieldsBasedOnFieldUIID('sp_name')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);
          setNameCaption(value[0].FieldName);
          if (value[0].IsMandatory == '1') {
            setNameMan(true);
          }
          if (value[0].IsHide == '1') {
            setNameVisible(false);
          }
          if (value[0].IsDisable == '1') {
            setNameDisable(true);
          }
          if (value[0].IsCaptionChange == '1') {
            setNameCaption(value[0].FieldCaptionChange);
          }
        }
      });

    tbl_SystemMandatoryFields
      .getSystemMandatoryFieldsBasedOnFieldUIID('sp_urnumber')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);
          setURNumberCaption(value[0].FieldName);
          if (value[0].IsMandatory == '1') {
            setURNumberMan(true);
          }
          if (value[0].IsHide == '1') {
            setURNumberVisible(false);
          }
          if (value[0].IsDisable == '1') {
            setURNumberDisable(true);
          }
          if (value[0].IsCaptionChange == '1') {
            setURNumberCaption(value[0].FieldCaptionChange);
          }
        }
      });

    tbl_SystemMandatoryFields
      .getSystemMandatoryFieldsBasedOnFieldUIID('sp_ismsme')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);
          setchkMsmeCaption(value[0].FieldName);
          if (value[0].IsMandatory == '1') {
            setchkMsmeMan(true);
          }
          if (value[0].IsHide == '1') {
            setchkMsmeVisible(false);
          }
          if (value[0].IsDisable == '1') {
            setchkMsmeDisable(true);
          }
          if (value[0].IsCaptionChange == '1') {
            setchkMsmeCaption(value[0].FieldCaptionChange);
          }
        }
      });

    tbl_SystemMandatoryFields
      .getSystemMandatoryFieldsBasedOnFieldUIID('et_mobilenumber')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);
          setMobileNumberCaption(value[0].FieldName);
          if (value[0].IsMandatory == '1') {
            setMobileNumberMan(true);
          }
          if (value[0].IsHide == '1') {
            setMobileNumberVisible(false);
          }
          if (value[0].IsDisable == '1') {
            setMobileNumberDisable(true);
          }
          if (value[0].IsCaptionChange == '1') {
            setMobileNumberCaption(value[0].FieldCaptionChange);
          }
        }
      });
  };

  const updateLeadDetails = () => {
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
      }
    }
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
    setErrMsg(errorMessage);
    return flag;
  };

  const handleClick = (componentName, textValue) => {
    if (componentName === 'LoanAmount') {
      setLoanAmount(textValue);
    } else if (componentName === 'kycID1') {
      setkycID1(textValue);
    } else if (componentName === 'kycID2') {
      setkycID2(textValue);
    } else if (componentName === 'Email') {
      setEmail(textValue);
    } else if (componentName === 'Name') {
      setName(textValue);
    } else if (componentName === 'URNumber') {
      setURNumber(textValue);
    } else if (componentName === 'chkMsme') {
      setchkMsme(textValue);
    } else if (componentName === 'mobileNumber') {
      if (textValue.length > 0) {
        if (Common.numberRegex.test(textValue)) setMobileNumber(textValue);
      } else {
        setMobileNumber(textValue);
      }
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
    }
  };
  function isMultipleOf5000(number) {
    return number % 5000 === 0;
  }

  const onClick = () => {
    alert('Hii');
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
                  language[0][props.language].str_basicdetails
                }></TextComp>

              <ProgressComp progressvalue={0.25} textvalue="1 of 4" />
            </View>
          </View>

          {loanTypeVisible && (
            <View
              style={{width: '100%', alignItems: 'center', marginTop: '4%'}}>
              <View style={{width: '90%', marginTop: 3, paddingHorizontal: 0}}>
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
              style={{width: '100%', alignItems: 'center', marginTop: '4%'}}>
              <View style={{width: '90%', marginTop: 3, paddingHorizontal: 0}}>
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

          {LoanAmountVisible && (
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
              style={{width: '100%', alignItems: 'center', marginTop: '4%'}}>
              <View style={{width: '90%', marginTop: 3, paddingHorizontal: 0}}>
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

          {custCatgVisible && (
            <View
              style={{width: '100%', alignItems: 'center', marginTop: '4%'}}>
              <View style={{width: '90%', marginTop: 3, paddingHorizontal: 0}}>
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
              style={{width: '100%', alignItems: 'center', marginTop: '4%'}}>
              <View style={{width: '90%', marginTop: 3, paddingHorizontal: 0}}>
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

          {NameVisible && (
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

          {MaritalStatusVisible && (
            <View
              style={{width: '100%', alignItems: 'center', marginTop: '4%'}}>
              <View style={{width: '90%', marginTop: 3, paddingHorizontal: 0}}>
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

          <View style={{width: '100%', alignItems: 'center', marginTop: '4%'}}>
            <View style={{width: '90%', marginTop: 3, paddingHorizontal: 0}}>
              <TextComp
                textVal={KYCDetalsCaption}
                textStyle={Commonstyles.textinputtextStyle}
              />
            </View>
          </View>

          {KycType1Visible && (
            <View
              style={{width: '100%', alignItems: 'center', marginTop: '4%'}}>
              <View style={{width: '90%', marginTop: 3, paddingHorizontal: 0}}>
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
              <View style={{width: '90%', marginTop: 3, paddingHorizontal: 0}}>
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
            </View>
          )}

          {KycType2Visible && (
            <View
              style={{width: '100%', alignItems: 'center', marginTop: '4%'}}>
              <View style={{width: '90%', marginTop: 3, paddingHorizontal: 0}}>
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
              <View style={{width: '90%', marginTop: 3, paddingHorizontal: 0}}>
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
              <View style={{width: '90%', marginTop: 3, paddingHorizontal: 0}}>
                <TextComp
                  textVal={mobileNumberCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={mobileNumberMan}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <TextInputComp
                  textValue={mobileNumber}
                  textStyle={[Commonstyles.textinputtextStyle, {width: '70%'}]}
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
                  }}>
                  <TouchableOpacity onPress={onClick}>
                    <Text
                      style={{
                        color: Colors.darkblue,
                      }}>
                      Verify
                    </Text>
                  </TouchableOpacity>
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
              <View style={{width: '90%', marginTop: 3, paddingHorizontal: 0}}>
                <TextComp
                  textVal={EmailCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={EmailMan}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
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
                <View
                  style={{
                    width: '20%',
                    marginTop: 3,
                    paddingHorizontal: 0,
                    borderBottomWidth: 1,
                    borderBottomColor: '#e2e2e2',
                  }}>
                  <TouchableOpacity onPress={onClick}>
                    <Text
                      style={{
                        color: Colors.darkblue,
                      }}>
                      Verify
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
              <View style={{width: '90%', marginTop: 3, paddingHorizontal: 0}}>
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
          textValue={language[0][props.language].str_dedupecheck.toUpperCase()}
          textStyle={{color: Colors.white, fontSize: 13, fontWeight: 500}}
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
