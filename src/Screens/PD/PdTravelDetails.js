/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    SafeAreaView,
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
import { addTravelDetails, updateTravelDetails, deleteTravelDetails, deleteOfficerTravelDetails } from '../../Utils/redux/actions/PersonalDiscussionAction';


const PdTravelDetails = (props, { navigation }) => {
    const [loading, setLoading] = useState(false);
    const [pdDetails, setPdDetails] = useState([]);
    const [refreshFlatlist, setRefreshFlatList] = useState(false);
    const isScreenVisible = useIsFocused();
    const [profileDetail, setProfileDetail] = useState(props.profiledetail.userPersonalDetailsDto);

    const [dateOfTravel, setDateOfTravel] = useState('');
    const [dateOfTravelCaption, setDateOfTravelCaption] = useState('DATE OF TRAVEL');
    const [dateOfTravelMan, setDateOfTravelMan] = useState(false);
    const [dateOfTravelVisible, setDateOfTravelVisible] = useState(true);
    const [dateOfTravelDisable, setDateOfTravelDisable] = useState(false);
    const dateOfTravelRef = useRef(null);

    const [personalDiscussionDate, setPersonalDiscussionDate] = useState('');
    const [personalDiscussionDateCaption, setPersonalDiscussionDateCaption] = useState('PERSONAL DISCUSSION DATE');
    const [personalDiscussionDateMan, setPersonalDiscussionDateMan] = useState(false);
    const [personalDiscussionDateVisible, setPersonalDiscussionDateVisible] = useState(true);
    const [personalDiscussionDateDisable, setPersonalDiscussionDateDisable] = useState(false);
    const personalDiscussionDateRef = useRef(null);

    const [modeOfTravelMan, setModeOfTravelMan] = useState(false);
    const [modeOfTravelVisible, setModeOfTravelVisible] = useState(true);
    const [modeOfTravelDisable, setModeOfTravelDisable] = useState(false);
    const [modeOfTravelData, setModeOfTravelData] = useState([]);
    const [modeOfTravelCaption, setModeOfTravelCaption] = useState('MODE OF TRAVEL');
    const [modeOfTravelLabel, setModeOfTravelLabel] = useState('');
    const [modeOfTravelIndex, setModeOfTravelIndex] = useState('');

    const [distanceTravelled, setDistanceTravelled] = useState('');
    const [distanceTravelledCaption, setNomineeBranchNameCaption] = useState('DISTANCE TRAVELLED (IN KM)');
    const [distanceTravelledMan, setNomineeBranchNameMan] = useState(false);
    const [distanceTravelledVisible, setNomineeBranchNameVisible] = useState(true);
    const [distanceTravelledDisable, setNomineeBranchNameDisable] = useState(false);
    const distanceTravelledRef = useRef(null);

    const [remarks, setRemarks] = useState('');
    const [remarksCaption, setRemarksCaption] = useState('Remarks');
    const [remarksMan, setRemarksMan] = useState(false);
    const [remarksVisible, setRemarksVisible] = useState(true);
    const [remarksDisable, setRemarksDisable] = useState(false);
    const remarksRef = useRef(null);

    const [componentName, setComponentName] = useState('officer');
    const [officerMainList, setOfficerMainList] = useState([]);
    const [officerList, setOfficerList] = useState([]);
    const [officerModalVisible, setOfficerModalVisible] = useState(false);
    const showOfficerSheet = (label) => {
        setComponentName(label)
        setOfficerModalVisible(true)
    };
    const hideOfficerSheet = () => setOfficerModalVisible(false);

    const [empID, setEmpID] = useState('');
    const [officerIDLabel, setOfficerIDLabel] = useState('');
    const [officerIDIndex, setOfficerIDIndex] = useState('');
    const [pageId, setPageId] = useState(global.CURRENTPAGEID);
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

    const [isTravelDetailPresent, setIsTravelDetailPresent] = useState(false);
    const [travelDetails, setTravelDetails] = useState(false);

    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        getSystemCodeDetail();
        //makeSystemMandatoryFields();
        // props.deleteTravelDetails(131)
        getTravelDetails();


        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }
    }, [props.navigation, isScreenVisible]);

    const handleBackButton = () => {
        onGoBack();
        return true; // Prevent default back button behavior
    };

    const getTravelDetails = async () => {
        const specificItem = props.pdDetail.find(
            (item) => item.loanApplicationId === global.LOANAPPLICATIONID && item.pdTravelDetailsDto
        );

        if (specificItem) {
            if (Common.DEBUG_MODE) console.log("TravelDetails:::::" + JSON.stringify(specificItem))
            let dataArray = [];
            specificItem.pdTravelDetailsDto.pdaccompanyingOfficerDomains.forEach(data => {
                dataArray.push({
                    employeeId: data.employeeId,
                    accompanyingOfficer: data.accompanyingOfficer,
                });
            });
            setDateOfTravel(Common.convertDateFormat(specificItem.pdTravelDetailsDto.dateOfTravel));
            setPersonalDiscussionDate(Common.convertDateFormat(specificItem.pdTravelDetailsDto.personalDiscussionDate));
            setModeOfTravelLabel(specificItem.pdTravelDetailsDto.modeOfTravel)
            setDistanceTravelled(specificItem.pdTravelDetailsDto.distanceTravelled.toString())
            setRemarks('')
            setOfficerMainList(dataArray);
            setRefreshFlatList(!refreshFlatlist)
            setTravelDetails(specificItem);
        }
    }

    const getSystemCodeDetail = async () => {

        const filteredModeOfTravelData = leaduserCodeDetail
            .filter(data => data.masterId === 'MODE_OF_TRAVEL')
            .sort((a, b) => a.Description.localeCompare(b.Description));
        setModeOfTravelData(filteredModeOfTravelData);


    };

    const makeSystemMandatoryFields = async () => {

        systemMandatoryField
            .filter(data => data.fieldUiid === 'et_travelDate' && data.pageId === pageId)
            .map((value, index) => {
                setDateOfTravelCaption(value.fieldName);

                if (value.isMandatory) {
                    setDateOfTravelMan(true);
                }
                if (value.isHide) {
                    setDateOfTravelVisible(false);
                }
                if (value.isDisable) {
                    setDateOfTravelDisable(true);
                }
                if (value.isCaptionChange) {
                    setDateOfTravelCaption(value[0].fieldCaptionChange);
                }
            });



    };


    const validate = () => {
        var flag = false;
        var i = 1;
        var errorMessage = '';

        if (dateOfTravelMan && dateOfTravelVisible) {
            if (dateOfTravel.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsselect +
                    dateOfTravelCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (personalDiscussionDateMan && personalDiscussionDateVisible) {
            if (personalDiscussionDate.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsselect +
                    personalDiscussionDateCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (modeOfTravelMan && modeOfTravelVisible) {
            if (modeOfTravelLabel.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsselect +
                    modeOfTravelCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (distanceTravelledMan && distanceTravelledVisible) {
            if (distanceTravelled.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsenter +
                    distanceTravelledCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (officerMainList.length <= 0) {
            errorMessage =
                errorMessage +
                i +
                ')' +
                ' ' +
                'Please Add ' +
                'Officer' +
                '\n';
            i++;
            flag = true;
        }



        setErrMsg(errorMessage);
        return flag;
    };


    const callPickerApi = () => {

        if (officerList.length > 0) {
            showOfficerSheet('Income')
            return;
        }

        const baseURL = '8901'
        setLoading(true)

        apiInstance(baseURL).post(`/api/v1/lead-Approved/ReAssignedDrowdown/${profileDetail.branchId}`)
            .then(async (response) => {

                //setOfficerList(response.data)
                let dataArray = [];
                response.data.forEach(data => {
                    dataArray.push({
                        subCodeId: data.userId.toString(),
                        Description: data.userName,
                    });
                });
                setOfficerList(dataArray);
                showOfficerSheet('Income')
                setLoading(false);

            })
            .catch((error) => {
                if (global.DEBUG_MODE) console.log("Error" + JSON.stringify(error.response))
                setLoading(false)
                alert(error);
            });


    }

    const onGoBack = () => {
        props.navigation.goBack();
    }
    const addItem = () => {

        if (officerIDLabel.length <= 0 || empID.length <= 0) {
            showToast();
            return;
        }
        const newDataArray = [...officerMainList];

        let OfficerName = '';
        const matchingItem = officerList.find((data) => data.subCodeId === officerIDLabel);
        if (matchingItem) {
            OfficerName = matchingItem.Description;
        }
        const newObject = {
            officerID: officerIDLabel,
            accompanyingOfficer: OfficerName,
            employeeId: empID
        };
        newDataArray.push(newObject);
        setOfficerIDLabel('');
        setOfficerIDIndex('');
        setEmpID('')
        hideOfficerSheet(true)

        //alert(JSON.stringify(newDataArray))
        setOfficerMainList(newDataArray)
        setRefreshFlatList(!refreshFlatlist)
    }

    const deleteOfficer = (data) => {
        const updatedOfficerList = officerMainList.filter((item) => item.officerID !== data.officerID);
        setOfficerMainList(updatedOfficerList)
        setRefreshFlatList(!refreshFlatlist)
    }

    const submitTravelData = () => {

        if (validate()) {
            showBottomSheet();
            return;
        }

        if (travelDetails) {
            putTravelDetails(travelDetails.pdTravelDetailsDto.id);
        } else {
            postTravelDetails();
        }

        //postTravelDetails();

    }

    const postTravelDetails = () => {
        const appDetailsFinal = []
        officerMainList.map((item) => {
            const appDetails = {
                "createdBy": global.USERID,
                "accompanyingOfficer": item.accompanyingOfficer,
                "employeeId": item.employeeId,
            }
            appDetailsFinal.push(appDetails)
        });

        var pdDate = '', dateoftravel = '';

        if (personalDiscussionDate != undefined && personalDiscussionDate != null) {
            if (personalDiscussionDate.length > 0) {
                pdDate = Common.convertYearDateFormat(personalDiscussionDate)
            }
        }

        if (dateOfTravel != undefined && dateOfTravel != null) {
            if (dateOfTravel.length > 0) {
                dateoftravel = Common.convertYearDateFormat(dateOfTravel)
            }
        }

        const appDetails = {
            "createdBy": global.USERID,
            "personalDiscussionDate": pdDate,
            "modeOfTravel": modeOfTravelLabel,
            "dateOfTravel": dateoftravel,
            "clientType": global.CLIENTTYPE,
            "pdLevel": global.SUBSTAGE,
            "distanceTravelled": distanceTravelled,
            "pdaccompanyingOfficerDomains": appDetailsFinal
        }

        const baseURL = '8901'
        setLoading(true)

        apiInstance(baseURL).post(`api/v1/pd/travelDetails/loan-application-number/${global.LOANAPPLICATIONNUM}/personal-discussion/clientId/${global.CLIENTID}`, appDetails)
            .then((response) => {
                // Handle the response data ${item.clientId}
                if (global.DEBUG_MODE) console.log("PDTravelDetailsApi::" + JSON.stringify(response.data));
                setLoading(false)

                props.addTravelDetails(global.LOANAPPLICATIONID, 'pdTravelDetailsDto', response.data)
                props.navigation.goBack()
            })
            .catch((error) => {
                // Handle the error
                setLoading(false)
                if (global.DEBUG_MODE) console.log("PDDataApiError::" + JSON.stringify(error.response.data));
                if (error.response.data != null) {
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

    const putTravelDetails = (travelID) => {
        const appDetailsFinal = []
        officerMainList.map((item) => {
            const appDetails = {
                "createdBy": global.USERID,
                "accompanyingOfficer": item.accompanyingOfficer,
                "employeeId": item.employeeId,
            }
            appDetailsFinal.push(appDetails)
        });

        var pdDate = '', dateoftravel = '';

        if (personalDiscussionDate != undefined && personalDiscussionDate != null) {
            if (personalDiscussionDate.length > 0) {
                pdDate = Common.convertYearDateFormat(personalDiscussionDate)
            }
        }

        if (dateOfTravel != undefined && dateOfTravel != null) {
            if (dateOfTravel.length > 0) {
                dateoftravel = Common.convertYearDateFormat(dateOfTravel)
            }
        }

        const appDetails = {
            "createdBy": global.USERID,
            "id": travelID,
            "personalDiscussionDate": pdDate,
            "modeOfTravel": modeOfTravelLabel,
            "dateOfTravel": dateoftravel,
            "clientType": global.CLIENTTYPE,
            "pdLevel": global.SUBSTAGE,
            "distanceTravelled": distanceTravelled,
            "pdaccompanyingOfficerDomains": appDetailsFinal
        }

        const baseURL = '8901'
        setLoading(true)

        apiInstance(baseURL).put(`api/v1/pd/travelDetails/update/id/${travelID}`, appDetails)
            .then((response) => {
                // Handle the response data ${item.clientId}
                if (global.DEBUG_MODE) console.log("PDTravelDetailsApi::" + JSON.stringify(response.data));
                setLoading(false)

                props.addTravelDetails(global.LOANAPPLICATIONID, 'pdTravelDetailsDto', response.data)
                props.navigation.goBack()
            })
            .catch((error) => {
                // Handle the error
                setLoading(false)
                if (global.DEBUG_MODE) console.log("PDDataApiError::" + JSON.stringify(error.response.data));
                if (error.response.data != null) {
                    setApiError(error.response.data.message);
                    setErrorModalVisible(true)
                }
            });
    }

    const FlatView = ({ item }) => {
        return (
            <View style={{ width: '100%', alignItems: 'center', marginTop: 15 }}>
                <View style={{ width: '90%', minHeight: 100, backgroundColor: '#E5F4FE', borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                    <ImageComp imageSrc={item.colorCode == 'Green' ? require('../../Images/income.png') : require('../../Images/expense.png')} imageStylee={{ marginLeft: 10, width: 30, height: 30 }} />
                    <View style={{ width: '80%' }}>

                        <Text style={{ width: '80%', fontSize: 12, fontFamily: 'PoppinsRegular', marginTop: 5, color: Colors.black, marginLeft: 10 }}>
                            {item.accompanyingOfficer}
                        </Text>

                        <Text style={{ width: '80%', fontSize: 12, fontFamily: 'Poppins-Medium', marginTop: 5, color: Colors.black, marginLeft: 10 }}>
                            {item.employeeId}
                        </Text>

                    </View>
                    <View>
                        <MaterialCommunityIcons
                            name="delete"
                            size={20}
                            onPress={() => { deleteOfficer(item) }}
                            color="#F76464"></MaterialCommunityIcons>
                    </View>
                </View>
            </View >
        )
    }


    const handleReference = (componentName) => {

        if (componentName === 'accountHolderName') {

        } else if (componentName === 'ifsccode') {

        }

    };

    const handleClick = (componentName, textValue) => {
        if (componentName === 'DOT') {
            setDateOfTravel(textValue);
        } else if (componentName === 'PDD') {
            setPersonalDiscussionDate(textValue);
        } else if (componentName === 'empid') {
            setEmpID(textValue);
        } else if (componentName === 'distance') {
            setDistanceTravelled(textValue);
        } else if (componentName === 'remarks') {
            setRemarks(textValue);
        }
    }
    const handlePickerClick = (componentName, label, index) => {
        if (componentName === 'mot') {
            setModeOfTravelLabel(label);
            setModeOfTravelIndex(index);
        } else if (componentName === 'officerlist') {
            setOfficerIDLabel(label);
            setEmpID(label)
            setOfficerIDIndex(index);
        }
    }

    const showToast = () => {
        ToastAndroid.showWithGravityAndOffset(
            'Please Enter All Details',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50
        );
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

                    <ModalContainer
                        visible={officerModalVisible}
                        closeModal={hideOfficerSheet}
                        contentComponent={
                            <SafeAreaView style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>
                                <ScrollView
                                    style={styles.scrollView}
                                    contentContainerStyle={styles.contentContainer}
                                    showsVerticalScrollIndicator={false}
                                    keyboardShouldPersistTaps="handled">
                                    <View style={{ flex: 1 }}>


                                        <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>

                                                <TextComp textVal={'Accompanying Officer (Branch)'} textStyle={Commonstyles.inputtextStyle} Visible={true} />

                                            </View>

                                            <PickerComp textLabel={officerIDLabel} pickerStyle={Commonstyles.picker} Disable={false} pickerdata={officerList} componentName='officerlist' handlePickerClick={handlePickerClick} />


                                        </View>

                                        <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                                                <TextComp textVal={'Employee ID'} textStyle={Commonstyles.inputtextStyle} Visible={true} />
                                            </View>

                                            <TextInputComp textValue={empID} textStyle={[Commonstyles.textinputtextStyle, { maxHeight: 100 }]} type='numeric' Disable={true} ComponentName='empid' returnKey="done" handleClick={handleClick} length={10} multilines={true} />

                                        </View>

                                        <View style={{ alignItems: 'flex-end', marginTop: 25 }}>
                                            <ButtonViewComp textValue={language[0][props.language].str_add.toUpperCase()} textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }} viewStyle={[Commonstyles.buttonView, { width: 100, height: 20 }]} innerStyle={[Commonstyles.buttonViewInnerStyle, { height: 35 }]} handleClick={addItem} />
                                        </View>

                                    </View>
                                </ScrollView>
                            </SafeAreaView>
                        }
                    />

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
                                {language[0][props.language].str_traveldetails}
                            </Text>
                        </View>
                    </View>
                    {dateOfTravelVisible && (
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
                                    textVal={dateOfTravelCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={dateOfTravelMan}
                                />
                            </View>

                            <View style={{ width: '100%', alignItems: 'center' }}>
                                <DateInputComp textStyle={[Commonstyles.inputtextStyle, { width: '90%' }]} ComponentName="DOT"
                                    textValue={dateOfTravel}
                                    type="numeric"
                                    handleClick={handleClick}
                                    Disable={dateOfTravelDisable}
                                    reference={dateOfTravelRef}
                                    minDate={new Date()}
                                />
                            </View>

                        </View>
                    )}

                    {personalDiscussionDateVisible && (
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
                                    textVal={personalDiscussionDateCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={personalDiscussionDateMan}
                                />
                            </View>

                            <View style={{ width: '100%', alignItems: 'center' }}>
                                <DateInputComp textStyle={[Commonstyles.inputtextStyle, { width: '90%' }]} ComponentName="PDD"
                                    textValue={personalDiscussionDate}
                                    type="numeric"
                                    handleClick={handleClick}
                                    Disable={personalDiscussionDateDisable}
                                    reference={personalDiscussionDateRef}
                                    minDate={new Date()}
                                />
                            </View>

                        </View>
                    )}

                    {modeOfTravelVisible && (
                        <View
                            style={{
                                width: '100%',
                                alignItems: 'center',
                                marginTop: '4%',
                            }}>
                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                                <TextComp
                                    textVal={modeOfTravelCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={modeOfTravelMan}
                                />
                            </View>

                            <PickerComp
                                textLabel={modeOfTravelLabel}
                                pickerStyle={Commonstyles.picker}
                                Disable={modeOfTravelDisable}
                                pickerdata={modeOfTravelData}
                                componentName="mot"
                                handlePickerClick={handlePickerClick}
                            />
                        </View>
                    )}

                    {distanceTravelledVisible && (
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
                                    textVal={distanceTravelledCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={distanceTravelledMan}
                                />
                            </View>

                            <TextInputComp
                                textValue={distanceTravelled}
                                textStyle={Commonstyles.textinputtextStyle}
                                type="number-pad"
                                Disable={distanceTravelledDisable}
                                ComponentName="distance"
                                reference={distanceTravelledRef}
                                returnKey="next"
                                handleClick={handleClick}
                                handleReference={handleReference}
                            />
                        </View>
                    )}

                    {remarksVisible && (
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
                                    textVal={remarksCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={remarksMan}
                                />
                            </View>

                            <TextInputComp
                                textValue={remarks}
                                textStyle={Commonstyles.textinputtextStyle}
                                type="email-address"
                                Disable={remarksDisable}
                                ComponentName="remarks"
                                reference={remarksRef}
                                returnKey="next"
                                handleClick={handleClick}
                                handleReference={handleReference}
                            />
                        </View>
                    )}

                    <View
                        style={{
                            marginTop: 25,
                            width: '90%',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                        }}>
                        <TouchableOpacity onPress={() => callPickerApi()}>
                            <Text
                                style={{
                                    color: Colors.darkblue,
                                    fontFamily: 'Poppins-Medium'
                                }}>
                                + Add Officer
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={officerMainList}
                        renderItem={FlatView}
                        extraData={refreshFlatlist}
                        keyExtractor={(item, index) => index.toString()}
                    />

                    <ButtonViewComp
                        textValue={language[0][props.language].str_submit.toUpperCase()}
                        textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500, marginBottom: 5 }}
                        viewStyle={Commonstyles.buttonView}
                        innerStyle={Commonstyles.buttonViewInnerStyle}
                        handleClick={submitTravelData}
                    />

                </View>
            </ScrollView>

        </SafeAreaView >
    );
};

const mapStateToProps = state => {
    const { language } = state.languageReducer;
    const { profileDetails } = state.profileReducer;
    const { mobileCodeDetails } = state.mobilecodeReducer;
    const { pdDetails } = state.personalDiscussionReducer;
    return {
        language: language,
        profiledetail: profileDetails,
        pdDetail: pdDetails,
        mobilecodedetail: mobileCodeDetails
    }
};

const mapDispatchToProps = dispatch => ({
    languageAction: item => dispatch(languageAction(item)),
    addTravelDetails: (loanApplicationId, item, key) => dispatch(addTravelDetails(loanApplicationId, item, key)),
    updateTravelDetails: (loanApplicationId, key, travelDetails) => dispatch(updateTravelDetails(loanApplicationId, key, travelDetails)),
    deleteTravelDetails: (item) => dispatch(deleteTravelDetails(item)),
    deleteOfficerTravelDetails: (loanApplicationId, index) => dispatch(deleteOfficerTravelDetails(loanApplicationId, index)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PdTravelDetails);
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

});
