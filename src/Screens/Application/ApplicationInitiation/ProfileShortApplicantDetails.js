import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Text,
  Image
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
  const [AgeDisable, setAgeDisable] = useState(false);
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

  const isScreenVisible = useIsFocused();

  useEffect(() => {
    props.navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });

    makeSystemMandatoryFields();
    getSystemCodeDetail();
    getClientData();
    getOneTimeLocation();

    return () =>
      props.navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
  }, [navigation, isScreenVisible, gpslatlon]);

  const getSystemCodeDetail = async () => {

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

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_prsnl_dtl_title' && data.pageId === 3).map((value, index) => {
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


    systemMandatoryField.filter((data) => data.fieldUiid === 'et_prsnl_dtl_first_name' && data.pageId === 3).map((value, index) => {
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

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_prsnl_dtl_middle_name' && data.pageId === 3).map((value, index) => {
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

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_prsnl_dtl_last_name' && data.pageId === 3).map((value, index) => {
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

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_maritalstatus' && data.pageId === 4).map((value, index) => {
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

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_prsnl_dtl_gender' && data.pageId === 3).map((value, index) => {
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


    systemMandatoryField.filter((data) => data.fieldUiid === 'et_prsnl_dtl_date_of_birth' && data.pageId === 3).map((value, index) => {
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

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_prsnl_dtl_age' && data.pageId === 3).map((value, index) => {
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

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_prsnl_dtl_fathers name' && data.pageId === 3).map((value, index) => {
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

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_prsnl_dtl_spouse name' && data.pageId === 3).map((value, index) => {
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

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_prsnl_dtl_caste' && data.pageId === 3).map((value, index) => {
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

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_prsnl_dtl_religion' && data.pageId === 3).map((value, index) => {
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

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_prsnl_dtl_mother tongue' && data.pageId === 3).map((value, index) => {
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

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_prsnl_dtl_educational qualifications' && data.pageId === 3).map((value, index) => {
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


  const getClientData = async () => {

    await tbl_client.getClientBasedOnID(global.LOANAPPLICATIONID).then(value => {
      if (value !== undefined && value.length > 0) {
        setTitleLabel(value[0].titleId);
        setFirstName(value[0].firstName);
        setMiddleName(value[0].middleName);
        setLastName(value[0].lastName);
        setGenderLabel(value[0].genderId);
        setDOB(value[0].dateOfBirth);
        setAge(value[0].age);
        setFatherName(value[0].fatherName);
        setSpouseName(value[0].spouseName);
        setCasteLabel(value[0].casteId);
        setReligionLabel(value[0].religionId);
        setMotherTongueLabel(value[0].motherTongueId);
        setEADLabel(value[0].educationQualificationId);
        //getImage(value[0].image)
        //getImage('3728')
        disableAadharFields(value[0].fatherName, value[0].spouseName);
      }
    })


  }

  const disableAadharFields = (fatherName, spouseName) => {

    if (global.isAadharVerified == '1') {
      setFirstNameDisable(true);
      setMiddleNameDisable(false);
      setLastNameDisable(false);
      setGenderDisable(true);
      setDOBDisable(true);
      setAgeDisable(true);
      if (fatherName.length > 0) {
        setFatherNameDisable(false)
      }
      if (spouseName.length > 0) {
        setSpouseNameDisable(false)
      }
    }
  }

  const getImage = (dmsID) => {
    Common.getNetworkConnection().then(value => {
      if (value.isConnected == true) {
        setLoading(true)
        const baseURL = '8094'
        apiInstance(baseURL).get(`/api/documents/document/${dmsID}`)
          .then(async (response) => {
            // Handle the response data
            console.log("GetPhotoApiResponse::" + JSON.stringify(response.data));
            setFileName(response.data.fileName)
            setVisible(false)
            setImageUri('data:image/png;base64,' + response.data.base64Content)
            // props.navigation.navigate('LeadManagement', { fromScreen: 'LeadCompletion' })
            setLoading(false)

          })
          .catch((error) => {
            // Handle the error
            if (global.DEBUG_MODE) console.log("GetPhotoApiResponse::" + JSON.stringify(error.response.data));
            setLoading(false)
            if (error.response.data != null) {
              setApiError(error.response.data.message);
              setErrorModalVisible(true)
            } else if (error.response.httpStatusCode == 500) {
              setApiError(error.response.message);
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
    if (validate()) {
      showBottomSheet();
    } else {
      const appDetails = {
        "isActive": true,
        "createdBy": global.USERID,
        "id": global.CLIENTID,
        "clientType": "APPL",
        "relationType": "",
        "title": TitleLabel,
        "firstName": firstName,
        "middleName": middleName,
        "lastName": lastName,
        "dateOfBirth": '1998-04-20',
        "age": parseInt(Age),
        "fatherName": FatherName,
        "spouseName": SpouseName,
        "caste": CasteLabel,
        "religion": ReligionLabel,
        "motherTongue": MotherTongueLabel,
        "educationQualification": EADLabel,
        "gender": GenderLabel,
        "maritalStatus": "",
        "dmsId": id,
        "imageName": fileName,
        "geoCode": currentLatitude + "," + currentLongitude,
      }
      const baseURL = '8901';
      setLoading(true);
      apiInstancelocal(baseURL)
        .put(`/api/v2/profile-short/personal-details/${global.CLIENTID}`, appDetails)
        .then(async response => {
          // Handle the response data
          if (global.DEBUG_MODE) console.log('PersonalDetailApiResponse::' + JSON.stringify(response.data));
          setLoading(false);
          await tbl_client.updatePersonalDetails(TitleLabel, firstName, middleName, lastName, DOB, Age, GenderLabel, FatherName, SpouseName, CasteLabel, ReligionLabel, MotherTongueLabel, EADLabel, gpslatlon, id, global.LOANAPPLICATIONID);
          props.navigation.navigate('AddressMainList')
        })
        .catch(error => {
          // Handle the error
          console.log('Error' + JSON.stringify(error.response));
          setLoading(false);
          alert(error);
        });
    }
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

  return (
    // enclose all components in this View tag
    <SafeAreaView
      style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>
      <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

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
                    showBottomSheet();
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
                  getOneTimeLocation();
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
)(ProfileShortApplicantDetails);
