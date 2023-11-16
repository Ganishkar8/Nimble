import React, { useState, useRef, useEffect, userId } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Text,
  TextInput,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import apiInstance from '../../../Utils/apiInstance';
import apiInstancelocal from '../../../Utils/apiInstancelocal';
import Colors from '../../../Utils/Colors';
import MyStatusBar from '../../../Components/MyStatusBar';
import Loading from '../../../Components/Loading';
import TextComp from '../../../Components/TextComp';
import { connect } from 'react-redux';
import { languageAction } from '../../../Utils/redux/actions/languageAction';
import { language } from '../../../Utils/LanguageString';
import Commonstyles from '../../../Utils/Commonstyles';
import HeadComp from '../../../Components/HeadComp';
import ProgressComp from '../../../Components/ProgressComp';
import tbl_SystemMandatoryFields from '../../../Database/Table/tbl_SystemMandatoryFields';
import Modal from 'react-native-modal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Common from '../../../Utils/Common';
import tbl_SystemCodeDetails from '../../../Database/Table/tbl_SystemCodeDetails';
import TextInputComp from '../../../Components/TextInputComp';
import PickerComp from '../../../Components/PickerComp';
import ButtonViewComp from '../../../Components/ButtonViewComp';
import ErrorMessageModal from '../../../Components/ErrorMessageModal';
import ChildHeadComp from '../../../Components/ChildHeadComp';
import CheckBoxComp from '../../../Components/CheckBoxComp';
import { RadioButton } from 'react-native-paper';

const LoanDemographicsGSTDetails = (props, { navigation }) => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
  const showBottomSheet = () => setBottomErrorSheetVisible(true);
  const hideBottomSheet = () => setBottomErrorSheetVisible(false);

  const [text, setText] = useState('');
  const [textInputValue, setTextInputValue] = useState('');
  const [isSelected, setisSelected] = useState(false);
  const [value, setvalue] = useState(1);
  const [data, setdata] = useState([{ id: 0, isSelect: false, tname: '' }]);

  const [selectedValue, setSelectedValue] = useState(false);
  const [selectedValue1, setSelectedValue1] = useState(false);
  const [AvailableCaption, setAvailableCaption] = useState('Available');
  const [NotAvailableCaption, setNotAvailableCaption] =
    useState('Not Available');

  useEffect(() => {
    props.navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
    makeSystemMandatoryFields();
    pickerData();

    return () =>
      props.navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
  }, [navigation]);

  const updateDataInArray = (idToUpdate, updatedProperties) => {
    const updatedData = [...data];

    const dataIndex = updatedData.findIndex(item => item.id === idToUpdate);

    if (dataIndex !== -1) {
      updatedData[dataIndex] = {
        ...updatedData[dataIndex],
        ...updatedProperties,
      };
      setdata(updatedData);
    }
    console.log('data:', updatedData);
  };

  const pickerData = async () => { };

  const makeSystemMandatoryFields = () => { };

  const updateBasicDetails = () => {
    if (validate()) {
      showBottomSheet();
    } else {
      const appDetails = {
        createdBy: global.USERID,
        createdOn: '',
        isActive: true,
        branchId: 1180,
        leadCreationBasicDetails: {
          createdBy: global.USERID,
          createdOn: '',
          customerCategoryId: 5,
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          mobileNumber: 7647865789,
        },
        leadCreationBusinessDetails: {},
        leadCreationLoanDetails: {},
        leadCreationDms: {},
      };
      const baseURL = '8901';
      setLoading(true);
      apiInstancelocal(baseURL)
        .post('/api/v1/lead-creation-initiation', appDetails)
        .then(async response => {
          // Handle the response data
          console.log(
            'LeadCreationBasicApiResponse::' + JSON.stringify(response.data),
          );
          global.leadID = response.data.id;
          setLoading(false);
          props.navigation.navigate('LeadCreationBusiness');
        })
        .catch(error => {
          // Handle the error
          console.log('Error' + JSON.stringify(error.response));
          setLoading(false);
          alert(error);
        });
    }
  };

  const validate = () => {
    var flag = false;
    var i = 1;
    var errorMessage = '';

    setErrMsg(errorMessage);
    return flag;
  };

  const onSelect = () => {
    alert('Hi');
  };

  const handleClick = (index, textValue) => {
    //alert(index);
    //setdata([...data, {id: 0, isSelect: false, tname: textValue}]);
  };

  const handleReference = componentName => { };

  const handlePickerClick = (componentName, label, index) => { };
  function isMultipleOf5000(number) {
    return number % 5000 === 0;
  }

  // const AddGST = () => {
  //   console.log(data);
  //   setdata([...data, {id: data.length, isSelect: false, tname: ''}]);
  //   console.log(data);
  // };

  const AddGST = () => {
    const newDataArray = [...data];
    const newObject = {
      id: newDataArray.length,
      isSelect: false,
      tname: '',
    };
    newDataArray.push(newObject);
    setdata(newDataArray);
  };

  const setSelection = count => {
    //alert(count);
  };

  const OncustomeText = (value, index) => { };

  return (
    // enclose all components in this View tag
    <SafeAreaView
      style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>
      <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {loading ? <Loading /> : null}
        <View style={{ flex: 1 }}>
          <ErrorMessageModal
            isVisible={bottomErrorSheetVisible}
            hideBottomSheet={hideBottomSheet}
            errMsg={errMsg}
            textError={language[0][props.language].str_error}
            textClose={language[0][props.language].str_ok}
          />

          <View
            style={{
              width: '100%',
              height: 56,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <HeadComp
              textval={language[0][props.language].str_loandemographics}
              props={props}
            />
          </View>
          <ChildHeadComp
            textval={language[0][props.language].str_applicantdetails}
          />

          <View style={{ width: '100%', alignItems: 'center', marginTop: '3%' }}>
            <View style={{ width: '90%', marginTop: 3 }}>
              <TextComp
                textStyle={{
                  color: Colors.mediumgrey,
                  fontSize: 15,
                  fontWeight: '500',
                }}
                textVal={language[0][props.language].str_gstdetails}></TextComp>

              <ProgressComp progressvalue={0.6} textvalue="4 of 6" />
            </View>
          </View>

          <View style={{ width: '100%', alignItems: 'center', marginTop: '5%' }}>
            <View style={{ width: '90%', marginTop: 3 }}>
              <TextComp
                textStyle={{
                  color: Colors.mediumgrey,
                  fontSize: 15,
                  fontWeight: '500',
                }}
                textVal={
                  language[0][props.language].str_gstregistration
                }></TextComp>
            </View>
          </View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 15,
            }}>
            <View
              style={{
                width: '50%',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
              }}>
              <RadioButton.Android
                value="option1"
                status={selectedValue === 'option1' ? 'checked' : 'unchecked'}
                onPress={() => setSelectedValue('option1')}
                color="#007BFF"
              />
              <Text viewStyle={Commonstyles.inputtextStyle}>
                {AvailableCaption}
              </Text>
            </View>

            <View
              style={{
                width: '50%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <RadioButton.Android
                value="option2"
                status={selectedValue1 === 'option2' ? 'checked' : 'unchecked'}
                onPress={() => setSelectedValue1('option2')}
                color="#007BFF"
              />
              <Text viewStyle={Commonstyles.inputtextStyle}>
                {NotAvailableCaption}
              </Text>
            </View>
          </View>
          {data.map((each, index) => (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <View
                style={{
                  width: '93%',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <CheckBox
                  value={each.isSelect}
                  onValueChange={() =>
                    updateDataInArray(each.id, {
                      isSelect: !each.isSelect,
                    })
                  }
                  style={styles.checkbox}
                />
                <Text
                  style={{
                    color: Colors.darkblue,
                  }}>
                  GST IN {index + 1}
                </Text>
                <TextInput
                  style={Commonstyles.textinputtextStyle}
                  //value={()=> (each.id)}
                  onChangeText={e => updateDataInArray(each.id, { tname: e })}
                />
                {/* <TextInputComp
                  textValue={each.tname}
                  textStyle={Commonstyles.textinputtextStyle}
                  type="email-address"
                  handleClick={() =>
                    updateDataInArray(each.id, {tname: each.tname})
                  }></TextInputComp> */}
              </View>
            </View>
          ))}

          <View
            style={{
              marginLeft: 220,
              marginTop: 15,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity onPress={AddGST}>
              <Text
                style={{
                  color: Colors.darkblue,
                }}>
                + Add Another GST IN
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <ButtonViewComp
          textValue={language[0][props.language].str_dedupecheck.toUpperCase()}
          textStyle={{color: Colors.white, fontSize: 13, fontWeight: 500}}
          viewStyle={Commonstyles.buttonView}
          innerStyle={Commonstyles.buttonViewInnerStyle}
          handleClick={updateBasicDetails}
        /> */}
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
  checkbox: {
    alignSelf: 'center',
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoanDemographicsGSTDetails);
