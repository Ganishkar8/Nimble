import React, { useRef, useEffect, useState } from 'react';
import {
    View,
    StatusBar,
    Text,
    Image,
    FlatList,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    RefreshControl
} from 'react-native';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import apiInstance from '../../../Utils/apiInstance';
import Colors from '../../../Utils/Colors';
import MyStatusBar from '../../../Components/ MyStatusBar';
import Loading from '../../../Components/Loading';
import { BottomSheet } from 'react-native-btr';
import { connect } from 'react-redux';
import { languageAction } from '../../../Utils/redux/actions/languageAction';
import { language } from '../../../Utils/LanguageString';
import { FAB } from 'react-native-paper';
import Modal from 'react-native-modal';
import TextComp from '../../../Components/TextComp';
import apiInstancelocal from '../../../Utils/apiInstancelocal';
import { useIsFocused } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import Commonstyles from '../../../Utils/Commonstyles';
//
import SortByComp from '../../../Components/Filter/SortByComp';
import StatusComp from '../../../Components/Filter/StatusComp';
import TypeComp from '../../../Components/Filter/TypeComp';
import AgeingComp from '../../../Components/Filter/AgeingComp';
import DateComp from '../../../Components/Filter/DateComp';

import tbl_SystemCodeDetails from '../../../Database/Table/tbl_SystemCodeDetails';
import Common from '../../../Utils/Common';
import tbl_lead_creation_lead_details from '../../../Database/Table/tbl_lead_creation_lead_details';
import tbl_lead_creation_basic_details from '../../../Database/Table/tbl_lead_creation_basic_details';
import tbl_lead_creation_business_details from '../../../Database/Table/tbl_lead_creation_business_details';
import tbl_lead_creation_loan_details from '../../../Database/Table/tbl_lead_creation_loan_details';
import PickerComp from '../../../Components/PickerComp';
import { it } from 'react-native-paper-dates';



const LeadManagement = (props, { navigation, route }) => {
    const data = [

        { name: 'Filter' },
        { name: 'Sort by' },
        { name: 'Pending' },
        { name: "Today's Lead" }
    ]
    const mainFilterDataArr = [

        { name: 'Sort', isSelected: true, id: 'SO' },
        { name: 'Status', isSelected: false, id: 'ST' },
        { name: 'Date', isSelected: false, id: 'DT' },
        { name: 'Type', isSelected: false, id: 'TP' },
        { name: 'Ageing', isSelected: false, id: 'AG' }
    ]

    const [typeDataArr, setTypeDataArr] = useState([]);
    const [statusDataArr, setStatusDataArr] = useState([]);
    const [search, setSearch] = useState('');
    const [pendingData, setPendingData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [mainFilterData, setMainFilteredData] = useState(mainFilterDataArr);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);
    const [filterVisible, setFilterVisible] = useState('');
    const [bottomLeadSheetVisible, setBottomLeadSheetVisible] = useState(false);
    const showBottomSheet = () => setBottomLeadSheetVisible(true);
    const hideBottomSheet = () => setBottomLeadSheetVisible(false);
    const [sortModalVisible, setSortModalVisible] = useState(false);
    const showSortModalSheet = () => setSortModalVisible(true);
    const hideSortModalSheet = () => setSortModalVisible(false);
    const isScreenVisible = useIsFocused();
    const [leadStatusData, setLeadStatusData] = useState([]);

    const [sortedFilterValue, setSortedFilterValue] = useState('');
    const [statusFilterValue, setStatusFilterValue] = useState('');
    const [typeFilterValue, setTypeFilterValue] = useState('');
    const [dateFilterValue, setDateFilterValue] = useState('');
    const [ageFilterValue, setAgeFilterValue] = useState('');

    const [agentData, setAgentData] = useState([]);
    const [agentLabel, setAgentLabel] = useState('');
    const [agentIndex, setAgentIndex] = useState('');

    const [statusRefresh, setStatusRefresh] = useState(false);
    const [typeRefresh, setTypeRefresh] = useState(false);
    const [refreshing, setRefreshing] = useState(true);

    const sortChildRef = useRef(null);
    const [reload, setReload] = useState(false);



    useEffect(() => {
        //getPendingData()
        if (props.route.params.fromScreen == "LeadCompletion") {
            // showBottomSheet();
        }
        if (isScreenVisible) {
            Common.getNetworkConnection().then(value => {
                if (value.isConnected == true) {
                    getPendingData(null, null, null, null, null, null, null, null);
                    //getDraftData();
                } else {
                    getDraftData();
                }

            })

            setMainFilteredData(mainFilterDataArr)

        }


        tbl_SystemCodeDetails.getSystemCodeDetailsBasedOnID('LeadStatus').then(value => {
            if (value !== undefined && value.length > 0) {
                setLeadStatusData(value)
            }
        })
        if (global.USERTYPEID == '1163') {
            mainFilterDataArr.splice(4, 0, { name: 'Agent Name', isSelected: false, id: 'AGN' });
        }
        setFilterVisible(mainFilterData[0].id)
        //below code is used for hiding  bottom tab
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        return () =>
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
    }, [navigation, isScreenVisible]);


    const getDraftData = async () => {
        let data = [];
        const promises = [];
        await tbl_lead_creation_lead_details.getAllLeadCreationLeadDetails().then(value => {
            if (value !== undefined && value.length > 0) {
                for (let i = 0; i < value.length; i++) {
                    const promise = tbl_lead_creation_lead_details.getLeadDraftDetail(value[i].id).then(value1 => {
                        if (value1 !== undefined && value1.length > 0) {
                            data.push({
                                "id": value[i].id,
                                "leadStatus": "DRAFT",
                                "customerName": value1[0].first_name + " " + value1[0].middle_name + " " + value1[0].last_name,
                                "leadId": value1[0].lead_number,
                                "leadType": "HOT",
                                "creationDate": value1[0].created_date,
                                "completionDate": "",
                                "ageing": "",
                                "agentName": "",
                                "approverName": "",
                                "loanAmount": "",
                                "product": ""
                            })
                        }
                    })
                    promises.push(promise);
                }

            }
        })
        await Promise.all(promises);

        // alert(JSON.stringify(data))
        setFilteredData(data)
        setPendingData(data)
        setRefreshing(false)
    }

    const filterClick = (type, value, from) => {
        console.log('SortedValues::' + JSON.stringify(value))
        if (type == 'SO') {
            if (from == 'top') {
                hideSortModalSheet();
                getPendingData(null, null, null, null, null, null, null, value);
            }
            setSortedFilterValue(value)
        }
        if (type == 'ST') {
            setStatusFilterValue(value)
            for (var i = 0; i < statusDataArr.length; i++) {
                if (statusDataArr[i].id == value) {
                    statusDataArr[i].checked = true
                }
            }
        }
        if (type == 'DT') {
            setDateFilterValue(value)
        }
        if (type == 'TP') {
            setTypeFilterValue(value)
            for (var i = 0; i < typeDataArr.length; i++) {
                if (typeDataArr[i].id == value) {
                    typeDataArr[i].checked = true
                }
            }
        }
        if (type == 'AG') {
            setAgeFilterValue(value)
        }
    }

    const applyFilter = () => {
        let sort = sortedFilterValue;
        let status = '';
        for (let i = 0; i < statusFilterValue.length; i++) {
            if (statusFilterValue[i].checked == true) {
                status = statusFilterValue[i].id
                break
            }
        }
        let from = dateFilterValue.FromDate
        let to = dateFilterValue.ToDate
        let type = '';
        for (let i = 0; i < typeFilterValue.length; i++) {
            if (typeFilterValue[i].checked == true) {
                type = typeFilterValue[i].id
                break
            }
        }
        let age = ageFilterValue.AGE
        let operator = ageFilterValue.Label
        let agentName = agentLabel;
        if (sort == undefined || sort.length <= 0) {
            sort = null;
        }
        if (status == undefined || status.length <= 0) {
            status = null;
        }

        if (from == undefined || from.length <= 0) {
            from = null;
        }

        if (to == undefined || to.length <= 0) {
            to = null;
        }

        if (type == undefined || type.length <= 0) {
            type = null;
        }

        if (age == undefined || age.length <= 0) {
            age = null;
        }

        if (operator == undefined || operator.length <= 0) {
            operator = null;
        }

        if (agentName == undefined || agentName.length <= 0) {
            agentName = null;
        }

        getPendingData(status, type, from, to, operator, age, agentName, sort);

        console.log("ApplyFilterData::" + "Sort::" + sort + " Status::" + status
            + " FromDate::" + from + " ToDate::" + to + " Type::" + type
            + " Age::" + age + " Operator::" + operator + " Agent Name::" + agentName)
        setVisible(false)
    }

    const toggleBottomNavigationView = () => {
        //Toggling the visibility state of the bottom sheet
        setVisible(!visible);
    };

    const getPendingData = (status, leadType, from, to, operator, ageing, agentName, sort) => {

        const baseURL = '8901'
        setLoading(true)
        var url = '';

        if (global.USERTYPEID == '1163') {
            url = 'BM-trackerWithCondition';
            var appDetails = {
                "status": status,
                "leadType": leadType,
                "from": from,
                "to": to,
                "operator": operator,
                "ageing": ageing,
                "agentName": agentName,
                "sort": sort
            }
        } else {
            url = 'lead-creation-cart/allCondition';
            var appDetails = {
                "status": status,
                "leadType": leadType,
                "from": from,
                "to": to,
                "operator": operator,
                "ageing": ageing,
                "sort": sort
            }
        }
        apiInstance(baseURL).post(`api/v1/${url}/${global.USERID}`, appDetails)
            .then((response) => {
                // Handle the response data
                console.log("ResponseDataApi::" + JSON.stringify(response.data));
                setPendingData(response.data.slice().reverse())
                setFilteredData(response.data.slice().reverse())
                setLoading(false)
                setRefreshing(false)
                // const decodedToken = jwtDecode(response.data.jwtToken);
                // console.log("LoginJWTDecode::" + JSON.stringify(decodedToken));
            })
            .catch((error) => {
                // Handle the error
                setLoading(false)
                console.error("ErrorDataApi::" + error);
            });
    }

    const onRefresh = () => {
        //Clear old data of the list
        setPendingData([]);
        setFilteredData([]);
        //Call the Service to get the latest data
        setRefreshing(true)
        getPendingData();
    };

    const getLeadByID = (leadID) => {

        const baseURL = '8901'
        setLoading(true)

        apiInstance(baseURL).get(`api/v1/lead-creation-initiation/getByLeadId/${leadID}`)
            .then((response) => {
                // Handle the response data
                console.log("ResponseDataApi::" + JSON.stringify(response.data));
                setLoading(false)
                insertLead(response.data)

            })
            .catch((error) => {
                // Handle the error
                setLoading(false)
                console.error("ErrorDataApi::" + error);
            });
    }

    const insertLead = async (leadData) => {
        await tbl_lead_creation_lead_details.insertLeadCreationLeadDetails(leadData.id, leadData.leadNumber, leadData.branchId, leadData.isActive, leadData.createdBy, leadData.leadCreationBasicDetails.createdOn);
        await tbl_lead_creation_basic_details.insertLeadCreationBasicDetails(leadData.id, leadData.leadCreationBasicDetails.customerCategoryId, leadData.leadCreationBasicDetails.titleId, leadData.leadCreationBasicDetails.firstName, leadData.leadCreationBasicDetails.middleName, leadData.leadCreationBasicDetails.lastName, leadData.leadCreationBasicDetails.genderId, leadData.leadCreationBasicDetails.mobileNumber, global.USERID);

        if (!Common.hasOnlyOneKey(leadData.leadCreationBusinessDetails)) {
            await tbl_lead_creation_business_details.insertLeadCreationBusinessDetails(leadData.id, leadData.leadCreationBusinessDetails.industryTypeId, leadData.leadCreationBusinessDetails.businessName, leadData.leadCreationBusinessDetails.businessVintageYear, leadData.leadCreationBusinessDetails.businessVintageMonth, leadData.leadCreationBusinessDetails.incomeBusinessTurnover, global.USERID);
        }

        if (!Common.hasOnlyOneKey(leadData.leadCreationLoanDetails)) {
            await tbl_lead_creation_loan_details.insertLeadCreationLoanDetails(leadData.id, leadData.leadCreationLoanDetails.loanTypeId, "988", leadData.leadCreationLoanDetails.loanPurposeId, leadData.leadCreationLoanDetails.loanAmount, leadData.leadCreationLoanDetails.leadTypeId, global.USERID);
        }

        // if (!Common.hasOnlyOneKey(leadData.leadCreationDms)) {
        //     await tbl_lead_creation_loan_details.insertLeadCreationLoanDetails(leadData.id, leadData.leadCreationDms.dmsId, leadData.leadCreationDms.fileName, leadData.leadCreationDms.fileInfo, leadData.leadCreationDms.fileType,leadData.leadCreationDms.geo_location,leadData.leadCreationDms.comments, global.USERID);

        // }

        tbl_lead_creation_lead_details.getLeadCreationLeadDetailsBasedOnLeadID(leadData.id).then(value => {
            console.log("LeadDetails::::" + JSON.stringify(value))
        })

        tbl_lead_creation_basic_details.getLeadCreationBasicDetailsBasedOnLeadID(leadData.id).then(value => {
            console.log("LeadBasicDetails::::" + JSON.stringify(value))
        })

        tbl_lead_creation_business_details.getLeadCreationBusinessDetailsBasedOnLeadID(leadData.id).then(value => {
            console.log("LeadBusinessDetails::::" + JSON.stringify(value))
        })

        tbl_lead_creation_loan_details.getLeadCreationLoanDetailsBasedOnLeadID(leadData.id).then(value => {
            console.log("LeadLoanDetails::::" + JSON.stringify(value))
        })

        props.navigation.navigate('LeadCreationBasic', { leadData: [] });

    }

    const handleclick = (value, index) => {
        //alert(JSON.stringify(value))
        if (value.name == 'Filter') {
            setVisible(true)
            callStatusApi();
            callLeadTypeApi();
            callAgentNameApi();
        } else if (value.name == 'Pending') {
            getPendingData('1666', null, null, null, null, null, null, null);
        } else if (index == 3) {
            const currentDate = new Date();
            const day = currentDate.getDate().toString().padStart(2, '0');
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Note: Months are 0-indexed, so we add 1.
            const year = currentDate.getFullYear();
            const formattedServerDatee = `${year}-${month}-${day}`;
            getPendingData(null, null, formattedServerDatee, formattedServerDatee, null, null, null, null);

        } else if (index == 1) {
            showSortModalSheet();
        }
    }

    const updateMainFilteredData = (item, index) => {
        let fiterPosition = mainFilterData
        for (let i = 0; i < fiterPosition.length; i++) {
            if (fiterPosition[i].id == item.id) {
                fiterPosition[i].isSelected = true
                if (fiterPosition[i].id == 'ST') {
                    if (statusDataArr.length <= 0)
                        callStatusApi();
                } else if (fiterPosition[i].id == 'TP') {
                    if (typeDataArr.length <= 0)
                        callLeadTypeApi();
                } else if (fiterPosition[i].id == 'AGN') {
                    if (agentData.length <= 0)
                        callAgentNameApi();
                }
                setFilterVisible(fiterPosition[i].id)
            } else {
                fiterPosition[i].isSelected = false
            }
        }
        //alert(JSON.stringify(fiterPosition))
        setMainFilteredData(fiterPosition)
    }

    const callStatusApi = () => {

        const baseURL = '8082'
        setLoading(true)

        apiInstance(baseURL).get('/api/v1/system-code/master/LEAD_STATUS')
            .then(async (response) => {

                setLoading(false);
                setLeadStatusData(response.data)
                var data = [];
                for (var i = 0; i < response.data.length; i++) {
                    data.push({ name: response.data[i].label, id: response.data[i].id, checked: false })
                }
                setStatusDataArr(data)
                setStatusRefresh(!statusRefresh)
            })
            .catch((error) => {
                if (global.DEBUG_MODE) console.log("Error" + JSON.stringify(error.response))
                setLoading(false)
                alert(error);
            });


    }

    const callLeadTypeApi = () => {

        const baseURL = '8082'
        setLoading(true)

        apiInstance(baseURL).get('/api/v1/system-code/master/LEAD_TYPE')
            .then(async (response) => {

                setLoading(false);
                var data = [];
                setLeadStatusData(response.data)
                for (var i = 0; i < response.data.length; i++) {
                    data.push({ name: response.data[i].label, id: response.data[i].id, checked: false })
                }
                setTypeDataArr(data)
            })
            .catch((error) => {
                if (global.DEBUG_MODE) console.log("Error" + JSON.stringify(error.response))
                setLoading(false)
                alert(error);
            });


    }

    const callAgentNameApi = () => {
        setLoading(true);
        apiInstancelocal('8901').get(`api/v1/dropdown/{supervisorId}?supervisorId=${global.USERID}`)
            .then(async (response) => {

                setLoading(false);
                var data = [];
                for (var i = 0; i < response.data.length; i++) {
                    data.push({ id: response.data[i], label: response.data[i] })
                }
                setAgentData(data)

            })
            .catch((error) => {
                if (global.DEBUG_MODE) console.log("Error" + JSON.stringify(error.response))
                setLoading(false)
                alert(error);
            });


    }

    const getStatus = (id) => {
        for (var i = 0; i < leadStatusData.length; i++) {
            if (leadStatusData[i].SubCodeID == id) {
                return leadStatusData[i].Label;
            }
        }
    }

    const clearFilter = (value) => {

        setSortedFilterValue('');
        var data = statusDataArr;
        for (var i = 0; i < data.length; i++) {
            data[i].checked = false
        }
        setStatusFilterValue(data);
        var data1 = typeDataArr;
        for (let i = 0; i < data1.length; i++) {

            data1[i].checked = false
        }
        setTypeDataArr(data1)

        setAgeFilterValue('')
        setVisible(false)
        getPendingData(null, null, null, null, null, null, null, null);


    }

    const listView = ({ item }) => {


        return (
            <View>
                <TouchableOpacity onPress={() => {
                    global.leadID = item.id;
                    global.leadNumber = item.leadId;

                    if (global.USERTYPEID == '1163') {
                        global.leadTrackerData = item;
                        props.navigation.navigate('LeadDetails', { leadData: item })
                    } else {
                        if (item.leadStatus == 'DRAFT') {
                            global.LEADTYPE = 'DRAFT';
                            tbl_lead_creation_lead_details.getLeadCreationLeadDetailsBasedOnLeadID(item.id).then(value => {
                                if (value !== undefined && value.length > 0) {
                                    global.LEADTYPE = 'DRAFT';
                                    Common.getNetworkConnection().then(value => {
                                        if (value.isConnected == true) {
                                            getLeadByID(item.id);
                                            //props.navigation.navigate('LeadCreationBasic', { leadData: [] });
                                        } else {
                                            props.navigation.navigate('LeadCreationBasic', { leadData: [] });
                                        }

                                    })
                                    //props.navigation.navigate('LeadCreationBasic', { leadData: [] });
                                } else {
                                    Common.getNetworkConnection().then(value => {
                                        if (value.isConnected == true) {
                                            getLeadByID(item.id);
                                        } else {
                                            alert(language[0][props.language].str_errinternet)
                                        }

                                    })
                                }
                            })

                        } else {
                            props.navigation.navigate('LeadDetails', { leadData: item })
                        }

                    }
                }} activeOpacity={0.9}>
                    <View style={{
                        width: '92%', margin: 13, backgroundColor: 'white',
                        elevation: 4, borderRadius: 8, paddingHorizontal: 0,
                        shadowColor: 'black',
                        shadowOpacity: 0.2,
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        }, alignItems: 'center'
                    }}>

                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 13 }}>
                            <View style={{ width: '60%', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ color: Colors.black, fontSize: 14, fontWeight: '100', marginLeft: 20 }}>{language[0][props.language].str_leadapprovalstatus}</Text>
                            </View>
                            <View style={{ width: '40%', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                                <View style={item.leadStatus == 'APPROVED' ? styles.approvedbackground : item.leadStatus == 'PENDING' ? styles.pendingbackground : styles.rejectedbackground}>
                                    <Text style={{ color: Colors.black, fontSize: 14, fontWeight: '100' }}>{item.leadStatus}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ width: '100%', height: .9, backgroundColor: Colors.line, marginTop: 13 }} />

                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 13, }}>
                            <View style={{ width: '45%' }}>
                                <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 26 }}>{language[0][props.language].str_customername}</Text>
                            </View>
                            <View style={{ width: '55%' }}>
                                <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  {item.customerName}</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                            <View style={{ width: '45%' }}>
                                <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 26 }}>{language[0][props.language].str_leadid}</Text>
                            </View>
                            <View style={{ width: '55%' }}>
                                <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  {item.leadId}</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                            <View style={{ width: '45%' }}>
                                <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 26 }}>{language[0][props.language].str_leadtype}</Text>
                            </View>
                            <View style={{ width: '55%' }}>
                                <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  {item.leadType}</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                            <View style={{ width: '45%' }}>
                                <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 26 }}>{language[0][props.language].str_creationdate}</Text>
                            </View>
                            <View style={{ width: '55%' }}>
                                <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  {Common.formatDate(item.creationDate)}</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                            <View style={{ width: '45%' }}>
                                <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 26 }}>{language[0][props.language].str_completiondate}</Text>
                            </View>
                            <View style={{ width: '55%' }}>
                                <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  {item.leadStatus == 'APPROVED' ? Common.formatDate(item.creationDate) : ''} </Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                            <View style={{ width: '45%' }}>
                                <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 26 }}>{language[0][props.language].str_ageing}</Text>
                            </View>
                            <View style={{ width: '55%' }}>
                                <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  {item.ageing}</Text>
                            </View>
                        </View>
                        {global.USERTYPEID == '1163' && <View style={{ width: '100%', flexDirection: 'row', marginTop: 11, }}>
                            <View style={{ width: '45%' }}>
                                <Text style={{ color: Colors.dimText, fontSize: 13, fontWeight: '400', marginLeft: 26 }}>{language[0][props.language].str_currentleadownerid}</Text>
                            </View>
                            <View style={{ width: '55%' }}>
                                <Text style={{ color: Colors.black, fontSize: 13, fontWeight: '400' }}>:  {item.agentName}</Text>
                            </View>
                        </View>
                        }
                        <View style={{ width: '100%', height: 5, backgroundColor: item.leadStatus == 'APPROVED' ? Colors.approvedBorder : item.leadStatus == 'PENDING' ? Colors.pendingBorder : Colors.rejectedBorder, marginTop: 13, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }} />


                    </View>
                </TouchableOpacity>
            </View>

        )
    }

    const searchFilterFunction = (text) => {
        // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource
            // Update FilteredDataSource
            const newData = pendingData.filter(
                function (item) {

                    const itemData = item.customerName
                        ? item.customerName.toUpperCase()
                        : ''.toUpperCase();
                    const itemDataID = item.leadId
                        ? item.leadId.toString()
                        : ''.toUpperCase();
                    const regex = /^[0-9]+$/;
                    let textData = ''
                    if (regex.test(text)) {
                        textData = text
                        console.log("String consists of only numbers.");
                    } else {
                        textData = text.toUpperCase();
                        console.log("String contains non-numeric characters.");
                    }
                    //const textData = text.toUpperCase();
                    return ((itemData.indexOf(textData) > -1) || (itemDataID.indexOf(textData) > -1));
                });
            setFilteredData(newData);
            setSearch(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredData(pendingData);
            setSearch(text);
        }
    };

    const handlePickerClick = (componentName, label, index) => {

        if (componentName === 'agentPicker') {
            setAgentLabel(label);
            setAgentIndex(index);
        }
    }

    return (

        <View style={{ flex: 1, backgroundColor: '#fefefe' }}>
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
            {loading ? <Loading /> : null}
            <View style={styles.headerView}>

                <Modal
                    isVisible={bottomLeadSheetVisible}
                    onBackdropPress={hideBottomSheet}
                    backdropOpacity={0}
                    style={styles.modal}
                >
                    <View style={styles.modalContent}>
                        <View style={{ alignItems: 'center' }}>


                            <View style={{ width: '100%', height: 30 }}>
                                <TextComp textVal={"Lead ID Created"} textStyle={{ fontSize: 14, color: Colors.white, lineHeight: 20 }} Visible={false} />
                            </View>


                        </View>


                    </View>
                </Modal>

                <Modal
                    isVisible={sortModalVisible}
                    onBackdropPress={hideSortModalSheet}
                    style={styles.sortmodal}
                    backdropOpacity={0}
                >
                    <View style={styles.sortmodalContent}>

                        <SortByComp props={props} filterClick={filterClick} selectedValue={sortedFilterValue} from='top' reload={reload} />

                    </View>
                </Modal>

                <View style={{
                    width: '100%', height: 56, alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('HomeScreen')} style={{ width: '15%', height: 56, alignItems: 'center', justifyContent: 'center' }}>
                        <View >

                            <Entypo name='chevron-left' size={25} color='#4e4e4e' />

                        </View>
                    </TouchableOpacity>
                    <View style={{ width: '85%', height: 56, justifyContent: 'center' }}>
                        <Text style={{ fontSize: 18, color: '#000', fontWeight: '400' }}>{language[0][props.language].str_leadmanagement}</Text>
                    </View>
                </View>

                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 7, }}>
                    <FlatList
                        data={data}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity onPress={() => handleclick(item, index)} activeOpacity={11}>
                                    <View style={[styles.viewStyle, { flexDirection: 'row' }]}>
                                        <Text style={[styles.textColor, { marginRight: 8, }]}>{item.name}</Text>
                                        {item.name === 'Filter' &&
                                            <Image source={require('../../../Images/filter.png')}
                                                style={{ width: 15, height: 15, resizeMode: 'contain', marginStart: 8 }} />
                                        }
                                        {item.name === 'Sort by' &&
                                            <AntDesign name='caretdown' size={11} color='#343434' />
                                        }
                                        {item.name === 'Draft' &&
                                            <View style={{
                                                width: 15, height: 15, borderRadius: 15, backgroundColor: 'red',
                                                alignItems: 'center', justifyContent: 'center', marginTop: 2, marginStart: 4
                                            }}>
                                                <Text style={{ color: '#fff', fontSize: 9 }}>2</Text>
                                            </View>
                                        }

                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </View>

            <View style={{
                width: '100%', alignItems: 'center',
                justifyContent: 'center', marginTop: 10, marginBottom: 8
            }}>
                <View style={{
                    width: '90%', backgroundColor: '#f2f2f2',
                    borderRadius: 7, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10
                }}>

                    <TextInput
                        value={search}
                        onChangeText={search => {
                            if (search.length > 0) {
                                if (Common.isValidText(search))
                                    searchFilterFunction(search)
                            } else {
                                searchFilterFunction(search)
                            }

                        }}
                        placeholder={'Search By Name or Lead ID'}
                        placeholderTextColor={'gray'}
                        keyboardType='default'
                        secureTextEntry={false}
                        autoCapitalize="none"
                        style={{
                            width: '80%',
                            height: 44,
                            fontSize: 14.4,
                            fontWeight: '400',
                            color: Colors.black
                        }}
                    />
                    <Ionicons name="search" style={{ marginStart: 32 }} size={20} color={'#aaaaaa'} />
                </View>
            </View>

            <View style={{ width: '100%', justifyContent: 'center', marginBottom: 200 }}>
                <FlatList
                    data={filteredData}
                    renderItem={listView}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}

                    refreshControl={
                        <RefreshControl
                            //refresh control used for the Pull to Refresh
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }

                />
            </View>

            <BottomSheet
                visible={visible}
                //setting the visibility state of the bottom shee
                onBackButtonPress={toggleBottomNavigationView}
                //Toggling the visibility state
                onBackdropPress={toggleBottomNavigationView}
            //Toggling the visibility state
            >
                {/*Bottom Sheet inner View*/}
                <View style={styles.bottomNavigationView}>
                    <View
                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text
                            style={{
                                padding: 15,
                                fontSize: 16,
                                color: Colors.black
                            }}>
                            {language[0][props.language].str_filter}
                        </Text>
                        <TouchableOpacity onPress={toggleBottomNavigationView} activeOpacity={9} style={{ justifyContent: 'center', alignItems: 'center', marginRight: 10 }}>
                            <View >
                                <Feather name='x' size={25} color={Colors.dimText} />
                            </View>
                        </TouchableOpacity>


                    </View>
                    <View style={{ height: 1, width: '100%', backgroundColor: Colors.line }} />
                    <View style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={{ width: '35%' }}>
                            <FlatList
                                data={mainFilterData}
                                horizontal={false}
                                showsVerticalScrollIndicator={false}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item, index }) => {
                                    return (
                                        <TouchableOpacity onPress={() => updateMainFilteredData(item, index)} activeOpacity={0.5}>
                                            <View style={[styles.viewStyleFilter, { flexDirection: 'row', marginTop: 5 }]}>

                                                {item.isSelected ?
                                                    (<View style={{ width: 7, height: 35, backgroundColor: Colors.skyBlue }} />) : null}
                                                <View style={{ width: '95%', padding: 17 }}>
                                                    <Text style={[styles.textColor, { marginRight: 8, textAlign: 'left' }]}>{item.name}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                            />
                        </View>
                        <View style={{ width: 1, height: 400, backgroundColor: Colors.line }} />
                        <View style={{ width: '65%' }}>
                            {filterVisible === 'SO' &&
                                <SortByComp props={props} filterClick={filterClick} selectedValue={sortedFilterValue} from='bottom' />
                            }

                            {filterVisible === 'ST' &&
                                <StatusComp props={props} statusData={statusDataArr} filterClick={filterClick} reload={reload} />
                            }

                            {filterVisible === 'DT' &&
                                <DateComp props={props} filterClick={filterClick} reload={reload} />
                            }

                            {filterVisible === 'TP' &&
                                <TypeComp props={props} typeData={typeDataArr} filterClick={filterClick} reload={reload} />
                            }

                            {filterVisible === 'AGN' &&
                                <View>
                                    <View style={{ marginLeft: 15 }}>
                                        <Text
                                            style={{ marginTop: 15, fontSize: 14, color: Colors.dimText }}>
                                            {language[0][props.language].str_agentname}
                                        </Text>
                                    </View>

                                    <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>

                                            <TextComp textVal={language[0][props.language].str_agentname} textStyle={Commonstyles.inputtextStyle} Visible={true} />

                                        </View>

                                        <PickerComp textLabel={agentLabel} pickerStyle={Commonstyles.picker} Disable={false} pickerdata={agentData} componentName='agentPicker' handlePickerClick={handlePickerClick} />


                                    </View>

                                </View>
                            }

                            {filterVisible === 'AG' &&
                                <AgeingComp props={props} filterClick={filterClick} reload={reload} />
                            }

                        </View>

                    </View>
                </View>
                <View style={{
                    backgroundColor: Colors.white, height: 90, width: '100%', shadowColor: '#000',
                    shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: 0.7,
                    shadowRadius: 2,
                    elevation: 6, justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'
                }}>
                    <TouchableOpacity activeOpacity={0.9} onPress={() => { clearFilter() }}>
                        <View style={{ padding: 25 }}>
                            <TextComp textStyle={{ marginTop: 0, fontSize: 18, color: Colors.dimmText, marginLeft: 3 }} textVal={language[0][props.language].str_clearfilters} Visible={false}></TextComp>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.9} onPress={applyFilter} style={{
                        width: '40%', height: 45, backgroundColor: Colors.darkblue, alignItems: 'center', justifyContent: 'center', marginRight: 20,
                        borderRadius: 25
                    }}>
                        <View>
                            <TextComp textStyle={{ marginTop: 0, fontSize: 14, color: Colors.white, marginLeft: 3 }} textVal={language[0][props.language].str_apply} Visible={false}></TextComp>
                        </View>
                    </TouchableOpacity>

                </View>
            </BottomSheet>

            {global.USERTYPEID == '1164' &&
                <FAB
                    icon="plus"
                    color={Colors.white}
                    style={styles.fab}
                    label='Create New Lead'
                    onPress={() => {
                        global.LEADTYPE = 'NEW';
                        global.leadID = '';
                        global.leadNumber = '';
                        props.navigation.navigate('LeadCreationBasic', { leadData: [] });
                    }}
                />
            }

        </View>
    );
};

const mapStateToProps = (state) => {
    const { language } = state.languageReducer;
    return {
        language: language
    }
}

const mapDispatchToProps = (dispatch) => ({
    languageAction: (item) => dispatch(languageAction(item)),
});


export default connect(mapStateToProps, mapDispatchToProps)(LeadManagement);

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f8fa',
        alignItems: 'center'
    },
    headerView: {
        width: ('100%'),
        paddingVertical: 15,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewStyle: {
        alignItems: 'center',
        paddingHorizontal: 20, marginLeft: 9, marginRight: 4,
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
        fontWeight: '400'
    },
    viewStyleFilter: {
        alignItems: 'center', justifyContent: 'center',
    },
    viewStyleStatusData: {
        alignItems: 'center'
    },
    picker: {
        height: 50,
        width: '85%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlign: 'center'
    },
    pendingbackground: {
        width: 90, borderColor: Colors.pendingBorder, backgroundColor: Colors.pendingBg, alignItems: 'center', padding: 3, borderRadius: 15, borderWidth: 1
    },
    approvedbackground: {
        width: 90, borderColor: Colors.approvedBorder, backgroundColor: Colors.approvedBg, alignItems: 'center', padding: 3, borderRadius: 15, borderWidth: 1
    },
    rejectedbackground: {
        width: 90, borderColor: Colors.rejectedBorder, rejectedbackground: Colors.approvedBg, alignItems: 'center', padding: 3, borderRadius: 15, borderWidth: 1
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        backgroundColor: Colors.darkblue,
        borderRadius: 30
    },
    modal: {
        justifyContent: 'flex-end',
        margin: 10,
    },
    modalContent: {
        backgroundColor: '#362F2F',
        padding: 16,
        borderRadius: 10,
    }, sortmodal: {
        justifyContent: 'flex-end',
        margin: 10,

    },
    sortmodalContent: {
        position: 'absolute',
        top: 110,
        left: 50,
        right: 50,
        backgroundColor: '#f7f7f7',
        padding: 16,
        zIndex: 999,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 0,
            height: 2,
        }
    },

});