import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
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
  const [addressOwnerType, setAddressOwnerType] = useState('');
  const [addressOwnerTypeCaption, setAddressOwnerTypeCaption] = useState('ADDRESS OWNERSHIP TYPE');
  const [addressOwnerTypeMan, setAddressOwnerTypeMan] = useState(true);
  const [addressOwnerTypeVisible, setAddressOwnerTypeVisible] = useState(true);
  const [addressOwnerTypeDisable, setAddressOwnerTypeDisable] = useState(false);
  const [addressOwnerTypeData, setAddressOwnerTypeData] = useState([]);

  const [ownerDetailsLabel, setOwnerDetailsLabel] = useState('');
  const [ownerDetailsIndex, setOwnerDetailsIndex] = useState('');
  const [ownerDetails, setOwnerDetails] = useState('');
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

  useEffect(() => {
    props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
    // pickerData();

    return () =>
      props.navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
  }, [navigation]);

  const updateDatainParent = (
    fieldName,
    newValue,
    isMandatory,
    IsHide,
    IsDisable,
    isPicker,
  ) => {
    // Find the index of the object in DataArray with the matching fieldName
    const dataIndex = DataArray.findIndex(item => item.fieldName === fieldName);

    if (dataIndex !== -1) {
      // If the object with the same fieldName exists, get the existing object
      const existingData = DataArray[dataIndex];

      // Create a new object by merging the existingData with the new data
      const newDataObject = {
        fieldName: fieldName,
        fieldValue: newValue,
        isMandatory:
          isMandatory !== undefined ? isMandatory : existingData.isMandatory,
        isDisable: IsDisable !== undefined ? IsDisable : existingData.isDisable,
        IsHide: IsHide !== undefined ? IsHide : existingData.IsHide,
        isPicker: existingData.isPicker || false,
      };

      // Update the object in DataArray with the merged data
      DataArray[dataIndex] = newDataObject;
    } else {
      // If not, add the new object to the array with the provided data
      const newDataObject = {
        fieldName: fieldName,
        fieldValue: newValue,
        isMandatory: isMandatory,
        isDisable: IsDisable,
        IsHide: IsHide,
        isPicker: isPicker || false,
      };

      setNewDataArray(prevDataArray => [...prevDataArray, newDataObject]);
    }

    console.log('DataArray:', DataArray);
  };

  const validateData = () => {
    let flag = false;
    let errMsg = '';

    DataArray.forEach(item => {
      if (
        (item.IsHide === '' || item.IsHide === '0') &&
        item.isMandatory === '1' &&
        (item.fieldValue === '' || item.fieldValue === undefined)
      ) {
        errMsg += `${errorCounter}) Please Select ${item.fieldName}\n`;
        errorCounter++;
        // console.log('errMsg:', errMsg);
      }
    });

    if (errMsg !== '') {
      setErrMsg(errMsg);
      flag = true;
    }

    return flag;
  };

  const addressSubmit = () => {
    if (validateData()) {
      showBottomSheet();
    }
  };

  const handlePickerClick = (componentName, label, index) => {

    if (componentName === 'AddressTypePicker') {
      setAddressTypeLabel(label);
      setAddressTypeIndex(index);
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
      if (textValue.length > 0) {
        if (Common.isValidText(textValue))
          setPincode(textValue)
      } else {
        setPincode(textValue)
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

  return (
    <SafeAreaView style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>
      <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
      <ErrorMessageModal
        isVisible={bottomErrorSheetVisible}
        hideBottomSheet={hideBottomSheet}
        errMsg={errMsg}
        textError={language[0][props.language].str_error}
        textClose={language[0][props.language].str_ok}
      />
      <View style={{ width: '100%', height: 56, alignItems: 'center', justifyContent: 'center', }}>
        <HeadComp textval={language[0][props.language].str_addaddressbutton} />
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
          <TextInputComp textValue={pincode} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={pincodeDisable} ComponentName='pincode' reference={pincodeRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
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
          <TextInputComp textValue={yearsAtResidence} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={yearsAtResidenceDisable} ComponentName='YearAtResidence' reference={yearAtResidenceRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
        </View>}

        {yearsAtCityVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
          <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
            <TextComp textVal={yearsAtCityCaption} textStyle={Commonstyles.inputtextStyle} Visible={yearsAtCityMan} />
          </View>
          <TextInputComp textValue={yearsAtCity} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={yearsAtCityDisable} ComponentName='YearAtCity' reference={yearInCurrentCityRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
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
  return {
    language: language,
  };
};

const mapDispatchToProps = dispatch => ({
  languageAction: item => dispatch(languageAction(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetails);
