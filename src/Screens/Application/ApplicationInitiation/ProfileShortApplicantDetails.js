import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  Image,
  BackHandler, PermissionsAndroid
} from 'react-native';
import apiInstance from '../../../Utils/apiInstance';
// import apiInstance from '../../../Utils/apiInstance';
import Colors from '../../../Utils/Colors';
import MyStatusBar from '../../../Components/MyStatusBar';
import Loading from '../../../Components/Loading';
import TextComp from '../../../Components/TextComp';
import { connect } from 'react-redux';
import { languageAction } from '../../../Utils/redux/actions/languageAction';
import { language } from '../../../Utils/LanguageString';
import Commonstyles from '../../../Utils/Commonstyles';
import HeadComp from '../../../Components/HeadComp';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
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
import ChildHeadComp from '../../../Components/ChildHeadComp';
import DateComp from '../../../Components/Filter/DateComp';
import DateInputComp from '../../../Components/DateInputComp';
import MapView, { Marker } from 'react-native-maps';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import tbl_client from '../../../Database/Table/tbl_client';
import Entypo from 'react-native-vector-icons/Entypo';
import Geolocation from 'react-native-geolocation-service';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';
import ErrorModal from '../../../Components/ErrorModal';
import ImageBottomPreview from '../../../Components/ImageBottomPreview';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { updateLoanInitiationDetails, updateNestedClientDetails } from '../../../Utils/redux/actions/loanInitiationAction';

const ProfileShortApplicantDetails = (props, { navigation }) => {

  const [
    currentLongitude,
    setCurrentLongitude
  ] = useState(0.0);
  const [
    currentLatitude,
    setCurrentLatitude
  ] = useState(0.0);
  const [
    locationStatus,
    setLocationStatus
  ] = useState('');

  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [firstNameCaption, setFirstNameCaption] = useState('FIRST NAME');
  const [firstNameMan, setFirstNameMan] = useState(false);
  const [firstNameVisible, setFirstNameVisible] = useState(true);
  const [firstNameDisable, setFirstNameDisable] = useState(false);
  const [middleName, setMiddleName] = useState('');
  const [middleNameMan, setMiddleNameMan] = useState(false);
  const [middleNameCaption, setMiddleNameCaption] = useState('MIDDLE NAME');
  const [middleNameVisible, setMiddleNameVisible] = useState(true);
  const [middleNameDisable, setMiddleNameDisable] = useState(false);
  const [lastName, setLastName] = useState('');
  const [lastNameCaption, setLastNameCaption] = useState('LAST NAME');
  const [lastNameMan, setLastNameMan] = useState(false);
  const [lastNameVisible, setLastNameVisible] = useState(true);
  const [lastNameDisable, setLastNameDisable] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
  const showBottomSheet = () => setBottomErrorSheetVisible(true);
  const hideBottomSheet = () => setBottomErrorSheetVisible(false);
  const firstNameRef = useRef(null);
  const middleNameRef = useRef(null);
  const lastNameRef = useRef(null);

  const [MaritalStatusMan, setMaritalStatusMan] = useState(false);
  const [MaritalStatusVisible, setMaritalStatusVisible] = useState(true);
  const [MaritalStatusDisable, setMaritalStatusDisable] = useState(false);
  const [MaritalStatusData, setMaritalStatusData] = useState([]);
  const [MaritalStatusCaption, setMaritalStatusCaption] =
    useState('MARITAL STATUS');
  const [MaritalStatusLabel, setMaritalStatusLabel] = useState('');
  const [MaritalStatusIndex, setMaritalStatusIndex] = useState('');

  const [gpslatlon, setGPSLatLon] = useState('');
  const mapRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const [photoOptionvisible, setphotoOptionvisible] = useState(false);
  const showphotoBottomSheet = () => setphotoOptionvisible(true);
  const hidephotoBottomSheet = () => setphotoOptionvisible(false);
  const [imageUri, setImageUri] = useState(null);
  const [imageFile, setImageFile] = useState([]);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const showImageBottomSheet = () => { setBottomSheetVisible(true) };
  const hideImageBottomSheet = () => setBottomSheetVisible(false);

  const [deleteVisible, setDeleteVisible] = useState(false);
  const [docID, setDocID] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');

  const [TitleMan, setTitleMan] = useState(false);
  const [TitleVisible, setTitleVisible] = useState(true);
  const [TitleDisable, setTitleDisable] = useState(false);
  const [TitleData, setTitleData] = useState([]);
  const [TitleCaption, setTitleCaption] = useState('TITLE');
  const [TitleLabel, setTitleLabel] = useState('');
  const [TitleIndex, setTitleIndex] = useState('');

  const [GenderMan, setGenderMan] = useState(false);
  const [GenderVisible, setGenderVisible] = useState(true);
  const [GenderDisable, setGenderDisable] = useState(false);
  const [GenderData, setGenderData] = useState([]);
  const [GenderCaption, setGenderCaption] = useState('GENDER');
  const [GenderLabel, setGenderLabel] = useState('');
  const [GenderIndex, setGenderIndex] = useState('');

  const [CasteMan, setCasteMan] = useState(false);
  const [CasteVisible, setCasteVisible] = useState(true);
  const [CasteDisable, setCasteDisable] = useState(false);
  const [CasteData, setCasteData] = useState([]);
  const [CasteCaption, setCasteCaption] = useState('CASTE');
  const [CasteLabel, setCasteLabel] = useState('');
  const [CasteIndex, setCasteIndex] = useState('');

  const [ReligionMan, setReligionMan] = useState(false);
  const [ReligionVisible, setReligionVisible] = useState(true);
  const [ReligionDisable, setReligionDisable] = useState(false);
  const [ReligionData, setReligionData] = useState([]);
  const [ReligionCaption, setReligionCaption] = useState('RELIGION');
  const [ReligionLabel, setReligionLabel] = useState('');
  const [ReligionIndex, setReligionIndex] = useState('');

  const [MotherTongueMan, setMotherTongueMan] = useState(false);
  const [MotherTongueVisible, setMotherTongueVisible] = useState(true);
  const [MotherTongueDisable, setMotherTongueDisable] = useState(false);
  const [MotherTongueData, setMotherTongueData] = useState([]);
  const [MotherTongueCaption, setMotherTongueCaption] =
    useState('MOTHERTONGUE');
  const [MotherTongueLabel, setMotherTongueLabel] = useState('');
  const [MotherTongueIndex, setMotherTongueIndex] = useState('');

  const [EADMan, setEADMan] = useState(false);
  const [EADVisible, setEADVisible] = useState(true);
  const [EADDisable, setEADDisable] = useState(false);
  const [EADData, setEADData] = useState([]);
  const [EADCaption, setEADCaption] = useState('EDUCATION QUALIFICATION');
  const [EADLabel, setEADLabel] = useState('');
  const [EADIndex, setEADIndex] = useState('');

  const [DOB, setDOB] = useState('');
  const [DOBCaption, setDOBCaption] = useState('DATE OF BIRTH');
  const [DOBMan, setDOBMan] = useState(false);
  const [DOBVisible, setDOBVisible] = useState(true);
  const [DOBDisable, setDOBDisable] = useState(false);
  const DOBRef = useRef(null);

  const [Age, setAge] = useState('');
  const [AgeCaption, setAgeCaption] = useState('AGE');
  const [AgeMan, setAgeMan] = useState(false);
  const [AgeVisible, setAgeVisible] = useState(true);
  const [AgeDisable, setAgeDisable] = useState(true);
  const AgeRef = useRef(null);

  const [FatherName, setFatherName] = useState('');
  const [FatherNameCaption, setFatherNameCaption] = useState('FATHER NAME');
  const [FatherNameMan, setFatherNameMan] = useState(false);
  const [FatherNameVisible, setFatherNameVisible] = useState(true);
  const [FatherNameDisable, setFatherNameDisable] = useState(false);
  const FatherNameRef = useRef(null);

  const [SpouseName, setSpouseName] = useState('');
  const [SpouseNameCaption, setSpouseNameCaption] = useState('HUSBAND NAME');
  const [SpouseNameMan, setSpouseNameMan] = useState(false);
  const [SpouseNameVisible, setSpouseNameVisible] = useState(true);
  const [SpouseNameDisable, setSpouseNameDisable] = useState(false);
  const SpouseNameRef = useRef(null);

  const [leadsystemCodeDetail, setLeadSystemCodeDetail] = useState(props.mobilecodedetail.leadSystemCodeDto);
  const [systemCodeDetail, setSystemCodeDetail] = useState(props.mobilecodedetail.t_SystemCodeDetail);
  const [leaduserCodeDetail, setLeadUserCodeDetail] = useState(props.mobilecodedetail.leadUserCodeDto);
  const [userCodeDetail, setUserCodeDetail] = useState(props.mobilecodedetail.t_UserCodeDetail);
  const [bankUserCodeDetail, setBankUserCodeDetail] = useState(props.mobilecodedetail.t_BankUserCode);

  const [systemMandatoryField, setSystemMandatoryField] = useState(props.mobilecodedetail.processSystemMandatoryFields);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [apiError, setApiError] = useState('');

  const [kycManual, setKYCManual] = useState('0');

  const [hideRetake, setHideRetake] = useState(false);
  const [hideDelete, setHideDelete] = useState(false);

  const [isAadharVerified, setIsAadharVerified] = useState(false);
  const [pageId, setPageId] = useState(global.CURRENTPAGEID);



  const [minAge, setMinAge] = useState(18);

  const isScreenVisible = useIsFocused();

  useEffect(() => {
    props.navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    makeSystemMandatoryFields();
    getSystemCodeDetail();
    getApplicantData();
    if (global.USERTYPEID == 1164) {
      setHideDelete(false);
      setHideRetake(false);
    }
    if (global.USERTYPEID == 1164) {
      getlocationPermission();
    } else {
      zoomToMarker();
    }

    return () => {
      props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
      backHandler.remove();
    }
  }, [props.navigation]);


  useEffect(() => {

    zoomToMarker();

  }, [gpslatlon]);

  const handleBackButton = () => {
    onGoBack();
    return true; // Prevent default back button behavior
  };

  const getlocationPermission = () => {
    checkPermissions().then(res => {
      if (res == true) {
        getOneTimeLocation();
        setLoading(false)
      } else {
        setLoading(false)
        setApiError('Permission Not Granted');
        setErrorModalVisible(true)
      }
    });
  }

  useFocusEffect(
    React.useCallback(() => {

      return () => {
        console.log('Screen is blurred');
      };
    }, [])
  );

  const checkPermissions = async () => {
    const permissionsToRequest = [];

    if (Platform.OS === 'android') {
      // Camera permission
      const cameraPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );
      if (cameraPermission !== PermissionsAndroid.RESULTS.GRANTED) {
        permissionsToRequest.push(PermissionsAndroid.PERMISSIONS.CAMERA);
      }

      // Location permission
      const locationPermission = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (locationPermission !== PermissionsAndroid.RESULTS.GRANTED) {
        permissionsToRequest.push(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      }

      // Request all pending permissions
      return requestPermissions(permissionsToRequest);
    } else {
      // For iOS and other platforms, use react-native-permissions
      const cameraResult = await check(PERMISSIONS.IOS.CAMERA);
      const locationResult = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

      const permissionsToRequest = [];

      if (cameraResult !== RESULTS.GRANTED) {
        permissionsToRequest.push(PERMISSIONS.IOS.CAMERA);
      }

      if (locationResult !== RESULTS.GRANTED) {
        permissionsToRequest.push(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      }

      // Request all pending permissions
      request(permissionsToRequest);
    }
  };

  const requestPermissions = async (permissions) => {
    if (Platform.OS === 'android') {
      try {
        const grantedPermissions = await PermissionsAndroid.requestMultiple(permissions);
        const allPermissionsGranted = Object.values(grantedPermissions).every(
          status => status === PermissionsAndroid.RESULTS.GRANTED
        );

        if (allPermissionsGranted) {
          // All permissions granted

        } else {

          // Handle denied permissions
        }
        return allPermissionsGranted
      } catch (error) {
        console.error(error);
      }
    } else {
      // For iOS and other platforms, use react-native-permissions
      const results = await request(permissions);

      if (results.every(result => result === RESULTS.GRANTED)) {
        // All permissions granted
      } else {
        // Handle denied permissions
      }
    }
  };

  const getSystemCodeDetail = async () => {

    const filteredMinAgeData = leadsystemCodeDetail.filter((data) => data.masterId === 'APPLICANT_MINIMUM_AGE').sort((a, b) => a.Description.localeCompare(b.Description));
    setMinAge(filteredMinAgeData[0].Description)

    const filteredMaritalStatusData = userCodeDetail.filter((data) => data.ID === 'MaritalStatusID').sort((a, b) => a.Description.localeCompare(b.Description));
    setMaritalStatusData(filteredMaritalStatusData);

    const filteredTitleData = leaduserCodeDetail.filter((data) => data.masterId === 'TITLE').sort((a, b) => a.Description.localeCompare(b.Description));
    setTitleData(filteredTitleData);

    const filteredGenderData = leadsystemCodeDetail.filter((data) => data.masterId === 'GENDER').sort((a, b) => a.Description.localeCompare(b.Description));
    setGenderData(filteredGenderData);

    const filteredCasteData = leaduserCodeDetail.filter((data) => data.masterId === 'CASTE').sort((a, b) => a.Description.localeCompare(b.Description));
    setCasteData(filteredCasteData);

    const filteredReligionData = leaduserCodeDetail.filter((data) => data.masterId === 'RELIGION').sort((a, b) => a.Description.localeCompare(b.Description));
    setReligionData(filteredReligionData);

    const filteredMotherTongueData = leaduserCodeDetail.filter((data) => data.masterId === 'MOTHER_TONGUE').sort((a, b) => a.Description.localeCompare(b.Description));
    setMotherTongueData(filteredMotherTongueData);

    const filteredEADData = leaduserCodeDetail.filter((data) => data.masterId === 'EDUCATIONAL_QUALIFICATION').sort((a, b) => a.Description.localeCompare(b.Description));
    setEADData(filteredEADData);

  };

  const makeSystemMandatoryFields = () => {

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_prsnl_dtl_title' && data.pageId === pageId).map((value, index) => {
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


    systemMandatoryField.filter((data) => data.fieldUiid === 'et_prsnl_dtl_first_name' && data.pageId === pageId).map((value, index) => {
      setFirstNameCaption(value.fieldName)

      if (value.isMandatory) {
        setFirstNameMan(true);
      }
      if (value.isHide) {
        setFirstNameVisible(false);
      }
      if (value.isDisable) {
        setFirstNameDisable(true);
      }
      if (value.isCaptionChange) {
        setFirstNameCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_prsnl_dtl_middle_name' && data.pageId === pageId).map((value, index) => {
      setMiddleNameCaption(value.fieldName)

      if (value.isMandatory) {
        setMiddleNameMan(true);
      }
      if (value.isHide) {
        setMiddleNameVisible(false);
      }
      if (value.isDisable) {
        setMiddleNameDisable(true);
      }
      if (value.isCaptionChange) {
        setMiddleNameCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_prsnl_dtl_last_name' && data.pageId === pageId).map((value, index) => {
      setLastNameCaption(value.fieldName)

      if (value.isMandatory) {
        setLastNameMan(true);
      }
      if (value.isHide) {
        setLastNameVisible(false);
      }
      if (value.isDisable) {
        setLastNameDisable(true);
      }
      if (value.isCaptionChange) {
        setLastNameCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_maritalstatus' && data.pageId === pageId).map((value, index) => {
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

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_prsnl_dtl_gender' && data.pageId === pageId).map((value, index) => {
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


    systemMandatoryField.filter((data) => data.fieldUiid === 'et_prsnl_dtl_date_of_birth' && data.pageId === pageId).map((value, index) => {
      setDOBCaption(value.fieldName)

      if (value.isMandatory) {
        setDOBMan(true);
      }
      if (value.isHide) {
        setDOBVisible(false);
      }
      if (value.isDisable) {
        setDOBDisable(true);
      }
      if (value.isCaptionChange) {
        setDOBCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_prsnl_dtl_age' && data.pageId === pageId).map((value, index) => {
      setAgeCaption(value.fieldName)

      if (value.isMandatory) {
        setAgeMan(true);
      }
      if (value.isHide) {
        setAgeVisible(false);
      }
      if (value.isDisable) {
        setAgeDisable(true);
      }
      if (value.isCaptionChange) {
        setAgeCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_prsnl_dtl_fathers name' && data.pageId === pageId).map((value, index) => {
      setFatherNameCaption(value.fieldName)

      if (value.isMandatory) {
        setFatherNameMan(true);
      }
      if (value.isHide) {
        setFatherNameVisible(false);
      }
      if (value.isDisable) {
        setFatherNameDisable(true);
      }
      if (value.isCaptionChange) {
        setFatherNameCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_prsnl_dtl_spouse name' && data.pageId === pageId).map((value, index) => {
      setSpouseNameCaption(value.fieldName)

      if (value.isMandatory) {
        setFatherNameMan(true);
      }
      if (value.isHide) {
        setFatherNameVisible(false);
      }
      if (value.isDisable) {
        setFatherNameDisable(true);
      }
      if (value.isCaptionChange) {
        setSpouseNameCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_prsnl_dtl_caste' && data.pageId === pageId).map((value, index) => {
      setCasteCaption(value.fieldName)

      if (value.isMandatory) {
        setCasteMan(true);
      }
      if (value.isHide) {
        setCasteVisible(false);
      }
      if (value.isDisable) {
        setCasteDisable(true);
      }
      if (value.isCaptionChange) {
        setCasteCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_prsnl_dtl_religion' && data.pageId === pageId).map((value, index) => {
      setReligionCaption(value.fieldName)

      if (value.isMandatory) {
        setReligionMan(true);
      }
      if (value.isHide) {
        setReligionVisible(false);
      }
      if (value.isDisable) {
        setReligionDisable(true);
      }
      if (value.isCaptionChange) {
        setReligionCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_prsnl_dtl_mother tongue' && data.pageId === pageId).map((value, index) => {
      setMotherTongueCaption(value.fieldName)

      if (value.isMandatory) {
        setMotherTongueMan(true);
      }
      if (value.isHide) {
        setMotherTongueVisible(false);
      }
      if (value.isDisable) {
        setMotherTongueDisable(true);
      }
      if (value.isCaptionChange) {
        setMotherTongueCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_prsnl_dtl_educational qualifications' && data.pageId === pageId).map((value, index) => {
      setEADCaption(value.fieldName)

      if (value.isMandatory) {
        setEADMan(true);
      }
      if (value.isHide) {
        setEADVisible(false);
      }
      if (value.isDisable) {
        setEADDisable(true);
      }
      if (value.isCaptionChange) {
        setEADCaption(value[0].fieldCaptionChange)
      }
    });


  };

  const getApplicantData = async () => {
    // Filter data based on loan application number
    const filteredData = props.loanInitiationDetails.filter(item => item.id === parseInt(global.LOANAPPLICATIONID));

    if (filteredData.length > 0) {

      const clientDetail = filteredData[0].clientDetail.find(client => client.id === parseInt(global.CLIENTID));

      if (clientDetail) {
        getClientData(clientDetail);
      }

    } else {
      if (global.DEBUG_MODE) console.log("Loan application number not found.");
    }

  };

  const getClientData = (value) => {

    setTitleLabel(value?.title ?? '');
    setFirstName(value?.firstName ?? '');
    setMiddleName(value?.middleName ?? '');
    setLastName(value?.lastName ?? '');
    setGenderLabel(value?.gender ?? '');
    setDOB(value?.dateOfBirth ?? '');
    setAge(value?.age.toString() ?? '');
    setFatherName(value?.fatherName ?? '');
    setSpouseName(value?.spouseName ?? '');
    setCasteLabel(value?.caste ?? '');
    setReligionLabel(value?.religion ?? '');
    setMotherTongueLabel(value?.motherTongue ?? '');
    setEADLabel(value?.educationQualification ?? '');
    setKYCManual(value?.isKycManual ?? '');

    var aadharverify = false;
    if (value.isAadharNumberVerified !== undefined && value.isAadharNumberVerified !== null) {
      if (value.isAadharNumberVerified) {
        setIsAadharVerified(true);
        aadharverify = true;
      } else {
        setIsAadharVerified(false);
        aadharverify = false;
      }
    }

    if (global.USERTYPEID == 1163) {
      if (value.isKycManual) {
        setHideDelete(true);
        setHideRetake(true);
      } else {
        fieldsDisable();
        setHideDelete(true);
        setHideRetake(true);
      }
    }

    disableAadharFields(aadharverify, value.fatherName, value.spouseName);
    if (value.dmsId !== undefined && value.dmsId !== null) {
      if (value.dmsId.toString().length > 0) {
        getImage(value.dmsId);
      }
      setDocID(value.dmsId);
    }

    if (value.geoCode !== undefined && value.geoCode !== null) {
      if (value.geoCode.length > 0) {
        const [latitude, longitude] = value.geoCode.split(',');
        setCurrentLongitude(parseFloat(longitude));
        setCurrentLatitude(parseFloat(latitude));
        zoomToMarker();
        setGPSLatLon(value.geoCode)
      }
    }

  }

  const disableAadharFields = (aadharverify, fatherName, spouseName) => {

    if (aadharverify) {
      setFirstNameDisable(true);
      setMiddleNameDisable(true);
      setMiddleNameMan(false);
      setLastNameDisable(true);
      setLastNameMan(false)

      setMiddleNameMan(false)
      setGenderDisable(true);
      setDOBDisable(true);
      setAgeDisable(true);

      if (fatherName !== undefined && fatherName !== null) {
        if (fatherName.length > 0) {
          setFatherNameDisable(true)
        }
      }
      if (spouseName !== undefined && spouseName !== null) {
        if (spouseName.length > 0) {
          setSpouseNameDisable(true)
        }
      }
    }
  }

  const fieldsDisable = () => {

    setTitleDisable(true);
    setFirstNameDisable(true);
    setMiddleNameDisable(true);
    setLastNameDisable(true);
    setGenderDisable(true);
    setDOBDisable(true);
    setAgeDisable(true);
    setFatherNameDisable(true)
    setSpouseNameDisable(true)
    setCasteDisable(true);
    setReligionDisable(true);
    setMotherTongueDisable(true);
    setEADDisable(true);

  }

  const getImage = (dmsID) => {

    Common.getNetworkConnection().then(value => {
      if (value.isConnected == true) {
        setLoading(true)
        const baseURL = global.PORT2
        apiInstance(baseURL).get(`/api/documents/document/${parseInt(dmsID)}`)
          .then(async (response) => {
            // Handle the response data
            console.log("GetPhotoApiResponse::" + JSON.stringify(response.data));
            if (response.status == 200) {
              setFileName(response.data.fileName)
              setVisible(false)
              setImageUri('data:image/png;base64,' + response.data.base64Content)
              // props.navigation.navigate('LeadManagement', { fromScreen: 'LeadCompletion' })
            }
            else if (response.data.statusCode === 201) {
              setApiError(response.data.message);
              setErrorModalVisible(true);
            } else if (response.data.statusCode === 202) {
              setApiError(response.data.message);
              setErrorModalVisible(true);
            }
            setLoading(false)

          })
          .catch((error) => {
            // Handle the error
            setLoading(false)
            if (global.DEBUG_MODE) console.log("GetPhotoApiResponse::" + JSON.stringify(error.response.data));
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
      } else {
        setApiError(language[0][props.language].str_errinternetimage);
        setErrorModalVisible(true)

      }

    })
  }

  const uploadImage = async () => {

    if (global.USERTYPEID == 1163) {
      if (kycManual == '1') {
        updateApplicantDetails(docID)
      } else {
        navigatetoAddress();
        return;
      }
    }

    if (validate()) {
      showBottomSheet();
      return;
    }

    Common.getNetworkConnection().then(value => {
      if (value.isConnected == true) {
        updateImage();
      } else {
        setApiError(language[0][props.language].str_errinternet);
        setErrorModalVisible(true)
      }

    })


  };

  const updateImage = async () => {
    if (imageUri) {

      setLoading(true);
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        type: fileType,
        name: fileName,
      });

      try {
        const response = await fetch(global.BASEURL + '8094/api/documents', {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.ok) {
          const data = await response.json();
          // Handle the response from Cloudinary

          setDocID(data.docId);
          updateApplicantDetails(data.docId)

        } else {
          if (global.DEBUG_MODE) console.log('Upload failed:', response.status);
          setApiError(response.status);
          setErrorModalVisible(true)
        }
      } catch (error) {
        if (global.DEBUG_MODE) console.log('Upload error:', error);
        setApiError(error.response.data.message);
        setErrorModalVisible(true)
      } finally {
        setLoading(false);
      }
    }
  }

  const updateApplicantDetails = (id) => {
    var manualKYC = false;
    if (isAadharVerified) {
      manualKYC = true;
    }
    if (validate()) {
      showBottomSheet();
    } else {
      const appDetails = {
        "isActive": true,
        "createdBy": global.USERID,
        "id": global.CLIENTID,
        "clientType": global.CLIENTTYPE,
        "title": TitleLabel,
        "firstName": firstName,
        "middleName": middleName,
        "lastName": lastName,
        "dateOfBirth": Common.convertYearDateFormat(DOB),
        "age": parseInt(Age),
        "fatherName": FatherName,
        "spouseName": SpouseName,
        "caste": CasteLabel,
        "religion": ReligionLabel,
        "motherTongue": MotherTongueLabel,
        "educationQualification": EADLabel,
        "gender": GenderLabel,
        "dmsId": id,
        "imageName": fileName,
        "geoCode": currentLatitude + "," + currentLongitude,
        "kycManual": manualKYC,
      }
      const baseURL = global.PORT1;
      setLoading(true);
      apiInstance(baseURL)
        .put(`/api/v2/profile-short/personal-details/${global.CLIENTID}`, appDetails)
        .then(async response => {
          // Handle the response data
          if (global.DEBUG_MODE) console.log('PersonalDetailApiResponse::' + JSON.stringify(response.data));
          await tbl_client.updatePersonalDetails(TitleLabel, firstName, middleName, lastName, DOB, Age, GenderLabel, FatherName, SpouseName, CasteLabel, ReligionLabel, MotherTongueLabel, EADLabel, gpslatlon, id, global.LOANAPPLICATIONID);

          setLoading(false);
          if (response.status == 200) {
            props.updateLoanInitiationDetails(parseInt(global.LOANAPPLICATIONID), [], 'clientDetail', response.data.id, response.data)
            if (global.USERTYPEID == 1163) {
              navigatetoAddress();
            } else {
              updateLoanStatus();
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
    }
  };

  const navigatetoAddress = async () => {
    var page = '';
    if (global.CLIENTTYPE == 'APPL') {
      page = 'PRF_SHRT_APLCT_ADDRS_DTLS';
    } else if (global.CLIENTTYPE == 'CO-APPL') {
      page = 'PRF_SHRT_COAPLCT_ADDRS_DTLS';
    } else if (global.CLIENTTYPE == 'GRNTR') {
      page = 'PRF_SHRT_GRNTR_ADDRS_DTLS';
    }
    await Common.getPageID(global.FILTEREDPROCESSMODULE, page)
    props.navigation.replace('AddressMainList')
  }

  const updateLoanStatus = () => {

    var module = ''; var page = '';

    if (global.CLIENTTYPE == 'APPL') {
      module = 'PRF_SHRT_APLCT';
      page = 'PRF_SHRT_APLCT_PRSNL_DTLS';
    } else if (global.CLIENTTYPE == 'CO-APPL') {
      module = 'PRF_SHRT_COAPLCT';
      page = 'PRF_SHRT_COAPLCT_PRSNL_DTLS';
    } else if (global.CLIENTTYPE == 'GRNTR') {
      module = 'PRF_SHRT_GRNTR';
      page = 'PRF_SHRT_GRNTR_PRSNL_DTLS';
    }

    const appDetails = {
      "loanApplicationId": global.LOANAPPLICATIONID,
      "loanWorkflowStage": "LN_APP_INITIATION",
      "subStageCode": "PRF_SHRT",
      "moduleCode": module,
      "pageCode": page,
      "status": "Completed"
    }
    const baseURL = global.PORT1;
    setLoading(true);
    apiInstance(baseURL)
      .post(`/api/v2/loan-application-status/updateStatus`, appDetails)
      .then(async response => {
        // Handle the response data
        if (global.DEBUG_MODE) console.log('UpdateStatusApiResponse::' + JSON.stringify(response.data),);
        setLoading(false);
        if (response.status == 200) {
          if (global.CLIENTTYPE == 'APPL') {
            global.COMPLETEDMODULE = 'PRF_SHRT_APLCT';
            global.COMPLETEDPAGE = 'PRF_SHRT_APLCT_PRSNL_DTLS';
          } else if (global.CLIENTTYPE == 'CO-APPL') {
            global.COMPLETEDMODULE = 'PRF_SHRT_COAPLCT';
            global.COMPLETEDPAGE = 'PRF_SHRT_COAPLCT_PRSNL_DTLS';
          } else if (global.CLIENTTYPE == 'GRNTR') {
            global.COMPLETEDMODULE = 'PRF_SHRT_GRNTR';
            global.COMPLETEDPAGE = 'PRF_SHRT_GRNTR_PRSNL_DTLS';
          }
          navigatetoAddress();
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
        if (global.DEBUG_MODE) console.log('UpdateStatusApiResponse' + JSON.stringify(error.response));
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

  const zoomToMarker = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: currentLatitude,
          longitude: currentLongitude,
          latitudeDelta: 0.02, // Adjust the zoom level as needed
          longitudeDelta: 0.02,
        },
        1000, // Duration of the animation in milliseconds
      );
    }
  };

  const pickImage = () => {
    // setVisible(false)

    hidephotoBottomSheet();
    ImagePicker.openCamera({
      cropping: true,
    }).then(image => {
      setImageFile(image)

      const lastDotIndex = image.path.lastIndexOf('.');
      var imageName = 'Photo' + '_' + global.CLIENTID;
      if (lastDotIndex !== -1) {
        // Get the substring from the last dot to the end of the string
        const fileExtension = image.path.substring(lastDotIndex);
        imageName = imageName + fileExtension;
        console.log('File extension:', fileExtension);
      }

      // const imageName = image.path.split('/').pop();
      setFileType(image.mime)
      setFileName(imageName)
      setImageUri(image.path)
      setVisible(false)
      props.onChange?.(image);
    })

  };

  const selectImage = async () => {
    // setVisible(false)

    hidephotoBottomSheet();
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      setImageFile(image);

      const lastDotIndex = image.path.lastIndexOf('.');
      var imageName = 'Photo' + '_' + global.leadID;
      if (lastDotIndex !== -1) {
        // Get the substring from the last dot to the end of the string
        const fileExtension = image.path.substring(lastDotIndex);
        imageName = imageName + fileExtension;
        console.log('File extension:', fileExtension);
      }
      setFileType(image.mime)
      setFileName(imageName)
      setImageUri(image.path)
      setVisible(false)
      setDeleteVisible(false)
      props.onChange?.(image);
    })

  };

  const getOneTimeLocation = () => {

    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setLocationStatus('You are Here');

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(parseFloat(currentLongitude));

        //Setting Longitude state
        setCurrentLatitude(parseFloat(currentLatitude));

        // setGPSLatLon(currentLatitude+","+currentLongitude)
        zoomToMarker();
        setGPSLatLon(prevCount => currentLatitude + ',' + currentLongitude);
      },
      error => {
        alert(error.message)
        setLocationStatus(error.message);
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  const validate = () => {
    var flag = false;
    var i = 1;
    var errorMessage = '';

    if (imageUri == null) {
      errorMessage =
        errorMessage +
        i +
        ')' +
        ' ' +
        language[0][props.language].str_errorimage +
        '\n';
      i++;
      flag = true;
    }

    if (TitleMan && TitleVisible) {
      if (TitleLabel.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          TitleCaption +
          '\n';
        i++;
        flag = true;
      }
    }
    if (firstNameMan && firstNameVisible) {
      if (firstName.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          firstNameCaption +
          '\n';
        i++;
        flag = true;
      }
    }
    if (middleNameMan && middleNameVisible) {
      if (middleName.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          middleNameCaption +
          '\n';
        i++;
        flag = true;
      }
    }
    if (lastNameMan && lastNameVisible) {
      if (lastName.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          lastNameCaption +
          '\n';
        i++;
        flag = true;
      }
    }
    if (GenderMan && GenderVisible) {
      if (GenderLabel.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          GenderCaption +
          '\n';
        i++;
        flag = true;
      }
    }
    if (DOBMan && DOBVisible) {
      if (DOB.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          DOBCaption +
          '\n';
        i++;
        flag = true;
      }
    }

    if (AgeMan && AgeVisible) {
      if (Age.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          AgeCaption +
          '\n';
        i++;
        flag = true;
      } else if (parseInt(Age) < parseInt(minAge)) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          AgeCaption +
          " Cannot be less than " + minAge +
          '\n';
        i++;
        flag = true;
      }
    }
    if (FatherNameMan && FatherNameVisible) {
      if (FatherName.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          FatherNameCaption +
          '\n';
        i++;
        flag = true;
      }
    }
    if (SpouseNameMan && SpouseNameVisible) {
      if (SpouseName.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          SpouseNameCaption +
          '\n';
        i++;
        flag = true;
      }
    }
    if (CasteMan && CasteVisible) {
      if (CasteLabel.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          CasteCaption +
          '\n';
        i++;
        flag = true;
      }
    }
    if (ReligionMan && ReligionVisible) {
      if (ReligionLabel.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          ReligionCaption +
          '\n';
        i++;
        flag = true;
      }
    }
    if (MotherTongueMan && MotherTongueVisible) {
      if (MotherTongueLabel.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          MotherTongueCaption +
          '\n';
        i++;
        flag = true;
      }
    }
    if (EADMan && EADVisible) {
      if (EADLabel.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          EADCaption +
          '\n';
        i++;
        flag = true;
      }
    }

    if (TitleVisible && GenderVisible) {
      if (TitleLabel === 'MR') {
        if (GenderLabel == 'F') {
          errorMessage = errorMessage + i + ')' + ' ' + TitleCaption + ' AND ' + GenderCaption + ' Not matching' + '\n';
          i++;
          flag = true;
        }
      } else if (TitleLabel === 'MRS' || TitleLabel === 'MISS') {
        if (GenderLabel == 'M') {
          errorMessage = errorMessage + i + ')' + ' ' + TitleCaption + ' AND ' + GenderCaption + ' Not matching' + '\n';
          i++;
          flag = true;
        }
      }
    }

    setErrMsg(errorMessage);
    return flag;
  };

  const handleClick = (componentName, textValue) => {

    if (componentName === 'firstName') {
      setFirstName(textValue);
    } else if (componentName === 'middleName') {
      setMiddleName(textValue);
    } else if (componentName === 'lastName') {
      setLastName(textValue);
    } else if (componentName === 'DOB') {
      setDOB(textValue);
      setAge(Common.calculateAge(textValue).toString())
    } else if (componentName === 'Age') {
      setAge(textValue);
    } else if (componentName === 'FatherName') {
      setFatherName(textValue);
    } else if (componentName === 'SpouseName') {
      setSpouseName(textValue);
    }
  };

  const handleReference = componentName => {
    if (componentName === 'firstName') {
      middleNameRef.current.focus();
    } else if (componentName === 'middleName') {
      lastNameRef.current.focus();
    } else if (componentName === 'lastName') {
      DOBRef.current.focus();
    } else if (componentName === 'DOB') {
      AgeRef.current.focus();
    } else if (componentName === 'Age') {
      FatherNameRef.current.focus();
    } else if (componentName === 'FatherName') {
      SpouseNameRef.current.focus();
    }
  };

  const handlePickerClick = (componentName, label, index) => {
    if (componentName === 'Title') {
      setTitleLabel(label);
      setTitleIndex(index);
    } else if (componentName === 'Gender') {
      setGenderLabel(label);
      setGenderIndex(index);
    } else if (componentName === 'Caste') {
      setCasteLabel(label);
      setCasteIndex(index);
    } else if (componentName === 'Religion') {
      setReligionLabel(label);
      setReligionIndex(index);
    } else if (componentName === 'MotherTongue') {
      setMotherTongueLabel(label);
      setMotherTongueIndex(index);
    } else if (componentName === 'EAD') {
      setEADLabel(label);
      setEADIndex(index);
    }
  };

  const onGoBack = () => {
    props.navigation.replace('LoanApplicationMain', { fromScreen: 'PersonalDetail' })
  }

  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  const previewImage = () => {
    setBottomSheetVisible(false);
    props.navigation.navigate('PreviewImage', { imageName: fileName, imageUri: imageUri })
  }

  const reTakePhoto = () => {
    setphotoOptionvisible(true)
    setBottomSheetVisible(false);
  }

  const deletePhoto = () => {
    setDeleteVisible(true);
  }

  const onDeleteorCancel = (value) => {
    if (value == 'Cancel') {
      setDeleteVisible(false);
      hideImageBottomSheet();
    } else {
      setImageUri(null);
      setFileName('');
      setFileType('');
      setImageFile('');
      setDeleteVisible(false);
      setVisible(true)
      hideImageBottomSheet();
    }
  }

  return (
    // enclose all components in this View tag
    <SafeAreaView
      style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>
      <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
      <ErrorModal isVisible={errorModalVisible} onClose={closeErrorModal} textContent={apiError} textClose={language[0][props.language].str_ok} />
      <ImageBottomPreview bottomSheetVisible={bottomSheetVisible} previewImage={previewImage} hideBottomSheet={hideImageBottomSheet} reTakePhoto={reTakePhoto} fileName={fileName} detailHide={true} deleteVisible={deleteVisible} deletePhoto={deletePhoto} onDeleteorCancel={onDeleteorCancel} hideDelete={hideDelete} hideRetake={hideRetake} />

      <Modal
        isVisible={photoOptionvisible}
        onBackdropPress={hidephotoBottomSheet}
        style={styles.modal}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            onPress={() => hidephotoBottomSheet()}
            style={{
              width: 33,
              height: 33,
              position: 'absolute',
              right: 0,
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1,
              backgroundColor: Colors.common,
              borderBottomStartRadius: 10,
            }}>
            <AntDesign name="close" size={18} color={Colors.black} />
          </TouchableOpacity>

          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ width: '30%', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => pickImage()} activeOpacity={11}>
                <View style={{
                  width: 53, height: 53, borderRadius: 53, backgroundColor: '#E74C3C',
                  alignItems: 'center', justifyContent: 'center'
                }}>
                  <Ionicons name='camera-outline' size={31} color={Colors.white} />
                </View>
              </TouchableOpacity>
              <Text style={{ fontSize: 14, color: Colors.black, marginTop: 7, fontFamily: 'PoppinsRegular' }}>Camera</Text>
            </View>
            {/* <View style={{ width: '30%', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => selectImage()} activeOpacity={11}>
                <View style={{
                  width: 53, height: 53, borderRadius: 53, backgroundColor: '#8E44AD',
                  alignItems: 'center', justifyContent: 'center'
                }}>
                  <Ionicons name='image-outline' size={27} color={Colors.white} />
                </View>
              </TouchableOpacity>
              <Text style={{ fontSize: 14, color: Colors.black, marginTop: 7 }}>Gallery</Text>
            </View> */}

          </View>
        </View>
      </Modal>

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
        textval={global.CLIENTTYPE == 'APPL' ? language[0][props.language].str_applicantdetails : global.CLIENTTYPE == 'CO-APPL' ? language[0][props.language].str_coapplicantdetails : language[0][props.language].str_guarantordetails}
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
                  fontWeight: '500',
                }}
                textVal={
                  language[0][props.language].str_personaldetails
                }></TextComp>

              <ProgressComp progressvalue={0.75} textvalue="3 of 4" />
            </View>
          </View>

          {TitleVisible && (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: '4%',
              }}>
              <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                <TextComp
                  textVal={TitleCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={TitleMan}
                />
              </View>

              <PickerComp
                textLabel={TitleLabel}
                pickerStyle={Commonstyles.picker}
                Disable={TitleDisable}
                pickerdata={TitleData}
                componentName="Title"
                handlePickerClick={handlePickerClick}
              />
            </View>
          )}

          {firstNameVisible && (
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
                  textVal={firstNameCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={firstNameMan}
                />
              </View>

              <TextInputComp
                textValue={firstName}
                textStyle={Commonstyles.textinputtextStyle}
                type="email-address"
                Disable={firstNameDisable}
                ComponentName="firstName"
                reference={firstNameRef}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
              />
            </View>
          )}

          {middleNameVisible && (
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
                  textVal={middleNameCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={middleNameMan}
                />
              </View>

              <TextInputComp
                textValue={middleName}
                textStyle={Commonstyles.textinputtextStyle}
                type="email-address"
                Disable={middleNameDisable}
                ComponentName="middleName"
                reference={middleNameRef}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
              />
            </View>
          )}

          {lastNameVisible && (
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
                  textVal={lastNameCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={lastNameMan}
                />
              </View>

              <TextInputComp
                textValue={lastName}
                textStyle={Commonstyles.textinputtextStyle}
                type="email-address"
                Disable={lastNameDisable}
                ComponentName="lastName"
                reference={lastNameRef}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
              />
            </View>
          )}

          {GenderVisible && (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: '4%',
              }}>
              <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                <TextComp
                  textVal={GenderCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={GenderMan}
                />
              </View>

              <PickerComp
                textLabel={GenderLabel}
                pickerStyle={Commonstyles.picker}
                Disable={GenderDisable}
                pickerdata={GenderData}
                componentName="Gender"
                handlePickerClick={handlePickerClick}
              />
            </View>
          )}


          {DOBVisible && (
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
                  textVal={DOBCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={DOBMan}
                />
              </View>

              <View style={{ width: '100%', alignItems: 'center' }}>
                <DateInputComp textStyle={[Commonstyles.inputtextStyle, { width: '90%' }]} ComponentName="DOB"
                  textValue={DOB}
                  type="numeric"
                  handleClick={handleClick}
                  Disable={DOBDisable}
                  reference={DOBRef}
                  maxDate={new Date()}
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

          {AgeVisible && (
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
                  textVal={AgeCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={AgeMan}
                />
              </View>

              <TextInputComp
                textValue={Age}
                textStyle={Commonstyles.textinputtextStyle}
                type="numeric"
                Disable={AgeDisable}
                ComponentName="Age"
                reference={AgeRef}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
              />
            </View>
          )}

          {FatherNameVisible && (
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
                  textVal={FatherNameCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={FatherNameMan}
                />
              </View>

              <TextInputComp
                textValue={FatherName}
                textStyle={Commonstyles.textinputtextStyle}
                type="email-address"
                Disable={FatherNameDisable}
                ComponentName="FatherName"
                reference={FatherNameRef}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
                length={30}
              />
            </View>
          )}

          {SpouseNameVisible && (
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
                  textVal={SpouseNameCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={SpouseNameMan}
                />
              </View>

              <TextInputComp
                textValue={SpouseName}
                textStyle={Commonstyles.textinputtextStyle}
                type="email-address"
                Disable={SpouseNameDisable}
                ComponentName="SpouseName"
                reference={SpouseNameRef}
                returnKey="done"
                handleClick={handleClick}
                length={30}
                handleReference={handleReference}
              />
            </View>
          )}
          {CasteVisible && (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: '4%',
              }}>
              <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                <TextComp
                  textVal={CasteCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={CasteMan}
                />
              </View>

              <PickerComp
                textLabel={CasteLabel}
                pickerStyle={Commonstyles.picker}
                Disable={CasteDisable}
                pickerdata={CasteData}
                componentName="Caste"
                handlePickerClick={handlePickerClick}
              />
            </View>
          )}
          {ReligionVisible && (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: '4%',
              }}>
              <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                <TextComp
                  textVal={ReligionCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={ReligionMan}
                />
              </View>

              <PickerComp
                textLabel={ReligionLabel}
                pickerStyle={Commonstyles.picker}
                Disable={ReligionDisable}
                pickerdata={ReligionData}
                componentName="Religion"
                handlePickerClick={handlePickerClick}
              />
            </View>
          )}
          {MotherTongueVisible && (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: '4%',
              }}>
              <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                <TextComp
                  textVal={MotherTongueCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={MotherTongueMan}
                />
              </View>

              <PickerComp
                textLabel={MotherTongueLabel}
                pickerStyle={Commonstyles.picker}
                Disable={MotherTongueDisable}
                pickerdata={MotherTongueData}
                componentName="MotherTongue"
                handlePickerClick={handlePickerClick}
              />
            </View>
          )}
          {EADVisible && (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: '4%',
              }}>
              <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                <TextComp
                  textVal={EADCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={EADMan}
                />
              </View>

              <PickerComp
                textLabel={EADLabel}
                pickerStyle={Commonstyles.picker}
                Disable={EADDisable}
                pickerdata={EADData}
                componentName="EAD"
                handlePickerClick={handlePickerClick}
              />
            </View>
          )}


          <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
              <TextComp
                textVal={language[0][props.language].str_capturecustpht}
                textStyle={Commonstyles.inputtextStyle}
                Visible={true}
              />
            </View>

            {visible && (
              <TouchableOpacity
                onPress={() => {
                  showphotoBottomSheet();
                }}
                style={{
                  width: '90%',
                  height: 170,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                  paddingHorizontal: 0,
                  borderRadius: 10,
                  backgroundColor: '#e2e2e2',
                }}>
                <View>
                  <Entypo name="camera" size={25} color={Colors.darkblack} />
                </View>
              </TouchableOpacity>
            )}

            {!visible && (
              <TouchableOpacity style={{
                width: '90%',
                height: 170,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 10,
                paddingHorizontal: 0,
                borderRadius: 10,
                backgroundColor: '#e2e2e2',
              }} onPress={() => { props.navigation.navigate('PreviewImage', { imageName: fileName, imageUri: imageUri }) }}>


                <View style={{ width: '100%', height: 170 }}>
                  <Image
                    source={{ uri: imageUri }}
                    style={{ width: '100%', height: 170, borderRadius: 10 }}
                  />
                </View>
              </TouchableOpacity>
            )}



            {!visible && (
              <View
                style={{
                  width: '90%',
                  justifyContent: 'center',
                  marginTop: 15,
                  paddingHorizontal: 0,
                  flexDirection: 'row',
                }}>
                <TextComp
                  textVal={fileName}
                  textStyle={{
                    width: '90%',
                    fontSize: 14,
                    color: Colors.mediumgrey,
                    fontFamily: 'PoppinsRegular'
                  }}
                  Visible={false}
                />

                <TouchableOpacity
                  onPress={() => {
                    showImageBottomSheet();
                    setDeleteVisible(false);
                  }}>
                  <Entypo
                    name="dots-three-vertical"
                    size={25}
                    color={Colors.darkblue}
                  />
                </TouchableOpacity>
              </View>
            )}
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
                textVal={language[0][props.language].str_gpslocation}
                textStyle={Commonstyles.inputtextStyle}
                Visible={true}
              />
            </View>

            <View
              style={{
                width: '90%',
                flexDirection: 'row',
                marginTop: 3,
                paddingHorizontal: 0,
                borderBottomWidth: 1,
                borderBottomColor: '#e2e2e2',
              }}>
              <TextInput
                value={gpslatlon}
                onChangeText={txt => setGPSLatLon(txt)}
                placeholder={''}
                editable={false}
                placeholderTextColor={Colors.lightgrey}
                secureTextEntry={false}
                autoCapitalize="none"
                style={Commonstyles.textinputtextStyle}
              />

              <TouchableOpacity
                onPress={() => {
                  if (global.USERTYPEID == 1163) {
                    zoomToMarker();
                  } else {
                    getlocationPermission();
                  }

                }}
                style={{ marginLeft: 8, marginTop: 5 }}
                activeOpacity={0.5}>
                <FontAwesome6
                  name="location-dot"
                  size={23}
                  color={Colors.darkblue}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
            <View
              style={{
                width: '90%',
                marginTop: 3,
                paddingHorizontal: 0,
                borderBottomWidth: 1,
                borderBottomColor: '#e2e2e2',
              }}>
              <MapView
                style={{ width: '100%', height: 200, marginTop: 15 }}
                ref={mapRef}
                initialRegion={{
                  latitude: currentLatitude,
                  longitude: currentLongitude,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.02,
                }}>
                <Marker
                  coordinate={{
                    latitude: parseFloat(currentLatitude),
                    longitude: parseFloat(currentLongitude),
                  }}
                  onDragEnd={e =>
                    alert(JSON.stringify(e.nativeEvent.coordinate))
                  }
                //title={'Test Marker'}
                //description={'This is a description of the marker'}
                />
              </MapView>
            </View>
          </View>

        </View>

        <ButtonViewComp
          textValue={language[0][props.language].str_next.toUpperCase()}
          textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
          viewStyle={Commonstyles.buttonView}
          innerStyle={Commonstyles.buttonViewInnerStyle}
          handleClick={uploadImage}
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
  const { loanInitiationDetails } = state.loanInitiationReducer;
  return {
    language: language,
    profiledetail: profileDetails,
    mobilecodedetail: mobileCodeDetails,
    loanInitiationDetails: loanInitiationDetails,
  }
}

const mapDispatchToProps = dispatch => ({
  languageAction: item => dispatch(languageAction(item)),
  updateLoanInitiationDetails: (loanApplicationId, loanData, key, clientId, updatedDetails) => dispatch(updateLoanInitiationDetails(loanApplicationId, loanData, key, clientId, updatedDetails)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileShortApplicantDetails);
