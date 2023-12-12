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
import ProgressComp from '../../../Components/ProgressComp';
import Entypo from 'react-native-vector-icons/Entypo';
import ImageBottomPreview from '../../../Components/ImageBottomPreview';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';

const BankDetailsScreen = (props, { navigation }) => {
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

    const [accountTypeLabel, setAccountTypeLabel] = useState('');
    const [accountTypeIndex, setAccountTypeIndex] = useState('');
    const [accountTypeCaption, setAccountTypeCaption] = useState('ACCOUNT TYPE');
    const [accountTypeMan, setAccountTypeMan] = useState(false);
    const [accountTypeVisible, setAccountTypeVisible] = useState(true);
    const [accountTypeDisable, setAccountTypeDisable] = useState(false);
    const [accountTypeData, setAccountTypeData] = useState([]);

    const [accountToUseLabel, setAccountToUseLabel] = useState('');
    const [accountToUseIndex, setAccountToUseIndex] = useState('');
    const [accountToUseCaption, setAccountToUseCaption] = useState('ACCOUNT TO BE USED FOR');
    const [accountToUseMan, setAccountToUseMan] = useState(false);
    const [accountToUseVisible, setAccountToUseVisible] = useState(true);
    const [accountToUseDisable, setAccountToUseDisable] = useState(false);
    const [accountToUseData, setAccountToUseData] = useState([]);

    const [accountHolderName, setAccountHolderName] = useState('');
    const [accountHolderNameCaption, setAccountHolderNameCaption] = useState('ACCOUNT HOLDER NAME AS PER BANK');
    const [accountHolderNameMan, setAccountHolderNameMan] = useState(false);
    const [accountHolderNameVisible, setAccountHolderNameVisible] = useState(true);
    const [accountHolderNameDisable, setAccountHolderNameDisable] = useState(false);

    const [ifscCode, setIfscCode] = useState('');
    const [ifscCodeCaption, setIfscCodeCaption] = useState('IFSC CODE');
    const [ifscCodeMan, setIfscCodeMan] = useState(false);
    const [ifscCodeVisible, setIfscCodeVisible] = useState(true);
    const [ifscCodeDisable, setIfscCodeDisable] = useState(false);

    const [bankName, setBankName] = useState('');
    const [bankNameCaption, setBankNameCaption] = useState('BANK NAME');
    const [bankNameMan, setBankNameMan] = useState(false);
    const [bankNameVisible, setBankNameVisible] = useState(true);
    const [bankNameDisable, setBankNameDisable] = useState(true);

    const [branchName, setBranchName] = useState('');
    const [branchNameCaption, setBranchNameCaption] = useState('BRANCH NAME');
    const [branchNameMan, setBranchNameMan] = useState(false);
    const [branchNameVisible, setBranchNameVisible] = useState(true);
    const [branchNameDisable, setBranchNameDisable] = useState(true);

    const [accountNumber, setAccountNumber] = useState('');
    const [accountNumberCaption, setAccountNumberCaption] = useState('ACCOUNT NUMBER');
    const [accountNumberMan, setAccountNumberMan] = useState(false);
    const [accountNumberVisible, setAccountNumberVisible] = useState(true);
    const [accountNumberDisable, setAccountNumberDisable] = useState(false);

    const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
    const [confirmAccountNumberCaption, setConfirmAccountNumberCaption] = useState('CONFIRM ACCOUNT NUMBER');
    const [confirmAccountNumberMan, setConfirmAccountNumberMan] = useState(false);
    const [confirmAccountNumberVisible, setConfirmAccountNumberVisible] = useState(true);
    const [confirmAccountNumberDisable, setConfirmAccountNumberDisable] = useState(false);

    const [bankLinkedMobNo, setBankLinkedMobNo] = useState('');
    const [bankLinkedMobNoCaption, setBankLinkedMobNoCaption] = useState('BANK LINKED MOBILE NUMBER');
    const [bankLinkedMobNoMan, setBankLinkedMobNoMan] = useState(false);
    const [bankLinkedMobNoVisible, setBankLinkedMobNoVisible] = useState(true);
    const [bankLinkedMobNoDisable, setBankLinkedMobNoDisable] = useState(false);

    const [upiID, setUpiID] = useState('');
    const [upiIDCaption, setUpiIDCaption] = useState('UPI ID');
    const [upiIDMan, setUpiIDMan] = useState(false);
    const [upiIDVisible, setUpiIDVisible] = useState(true);
    const [upiIDDisable, setUpiIDDisable] = useState(false);


    const [systemCodeDetail, setSystemCodeDetail] = useState(props.mobilecodedetail.leadSystemCodeDto);
    const [userCodeDetail, setUserCodeDetail] = useState(props.mobilecodedetail.leadUserCodeDto);
    const [systemMandatoryField, setSystemMandatoryField] = useState(props.mobilecodedetail.leadSystemMandatoryFieldDto);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');

    const [bankID, setBankID] = useState('');
    const [isKYC, setIsKYC] = useState('');


    const [postorput, setPostORPut] = useState('post');
    const [kycManual, setKYCManual] = useState('0');

    const [visible, setVisible] = useState(true);
    const [photoOptionvisible, setphotoOptionvisible] = useState(false);
    const [imageUri, setImageUri] = useState(null);
    const [imageFile, setImageFile] = useState([]);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [docID, setDocID] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileType, setFileType] = useState('');
    const showphotoBottomSheet = () => setphotoOptionvisible(true);
    const hidephotoBottomSheet = () => setphotoOptionvisible(false);
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const showImageBottomSheet = () => { setBottomSheetVisible(true) };
    const hideImageBottomSheet = () => setBottomSheetVisible(false);

    const [hideRetake, setHideRetake] = useState(false);
    const [hideDelete, setHideDelete] = useState(false);


    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
        getSystemCodeDetail()
        makeSystemMandatoryFields();
        getExistingData()


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
            getExistingBankData(isNew.loanApplicationId, isNew.client_type)
        }
    }

    const fieldsDisable = () => {


    }

    const getExistingBankData = (loanAppId, id) => {
        tbl_bankdetails.getAllBankDetailsDetailsForLoanID(loanAppId, id)
            .then(data => {
                if (global.DEBUG_MODE) console.log('Bank Detail:', data);
                setBankID(data[0].id)
                setAccountTypeLabel(data[0].account_type)
                setAccountHolderName(data[0].account_holder_name)
                setIfscCode(data[0].ifsc_code)
                setBankName(data[0].bank_name)
                setBranchName(data[0].branch_name)
                setAccountNumber(data[0].account_number)
                setConfirmAccountNumber(data[0].account_number)
                setBankLinkedMobNo(data[0].mobile_number)
                setUpiID(data[0].upi_id)
                setLoading(false)
            })
            .catch(error => {
                if (global.DEBUG_MODE) console.error('Error fetching Bank details:', error);
                setLoading(false)
            });
    }


    const getSystemCodeDetail = () => {

        const filterAccountTypeData = systemCodeDetail.filter((data) => data.masterId === 'ACCOUNT_TYPE');
        setAccountTypeData(filterAccountTypeData)

        const filterAccountUsedForData = userCodeDetail.filter((data) => data.masterId === 'ACCOUNT_TO_BE_USED_FOR');
        setAccountToUseData(filterAccountUsedForData)


    }

    const makeSystemMandatoryFields = () => {

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_accounttype' && data.pageId === 1).map((value, index) => {

            setAccountTypeCaption(value.fieldName)

            if (value.mandatory) {
                setAccountTypeVisible(true);
            }
            if (value.hide) {
                setAccountTypeVisible(false);
            }
            if (value.disable) {
                setAccountTypeDisable(true);
            }
            if (value.captionChange) {
                setAccountTypeCaption(value.fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_accountholdername' && data.pageId === 1).map((value, index) => {

            setAccountHolderNameCaption(value.fieldName)


            if (value.mandatory) {
                setAccountHolderNameMan(true);
            }
            if (value.hide) {
                setAccountHolderNameVisible(false);
            }
            if (value.disable) {
                setAccountHolderNameDisable(true);
            }
            if (value.captionChange) {
                setAccountHolderNameCaption(value.fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_ifsccode' && data.pageId === 1).map((value, index) => {

            setIfscCodeCaption(value.fieldName)

            if (value.mandatory) {
                setIfscCodeMan(true);
            }
            if (value.hide) {
                setIfscCodeVisible(false);
            }
            if (value.disable) {
                setIfscCodeDisable(true);
            }
            if (value.captionChange) {
                setIfscCodeCaption(value.fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_bankName' && data.pageId === 1).map((value, index) => {

            setBankNameCaption(value.fieldName)

            if (value.mandatory) {
                setBankNameMan(true);
            }
            if (value.hide) {
                setBankNameVisible(false);
            }
            if (value.disable) {
                setBankNameDisable(true);
            }
            if (value.captionChange) {
                setBankNameCaption(value.fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_branchName' && data.pageId === 1).map((value, index) => {

            setBranchNameCaption(value.fieldName)

            if (value.mandatory) {
                setBranchNameMan(true);
            }
            if (value.hide) {
                setBranchNameVisible(false);
            }
            if (value.disable) {
                setBranchNameDisable(true);
            }
            if (value.captionChange) {
                setBranchNameCaption(value.fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_accountNum' && data.pageId === 1).map((value, index) => {

            setAccountNumberCaption(value.fieldName)

            if (value.mandatory) {
                setAccountNumberMan(true);
            }
            if (value.hide) {
                setAccountNumberVisible(false);
            }
            if (value.disable) {
                setAccountNumberDisable(true);
            }
            if (value.captionChange) {
                setAccountNumberCaption(value.fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_confirmaccountNum' && data.pageId === 1).map((value, index) => {

            setConfirmAccountNumberCaption(value.fieldName)

            if (value.mandatory) {
                setConfirmAccountNumberMan(true);
            }
            if (value.hide) {
                setConfirmAccountNumberVisible(false);
            }
            if (value.disable) {
                setConfirmAccountNumberDisable(true);
            }
            if (value.captionChange) {
                setConfirmAccountNumberCaption(value.fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_banklinkMobNo' && data.pageId === 1).map((value, index) => {

            setBankLinkedMobNoCaption(value.fieldName)

            if (value.mandatory) {
                setBankLinkedMobNoMan(true);
            }
            if (value.hide) {
                setBankLinkedMobNoVisible(false);
            }
            if (value.disable) {
                setBankLinkedMobNoDisable(true);
            }
            if (value.captionChange) {
                setBankLinkedMobNoCaption(value.fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'et_upiid' && data.pageId === 1).map((value, index) => {

            setUpiIDCaption(value.fieldName)

            if (value.mandatory) {
                setUpiIDMan(true);
            }
            if (value.hide) {
                setUpiIDVisible(false);
            }
            if (value.disable) {
                setUpiIDDisable(true);
            }
            if (value.captionChange) {
                setUpiIDCaption(value.fieldCaptionChange)
            }
        });

        systemMandatoryField.filter((data) => data.fieldUiid === 'sp_accountusedfor' && data.pageId === 1).map((value, index) => {

            setAccountToUseCaption(value.fieldName)

            if (value.mandatory) {
                setAccountToUseMan(true);
            }
            if (value.hide) {
                setAccountToUseVisible(false);
            }
            if (value.disable) {
                setAccountToUseDisable(true);
            }
            if (value.captionChange) {
                setAccountToUseCaption(value.fieldCaptionChange)
            }
        });

    }

    const validateData = () => {
        var flag = false;
        var i = 1;
        var errorMessage = '';

        if (accountTypeMan && accountTypeVisible) {
            if (accountTypeLabel.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + accountTypeCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (accountHolderNameMan && accountHolderNameVisible) {
            if (accountHolderName.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + accountHolderNameCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (ifscCodeMan && ifscCodeVisible) {
            if (ifscCode.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + ifscCodeCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (bankNameMan && bankNameVisible) {
            if (bankName.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + bankNameCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (branchNameMan && branchNameVisible) {
            if (branchName.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + branchNameCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (accountNumberMan && accountNumberVisible) {
            if (accountNumber.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + accountNumberCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (confirmAccountNumberMan && confirmAccountNumberVisible) {
            if (confirmAccountNumber.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + confirmAccountNumberCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (confirmAccountNumber.length > 0 && accountNumber.length > 0) {
            if (confirmAccountNumber != accountNumber) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_accoutnnonotmatching + '\n';
                i++;
                flag = true;
            }
        }

        if (bankLinkedMobNoMan && bankLinkedMobNoVisible) {
            if (bankLinkedMobNo.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + bankLinkedMobNoCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (upiIDMan && upiIDVisible) {
            if (upiID.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsenter + upiIDCaption + '\n';
                i++;
                flag = true;
            }
        }

        if (accountToUseMan && accountToUseVisible) {
            if (accountToUseLabel.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + accountToUseCaption + '\n';
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

        if (accountToUseMan && accountToUseVisible) {
            if (accountToUseLabel.length <= 0) {
                errorMessage = errorMessage + i + ')' + ' ' + language[0][props.language].str_plsselect + accountToUseCaption + '\n';
                i++;
                flag = true;
            }
        }

        setErrMsg(errorMessage);
        return flag;
    };

    const bankSubmit = () => {

        if (global.USERTYPEID == 1163) {
            if (!(kycManual == '1')) {
                props.navigation.replace('BankList')
                return;
            }
        }

        Common.getNetworkConnection().then(value => {
            if (value.isConnected == true) {
                updateImage();
            } else {
                setApiError(language[0][props.language].str_errinternet);
                setErrorModalVisible(true)
            }

        })

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
                    setLoading(false)
                    setDocID(data.docId);
                    if (bankID.length <= 0) {
                        postBankData(data.docId);
                    } else {
                        updateBankData(data.docId);
                    }

                } else {
                    setLoading(false)
                    if (global.DEBUG_MODE) console.log('Upload failed:', response.status);
                    setApiError(response.status);
                    setErrorModalVisible(true)
                }
            } catch (error) {
                setLoading(false)
                if (global.DEBUG_MODE) console.log('Upload error:', error);
                setApiError(error.response.data.message);
                setErrorModalVisible(true)
            } finally {
                setLoading(false);
            }
        }
    }

    const postBankData = (dmsID) => {
        if (validateData()) {
            showBottomSheet();
            //alert(errMsg)
        } else {

            const appDetails = [
                {
                    "accountType": accountTypeLabel,
                    "accountHolderNameAsPerBank": accountHolderName,
                    "ifscCode": ifscCode,
                    "bankName": bankName,
                    "branchName": branchName,
                    "accountNumber": accountNumber,
                    "confirmedAccountNumber": confirmAccountNumber,
                    "bankLinkedMobileNo": bankLinkedMobNo,
                    "upiId": upiID,
                    "dmsId": dmsID,
                    "accountToBeUsedFor": accountToUseLabel,
                    "accountVerificationStatus": "",
                    "createdBy": global.USERID,
                }
            ]
            const baseURL = '8901';
            setLoading(true);
            apiInstancelocal(baseURL)
                .post(`/api/v2/loan-demographics/${global.CLIENTID}/BankDetail`, appDetails)
                .then(async response => {
                    // Handle the response data
                    if (global.DEBUG_MODE) console.log('PostBankResponse::' + JSON.stringify(response.data),);

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

    const updateBankData = (dmsID) => {
        if (validateData()) {
            showBottomSheet();
        } else {

            const appDetails = {
                "id": bankID,
                "accountType": accountTypeLabel,
                "accountHolderNameAsPerBank": accountHolderName,
                "ifscCode": ifscCode,
                "bankName": bankName,
                "branchName": branchName,
                "accountNumber": accountNumber,
                "confirmedAccountNumber": confirmAccountNumber,
                "bankLinkedMobileNo": bankLinkedMobNo,
                "upiId": upiID,
                "dmsId": dmsID,
                "accountToBeUsedFor": accountToUseLabel,
                "accountVerificationStatus": "",
                "createdBy": global.USERID,
            }
            const baseURL = '8901';
            setLoading(true);
            apiInstancelocal(baseURL)
                .put(`/api/v2/loan-demographics/BankDetail/${bankID}`, appDetails)
                .then(async response => {
                    // Handle the response data
                    if (global.DEBUG_MODE) console.log('UpdateBankResponse::' + JSON.stringify(response.data),);
                    insertData(bankID)
                    setLoading(false);
                })
                .catch(error => {
                    // Handle the error
                    if (global.DEBUG_MODE) console.log('UpdateBankResponse' + JSON.stringify(error.response));
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
                setBankName(response.data.bankName)
                setBranchName(response.data.branchName)
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

    const insertData = (id, dmsId) => {
        tbl_bankdetails.insertBankDetails(
            id,
            global.LOANAPPLICATIONID,
            global.CLIENTID,
            global.CLIENTTYPE,
            accountTypeLabel.trim(),
            accountHolderName.trim(),
            ifscCode.trim(),
            bankName.trim(),
            branchName.trim(),
            accountNumber.trim(),
            bankLinkedMobNo.trim(),
            upiID.trim(),
            dmsId,
            accountToUseLabel,
            "",
        )
            .then(result => {
                if (global.DEBUG_MODE) console.log('Inserted Bank detail:', result);
                props.navigation.replace('BankList')
            })
            .catch(error => {
                if (global.DEBUG_MODE) console.error('Error Inserting Bank detail:', error);
            });
    }

    const pickDocument = async () => {
        // try {
        //   const result = await DocumentPicker.pick({
        //     type: [DocumentPicker.types.images],
        //   });

        //   setSelectedDocument(result);
        // } catch (err) {
        //   if (DocumentPicker.isCancel(err)) {
        //   } else {
        //     throw err;
        //   }
        // }
        showphotoBottomSheet();
    };

    const pickImage = () => {
        setVisible(false)

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
            setVisible(false)
            props.onChange?.(image);
        })

    };

    const selectImage = async () => {
        setVisible(false)

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
            setVisible(false)
            setDeleteVisible(false)
            props.onChange?.(image);
        })

    };


    const previewImage = () => {
        hideImageBottomSheet();
        props.navigation.navigate('PreviewImage', { imageName: fileName, imageUri: imageUri })
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
            setVisible(true)
        }
    }

    const handlePickerClick = (componentName, label, index) => {
        if (componentName === 'AccountTypePicker') {
            setAccountTypeLabel(label);
            setAccountTypeIndex(index);
        } else if (componentName === 'AccountToUsePicker') {
            setAccountToUseLabel(label);
            setAccountToUseIndex(index);
        }
    }

    const handleClick = (componentName, textValue) => {

        if (componentName === 'accountHolderName') {
            if (textValue.length > 0) {
                if (Common.isValidText(textValue))
                    setAccountHolderName(textValue)
            } else {
                setAccountHolderName(textValue)
            }
        } else if (componentName === 'ifsccode') {
            if (textValue.length > 0) {
                setIfscCode(textValue)
                if (textValue.length == 11) {
                    getIFSCCode(textValue)
                }
            } else {
                setIfscCode(textValue)
            }
        } else if (componentName === 'bankname') {
            if (textValue.length > 0) {
                if (Common.isValidText(textValue))
                    setBankName(textValue)
            } else {
                setBankName(textValue)
            }
        } else if (componentName === 'branchname') {
            if (textValue.length > 0) {
                if (Common.isValidText(textValue))
                    setBranchName(textValue)
            } else {
                setBranchName(textValue)
            }
        } else if (componentName === 'accountnumber') {
            if (textValue.length > 0) {
                setAccountNumber(textValue)
            } else {
                setAccountNumber(textValue)
            }
        } else if (componentName === 'confirmaccountnumber') {
            if (textValue.length > 0) {
                setConfirmAccountNumber(textValue)
            } else {
                setConfirmAccountNumber(textValue)
            }
        } else if (componentName === 'banklinkedmobilenumber') {
            if (textValue.length > 0) {
                if (Common.numberRegex.test(textValue)) setBankLinkedMobNo(textValue);
            } else {
                setBankLinkedMobNo(textValue);
            }
        }
        else if (componentName === 'upiid') {
            if (textValue.length > 0) {
                setUpiID(textValue)
            } else {
                setUpiID(textValue)
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
            <ErrorMessageModal
                isVisible={bottomErrorSheetVisible}
                hideBottomSheet={hideBottomSheet}
                errMsg={errMsg}
                textError={language[0][props.language].str_error}
                textClose={language[0][props.language].str_ok}
            />
            <View style={{ width: '100%', height: 56, alignItems: 'center', justifyContent: 'center', }}>
                <HeadComp textval={language[0][props.language].str_loanDemographics} props={props} onGoBack={onGoBack} />
            </View>
            <ChildHeadComp
                textval={global.CLIENTTYPE == 'APPL' ? language[0][props.language].str_applicantdetails : global.CLIENTTYPE == 'CO-APPL' ? language[0][props.language].str_coapplicantdetails : language[0][props.language].str_guarantordetails}
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
                            language[0][props.language].str_bankdetail
                        }></TextComp>

                    <ProgressComp progressvalue={1} textvalue="6 of 6" />
                </View>
            </View>

            <ScrollView style={styles.scrollView}
                contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                {loading ? <Loading /> : null}

                {accountTypeVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={accountTypeCaption} textStyle={Commonstyles.inputtextStyle} Visible={accountTypeMan} />
                    </View>
                    <PickerComp textLabel={accountTypeLabel} pickerStyle={Commonstyles.picker} Disable={accountTypeDisable} pickerdata={accountTypeData} componentName='AccountTypePicker' handlePickerClick={handlePickerClick} />
                </View>}

                {accountHolderNameVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={accountHolderNameCaption} textStyle={Commonstyles.inputtextStyle} Visible={accountHolderNameMan} />
                    </View>
                    <TextInputComp textValue={accountHolderName} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={accountHolderNameDisable} ComponentName='accountHolderName' reference={accountHolderNameRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}

                {ifscCodeVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={ifscCodeCaption} textStyle={Commonstyles.inputtextStyle} Visible={ifscCodeMan} />
                    </View>
                    <TextInputComp textValue={ifscCode} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={ifscCodeDisable} ComponentName='ifsccode' reference={ifscCodeRef} returnKey="done" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}

                {bankNameVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={bankNameCaption} textStyle={Commonstyles.inputtextStyle} Visible={bankNameMan} />
                    </View>
                    <TextInputComp textValue={bankName} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={bankNameDisable} ComponentName='bankname' reference={bankNameRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}

                {branchNameVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={branchNameCaption} textStyle={Commonstyles.inputtextStyle} Visible={branchNameMan} />
                    </View>
                    <TextInputComp textValue={branchName} textStyle={Commonstyles.textinputtextStyle} type='number-pad' Disable={branchNameDisable} ComponentName='branchname' reference={branchNameRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}

                {accountNumberVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={accountNumberCaption} textStyle={Commonstyles.inputtextStyle} Visible={accountNumberMan} />
                    </View>
                    <TextInputComp textValue={accountNumber} textStyle={Commonstyles.textinputtextStyle} type='number-pad' Disable={accountNumberDisable} ComponentName='accountnumber' reference={accountNumberRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} secureText={true} />
                </View>}

                {confirmAccountNumberVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={confirmAccountNumberCaption} textStyle={Commonstyles.inputtextStyle} Visible={confirmAccountNumberMan} />
                    </View>
                    <TextInputComp textValue={confirmAccountNumber} textStyle={Commonstyles.textinputtextStyle} type='number-pad' Disable={confirmAccountNumberDisable} ComponentName='confirmaccountnumber' reference={confirmAccountNumberRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}

                {bankLinkedMobNoVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={bankLinkedMobNoCaption} textStyle={Commonstyles.inputtextStyle} Visible={bankLinkedMobNoMan} />
                    </View>
                    <TextInputComp textValue={bankLinkedMobNo} textStyle={Commonstyles.textinputtextStyle} type='number-pad' Disable={bankLinkedMobNoDisable} ComponentName='banklinkedmobilenumber' reference={bankLinkedMobileNumberRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}

                {upiIDVisible && <View style={{ width: '100%', marginTop: 19, paddingHorizontal: 0, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={upiIDCaption} textStyle={Commonstyles.inputtextStyle} Visible={upiIDMan} />
                    </View>
                    <TextInputComp textValue={upiID} textStyle={Commonstyles.textinputtextStyle} type='email-address' Disable={upiIDDisable} ComponentName='upiid' reference={upiIdRef} returnKey="next" handleClick={handleClick} handleReference={handleReference} length={30} />
                </View>}

                <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>

                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0 }}>
                        <TextComp
                            textVal={language[0][props.language].str_capturepassbookimg}
                            textStyle={Commonstyles.inputtextStyle}
                            Visible={true}
                        />
                    </View>

                    {visible && (
                        <TouchableOpacity
                            onPress={() => {
                                setphotoOptionvisible(true);
                            }}
                            style={{
                                width: '90%',
                                height: 170,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 10,
                                paddingHorizontal: 0,
                                borderRadius: 10,
                                backgroundColor: '#e2e2e2',
                            }}>
                            <View>
                                <Entypo name="camera" size={25} color={Colors.darkblack} />
                            </View>
                        </TouchableOpacity>
                    )}

                    {!visible && (
                        <TouchableOpacity style={{
                            width: '90%',
                            height: 170,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 10,
                            paddingHorizontal: 0,
                            borderRadius: 10,
                            backgroundColor: '#e2e2e2',
                        }} onPress={() => { props.navigation.navigate('PreviewImage', { imageName: fileName, imageUri: imageUri }) }}>


                            <View style={{ width: '100%', height: 170 }}>
                                <Image
                                    source={{ uri: imageUri }}
                                    style={{ width: '100%', height: 170, borderRadius: 10 }}
                                />
                            </View>
                        </TouchableOpacity>
                    )}

                    {!visible && (
                        <View
                            style={{
                                width: '90%',
                                justifyContent: 'center',
                                marginTop: 15,
                                paddingHorizontal: 0,
                                flexDirection: 'row',
                            }}>
                            <TextComp
                                textVal={fileName}
                                textStyle={{
                                    width: '90%',
                                    fontSize: 14,
                                    color: Colors.mediumgrey,
                                    fontFamily: 'PoppinsRegular'
                                }}
                                Visible={false}
                            />

                            <TouchableOpacity
                                onPress={() => {
                                    showImageBottomSheet();
                                    setDeleteVisible(false);
                                }}>
                                <Entypo
                                    name="dots-three-vertical"
                                    size={25}
                                    color={Colors.darkblue}
                                />
                            </TouchableOpacity>
                        </View>
                    )}

                </View>

                {accountToUseVisible && <View style={{ width: '100%', alignItems: 'center', marginTop: '4%' }}>
                    <View style={{ width: '90%', marginTop: 3, paddingHorizontal: 0, }}>
                        <TextComp textVal={accountToUseCaption} textStyle={Commonstyles.inputtextStyle} Visible={accountToUseMan} />
                    </View>
                    <PickerComp textLabel={accountToUseLabel} pickerStyle={Commonstyles.picker} Disable={accountToUseDisable} pickerdata={accountToUseData} componentName='AccountToUsePicker' handlePickerClick={handlePickerClick} />
                </View>}

                <ButtonViewComp
                    textValue={language[0][props.language].str_next.toUpperCase()}
                    textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
                    viewStyle={Commonstyles.buttonView}
                    innerStyle={Commonstyles.buttonViewInnerStyle}
                    handleClick={bankSubmit}
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

export default connect(mapStateToProps, mapDispatchToProps)(BankDetailsScreen);