import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    Image,
    Text,
    CheckBox,
    BackHandler
} from 'react-native';
import apiInstance from '../../../Utils/apiInstance';
import apiInstancelocal from '../../../Utils/apiInstancelocal';
import Colors from '../../../Utils/Colors';
import MyStatusBar from '../../../Components/MyStatusBar';
import Loading from '../../../Components/Loading';
import TextComp from '../../../Components/TextComp';
import { connect } from 'react-redux';
import { languageAction } from '../../../Utils/redux/actions/languageAction';
import { dedupeAction } from '../../../Utils/redux/actions/ProfileAction';
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
import { Directions } from 'react-native-gesture-handler';
import ChildHeadComp from '../../../Components/ChildHeadComp';
import CheckBoxComp from '../../../Components/CheckBoxComp';
import DateTimePicker from '@react-native-community/datetimepicker';
import DateComp from '../../../Components/Filter/DateComp';
import DateInputComp from '../../../Components/DateInputComp';
import ErrorModal from '../../../Components/ErrorModal';
import DedupeModal from '../../../Components/DedupeModal';
import { useIsFocused } from '@react-navigation/native';
import tbl_client from '../../../Database/Table/tbl_client';
import tbl_loanApplication from '../../../Database/Table/tbl_loanApplication';
import tbl_familydetails from '../../../Database/Table/tbl_familydetails';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { addLoanInitiationDetails, updateLoanInitiationDetails, deleteLoanInitiationDetails, updateClientDetails } from '../../../Utils/redux/actions/loanInitiationAction';


const LoanDemographicFamilyDetails = (props) => {
    var aadhar = "";
    const [loading, setLoading] = useState(false);

    const [mobileNumber, setMobileNumber] = useState('');
    const [isMobileVerified, setIsMobileVerified] = useState('0');
    const [mobileNumberCaption, setMobileNumberCaption] =
        useState('MOBILE NUMBER');
    const [mobileNumberMan, setMobileNumberMan] = useState(false);
    const [mobileNumberVisible, setMobileNumberVisible] = useState(true);
    const [mobileNumberDisable, setMobileNumberDisable] = useState(false);
    const [KYCDetalsCaption, setKYCDetailsCaption] = useState('KYC Details');

    const [errMsg, setErrMsg] = useState('');
    const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
    const showBottomSheet = () => setBottomErrorSheetVisible(true);
    const hideBottomSheet = () => setBottomErrorSheetVisible(false);
    const mobileNumberRef = useRef(null);
    const isScreenVisible = useIsFocused();

    //loanType - dropdown
    const [relationTypeMan, setRelationTypeMan] = useState(false); //Manditory or not
    const [relationTypeVisible, setRelationTypeVisible] = useState(true); //Hide or not
    const [relationTypeDisable, setRelationTypeDisable] = useState(false); //Enable or Disable
    const [relationTypeData, setRelationTypeData] = useState([]); //DataPicking
    const [relationTypeCaption, setRelationTypeCaption] = useState('RELATION TYPE'); //FieldCaption
    const [relationTypeLabel, setRelationTypeLabel] = useState('');
    const [relationTypeIndex, setRelationTypeIndex] = useState('');

    const [relationStatuswithCOAPPMan, setRelationStatuswithCOAPPMan] = useState(false); //Manditory or not
    const [relationStatuswithCOAPPVisible, setRelationStatuswithCOAPPVisible] = useState(true); //Hide or not
    const [relationStatuswithCOAPPDisable, setRelationStatuswithCOAPPDisable] = useState(false); //Enable or Disable
    const [relationStatuswithCOAPPData, setRelationStatuswithCOAPPData] = useState([]); //DataPicking
    const [relationStatuswithCOAPPCaption, setRelationStatuswithCOAPPCaption] = useState('RELATIONSHIP STATUS WITH CO-APPLICANT'); //FieldCaption
    const [relationStatuswithCOAPPLabel, setRelationStatuswithCOAPPLabel] = useState('');
    const [relationStatuswithCOAPPIndex, setRelationStatuswithCOAPPIndex] = useState('');

    const [relationStatuswithGRNTRMan, setRelationStatuswithGRNTRMan] = useState(false); //Manditory or not
    const [relationStatuswithGRNTRVisible, setRelationStatuswithGRNTRVisible] = useState(true); //Hide or not
    const [relationStatuswithGRNTRDisable, setRelationStatuswithGRNTRDisable] = useState(false); //Enable or Disable
    const [relationStatuswithGRNTRData, setRelationStatuswithGRNTRData] = useState([]); //DataPicking
    const [relationStatuswithGRNTRCaption, setRelationStatuswithGRNTRCaption] = useState('RELATIONSHIP STATUS WITH GURANTOR'); //FieldCaption
    const [relationStatuswithGRNTRLabel, setRelationStatuswithGRNTRLabel] = useState('');
    const [relationStatuswithGRNTRIndex, setRelationStatuswithGRNTRIndex] = useState('');

    const [DOB, setDOB] = useState('');
    const [DOBCaption, setDOBCaption] = useState('DATE OF BIRTH');
    const [DOBMan, setDOBMan] = useState(false);
    const [DOBVisible, setDOBVisible] = useState(true);
    const [DOBDisable, setDOBDisable] = useState(false);
    const DOBRef = useRef(null);

    const [Age, setAge] = useState('');
    const [AgeCaption, setAgeCaption] = useState('AGE');
    const [AgeMan, setAgeMan] = useState(false);
    const [AgeVisible, setAgeVisible] = useState(true);
    const [AgeDisable, setAgeDisable] = useState(false);
    const AgeRef = useRef(null);



    const [titleCaption, setTitleCaption] = useState('TITLE');
    const [titleMan, setTitleMan] = useState(false);
    const [titleVisible, setTitleVisible] = useState(true);
    const [titleDisable, setTitleDisable] = useState(false);
    const [titleLabel, setTitleLabel] = useState('');
    const [titleIndex, setTitleIndex] = useState('');
    const [titleData, setTitleData] = useState([]);

    const [genderCaption, setGenderCaption] = useState('GENDER');
    const [genderMan, setGenderMan] = useState(false);
    const [genderVisible, setGenderVisible] = useState(true);
    const [genderDisable, setGenderDisable] = useState(false);
    const [genderLabel, setGenderLabel] = useState('');
    const [genderIndex, setGenderIndex] = useState('');
    const [genderData, setGenderData] = useState([]);


    const [KycType1Man, setKycType1Man] = useState(false);
    const [KycType1Visible, setKycType1Visible] = useState(true);
    const [KycType1Disable, setKycType1Disable] = useState(false);
    const [KycType1Data, setKycType1Data] = useState([]);
    const [KycType1Caption, setKycType1Caption] = useState('KYC TYPE 1');
    const [KycType1Label, setKycType1Label] = useState('');
    const [KycType1Index, setKycType1Index] = useState('');


    const [expiryDate1, setExpiry1Date] = useState('');
    const [expiryDate2, setExpiry2Date] = useState('');
    const [expiryDate3, setExpiry3Date] = useState('');
    const [expiryDate4, setExpiry4Date] = useState('');
    const [expiryDateCaption, setExpiryDateCaption] = useState("EXPIRY DATE",);
    const [expiryDate1Man, setExpiry1DateMan] = useState(false);
    const [expiryDate2Man, setExpiry2DateMan] = useState(false);
    const [expiryDate3Man, setExpiry3DateMan] = useState(false);
    const [expiryDate4Man, setExpiry4DateMan] = useState(false);
    const [expiryDate1Visible, setExpiry1DateVisible] = useState(false);
    const [expiryDate2Visible, setExpiry2DateVisible] = useState(false);
    const [expiryDate3Visible, setExpiry3DateVisible] = useState(false);
    const [expiryDate4Visible, setExpiry4DateVisible] = useState(false);
    const [expiryDate1Disable, setExpiry1DateDisable] = useState(false);
    const [expiryDate2Disable, setExpiry2DateDisable] = useState(false);
    const [expiryDate3Disable, setExpiry3DateDisable] = useState(false);
    const [expiryDate4Disable, setExpiry4DateDisable] = useState(false);
    const expityDate1Ref = useRef(null);
    const expityDate2Ref = useRef(null);
    const expityDate3Ref = useRef(null);
    const expityDate4Ref = useRef(null);

    const [KycType2Man, setKycType2Man] = useState(false);
    const [KycType2Visible, setKycType2Visible] = useState(true);
    const [KycType2Disable, setKycType2Disable] = useState(false);
    const [KycType2Data, setKycType2Data] = useState([]);
    const [KycType2Caption, setKycType2Caption] = useState('KYC TYPE 2');
    const [KycType2Label, setKycType2Label] = useState('');
    const [KycType2Index, setKycType2Index] = useState('');

    const [KycType3Man, setKycType3Man] = useState(false);
    const [KycType3Visible, setKycType3Visible] = useState(true);
    const [KycType3Disable, setKycType3Disable] = useState(false);
    const [KycType3Data, setKycType3Data] = useState([]);
    const [KycType3Caption, setKycType3Caption] = useState('KYC TYPE 3');
    const [KycType3Label, setKycType3Label] = useState('');
    const [KycType3Index, setKycType3Index] = useState('');

    const [KycType4Man, setKycType4Man] = useState(false);
    const [KycType4Visible, setKycType4Visible] = useState(true);
    const [KycType4Disable, setKycType4Disable] = useState(false);
    const [KycType4Data, setKycType4Data] = useState([]);
    const [KycType4Caption, setKycType4Caption] = useState('KYC TYPE 4');
    const [KycType4Label, setKycType4Label] = useState('');
    const [KycType4Index, setKycType4Index] = useState('');

    //kycid1 -- TextInput
    const [kycID1, setkycID1] = useState('');
    const [kycNumberTypeID1, setkycNumberTypeID1] = useState('numeric');
    const [kycID1Caption, setkycID1Caption] = useState('KYC ID 1');
    const KycID1Ref = useRef(null);

    const [kycID2, setkycID2] = useState('');
    const [kycNumberTypeID2, setkycNumberTypeID2] = useState('numeric');
    const [kycID2Caption, setkycID2Caption] = useState('KYC ID 2');
    const KycID2Ref = useRef(null);

    const [kycID3, setkycID3] = useState('');
    const [kycNumberTypeID3, setkycNumberTypeID3] = useState('numeric');
    const [kycID3Caption, setkycID3Caption] = useState('KYC ID 3');
    const KycID3Ref = useRef(null);

    const [kycID4, setkycID4] = useState('');
    const [kycNumberTypeID4, setkycNumberTypeID4] = useState('numeric');
    const [kycID4Caption, setkycID4Caption] = useState('KYC ID 4');
    const KycID4Ref = useRef(null);

    const [Name, setName] = useState('');
    const [NameCaption, setNameCaption] = useState('NAME');
    const [NameMan, setNameMan] = useState(false);
    const [NameVisible, setNameVisible] = useState(true);
    const [NameDisable, setNameDisable] = useState(false);
    const NameRef = useRef(null);
    const [workflowIDLabel, setWorkflowIDLabel] = useState('');
    const [relationID, setRelationID] = useState();
    const [familyID, setFamilyID] = useState('');


    const [leadsystemCodeDetail, setLeadSystemCodeDetail] = useState(props.mobilecodedetail.leadSystemCodeDto);
    const [systemCodeDetail, setSystemCodeDetail] = useState(props.mobilecodedetail.t_SystemCodeDetail);
    const [leaduserCodeDetail, setLeadUserCodeDetail] = useState(props.mobilecodedetail.leadUserCodeDto);
    const [userCodeDetail, setUserCodeDetail] = useState(props.mobilecodedetail.t_UserCodeDetail);
    const [bankUserCodeDetail, setBankUserCodeDetail] = useState(props.mobilecodedetail.t_BankUserCode);
    const [workFlowDetail, setWorkFlowDetail] = useState(props.mobilecodedetail.wfConfig1s);
    const [kycConifig, setKYCConfig] = useState(props.mobilecodedetail.loanProductKycLink);

    const [systemMandatoryField, setSystemMandatoryField] = useState(props.mobilecodedetail.processSystemMandatoryFields);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');
    const [minLoanAmount, setMinLoanAmount] = useState(0);
    const [maxLoanAmount, setMaxLoanAmount] = useState(0);


    const [aadharNumber, setAadharNumber] = useState('');
    const [pageId, setPageId] = useState(global.CURRENTPAGEID);

    const [dedupeModalVisible, setDedupeModalVisible] = useState(false);
    const [isDedupeDone, setIsDedupeDone] = useState(false);
    const [onlyView, setOnlyView] = useState(false);
    const [familyDetailAvailable, setFamilyDetailAvailable] = useState(false);

    useEffect(() => {
        props.navigation
            .getParent()
            ?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        const clientDetail = props.loanInitiationDetails.filter(item => item.id === parseInt(global.LOANAPPLICATIONID))[0].familyDetail;
        
        if (props.route.params.familyDetails.length > 0) {
            fetchFamilyData();
        }

        if (KycType1Label !== null || KycType2Label !== null || KycType3Label !== null || KycType4Label !== null) {
            getID1data(workflowIDLabel);
            getID2data(workflowIDLabel);
            getID3data(workflowIDLabel);
            getID4data(workflowIDLabel);
        }

        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }

    }, [props.navigation, KycType1Label, KycType2Label, KycType3Label, KycType4Label, isScreenVisible, isDedupeDone]);

    const handleBackButton = () => {
        onGoBack();
        return true; // Prevent default back button behavior
    };

    const fetchFamilyData = () => {
        var data = props.route.params.familyDetails;
        setFamilyDetailAvailable(true);
        setFamilyID(data[0].id)
        setRelationTypeLabel(data[0].relationshipWithApplicant);
        setTitleLabel(data[0].title);
        setName(data[0].name);
        setGenderLabel(data[0].gender);
        setDOB(Common.convertDateFormat(data[0].dateOfBirth))
        setAge(data[0].age)
        setMobileNumber(data[0].mobileNumber)
        setKycType1Label(data[0].kycTypeId1)
        setkycID1(data[0].kycIdValue1)
        setExpiry1Date(data[0].kycType1ExpiryDate)
        setKycType2Label(data[0].kycTypeId2)
        setkycID2(data[0].kycIdValue2)
        setExpiry2Date(data[0].kycType2ExpiryDate)
        setKycType3Label(data[0].kycTypeId3)
        setkycID3(data[0].kycTypeId3)
        setExpiry3Date(data[0].kycType3ExpiryDate)
        setRelationStatuswithCOAPPLabel(data[0].relationshipWithCoApplicant)
        setRelationStatuswithGRNTRLabel(data[0].relationshipWithGuarantor)
    };

    useFocusEffect(
        React.useCallback(() => {
            makeSystemMandatoryFields();
            getSystemCodeDetail();
            getApplicantData();



            if (global.USERTYPEID == 1163 || global.ALLOWEDIT == "0") {
                setOnlyView(true);
                fieldsDisable();
            }


            return () => {
                console.log('Screen is blurred');
            };
        }, [])
    );

    const getApplicantData = () => {

        if (props.loanInitiationDetails) {

            const filteredData = props.loanInitiationDetails.filter(item => item.id === parseInt(global.LOANAPPLICATIONID));

            if (filteredData.length > 0) {
                getID1data(filteredData[0].workflowId);
                getID2data(filteredData[0].workflowId);
                getID3data(filteredData[0].workflowId);
                getID4data(filteredData[0].workflowId);
                setWorkflowIDLabel(filteredData[0].workflowId)
            }

        }

    }

    const fieldsDisable = () => {
        setRelationTypeDisable(true);
        setTitleDisable(true);
        setNameDisable(true);
        setGenderDisable(true);
        setDOBDisable(true);
        setAgeDisable(true);
        setMobileNumberDisable(true);
        setKycType1Disable(true);
        setKycType2Disable(true);
        setKycType3Disable(true);
        setKycType4Disable(true);
        setRelationStatuswithCOAPPDisable(true);
        setRelationStatuswithGRNTRDisable(true);
    }

    const getSystemCodeDetail = async () => {

        const filteredrelationTypeData = leadsystemCodeDetail.filter((data) => data.masterId === 'RELATIONSHIP').sort((a, b) => a.Description.localeCompare(b.Description));;
        setRelationTypeData(filteredrelationTypeData);

        const filteredrelationTypeCoAppData = leadsystemCodeDetail.filter((data) => data.masterId === 'RELATIONSHIP').sort((a, b) => a.Description.localeCompare(b.Description));;
        setRelationStatuswithCOAPPData(filteredrelationTypeCoAppData);

        const filteredrelationTypeGrntrData = leadsystemCodeDetail.filter((data) => data.masterId === 'RELATIONSHIP').sort((a, b) => a.Description.localeCompare(b.Description));;
        setRelationStatuswithGRNTRData(filteredrelationTypeGrntrData);

        const filteredTitleData = leaduserCodeDetail.filter((data) => data.masterId === 'TITLE').sort((a, b) => a.Description.localeCompare(b.Description));;
        setTitleData(filteredTitleData);

        const filteredGenderData = leadsystemCodeDetail.filter((data) => data.masterId === 'GENDER').sort((a, b) => a.Description.localeCompare(b.Description));;
        setGenderData(filteredGenderData);


    };


    const getID1data = (wfID) => {
        let dataArray = [];

        if (bankUserCodeDetail) {

            kycConifig.forEach((data1) => {

                if (data1.wfId == wfID && data1.clientTypeCode == global.CLIENTTYPE) {
                    if (data1.isKycType1Mandatory) {
                        setKycType1Man(true)
                    }

                    if (data1.isKycType1None) {
                        bankUserCodeDetail.forEach((data) => {
                            if (data.ID === 'IndIdentitySettingID') {
                                if (data.subCodeId != KycType2Label && data.subCodeId != KycType3Label && data.subCodeId != KycType4Label)
                                    dataArray.push({ 'subCodeId': data.subCodeId, 'Description': data.Description });
                            }
                        });
                    } else {
                        let values = data1.kycType1Caption.split(',');
                        values.forEach(function (data2) {
                            bankUserCodeDetail.forEach((data) => {
                                if (data.ID === 'IndIdentitySettingID') {
                                    if (data.subCodeId == data2) {
                                        if (data.subCodeId != KycType2Label && data.subCodeId != KycType3Label && data.subCodeId != KycType4Label)
                                            dataArray.push({ 'subCodeId': data.subCodeId, 'Description': data.Description });
                                    }
                                }
                            });
                        });
                    }




                }

            });


        }
        dataArray.sort((a, b) => a.Description.localeCompare(b.Description));
        setKycType1Data(dataArray);
    }

    const getID2data = (wfID) => {
        let dataArray = [];

        if (bankUserCodeDetail) {

            kycConifig.forEach((data1) => {

                if (data1.wfId == wfID && data1.clientTypeCode == global.CLIENTTYPE) {
                    if (data1.isKycType2Mandatory) {
                        setKycType2Man(true)
                    }

                    if (data1.isKycType2None) {
                        bankUserCodeDetail.forEach((data) => {
                            if (data.ID === 'IndIdentitySettingID') {
                                if (data.subCodeId != KycType1Label && data.subCodeId != KycType3Label && data.subCodeId != KycType4Label)
                                    dataArray.push({ 'subCodeId': data.subCodeId, 'Description': data.Description });
                            }
                        });
                    } else {
                        let values = data1.kycType2Caption.split(',');
                        values.forEach(function (data2) {
                            bankUserCodeDetail.forEach((data) => {
                                if (data.ID === 'IndIdentitySettingID') {
                                    if (data.subCodeId == data2) {
                                        if (data.subCodeId != KycType1Label && data.subCodeId != KycType3Label && data.subCodeId != KycType4Label)
                                            dataArray.push({ 'subCodeId': data.subCodeId, 'Description': data.Description });
                                    }
                                }
                            });
                        });
                    }



                }

            });

        }


        dataArray.sort((a, b) => a.Description.localeCompare(b.Description));
        setKycType2Data(dataArray);
    }
    const getID3data = (wfID) => {
        let dataArray = [];



        if (bankUserCodeDetail) {

            kycConifig.forEach((data1) => {

                if (data1.wfId == wfID && data1.clientTypeCode == global.CLIENTTYPE) {
                    if (data1.isKycType3Mandatory) {
                        setKycType3Man(true)
                    }

                    if (data1.isKycType3None) {
                        bankUserCodeDetail.forEach((data) => {
                            if (data.ID === 'IndIdentitySettingID') {
                                if (data.subCodeId != KycType1Label && data.subCodeId != KycType2Label && data.subCodeId != KycType4Label)
                                    dataArray.push({ 'subCodeId': data.subCodeId, 'Description': data.Description });
                            }
                        });
                    } else {
                        let values = data1.kycType3Caption.split(',');
                        values.forEach(function (data2) {
                            bankUserCodeDetail.forEach((data) => {
                                if (data.ID === 'IndIdentitySettingID') {
                                    if (data.subCodeId == data2) {
                                        if (data.subCodeId != KycType1Label && data.subCodeId != KycType2Label && data.subCodeId != KycType4Label)
                                            dataArray.push({ 'subCodeId': data.subCodeId, 'Description': data.Description });
                                    }
                                }
                            });
                        });
                    }



                }

            });

        }

        dataArray.sort((a, b) => a.Description.localeCompare(b.Description));
        setKycType3Data(dataArray);
    }

    const getID4data = (wfID) => {
        let dataArray = [];

        if (bankUserCodeDetail) {

            kycConifig.forEach((data1) => {

                if (data1.wfId == wfID && data1.clientTypeCode == global.CLIENTTYPE) {
                    if (data1.isKycType4Mandatory) {
                        setKycType4Man(true)
                    }

                    if (data1.isKycType4None) {
                        bankUserCodeDetail.forEach((data) => {
                            if (data.ID === 'IndIdentitySettingID') {
                                if (data.subCodeId != KycType1Label && data.subCodeId != KycType2Label && data.subCodeId != KycType3Label)
                                    dataArray.push({ 'subCodeId': data.subCodeId, 'Description': data.Description });
                            }
                        });
                    } else {
                        let values = data1.kycType4Caption.split(',');
                        values.forEach(function (data2) {
                            bankUserCodeDetail.forEach((data) => {
                                if (data.ID === 'IndIdentitySettingID') {
                                    if (data.subCodeId == data2) {
                                        if (data.subCodeId != KycType1Label && data.subCodeId != KycType2Label && data.subCodeId != KycType3Label)
                                            dataArray.push({ 'subCodeId': data.subCodeId, 'Description': data.Description });
                                    }
                                }
                            });
                        });
                    }



                }

            });

        }

        dataArray.sort((a, b) => a.Description.localeCompare(b.Description));
        setKycType4Data(dataArray);
    }


    const makeSystemMandatoryFields = async () => {

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_rlt_type' && data.pageId === pageId).map((value, index) => {
            setRelationTypeCaption(value.fieldName)

            if (value.isMandatory) {
                setRelationTypeMan(true);
            }
            if (value.isHide) {
                setRelationTypeVisible(false);
            }
            if (value.isDisable) {
                setRelationTypeDisable(true);
            }
            if (value.isCaptionChange) {
                setRelationTypeCaption(value.fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_rlt_typeco' && data.pageId === pageId).map((value, index) => {
            setRelationStatuswithCOAPPCaption(value.fieldName)

            if (value.isMandatory) {
                setRelationStatuswithCOAPPMan(true);
            }
            if (value.isHide) {
                setRelationStatuswithCOAPPVisible(false);
            }
            if (value.isDisable) {
                setRelationStatuswithCOAPPDisable(true);
            }
            if (value.isCaptionChange) {
                setRelationStatuswithCOAPPCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_rlt_typegrntr' && data.pageId === pageId).map((value, index) => {
            setRelationStatuswithGRNTRCaption(value.fieldName)

            if (value.isMandatory) {
                setRelationStatuswithGRNTRMan(true);
            }
            if (value.isHide) {
                setRelationStatuswithGRNTRVisible(false);
            }
            if (value.isDisable) {
                setRelationStatuswithGRNTRDisable(true);
            }
            if (value.isCaptionChange) {
                setRelationStatuswithGRNTRCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_gender' && data.pageId === pageId).map((value, index) => {
            setGenderCaption(value.fieldName)

            if (value.isMandatory) {
                setGenderMan(true);
            }
            if (value.isHide) {
                setGenderVisible(false);
            }
            if (value.isDisable) {
                setGenderDisable(true);
            }
            if (value.isCaptionChange) {
                setGenderCaption(value[0].fieldCaptionChange)
            }
        });


        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_title' && data.pageId === pageId).map((value, index) => {
            setTitleCaption(value.fieldName)
            if (value.mandatory) {
                setTitleMan(true);
            }
            if (value.hide) {
                setTitleVisible(false);
            }
            if (value.disable) {
                setTitleDisable(true);
            }
            if (value.captionChange) {
                setTitleCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_name' && data.pageId === pageId).map((value, index) => {
            setNameCaption(value.fieldName)

            if (value.isMandatory) {
                setNameMan(true);
            }
            if (value.isHide) {
                setNameVisible(false);
            }
            if (value.isDisable) {
                setNameDisable(true);
            }
            if (value.isCaptionChange) {
                setNameCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_mbl_no' && data.pageId === pageId).map((value, index) => {
            setMobileNumberCaption(value.fieldName)

            if (value.isMandatory) {
                setMobileNumberMan(true);
            }
            if (value.isHide) {
                setMobileNumberVisible(false);
            }
            if (value.isDisable) {
                setMobileNumberDisable(true);
            }
            if (value.isCaptionChange) {
                setMobileNumberCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_date_of_birth' && data.pageId === pageId).map((value, index) => {
            setDOBCaption(value.fieldName)

            if (value.isMandatory) {
                setDOBMan(true);
            }
            if (value.isHide) {
                setDOBVisible(false);
            }
            if (value.isDisable) {
                setDOBVisible(true);
            }
            if (value.isCaptionChange) {
                setDOBCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_age' && data.pageId === pageId).map((value, index) => {
            setAgeCaption(value.fieldName)

            if (value.isMandatory) {
                setAgeMan(true);
            }
            if (value.isHide) {
                setAgeVisible(false);
            }
            if (value.isDisable) {
                setAgeDisable(true);
            }
            if (value.isCaptionChange) {
                setAgeCaption(value[0].fieldCaptionChange)
            }
        });

    };

    const callFamilyDetails = () => {

        if (onlyView) {
            props.navigation.replace('FamilyDetailList');
            return;
        }

        if (familyDetailAvailable) {
            updateFamilyDetails();
        } else {
            postFamilyDetails();
        }
    }

    const postFamilyDetails = () => {

        if (validate()) {
            showBottomSheet();
        } else {
            var appDetails = [
                {
                    "name": Name,
                    "dateOfBirth": DOB.length > 0 ? Common.convertYearDateFormat(DOB) : '',
                    "age": Age,
                    "mobileNumber": mobileNumber,
                    "gender": genderLabel,
                    "kycTypeId1": KycType1Label,
                    "kycIdValue1": kycID1,
                    "kycType1ExpiryDate": expiryDate1 ? Common.convertYearDateFormat(expiryDate1) : '',
                    "kycTypeId2": KycType2Label,
                    "kycIdValue2": kycID2,
                    "kycType2ExpiryDate": expiryDate2 ? Common.convertYearDateFormat(expiryDate2) : '',
                    "kycTypeId3": KycType3Label,
                    "kycIdValue3": kycID3,
                    "kycType3ExpiryDate": expiryDate3 ? Common.convertYearDateFormat(expiryDate3) : '',
                    "kycTypeId4": KycType4Label,
                    "kycIdValue4": kycID4,
                    "kycType4ExpiryDate": expiryDate4 ? Common.convertYearDateFormat(expiryDate4) : '',
                    "relationshipWithApplicant": relationTypeLabel,
                    "relationshipWithCoApplicant": relationStatuswithCOAPPLabel,
                    "relationshipWithGuarantor": relationStatuswithGRNTRLabel,
                    "loanApplicationId": global.LOANAPPLICATIONID,
                }
            ]

            const baseURL = global.PORT1;
            setLoading(true);
            apiInstance(baseURL)
                .post(`/api/v2/loan-demographics/${global.LOANAPPLICATIONID}/familyDetails`, appDetails)
                .then(async response => {
                    // Handle the response data

                    if (global.DEBUG_MODE) console.log('PostFamilyDetailApiResponse::' + JSON.stringify(response.data),);
                    setLoading(false);
                    if (response.status == 200) {
                        props.updateClientDetails(global.LOANAPPLICATIONID, global.CLIENTID, 'familyDetail', response.data[0])
                        props.navigation.replace('FamilyDetailList');
                        //await insertData(response.data[0].id);
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
                    if (global.DEBUG_MODE) console.log('PostFamilyDetailApiResponse' + JSON.stringify(error));
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
    };

    const updateFamilyDetails = () => {

        if (validate()) {
            showBottomSheet();
        } else {
            var appDetails = {
                "id": familyID,
                "name": Name,
                "dateOfBirth": DOB ? Common.convertYearDateFormat(DOB) : '',
                "age": Age,
                "title": titleLabel,
                "gender": genderLabel,
                "mobileNumber": mobileNumber,
                "kycTypeId1": KycType1Label,
                "kycIdValue1": kycID1,
                "kycType1ExpiryDate": expiryDate1 ? Common.convertYearDateFormat(expiryDate1) : '',
                "kycTypeId2": KycType2Label,
                "kycIdValue2": kycID2,
                "kycType2ExpiryDate": expiryDate2 ? Common.convertYearDateFormat(expiryDate2) : '',
                "kycTypeId3": KycType3Label,
                "kycIdValue3": kycID3,
                "kycType3ExpiryDate": expiryDate3 ? Common.convertYearDateFormat(expiryDate3) : '',
                "kycTypeId4": KycType4Label,
                "kycIdValue4": kycID4,
                "kycType4ExpiryDate": expiryDate4 ? Common.convertYearDateFormat(expiryDate4) : '',
                "relationshipWithApplicant": relationTypeLabel,
                "relationshipWithCoApplicant": relationStatuswithCOAPPLabel,
                "relationshipWithGuarantor": relationStatuswithGRNTRLabel,
                "loanApplicationId": global.LOANAPPLICATIONID,
            }

            const baseURL = global.PORT1;
            setLoading(true);
            apiInstance(baseURL)
                .put(`/api/v2/loan-demographics/familyDetails/${familyID}`, appDetails)
                .then(async response => {
                    // Handle the response data

                    if (global.DEBUG_MODE) console.log('UpdateFamilyApiResponse::' + JSON.stringify(response.data),);
                    setLoading(false);
                    if (response.status == 200) {
                        props.updateLoanInitiationDetails(parseInt(global.LOANAPPLICATIONID), [], 'familyDetail', response.data.id, response.data)
                        props.navigation.replace('FamilyDetailList');
                        // await insertData(familyID);
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
                    if (global.DEBUG_MODE) console.log('UpdateFamilyApiResponse' + JSON.stringify(error));
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
    };

    const insertData = async (id) => {

        await tbl_familydetails.insertFamilyDetails(id, global.LOANAPPLICATIONID, 'APPL', relationTypeLabel, titleLabel, Name, '', '', DOB, Age, genderLabel, mobileNumber, KycType1Label, kycID1, expiryDate1, KycType2Label, kycID2, expiryDate2, KycType3Label, kycID3, expiryDate3, KycType4Label, kycID4, expiryDate4, '0', relationStatuswithCOAPPLabel, relationStatuswithGRNTRLabel);
        props.navigation.replace('FamilyDetailList');
        // updateLoanStatus();

    }



    const validate = () => {
        var flag = false; isAadharAvailable = false;
        var i = 1;
        var errorMessage = '';

        if (KycType1Label == '001') {
            setAadharNumber(kycID1);
            aadhar = kycID1;
            isAadharAvailable = true;
        } else if (KycType2Label == '001') {
            setAadharNumber(kycID2);
            aadhar = kycID2;
            isAadharAvailable = true;
        } else if (KycType3Label == '001') {
            setAadharNumber(kycID3);
            aadhar = kycID3;
            isAadharAvailable = true;
        } else if (KycType4Label == '001') {
            setAadharNumber(kycID4);
            aadhar = kycID4;
            isAadharAvailable = true;
        }

        if (relationTypeMan && relationTypeVisible) {
            if (relationTypeLabel.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsselect +
                    relationTypeCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (titleMan && titleVisible) {
            if (titleLabel.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsselect +
                    titleCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (NameMan && NameVisible) {
            if (Name.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsenter +
                    NameCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (genderMan && genderVisible) {
            if (genderLabel.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsselect +
                    genderCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (DOBMan && DOBVisible) {
            if (DOB.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsenter +
                    DOBCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (AgeMan && AgeVisible) {
            if (Age.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsenter +
                    AgeCaption +
                    '\n';
                i++;
                flag = true;
            } else if (parseInt(Age) < parseInt(minAge)) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    AgeCaption +
                    " Cannot be less than " + minAge +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (mobileNumberMan && mobileNumberVisible) {
            if (mobileNumber.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsenter +
                    mobileNumberCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (mobileNumber.length > 0) {
            if (!Common.isValidPhoneNumber(mobileNumber)) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsentervalid +
                    mobileNumberCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (KycType1Man && KycType1Visible) {
            if (KycType1Label.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsselect +
                    KycType1Caption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (KycType1Label.length > 0) {
            if (kycID1.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsenter +
                    kycID1Caption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (KycType2Man && KycType2Visible) {
            if (KycType2Label.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsselect +
                    KycType2Caption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (KycType2Label.length > 0) {
            if (kycID2.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsenter +
                    kycID2Caption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (isAadharAvailable) {
            if (!Common.validateVerhoeff(aadhar)) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    'Please Enter Valid Aadhar Number' +
                    '\n';
                i++;
                flag = true;
            }
        }


        if (KycType1Label == '007') {
            if (kycID1.length > 0) {
                if (!Common.isValidPAN(kycID1)) {
                    errorMessage =
                        errorMessage +
                        i +
                        ')' +
                        ' ' +
                        language[0][props.language].str_plsenter + 'Valid PAN' +
                        '\n';
                    i++;
                    flag = true;
                }

            }
        }

        if (KycType2Label == '007') {
            if (kycID2.length > 0) {
                if (!Common.isValidPAN(kycID2)) {
                    errorMessage =
                        errorMessage +
                        i +
                        ')' +
                        ' ' +
                        language[0][props.language].str_plsenter +
                        'Valid PAN' +
                        '\n';
                    i++;
                    flag = true;
                }
            }
        }

        if (KycType3Label == '007') {
            if (kycID3.length > 0) {
                if (!Common.isValidPAN(kycID3)) {
                    errorMessage =
                        errorMessage +
                        i +
                        ')' +
                        ' ' +
                        language[0][props.language].str_plsenter +
                        'Valid PAN' +
                        '\n';
                    i++;
                    flag = true;
                }
            }
        }

        if (KycType4Label == '007') {
            if (kycID4.length > 0) {
                if (!Common.isValidPAN(kycID4)) {
                    errorMessage =
                        errorMessage +
                        i +
                        ')' +
                        ' ' +
                        language[0][props.language].str_plsenter +
                        'Valid PAN' +
                        '\n';
                    i++;
                    flag = true;
                }
            }
        }

        if (relationStatuswithCOAPPMan && relationStatuswithCOAPPVisible) {
            if (relationStatuswithCOAPPLabel.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsselect +
                    relationStatuswithCOAPPCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (relationStatuswithGRNTRMan && relationStatuswithGRNTRVisible) {
            if (relationStatuswithGRNTRLabel.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsselect +
                    relationStatuswithGRNTRCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (titleVisible && genderVisible) {
            if (titleLabel === 'MR') {
                if (genderLabel == 'F') {
                    errorMessage = errorMessage + i + ')' + ' ' + titleCaption + ' AND ' + genderCaption + ' Not matching' + '\n';
                    i++;
                    flag = true;
                }
            } else if (titleLabel === 'MRS' || titleLabel === 'MISS') {
                if (genderLabel == 'M') {
                    errorMessage = errorMessage + i + ')' + ' ' + titleCaption + ' AND ' + genderCaption + ' Not matching' + '\n';
                    i++;
                    flag = true;
                }
            }
        }

        setErrMsg(errorMessage);
        return flag;
    };

    const handleClick = (componentName, textValue) => {
        if (componentName === 'kycID1') {
            setkycID1(textValue);
        } else if (componentName === 'kycID2') {
            setkycID2(textValue);
        } else if (componentName === 'kycID3') {
            setkycID3(textValue);
        } else if (componentName === 'kycID4') {
            setkycID4(textValue);
        } else if (componentName === 'Name') {
            setName(textValue);
        } else if (componentName === 'expiryDate1') {
            handleTextChange(componentName, textValue);
        } else if (componentName === 'expiryDate2') {
            handleTextChange(componentName, textValue);
        } else if (componentName === 'expiryDate3') {
            handleTextChange(componentName, textValue);
        } else if (componentName === 'expiryDate4') {
            handleTextChange(componentName, textValue);
        } else if (componentName === 'DOB') {
            setDOB(textValue);
            setAge(Common.calculateAge(textValue).toString())
        } else if (componentName === 'Age') {
            setAge(textValue);
        }
        else if (componentName === 'mobileNumber') {
            if (textValue.length > 0) {
                if (Common.numberRegex.test(textValue)) setMobileNumber(textValue);
            } else {
                setMobileNumber(textValue);
            }
        }
    };

    const handleTextChange = (componentName, input) => {
        const numericInput = input.replace(/\D/g, '');

        // Insert slashes while typing
        let formattedDate = '';
        for (let i = 0; i < numericInput.length; i++) {
            if (i === 2 || i === 4) {
                formattedDate += '-';
            }
            formattedDate += numericInput[i];
        }
        if (componentName === 'expiryDate1') {
            setExpiry1Date(formattedDate);
        } else if (componentName === 'expiryDate2') {
            setExpiry2Date(formattedDate);
        } else if (componentName === 'expiryDate3') {
            setExpiry3Date(formattedDate);
        } else if (componentName === 'expiryDate4') {
            setExpiry4Date(formattedDate);
        }

    };

    const handleReference = componentName => {
        if (componentName === 'Name') {
            KycID1Ref.current.focus();
        } else if (componentName === 'kycID1') {
            KycID2Ref.current.focus();
        } else if (componentName === 'kycID2') {
            mobileNumberRef.current.focus();
        } else if (componentName === 'mobileNumber') {

        }
    };

    const handlePickerClick = (componentName, label, index) => {
        if (componentName == 'KycType1Picker') {
            setKycType1Label(label);
            setKycType1Index(index);
            setkycID1('');
            if (label == '001') {
                setkycNumberTypeID1('numeric')
            } else {
                setkycNumberTypeID1('email-address')
            }
            if (label == '002' || label == '008') {
                setExpiry1DateVisible(true)
            } else {
                setExpiry1Date('')
                setExpiry1DateVisible(false)
            }
        } else if (componentName == 'KycType2Picker') {
            setKycType2Label(label);
            setKycType2Index(index);
            setkycID2('');
            if (label == '001') {
                setkycNumberTypeID2('numeric')
            } else {
                setkycNumberTypeID2('email-address')
            }
            if (label == '002' || label == '008') {
                setExpiry2DateVisible(true)
            } else {
                setExpiry2Date('')
                setExpiry2DateVisible(false)
            }
        } else if (componentName == 'KycType3Picker') {
            setKycType3Label(label);
            setKycType3Index(index);
            setkycID3('');
            if (label == '001') {
                setkycNumberTypeID3('numeric')
            } else {
                setkycNumberTypeID3('email-address')
            }
            if (label == '002' || label == '008') {
                setExpiry3DateVisible(true)
            } else {
                setExpiry3Date('')
                setExpiry3DateVisible(false)
            }
        } else if (componentName == 'KycType4Picker') {
            setKycType4Label(label);
            setKycType4Index(index);
            setkycID4('');
            if (label == '001') {
                setkycNumberTypeID4('numeric')
            } else {
                setkycNumberTypeID4('email-address')
            }
            if (label == '002' || label == '008') {
                setExpiry4DateVisible(true)
            } else {
                setExpiry4Date('')
                setExpiry4DateVisible(false)
            }
        } else if (componentName === 'titlePicker') {
            setTitleLabel(label);
            setTitleIndex(index);
        } else if (componentName === 'genderPicker') {
            setGenderLabel(label);
            setGenderIndex(index);
        } else if (componentName === 'RelationTypePicker') {
            setRelationTypeLabel(label);
            setRelationTypeIndex(index);
        } else if (componentName === 'RelationTypeCOAPP') {
            setRelationStatuswithCOAPPLabel(label);
            setRelationStatuswithCOAPPIndex(index);
        } else if (componentName === 'RelationTypeGRNTR') {
            setRelationStatuswithGRNTRLabel(label);
            setRelationStatuswithGRNTRIndex(index);
        }


    };



    const closeErrorModal = () => {
        setErrorModalVisible(false);
    };

    const onGoBack = () => {
        props.navigation.replace('LoanApplicationMain', { fromScreen: 'LoanFamilyDetail' })
    }

    return (
        // enclose all components in this View tag
        <SafeAreaView
            style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
            <ErrorModal isVisible={errorModalVisible} onClose={closeErrorModal} textContent={apiError} textClose={language[0][props.language].str_ok} />

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
                textval={global.CLIENTTYPE == 'APPL' ? language[0][props.language].str_applicantdetails : global.CLIENTTYPE == 'CO-APPL' ? language[0][props.language].str_coapplicantdetails : language[0][props.language].str_guarantordetails}
            />

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


                    <View style={{ width: '100%', alignItems: 'center', marginTop: '3%' }}>
                        <View style={{ width: '90%', marginTop: 3 }}>
                            <TextComp
                                textStyle={{
                                    color: Colors.mediumgrey,
                                    fontSize: 15,
                                    fontFamily: 'Poppins-Medium'
                                }}
                                textVal={
                                    language[0][props.language].str_familydetails
                                }></TextComp>

                            <ProgressComp progressvalue={0.25} textvalue="1 of 4" />
                        </View>
                    </View>


                    {relationTypeVisible && (
                        <View
                            style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                                <TextComp
                                    textVal={relationTypeCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={relationTypeMan}
                                />
                            </View>

                            <PickerComp
                                textLabel={relationTypeLabel}
                                pickerStyle={Commonstyles.picker}
                                Disable={relationTypeDisable}
                                pickerdata={relationTypeData}
                                componentName="RelationTypePicker"
                                handlePickerClick={handlePickerClick}
                            />
                        </View>
                    )}

                    {titleVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>

                            <TextComp textVal={titleCaption} textStyle={Commonstyles.inputtextStyle} Visible={titleMan} />

                        </View>

                        <PickerComp textLabel={titleLabel} pickerStyle={Commonstyles.picker} Disable={titleDisable} pickerdata={titleData} componentName='titlePicker' handlePickerClick={handlePickerClick} />


                    </View>}


                    {NameVisible && (
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
                                    textVal={NameCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={NameMan}
                                />
                            </View>

                            <TextInputComp
                                textValue={Name}
                                textStyle={Commonstyles.textinputtextStyle}
                                type="email-address"
                                Disable={NameDisable}
                                ComponentName="Name"
                                reference={NameRef}
                                returnKey="next"
                                handleClick={handleClick}
                                handleReference={handleReference}
                            />
                        </View>
                    )}

                    {genderVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>

                            <TextComp textVal={genderCaption} textStyle={Commonstyles.inputtextStyle} Visible={genderMan} />

                        </View>

                        <PickerComp textLabel={genderLabel} pickerStyle={Commonstyles.picker} Disable={genderDisable} pickerdata={genderData} componentName='genderPicker' handlePickerClick={handlePickerClick} />


                    </View>}

                    {DOBVisible && (
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
                                    textVal={DOBCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={DOBMan}
                                />
                            </View>

                            <View style={{ width: '100%', alignItems: 'center' }}>
                                <DateInputComp textStyle={[Commonstyles.inputtextStyle, { width: '90%' }]} ComponentName="DOB"
                                    textValue={DOB}
                                    type="numeric"
                                    handleClick={handleClick}
                                    Disable={DOBDisable}
                                    reference={DOBRef}
                                    maxDate={new Date()}
                                    handleReference={handleReference} />
                            </View>
                            {/* <TextInputComp
                textValue={expiryDate1}
                textStyle={Commonstyles.textinputtextStyle}
                type="numeric"
                Disable={expiryDate1Disable}
                ComponentName="expiryDate1"
                reference={expityDate1Ref}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
              /> */}
                        </View>
                    )}

                    {AgeVisible && (
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
                                    textVal={AgeCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={AgeMan}
                                />
                            </View>

                            <TextInputComp
                                textValue={Age}
                                textStyle={Commonstyles.textinputtextStyle}
                                type="numeric"
                                Disable={AgeDisable}
                                ComponentName="Age"
                                reference={AgeRef}
                                returnKey="next"
                                handleClick={handleClick}
                                handleReference={handleReference}
                            />
                        </View>
                    )}


                    {mobileNumberVisible && (
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
                                    textVal={mobileNumberCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={mobileNumberMan}
                                />
                            </View>

                            <TextInputComp
                                textValue={mobileNumber}
                                textStyle={Commonstyles.textinputtextStyle}
                                type="numeric"
                                Disable={mobileNumberDisable}
                                ComponentName="mobileNumber"
                                reference={mobileNumberRef}
                                returnKey="next"
                                length={10}
                                handleClick={handleClick}
                                handleReference={handleReference}
                            />

                        </View>
                    )}

                    <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                            <TextComp
                                textVal={KYCDetalsCaption}
                                textStyle={[Commonstyles.textinputtextStyle, { color: Colors.mediumgrey }]}
                            />
                        </View>
                    </View>

                    {KycType1Visible && (
                        <View
                            style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                                <TextComp
                                    textVal={KycType1Caption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={KycType1Man}
                                />
                            </View>

                            <PickerComp
                                textLabel={KycType1Label}
                                pickerStyle={Commonstyles.picker}
                                Disable={KycType1Disable}
                                pickerdata={KycType1Data}
                                componentName="KycType1Picker"
                                handlePickerClick={handlePickerClick}
                            />
                        </View>
                    )}

                    {KycType1Visible && (
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
                                    textVal={kycID1Caption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={KycType1Man}
                                />
                            </View>

                            <TextInputComp
                                textValue={kycID1}
                                textStyle={Commonstyles.textinputtextStyle}
                                type={kycNumberTypeID1}
                                Disable={KycType1Disable}
                                ComponentName="kycID1"
                                reference={KycID1Ref}
                                returnKey="next"
                                autocapital={'characters'}
                                handleClick={handleClick}
                                handleReference={handleReference}
                            />
                        </View>
                    )}

                    {expiryDate1Visible && (
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
                                    textVal={expiryDateCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={expiryDate1Man}
                                />
                            </View>

                            <View style={{ width: '100%', alignItems: 'center' }}>
                                <DateInputComp textStyle={[Commonstyles.inputtextStyle, { width: '90%' }]} ComponentName="expiryDate1"
                                    textValue={expiryDate1}
                                    type="numeric"
                                    handleClick={handleClick}
                                    handleReference={handleReference}
                                    minDate={new Date()} />
                            </View>
                            {/* <TextInputComp
                textValue={expiryDate1}
                textStyle={Commonstyles.textinputtextStyle}
                type="numeric"
                Disable={expiryDate1Disable}
                ComponentName="expiryDate1"
                reference={expityDate1Ref}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
              /> */}
                        </View>
                    )}

                    {KycType2Visible && (
                        <View
                            style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                                <TextComp
                                    textVal={KycType2Caption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={KycType2Man}
                                />
                            </View>

                            <PickerComp
                                textLabel={KycType2Label}
                                pickerStyle={Commonstyles.picker}
                                Disable={KycType2Disable}
                                pickerdata={KycType2Data}
                                componentName="KycType2Picker"
                                handlePickerClick={handlePickerClick}
                            />
                        </View>
                    )}

                    {KycType2Visible && (
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
                                    textVal={kycID2Caption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={KycType2Man}
                                />
                            </View>

                            <TextInputComp
                                textValue={kycID2}
                                textStyle={Commonstyles.textinputtextStyle}
                                type={kycNumberTypeID2}
                                Disable={KycType2Disable}
                                ComponentName="kycID2"
                                reference={KycID2Ref}
                                returnKey="next"
                                autocapital={'characters'}
                                handleClick={handleClick}
                                handleReference={handleReference}
                            />
                        </View>
                    )}

                    {expiryDate2Visible && (
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
                                    textVal={expiryDateCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={expiryDate2Man}
                                />
                            </View>

                            <View style={{ width: '100%', alignItems: 'center' }}>
                                <DateInputComp textStyle={[Commonstyles.inputtextStyle, { width: '90%' }]} ComponentName="expiryDate2"
                                    textValue={expiryDate2}
                                    type="numeric"
                                    handleClick={handleClick}
                                    handleReference={handleReference}
                                    minDate={new Date()} />
                            </View>
                            {/* <TextInputComp
                textValue={expiryDate1}
                textStyle={Commonstyles.textinputtextStyle}
                type="numeric"
                Disable={expiryDate1Disable}
                ComponentName="expiryDate1"
                reference={expityDate1Ref}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
              /> */}
                        </View>
                    )}


                    {KycType3Visible && (
                        <View
                            style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                                <TextComp
                                    textVal={KycType3Caption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={KycType3Man}
                                />
                            </View>

                            <PickerComp
                                textLabel={KycType3Label}
                                pickerStyle={Commonstyles.picker}
                                Disable={KycType3Disable}
                                pickerdata={KycType3Data}
                                componentName="KycType3Picker"
                                handlePickerClick={handlePickerClick}
                            />
                        </View>
                    )}

                    {KycType3Visible && (
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
                                    textVal={kycID3Caption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={KycType3Man}
                                />
                            </View>

                            <TextInputComp
                                textValue={kycID3}
                                textStyle={Commonstyles.textinputtextStyle}
                                type={kycNumberTypeID3}
                                Disable={KycType3Disable}
                                ComponentName="kycID3"
                                reference={KycID3Ref}
                                returnKey="next"
                                autocapital={'characters'}
                                handleClick={handleClick}
                                handleReference={handleReference}
                            />
                        </View>
                    )}

                    {expiryDate3Visible && (
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
                                    textVal={expiryDateCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={expiryDate3Man}
                                />
                            </View>

                            <View style={{ width: '100%', alignItems: 'center' }}>
                                <DateInputComp textStyle={[Commonstyles.inputtextStyle, { width: '90%' }]} ComponentName="expiryDate3"
                                    textValue={expiryDate3}
                                    type="numeric"
                                    handleClick={handleClick}
                                    handleReference={handleReference}
                                    minDate={new Date()} />
                            </View>
                            {/* <TextInputComp
                textValue={expiryDate1}
                textStyle={Commonstyles.textinputtextStyle}
                type="numeric"
                Disable={expiryDate1Disable}
                ComponentName="expiryDate1"
                reference={expityDate1Ref}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
              /> */}
                        </View>
                    )}

                    {KycType4Visible && (
                        <View
                            style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                                <TextComp
                                    textVal={KycType4Caption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={KycType4Man}
                                />
                            </View>

                            <PickerComp
                                textLabel={KycType4Label}
                                pickerStyle={Commonstyles.picker}
                                Disable={KycType4Disable}
                                pickerdata={KycType4Data}
                                componentName="KycType4Picker"
                                handlePickerClick={handlePickerClick}
                            />
                        </View>
                    )}

                    {KycType4Visible && (
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
                                    textVal={kycID4Caption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={KycType4Man}
                                />
                            </View>

                            <TextInputComp
                                textValue={kycID4}
                                textStyle={Commonstyles.textinputtextStyle}
                                type={kycNumberTypeID4}
                                Disable={KycType4Disable}
                                ComponentName="kycID4"
                                reference={KycID4Ref}
                                returnKey="next"
                                autocapital={'characters'}
                                handleClick={handleClick}
                                handleReference={handleReference}
                            />
                        </View>
                    )}

                    {expiryDate4Visible && (
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
                                    textVal={expiryDateCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={expiryDate4Man}
                                />
                            </View>

                            <View style={{ width: '100%', alignItems: 'center' }}>
                                <DateInputComp textStyle={[Commonstyles.inputtextStyle, { width: '90%' }]} ComponentName="expiryDate4"
                                    textValue={expiryDate4}
                                    type="numeric"
                                    handleClick={handleClick}
                                    handleReference={handleReference}
                                    minDate={new Date()} />
                            </View>
                            {/* <TextInputComp
                textValue={expiryDate1}
                textStyle={Commonstyles.textinputtextStyle}
                type="numeric"
                Disable={expiryDate1Disable}
                ComponentName="expiryDate1"
                reference={expityDate1Ref}
                returnKey="next"
                handleClick={handleClick}
                handleReference={handleReference}
              /> */}
                        </View>
                    )}

                    {relationStatuswithCOAPPVisible && (
                        <View
                            style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                                <TextComp
                                    textVal={relationStatuswithCOAPPCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={relationStatuswithCOAPPMan}
                                />
                            </View>

                            <PickerComp
                                textLabel={relationStatuswithCOAPPLabel}
                                pickerStyle={Commonstyles.picker}
                                Disable={relationStatuswithCOAPPDisable}
                                pickerdata={relationStatuswithCOAPPData}
                                componentName="RelationTypeCOAPP"
                                handlePickerClick={handlePickerClick}
                            />
                        </View>
                    )}

                    {relationStatuswithGRNTRVisible && (
                        <View
                            style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                                <TextComp
                                    textVal={relationStatuswithGRNTRCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={relationStatuswithGRNTRMan}
                                />
                            </View>

                            <PickerComp
                                textLabel={relationStatuswithGRNTRLabel}
                                pickerStyle={Commonstyles.picker}
                                Disable={relationStatuswithGRNTRDisable}
                                pickerdata={relationStatuswithGRNTRData}
                                componentName="RelationTypeGRNTR"
                                handlePickerClick={handlePickerClick}
                            />
                        </View>
                    )}

                </View>

                <ButtonViewComp
                    textValue={language[0][props.language].str_next.toUpperCase()}
                    textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
                    viewStyle={Commonstyles.buttonView}
                    innerStyle={Commonstyles.buttonViewInnerStyle}
                    handleClick={callFamilyDetails}
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

const mapStateToProps = (state) => {
    const { language } = state.languageReducer;
    const { profileDetails } = state.profileReducer;
    const { mobileCodeDetails } = state.mobilecodeReducer;
    const { loanInitiationDetails } = state.loanInitiationReducer;
    return {
        language: language,
        profiledetail: profileDetails,
        mobilecodedetail: mobileCodeDetails,
        loanInitiationDetails: loanInitiationDetails
    }
}

const mapDispatchToProps = dispatch => ({
    languageAction: item => dispatch(languageAction(item)),
    dedupeAction: item => dispatch(dedupeAction(item)),
    deleteDedupe: item => dispatch(deleteDedupe()),
    updateClientDetails: (loanApplicationId, clientId, key, data) => dispatch(updateClientDetails(loanApplicationId, clientId, key, data)),
    updateLoanInitiationDetails: (loanApplicationId, loanData, key, clientId, updatedDetails) => dispatch(updateLoanInitiationDetails(loanApplicationId, loanData, key, clientId, updatedDetails)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoanDemographicFamilyDetails);
