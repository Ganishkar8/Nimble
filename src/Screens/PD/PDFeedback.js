/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  BackHandler,
  Modal,
  ToastAndroid,
} from 'react-native';
import { React, useState, useEffect, useRef } from 'react';
import MyStatusBar from '../../Components/MyStatusBar';
import HeadComp from '../../Components/HeadComp';
import { connect } from 'react-redux';
import { languageAction } from '../../Utils/redux/actions/languageAction';
import { language } from '../../Utils/LanguageString';
import Loading from '../../Components/Loading';
import ChildHeadComp from '../../Components/ChildHeadComp';
import ProgressComp from '../../Components/ProgressComp';
import Colors from '../../Utils/Colors';
import Commonstyles from '../../Utils/Commonstyles';
import Common from '../../Utils/Common';
import IconButtonViewComp from '../../Components/IconButtonViewComp';
import { useIsFocused } from '@react-navigation/native';
import TextComp from '../../Components/TextComp';
import ImageComp from '../../Components/ImageComp';
import Feather from 'react-native-vector-icons/Feather';
import DateInputComp from '../../Components/DateInputComp';
import PickerComp from '../../Components/PickerComp';
import TextInputComp from '../../Components/TextInputComp';
import ButtonViewComp from '../../Components/ButtonViewComp';
import { tr } from 'react-native-paper-dates';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalContainer from '../../Components/ModalContainer';
import apiInstance from '../../Utils/apiInstance';
import ErrorModal from '../../Components/ErrorModal';
import ErrorMessageModal from '../../Components/ErrorMessageModal';
import {
  addTravelDetails,
  updateTravelDetails,
  deleteTravelDetails,
  deleteOfficerTravelDetails,
} from '../../Utils/redux/actions/PersonalDiscussionAction';
import {
  updatePDModule,
  updatePDSubStage,
  updatePDSubModule,
  updatePDPage,
} from '../../Utils/redux/actions/PDAction';

const PDFeedback = (props, { navigation }) => {
  const [loading, setLoading] = useState(false);
  const [pdDetails, setPdDetails] = useState([]);
  const [refreshFlatlist, setRefreshFlatList] = useState(false);
  const isScreenVisible = useIsFocused();
  const [profileDetail, setProfileDetail] = useState(
    props.profiledetail.userPersonalDetailsDto,
  );

  const [riskLevelMan, setRiskLevelMan] = useState(false);
  const [riskLevelVisible, setRiskLevelVisible] = useState(true);
  const [riskLevelDisable, setRiskLevelDisable] = useState(false);
  const [riskLevelData, setRiskLevelData] = useState([]);
  const [riskLevelCaption, setRiskLevelCaption] = useState('RISK LEVEL');
  const [riskLevelLabel, setRiskLevelLabel] = useState('');
  const [riskLevelIndex, setRiskLevelIndex] = useState('');

  const [satisficationScoreMan, setSatisficationScoreMan] = useState(false);
  const [satisficationScoreVisible, setSatisficationScoreVisible] =
    useState(true);
  const [satisficationScoreDisable, setSatisficationScoreDisable] =
    useState(false);
  const [satisficationScoreData, setSatisficationScoreData] = useState([]);
  const [satisficationScoreCaption, setSatisficationScoreCaption] = useState(
    'OVERALL SATISFICATION SCORE',
  );
  const [satisficationScoreLabel, setSatisficationScoreLabel] = useState('');
  const [satisficationScoreIndex, setSatisficationScoreIndex] = useState('');

  const [politicallyExposedMan, setPoliticallyExposedMan] = useState(false);
  const [politicallyExposedVisible, setPoliticallyExposedVisible] =
    useState(true);
  const [politicallyExposedDisable, setPoliticallyExposedDisable] =
    useState(false);
  const [politicallyExposedData, setPoliticallyExposedData] = useState([]);
  const [politicallyExposedCaption, setPoliticallyExposedCaption] = useState(
    'IS A PERSON POLITICALLY EXPOSED?',
  );
  const [politicallyExposedLabel, setPoliticallyExposedLabel] = useState('');
  const [politicallyExposedIndex, setPoliticallyExposedIndex] = useState('');

  const [observation, setObservation] = useState('');
  const [observationCaption, setObservationCaption] = useState('OBSERVATION');
  const [observationMan, setObservationMan] = useState(false);
  const [observationVisible, setObservationVisible] = useState(true);
  const [observationDisable, setObservationDisable] = useState(false);
  const observationRef = useRef(null);

  const [leadsystemCodeDetail, setLeadSystemCodeDetail] = useState(
    props.mobilecodedetail.leadSystemCodeDto,
  );
  const [systemCodeDetail, setSystemCodeDetail] = useState(
    props.mobilecodedetail.t_SystemCodeDetail,
  );
  const [leaduserCodeDetail, setLeadUserCodeDetail] = useState(
    props.mobilecodedetail.leadUserCodeDto,
  );
  const [userCodeDetail, setUserCodeDetail] = useState(
    props.mobilecodedetail.t_UserCodeDetail,
  );

  const [systemMandatoryField, setSystemMandatoryField] = useState(
    props.mobilecodedetail.pdSystemMandatoryFields,
  );
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [apiError, setApiError] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
  const showBottomSheet = () => setBottomErrorSheetVisible(true);
  const hideBottomSheet = () => setBottomErrorSheetVisible(false);

  const [currentPageId, setCurrentPageId] = useState(props.route.params.pageId);
  const [currentPageCode, setCurrentPageCode] = useState(
    props.route.params.pageCode,
  );
  const [currentPageDesc, setCurrentPageDesc] = useState(
    props.route.params.pageDesc,
  );
  const [currentPageMan, setCurrentPageMan] = useState(
    props.route.params.pageMandatory,
  );
  const [parentFeebackId, setParentFeedbackId] = useState(0);

  useEffect(() => {
    props.navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButton,
    );
    getSystemCodeDetail();
    makeSystemMandatoryFields();
    // props.deleteTravelDetails(131)
    getFeedbackDetails();

    return () => {
      props.navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
      backHandler.remove();
    };
  }, [props.navigation, isScreenVisible]);

  const handleBackButton = () => {
    onGoBack();
    return true; // Prevent default back button behavior
  };

  const getFeedbackDetails = () => {
    const baseURL = global.PORT1;
    setLoading(true);

    const appDetails = {
      clientId: global.CLIENTID,
      userId: global.USERID,
      pageId: currentPageId,
      pdLevel: global.PDSTAGE,
      loanApplicationNumber: global.LOANAPPLICATIONNUM,
    };

    if (global.CLIENTTYPE == 'APPL') {
      if (global.PDSTAGE == 'PD_2') {
        appDetails.previousPage = 13;
      } else if (global.PDSTAGE == 'PD_3') {
        appDetails.previousPage = 50;
      }
    } else if (global.CLIENTTYPE == 'CO-APPL') {
      if (global.PDSTAGE == 'PD_2') {
        appDetails.previousPage = 25;
      } else if (global.PDSTAGE == 'PD_3') {
        appDetails.previousPage = 62;
      }
    } else if (global.CLIENTTYPE == 'GRNTR') {
      if (global.PDSTAGE == 'PD_2') {
        appDetails.previousPage = 37;
      } else if (global.PDSTAGE == 'PD_3') {
        appDetails.previousPage = 74;
      }
    }


    apiInstance(baseURL)
      .post(`/api/v1/pd/PDFeedback`, appDetails)
      .then(response => {
        // Handle the response data
        if (global.DEBUG_MODE)
          console.log('ResponseDataApi::' + JSON.stringify(response.data));

        if (response.status == 200) {
          setLoading(false);
          if (response.data === '') {
            //getDocuments([]);
          } else {
            setParentFeedbackId(response.data.id);
            setRiskLevelLabel(response.data.riskLevel);
            setSatisficationScoreLabel(response.data.overAllSatisfactionScore);
            setPoliticallyExposedLabel(response.data.politicalExpose);
            setObservation(response.data.observation);
            //getSavedData(response.data);
          }
        } else if (response.data.statusCode === 201) {
          setLoading(false);
          setApiError(response.data.message);
          setErrorModalVisible(true);
        } else if (response.data.statusCode === 202) {
          setLoading(false);
          setApiError(response.data.message);
          setErrorModalVisible(true);
        }
      })
      .catch(error => {
        // Handle the error
        setLoading(false);
        if (global.DEBUG_MODE)
          console.log(
            'ResponseDataApi::' + JSON.stringify(error.response.data),
          );
        if (error.response.status == 404) {
          setApiError(Common.error404);
          setErrorModalVisible(true);
        } else if (error.response.status == 400) {
          setApiError(Common.error400);
          setErrorModalVisible(true);
        } else if (error.response.status == 500) {
          setApiError(Common.error500);
          setErrorModalVisible(true);
        } else if (error.response.data != null) {
          setApiError(error.response.data.message);
          setErrorModalVisible(true);
        }
      });
  };

  const getSystemCodeDetail = async () => {
    const filteredRiskLevelData = leaduserCodeDetail
      .filter(data => data.masterId === 'PD_RISK_LEVEL')
      .sort((a, b) => a.Description.localeCompare(b.Description));
    setRiskLevelData(filteredRiskLevelData);

    const filteredSatisficationData = leaduserCodeDetail
      .filter(data => data.masterId === 'OVERALL_SATISFACTION_REPORT')
      .sort((a, b) => a.Description.localeCompare(b.Description));
    setSatisficationScoreData(filteredSatisficationData);

    const filteredPD_PEPData = leaduserCodeDetail
      .filter(data => data.masterId === 'PD_PEP')
      .sort((a, b) => a.Description.localeCompare(b.Description));
    setPoliticallyExposedData(filteredPD_PEPData);
  };

  const makeSystemMandatoryFields = async () => {
    systemMandatoryField
      .filter(
        data =>
          data.fieldUiid === 'sp_pd_fbk_rl' && data.pdPageId === currentPageId,
      )
      .map((value, index) => {
        setRiskLevelCaption(value.fieldName);

        if (value.isMandatory) {
          setRiskLevelMan(true);
        }
        if (value.isHide) {
          setRiskLevelVisible(false);
        }
        if (value.isDisable) {
          setRiskLevelDisable(true);
        }
        if (value.isCaptionChange) {
          setRiskLevelCaption(value[0].fieldCaptionChange);
        }
      });

    systemMandatoryField
      .filter(
        data =>
          data.fieldUiid === 'sp_pd_fbk_orlsr' &&
          data.pdPageId === currentPageId,
      )
      .map((value, index) => {
        setSatisficationScoreCaption(value.fieldName);

        if (value.isMandatory) {
          setSatisficationScoreMan(true);
        }
        if (value.isHide) {
          setSatisficationScoreVisible(false);
        }
        if (value.isDisable) {
          setSatisficationScoreDisable(true);
        }
        if (value.isCaptionChange) {
          setRiskLevelCaption(value[0].fieldCaptionChange);
        }
      });

    systemMandatoryField
      .filter(
        data =>
          data.fieldUiid === 'sp_pd_fbk_pep  ' &&
          data.pdPageId === currentPageId,
      )
      .map((value, index) => {
        setPoliticallyExposedCaption(value.fieldName);

        if (value.isMandatory) {
          setPoliticallyExposedMan(true);
        }
        if (value.isHide) {
          setPoliticallyExposedVisible(false);
        }
        if (value.isDisable) {
          setPoliticallyExposedDisable(true);
        }
        if (value.isCaptionChange) {
          setPoliticallyExposedCaption(value[0].fieldCaptionChange);
        }
      });

    systemMandatoryField
      .filter(
        data =>
          data.fieldUiid === 'et_pd_fbk_obsv ' &&
          data.pdPageId === currentPageId,
      )
      .map((value, index) => {
        setObservationCaption(value.fieldName);

        if (value.isMandatory) {
          setObservationMan(true);
        }
        if (value.isHide) {
          setObservationVisible(false);
        }
        if (value.isDisable) {
          setObservationDisable(true);
        }
        if (value.isCaptionChange) {
          setObservationCaption(value[0].fieldCaptionChange);
        }
      });
  };

  const validate = () => {
    var flag = false;
    var i = 1;
    var errorMessage = '';

    if (riskLevelMan && riskLevelMan) {
      if (riskLevelMan.length <= 0) {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          language[0][props.language].str_plsselect +
          riskLevelCaption +
          '\n';
        i++;
        flag = true;
      }
    }

    setErrMsg(errorMessage);
    return flag;
  };

  const onGoBack = () => {
    props.navigation.replace('PDItems', { clientType: global.CLIENTTYPE });
  };

  const submitFeebackData = () => {
    if (validate()) {
      showBottomSheet();
      return;
    }

    postFeedbackDetail();
  };

  const postFeedbackDetail = () => {
    const appDetails = {
      createdBy: global.USERID,
      id: parentFeebackId,
      clientType: global.CLIENTTYPE,
      pdLevel: global.PDSTAGE,
      pageId: currentPageId,
      loanApplicationId: global.LOANAPPLICATIONID,
      riskLevel: riskLevelLabel,
      overAllSatisfactionScore: satisficationScoreLabel,
      politicalExpose: politicallyExposedLabel,
      observation: observation,
    };

    const baseURL = global.PORT1;
    setLoading(true);

    apiInstance(baseURL)
      .post(
        `/api/v1/pd/PDFeedback/loan-application-number/${global.LOANAPPLICATIONNUM}/clientId/${global.CLIENTID}`,
        appDetails,
      )
      .then(response => {
        // Handle the response data ${item.clientId}
        if (global.DEBUG_MODE)
          console.log('PDFeedbackApi::' + JSON.stringify(response.data));
        setLoading(false);
        if (response.status == 200 || response.status == 201) {
          updatePdStatus();
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
        setLoading(false);
        if (global.DEBUG_MODE)
          console.log('PDDataApiError::' + JSON.stringify(error.response.data));
        if (error.response.status == 404) {
          setApiError(Common.error404);
          setErrorModalVisible(true);
        } else if (error.response.status == 400) {
          setApiError(Common.error400);
          setErrorModalVisible(true);
        } else if (error.response.status == 500) {
          setApiError(Common.error500);
          setErrorModalVisible(true);
        } else if (error.response.data != null) {
          setApiError(error.response.data.message);
          setErrorModalVisible(true);
        }
      });

    //props.deleteTravelDetails(17)
    //props.addTravelDetails(17, 'BusinessDetail1', businessDetails)
    // props.updateTravelDetails(14, 'BusinessDetail', businessDetails.travelDetails)
    //props.navigation.goBack();

    if (Common.DEBUG_MODE)
      console.log(
        'DateOfTravel::' +
        dateOfTravel +
        ' ' +
        ' Mode Of Travel::' +
        modeOfTravelLabel +
        ' ' +
        'Distance Travelled::' +
        distanceTravelled +
        ' ' +
        'Remarks::' +
        remarks,
      );
  };

  const updatePdStatus = () => {
    const appDetails = {
      loanApplicationId: global.LOANAPPLICATIONID,
      loanWorkflowStage: global.PDSTAGE,
      subStageCode: global.PDSUBSTAGE,
      moduleCode: global.PDMODULE,
      subModule: global.PDSUBMODULE,
      pageCode: currentPageCode,
      status: 'Completed',
      userId: global.USERID,
    };

    const baseURL = global.PORT1;
    setLoading(true);
    apiInstance(baseURL)
      .post(`/api/v2/PD/Update/PD_WORKFLOW/updateStatus`, appDetails)
      .then(async response => {
        // Handle the response data
        if (global.DEBUG_MODE)
          console.log(
            'UpdatePDStatusApiResponse::' + JSON.stringify(response.data),
          );
        setLoading(false);
        if (response.status == 200) {
          getAllStatus();
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
        if (global.DEBUG_MODE)
          console.log(
            'UpdateStatusApiResponse' + JSON.stringify(error.response),
          );
        setLoading(false);

        if (error.response.status == 404) {
          setApiError(Common.error404);
          setErrorModalVisible(true);
        } else if (error.response.status == 400) {
          setApiError(Common.error400);
          setErrorModalVisible(true);
        } else if (error.response.status == 500) {
          setApiError(Common.error500);
          setErrorModalVisible(true);
        } else if (error.response.data != null) {
          setApiError(error.response.data.message);
          setErrorModalVisible(true);
        }
      });
  };

  const getAllStatus = () => {
    const filteredModule = props.pdSubStage[0].personalDiscussionSubStageLogs
      .filter(data => data.subStageCode === global.PDSUBSTAGE)[0]
      .personalDiscussionModuleLogs.filter(
        data => data.moduleCode === global.PDMODULE,
      )[0];

    if (filteredModule) {
      props.updatePDModule(global.PDSUBSTAGE, global.PDMODULE);
      props.updatePDSubModule(
        global.PDSUBSTAGE,
        global.PDMODULE,
        global.PDSUBMODULE,
      );
      props.updatePDPage(
        global.PDSUBSTAGE,
        global.PDMODULE,
        global.PDSUBMODULE,
        currentPageCode,
      );
      props.navigation.replace('PDItems', { clientType: global.CLIENTTYPE });
    } else {
      if (Common.DEBUG_MODE) console.log('Module not found.');
    }
  };

  const FlatView = ({ item }) => {
    return (
      <View style={{ width: '100%', alignItems: 'center', marginTop: 15 }}>
        <View
          style={{
            width: '90%',
            minHeight: 100,
            backgroundColor: '#E5F4FE',
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <ImageComp
            imageSrc={
              item.colorCode == 'Green'
                ? require('../../Images/income.png')
                : require('../../Images/expense.png')
            }
            imageStylee={{ marginLeft: 10, width: 30, height: 30 }}
          />
          <View style={{ width: '80%' }}>
            <Text
              style={{
                width: '80%',
                fontSize: 12,
                fontFamily: 'PoppinsRegular',
                marginTop: 5,
                color: Colors.black,
                marginLeft: 10,
              }}>
              {item.accompanyingOfficer}
            </Text>

            <Text
              style={{
                width: '80%',
                fontSize: 12,
                fontFamily: 'Poppins-Medium',
                marginTop: 5,
                color: Colors.black,
                marginLeft: 10,
              }}>
              {item.employeeId}
            </Text>
          </View>
          <View>
            <MaterialCommunityIcons
              name="delete"
              size={20}
              onPress={() => {
                deleteOfficer(item);
              }}
              color="#F76464"></MaterialCommunityIcons>
          </View>
        </View>
      </View>
    );
  };

  const handleReference = componentName => {
    if (componentName === 'accountHolderName') {
    } else if (componentName === 'ifsccode') {
    }
  };

  const handleClick = (componentName, textValue) => {
    if (componentName === 'Observation') {
      setObservation(textValue);
    }
  };
  const handlePickerClick = (componentName, label, index) => {
    if (componentName === 'RiskLevel') {
      setRiskLevelLabel(label);
      setRiskLevelIndex(index);
    } else if (componentName === 'SatisficationScore') {
      setSatisficationScoreLabel(label);
      setSatisficationScoreIndex(index);
    } else if (componentName === 'PoliticallyExposed') {
      setPoliticallyExposedLabel(label);
      setPoliticallyExposedIndex(index);
    }
  };

  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {loading ? <Loading /> : null}
      <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

      <ErrorModal
        isVisible={errorModalVisible}
        onClose={closeErrorModal}
        textContent={apiError}
        textClose={language[0][props.language].str_ok}
      />

      <ErrorMessageModal
        isVisible={bottomErrorSheetVisible}
        hideBottomSheet={hideBottomSheet}
        errMsg={errMsg}
        textError={language[0][props.language].str_error}
        textClose={language[0][props.language].str_ok}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={{ flex: 1 }}>
          <View
            style={{
              width: '100%',
              height: 56,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <HeadComp
              textval={language[0][props.language].str_pd}
              props={props}
              onGoBack={onGoBack}
            />
          </View>
          <View style={{ width: '93%', flexDirection: 'row', marginLeft: 20 }}>
            <TouchableOpacity
              activeOpacity={1}
              style={{ width: '10%', height: 40, justifyContent: 'center' }}>
              <View>
                <Feather name="briefcase" size={25} color={Colors.darkblue} />
              </View>
            </TouchableOpacity>
            <View style={{ width: '80%', height: 40, justifyContent: 'center' }}>
              <Text
                style={{
                  fontSize: 18,
                  color: Colors.darkblack,
                  fontFamily: 'PoppinsRegular',
                  marginTop: 3,
                }}>
                Personal Discussion Feedback
              </Text>
            </View>
          </View>

          {riskLevelVisible && (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: '4%',
              }}>
              <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                <TextComp
                  textVal={riskLevelCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={riskLevelMan}
                />
              </View>

              <PickerComp
                textLabel={riskLevelLabel}
                pickerStyle={Commonstyles.picker}
                Disable={riskLevelDisable}
                pickerdata={riskLevelData}
                componentName="RiskLevel"
                handlePickerClick={handlePickerClick}
              />
            </View>
          )}

          {satisficationScoreVisible && (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: '4%',
              }}>
              <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                <TextComp
                  textVal={satisficationScoreCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={satisficationScoreMan}
                />
              </View>

              <PickerComp
                textLabel={satisficationScoreLabel}
                pickerStyle={Commonstyles.picker}
                Disable={satisficationScoreDisable}
                pickerdata={satisficationScoreData}
                componentName="SatisficationScore"
                handlePickerClick={handlePickerClick}
              />
            </View>
          )}

          {politicallyExposedVisible && (
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                marginTop: '4%',
              }}>
              <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                <TextComp
                  textVal={politicallyExposedCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={politicallyExposedMan}
                />
              </View>

              <PickerComp
                textLabel={politicallyExposedLabel}
                pickerStyle={Commonstyles.picker}
                Disable={politicallyExposedDisable}
                pickerdata={politicallyExposedData}
                componentName="PoliticallyExposed"
                handlePickerClick={handlePickerClick}
              />
            </View>
          )}

          {observationVisible && (
            <View
              style={{
                width: '100%',
                marginTop: 19,
                paddingHorizontal: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                <TextComp
                  textVal={observationCaption}
                  textStyle={Commonstyles.inputtextStyle}
                  Visible={observationMan}
                />
              </View>

              <TextInputComp
                textValue={observation}
                textStyle={Commonstyles.textinputtextStyle}
                type="email-address"
                Disable={observationDisable}
                ComponentName="Observation"
                reference={observationRef}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
              />
            </View>
          )}
        </View>
      </ScrollView>

      <ButtonViewComp
        textValue={language[0][props.language].str_submit.toUpperCase()}
        textStyle={{
          color: Colors.white,
          fontSize: 13,
          fontWeight: 500,
          marginBottom: 5,
        }}
        viewStyle={[Commonstyles.buttonView, { marginBottom: 15 }]}
        innerStyle={Commonstyles.buttonViewInnerStyle}
        handleClick={submitFeebackData}
      />
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  const { language } = state.languageReducer;
  const { profileDetails } = state.profileReducer;
  const { mobileCodeDetails } = state.mobilecodeReducer;
  const { pdDetails } = state.personalDiscussionReducer;
  const { pdSubStages } = state.pdStagesReducer;
  return {
    language: language,
    profiledetail: profileDetails,
    pdDetail: pdDetails,
    mobilecodedetail: mobileCodeDetails,
    pdSubStage: pdSubStages,
  };
};

const mapDispatchToProps = dispatch => ({
  languageAction: item => dispatch(languageAction(item)),
  addTravelDetails: (loanApplicationId, item, key) =>
    dispatch(addTravelDetails(loanApplicationId, item, key)),
  updateTravelDetails: (loanApplicationId, key, travelDetails) =>
    dispatch(updateTravelDetails(loanApplicationId, key, travelDetails)),
  deleteTravelDetails: item => dispatch(deleteTravelDetails(item)),
  deleteOfficerTravelDetails: (loanApplicationId, index) =>
    dispatch(deleteOfficerTravelDetails(loanApplicationId, index)),
  updatePDSubStage: item => dispatch(updatePDSubStage(item)),
  updatePDModule: (subStage, module) =>
    dispatch(updatePDModule(subStage, module)),
  updatePDSubModule: (subStage, module, subModule) =>
    dispatch(updatePDSubModule(subStage, module, subModule)),
  updatePDPage: (subStage, module, subModule, page) =>
    dispatch(updatePDPage(subStage, module, subModule, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PDFeedback);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f8fa',
    alignItems: 'center',
  },
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
  headerView: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewStyle: {
    alignItems: 'center',
    paddingHorizontal: 20,
    marginLeft: 9,
    marginRight: 4,
    borderColor: '#e3e3e3',
    marginBottom: 4,
    marginStart: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderRadius: 8,
  },
  bottomNavigationView: {
    backgroundColor: '#fff',
    width: '100%',
    height: 400,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  textColor: {
    color: '#000',
    fontSize: 14,
    fontWeight: '400',
  },
  viewStyleFilter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewStyleStatusData: {
    alignItems: 'center',
  },
  picker: {
    height: 50,
    width: '85%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
  },
  pendingbackground: {
    width: 90,
    borderColor: Colors.pendingBorder,
    backgroundColor: Colors.pendingBg,
    alignItems: 'center',
    padding: 3,
    borderRadius: 15,
    borderWidth: 1,
  },
  approvedbackground: {
    width: 90,
    borderColor: Colors.approvedBorder,
    backgroundColor: Colors.approvedBg,
    alignItems: 'center',
    padding: 3,
    borderRadius: 15,
    borderWidth: 1,
  },
  line: {
    backgroundColor: '#f1f1f1', // Change the color as needed
    height: 1,
    width: '90%',
    marginLeft: '5%',
    marginTop: '5%',
    alignItems: 'center', // Adjust the height as needed
  },
  disableBg: {
    width: '88%',
    height: 50,
    backgroundColor: Colors.disableBg,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  enableBg: {
    width: '88%',
    height: 50,
    backgroundColor: Colors.enableBg,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 0,
    right: 0,
    bottom: 12,
    width: '100%',
  },
  modalContent: {
    width: '90%', // Set width to 90% of the screen width
    aspectRatio: 1,
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
});
