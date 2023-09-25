import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import apiInstance from '../../../Utils/apiInstance';
import apiInstancelocal from '../../../Utils/apiInstancelocal';
import Colors from '../../../Utils/Colors';
import MyStatusBar from '../../../Components/ MyStatusBar';
import Loading from '../../../Components/Loading';
import TextComp from '../../../Components/TextComp';
import {connect} from 'react-redux';
import {languageAction} from '../../../Utils/redux/actions/languageAction';
import {language} from '../../../Utils/LanguageString';
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

const ProfileShortApplicantDetails = (props, {navigation}) => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [firstNameCaption, setFirstNameCaption] = useState('FIRST NAME');
  const [firstNameMan, setFirstNameMan] = useState(false);
  const [firstNameVisible, setFirstNameVisible] = useState(true);
  const [firstNameDisable, setFirstNameDisable] = useState(false);
  const [middleName, setMiddleName] = useState('');
  const [middleNameMan, setMiddleNameMan] = useState(false);
  const [middleNameCaption, setMiddleNameCaption] = useState('MIDDLE NAME');
  const [middleNameVisible, setMiddleNameVisible] = useState(true);
  const [middleNameDisable, setMiddleNameDisable] = useState(false);
  const [lastName, setLastName] = useState('');
  const [lastNameCaption, setLastNameCaption] = useState('LAST NAME');
  const [lastNameMan, setLastNameMan] = useState(false);
  const [lastNameVisible, setLastNameVisible] = useState(true);
  const [lastNameDisable, setLastNameDisable] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
  const showBottomSheet = () => setBottomErrorSheetVisible(true);
  const hideBottomSheet = () => setBottomErrorSheetVisible(false);
  const firstNameRef = useRef(null);
  const middleNameRef = useRef(null);
  const lastNameRef = useRef(null);

  const [TitleMan, setTitleMan] = useState(false);
  const [TitleVisible, setTitleVisible] = useState(true);
  const [TitleDisable, setTitleDisable] = useState(false);
  const [TitleData, setTitleData] = useState([]);
  const [TitleCaption, setTitleCaption] = useState('TITLE');
  const [TitleLabel, setTitleLabel] = useState('');
  const [TitleIndex, setTitleIndex] = useState('');

  const [GenderMan, setGenderMan] = useState(false);
  const [GenderVisible, setGenderVisible] = useState(true);
  const [GenderDisable, setGenderDisable] = useState(false);
  const [GenderData, setGenderData] = useState([]);
  const [GenderCaption, setGenderCaption] = useState('GENDER');
  const [GenderLabel, setGenderLabel] = useState('');
  const [GenderIndex, setGenderIndex] = useState('');

  useEffect(() => {
    props.navigation
      .getParent()
      ?.setOptions({tabBarStyle: {display: 'none'}, tabBarVisible: false});
    makeSystemMandatoryFields();
    pickerData();

    return () =>
      props.navigation
        .getParent()
        ?.setOptions({tabBarStyle: undefined, tabBarVisible: undefined});
  }, [navigation]);

  const pickerData = async () => {
    tbl_SystemCodeDetails.getSystemCodeDetailsBasedOnID('Title').then(value => {
      if (value !== undefined && value.length > 0) {
        console.log(value);

        for (var i = 0; i < value.length; i++) {
          if (value[i].IsDefault === '1') {
            setTitleLabel(value[i].SubCodeID);
            setTitleIndex(i + 1);
          }
        }

        setTitleData(value);
      }
    });
    tbl_SystemCodeDetails
      .getSystemCodeDetailsBasedOnID('Gender')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);

          for (var i = 0; i < value.length; i++) {
            if (value[i].IsDefault === '1') {
              setGenderLabel(value[i].SubCodeID);
              setGenderIndex(i + 1);
            }
          }

          setGenderData(value);
        }
      });
  };

  const makeSystemMandatoryFields = () => {
    //firstName
    tbl_SystemMandatoryFields
      .getSystemMandatoryFieldsBasedOnFieldUIID('et_firstname')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value[0]);
          setFirstNameCaption(value[0].FieldName);
          if (value[0].IsMandatory == '1') {
            setFirstNameMan(true);
          }
          if (value[0].IsHide == '1') {
            setFirstNameVisible(false);
          }
          if (value[0].IsDisable == '1') {
            setFirstNameDisable(true);
          }
          if (value[0].IsCaptionChange == '1') {
            setFirstNameCaption(value[0].FieldCaptionChange);
          }
        }
      });

    tbl_SystemMandatoryFields
      .getSystemMandatoryFieldsBasedOnFieldUIID('et_lastname')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);
          setLastNameCaption(value[0].FieldName);
          if (value[0].IsMandatory == '1') {
            setLastNameMan(true);
          }
          if (value[0].IsHide == '1') {
            setLastNameVisible(false);
          }
          if (value[0].IsDisable == '1') {
            setLastNameDisable(true);
          }
          if (value[0].IsCaptionChange == '1') {
            setLastNameCaption(value[0].FieldCaptionChange);
          }
        }
      });

    tbl_SystemMandatoryFields
      .getSystemMandatoryFieldsBasedOnFieldUIID('et_middlename')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);
          setMiddleNameCaption(value[0].FieldName);
          if (value[0].IsMandatory == '1') {
            setMiddleNameMan(true);
          }
          if (value[0].IsHide == '1') {
            setMiddleNameVisible(false);
          }
          if (value[0].IsDisable == '1') {
            setMiddleNameDisable(true);
          }
          if (value[0].IsCaptionChange == '1') {
            setMiddleNameCaption(value[0].FieldCaptionChange);
          }
        }
      });

    tbl_SystemMandatoryFields
      .getSystemMandatoryFieldsBasedOnFieldUIID('sp_title')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);
          setTitleCaption(value[0].FieldName);
          if (value[0].IsMandatory == '1') {
            setTitleMan(true);
          }
          if (value[0].IsHide == '1') {
            setTitleVisible(false);
          }
          if (value[0].IsDisable == '1') {
            setTitleDisable(true);
          }
          if (value[0].IsCaptionChange == '1') {
            setTitleCaption(value[0].FieldCaptionChange);
          }
        }
      });

    tbl_SystemMandatoryFields
      .getSystemMandatoryFieldsBasedOnFieldUIID('sp_gender')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);
          setGenderCaption(value[0].FieldName);
          if (value[0].IsMandatory == '1') {
            setGenderMan(true);
          }
          if (value[0].IsHide == '1') {
            setGenderVisible(false);
          }
          if (value[0].IsDisable == '1') {
            setGenderDisable(true);
          }
          if (value[0].IsCaptionChange == '1') {
            setGenderCaption(value[0].FieldCaptionChange);
          }
        }
      });
  };

  const updateApplicantDetails = () => {
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
    if (TitleMan && TitleVisible) {
      if (Title.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          TitleCaption +
          '\n';
        i++;
        flag = true;
      }
    }
    if (firstNameMan && firstNameVisible) {
      if (firstName.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          firstNameCaption +
          '\n';
        i++;
        flag = true;
      }
    }
    if (middleNameMan && middleNameVisible) {
      if (middleName.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          middleNameCaption +
          '\n';
        i++;
        flag = true;
      }
    }
    if (lastNameMan && lastNameVisible) {
      if (lastName.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          lastNameCaption +
          '\n';
        i++;
        flag = true;
      }
    }
    if (GenderMan && GenderVisible) {
      if (Gender.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsenter +
          GenderCaption +
          '\n';
        i++;
        flag = true;
      }
    }
    setErrMsg(errorMessage);
    return flag;
  };

  const handleClick = (componentName, textValue) => {
    if (componentName === 'firstName') {
      setFirstName(textValue);
    } else if (componentName === 'middleName') {
      setMiddleName(textValue);
    } else if (componentName === 'lastName') {
      setLastName(textValue);
    } else if (componentName === 'Title') {
      setTitle(textValue);
    } else if (componentName === 'Gender') {
      setGender(textValue);
    }
  };

  const handleReference = componentName => {
    if (componentName === 'firstName') {
      middleNameRef.current.focus();
    } else if (componentName === 'middleName') {
      lastNameRef.current.focus();
    } else if (componentName === 'lastName') {
    }
  };

  const handlePickerClick = (componentName, label, index) => {
    if (componentName === 'Title') {
      setTitleLabel(label);
      setTitleIndex(index);
    } else if (componentName === 'Gender') {
      setGenderLabel(label);
      setGenderIndex(index);
    }
  };

  return (
    // enclose all components in this View tag
    <SafeAreaView
      style={[styles.parentView, {backgroundColor: Colors.lightwhite}]}>
      <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        {loading ? <Loading /> : null}
        <View style={{flex: 1}}>
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
              textval={language[0][props.language].str_profileshort}
              props={props}
            />
          </View>

          <ChildHeadComp
            textval={language[0][props.language].str_applicantdetails}
          />

          <View style={{width: '100%', alignItems: 'center', marginTop: '3%'}}>
            <View style={{width: '90%', marginTop: 3}}>
              <TextComp
                textStyle={{
                  color: Colors.mediumgrey,
                  fontSize: 15,
                  fontWeight: '500',
                }}
                textVal={
                  language[0][props.language].str_personaldetails
                }></TextComp>

              <ProgressComp progressvalue={0.75} textvalue="3 of 4" />
            </View>
          </View>

          {TitleVisible && (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: '4%',
              }}>
              <View style={{width: '90%', marginTop: 3, paddingHorizontal: 0}}>
                <TextComp
                  textVal={TitleCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={TitleMan}
                />
              </View>

              <PickerComp
                textLabel={TitleLabel}
                pickerStyle={Commonstyles.picker}
                Disable={TitleDisable}
                pickerdata={TitleData}
                componentName="Title"
                handlePickerClick={handlePickerClick}
              />
            </View>
          )}

          {firstNameVisible && (
            <View
              style={{
                width: '100%',
                marginTop: 19,
                paddingHorizontal: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{width: '90%', marginTop: 3, paddingHorizontal: 0}}>
                <TextComp
                  textVal={firstNameCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={firstNameMan}
                />
              </View>

              <TextInputComp
                textValue={firstName}
                textStyle={Commonstyles.textinputtextStyle}
                type="email-address"
                Disable={firstNameDisable}
                ComponentName="firstName"
                reference={firstNameRef}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
              />
            </View>
          )}

          {middleNameVisible && (
            <View
              style={{
                width: '100%',
                marginTop: 19,
                paddingHorizontal: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{width: '90%', marginTop: 3, paddingHorizontal: 0}}>
                <TextComp
                  textVal={middleNameCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={middleNameMan}
                />
              </View>

              <TextInputComp
                textValue={middleName}
                textStyle={Commonstyles.textinputtextStyle}
                type="email-address"
                Disable={middleNameDisable}
                ComponentName="middleName"
                reference={middleNameRef}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
              />
            </View>
          )}

          {lastNameVisible && (
            <View
              style={{
                width: '100%',
                marginTop: 19,
                paddingHorizontal: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{width: '90%', marginTop: 3, paddingHorizontal: 0}}>
                <TextComp
                  textVal={lastNameCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={lastNameMan}
                />
              </View>

              <TextInputComp
                textValue={lastName}
                textStyle={Commonstyles.textinputtextStyle}
                type="email-address"
                Disable={lastNameDisable}
                ComponentName="lastName"
                reference={lastNameRef}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
              />
            </View>
          )}

          {GenderVisible && (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: '4%',
              }}>
              <View style={{width: '90%', marginTop: 3, paddingHorizontal: 0}}>
                <TextComp
                  textVal={GenderCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={GenderMan}
                />
              </View>

              <PickerComp
                textLabel={GenderLabel}
                pickerStyle={Commonstyles.picker}
                Disable={GenderDisable}
                pickerdata={GenderData}
                componentName="Gender"
                handlePickerClick={handlePickerClick}
              />
            </View>
          )}
        </View>

        <ButtonViewComp
          textValue={language[0][props.language].str_next.toUpperCase()}
          textStyle={{color: Colors.white, fontSize: 13, fontWeight: 500}}
          viewStyle={Commonstyles.buttonView}
          innerStyle={Commonstyles.buttonViewInnerStyle}
          handleClick={updateApplicantDetails}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileShortApplicantDetails);
