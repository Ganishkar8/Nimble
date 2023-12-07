import { View, Text, ScrollView, SafeAreaView, StyleSheet, BackHandler } from 'react-native';
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
import ButtonViewComp from '../../../Components/ButtonViewComp';
import TextComp from '../../../Components/TextComp';
import PickerComp from '../../../Components/PickerComp';
import TextInputComp from '../../../Components/TextInputComp';
import Common from '../../../Utils/Common';
import tbl_clientaddressinfo from '../../../Database/Table/tbl_clientaddressinfo';
import apiInstancelocal from '../../../Utils/apiInstancelocal';
import ErrorModal from '../../../Components/ErrorModal';
import tbl_client from '../../../Database/Table/tbl_client';
import apiInstance from '../../../Utils/apiInstance';

const AddressDetails = (props, { navigation }) => {
  const [loading, setLoading] = useState(false);
  // const [Data, setNewData] = useState();
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

  const [addressTypeLabel, setAddressTypeLabel] = useState('');
  const [addressTypeIndex, setAddressTypeIndex] = useState('');
  const [addressTypeCaption, setAddressTypeCaption] = useState('ADDRESS TYPE');
  const [addressTypeMan, setAddressTypeMan] = useState(true);
  const [addressTypeVisible, setAddressTypeVisible] = useState(true);
  const [addressTypeDisable, setAddressTypeDisable] = useState(false);
  const [addressTypeData, setaddressTypeData] = useState([]);

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

  const [country, setCountry] = useState('');
  const [countryCaption, setCountryCaption] = useState('COUNTRY');
  const [countryMan, setCountryMan] = useState(true);
  const [countryVisible, setCountryVisible] = useState(true);
  const [countryDisable, setCountryDisable] = useState(false);

  const [geoClassificationLabel, setGeoClassificationLabel] = useState('');
  const [geoClassificationIndex, setGeoClassificationIndex] = useState('');
  const [geoClassificationCaption, setGeoClassificationCaption] = useState('GEO CLASSIFICATION');
  const [geoClassificationMan, setGeoClassificationMan] = useState(true);
  const [geoClassificationVisible, setGeoClassificationVisible] = useState(true);
  const [geoClassificationDisable, setGeoClassificationDisable] = useState(false);
  const [geoClassificationData, setGeoClassificationData] = useState([]);

  const [yearsAtResidence, setYearsAtResidence] = useState('');
  const [yearsAtResidenceCaption, setYearsAtResidenceCaption] = useState('YEARS AT RESIDENCE');
  const [yearsAtResidenceMan, setYearsAtResidenceMan] = useState(true);
  const [yearsAtResidenceVisible, setYearsAtResidenceVisible] = useState(true);
  const [yearsAtResidenceDisable, setYearsAtResidenceDisable] = useState(false);

  const [yearsAtCity, setYearsAtCity] = useState('');
  const [yearsAtCityCaption, setYearsAtCityCaption] = useState('YEARS IN CURRENT CITY/TOWN');
  const [yearsAtCityMan, setYearsAtCityMan] = useState(true);
  const [yearsAtCityVisible, setYearsAtCityVisible] = useState(true);
  const [yearsAtCityDisable, setYearsAtCityDisable] = useState(false);

  const [addressOwnerTypeLabel, setAddressOwnerTypeLabel] = useState('');
  const [addressOwnerTypeIndex, setAddressOwnerTypeIndex] = useState('');
  const [addressOwnerTypeCaption, setAddressOwnerTypeCaption] = useState('ADDRESS OWNERSHIP TYPE');
  const [addressOwnerTypeMan, setAddressOwnerTypeMan] = useState(true);
  const [addressOwnerTypeVisible, setAddressOwnerTypeVisible] = useState(true);
  const [addressOwnerTypeDisable, setAddressOwnerTypeDisable] = useState(false);
  const [addressOwnerTypeData, setAddressOwnerTypeData] = useState([]);

  const [ownerDetailsLabel, setOwnerDetailsLabel] = useState('');
  const [ownerDetailsIndex, setOwnerDetailsIndex] = useState('');
  const [ownerDetailsCaption, setOwnerDetailsCaption] = useState('OWNER DETAILS');
  const [ownerDetailsMan, setOwnerDetailsMan] = useState(true);
  const [ownerDetailsVisible, setOwnerDetailsVisible] = useState(true);
  const [ownerDetailsDisable, setOwnerDetailsDisable] = useState(false);
  const [ownerDetailsData, setOwnerDetailsData] = useState([]);

  const [ownerName, setOwnerName] = useState('');
  const [ownerNameCaption, setOwnerNameCaption] = useState('OWNER NAME');
  const [ownerNameMan, setOwnerNameMan] = useState(true);
  const [ownerNameVisible, setOwnerNameVisible] = useState(true);
  const [ownerNameDisable, setOwnerNameDisable] = useState(false);

  const [systemCodeDetail, setSystemCodeDetail] = useState(props.mobilecodedetail.leadSystemCodeDto);
  const [userCodeDetail, setUserCodeDetail] = useState(props.mobilecodedetail.leadUserCodeDto);
  const [systemMandatoryField, setSystemMandatoryField] = useState(props.mobilecodedetail.leadSystemMandatoryFieldDto);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [apiError, setApiError] = useState('');

  const [addressID, setAddressID] = useState('');
  const [isKYC, setIsKYC] = useState('');


  const [postorput, setPostORPut] = useState('post');
  const [kycManual, setKYCManual] = useState('0');

  const [pincodeResponse, setPincodeResponse] = useState('');

  useEffect(() => {
    props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    getSystemCodeDetail()
    makeSystemMandatoryFields();
    getExistingData();


    return () => {
      props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
      backHandler.remove();
    }
  }, [props.navigation]);

  const handleBackButton = () => {
    onGoBack();
    return true; // Prevent default back button behavior
  };

  const getExistingData = () => {

    tbl_client.getClientBasedOnID(global.LOANAPPLICATIONID, global.CLIENTTYPE).then(value => {
      if (value !== undefined && value.length > 0) {

        setKYCManual(value[0].isKycManual)

        if (global.USERTYPEID == 1163) {
          if (!(value[0].isKycManual == '1')) {
            fieldsDisable();
          }
        }

      }
    })


    if (isNew != 'new') {
      setPostORPut('put')
      getExistingAddressData(isNew.loanApplicationId, isNew.id)
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

  const getExistingAddressData = (loanAppId, id) => {
    tbl_clientaddressinfo.getAllAddressDetailsForLoanIDAndID(loanAppId, id.toString())
      .then(data => {
        if (global.DEBUG_MODE) console.log('Address Detail:', data);
        setAddressID(data[0].id)
        setAddressLine1(data[0].address_line_1)
        setAddressLine2(data[0].address_line_2)
        setLandmark(data[0].landmark)
        setPincode(data[0].pincode)
        setCity(data[0].city)
        setDistrict(data[0].district)
        setState(data[0].state)
        setCountry(data[0].country)
        setYearsAtResidence(data[0].years_at_residence)
        setOwnerName(data[0].owner_name)
        setYearsAtCity(data[0].years_in_current_city_or_town)
        //spinner
        setAddressTypeLabel(data[0].address_type)
        setGeoClassificationLabel(data[0].geo_classification)
        setAddressOwnerTypeLabel(data[0].address_ownership)
        setOwnerDetailsLabel(data[0].owner_details)
        if (data[0].isKyc === "1") {
          disableAadharFields(data)
        }
        setIsKYC(data[0].isKyc);
        setLoading(false)
      })
      .catch(error => {
        if (global.DEBUG_MODE) console.error('Error fetching bank details:', error);
        setLoading(false)
      });
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

    const filterAddressTypeData = userCodeDetail.filter((data) => data.masterId === 'ADDRESS_TYPE');
    setaddressTypeData(filterAddressTypeData)

    const filterOwnershipTypeData = userCodeDetail.filter((data) => data.masterId === 'ADDRESS_OWNERSHIP_TYPE');
    setAddressOwnerTypeData(filterOwnershipTypeData)

    const filterOwnerDetailsData = userCodeDetail.filter((data) => data.masterId === 'OWNER_DETAILS');
    setOwnerDetailsData(filterOwnerDetailsData)

    const filterGeoClassificationData = userCodeDetail.filter((data) => data.masterId === 'GEO_CLASSIFICATION');
    setGeoClassificationData(filterGeoClassificationData)

  }

  const makeSystemMandatoryFields = () => {

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_addresstype' && data.pageId === 1).map((value, index) => {

      if (value.mandatory) {
        setAddressTypeMan(true);
      }
      if (value.hide) {
        setAddressTypeVisible(false);
      }
      if (value.disable) {
        setAddressTypeDisable(true);
      }
      if (value.captionChange) {
        setAddressTypeCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_addressline1' && data.pageId === 1).map((value, index) => {

      if (value.mandatory) {
        setAddressLine1Man(true);
      }
      if (value.hide) {
        setAddressLine1Visible(false);
      }
      if (value.disable) {
        setAddressLine1Disable(true);
      }
      if (value.captionChange) {
        setAddressLine1Caption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_addressline2' && data.pageId === 1).map((value, index) => {

      if (value.mandatory) {
        setAddressLine2Man(true);
      }
      if (value.hide) {
        setAddressLine2Visible(false);
      }
      if (value.disable) {
        setAddressLine2Disable(true);
      }
      if (value.captionChange) {
        setAddressLine2Caption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_landmark' && data.pageId === 1).map((value, index) => {

      if (value.mandatory) {
        setLandmarkMan(true);
      }
      if (value.hide) {
        setLandmarkVisible(false);
      }
      if (value.disable) {
        setLandmarkDisable(true);
      }
      if (value.captionChange) {
        setLandmarkCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_pincode' && data.pageId === 1).map((value, index) => {

      if (value.mandatory) {
        setPincodeMan(true);
      }
      if (value.hide) {
        setPincodeVisible(false);
      }
      if (value.disable) {
        setPincodeDisable(true);
      }
      if (value.captionChange) {
        setPincodeCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_city' && data.pageId === 1).map((value, index) => {

      if (value.mandatory) {
        setCityMan(true);
      }
      if (value.hide) {
        setCityVisible(false);
      }
      if (value.disable) {
        setCityDisable(true);
      }
      if (value.captionChange) {
        setCityCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_district' && data.pageId === 1).map((value, index) => {

      if (value.mandatory) {
        setDistrictMan(true);
      }
      if (value.hide) {
        setDistrictVisible(false);
      }
      if (value.disable) {
        setDistrictDisable(true);
      }
      if (value.captionChange) {
        setDistrictCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_state' && data.pageId === 1).map((value, index) => {

      if (value.mandatory) {
        setStateMan(true)
      }
      if (value.hide) {
        setStateVisible(false)
      }
      if (value.disable) {
        setStateDisable(true)
      }
      if (value.captionChange) {
        setStateCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'et_country' && data.pageId === 1).map((value, index) => {

      if (value.mandatory) {
        setCountryMan(true)
      }
      if (value.hide) {
        setCountryVisible(false)
      }
      if (value.disable) {
        setCountryDisable(true)
      }
      if (value.captionChange) {
        setCountryCaption(value[0].fieldCaptionChange)
      }
    });



  }

  const validateData = () => {
    var flag = false;
    var i = 1;
    var errorMessage = '';

    if (addressTypeMan && addressTypeVisible) {
      if (addressTypeLabel.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + addressTypeCaption + '\n';
        i++;
        flag = true;
      }
    }

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

    if (countryMan && countryVisible) {
      if (country.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + countryCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (geoClassificationMan && geoClassificationVisible) {
      if (geoClassificationLabel.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + geoClassificationCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (yearsAtResidenceMan && yearsAtResidenceVisible) {
      if (yearsAtResidence.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + yearsAtResidenceCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (yearsAtCityMan && yearsAtCityVisible) {
      if (yearsAtCity.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + yearsAtCityCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (addressOwnerTypeMan && addressOwnerTypeVisible) {
      if (addressOwnerTypeLabel.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + addressOwnerTypeCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (ownerDetailsMan && ownerDetailsVisible) {
      if (ownerDetailsLabel.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + ownerDetailsCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (ownerNameMan && ownerNameVisible) {
      if (ownerName.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + ownerNameCaption + '\n';
        i++;
        flag = true;
      }
    }


    setErrMsg(errorMessage);
    return flag;
  };

  const addressSubmit = () => {

    if (global.USERTYPEID == 1163) {
      if (!(kycManual == '1')) {
        props.navigation.replace('AddressMainList')
        return;
      }
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
      const baseURL = '8901';
      setLoading(true);
      apiInstancelocal(baseURL)
        .post(`api/v2/profile-short/address-details/${global.CLIENTID}`, appDetails)
        .then(async response => {
          // Handle the response data
          if (global.DEBUG_MODE) console.log('PostAddressResponse::' + JSON.stringify(response.data),);

          setLoading(false);
          insertData(response.data[0].id)
        })
        .catch(error => {
          // Handle the error
          if (global.DEBUG_MODE) console.log('PostAddressError' + JSON.stringify(error.response));
          setLoading(false);
          if (error.response.data != null) {
            setApiError(error.response.data.message);
            setErrorModalVisible(true)
          }
        });
      //insertData()
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
      const baseURL = '8901';
      setLoading(true);
      apiInstancelocal(baseURL)
        .put(`api/v2/profile-short/address-details/${addressID}`, appDetails)
        .then(async response => {
          // Handle the response data
          if (global.DEBUG_MODE) console.log('UpdateAddressResponse::' + JSON.stringify(response.data),);
          insertData(addressID)
          setLoading(false);
        })
        .catch(error => {
          // Handle the error
          if (global.DEBUG_MODE) console.log('UpdateAddressError' + JSON.stringify(error.response));
          setLoading(false);
          if (error.response.data != null) {
            setApiError(error.response.data.message);
            setErrorModalVisible(true)
          }
        });
      //insertData()
    }
  };


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
        setCountryDisable(true);


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

  const insertData = (id) => {
    tbl_clientaddressinfo.insertClientAddress(
      global.LOANAPPLICATIONID,
      id,
      global.CLIENTID,
      global.CLIENTTYPE,
      addressTypeLabel.trim(),
      addressLine1.trim(),
      addressLine2.trim(),
      landmark.trim(),
      pincode.trim(),
      city.trim(),
      district.trim(),
      state.trim(),
      country.trim(),
      "",
      "",
      addressOwnerTypeLabel.trim(),
      ownerDetailsLabel.trim(),
      ownerName.trim(),
      geoClassificationLabel.trim(),
      yearsAtResidence.trim(),
      yearsAtCity.trim(),
      "true",
      global.USERID,
      new Date(),
      global.USERID,
      new Date(),
      global.USERID,
      new Date(),
      isKYC
    )
      .then(result => {
        if (global.DEBUG_MODE) console.log('Inserted Address detail:', result);
        props.navigation.replace('AddressMainList')
        // tbl_clientaddressinfo.getAllAddressDetailsForLoanID('12345')
        //   .then(data => {
        //     if (global.DEBUG_MODE) console.log('Address Detail:', data);
        //   })
        //   .catch(error => {
        //     if (global.DEBUG_MODE) console.error('Error fetching bank details:', error);
        //   });
      })
      .catch(error => {
        if (global.DEBUG_MODE) console.error('Error Inserting Address detail:', error);
      });
  }

  const handlePickerClick = (componentName, label, index) => {

    if (componentName === 'AddressTypePicker') {
      setAddressTypeLabel(label);
      setAddressTypeIndex(index);
    } else if (componentName === 'GeoClassificationPicker') {
      setGeoClassificationLabel(label);
      setGeoClassificationIndex(index);
    } else if (componentName === 'AddressOwnershipPicker') {
      setAddressOwnerTypeLabel(label);
      setAddressOwnerTypeIndex(index);
    } else if (componentName === 'OwnerDetailsPicker') {
      setOwnerDetailsLabel(label);
      setOwnerDetailsIndex(index);
    }

  }

  const handleClick = (componentName, textValue) => {

    if (componentName === 'addressLine1') {
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
    }

  }

  const handleReference = (componentName) => {

    if (componentName === 'addressLine1') {
      if (addressLine2Visible) {
        addressLine2Ref.current.focus();
      }
    }

  };

  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

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

      <ScrollView style={styles.scrollView}
        contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {loading ? <Loading /> : null}

        {addressTypeVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
          <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
            <TextComp textVal={addressTypeCaption} textStyle={Commonstyles.inputtextStyle} Visible={addressTypeMan} />
          </View>
          <PickerComp textLabel={addressTypeLabel} pickerStyle={Commonstyles.picker} Disable={addressTypeDisable} pickerdata={addressTypeData} componentName='AddressTypePicker' handlePickerClick={handlePickerClick} />
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
  return {
    language: language,
    profiledetail: profileDetails,
    mobilecodedetail: mobileCodeDetails
  }
};

const mapDispatchToProps = dispatch => ({
  languageAction: item => dispatch(languageAction(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetails);
