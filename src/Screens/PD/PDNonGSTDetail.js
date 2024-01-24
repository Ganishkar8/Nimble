/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    TextInput,
    FlatList, TouchableOpacity, BackHandler, Modal, ToastAndroid
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
import { Picker } from '@react-native-picker/picker';
import { addTravelDetails, updateTravelDetails, deleteTravelDetails, deleteOfficerTravelDetails } from '../../Utils/redux/actions/PersonalDiscussionAction';
import { updatePDModule, updatePDSubStage, updatePDSubModule, updatePDPage } from '../../Utils/redux/actions/PDAction';


const PDNonGSTDetail = (props, { navigation }) => {
    const [loading, setLoading] = useState(false);
    const [pdDetails, setPdDetails] = useState([]);
    const [refreshFlatlist, setRefreshFlatList] = useState(false);
    const isScreenVisible = useIsFocused();
    const [profileDetail, setProfileDetail] = useState(props.profiledetail.userPersonalDetailsDto);

    const [riskLevelMan, setRiskLevelMan] = useState(false);
    const [riskLevelVisible, setRiskLevelVisible] = useState(true);
    const [riskLevelDisable, setRiskLevelDisable] = useState(false);
    const [riskLevelData, setRiskLevelData] = useState([]);
    const [riskLevelCaption, setRiskLevelCaption] = useState('RISK LEVEL');
    const [riskLevelLabel, setRiskLevelLabel] = useState('');
    const [riskLevelIndex, setRiskLevelIndex] = useState('');

    const [satisficationScoreMan, setSatisficationScoreMan] = useState(false);
    const [satisficationScoreVisible, setSatisficationScoreVisible] = useState(true);
    const [satisficationScoreDisable, setSatisficationScoreDisable] = useState(false);
    const [satisficationScoreData, setSatisficationScoreData] = useState([]);
    const [satisficationScoreCaption, setSatisficationScoreCaption] = useState('OVERALL SATISFICATION SCORE');
    const [satisficationScoreLabel, setSatisficationScoreLabel] = useState('');
    const [satisficationScoreIndex, setSatisficationScoreIndex] = useState('');

    const [politicallyExposedMan, setPoliticallyExposedMan] = useState(false);
    const [politicallyExposedVisible, setPoliticallyExposedVisible] = useState(true);
    const [politicallyExposedDisable, setPoliticallyExposedDisable] = useState(false);
    const [politicallyExposedData, setPoliticallyExposedData] = useState([]);
    const [politicallyExposedCaption, setPoliticallyExposedCaption] = useState('IS A PERSON POLITICALLY EXPOSED?');
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
        props.mobilecodedetail.processSystemMandatoryFields,
    );
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
    const showBottomSheet = () => setBottomErrorSheetVisible(true);
    const hideBottomSheet = () => setBottomErrorSheetVisible(false);

    const [currentPageId, setCurrentPageId] = useState(props.route.params.pageId);
    const [currentPageCode, setCurrentPageCode] = useState(props.route.params.pageCode);
    const [currentPageDesc, setCurrentPageDesc] = useState(props.route.params.pageDesc);
    const [currentPageMan, setCurrentPageMan] = useState(props.route.params.pageMandatory);
    const [parentNonGSTId, setParentNonGSTId] = useState(0);
    const [nonGSTData, setNonGSTData] = useState([]);
    const [refreshMonthsFlatlist, setRefreshMonthsFlatList] = useState(false);
    const [spinnerList, setSpinnerList] = useState([{ subCodeId: true, Description: 'True' }, { subCodeId: false, Description: 'False' }]);

    const [remarksModalVisible, setRemarksModalVisible] = useState(false);
    const showRemarksSheet = (item, index) => {
        setRemarksModalVisible(true)
        setRemarks(item.remarks)
        setTempItem(item)
        setTempIndex(index)
    };
    const [remarks, setRemarks] = useState('');
    const [tempItem, setTempItem] = useState([]);
    const [tempIndex, setTempIndex] = useState(0);
    const hideRemarksSheet = () => setRemarksModalVisible(false);
    const [totalDeclaredSales, setTotalDeclaredSales] = useState(0);
    const [totalVerifiedSales, setTotalVerifiedSales] = useState(0);
    const [totalDeclaredPurchases, setTotalDeclaredPurchases] = useState(0);
    const [totalVerifiedPurchases, setTotalVerifiedPurchases] = useState(0);


    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        getSystemCodeDetail();
        //makeSystemMandatoryFields();
        // props.deleteTravelDetails(131)
        getNonGSTDetails();


        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }
    }, [props.navigation, isScreenVisible]);

    const handleBackButton = () => {
        onGoBack();
        return true; // Prevent default back button behavior
    };


    const getNonGSTDetails = () => {

        const baseURL = global.PORT1;
        setLoading(true)

        const appDetails = {
            "clientId": global.CLIENTID,
            "userId": global.USERID,
            "pageId": currentPageId,
            "pdLevel": global.PDSTAGE,
            "loanApplicationNumber": global.LOANAPPLICATIONNUM
        }

        if (global.PDSTAGE == 'PD_2') {

            appDetails.previousPage = 7;


        } else if (global.PDSTAGE == 'PD_3') {

            appDetails.previousPage = 44;

        }


        apiInstance(baseURL).post(`/api/v1/pd/PdNonGstCustomerDetails/clientId`, appDetails)
            .then((response) => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log("ResponseDataApi::" + JSON.stringify(response.data));

                if (response.status == 200) {
                    setLoading(false)
                    if (response.data === '') {
                        //getDocuments([]);
                    } else {
                        if (response.data.nonGstCustomerDetailsDto) {
                            setParentNonGSTId(response.data.nonGstCustomerDetailsDto.id)
                            const updatedDataArray = [...response.data.nonGstCustomerDetailsDto.pdNonGstCustomerDet];

                            setTotalDeclaredSales(updatedDataArray.reduce((total, month) => total + parseInt(month.sales), 0));
                            setTotalDeclaredPurchases(updatedDataArray.reduce((total, month) => total + parseInt(month.purchase), 0));
                            setTotalVerifiedSales(updatedDataArray.reduce((total, month) => total + parseInt(month.verifiedSales), 0));
                            setTotalVerifiedPurchases(updatedDataArray.reduce((total, month) => total + parseInt(month.verifiedPurchase), 0));

                            setNonGSTData(response.data.nonGstCustomerDetailsDto.pdNonGstCustomerDet)
                        } else {
                            const updatedDataArray = [...response.data.pdNonGstCustomerDet];

                            setTotalDeclaredSales(updatedDataArray.reduce((total, month) => total + parseInt(month.sales), 0));
                            setTotalDeclaredPurchases(updatedDataArray.reduce((total, month) => total + parseInt(month.purchase), 0));
                            setTotalVerifiedSales(updatedDataArray.reduce((total, month) => total + parseInt(month.verifiedSales), 0));
                            setTotalVerifiedPurchases(updatedDataArray.reduce((total, month) => total + parseInt(month.verifiedPurchase), 0));

                            setNonGSTData(response.data.pdNonGstCustomerDet)
                        }

                        //getSavedData(response.data);
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

    const validate = () => {
        var flag = false;
        var i = 1;
        var errorMessage = '';


        setErrMsg(errorMessage);
        return flag;
    };


    const onGoBack = () => {
        props.navigation.replace('PDItems', { clientType: global.CLIENTTYPE });
    }

    const submitNonGSTData = () => {

        if (validate()) {
            showBottomSheet();
            return;
        }

        postNonGSTDetail();

    }

    const postNonGSTDetail = () => {

        const appDetails = {
            "createdBy": global.USERID,
            "id": parentNonGSTId,
            "clientType": global.CLIENTTYPE,
            "pdLevel": global.PDSTAGE,
            "pageId": currentPageId,
            "totalDeclaredSale": parseInt(totalDeclaredSales),
            "totalVerifiedSale": parseInt(totalVerifiedSales),
            "totalDeclaredPurchase": parseInt(totalDeclaredPurchases),
            "totalVerifiedPurchase": parseInt(totalVerifiedPurchases),
            "pdNonGstCustomerDet": nonGSTData
        }

        const baseURL = global.PORT1;
        setLoading(true)

        apiInstance(baseURL).post(`/api/v1/pd/PdNonGstCustomerDetails/loan-application-number/${global.LOANAPPLICATIONNUM}/clientId/${global.CLIENTID}`, appDetails)
            .then((response) => {
                // Handle the response data ${item.clientId}
                if (global.DEBUG_MODE) console.log("PDFeedbackApi::" + JSON.stringify(response.data));
                setLoading(false)
                if (response.status == 200 || response.status == 201) {

                    updatePdStatus();

                }
                else if (response.data.statusCode === 201) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                } else if (response.data.statusCode === 202) {
                    setApiError(response.data.message);
                    setErrorModalVisible(true);
                }
            })
            .catch((error) => {
                // Handle the error
                setLoading(false)
                if (global.DEBUG_MODE) console.log("PDDataApiError::" + JSON.stringify(error.response.data));
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

        //props.deleteTravelDetails(17)
        //props.addTravelDetails(17, 'BusinessDetail1', businessDetails)
        // props.updateTravelDetails(14, 'BusinessDetail', businessDetails.travelDetails)
        //props.navigation.goBack();



        if (Common.DEBUG_MODE) console.log("DateOfTravel::" + dateOfTravel + " " + " Mode Of Travel::" + modeOfTravelLabel + " " +
            "Distance Travelled::" + distanceTravelled + " " + "Remarks::" + remarks)

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


    const handleReference = (componentName) => {

        if (componentName === 'accountHolderName') {

        } else if (componentName === 'ifsccode') {

        }

    };

    const handleClick = (componentName, textValue) => {
        if (componentName === 'remarks') {
            setRemarks(textValue);
        }
    }

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
                            {item.month}
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
                            value={item.sales.toString()}
                            onChangeText={txt => { updateMonthsData(index, 'Sales', txt) }}
                            placeholder={''}
                            contextMenuHidden={true}
                            placeholderTextColor={Colors.lightgrey}
                            keyboardType={'numeric'}
                            multiline={false}
                            editable={false}
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
                            value={item.purchase.toString()}
                            onChangeText={txt => { updateMonthsData(index, 'Purchase', txt) }}
                            placeholder={''}
                            contextMenuHidden={true}
                            placeholderTextColor={Colors.lightgrey}
                            keyboardType={'numeric'}
                            multiline={false}
                            editable={false}
                            maxLength={25}
                            style={{ width: 70, color: Colors.black, overflow: 'scroll' }}
                            returnKeyType={'done'}

                        />
                    </View>

                </View>

                {!item.verified &&
                    <View style={{ width: '90%', alignSelf: 'center', marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>

                        <View style={{ width: '20%' }}>

                        </View>

                        <View style={{ width: '20%' }}>

                        </View>

                        <View style={{ width: '30%', backgroundColor: '#0294ff20', height: 40, borderRadius: 5, margin: 5, flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome style={{ marginLeft: 10 }}
                                name="rupee"
                                size={14}
                                color="#343434"></FontAwesome>
                            <TextInput
                                value={item.verifiedSales.toString()}
                                onChangeText={txt => { updateMonthsData(index, 'Sales', txt) }}
                                placeholder={''}
                                contextMenuHidden={true}
                                placeholderTextColor={Colors.lightgrey}
                                keyboardType={'numeric'}
                                multiline={false}
                                editable={true}
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
                                value={item.verifiedPurchase.toString()}
                                onChangeText={txt => { updateMonthsData(index, 'Purchase', txt) }}
                                placeholder={''}
                                contextMenuHidden={true}
                                placeholderTextColor={Colors.lightgrey}
                                keyboardType={'numeric'}
                                multiline={false}
                                editable={true}
                                maxLength={25}
                                style={{ width: 70, color: Colors.black, overflow: 'scroll' }}
                                returnKeyType={'done'}

                            />
                        </View>

                    </View>
                }

                <View style={{ width: '90%', alignSelf: 'center', marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: '100%' }}>
                        <Text
                            style={{
                                color: Colors.mediumgrey,
                                fontFamily: 'PoppinsRegular'
                            }}>
                            VERIFICATION
                        </Text>
                    </View>
                </View>
                <View style={{ width: '95%', alignSelf: 'center', flexDirection: 'row', alignItems: 'center' }}>

                    <View style={{ width: '45%' }}>
                        <Picker
                            selectedValue={item.verified}
                            enabled={true}
                            mode='dropdown'
                            dropdownIconColor={Colors.black}
                            themeVariant='light'
                            onValueChange={(itemValue, itemIndex) => {
                                //setSelectedValue(itemValue, item)
                                updateVerifiedData(itemValue, index)
                            }}>
                            {/* {componentName == 'productIdPicker' && */}

                            {
                                spinnerList.map(item1 => {
                                    let labelValue;
                                    return <Picker.Item value={item1.subCodeId} label={item1.Description} style={{ backgroundColor: '#fff', color: '#000', fontFamily: 'PoppinsRegular' }} />
                                })
                            }
                        </Picker>
                        <View style={{ width: '100%', height: 1, backgroundColor: Colors.dimText, marginLeft: 15 }} />

                    </View>

                    <View style={{ width: '55%', alignItems: 'flex-end', marginTop: 15 }}>
                        <View
                            style={{
                                marginTop: 10,
                                width: '90%',
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                marginRight: 15
                            }}>
                            <TouchableOpacity onPress={() => showRemarksSheet(item, index)}>
                                {item.remarks ?
                                    (<Text
                                        style={{
                                            color: Colors.darkblue,
                                            fontFamily: 'Poppins-Medium'
                                        }}>
                                        + Edit Remarks
                                    </Text>) : <Text
                                        style={{
                                            color: Colors.darkblue,
                                            fontFamily: 'Poppins-Medium'
                                        }}>
                                        + Add Remarks
                                    </Text>}
                            </TouchableOpacity>
                        </View>
                    </View>

                </View >

                {item.remarks &&

                    <View style={{ width: '91%', alignSelf: 'center', marginTop: 5 }}>
                        <Text style={{ fontSize: 13, color: Colors.lightgrey, fontFamily: 'Poppins-Medium', marginTop: 3 }}>
                            {language[0][props.language].str_remarks}
                        </Text>
                        <View style={{ width: '100%', height: 100, backgroundColor: '#F5F8FA', marginTop: 5 }}>
                            <Text style={{ fontSize: 15, color: Colors.black, fontFamily: 'PoppinsRegular', marginTop: 3, padding: 10 }}>
                                {item.remarks}
                            </Text>
                        </View>
                    </View>
                }

                <View style={{ width: '100%', marginTop: 10, height: 1, backgroundColor: '#DFE6EA', marginLeft: 15 }} />


            </View >
        )

    }

    const updateVerifiedData = (value, index) => {

        const updatedDataArray = [...nonGSTData];
        if (value) {
            updatedDataArray[index].verifiedSales = 0;
            updatedDataArray[index].verifiedPurchase = 0;
        }
        updatedDataArray[index].verified = value;

        setNonGSTData(updatedDataArray);
    }

    const updateMonthsData = (index, value, newAmount) => {
        const updatedDataArray = [...nonGSTData];

        // Update the gstNumber property for the specified index
        if (value == 'Sales') {
            updatedDataArray[index].verifiedSales = newAmount;
        } else if (value == 'Purchase') {
            updatedDataArray[index].verifiedPurchase = newAmount;
        }

        setTotalVerifiedSales(updatedDataArray.reduce((total, month) => total + parseInt(month.verifiedSales), 0));
        setTotalVerifiedPurchases(updatedDataArray.reduce((total, month) => total + parseInt(month.verifiedPurchase), 0));

        // Set the state with the updated array
        setNonGSTData(updatedDataArray);
    }

    const addItem = () => {
        const updatedDataArray = [...nonGSTData];

        updatedDataArray[tempIndex].remarks = remarks;

        setNonGSTData(updatedDataArray);
        setRefreshFlatList(!refreshFlatlist)
        hideRemarksSheet()
    }

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

            <ModalContainer
                visible={remarksModalVisible}
                closeModal={hideRemarksSheet}
                modalstyle={styles.modalContent}
                contentComponent={
                    <View style={[styles.parentView, { backgroundColor: Colors.lightwhite, width: '90%' }]}>
                        <ScrollView
                            style={styles.scrollView}
                            contentContainerStyle={styles.contentContainer}
                            showsVerticalScrollIndicator={false}
                            keyboardShouldPersistTaps="handled">
                            <View style={{ flex: 1 }}>

                                <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                                        <TextComp textVal={'Remarks'} textStyle={Commonstyles.inputtextStyle} Visible={true} />
                                    </View>

                                    <TextInputComp textValue={remarks} textStyle={[Commonstyles.textinputtextStyle, { maxHeight: 100 }]} type='email-address' Disable={false} ComponentName='remarks' returnKey="done" handleClick={handleClick} length={150} multilines={true} />

                                </View>

                                <View style={{ alignItems: 'flex-end', marginTop: 25 }}>
                                    <ButtonViewComp textValue={language[0][props.language].str_add.toUpperCase()} textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }} viewStyle={[Commonstyles.buttonView, { width: 100, height: 20 }]} innerStyle={[Commonstyles.buttonViewInnerStyle, { height: 35 }]} handleClick={() => addItem()} />
                                </View>

                            </View>
                        </ScrollView>
                    </View>
                } />

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
                            <Text style={{ fontSize: 18, color: Colors.darkblack, fontFamily: 'PoppinsRegular', marginTop: 3 }}>
                                Non GST Customer Details
                            </Text>
                        </View>
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
                            data={nonGSTData}
                            renderItem={FlatMonthsView}
                            extraData={setRefreshMonthsFlatList}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </View>

                </View>
            </ScrollView>

            <View style={{ width: '100%', justifyContent: 'center', minHeight: 100, alignSelf: 'center', backgroundColor: '#0294ff20', marginBottom: 15, marginTop: 20, alignItems: 'center' }}>

                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ width: '30%' }}>
                        <Text
                            style={{
                                color: Colors.black,
                                fontFamily: 'Poppins-Bold'
                            }}>
                            Total
                        </Text>
                    </View>

                    <View style={{ width: '30%', alignItems: 'center' }}>
                        <Text
                            style={{
                                color: Colors.black,
                                fontFamily: 'Poppins-Bold'
                            }}>
                            Sales
                        </Text>
                    </View>

                    <View style={{ width: '30%', alignItems: 'center' }}>
                        <Text
                            style={{
                                color: Colors.black,
                                fontFamily: 'Poppins-Bold'
                            }}>
                            Purchase
                        </Text>
                    </View>
                </View>

                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ width: '30%' }}>
                        <Text
                            style={{
                                color: Colors.mediumgrey,
                                fontFamily: 'PoppinsRegular'
                            }}>
                            Declared Value
                        </Text>
                    </View>

                    <View style={{ width: '30%', alignItems: 'center' }}>
                        <Text
                            style={{
                                color: Colors.mediumgrey,
                                fontFamily: 'PoppinsRegular'
                            }}>
                            {totalDeclaredSales.toString()}
                        </Text>
                    </View>

                    <View style={{ width: '30%', alignItems: 'center' }}>
                        <Text
                            style={{
                                color: Colors.mediumgrey,
                                fontFamily: 'PoppinsRegular'
                            }}>
                            {totalDeclaredPurchases.toString()}
                        </Text>
                    </View>
                </View>

                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center' }}>
                    <View style={{ width: '30%' }}>
                        <Text
                            style={{
                                color: Colors.black,
                                fontFamily: 'Poppins-Medium'
                            }}>
                            Verified Value
                        </Text>
                    </View>

                    <View style={{ width: '30%', alignItems: 'center' }}>
                        <Text
                            style={{
                                color: Colors.black,
                                fontFamily: 'Poppins-Medium'
                            }}>
                            {totalVerifiedSales.toString()}
                        </Text>
                    </View>

                    <View style={{ width: '30%', alignItems: 'center' }}>
                        <Text
                            style={{
                                color: Colors.black,
                                fontFamily: 'Poppins-Medium'
                            }}>
                            {totalVerifiedPurchases.toString()}
                        </Text>
                    </View>
                </View>

            </View>

            <ButtonViewComp
                textValue={language[0][props.language].str_submit.toUpperCase()}
                textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500, marginBottom: 5 }}
                viewStyle={[Commonstyles.buttonView, { marginBottom: 15 }]}
                innerStyle={Commonstyles.buttonViewInnerStyle}
                handleClick={submitNonGSTData}
            />

        </SafeAreaView >
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
        pdSubStage: pdSubStages
    }
};

const mapDispatchToProps = dispatch => ({
    languageAction: item => dispatch(languageAction(item)),
    addTravelDetails: (loanApplicationId, item, key) => dispatch(addTravelDetails(loanApplicationId, item, key)),
    updateTravelDetails: (loanApplicationId, key, travelDetails) => dispatch(updateTravelDetails(loanApplicationId, key, travelDetails)),
    deleteTravelDetails: (item) => dispatch(deleteTravelDetails(item)),
    deleteOfficerTravelDetails: (loanApplicationId, index) => dispatch(deleteOfficerTravelDetails(loanApplicationId, index)),
    updatePDSubStage: item => dispatch(updatePDSubStage(item)),
    updatePDModule: (subStage, module) => dispatch(updatePDModule(subStage, module)),
    updatePDSubModule: (subStage, module, subModule) => dispatch(updatePDSubModule(subStage, module, subModule)),
    updatePDPage: (subStage, module, subModule, page) => dispatch(updatePDPage(subStage, module, subModule, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PDNonGSTDetail);
const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#f5f8fa',
        alignItems: 'center'
    },
    parentView: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {

        paddingBottom: 50,
        flexGrow: 1
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
    line: {
        backgroundColor: '#f1f1f1', // Change the color as needed
        height: 1,
        width: '90%', marginLeft: '5%',
        marginTop: '5%', alignItems: 'center'         // Adjust the height as needed
    },
    disableBg: {
        width: '88%', height: 50, backgroundColor: Colors.disableBg,
        borderRadius: 45, alignItems: 'center', justifyContent: 'center'
    },
    enableBg: {
        width: '88%', height: 50, backgroundColor: Colors.enableBg,
        borderRadius: 45, alignItems: 'center', justifyContent: 'center'
    }, fab: {
        position: 'absolute',
        margin: 0,
        right: 0,
        bottom: 12,
        width: '100%',

    },
    modalContent: {
        width: '90%',  // Set width to 90% of the screen width
        aspectRatio: 1.5,
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 20,
        alignItems: 'center',
    },

});
