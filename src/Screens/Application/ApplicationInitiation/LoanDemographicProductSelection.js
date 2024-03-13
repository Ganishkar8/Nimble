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
    BackHandler,
    TextInput
} from 'react-native';
import apiInstance from '../../../Utils/apiInstance';
import Feather from 'react-native-vector-icons/Feather';
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
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import ChargeModal from '../../../Components/ChargeModal';
import { addLoanInitiationDetails, updateLoanInitiationDetails, deleteLoanInitiationDetails, updateClientDetails } from '../../../Utils/redux/actions/loanInitiationAction';


const LoanDemographicProductSelection = (props, { navigation }) => {
    var aadhar = "";
    const [loading, setLoading] = useState(false);

    const [loanSelectionID, setLoanSelectionID] = useState(0);

    const [custCatgLabel, setCustCatgLabel] = useState('');
    const [custCatgIndex, setCustCatgIndex] = useState('');
    const [custCatgCaption, setCustCatgCaption] = useState('CUSTOMER CATEGORY');

    const [mobileNumber, setMobileNumber] = useState('');
    const [isMobileVerified, setIsMobileVerified] = useState('0');
    const [mobileNumberCaption, setMobileNumberCaption] =
        useState('MOBILE NUMBER');
    const [mobileNumberMan, setMobileNumberMan] = useState(false);
    const [mobileNumberVisible, setMobileNumberVisible] = useState(true);
    const [mobileNumberDisable, setMobileNumberDisable] = useState(false);
    const [custCatgMan, setCustCatgMan] = useState(false);
    const [custCatgVisible, setCustCatgVisible] = useState(true);
    const [custCatgDisable, setCustCatgDisable] = useState(false);
    const [custCatData, setCustCatData] = useState([]);
    const [repayscheduleData, setRepayScheduleData] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
    const showBottomSheet = () => setBottomErrorSheetVisible(true);
    const hideBottomSheet = () => setBottomErrorSheetVisible(false);
    const mobileNumberRef = useRef(null);
    const isScreenVisible = useIsFocused();

    const [chargeModalVisible, setChargeModalVisible] = useState(false);
    const showChargeModal = () => setChargeModalVisible(true);
    const hideChargeModal = () => setChargeModalVisible(false);

    const [chargeData, setChargeData] = useState([]);
    const [loanProductLinkData, setLoanProductLinkData] = useState(global.LEADTRACKERDATA.applicantLoanProductLink);

    //loanType - dropdown
    const [relationTypeMan, setRelationTypeMan] = useState(false); //Manditory or not
    const [relationTypeVisible, setRelationTypeVisible] = useState(false); //Hide or not
    const [relationTypeDisable, setRelationTypeDisable] = useState(false); //Enable or Disable
    const [relationTypeData, setRelationTypeData] = useState([]); //DataPicking
    const [relationTypeCaption, setRelationTypeCaption] = useState('RELATION TYPE'); //FieldCaption
    const [relationTypeLabel, setRelationTypeLabel] = useState('');
    const [relationTypeIndex, setRelationTypeIndex] = useState('');

    //loanType - dropdown
    const [loanTypeMan, setLoanTypeMan] = useState(false); //Manditory or not
    const [loanTypeVisible, setLoanTypeVisible] = useState(true); //Hide or not
    const [loanTypeDisable, setLoanTypeDisable] = useState(false); //Enable or Disable
    const [loanTypeData, setLoanTypeData] = useState([]); //DataPicking
    const [loanTypeCaption, setLoanTypeCaption] = useState('LOAN TYPE'); //FieldCaption
    const [loanTypeLabel, setLoanTypeLabel] = useState('');
    const [loanTypeIndex, setLoanTypeIndex] = useState('');

    const [loanProductMan, setLoanProductMan] = useState(false); //Manditory or not
    const [loanProductVisible, setLoanProductVisible] = useState(true); //Hide or not
    const [loanProductDisable, setLoanProductDisable] = useState(false); //Enable or Disable
    const [loanProductData, setLoanProductData] = useState([]); //DataPicking
    const [loanProductCaption, setLoanProductCaption] = useState('LOAN PRODUCT'); //FieldCaption
    const [loanProductLabel, setLoanProductLabel] = useState('');
    const [loanProductIndex, setLoanProductIndex] = useState('');


    const [loanPurposeCatgMan, setLoanPurposeCatgMan] = useState(false); //Manditory or not
    const [loanPurposeCatgVisible, setLoanPurposeCatgVisible] = useState(true); //Hide or not
    const [loanPurposeCatgDisable, setLoanPurposeCatgDisable] = useState(false); //Enable or Disable
    const [loanPurposeCatgData, setLoanPurposeCatgData] = useState([]); //DataPicking
    const [loanPurposeCatgCaption, setLoanPurposeCatgCaption] = useState('LOAN PURPOSE CATEGORY'); //FieldCaption
    const [loanPurposeCatgLabel, setLoanPurposeCatgLabel] = useState('');
    const [loanPurposeCatgIndex, setLoanPurposeCatgIndex] = useState('');

    const [LoanAmount, setLoanAmount] = useState('');
    const [LoanAmountCaption, setLoanAmountCaption] = useState("LOAN AMOUNT(IN MULTIPLE OF 5000's)");
    const [LoanAmountMan, setLoanAmountMan] = useState(false);
    const [LoanAmountVisible, setLoanAmountVisible] = useState(true);
    const [LoanAmountDisable, setLoanAmountDisable] = useState(false);
    const LoanAmountRef = useRef(null);

    const [LoanPurposeMan, setLoanPurposeMan] = useState(false);
    const [LoanPurposeVisible, setLoanPurposeVisible] = useState(true);
    const [LoanPurposeDisable, setLoanPurposeDisable] = useState(false);
    const [LoanPurposeData, setLoanPurposeData] = useState([]);
    const [LoanPurposeCaption, setLoanPurposeCaption] = useState('LOAN PURPOSE');
    const [LoanPurposeLabel, setLoanPurposeLabel] = useState('');
    const [LoanPurposeIndex, setLoanPurposeIndex] = useState('');

    const [loanTenure, setLoanTenure] = useState('');
    const [loanTenureCaption, setLoanTenureCaption] = useState("LOAN TENURE");
    const [loanTenureMan, setLoanTenureMan] = useState(false);
    const [loanTenureVisible, setLoanTenureVisible] = useState(true);
    const [loanTenureDisable, setLoanTenureDisable] = useState(false);
    const loanTenureRef = useRef(null);


    const [repaymentModeMan, setRepaymentModeMan] = useState(false);
    const [repaymentModeVisible, setRepaymentModeVisible] = useState(true);
    const [repaymentModeDisable, setRepaymentModeDisable] = useState(false);
    const [repaymentModeData, setRepaymentModeData] = useState([]);
    const [repaymentModeCaption, setRepaymentModeCaption] = useState('REPAYMENT MODE');
    const [repaymentModeLabel, setRepaymentModeLabel] = useState('');
    const [repaymentModeIndex, setRepaymentModeIndex] = useState('');

    const [loanrepaymentFreqMan, setLoanRepaymentFreqMan] = useState(false);
    const [loanrepaymentFreqVisible, setLoanRepaymentFreqVisible] = useState(true);
    const [loanrepaymentFreqDisable, setLoanRepaymentFreqDisable] = useState(false);
    const [loanrepaymentFreqData, setLoanRepaymentFreqData] = useState([]);
    const [loanrepaymentFreqCaption, setLoanRepaymentFreqCaption] = useState('LOAN REPAYMENT FREQUENCY');
    const [loanrepaymentFreqLabel, setLoanRepaymentFreqLabel] = useState('');
    const [loanrepaymentFreqIndex, setLoanRepaymentFreqIndex] = useState('');

    const [insuranceCoverageMan, setInsuranceCoverageMan] = useState(false);
    const [insuranceCoverageVisible, setInsuranceCoverageVisible] = useState(true);
    const [insuranceCoverageDisable, setInsuranceCoverageDisable] = useState(false);
    const [insuranceCoverageData, setInsuranceCoverageData] = useState([]);
    const [insuranceCoverageCaption, setInsuranceCoverageCaption] = useState('INSURANCE COVERAGE');
    const [insuranceCoverageLabel, setInsuranceCoverageLabel] = useState('');
    const [insuranceCoverageIndex, setInsuranceCoverageIndex] = useState('');

    const [disbursementDate, setDisbursementDate] = useState('');
    const [disbursementDateCaption, setDisbursementDateCaption] = useState('DISBURSEMENT DATE');
    const [disbursementDateMan, setDisbursementDateMan] = useState(false);
    const [disbursementDateVisible, setDisbursementDateVisible] = useState(true);
    const [disbursementDateDisable, setDisbursementDateDisable] = useState(false);
    const disbursementDateRef = useRef(null);

    const [disbursementModeMan, setDisbursementModeMan] = useState(false);
    const [disbursementModeVisible, setDisbursementModeVisible] = useState(true);
    const [disbursementModeDisable, setDisbursementModeDisable] = useState(false);
    const [disbursementModeData, setDisbursementModeData] = useState([]);
    const [disbursementModeCaption, setDisbursementModeCaption] = useState('DISBURSEMENT MODE');
    const [disbursementModeLabel, setDisbursementModeLabel] = useState('');
    const [disbursementModeIndex, setDisbursementModeIndex] = useState('');

    const [interestRate, setInterestRate] = useState('');
    const [interestRateCaption, setInterestRateCaption] = useState("INTEREST RATE");
    const [interestRateMan, setInterestRateMan] = useState(false);
    const [interestRateVisible, setInterestRateVisible] = useState(true);
    const [interestRateDisable, setInterestRateDisable] = useState(false);
    const interestRateRef = useRef(null);

    const [emiAmount, setEmiAmount] = useState('');
    const [emiAmountCaption, setEmiAmountCaption] = useState("EMI AMOUNT");
    const [emiAmountMan, setEmiAmountMan] = useState(false);
    const [emiAmountVisible, setEmiAmountVisible] = useState(true);
    const [emiAmountDisable, setEmiAmountDisable] = useState(false);
    const emiAmountRef = useRef(null);

    const [monthlyEmiDate, setMonthlyEmiDate] = useState('');
    const [monthlyEmiDateCaption, setMonthlyEmiDateCaption] = useState("MONTHLY EMI DATE");
    const [monthlyEmiDateMan, setMonthlyEmiDateMan] = useState(false);
    const [monthlyEmiDateVisible, setMonthlyEmiDateVisible] = useState(true);
    const [monthlyEmiDateDisable, setMonthlyEmiDateDisable] = useState(false);
    const monthlyEmiDateRef = useRef(null);

    const [installmentStartDate, setInstallmentStartDateDate] = useState('');
    const [installmentStartDateCaption, setInstallmentStartDateDateCaption] = useState('INSTALMENT START DATE');
    const [installmentStartDateMan, setInstallmentStartDateDateMan] = useState(false);
    const [installmentStartDateVisible, setInstallmentStartDateDateVisible] = useState(true);
    const [installmentStartDateDisable, setInstallmentStartDateDateDisable] = useState(false);
    const installmentStartDateRef = useRef(null);


    const [totalCharges, setTotalCharges] = useState('');
    const [totalChargesCaption, setTotalChargesCaption] = useState("TOTAL CHARGES");
    const [totalChargesMan, setTotalChargesMan] = useState(false);
    const [totalChargesVisible, setTotalChargesVisible] = useState(true);
    const [totalChargesDisable, setTotalChargesDisable] = useState(false);
    const totalChargesRef = useRef(null);

    const [appInsuranceAmount, setAppInsuranceAmount] = useState('');
    const [appInsuranceAmountCaption, setAppInsuranceAmountCaption] = useState("APPLICANT INSURANCE AMOUNT");
    const [appInsuranceAmountMan, setAppInsuranceAmountMan] = useState(false);
    const [appInsuranceAmountVisible, setAppInsuranceAmountVisible] = useState(true);
    const [appInsuranceAmountDisable, setAppInsuranceAmountDisable] = useState(true);
    const appInsuranceAmountRef = useRef(null);

    const [coappInsuranceAmount, setCoAppInsuranceAmount] = useState('');
    const [coappInsuranceAmountCaption, setCoAppInsuranceAmountCaption] = useState("COAPPLICANT INSURANCE AMOUNT");
    const [coappInsuranceAmountMan, setCoAppInsuranceAmountMan] = useState(false);
    const [coappInsuranceAmountVisible, setCoAppInsuranceAmountVisible] = useState(true);
    const [coappInsuranceAmountDisable, setCoAppInsuranceAmountDisable] = useState(true);
    const coAppInsuranceAmountRef = useRef(null);

    const [apprxDisbAmount, setApprxDisbAmount] = useState('');
    const [apprxDisbAmountCaption, setApprxDisbAmountCaption] = useState("APPROXIMATE DISBURSEMENT AMOUNT");
    const [apprxDisbAmountMan, setApprxDisbAmountMan] = useState(false);
    const [apprxDisbAmountVisible, setApprxDisbAmountVisible] = useState(true);
    const [apprxDisbAmountDisable, setApprxDisbAmountDisable] = useState(true);
    const apprxDisbAmountRef = useRef(null);


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

    const [minLoanTenure, setMinLoanTenure] = useState(0);
    const [maxLoanTenure, setMaxLoanTenure] = useState(0);
    const [pageId, setPageId] = useState(global.CURRENTPAGEID);


    const [onlyView, setOnlyView] = useState(false);

    useEffect(() => {
        props.navigation
            .getParent()
            ?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);


        if (global.USERTYPEID == 1163 || global.ALLOWEDIT == "0") {
            fieldsDisable();
            setOnlyView(true);
        }


        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }

    }, [props.navigation, isScreenVisible]);


    useEffect(() => {

        getApplicantData();

    }, [props.navigation]);


    const handleBackButton = () => {
        onGoBack();
        return true; // Prevent default back button behavior
    };

    useFocusEffect(
        React.useCallback(() => {
            makeSystemMandatoryFields();
            getSystemCodeDetail();
            // getApplicantData();

            if (global.USERTYPEID == 1163) {
                setOnlyView(true);
                if (global.LOANSTATUS == 'MANUAL KYC PENDING' || global.LOANSTATUS == 'MANUAL KYC REJECTED') {

                }
            }


            return () => {
                console.log('Screen is blurred');
            };
        }, [])
    );

    const getApplicantData = () => {


        // else {

        const loanDetail = props.loanInitiationDetails.filter(item => item.id === parseInt(global.LOANAPPLICATIONID))[0];

        const filteredData = props.loanInitiationDetails.filter(item => item.id === parseInt(global.LOANAPPLICATIONID));

        if (filteredData) {
            const loanProductLinkData = filteredData[0].applicantLoanProductLink;

            if (loanProductLinkData) {
                if (loanProductLinkData.length > 0) {
                    setLoanTypeLabel(loanProductLinkData[0].loanType)
                    getProductID(loanProductLinkData[0].loanType)
                    setLoanProductLabel(loanProductLinkData[0].loanProduct)
                    setLoanPurposeCatgLabel(loanProductLinkData[0].loanPurposeCategory)
                    setLoanPurposeLabel(loanProductLinkData[0].loanPurpose)
                    setLoanAmount(loanProductLinkData[0].loanAmount.toString())
                    setLoanTenure(loanProductLinkData[0].loanTenure.toString())
                    setRepaymentModeLabel(loanProductLinkData[0].repaymentMode)
                    setLoanRepaymentFreqLabel(loanProductLinkData[0].loanRepaymentFrequency)
                    setInsuranceCoverageLabel(loanProductLinkData[0].insuranceCoverage)
                    setEmiAmount(loanProductLinkData[0].emiAmount.toString())
                    setMonthlyEmiDate(loanProductLinkData[0].monthlyEmiDate)
                    setDisbursementDate(Common.convertDateFormat(loanProductLinkData[0].disbursementDate))
                    setDisbursementModeLabel(loanProductLinkData[0].disbursementMode)
                    setTotalCharges(loanProductLinkData[0].totalCharges.toString())
                    setRepayScheduleData(loanProductLinkData[0].loanRepaymentSchedules);
                    setChargeData(loanProductLinkData[0].loanProductChargeDetails);
                    setInterestRate(loanProductLinkData[0].interestRate.toString())
                    setInstallmentStartDateDate(Common.convertDateFormat(loanProductLinkData[0].installmentStartDate))
                    callLoanTenure(loanProductLinkData[0].loanProduct, loanProductLinkData[0].loanAmount.toString(), loanProductLinkData[0].loanTenure.toString())
                    setAppInsuranceAmount(loanProductLinkData[0].applicantInsuranceAmount.toString())
                    setCoAppInsuranceAmount(loanProductLinkData[0].coApplicantInsuranceAmount.toString())
                    setApprxDisbAmount(loanProductLinkData[0].approximateDisbursementAmount.toString())
                    if (loanProductLinkData[0].insuranceCoverage == 'SNG') {
                        setCoAppInsuranceAmountVisible(false);
                    } else {
                        setCoAppInsuranceAmountVisible(true);
                    }
                } else {
                    setLoanTypeLabel(loanDetail.loanType)
                    setLoanProductLabel(loanDetail.product)
                    setLoanPurposeLabel(loanDetail.loanPurpose);
                    setLoanPurposeCatgLabel(loanDetail?.loanPurposeCategory)
                    callLoanTenure(loanDetail.product, loanDetail.loanAmount, loanTenure)
                    setLoanAmount(loanDetail.loanAmount.toString())
                    setLoanPurposeLabel(loanDetail.loanPurpose);
                    getProductID(loanDetail.loanType, parseInt(loanDetail.workflowId))
                }
            } else {
                setLoanTypeLabel(loanDetail.loanType)
                setLoanProductLabel(loanDetail.product)
                setLoanPurposeLabel(loanDetail.loanPurpose);
                setLoanPurposeCatgLabel(loanDetail?.loanPurposeCategory)
                callLoanTenure(loanDetail.product, loanDetail.loanAmount, loanTenure)
                setLoanAmount(loanDetail.loanAmount.toString())
                setLoanPurposeLabel(loanDetail.loanPurpose);
                getProductID(loanDetail.loanType, parseInt(loanDetail.workflowId))
            }

        }


        callLoanAmount(parseInt(loanDetail.workflowId));


    }

    const fieldsDisable = () => {
        setLoanTypeDisable(true);
        setLoanProductDisable(true);
        setLoanPurposeCatgDisable(true);
        setLoanPurposeDisable(true);
        setLoanAmountDisable(true);
        setLoanTenureDisable(true);
        setRepaymentModeDisable(true);
        setLoanRepaymentFreqDisable(true);
        setInsuranceCoverageDisable(true);
        setDisbursementDateDisable(true);
        setDisbursementModeDisable(true);
        setInterestRateDisable(true);
        setEmiAmountDisable(true);
        setMonthlyEmiDateDisable(true);
        setInstallmentStartDateDateDisable(true);
        setTotalChargesDisable(true);
    }

    const getSystemCodeDetail = async () => {

        const filteredLoanTypeData = leadsystemCodeDetail.filter((data) => data.masterId === 'LNTP').sort((a, b) => a.Description.localeCompare(b.Description));;
        setLoanTypeData(filteredLoanTypeData);

        const filteredLoanPurposeData = leaduserCodeDetail.filter((data) => data.masterId === 'LNPS').sort((a, b) => a.Description.localeCompare(b.Description));;
        setLoanPurposeData(filteredLoanPurposeData);

        const filteredLoanPurposeCatgData = leaduserCodeDetail.filter((data) => data.masterId === 'LPC').sort((a, b) => a.Description.localeCompare(b.Description));;
        setLoanPurposeCatgData(filteredLoanPurposeCatgData);

        const filteredRepaymentModeData = leaduserCodeDetail.filter((data) => data.masterId === 'REPAYMENT_MODE').sort((a, b) => a.Description.localeCompare(b.Description));;
        setRepaymentModeData(filteredRepaymentModeData);

        const filteredLoanRepaymentFreqData = leaduserCodeDetail.filter((data) => data.masterId === 'LOAN_REPAYMENT_FREQUENCY').sort((a, b) => a.Description.localeCompare(b.Description));;
        setLoanRepaymentFreqData(filteredLoanRepaymentFreqData);

        const filteredInsuranceCoverageData = leadsystemCodeDetail.filter((data) => data.masterId === 'INSURANCE_COVERAGE').sort((a, b) => a.Description.localeCompare(b.Description));;
        setInsuranceCoverageData(filteredInsuranceCoverageData);

        const filteredDisbursementModeData = leaduserCodeDetail.filter((data) => data.masterId === 'DISBURSEMENT_MODE').sort((a, b) => a.Description.localeCompare(b.Description));;
        setDisbursementModeData(filteredDisbursementModeData);

    };

    const getProductID = (loanType) => {
        let dataArray = [];
        if (props.mobilecodedetail && props.mobilecodedetail.t_ProductLoan) {
            props.mobilecodedetail.t_ProductLoan.forEach((data) => {

                if (data.NatureOfProductId === loanType) {

                    if (props.mobilecodedetail.t_product) {
                        props.mobilecodedetail.t_product.forEach((data1) => {
                            if (data1.ProductID === data.ProductID) {
                                dataArray.push({ 'subCodeId': data.ProductID, Description: data1.Description });
                            }
                        });
                    }
                }
            });
        }
        setLoanProductData(dataArray)
    }

    const callLoanAmount = (workflowID) => {

        const filteredProductIDData = props.mobilecodedetail.laProductLoan.filter((data) => data.wfId === workflowID);

        if (filteredProductIDData.length > 0) {
            setMinLoanAmount(filteredProductIDData[0].loanAmountFrom);
            setMaxLoanAmount(filteredProductIDData[0].loanAmountTo);
        } else {
            setMinLoanAmount(0)
            setMaxLoanAmount(0)
        }
    }

    const callLoanTenure = (productID, loanAmount, loanTenure) => {

        const filteredProductIDData = props.mobilecodedetail.t_product.filter((data) => data.ProductID === productID);

        const IntRateMenuID = filteredProductIDData[0].IntRateMenuID;
        // const filteredIntRateMenuData = props.mobilecodedetail.t_InterestRateMenuDetail.filter((data) => data.RateMenuID === IntRateMenuID);
        //alert(JSON.stringify(IntRateMenuID + '' + loanAmount + '' + loanTenure))
        const filteredIntRateMenuData = props.mobilecodedetail.t_InterestRateMenuDetail.filter(item =>
            item.RateMenuID === IntRateMenuID &&
            loanAmount >= item.AmountSlabFrom &&
            loanAmount <= item.AmountSlabTo &&
            loanTenure >= item.TermFrom &&
            loanTenure <= item.TermTo
        );

        if (filteredIntRateMenuData) {
            if (filteredIntRateMenuData.length > 0) {
                setInterestRate(filteredIntRateMenuData[0].EffectiveRate.toString())
            } else {
                setInterestRate('')
            }
        } else {
            setInterestRate('')
        }
        if (global.DEBUG_MODE) console.log("Filtered Data::", JSON.stringify(filteredIntRateMenuData));
        // alert(JSON.stringify(filteredIntRateMenuData[0].EffectiveRate))

        if (props.mobilecodedetail && props.mobilecodedetail.t_ProductLoan) {
            props.mobilecodedetail.t_ProductLoan.forEach((data) => {

                if (data.ProductID === productID) {

                    setLoanRepaymentFreqLabel(data.InstallmentFrequencyID)
                    setMinLoanTenure(data.MinLoanTerm);
                    setMaxLoanTenure(data.MaxLoanTerm);

                }
            });
        }

    }


    const makeSystemMandatoryFields = async () => {

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_ln_type' && data.pageId === pageId).map((value, index) => {
            setLoanTypeCaption(value.fieldName)

            if (value.isMandatory) {
                setLoanTypeMan(true);
            }
            if (value.isHide) {
                setLoanTypeVisible(false);
            }
            if (value.isDisable) {
                setLoanTypeDisable(true);
            }
            if (value.isCaptionChange) {
                setLoanTypeCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_pd_id' && data.pageId === pageId).map((value, index) => {
            setLoanProductCaption(value.fieldName)

            if (value.isMandatory) {
                setLoanProductMan(true);
            }
            if (value.isHide) {
                setLoanProductVisible(false);
            }
            if (value.isDisable) {
                setLoanProductDisable(true);
            }
            if (value.isCaptionChange) {
                setLoanProductCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_ln_prps_cat' && data.pageId === pageId).map((value, index) => {
            setLoanPurposeCatgCaption(value.fieldName)

            if (value.isMandatory) {
                setLoanPurposeCatgMan(true);
            }
            if (value.isHide) {
                setLoanPurposeCatgVisible(false);
            }
            if (value.isDisable) {
                setLoanPurposeCatgDisable(true);
            }
            if (value.isCaptionChange) {
                setLoanPurposeCatgCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_ln_prps' && data.pageId === pageId).map((value, index) => {
            setLoanPurposeCaption(value.fieldName)

            if (value.isMandatory) {
                setLoanPurposeMan(true);
            }
            if (value.isHide) {
                setLoanPurposeVisible(false);
            }
            if (value.isDisable) {
                setLoanPurposeDisable(true);
            }
            if (value.isCaptionChange) {
                setLoanPurposeCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_ln_amt' && data.pageId === pageId).map((value, index) => {
            setLoanAmountCaption(value.fieldName)

            if (value.isMandatory) {
                setLoanAmountMan(true);
            }
            if (value.isHide) {
                setLoanAmountVisible(false);
            }
            if (value.isDisable) {
                setLoanAmountDisable(true);
            }
            if (value.isCaptionChange) {
                setLoanAmountCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_ln_tnr' && data.pageId === pageId).map((value, index) => {
            setLoanTenureCaption(value.fieldName)

            if (value.isMandatory) {
                setLoanTenureMan(true);
            }
            if (value.isHide) {
                setLoanTenureVisible(false);
            }
            if (value.isDisable) {
                setLoanAmountDisable(true);
            }
            if (value.isCaptionChange) {
                setLoanTenureCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_rpy_md' && data.pageId === pageId).map((value, index) => {
            setRepaymentModeCaption(value.fieldName)

            if (value.isMandatory) {
                setRepaymentModeMan(true);
            }
            if (value.isHide) {
                setRepaymentModeVisible(false);
            }
            if (value.isDisable) {
                setRepaymentModeDisable(true);
            }
            if (value.isCaptionChange) {
                setRepaymentModeCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_ln_rpy_frq' && data.pageId === pageId).map((value, index) => {
            setLoanRepaymentFreqCaption(value.fieldName)

            if (value.isMandatory) {
                setLoanRepaymentFreqMan(true);
            }
            if (value.isHide) {
                setLoanRepaymentFreqVisible(false);
            }
            if (value.isDisable) {
                setLoanRepaymentFreqDisable(true);
            }
            if (value.isCaptionChange) {
                setLoanRepaymentFreqCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_ins_crg' && data.pageId === pageId).map((value, index) => {
            setInsuranceCoverageCaption(value.fieldName)

            if (value.isMandatory) {
                setInsuranceCoverageMan(true);
            }
            if (value.isHide) {
                setInsuranceCoverageVisible(false);
            }
            if (value.isDisable) {
                setInsuranceCoverageDisable(true);
            }
            if (value.isCaptionChange) {
                setInsuranceCoverageCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_disb_dt' && data.pageId === pageId).map((value, index) => {
            setDisbursementDateCaption(value.fieldName)

            if (value.isMandatory) {
                setDisbursementDateMan(true);
            }
            if (value.isHide) {
                setDisbursementDateVisible(false);
            }
            if (value.isDisable) {
                setDisbursementDateDisable(true);
            }
            if (value.isCaptionChange) {
                setDisbursementDateCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_disb_md' && data.pageId === pageId).map((value, index) => {
            setDisbursementModeCaption(value.fieldName)

            if (value.isMandatory) {
                setDisbursementModeMan(true);
            }
            if (value.isHide) {
                setDisbursementModeVisible(false);
            }
            if (value.isDisable) {
                setDisbursementModeDisable(true);
            }
            if (value.isCaptionChange) {
                setDisbursementModeCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_int_rt' && data.pageId === pageId).map((value, index) => {
            setInterestRateCaption(value.fieldName)

            if (value.isMandatory) {
                setInterestRateMan(true);
            }
            if (value.isHide) {
                setInterestRateVisible(false);
            }
            if (value.isDisable) {
                setInterestRateDisable(true);
            }
            if (value.isCaptionChange) {
                setInterestRateCaption(value[0].fieldCaptionChange)
            }
        });


        systemMandatoryField.filter((data) => data.fieldUiid === 'et_emi_amt' && data.pageId === pageId).map((value, index) => {
            setEmiAmountCaption(value.fieldName)

            if (value.isMandatory) {
                setEmiAmountMan(true);
            }
            if (value.isHide) {
                setEmiAmountVisible(false);
            }
            if (value.isDisable) {
                setEmiAmountDisable(true);
            }
            if (value.isCaptionChange) {
                setEmiAmountCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_mtl_emi_dt' && data.pageId === pageId).map((value, index) => {
            setMonthlyEmiDateCaption(value.fieldName)

            if (value.isMandatory) {
                setMonthlyEmiDateMan(true);
            }
            if (value.isHide) {
                setMonthlyEmiDateVisible(false);
            }
            if (value.isDisable) {
                setMonthlyEmiDateDisable(true);
            }
            if (value.isCaptionChange) {
                setMonthlyEmiDateCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_inst_strt_dt' && data.pageId === pageId).map((value, index) => {
            setInstallmentStartDateDateCaption(value.fieldName)

            if (value.isMandatory) {
                setInstallmentStartDateDateMan(true);
            }
            if (value.isHide) {
                setInstallmentStartDateDateVisible(false);
            }
            if (value.isDisable) {
                setInstallmentStartDateDateDisable(true);
            }
            if (value.isCaptionChange) {
                setInstallmentStartDateDateCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_ttl_crgs' && data.pageId === pageId).map((value, index) => {
            setTotalChargesCaption(value.fieldName)

            if (value.isMandatory) {
                setTotalChargesMan(true);
            }
            if (value.isHide) {
                setTotalChargesVisible(false);
            }
            if (value.isDisable) {
                setTotalChargesDisable(true);
            }
            if (value.isCaptionChange) {
                setTotalChargesCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_appl_ins_amt' && data.pageId === pageId).map((value, index) => {
            setAppInsuranceAmountCaption(value.fieldName)

            if (value.isMandatory) {
                setAppInsuranceAmountMan(true);
            }
            if (value.isHide) {
                setAppInsuranceAmountVisible(false);
            }
            if (value.isDisable) {
                setAppInsuranceAmountDisable(true);
            }
            if (value.isCaptionChange) {
                setAppInsuranceAmountCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_coappl_ins_amt' && data.pageId === pageId).map((value, index) => {
            setCoAppInsuranceAmountCaption(value.fieldName)

            if (value.isMandatory) {
                setCoAppInsuranceAmountMan(true);
            }
            if (value.isHide) {
                setCoAppInsuranceAmountVisible(false);
            }
            if (value.isDisable) {
                setCoAppInsuranceAmountDisable(true);
            }
            if (value.isCaptionChange) {
                setCoAppInsuranceAmountCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_aprx_disb_amt' && data.pageId === pageId).map((value, index) => {
            setApprxDisbAmountCaption(value.fieldName)

            if (value.isMandatory) {
                setApprxDisbAmountMan(true);
            }
            if (value.isHide) {
                setApprxDisbAmountVisible(false);
            }
            if (value.isDisable) {
                setApprxDisbAmountDisable(true);
            }
            if (value.isCaptionChange) {
                setApprxDisbAmountCaption(value[0].fieldCaptionChange)
            }
        });

    };


    const callRepaySchedule = (disbursementDate, type) => {

        var appDetails = {
            "id": loanSelectionID,
            "loanType": loanTypeLabel,
            "loanProduct": loanProductLabel,
            "loanPurposeCategory": loanPurposeCatgLabel,
            "loanPurpose": LoanPurposeLabel,
            "loanAmount": LoanAmount,
            "loanTenure": loanTenure,
            "interestRate": interestRate,
            "disbursementMode": disbursementModeLabel,
            "repaymentMode": repaymentModeLabel,
            "loanRepaymentFrequency": loanrepaymentFreqLabel,
            "disbursementDate": Common.convertYearDateFormat(disbursementDate),
            "insuranceCoverage": insuranceCoverageLabel,
            "userId": global.USERID,
            "branchID": props.profiledetail.userPersonalDetailsDto.branchId,
            "term": loanTenure,
            "noOfInstallment": loanTenure,
            "gracePeriod": 0,
            "loanApplicationId": global.LOANAPPLICATIONID,
            "createdBy": global.USERID
        }

        const baseURL = '8901';
        setLoading(true);
        apiInstancelocal(baseURL)
            .post(`/api/v2/loan-application/applicant-loan-product-link`, appDetails)
            .then(async response => {
                // Handle the response data

                if (global.DEBUG_MODE) console.log('RepaymentScheduleApiResponse::' + JSON.stringify(response.data),);

                setLoading(false);
                //await insertData();
                if (response.status === 200) {
                    setLoanSelectionID(response.data.id)
                    setRepayScheduleData(response.data.loanRepaymentSchedules);
                    setChargeData(response.data.loanProductChargeDetails);
                    setEmiAmount(response.data.emiAmount.toString())
                    setMonthlyEmiDate(response.data.monthlyEmiDate)
                    setTotalCharges(response.data.totalCharges.toString())
                    setInstallmentStartDateDate(response.data.installmentStartDate)
                    setAppInsuranceAmount(response.data.applicantInsuranceAmount.toString())
                    setCoAppInsuranceAmount(response.data.coApplicantInsuranceAmount.toString())
                    setApprxDisbAmount(response.data.approximateDisbursementAmount.toString())
                    props.updateClientDetails(global.LOANAPPLICATIONID, global.CLIENTID, 'applicantLoanProductLink', response.data);
                    if (type == 'Submit') {
                        updateLoanStatus();
                    }
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

                if (global.DEBUG_MODE) console.log('Error' + JSON.stringify(error));
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


    const onSubmit = async () => {

        if (onlyView) {

            page = 'NMN_DTLS';

            await Common.getPageStatus(global.FILTEREDPROCESSMODULE, page)

            props.navigation.replace('LoanNomineeList');
            return;
        }
        if (validate('submit')) {
            showBottomSheet();
        } else {
            callRepaySchedule(disbursementDate, 'Submit')
        }
    }


    const updateLoanStatus = () => {

        var module = ''; var page = '';

        module = 'LN_PRDT';
        page = 'LN_PRDT_SLCTN';


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
                global.COMPLETEDMODULE = 'LN_PRDT';
                global.COMPLETEDPAGE = 'LN_PRDT_SLCTN';

                await Common.getPageID(global.FILTEREDPROCESSMODULE, 'NMN_DTLS')
                props.navigation.replace('LoanNomineeList');
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


    const insertData = async () => {

        await tbl_client.insertClient(global.CLIENTID, global.LOANAPPLICATIONID, global.CLIENTTYPE, "", titleLabel, Name, "", "", "", "", "", "", "", "", "", "", genderLabel, MaritalStatusLabel, mobileNumber, Email, "",
            KycType1Label, kycID1, expiryDate1, KycType2Label, kycID2, expiryDate2, KycType3Label, kycID3, expiryDate3, KycType4Label, kycID4, expiryDate4, chkMsme, "", "", URNumber, "", isMobileVerified, isEmailVerified, isDedupeDone, "", "", "", "", "1", "", "", "", "", "", "", "", "", "");

        await tbl_loanApplication.insertLoanApplication(global.LOANAPPLICATIONID, global.CLIENTTYPE, global.TEMPAPPID, global.TEMPAPPID, '1180', global.leadID, custCatgLabel, CustomerSubCategoryLabel, clientTypeLabel, loanTypeLabel, LoanPurposeLabel, ProductTypeLabel, LoanAmount, workflowIDLabel, '', 'true', 'true', '', '', '', '', '', '', '', '', '', '', '', '', '', '', '');

    }

    const validate = (type) => {
        var flag = false;
        var i = 1;
        var errorMessage = '';

        // alert(JSON.stringify(type))

        if (loanTypeMan && loanTypeVisible) {
            if (loanTypeLabel.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsselect +
                    loanTypeCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (loanProductMan && loanProductVisible) {
            if (loanProductLabel.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsselect +
                    loanProductCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (loanPurposeCatgMan && loanPurposeCatgVisible) {
            if (loanPurposeCatgLabel.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsselect +
                    loanPurposeCatgCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (LoanPurposeMan && LoanPurposeVisible) {
            if (LoanPurposeLabel.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsselect +
                    LoanPurposeCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (LoanAmountMan && LoanAmountVisible) {
            if (LoanAmount.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + LoanAmountCaption + '\n';
                i++;
                flag = true;
            } else if (!isMultipleOf5000(LoanAmount)) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + LoanAmountCaption + ' ' + language[0][props.language].str_mulfive + '\n';
                i++;
                flag = true;
            } else if (loanProductLabel != '') {
                if (LoanAmount < minLoanAmount) {
                    errorMessage = errorMessage + i + ')' + ' ' + LoanAmountCaption + ' ' + language[0][props.language].str_cannotlessthan + ' ' + minLoanAmount + '\n';
                    i++;
                    flag = true;
                } else if (LoanAmount > maxLoanAmount) {
                    errorMessage = errorMessage + i + ')' + ' ' + LoanAmountCaption + ' ' + language[0][props.language].str_cannotgreaterthan + ' ' + maxLoanAmount + '\n';
                    i++;
                    flag = true;
                }
            }
        }

        if (loanTenureMan && loanTenureVisible) {
            if (loanTenure.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + loanTenureCaption + '\n';
                i++;
                flag = true;
            } else if (loanTenure < minLoanTenure) {
                errorMessage = errorMessage + i + ')' + ' ' + loanTenureCaption + ' ' + language[0][props.language].str_cannotlessthan + ' ' + minLoanTenure + '\n';
                i++;
                flag = true;
            } else if (loanTenure > maxLoanTenure) {
                errorMessage = errorMessage + i + ')' + ' ' + loanTenureCaption + ' ' + language[0][props.language].str_cannotgreaterthan + ' ' + maxLoanTenure + '\n';
                i++;
                flag = true;
            }
        }

        if (repaymentModeMan && repaymentModeVisible) {
            if (repaymentModeLabel.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsselect +
                    repaymentModeCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (loanrepaymentFreqMan && loanrepaymentFreqVisible) {
            if (loanrepaymentFreqLabel.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsselect +
                    loanrepaymentFreqCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (insuranceCoverageMan && insuranceCoverageVisible) {
            if (insuranceCoverageLabel.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsselect +
                    insuranceCoverageCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (type === 'submit') {
            if (disbursementDateMan && disbursementDateVisible) {

                if (disbursementDate.length <= 0) {
                    errorMessage =
                        errorMessage +
                        i +
                        ')' +
                        ' ' +
                        language[0][props.language].str_plsselect +
                        disbursementDateCaption +
                        '\n';
                    i++;
                    flag = true;
                }
            }
        }

        if (disbursementModeMan && disbursementModeVisible) {
            if (disbursementModeLabel.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsselect +
                    disbursementModeCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (interestRateMan && interestRateVisible) {
            if (interestRate.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsenter +
                    interestRateCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        setErrMsg(errorMessage);
        return flag;
    };

    const handleClick = (componentName, textValue) => {
        if (componentName === 'LoanAmount') {
            setLoanAmount(textValue);
            callLoanTenure(loanProductLabel, textValue, loanTenure)
            setDisbursementDate('');
        } else if (componentName === 'LoanTenure') {
            setLoanTenure(textValue);
            callLoanTenure(loanProductLabel, LoanAmount, textValue)
            setDisbursementDate('');

        } else if (componentName === 'DisbursementDate') {
            if (validate('date')) {
                showBottomSheet();
            } else {
                setDisbursementDate(textValue);
                callRepaySchedule(textValue, 'Date');
            }

        } else if (componentName === 'InterestRate') {
            setInterestRate(textValue);
        }
    };


    const handleReference = componentName => {

    };

    const handlePickerClick = (componentName, label, index) => {

        if (componentName === 'LoanTypePicker') {
            setLoanTypeLabel(label);
            setLoanTypeIndex(index);
        } else if (componentName === 'LoanProductPicker') {
            setLoanProductLabel(label);
            setLoanProductIndex(index);
        } else if (componentName === 'RepaymentModePicker') {
            setRepaymentModeLabel(label);
            setRepaymentModeIndex(index);
        } else if (componentName === 'LoanRepaymentFreqPicker') {
            setLoanRepaymentFreqLabel(label);
            setLoanRepaymentFreqIndex(index);
        } else if (componentName === 'InsuranceCoveragePicker') {
            if (label == 'SNG') {
                setCoAppInsuranceAmountVisible(false)
            } else {
                setCoAppInsuranceAmountVisible(true)
            }
            setInsuranceCoverageLabel(label);
            setInsuranceCoverageIndex(index);
        } else if (componentName === 'DisbursementModePicker') {
            setDisbursementModeLabel(label);
            setDisbursementModeIndex(index);
        } else if (componentName === 'LoanPurposePicker') {
            setLoanPurposeLabel(label);
            setLoanPurposeIndex(index);
        } else if (componentName === 'LoanPurposeCatgPicker') {
            setLoanPurposeCatgLabel(label);
            setLoanPurposeCatgIndex(index);
        }


    };
    function isMultipleOf5000(number) {
        return number % 5000 === 0;
    }


    const closeErrorModal = () => {
        setErrorModalVisible(false);
    };

    const onGoBack = () => {
        props.navigation.replace('LoanApplicationMain', { fromScreen: 'BasicDetail' })
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
                    textval={language[0][props.language].str_lnproductselection}
                    props={props}
                    onGoBack={onGoBack}
                />
            </View>
            <ChildHeadComp
                textval={language[0][props.language].str_lnproductselectioncharges}
            />



            <View style={{ width: '100%', alignItems: 'center', marginTop: '3%' }}>
                <View style={{ width: '90%', marginTop: 3 }}>
                    {/* <TextComp
                                textStyle={{
                                    color: Colors.mediumgrey,
                                    fontSize: 15,
                                    fontFamily: 'Poppins-Medium'
                                }}
                                textVal={
                                    language[0][props.language].str_basicdetails
                                }></TextComp> */}

                    <ProgressComp progressvalue={0.5} textvalue="1 of 2" />
                </View>
            </View>


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

                    {loanTypeVisible && (
                        <View
                            style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                                <TextComp
                                    textVal={loanTypeCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={loanTypeMan}
                                />
                            </View>

                            <PickerComp
                                textLabel={loanTypeLabel}
                                pickerStyle={Commonstyles.picker}
                                Disable={loanTypeDisable}
                                pickerdata={loanTypeData}
                                componentName="LoanTypePicker"
                                handlePickerClick={handlePickerClick}
                            />
                        </View>
                    )}

                    {loanProductVisible && (
                        <View
                            style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                                <TextComp
                                    textVal={loanProductCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={loanProductMan}
                                />
                            </View>

                            <PickerComp
                                textLabel={loanProductLabel}
                                pickerStyle={Commonstyles.picker}
                                Disable={loanProductDisable}
                                pickerdata={loanProductData}
                                componentName="LoanProductPicker"
                                handlePickerClick={handlePickerClick}
                            />
                        </View>
                    )}

                    {LoanPurposeVisible && (
                        <View
                            style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                                <TextComp
                                    textVal={LoanPurposeCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={LoanPurposeMan}
                                />
                            </View>

                            <PickerComp
                                textLabel={LoanPurposeLabel}
                                pickerStyle={Commonstyles.picker}
                                Disable={LoanPurposeDisable}
                                pickerdata={LoanPurposeData}
                                componentName="LoanPurposePicker"
                                handlePickerClick={handlePickerClick}
                            />
                        </View>
                    )}

                    {loanPurposeCatgVisible && (
                        <View
                            style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                                <TextComp
                                    textVal={loanPurposeCatgCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={loanPurposeCatgMan}
                                />
                            </View>

                            <PickerComp
                                textLabel={loanPurposeCatgLabel}
                                pickerStyle={Commonstyles.picker}
                                Disable={loanPurposeCatgDisable}
                                pickerdata={loanPurposeCatgData}
                                componentName="LoanPurposeCatgPicker"
                                handlePickerClick={handlePickerClick}
                            />
                        </View>
                    )}




                    {LoanAmountVisible && (
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
                                    textVal={LoanAmountCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={LoanAmountMan}
                                />
                            </View>

                            <TextInputComp
                                textValue={LoanAmount}
                                textStyle={Commonstyles.textinputtextStyle}
                                type="numeric"
                                Disable={LoanAmountDisable}
                                ComponentName="LoanAmount"
                                reference={LoanAmountRef}
                                returnKey="next"
                                handleClick={handleClick}
                                handleReference={handleReference}
                            />
                        </View>
                    )}

                    {loanTenureVisible && (
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
                                    textVal={loanTenureCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={loanTenureMan}
                                />
                            </View>

                            <TextInputComp
                                textValue={loanTenure}
                                textStyle={Commonstyles.textinputtextStyle}
                                type="numeric"
                                Disable={loanTenureDisable}
                                ComponentName="LoanTenure"
                                reference={loanTenureRef}
                                returnKey="next"
                                handleClick={handleClick}
                                length={3}
                                handleReference={handleReference}
                            />
                        </View>
                    )}

                    {repaymentModeVisible && (
                        <View
                            style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                                <TextComp
                                    textVal={repaymentModeCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={repaymentModeMan}
                                />
                            </View>

                            <PickerComp
                                textLabel={repaymentModeLabel}
                                pickerStyle={Commonstyles.picker}
                                Disable={repaymentModeDisable}
                                pickerdata={repaymentModeData}
                                componentName="RepaymentModePicker"
                                handlePickerClick={handlePickerClick}
                            />
                        </View>
                    )}

                    {loanrepaymentFreqVisible && (
                        <View
                            style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                                <TextComp
                                    textVal={loanrepaymentFreqCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={loanrepaymentFreqMan}
                                />
                            </View>

                            <PickerComp
                                textLabel={loanrepaymentFreqLabel}
                                pickerStyle={Commonstyles.picker}
                                Disable={loanrepaymentFreqDisable}
                                pickerdata={loanrepaymentFreqData}
                                componentName="LoanRepaymentFreqPicker"
                                handlePickerClick={handlePickerClick}
                            />
                        </View>
                    )}

                    {insuranceCoverageVisible && (
                        <View
                            style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                                <TextComp
                                    textVal={insuranceCoverageCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={insuranceCoverageMan}
                                />
                            </View>

                            <PickerComp
                                textLabel={insuranceCoverageLabel}
                                pickerStyle={Commonstyles.picker}
                                Disable={insuranceCoverageDisable}
                                pickerdata={insuranceCoverageData}
                                componentName="InsuranceCoveragePicker"
                                handlePickerClick={handlePickerClick}
                            />
                        </View>
                    )}

                    {disbursementModeVisible && (
                        <View
                            style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                            <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                                <TextComp
                                    textVal={disbursementModeCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={disbursementModeMan}
                                />
                            </View>

                            <PickerComp
                                textLabel={disbursementModeLabel}
                                pickerStyle={Commonstyles.picker}
                                Disable={disbursementModeDisable}
                                pickerdata={disbursementModeData}
                                componentName="DisbursementModePicker"
                                handlePickerClick={handlePickerClick}
                            />
                        </View>
                    )}

                    {interestRateVisible && (
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
                                    textVal={interestRateCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={interestRateMan}
                                />
                            </View>

                            <TextInputComp
                                textValue={interestRate}
                                textStyle={Commonstyles.textinputtextStyle}
                                type="numeric"
                                Disable={interestRateDisable}
                                ComponentName="InterestRate"
                                reference={interestRateRef}
                                returnKey="next"
                                handleClick={handleClick}
                                length={2}
                                handleReference={handleReference}
                            />
                        </View>
                    )}

                    {disbursementDateVisible && (
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
                                    textVal={disbursementDateCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={disbursementDateMan}
                                />
                            </View>

                            <View style={{ width: '100%', alignItems: 'center' }}>
                                <DateInputComp textStyle={[Commonstyles.inputtextStyle, { width: '90%' }]} ComponentName="DisbursementDate"
                                    textValue={disbursementDate}
                                    type="numeric"
                                    handleClick={handleClick}
                                    Disable={disbursementDateDisable}
                                    reference={disbursementDateRef}
                                    minDate={new Date()}
                                    handleReference={handleReference} />
                            </View>

                        </View>
                    )}

                    {emiAmountVisible && (
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
                                    textVal={emiAmountCaption}
                                    textStyle={Commonstyles.inputtextStyle}
                                    Visible={emiAmountMan}
                                />
                            </View>

                            <TextInputComp
                                textValue={emiAmount}
                                textStyle={Commonstyles.textinputtextStyle}
                                type="numeric"
                                Disable={emiAmountDisable}
                                ComponentName="emiAmount"
                                reference={emiAmountRef}
                                returnKey="next"
                                handleClick={handleClick}
                                handleReference={handleReference}
                            />
                        </View>
                    )}

                </View>

                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 16
                    }}>

                    <TouchableOpacity onPress={() => { props.navigation.navigate('RepaymentSchedule', { scheduledata: repayscheduleData }) }} activeOpacity={0.8} style={{
                        width: '90%',
                        height: 40,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                    }}>
                        <View>
                            <TextComp textVal={language[0][props.language].str_repayschedule} textStyle={{ color: Colors.darkblue, fontSize: 14, fontFamily: 'Poppins-Medium', }} />
                        </View>
                    </TouchableOpacity>


                </View>


                {monthlyEmiDateVisible && (
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
                                textVal={monthlyEmiDateCaption}
                                textStyle={Commonstyles.inputtextStyle}
                                Visible={monthlyEmiDateMan}
                            />
                        </View>

                        <TextInputComp
                            textValue={monthlyEmiDate}
                            textStyle={Commonstyles.textinputtextStyle}
                            type="numeric"
                            Disable={monthlyEmiDateDisable}
                            ComponentName="MonthlyEmiDate"
                            reference={monthlyEmiDateRef}
                            returnKey="next"
                            handleClick={handleClick}
                            handleReference={handleReference}
                        />
                    </View>
                )}

                {installmentStartDateVisible && (
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
                                textVal={installmentStartDateCaption}
                                textStyle={Commonstyles.inputtextStyle}
                                Visible={installmentStartDateMan}
                            />
                        </View>

                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <DateInputComp textStyle={[Commonstyles.inputtextStyle, { width: '90%' }]} ComponentName="DisbursementDate"
                                textValue={installmentStartDate}
                                type="numeric"
                                handleClick={handleClick}
                                Disable={installmentStartDateDisable}
                                reference={installmentStartDateRef}
                                minDate={new Date()}
                                handleReference={handleReference} />
                        </View>

                    </View>
                )}


                <View style={{
                    width: '100%', marginTop: 16, paddingHorizontal: 0,
                    alignItems: 'center', justifyContent: 'center',
                }}>

                    <View style={{ width: '90%', marginTop: 0, }}>
                        <TextComp textVal={totalChargesCaption} textStyle={Commonstyles.inputtextStyle} />
                    </View>

                    <View style={{
                        width: '92%', marginTop: 6, flexDirection: 'row',
                    }}>

                        <TextInput
                            value={totalCharges}
                            onChangeText={text => setTotalCharges(text)}
                            placeholder={''}
                            editable={false}
                            placeholderTextColor={Colors.lightgrey}
                            style={Commonstyles.textinputtextStyle}
                            contextMenuHidden={true}
                        />


                        <View style={{ width: '10%', height: 48, justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => { showChargeModal() }}>
                                <View
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Feather name='eye' color={Colors.darkblue} size={20} />
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>

                    <View style={{ width: '90%', paddingHorizontal: 0, borderBottomWidth: 1, borderBottomColor: '#e2e2e2' }} />


                </View>

                {appInsuranceAmountVisible && (
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
                                textVal={appInsuranceAmountCaption}
                                textStyle={Commonstyles.inputtextStyle}
                                Visible={appInsuranceAmountMan}
                            />
                        </View>

                        <TextInputComp
                            textValue={appInsuranceAmount}
                            textStyle={Commonstyles.textinputtextStyle}
                            type="numeric"
                            Disable={appInsuranceAmountDisable}
                            ComponentName="appInsuranceAmount"
                            reference={appInsuranceAmountRef}
                            returnKey="next"
                            handleClick={handleClick}
                            handleReference={handleReference}
                        />
                    </View>
                )}

                {coappInsuranceAmountVisible && (
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
                                textVal={coappInsuranceAmountCaption}
                                textStyle={Commonstyles.inputtextStyle}
                                Visible={coappInsuranceAmountMan}
                            />
                        </View>

                        <TextInputComp
                            textValue={coappInsuranceAmount}
                            textStyle={Commonstyles.textinputtextStyle}
                            type="numeric"
                            Disable={coappInsuranceAmountDisable}
                            ComponentName="coappInsuranceAmount"
                            reference={coAppInsuranceAmountRef}
                            returnKey="next"
                            handleClick={handleClick}
                            handleReference={handleReference}
                        />
                    </View>
                )}

                {apprxDisbAmountVisible && (
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
                                textVal={apprxDisbAmountCaption}
                                textStyle={Commonstyles.inputtextStyle}
                                Visible={apprxDisbAmountMan}
                            />
                        </View>

                        <TextInputComp
                            textValue={apprxDisbAmount}
                            textStyle={Commonstyles.textinputtextStyle}
                            type="numeric"
                            Disable={apprxDisbAmountDisable}
                            ComponentName="apprxDisbursementAmount"
                            reference={apprxDisbAmountRef}
                            returnKey="next"
                            handleClick={handleClick}
                            handleReference={handleReference}
                        />
                    </View>
                )}

                <ChargeModal isVisible={chargeModalVisible} onClose={hideChargeModal} data={chargeData}></ChargeModal>

                <ButtonViewComp
                    textValue={language[0][props.language].str_submit.toUpperCase()}
                    textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
                    viewStyle={Commonstyles.buttonView}
                    innerStyle={Commonstyles.buttonViewInnerStyle}
                    handleClick={onSubmit}
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
)(LoanDemographicProductSelection);
