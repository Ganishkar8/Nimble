/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    TextInput, TouchableOpacity, BackHandler,
    Image, PermissionsAndroid
} from 'react-native';
import Modal from 'react-native-modal';
import { React, useState, useEffect, useRef } from 'react';
import MyStatusBar from '../../Components/MyStatusBar';
import HeadComp from '../../Components/HeadComp';
import { connect } from 'react-redux';
import { languageAction } from '../../Utils/redux/actions/languageAction';
import { language } from '../../Utils/LanguageString';
import Loading from '../../Components/Loading';
import ChildHeadComp from '../../Components/ChildHeadComp';
import ProgressComp from '../../Components/ProgressComp';
import Colors from '../../Utils/Colors';
import Commonstyles from '../../Utils/Commonstyles';
import Common from '../../Utils/Common';
import IconButtonViewComp from '../../Components/IconButtonViewComp';
import TextInputComp from '../../Components/TextInputComp';
import PickerComp from '../../Components/PickerComp';
import { useIsFocused } from '@react-navigation/native';
import TextComp from '../../Components/TextComp';
import ImageComp from '../../Components/ImageComp';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import ButtonViewComp from '../../Components/ButtonViewComp';
import apiInstance from '../../Utils/apiInstance';
import ImageBottomPreview from '../../Components/ImageBottomPreview';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import ErrorModal from '../../Components/ErrorModal';
const PDReferenceCheck = (props, { navigation }) => {
    const [loading, setLoading] = useState(false);
    const [remarks, setRemarks] = useState('');
    const [pdData, setPdData] = useState([{ id: '1', remarks: '', reason: '' }, { id: '2', remarks: '', reason: '' }]);
    const isScreenVisible = useIsFocused();

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

    const [gpslatlon, setGPSLatLon] = useState('');
    const mapRef = useRef(null);
    const [visible, setVisible] = useState(false);
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
    const [hideRetake, setHideRetake] = useState(false);
    const [hideDelete, setHideDelete] = useState(false);

    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');


    const nameRef = useRef(null);
    const contactNumberRef = useRef(null);
    const kycIDRef = useRef(null);
    const fwaRef = useRef(null);
    const addressLine1Ref = useRef(null);
    const addressLine2Ref = useRef(null);
    const landmarkRef = useRef(null);
    const pincodeRef = useRef(null);
    const cityRef = useRef(null);
    const districtRef = useRef(null);
    const stateRef = useRef(null);

    const [name, setName] = useState('');
    const [nameCaption, setNameCaption] = useState('NAME');
    const [nameMan, setNameMan] = useState(true);
    const [nameVisible, setNameVisible] = useState(true);
    const [nameDisable, setNameDisable] = useState(false);

    const [contactNumber, setContactNumber] = useState('');
    const [contactNumberCaption, setContactNumberCaption] = useState('CONTACT NUMBER');
    const [contactNumberMan, setContactNumberMan] = useState(true);
    const [contactNumberVisible, setContactNumberVisible] = useState(true);
    const [contactNumberDisable, setContactNumberDisable] = useState(false);

    const [kycTypeLabel, setKycTypeLabel] = useState('');
    const [kycTypeIndex, setKycTypeIndex] = useState('');
    const [kycTypeCaption, setKycTypeCaption] = useState('KYC TYPE');
    const [kycTypeMan, setKycTypeMan] = useState(true);
    const [kycTypeVisible, setKycTypeVisible] = useState(true);
    const [kycTypeDisable, setKycTypeDisable] = useState(false);
    const [kycTypeData, setKycTypeData] = useState([]);

    const [kycID, setKycID] = useState('');
    const [kycIDCaption, setKycIDCaption] = useState('KYC ID');
    const [kycIDMan, setKycIDMan] = useState(true);
    const [kycIDVisible, setKycIDVisible] = useState(true);
    const [kycIDDisable, setKycIDDisable] = useState(false);

    const [referenceTypeLabel, setReferenceTypeLabel] = useState('');
    const [referenceTypeIndex, setReferenceTypeIndex] = useState('');
    const [referenceTypeCaption, setReferenceTypeCaption] = useState('REFERENCE TYPE');
    const [referenceTypeMan, setReferenceTypeMan] = useState(true);
    const [referenceTypeVisible, setReferenceTypeVisible] = useState(true);
    const [referenceTypeDisable, setReferenceTypeDisable] = useState(false);
    const [referenceTypeData, setReferenceTypeData] = useState([]);

    const [fwa, setFwa] = useState('');
    const [fwaCaption, seFwaCaption] = useState('FAMILIARITY WITH APPLICANT (YEAR)');
    const [fwaMan, setFwaMan] = useState(true);
    const [fwaVisible, setFwaVisible] = useState(true);
    const [fwaDisable, setFwaDisable] = useState(false);

    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine1Caption, setAddressLine1Caption] = useState('ADDRESS LINE 1');
    const [addressLine1Man, setAddressLine1Man] = useState(true);
    const [addressLine1Visible, setAddressLine1Visible] = useState(true);
    const [addressLine1Disable, setAddressLine1Disable] = useState(false);

    const [addressLine2, setAddressLine2] = useState('');
    const [addressLine2Caption, setAddressLine2Caption] = useState('ADDRESS LINE 2');
    const [addressLine2Man, setAddressLine2Man] = useState(false);
    const [addressLine2Visible, setAddressLine2Visible] = useState(true);
    const [addressLine2Disable, setAddressLine2Disable] = useState(false);

    const [landmark, setLandmark] = useState('');
    const [landmarkCaption, setLandmarkCaption] = useState('LANDMARK');
    const [landmarkMan, setLandmarkMan] = useState(false);
    const [landmarkVisible, setLandmarkVisible] = useState(true);
    const [landmarkDisable, setLandmarkDisable] = useState(false);

    const [pincode, setPincode] = useState('');
    const [pincodeCaption, setPincodeCaption] = useState('PINCODE');
    const [pincodeMan, setPincodeMan] = useState(true);
    const [pincodeVisible, setPincodeVisible] = useState(true);
    const [pincodeDisable, setPincodeDisable] = useState(false);

    const [city, setCity] = useState('');
    const [cityCaption, setCityCaption] = useState('CITY/VILLAGE');
    const [cityMan, setCityMan] = useState(true);
    const [cityVisible, setCityVisible] = useState(true);
    const [cityDisable, setCityDisable] = useState(false);

    const [district, setDistrict] = useState('');
    const [districtCaption, setDistrictCaption] = useState('DISTRICT');
    const [districtMan, setDistrictMan] = useState(true);
    const [districtVisible, setDistrictVisible] = useState(true);
    const [districtDisable, setDistrictDisable] = useState(false);

    const [state, setState] = useState('');
    const [stateCaption, setStateCaption] = useState('STATE');
    const [stateMan, setStateMan] = useState(true);
    const [stateVisible, setStateVisible] = useState(true);
    const [stateDisable, setStateDisable] = useState(false);

    const [remarksLabel, setRemarksLabel] = useState('');
    const [remarksIndex, setRemarksIndex] = useState('');
    const [remarksCaption, setRemarksCaption] = useState('REMARKS');
    const [remarksMan, setRemarksMan] = useState(true);
    const [remarksVisible, setRemarksVisible] = useState(true);
    const [remarksDisable, setRemarksDisable] = useState(false);
    const [remarksData, setRemarksData] = useState([]);
    const [bankUserCodeDetail, setBankUserCodeDetail] = useState(props.mobilecodedetail.t_BankUserCode);
    const [leaduserCodeDetail, setLeadUserCodeDetail] = useState(props.mobilecodedetail.leadUserCodeDto);
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        getSystemCodeDetail();

        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }
    }, [props.navigation, isScreenVisible]);

    const handleBackButton = () => {
        onGoBack();
        return true; // Prevent default back button behavior
    };

    const onGoBack = () => {
        props.navigation.goBack();
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
            hideImageBottomSheet();
        }
    }

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

    const getSystemCodeDetail = async () => {
        if (bankUserCodeDetail) {
            const idData = bankUserCodeDetail.filter((data) => data.ID === 'IndIdentitySettingID').sort((a, b) => a.Description.localeCompare(b.Description));;
            setKycTypeData(idData);
        }
        const filteredReferenceData = leaduserCodeDetail.filter((data) => data.masterId === 'REFERENCETYPE').sort((a, b) => a.Description.localeCompare(b.Description));;
        setReferenceTypeData(filteredReferenceData);
    }

    const closeErrorModal = () => {
        setErrorModalVisible(false);
    };

    const submitQuestionare = () => {
        //console.log('QuestionFinalData::' + JSON.stringify(pdData))
        if (validateData()) {
            alert(errMsg)
        }
    }

    const validateData = () => {
        var flag = false;
        var i = 1;
        var errorMessage = '';

        if (addressLine1Man && addressLine1Visible) {
            if (addressLine1.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + addressLine1Caption + '\n';
                i++;
                flag = true;
            }
        }

        if (addressLine2Man && addressLine2Visible) {
            if (addressLine2.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + addressLine2Caption + '\n';
                i++;
                flag = true;
            }
        }

        if (landmarkMan && landmarkVisible) {
            if (landmark.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + landmarkCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (pincodeMan && pincodeVisible) {
            if (pincode.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + pincodeCaption + '\n';
                i++;
                flag = true;
            } else if (pincode.length < 6) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + "Valid " + pincodeCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (cityMan && cityVisible) {
            if (city.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + cityCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (districtMan && districtVisible) {
            if (district.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + districtCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (stateMan && stateVisible) {
            if (state.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + stateCaption + '\n';
                i++;
                flag = true;
            }
        }
        setErrMsg(errorMessage);
        return flag;
    };

    const handlePickerClick = (componentName, label, index) => {
        if (componentName === 'kycTypePicker') {
            setKycTypeLabel(label);
            setKycTypeIndex(index);
        } else if (componentName === 'referenceTypePicker') {
            setReferenceTypeLabel(label);
            setReferenceTypeIndex(index);
        } else if (componentName === 'remarksPicker') {
            setRemarksLabel(label);
            setRemarksIndex(index);
        }
    }

    const handleClick = (componentName, textValue) => {
        if (componentName === 'name') {
            if (textValue.length > 0) {
                if (Common.isValidText(textValue))
                    setName(textValue)
            } else {
                setName(textValue)
            }
        } else if (componentName === 'contactNumber') {
            if (textValue.length > 0) {
                setContactNumber(textValue)
            } else {
                setContactNumber(textValue)
            }
        } else if (componentName === 'kycID') {
            if (textValue.length > 0) {
                setKycID(textValue)
            } else {
                setKycID(textValue)
            }
        } else if (componentName === 'fwa') {
            if (textValue.length > 0) {
                setFwa(textValue)
            } else {
                setFwa(textValue)
            }
        } else if (componentName === 'addressLine1') {
            if (textValue.length > 0) {
                if (Common.isValidText(textValue))
                    setAddressLine1(textValue)
            } else {
                setAddressLine1(textValue)
            }
        } else if (componentName === 'addressLine2') {
            if (textValue.length > 0) {
                if (Common.isValidText(textValue))
                    setAddressLine2(textValue)
            } else {
                setAddressLine2(textValue)
            }
        } else if (componentName === 'landmark') {
            if (textValue.length > 0) {
                if (Common.isValidText(textValue))
                    setLandmark(textValue)
            } else {
                setLandmark(textValue)
            }
        } else if (componentName === 'pincode') {
            if (textValue.length == 6) {
                getPinCode(textValue)
            }
            setPincode(textValue)
        } else if (componentName === 'city') {
            if (textValue.length > 0) {
                if (Common.isValidText(textValue))
                    setCity(textValue)
            } else {
                setPincode(textValue)
            }
        } else if (componentName === 'district') {
            if (textValue.length > 0) {
                if (Common.isValidText(textValue))
                    setDistrict(textValue)
            } else {
                setDistrict(textValue)
            }
        } else if (componentName === 'state') {
            if (textValue.length > 0) {
                if (Common.isValidText(textValue))
                    setState(textValue)
            } else {
                setState(textValue)
            }
        }
    }

    const handleReference = (componentName) => {
    }

    const getPinCode = (pincode) => {

        const baseURL = '8082';
        setLoading(true);
        apiInstance(baseURL)
            .get(`api/v1/pincode/new/${pincode}`)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log('PincodeApiResponse::' + JSON.stringify(response.data),);

                setLoading(false);

                setPincodeResponse(response.data);
                setDistrict(response.data.city.name);
                setState(response.data.city.state.name);
                setCountry(response.data.city.state.country.name);
                setDistrictDisable(true)
                setStateDisable(true);


            })
            .catch(error => {
                // Handle the error
                if (global.DEBUG_MODE) console.log('PincodeApiError' + JSON.stringify(error.response));
                setLoading(false);
                if (error.response.data != null) {
                    setApiError(error.response.data.message);
                    setErrorModalVisible(true)
                }
            });

    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            {loading ? <Loading /> : null}
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
            <View
                style={{
                    width: '100%',
                    height: 56,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <HeadComp
                    textval={language[0][props.language].str_pd}
                    props={props}
                    onGoBack={onGoBack}
                />
            </View>
            <View style={{ width: '93%', flexDirection: 'row', marginLeft: 20 }}>
                <Text style={{ fontSize: 15, color: Colors.lightgrey, fontFamily: 'Poppins-Medium', marginTop: 3 }}>
                    {language[0][props.language].str_referencecheck}
                </Text>
            </View>
            <ScrollView>

                {nameVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={nameCaption} textStyle={Commonstyles.inputtextStyle} Visible={nameMan} />
                    </View>
                    <TextInputComp textValue={name} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={nameDisable} ComponentName='name' reference={nameRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}

                {contactNumberVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={contactNumberCaption} textStyle={Commonstyles.inputtextStyle} Visible={contactNumberMan} />
                    </View>
                    <TextInputComp textValue={contactNumber} textStyle={Commonstyles.textinputtextStyle} type='number-pad' Disable={contactNumberDisable} ComponentName='contactNumber' reference={contactNumberRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={10} />
                </View>}

                {kycTypeVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={kycTypeCaption} textStyle={Commonstyles.inputtextStyle} Visible={kycTypeMan} />
                    </View>
                    <PickerComp textLabel={kycTypeLabel} pickerStyle={Commonstyles.picker} Disable={kycTypeDisable} pickerdata={kycTypeData} componentName='kycTypePicker' handlePickerClick={handlePickerClick} />
                </View>}

                {kycIDVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={kycIDCaption} textStyle={Commonstyles.inputtextStyle} Visible={kycIDMan} />
                    </View>
                    <TextInputComp textValue={kycID} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={kycIDDisable} ComponentName='kycID' reference={kycIDRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}

                {referenceTypeVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={referenceTypeCaption} textStyle={Commonstyles.inputtextStyle} Visible={referenceTypeMan} />
                    </View>
                    <PickerComp textLabel={referenceTypeLabel} pickerStyle={Commonstyles.picker} Disable={referenceTypeDisable} pickerdata={referenceTypeData} componentName='referenceTypePicker' handlePickerClick={handlePickerClick} />
                </View>}

                {fwaVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={fwaCaption} textStyle={Commonstyles.inputtextStyle} Visible={fwaMan} />
                    </View>
                    <TextInputComp textValue={fwa} textStyle={Commonstyles.textinputtextStyle} type='number-pad' Disable={fwaDisable} ComponentName='fwa' reference={fwaRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={3} />
                </View>}

                {addressLine1Visible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={addressLine1Caption} textStyle={Commonstyles.inputtextStyle} Visible={addressLine1Man} />
                    </View>
                    <TextInputComp textValue={addressLine1} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={addressLine1Disable} ComponentName='addressLine1' reference={addressLine1Ref} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}

                {addressLine2Visible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={addressLine2Caption} textStyle={Commonstyles.inputtextStyle} Visible={addressLine2Man} />
                    </View>
                    <TextInputComp textValue={addressLine2} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={addressLine2Disable} ComponentName='addressLine2' reference={addressLine2Ref} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}

                {landmarkVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={landmarkCaption} textStyle={Commonstyles.inputtextStyle} Visible={landmarkMan} />
                    </View>
                    <TextInputComp textValue={landmark} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={landmarkDisable} ComponentName='landmark' reference={landmarkRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}

                {pincodeVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={pincodeCaption} textStyle={Commonstyles.inputtextStyle} Visible={pincodeMan} />
                    </View>
                    <TextInputComp textValue={pincode} textStyle={Commonstyles.textinputtextStyle} type='number-pad' Disable={pincodeDisable} ComponentName='pincode' reference={pincodeRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={6} />
                </View>}

                {cityVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={cityCaption} textStyle={Commonstyles.inputtextStyle} Visible={cityMan} />
                    </View>
                    <TextInputComp textValue={city} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={cityDisable} ComponentName='city' reference={cityRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}

                {districtVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={districtCaption} textStyle={Commonstyles.inputtextStyle} Visible={districtMan} />
                    </View>
                    <TextInputComp textValue={district} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={districtDisable} ComponentName='district' reference={districtRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}

                {stateVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={stateCaption} textStyle={Commonstyles.inputtextStyle} Visible={stateMan} />
                    </View>
                    <TextInputComp textValue={state} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={stateDisable} ComponentName='state' reference={stateRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}

                {remarksVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={remarksCaption} textStyle={Commonstyles.inputtextStyle} Visible={remarksMan} />
                    </View>
                    <PickerComp textLabel={remarksLabel} pickerStyle={Commonstyles.picker} Disable={remarksDisable} pickerdata={remarksData} componentName='remarksPicker' handlePickerClick={handlePickerClick} />
                </View>}

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
                        }} >
                            {/* onPress={() => { props.navigation.navigate('PreviewImage', { imageName: fileName, imageUri: imageUri }) }} */}


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
            </ScrollView>


            <ButtonViewComp
                textValue={language[0][props.language].str_submit.toUpperCase()}
                textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500, marginBottom: 5 }}
                viewStyle={Commonstyles.buttonView}
                innerStyle={Commonstyles.buttonViewInnerStyle}
                handleClick={submitQuestionare}
            />
        </SafeAreaView >
    );
};

const mapStateToProps = state => {
    const { language } = state.languageReducer;
    const { profileDetails } = state.profileReducer;
    const { mobileCodeDetails } = state.mobilecodeReducer;
    return {
        language: language,
        profiledetail: profileDetails,
        mobilecodedetail: mobileCodeDetails
    }
};

const mapDispatchToProps = dispatch => ({
    languageAction: item => dispatch(languageAction(item)),
});

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

export default connect(mapStateToProps, mapDispatchToProps)(PDReferenceCheck);
