import React, { useState, useRef, useEffect, createRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  StatusBar,
  Keyboard,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  KeyboardAvoidingView,
  Dimensions,
  ImageBackground,
  TextInput,
  Alert,
  PermissionsAndroid,
  Platform,
  Button,
} from 'react-native';

import Feather from 'react-native-vector-icons/Feather';
import apiInstance from '../../../Utils/apiInstance';
import jwtDecode from 'jwt-decode';
import Colors from '../../../Utils/Colors';
import MyStatusBar from '../../../Components/MyStatusBar';
import Loading from '../../../Components/Loading';
import TextComp from '../../../Components/TextComp';
import { connect } from 'react-redux';
import { languageAction } from '../../../Utils/redux/actions/languageAction';
import { language } from '../../../Utils/LanguageString';
import Commonstyles from '../../../Utils/Commonstyles';
import ImageComp from '../../../Components/ImageComp';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import HeadComp from '../../../Components/HeadComp';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import ProgressComp from '../../../Components/ProgressComp';
import Geolocation from 'react-native-geolocation-service';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
import MapView, { Marker } from 'react-native-maps';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import { tr } from 'react-native-paper-dates';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import apiInstancelocal from '../../../Utils/apiInstancelocal';
import axios from 'axios';
import tbl_lead_image from '../../../Database/Table/tbl_lead_image';
import tbl_lead_creation_dms from '../../../Database/Table/tbl_lead_creation_dms';
import tbl_lead_creation_lead_details from '../../../Database/Table/tbl_lead_creation_lead_details';
import tbl_lead_creation_basic_details from '../../../Database/Table/tbl_lead_creation_basic_details';
import tbl_lead_creation_business_details from '../../../Database/Table/tbl_lead_creation_business_details';
import tbl_lead_creation_loan_details from '../../../Database/Table/tbl_lead_creation_loan_details';
import Common from '../../../Utils/Common';
import ImageDetailComp from '../../../Components/ImageDetailComp';
import { profileAction } from '../../../Utils/redux/actions/ProfileAction';
import ButtonViewComp from '../../../Components/ButtonViewComp';
import ErrorModal from '../../../Components/ErrorModal';
import { useIsFocused } from '@react-navigation/native';

const LeadCreationCustomerPhoto = (props, { navigation }) => {

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
  const [profileDetail, setProfileDetail] = useState(props.profiledetail);

  const [gpslatlon, setGPSLatLon] = useState('');
  const mapRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const [photoOptionvisible, setphotoOptionvisible] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [imageFile, setImageFile] = useState([]);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [docID, setDocID] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const [time, setTime] = useState('');
  const [leadType, setLeadType] = useState(global.LEADTYPE);

  const showBottomSheet = () => setBottomSheetVisible(true);
  const hideBottomSheet = () => setBottomSheetVisible(false);

  const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
  const showBottomErrorSheet = () => setBottomErrorSheetVisible(true);
  const hideBottomErrorSheet = () => setBottomErrorSheetVisible(false);

  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const showDetailModalSheet = () => setDetailModalVisible(true);
  const hideDetailModalSheet = () => setDetailModalVisible(false);


  const showphotoBottomSheet = () => setphotoOptionvisible(true);
  const hidephotoBottomSheet = () => setphotoOptionvisible(false);

  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [apiError, setApiError] = useState('');
  const isScreenVisible = useIsFocused();

  useEffect(() => {

    getData();

  }, [gpslatlon]);


  const getData = () => {

    if (leadType == 'DRAFT') {
      tbl_lead_creation_dms.getLeadCreationDmsDetailsBasedOnLeadID(global.leadID).then(value => {
        if (value !== undefined && value.length > 0) {
          setDocID(value[0].dms_id);
          setFileName(value[0].file_name);
          setFileType(value[0].file_type);
          const latLng = value[0].geo_location;
          const [latitude, longitude] = latLng.split(',');
          setCurrentLongitude(parseFloat(longitude));
          setCurrentLatitude(parseFloat(latitude));
          setTime(value[0].created_On)
          zoomToMarker();
          setGPSLatLon(latLng);
          tbl_lead_image.getLeadImageBasedOnLeadID(global.leadID).then(value => {
            if (value !== undefined && value.length > 0) {
              setVisible(false)
              setImageUri(value[0].image);
            }
          })
        } else {
          getOneTimeLocation();
        }
      })
    } else if (leadType == 'NEW') {
      getOneTimeLocation();
    } else if (leadType == 'COMP') {
      const data = props.route.params.leadData;
      setDocID(data.leadCreationDms.dmsId);
      setFileName(data.leadCreationDms.fileName);
      setFileType(data.leadCreationDms.fileType);
      setTime(data.leadCreationDms.photoTakenTime)
      const latLng = data.leadCreationDms.geoLocation;
      const [latitude, longitude] = latLng.split(',');
      setCurrentLongitude(parseFloat(longitude));
      setCurrentLatitude(parseFloat(latitude));
      if (imageUri == null) {
        getImage(data.leadCreationDms.dmsId);
      }
      zoomToMarker();
      setGPSLatLon(latLng);
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
            console.log("FinalLeadCreationApiResponse::" + JSON.stringify(response.data));
            setFileName(response.data.fileName)
            setVisible(false)
            setImageUri('data:image/png;base64,' + response.data.base64Content)
            // props.navigation.navigate('LeadManagement', { fromScreen: 'LeadCompletion' })
            setLoading(false)

          })
          .catch((error) => {
            // Handle the error
            if (global.DEBUG_MODE) console.log("FinalLeadCreationApiResponse::" + JSON.stringify(error.response.data));
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

  const deleteDraftData = async () => {

  }

  const uploadImage = async () => {


    if (validate()) {
      showBottomErrorSheet();
      return;
    }
    Common.getNetworkConnection().then(value => {
      if (value.isConnected == true) {
        updateImage();
      } else {
        insertLead(global.leadID, true);
      }

    })


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
          updateLeadDetails(data.docId);
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

  const updateLeadDetails = (id) => {
    setLoading(true)
    const appDetails = {
      "leadCreationDms": {
        "createdBy": global.USERID,
        "createdOn": '',
        "dmsId": id,
        "fileName": fileName,
        "fileType": fileType,
        "fileInfo": "",
        "comments": "",
        "photoTakenTime": new Date(time),
        "geoLocation": currentLatitude + "," + currentLongitude
      }
    }

    const baseURL = '8901'
    apiInstancelocal(baseURL).put(`/api/v1/lead-creation-initiation/${global.leadID}`, appDetails)
      .then(async (response) => {
        // Handle the response data

        if (global.DEBUG_MODE) console.log("FinalLeadCreationApiResponse::" + JSON.stringify(response.data));

        const deletePromises = [
          tbl_lead_creation_lead_details.deleteLeadCreationLeadDetailsBasedOnID(global.leadID),
          tbl_lead_creation_basic_details.deleteLeadCreationBasicDetailsBasedOnID(global.leadID),
          tbl_lead_creation_business_details.deleteLeadCreationBusinessDetailsBasedOnID(global.leadID),
          tbl_lead_creation_loan_details.deleteLeadCreationLoanDetailsBasedOnID(global.leadID),
          tbl_lead_creation_dms.deleteLeadCreationDmsDetailsBasedOnID(global.leadID),
          tbl_lead_image.deleteLeadImageDetailsBasedOnID(global.leadID),
        ];
        await Promise.all(deletePromises);
        setLoading(false)
        props.navigation.replace('LeadManagement', { fromScreen: 'LeadCompletion' })


      })
      .catch((error) => {
        // Handle the error
        if (global.DEBUG_MODE) console.log("FinalLeadCreationApiResponse:::" + JSON.stringify(error.response))
        setLoading(false)
        if (error.response.data != null) {
          setApiError(error.response.data.message);
          setErrorModalVisible(true)
        }
      });

  }

  const insertLead = async (leadID, nav) => {
    await tbl_lead_creation_dms.insertLeadCreationDmsDetails(leadID, docID, fileName, '', fileType, gpslatlon, '', global.USERID, time);
    await tbl_lead_image.insertLeadImage(leadID, docID, imageUri, global.USERID);

    tbl_lead_creation_dms.getLeadCreationDmsDetailsBasedOnLeadID(leadID).then(value => {
      console.log("LeadImageDetails::::" + JSON.stringify(value))
    })

    tbl_lead_image.getLeadImageBasedOnLeadID(leadID).then(value => {
      console.log("LeadImage::::" + JSON.stringify(value))
    })
    if (nav == true) {
      props.navigation.replace('LeadManagement', { fromScreen: 'LeadCompletion' })
    }
  }

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

  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      position => {
        //Will give you the location on location change

        setLocationStatus('You are Here');
        console.log(position);

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        //Setting Longitude state
        setCurrentLongitude(currentLongitude);

        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      error => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 1000,
      },
    );
  };

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Camera Permission',
          message: 'App needs camera permission',
        },
      );

      // If CAMERA Permission is granted
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  };

  const deletePhoto = () => {
    setImageUri(null);
    setVisible(true);
    hideBottomSheet();
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

    setErrMsg(errorMessage);
    return flag;
  };

  const updateLead = () => {
    if (leadType == 'COMP') {
      props.navigation.navigate('LeadDetails', { leadData: global.leadTrackerData })
    } else {
      uploadImage()
    }
  }

  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  const onGoBack = () => {
    props.navigation.goBack();
  }

  return (
    // enclose all components in this View tag
    <SafeAreaView
      style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>
      <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

      <ErrorModal isVisible={errorModalVisible} onClose={closeErrorModal} textContent={apiError} textClose={language[0][props.language].str_ok} />

      <View style={{
        width: '100%', height: 56, alignItems: 'center', justifyContent: 'center',

      }}>
        <HeadComp textval={leadType != 'COMP' ? language[0][props.language].str_leadcreation : language[0][props.language].str_captureddetails} props={props} onGoBack={onGoBack} />
      </View>

      <View style={{ width: '100%', justifyContent: 'center', alignItems: 'flex-end' }}>
        <Text style={{
          fontSize: 14, color: Colors.mediumgrey, marginRight: 23, fontFamily: 'PoppinsRegular'
        }}>{language[0][props.language].str_leadid} :  <Text style={{ color: Colors.black, fontFamily: 'PoppinsRegular' }}>{global.leadNumber}</Text></Text>
      </View>
      <ScrollView style={styles.scrollView}
        contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {loading ? <Loading /> : null}
        <View style={{ flex: 1 }}>

          <Modal
            isVisible={bottomErrorSheetVisible}
            onBackdropPress={hideBottomSheet}
            style={styles.modal}
          >
            <View style={styles.modalContent}>
              <View style={{ alignItems: 'center' }}>

                <View style={{ width: '100%', flexDirection: 'row', }}>

                  <TextComp textVal={language[0][props.language].str_error} textStyle={{ fontSize: 14, color: Colors.black, fontFamily: 'Poppins-Medium' }} Visible={false} />

                  <MaterialIcons name='error' size={20} color={Colors.red} />

                </View>

                <View style={{ width: '100%', marginTop: 15 }}>
                  <TextComp
                    textVal={errMsg}
                    textStyle={{
                      fontSize: 14,
                      color: Colors.black,
                      lineHeight: 20,
                      fontFamily: 'PoppinsRegular'
                    }}
                    Visible={false}
                  />
                </View>




                <View style={{ width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end', flexDirection: 'row' }}>




                  <View
                    style={{
                      width: '25%',
                      height: 40,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity onPress={() => { hideBottomErrorSheet() }} activeOpacity={0.5} style={{
                      width: '88%', height: 40, backgroundColor: '#0294ff',
                      borderRadius: 35, alignItems: 'center', justifyContent: 'center'
                    }}>
                      <View >

                        <TextComp textVal={language[0][props.language].str_ok} textStyle={{ color: Colors.white, fontSize: 15, fontWeight: 600 }} />

                      </View>
                    </TouchableOpacity>
                  </View>

                </View>

              </View>


            </View>
          </Modal>

          <ImageDetailComp props={props} isVisible={detailModalVisible} onClose={hideDetailModalSheet} fileName={fileName} time={time} geoLocation={gpslatlon} fileType={fileType} />

          <Modal
            isVisible={bottomSheetVisible}
            onBackdropPress={hideBottomSheet}
            style={styles.modal}
          >
            <View style={styles.modalContent}>

              {(!deleteVisible) && <View style={{ marginBottom: 20 }}>

                <TextComp textVal={fileName} textStyle={{ width: '90%', fontSize: 14, color: Colors.mediumgrey, marginTop: 15, fontFamily: 'PoppinsRegular' }} Visible={false} />


                <View style={{ width: '100%', flexDirection: 'row', marginTop: 15, paddingHorizontal: 0, borderBottomWidth: 1, borderBottomColor: '#e2e2e2' }} />


                <TouchableOpacity onPress={() => { hideBottomSheet(); props.navigation.navigate('PreviewImage', { imageName: fileName, imageUri: imageUri }) }} style={{ width: '100%', flexDirection: 'row', marginTop: 18 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '15%' }}>
                      <Image source={require('../../../Images/preview.png')}
                        style={{ width: 20, height: 20 }} />
                    </View>
                    <View style={{ width: '85%', justifyContent: 'center', marginLeft: 3 }}>
                      <TextComp textVal={language[0][props.language].str_preview} textStyle={{ fontSize: 14, color: Colors.mediumgrey, fontFamily: 'PoppinsRegular' }} Visible={false} />
                    </View>

                  </View>

                </TouchableOpacity>

                <TouchableOpacity onPress={() => { showDetailModalSheet(); hideBottomSheet(); }} style={{ width: '100%', flexDirection: 'row', marginTop: 18, }}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '15%' }}>
                      <MaterialIcons name='error' size={20} color={Colors.darkblue} />
                    </View>
                    <View style={{ width: '85%', justifyContent: 'center', marginLeft: 3 }}>
                      <TextComp textVal={language[0][props.language].str_details} textStyle={{ fontSize: 14, color: Colors.mediumgrey, fontFamily: 'PoppinsRegular' }} Visible={false} />
                    </View>

                  </View>

                </TouchableOpacity>

                {leadType != 'COMP' && <TouchableOpacity onPress={() => { setphotoOptionvisible(true); hideBottomSheet() }} activeOpacity={0.5} style={{ width: '100%', flexDirection: 'row', marginTop: 18 }}>
                  <View style={{ flexDirection: 'row' }} >
                    <View style={{ width: '15%', marginLeft: 3 }}>
                      <Image source={require('../../../Images/fileupload.png')}
                        style={{ width: 16, height: 20 }} />
                    </View>
                    <View style={{ width: '85%', justifyContent: 'center' }}>
                      <TextComp textVal={language[0][props.language].str_retake} textStyle={{ fontSize: 14, color: Colors.mediumgrey, fontFamily: 'PoppinsRegular' }} Visible={false} />
                    </View>

                  </View>
                </TouchableOpacity>}

                {leadType != 'COMP' &&
                  <TouchableOpacity onPress={() => { setDeleteVisible(true) }} activeOpacity={0.5} style={{ width: '100%', flexDirection: 'row', marginTop: 20, marginBottom: 20 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ width: '15%' }}>

                        <MaterialCommunityIcons name='delete' size={25} color={Colors.darkblue} />

                      </View>
                      <View style={{ width: '85%', justifyContent: 'center', marginLeft: 3 }}>
                        <TextComp textVal={language[0][props.language].str_delete} textStyle={{ fontSize: 14, color: Colors.mediumgrey, fontFamily: 'PoppinsRegular' }} Visible={false} />
                      </View>

                    </View>
                  </TouchableOpacity>}

              </View>}


              {deleteVisible && <View style={{ alignItems: 'center' }}>

                <MaterialIcons name='error' size={35} color={Colors.red} />

                <TextComp
                  textVal={language[0][props.language].str_deletephoto}
                  textStyle={{
                    fontSize: 14,
                    color: Colors.black,
                    fontWeight: 600,
                    marginTop: 20,
                  }}
                  Visible={false}
                />

                <TextComp
                  textVal={language[0][props.language].str_deletephotodesc}
                  textStyle={{ fontSize: 14, color: Colors.mediumgrey }}
                  Visible={false}
                />

                <View
                  style={{
                    width: '100%',
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      width: '48%',
                      height: 50,
                      marginTop: 25,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        hideBottomSheet();
                      }}
                      activeOpacity={0.5}
                      style={{
                        width: '88%',
                        height: 50,
                        borderBottomColor: Colors.mediumgrey,
                        borderWidth: 1,
                        borderRadius: 45,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View>
                        <TextComp
                          textVal={language[0][props.language].str_cancel}
                          textStyle={{
                            color: Colors.darkblue,
                            fontSize: 13,
                            fontWeight: 600,
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      width: '48%',
                      height: 50,
                      marginTop: 25,
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        deletePhoto();
                      }}
                      activeOpacity={10}
                      style={{
                        width: '88%',
                        height: 50,
                        backgroundColor: '#0294ff',
                        borderRadius: 45,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <View>
                        <TextComp
                          textVal={language[0][props.language].str_yesdelete}
                          textStyle={{
                            color: Colors.white,
                            fontSize: 13,
                            fontWeight: 600,
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              }

              {/*                             

                            <View style={{width:'100%',flexDirection:'row',marginTop:25,marginBottom:20}}>
                            <View style={{ width: '15%' }}>

                            <MaterialIcons name='error' size={25} color={Colors.darkblue} />

                            </View>
                            <View style={{width: '85%',justifyContent:'center'}}>
                            <TextComp textVal={language[0][props.language].str_details} textStyle={{  fontSize: 14, color: Colors.mediumgrey }} Visible={false} />
                            </View>
                            
                            </View> */}
            </View>
          </Modal>

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



          <View style={{ width: '100%', alignItems: 'center', marginTop: '3%' }}>
            <View style={{ width: '90%', marginTop: 3 }}>
              <TextComp
                textStyle={{
                  color: Colors.mediumgrey,
                  fontSize: 15,
                  fontFamily: 'Poppins-Medium'
                }}
                textVal={language[0][props.language].str_phtcapture}></TextComp>

              <ProgressComp progressvalue={1} textvalue="4 of 4" />
            </View>
          </View>

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
                  setphotoOptionvisible(true);
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

        {/* <View
          style={{
            width: '100%',
            height: 50,
            marginTop: 25,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => {
            if (leadType == 'COMP') {
              props.navigation.navigate('LeadDetails', { leadData: global.leadTrackerData })
            } else {
              uploadImage()
            }

          }} activeOpacity={10} style={{
            width: '88%', height: 50, backgroundColor: '#0294ff',
            borderRadius: 45, alignItems: 'center', justifyContent: 'center'
          }}>
            <View >

              <TextComp textVal={leadType != 'COMP' ? language[0][props.language].str_submit : language[0][props.language].str_backtollead} textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }} />

            </View>
          </TouchableOpacity>
        </View> */}



        <ButtonViewComp textValue={leadType != 'COMP' ? language[0][props.language].str_submit : language[0][props.language].str_backtollead} textStyle={{ color: Colors.white, fontSize: 14, fontWeight: 800, letterSpacing: 1, }} viewStyle={Commonstyles.buttonView} innerStyle={Commonstyles.buttonViewInnerStyle} handleClick={updateLead} />





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
  return {
    language: language,
    profiledetail: profileDetails,
  }
}

const mapDispatchToProps = (dispatch) => ({
  languageAction: (item) => dispatch(languageAction(item)),
  profileAction: (item) => dispatch(profileAction(item)),
});


export default connect(mapStateToProps, mapDispatchToProps)(LeadCreationCustomerPhoto);
