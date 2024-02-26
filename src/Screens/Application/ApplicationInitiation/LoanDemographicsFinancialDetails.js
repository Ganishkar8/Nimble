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
import apiInstance from '../../../Utils/apiInstance';
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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalContainer from '../../../Components/ModalContainer';
import BusinessIncome from './Financial/BusinessIncome';
import ImageComp from '../../../Components/ImageComp';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import tbl_finexpdetails from '../../../Database/Table/tbl_finexpdetails';
import ErrorModal from '../../../Components/ErrorModal';

const LoanDemographicsFinancialDetails = (props, { navigation }) => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
  const showBottomSheet = () => setBottomErrorSheetVisible(true);
  const hideBottomSheet = () => setBottomErrorSheetVisible(false);

  const [incomeModalVisible, setIncomeModalVisible] = useState(false);
  const showIncomeSheet = (label) => {

    setComponentName(label)
    setIncomeModalVisible(true)
  };
  const hideIncomeSheet = () => setIncomeModalVisible(false);

  const [incomeList, setIncomeList] = useState([]);
  const [totalBusineesIncome, setTotalBusineesIncome] = useState([]);
  const [refreshIncomeFlatlist, setRefreshIncomeFlatList] = useState(false);

  const [otherIncomeList, setotherIncomeList] = useState([]);
  const [totalOtherIncome, setOtherTotalIncome] = useState([]);
  const [refreshOtherIncomeFlatlist, setRefreshOtherIncomeFlatList] = useState(false);

  const [expenseList, setExpenseList] = useState([]);
  const [totalBusineesExpenses, setTotalBusineesExpenses] = useState([]);
  const [refreshExpenseFlatlist, setRefreshExpenseFlatList] = useState(false);

  const [otherExpenseList, setotherExpenseList] = useState([]);
  const [totalOtherExpense, setOtherTotalExpense] = useState([]);
  const [refreshOtherExpenseFlatlist, setRefreshOtherExpenseFlatList] = useState(false);


  const [earningTypeMan, setEarningTypeMan] = useState(false);
  const [earningTypeVisible, setEarningTypeVisible] = useState(true);
  const [earningTypeDisable, setEarningTypeDisable] = useState(false);
  const [earningTypeData, setEarningTypeData] = useState([]);
  const [earningTypeCaption, setEarningTypeCaption] = useState('EARNING TYPE');
  const [earningTypeLabel, setEarningTypeLabel] = useState('');
  const [earningTypeIndex, setEarningTypeIndex] = useState('');

  const [earningFrequencyMan, setEarningFrequencyMan] = useState(false);
  const [earningFrequencyVisible, setEarningFrequencyVisible] = useState(true);
  const [earningFrequencyDisable, setEarningFrequencyDisable] = useState(false);
  const [earningFrequencyData, setEarningFrequencyData] = useState([]);
  const [earningFrequencyCaption, setEarningFrequencyCaption] = useState('EARNING FREQUENCY');
  const [earningFrequencyLabel, setEarningFrequencyLabel] = useState('');
  const [earningFrequencyIndex, setEarningFrequencyIndex] = useState('');

  const [componentName, setComponentName] = useState('');

  const [ProductTypeMan, setProductTypeMan] = useState(false);
  const [ProductTypeVisible, setProductTypeVisible] = useState(true);
  const [ProductTypeDisable, setProductTypeDisable] = useState(false);
  const [ProductTypeData, setProductTypeData] = useState([]);
  const [ProductTypeCaption, setProductTypeCaption] = useState('PRODUCT TYPE');
  const [ProductTypeLabel, setProductTypeLabel] = useState('');
  const [ProductTypeIndex, setProductTypeIndex] = useState('');

  const [text, setText] = useState('');
  const [textInputValue, setTextInputValue] = useState('');
  const [isSelected, setisSelected] = useState(false);
  const [value, setvalue] = useState(1);
  const [data, setdata] = useState([{ id: 0, Amount: 0, tname: '' }]);

  const [selectedValue, setSelectedValue] = useState(false);
  const [selectedValue1, setSelectedValue1] = useState(false);
  const [AvailableCaption, setAvailableCaption] = useState('Available');
  const [NotAvailableCaption, setNotAvailableCaption] = useState('Not Available');

  const [leadsystemCodeDetail, setLeadSystemCodeDetail] = useState(props.mobilecodedetail.leadSystemCodeDto);
  const [systemCodeDetail, setSystemCodeDetail] = useState(props.mobilecodedetail.t_SystemCodeDetail);
  const [leaduserCodeDetail, setLeadUserCodeDetail] = useState(props.mobilecodedetail.leadUserCodeDto);
  const [userCodeDetail, setUserCodeDetail] = useState(props.mobilecodedetail.t_UserCodeDetail);
  const [bankUserCodeDetail, setBankUserCodeDetail] = useState(props.mobilecodedetail.t_BankUserCode);
  const [systemMandatoryField, setSystemMandatoryField] = useState(props.mobilecodedetail.processSystemMandatoryFields);
  const [errorModalVisible, setErrorModalVisible] = useState(false);
  const [apiError, setApiError] = useState('');
  const [pageId, setPageId] = useState(global.CURRENTPAGEID);
  const [onlyView, setOnlyView] = useState(false);

  useEffect(() => {
    props.navigation
      .getParent()
      ?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
    makeSystemMandatoryFields();
    getSystemCodeDetail();
    getSavedData()

    if (global.USERTYPEID == 1163 || global.ALLOWEDIT == "0") {
      setOnlyView(true);
      setEarningFrequencyDisable(true);
      setEarningTypeDisable(true);
    }


    return () =>
      props.navigation
        .getParent()
        ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
  }, [props.navigation]);

  const getSystemCodeDetail = () => {

    const filteredEarningTypeData = leaduserCodeDetail.filter((data) => data.masterId === 'EARNING_TYPE').sort((a, b) => a.Description.localeCompare(b.Description));;
    setEarningTypeData(filteredEarningTypeData);

    const filteredEarningFrequencyData = leaduserCodeDetail.filter((data) => data.masterId === 'EARNING_FREQUENCY').sort((a, b) => a.Description.localeCompare(b.Description));;
    setEarningFrequencyData(filteredEarningFrequencyData);


  }

  const getSavedData = () => {



    try {
      const filteredClients = global.LEADTRACKERDATA.clientDetail.filter((client) => client.clientType === global.CLIENTTYPE);

      if (filteredClients.length > 0) {
        if (filteredClients[0].clientFinancialDetail != undefined) {
          setEarningFrequencyLabel(filteredClients[0].clientFinancialDetail.earningFrequency)
          setEarningTypeLabel(filteredClients[0].clientFinancialDetail.earningType)
        }
      }
    }
    catch (err) {

    }

    let totalExpenses = 0, totalOtherexpense = 0, totalIncome = 0, totalotherIncome = 0;
    tbl_finexpdetails.getFinExpDetails(global.LOANAPPLICATIONID,
      global.CLIENTID,
      global.CLIENTTYPE, 'BUSINESS_INCOME').then(data => {
        if (global.DEBUG_MODE) console.log('BUSINESS_INCOME Detail:', JSON.stringify(data));
        const newData = data.map(item => {
          const extraJson = { colorCode: 'Green' };
          totalIncome += parseInt(item.Amount);
          return { ...item, ...extraJson };
        });
        setIncomeList(newData)
        setTotalBusineesIncome(totalIncome)
      })
      .catch(error => {
        if (global.DEBUG_MODE) console.error('Error fetching BUSINESS_INCOME details:', error);
      });
    tbl_finexpdetails.getFinExpDetails(global.LOANAPPLICATIONID,
      global.CLIENTID,
      global.CLIENTTYPE, 'OTHER_SOURCE_INCOME').then(data => {
        if (global.DEBUG_MODE) console.log('OTHER_SOURCE_INCOME Detail:', JSON.stringify(data));
        const newData = data.map(item => {
          const extraJson = { colorCode: 'Green' };
          totalotherIncome += parseInt(item.Amount);
          return { ...item, ...extraJson };
        });

        setOtherTotalIncome(totalotherIncome);
        setotherIncomeList(newData)
      })
      .catch(error => {
        if (global.DEBUG_MODE) console.error('Error fetching OTHER_SOURCE_INCOME details:', error);
      });
    tbl_finexpdetails.getFinExpDetails(global.LOANAPPLICATIONID,
      global.CLIENTID,
      global.CLIENTTYPE, 'BUSINESS_EXPENSES').then(data => {
        if (global.DEBUG_MODE) console.log('BUSINESS_EXPENSES Detail:', JSON.stringify(data));
        const newData = data.map(item => {
          const extraJson = { colorCode: 'Red' };
          totalExpenses += parseInt(item.Amount);
          return { ...item, ...extraJson };
        });
        setTotalBusineesExpenses(totalExpenses)
        setExpenseList(newData);
      })
      .catch(error => {
        if (global.DEBUG_MODE) console.error('Error fetching BUSINESS_EXPENSES details:', error);
      });
    tbl_finexpdetails.getFinExpDetails(global.LOANAPPLICATIONID,
      global.CLIENTID,
      global.CLIENTTYPE, 'OTHER_SOURCE_EXPENSES').then(data => {
        if (global.DEBUG_MODE) console.log('OTHER_SOURCE_EXPENSES Detail:', JSON.stringify(data));
        const newData = data.map(item => {
          const extraJson = { colorCode: 'Red' };
          totalOtherexpense += parseInt(item.Amount);
          return { ...item, ...extraJson };
        });
        setOtherTotalExpense(totalOtherexpense)
        setotherExpenseList(newData)
      })
      .catch(error => {
        if (global.DEBUG_MODE) console.error('Error fetching OTHER_SOURCE_EXPENSES details:', error);
      });

    // tbl_finexpdetails.getFinExpDetailsAll(global.LOANAPPLICATIONID,
    //   global.CLIENTID,
    //   global.CLIENTTYPE).then(data => {
    //     if (global.DEBUG_MODE) console.log('All Detail:', JSON.stringify(data));
    //     setotherExpenseList(data)
    //   })
    //   .catch(error => {
    //     if (global.DEBUG_MODE) console.error('Error fetching OTHER_SOURCE_EXPENSES details:', error);
    //   });
  }


  const onGoBack = () => {
    props.navigation.replace('LoanApplicationMain', { fromScreen: 'LoanFinancialDetail' })
  }

  const makeSystemMandatoryFields = () => {

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_ern_typ' && data.pageId === pageId).map((value, index) => {

      if (value.isMandatory) {
        setEarningTypeMan(true);
      }
      if (value.isHide) {
        setEarningTypeVisible(false);
      }
      if (value.isDisable) {
        setEarningTypeDisable(true);
      }
      if (value.isCaptionChange) {
        setEarningTypeCaption(value[0].fieldCaptionChange)
      }
    });

    systemMandatoryField.filter((data) => data.fieldUiid === 'sp_ern_frq' && data.pageId === pageId).map((value, index) => {

      if (value.isMandatory) {
        setEarningFrequencyMan(true);
      }
      if (value.isHide) {
        setEarningFrequencyVisible(false);
      }
      if (value.isDisable) {
        setEarningFrequencyDisable(true);
      }
      if (value.isCaptionChange) {
        setEarningFrequencyCaption(value[0].fieldCaptionChange)
      }
    });

  };

  const validate = () => {
    var flag = false;
    var i = 1;
    var errorMessage = '';

    if (earningTypeMan && earningTypeVisible) {
      if (earningTypeLabel.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + earningTypeCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (earningFrequencyMan && earningFrequencyVisible) {
      if (earningFrequencyLabel.length <= 0) {
        errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + earningFrequencyCaption + '\n';
        i++;
        flag = true;
      }
    }

    if (incomeList.length <= 0) {
      errorMessage = errorMessage + i + ')' + ' ' + 'Please Add ' + 'Business Income' + '\n';
      i++;
      flag = true;
    }

    if (otherIncomeList.length <= 0) {
      errorMessage = errorMessage + i + ')' + ' ' + 'Please Add ' + 'Other Source of Income' + '\n';
      i++;
      flag = true;
    }

    if (expenseList.length <= 0) {
      errorMessage = errorMessage + i + ')' + ' ' + 'Please Add ' + 'Business Expense' + '\n';
      i++;
      flag = true;
    }

    if (otherExpenseList.length <= 0) {
      errorMessage = errorMessage + i + ')' + ' ' + 'Please Add' + 'Other Source of Expense' + '\n';
      i++;
      flag = true;
    }

    setErrMsg(errorMessage);
    return flag;
  };


  const handleClick = (index, textValue) => {
    //alert(index);
    //setdata([...data, {id: 0, Amount: 0, tname: textValue}]);
  };

  const handleReference = componentName => { };

  const handlePickerClick = (componentName, label, index) => {
    if (componentName == 'EarningTypePicker') {
      setEarningTypeLabel(label);
      setEarningTypeIndex(index);
    } else if (componentName == 'EarningFrequencyPicker') {
      setEarningFrequencyLabel(label);
      setEarningFrequencyIndex(index);
    }
  };

  function isMultipleOf5000(number) {
    return number % 5000 === 0;
  }

  const addIncome = (incomeValue, incomeAmount, componentName) => {

    if (componentName == 'Income') {

      const newDataArray = [...incomeList];
      const newObject = {
        incomeLabel: incomeValue,
        Amount: incomeAmount,
        usercode: 'BUSINESS_INCOME',
        colorCode: 'Green',
      };
      newDataArray.push(newObject);

      const totalAmount = newDataArray.reduce((sum, incomeItem) => sum + parseFloat(incomeItem.Amount), 0);
      setTotalBusineesIncome(totalAmount)
      setIncomeList(newDataArray);

      setRefreshIncomeFlatList(!refreshIncomeFlatlist)
    } else if (componentName == 'OtherIncome') {
      const newDataArray = [...otherIncomeList];
      const newObject = {
        incomeLabel: incomeValue,
        Amount: incomeAmount,
        usercode: 'OTHER_SOURCE_INCOME',
        colorCode: 'Green',
      };
      newDataArray.push(newObject);
      const totalAmount = newDataArray.reduce((sum, incomeItem) => sum + parseFloat(incomeItem.Amount), 0);
      setOtherTotalIncome(totalAmount)
      setotherIncomeList(newDataArray);
    } else if (componentName == 'Expenses') {
      const newDataArray = [...expenseList];
      const newObject = {
        incomeLabel: incomeValue,
        Amount: incomeAmount,
        usercode: 'BUSINESS_EXPENSES',
        colorCode: 'Red',
      };
      newDataArray.push(newObject);
      const totalAmount = newDataArray.reduce((sum, incomeItem) => sum + parseFloat(incomeItem.Amount), 0);
      setTotalBusineesExpenses(totalAmount)
      setExpenseList(newDataArray);
    } else if (componentName == 'OtherExpense') {
      const newDataArray = [...otherExpenseList];
      const newObject = {
        incomeLabel: incomeValue,
        Amount: incomeAmount,
        usercode: 'OTHER_SOURCE_EXPENSES',
        colorCode: 'Red',
      };
      newDataArray.push(newObject);
      const totalAmount = newDataArray.reduce((sum, incomeItem) => sum + parseFloat(incomeItem.Amount), 0);
      setOtherTotalExpense(totalAmount)
      setotherExpenseList(newDataArray);
    }
  };

  const deleteIncomeList = (data) => {
    if (data.usercode == 'BUSINESS_INCOME') {
      const updatedIncomeList = incomeList.filter((item) => item.incomeLabel !== data.incomeLabel);
      const totalAmount = updatedIncomeList.reduce((sum, incomeItem) => sum + parseFloat(incomeItem.Amount), 0);
      setTotalBusineesIncome(totalAmount)
      setIncomeList(updatedIncomeList);
      setRefreshIncomeFlatList(!refreshIncomeFlatlist)
    } else if (data.usercode == 'OTHER_SOURCE_INCOME') {
      const updatedIncomeList = otherIncomeList.filter((item) => item.incomeLabel !== data.incomeLabel);
      const totalAmount = updatedIncomeList.reduce((sum, incomeItem) => sum + parseFloat(incomeItem.Amount), 0);
      setOtherTotalIncome(totalAmount)
      setotherIncomeList(updatedIncomeList);
      setRefreshOtherIncomeFlatList(!refreshOtherIncomeFlatlist)
    } else if (data.usercode == 'BUSINESS_EXPENSES') {
      const updatedIncomeList = expenseList.filter((item) => item.incomeLabel !== data.incomeLabel);
      const totalAmount = updatedIncomeList.reduce((sum, incomeItem) => sum + parseFloat(incomeItem.Amount), 0);
      setTotalBusineesExpenses(totalAmount)
      setExpenseList(updatedIncomeList);
      setRefreshExpenseFlatList(!refreshExpenseFlatlist)
    } else if (data.usercode == 'OTHER_SOURCE_EXPENSES') {
      const updatedIncomeList = otherExpenseList.filter((item) => item.incomeLabel !== data.incomeLabel);
      const totalAmount = updatedIncomeList.reduce((sum, incomeItem) => sum + parseFloat(incomeItem.Amount), 0);
      setOtherTotalExpense(totalAmount)
      setotherExpenseList(updatedIncomeList);
      setRefreshOtherExpenseFlatList(!refreshOtherExpenseFlatlist)
    }
  }

  const FlatView = ({ item }) => {


    return (
      <View style={{ width: '100%', alignItems: 'center', marginTop: 15 }}>
        <View style={{ width: '90%', minHeight: 100, backgroundColor: item.colorCode == 'Green' ? '#B6F4B470' : '#FFEAE5', borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>

          <ImageComp imageSrc={item.colorCode == 'Green' ? require('../../../Images/income.png') : require('../../../Images/expense.png')} imageStylee={{ marginLeft: 10, width: 30, height: 30 }} />

          <View style={{ width: '80%' }}>

            <Text style={{ width: '80%', fontSize: 12, fontFamily: 'PoppinsRegular', marginTop: 5, color: Colors.black, marginLeft: 10 }}>
              {Common.getSystemCodeDescription(props.mobilecodedetail.leadUserCodeDto, item.usercode, item.incomeLabel)}
            </Text>

            <Text style={{ width: '80%', fontSize: 12, fontFamily: 'Poppins-Medium', marginTop: 5, color: Colors.black, marginLeft: 10 }}>
              <FontAwesome
                name="rupee"
                size={10.9}
                color="#343434"></FontAwesome> {item.Amount}
            </Text>

          </View>

          {!onlyView &&
            <View>
              <MaterialCommunityIcons
                name="delete"
                size={20}
                onPress={() => { deleteIncomeList(item) }}
                color="#F76464"></MaterialCommunityIcons>
            </View>}

        </View>

      </View >
    )

  }

  const callFinancialData = async () => {

    if (onlyView) {
      if (global.CLIENTTYPE == 'APPL') {
        page = 'DMGRC_APPL_BNK_DTLS';
      } else if (global.CLIENTTYPE == 'CO-APPL') {
        page = 'DMGRC_COAPPL_BNK_DTLS';
      } else if (global.CLIENTTYPE == 'GRNTR') {
        page = 'DMGRC_GRNTR_BNK_DTLS';
      }
      await Common.getPageStatus(global.FILTEREDPROCESSMODULE, page)

      navigatetoBank();
      return;
    }

    postFinancialData();

  }

  const postFinancialData = () => {
    if (validate()) {
      showBottomSheet();
    } else {
      console.log('IncomeSaveData::', "IncomeList::" + JSON.stringify(incomeList) + '\n' + "OtherIncomeList::" + JSON.stringify(otherIncomeList));
      console.log('IncomeSaveDataTotal::', "TotalIncome::" + totalBusineesIncome + '\n' + "TotalOtherIncome::" + totalOtherIncome);
      console.log('ExpenseSaveData::', "ExpenseList::" + JSON.stringify(expenseList) + '\n' + "OtherExpenseList::" + JSON.stringify(otherExpenseList));
      console.log('ExpenseSaveDataTotal::', "TotalExpense::" + totalBusineesExpenses + '\n' + "TotalOtherExpense::" + totalOtherExpense);
      var AvgMonthlyIncome = parseInt(totalBusineesIncome) + parseInt(totalOtherIncome)
      var AvgMonthlyExpense = parseInt(totalBusineesExpenses) + parseInt(totalOtherExpense)
      console.log('IncomeSize::', incomeList.length);
      const mergedIncomeArray = [...incomeList, ...otherIncomeList];
      const mergedExpenseArray = [...expenseList, ...otherExpenseList];
      const mergedArray = [...incomeList, ...otherIncomeList, ...expenseList, ...otherExpenseList];
      console.log('MergedIncomeArray::', mergedIncomeArray);
      console.log('MergedExpenseArray::', mergedExpenseArray);
      console.log('MergedTotalArray::', mergedArray);
      const incomeOfObjects = [];
      for (let i = 0; i < mergedIncomeArray.length; i++) {
        incomeOfObjects.push({
          "incomeType": mergedIncomeArray[i].incomeLabel,
          "incomeAmount": parseInt(mergedIncomeArray[i].Amount),
          "parentIncomeType": mergedIncomeArray[i].usercode,
        })
      }

      const expenseOfObjects = [];
      for (let i = 0; i < mergedExpenseArray.length; i++) {
        expenseOfObjects.push({
          "expensesType": mergedExpenseArray[i].incomeLabel,
          "expenseAmount": parseInt(mergedExpenseArray[i].Amount),
          "parentExpenseType": mergedExpenseArray[i].usercode,
        })
      }


      console.log('IncomeOfObjects::', incomeOfObjects);
      console.log('ExpenseOfObjects::', expenseOfObjects);

      const appDetails = {
        "earningType": earningTypeLabel,
        "earningFrequency": earningFrequencyLabel,
        "totalBusinessIncome": parseInt(totalBusineesIncome),
        "totalOtherSourceIncome": parseInt(totalOtherIncome),
        "totalAvgMonthlyIncome": parseInt(totalBusineesIncome) + parseInt(totalOtherIncome),
        "totalBusinessExpense": parseInt(totalBusineesExpenses),
        "totalOtherSourceExpense": parseInt(totalOtherExpense),
        "totalAvgMonthlyExpense": parseInt(totalBusineesExpenses) + parseInt(totalOtherExpense),
        "createdBy": global.USERID,
        "createdDate": new Date(),
        "clientIncomeDetails": incomeOfObjects,
        "clientExpenseDetails": expenseOfObjects
      }
      const baseURL = global.PORT1;
      setLoading(true);
      apiInstance(baseURL)
        .post(`/api/v2/loan-demographics/${global.CLIENTID}/financialDetail`, appDetails)
        .then(async response => {
          // Handle the response data
          if (global.DEBUG_MODE) console.log('PostFinancialResponse::' + JSON.stringify(response.data),);
          setLoading(false);
          if (response.status == 200) {
            insertData(mergedArray);
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
          if (global.DEBUG_MODE) console.log('PostFinancialError' + JSON.stringify(error.response));
          setLoading(false);
          if (error.response.status == 404) {
            setApiError(Common.error404);
            setErrorModalVisible(true)
          } else if (error.response.status == 400) {
            setApiError(Common.error400);
            setErrorModalVisible(true)
          } else if (error.response.status == 500) {
            setApiError(Common.error500);
            setErrorModalVisible(true)
          } else if (error.response.data != null) {
            setApiError(error.response.data.message);
            setErrorModalVisible(true)
          }
        });

    }
  }

  const navigatetoBank = async () => {
    var page = '';
    if (global.CLIENTTYPE == 'APPL') {
      page = 'DMGRC_APPL_BNK_DTLS';
    } else if (global.CLIENTTYPE == 'CO-APPL') {
      page = 'DMGRC_COAPPL_BNK_DTLS';
    } else if (global.CLIENTTYPE == 'GRNTR') {
      page = 'DMGRC_GRNTR_BNK_DTLS';
    }
    await Common.getPageID(global.FILTEREDPROCESSMODULE, page)
    props.navigation.replace('BankList');
  }

  const updateLoanStatus = () => {

    var module = ''; var page = '';

    if (global.CLIENTTYPE == 'APPL') {
      module = 'LN_DMGP_APLCT';
      page = 'DMGRC_APPL_FNCL_DTLS';
    } else if (global.CLIENTTYPE == 'CO-APPL') {
      module = 'LN_DMGP_COAPLCT';
      page = 'DMGRC_COAPPL_FNCL_DTLS';
    } else if (global.CLIENTTYPE == 'GRNTR') {
      module = 'LN_DMGP_GRNTR';
      page = 'DMGRC_GRNTR_FNCL_DTLS';
    }

    const appDetails = {
      "loanApplicationId": global.LOANAPPLICATIONID,
      "loanWorkflowStage": "LN_APP_INITIATION",
      "subStageCode": "LN_DEMGRP",
      "moduleCode": module,
      "pageCode": page,
      "status": "Completed"
    }
    const baseURL = global.PORT1;
    setLoading(true);
    apiInstance(baseURL)
      .post(`/api/v2/loan-application-status/updateStatus`, appDetails)
      .then(async response => {
        // Handle the response data
        if (global.DEBUG_MODE) console.log('UpdateStatusApiResponse::' + JSON.stringify(response.data),);
        setLoading(false);
        if (response.status == 200) {
          if (global.CLIENTTYPE == 'APPL') {
            global.COMPLETEDMODULE = 'LN_DMGP_APLCT';
            global.COMPLETEDPAGE = 'DMGRC_APPL_FNCL_DTLS';
          } else if (global.CLIENTTYPE == 'CO-APPL') {
            global.COMPLETEDMODULE = 'LN_DMGP_COAPLCT';
            global.COMPLETEDPAGE = 'DMGRC_COAPPL_FNCL_DTLS';
          } else if (global.CLIENTTYPE == 'GRNTR') {
            global.COMPLETEDMODULE = 'LN_DMGP_GRNTR';
            global.COMPLETEDPAGE = 'DMGRC_GRNTR_FNCL_DTLS';
          }
          navigatetoBank();
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
        if (global.DEBUG_MODE) console.log('UpdateStatusApiResponse' + JSON.stringify(error.response));
        setLoading(false);

        if (error.response.status == 404) {
          setApiError(Common.error404);
          setErrorModalVisible(true)
        } else if (error.response.status == 400) {
          setApiError(Common.error400);
          setErrorModalVisible(true)
        } else if (error.response.status == 500) {
          setApiError(Common.error500);
          setErrorModalVisible(true)
        } else if (error.response.data != null) {
          setApiError(error.response.data.message);
          setErrorModalVisible(true)
        }
      });

  };

  const insertData = (mergedArray) => {

    for (let i = 0; i < mergedArray.length; i++) {
      tbl_finexpdetails.insertIncExpDetails(
        global.LOANAPPLICATIONID,
        global.CLIENTID,
        global.CLIENTTYPE,
        '',
        mergedArray[i].usercode,
        mergedArray[i].incomeLabel,
        mergedArray[i].Amount,
      ).then(result => {
        if (global.DEBUG_MODE) console.log('Inserted Financial detail:', result);
      })
        .catch(error => {
          if (global.DEBUG_MODE) console.error('Error Inserting Financial detail:', error);
        });
    }

    updateLoanStatus();

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
              props={props} onGoBack={onGoBack}
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
                  fontFamily: 'Poppins-Medium'
                }}
                textVal={language[0][props.language].str_financialdetails}></TextComp>

              <ProgressComp progressvalue={0.6} textvalue="4 of 6" />
            </View>
          </View>

          <View style={{ width: '100%', alignItems: 'center', marginTop: '3%' }}>
            <View style={{ width: '90%', marginTop: 10 }}>
              <TextComp
                textStyle={{
                  color: Colors.mediumgrey,
                  fontSize: 15,
                  fontFamily: 'Poppinsregular'
                }}
                textVal={language[0][props.language].str_incomedetails.toUpperCase()}></TextComp>
            </View>

            {earningTypeVisible && (
              <View
                style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                  <TextComp
                    textVal={earningTypeCaption}
                    textStyle={Commonstyles.inputtextStyle}
                    Visible={earningTypeMan}
                  />
                </View>

                <PickerComp
                  textLabel={earningTypeLabel}
                  pickerStyle={Commonstyles.picker}
                  Disable={earningTypeDisable}
                  pickerdata={earningTypeData}
                  componentName="EarningTypePicker"
                  handlePickerClick={handlePickerClick}
                />
              </View>
            )}

            {earningFrequencyVisible && (
              <View
                style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                  <TextComp
                    textVal={earningFrequencyCaption}
                    textStyle={Commonstyles.inputtextStyle}
                    Visible={earningFrequencyMan}
                  />
                </View>

                <PickerComp
                  textLabel={earningFrequencyLabel}
                  pickerStyle={Commonstyles.picker}
                  Disable={earningFrequencyDisable}
                  pickerdata={earningFrequencyData}
                  componentName="EarningFrequencyPicker"
                  handlePickerClick={handlePickerClick}
                />
              </View>
            )}

            <ModalContainer
              visible={incomeModalVisible}
              closeModal={hideIncomeSheet}
              modalstyle={styles.modalContent}
              contentComponent={<BusinessIncome addIncome={addIncome} onCloseIncome={hideIncomeSheet} incomeList={incomeList} otherIncomeList={otherIncomeList} componentName={componentName} />} // Pass your custom component here
            />

          </View>


          <View
            style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
            <View style={{ width: '90%' }}>
              <TextComp
                textStyle={{
                  color: Colors.black,
                  fontSize: 15,
                  fontFamily: 'Poppinsregular'
                }}
                textVal={language[0][props.language].str_businessincome.toUpperCase()}></TextComp>
            </View>
          </View>



          <View style={{ marginTop: 15 }}>

            <FlatList
              data={incomeList}
              renderItem={FlatView}
              extraData={refreshIncomeFlatlist}
              keyExtractor={item => item.incomeLabel}
            />
          </View>

          {!onlyView &&
            <View
              style={{
                marginTop: 25,
                width: '90%',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>

              <TouchableOpacity onPress={() => showIncomeSheet('Income')}>
                <Text
                  style={{
                    color: Colors.darkblue,
                    fontFamily: 'Poppins-Medium'
                  }}>
                  + Add Income
                </Text>
              </TouchableOpacity>

            </View>}

          {incomeList.length > 0 &&
            <View style={{ width: '100%', marginTop: '3%', alignItems: 'center' }}>
              <View style={{ width: '90%', marginTop: 10 }}>
                <TextComp
                  textStyle={{
                    color: Colors.black,
                    fontSize: 14,
                    fontFamily: 'Poppins-SemiBold'
                  }}
                  textVal={language[0][props.language].str_totbusincome.toUpperCase()}></TextComp>

                <Text style={{ fontSize: 14, fontFamily: 'Poppins-Medium', marginTop: 5, color: Colors.black }}>
                  <FontAwesome
                    name="rupee"
                    size={10.9}
                    color="#343434"></FontAwesome> {totalBusineesIncome}
                </Text>

              </View>



            </View>
          }


          <View
            style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
            <View style={{ width: '90%' }}>
              <TextComp
                textStyle={{
                  color: Colors.black,
                  fontSize: 15,
                  fontFamily: 'Poppinsregular'
                }}
                textVal={language[0][props.language].str_othsourceincome.toUpperCase()}></TextComp>
            </View>
          </View>

          <View style={{ marginTop: 15 }}>
            <FlatList
              data={otherIncomeList}
              renderItem={FlatView}
              extraData={refreshOtherIncomeFlatlist}
              keyExtractor={item => item.incomeLabel}
            />
          </View>

          {!onlyView &&
            <View
              style={{
                marginTop: 25,
                width: '90%',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity onPress={() => showIncomeSheet('OtherIncome')}>
                <Text
                  style={{
                    color: Colors.darkblue,
                    fontFamily: 'Poppins-Medium'
                  }}>
                  + Add Other Income
                </Text>
              </TouchableOpacity>
            </View>
          }
          {otherIncomeList.length > 0 &&
            <View style={{ width: '100%', marginTop: '3%', alignItems: 'center' }}>
              <View style={{ width: '90%', marginTop: 10 }}>
                <TextComp
                  textStyle={{
                    color: Colors.black,
                    fontSize: 14,
                    fontFamily: 'Poppins-SemiBold'
                  }}
                  textVal={language[0][props.language].str_totothsourceincome.toUpperCase()}></TextComp>

                <Text style={{ fontSize: 14, fontFamily: 'Poppins-Medium', marginTop: 5, color: Colors.black }}>
                  <FontAwesome
                    name="rupee"
                    size={10.9}
                    color="#343434"></FontAwesome> {totalOtherIncome}
                </Text>

              </View>



            </View>
          }

          {otherIncomeList.length > 0 && incomeList.length > 0 &&
            <View style={{ width: '100%', marginTop: '3%', alignItems: 'center' }}>
              <View style={{ width: '90%', marginTop: 10 }}>
                <TextComp
                  textStyle={{
                    color: Colors.black,
                    fontSize: 14,
                    fontFamily: 'Poppins-SemiBold'
                  }}
                  textVal={language[0][props.language].str_totavgmntincome.toUpperCase()}></TextComp>

                <Text style={{ fontSize: 14, fontFamily: 'Poppins-Medium', marginTop: 5, color: Colors.black }}>
                  <FontAwesome
                    name="rupee"
                    size={10.9}
                    color="#343434"></FontAwesome> {totalOtherIncome + totalBusineesIncome}
                </Text>

              </View>



            </View>
          }


          <View
            style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
            <View style={{ width: '90%' }}>
              <TextComp
                textStyle={{
                  color: Colors.black,
                  fontSize: 15,
                  fontFamily: 'Poppinsregular'
                }}
                textVal={language[0][props.language].str_expensedetails.toUpperCase()}></TextComp>
            </View>
          </View>

          <View
            style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
            <View style={{ width: '90%' }}>
              <TextComp
                textStyle={{
                  color: Colors.black,
                  fontSize: 15,
                  fontFamily: 'Poppinsregular'
                }}
                textVal={language[0][props.language].str_businessexpdetails.toUpperCase()}></TextComp>
            </View>
          </View>



          <View style={{ marginTop: 15 }}>

            <FlatList
              data={expenseList}
              renderItem={FlatView}
              extraData={refreshExpenseFlatlist}
              keyExtractor={item => item.incomeLabel}
            />
          </View>

          {!onlyView &&
            <View
              style={{
                marginTop: 25,
                width: '90%',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity onPress={() => showIncomeSheet('Expenses')}>
                <Text
                  style={{
                    color: Colors.darkblue,
                    fontFamily: 'Poppins-Medium'
                  }}>
                  + Add Expenses
                </Text>
              </TouchableOpacity>
            </View>}

          {expenseList.length > 0 &&
            <View style={{ width: '100%', marginTop: '3%', alignItems: 'center' }}>
              <View style={{ width: '90%', marginTop: 10 }}>
                <TextComp
                  textStyle={{
                    color: Colors.black,
                    fontSize: 14,
                    fontFamily: 'Poppins-SemiBold'
                  }}
                  textVal={language[0][props.language].str_totbusexpenses.toUpperCase()}></TextComp>

                <Text style={{ fontSize: 14, fontFamily: 'Poppins-Medium', marginTop: 5, color: Colors.black }}>
                  <FontAwesome
                    name="rupee"
                    size={10.9}
                    color="#343434"></FontAwesome> {totalBusineesExpenses}
                </Text>

              </View>



            </View>
          }



          <View
            style={{ width: '100%', alignItems: 'center', marginTop: 20 }}>
            <View style={{ width: '90%' }}>
              <TextComp
                textStyle={{
                  color: Colors.black,
                  fontSize: 15,
                  fontFamily: 'Poppinsregular'
                }}
                textVal={language[0][props.language].str_othexpenses.toUpperCase()}></TextComp>
            </View>
          </View>

          <View style={{ marginTop: 15 }}>
            <FlatList
              data={otherExpenseList}
              renderItem={FlatView}
              extraData={refreshOtherExpenseFlatlist}
              keyExtractor={item => item.incomeLabel}
            />
          </View>

          {!onlyView &&
            <View
              style={{
                marginTop: 25,
                width: '90%',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <TouchableOpacity onPress={() => showIncomeSheet('OtherExpense')}>
                <Text
                  style={{
                    color: Colors.darkblue,
                    fontFamily: 'Poppins-Medium'
                  }}>
                  + Add Other Expenses
                </Text>
              </TouchableOpacity>
            </View>}

          {otherExpenseList.length > 0 &&
            <View style={{ width: '100%', marginTop: '3%', alignItems: 'center' }}>
              <View style={{ width: '90%', marginTop: 10 }}>
                <TextComp
                  textStyle={{
                    color: Colors.black,
                    fontSize: 14,
                    fontFamily: 'Poppins-SemiBold'
                  }}
                  textVal={language[0][props.language].str_totothexpenses.toUpperCase()}></TextComp>

                <Text style={{ fontSize: 14, fontFamily: 'Poppins-Medium', marginTop: 5, color: Colors.black }}>
                  <FontAwesome
                    name="rupee"
                    size={10.9}
                    color="#343434"></FontAwesome> {totalOtherExpense}
                </Text>

              </View>



            </View>
          }

          {otherExpenseList.length > 0 && expenseList.length > 0 &&
            <View style={{ width: '100%', marginTop: '3%', alignItems: 'center' }}>
              <View style={{ width: '90%', marginTop: 10 }}>
                <TextComp
                  textStyle={{
                    color: Colors.black,
                    fontSize: 14,
                    fontFamily: 'Poppins-SemiBold'
                  }}
                  textVal={language[0][props.language].str_totavgmntexpenses.toUpperCase()}></TextComp>

                <Text style={{ fontSize: 14, fontFamily: 'Poppins-Medium', marginTop: 5, color: Colors.black }}>
                  <FontAwesome
                    name="rupee"
                    size={10.9}
                    color="#343434"></FontAwesome> {totalBusineesExpenses + totalOtherExpense}
                </Text>

              </View>



            </View>
          }
          <ButtonViewComp
            textValue={language[0][props.language].str_next.toUpperCase()}
            textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
            viewStyle={Commonstyles.buttonView}
            innerStyle={Commonstyles.buttonViewInnerStyle}
            handleClick={callFinancialData}
          />



        </View>

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
  textinputtextStyle: {
    width: '90%',
    fontSize: 15,
    fontWeight: '350',
    height: 37,
  },

  inputtextStyle: {
    color: Colors.darkblack,
    fontSize: 13,
    paddingHorizontal: 0,
    fontWeight: '400',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  checkbox: {
    alignSelf: 'center',
  },
  modalContent: {
    width: '90%',  // Set width to 90% of the screen width
    aspectRatio: 1,
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 20,
    alignItems: 'center',
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
)(LoanDemographicsFinancialDetails);
