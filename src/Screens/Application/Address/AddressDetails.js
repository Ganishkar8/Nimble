import { View, Text, ScrollView, SafeAreaView, StyleSheet, BackHandler, TouchableOpacity, Image } from 'react-native';
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
import Modal from 'react-native-modal';
import ButtonViewComp from '../../../Components/ButtonViewComp';
import TextComp from '../../../Components/TextComp';
import PickerComp from '../../../Components/PickerComp';
import TextInputComp from '../../../Components/TextInputComp';
import Entypo from 'react-native-vector-icons/Entypo';
import Common from '../../../Utils/Common';
import tbl_clientaddressinfo from '../../../Database/Table/tbl_clientaddressinfo';
import ErrorModal from '../../../Components/ErrorModal';
import tbl_client from '../../../Database/Table/tbl_client';
import apiInstance from '../../../Utils/apiInstance';
import CheckBoxComp from '../../../Components/CheckBoxComp';
import { it } from 'react-native-paper-dates';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import ImageBottomPreview from '../../../Components/ImageBottomPreview';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useIsFocused } from '@react-navigation/native';
import { updateLoanInitiationDetails, deleteLoanInitiationDetails, updateNestedClientDetails } from '../../../Utils/redux/actions/loanInitiationAction';

const AddressDetails = (props, { navigation }) => {
  const [loading, setLoading] = useState(false);
  // const [Data, setNewData] = useState();
  const isScreenVisible = useIsFocused();
  const [DataArray, setNewDataArray] = useState([]);
  const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
  const showBottomSheet = () => setBottomErrorSheetVisible(true);
  const hideBottomSheet = () => setBottomErrorSheetVisible(false);

  const [errMsg, setErrMsg] = useState('');
  let errorCounter = 1;

  const addressLine1Ref = useRef(null);
  const addressLine2Ref = useRef(null);
  const landmarkRef = useRef(null);
  const pincodeRef = useRef(null);
  const cityRef = useRef(null);
  const districtRef = useRef(null);
  const stateRef = useRef(null);
  const countryRef = useRef(null);
  const yearAtResidenceRef = useRef(null);
  const yearInCurrentCityRef = useRef(null);
  const ownerNameRef = useRef(null);

  const [isNew, setIsNew] = useState(props.route.params.addressType);

  const [actionTypeLabel, setActionTypeLabel] = useState('');
  const [actionTypeIndex, setActionTypeIndex] = useState('');
  const [actionTypeCaption, setActionTypeCaption] = useState('ACTION TYPE');
  const [actionTypeMan, setActionTypeMan] = useState(false);
  const [actionTypeVisible, setActionTypeVisible] = useState(true);
  const [actionTypeDisable, setActionTypeDisable] = useState(false);
  const [actionTypeData, setActionTypeData] = useState([]);

  const [addressTypeLabel, setAddressTypeLabel] = useState('');
  const [addressTypeIndex, setAddressTypeIndex] = useState('');
  const [addressTypeCaption, setAddressTypeCaption] = useState('ADDRESS TYPE');
  const [addressTypeMan, setAddressTypeMan] = useState(false);
  const [addressTypeVisible, setAddressTypeVisible] = useState(true);
  const [addressTypeDisable, setAddressTypeDisable] = useState(false);
  const [addressTypeData, setaddressTypeData] = useState([]);

  const [sameAsPermVisible, setsameAsPermVisible] = useState(false);
  const [sameAsPerm, setsameAsPerm] = useState(false);
  const [sameAsPermCaption, setsameAsPermCaption] = useState('Is Same As Permanent?');
  const [sameAsPermDisable, setsameAsPermDisable] = useState(false);

  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine1Caption, setAddressLine1Caption] = useState('ADDRESS LINE 1');
  const [addressLine1Man, setAddressLine1Man] = useState(false);
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
  const [pincodeMan, setPincodeMan] = useState(false);
  const [pincodeVisible, setPincodeVisible] = useState(true);
  const [pincodeDisable, setPincodeDisable] = useState(false);

  const [city, setCity] = useState('');
  const [cityCaption, setCityCaption] = useState('CITY/VILLAGE');
  const [cityMan, setCityMan] = useState(false);
  const [cityVisible, setCityVisible] = useState(true);
  const [cityDisable, setCityDisable] = useState(false);

  const [district, setDistrict] = useState('');
  const [districtCaption, setDistrictCaption] = useState('DISTRICT');
  const [districtMan, setDistrictMan] = useState(false);
  const [districtVisible, setDistrictVisible] = useState(true);
  const [districtDisable, setDistrictDisable] = useState(false);

  const [state, setState] = useState('');
  const [stateCaption, setStateCaption] = useState('STATE');
  const [stateMan, setStateMan] = useState(false);
  const [stateVisible, setStateVisible] = useState(true);
  const [stateDisable, setStateDisable] = useState(false);

  const [country, setCountry] = useState('');
  const [countryCaption, setCountryCaption] = useState('COUNTRY');
  const [countryMan, setCountryMan] = useState(false);
  const [countryVisible, setCountryVisible] = useState(true);
  const [countryDisable, setCountryDisable] = useState(false);

  const [geoClassificationLabel, setGeoClassificationLabel] = useState('');
  const [geoClassificationIndex, setGeoClassificationIndex] = useState('');
  const [geoClassificationCaption, setGeoClassificationCaption] = useState('GEO CLASSIFICATION');
  const [geoClassificationMan, setGeoClassificationMan] = useState(false);
  const [geoClassificationVisible, setGeoClassificationVisible] = useState(true);
  const [geoClassificationDisable, setGeoClassificationDisable] = useState(false);
  const [geoClassificationData, setGeoClassificationData] = useState([]);

  const [yearsAtResidence, setYearsAtResidence] = useState('');
  const [yearsAtResidenceCaption, setYearsAtResidenceCaption] = useState('YEARS AT RESIDENCE');
  const [yearsAtResidenceMan, setYearsAtResidenceMan] = useState(false);
  const [yearsAtResidenceVisible, setYearsAtResidenceVisible] = useState(true);
  const [yearsAtResidenceDisable, setYearsAtResidenceDisable] = useState(false);

  const [yearsAtCity, setYearsAtCity] = useState('');
  const [yearsAtCityCaption, setYearsAtCityCaption] = useState('YEARS IN CURRENT CITY/TOWN');
  const [yearsAtCityMan, setYearsAtCityMan] = useState(false);
  const [yearsAtCityVisible, setYearsAtCityVisible] = useState(true);
  const [yearsAtCityDisable, setYearsAtCityDisable] = useState(false);

  const [addressOwnerTypeLabel, setAddressOwnerTypeLabel] = useState('');
  const [addressOwnerTypeIndex, setAddressOwnerTypeIndex] = useState('');
  const [addressOwnerTypeCaption, setAddressOwnerTypeCaption] = useState('ADDRESS OWNERSHIP TYPE');
  const [addressOwnerTypeMan, setAddressOwnerTypeMan] = useState(false);
  const [addressOwnerTypeVisible, setAddressOwnerTypeVisible] = useState(true);
  const [addressOwnerTypeDisable, setAddressOwnerTypeDisable] = useState(false);
  const [addressOwnerTypeData, setAddressOwnerTypeData] = useState([]);

  const [ownerDetailsLabel, setOwnerDetailsLabel] = useState('');
  const [ownerDetailsIndex, setOwnerDetailsIndex] = useState('');
  const [ownerDetailsCaption, setOwnerDetailsCaption] = useState('OWNER DETAILS');
  const [ownerDetailsMan, setOwnerDetailsMan] = useState(false);
  const [ownerDetailsVisible, setOwnerDetailsVisible] = useState(true);
  const [ownerDetailsDisable, setOwnerDetailsDisable] = useState(false);
  const [ownerDetailsData, setOwnerDetailsData] = useState([]);

  const [ownerName, setOwnerName] = useState('');
  const [ownerNameCaption, setOwnerNameCaption] = useState('OWNER NAME');
  const [ownerNameMan, setOwnerNameMan] = useState(false);
  const [ownerNameVisible, setOwnerNameVisible] = useState(false);
  const [ownerNameDisable, setOwnerNameDisable] = useState(false);

  const [systemCodeDetail, setSystemCodeDetail] = useState(props.mobilecodedetail.leadSystemCodeDto);
  const [userCodeDetail, setUserCodeDetail] = useState(props.mobilecodedetail.leadUserCodeDto);
  const [systemMandatoryField, setSystemMandatoryField] = useState(props.mobilecodedetail.processSystemMandatoryFields);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [apiError, setApiError] = useState('');

  const [addressID, setAddressID] = useState('');
  const [addressDmsID, setAddressDmsID] = useState('');
  const [isKYC, setIsKYC] = useState('');


  const [postorput, setPostORPut] = useState('post');
  const [kycManual, setKYCManual] = useState('0');

  const [pincodeResponse, setPincodeResponse] = useState('');
  const [permAddressAvailable, setPermAddressAvailable] = useState(false);
  const [pageId, setPageId] = useState(global.CURRENTPAGEID);

  const [onlyView, setOnlyView] = useState(false);

  const [photoOptionvisible, setphotoOptionvisible] = useState(false);
  const showphotoBottomSheet = () => setphotoOptionvisible(true);
  const hidephotoBottomSheet = () => setphotoOptionvisible(false);
  const [deleteVisible, setDeleteVisible] = useState(false);
  const [imageFile, setImageFile] = useState([]);
  const [imageUri, setImageUri] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const showImageBottomSheet = () => { setBottomSheetVisible(true) };
  const hideImageBottomSheet = () => setBottomSheetVisible(false);
  const [hideRetake, setHideRetake] = useState(false);
  const [hideDelete, setHideDelete] = useState(false);


  useEffect(() => {

    getSystemCodeDetail()
    getAddressData();
    makeSystemMandatoryFields();
    getExistingData();

  }, [props.navigation]);

  useEffect(() => {
    props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
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

  const getExistingData = () => {

    // tbl_client.getClientBasedOnID(global.LOANAPPLICATIONID, global.CLIENTTYPE).then(value => {
    //   if (value !== undefined && value.length > 0) {

    //     setKYCManual(value[0].isKycManual)

    //     if (global.USERTYPEID == 1163) {
    //       if (!(value[0].isKycManual == '1')) {
    //         fieldsDisable();
    //       }
    //     }

    //   }
    // })

    if (isNew != 'new') {
      setPostORPut('put')
      getExistingAddressData(isNew)
    } else {
      setPostORPut('post');
    }
  }

  const fieldsDisable = () => {

    setAddressTypeDisable(true);
    setAddressLine1Disable(true);
    setAddressLine2Disable(true);
    setLandmarkDisable(true);
    setPincodeDisable(true);
    setCityDisable(true);
    setDistrictDisable(true);
    setStateDisable(true)
    setCountryDisable(true)
    setGeoClassificationDisable(true);
    setYearsAtResidenceDisable(true);
    setYearsAtCityDisable(true);
    setAddressOwnerTypeDisable(true);
    setOwnerDetailsDisable(true);
    setOwnerNameDisable(true);

  }

  const fieldsEnable = () => {

    setAddressTypeDisable(false);
    setAddressLine1Disable(false);
    setAddressLine2Disable(false);
    setLandmarkDisable(false);
    setPincodeDisable(false);
    setCityDisable(false);
    setDistrictDisable(false);
    setStateDisable(false)
    setCountryDisable(false)
    setGeoClassificationDisable(false);
    setYearsAtResidenceDisable(false);
    setYearsAtCityDisable(false);
    setAddressOwnerTypeDisable(false);
    setOwnerDetailsDisable(false);
    setOwnerNameDisable(false);
    setAddressLine1('')
    setAddressLine2('')
    setLandmark('')
    setPincode('')
    setCity('')
    setDistrict('')
    setState('')
    setCountry('')
    setYearsAtResidence('')
    setOwnerName('')
    setYearsAtCity('')
    setGeoClassificationLabel('')
    setAddressOwnerTypeLabel('')
    setOwnerDetailsLabel('')

  }

  const KycFieldsEnable = () => {

    setAddressTypeDisable(false);
    setAddressLine1Disable(false);
    setAddressLine2Disable(false);
    setLandmarkDisable(false);
    setPincodeDisable(false);
    setCityDisable(false);
    setDistrictDisable(false);
    setStateDisable(false)
    setCountryDisable(false)
    setGeoClassificationDisable(false);
    setYearsAtResidenceDisable(false);
    setYearsAtCityDisable(false);
    setAddressOwnerTypeDisable(false);
    setOwnerDetailsDisable(false);
    setOwnerNameDisable(false);
  }

  const KycHybridFieldsEnable = () => {

    if (addressTypeLabel) {
      setAddressTypeDisable(true);
    } else {
      setAddressTypeDisable(false);
    }

    if (addressLine1) {
      setAddressLine1Disable(true);
    } else {
      setAddressLine1Disable(false);
    }

    if (addressLine2) {
      setAddressLine2Disable(true);
    } else {
      setAddressLine2Disable(false);
    }

    if (landmark) {
      setLandmarkDisable(true);
    } else {
      setLandmarkDisable(false);
    }

    if (pincode) {
      setPincodeDisable(true);
    } else {
      setPincodeDisable(false);
    }

    if (city) {
      setCityDisable(true);
    } else {
      setCityDisable(false);
    }

    if (district) {
      setDistrictDisable(true);
    } else {
      setDistrictDisable(false);
    }

    if (state) {
      setStateDisable(true);
    } else {
      setStateDisable(false);
    }

    if (country) {
      setCountryDisable(true);
    } else {
      setCountryDisable(false);
    }

    if (geoClassificationLabel) {
      setGeoClassificationDisable(true);
    } else {
      setGeoClassificationDisable(false);
    }

    if (yearsAtResidence) {
      setYearsAtResidenceDisable(true);
    } else {
      setYearsAtResidenceDisable(false);
    }

    if (yearsAtCity) {
      setYearsAtCityDisable(true);
    } else {
      setYearsAtCityDisable(false);
    }

    if (addressOwnerTypeLabel) {
      setAddressOwnerTypeDisable(true);
    } else {
      setAddressOwnerTypeDisable(false);
    }

    if (ownerDetailsLabel) {
      setOwnerDetailsDisable(true);
    } else {
      setOwnerDetailsDisable(false);
    }

    if (ownerName) {
      setOwnerNameDisable(true);
    } else {
      setOwnerNameDisable(false);
    }

  }

  const getExistingAddressData = (data) => {
    setAddressID(data.id)
    setAddressLine1(data.addressLine1)
    setAddressLine2(data.addressLine2)
    setLandmark(data.landmark)
    setPincode(data.pincode)
    setCity(data.city)
    setDistrict(data.district)
    setState(data.state)
    setCountry(data.country)
    setYearsAtResidence(data?.yearsAtResidence?.toString())
    setOwnerName(data.ownerName)
    setYearsAtCity(data?.yearsInCurrentCityOrTown?.toString())
    //spinner
    setAddressTypeLabel(data.addressType)
    if (data.addressType == 'P') {
      setGeoClassificationVisible(false);
      setGeoClassificationMan(false);
      setYearsAtResidenceVisible(false);
      setYearsAtResidenceMan(false);
      setYearsAtCityVisible(false);
      setYearsAtResidenceMan(false);
    }
    setGeoClassificationLabel(data.geoClassification)
    setAddressOwnerTypeLabel(data.addressOwnership)
    setOwnerDetailsLabel(data.ownerDetails)
    if (data.ownerDetails == 'OD-OTH' || data.ownerDetails == 'OD-RLT') {
      setOwnerNameDisable(false);
      setOwnerNameMan(true);
      setOwnerNameVisible(true);
    } else {
      setOwnerNameDisable(true);
      setOwnerNameMan(false);
      setOwnerNameVisible(false);
      setOwnerName('')
    }
    if (data.isKyc === "1") {
      disableAadharFields(data)
    }
    setIsKYC(data.isKyc);
  }

  const getPermanentAddressData = () => {

    const filteredData = props.loanInitiationDetails.filter(item => item.id === parseInt(global.LOANAPPLICATIONID));

    if (filteredData.length > 0) {

      const clientDetail = filteredData[0].clientDetail.find(client => client.id === parseInt(global.CLIENTID));

      if (clientDetail) {

        const addressDetails = clientDetail.clientAddress;
        if (addressDetails) {

          const permanentAddress = addressDetails.find(item => item.addressType === 'P');

          if (permanentAddress) {
            setAddressLine1(permanentAddress.addressLine1)
            setAddressLine2(permanentAddress.addressLine2)
            setLandmark(permanentAddress.landmark)
            setPincode(permanentAddress.pincode)
            setCity(permanentAddress.city)
            setDistrict(permanentAddress.district)
            setState(permanentAddress.state)
            setCountry(permanentAddress.country)
            setYearsAtResidence(permanentAddress.yearsAtResidence)
            setOwnerName(permanentAddress.ownerName)
            setYearsAtCity(permanentAddress.yearsInCurrentCityOrTown)
            setGeoClassificationLabel(permanentAddress.geoClassification)
            setAddressOwnerTypeLabel(permanentAddress.addressOwnership)
            setOwnerDetailsLabel(permanentAddress.ownerDetails)

            if (permanentAddress.ownerDetails == 'OD-OTH' || permanentAddress.ownerDetails == 'OD-RLT') {
              setOwnerNameDisable(false);
              setOwnerNameMan(true);
              setOwnerNameVisible(true);
            } else {
              setOwnerNameDisable(true);
              setOwnerNameMan(false);
              setOwnerNameVisible(false);
              setOwnerName('')
            }
            fieldsDisable();
            setGeoClassificationDisable(false);
            setYearsAtResidenceDisable(false);
            setYearsAtCityDisable(false);
            setAddressTypeDisable(false);
            setsameAsPermDisable(false);
            setIsKYC('0');
          }

        }

        if (global.DEBUG_MODE) console.log("Address Details:", addressDetails);
      } else {
        if (global.DEBUG_MODE) console.log("Client ID not found in clientDetail array.");
      }
    } else {
      if (global.DEBUG_MODE) console.log("Loan application number not found.");
    }


  }

  const disableAadharFields = (data) => {
    setAddressTypeDisable(true)
    setAddressLine1Disable(true)
    setAddressLine2Disable(true)
    if (data[0].landmark != null && data[0].landmark != "") {
      setLandmarkDisable(true)
    }
    setPincodeDisable(true)
    setDistrictDisable(true)
    setStateDisable(true)
    setCountryDisable(true)
    setOwnerNameDisable(true)
  }

  const getSystemCodeDetail = () => {

    const filterOwnershipTypeData = userCodeDetail.filter((data) => data.masterId === 'ADDRESS_OWNERSHIP_TYPE');
    setAddressOwnerTypeData(filterOwnershipTypeData)

    const filterOwnerDetailsData = userCodeDetail.filter((data) => data.masterId === 'OWNER_DETAILS');
    setOwnerDetailsData(filterOwnerDetailsData)

    const filterGeoClassificationData = userCodeDetail.filter((data) => data.masterId === 'GEO_CLASSIFICATION');
    setGeoClassificationData(filterGeoClassificationData)

  }

  const getAddressData = async () => {

    var availAddresssType = [];

    const filteredData = props.loanInitiationDetails.filter(item => item.id === parseInt(global.LOANAPPLICATIONID));

    if (filteredData.length > 0) {

      const clientDetail = filteredData[0].clientDetail.find(client => client.id === parseInt(global.CLIENTID));

      if (clientDetail) {

        const hasTrueManualKyc = clientDetail.clientManualKycLink.some(link => link.isManualKyc);
        if (hasTrueManualKyc) {
          setIsManualKYCAvailable(true);
        }

        if (clientDetail) {

          //kycManual
          if (!clientDetail.isKycManual) {
            setKYCManual('0');
            if (global.USERTYPEID == 1163) {
              setOnlyView(true);
              fieldsDisable();
            }
          } else {
            setKYCManual('1');
          }

          //manualKycStatus
          if (clientDetail.clientManualKycLink.length > 0) {
            if (clientDetail.clientManualKycLink[0].manualKycStatus) {
              fieldsDisable();
              setOnlyView(true);
            }

            if (clientDetail.clientManualKycLink[0].clientManualAddresses) {
              if (clientDetail.clientManualKycLink[0].clientManualAddresses.length > 0) {

                if (isNew != 'new') {
                  const filteredAddress = clientDetail.clientManualKycLink[0].clientManualAddresses.filter(item => item.addressType == isNew.addressType)

                  if (filteredAddress.length > 0) {
                    setActionTypeLabel(filteredAddress[0].addressChangeType)
                    setAddressDmsID(filteredAddress[0].addrDmsId)
                  } else {
                    setActionTypeLabel('PRCD');
                  }
                }

              } else {
                getActionType(clientDetail);
              }
            } else {
              getActionType(clientDetail);
            }

          }

        }

        const addressDetails = clientDetail.clientAddress;
        if (addressDetails) {
          addressDetails.forEach(item => {
            if (item.addressType == 'P') {
              setPermAddressAvailable(true)
            }
            availAddresssType.push(item.addressType)
          });
        }
        // Log or use the addressDetails as needed
        if (global.DEBUG_MODE) console.log("Address Details:", addressDetails);
      } else {
        if (global.DEBUG_MODE) console.log("Client ID not found in clientDetail array.");
      }
    } else {
      if (global.DEBUG_MODE) console.log("Loan application number not found.");
    }


    const filterAddressTypeData = userCodeDetail.filter((data) => data.masterId === 'PRF_SHORT_ADDRESS_TYPE');
    if (isNew === 'new') {
      const uniqueFilterAddressTypeData = filterAddressTypeData.filter(data => !availAddresssType.includes(data.subCodeId));
      setaddressTypeData(uniqueFilterAddressTypeData)
    } else {
      setaddressTypeData(filterAddressTypeData)
    }

    const filterActionTypeData = userCodeDetail.filter((data) => data.masterId === 'ACTION_TYPE');
    setActionTypeData(filterActionTypeData);

  }

  const getActionType = (clientDetail) => {

    if (clientDetail.clientManualKycLink.length > 0) {
      if (clientDetail.lmsClientId) {
        if (clientDetail.clientManualKycLink[0].kycSource == 'EVRF' || clientDetail.clientManualKycLink[0].kycSource == 'LMS') {
          setActionTypeVisible(true);
          setActionTypeMan(true);
          setActionTypeLabel('PRCD');
          fieldsDisable();
        } else if (clientDetail.clientManualKycLink[0].kycSource == 'MNL') {
          setActionTypeVisible(false);
          setActionTypeMan(false);
        }
      } else {
        if (clientDetail.clientManualKycLink[0].kycSource == 'EVRF') {
          setActionTypeVisible(true);
          setActionTypeMan(true);
          setActionTypeLabel('PRCD');
          fieldsDisable();
        } else {
          setActionTypeVisible(false);
          setActionTypeMan(false);
        }
      }
    }

  }

  const makeSystemMandatoryFields = () => {

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_addr_address_type' && data.pageId === pageId).map((value, index) => {

      if (value.isMandatory) {
        setAddressTypeMan(true);
      }
      if (value.isHide) {
        setAddressTypeVisible(false);
      }
      if (value.isDisable) {
        setAddressTypeDisable(true);
      }
      if (value.isCaptionChange) {
        setAddressTypeCaption(value.fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_addr_address_line_1' && data.pageId === pageId).map((value, index) => {

      if (value.isMandatory) {
        setAddressLine1Man(true);
      }
      if (value.isHide) {
        setAddressLine1Visible(false);
      }
      if (value.isDisable) {
        setAddressLine1Disable(true);
      }
      if (value.isCaptionChange) {
        setAddressLine1Caption(value.fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_addr_address_line_2' && data.pageId === pageId).map((value, index) => {

      if (value.isMandatory) {
        setAddressLine2Man(true);
      }
      if (value.isHide) {
        setAddressLine2Visible(false);
      }
      if (value.isDisable) {
        setAddressLine2Disable(true);
      }
      if (value.isCaptionChange) {
        setAddressLine2Caption(value.fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_addr_landmark' && data.pageId === pageId).map((value, index) => {

      if (value.isMandatory) {
        setLandmarkMan(true);
      }
      if (value.isHide) {
        setLandmarkVisible(false);
      }
      if (value.isDisable) {
        setLandmarkDisable(true);
      }
      if (value.isCaptionChange) {
        setLandmarkCaption(value.fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_addr_pincode' && data.pageId === pageId).map((value, index) => {

      if (value.isMandatory) {
        setPincodeMan(true);
      }
      if (value.isHide) {
        setPincodeVisible(false);
      }
      if (value.isDisable) {
        setPincodeDisable(true);
      }
      if (value.isCaptionChange) {
        setPincodeCaption(value.fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_addr_city/village' && data.pageId === pageId).map((value, index) => {

      if (value.isMandatory) {
        setCityMan(true);
      }
      if (value.isHide) {
        setCityVisible(false);
      }
      if (value.isDisable) {
        setCityDisable(true);
      }
      if (value.isCaptionChange) {
        setCityCaption(value.fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_addr_disrtict' && data.pageId === pageId).map((value, index) => {

      if (value.isMandatory) {
        setDistrictMan(true);
      }
      if (value.isHide) {
        setDistrictVisible(false);
      }
      if (value.isDisable) {
        setDistrictDisable(true);
      }
      if (value.isCaptionChange) {
        setDistrictCaption(value.fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_addr_state' && data.pageId === pageId).map((value, index) => {

      if (value.isMandatory) {
        setStateMan(true)
      }
      if (value.isHide) {
        setStateVisible(false)
      }
      if (value.isDisable) {
        setStateDisable(true)
      }
      if (value.isCaptionChange) {
        setStateCaption(value.fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_addr_country' && data.pageId === pageId).map((value, index) => {

      if (value.isMandatory) {
        setCountryMan(true)
      }
      if (value.isHide) {
        setCountryVisible(false)
      }
      if (value.isDisable) {
        setCountryDisable(true)
      }
      if (value.isCaptionChange) {
        setCountryCaption(value.fieldCaptionChange)
      }
    });


    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_addr_geo-classification' && data.pageId === pageId).map((value, index) => {

      if (value.isMandatory) {
        setGeoClassificationMan(true)
      }
      if (value.isHide) {
        setGeoClassificationVisible(false)
      }
      if (value.isDisable) {
        setGeoClassificationDisable(true)
      }
      if (value.isCaptionChange) {
        setGeoClassificationCaption(value.fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_addr_years at residence' && data.pageId === pageId).map((value, index) => {

      if (value.isMandatory) {
        setYearsAtResidenceMan(true)
      }
      if (value.isHide) {
        setYearsAtResidenceVisible(false)
      }
      if (value.isDisable) {
        setYearsAtResidenceDisable(true)
      }
      if (value.isCaptionChange) {
        setYearsAtResidenceCaption(value.fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_addr_years in current city/town' && data.pageId === pageId).map((value, index) => {

      if (value.isMandatory) {
        setYearsAtCityMan(true)
      }
      if (value.isHide) {
        setYearsAtCityVisible(false)
      }
      if (value.isDisable) {
        setYearsAtCityDisable(true)
      }
      if (value.isCaptionChange) {
        setYearsAtCityCaption(value.fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_addr_address ownership type' && data.pageId === pageId).map((value, index) => {

      if (value.isMandatory) {
        setAddressOwnerTypeMan(true)
      }
      if (value.isHide) {
        setAddressOwnerTypeVisible(false)
      }
      if (value.isDisable) {
        setAddressOwnerTypeDisable(true)
      }
      if (value.isCaptionChange) {
        setAddressOwnerTypeCaption(value.fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_addr_owner_details' && data.pageId === pageId).map((value, index) => {

      if (value.isMandatory) {
        setOwnerDetailsMan(true)
      }
      if (value.isHide) {
        setOwnerDetailsVisible(false)
      }
      if (value.isDisable) {
        setOwnerDetailsDisable(true)
      }
      if (value.isCaptionChange) {
        setOwnerDetailsCaption(value.fieldCaptionChange)
      }
    });

    // systemMandatoryField.filter((data) => data.fieldUiid === 'et_addr_owner name' && data.pageId === pageId).map((value, index) => {

    //   if (value.isMandatory) {
    //     setOwnerNameMan(true)
    //   }
    //   if (value.isHide) {
    //     setOwnerNameVisible(false)
    //   }
    //   if (value.isDisable) {
    //     setOwnerNameDisable(true)
    //   }
    //   if (value.isCaptionChange) {
    //     setOwnerNameCaption(value.fieldCaptionChange)
    //   }
    // });


  }

  const validateData = () => {
    var flag = false;
    var i = 1;
    var errorMessage = '';

    if (actionTypeMan && actionTypeVisible) {
      if (actionTypeLabel.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + actionTypeCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (addressTypeMan && addressTypeVisible) {
      if (addressTypeLabel.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + addressTypeCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (addressLine1Man && addressLine1Visible) {
      if (addressLine1 == null || addressLine1 == undefined || addressLine1.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + addressLine1Caption + '\n';
        i++;
        flag = true;
      }
    }

    if (addressLine2Man && addressLine2Visible) {
      if (addressLine2 == null || addressLine2 == undefined || addressLine2.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + addressLine2Caption + '\n';
        i++;
        flag = true;
      }
    }

    if (landmarkMan && landmarkVisible) {
      if (landmark !== undefined && landmark !== null) {
        if (landmark.length <= 0) {
          errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + landmarkCaption + '\n';
          i++;
          flag = true;
        }
      } else {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + landmarkCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (pincodeMan && pincodeVisible) {
      if (pincode == null || pincode == undefined || pincode.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + pincodeCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (pincode) {
      if (pincode.length > 0) {
        if (pincode.length < 6) {
          errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + "Valid " + pincodeCaption + '\n';
          i++;
          flag = true;
        }
      }
    }

    if (cityMan && cityVisible) {
      if (city == null || city == undefined || city.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + cityCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (districtMan && districtVisible) {
      if (district == null || district == undefined || district.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + districtCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (stateMan && stateVisible) {
      if (state == null || state == undefined || state.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + stateCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (countryMan && countryVisible) {
      if (country == null || country == undefined || country.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + countryCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (geoClassificationMan && geoClassificationVisible) {
      if (geoClassificationLabel == null || geoClassificationLabel == undefined || geoClassificationLabel.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + geoClassificationCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (yearsAtResidenceMan && yearsAtResidenceVisible) {
      if (yearsAtResidence == null || yearsAtResidence == undefined || yearsAtResidence.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + yearsAtResidenceCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (yearsAtCityMan && yearsAtCityVisible) {
      if (yearsAtCity == null || yearsAtCity == undefined || yearsAtCity.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + yearsAtCityCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (addressOwnerTypeMan && addressOwnerTypeVisible) {
      if (addressOwnerTypeLabel == null || addressOwnerTypeLabel == undefined || addressOwnerTypeLabel.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + addressOwnerTypeCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (ownerDetailsMan && ownerDetailsVisible) {
      if (ownerDetailsLabel == null || ownerDetailsLabel == undefined || ownerDetailsLabel.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + ownerDetailsCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (ownerNameMan && ownerNameVisible) {
      if (ownerName == null || ownerName == undefined || ownerName.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + ownerNameCaption + '\n';
        i++;
        flag = true;
      }
    }


    setErrMsg(errorMessage);
    return flag;
  };

  const addressSubmit = () => {

    // if (global.USERTYPEID == 1163) {
    //   if (!(kycManual == '1')) {
    //     props.navigation.replace('AddressMainList')
    //     return;
    //   }
    // }
    if (onlyView) {
      props.navigation.replace('AddressMainList')
      return;
    }

    if (addressID.length <= 0) {
      postAddressData();
    } else {
      updateAddressData();
    }
  }

  const postAddressData = () => {
    if (validateData()) {
      showBottomSheet();
      //alert(errMsg)
    } else {
      // alert(addressTypeLabel+" "+addressLine1+" "+addressLine2+" "+landmark+" "+pincode+" "+city+" "+
      // district+" "+state+" "+country+" "+geoClassificationLabel+" "+yearsAtResidence+" "+yearsAtCity+" "+
      // addressOwnerTypeLabel+" "+ownerDetailsLabel+" "+ownerName)
      const appDetails = [{
        "isActive": true,
        "createdBy": global.USERID,
        "createdDate": new Date(),
        "modifiedBy": global.USERID,
        "modifiedDate": new Date(),
        "supervisedBy": global.USERID,
        "addressType": addressTypeLabel,
        "addressLine1": addressLine1,
        "addressLine2": addressLine2,
        "landmark": landmark,
        "pincode": pincode,
        "city": city,
        "district": district,
        "state": state,
        "country": country,
        "mobileOrLandLineNumber": "",
        "emailId": "",
        "addressOwnership": addressOwnerTypeLabel,
        "ownerDetails": ownerDetailsLabel,
        "ownerName": ownerName,
        "geoClassification": geoClassificationLabel,
        "yearsAtResidence": parseInt(yearsAtResidence),
        "yearsInCurrentCityOrTown": parseInt(yearsAtCity),
        "supervisedDate": new Date()
      }]
      const baseURL = global.PORT1;
      setLoading(true);
      apiInstance(baseURL)
        .post(`api/v2/profile-short/address-details/${global.CLIENTID}`, appDetails)
        .then(async response => {
          // Handle the response data
          if (global.DEBUG_MODE) console.log('PostAddressResponse::' + JSON.stringify(response.data),);

          setLoading(false);
          if (response.status == 200) {
            props.updateNestedClientDetails(global.LOANAPPLICATIONID, global.CLIENTID, 'clientDetail', 'clientAddress', response.data[0])
            if (actionTypeVisible) {
              updateManualKYCDetails();
            } else {
              navigateToAddress();
            }

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
          if (global.DEBUG_MODE) console.log('PostAddressError' + JSON.stringify(error.response));
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

  const updateAddressData = () => {
    if (validateData()) {
      showBottomSheet();
      //alert(errMsg)
    } else {
      // alert(addressTypeLabel+" "+addressLine1+" "+addressLine2+" "+landmark+" "+pincode+" "+city+" "+
      // district+" "+state+" "+country+" "+geoClassificationLabel+" "+yearsAtResidence+" "+yearsAtCity+" "+
      // addressOwnerTypeLabel+" "+ownerDetailsLabel+" "+ownerName)
      const appDetails = {
        "isActive": true,
        "createdBy": global.USERID,
        "createdDate": new Date(),
        "modifiedBy": global.USERID,
        "modifiedDate": new Date(),
        "supervisedBy": global.USERID,
        "addressType": addressTypeLabel,
        "addressLine1": addressLine1,
        "addressLine2": addressLine2,
        "landmark": landmark,
        "pincode": pincode,
        "city": city,
        "district": district,
        "state": state,
        "country": country,
        "mobileOrLandLineNumber": "",
        "emailId": "",
        "addressOwnership": addressOwnerTypeLabel,
        "ownerDetails": ownerDetailsLabel,
        "ownerName": ownerName,
        "geoClassification": geoClassificationLabel,
        "yearsAtResidence": parseInt(yearsAtResidence),
        "yearsInCurrentCityOrTown": parseInt(yearsAtCity),
        "supervisedDate": new Date()
      }
      const baseURL = global.PORT1;
      setLoading(true);
      apiInstance(baseURL)
        .put(`api/v2/profile-short/address-details/${addressID}`, appDetails)
        .then(async response => {
          // Handle the response data
          if (global.DEBUG_MODE) console.log('UpdateAddressResponse::' + JSON.stringify(response.data));
          setLoading(false);
          if (response.status == 200) {
            props.updateNestedClientDetails(global.LOANAPPLICATIONID, global.CLIENTID, 'clientDetail', 'clientAddress', response.data)
            if (actionTypeVisible) {
              updateManualKYCDetails();
            } else {
              navigateToAddress();
            }
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
          if (global.DEBUG_MODE) console.log('UpdateAddressError' + JSON.stringify(error.response));
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

  const navigateToAddress = () => {
    props.navigation.replace('AddressMainList');
  }


  const getPinCode = (pincode) => {

    const baseURL = global.PORT4;
    setLoading(true);
    apiInstance(baseURL)
      .get(`api/v1/pincode/new/${pincode}`)
      .then(async response => {
        // Handle the response data
        if (global.DEBUG_MODE) console.log('PincodeApiResponse::' + JSON.stringify(response.data),);

        setLoading(false);
        if (response.status == 200) {
          setPincodeResponse(response.data);
          setDistrict(response.data.city.name);
          setState(response.data.city.state.name);
          setCountry(response.data.city.state.country.name);
          setDistrictDisable(true)
          setStateDisable(true);
          setCountryDisable(true);
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
        if (global.DEBUG_MODE) console.log('PincodeApiError' + JSON.stringify(error.response));
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

  const handlePickerClick = (componentName, label, index) => {

    if (componentName === 'AddressTypePicker') {
      setAddressTypeLabel(label);
      setAddressTypeIndex(index);
      if (label == 'C') {
        if (permAddressAvailable) {
          setsameAsPermVisible(true);
        }
        setGeoClassificationVisible(true);
        setYearsAtResidenceVisible(true);
        setYearsAtCityVisible(true);
        makeSystemMandatoryFields();
      } else if (label == 'P') {
        setGeoClassificationVisible(false);
        setGeoClassificationLabel('');
        setsameAsPermVisible(false);
        setGeoClassificationMan(false);
        setYearsAtResidenceVisible(false);
        setYearsAtResidenceMan(false);
        setYearsAtResidence('');
        setYearsAtCityVisible(false);
        setYearsAtResidenceMan(false);
        setYearsAtCity('')
      }
    } else if (componentName === 'GeoClassificationPicker') {
      setGeoClassificationLabel(label);
      setGeoClassificationIndex(index);
    } else if (componentName === 'AddressOwnershipPicker') {
      setAddressOwnerTypeLabel(label);
      setAddressOwnerTypeIndex(index);
    } else if (componentName === 'ActionTypePicker') {
      setActionTypeLabel(label);
      setActionTypeIndex(index);
      if (label == 'PRCD') {
        fieldsDisable();
      } else if (label == 'HBD') {
        KycHybridFieldsEnable();
      } else {
        KycFieldsEnable();
      }
    } else if (componentName === 'OwnerDetailsPicker') {
      setOwnerDetailsLabel(label);
      setOwnerDetailsIndex(index);
      if (label == 'OD-OTH' || label == 'OD-RLT') {
        setOwnerNameDisable(false);
        setOwnerNameMan(true);
        setOwnerNameVisible(true);
      } else {
        setOwnerNameDisable(true);
        setOwnerNameMan(false);
        setOwnerNameVisible(false);
        setOwnerName('')
      }
    }

  }

  const updateManualKYCDetails = () => {
    setLoading(true)

    const appDetails = {
      "manualKycStatus": "InProgress",
      "clientManualAddresses": [
        {
          "addressChangeType": actionTypeLabel,
          "addressType": addressTypeLabel,
          "addressLine1": addressLine1,
          "addressLine2": addressLine2,
          "landmark": landmark,
          "pincode": pincode,
          "city": city,
          "district": district,
          "state": state,
          "country": country,
          "mobileOrLandLineNumber": "",
          "emailId": "",
          "addressOwnership": addressOwnerTypeLabel,
          "ownerDetails": ownerDetailsLabel,
          "ownerName": ownerName,
          "geoClassification": geoClassificationLabel,
          "yearsAtResidence": parseInt(yearsAtResidence),
          "yearsInCurrentCityOrTown": parseInt(yearsAtCity),
          "isActive": true,
          "addrDmsId": addressDmsID,
        }
      ]
    }


    const baseURL = global.PORT1
    apiInstance(baseURL).put(`/api/v2/profile-short/manualKyc/${global.CLIENTID}`, appDetails)
      .then(async (response) => {
        // Handle the response data
        setLoading(false)
        if (response.status == 200) {
          if (global.DEBUG_MODE) console.log("ManualKYCApiResponse::" + JSON.stringify(response.data));
          props.updateNestedClientDetails(global.LOANAPPLICATIONID, global.CLIENTID, 'clientDetail', 'clientManualKycLink', response.data)
          navigateToAddress();
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

  const handleClick = (componentName, textValue) => {

    if (componentName === 'addressLine1') {
      // if (textValue.length > 0) {
      //   if (Common.isValidText(textValue))
      //     setAddressLine1(textValue)
      // } else {
      setAddressLine1(textValue)
      // }
    } else if (componentName === 'addressLine2') {
      // if (textValue.length > 0) {
      //   if (Common.isValidText(textValue))
      //     setAddressLine2(textValue)
      // } else {
      setAddressLine2(textValue)
      //}
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
      } else {
        setPincodeResponse('');
        setDistrict('');
        setState('');
        setCountry('');
        setDistrictDisable(false)
        setStateDisable(false);
        setCountryDisable(false);
      }
      setPincode(textValue)
    } else if (componentName === 'city') {
      if (textValue.length > 0) {
        if (Common.isValidText(textValue))
          setCity(textValue)
      } else {
        setCity(textValue)
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
    } else if (componentName === 'country') {
      if (textValue.length > 0) {
        if (Common.isValidText(textValue))
          setCountry(textValue)
      } else {
        setCountry(textValue)
      }
    } else if (componentName === 'YearAtResidence') {
      if (textValue.length > 0) {
        setYearsAtResidence(textValue)
      } else {
        setYearsAtResidence(textValue)
      }
    } else if (componentName === 'YearAtCity') {
      if (textValue.length > 0) {
        setYearsAtCity(textValue)
      } else {
        setYearsAtCity(textValue)
      }
    } else if (componentName === 'OwnerName') {
      if (textValue.length > 0) {
        if (Common.isValidText(textValue))
          setOwnerName(textValue)
      } else {
        setOwnerName(textValue)
      }
    } else if (componentName === 'sameAsPerm') {
      setsameAsPerm(textValue)
      if (textValue == true) {
        getPermanentAddressData();
      } else {
        fieldsEnable();
      }
    }

  }

  const handleReference = (componentName) => {

    if (componentName === 'addressLine1') {
      if (addressLine2Visible) {
        addressLine2Ref.current.focus();
      }
    }

  };

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

  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  const previewImage = () => {
    hideImageBottomSheet();

    if (imageUri) {
      if (imageUri.length > 0) {
        props.navigation.navigate('PreviewImage', { imageName: fileName, imageUri: imageUri })
      }
    } else {
      getImage(addressDmsID);
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
        if (global.DEBUG_MODE) console.log('File extension:', fileExtension);
      }

      // const imageName = image.path.split('/').pop();
      setTime(Common.getCurrentDateTime());

      setFileType(image.mime)
      setFileName(imageName)
      setImageUri(image.path)

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

      setFileType(image.mime)
      setFileName(imageName)
      setImageUri(image.path)


      updateImage(image.path, image.mime, imageName)
      //setVisible(false)
      //setDeleteVisible(false)
      props.onChange?.(image);
    })

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

          setAddressDmsID(data.docId)

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
      setAddressDmsID('')

      setDeleteVisible(false);
      hideImageBottomSheet();
    }
  }

  const onGoBack = () => {
    props.navigation.goBack();
  }

  return (
    <SafeAreaView style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>
      <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
      <ErrorModal isVisible={errorModalVisible} onClose={closeErrorModal} textContent={apiError} textClose={language[0][props.language].str_ok} />

      <ErrorMessageModal
        isVisible={bottomErrorSheetVisible}
        hideBottomSheet={hideBottomSheet}
        errMsg={errMsg}
        textError={language[0][props.language].str_error}
        textClose={language[0][props.language].str_ok}
      />
      <View style={{ width: '100%', height: 56, alignItems: 'center', justifyContent: 'center', }}>
        <HeadComp textval={language[0][props.language].str_addaddressbutton} props={props} onGoBack={onGoBack} />
      </View>

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

      <ScrollView style={styles.scrollView}
        contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {loading ? <Loading /> : null}

        {actionTypeVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
          <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
            <TextComp textVal={actionTypeCaption} textStyle={Commonstyles.inputtextStyle} Visible={actionTypeMan} />
          </View>
          <PickerComp textLabel={actionTypeLabel} pickerStyle={Commonstyles.picker} Disable={actionTypeDisable} pickerdata={actionTypeData} componentName='ActionTypePicker' handlePickerClick={handlePickerClick} />
        </View>}

        {addressTypeVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
          <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
            <TextComp textVal={addressTypeCaption} textStyle={Commonstyles.inputtextStyle} Visible={addressTypeMan} />
          </View>
          <PickerComp textLabel={addressTypeLabel} pickerStyle={Commonstyles.picker} Disable={addressTypeDisable} pickerdata={addressTypeData} componentName='AddressTypePicker' handlePickerClick={handlePickerClick} />
        </View>}

        {sameAsPermVisible &&
          <View
            style={{ flexDirection: 'row', alignItems: 'center', marginTop: 19 }}>
            <CheckBoxComp
              textValue={sameAsPerm}
              Disable={sameAsPermDisable}
              ComponentName="sameAsPerm"
              returnKey="next"
              handleClick={handleClick}
              Visible={false}
              textCaption={sameAsPermCaption}
            />
          </View>
        }

        {addressLine1Visible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
            <TextComp textVal={addressLine1Caption} textStyle={Commonstyles.inputtextStyle} Visible={addressLine1Man} />
          </View>
          <TextInputComp textValue={addressLine1} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={addressLine1Disable} ComponentName='addressLine1' reference={addressLine1Ref} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={160} />
        </View>}

        {addressLine2Visible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
            <TextComp textVal={addressLine2Caption} textStyle={Commonstyles.inputtextStyle} Visible={addressLine2Man} />
          </View>
          <TextInputComp textValue={addressLine2} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={addressLine2Disable} ComponentName='addressLine2' reference={addressLine2Ref} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={150} />
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

        {countryVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
            <TextComp textVal={countryCaption} textStyle={Commonstyles.inputtextStyle} Visible={countryMan} />
          </View>
          <TextInputComp textValue={country} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={countryDisable} ComponentName='country' reference={countryRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
        </View>}

        {geoClassificationVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
          <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
            <TextComp textVal={geoClassificationCaption} textStyle={Commonstyles.inputtextStyle} Visible={geoClassificationMan} />
          </View>
          <PickerComp textLabel={geoClassificationLabel} pickerStyle={Commonstyles.picker} Disable={geoClassificationDisable} pickerdata={geoClassificationData} componentName='GeoClassificationPicker' handlePickerClick={handlePickerClick} />
        </View>}

        {yearsAtResidenceVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
            <TextComp textVal={yearsAtResidenceCaption} textStyle={Commonstyles.inputtextStyle} Visible={yearsAtResidenceMan} />
          </View>
          <TextInputComp textValue={yearsAtResidence} textStyle={Commonstyles.textinputtextStyle} type='number-pad' Disable={yearsAtResidenceDisable} ComponentName='YearAtResidence' reference={yearAtResidenceRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={2} />
        </View>}

        {yearsAtCityVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
            <TextComp textVal={yearsAtCityCaption} textStyle={Commonstyles.inputtextStyle} Visible={yearsAtCityMan} />
          </View>
          <TextInputComp textValue={yearsAtCity} textStyle={Commonstyles.textinputtextStyle} type='number-pad' Disable={yearsAtCityDisable} ComponentName='YearAtCity' reference={yearInCurrentCityRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={2} />
        </View>}

        {addressOwnerTypeVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
          <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
            <TextComp textVal={addressOwnerTypeCaption} textStyle={Commonstyles.inputtextStyle} Visible={addressOwnerTypeMan} />
          </View>
          <PickerComp textLabel={addressOwnerTypeLabel} pickerStyle={Commonstyles.picker} Disable={addressOwnerTypeDisable} pickerdata={addressOwnerTypeData} componentName='AddressOwnershipPicker' handlePickerClick={handlePickerClick} />
        </View>}

        {ownerDetailsVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
          <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
            <TextComp textVal={ownerDetailsCaption} textStyle={Commonstyles.inputtextStyle} Visible={ownerDetailsMan} />
          </View>
          <PickerComp textLabel={ownerDetailsLabel} pickerStyle={Commonstyles.picker} Disable={ownerDetailsDisable} pickerdata={ownerDetailsData} componentName='OwnerDetailsPicker' handlePickerClick={handlePickerClick} />
        </View>}

        {ownerNameVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
            <TextComp textVal={ownerNameCaption} textStyle={Commonstyles.inputtextStyle} Visible={ownerNameMan} />
          </View>
          <TextInputComp textValue={ownerName} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={ownerNameDisable} ComponentName='OwnerName' reference={ownerNameRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
        </View>}

        {actionTypeVisible &&
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

              {addressDmsID &&
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


        <ButtonViewComp
          textValue={language[0][props.language].str_next.toUpperCase()}
          textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
          viewStyle={Commonstyles.buttonView}
          innerStyle={Commonstyles.buttonViewInnerStyle}
          handleClick={addressSubmit}
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
    flexGrow: 1
  }, line: {
    backgroundColor: '#dbdbdb', // Change the color as needed
    height: 1,
    width: '90%',
    marginTop: '5%'           // Adjust the height as needed
  },
  picker: {
    height: 50,
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center'
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
};

const mapDispatchToProps = dispatch => ({
  languageAction: item => dispatch(languageAction(item)),
  updateNestedClientDetails: (loanApplicationId, clientId, key, nestedKey, data) => dispatch(updateNestedClientDetails(loanApplicationId, clientId, key, nestedKey, data)),
  updateLoanInitiationDetails: (loanApplicationId, loanData, key, clientId, updatedDetails) => dispatch(updateLoanInitiationDetails(loanApplicationId, loanData, key, clientId, updatedDetails)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetails);
