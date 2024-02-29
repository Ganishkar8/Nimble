/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    FlatList, TouchableOpacity, BackHandler, Image
} from 'react-native';
import Modal from 'react-native-modal';
import { React, useState, useEffect } from 'react';
import MyStatusBar from '../../../Components/MyStatusBar';
import HeadComp from '../../../Components/HeadComp';
import { connect } from 'react-redux';
import { languageAction } from '../../../Utils/redux/actions/languageAction';
import { language } from '../../../Utils/LanguageString';
import Loading from '../../../Components/Loading';
import ChildHeadComp from '../../../Components/ChildHeadComp';
import ProgressComp from '../../../Components/ProgressComp';
import Colors from '../../../Utils/Colors';
import Commonstyles from '../../../Utils/Commonstyles';
import IconButtonViewComp from '../../../Components/IconButtonViewComp';
import tbl_clientaddressinfo from '../../../Database/Table/tbl_clientaddressinfo';
import tbl_UserCodeDetails from '../../../Database/Table/tbl_UserCodeDetails';
import { useIsFocused } from '@react-navigation/native';
import apiInstancelocal from '../../../Utils/apiInstancelocal';
import ErrorModal from '../../../Components/ErrorModal';
import TextComp from '../../../Components/TextComp';
import Common from '../../../Utils/Common';
import ButtonViewComp from '../../../Components/ButtonViewComp';
import DeleteConfirmModel from '../../../Components/DeleteConfirmModel';
import ErrorMessageModal from '../../../Components/ErrorMessageModal';
import tbl_loanaddressinfo from '../../../Database/Table/tbl_loanaddressinfo';
import tbl_nomineeDetails from '../../../Database/Table/tbl_nomineeDetails';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import ImageComp from '../../../Components/ImageComp';
import ImageBottomPreview from '../../../Components/ImageBottomPreview';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import { tr } from 'react-native-paper-dates';
import apiInstance from '../../../Utils/apiInstance';
import DocumentPicker from 'react-native-document-picker';
import RNFS, { writeFile } from 'react-native-fs';
import Share from 'react-native-share';
import { addLoanInitiationDetails, updateLoanInitiationDetails, deleteLoanInitiationDetails, updateClientDetails } from '../../../Utils/redux/actions/loanInitiationAction';


const LoanDocumentUpload = (props, { navigation }) => {
    const [loading, setLoading] = useState(false);
    const [nomineeDetails, setNomineeDetails] = useState([]);
    const [nomineeID, setNomineeID] = useState('');
    const isScreenVisible = useIsFocused();
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');
    const [refreshFlatlist, setRefreshFlatList] = useState(false);

    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
    const [communicationAvailable, setCommunicationAvailable] = useState(false);
    const showBottomSheet = () => setBottomErrorSheetVisible(true);
    const hideBottomSheet = () => setBottomErrorSheetVisible(false);
    const [photoOptionvisible, setphotoOptionvisible] = useState(false);
    const showphotoBottomSheet = () => setphotoOptionvisible(true);
    const hidephotoBottomSheet = () => setphotoOptionvisible(false);
    const [deleteVisible, setDeleteVisible] = useState(false);
    const [docID, setDocID] = useState('');
    const [fileName, setFileName] = useState('');
    const [fileType, setFileType] = useState('');
    const [visible, setVisible] = useState(true);
    const [currentPhotoItem, setCurrentPhotoItem] = useState([]);
    const showImageBottomSheet = (item) => {
        setBottomSheetVisible(true)
        setCurrentPhotoItem(item)
        setFileName(item.documentName)
    };
    const hideImageBottomSheet = () => setBottomSheetVisible(false);
    const [imageUri, setImageUri] = useState(null);
    const [imageFile, setImageFile] = useState([]);
    const [hideRetake, setHideRetake] = useState(false);
    const [hideDelete, setHideDelete] = useState(false);
    const [processModuleLength, setProcessModuleLength] = useState(0);
    const [documentData, setDocumentData] = useState(global.LEADTRACKERDATA.applicantDocumentDetail);
    const [filteredDocument, setFilteredDocument] = useState([]);

    const [documentList, setDocumentList] = useState([]);
    const [onlyView, setOnlyView] = useState(false);


    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        const filteredDocumentData = props.loanInitiationDetails.filter(item => item.id === parseInt(global.LOANAPPLICATIONID))[0].applicantDocumentDetail.filter(client => client.clientId === parseInt(global.CLIENTID));
        console.log(filteredDocumentData)
        if (filteredDocumentData) {
            setFilteredDocument(filteredDocumentData);
            getDocuments(filteredDocumentData);
        } else {
            getDocuments([]);
        }

        const filteredData = global.FILTEREDPROCESSMODULE.filter(item => item.moduleCode === "DOC_UPLD");

        setProcessModuleLength(filteredData[0].nestedSubData.length);

        if (global.USERTYPEID == 1163 || global.ALLOWEDIT == "0") {
            setOnlyView(true);
        }

        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }
    }, [props.navigation]);

    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }
    }, [isScreenVisible]);

    const handleBackButton = () => {
        onGoBack();
        return true; // Prevent default back button behavior
    };

    const pickDocument = (item) => {
        setphotoOptionvisible(true)
        setCurrentPhotoItem(item)
    }

    const previewImage = () => {
        setBottomSheetVisible(false);
        getImage();
    }

    const reTakePhoto = () => {
        setphotoOptionvisible(true)
        setBottomSheetVisible(false);
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
            deletedata()
            hideImageBottomSheet();
        }
    }

    const isPDFFile = (filename) => {
        return filename.toLowerCase().endsWith('.pdf');
    };

    const saveBase64Pdf = async (base64Data, filename) => {
        const path = RNFS.ExternalDirectoryPath + `/${filename}`;

        const fileExists = await RNFS.exists(path);

        // If the file exists, return its path
        if (fileExists) {
            console.log('PDF already exists at:', path);
            openWithThirdPartyApp(path)
            return path;
        }

        try {
            await RNFS.writeFile(path, base64Data, 'base64');
            openWithThirdPartyApp(path)
            console.log('PDF saved successfully at:', path);
            return path;
        } catch (error) {
            console.error('Error saving PDF:', error);
            return null;
        }
    };

    const openWithThirdPartyApp = async (pdfPath) => {
        if (pdfPath) {
            try {
                const fileExists = await RNFS.exists(pdfPath);
                if (fileExists) {
                    const options = {
                        url: `file://${pdfPath}`,
                    };
                    await Share.open(options);
                } else {
                    console.error('PDF file does not exist.');
                }
            } catch (error) {
                console.error('Error opening with third-party app:', error);
            }
        }
    };

    const MainData = ({ item }) => {

        return (
            <View style={{ width: '100%', marginLeft: 10, marginRight: 10 }}>
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

                        <View style={{ width: '95%', }}>
                            <Text style={{ color: Colors.dimmText, textAlign: 'left', fontFamily: 'PoppinsRegular' }}>
                                {item.code}
                            </Text>
                        </View>
                        <View style={{ width: '10%', }}>
                            <AntDesign name='down' size={20} color={Colors.black} />
                        </View>
                    </View>
                    <FlatList
                        data={item.dataNew}
                        renderItem={FlatView}
                        extraData={refreshFlatlist}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        )

    }
    const FlatView = ({ item }) => {

        return (
            <View style={{ width: '100%' }}>
                <View
                    style={{
                        width: '94%',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            width: '95%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 20,
                        }}>
                        <TouchableOpacity style={{ width: '20%', }}
                            onPress={() => {
                                if (!onlyView)
                                    pickDocument(item)
                            }} activeOpacity={0.8}>
                            {item.dmsID.toString().length > 0 ?
                                <View style={{ width: 40, height: 40, backgroundColor: '#33AD3E99', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <ImageComp imageSrc={require('../../../Images/cloudcomputing.png')} imageStylee={{ width: 28, height: 22 }} />
                                </View>

                                : <View style={{ width: 40, height: 40, backgroundColor: '#DBDBDB', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                                    <ImageComp imageSrc={require('../../../Images/cloudcomputing.png')} imageStylee={{ width: 28, height: 22 }} />
                                </View>
                            }


                        </TouchableOpacity>


                        <View style={{ width: '68%', }}>
                            <Text style={{ color: Colors.dimmText, textAlign: 'left', fontFamily: 'PoppinsRegular' }}>
                                {item.genericName}{item.isDocumentMandatory && <Text style={{ color: 'red' }}>*</Text>}
                            </Text>
                        </View>
                        <View style={{ width: '10%', }}>
                            {item.dmsID.toString().length > 0 &&
                                <MaterialIcons name='verified' size={20} color={Colors.green} />}
                            {/* // : <Octicons name='unverified' size={20} color={Colors.red} />} */}

                        </View>

                        <TouchableOpacity style={{ width: '10%', }}
                            onPress={() => {
                                if (item.dmsID.toString().length > 0) {
                                    showImageBottomSheet(item);
                                    if (onlyView) {
                                        setHideRetake(true);
                                        setHideDelete(true);
                                    } else {
                                        setHideRetake(false);
                                        setHideDelete(false);
                                    }
                                }
                            }} activeOpacity={0.8}>
                            <View >
                                <Entypo name='dots-three-vertical' size={20} color={item.dmsID.toString().length > 0 ? Colors.darkblue : Colors.black} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )

    }

    const pickImage = () => {
        // setVisible(false)

        hidephotoBottomSheet();
        ImagePicker.openCamera({
            cropping: true,
        }).then(image => {
            setImageFile(image)

            const lastDotIndex = image.path.lastIndexOf('.');
            var imageName = 'Photo' + '_' + global.CLIENTID;
            if (lastDotIndex !== -1) {
                // Get the substring from the last dot to the end of the string
                const fileExtension = image.path.substring(lastDotIndex);
                imageName = imageName + fileExtension;
                console.log('File extension:', fileExtension);
            }
            //alert(JSON.stringify(currentPhotoItem))

            // const imageName = image.path.split('/').pop();
            console.log('SpecificData:', JSON.stringify(currentPhotoItem));
            updateImage(image.path, image.mime, imageName)
            setFileType(image.mime)
            setFileName(imageName)
            setImageUri(image.path)
            setVisible(false)
        })

    };

    const selectImage = async () => {
        // setVisible(false)

        hidephotoBottomSheet();

        try {
            const result = await DocumentPicker.pick({
                type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
            });
            //alert(JSON.stringify(result))
            setFileType(result[0].type)
            setFileName(result[0].name)
            setImageUri(result[0].uri)
            updateImage(result[0].uri, result[0].type, result[0].name)
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
            } else {
                throw err;
            }
        }

        // ImagePicker.openPicker({
        //     cropping: true,
        // }).then(image => {
        //     setImageFile(image);

        //     const lastDotIndex = image.path.lastIndexOf('.');
        //     var imageName = 'Photo' + '_' + global.CLIENTID;
        //     if (lastDotIndex !== -1) {
        //         // Get the substring from the last dot to the end of the string
        //         const fileExtension = image.path.substring(lastDotIndex);
        //         imageName = imageName + fileExtension;
        //         console.log('File extension:', fileExtension);
        //     }
        //     console.log('SpecificData:', JSON.stringify(currentPhotoItem));
        //     //alert(JSON.stringify(currentPhotoItem))
        //     updateImage(image.path, image.mime, imageName)
        //     //currentPhotoItem.map
        //     // setFileType(image.mime)
        //     // setFileName(imageName)
        //     // setImageUri(image.path)
        //     // setVisible(false)
        //     // setDeleteVisible(false)
        // })

    };

    const updateImage = async (imageUri, fileType, fileName) => {
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
                    const dataResponse = await response.json();
                    console.log("ImageResponse::" + JSON.stringify(dataResponse))
                    if (dataResponse.docId) {
                        //updateDmsID(dataResponse.docId)
                        updateData(dataResponse.docId, fileType, fileName)
                    } else {
                        alert('Cannot Update DMSID , please try again...')
                    }

                    // Handle the response from Cloudinary

                    // setDocID(data.docId);
                    // updateApplicantDetails(data.docId)

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



    const updateData = (dmsID, type, fileName) => {
        const updatedObject = { ...currentPhotoItem };
        updatedObject.dmsID = dmsID;
        updatedObject.isImagePresent = true
        updatedObject.documentName = fileName;
        setCurrentPhotoItem(updatedObject)
        console.log("UpdatedObject::" + JSON.stringify(updatedObject))
        const updatedArray = documentList.map((item) => {
            // Find the object with the specified id
            //console.log("CodeName::"+JSON.stringify(item.code))
            //console.log("UpdatedObjectName::"+JSON.stringify(updatedObject.documentCategoryName))
            if (item.code === updatedObject.documentCategoryCode) {
                const newDataArray = [...item.dataNew];
                console.log("NewdataArray::" + JSON.stringify(item.dataNew))
                console.log('FirstArray::' + JSON.stringify(newDataArray))
                for (let i = 0; i < newDataArray.length; i++) {
                    if (newDataArray[i].id === updatedObject.id) {
                        newDataArray[i] = updatedObject
                    }
                }
                // Create a new object with the updated name property
                return { ...item, dataNew: newDataArray };
            }
            // If the id doesn't match, return the original object
            return item;
        });
        console.log("UpdatedArray::" + JSON.stringify(updatedArray))
        setDocumentList(updatedArray)
        setRefreshFlatList(true)
    }

    const getImage = () => {

        Common.getNetworkConnection().then(value => {
            if (value.isConnected == true) {
                setLoading(true)
                const baseURL = global.PORT2
                apiInstance(baseURL).get(`/api/documents/document/${currentPhotoItem.dmsID}`)
                    .then(async (response) => {
                        setLoading(false)
                        // Handle the response data
                        if (response.status == 200) {
                            if (global.DEBUG_MODE) console.log("FinalLeadCreationApiResponse::" + JSON.stringify(response.data));
                            setFileName(response.data.fileName)
                            if (isPDFFile(response.data.fileName)) {
                                var base64pdf = response.data.base64Content;
                                var fileName = response.data.fileName;
                                saveBase64Pdf(base64pdf, fileName)
                            } else {
                                setImageUri('data:image/png;base64,' + response.data.base64Content)
                                props.navigation.navigate('PreviewImage', { imageName: response.data.fileName, imageUri: 'data:image/png;base64,' + response.data.base64Content })
                            }

                            // props.navigation.navigate('LeadManagement', { fromScreen: 'LeadCompletion' })
                        } else if (response.data.statusCode === 201) {
                            setApiError(response.data.message);
                            setErrorModalVisible(true);
                        } else if (response.data.statusCode === 202) {
                            setApiError(response.data.message);
                            setErrorModalVisible(true);
                        }

                    })
                    .catch((error) => {
                        // Handle the error
                        if (global.DEBUG_MODE) console.log("FinalLeadCreationApiResponse::" + JSON.stringify(error.response.data));
                        setLoading(false)
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

    const handleClick = (value, data) => {
        if (value === 'edit') {
            props.navigation.navigate('LoanNomineeDetails', { bankType: data })
        } else if (value === 'new') {
            props.navigation.navigate('LoanNomineeDetails', { bankType: 'new' })
        } else if (value === 'delete') {
            deletedata(data.id)
        }
    }


    const deleteAddressData = () => {

    };

    const deletedata = async (id) => {
        const updatedObject = { ...currentPhotoItem };
        updatedObject.dmsID = '';
        updatedObject.isImagePresent = false
        setCurrentPhotoItem(updatedObject)
        if (Common.DEBUG_MODE) console.log("UpdatedObject::" + JSON.stringify(updatedObject))
        const updatedArray = documentList.map((item) => {
            // Find the object with the specified id
            //console.log("CodeName::"+JSON.stringify(item.code))
            //console.log("UpdatedObjectName::"+JSON.stringify(updatedObject.documentCategoryName))
            if (item.code === updatedObject.documentCategoryCode) {
                const newDataArray = [...item.dataNew];
                if (Common.DEBUG_MODE) console.log("NewdataArray::" + JSON.stringify(item.dataNew))
                if (Common.DEBUG_MODE) console.log('FirstArray::' + JSON.stringify(newDataArray))
                for (let i = 0; i < newDataArray.length; i++) {
                    if (newDataArray[i].id === updatedObject.id) {
                        newDataArray[i] = updatedObject
                    }
                }
                // Create a new object with the updated name property
                return { ...item, dataNew: newDataArray };
            }
            // If the id doesn't match, return the original object
            return item;
        });
        if (Common.DEBUG_MODE) console.log("UpdatedArray::" + JSON.stringify(updatedArray))
        setDocumentList(updatedArray)
        setRefreshFlatList(true)
    }


    const buttonNext = () => {

        if (onlyView) {
            props.navigation.replace('LoanApplicationMain', { fromScreen: 'BankList' });
            return;
        }

        let error = ''
        //alert(JSON.stringify(data))
        documentList.map((item) => {
            // Find the object with the specified id
            //console.log("CodeName::"+JSON.stringify(item.code))
            const newDataArray = [...item.dataNew];
            for (let i = 0; i < newDataArray.length; i++) {
                if (newDataArray[i].isDocumentMandatory && !newDataArray[i].isImagePresent) {
                    error = error + 'Please Upload ' + newDataArray[i].genericName + '\n'
                }
            }

        });
        //console.log("Lenfth::"+error.length)
        if (error.length > 0) {
            alert(error)
        } else {
            //alert('h')
            updateDmsID()
        }

        // if (validate()) {
        //     showBottomSheet();
        //     return;
        // }
        //updateLoanStatus();

    }

    const updateDmsID = () => {
        const appDetailsFinal = []
        var worksubstage = '';
        if (global.CLIENTTYPE == 'APPL') {
            worksubstage = 'DOC_UPLD_APPLCNT'
        } else if (global.CLIENTTYPE == 'CO-APPL') {
            worksubstage = 'DOC_UPLD_COAPPLCNT'
        } else if (global.CLIENTTYPE == 'GRNTR') {
            worksubstage = 'DOC_UPLD_GRNTR'
        }
        documentList.map((item) => {
            const newDataArray = [...item.dataNew];
            for (let i = 0; i < newDataArray.length; i++) {
                if (newDataArray[i].isImagePresent) {
                    const appDetails = {
                        "isActive": true,
                        "loanApplicationId": global.LOANAPPLICATIONID,
                        "clientId": global.CLIENTID,
                        "clientType": global.CLIENTTYPE,
                        "dmsId": parseInt(newDataArray[i].dmsID),
                        "documentType": newDataArray[i].subCode,
                        "documentName": newDataArray[i].documentName,
                        "wfStgwiseDocLinkId": newDataArray[i].id,
                        "passwordRequired": false,
                        "documentCategory": newDataArray[i].documentCategoryCode,
                        "workflowStageId": "LN_APP_INITIATION",
                        "workflowSubStageId": worksubstage
                    }
                    appDetailsFinal.push(appDetails)
                }
            }

        });

        console.log('FinalResult::' + JSON.stringify(appDetailsFinal))


        const baseURL = '8901';
        setLoading(true);
        apiInstancelocal(baseURL)
            .post(`/api/v2/applicant-document-detail`, appDetailsFinal)
            .then(async response => {
                // Handle the response data

                if (global.DEBUG_MODE) console.log('UpdateDMSIDResponse::' + JSON.stringify(response.data),);
                setLoading(false);

                const promises = [];
                response.data.forEach((data) => {
                    promises.push(props.updateClientDetails(global.LOANAPPLICATIONID, global.CLIENTID, 'applicantDocumentDetail', data))
                });

                Promise.all(promises)
                    .then(() => {
                        updateLoanStatus();
                    })
                    .catch(error => {
                        console.error('Error updating client details:', error);
                        // Handle errors if necessary
                    });


                // if (processModuleLength == 1) {

                // } else if (processModuleLength == 2) {
                //     if (global.CLIENTTYPE == 'APPL') {
                //         updateLoanStatus();
                //     } else if (global.CLIENTTYPE == 'CO-APPL') {
                //         props.navigation.navigate('FinalConsentScreen');
                //     } else if (global.CLIENTTYPE == 'GRNTR') {
                //         props.navigation.navigate('FinalConsentScreen');
                //     }
                // } else if (processModuleLength == 3) {
                //     if (global.CLIENTTYPE == 'APPL') {
                //         updateLoanStatus();
                //     } else if (global.CLIENTTYPE == 'CO-APPL') {
                //         updateLoanStatus();
                //     } else if (global.CLIENTTYPE == 'GRNTR') {
                //         props.navigation.navigate('FinalConsentScreen');
                //     }
                // }


            })
            .catch(error => {
                // Handle the error
                if (global.DEBUG_MODE) console.log('UpdateDMSIDResponseError' + JSON.stringify(error.response));
                setLoading(false);
                if (error.response.data != null) {
                    setApiError(error.response.data.message);
                    setErrorModalVisible(true)
                }
            });

    };

    const updateLoanStatus = () => {

        var module = ''; var page = '';

        if (global.CLIENTTYPE == 'APPL') {
            module = 'DOC_UPLD';
            page = 'DOC_UPLD_APPLCNT';
        } else if (global.CLIENTTYPE == 'CO-APPL') {
            module = 'DOC_UPLD';
            page = 'DOC_UPLD_COAPPLCNT';
        } else if (global.CLIENTTYPE == 'GRNTR') {
            module = 'DOC_UPLD';
            page = 'DOC_UPLD_GRNTR';
        }

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

                if (global.CLIENTTYPE == 'APPL') {
                    global.COMPLETEDMODULE = 'DOC_UPLD';
                    global.COMPLETEDPAGE = 'DOC_UPLD_APPLCNT';
                    props.navigation.replace('LoanApplicationMain', { fromScreen: 'BankList' });
                } else if (global.CLIENTTYPE == 'CO-APPL') {
                    global.COMPLETEDMODULE = 'DOC_UPLD';
                    global.COMPLETEDPAGE = 'DOC_UPLD_COAPPLCNT';
                    props.navigation.replace('LoanApplicationMain', { fromScreen: 'BankList' });
                } else if (global.CLIENTTYPE == 'GRNTR') {
                    global.COMPLETEDSUBSTAGE = 'BRE';
                    global.COMPLETEDMODULE = 'DOC_UPLD';
                    global.COMPLETEDPAGE = 'DOC_UPLD_GRNTR';
                    props.navigation.replace('LoanApplicationMain', { fromScreen: 'BankList' });
                }

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

    const getDocuments = (filteredDocument) => {


        const appDetails = {
            "loanApplicationId": global.LOANAPPLICATIONID,
            "clientType": global.CLIENTTYPE,
            "workflowStage": "LN_APP_INITIATION"
        }
        const baseURL = '8096';
        setLoading(true);
        apiInstancelocal(baseURL)
            .post(`/api/v1/stagewise-document-check-configurations/stage-wise/documents`, appDetails)
            .then(async response => {
                // Handle the response data

                if (global.DEBUG_MODE) console.log('DocumentApiResponse::' + JSON.stringify(response.data),);
                setLoading(false);
                const organizedData = response.data[0].genericMasterDtoList.reduce((acc, installment) => {
                    const code = installment.documentCategoryCode;
                    // Check if the category is already present in the accumulator
                    const existingCodeIndex = acc.findIndex(item => item.code === code);

                    if (existingCodeIndex !== -1) {
                        // If the category exists, push the installment to its data array
                        var filteredData = [];
                        if (filteredDocument.length > 0) {
                            filteredData = filteredDocument.filter(item => item.documentType === installment.subCode);
                        }

                        if (filteredData != undefined && filteredData != null) {
                            if (filteredData.length > 0) {
                                const extraJSON = { dmsID: filteredData[0]?.dmsId, isImagePresent: true, documentName: filteredData[0].documentName };
                                acc[existingCodeIndex].dataNew.push({
                                    ...installment,
                                    ...extraJSON
                                });
                            } else {
                                const extraJSON = { dmsID: '', isImagePresent: false, documentName: '' };
                                acc[existingCodeIndex].dataNew.push({
                                    ...installment,
                                    ...extraJSON
                                });
                            }
                        } else {
                            const extraJSON = { dmsID: '', isImagePresent: false, documentName: '' };
                            acc[existingCodeIndex].dataNew.push({
                                ...installment,
                                ...extraJSON
                            });
                        }


                    } else {
                        // If the category does not exist, create a new entry with the category and data array
                        var filteredData = [];
                        if (filteredDocument.length > 0) {
                            filteredData = filteredDocument.filter(item => item.documentType === installment.subCode);
                        }

                        if (filteredData != undefined && filteredData != null) {
                            if (filteredData.length > 0) {
                                const extraJSON = { dmsID: filteredData[0]?.dmsId, isImagePresent: true, documentName: filteredData[0].documentName };
                                acc.push({
                                    code,
                                    dataNew: [{ ...installment, ...extraJSON, documentName: '' }],
                                    isSelected: false
                                });
                            } else {
                                const extraJSON = { dmsID: '', isImagePresent: false };
                                acc.push({
                                    code,
                                    dataNew: [{ ...installment, ...extraJSON }],
                                    isSelected: false
                                });
                            }
                        } else {
                            const extraJSON = { dmsID: '', isImagePresent: false };
                            acc.push({
                                code,
                                dataNew: [{ ...installment, ...extraJSON }],
                                isSelected: false
                            });
                        }
                    }

                    return acc;
                }, []);

                console.log("OrganizedData::", JSON.stringify(organizedData));
                setRefreshFlatList(!refreshFlatlist)
                setDocumentList(organizedData);

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


    const onGoBack = () => {
        props.navigation.replace('LoanApplicationMain', { fromScreen: 'LoanNomineeList' })
    }

    const closeErrorModal = () => {
        setErrorModalVisible(false);
    };

    const closeDeleteModal = () => {
        setDeleteModalVisible(false);
    };

    const onDeleteClick = () => {
        setDeleteModalVisible(false);
        deleteAddressData();
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ErrorModal isVisible={errorModalVisible} onClose={closeErrorModal} textContent={apiError} textClose={language[0][props.language].str_ok} />
            <DeleteConfirmModel isVisible={deleteModalVisible} onClose={closeDeleteModal} textContent={language[0][props.language].str_deletedesc} textClose={language[0][props.language].str_no} textDelete={language[0][props.language].str_yes} deleteClick={onDeleteClick} />

            <ErrorMessageModal
                isVisible={bottomErrorSheetVisible}
                hideBottomSheet={hideBottomSheet}
                errMsg={errMsg}
                textError={language[0][props.language].str_error}
                textClose={language[0][props.language].str_ok}
            />
            {loading ? <Loading /> : null}
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />
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

            <View
                style={{
                    width: '100%',
                    height: 56,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <HeadComp
                    textval={language[0][props.language].str_lndocupload}
                    props={props}
                    onGoBack={onGoBack}
                />
            </View>

            <ChildHeadComp
                textval={global.CLIENTTYPE == 'APPL'
                    ? language[0][props.language].str_applicant
                    : global.CLIENTTYPE == 'CO-APPL'
                        ? language[0][props.language].str_coapplicant
                        : language[0][props.language].str_guarantor}
            />



            <FlatList
                data={documentList}
                renderItem={MainData}
                extraData={refreshFlatlist}
                keyExtractor={(item, index) => index.toString()}
            />


            <ButtonViewComp
                textValue={language[0][props.language].str_submit.toUpperCase()}
                textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
                viewStyle={[Commonstyles.buttonView, { marginBottom: 20 }]}
                innerStyle={Commonstyles.buttonViewInnerStyle}
                handleClick={buttonNext}
            />



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

const mapStateToProps = state => {
    const { language } = state.languageReducer;
    const { profileDetails } = state.profileReducer;
    const { mobileCodeDetails } = state.mobilecodeReducer;
    const { loanInitiationDetails } = state.loanInitiationReducer;
    return {
        language: language,
        profiledetail: profileDetails,
        mobilecodedetail: mobileCodeDetails,
        loanInitiationDetails: loanInitiationDetails,
    }
};

const mapDispatchToProps = dispatch => ({
    languageAction: item => dispatch(languageAction(item)),
    dedupeAction: item => dispatch(dedupeAction(item)),
    deleteDedupe: item => dispatch(deleteDedupe()),
    updateClientDetails: (loanApplicationId, clientId, key, data) => dispatch(updateClientDetails(loanApplicationId, clientId, key, data)),
    updateLoanInitiationDetails: (loanApplicationId, loanData, key, clientId, updatedDetails) => dispatch(updateLoanInitiationDetails(loanApplicationId, loanData, key, clientId, updatedDetails)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoanDocumentUpload);
