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
import apiInstance from '../../Utils/apiInstance';
import Colors from '../../Utils/Colors';
import MyStatusBar from '../../Components/MyStatusBar';
import Loading from '../../Components/Loading';
import TextComp from '../../Components/TextComp';
import { connect } from 'react-redux';
import { languageAction } from '../../Utils/redux/actions/languageAction';
import { language } from '../../Utils/LanguageString';
import Commonstyles from '../../Utils/Commonstyles';
import HeadComp from '../../Components/HeadComp';
import ProgressComp from '../../Components/ProgressComp';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Common from '../../Utils/Common';
import TextInputComp from '../../Components/TextInputComp';
import PickerComp from '../../Components/PickerComp';
import ButtonViewComp from '../../Components/ButtonViewComp';
import ErrorMessageModal from '../../Components/ErrorMessageModal';
import ChildHeadComp from '../../Components/ChildHeadComp';
import CheckBoxComp from '../../Components/CheckBoxComp';
import { RadioButton } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ModalContainer from '../../Components/ModalContainer';
import BusinessIncome from '../Application/ApplicationInitiation/Financial/BusinessIncome';
import ImageComp from '../../Components/ImageComp';
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import tbl_finexpdetails from '../../Database/Table/tbl_finexpdetails';
import ErrorModal from '../../Components/ErrorModal';
import { updatePDModule, updatePDSubStage, updatePDSubModule, updatePDPage } from '../../Utils/redux/actions/PDAction';

const PDFinancialVerification = (props, { navigation }) => {
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

    const [currentPageId, setCurrentPageId] = useState(props.pageId);
    const [currentPageCode, setCurrentPageCode] = useState(props.pageCode);
    const [currentPageDesc, setCurrentPageDesc] = useState(props.pageDesc);
    const [currentPageMan, setCurrentPageMan] = useState(props.pageMandatory);
    const [parentDocId, setParentDocId] = useState(0);
    const [currentItem, setCurrentItem] = useState([]);
    const [parentFinancialId, setParentFinancialId] = useState(0);


    useEffect(() => {

        makeSystemMandatoryFields();
        getSystemCodeDetail();
        // getSavedData()
        getFinancialData();

        setEarningFrequencyDisable(true);
        setEarningTypeDisable(true);



    }, []);

    const getSystemCodeDetail = () => {

        const filteredEarningTypeData = leaduserCodeDetail.filter((data) => data.masterId === 'EARNING_TYPE').sort((a, b) => a.Description.localeCompare(b.Description));;
        setEarningTypeData(filteredEarningTypeData);

        const filteredEarningFrequencyData = leaduserCodeDetail.filter((data) => data.masterId === 'EARNING_FREQUENCY').sort((a, b) => a.Description.localeCompare(b.Description));;
        setEarningFrequencyData(filteredEarningFrequencyData);


    }

    const getFinancialData = () => {

        const baseURL = global.PORT1;
        setLoading(true)

        const appDetails = {
            "clientId": global.CLIENTID,
            "pdLevel": global.PDSTAGE,
        }

        // if (global.PDSTAGE == 'PD_2') {

        //     if (currentPageCode == 'PG_FN_DTLS_VRF_APPL') {
        //         appDetails.previousPage = 10;
        //     } else if (currentPageCode == 'PG_FN_DTLS_VRF_CO_APPL') {
        //         appDetails.previousPage = 22;
        //     } else if (currentPageCode == 'PG_FN_DTLS_VRF_GRNTR') {
        //         appDetails.previousPage = 34;
        //     }

        // } else if (global.PDSTAGE == 'PD_3') {
        //     if (currentPageCode == 'PG_FN_DTLS_VRF_APPL') {
        //         appDetails.previousPage = 47;
        //     } else if (currentPageCode == 'PG_FN_DTLS_VRF_CO_APPL') {
        //         appDetails.previousPage = 59;
        //     } else if (currentPageCode == 'PG_FN_DTLS_VRF_GRNTR') {
        //         appDetails.previousPage = 71;
        //     }
        // }

        apiInstance(baseURL).post(`/api/v1/pd/PDFinancialDetailsVerification/previousData`, appDetails)
            .then((response) => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log("ResponseDataApi::" + JSON.stringify(response.data));

                if (response.status == 200) {
                    setLoading(false)
                    if (response.data === '') {
                        //getDocuments([]);
                    } else {
                        //setParentFinancialId(response.data.id);
                        getSavedData(response.data[0]);
                    }

                }
                else if (response.data.statusCode === 201) {
                    setLoading(false)
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                } else if (response.data.statusCode === 202) {
                    setLoading(false)
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                }

            })
            .catch((error) => {
                // Handle the error
                setLoading(false)
                if (global.DEBUG_MODE) console.log("ResponseDataApi::" + JSON.stringify(error.response.data));
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

    const getSavedData = (financialData) => {


        setEarningFrequencyLabel(financialData.earningFrequency)
        setEarningTypeLabel(financialData.earningType)

        let totalExpenses = 0, totalOtherexpense = 0, totalIncome = 0, totalotherIncome = 0;

        financialData.pdBusinessIncomes.forEach(income => {
            income.Amount = income.incomeAmount;
            delete income.incomeAmount;
        });

        financialData.pdBusinessIncomes.forEach(income => {
            income.incomeLabel = income.incomeType;
            delete income.incomeType;
        });

        financialData.pdBusinessExpens.forEach(expense => {
            expense.Amount = expense.expenseAmount;
            delete expense.expenseAmount;
        });

        financialData.pdBusinessExpens.forEach(expense => {
            expense.incomeLabel = expense.expenseType;
            delete expense.expenseType;
        });

        const filteredIncome = financialData.pdBusinessIncomes.filter(expense => expense.parentIncomeType === "BUSINESS_INCOME");

        if (global.DEBUG_MODE) console.log('BUSINESS_INCOME Detail:', JSON.stringify(filteredIncome));
        if (filteredIncome) {
            const newData = filteredIncome.map(item => {
                const extraJson = { colorCode: 'Green', usercode: 'BUSINESS_INCOME' };
                totalIncome += parseInt(item.Amount);
                return { ...item, ...extraJson };
            });
            setIncomeList(newData)
            setTotalBusineesIncome(totalIncome)
        }

        const filteredOtherIncome = financialData.pdBusinessIncomes.filter(expense => expense.parentIncomeType === "OTHER_SOURCE_INCOME");

        if (global.DEBUG_MODE) console.log('OTHER_BUSINESS_EXPENSES Detail:', JSON.stringify(filteredOtherIncome));
        if (filteredOtherIncome) {
            const newData = filteredOtherIncome.map(item => {
                const extraJson = { colorCode: 'Green', usercode: 'OTHER_SOURCE_INCOME' };
                totalotherIncome += parseInt(item.Amount);
                return { ...item, ...extraJson };
            });

            setOtherTotalIncome(totalotherIncome);
            setotherIncomeList(newData)
        }

        const filteredExpenses = financialData.pdBusinessExpens.filter(expense => expense.parentExpenseType === "BUSINESS_EXPENSES");

        if (global.DEBUG_MODE) console.log('BUSINESS_EXPENSES Detail:', JSON.stringify(filteredExpenses));
        if (filteredExpenses) {
            const newData = filteredExpenses.map(item => {
                const extraJson = { colorCode: 'Red', usercode: 'BUSINESS_EXPENSES' };
                totalExpenses += parseInt(item.Amount);
                return { ...item, ...extraJson };
            });
            setTotalBusineesExpenses(totalExpenses)
            setExpenseList(newData);
        }

        const filteredOtherExpenses = financialData.pdBusinessExpens.filter(expense => expense.parentExpenseType === "OTHER_SOURCE_EXPENSES");

        if (global.DEBUG_MODE) console.log('OTHER_BUSINESS_EXPENSES Detail:', JSON.stringify(filteredOtherExpenses));
        if (filteredOtherExpenses) {
            const newData = filteredOtherExpenses.map(item => {
                const extraJson = { colorCode: 'Red', usercode: 'OTHER_SOURCE_EXPENSES' };
                totalOtherexpense += parseInt(item.Amount);
                return { ...item, ...extraJson };
            });
            setOtherTotalExpense(totalOtherexpense)
            setotherExpenseList(newData)
        }

    }


    const onGoBack = () => {
        props.navigation.replace('PDItems', { clientType: global.CLIENTTYPE });
    }

    const makeSystemMandatoryFields = () => {

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_ern_typ' && data.pageId === currentPageId).map((value, index) => {

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

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_ern_frq' && data.pageId === currentPageId).map((value, index) => {

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
                id: 0
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
                id: 0
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
                id: 0
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
                id: 0
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

                    <ImageComp imageSrc={item.colorCode == 'Green' ? require('../../Images/income.png') : require('../../Images/expense.png')} imageStylee={{ marginLeft: 10, width: 30, height: 30 }} />

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

                </View>

            </View >
        )

    }

    const callFinancialData = () => {

        // if (global.USERTYPEID == 1163) {
        //     navigatetoBank();
        //     return;
        // }
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
                    "expenseType": mergedExpenseArray[i].incomeLabel,
                    "expenseAmount": parseInt(mergedExpenseArray[i].Amount),
                    "parentExpenseType": mergedExpenseArray[i].usercode,
                })
            }


            console.log('IncomeOfObjects::', incomeOfObjects);
            console.log('ExpenseOfObjects::', expenseOfObjects);

            const appDetails = {
                "id": parentFinancialId,
                "clientType": "string",
                "pdLevel": "string",
                "earningType": earningTypeLabel,
                "earningFrequency": earningFrequencyLabel,
                "totalBussinessIncome": parseInt(totalBusineesIncome),
                "totalOtherSourceIncome": parseInt(totalOtherIncome),
                "totalAvgMonthlyIncome": parseInt(totalBusineesIncome) + parseInt(totalOtherIncome),
                "totalBussinessExpense": parseInt(totalBusineesExpenses),
                "totalOtherSourceExpense": parseInt(totalOtherExpense),
                "totalAvgMonthlyExpense": parseInt(totalBusineesExpenses) + parseInt(totalOtherExpense),
                "createdBy": global.USERID,
                "createdDate": new Date(),
                "pdBusinessIncomes": incomeOfObjects,
                "pdBusinessExpens": expenseOfObjects,
                "pageId": currentPageId,
            }
            const baseURL = global.PORT1;
            setLoading(true);
            apiInstance(baseURL)
                .post(`/api/v1/pd/PDFinancialDetailsVerification/loan-application-number/${global.LOANAPPLICATIONNUM}/clientId/${global.CLIENTID}`, appDetails)
                .then(async response => {
                    // Handle the response data
                    if (global.DEBUG_MODE) console.log('PostFinancialResponse::' + JSON.stringify(response.data),);
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

    const updatePdStatus = () => {

        const appDetails = {
            "loanApplicationId": global.LOANAPPLICATIONID,
            "loanWorkflowStage": global.PDSTAGE,
            "subStageCode": global.PDSUBSTAGE,
            "moduleCode": global.PDMODULE,
            "subModule": global.PDSUBMODULE,
            "pageCode": currentPageCode,
            "status": "Completed",
            "userId": global.USERID
        };

        const baseURL = global.PORT1;
        setLoading(true);
        apiInstance(baseURL)
            .post(`/api/v2/PD/Update/PD_WORKFLOW/updateStatus`, appDetails)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log('UpdatePDStatusApiResponse::' + JSON.stringify(response.data),);
                setLoading(false);
                if (response.status == 200) {
                    getAllStatus();
                }
                else if (response.data.statusCode === 201) {
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

    const getAllStatus = () => {

        const filteredModule = props.pdSubStage[0].personalDiscussionSubStageLogs
            .filter(data => data.subStageCode === global.PDSUBSTAGE)[0]
            .personalDiscussionModuleLogs
            .filter(data => data.moduleCode === global.PDMODULE)[0]

        if (filteredModule) {
            props.updatePDModule(global.PDSUBSTAGE, global.PDMODULE);
            props.updatePDSubModule(global.PDSUBSTAGE, global.PDMODULE, global.PDSUBMODULE);
            props.updatePDPage(global.PDSUBSTAGE, global.PDMODULE, global.PDSUBMODULE, currentPageCode);
            props.navigation.replace('PDItems', { clientType: global.CLIENTTYPE });
        } else {
            if (Common.DEBUG_MODE) console.log('Module not found.');
        }

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
                            alignItems: 'center',
                        }}>
                        <View
                            style={{
                                width: '90%',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Image
                                source={require('../../Images/orderblue.png')}
                                style={{ width: 16, height: 20 }}
                            />
                            <Text
                                style={{
                                    marginLeft: 10,
                                    fontSize: 14,
                                    fontFamily: 'Poppins-Medium',
                                    color: Colors.mediumgrey,
                                }}>
                                Finacial Details Verification
                            </Text>
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
    checkbox: {
        alignSelf: 'center',
    },
    modalContent: {
        width: '90%',  // Set width to 90% of the screen width
        aspectRatio: 0.5,
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 20,
        alignItems: 'center',
    },
});
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
        pdSubStage: pdSubStages
    }
};

const mapDispatchToProps = dispatch => ({
    languageAction: item => dispatch(languageAction(item)),
    updatePDSubStage: item => dispatch(updatePDSubStage(item)),
    updatePDModule: (subStage, module) => dispatch(updatePDModule(subStage, module)),
    updatePDSubModule: (subStage, module, subModule) => dispatch(updatePDSubModule(subStage, module, subModule)),
    updatePDPage: (subStage, module, subModule, page) => dispatch(updatePDPage(subStage, module, subModule, page)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(PDFinancialVerification);
