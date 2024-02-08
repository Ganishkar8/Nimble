import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  Button,
  Platform, PermissionsAndroid, BackHandler
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
import ProgressComp from '../../../Components/ProgressComp';
import tbl_SystemMandatoryFields from '../../../Database/Table/tbl_SystemMandatoryFields';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Common from '../../../Utils/Common';
import tbl_SystemCodeDetails from '../../../Database/Table/tbl_SystemCodeDetails';
import TextInputComp from '../../../Components/TextInputComp';
import PickerComp from '../../../Components/PickerComp';
import ButtonViewComp from '../../../Components/ButtonViewComp';
import ErrorMessageModal from '../../../Components/ErrorMessageModal';
import { Directions } from 'react-native-gesture-handler';
import ChildHeadComp from '../../../Components/ChildHeadComp';
import CheckBoxComp from '../../../Components/CheckBoxComp';
import DocumentPicker from 'react-native-document-picker';
import tbl_client from '../../../Database/Table/tbl_client';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import ImageBottomPreview from '../../../Components/ImageBottomPreview';
import ImageDetailComp from '../../../Components/ImageDetailComp';
import Geolocation from 'react-native-geolocation-service';
import { useIsFocused } from '@react-navigation/native';
import ErrorModal from '../../../Components/ErrorModal';
import DateInputComp from '../../../Components/DateInputComp';
import { updateNestedClientDetails, deleteLoanInitiationDetails } from '../../../Utils/redux/actions/loanInitiationAction';

const ProfileShortKYCVerificationStatus = (props, { navigation }) => {
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
  const showBottomSheet = () => setBottomErrorSheetVisible(true);
  const hideBottomSheet = () => setBottomErrorSheetVisible(false);
  const [KYC1Caption, setKYC1Caption] = useState('KYC 1');
  const [KYC1, setKYC1] = useState(true);
  const [KYC2Caption, setKYC2Caption] = useState('KYC 2');
  const [KYC2, setKYC2] = useState(true);
  const [KYC3Caption, setKYC3Caption] = useState('KYC 3');
  const [KYC3, setKYC3] = useState(true);
  const [KYC4Caption, setKYC4Caption] = useState('KYC 4');
  const [KYC4, setKYC4] = useState(true);
  const [kycSourceDmsId, setkycSourceDmsId] = useState('');
  const [kycID1DmsId, setkycID1DmsId] = useState('');
  const [dobDmsId, setdobDmsId] = useState('');

  const [LoanApplicationID, setLoanApplicationID] = useState('');
  const [LoanApplicationIDCaption, setLoanApplicationIDCaption] = useState('Loan APPLICATION ID');
  const [LoanApplicationIDMan, setLoanApplicationIDMan] = useState(false);
  const [LoanApplicationIDVisible, setLoanApplicationIDVisible] =
    useState(false);
  const [LoanApplicationIDDisable, setLoanApplicationIDDisable] =
    useState(false);
  const LoanApplicationIDRef = useRef(null);

  const [KycTypeMan, setKycTypeMan] = useState(false);
  const [KycTypeVisible, setKycTypeVisible] = useState(true);
  const [KycTypeDisable, setKycTypeDisable] = useState(false);
  const [KycTypeData, setKycTypeData] = useState([]);
  const [KycTypeCaption, setKycTypeCaption] = useState('KYC TYPE');
  const [KycTypeLabel, setKycTypeLabel] = useState('');
  const [KycTypeIndex, setKycTypeIndex] = useState('');

  const [KycType1Man, setKycType1Man] = useState(false);
  const [KycType1Visible, setKycType1Visible] = useState(true);
  const [KycType1Disable, setKycType1Disable] = useState(true);
  const [KycType1Data, setKycType1Data] = useState([]);
  const [KycType1Caption, setKycType1Caption] = useState('KYC TYPE 1');
  const [KycType1Label, setKycType1Label] = useState('');
  const [KycType1Index, setKycType1Index] = useState('');

  const [KycType2Man, setKycType2Man] = useState(false);
  const [KycType2Visible, setKycType2Visible] = useState(true);
  const [KycType2Disable, setKycType2Disable] = useState(true);
  const [KycType2Data, setKycType2Data] = useState([]);
  const [KycType2Caption, setKycType2Caption] = useState('KYC TYPE 2');
  const [KycType2Label, setKycType2Label] = useState('');
  const [KycType2Index, setKycType2Index] = useState('');

  const [KycType3Man, setKycType3Man] = useState(false);
  const [KycType3Visible, setKycType3Visible] = useState(true);
  const [KycType3Disable, setKycType3Disable] = useState(true);
  const [KycType3Data, setKycType3Data] = useState([]);
  const [KycType3Caption, setKycType3Caption] = useState('KYC TYPE 3');
  const [KycType3Label, setKycType3Label] = useState('');
  const [KycType3Index, setKycType3Index] = useState('');

  const [KycType4Man, setKycType4Man] = useState(false);
  const [KycType4Visible, setKycType4Visible] = useState(true);
  const [KycType4Disable, setKycType4Disable] = useState(true);
  const [KycType4Data, setKycType4Data] = useState([]);
  const [KycType4Caption, setKycType4Caption] = useState('KYC TYPE 4');
  const [KycType4Label, setKycType4Label] = useState('');
  const [KycType4Index, setKycType4Index] = useState('');

  const [kycID, setkycID] = useState('');
  const [kycIDCaption, setkycIDCaption] = useState('KYC ID');
  const [kycIDMan, setkycIDMan] = useState(false);
  const [kycIDVisible, setkycIDVisible] = useState(true);
  const [kycIDDisable, setkycIDDisable] = useState(true);
  const KycIDRef = useRef(null);

  const [kycExpiryDate, setkycExpiryDate] = useState('');
  const [kycExpiryDateCaption, setkycExpiryDateCaption] = useState('EXPIRY DATE');
  const [kycExpiryDateMan, setkycExpiryDateMan] = useState(false);
  const [kycExpiryDateVisible, setkycExpiryDateVisible] = useState(false);
  const [kycExpiryDateDisable, setkycExpiryDateDisable] = useState(true);
  const KycExpiryDateRef = useRef(null);

  const [kycID1, setkycID1] = useState('');
  const [kycID1Caption, setkycID1Caption] = useState('KYC ID 1');
  const [kycID1Man, setkycID1Man] = useState(false);
  const [kycID1Visible, setkycID1Visible] = useState(true);
  const [kycID1Disable, setkycID1Disable] = useState(true);
  const KycID1Ref = useRef(null);

  const [kycID2, setkycID2] = useState('');
  const [kycID2Caption, setkycID2Caption] = useState('KYC ID 2');
  const [kycID2Man, setkycID2Man] = useState(false);
  const [kycID2Visible, setkycID2Visible] = useState(true);
  const [kycID2Disable, setkycID2Disable] = useState(true);
  const KycID2Ref = useRef(null);

  const [kycID3, setkycID3] = useState('');
  const [kycID3Caption, setkycID3Caption] = useState('KYC ID 3');
  const [kycID3Man, setkycID3Man] = useState(false);
  const [kycID3Visible, setkycID3Visible] = useState(true);
  const [kycID3Disable, setkycID3Disable] = useState(true);
  const KycID3Ref = useRef(null);

  const [kycID4, setkycID4] = useState('');
  const [kycID4Caption, setkycID4Caption] = useState('KYC ID 4');
  const [kycID4Man, setkycID4Man] = useState(false);
  const [kycID4Visible, setkycID4Visible] = useState(true);
  const [kycID4Disable, setkycID4Disable] = useState(true);
  const KycID4Ref = useRef(null);

  const [KycSourceMan, setKycSourceMan] = useState(false);
  const [KycSourceVisible, setKycSourceVisible] = useState(true);
  const [KycSourceDisable, setKycSourceDisable] = useState(true);
  const [KycSourceData, setKycSourceData] = useState([]);
  const [KycSourceCaption, setKycSourceCaption] = useState('KYC SOURCE');
  const [KycSourceLabel, setKycSourceLabel] = useState('');
  const [KycSourceIndex, setKycSourceIndex] = useState('');


  const [expiryDate1, setExpiry1Date] = useState('');
  const [expiryDate2, setExpiry2Date] = useState('');
  const [expiryDate3, setExpiry3Date] = useState('');
  const [expiryDate4, setExpiry4Date] = useState('');
  const [expiryDateCaption, setExpiryDateCaption] = useState('EXPIRY DATE');
  const [expiryDate1Man, setExpiry1DateMan] = useState(false);
  const [expiryDate2Man, setExpiry2DateMan] = useState(false);
  const [expiryDate3Man, setExpiry3DateMan] = useState(false);
  const [expiryDate4Man, setExpiry4DateMan] = useState(false);
  const [expiryDate1Visible, setExpiry1DateVisible] = useState(false);
  const [expiryDate2Visible, setExpiry2DateVisible] = useState(false);
  const [expiryDate3Visible, setExpiry3DateVisible] = useState(false);
  const [expiryDate4Visible, setExpiry4DateVisible] = useState(false);
  const [expiryDate1Disable, setExpiry1DateDisable] = useState(true);
  const [expiryDate2Disable, setExpiry2DateDisable] = useState(true);
  const [expiryDate3Disable, setExpiry3DateDisable] = useState(true);
  const [expiryDate4Disable, setExpiry4DateDisable] = useState(true);

  const [selectedDocument, setSelectedDocument] = useState(null);

  const [leadsystemCodeDetail, setLeadSystemCodeDetail] = useState(props.mobilecodedetail.leadSystemCodeDto);
  const [systemCodeDetail, setSystemCodeDetail] = useState(props.mobilecodedetail.t_SystemCodeDetail);
  const [leaduserCodeDetail, setLeadUserCodeDetail] = useState(props.mobilecodedetail.leadUserCodeDto);
  const [userCodeDetail, setUserCodeDetail] = useState(props.mobilecodedetail.t_UserCodeDetail);
  const [bankUserCodeDetail, setBankUserCodeDetail] = useState(props.mobilecodedetail.t_BankUserCode);

  const [photoOptionvisible, setphotoOptionvisible] = useState(false);
  const showphotoBottomSheet = () => setphotoOptionvisible(true);
  const hidephotoBottomSheet = () => setphotoOptionvisible(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [imageFile, setImageFile] = useState([]);
  const [kycID1imageFile, setKycID1ImageFile] = useState([]);
  const [kycDobimageFile, setKycDobImageFile] = useState([]);
  const [imageUri, setImageUri] = useState(null);
  const [kycID1ImageUri, setkycID1ImageUri] = useState(null);
  const [kycDobImageUri, setkycDobImageUri] = useState(null);
  const [docID, setDocID] = useState('');
  const [fileName, setFileName] = useState('');
  const [kycID1FileName, setKycID1FileName] = useState('');
  const [kycDOBFileName, setKycDOBFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const [kycID1Type, setKycID1Type] = useState('');
  const [kycDOBType, setKycDOBType] = useState('');
  const [time, setTime] = useState('');
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const showImageBottomSheet = () => { setBottomSheetVisible(true) };
  const hideImageBottomSheet = () => setBottomSheetVisible(false);

  const showLocationBottomSheet = () => setLocationSheetVisible(true);
  const hideLocationBottomSheet = () => setLocationSheetVisible(false);

  const [locationSheetVisible, setLocationSheetVisible] = useState(false);

  const [isAadharVerified, setIsAadharVerified] = useState(false);

  const isScreenVisible = useIsFocused();
  const [onlyView, setOnlyView] = useState(false);
  const [hideRetake, setHideRetake] = useState(false);
  const [hideDelete, setHideDelete] = useState(false);

  const [isPageCompleted, setIsPageCompleted] = useState(false);
  const [selectedImageType, setSelectedImageType] = useState('');

  const [DOB, setDOB] = useState('');
  const [DOBCaption, setDOBCaption] = useState('DATE OF BIRTH');
  const [DOBMan, setDOBMan] = useState(true);
  const [DOBVisible, setDOBVisible] = useState(true);
  const [DOBDisable, setDOBDisable] = useState(false);
  const DOBRef = useRef(null);

  useEffect(() => {

    getSystemCodeDetail(true);
    getApplicantData();

    if (global.isAadharVerified == '1') {
      setIsAadharVerified(true);
      //getSystemCodeDetail(true);
    } else {
      setIsAadharVerified(false);
      //getSystemCodeDetail(false);
    }


    if (global.USERTYPEID == 1163) {
      if (global.LOANSTATUS == 'MANUAL KYC PENDING' || global.LOANSTATUS == 'MANUAL KYC REJECTED') {

      }
      setOnlyView(true);
      fieldsdisable();
      setHideRetake(true);
      setHideDelete(true);
    } else {
      setHideRetake(false);
      setHideDelete(false);
    }

  }, [props.navigation]);

  useEffect(() => {
    props.navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);


    return () => {
      props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
      backHandler.remove();
    }
  }, [isScreenVisible]);

  const handleBackButton = () => {
    onGoBack();
    return true; // Prevent default back button behavior
  };

  const fieldsdisable = () => {
    setKycSourceDisable(true);
    setKycTypeDisable(true);
    setkycIDDisable(true);
    setKycType1Disable(true);
    setkycID1Disable(true);
    setKycType2Disable(true);
    setkycID2Disable(true);
    setKycType3Disable(true);
    setkycID3Disable(true);
    setKycType4Disable(true);
    setkycID4Disable(true);
  }

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
  const getClientID = (data) => {
    if (data.clientManualKycLink) {
      if (data.clientManualKycLink.length > 0) {
        getManualDetails(data.clientManualKycLink[0]);
      }
    }
    if (data.isAadharNumberVerified) {
      setIsAadharVerified(true);
      global.isAadharVerified = '1';
    } else {
      setIsAadharVerified(false);
    }

  }


  const getImage = (dmsID, type) => {

    Common.getNetworkConnection().then(value => {
      if (value.isConnected == true) {
        setLoading(true)
        const baseURL = global.PORT2
        apiInstance(baseURL).get(`/api/documents/document/${parseInt(dmsID)}`)
          .then(async (response) => {
            // Handle the response data
            console.log("GetPhotoApiResponse::" + JSON.stringify(response.data));

            // props.navigation.navigate('LeadManagement', { fromScreen: 'LeadCompletion' })
            setLoading(false)
            if (response.status == 200) {
              setFileName(response.data.fileName)
              setImageUri('data:image/png;base64,' + response.data.base64Content)
              if (type == '0') {
                props.navigation.navigate('PreviewImage', { imageName: response.data.fileName, imageUri: 'data:image/png;base64,' + response.data.base64Content })
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

  const getManualDetails = (data) => {

    if (data.kycDmsId != null && data.kycDmsId != undefined) {
      if (data.kycDmsId.toString().length > 0)
        setkycSourceDmsId(data.kycDmsId)
      if (imageUri != undefined && imageUri != null) {
        if (imageUri.length > 0) {

        } else {
          getImage(data.kycDmsId, '1');
        }
      }
      else {
        getImage(data.kycDmsId, '1');
      }
    }
    setKycTypeLabel(data.kycType)
    setkycID(data.kycValue)
    if (data.kycType == '002' || data.kycType == '008') {
      setkycExpiryDateVisible(true);
      setkycExpiryDate(data.kycExpiryDate);
    } else {
      setkycExpiryDate('');
      setkycExpiryDateVisible(false);
    }

  }

  const getKYCManualDetails = (id) => {

    const baseURL = global.PORT1
    setLoading(true)

    apiInstance(baseURL).get(`/api/v2/profile-short/manualKyc/${id}`)
      .then((response) => {
        // Handle the response data

        if (global.DEBUG_MODE) console.log("ManualKYCDetails::" + JSON.stringify(response.data));
        setLoading(false)

        if (response.status == 200) {
          if (response.data.kycDmsId != null && response.data.kycDmsId != undefined) {
            if (response.data.kycDmsId.toString().length > 0)
              setkycSourceDmsId(response.data.kycDmsId)
            if (imageUri != undefined && imageUri != null) {
              if (imageUri.length > 0) {

              } else {
                getImage(response.data.kycDmsId, '1');
              }
            }
            else {
              getImage(response.data.kycDmsId, '1');
            }

          }
          setKycTypeLabel(response.data.kycType)
          setkycID(response.data.kycValue)
          setkycExpiryDate(response.data.kycExpiryDate);
        } else if (response.data.statusCode === 201) {
          setApiError(response.data.message);
          setErrorModalVisible(true);
        } else if (response.data.statusCode === 202) {
          setApiError(response.data.message);
          setErrorModalVisible(true);
        }
      })
      .catch((error) => {
        // Handle the error
        setLoading(false)
        if (global.DEBUG_MODE) console.log("ManualKYCDetailsError::" + JSON.stringify(error.response.data));
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

  const getOneTimeLocation = () => {
    showLocationBottomSheet();
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {



        //getting the Longitude from the location json
        const currentLongitude =
          JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude =
          JSON.stringify(position.coords.latitude);

        hideLocationBottomSheet();
        navigatetoPersonal();

      },
      (error) => {

        console.log(error)
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };

  const getSystemCodeDetail = async (adharVerified) => {

    const filteredKycSourceData = leaduserCodeDetail.filter((data) => data.masterId === 'KYC_SOURCE').sort((a, b) => a.Description.localeCompare(b.Description));
    setKycSourceData(filteredKycSourceData);

    // if (adharVerified) {
    //   setKycSourceVisible(false);
    //   setKycTypeDisable(true);
    //   setkycIDDisable(true);
    // } else {
    //   setKycSourceLabel('MNL');
    //   setKycSourceVisible(true);
    //   setKycTypeDisable(false);
    //   setkycIDDisable(true);
    // }

    getID1data();
    getID2data();
    getID3data();
    getID4data();
  }

  const getKYCType = (id1, id2, id3, id4) => {
    if (id1 == null) id1 = ''
    if (id2 == null) id2 = ''
    if (id3 == null) id3 = ''
    if (id4 == null) id4 = ''

    let dataArray = [];
    if (bankUserCodeDetail) {
      bankUserCodeDetail.forEach((data) => {
        if (data.ID === 'IndIdentitySettingID') {
          // if (id1.length > 0 && id2.length > 0 && id3.length > 0 && id4.length > 0) {
          if (id1 == data.subCodeId || id2 == data.subCodeId || id3 == data.subCodeId || id4 == data.subCodeId) {
            dataArray.push({ 'subCodeId': data.subCodeId, Description: data.Description });
          }
          // } else {
          //   dataArray.push({ 'subCodeId': data.subCodeId, Description: data.Description });
          // }

        }
      });
    }
    setKycTypeData(dataArray);
  }

  const getID1data = () => {
    let dataArray = [];
    if (bankUserCodeDetail) {
      bankUserCodeDetail.forEach((data) => {
        if (data.ID === 'IndIdentitySettingID') {
          if (data.subCodeId != KycType2Label && data.subCodeId != KycType3Label && data.subCodeId != KycType4Label)
            dataArray.push({ 'subCodeId': data.subCodeId, Description: data.Description });
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
          if (data.subCodeId != KycType1Label && data.subCodeId != KycType3Label && data.subCodeId != KycType4Label)
            dataArray.push({ 'subCodeId': data.subCodeId, Description: data.Description });
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
          if (data.subCodeId != KycType1Label && data.subCodeId != KycType2Label && data.subCodeId != KycType4Label)
            dataArray.push({ 'subCodeId': data.subCodeId, Description: data.Description });
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
          if (data.subCodeId != KycType1Label && data.subCodeId != KycType2Label && data.subCodeId != KycType3Label)
            dataArray.push({ 'subCodeId': data.subCodeId, Description: data.Description });
        }
      });
    }
    setKycType4Data(dataArray);
  }


  const getClientData = (value) => {

    setKycType1Label(value.kycTypeId1);
    setkycID1(value.kycIdValue1);
    if (value.kycTypeId1 == '002' || value.kycTypeId1 == '008') {
      setExpiry1DateVisible(true);
      setExpiry1Date(value.kycType1ExpiryDate);
    } else {
      setExpiry1Date('');
      setExpiry1DateVisible(false);
    }
    setKycType2Label(value.kycTypeId2);
    setkycID2(value.kycIdValue2);
    if (value.kycTypeId2 == '002' || value.kycTypeId2 == '008') {
      setExpiry2DateVisible(true);
      setExpiry2Date(value.kycType2ExpiryDate);
    } else {
      setExpiry2Date('');
      setExpiry2DateVisible(false);
    }
    setKycType3Label(value.kycTypeId3);
    setkycID3(value.kycIdValue3);
    if (value.kycTypeId3 == '002' || value.kycTypeId3 == '008') {
      setExpiry3DateVisible(true);
      setExpiry3Date(value.kycType3ExpiryDate);
    } else {
      setExpiry3Date('');
      setExpiry3DateVisible(false);
    }
    setKycType4Label(value.kycTypeId4);
    setkycID4(value.kycIdValue4);
    if (value.kycTypeId4 == '002' || value.kycTypeId4 == '008') {
      setExpiry4DateVisible(true);
      setExpiry4Date(value.kycType4ExpiryDate);
    } else {
      setExpiry4Date('');
      setExpiry4DateVisible(false);
    }
    if (value.kycTypeId1 == '001') {
      setKycTypeLabel(value.kycTypeId1);
      setkycID(value.kycIdValue1);
    } else if (value.kycTypeId2 == '001') {
      setKycTypeLabel(value.kycTypeId2);
      setkycID(value.kycIdValue2);
    } else if (value.kycTypeId3 == '001') {
      setKycTypeLabel(value.kycTypeId3);
      setkycID(value.kycIdValue3);
    } else if (value.kycTypeId4 == '001') {
      setKycTypeLabel(value.kycTypeId4);
      setkycID(value.kycIdValue4);
    }
    getClientID(value);
    getKYCType(value.kycTypeId1, value.kycTypeId2, value.kycTypeId3, value.kycTypeId4);

    if (value.clientManualKycLink.length > 0) {

    } else {
      if (value.lmsClientId) {
        if (value.isAadharNumberVerified) {
          setKycSourceLabel('EVRF');
        } else {
          if (value.isManualKyc) {
            setKycSourceLabel('MNL');
          } else {
            setKycSourceLabel('LMS');
          }
        }
      } else {
        if (value.isAadharNumberVerified) {
          setKycSourceLabel('EVRF');
        } else {
          setKycSourceLabel('MNL');
        }
      }
    }


  }


  const buttonNext = () => {
    updateLoanStatus();
  }

  const updateLoanStatus = () => {

    var module = ''; var page = '';

    if (global.CLIENTTYPE == 'APPL') {
      module = 'PRF_SHRT_APLCT';
      page = 'PRF_SHRT_APLCT_VRF_STATUS';
    } else if (global.CLIENTTYPE == 'CO-APPL') {
      module = 'PRF_SHRT_COAPLCT';
      page = 'PRF_SHRT_COAPLCT_VRF_STATUS';
    } else if (global.CLIENTTYPE == 'GRNTR') {
      module = 'PRF_SHRT_GRNTR';
      page = 'PRF_SHRT_GRNTR_VRF_STATUS';
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
            global.COMPLETEDPAGE = 'PRF_SHRT_APLCT_VRF_STATUS';
          } else if (global.CLIENTTYPE == 'CO-APPL') {
            global.COMPLETEDMODULE = 'PRF_SHRT_COAPLCT';
            global.COMPLETEDPAGE = 'PRF_SHRT_COAPLCT_VRF_STATUS';
          } else if (global.CLIENTTYPE == 'GRNTR') {
            global.COMPLETEDMODULE = 'PRF_SHRT_GRNTR';
            global.COMPLETEDPAGE = 'PRF_SHRT_GRNTR_VRF_STATUS';
          }
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


  const handleClick = (componentName, textValue) => {
    if (componentName === 'LoanApplicationID') {
      setLoanApplicationID(textValue);
    } else if (componentName === 'kycID') {
      setkycID(textValue);
    } else if (componentName === 'kycID1') {
      setkycID1(textValue);
    } else if (componentName === 'kycID2') {
      setkycID2(textValue);
    } else if (componentName === 'DOB') {
      setDOB(textValue);
      setAge(Common.calculateAge(textValue).toString())
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
      if (label == KycType1Label) {
        if (label == '002' || label == '008') {
          setkycExpiryDate(expiryDate1)
          setkycExpiryDateVisible(true);
        } else {
          setkycExpiryDateVisible(false);
        }
        setkycID(kycID1)
      } else if (label == KycType2Label) {
        setkycID(kycID2)
        if (label == '002' || label == '008') {
          setkycExpiryDate(expiryDate2)
          setkycExpiryDateVisible(true);
        } else {
          setkycExpiryDateVisible(false);
        }
      } else if (label == KycType3Label) {
        setkycID(kycID3)
        if (label == '002' || label == '008') {
          setkycExpiryDate(expiryDate3)
          setkycExpiryDateVisible(true);
        } else {
          setkycExpiryDateVisible(false);
        }
      } else if (label == KycType4Label) {
        setkycID(kycID4)
        if (label == '002' || label == '008') {
          setkycExpiryDate(expiryDate4)
          setkycExpiryDateVisible(true);
        } else {
          setkycExpiryDateVisible(false);
        }
      }

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
  const onClickKYC3 = () => {
    setKYC2(!KYC3);
  };
  const onClickKYC4 = () => {
    setKYC2(!KYC4);
  };
  const onClickVerify = () => {
    alert('Hii');
  };

  const pickDocument = async () => {
    // try {
    //   const result = await DocumentPicker.pick({
    //     type: [DocumentPicker.types.images],
    //   });

    //   setSelectedDocument(result);
    // } catch (err) {
    //   if (DocumentPicker.isCancel(err)) {
    //   } else {
    //     throw err;
    //   }
    // }
    showphotoBottomSheet();
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
        if (global.DEBUG_MODE) console.log('File extension:', fileExtension);
      }

      // const imageName = image.path.split('/').pop();
      setTime(Common.getCurrentDateTime());
      if (selectedImageType == 'KYCSOURCE') {
        setFileType(image.mime)
        setFileName(imageName)
        setImageUri(image.path)
      } else if (selectedImageType == 'KYCID1') {
        setKycID1Type(image.mime)
        setKycID1FileName(imageName)
        setkycID1ImageUri(image.path)
      } else if (selectedImageType == 'KYCDOB') {
        setKycDOBType(image.mime)
        setKycDOBFileName(imageName)
        setkycDobImageUri(image.path)
      }
      updateImage(image.path, image.mime, imageName)
      //setVisible(false)
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
      var imageName = 'Photo' + '_' + global.CLIENTID;
      if (lastDotIndex !== -1) {
        // Get the substring from the last dot to the end of the string
        const fileExtension = image.path.substring(lastDotIndex);
        imageName = imageName + fileExtension;
        console.log('File extension:', fileExtension);
      }
      if (selectedImageType == 'KYCSOURCE') {
        setFileType(image.mime)
        setFileName(imageName)
        setImageUri(image.path)
      } else if (selectedImageType == 'KYCID1') {
        setKycID1Type(image.mime)
        setKycID1FileName(imageName)
        setkycID1ImageUri(image.path)
      } else if (selectedImageType == 'KYCDOB') {
        setKycDOBType(image.mime)
        setKycDOBFileName(imageName)
        setkycDobImageUri(image.path)
      }

      updateImage(image.path, image.mime, imageName)
      //setVisible(false)
      //setDeleteVisible(false)
      props.onChange?.(image);
    })

  };


  const previewImage = () => {
    hideImageBottomSheet();

    if (selectedImageType == 'KYCSOURCE') {
      if (imageUri != undefined && imageUri != null) {
        if (imageUri.length > 0) {
          props.navigation.navigate('PreviewImage', { imageName: fileName, imageUri: imageUri })
        } else {
          getImage(kycSourceDmsId, '0');
        }
      }
    } else if (selectedImageType == 'KYCID1') {
      if (kycID1ImageUri) {
        if (kycID1ImageUri.length > 0) {
          props.navigation.navigate('PreviewImage', { imageName: kycID1FileName, imageUri: kycID1ImageUri })
        } else {
          getImage(kycID1DmsId, '0');
        }
      }
    } else if (selectedImageType == 'KYCDOB') {
      if (kycDobImageUri) {
        if (kycDobImageUri.length > 0) {
          props.navigation.navigate('PreviewImage', { imageName: kycDOBFileName, imageUri: kycDobImageUri })
        } else {
          getImage(dobDmsId, '0');
        }
      }
    }

  }


  const reTakePhoto = () => {
    pickDocument();
    hideImageBottomSheet();
  }

  const deletePhoto = () => {
    setDeleteVisible(true);
  }

  const onDeleteorCancel = (value) => {
    if (value == 'Cancel') {
      setDeleteVisible(false);
      hideImageBottomSheet();
    } else {

      if (selectedImageType == 'KYCSOURCE') {
        setImageUri(null);
        setFileName('');
        setFileType('');
        setImageFile('');
        setkycSourceDmsId('')
      } else if (selectedImageType == 'KYCID1') {
        setkycID1ImageUri(null);
        setKycID1FileName('');
        setKycID1Type('');
        setkycID1DmsId('');
      } else if (selectedImageType == 'KYCDOB') {
        setkycDobImageUri(null);
        setKycDOBFileName('');
        setKycDOBType('');
        setdobDmsId('');
      }

      setDeleteVisible(false);
      hideImageBottomSheet();
    }
  }

  const navigatetoPersonal = async () => {
    var page = '';
    if (global.CLIENTTYPE == 'APPL') {
      page = 'PRF_SHRT_APLCT_PRSNL_DTLS';
    } else if (global.CLIENTTYPE == 'CO-APPL') {
      page = 'PRF_SHRT_COAPLCT_PRSNL_DTLS';
    } else if (global.CLIENTTYPE == 'GRNTR') {
      page = 'PRF_SHRT_GRNTR_PRSNL_DTLS';
    }
    await Common.getPageID(global.FILTEREDPROCESSMODULE, page)
    props.navigation.replace('ProfileShortApplicantDetails')
  }

  const uploadImage = async () => {

    if (onlyView) {
      navigatetoPersonal();
      return;
    }

    if (KycSourceLabel == 'EVRF') {
      buttonNext();
      return;
    }

    if (validate()) {
      showBottomSheet();
      return;
    }

    Common.getNetworkConnection().then(value => {
      if (value.isConnected == true) {
        updateKYCDetails();
      } else {
        setApiError(language[0][props.language].str_errinternet);
        setErrorModalVisible(true)
      }

    })


  };

  const validate = () => {
    var flag = false;
    var i = 1;
    var errorMessage = '';



    if (!(KycSourceLabel == 'MNL')) {
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

      if (KycTypeLabel.length > 0) {
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

    }

    if (KycSourceLabel == 'MNL') {
      if (!imageUri) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_errorsourceimage +
          '\n';
        i++;
        flag = true;
      }
    } else if (KycSourceLabel == 'LMS') {
      if (!kycID1ImageUri) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_errorkycId1image +
          '\n';
        i++;
        flag = true;
      }

      if (!kycDobImageUri) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_errordobimage +
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
          language[0][props.language].str_plsselect +
          DOBCaption +
          '\n';
        i++;
        flag = true;
      }
    }


    setErrMsg(errorMessage);
    return flag;
  };

  const updateImage = async (imageUri, fileType, fileName) => {
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
          setLoading(false)
          if (selectedImageType == 'KYCSOURCE') {
            setkycSourceDmsId(data.docId)
          } else if (selectedImageType == 'KYCID1') {
            setkycID1DmsId(data.docId)
          } else if (selectedImageType == 'KYCDOB') {
            setdobDmsId(data.docId)
          }
          setDocID(data.docId);
          //updateKYCDetails(data.docId);
        } else {
          setLoading(false)
          if (global.DEBUG_MODE) console.log('Upload failed:', response.status);
          setApiError(response.status);
          setErrorModalVisible(true)
        }
      } catch (error) {
        setLoading(false)
        if (global.DEBUG_MODE) console.log('Upload error:', error);
        setApiError(error.response.data.message);
        setErrorModalVisible(true)
      } finally {
        setLoading(false);
      }
    }
  }

  const updateKYCDetails = (id) => {
    setLoading(true)
    var kycDate = '';
    if (kycExpiryDate != undefined && kycExpiryDate != null) {
      if (kycExpiryDate.length > 0) {
        kycDate = Common.convertYearDateFormat(kycExpiryDate)
      }
    }
    const appDetails = [
      {
        "kycType": KycTypeLabel,
        "kycValue": kycID,
        "kycDmsId": kycSourceDmsId,
        "kycExpiryDate": kycExpiryDate,
        "createdBy": global.USERID,
        "createdDate": new Date(),
      }
    ]

    if (KycSourceLabel == 'LMS') {
      appDetails[0].clientManualDobs = [
        {
          "dobDmsId": dobDmsId,
          "createdBy": global.USERID,
          "createdDate": new Date()
        }
      ],
        appDetails[0].clientManualKycs = [
          {
            "kycType": KycType1Label,
            "kycValue": kycID1,
            "kycDmsId": kycID1DmsId,
            "kycExpiryDate": "",
            "createdBy": global.USERID,
            "createdDate": new Date(),
          }
        ]
    }

    const baseURL = global.PORT1
    apiInstance(baseURL).post(`/api/v2/profile-short/manualKyc/${global.CLIENTID}`, appDetails)
      .then(async (response) => {
        // Handle the response data
        setLoading(false)
        if (response.status == 200) {
          if (global.DEBUG_MODE) console.log("ManualKYCApiResponse::" + JSON.stringify(response.data));
          tbl_client.updateKYCManual("1", global.LOANAPPLICATIONID, global.CLIENTTYPE)
          props.updateNestedClientDetails(global.LOANAPPLICATIONID, global.CLIENTID, 'clientDetail', 'clientManualKycLink', response.data[0])
          //updateDetails(global.LOANAPPLICATIONID, global.CLIENTID, 'clientDetail', 'clientManualKycLink', response.data[0])
          buttonNext();
        } else if (response.data.statusCode === 201) {
          setApiError(response.data.message);
          setErrorModalVisible(true);
        } else if (response.data.statusCode === 202) {
          setApiError(response.data.message);
          setErrorModalVisible(true);
        }


      })
      .catch((error) => {
        // Handle the error
        if (global.DEBUG_MODE) console.log("ManualKYCApiResponse:::" + JSON.stringify(error.response))
        setLoading(false)
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

  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  const onGoBack = () => {
    props.navigation.replace('LoanApplicationMain', { fromScreen: 'KYCVerificationStatus' })
  }

  return (
    // enclose all components in this View tag
    <SafeAreaView
      style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>
      <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
      <ErrorModal isVisible={errorModalVisible} onClose={closeErrorModal} textContent={apiError} textClose={language[0][props.language].str_ok} />
      <ImageBottomPreview bottomSheetVisible={bottomSheetVisible} previewImage={previewImage} hideBottomSheet={hideImageBottomSheet} reTakePhoto={reTakePhoto} fileName={selectedImageType == 'KYCSOURCE' ? fileName : selectedImageType == 'KYCID1' ? kycID1FileName : kycDOBFileName} detailHide={true} deleteVisible={deleteVisible} deletePhoto={deletePhoto} onDeleteorCancel={onDeleteorCancel} hideDelete={hideDelete} hideRetake={hideRetake} />

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
            <View style={{ width: '30%', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => selectImage()} activeOpacity={11}>
                <View style={{
                  width: 53, height: 53, borderRadius: 53, backgroundColor: '#8E44AD',
                  alignItems: 'center', justifyContent: 'center'
                }}>
                  <Ionicons name='image-outline' size={27} color={Colors.white} />
                </View>
              </TouchableOpacity>
              <Text style={{ fontSize: 14, color: Colors.black, marginTop: 7 }}>Gallery</Text>
            </View>

          </View>
        </View>
      </Modal>

      <Modal
        isVisible={locationSheetVisible}
        onBackdropPress={() => { }}
        backdropOpacity={0.5}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={{ alignItems: 'center' }}>

            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

              <TextComp textVal={"Fetching Location......"} textStyle={{ fontSize: 14, color: Colors.black, fontWeight: 600, marginTop: 30, marginBottom: 30 }} Visible={false} />


            </View>




          </View>


        </View>
      </Modal>


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
            textval={global.CLIENTTYPE == 'APPL' ? language[0][props.language].str_applicantdetails : global.CLIENTTYPE == 'CO-APPL' ? language[0][props.language].str_coapplicantdetails : language[0][props.language].str_guarantordetails}
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
              <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
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
              <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
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
              <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
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
              <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
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

          {kycExpiryDateVisible && (
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
                  textVal={kycExpiryDateCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={kycExpiryDateMan}
                />
              </View>

              <View style={{ width: '100%', alignItems: 'center' }}>
                <DateInputComp
                  textStyle={[Commonstyles.inputtextStyle, { width: '90%' }]}
                  ComponentName="kycexpiryDate"
                  textValue={kycExpiryDate}
                  type="numeric"
                  Disable={kycExpiryDateDisable}
                  handleClick={handleClick}
                  handleReference={handleReference}
                  minDate={new Date()}
                />
              </View>

            </View>
          )}

          {KycSourceLabel == 'MNL' &&
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
                <TouchableOpacity style={{ width: '30%' }} onPress={() => {
                  if (global.USERTYPEID != 1163) {
                    setSelectedImageType('KYCSOURCE');
                    pickDocument();
                  }
                }} activeOpacity={0}>
                  <View style={{ width: 40, height: 40, backgroundColor: '#DBDBDB', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      source={require('../../../Images/cloudcomputing.png')}
                      style={{ width: 28, height: 22 }}
                    />
                    {/* <FontAwesome6 name="cloud-arrow-up" size={25} color="#b5b6b6" /> */}
                  </View>
                </TouchableOpacity>

                <Text style={{ width: '50%', color: Colors.dimmText, textAlign: 'left', fontFamily: 'PoppinsRegular' }}>
                  {fileName}
                </Text>

                {imageUri &&
                  <TouchableOpacity style={{ width: '20%', alignItems: 'flex-end' }}
                    onPress={() => {
                      showImageBottomSheet();
                      setSelectedImageType('KYCSOURCE');
                    }}>
                    <Entypo
                      name="dots-three-vertical"
                      size={25}
                      color={Colors.darkblue}
                    />
                  </TouchableOpacity>
                }

              </View>
            </View>
          }

          {KycType1Label &&
            <View>
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
                        style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
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
                        style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
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
                        <DateInputComp
                          textStyle={[Commonstyles.inputtextStyle, { width: '90%' }]}
                          ComponentName="expiryDate1"
                          textValue={expiryDate1}
                          type="numeric"
                          Disable={expiryDate1Disable}
                          handleClick={handleClick}
                          handleReference={handleReference}
                          minDate={new Date()}
                        />
                      </View>

                    </View>
                  )}

                  {KycSourceLabel == 'LMS' &&
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
                        <TouchableOpacity style={{ width: '30%' }} onPress={() => {
                          if (global.USERTYPEID != 1163) {
                            pickDocument();
                            setSelectedImageType('KYCID1');
                          }
                        }} activeOpacity={0}>
                          <View style={{ width: 40, height: 40, backgroundColor: '#DBDBDB', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                              source={require('../../../Images/cloudcomputing.png')}
                              style={{ width: 28, height: 22 }}
                            />
                            {/* <FontAwesome6 name="cloud-arrow-up" size={25} color="#b5b6b6" /> */}
                          </View>
                        </TouchableOpacity>

                        <Text style={{ width: '50%', color: Colors.dimmText, textAlign: 'left', fontFamily: 'PoppinsRegular' }}>
                          {kycID1FileName}
                        </Text>

                        {kycID1ImageUri &&
                          <TouchableOpacity style={{ width: '20%', alignItems: 'flex-end' }}
                            onPress={() => {
                              showImageBottomSheet();
                              setSelectedImageType('KYCID1');
                            }}>
                            <Entypo
                              name="dots-three-vertical"
                              size={25}
                              color={Colors.darkblue}
                            />
                          </TouchableOpacity>
                        }

                      </View>
                    </View>
                  }

                </View>
              ) : (
                <View></View>
              )}
            </View>}

          {KycType2Label &&
            <View>
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
                        style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
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
                        style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
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
                      {/* <View
                    style={{
                      width: '100%',
                      marginTop: 19,
                      paddingHorizontal: 0,
                      alignItems: 'right',
                      justifyContent: 'right',
                    }}>
                    <View style={{ flexDirection: 'row' }}>
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
                  </View> */}
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
                        <DateInputComp
                          textStyle={[Commonstyles.inputtextStyle, { width: '90%' }]}
                          ComponentName="expiryDate2"
                          textValue={expiryDate2}
                          type="numeric"
                          Disable={expiryDate2Disable}
                          handleClick={handleClick}
                          handleReference={handleReference}
                          minDate={new Date()}
                        />
                      </View>

                    </View>
                  )}

                </View>
              ) : (
                <View></View>
              )}
            </View>
          }

          {KycType3Label &&
            <View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={onClickKYC3} activeOpacity={1}>
                  <View
                    style={{
                      width: '90%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 20,
                    }}>
                    <TextComp
                      textVal={KYC3Caption}
                      textStyle={Commonstyles.HeaderStyle}
                    />
                    {KYC3 ? (
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
              {KYC3 ? (
                <View>
                  {KycType3Visible && (
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
                  {kycID3Visible && (
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
                          textStyle={Commonstyles.inputtextStyle}
                          Visible={kycID3Man}
                        />
                      </View>

                      <TextInputComp
                        textValue={kycID3}
                        textStyle={Commonstyles.textinputtextStyle}
                        type="email-address"
                        Disable={kycID3Disable}
                        ComponentName="kycID3"
                        reference={KycID3Ref}
                        returnKey="next"
                        handleClick={handleClick}
                        handleReference={handleReference}
                      />
                      {/* <View
                    style={{
                      width: '100%',
                      marginTop: 19,
                      paddingHorizontal: 0,
                      alignItems: 'right',
                      justifyContent: 'right',
                    }}>
                    <View style={{ flexDirection: 'row' }}>
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
                  </View> */}
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
                        <DateInputComp
                          textStyle={[Commonstyles.inputtextStyle, { width: '90%' }]}
                          ComponentName="expiryDate3"
                          textValue={expiryDate3}
                          type="numeric"
                          Disable={expiryDate3Disable}
                          handleClick={handleClick}
                          handleReference={handleReference}
                          minDate={new Date()}
                        />
                      </View>

                    </View>
                  )}
                </View>
              ) : (
                <View></View>
              )}
            </View>}


          {KycType4Label &&
            <View>
              <View
                style={{
                  width: '100%',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={onClickKYC4} activeOpacity={1}>
                  <View
                    style={{
                      width: '90%',
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginTop: 20,
                    }}>
                    <TextComp
                      textVal={KYC4Caption}
                      textStyle={Commonstyles.HeaderStyle}
                    />
                    {KYC4 ? (
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
              {KYC4 ? (
                <View>
                  {KycType4Visible && (
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
                  {kycID4Visible && (
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
                          textStyle={Commonstyles.inputtextStyle}
                          Visible={kycID4Man}
                        />
                      </View>

                      <TextInputComp
                        textValue={kycID4}
                        textStyle={Commonstyles.textinputtextStyle}
                        type="email-address"
                        Disable={kycID4Disable}
                        ComponentName="kycID4"
                        reference={KycID4Ref}
                        returnKey="next"
                        handleClick={handleClick}
                        handleReference={handleReference}
                      />
                      {/* <View
                    style={{
                      width: '100%',
                      marginTop: 19,
                      paddingHorizontal: 0,
                      alignItems: 'right',
                      justifyContent: 'right',
                    }}>
                    <View style={{ flexDirection: 'row' }}>
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
                  </View> */}
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
                        <DateInputComp
                          textStyle={[Commonstyles.inputtextStyle, { width: '90%' }]}
                          ComponentName="expiryDate4"
                          textValue={expiryDate4}
                          type="numeric"
                          Disable={expiryDate4Disable}
                          handleClick={handleClick}
                          handleReference={handleReference}
                          minDate={new Date()}
                        />
                      </View>

                    </View>
                  )}
                </View>
              ) : (
                <View></View>
              )}
            </View>}


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

            </View>
          )}

          {KycSourceLabel == 'LMS' &&
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
                <TouchableOpacity style={{ width: '30%' }} onPress={() => {
                  if (global.USERTYPEID != 1163) {
                    pickDocument();
                    setSelectedImageType('KYCDOB');
                  }
                }} activeOpacity={0}>
                  <View style={{ width: 40, height: 40, backgroundColor: '#DBDBDB', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      source={require('../../../Images/cloudcomputing.png')}
                      style={{ width: 28, height: 22 }}
                    />
                    {/* <FontAwesome6 name="cloud-arrow-up" size={25} color="#b5b6b6" /> */}
                  </View>
                </TouchableOpacity>

                <Text style={{ width: '50%', color: Colors.dimmText, textAlign: 'left', fontFamily: 'PoppinsRegular' }}>
                  {kycDOBFileName}
                </Text>

                {kycDobImageUri &&
                  <TouchableOpacity style={{ width: '20%', alignItems: 'flex-end' }}
                    onPress={() => {
                      showImageBottomSheet();
                      setSelectedImageType('KYCDOB');
                    }}>
                    <Entypo
                      name="dots-three-vertical"
                      size={25}
                      color={Colors.darkblue}
                    />
                  </TouchableOpacity>
                }

              </View>
            </View>
          }

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
    loanInitiationDetails: loanInitiationDetails
  }
}

const mapDispatchToProps = dispatch => ({
  languageAction: item => dispatch(languageAction(item)),
  deleteLoanInitiationDetails: item => dispatch(deleteLoanInitiationDetails(item)),
  updateNestedClientDetails: (loanApplicationId, clientId, key, nestedKey, data) => dispatch(updateNestedClientDetails(loanApplicationId, clientId, key, nestedKey, data)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileShortKYCVerificationStatus);
