import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
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
import ChildHeadComp from '../../../Components/ChildHeadComp';
import DateComp from '../../../Components/Filter/DateComp';
import DateInputComp from '../../../Components/DateInputComp';
import MapView, { Marker } from 'react-native-maps';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';

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


  useEffect(() => {
    props.navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
    makeSystemMandatoryFields();
    getSystemCodeDetail();

    return () =>
      props.navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
  }, [navigation]);

  const getSystemCodeDetail = async () => {

    const filteredMaritalStatusData = userCodeDetail.filter((data) => data.ID === 'MaritalStatusID');
    setMaritalStatusData(filteredMaritalStatusData);

    const filteredTitleData = leaduserCodeDetail.filter((data) => data.masterId === 'TITLE');
    setTitleData(filteredTitleData);

    const filteredGenderData = leadsystemCodeDetail.filter((data) => data.masterId === 'GENDER');
    setGenderData(filteredGenderData);

    const filteredCasteData = leaduserCodeDetail.filter((data) => data.masterId === 'CASTE');
    setCasteData(filteredCasteData);

    const filteredReligionData = leaduserCodeDetail.filter((data) => data.masterId === 'RELIGION');
    setReligionData(filteredReligionData);

    const filteredMotherTongueData = leaduserCodeDetail.filter((data) => data.masterId === 'MOTHER_TONGUE');
    setMotherTongueData(filteredMotherTongueData);

    const filteredEADData = leaduserCodeDetail.filter((data) => data.masterId === 'EDUCATIONAL_QUALIFICATION');
    setEADData(filteredEADData);

  };

  const makeSystemMandatoryFields = () => {

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_title' && data.pageId === 4).map((value, index) => {
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


    systemMandatoryField.filter((data) => data.fieldUiid === 'et_firstname' && data.pageId === 4).map((value, index) => {
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

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_middlename' && data.pageId === 4).map((value, index) => {
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

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_lastname' && data.pageId === 4).map((value, index) => {
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

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_gender' && data.pageId === 4).map((value, index) => {
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


    systemMandatoryField.filter((data) => data.fieldUiid === 'et_dob' && data.pageId === 4).map((value, index) => {
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

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_age' && data.pageId === 4).map((value, index) => {
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

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_fathername' && data.pageId === 4).map((value, index) => {
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

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_spousename' && data.pageId === 4).map((value, index) => {
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

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_caste' && data.pageId === 4).map((value, index) => {
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

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_religion' && data.pageId === 4).map((value, index) => {
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

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_mothertongue' && data.pageId === 4).map((value, index) => {
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

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_eduqual' && data.pageId === 4).map((value, index) => {
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

  const updateImage = async () => {
    if (imageUri) {

      setLoading(true);
      insertLead(global.leadID, false)
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

  const updateApplicantDetails = () => {
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
                <DateInputComp textStyle={[Commonstyles.inputtextStyle, { width: '90%' }]} ComponentName="expiryDate1"
                  textValue={DOB}
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
                type="email-address"
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
        </View>

        <ButtonViewComp
          textValue={language[0][props.language].str_next.toUpperCase()}
          textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
          viewStyle={Commonstyles.buttonView}
          innerStyle={Commonstyles.buttonViewInnerStyle}
          handleClick={updateApplicantDetails}
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
