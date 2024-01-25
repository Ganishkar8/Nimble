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
  const [kycDmsId, setkycDmsId] = useState(true);

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
  const [kycIDDisable, setkycIDDisable] = useState(false);
  const KycIDRef = useRef(null);

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
  const [imageUri, setImageUri] = useState(null);
  const [docID, setDocID] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
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


  useEffect(() => {
    props.navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

    getClientData();

    if (global.isAadharVerified == '1') {
      setIsAadharVerified(true);
      getSystemCodeDetail(true);
    } else {
      setIsAadharVerified(false);
      getSystemCodeDetail(false);
    }


    if (global.USERTYPEID == 1163) {
      if (global.LOANSTATUS == 'MANUAL KYC PENDING' || global.LOANSTATUS == 'MANUAL KYC REJECTED') {

      }
      setOnlyView(true);
      fieldsdisable();
      getClientID();
      setHideRetake(true);
      setHideDelete(true);
    } else {
      setHideRetake(false);
      setHideDelete(false);
    }

    return () => {
      props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
      backHandler.remove();
    }
  }, [props.navigation, isScreenVisible]);

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

  const getClientID = () => {

    tbl_client.getOnlyClientBasedOnID(global.LOANAPPLICATIONID, global.CLIENTTYPE)
      .then(data => {
        if (global.DEBUG_MODE) console.log('Applicant Data:', data);
        if (data !== undefined && data.length > 0) {

          getKYCManualDetails(data[0].id);
          global.isAadharVerified = data[0].isAadharNumberVerified;
          if (data[0].isAadharNumberVerified == 1) {
            setIsAadharVerified(true);
          } else {
            setIsAadharVerified(false);

          }

        }

      })
      .catch(error => {
        if (global.DEBUG_MODE) console.error('Error fetching Applicant details:', error);
      });
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

            // props.navigation.navigate('LeadManagement', { fromScreen: 'LeadCompletion' })
            setLoading(false)
            if (response.status == 200) {
              setFileName(response.data.fileName)
              setImageUri('data:image/png;base64,' + response.data.base64Content)
              props.navigation.navigate('PreviewImage', { imageName: response.data.fileName, imageUri: 'data:image/png;base64,' + response.data.base64Content })
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
              setkycDmsId(response.data.kycDmsId)
            if (imageUri != undefined && imageUri != null) {
              if (imageUri.length > 0) {

              } else {
                getImage(response.data.kycDmsId);
              }
            }

          }
          setKycTypeLabel(response.data.kycType)
          setkycID(response.data.kycValue)
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


    if (adharVerified) {
      setKycSourceVisible(false);
      setKycTypeDisable(true);
      setkycIDDisable(true);
    } else {
      const dataArray = [];
      dataArray.push({ 'subCodeId': 'MAN', Description: 'Manual' });
      setKycSourceLabel('MAN');
      setKycSourceData(dataArray);
      setKycSourceVisible(true);
      setKycTypeDisable(false);
      setkycIDDisable(true);
    }

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

  const getClientData = () => {

    tbl_client.getClientBasedOnID(global.LOANAPPLICATIONID, global.CLIENTTYPE).then(value => {
      if (value !== undefined && value.length > 0) {
        setKycType1Label(value[0].kycTypeId1);
        setkycID1(value[0].kycIdValue1);
        setKycType2Label(value[0].kycTypeId2);
        setkycID2(value[0].kycIdValue2);
        setKycType3Label(value[0].kycTypeId3);
        setkycID3(value[0].kycIdValue3);
        setKycType4Label(value[0].kycTypeId4);
        setkycID4(value[0].kycIdValue4);
        if (value[0].kycTypeId1 == '001') {
          setKycTypeLabel(value[0].kycTypeId1);
          setkycID(value[0].kycIdValue1);
        } else if (value[0].kycTypeId2 == '001') {
          setKycTypeLabel(value[0].kycTypeId2);
          setkycID(value[0].kycIdValue2);
        } else if (value[0].kycTypeId3 == '001') {
          setKycTypeLabel(value[0].kycTypeId3);
          setkycID(value[0].kycIdValue3);
        } else if (value[0].kycTypeId4 == '001') {
          setKycTypeLabel(value[0].kycTypeId4);
          setkycID(value[0].kycIdValue4);
        }
        if (value[0].isKycManual == '1') {

        } else {

        }
        getKYCType(value[0].kycTypeId1, value[0].kycTypeId2, value[0].kycTypeId3, value[0].kycTypeId4);
      }

    })
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
        setkycID(kycID1)
      } else if (label == KycType2Label) {
        setkycID(kycID2)
      } else if (label == KycType3Label) {
        setkycID(kycID3)
      } else if (label == KycType4Label) {
        setkycID(kycID4)
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
      var imageName = 'Photo' + '_' + global.leadID;
      if (lastDotIndex !== -1) {
        // Get the substring from the last dot to the end of the string
        const fileExtension = image.path.substring(lastDotIndex);
        imageName = imageName + fileExtension;
        console.log('File extension:', fileExtension);
      }

      // const imageName = image.path.split('/').pop();
      setTime(Common.getCurrentDateTime());
      setFileType(image.mime)
      setFileName(imageName)
      setImageUri(image.path)
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
      var imageName = 'Photo' + '_' + global.TEMPAPPID;
      if (lastDotIndex !== -1) {
        // Get the substring from the last dot to the end of the string
        const fileExtension = image.path.substring(lastDotIndex);
        imageName = imageName + fileExtension;
        console.log('File extension:', fileExtension);
      }
      setFileType(image.mime)
      setFileName(imageName)
      setImageUri(image.path)
      //setVisible(false)
      //setDeleteVisible(false)
      props.onChange?.(image);
    })

  };


  const previewImage = () => {
    hideImageBottomSheet();

    if (imageUri != undefined && imageUri != null) {
      if (imageUri.length > 0) {
        props.navigation.navigate('PreviewImage', { imageName: fileName, imageUri: imageUri })
      } else {
        getImage(kycDmsId);
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
      setImageUri(null);
      setFileName('');
      setFileType('');
      setImageFile('');
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

    if (isAadharVerified) {
      buttonNext();
      return;
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

    if (!isAadharVerified) {
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

    setErrMsg(errorMessage);
    return flag;
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
          setLoading(false)
          setDocID(data.docId);
          updateKYCDetails(data.docId);
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
    const appDetails = [{
      "kycType": KycTypeLabel,
      "kycValue": kycID,
      "kycExpiryDate": "",
      "kycDmsId": parseInt(id),
      "createdBy": global.USERID,
    }]

    const baseURL = global.PORT1
    apiInstance(baseURL).post(`/api/v2/profile-short/manualKyc/${global.CLIENTID}`, appDetails)
      .then(async (response) => {
        // Handle the response data
        setLoading(false)
        if (response.status == 200) {
          if (global.DEBUG_MODE) console.log("ManualKYCApiResponse::" + JSON.stringify(response.data));
          tbl_client.updateKYCManual("1", global.LOANAPPLICATIONID, global.CLIENTTYPE)
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

          {!isAadharVerified &&
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
                <TouchableOpacity style={{ width: '30%' }} onPress={pickDocument} activeOpacity={0}>
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
            </View>
          ) : (
            <View></View>
          )}

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
            </View>
          ) : (
            <View></View>
          )}


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
  return {
    language: language,
    profiledetail: profileDetails,
    mobilecodedetail: mobileCodeDetails
  }
}

const mapDispatchToProps = dispatch => ({
  languageAction: item => dispatch(languageAction(item)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileShortKYCVerificationStatus);
