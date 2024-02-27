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
    BackHandler, PermissionsAndroid
} from 'react-native';
import apiInstance from '../../../Utils/apiInstance';
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
import Entypo from 'react-native-vector-icons/Entypo';
import ImageBottomPreview from '../../../Components/ImageBottomPreview';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import tbl_loanbusinessDetail from '../../../Database/Table/tbl_loanbusinessDetail';
import { addLoanInitiationDetails, updateLoanInitiationDetails, deleteLoanInitiationDetails, updateClientDetails, updateNestedClientDetails } from '../../../Utils/redux/actions/loanInitiationAction';


const LoanDemographicBusinessDetail = (props) => {

    const [loading, setLoading] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
    const showBottomSheet = () => setBottomErrorSheetVisible(true);
    const hideBottomSheet = () => setBottomErrorSheetVisible(false);
    const isScreenVisible = useIsFocused();

    const [CustomerSubCategoryMan, setCustomerSubCategoryMan] = useState(false);
    const [CustomerSubCategoryVisible, setCustomerSubCategoryVisible] =
        useState(true);
    const [CustomerSubCategoryDisable, setCustomerSubCategoryDisable] =
        useState(false);
    const [CustomerSubCategoryData, setCustomerSubCategoryData] = useState([]);
    const [CustomerSubCategoryCaption, setCustomerSubCategoryCaption] = useState(
        'CUSTOMER SUB CATEGORY',
    );
    const [CustomerSubCategoryLabel, setCustomerSubCategoryLabel] = useState('');
    const [CustomerSubCategoryIndex, setCustomerSubCategoryIndex] = useState('');

    const [genderCaption, setGenderCaption] = useState('GENDER');
    const [genderMan, setGenderMan] = useState(false);
    const [genderVisible, setGenderVisible] = useState(true);
    const [genderDisable, setGenderDisable] = useState(false);
    const [genderLabel, setGenderLabel] = useState('');
    const [genderIndex, setGenderIndex] = useState('');
    const [genderData, setGenderData] = useState([]);


    const [entShopNameMan, setEntShopNameMan] = useState(false);
    const [entShopNameVisible, setEntShopNameVisible] = useState(true);
    const [entShopName, setEntShopName] = useState('');
    const [entShopNameDisable, setEntShopNameDisable] = useState(false);
    const [entShopNameCaption, setEntShopNameCaption] = useState('ENTERPRISE/SHOP NAME',);
    const entShopNameRef = useRef(null);

    const [urmNumber, setUrmNumber] = useState('');
    const [urmNumberMan, setUrmNumberMan] = useState(false);
    const [urmNumberVisible, setUrmNumberVisible] = useState(true);
    const [urmNumberDisable, setUrmNumberDisable] = useState(false);
    const [urmNumberCaption, setUrmNumberCaption] = useState('UDYAM REGISTRATION NUMER');
    const urmNumberRef = useRef(null);

    const [DOR, setDOR] = useState('');
    const [DORCaption, setDORCaption] = useState('DATE OF REGISTRATION');
    const [DORMan, setDORMan] = useState(false);
    const [DORVisible, setDORVisible] = useState(true);
    const [DORDisable, setDORDisable] = useState(false);
    const DORRef = useRef(null);

    const [DOI, setDOI] = useState('');
    const [DOICaption, setDOICaption] = useState('DATE OF INCORPORATION');
    const [DOIMan, setDOIMan] = useState(false);
    const [DOIVisible, setDOIVisible] = useState(true);
    const [DOIDisable, setDOIDisable] = useState(false);
    const DOIRef = useRef(null);

    const [DOBC, setDOBC] = useState('');
    const [DOBCCaption, setDOBCCaption] = useState('DATE OF BUSINESS COMMENCEMENT');
    const [DOBCMan, setDOBCMan] = useState(false);
    const [DOBCVisible, setDOBCVisible] = useState(true);
    const [DOBCDisable, setDOBCDisable] = useState(false);
    const DOBCRef = useRef(null);

    const [year, setYear] = useState('');
    const [yearCaption, setYearCaption] = useState('YEAR');
    const [yearMan, setYearMan] = useState(false);
    const [yearVisible, setYearVisible] = useState(true);
    const [yearDisable, setYearDisable] = useState(false);
    const yearRef = useRef(null);

    const [monthLabel, setMonthLabel] = useState('');
    const [monthIndex, setMonthIndex] = useState('');
    const [monthsCaption, setMonthsCaption] = useState('MONTHS');
    const [monthsMan, setMonthsMan] = useState(false);
    const [monthsVisible, setMonthsVisible] = useState(true);
    const [monthsDisable, setMonthsDisable] = useState(false);

    const [industryTypeLabel, setIndustryTypeLabel] = useState('');
    const [industryTypeData, setIndustryTypeData] = useState([]);
    const [industryTypeIndex, setIndustryTypeIndex] = useState('');
    const [industryTypeCaption, setIndustryTypeCaption] = useState('INDUSTRY TYPE');
    const [industryTypeMan, setIndustryTypeMan] = useState(false);
    const [industryTypeVisible, setIndustryTypeVisible] = useState(true);
    const [industryTypeDisable, setIndustryTypeDisable] = useState(false);

    const [industryLineLabel, setIndustryLineLabel] = useState('');
    const [industryLineData, setIndustryLineData] = useState([]);
    const [industryLineIndex, setIndustryLineIndex] = useState('');
    const [industryLineCaption, setIndustryLineCaption] = useState('INDUSTRY LINE (NATURE OF BUSINESS)');
    const [industryLineMan, setIndustryLineMan] = useState(false);
    const [industryLineVisible, setIndustryLineVisible] = useState(true);
    const [industryLineDisable, setIndustryLineDisable] = useState(false);

    const [companyTypeLabel, setCompanyTypeLabel] = useState('');
    const [companyTypeData, setCompanyTypeData] = useState([]);
    const [companyTypeIndex, setCompanyTypeIndex] = useState('');
    const [companyTypeCaption, setCompanyTypeCaption] = useState('COMPANY TYPE');
    const [companyTypeMan, setCompanyTypeMan] = useState(false);
    const [companyTypeVisible, setCompanyTypeVisible] = useState(true);
    const [companyTypeDisable, setCompanyTypeDisable] = useState(false);

    const [enterpriseTypeLabel, setEnterpriseTypeLabel] = useState('');
    const [enterpriseTypeData, setEnterpriseTypeData] = useState([]);
    const [enterpriseTypeIndex, setEnterpriseTypeIndex] = useState('');
    const [enterpriseTypeCaption, setEnterpriseTypeCaption] = useState('ENTERPRISE TYPE');
    const [enterpriseTypeMan, setEnterpriseTypeMan] = useState(false);
    const [enterpriseTypeVisible, setEnterpriseTypeVisible] = useState(true);
    const [enterpriseTypeDisable, setEnterpriseTypeDisable] = useState(false);

    const [yearAtPresent, setYearAtPresent] = useState('');
    const [yearAtPresentCaption, setYearAtPresentCaption] = useState('YEARS AT PRESENT PREMISES');
    const [yearAtPresentMan, setYearAtPresentMan] = useState(false);
    const [yearAtPresentVisible, setYearAtPresentVisible] = useState(true);
    const [yearAtPresentDisable, setYearAtPresentDisable] = useState(false);
    const yearAtPresentRef = useRef(null);

    const [businessLocationLabel, setBusinessLocationLabel] = useState('');
    const [businessLocationData, setBusinessLocationData] = useState([]);
    const [businessLocationIndex, setBusinessLocationIndex] = useState('');
    const [businessLocationCaption, setBusinessLocationCaption] = useState('BUSINESS LOCATION/VILLAGE');
    const [businessLocationMan, setBusinessLocationMan] = useState(false);
    const [businessLocationVisible, setBusinessLocationVisible] = useState(true);
    const [businessLocationDisable, setBusinessLocationDisable] = useState(false);

    const [noofEmployee, setNoofEmployee] = useState('');
    const [noofEmployeeCaption, setNoofEmployeeCaption] = useState('NO OF EMPLOYEES');
    const [noofEmployeeMan, setNoofEmployeeMan] = useState(false);
    const [noofEmployeeVisible, setNoofEmployeeVisible] = useState(true);
    const [noofEmployeeDisable, setNoofEmployeeDisable] = useState(false);
    const noofEmployeeRef = useRef(null);

    const [operatingDays, setOperatingDays] = useState('');
    const [operatingDaysCaption, setOperatingDaysCaption] = useState('OPERATING DAYS (IN A WEEK)');
    const [operatingDaysMan, setOperatingDaysMan] = useState(false);
    const [operatingDaysVisible, setOperatingDaysVisible] = useState(true);
    const [operatingDaysDisable, setOperatingDaysDisable] = useState(false);
    const operatingDaysRef = useRef(null);

    const [operatingTimings, setOperatingTimings] = useState('');
    const [operatingTimingsCaption, setOperatingTimingsCaption] = useState('OPERATING TIMINGS (IN A DAY)');
    const [operatingTimingsMan, setOperatingTimingsMan] = useState(false);
    const [operatingTimingsVisible, setOperatingTimingsVisible] = useState(true);
    const [operatingTimingsDisable, setOperatingTimingsDisable] = useState(false);
    const operatingTimingsRef = useRef(null);

    const [bookKeepStatusLabel, setBookKeepStatusLabel] = useState('');
    const [bookKeepStatusData, setBookKeepStatusData] = useState([]);
    const [bookKeepStatusIndex, setBookKeepStatusIndex] = useState('');
    const [bookKeepStatusCaption, setBookKeepStatusCaption] = useState('BOOK KEEPING STATUS');
    const [bookKeepStatusMan, setBookKeepStatusMan] = useState(false);
    const [bookKeepStatusVisible, setBookKeepStatusVisible] = useState(true);
    const [bookKeepStatusDisable, setBookKeepStatusDisable] = useState(false);

    const [homeBasedBussinessLabel, setHomeBasedBusinessLabel] = useState('');
    const [homeBasedBussinessData, setHomeBasedBusinessData] = useState([]);
    const [homeBasedBussinessIndex, setHomeBasedBusinessIndex] = useState('');
    const [homeBasedBussinessCaption, setHomeBasedBusinessCaption] = useState('HOME BASED BUSINESS');
    const [homeBasedBussinessMan, setHomeBasedBusinessMan] = useState(false);
    const [homeBasedBussinessVisible, setHomeBasedBusinessVisible] = useState(true);
    const [homeBasedBussinessDisable, setHomeBasedBusinessDisable] = useState(false);

    const [actmLabel, setACTMLabel] = useState('');
    const [actmData, setACTMData] = useState([]);
    const [actmIndex, setACTMIndex] = useState('');
    const [actmCaption, setACTMCaption] = useState('CUSTOMER TRANSACTION MODE');
    const [actmMan, setACTMMan] = useState(false);
    const [actmVisible, setACTMVisible] = useState(true);
    const [actmDisable, setACTMDisable] = useState(false);

    const [timeByPromoter, setTimeByPromoter] = useState('');
    const [timeByPromoterCaption, setTimeByPromoterCaption] = useState('TIME SPENT BY PROMOTER / OWNER AT BUSINESS IN A DAY (HRS)');
    const [timeByPromoterMan, setTimeByPromoterMan] = useState(false);
    const [timeByPromoterVisible, setTimeByPromoterVisible] = useState(true);
    const [timeByPromoterDisable, setTimeByPromoterDisable] = useState(false);
    const timeByPromoterRef = useRef(null);

    const [npmRate, setNPMRate] = useState('');
    const [npmRateCaption, setNPMRateCaption] = useState('NPM RATE OF THIS BUSINESS (IN %)');
    const [npmRateMan, setNPMRateMan] = useState(false);
    const [npmRateVisible, setNPMRateVisible] = useState(true);
    const [npmRateDisable, setNPMRateDisable] = useState(false);
    const npmRateRef = useRef(null);

    const [purchaseFrequencyLabel, setPurchaseFrequencyLabel] = useState('');
    const [purchaseFrequencyData, setPurchaseFrequencyData] = useState([]);
    const [purchaseFrequencyIndex, setPurchaseFrequencyIndex] = useState('');
    const [purchaseFrequencyCaption, setPurchaseFrequencyCaption] = useState('PURCHASES FREQUENCY');
    const [purchaseFrequencyMan, setPurchaseFrequencyMan] = useState(false);
    const [purchaseFrequencyVisible, setPurchaseFrequencyVisible] = useState(true);
    const [purchaseFrequencyDisable, setPurchaseFrequencyDisable] = useState(false);

    const [typePurchaseLabel, setTypePurchaseLabel] = useState('');
    const [typePurchaseData, setTypePurchaseData] = useState([]);
    const [typePurchaseIndex, setTypePurchaseIndex] = useState('');
    const [typePurchaseCaption, setTypePurchaseCaption] = useState('TYPE OF PURCHASING FACILITY');
    const [typePurchaseMan, setTypePurchaseMan] = useState(false);
    const [typePurchaseVisible, setTypePurchaseVisible] = useState(true);
    const [typePurchaseDisable, setTypePurchaseDisable] = useState(false);

    const [salesFrequencyLabel, setSalesFrequencyLabel] = useState('');
    const [salesFrequencyData, setSalesFrequencyData] = useState([]);
    const [salesFrequencyIndex, setSalesFrequencyIndex] = useState('');
    const [salesFrequencyCaption, setSalesFrequencyCaption] = useState('SALES FREQUENCY');
    const [salesFrequencyMan, setSalesFrequencyMan] = useState(false);
    const [salesFrequencyVisible, setSalesFrequencyVisible] = useState(true);
    const [salesFrequencyDisable, setSalesFrequencyDisable] = useState(false);

    const [visible, setVisible] = useState(true);
    const [photoOptionvisible, setphotoOptionvisible] = useState(false);
    const showphotoBottomSheet = () => setphotoOptionvisible(true);
    const hidephotoBottomSheet = () => setphotoOptionvisible(false);
    const [imageUri, setImageUri] = useState(null);
    const [imageFile, setImageFile] = useState([]);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [docID, setDocID] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileType, setFileType] = useState('');
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const showImageBottomSheet = () => { setBottomSheetVisible(true) };
    const hideImageBottomSheet = () => setBottomSheetVisible(false);

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
    const [onlyView, setOnlyView] = useState(false);
    const [hideRetake, setHideRetake] = useState(false);
    const [hideDelete, setHideDelete] = useState(false);
    const [pageId, setPageId] = useState(global.CURRENTPAGEID);

    const [businessDetailAvailable, setBusinessDetailAvailable] = useState(false);

    const monthArray = [
        { subCodeId: 0, Description: '0' },
        { subCodeId: 1, Description: '1' },
        { subCodeId: 2, Description: '2' },
        { subCodeId: 3, Description: '3' },
        { subCodeId: 4, Description: '4' },
        { subCodeId: 5, Description: '5' },
        { subCodeId: 6, Description: '6' },
        { subCodeId: 7, Description: '7' },
        { subCodeId: 8, Description: '8' },
        { subCodeId: 9, Description: '9' },
        { subCodeId: 10, Description: '10' },
        { subCodeId: 11, Description: '11' },
    ]
    const [monthData, setMonthData] = useState(monthArray);


    useEffect(() => {
        props.navigation
            .getParent()
            ?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }

    }, [props.navigation, isScreenVisible]);

    const handleBackButton = () => {
        onGoBack();
        return true; // Prevent default back button behavior
    };


    useFocusEffect(
        React.useCallback(() => {
            makeSystemMandatoryFields();
            getSystemCodeDetail();
            getApplicantData();


            if (global.USERTYPEID == 1163 || global.ALLOWEDIT == "0") {
                setOnlyView(true);
                setHideDelete(true);
                setHideRetake(true);
                fieldsDisable();
            }


            return () => {
                console.log('Screen is blurred');
            };
        }, [])
    );

    const getApplicantData = async () => {

        var UrNumberAvailable = false;
        const filteredData = props.loanInitiationDetails.filter(item => item.id === parseInt(global.LOANAPPLICATIONID));

        if (filteredData) {
            const clientDetail = filteredData[0].clientDetail.find(client => client.id === parseInt(global.CLIENTID));

            if (clientDetail) {
                if (clientDetail.udyamRegistrationNumber) {
                    setUrmNumber(clientDetail.udyamRegistrationNumber);
                    setUrmNumberDisable(true);
                    UrNumberAvailable = true;
                    getBusinessData(clientDetail.udyamRegistrationNumber, true);
                } else {
                    getBusinessData("", false);
                }
            }

        }

    }

    const getBusinessData = async (udyamNum, UrNumberAvailable) => {
        var businessAvailable = false;

        const filteredData = props.loanInitiationDetails.filter(item => item.id === parseInt(global.LOANAPPLICATIONID));

        if (filteredData) {
            const clientDetail = filteredData[0].clientDetail.find(client => client.id === parseInt(global.CLIENTID));
            if (clientDetail) {
                if (clientDetail.clientBusinessDetail) {

                    businessAvailable = true;
                    setCustomerSubCategoryLabel(clientDetail.clientBusinessDetail.customerSubcategory)
                    setCustomerSubCategoryDisable(true);
                    setEntShopName(clientDetail.clientBusinessDetail.enterpriseShopName)
                    setUrmNumber(clientDetail.clientBusinessDetail.udyamRegistrationNumber)
                    if (UrNumberAvailable) {
                        setUrmNumberDisable(true)
                    }
                    setDOR(clientDetail.clientBusinessDetail.dateOfRegistration ? Common.convertDateFormat(clientDetail.clientBusinessDetail.dateOfRegistration) : '') //dateofReg
                    setDOI(clientDetail.clientBusinessDetail.dateOfIncorporation ? Common.convertDateFormat(clientDetail.clientBusinessDetail.dateOfIncorporation) : '')
                    setDOBC(clientDetail.clientBusinessDetail.dateOfBusinessCommencement ? Common.convertDateFormat(clientDetail.clientBusinessDetail.dateOfBusinessCommencement) : '')
                    setYear(clientDetail?.clientBusinessDetail?.businessVintageYears?.toString() || '')
                    setMonthLabel(parseInt(clientDetail?.clientBusinessDetail?.businessVintageMonths))
                    setIndustryTypeLabel(clientDetail?.clientBusinessDetail?.industryType)
                    setIndustryLineLabel(clientDetail?.clientBusinessDetail?.industryLine)
                    setCompanyTypeLabel(clientDetail?.clientBusinessDetail?.companyType)
                    setEnterpriseTypeLabel(clientDetail?.clientBusinessDetail?.enterpriseType)
                    setBusinessLocationLabel(clientDetail?.clientBusinessDetail?.businessLocationVillage)
                    setNoofEmployee(clientDetail?.clientBusinessDetail?.noOfEmployees)
                    setOperatingDays(clientDetail?.clientBusinessDetail?.operatingDaysInAWeek) //operatingtiming
                    setBookKeepStatusLabel(clientDetail?.clientBusinessDetail?.bookKeepingStatus)
                    setHomeBasedBusinessLabel(clientDetail?.clientBusinessDetail?.homeBasedBusiness)
                    setACTMLabel(clientDetail?.clientBusinessDetail?.applicantCustomerTransactionMode)
                    setTimeByPromoter(clientDetail?.clientBusinessDetail?.timeSpentAtTheBusinessInADay)
                    setNPMRate(clientDetail?.clientBusinessDetail?.npmRateOfBusiness)
                    setPurchaseFrequencyLabel(clientDetail?.clientBusinessDetail?.purchasesFrequency)
                    setTypePurchaseLabel(clientDetail?.clientBusinessDetail?.typeOfPurchasingFacility)
                    setSalesFrequencyLabel(clientDetail?.clientBusinessDetail?.salesFrequency)
                    if (clientDetail?.clientBusinessDetail?.clientBusinessImageGeocodeDetail) {
                        setDocID(clientDetail?.clientBusinessDetail?.clientBusinessImageGeocodeDetail[0]?.dmsId);
                    }
                } else {
                    if (udyamNum) {
                        getUdyamCheck(udyamNum);
                    }
                    if (global.CLIENTTYPE == 'APPL') {
                        setCustomerSubCategoryLabel(clientDetail.customerSubcategory);
                        setCustomerSubCategoryDisable(true);
                    }
                }

            }
        }

        // await tbl_loanbusinessDetail.getBusinessDetailsBasedOnID(global.LOANAPPLICATIONID, global.CLIENTTYPE, global.CLIENTID)
        //     .then(value => {
        //         if (global.DEBUG_MODE) console.log('Business Data:', value);
        //         if (value !== undefined && value.length > 0) {
        //             businessAvailable = true;
        //             setCustomerSubCategoryLabel(value[0].customerSubCatg)
        //             setCustomerSubCategoryDisable(true);
        //             setEntShopName(value[0].enterpriseShopName)
        //             setUrmNumber(value[0].udyamRegNum)
        //             if (UrNumberAvailable) {
        //                 setUrmNumberDisable(true)
        //             }
        //             setDOR(value[0].dateofReg) //dateofReg
        //             setDOI(value[0].dateofIncorp) //dateofIncorp
        //             setDOBC(value[0].dateofBusiness) //dateofBusiness
        //             setYear(value[0].year)
        //             setMonthLabel(parseInt(value[0].month))
        //             setIndustryTypeLabel(value[0].industryType)
        //             setIndustryLineLabel(value[0].industryLine)
        //             setCompanyTypeLabel(value[0].companyType)
        //             setEnterpriseTypeLabel(value[0].enterpriseType)
        //             setBusinessLocationLabel(value[0].businessLocation)
        //             setNoofEmployee(value[0].noofEmployees)
        //             setOperatingDays(value[0].operatingdays) //operatingtiming
        //             setBookKeepStatusLabel(value[0].bookKeepingStatus)
        //             setHomeBasedBusinessLabel(value[0].homeBasedBusiness)
        //             setACTMLabel(value[0].custTransMode)
        //             setTimeByPromoter(value[0].operatingtiming)
        //             setNPMRate(value[0].npmRate)
        //             setPurchaseFrequencyLabel(value[0].purchaseFrequency)
        //             setTypePurchaseLabel(value[0].typeofPurchase)
        //             setSalesFrequencyLabel(value[0].salesFrequency)
        //             if (value[0].dmsId !== undefined) {
        //                 if (value[0].dmsId.length > 0) {
        //                     getImage(value[0].dmsId);
        //                 }
        //                 setDocID(value[0].dmsId);
        //             }
        //         } else {
        //             if (udyamNum) {
        //                 getUdyamCheck(udyamNum);
        //             }

        //         }

        //     })
        //     .catch(error => {
        //         if (global.DEBUG_MODE) console.error('Error fetching Business details:', error);
        //     });

        // if (!businessAvailable) {
        //     if (global.CLIENTTYPE == 'APPL') {
        //         tbl_loanApplication
        //             .getLoanAppBasedOnID(global.LOANAPPLICATIONID, 'APPL')
        //             .then(data => {
        //                 if (global.DEBUG_MODE) console.log('Applicant Data:', data);
        //                 if (data !== undefined && data.length > 0) {
        //                     setCustomerSubCategoryLabel(data[0].customer_subcategory);
        //                     setCustomerSubCategoryDisable(true);
        //                     setLoading(false);
        //                 }
        //             })
        //             .catch(error => {
        //                 setLoading(false);
        //                 if (global.DEBUG_MODE)
        //                     console.error('Error fetching Applicant details:', error);
        //             });

        //     }
        // }
    }

    const getUdyamCheck = (udyamNum) => {

        Common.getNetworkConnection().then(value => {
            if (value.isConnected == true) {
                setLoading(true)
                const baseURL = global.PORT1
                const appDetails =
                {
                    "udyamNumber": udyamNum,
                    "clientId": global.CLIENTID,
                    "createdBy": global.USERID
                }

                apiInstance(baseURL).post(`/api/v2/udyamCheck`, appDetails)
                    .then(async (response) => {
                        // Handle the response data
                        if (global.DEBUG_MODE) console.log("GetUdyamCheckResponse::" + JSON.stringify(response.data));

                        if (response.status == 200) {

                            if (response.data.clientBusinessDetailDto.enterpriseShopName) {
                                setEntShopName(response.data.clientBusinessDetailDto.enterpriseShopName)
                                setEntShopNameDisable(true)
                            }
                            if (response.data.clientBusinessDetailDto.dateOfRegistration) {
                                setDOR(Common.convertDateFormat(response.data.clientBusinessDetailDto.dateOfRegistration))
                                setDORDisable(true)
                            }
                            if (response.data.clientBusinessDetailDto.dateOfIncorporation) {
                                setDOI(Common.convertDateFormat(response.data.clientBusinessDetailDto.dateOfIncorporation))
                                setDOIDisable(true)
                            }
                            if (response.data.clientBusinessDetailDto.dateOfBusinessCommencement) {
                                setDOBC(Common.convertDateFormat(response.data.clientBusinessDetailDto.dateOfBusinessCommencement))
                                setDOBCDisable(true)
                            }
                            if (response.data.clientBusinessDetailDto.businessVintageYears) {
                                setYear(response.data.clientBusinessDetailDto.businessVintageYears.toString())
                                setYearDisable(true)
                            }
                            if (response.data.clientBusinessDetailDto.businessVintageMonths) {
                                setMonthLabel(response.data.clientBusinessDetailDto.businessVintageMonths)
                                setMonthsDisable(true)
                            }
                            if (response.data.clientBusinessDetailDto.noOfEmployees) {
                                setNoofEmployee(response.data.clientBusinessDetailDto.noOfEmployees.toString())
                                setNoofEmployeeDisable(true)
                            }


                        } else if (response.data.statusCode === 201) {
                            setApiError(response.data.message);
                            setErrorModalVisible(true);
                        } else if (response.data.statusCode === 202) {
                            setApiError(response.data.message);
                            setErrorModalVisible(true);
                        }
                        // props.navigation.navigate('LeadManagement', { fromScreen: 'LeadCompletion' })
                        setLoading(false)

                    })
                    .catch((error) => {
                        // Handle the error
                        setLoading(false)
                        if (global.DEBUG_MODE) console.log("GetPhotoApiResponse::" + JSON.stringify(error.response.data));
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
            } else {
                setApiError(language[0][props.language].str_errinternetimage);
                setErrorModalVisible(true)

            }

        })
    }

    const getImage = (dmsID) => {

        Common.getNetworkConnection().then(value => {
            if (value.isConnected == true) {
                setLoading(true)
                const baseURL = global.PORT2
                apiInstance(baseURL).get(`/api/documents/document/${parseInt(dmsID)}`)
                    .then(async (response) => {
                        // Handle the response data
                        if (Common.DEBUG_MODE) console.log("GetPhotoApiResponse::" + JSON.stringify(response.data));

                        if (response.status == 200) {
                            setFileName(response.data.fileName)
                            setImageUri('data:image/png;base64,' + response.data.base64Content)
                            props.navigation.navigate('PreviewImage', { imageName: response.data.fileName, imageUri: 'data:image/png;base64,' + response.data.base64Content })
                        } else if (response.data.statusCode === 201) {
                            setApiError(response.data.message);
                            setErrorModalVisible(true);
                        } else if (response.data.statusCode === 202) {
                            setApiError(response.data.message);
                            setErrorModalVisible(true);
                        }
                        // props.navigation.navigate('LeadManagement', { fromScreen: 'LeadCompletion' })
                        setLoading(false)

                    })
                    .catch((error) => {
                        // Handle the error
                        setLoading(false)
                        if (global.DEBUG_MODE) console.log("GetPhotoApiResponse::" + JSON.stringify(error.response.data));
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
            } else {
                setApiError(language[0][props.language].str_errinternetimage);
                setErrorModalVisible(true)

            }

        })
    }

    const fieldsDisable = () => {
        setCustomerSubCategoryDisable(true);
        setEntShopNameDisable(true);
        setUrmNumberDisable(true);
        setDORDisable(true);
        setDOIDisable(true);
        setDOBCDisable(true);
        setYearDisable(true);
        setMonthsDisable(true);
        setIndustryTypeDisable(true);
        setIndustryLineDisable(true);
        setCompanyTypeDisable(true);
        setEnterpriseTypeDisable(true);
        setBusinessLocationDisable(true);
        setNoofEmployeeDisable(true);
        setOperatingDaysDisable(true);
        setBookKeepStatusDisable(true);
        setHomeBasedBusinessDisable(true);
        setACTMDisable(true);
        setTimeByPromoterDisable(true);
        setNPMRateDisable(true);
        setPurchaseFrequencyDisable(true);
        setTypePurchaseDisable(true);
        setSalesFrequencyDisable(true);
    }

    const checkPermissions = async () => {
        const permissionsToRequest = [];

        if (Platform.OS === 'android') {
            // Camera permission
            const cameraPermission = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.CAMERA
            );
            if (cameraPermission !== PermissionsAndroid.RESULTS.GRANTED) {
                permissionsToRequest.push(PermissionsAndroid.PERMISSIONS.CAMERA);
            }

            // Request all pending permissions
            return requestPermissions(permissionsToRequest);
        } else {
            // For iOS and other platforms, use react-native-permissions
            const cameraResult = await check(PERMISSIONS.IOS.CAMERA);
            const locationResult = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

            const permissionsToRequest = [];

            if (cameraResult !== RESULTS.GRANTED) {
                permissionsToRequest.push(PERMISSIONS.IOS.CAMERA);
            }

            // Request all pending permissions
            request(permissionsToRequest);
        }
    };

    const requestPermissions = async (permissions) => {
        if (Platform.OS === 'android') {
            try {
                const grantedPermissions = await PermissionsAndroid.requestMultiple(permissions);
                const allPermissionsGranted = Object.values(grantedPermissions).every(
                    status => status === PermissionsAndroid.RESULTS.GRANTED
                );

                if (allPermissionsGranted) {
                    // All permissions granted

                } else {

                    // Handle denied permissions
                }
                return allPermissionsGranted
            } catch (error) {
                console.error(error);
            }
        } else {
            // For iOS and other platforms, use react-native-permissions
            const results = await request(permissions);

            if (results.every(result => result === RESULTS.GRANTED)) {
                // All permissions granted
            } else {
                // Handle denied permissions
            }
        }
    };

    const getSystemCodeDetail = async () => {

        const filteredCustomerSubCategoryData = leaduserCodeDetail.filter((data) => data.masterId === 'CUSTOMER_SUBCATEGORY').sort((a, b) => a.Description.localeCompare(b.Description));;
        setCustomerSubCategoryData(filteredCustomerSubCategoryData);

        const filteredIndustryTypeData = leaduserCodeDetail.filter((data) => data.masterId === 'INDUSTRY_TYPE').sort((a, b) => a.Description.localeCompare(b.Description));;
        setIndustryTypeData(filteredIndustryTypeData);

        const filteredIndustryLineData = leaduserCodeDetail.filter((data) => data.masterId === 'INDUSTRY_LINE').sort((a, b) => a.Description.localeCompare(b.Description));;
        setIndustryLineData(filteredIndustryLineData);

        const filteredCompanyTypeData = leaduserCodeDetail.filter((data) => data.masterId === 'COMPANY_TYPE').sort((a, b) => a.Description.localeCompare(b.Description));;
        setCompanyTypeData(filteredCompanyTypeData);

        const filteredEnterpriseTypeData = leaduserCodeDetail.filter((data) => data.masterId === 'ENTERPRISE_TYPE').sort((a, b) => a.Description.localeCompare(b.Description));;
        setEnterpriseTypeData(filteredEnterpriseTypeData);

        const filteredBusinessLocationData = leadsystemCodeDetail.filter((data) => data.masterId === 'BUSINESS_LOCATION/VILLAGE').sort((a, b) => a.Description.localeCompare(b.Description));;
        setBusinessLocationData(filteredBusinessLocationData);

        const filteredBookKeepStatusData = leadsystemCodeDetail.filter((data) => data.masterId === 'BOOK_KEEPING_STATUS').sort((a, b) => a.Description.localeCompare(b.Description));;
        setBookKeepStatusData(filteredBookKeepStatusData);

        const filteredHomeBasedBusinessData = leadsystemCodeDetail.filter((data) => data.masterId === 'HOME_BASED_BUSINESS').sort((a, b) => a.Description.localeCompare(b.Description));;
        setHomeBasedBusinessData(filteredHomeBasedBusinessData);

        const filteredACTMData = leaduserCodeDetail.filter((data) => data.masterId === 'CUSTOMER_TRANSACTION_MODE').sort((a, b) => a.Description.localeCompare(b.Description));;
        setACTMData(filteredACTMData);

        const filteredPurchaseFrequencyData = leaduserCodeDetail.filter((data) => data.masterId === 'PURCHASE_FREQUENCY').sort((a, b) => a.Description.localeCompare(b.Description));;
        setPurchaseFrequencyData(filteredPurchaseFrequencyData);

        const filteredTypePurchaseData = leaduserCodeDetail.filter((data) => data.masterId === 'PURCHASING_FACILITY').sort((a, b) => a.Description.localeCompare(b.Description));;
        setTypePurchaseData(filteredTypePurchaseData);

        const filteredSalesFrequencyData = leaduserCodeDetail.filter((data) => data.masterId === 'SALES_FREQUENCY').sort((a, b) => a.Description.localeCompare(b.Description));;
        setSalesFrequencyData(filteredSalesFrequencyData);

    };



    const makeSystemMandatoryFields = async () => {

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_cust_subcat' && data.pageId === pageId).map((value, index) => {
            setCustomerSubCategoryCaption(value.fieldName)

            if (value.isMandatory) {
                setCustomerSubCategoryMan(true);
            }
            if (value.isHide) {
                setCustomerSubCategoryVisible(false);
            }
            if (value.isDisable) {
                setCustomerSubCategoryDisable(true);
            }
            if (value.isCaptionChange) {
                setCustomerSubCategoryCaption(value.fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_shp_name' && data.pageId === pageId).map((value, index) => {
            setEntShopNameCaption(value.fieldName)

            if (value.isMandatory) {
                setEntShopNameMan(true);
            }
            if (value.isHide) {
                setEntShopNameVisible(false);
            }
            if (value.isDisable) {
                setEntShopNameDisable(true);
            }
            if (value.isCaptionChange) {
                setEntShopNameCaption(value.fieldCaptionChange)
            }
        });


        systemMandatoryField.filter((data) => data.fieldUiid === 'et_udyam_registration_number' && data.pageId === pageId).map((value, index) => {
            setUrmNumberCaption(value.fieldName)

            if (value.isMandatory) {
                setUrmNumberMan(true);
            }
            if (value.isHide) {
                setUrmNumberVisible(false);
            }
            if (value.isDisable) {
                setUrmNumberDisable(true);
            }
            if (value.isCaptionChange) {
                setUrmNumberCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_dt_of_reg' && data.pageId === pageId).map((value, index) => {
            setDORCaption(value.fieldName)

            if (value.isMandatory) {
                setDOBCMan(true);
            }
            if (value.isHide) {
                setDORVisible(false);
            }
            if (value.isDisable) {
                setDORDisable(true);
            }
            if (value.isCaptionChange) {
                setDORCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_dt_of_inct' && data.pageId === pageId).map((value, index) => {
            setDOICaption(value.fieldName)

            if (value.isMandatory) {
                setDOIMan(true);
            }
            if (value.isHide) {
                setDOIVisible(false);
            }
            if (value.isDisable) {
                setDOIDisable(true);
            }
            if (value.isCaptionChange) {
                setDOICaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_dt_of_bsn_cmn' && data.pageId === pageId).map((value, index) => {
            setDOBCCaption(value.fieldName)

            if (value.isMandatory) {
                setDOBCMan(true);
            }
            if (value.isHide) {
                setDOBCVisible(false);
            }
            if (value.isDisable) {
                setDOBCDisable(true);
            }
            if (value.isCaptionChange) {
                setDOBCCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_year' && data.pageId === pageId).map((value, index) => {
            setYearCaption(value.fieldName)
            if (value.mandatory) {
                setYearMan(true);
            }
            if (value.hide) {
                setYearVisible(false);
            }
            if (value.disable) {
                setYearDisable(true);
            }
            if (value.captionChange) {
                setYearCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_mnths' && data.pageId === pageId).map((value, index) => {
            setMonthsCaption(value.fieldName)
            if (value.mandatory) {
                setMonthsMan(true);
            }
            if (value.hide) {
                setMonthsVisible(false);
            }
            if (value.disable) {
                setMonthsDisable(true);
            }
            if (value.captionChange) {
                setMonthsCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_ind_typ' && data.pageId === pageId).map((value, index) => {
            setIndustryTypeCaption(value.fieldName)
            if (value.mandatory) {
                setIndustryTypeMan(true);
            }
            if (value.hide) {
                setIndustryTypeVisible(false);
            }
            if (value.disable) {
                setIndustryTypeDisable(true);
            }
            if (value.captionChange) {
                setIndustryTypeCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_ind_lin' && data.pageId === pageId).map((value, index) => {
            setIndustryLineCaption(value.fieldName)
            if (value.mandatory) {
                setIndustryLineMan(true);
            }
            if (value.hide) {
                setIndustryLineVisible(false);
            }
            if (value.disable) {
                setIndustryLineDisable(true);
            }
            if (value.captionChange) {
                setIndustryLineCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_cmp_typ' && data.pageId === pageId).map((value, index) => {
            setCompanyTypeCaption(value.fieldName)
            if (value.mandatory) {
                setCompanyTypeMan(true);
            }
            if (value.hide) {
                setCompanyTypeVisible(false);
            }
            if (value.disable) {
                setCompanyTypeDisable(true);
            }
            if (value.captionChange) {
                setCompanyTypeCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_ent_typ' && data.pageId === pageId).map((value, index) => {
            setEnterpriseTypeCaption(value.fieldName)
            if (value.mandatory) {
                setEnterpriseTypeMan(true);
            }
            if (value.hide) {
                setEnterpriseTypeVisible(false);
            }
            if (value.disable) {
                setEnterpriseTypeDisable(true);
            }
            if (value.captionChange) {
                setEnterpriseTypeCaption(value[0].fieldCaptionChange)
            }
        });


        systemMandatoryField.filter((data) => data.operatingTimings === 'et_op_tmng_dy' && data.pageId === pageId).map((value, index) => {
            setOperatingTimings(value.fieldName)
            if (value.mandatory) {
                setOperatingTimings(true);
            }
            if (value.hide) {
                setOperatingTimingsVisible(false);
            }
            if (value.disable) {
                setOperatingTimingsDisable(false);
            }
            if (value.captionChange) {
                setOperatingTimingsCaption(value.fieldCaptionChange)
            }
        });


        systemMandatoryField.filter((data) => data.fieldUiid === 'et_prsn_prms' && data.pageId === pageId).map((value, index) => {
            setYearAtPresentCaption(value.fieldName)
            if (value.mandatory) {
                setYearAtPresentMan(true);
            }
            if (value.hide) {
                setYearAtPresentVisible(false);
            }
            if (value.disable) {
                setYearAtPresentDisable(true);
            }
            if (value.captionChange) {
                setYearAtPresentCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_bsn_lcn_vilg' && data.pageId === pageId).map((value, index) => {
            setBusinessLocationCaption(value.fieldName)
            if (value.mandatory) {
                setBusinessLocationMan(true);
            }
            if (value.hide) {
                setBusinessLocationVisible(false);
            }
            if (value.disable) {
                setBusinessLocationDisable(true);
            }
            if (value.captionChange) {
                setBusinessLocationCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_no_empl' && data.pageId === pageId).map((value, index) => {
            setNoofEmployeeCaption(value.fieldName)
            if (value.mandatory) {
                setNoofEmployeeMan(true);
            }
            if (value.hide) {
                setNoofEmployeeVisible(false);
            }
            if (value.disable) {
                setNoofEmployeeDisable(true);
            }
            if (value.captionChange) {
                setNoofEmployeeCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_op_dy_wk' && data.pageId === pageId).map((value, index) => {
            setOperatingDaysCaption(value.fieldName)
            if (value.mandatory) {
                setOperatingDaysMan(true);
            }
            if (value.hide) {
                setOperatingDaysVisible(false);
            }
            if (value.disable) {
                setOperatingDaysDisable(true);
            }
            if (value.captionChange) {
                setOperatingDaysCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_op_tmng_dy' && data.pageId === pageId).map((value, index) => {
            setOperatingTimingsCaption(value.fieldName)
            if (value.mandatory) {
                setOperatingDaysMan(true);
            }
            if (value.hide) {
                setOperatingDaysVisible(false);
            }
            if (value.disable) {
                setOperatingDaysDisable(true);
            }
            if (value.captionChange) {
                setOperatingDaysCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_bk_kp_sts' && data.pageId === pageId).map((value, index) => {
            setBookKeepStatusCaption(value.fieldName)
            if (value.mandatory) {
                setBookKeepStatusMan(true);
            }
            if (value.hide) {
                setBookKeepStatusVisible(false);
            }
            if (value.disable) {
                setBookKeepStatusDisable(true);
            }
            if (value.captionChange) {
                setBookKeepStatusCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_hm_bsd_bsn' && data.pageId === pageId).map((value, index) => {
            setHomeBasedBusinessCaption(value.fieldName)
            if (value.mandatory) {
                setHomeBasedBusinessMan(true);
            }
            if (value.hide) {
                setHomeBasedBusinessVisible(false);
            }
            if (value.disable) {
                setHomeBasedBusinessDisable(true);
            }
            if (value.captionChange) {
                setHomeBasedBusinessCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_ctmr_trns_md' && data.pageId === pageId).map((value, index) => {
            setACTMCaption(value.fieldName)
            if (value.mandatory) {
                setACTMMan(true);
            }
            if (value.hide) {
                setACTMVisible(false);
            }
            if (value.disable) {
                setACTMDisable(true);
            }
            if (value.captionChange) {
                setACTMCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_tm_spt_bsn_dy' && data.pageId === pageId).map((value, index) => {
            setTimeByPromoterCaption(value.fieldName)
            if (value.mandatory) {
                setTimeByPromoterMan(true);
            }
            if (value.hide) {
                setTimeByPromoterVisible(false);
            }
            if (value.disable) {
                setTimeByPromoterDisable(true);
            }
            if (value.captionChange) {
                setTimeByPromoterCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_npm_rt_bsn' && data.pageId === pageId).map((value, index) => {
            setNPMRateCaption(value.fieldName)
            if (value.mandatory) {
                setNPMRateMan(true);
            }
            if (value.hide) {
                setNPMRateVisible(false);
            }
            if (value.disable) {
                setNPMRateDisable(true);
            }
            if (value.captionChange) {
                setNPMRateCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_prchs_frq' && data.pageId === pageId).map((value, index) => {
            setPurchaseFrequencyCaption(value.fieldName)
            if (value.mandatory) {
                setPurchaseFrequencyMan(true);
            }
            if (value.hide) {
                setPurchaseFrequencyVisible(false);
            }
            if (value.disable) {
                setPurchaseFrequencyDisable(true);
            }
            if (value.captionChange) {
                setPurchaseFrequencyCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_tp_prc_fct' && data.pageId === pageId).map((value, index) => {
            setTypePurchaseCaption(value.fieldName)
            if (value.mandatory) {
                setTypePurchaseMan(true);
            }
            if (value.hide) {
                setTypePurchaseVisible(false);
            }
            if (value.disable) {
                setTypePurchaseDisable(true);
            }
            if (value.captionChange) {
                setTypePurchaseCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_sls_frq' && data.pageId === pageId).map((value, index) => {
            setSalesFrequencyCaption(value.fieldName)
            if (value.mandatory) {
                setSalesFrequencyMan(true);
            }
            if (value.hide) {
                setSalesFrequencyVisible(false);
            }
            if (value.disable) {
                setSalesFrequencyDisable(true);
            }
            if (value.captionChange) {
                setSalesFrequencyCaption(value[0].fieldCaptionChange)
            }
        });

    };

    const callBusinessDetails = async () => {

        if (onlyView) {
            if (global.CLIENTTYPE == 'APPL') {
                page = 'DMGRC_APPL_BSN_ADDR_DTLS';
            } else if (global.CLIENTTYPE == 'CO-APPL') {
                page = 'DMGRC_COAPPL_BSN_ADDR_DTLS';
            } else if (global.CLIENTTYPE == 'GRNTR') {
                page = 'DMGRC_GRNTR_BSN_ADDR_DTLS';
            }
            await Common.getPageStatus(global.FILTEREDPROCESSMODULE, page)

            navigatetoBusinessAddress();
            return;
        }
        if (validate()) {
            showBottomSheet();
        } else {
            updateImage();
        }
    }

    const updateImage = async () => {
        if (imageUri) {

            setLoading(true);
            const formData = new FormData();
            formData.append('file', {
                uri: imageUri,
                type: fileType,
                name: fileName,
            });

            try {
                const response = await fetch(global.BASEURL + '8094/api/documents', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    // Handle the response from Cloudinary

                    setDocID(data.docId);
                    if (businessDetailAvailable) {
                        updateBusinessDetails(data.docId);
                    } else {
                        postBusinessDetails(data.docId);
                    }

                } else {
                    if (global.DEBUG_MODE) console.log('Upload failed:', response.status);
                    setApiError(response.status);
                    setErrorModalVisible(true)
                }
            } catch (error) {
                if (global.DEBUG_MODE) console.log('Upload error:', error);
                setApiError(error.response.data.message);
                setErrorModalVisible(true)
            } finally {
                setLoading(false);
            }
        }
    }

    const postBusinessDetails = (imageID) => {

        var dor = '', doi = '', dobc = '';

        if (DOR != undefined && DOR != null) {
            if (DOR.length > 0) {
                dor = Common.convertYearDateFormat(DOR)
            }
        }

        if (DOI != undefined && DOI != null) {
            if (DOI.length > 0) {
                doi = Common.convertYearDateFormat(DOI)
            }
        }

        if (DOBC != undefined && DOBC != null) {
            if (DOBC.length > 0) {
                dobc = Common.convertYearDateFormat(DOBC)
            }
        }

        if (validate()) {

        } else {
            var appDetails =
            {
                "clientType": global.CLIENTTYPE,
                "customerSubcategory": CustomerSubCategoryLabel,
                "enterpriseShopName": entShopName,
                "udyamRegistrationNumber": urmNumber,
                "dateOfRegistration": dor,
                "dateOfIncorporation": doi,
                "dateOfBusinessCommencement": dobc,
                "businessVintageYears": year,
                "businessVintageMonths": monthLabel,
                "industryType": industryTypeLabel,
                "industryLine": industryLineLabel,
                "companyType": companyTypeLabel,
                "enterpriseType": enterpriseTypeLabel,
                "yearsAtPresentPremises": yearAtPresent,
                "businessLocationVillage": businessLocationLabel,
                "noOfEmployees": noofEmployee,
                "operatingDaysInAWeek": operatingDays,
                "operatingTimesInADay": operatingTimings,
                "bookKeepingStatus": bookKeepStatusLabel,
                "homeBasedBusiness": homeBasedBussinessLabel,
                "applicantCustomerTransactionMode": actmLabel,
                "timeSpentAtTheBusinessInADay": timeByPromoter,
                "npmRateOfBusiness": npmRate,
                "purchasesFrequency": purchaseFrequencyLabel,
                "typeOfPurchasingFacility": typePurchaseLabel,
                "salesFrequency": salesFrequencyLabel,

                "clientBusinessImageGeocodeDetail": [
                    {
                        "dmsId": imageID,
                        "image": fileName,
                        "geoCode": "",
                        "isActive": true,
                        "createdBy": global.USERID,
                    }
                ]
            }

            const baseURL = global.PORT1;
            setLoading(true);
            apiInstance(baseURL)
                .post(`/api/v2/loan-demographics/${global.CLIENTID}/businessDetails`, appDetails)
                .then(async response => {
                    // Handle the response data

                    if (global.DEBUG_MODE) console.log('PostBusinessDetailApiResponse::' + JSON.stringify(response.data),);

                    setLoading(false);
                    if (response.status == 200) {
                        props.updateNestedClientDetails(global.LOANAPPLICATIONID, global.CLIENTID, 'clientDetail', 'clientBusinessDetail', response.data)
                        updateLoanStatus();
                        // await insertData(response.data.id, imageID);
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
                    if (global.DEBUG_MODE) console.log('PostBusinessDetailApiResponse' + JSON.stringify(error));
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

    const updateBusinessDetails = (imageID) => {

        if (validate()) {
            showBottomSheet();
        } else {
            var appDetails = {
                "clientType": global.CLIENTTYPE,
                "customerSubcategory": CustomerSubCategoryLabel,
                "enterpriseShopName": entShopName,
                "udyamRegistrationNumber": urmNumber,
                "dateOfRegistration": "2023-12-06T04:04:55.892Z",
                "dateOfIncorporation": "2023-12-06T04:04:55.892Z",
                "dateOfBusinessCommencement": "2023-12-06T04:04:55.892Z",
                "businessVintageYears": year,
                "businessVintageMonths": monthLabel,
                "industryType": industryTypeLabel,
                "industryLine": industryLineLabel,
                "companyType": companyTypeLabel,
                "enterpriseType": enterpriseTypeLabel,
                "yearsAtPresentPremises": yearAtPresent,
                "businessLocationVillage": businessLocationLabel,
                "noOfEmployees": noofEmployee,
                "operatingDaysInAWeek": operatingDays,
                "operatingTimesInADay": 0,
                "bookKeepingStatus": bookKeepStatusLabel,
                "homeBasedBusiness": homeBasedBussinessLabel,
                "applicantCustomerTransactionMode": actmLabel,
                "timeSpentAtTheBusinessInADay": timeByPromoter,
                "npmRateOfBusiness": npmRate,
                "purchasesFrequency": purchaseFrequencyLabel,
                "typeOfPurchasingFacility": typePurchaseLabel,
                "salesFrequency": salesFrequencyLabel,
                "clientBusinessImageGeocodeDetail": [
                    {
                        "dmsId": imageID,
                        "image": fileName,
                        "geoCode": "",
                        "isActive": true,
                        "createdBy": global.USERID,
                    }
                ]
            }

            const baseURL = global.PORT1;
            setLoading(true);
            apiInstance(baseURL)
                .put(`/api/v2/loan-demographics/familyDetails/${familyID}`, appDetails)
                .then(async response => {
                    // Handle the response data

                    if (global.DEBUG_MODE) console.log('UpdateBusinessApiResponse::' + JSON.stringify(response.data),);

                    setLoading(false);
                    if (response.status == 200) {
                        updateLoanStatus();
                        //await insertData(familyID);
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
                    if (global.DEBUG_MODE) console.log('UpdateBusinessApiResponse' + JSON.stringify(error));
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


    const updateLoanStatus = () => {

        var module = ''; var page = '';

        if (global.CLIENTTYPE == 'APPL') {
            module = 'LN_DMGP_APLCT';
            page = 'DMGRC_APPL_BSN_DTLS';
        } else if (global.CLIENTTYPE == 'CO-APPL') {
            module = 'LN_DMGP_COAPLCT';
            page = 'DMGRC_COAPPL_BSN_DTLS';
        } else if (global.CLIENTTYPE == 'GRNTR') {
            module = 'LN_DMGP_GRNTR';
            page = 'DMGRC_GRNTR_BSN_DTLS';
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
                        global.COMPLETEDPAGE = 'DMGRC_APPL_BSN_DTLS';
                    } else if (global.CLIENTTYPE == 'CO-APPL') {
                        global.COMPLETEDMODULE = 'LN_DMGP_COAPLCT';
                        global.COMPLETEDPAGE = 'DMGRC_COAPPL_BSN_DTLS';
                    } else if (global.CLIENTTYPE == 'GRNTR') {
                        global.COMPLETEDMODULE = 'LN_DMGP_GRNTR';
                        global.COMPLETEDPAGE = 'DMGRC_GRNTR_BSN_DTLS';
                    }
                    navigatetoBusinessAddress();
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

    const navigatetoBusinessAddress = async () => {
        var page = '';
        if (global.CLIENTTYPE == 'APPL') {
            page = 'DMGRC_APPL_BSN_ADDR_DTLS';
        } else if (global.CLIENTTYPE == 'CO-APPL') {
            page = 'DMGRC_COAPPL_BSN_ADDR_DTLS';
        } else if (global.CLIENTTYPE == 'GRNTR') {
            page = 'DMGRC_GRNTR_BSN_ADDR_DTLS';
        }
        await Common.getPageID(global.FILTEREDPROCESSMODULE, page)
        props.navigation.replace('LoanAddressList')
    }


    const insertData = async (id, imageID) => {

        await tbl_loanbusinessDetail.insertBusinessDetail(global.LOANAPPLICATIONID, id, global.CLIENTID, global.CLIENTTYPE, CustomerSubCategoryLabel, entShopName, urmNumber, DOI, DOR, DOBC, year, monthLabel, industryTypeLabel, industryLineLabel, companyTypeLabel, enterpriseTypeLabel, businessLocationLabel, noofEmployee, operatingDays, operatingTimings, bookKeepStatusLabel, homeBasedBussinessLabel, actmLabel, timeByPromoter, npmRate, purchaseFrequencyLabel, typePurchaseLabel, salesFrequencyLabel, imageID);

        updateLoanStatus();

    }

    const validate = () => {
        var flag = false; isAadharAvailable = false;
        var i = 1;
        var errorMessage = '';

        if (CustomerSubCategoryMan && CustomerSubCategoryVisible) {
            if (CustomerSubCategoryLabel.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsselect +
                    DORCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (entShopNameMan && entShopNameVisible) {
            if (entShopName.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsenter +
                    entShopNameCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (urmNumberMan && urmNumberVisible) {
            if (urmNumber.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsenter +
                    urmNumberCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (DORMan && DORVisible) {
            if (DOR.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsenter +
                    DORCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (DOIMan && DOIVisible) {
            if (DOI.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsenter +
                    DOICaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (DOBCMan && DOBCVisible) {
            if (DOBC.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsenter +
                    DOBCCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (yearMan && yearVisible) {
            if (year.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + yearCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (monthsMan && monthsVisible) {
            if (monthLabel.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + monthsCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (industryTypeMan && industryTypeVisible) {
            if (industryTypeLabel.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + industryTypeCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (industryLineMan && industryLineVisible) {
            if (industryLineLabel.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + industryLineCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (companyTypeMan && companyTypeVisible) {
            if (industryLineLabel.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + companyTypeCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (enterpriseTypeMan && enterpriseTypeVisible) {
            if (enterpriseTypeLabel.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + enterpriseTypeCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (yearAtPresentMan && yearAtPresentVisible) {
            if (yearAtPresent.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + yearAtPresentCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (noofEmployeeMan && noofEmployeeVisible) {
            if (noofEmployee.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + noofEmployeeCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (operatingDaysMan && operatingDaysVisible) {
            if (operatingDays.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + operatingDaysCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (operatingTimingsMan && operatingTimingsVisible) {
            if (operatingTimings.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + operatingTimingsCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (bookKeepStatusMan && bookKeepStatusVisible) {
            if (bookKeepStatusLabel.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + bookKeepStatusCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (homeBasedBussinessMan && homeBasedBussinessVisible) {
            if (homeBasedBussinessLabel.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + homeBasedBussinessCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (actmMan && actmVisible) {
            if (actmLabel.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + actmCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (timeByPromoterMan && timeByPromoterVisible) {
            if (timeByPromoter.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + timeByPromoterCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (npmRateMan && npmRateVisible) {
            if (npmRate.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + npmRateCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (purchaseFrequencyMan && purchaseFrequencyVisible) {
            if (purchaseFrequencyLabel.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + purchaseFrequencyCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (typePurchaseMan && typePurchaseVisible) {
            if (typePurchaseLabel.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + typePurchaseCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (salesFrequencyMan && salesFrequencyVisible) {
            if (salesFrequencyLabel.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + salesFrequencyCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (imageUri == null) {
            errorMessage =
                errorMessage +
                i +
                ')' +
                ' ' +
                language[0][props.language].str_errorimage +
                '\n';
            i++;
            flag = true;
        }

        setErrMsg(errorMessage);
        return flag;
    };

    const handleClick = (componentName, textValue) => {
        if (componentName === 'DOR') {
            setDOR(textValue);
        } else if (componentName === 'EnterpriseShopName') {
            setEntShopName(textValue);
        } else if (componentName === 'URMNumber') {
            const alphanumericInput = textValue.replace(/\W/g, '');

            let formattedText = '';
            for (let i = 0; i < alphanumericInput.length; i++) {
                if (i === 5 || i === 7 || i === 9) {
                    formattedText += '-';
                }
                formattedText += alphanumericInput[i];
            }
            setUrmNumber(formattedText);
        } else if (componentName === 'DOI') {
            setDOI(textValue);
        } else if (componentName === 'DOBC') {
            setDOBC(textValue);
        } else if (componentName === 'DOBC') {
            setDOBC(textValue);
        } else if (componentName === 'YearsAtPresent') {
            setYearAtPresent(textValue);
        } else if (componentName === 'NoofEmployee') {
            setNoofEmployee(textValue);
        } else if (componentName === 'OperatingDays') {
            setOperatingDays(textValue);
        } else if (componentName === 'OperatingTimings') {
            setOperatingTimings(textValue)
        } else if (componentName === 'TimeByPromoter') {
            setTimeByPromoter(textValue);
        } else if (componentName === 'NPMRate') {
            setNPMRate(textValue);
        } else if (componentName === 'year') {
            setYear(textValue);
        }
    };


    const handleReference = componentName => {

    };

    const handlePickerClick = (componentName, label, index) => {
        if (componentName === 'CustomerSubCategoryPicker') {
            setCustomerSubCategoryLabel(label);
            setCustomerSubCategoryIndex(index);
        } else if (componentName === 'IndustryTypePicker') {
            setIndustryTypeLabel(label);
            setIndustryTypeIndex(index);
        } else if (componentName === 'monthPicker') {
            setMonthLabel(label);
            setMonthIndex(index);
        } else if (componentName === 'IndustryLinePicker') {
            setIndustryLineLabel(label);
            setIndustryLineIndex(index);
        } else if (componentName === 'CompanyTypePicker') {
            setCompanyTypeLabel(label);
            setCompanyTypeIndex(index);
        } else if (componentName === 'EnterpriseTypePicker') {
            setEnterpriseTypeLabel(label);
            setEnterpriseTypeIndex(index);
        } else if (componentName === 'BusinessLocationPicker') {
            setBusinessLocationLabel(label);
            setBusinessLocationIndex(index);
        } else if (componentName === 'BookKeepStatusPicker') {
            setBookKeepStatusLabel(label);
            setBookKeepStatusIndex(index);
        } else if (componentName === 'HomeBasedBusinessPicker') {
            setHomeBasedBusinessLabel(label);
            setHomeBasedBusinessIndex(index);
        } else if (componentName === 'CustTranscMode') {
            setACTMLabel(label);
            setACTMIndex(index);
        } else if (componentName === 'PurchaseFrequencyPicker') {
            setPurchaseFrequencyLabel(label);
            setPurchaseFrequencyIndex(index);
        } else if (componentName === 'TypePurchasePicker') {
            setTypePurchaseLabel(label);
            setTypePurchaseIndex(index);
        } else if (componentName === 'SalesFrequencyPicker') {
            setSalesFrequencyLabel(label);
            setSalesFrequencyIndex(index);
        }


    };

    const pickDocument = async () => {

        if (onlyView) {
            return;
        }

        checkPermissions().then(res => {
            if (res == true) {
                showphotoBottomSheet();
            } else {
                setApiError('Permission Not Granted');
                setErrorModalVisible(true)
            }
        });

    };

    const pickImage = () => {
        // setVisible(false)

        hidephotoBottomSheet();
        ImagePicker.openCamera({
            cropping: true,
        }).then(image => {
            setImageFile(image)

            const lastDotIndex = image.path.lastIndexOf('.');
            var imageName = 'Photo' + '_' + global.leadID;
            if (lastDotIndex !== -1) {
                // Get the substring from the last dot to the end of the string
                const fileExtension = image.path.substring(lastDotIndex);
                imageName = imageName + fileExtension;
                console.log('File extension:', fileExtension);
            }

            setFileType(image.mime)
            setFileName(imageName)
            setImageUri(image.path)
            //setVisible(false)
            props.onChange?.(image);
        })

    };

    const selectImage = async () => {
        // setVisible(false)

        hidephotoBottomSheet();
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            setImageFile(image);

            const lastDotIndex = image.path.lastIndexOf('.');
            var imageName = 'Photo' + '_' + global.TEMPAPPID;
            if (lastDotIndex !== -1) {
                // Get the substring from the last dot to the end of the string
                const fileExtension = image.path.substring(lastDotIndex);
                imageName = imageName + fileExtension;
                console.log('File extension:', fileExtension);
            }
            setFileType(image.mime)
            setFileName(imageName)
            setImageUri(image.path)
            //setVisible(false)
            //setDeleteVisible(false)
            props.onChange?.(image);
        })

    };


    const previewImage = () => {
        hideImageBottomSheet();
        if (imageUri) {
            props.navigation.navigate('PreviewImage', { imageName: fileName, imageUri: imageUri })
        } else {
            getImage(docID);
        }

    }

    const imageDetail = () => {

    }

    const reTakePhoto = () => {
        pickDocument();
        hideImageBottomSheet();
    }

    const deletePhoto = () => {
        setDeleteVisible(true);
    }

    const onDeleteorCancel = (value) => {
        if (value == 'Cancel') {
            setDeleteVisible(false);
            hideImageBottomSheet();
        } else {
            setImageUri(null);
            setFileName('');
            setFileType('');
            setImageFile('');
            setDeleteVisible(false);
            hideImageBottomSheet();
        }
    }



    const closeErrorModal = () => {
        setErrorModalVisible(false);
    };

    const onGoBack = () => {
        props.navigation.replace('LoanApplicationMain', { fromScreen: 'BusinessDetail' });
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

            <ImageBottomPreview bottomSheetVisible={bottomSheetVisible} previewImage={previewImage} hideBottomSheet={hideImageBottomSheet} reTakePhoto={reTakePhoto} fileName={fileName} detailHide={true} deleteVisible={deleteVisible} deletePhoto={deletePhoto} onDeleteorCancel={onDeleteorCancel} hideDelete={hideDelete} hideRetake={hideRetake} />

            <Modal
                isVisible={photoOptionvisible}
                onBackdropPress={hidephotoBottomSheet}
                style={styles.modal}>
                <View style={styles.modalContent}>
                    <TouchableOpacity
                        onPress={() => hidephotoBottomSheet()}
                        style={{
                            width: 33,
                            height: 33,
                            position: 'absolute',
                            right: 0,
                            alignItems: 'center',
                            justifyContent: 'center',
                            zIndex: 1,
                            backgroundColor: Colors.common,
                            borderBottomStartRadius: 10,
                        }}>
                        <AntDesign name="close" size={18} color={Colors.black} />
                    </TouchableOpacity>

                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ width: '30%', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => pickImage()} activeOpacity={11}>
                                <View style={{
                                    width: 53, height: 53, borderRadius: 53, backgroundColor: '#E74C3C',
                                    alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <Ionicons name='camera-outline' size={31} color={Colors.white} />
                                </View>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 14, color: Colors.black, marginTop: 7, fontFamily: 'PoppinsRegular' }}>Camera</Text>
                        </View>
                        <View style={{ width: '30%', alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => selectImage()} activeOpacity={11}>
                                <View style={{
                                    width: 53, height: 53, borderRadius: 53, backgroundColor: '#8E44AD',
                                    alignItems: 'center', justifyContent: 'center'
                                }}>
                                    <Ionicons name='image-outline' size={27} color={Colors.white} />
                                </View>
                            </TouchableOpacity>
                            <Text style={{ fontSize: 14, color: Colors.black, marginTop: 7 }}>Gallery</Text>
                        </View>

                    </View>
                </View>
            </Modal>

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
                                    language[0][props.language].str_businessdetails
                                }></TextComp>

                            {global.CLIENTTYPE == 'APPL' ? (
                                <ProgressComp progressvalue={0.50} textvalue="2 of 6" />
                            ) : (
                                <ProgressComp progressvalue={0.50} textvalue="1 of 4" />
                            )}
                        </View>
                    </View>


                    {CustomerSubCategoryVisible && (
                        <View
                            style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                                <TextComp
                                    textVal={CustomerSubCategoryCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={CustomerSubCategoryMan}
                                />
                            </View>

                            <PickerComp
                                textLabel={CustomerSubCategoryLabel}
                                pickerStyle={Commonstyles.picker}
                                Disable={CustomerSubCategoryDisable}
                                pickerdata={CustomerSubCategoryData}
                                componentName="CustomerSubCategoryPicker"
                                handlePickerClick={handlePickerClick}
                            />
                        </View>
                    )}

                    {entShopNameVisible && (
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
                                    textVal={entShopNameCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={entShopNameMan}
                                />
                            </View>

                            <TextInputComp
                                textValue={entShopName}
                                textStyle={Commonstyles.textinputtextStyle}
                                type="email-address"
                                Disable={entShopNameDisable}
                                ComponentName="EnterpriseShopName"
                                reference={entShopNameRef}
                                returnKey="next"
                                handleClick={handleClick}
                                handleReference={handleReference}
                            />
                        </View>
                    )}

                    {urmNumberVisible && (
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
                                    textVal={urmNumberCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={urmNumberMan}
                                />
                            </View>

                            <TextInputComp
                                textValue={urmNumber}
                                textStyle={Commonstyles.textinputtextStyle}
                                type="email-address"
                                Disable={urmNumberDisable}
                                ComponentName="URMNumber"
                                reference={urmNumberRef}
                                returnKey="next"
                                handleClick={handleClick}
                                autocapital={'characters'}
                                handleReference={handleReference}
                            />
                        </View>
                    )}

                    {DORVisible && (
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
                                    textVal={DORCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={DORMan}
                                />
                            </View>

                            <View style={{ width: '100%', alignItems: 'center' }}>
                                <DateInputComp textStyle={[Commonstyles.inputtextStyle, { width: '90%' }]} ComponentName="DOR"
                                    textValue={DOR}
                                    type="numeric"
                                    handleClick={handleClick}
                                    Disable={DORDisable}
                                    reference={DORRef}
                                    maxDate={new Date()}
                                    handleReference={handleReference} />
                            </View>

                        </View>
                    )}

                    {DOIVisible && (
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
                                    textVal={DOICaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={DOIMan}
                                />
                            </View>

                            <View style={{ width: '100%', alignItems: 'center' }}>
                                <DateInputComp textStyle={[Commonstyles.inputtextStyle, { width: '90%' }]} ComponentName="DOI"
                                    textValue={DOI}
                                    type="numeric"
                                    handleClick={handleClick}
                                    Disable={DOIDisable}
                                    reference={DOIRef}
                                    maxDate={new Date()}
                                    handleReference={handleReference} />
                            </View>

                        </View>
                    )}

                    {DOBCVisible && (
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
                                    textVal={DOBCCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={DOBCMan}
                                />
                            </View>

                            <View style={{ width: '100%', alignItems: 'center' }}>
                                <DateInputComp textStyle={[Commonstyles.inputtextStyle, { width: '90%' }]} ComponentName="DOBC"
                                    textValue={DOBC}
                                    type="numeric"
                                    handleClick={handleClick}
                                    Disable={DOBCDisable}
                                    reference={DOBCRef}
                                    maxDate={new Date()}
                                    handleReference={handleReference} />
                            </View>

                        </View>
                    )}


                    <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                            <TextComp textVal={language[0][props.language].str_businessvintage} textStyle={Commonstyles.inputtextStyle} Visible={false} />
                        </View>

                        <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between' }}>

                            {yearVisible && <View style={{ width: '48%' }}>
                                <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                                        <TextComp textVal={yearCaption} textStyle={Commonstyles.inputtextStyle} Visible={yearMan} />
                                    </View>

                                    <TextInputComp textValue={year} textStyle={Commonstyles.textinputtextStyle} type='numeric' Disable={yearDisable} ComponentName='year' reference={yearRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={2} />

                                </View>
                            </View>}


                            {monthsVisible && <View style={{ width: '48%' }}>
                                <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>

                                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                                        <TextComp textVal={monthsCaption} textStyle={Commonstyles.inputtextStyle} Visible={monthsMan} />
                                    </View>

                                    <PickerComp textLabel={monthLabel} pickerStyle={Commonstyles.picker} Disable={monthsDisable} pickerdata={monthData} componentName='monthPicker' handlePickerClick={handlePickerClick} />

                                </View>
                            </View>}

                        </View>

                    </View>


                    {industryTypeVisible && (
                        <View
                            style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                                <TextComp
                                    textVal={industryTypeCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={industryTypeMan}
                                />
                            </View>

                            <PickerComp
                                textLabel={industryTypeLabel}
                                pickerStyle={Commonstyles.picker}
                                Disable={industryTypeDisable}
                                pickerdata={industryTypeData}
                                componentName="IndustryTypePicker"
                                handlePickerClick={handlePickerClick}
                            />
                        </View>
                    )}

                    {industryLineVisible && (
                        <View
                            style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                                <TextComp
                                    textVal={industryLineCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={industryLineMan}
                                />
                            </View>

                            <PickerComp
                                textLabel={industryLineLabel}
                                pickerStyle={Commonstyles.picker}
                                Disable={industryLineDisable}
                                pickerdata={industryLineData}
                                componentName="IndustryLinePicker"
                                handlePickerClick={handlePickerClick}
                            />
                        </View>
                    )}

                    {companyTypeVisible && (
                        <View
                            style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                                <TextComp
                                    textVal={companyTypeCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={industryLineMan}
                                />
                            </View>

                            <PickerComp
                                textLabel={companyTypeLabel}
                                pickerStyle={Commonstyles.picker}
                                Disable={companyTypeDisable}
                                pickerdata={companyTypeData}
                                componentName="CompanyTypePicker"
                                handlePickerClick={handlePickerClick}
                            />
                        </View>
                    )}

                    {enterpriseTypeVisible && (
                        <View
                            style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                                <TextComp
                                    textVal={enterpriseTypeCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={enterpriseTypeMan}
                                />
                            </View>

                            <PickerComp
                                textLabel={enterpriseTypeLabel}
                                pickerStyle={Commonstyles.picker}
                                Disable={enterpriseTypeDisable}
                                pickerdata={enterpriseTypeData}
                                componentName="EnterpriseTypePicker"
                                handlePickerClick={handlePickerClick}
                            />
                        </View>
                    )}

                    {yearAtPresent && (
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
                                    textVal={yearAtPresentCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={yearAtPresentMan}
                                />
                            </View>

                            <TextInputComp
                                textValue={yearAtPresent}
                                textStyle={Commonstyles.textinputtextStyle}
                                type="numeric"
                                Disable={yearAtPresentDisable}
                                ComponentName="YearsAtPresent"
                                reference={yearAtPresentRef}
                                returnKey="next"
                                handleClick={handleClick}
                                handleReference={handleReference}
                            />
                        </View>
                    )}

                    {businessLocationVisible && (
                        <View
                            style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                                <TextComp
                                    textVal={businessLocationCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={businessLocationMan}
                                />
                            </View>

                            <PickerComp
                                textLabel={businessLocationLabel}
                                pickerStyle={Commonstyles.picker}
                                Disable={businessLocationDisable}
                                pickerdata={businessLocationData}
                                componentName="BusinessLocationPicker"
                                handlePickerClick={handlePickerClick}
                            />
                        </View>
                    )}

                    {noofEmployeeVisible && (
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
                                    textVal={noofEmployeeCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={noofEmployeeMan}
                                />
                            </View>

                            <TextInputComp
                                textValue={noofEmployee}
                                textStyle={Commonstyles.textinputtextStyle}
                                type="numeric"
                                Disable={noofEmployeeDisable}
                                ComponentName="NoofEmployee"
                                reference={noofEmployeeRef}
                                returnKey="next"
                                handleClick={handleClick}
                                handleReference={handleReference}
                            />
                        </View>
                    )}

                    {operatingDaysVisible && (
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
                                    textVal={operatingDaysCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={operatingDaysMan}
                                />
                            </View>

                            <TextInputComp
                                textValue={operatingDays}
                                textStyle={Commonstyles.textinputtextStyle}
                                type="numeric"
                                Disable={operatingDaysDisable}
                                ComponentName="OperatingDays"
                                reference={operatingDaysRef}
                                returnKey="next"
                                handleClick={handleClick}
                                handleReference={handleReference}
                            />
                        </View>
                    )}
                    {operatingTimingsVisible && (
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
                                    textVal={operatingTimingsCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={operatingTimingsMan}
                                />
                            </View>

                            <TextInputComp
                                textValue={operatingTimings}
                                textStyle={Commonstyles.textinputtextStyle}
                                type="numeric"
                                Disable={operatingTimingsDisable}
                                ComponentName="OperatingTimings"
                                reference={operatingTimingsRef}
                                returnKey="next"
                                handleClick={handleClick}
                                handleReference={handleReference}
                            />
                        </View>
                    )}


                    {bookKeepStatusVisible && (
                        <View
                            style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                                <TextComp
                                    textVal={bookKeepStatusCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={bookKeepStatusMan}
                                />
                            </View>

                            <PickerComp
                                textLabel={bookKeepStatusLabel}
                                pickerStyle={Commonstyles.picker}
                                Disable={bookKeepStatusDisable}
                                pickerdata={bookKeepStatusData}
                                componentName="BookKeepStatusPicker"
                                handlePickerClick={handlePickerClick}
                            />
                        </View>
                    )}

                    {homeBasedBussinessVisible && (
                        <View
                            style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                                <TextComp
                                    textVal={homeBasedBussinessCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={homeBasedBussinessMan}
                                />
                            </View>

                            <PickerComp
                                textLabel={homeBasedBussinessLabel}
                                pickerStyle={Commonstyles.picker}
                                Disable={homeBasedBussinessDisable}
                                pickerdata={homeBasedBussinessData}
                                componentName="HomeBasedBusinessPicker"
                                handlePickerClick={handlePickerClick}
                            />
                        </View>
                    )}

                    {actmVisible && (
                        <View
                            style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                                <TextComp
                                    textVal={actmCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={actmMan}
                                />
                            </View>

                            <PickerComp
                                textLabel={actmLabel}
                                pickerStyle={Commonstyles.picker}
                                Disable={actmDisable}
                                pickerdata={actmData}
                                componentName="CustTranscMode"
                                handlePickerClick={handlePickerClick}
                            />
                        </View>
                    )}

                    {timeByPromoterVisible && (
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
                                    textVal={timeByPromoterCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={timeByPromoterMan}
                                />
                            </View>

                            <TextInputComp
                                textValue={timeByPromoter}
                                textStyle={Commonstyles.textinputtextStyle}
                                type="numeric"
                                Disable={timeByPromoterDisable}
                                ComponentName="TimeByPromoter"
                                reference={timeByPromoterRef}
                                returnKey="next"
                                handleClick={handleClick}
                                handleReference={handleReference}
                            />
                        </View>
                    )}

                    {npmRateVisible && (
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
                                    textVal={npmRateCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={npmRateMan}
                                />
                            </View>

                            <TextInputComp
                                textValue={npmRate}
                                textStyle={Commonstyles.textinputtextStyle}
                                type="numeric"
                                Disable={npmRateDisable}
                                ComponentName="NPMRate"
                                reference={npmRateRef}
                                returnKey="next"
                                handleClick={handleClick}
                                handleReference={handleReference}
                            />
                        </View>
                    )}

                    {purchaseFrequencyVisible && (
                        <View
                            style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                                <TextComp
                                    textVal={purchaseFrequencyCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={purchaseFrequencyMan}
                                />
                            </View>

                            <PickerComp
                                textLabel={purchaseFrequencyLabel}
                                pickerStyle={Commonstyles.picker}
                                Disable={purchaseFrequencyDisable}
                                pickerdata={purchaseFrequencyData}
                                componentName="PurchaseFrequencyPicker"
                                handlePickerClick={handlePickerClick}
                            />
                        </View>
                    )}

                    {typePurchaseVisible && (
                        <View
                            style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                                <TextComp
                                    textVal={typePurchaseCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={typePurchaseMan}
                                />
                            </View>

                            <PickerComp
                                textLabel={typePurchaseLabel}
                                pickerStyle={Commonstyles.picker}
                                Disable={typePurchaseDisable}
                                pickerdata={typePurchaseData}
                                componentName="TypePurchasePicker"
                                handlePickerClick={handlePickerClick}
                            />
                        </View>
                    )}

                    {salesFrequencyVisible && (
                        <View
                            style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                                <TextComp
                                    textVal={salesFrequencyCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={salesFrequencyMan}
                                />
                            </View>

                            <PickerComp
                                textLabel={salesFrequencyLabel}
                                pickerStyle={Commonstyles.picker}
                                Disable={salesFrequencyDisable}
                                pickerdata={salesFrequencyData}
                                componentName="SalesFrequencyPicker"
                                handlePickerClick={handlePickerClick}
                            />
                        </View>
                    )}


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
                                marginTop: 20,
                            }}>
                            <TouchableOpacity style={{ width: '30%' }} onPress={pickDocument} activeOpacity={0}>
                                <View style={{ width: 40, height: 40, backgroundColor: '#DBDBDB', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image
                                        source={require('../../../Images/cloudcomputing.png')}
                                        style={{ width: 28, height: 22 }}
                                    />
                                    {/* <FontAwesome6 name="cloud-arrow-up" size={25} color="#b5b6b6" /> */}
                                </View>
                            </TouchableOpacity>

                            <Text style={{ width: '50%', color: Colors.dimmText, textAlign: 'left', fontFamily: 'PoppinsRegular' }}>
                                {fileName}
                            </Text>

                            {docID &&
                                <TouchableOpacity style={{ width: '20%', alignItems: 'flex-end' }}
                                    onPress={() => {
                                        showImageBottomSheet();
                                    }}>
                                    <Entypo
                                        name="dots-three-vertical"
                                        size={25}
                                        color={Colors.darkblue}
                                    />
                                </TouchableOpacity>
                            }

                        </View>
                    </View>


                </View>

                <ButtonViewComp
                    textValue={language[0][props.language].str_next.toUpperCase()}
                    textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
                    viewStyle={Commonstyles.buttonView}
                    innerStyle={Commonstyles.buttonViewInnerStyle}
                    handleClick={callBusinessDetails}
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
    updateNestedClientDetails: (loanApplicationId, clientId, key, nestedKey, data) => dispatch(updateNestedClientDetails(loanApplicationId, clientId, key, nestedKey, data)),
    updateClientDetails: (loanApplicationId, clientId, key, data) => dispatch(updateClientDetails(loanApplicationId, clientId, key, data)),
    updateLoanInitiationDetails: (loanApplicationId, loanData, key, clientId, updatedDetails) => dispatch(updateLoanInitiationDetails(loanApplicationId, loanData, key, clientId, updatedDetails)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(LoanDemographicBusinessDetail);
