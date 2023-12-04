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

  const pickerData = async () => {
    tbl_SystemCodeDetails
      .getSystemCodeDetailsBasedOnID('ProductType')
      .then(value => {
        if (value !== undefined && value.length > 0) {
          console.log(value);

          for (var i = 0; i < value.length; i++) {
            if (value[i].IsDefault === '1') {
              setProductTypeLabel(value[i].SubCodeID);
              setProductTypeIndex(i + 1);
            }
          }

          setProductTypeData(value);
        }
      });
  };

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


  const AddGST = () => {
    const newDataArray = [...data];
    const newObject = {
      id: newDataArray.length,
      Amount: 0,
      tname: '',
    };
    newDataArray.push(newObject);
    setdata(newDataArray);
  };

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
      const updatedIncomeList = expenseList.filter((item) => item.incomeLabel !== data.incomeLabel);
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

          <View>
            <MaterialCommunityIcons
              name="delete"
              size={20}
              onPress={() => { deleteIncomeList(item) }}
              color="#F76464"></MaterialCommunityIcons>
          </View>

        </View>

      </View >
    )

  }

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
          </View>

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
          </View>

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
          </View>

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
)(LoanDemographicsFinancialDetails);
