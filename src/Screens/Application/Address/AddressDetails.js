/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {View, Text, ScrollView, SafeAreaView, StyleSheet} from 'react-native';
import {React, useState, useRef, useEffect} from 'react';
import MyStatusBar from '../../../Components/ MyStatusBar';
import HeadComp from '../../../Components/HeadComp';
import {connect} from 'react-redux';
import {languageAction} from '../../../Utils/redux/actions/languageAction';
import {language} from '../../../Utils/LanguageString';
import Commonstyles from '../../../Utils/Commonstyles';
import TextComp from '../../../Components/TextComp';
import tbl_SystemMandatoryFields from '../../../Database/Table/tbl_SystemMandatoryFields';
import Colors from '../../../Utils/Colors';
import Loading from '../../../Components/Loading';
import ErrorMessageModal from '../../../Components/ErrorMessageModal';
import ProgressComp from '../../../Components/ProgressComp';
import PickerComp from '../../../Components/PickerComp';
import SystemMandatoryField from '../../../Components/SystemMandatoryField';
import ButtonViewComp from '../../../Components/ButtonViewComp';

const AddressDetails = (props, {navigation}) => {
  const [loading, setLoading] = useState(false);
  const [Data, setNewData] = useState();
  const [DataArray, setNewDataArray] = useState([]);
  // [{},{},{},{},{},{},{},{},{},]
  // {
  //   FieldUiD:'',
  //   Fieldvalue: '',
  //   isMandatory: '',
  //   isHide:'',
  //   isDisable:'',
  //   FieldCaption: '',
  // },
  // Addressline2: {
  //   isMandatory: '',
  //   length: '',
  //   isFocused: false,
  // },
  // Addressline2: {
  //   isMandatory: '',
  //   length: '',
  //   isFocused: false,
  // },

  const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
  const showBottomSheet = () => setBottomErrorSheetVisible(true);
  const hideBottomSheet = () => setBottomErrorSheetVisible(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    props.navigation
      .getParent()
      ?.setOptions({tabBarStyle: {display: 'none'}, tabBarVisible: false});
    // pickerData();

    return () =>
      props.navigation
        .getParent()
        ?.setOptions({tabBarStyle: undefined, tabBarVisible: undefined});
  }, [navigation]);

  // const updateDatainParent = (fieldName, newValue) => {
  //   setNewData(prevData => ({
  //     ...prevData,
  //     [fieldName]: newValue,
  //   }));

  //   console.log(JSON.stringify(Data));

  //   // const isFocusedValue = DataError.Addressline1.isFocused;
  //   // console.log(isFocusedValue);
  // };

  const updateDatainParent = (
    fieldName,
    newValue,
    isMandatory,
    IsHide,
    IsDisable,
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
      };

      setNewDataArray(prevDataArray => [...prevDataArray, newDataObject]);
    }

    console.log('DataArray:', DataArray);
  };

  const addressSubmit = () => {};

  return (
    <SafeAreaView
      style={[styles.parentView, {backgroundColor: Colors.lightwhite}]}>
      <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {loading ? <Loading /> : null}
        <View
          style={{
            width: '100%',
            height: 56,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <HeadComp
            textval={language[0][props.language].str_addaddressbutton}
            props={props}
          />
        </View>
        <SystemMandatoryField
          fielduiid="sp_addresstype"
          textvalue="First tes"
          type="email-address"
          // Disable={false}
          isPicker={1}
          updateDataInParent={updateDatainParent}
        />
        <SystemMandatoryField
          fielduiid="et_addressline1"
          type="email-address"
          textvalue="First tes"
          // Disable={false}
          isInput={1}
          updateDataInParent={updateDatainParent}
          // updateDataErrorinParent={updateDataErrorinParent}
        />
        <SystemMandatoryField
          fielduiid="et_addressline2"
          textvalue="First tes"
          // textvalue="Address line 2"
          type="email-address"
          // Disable={false}
          isInput={1}
          updateDataInParent={updateDatainParent}
        />
        <SystemMandatoryField
          fielduiid="et_landmark"
          // textvalue="craftsilicon"
          type="email-address"
          // Disable={false}
          isInput={1}
          updateDataInParent={updateDatainParent}
        />
        <SystemMandatoryField
          fielduiid="et_pincode"
          // textvalue="craftsilicon "
          type="email-address"
          // Disable={false}
          updateDataInParent={updateDatainParent}
          isInput={1}
        />
        <SystemMandatoryField
          fielduiid="et_cityvillage"
          // textvalue="craftsilicon "
          type="email-address"
          // Disable={false}
          isInput={1}
          updateDataInParent={updateDatainParent}
        />
        <SystemMandatoryField
          fielduiid="et_district"
          // textvalue="craftsilicon "
          type="email-address"
          // Disable={false}
          isInput={1}
          updateDataInParent={updateDatainParent}
        />
        <SystemMandatoryField
          fielduiid="et_state"
          // textvalue="craftsilicon "
          type="email-address"
          Disable={false}
          isInput={1}
          componentName={'state'}
          updateDataInParent={updateDatainParent}
        />
        <SystemMandatoryField
          fielduiid="et_country"
          // textvalue="craftsilicon "
          type="email-address"
          // Disable={false}
          isInput={1}
          updateDataInParent={updateDatainParent}
        />

        <ButtonViewComp
          textValue={language[0][props.language].str_next.toUpperCase()}
          textStyle={{color: Colors.white, fontSize: 13, fontWeight: 500}}
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

const mapStateToProps = state => {
  const {language} = state.languageReducer;
  return {
    language: language,
  };
};

const mapDispatchToProps = dispatch => ({
  languageAction: item => dispatch(languageAction(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddressDetails);
