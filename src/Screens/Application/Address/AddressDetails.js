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

const AddressDetails = (props, { navigation }) => {
  const [loading, setLoading] = useState(false);
  // const [Data, setNewData] = useState();
  const [DataArray, setNewDataArray] = useState([]);
  const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
  const showBottomSheet = () => setBottomErrorSheetVisible(true);
  const hideBottomSheet = () => setBottomErrorSheetVisible(false);

  const [errMsg, setErrMsg] = useState('');
  let errorCounter = 1;

  useEffect(() => {
    props.navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
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

  return (
    <SafeAreaView style={Commonstyles.parentView}>
      <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

      <ScrollView
        style={Commonstyles.scrollView}
        contentContainerStyle={Commonstyles.contentContainer}
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

        <ErrorMessageModal
          isVisible={bottomErrorSheetVisible}
          hideBottomSheet={hideBottomSheet}
          errMsg={errMsg}
          textError={language[0][props.language].str_error}
          textClose={language[0][props.language].str_ok}
        />

        <SystemMandatoryField
          fielduiid="sp_addresstype"
          // textvalue=""
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
        <SystemMandatoryField
          fielduiid="sp_geoclassification"
          // textvalue="craftsilicon "
          type="email-address"
          // Disable={false}
          isPicker={1}
          updateDataInParent={updateDatainParent}
        />
        <SystemMandatoryField
          fielduiid="et_yearsatresidence"
          // textvalue="craftsilicon "
          type="email-address"
          // Disable={false}
          isInput={1}
          updateDataInParent={updateDatainParent}
        />

        <SystemMandatoryField
          fielduiid="et_yearsincurrentcitytown"
          // textvalue="craftsilicon "
          type="email-address"
          // Disable={false}
          isInput={1}
          updateDataInParent={updateDatainParent}
        />

        <SystemMandatoryField
          fielduiid="sp_addressownershiptype"
          // textvalue="craftsilicon "
          type="email-address"
          // Disable={false}
          isPicker={1}
          updateDataInParent={updateDatainParent}
        />

        <SystemMandatoryField
          fielduiid="sp_ownerdetails"
          // textvalue="craftsilicon "
          type="email-address"
          // Disable={false}
          isPicker={1}
          updateDataInParent={updateDatainParent}
        />

        <SystemMandatoryField
          fielduiid="et_ownername"
          // textvalue="craftsilicon "
          type="email-address"
          // Disable={false}
          isInput={1}
          updateDataInParent={updateDatainParent}
        />

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
