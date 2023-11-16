import { View, ScrollView, SafeAreaView, Text } from 'react-native';
import { React, useState } from 'react';
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
import { validateData } from '../../../Components/helpers/validateData';
import ProgressComp from '../../../Components/ProgressComp';
import ChildHeadComp from '../../../Components/ChildHeadComp';
import commonstyles from '../../../Utils/Commonstyles';

const BankDetails = (props, { navigation }) => {
  const [loading, setLoading] = useState(false);
  const [DataArray, setNewDataArray] = useState([]);
  const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
  const showBottomSheet = () => setBottomErrorSheetVisible(true);
  const hideBottomSheet = () => setBottomErrorSheetVisible(false);
  const [errMsg, setErrMsg] = useState('');

  const updateDataInParent = (
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

  const validateDataWrapper = () => {
    // eslint-disable-next-line no-shadow
    const { flag, errMsg } = validateData(DataArray);
    setErrMsg(errMsg);
    return flag;
  };

  const demographicAddressSubmit = () => {
    if (validateDataWrapper()) {
      showBottomSheet();
    }
  };

  const renderMandatoryFields = () => {
    const fieldUIIDs = [
      { fielduiid: 'sp_accounttype', isPicker: true },
      { fielduiid: 'et_accountholdernameasbank', isInput: true },
      { fielduiid: 'et_ifsccode', isInput: true },
      { fielduiid: 'et_bankname', isInput: true },
      { fielduiid: 'st_branchname', isInput: true },
      { fielduiid: 'et_accountnumber', isInput: true },
    ];

    return fieldUIIDs.map(({ fielduiid, isPicker, isInput }) => (
      <SystemMandatoryField
        key={fielduiid}
        fielduiid={fielduiid}
        type="email-address"
        moduleID={'7712'}
        isInput={isInput || false} // Default to 0 if not provided
        isPicker={isPicker || false} // Default to 0 if not provided
        updateDataInParent={updateDataInParent}
      />
    ));
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
            textval={language[0][props.language].str_loanDemographics}
            props={props}
          />
        </View>

        <View>
          <ChildHeadComp textval={language[0][props.language].str_Guarantor} />
        </View>

        <View
          style={{ width: '90%', flexDirection: 'row', alignItems: 'center', marginTop: 15 }}>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 14,
              fontWeight: 500,
              color: Colors.mediumgrey,
            }}>
            {language[0][props.language].str_bankDetailsOptional}
          </Text>
        </View>

        <ProgressComp progressvalue={1} textvalue="6 of 6" />

        <ErrorMessageModal
          isVisible={bottomErrorSheetVisible}
          hideBottomSheet={hideBottomSheet}
          errMsg={errMsg}
          textError={language[0][props.language].str_error}
          textClose={language[0][props.language].str_ok}
        />

        {renderMandatoryFields()}

        <ButtonViewComp
          textValue={language[0][props.language].str_next.toUpperCase()}
          textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
          viewStyle={Commonstyles.buttonView}
          innerStyle={Commonstyles.buttonViewInnerStyle}
          handleClick={demographicAddressSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  // eslint-disable-next-line no-shadow
  const { language } = state.languageReducer;
  return {
    language: language,
  };
};

const mapDispatchToProps = dispatch => ({
  languageAction: item => dispatch(languageAction(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BankDetails);
