/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect, useRef} from 'react';
import {Text, View} from 'react-native';
import tbl_SystemMandatoryFields from '../Database/Table/tbl_SystemMandatoryFields';
import Commonstyles from '../Utils/Commonstyles';
import TextComp from './TextComp';
import TextInputComp from './TextInputComp';
import PickerComp from './PickerComp';
import tbl_SystemCodeDetails from '../Database/Table/tbl_SystemCodeDetails';

const SystemMandatoryField = props => {
  const [loading, setLoading] = useState(false);
  const [FieldTypeCaption, setFieldTypeCaption] = useState(''); // Corrected the typo
  const [fieldTypeMan, setFieldTypeMan] = useState(false);
  const [fieldTypeVisible, setFieldTypeVisible] = useState(true);
  const [fieldTypeDisable, setFieldTypeDisable] = useState(false);
  const [fieldTypeData, setFieldTypeData] = useState([]);
  const [DataPicker, setDataPicker] = useState([]);
  const [custCatgLabel, setCustCatgLabel] = useState('');
  const [custCatgIndex, setCustCatgIndex] = useState('');
  const FieldRef = useRef(null);

  useEffect(() => {
    makeSystemMandatoryFields();
    pickerData();
  }, []);

  const pickerData = async () => {
    // console.log(fieldTypeVisible, 'testing');

    tbl_SystemCodeDetails
      .getSystemCodeDetailsBasedOnID('CustomerCategory')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);

          for (var i = 0; i < value.length; i++) {
            if (value[i].IsDefault === '1') {
              setCustCatgLabel(value[i].SubCodeID);
              setCustCatgIndex(i + 1);
            }
          }
          setDataPicker(value);
        }
      });
  };

  const makeSystemMandatoryFields = async () => {
    tbl_SystemMandatoryFields
      .getSystemMandatoryFieldsBasedOnFieldUIID(props.fielduiid)
      .then(value => {
        // console.log(value);
        if (value !== undefined && value.length > 0) {
          // console.log(value[0].IsHide, 'test12322');

          setFieldTypeCaption(value[0].FieldName);
          if (value[0].IsMandatory == '1') {
            setFieldTypeMan(true);
          }
          if (value[0].IsHide == 1) {
            setFieldTypeVisible(false);
          }
          if (value[0].IsDisable == 1) {
            setFieldTypeDisable(true);
          }
          if (value[0].IsCaptionChange == 1) {
            setFieldTypeCaption(value[0].FieldCaptionChange);
          }
          props.updateDataInParent(
            value[0].FieldName,
            '',
            value[0].IsMandatory,
            value[0].IsHide,
            value[0].IsDisable,
          );
        }
      });
  };

  const handleReference = props => {
    if (props.isFocused === 1) {
      FieldRef.current.focus();
    }
  };

  const handlePickerClick = (FieldTypeCaption, label, index) => {
    if (FieldTypeCaption === 'AddressType') {
      setCustCatgLabel(label);
      setCustCatgIndex(index);
    }
  };

  const handleClick = (FieldTypeCaption, textValue) => {
    props.updateDataInParent(FieldTypeCaption, textValue);
  };

  return (
    <View>
      {fieldTypeVisible && (
        <View
          style={{
            marginTop: 19,
            paddingHorizontal: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={{width: '90%', marginTop: 3, paddingHorizontal: 0}}>
            <TextComp
              textVal={FieldTypeCaption}
              textStyle={Commonstyles.inputtextStyle}
              Visible={fieldTypeMan}
            />
            {props.isInput && (
              <TextInputComp
                textValue={props.textvalue}
                textStyle={Commonstyles.textinputtextStyle}
                type={props.type}
                Disable={props.Disable}
                ComponentName={FieldTypeCaption}
                reference={FieldRef}
                returnKey={props.returnKey}
                handleClick={handleClick}
                handleReference={handleReference}
              />
            )}
            {props.isPicker && (
              <PickerComp
                textLabel={FieldTypeCaption}
                pickerStyle={Commonstyles.picker}
                Disable={props.Disable}
                pickerdata={DataPicker}
                componentName={props.componentName}
                handlePickerClick={handlePickerClick}
              />
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default SystemMandatoryField;
