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
  FlatList
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
import { RadioButton, Card } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ErrorModal from '../../../Components/ErrorModal';

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
  const [availableGSTData, setAvailableGSTData] = useState([]);
  const [refreshAvailableGSTFlatlist, setRefreshAvailableGSTFlatList] = useState(false);
  const [refreshNotAvailableGSTFlatlist, setRefreshNotAvailableGSTFlatList] = useState(false);
  const [notAvailableGSTData, setNotAvailableGSTData] = useState([]);

  const [selectedValue, setSelectedValue] = useState('Available');
  const [selectedValue1, setSelectedValue1] = useState(false);
  const [AvailableCaption, setAvailableCaption] = useState('Available');
  const [NotAvailableCaption, setNotAvailableCaption] =
    useState('Not Available');

  const [captureReasonMan, setCaptureReasonMan] = useState(false);
  const [captureReasonVisible, setCaptureReasonVisible] = useState(true);
  const [captureReasonDisable, setCaptureReasonDisable] = useState(false);
  const [captureReasonData, setCaptureReasonData] = useState([]);
  const [captureReasonCaption, setCaptureReasonCaption] = useState('CAPTURE REASON');
  const [captureReasonLabel, setCaptureReasonLabel] = useState('');
  const [captureReasonIndex, setCaptureReasonIndex] = useState('');

  const [timeFrameMan, setTimeFrameMan] = useState(false);
  const [timeFrameVisible, setTimeFrameVisible] = useState(true);
  const [timeFrameDisable, setTimeFrameDisable] = useState(false);
  const [timeFrameData, setTimeFrameData] = useState([]);
  const [timeFrameCaption, setTimeFrameCaption] = useState('TIME FRAME');
  const [timeFrameLabel, setTimeFrameLabel] = useState('');
  const [timeFrameIndex, setTimeFrameIndex] = useState('');


  const [totalSales, setTotalSales] = useState('');
  const [totalPurchases, setTotalPurchases] = useState('');

  const [totalYearSales, setTotalYearSales] = useState('');
  const [totalYearPurchases, setTotalYearPurchases] = useState('');

  const [monthsData, setMonthsData] = useState([]);
  const [refreshMonthsFlatlist, setRefreshMonthsFlatList] = useState(false);

  const [yearsData, setYearsData] = useState([]);
  const [refreshYearsFlatlist, setRefreshYearsFlatList] = useState(false);

  const [leadsystemCodeDetail, setLeadSystemCodeDetail] = useState(props.mobilecodedetail.leadSystemCodeDto);
  const [systemCodeDetail, setSystemCodeDetail] = useState(props.mobilecodedetail.t_SystemCodeDetail);
  const [leaduserCodeDetail, setLeadUserCodeDetail] = useState(props.mobilecodedetail.leadUserCodeDto);
  const [userCodeDetail, setUserCodeDetail] = useState(props.mobilecodedetail.t_UserCodeDetail);
  const [bankUserCodeDetail, setBankUserCodeDetail] = useState(props.mobilecodedetail.t_BankUserCode);
  const [systemMandatoryField, setSystemMandatoryField] = useState(props.mobilecodedetail.processSystemMandatoryFields);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [apiError, setApiError] = useState('');

  useEffect(() => {
    props.navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
    getSystemCodeDetail();


    return () =>
      props.navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
  }, [props.navigation]);

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

  const getSystemCodeDetail = async () => {
    let dataArray = [];

    const filteredCaptureReasonData = leaduserCodeDetail.filter((data) => data.masterId === 'CAPTURE_REASON').sort((a, b) => a.Description.localeCompare(b.Description));;
    setCaptureReasonData(filteredCaptureReasonData);

    const filteredTimeFrameData = leaduserCodeDetail.filter((data) => data.masterId === 'TIME_FRAME').sort((a, b) => a.Description.localeCompare(b.Description));;
    setTimeFrameData(filteredTimeFrameData);

  };


  const validate = () => {
    var flag = false;
    var i = 1;
    var errorMessage = '';

    if (selectedValue == 'Available') {
      const atLeastOneSelected = availableGSTData.some(item => item.isSelect);

      const allValuesNotEmptyForSelected = availableGSTData
        .filter(item => item.isSelect)
        .every(item => item.gstNumber.length > 0);

      if (atLeastOneSelected && allValuesNotEmptyForSelected) {
        console.log('At least one item has isSelect true, and for those, values are not empty.');
      } else {
        errorMessage =
          errorMessage +
          i +
          ')' +
          ' ' +
          'Selected GST Number should not be empty' +
          '\n';
        i++;
        flag = true;
      }

    } else {


      if (captureReasonMan && captureReasonVisible) {
        if (captureReasonLabel.length <= 0) {
          errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + captureReasonCaption + '\n';
          i++;
          flag = true;
        }
      }

      if (timeFrameMan && timeFrameVisible) {
        if (timeFrameLabel.length <= 0) {
          errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + timeFrameCaption + '\n';
          i++;
          flag = true;
        }
      }

      if (timeFrameLabel == 'MNTL') {
        const allAmountsNotEmpty = monthsData.every(item => item.salesAmount !== '' && item.purchaseAmount !== '');
        if (allAmountsNotEmpty) {

        } else {
          errorMessage =
            errorMessage +
            i +
            ')' +
            ' ' +
            'Sales and Purchase Should not be Empty' +
            '\n';
          i++;
          flag = true;
        }
      } else {
        const allAmountsNotEmpty = yearsData.every(item => item.salesAmount !== '' && item.purchaseAmount !== '');
        if (allAmountsNotEmpty) {

        } else {
          errorMessage =
            errorMessage +
            i +
            ')' +
            ' ' +
            'Sales and Purchase Should not be Empty' +
            '\n';
          i++;
          flag = true;
        }
      }


    }


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


  function isMultipleOf5000(number) {
    return number % 5000 === 0;
  }

  const AddGST = () => {
    const newDataArray = [...availableGSTData];
    const newObject = {
      isActive: true,
      isSelect: false,
      gstLabel: 'GST IN',
      gstNumber: '',
      gstUserName: "",
      isConsented: true,
    };
    newDataArray.push(newObject);
    setAvailableGSTData(newDataArray);
  };

  const updateGSTData = (index, newGSTNumber) => {
    const updatedDataArray = [...availableGSTData];

    // Update the gstNumber property for the specified index
    updatedDataArray[index].gstNumber = newGSTNumber;

    // Set the state with the updated array
    setAvailableGSTData(updatedDataArray);
  }

  const updateMonthsData = (index, value, newAmount) => {
    const updatedDataArray = [...monthsData];

    // Update the gstNumber property for the specified index
    if (value == 'Sales') {
      updatedDataArray[index].salesAmount = newAmount;
    } else if (value == 'Purchase') {
      updatedDataArray[index].purchaseAmount = newAmount;
    }

    setTotalSales(updatedDataArray.reduce((total, month) => total + parseInt(month.salesAmount), 0));
    setTotalPurchases(updatedDataArray.reduce((total, month) => total + parseInt(month.purchaseAmount), 0));

    // Set the state with the updated array
    setMonthsData(updatedDataArray);
  }

  const updateYearsData = (index, value, newAmount) => {
    const updatedDataArray = [...yearsData];

    // Update the gstNumber property for the specified index
    if (value == 'Sales') {
      updatedDataArray[index].salesAmount = newAmount;
    } else if (value == 'Purchase') {
      updatedDataArray[index].purchaseAmount = newAmount;
    }

    setTotalYearSales(updatedDataArray.reduce((total, month) => total + parseInt(month.salesAmount), 0));
    setTotalYearPurchases(updatedDataArray.reduce((total, month) => total + parseInt(month.purchaseAmount), 0));

    // Set the state with the updated array
    setYearsData(updatedDataArray);
  }

  const handlePickerClick = (componentName, label, index) => {
    if (componentName == 'CaptureReasonPicker') {
      setCaptureReasonLabel(label);
      setCaptureReasonIndex(index);
    } else if (componentName == 'TimeFramePicker') {
      if (label == 'MNTL') {
        generateLastTwelveMonths();
      } else {
        getLastTwoYearsArray();
      }
      setTimeFrameLabel(label);
      setTimeFrameIndex(index);
    }
  };

  const generateLastTwelveMonths = () => {
    const currentDate = new Date();
    const initialMonths = [];

    for (let i = 0; i < 12; i++) {
      const month = currentDate.getMonth() + 1;
      const shortMonth = currentDate.toLocaleString('default', { month: 'short' });
      const year = currentDate.getFullYear();
      const salesAmount = '0';
      const purchaseAmount = '0';
      initialMonths.unshift({ month, shortMonth, year, salesAmount, purchaseAmount });
      currentDate.setMonth(currentDate.getMonth() - 1);
    }

    setMonthsData(initialMonths);
  };

  const getLastTwoYearsArray = () => {
    const currentYear = new Date().getFullYear();
    const salesAmount = '0';
    const purchaseAmount = '0';
    const lastTwoYearsArray = [
      { year: currentYear - 1, salesAmount, purchaseAmount },
      { year: currentYear - 2, salesAmount, purchaseAmount },
    ];
    setYearsData(lastTwoYearsArray)
  };

  const deleteGSTList = (data) => { };

  const valueChange = (gstData, index) => {
    let filterGSTData = availableGSTData

    for (let i = 0; i < filterGSTData.length; i++) {
      if (i == index) {
        filterGSTData[i].isSelect = true
      } else {
        filterGSTData[i].isSelect = false
      }
    }

    setAvailableGSTData(filterGSTData);
    setRefreshAvailableGSTFlatList(!refreshAvailableGSTFlatlist)
  }

  const FlatView = ({ item, index }) => {


    return (
      <View style={{ width: '100%', alignItems: 'center', marginTop: 15 }}>
        <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center' }}>

          <View style={{ width: '90%', flexDirection: 'row', alignItems: 'center' }}>

            <CheckBox
              value={item.isSelect}
              disabled={false}
              color="#000000"
              onValueChange={() => { valueChange(item, index) }}
              style={styles.checkbox}
              tintColors={{ true: Colors.darkblue }}
            />

            <Text style={{ width: '25%', fontSize: 13, fontFamily: 'PoppinsRegular', marginTop: 5, color: Colors.mediumgrey, marginLeft: 10 }}>
              {item.gstLabel} {index + 1}
            </Text>

            <View style={{ backgroundColor: '#0294ff20', height: 40, borderRadius: 5, width: '70%' }}>

              <TextInput
                value={item.gstNumber}
                onChangeText={txt => { updateGSTData(index, txt) }}
                placeholder={''}
                contextMenuHidden={true}
                placeholderTextColor={Colors.lightgrey}
                keyboardType={'email-address'}
                multiline={false}
                maxLength={25}
                autoCapitalize="characters"
                style={{ color: Colors.black, overflow: 'scroll' }}
                returnKeyType={'done'}

              />

            </View>

          </View>

          {/* <View>
            <MaterialCommunityIcons
              name="delete"
              size={20}
              onPress={() => { deleteGSTList(item) }}
              color="#F76464"></MaterialCommunityIcons>
          </View> */}

        </View>

      </View >
    )

  }

  const FlatMonthsView = ({ item, index }) => {


    return (
      <View style={{ width: '100%', alignItems: 'center' }}>
        <View style={{ width: '90%', alignSelf: 'center', marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>

          <View style={{ width: '20%' }}>
            <Text
              style={{
                color: Colors.mediumgrey,
                fontFamily: 'PoppinsRegular'
              }}>
              {item.shortMonth.toUpperCase()}
            </Text>
          </View>

          <View style={{ width: '20%' }}>
            <Text
              style={{
                color: Colors.mediumgrey,
                fontFamily: 'PoppinsRegular'
              }}>
              {item.year}
            </Text>
          </View>

          <View style={{ width: '30%', backgroundColor: '#0294ff20', height: 40, borderRadius: 5, margin: 5, flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome style={{ marginLeft: 10 }}
              name="rupee"
              size={14}
              color="#343434"></FontAwesome>
            <TextInput
              value={item.salesAmount}
              onChangeText={txt => { updateMonthsData(index, 'Sales', txt) }}
              placeholder={''}
              contextMenuHidden={true}
              placeholderTextColor={Colors.lightgrey}
              keyboardType={'numeric'}
              multiline={false}
              maxLength={25}
              style={{ width: 70, color: Colors.black, overflow: 'scroll' }}
              returnKeyType={'done'}

            />
          </View>

          <View style={{ width: '30%', backgroundColor: '#0294ff20', height: 40, borderRadius: 5, margin: 5, flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome style={{ marginLeft: 10 }}
              name="rupee"
              size={14}
              color="#343434"></FontAwesome>
            <TextInput
              value={item.purchaseAmount}
              onChangeText={txt => { updateMonthsData(index, 'Purchase', txt) }}
              placeholder={''}
              contextMenuHidden={true}
              placeholderTextColor={Colors.lightgrey}
              keyboardType={'numeric'}
              multiline={false}
              maxLength={25}
              style={{ width: 70, color: Colors.black, overflow: 'scroll' }}
              returnKeyType={'done'}

            />
          </View>

        </View>

      </View >
    )

  }

  const FlatYearsView = ({ item, index }) => {


    return (
      <View style={{ width: '100%', alignItems: 'center' }}>
        <View style={{ width: '90%', alignSelf: 'center', marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>

          <View style={{ width: '20%' }}>
            <Text
              style={{
                color: Colors.mediumgrey,
                fontFamily: 'PoppinsRegular'
              }}>

            </Text>
          </View>

          <View style={{ width: '20%' }}>
            <Text
              style={{
                color: Colors.mediumgrey,
                fontFamily: 'PoppinsRegular'
              }}>
              {item.year}
            </Text>
          </View>

          <View style={{ width: '30%', backgroundColor: '#0294ff20', height: 40, borderRadius: 5, margin: 5, flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome style={{ marginLeft: 10 }}
              name="rupee"
              size={14}
              color="#343434"></FontAwesome>
            <TextInput
              value={item.salesAmount}
              onChangeText={txt => { updateYearsData(index, 'Sales', txt) }}
              placeholder={''}
              contextMenuHidden={true}
              placeholderTextColor={Colors.lightgrey}
              keyboardType={'numeric'}
              multiline={false}
              maxLength={25}
              style={{ width: 70, color: Colors.black, overflow: 'scroll' }}
              returnKeyType={'done'}

            />
          </View>

          <View style={{ width: '30%', backgroundColor: '#0294ff20', height: 40, borderRadius: 5, margin: 5, flexDirection: 'row', alignItems: 'center' }}>
            <FontAwesome style={{ marginLeft: 10 }}
              name="rupee"
              size={14}
              color="#343434"></FontAwesome>
            <TextInput
              value={item.purchaseAmount}
              onChangeText={txt => { updateYearsData(index, 'Purchase', txt) }}
              placeholder={''}
              contextMenuHidden={true}
              placeholderTextColor={Colors.lightgrey}
              keyboardType={'numeric'}
              multiline={false}
              maxLength={25}
              style={{ width: 70, color: Colors.black, overflow: 'scroll' }}
              returnKeyType={'done'}

            />
          </View>

        </View>

      </View >
    )

  }

  const postGSTDetailData = () => {
    if (validate()) {
      showBottomSheet();
      //alert(errMsg)
    } else {
      let selectedGSTData = [];
      let applicantSalesInfos = [];
      if (selectedValue == 'Available') {
        selectedGSTData = availableGSTData.filter(item => item.isSelect);
      } else {
        if (timeFrameLabel == 'MNTL') {
          applicantSalesInfos = monthsData.map(item => ({
            isActive: true,
            month: parseInt(item.month),
            year: parseInt(item.year),
            sales: parseInt(item.salesAmount),
            purchase: parseInt(item.purchaseAmount),
            verifiedSales: 0,
            verifiedPurchase: 0,
            verified: true,
          }));
        } else {
          applicantSalesInfos = yearsData.map(item => ({
            isActive: true,
            month: 0,
            year: parseInt(item.year),
            sales: parseInt(item.salesAmount),
            purchase: parseInt(item.purchaseAmount),
            verifiedSales: 0,
            verifiedPurchase: 0,
            verified: true,
          }));
        }
      }
      const appDetails = {
        "isActive": true,
        "createdBy": global.USERID,
        "createdDate": new Date(),
        "supervisedBy": global.USERID,
        "isAvailable": selectedValue == 'Available' ? true : false,
        "captureReason": captureReasonLabel,
        "timeFrame": timeFrameLabel,
        "applicantGstInfos": selectedGSTData,
        "applicantSalesInfos": applicantSalesInfos,
      }
      const baseURL = '8901';
      setLoading(true);
      apiInstancelocal(baseURL)
        .post(`/api/v2/loan-demographics/${global.TEMPAPPID}/applicant-sales-detail`, appDetails)
        .then(async response => {
          // Handle the response data
          if (global.DEBUG_MODE) console.log('PostGSTResponse::' + JSON.stringify(response.data),);

          setLoading(false);
          updateLoanStatus();
        })
        .catch(error => {
          // Handle the error
          if (global.DEBUG_MODE) console.log('PostGSTError' + JSON.stringify(error.response));
          setLoading(false);
          if (error.response.data != null) {
            setApiError(error.response.data.message);
            setErrorModalVisible(true)
          }
        });
      //insertData()
    }
  };

  const updateGSTDetailData = () => {
    if (validate()) {
      showBottomSheet();
      //alert(errMsg)
    } else {

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
        "geoClassification": '',
        "yearsAtResidence": '',
        "yearsInCurrentCityOrTown": '',
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

  const updateLoanStatus = () => {

    var module = ''; var page = '';

    if (global.CLIENTTYPE == 'APPL') {
      module = 'LN_DMGP_APLCT';
      page = 'DMGRC_APPL_GST_DTLS';
    }

    const appDetails = {
      "loanApplicationId": global.LOANAPPLICATIONID,
      "loanWorkflowStage": "LN_APP_INITIATION",
      "subStageCode": "LN_DEMGRP",
      "moduleCode": module,
      "pageCode": page,
      "status": "Completed"
    }
    const baseURL = '8901';
    setLoading(true);
    apiInstancelocal(baseURL)
      .post(`/api/v2/loan-application-status/updateStatus`, appDetails)
      .then(async response => {
        // Handle the response data
        if (global.DEBUG_MODE) console.log('UpdateStatusApiResponse::' + JSON.stringify(response.data),);
        setLoading(false);
        if (global.CLIENTTYPE == 'APPL') {
          global.COMPLETEDMODULE = 'LN_DMGP_APLCT';
          global.COMPLETEDPAGE = 'DMGRC_APPL_GST_DTLS';
        }
        props.navigation.replace('LoanDemographicsFinancialDetails');
      })
      .catch(error => {
        // Handle the error
        if (global.DEBUG_MODE) console.log('UpdateStatusApiResponse' + JSON.stringify(error.response));
        setLoading(false);

        if (error.response.data != null) {
          setApiError(error.response.data.message);
          setErrorModalVisible(true)
        }
      });

  };

  const buttonNext = () => {

    postGSTDetailData();

  }

  const onGoBack = () => {
    props.navigation.replace('LoanApplicationMain', { fromScreen: 'LoanGSTDetails' })
  }

  const closeErrorModal = () => {
    setErrorModalVisible(false);
  };

  return (
    // enclose all components in this View tag
    <SafeAreaView
      style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>
      <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
      <ErrorModal isVisible={errorModalVisible} onClose={closeErrorModal} textContent={apiError} textClose={language[0][props.language].str_ok} />
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
              onGoBack={onGoBack}
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
              <RadioButton
                value="Available"
                status={selectedValue === 'Available' ? 'checked' : 'unchecked'}
                onPress={() => setSelectedValue('Available')}
                color="#007BFF"
              />
              <Text style={{
                color: Colors.mediumgrey,
                fontSize: 14,
                fontFamily: 'Poppins-Medium',
                marginTop: 4
              }}>
                {AvailableCaption}
              </Text>
            </View>

            <View
              style={{
                width: '50%',
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <RadioButton
                value="NotAvailable"
                status={selectedValue === 'NotAvailable' ? 'checked' : 'unchecked'}
                onPress={() => setSelectedValue('NotAvailable')}
                color="#007BFF"
              />
              <Text style={{
                color: Colors.mediumgrey,
                fontSize: 14,
                fontFamily: 'Poppins-Medium',
                marginTop: 4
              }}>
                {NotAvailableCaption}
              </Text>
            </View>
          </View>

          {selectedValue == 'Available' &&
            <View>
              <View style={{ marginTop: 15 }}>

                <FlatList
                  data={availableGSTData}
                  renderItem={FlatView}
                  extraData={refreshAvailableGSTFlatlist}
                  keyExtractor={item => item.gstLabel}
                />
              </View>

              <View
                style={{
                  marginTop: 25,
                  width: '90%',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <TouchableOpacity onPress={() => AddGST()}>
                  <Text
                    style={{
                      color: Colors.darkblue,
                      fontFamily: 'Poppins-Medium'
                    }}>
                    + Add Another GST IN
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          }

          {selectedValue == 'NotAvailable' &&



            <View>

              {captureReasonVisible && (
                <View
                  style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                  <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                    <TextComp
                      textVal={captureReasonCaption}
                      textStyle={Commonstyles.inputtextStyle}
                      Visible={captureReasonMan}
                    />
                  </View>

                  <PickerComp
                    textLabel={captureReasonLabel}
                    pickerStyle={Commonstyles.picker}
                    Disable={captureReasonDisable}
                    pickerdata={captureReasonData}
                    componentName="CaptureReasonPicker"
                    handlePickerClick={handlePickerClick}
                  />
                </View>
              )}

              {timeFrameVisible && (
                <View
                  style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                  <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                    <TextComp
                      textVal={timeFrameCaption}
                      textStyle={Commonstyles.inputtextStyle}
                      Visible={timeFrameMan}
                    />
                  </View>

                  <PickerComp
                    textLabel={timeFrameLabel}
                    pickerStyle={Commonstyles.picker}
                    Disable={timeFrameDisable}
                    pickerdata={timeFrameData}
                    componentName="TimeFramePicker"
                    handlePickerClick={handlePickerClick}
                  />
                </View>
              )}

              {timeFrameLabel == 'MNTL' &&

                <View>
                  <View
                    style={{
                      marginTop: 25,
                      width: '90%',
                      flexDirection: 'row',
                      alignSelf: 'center',
                      justifyContent: 'flex-start',
                    }}>
                    <Text
                      style={{
                        color: Colors.mediumgrey,
                        fontFamily: 'Poppins-Medium'
                      }}>
                      Monthly sales info of last 12 Months
                    </Text>

                  </View>

                  <View style={{ width: '90%', alignSelf: 'center', marginTop: 25, flexDirection: 'row' }}>

                    <View style={{ width: '20%' }}>
                      <Text
                        style={{
                          color: Colors.mediumgrey,
                          fontFamily: 'Poppins-Medium'
                        }}>
                        Month
                      </Text>
                    </View>

                    <View style={{ width: '20%' }}>
                      <Text
                        style={{
                          color: Colors.mediumgrey,
                          fontFamily: 'Poppins-Medium'
                        }}>
                        Year
                      </Text>
                    </View>

                    <View style={{ width: '30%' }}>
                      <Text
                        style={{
                          color: Colors.mediumgrey,
                          fontFamily: 'Poppins-Medium'
                        }}>
                        Sales
                      </Text>
                    </View>

                    <View style={{ width: '30%' }}>
                      <Text
                        style={{
                          color: Colors.mediumgrey,
                          fontFamily: 'Poppins-Medium'
                        }}>
                        Purchase
                      </Text>
                    </View>

                  </View>

                  <View style={{ marginTop: 15 }}>

                    <FlatList
                      data={monthsData}
                      renderItem={FlatMonthsView}
                      extraData={setRefreshMonthsFlatList}
                      keyExtractor={item => item.month}
                    />
                  </View>

                  <View style={{ width: '90%', alignSelf: 'center', marginTop: 25, flexDirection: 'row', alignItems: 'center' }}>

                    <View style={{ width: '20%' }}>
                      <Text
                        style={{
                          color: Colors.mediumgrey,
                          fontFamily: 'Poppins-Medium'
                        }}>
                        Total
                      </Text>
                    </View>

                    <View style={{ width: '20%' }}>
                      <Text
                        style={{
                          color: Colors.mediumgrey,
                          fontFamily: 'Poppins-Medium'
                        }}>

                      </Text>
                    </View>

                    <View style={{ width: '30%', backgroundColor: '#0294ff20', height: 40, borderRadius: 5, margin: 5, flexDirection: 'row', alignItems: 'center' }}>
                      <FontAwesome style={{ marginLeft: 10 }}
                        name="rupee"
                        size={14}
                        color="#343434"></FontAwesome>
                      <Text
                        style={{
                          color: Colors.mediumgrey,
                          fontFamily: 'Poppins-Medium', marginLeft: 4
                        }}>
                        {totalSales}
                      </Text>
                    </View>

                    <View style={{ width: '30%', backgroundColor: '#0294ff20', height: 40, borderRadius: 5, margin: 5, flexDirection: 'row', alignItems: 'center' }}>
                      <FontAwesome style={{ marginLeft: 10 }}
                        name="rupee"
                        size={14}
                        color="#343434"></FontAwesome>
                      <Text
                        style={{
                          color: Colors.mediumgrey,
                          fontFamily: 'Poppins-Medium', marginLeft: 4
                        }}>
                        {totalPurchases}
                      </Text>
                    </View>

                  </View>

                </View>

              }


              {timeFrameLabel == 'YRL' &&

                <View>
                  <View
                    style={{
                      marginTop: 25,
                      width: '90%',
                      flexDirection: 'row',
                      alignSelf: 'center',
                      justifyContent: 'flex-start',
                    }}>
                    <Text
                      style={{
                        color: Colors.mediumgrey,
                        fontFamily: 'Poppins-Medium'
                      }}>
                      Yearly sales info of last 2 Year
                    </Text>

                  </View>

                  <View style={{ width: '90%', alignSelf: 'center', marginTop: 25, flexDirection: 'row' }}>

                    <View style={{ width: '20%' }}>
                      <Text
                        style={{
                          color: Colors.mediumgrey,
                          fontFamily: 'Poppins-Medium'
                        }}>

                      </Text>
                    </View>

                    <View style={{ width: '20%' }}>
                      <Text
                        style={{
                          color: Colors.mediumgrey,
                          fontFamily: 'Poppins-Medium'
                        }}>
                        Year
                      </Text>
                    </View>

                    <View style={{ width: '30%' }}>
                      <Text
                        style={{
                          color: Colors.mediumgrey,
                          fontFamily: 'Poppins-Medium'
                        }}>
                        Sales
                      </Text>
                    </View>

                    <View style={{ width: '30%' }}>
                      <Text
                        style={{
                          color: Colors.mediumgrey,
                          fontFamily: 'Poppins-Medium'
                        }}>
                        Purchase
                      </Text>
                    </View>

                  </View>

                  <View style={{ marginTop: 15 }}>

                    <FlatList
                      data={yearsData}
                      renderItem={FlatYearsView}
                      extraData={setRefreshYearsFlatList}
                      keyExtractor={item => item.year}
                    />
                  </View>

                  <View style={{ width: '90%', alignSelf: 'center', marginTop: 25, flexDirection: 'row', alignItems: 'center' }}>

                    <View style={{ width: '20%' }}>
                      <Text
                        style={{
                          color: Colors.mediumgrey,
                          fontFamily: 'Poppins-Medium'
                        }}>
                        Total
                      </Text>
                    </View>

                    <View style={{ width: '20%' }}>
                      <Text
                        style={{
                          color: Colors.mediumgrey,
                          fontFamily: 'Poppins-Medium'
                        }}>

                      </Text>
                    </View>

                    <View style={{ width: '30%', backgroundColor: '#0294ff20', height: 40, borderRadius: 5, margin: 5, flexDirection: 'row', alignItems: 'center' }}>
                      <FontAwesome style={{ marginLeft: 10 }}
                        name="rupee"
                        size={14}
                        color="#343434"></FontAwesome>
                      <Text
                        style={{
                          color: Colors.mediumgrey,
                          fontFamily: 'Poppins-Medium', marginLeft: 4
                        }}>
                        {totalYearSales}
                      </Text>
                    </View>

                    <View style={{ width: '30%', backgroundColor: '#0294ff20', height: 40, borderRadius: 5, margin: 5, flexDirection: 'row', alignItems: 'center' }}>
                      <FontAwesome style={{ marginLeft: 10 }}
                        name="rupee"
                        size={14}
                        color="#343434"></FontAwesome>
                      <Text
                        style={{
                          color: Colors.mediumgrey,
                          fontFamily: 'Poppins-Medium', marginLeft: 4
                        }}>
                        {totalYearPurchases}
                      </Text>
                    </View>

                  </View>

                </View>

              }

            </View>
          }

        </View>

        <ButtonViewComp
          textValue={language[0][props.language].str_submit.toUpperCase()}
          textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
          viewStyle={[Commonstyles.buttonView, { marginBottom: 20 }]}
          innerStyle={Commonstyles.buttonViewInnerStyle}
          handleClick={buttonNext}
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
  checkbox: {
    alignSelf: 'center',
  },
});

const mapStateToProps = (state) => {
  const { language } = state.languageReducer;
  const { profileDetails } = state.profileReducer;
  const { mobileCodeDetails } = state.mobilecodeReducer;
  return {
    language: language,
    profiledetail: profileDetails,
    mobilecodedetail: mobileCodeDetails
  }
}

const mapDispatchToProps = dispatch => ({
  languageAction: item => dispatch(languageAction(item)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoanDemographicsGSTDetails);
