import { View, Text, ScrollView, SafeAreaView, StyleSheet, BackHandler, TouchableOpacity, Image } from 'react-native';
import { React, useState, useRef, useEffect } from 'react';
import MyStatusBar from '../../../Components/MyStatusBar';
import HeadComp from '../../../Components/HeadComp';
import { connect } from 'react-redux';
import { languageAction } from '../../../Utils/redux/actions/languageAction';
import { language } from '../../../Utils/LanguageString';
import Commonstyles from '../../../Utils/Commonstyles';
import Colors from '../../../Utils/Colors';
import Loading from '../../../Components/Loading';
import ErrorMessageModal from '../../../Components/ErrorMessageModal';
import SystemMandatoryField from '../../../Components/SystemMandatoryField';
import ButtonViewComp from '../../../Components/ButtonViewComp';
import TextComp from '../../../Components/TextComp';
import PickerComp from '../../../Components/PickerComp';
import TextInputComp from '../../../Components/TextInputComp';
import Common from '../../../Utils/Common';
import tbl_loanaddressinfo from '../../../Database/Table/tbl_loanaddressinfo';
import tbl_bankdetails from '../../../Database/Table/tbl_bankdetails';
import apiInstancelocal from '../../../Utils/apiInstancelocal';
import ErrorModal from '../../../Components/ErrorModal';
import tbl_client from '../../../Database/Table/tbl_client';
import apiInstance from '../../../Utils/apiInstance';
import ChildHeadComp from '../../../Components/ChildHeadComp';
import DateInputComp from '../../../Components/DateInputComp';
import tbl_nomineeDetails from '../../../Database/Table/tbl_nomineeDetails';

const LoanNomineeDetails = (props, { navigation }) => {
    const [loading, setLoading] = useState(false);
    // const [Data, setNewData] = useState();
    const [DataArray, setNewDataArray] = useState([]);
    const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
    const showBottomSheet = () => setBottomErrorSheetVisible(true);
    const hideBottomSheet = () => setBottomErrorSheetVisible(false);

    const [errMsg, setErrMsg] = useState('');
    let errorCounter = 1;

    const accountHolderNameRef = useRef(null);
    const ifscCodeRef = useRef(null);
    const bankNameRef = useRef(null);
    const branchNameRef = useRef(null);
    const accountNumberRef = useRef(null);
    const confirmAccountNumberRef = useRef(null);
    const bankLinkedMobileNumberRef = useRef(null);
    const upiIdRef = useRef(null);

    const [isNew, setIsNew] = useState(props.route.params.bankType);

    const [isNomineeLabel, setIsNomineeLabel] = useState('');
    const [isNomineeIndex, setIsNomineeIndex] = useState('');
    const [isNomineeCaption, setIsNomineeCaption] = useState('Is Nominee');
    const [isNomineeMan, setIsNomineeMan] = useState(false);
    const [isNomineeVisible, setIsNomineeVisible] = useState(true);
    const [isNomineeDisable, setIsNomineeDisable] = useState(false);
    const [isNomineeData, setIsNomineeData] = useState([]);


    const [relationStatuswithBorrowerMan, setRelationStatuswithBorrowerMan] = useState(false); //Manditory or not
    const [relationStatuswithBorrowerVisible, setRelationStatuswithBorrowerVisible] = useState(true); //Hide or not
    const [relationStatuswithBorrowerDisable, setRelationStatuswithBorrowerDisable] = useState(false); //Enable or Disable
    const [relationStatuswithBorrowerData, setRelationStatuswithBorrowerData] = useState([]); //DataPicking
    const [relationStatuswithBorrowerCaption, setRelationStatuswithBorrowerCaption] = useState('RELATIONSHIP STATUS WITH BORROWER'); //FieldCaption
    const [relationStatuswithBorrowerLabel, setRelationStatuswithBorrowerLabel] = useState('');
    const [relationStatuswithBorrowerIndex, setRelationStatuswithBorrowerIndex] = useState('');

    const [TitleMan, setTitleMan] = useState(false);
    const [TitleVisible, setTitleVisible] = useState(true);
    const [TitleDisable, setTitleDisable] = useState(false);
    const [TitleData, setTitleData] = useState([]);
    const [TitleCaption, setTitleCaption] = useState('TITLE');
    const [TitleLabel, setTitleLabel] = useState('');
    const [TitleIndex, setTitleIndex] = useState('');

    const [fullName, setFullName] = useState('');
    const [fullNameCaption, setFullNameCaption] = useState('FULL NAME');
    const [fullNameMan, setFullNameMan] = useState(false);
    const [fullNameVisible, setFullNameVisible] = useState(true);
    const [fullNameDisable, setFullNameDisable] = useState(false);
    const fullNameRef = useRef(null);

    const [aadharID, setAadharID] = useState('');
    const [aadharIDCaption, setAadharIDCaption] = useState('AADHAR ID');
    const [aadharIDMan, setAadharIDMan] = useState(false);
    const [aadharIDVisible, setAadharIDVisible] = useState(true);
    const [aadharIDDisable, setAadharIDDisable] = useState(false);
    const aadharIDRef = useRef(null);

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

    const [GenderMan, setGenderMan] = useState(false);
    const [GenderVisible, setGenderVisible] = useState(true);
    const [GenderDisable, setGenderDisable] = useState(false);
    const [GenderData, setGenderData] = useState([]);
    const [GenderCaption, setGenderCaption] = useState('GENDER');
    const [GenderLabel, setGenderLabel] = useState('');
    const [GenderIndex, setGenderIndex] = useState('');

    const [mobileNumber, setMobileNumber] = useState('');
    const [mobileNumberCaption, setMobileNumberCaption] = useState('MOBILE NUMBER');
    const [mobileNumberMan, setMobileNumberMan] = useState(false);
    const [mobileNumberVisible, setMobileNumberVisible] = useState(true);
    const [mobileNumberDisable, setMobileNumberDisable] = useState(false);
    const mobileNumberRef = useRef(null);

    const [nomineePerecent, setNomineePercent] = useState('');
    const [nomineePerecentCaption, setNomineePercentCaption] = useState('NOMINEE PERCENTAGE');
    const [nomineePerecentMan, setNomineePercentMan] = useState(false);
    const [nomineePerecentVisible, setNomineePercentVisible] = useState(true);
    const [nomineePerecentDisable, setNomineePercentDisable] = useState(false);
    const nomineePerecentRef = useRef(null);

    const [nomineeAccountNumber, setNomineeAccountNumber] = useState('');
    const [nomineeAccountNumberCaption, setNomineeAccountNumberCaption] = useState('NOMINEE BANK A/C NO');
    const [nomineeAccountNumberMan, setNomineeAccountNumberMan] = useState(false);
    const [nomineeAccountNumberVisible, setNomineeAccountNumberVisible] = useState(true);
    const [nomineeAccountNumberDisable, setNomineeAccountNumberDisable] = useState(false);
    const nomineeAccountNumberRef = useRef(null);


    const [nomineeifscCode, setNomineeIfscCode] = useState('');
    const [nomineeifscCodeCaption, setNomineeIfscCodeCaption] = useState('NOMINEE IFSC');
    const [nomineeifscCodeMan, setNomineeIfscCodeMan] = useState(false);
    const [nomineeifscCodeVisible, setNomineeIfscCodeVisible] = useState(true);
    const [nomineeifscCodeDisable, setNomineeIfscCodeDisable] = useState(false);
    const nomineeifscCodeRef = useRef(null);


    const [nomineeBankName, setNomineeBankName] = useState('');
    const [nomineeBankNameCaption, setNomineeBankNameCaption] = useState('NOMINEE BANK NAME');
    const [nomineeBankNameMan, setNomineeBankNameMan] = useState(false);
    const [nomineeBankNameVisible, setNomineeBankNameVisible] = useState(true);
    const [nomineeBankNameDisable, setNomineeBankNameDisable] = useState(true);
    const nomineeBankNameRef = useRef(null);

    const [nomineeBranchName, setNomineeBranchName] = useState('');
    const [nomineeBranchNameCaption, setNomineeBranchNameCaption] = useState('NOMINEE BANK BRANCH');
    const [nomineeBranchNameMan, setNomineeBranchNameMan] = useState(false);
    const [nomineeBranchNameVisible, setNomineeBranchNameVisible] = useState(true);
    const [nomineeBranchNameDisable, setNomineeBranchNameDisable] = useState(true);
    const nomineeBranchNameRef = useRef(null);

    const [nomineeNameInBank, setNomineeNameInBank] = useState('');
    const [nomineeNameInBankCaption, setNomineeNameInBankCaption] = useState('NOMINEE NAME IN BANK');
    const [nomineeNameInBankMan, setNomineeNameInBankMan] = useState(false);
    const [nomineeNameInBankVisible, setNomineeNameInBankVisible] = useState(true);
    const [nomineeNameInBankDisable, setNomineeNameInBankDisable] = useState(false);
    const nomineeNameInBankRef = useRef(null);

    const [systemCodeDetail, setSystemCodeDetail] = useState(props.mobilecodedetail.leadSystemCodeDto);
    const [userCodeDetail, setUserCodeDetail] = useState(props.mobilecodedetail.leadUserCodeDto);
    const [systemMandatoryField, setSystemMandatoryField] = useState(props.mobilecodedetail.processSystemMandatoryFields);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');

    const [nomineeID, setNomineeID] = useState('');
    const [nomineeMaxID, setNomineeMaxID] = useState('');
    const [pageId, setPageId] = useState(global.CURRENTPAGEID);


    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        getSystemCodeDetail()
        makeSystemMandatoryFields();
        getExistingData()

        if (global.USERTYPEID == 1163) {
            fieldsDisable();
        }

        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }
    }, [props.navigation]);

    const handleBackButton = () => {
        onGoBack();
        return true; // Prevent default back button behavior
    };

    const getExistingData = () => {

        if (isNew != 'new') {
            getExistingBankData(isNew.loanApplicationId, isNew.id)
        }

    }

    const fieldsDisable = () => {

        setIsNomineeDisable(true);
        setRelationStatuswithBorrowerDisable(true);
        setTitleDisable(true);
        setFullNameDisable(true);
        setAadharIDDisable(true);
        setDOBDisable(true);
        setAgeDisable(true);
        setGenderDisable(true);
        setMobileNumberDisable(true);
        setNomineePercentDisable(true);
        setNomineeAccountNumberDisable(true);
        setNomineeIfscCodeDisable(true)
        setNomineeBankNameDisable(true);
        setNomineeBranchNameDisable(true);
        setNomineeNameInBankDisable(true);

    }

    const getExistingBankData = (loanAppId, id) => {

        tbl_nomineeDetails.getNomineeDetailsOnID(loanAppId, id)
            .then(data => {
                if (global.DEBUG_MODE) console.log('Nominee Detail:', data);
                setNomineeID(data[0].id)
                setIsNomineeLabel(data[0].isNomineeId)
                setRelationStatuswithBorrowerLabel(data[0].relstatuswithBorrower)
                setTitleLabel(data[0].titleId)
                setFullName(data[0].fullName)
                setAadharID(data[0].aadharId)
                setDOB(data[0].dateOfBirth)
                setAge(data[0].age)
                setGenderLabel(data[0].genderId)
                setMobileNumber(data[0].mobileNum)
                setNomineePercent(data[0].nomineePercent)
                setNomineeAccountNumber(data[0].nomineeBankAccNo)
                setNomineeIfscCode(data[0].nomineeIfsc)
                setNomineeBankName(data[0].nomineeBankName)
                setNomineeBranchName(data[0].nomineeBankBranch)
                setNomineeNameInBank(data[0].nomineeNameInBank)
                setLoading(false)
            })
            .catch(error => {
                if (global.DEBUG_MODE) console.error('Error fetching Bank details:', error);
                setLoading(false)
            });

    }


    const getSystemCodeDetail = () => {

        const filterIsNomineeData = userCodeDetail.filter((data) => data.masterId === 'IS_NOMINEE');
        setIsNomineeData(filterIsNomineeData)

        const filteredTitleData = userCodeDetail.filter((data) => data.masterId === 'TITLE').sort((a, b) => a.Description.localeCompare(b.Description));
        setTitleData(filteredTitleData);


        const filteredrelationTypeBorrowerData = systemCodeDetail.filter((data) => data.masterId === 'RELATIONSHIP').sort((a, b) => a.Description.localeCompare(b.Description));;
        setRelationStatuswithBorrowerData(filteredrelationTypeBorrowerData);

        const filteredGenderData = systemCodeDetail.filter((data) => data.masterId === 'GENDER').sort((a, b) => a.Description.localeCompare(b.Description));
        setGenderData(filteredGenderData);


    }

    const makeSystemMandatoryFields = () => {

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_is_nmn' && data.pageId === pageId).map((value, index) => {

            setIsNomineeCaption(value.fieldName)

            if (value.mandatory) {
                setIsNomineeMan(true);
            }
            if (value.hide) {
                setIsNomineeVisible(false);
            }
            if (value.disable) {
                setIsNomineeDisable(true);
            }
            if (value.captionChange) {
                setIsNomineeCaption(value.fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_rlt_type' && data.pageId === pageId).map((value, index) => {
            setRelationStatuswithBorrowerCaption(value.fieldName)

            if (value.isMandatory) {
                setRelationStatuswithBorrowerMan(true);
            }
            if (value.isHide) {
                setRelationStatuswithBorrowerVisible(false);
            }
            if (value.isDisable) {
                setRelationStatuswithBorrowerDisable(true);
            }
            if (value.isCaptionChange) {
                setRelationStatuswithBorrowerCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_prsnl_dtl_title' && data.pageId === pageId).map((value, index) => {
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
            setFullNameCaption(value.fieldName)

            if (value.isMandatory) {
                setFullNameMan(true);
            }
            if (value.isHide) {
                setFullNameVisible(false);
            }
            if (value.isDisable) {
                setFullNameDisable(true);
            }
            if (value.isCaptionChange) {
                setFullNameCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_adhr_id' && data.pageId === pageId).map((value, index) => {
            setAadharIDCaption(value.fieldName)

            if (value.isMandatory) {
                setAadharIDMan(true);
            }
            if (value.isHide) {
                setAadharIDVisible(false);
            }
            if (value.isDisable) {
                setAadharIDDisable(true);
            }
            if (value.isCaptionChange) {
                setAadharIDCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_prsnl_dtl_gender' && data.pageId === pageId).map((value, index) => {
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

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_date_of_birth' && data.pageId === pageId).map((value, index) => {
            setDOBCaption(value.fieldName)

            if (value.isMandatory) {
                setDOBMan(true);
            }
            if (value.isHide) {
                setDOBVisible(false);
            }
            if (value.isDisable) {
                setDOBDisable(true);
            }
            if (value.isCaptionChange) {
                setDOBCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_prsnl_dtl_age' && data.pageId === pageId).map((value, index) => {
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

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_nmn_prctn' && data.pageId === pageId).map((value, index) => {
            setNomineePercentCaption(value.fieldName)

            if (value.isMandatory) {
                setNomineePercentMan(true);
            }
            if (value.isHide) {
                setNomineePercentVisible(false);
            }
            if (value.isDisable) {
                setNomineePercentDisable(true);
            }
            if (value.isCaptionChange) {
                setNomineePercentCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_nmn_bk_acct' && data.pageId === pageId).map((value, index) => {
            setNomineeAccountNumberCaption(value.fieldName)

            if (value.isMandatory) {
                setNomineeAccountNumberMan(true);
            }
            if (value.isHide) {
                setNomineeAccountNumberVisible(false);
            }
            if (value.isDisable) {
                setNomineeAccountNumberDisable(true);
            }
            if (value.isCaptionChange) {
                setNomineeAccountNumberCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_nomineeifsc' && data.pageId === pageId).map((value, index) => {
            setNomineeIfscCodeCaption(value.fieldName)

            if (value.isMandatory) {
                setNomineeIfscCodeMan(true);
            }
            if (value.isHide) {
                setNomineeIfscCodeVisible(false);
            }
            if (value.isDisable) {
                setNomineeIfscCodeDisable(true);
            }
            if (value.isCaptionChange) {
                setNomineeIfscCodeCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_nmn_bk_nm' && data.pageId === pageId).map((value, index) => {
            setNomineeBankNameCaption(value.fieldName)

            if (value.isMandatory) {
                setNomineeBankNameMan(true);
            }
            if (value.isHide) {
                setNomineeBankNameVisible(false);
            }
            if (value.isDisable) {
                setNomineeBankNameDisable(true);
            }
            if (value.isCaptionChange) {
                setNomineeBankNameCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_nmn_bk_brc' && data.pageId === pageId).map((value, index) => {
            setNomineeBranchNameCaption(value.fieldName)

            if (value.isMandatory) {
                setNomineeBranchNameMan(true);
            }
            if (value.isHide) {
                setNomineeBranchNameVisible(false);
            }
            if (value.isDisable) {
                setNomineeBranchNameDisable(true);
            }
            if (value.isCaptionChange) {
                setNomineeBranchNameCaption(value[0].fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_nmn_nm_bk' && data.pageId === pageId).map((value, index) => {
            setNomineeNameInBankCaption(value.fieldName)

            if (value.isMandatory) {
                setNomineeNameInBankMan(true);
            }
            if (value.isHide) {
                setNomineeNameInBankVisible(false);
            }
            if (value.isDisable) {
                setNomineeNameInBankDisable(true);
            }
            if (value.isCaptionChange) {
                setNomineeNameInBankCaption(value[0].fieldCaptionChange)
            }
        });

    }

    const validateData = () => {
        var flag = false;
        var i = 1;
        var errorMessage = '';

        if (isNomineeMan && isNomineeVisible) {
            if (isNomineeLabel.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + isNomineeCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (relationStatuswithBorrowerMan && relationStatuswithBorrowerVisible) {
            if (relationStatuswithBorrowerLabel.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsselect +
                    relationStatuswithBorrowerCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (TitleMan && TitleVisible) {
            if (TitleLabel.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsenter +
                    TitleCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (fullNameMan && fullNameVisible) {
            if (fullName.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsenter +
                    fullNameCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (aadharIDMan && aadharIDVisible) {
            if (aadharID.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsenter +
                    aadharIDCaption +
                    '\n';
                i++;
                flag = true;
            } else if (!Common.validateVerhoeff(aadharID)) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    'Please Enter Valid Aadhar ID' +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (GenderMan && GenderVisible) {
            if (GenderLabel.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsenter +
                    GenderCaption +
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
            } else if (!Common.isValidPhoneNumber(mobileNumber)) {
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


        if (nomineePerecentMan && nomineePerecentVisible) {
            if (nomineePerecent.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsenter +
                    nomineePerecentCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (nomineeAccountNumberMan && nomineeAccountNumberVisible) {
            if (nomineeAccountNumber.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsenter +
                    nomineeAccountNumberCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (nomineeifscCodeMan && nomineeifscCodeVisible) {
            if (nomineeifscCode.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsenter +
                    nomineeifscCodeCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (nomineeBankNameMan && nomineeBankNameVisible) {
            if (nomineeBankName.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsenter +
                    nomineeBankNameCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (nomineeBranchNameMan && nomineeBranchNameVisible) {
            if (nomineeBranchName.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsenter +
                    nomineeBranchNameCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (nomineeNameInBankMan && nomineeNameInBankVisible) {
            if (nomineeNameInBank.length <= 0) {
                errorMessage =
                    errorMessage +
                    i +
                    ')' +
                    ' ' +
                    language[0][props.language].str_plsenter +
                    nomineeNameInBankCaption +
                    '\n';
                i++;
                flag = true;
            }
        }

        if (TitleVisible && GenderVisible) {
            if (TitleLabel === 'MR') {
                if (GenderLabel == 'F') {
                    errorMessage = errorMessage + i + ')' + ' ' + TitleCaption + ' AND ' + GenderCaption + ' Not matching' + '\n';
                    i++;
                    flag = true;
                }
            } else if (TitleLabel === 'MRS' || TitleLabel === 'MISS') {
                if (GenderLabel == 'M') {
                    errorMessage = errorMessage + i + ')' + ' ' + TitleCaption + ' AND ' + GenderCaption + ' Not matching' + '\n';
                    i++;
                    flag = true;
                }
            }
        }

        setErrMsg(errorMessage);
        return flag;
    };

    const nomineeSubmit = () => {

        if (global.USERTYPEID == 1163) {
            onGoBack();
            return;
        }

        Common.getNetworkConnection().then(value => {
            if (value.isConnected == true) {
                if (nomineeID.length <= 0) {
                    postNomineeData();
                } else {
                    updateNomineeData();
                }
            } else {
                setApiError(language[0][props.language].str_errinternet);
                setErrorModalVisible(true)
            }

        })

    }


    const postNomineeData = () => {
        if (validateData()) {
            showBottomSheet();
            //alert(errMsg)
        } else {

            const appDetails = [
                {
                    "isNominee": isNomineeLabel,
                    "relationshipWithBorrower": relationStatuswithBorrowerLabel,
                    "fullName": fullName,
                    "aadhaarId": aadharID,
                    "dateOfBirth": DOB.length > 0 ? Common.convertYearDateFormat(DOB) : '',
                    "age": parseInt(Age),
                    "gender": GenderLabel,
                    "mobileNo": mobileNumber,
                    "nomineePercentage": parseInt(nomineePerecent),
                    "nomineeBankAccountNo": nomineeAccountNumber,
                    "nomineeIfscCode": nomineeifscCode,
                    "nomineeBankName": nomineeBankName,
                    "nomineeBranchName": nomineeBranchName,
                    "nomineeNameInBank": nomineeNameInBank,
                    "createdBy": global.USERID,
                    "createdDate": new Date(),
                }
            ]
            const baseURL = '8901';
            setLoading(true);
            apiInstancelocal(baseURL)
                .post(`/api/v2/loan-demographics/${global.LOANAPPLICATIONID}/nominee`, appDetails)
                .then(async response => {
                    // Handle the response data
                    if (global.DEBUG_MODE) console.log('PostNomineeResponse::' + JSON.stringify(response.data[0]));

                    setLoading(false);
                    insertData(response.data[0].id)
                })
                .catch(error => {
                    // Handle the error
                    if (global.DEBUG_MODE) console.log('PostBankResponse' + JSON.stringify(error.response));
                    setLoading(false);
                    if (error.response.data != null) {
                        setApiError(error.response.data.message);
                        setErrorModalVisible(true)
                    }
                });
            //insertData()
        }
    };

    const updateNomineeData = (dmsID) => {
        if (validateData()) {
            showBottomSheet();
        } else {

            const appDetails = {
                "id": nomineeID,
                "isNominee": isNomineeLabel,
                "relationshipWithBorrower": relationStatuswithBorrowerLabel,
                "fullName": fullName,
                "aadhaarId": aadharID,
                "dateOfBirth": DOB.length > 0 ? Common.convertYearDateFormat(DOB) : '',
                "age": parseInt(Age),
                "gender": GenderLabel,
                "mobileNo": mobileNumber,
                "nomineePercentage": parseInt(nomineePerecent),
                "nomineeBankAccountNo": nomineeAccountNumber,
                "nomineeIfscCode": nomineeifscCode,
                "nomineeBankName": nomineeBankName,
                "nomineeBranchName": nomineeBranchName,
                "nomineeNameInBank": nomineeNameInBank,
                "modifiedBy": global.USERID,
                "modifiedDate": new Date(),
            }
            const baseURL = '8901';
            setLoading(true);
            apiInstancelocal(baseURL)
                .put(`/api/v2/loan-demographics/nominee/${nomineeID}`, appDetails)
                .then(async response => {
                    // Handle the response data
                    if (global.DEBUG_MODE) console.log('UpdateNomineeResponse::' + JSON.stringify(response.data),);
                    insertData(nomineeID)
                    setLoading(false);
                })
                .catch(error => {
                    // Handle the error
                    if (global.DEBUG_MODE) console.log('UpdateNomineeResponse' + JSON.stringify(error.response));
                    setLoading(false);
                    if (error.response.data != null) {
                        setApiError(error.response.data.message);
                        setErrorModalVisible(true)
                    }
                });
            //insertData()
        }
    };


    const getIFSCCode = (ifsc) => {
        let IFSC = '';
        IFSC = ifsc.toUpperCase()

        const baseURL = '8082';
        setLoading(true);
        apiInstance(baseURL)
            .get(`api/v1/ifsc-config/getByIfsc/${IFSC}`)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log('IFSCApiResponse::' + JSON.stringify(response.data));
                setNomineeBankName(response.data.bankName)
                setNomineeBranchName(response.data.branchName)
                setLoading(false);
            })
            .catch(error => {
                // Handle the error
                if (global.DEBUG_MODE) console.log('IFSCApiError' + JSON.stringify(error.response));
                setLoading(false);
                if (error.response.data != null) {
                    setApiError(error.response.data.message);
                    setErrorModalVisible(true)
                }
            });

    };

    const insertData = (id) => {
        tbl_nomineeDetails.insertNomineeDetails(
            global.LOANAPPLICATIONID,
            'APPL',
            id,
            isNomineeLabel,
            relationStatuswithBorrowerLabel,
            TitleLabel,
            fullName,
            aadharID,
            DOB,
            Age,
            GenderLabel,
            mobileNumber,
            nomineePerecent,
            nomineeAccountNumber,
            nomineeifscCode,
            nomineeBankName,
            nomineeBranchName,
            nomineeNameInBank
        )
            .then(result => {
                if (global.DEBUG_MODE) console.log('Inserted Bank detail:', result);
                props.navigation.replace('LoanNomineeList')
            })
            .catch(error => {
                if (global.DEBUG_MODE) console.error('Error Inserting Bank detail:', error);
            });
    }


    const handlePickerClick = (componentName, label, index) => {
        if (componentName === 'IsNomineePicker') {
            setIsNomineeLabel(label);
            setIsNomineeIndex(index);
        } else if (componentName === 'RelationStatusBorrower') {
            setRelationStatuswithBorrowerLabel(label);
            setRelationStatuswithBorrowerIndex(index);
        } else if (componentName === 'Title') {
            setTitleLabel(label);
            setTitleIndex(index);
        } else if (componentName === 'Gender') {
            setGenderLabel(label);
            setGenderIndex(index);
        }
    }

    const handleClick = (componentName, textValue) => {

        if (componentName === 'fullName') {
            if (textValue.length > 0) {
                if (Common.isValidText(textValue))
                    setFullName(textValue)
            } else {
                setFullName(textValue)
            }
        } else if (componentName === 'nomineeIfsccode') {
            if (textValue.length > 0) {
                setNomineeIfscCode(textValue)
                if (textValue.length == 11) {
                    getIFSCCode(textValue)
                }
            } else {
                setNomineeIfscCode(textValue)
            }
        } else if (componentName === 'nomineeBankname') {
            if (textValue.length > 0) {
                if (Common.isValidText(textValue))
                    setNomineeBankName(textValue)
            } else {
                setNomineeBankName(textValue)
            }
        } else if (componentName === 'nomineeNameInBank') {
            if (textValue.length > 0) {
                if (Common.isValidText(textValue))
                    setNomineeNameInBank(textValue)
            } else {
                setNomineeNameInBank(textValue)
            }
        } else if (componentName === 'nomineeBranchname') {
            if (textValue.length > 0) {
                if (Common.isValidText(textValue))
                    setNomineeBranchName(textValue)
            } else {
                setNomineeBranchName(textValue)
            }
        } else if (componentName === 'nomineeAccountnumber') {
            if (textValue.length > 0) {
                setNomineeAccountNumber(textValue)
            } else {
                setNomineeAccountNumber(textValue)
            }
        } else if (componentName === 'nomineePerecent') {
            if (textValue.length > 0) {
                setNomineePercent(textValue)
            } else {
                setNomineePercent(textValue)
            }
        }
        else if (componentName === 'mobileNumber') {
            if (textValue.length > 0) {
                if (Common.numberRegex.test(textValue)) setMobileNumber(textValue);
            } else {
                setMobileNumber(textValue);
            }
        } else if (componentName === 'DOB') {
            setDOB(textValue);
            setAge(Common.calculateAge(textValue).toString())
        } else if (componentName === 'Age') {
            setAge(textValue);
        } else if (componentName === 'aadharID') {
            if (textValue.length > 0) {
                if (Common.numberRegex.test(textValue)) setAadharID(textValue);
            } else {
                setAadharID(textValue);
            }
        }


    }

    const handleReference = (componentName) => {

        if (componentName === 'accountHolderName') {

        } else if (componentName === 'ifsccode') {

        }

    };

    const closeErrorModal = () => {
        setErrorModalVisible(false);
    };

    const onGoBack = () => {
        props.navigation.goBack();
    }

    return (
        <SafeAreaView style={[styles.parentView, { backgroundColor: Colors.lightwhite }]}>
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
            <ErrorModal isVisible={errorModalVisible} onClose={closeErrorModal} textContent={apiError} textClose={language[0][props.language].str_ok} />

            <ErrorMessageModal
                isVisible={bottomErrorSheetVisible}
                hideBottomSheet={hideBottomSheet}
                errMsg={errMsg}
                textError={language[0][props.language].str_error}
                textClose={language[0][props.language].str_ok}
            />
            <View style={{ width: '100%', height: 56, alignItems: 'center', justifyContent: 'center', }}>
                <HeadComp textval={language[0][props.language].str_loannomineedtls} props={props} onGoBack={onGoBack} />
            </View>
            <ChildHeadComp
                textval={language[0][props.language].str_nomineeDetails}
            />

            <ScrollView style={styles.scrollView}
                contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                {loading ? <Loading /> : null}

                {isNomineeVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={isNomineeCaption} textStyle={Commonstyles.inputtextStyle} Visible={isNomineeMan} />
                    </View>
                    <PickerComp textLabel={isNomineeLabel} pickerStyle={Commonstyles.picker} Disable={isNomineeDisable} pickerdata={isNomineeData} componentName='IsNomineePicker' handlePickerClick={handlePickerClick} />
                </View>}

                {relationStatuswithBorrowerVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={relationStatuswithBorrowerCaption} textStyle={Commonstyles.inputtextStyle} Visible={relationStatuswithBorrowerMan} />
                    </View>
                    <PickerComp textLabel={relationStatuswithBorrowerLabel} pickerStyle={Commonstyles.picker} Disable={relationStatuswithBorrowerDisable} pickerdata={relationStatuswithBorrowerData} componentName='RelationStatusBorrower' handlePickerClick={handlePickerClick} />
                </View>}

                {TitleVisible && (
                    <View
                        style={{
                            width: '100%',
                            alignItems: 'center',
                            marginTop: '4%',
                        }}>
                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                            <TextComp
                                textVal={TitleCaption}
                                textStyle={Commonstyles.inputtextStyle}
                                Visible={TitleMan}
                            />
                        </View>

                        <PickerComp
                            textLabel={TitleLabel}
                            pickerStyle={Commonstyles.picker}
                            Disable={TitleDisable}
                            pickerdata={TitleData}
                            componentName="Title"
                            handlePickerClick={handlePickerClick}
                        />
                    </View>
                )}

                {fullNameVisible && (
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
                                textVal={fullNameCaption}
                                textStyle={Commonstyles.inputtextStyle}
                                Visible={fullNameMan}
                            />
                        </View>

                        <TextInputComp
                            textValue={fullName}
                            textStyle={Commonstyles.textinputtextStyle}
                            type="email-address"
                            Disable={fullNameDisable}
                            ComponentName="fullName"
                            reference={fullNameRef}
                            returnKey="next"
                            handleClick={handleClick}
                            handleReference={handleReference}
                        />
                    </View>
                )}

                {aadharIDVisible && (
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
                                textVal={aadharIDCaption}
                                textStyle={Commonstyles.inputtextStyle}
                                Visible={aadharIDMan}
                            />
                        </View>

                        <TextInputComp
                            textValue={aadharID}
                            textStyle={Commonstyles.textinputtextStyle}
                            type="numeric"
                            Disable={aadharIDDisable}
                            ComponentName="aadharID"
                            reference={aadharIDRef}
                            returnKey="next"
                            handleClick={handleClick}
                            handleReference={handleReference}
                        />
                    </View>
                )}

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

                {GenderVisible && (
                    <View
                        style={{
                            width: '100%',
                            alignItems: 'center',
                            marginTop: '4%',
                        }}>
                        <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                            <TextComp
                                textVal={GenderCaption}
                                textStyle={Commonstyles.inputtextStyle}
                                Visible={GenderMan}
                            />
                        </View>

                        <PickerComp
                            textLabel={GenderLabel}
                            pickerStyle={Commonstyles.picker}
                            Disable={GenderDisable}
                            pickerdata={GenderData}
                            componentName="Gender"
                            handlePickerClick={handlePickerClick}
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
                            handleClick={handleClick}
                            handleReference={handleReference}
                        />
                    </View>
                )}

                {nomineePerecentVisible && (
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
                                textVal={nomineePerecentCaption}
                                textStyle={Commonstyles.inputtextStyle}
                                Visible={nomineePerecentMan}
                            />
                        </View>

                        <TextInputComp
                            textValue={nomineePerecent}
                            textStyle={Commonstyles.textinputtextStyle}
                            type="numeric"
                            Disable={nomineePerecentDisable}
                            ComponentName="nomineePerecent"
                            reference={nomineePerecentRef}
                            returnKey="next"
                            handleClick={handleClick}
                            handleReference={handleReference}
                        />
                    </View>
                )}

                {nomineeAccountNumberVisible && (
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
                                textVal={nomineeAccountNumberCaption}
                                textStyle={Commonstyles.inputtextStyle}
                                Visible={nomineeAccountNumberMan}
                            />
                        </View>

                        <TextInputComp
                            textValue={nomineeAccountNumber}
                            textStyle={Commonstyles.textinputtextStyle}
                            type="numeric"
                            Disable={nomineeAccountNumberDisable}
                            ComponentName="nomineeAccountnumber"
                            reference={nomineeAccountNumberRef}
                            returnKey="next"
                            handleClick={handleClick}
                            handleReference={handleReference}
                        />
                    </View>
                )}

                {nomineeifscCodeVisible && (
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
                                textVal={nomineeifscCodeCaption}
                                textStyle={Commonstyles.inputtextStyle}
                                Visible={nomineeifscCodeMan}
                            />
                        </View>

                        <TextInputComp
                            textValue={nomineeifscCode}
                            textStyle={Commonstyles.textinputtextStyle}
                            type="email-address"
                            Disable={nomineeifscCodeDisable}
                            ComponentName="nomineeIfsccode"
                            reference={nomineeifscCodeRef}
                            returnKey="next"
                            handleClick={handleClick}
                            handleReference={handleReference}
                        />
                    </View>
                )}

                {nomineeBankNameVisible && (
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
                                textVal={nomineeBankNameCaption}
                                textStyle={Commonstyles.inputtextStyle}
                                Visible={nomineeBankNameMan}
                            />
                        </View>

                        <TextInputComp
                            textValue={nomineeBankName}
                            textStyle={Commonstyles.textinputtextStyle}
                            type="email-address"
                            Disable={nomineeBankNameDisable}
                            ComponentName="nomineeBankname"
                            reference={nomineeBankNameRef}
                            returnKey="next"
                            handleClick={handleClick}
                            handleReference={handleReference}
                        />
                    </View>
                )}

                {nomineeBranchNameVisible && (
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
                                textVal={nomineeBranchNameCaption}
                                textStyle={Commonstyles.inputtextStyle}
                                Visible={nomineeBranchNameMan}
                            />
                        </View>

                        <TextInputComp
                            textValue={nomineeBranchName}
                            textStyle={Commonstyles.textinputtextStyle}
                            type="email-address"
                            Disable={nomineeBranchNameDisable}
                            ComponentName="nomineeBranchname"
                            reference={nomineeBranchNameRef}
                            returnKey="next"
                            handleClick={handleClick}
                            handleReference={handleReference}
                        />
                    </View>
                )}

                {nomineeNameInBankVisible && (
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
                                textVal={nomineeNameInBankCaption}
                                textStyle={Commonstyles.inputtextStyle}
                                Visible={nomineeNameInBankMan}
                            />
                        </View>

                        <TextInputComp
                            textValue={nomineeNameInBank}
                            textStyle={Commonstyles.textinputtextStyle}
                            type="email-address"
                            Disable={nomineeNameInBankDisable}
                            ComponentName="nomineeNameInBank"
                            reference={nomineeNameInBankRef}
                            returnKey="next"
                            handleClick={handleClick}
                            handleReference={handleReference}
                        />
                    </View>
                )}

                <ButtonViewComp
                    textValue={language[0][props.language].str_next.toUpperCase()}
                    textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
                    viewStyle={Commonstyles.buttonView}
                    innerStyle={Commonstyles.buttonViewInnerStyle}
                    handleClick={nomineeSubmit}
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
        flexGrow: 1
    }, line: {
        backgroundColor: '#dbdbdb', // Change the color as needed
        height: 1,
        width: '90%',
        marginTop: '5%'           // Adjust the height as needed
    },
    picker: {
        height: 50,
        width: '100%',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        textAlign: 'center'
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

const mapStateToProps = state => {
    const { language } = state.languageReducer;
    const { profileDetails } = state.profileReducer;
    const { mobileCodeDetails } = state.mobilecodeReducer;
    return {
        language: language,
        profiledetail: profileDetails,
        mobilecodedetail: mobileCodeDetails
    }
};

const mapDispatchToProps = dispatch => ({
    languageAction: item => dispatch(languageAction(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoanNomineeDetails);
