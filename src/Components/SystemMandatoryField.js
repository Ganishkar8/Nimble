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
  const [pickerDatalabel, setpickerDatalabel] = useState('');
  const [pickerDataIndex, setpickerDataIndex] = useState('');
  // const [pickerSubCodeID, setpickerSubCodeID] = useState('');
  const FieldRef = useRef(null);

  const isPicker = props.isPicker || false;
  const moduleID = props.moduleID || 7711;

  useEffect(() => {
    makeSystemMandatoryFields();
    pickerData();
  }, []);

  const pickerData = async () => {
    if (isPicker) {
      tbl_SystemCodeDetails
        .getSystemCodeDetailsBasedOnID('ADDRESSTYPE')
        .then(value => {
          console.log('Value', value, FieldTypeCaption);

          if (value !== undefined && value.length > 0) {
            for (var i = 0; i < value.length; i++) {
              if (value[i].IsDefault === '1') {
                setpickerDatalabel(value[i].SubCodeID);
                setpickerDataIndex(i + 1);
              }
            }
            setDataPicker(value);
          }
        });
    }
  };

  const makeSystemMandatoryFields = async () => {
    tbl_SystemMandatoryFields
      .getSystemMandatoryFieldsBasedOnFieldUIIDModuleID(
        props.fielduiid,
        moduleID,
      )
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
            isPicker,
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
    setpickerDatalabel(label);
    setpickerDataIndex(index);
    props.updateDataInParent(FieldTypeCaption, label);
    console.log('label', label);
    console.log('index', index);
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
                textLabel={pickerDatalabel}
                pickerStyle={Commonstyles.picker}
                Disable={props.Disable}
                pickerdata={DataPicker}
                componentName={FieldTypeCaption}
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
