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
import MyStatusBar from '../../Components/MyStatusBar';
import HeadComp from '../../Components/HeadComp';
import { connect } from 'react-redux';
import { languageAction } from '../../Utils/redux/actions/languageAction';
import { language } from '../../Utils/LanguageString';
import Loading from '../../Components/Loading';
import ChildHeadComp from '../../Components/ChildHeadComp';
import Colors from '../../Utils/Colors';
import Commonstyles from '../../Utils/Commonstyles';
import { useIsFocused } from '@react-navigation/native';
import apiInstancelocal from '../../Utils/apiInstancelocal';
import ErrorModal from '../../Components/ErrorModal';
import TextComp from '../../Components/TextComp';
import Common from '../../Utils/Common';
import ButtonViewComp from '../../Components/ButtonViewComp';
import DeleteConfirmModel from '../../Components/DeleteConfirmModel';
import ErrorMessageModal from '../../Components/ErrorMessageModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import ImageComp from '../../Components/ImageComp';
import ImageBottomPreview from '../../Components/ImageBottomPreview';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import apiInstance from '../../Utils/apiInstance';
import ModalContainer from '../../Components/ModalContainer';
import TextInputComp from '../../Components/TextInputComp';
import { Picker } from '@react-native-picker/picker';
import { updatePDModule, updatePDSubStage, updatePDSubModule, updatePDPage } from '../../Utils/redux/actions/PDAction';



const PDDocumentUpload = (props, { navigation }) => {
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
    };
    const hideImageBottomSheet = () => setBottomSheetVisible(false);
    const [imageUri, setImageUri] = useState(null);
    const [imageFile, setImageFile] = useState([]);
    const [hideRetake, setHideRetake] = useState(false);
    const [hideDelete, setHideDelete] = useState(false);
    const [processModuleLength, setProcessModuleLength] = useState(0);
    const [documentData, setDocumentData] = useState(global.LEADTRACKERDATA.applicantDocumentDetail);
    const [filteredDocument, setFilteredDocument] = useState([]);
    const [currentPageId, setCurrentPageId] = useState(props.route.params.pageId);
    const [currentPageCode, setCurrentPageCode] = useState(props.route.params.pageCode);
    const [currentPageDesc, setCurrentPageDesc] = useState(props.route.params.pageDesc);
    const [currentPageMan, setCurrentPageMan] = useState(props.route.params.pageMandatory);
    const [parentDocId, setParentDocId] = useState(0);
    const [currentItem, setCurrentItem] = useState([]);
    const [remarksModalVisible, setRemarksModalVisible] = useState(false);
    const showRemarksSheet = (item, index) => {
        setRemarksModalVisible(true)
        setRemarks(item.remarks)
        setTempItem(item)
        setTempIndex(index)
    };
    const [leaduserCodeDetail, setLeadUserCodeDetail] = useState(
        props.mobilecodedetail.leadUserCodeDto,
    );
    const [remarks, setRemarks] = useState('');
    const [tempItem, setTempItem] = useState([]);
    const [tempIndex, setTempIndex] = useState(0);
    const hideRemarksSheet = () => setRemarksModalVisible(false);
    const [spinnerList, setSpinnerList] = useState([]);
    const [documentList, setDocumentList] = useState([]);

    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        // const filteredDocumentData = documentData.filter(item => item.clientType === global.CLIENTTYPE);
        // setFilteredDocument(filteredDocumentData);
        //parseDocuments(filteredDocumentData);
        //parseDocuments();
        getSystemCodeDetail();
        getAllDocuments();

        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }
    }, [props.navigation]);

    const getSystemCodeDetail = async () => {

        const filteredResponseData = leaduserCodeDetail
            .filter(data => data.masterId === 'PD_VERIFICATION_RECEIVED_STATUS')
            .sort((a, b) => a.displayOrder - b.displayOrder);

        setSpinnerList(filteredResponseData);

    };

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
        props.navigation.navigate('PreviewImage', { imageName: fileName, imageUri: imageUri })
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
            deletedata(currentPhotoItem.id)
            hideImageBottomSheet();
        }
    }

    const updateVerifiedData = (value, index) => {

        const updatedDataArray = [...documentList];

        updatedDataArray[index].status = value;

        setDocumentList(updatedDataArray);
    }

    const addItem = () => {
        const updatedDataArray = [...documentList];

        updatedDataArray[tempIndex].remarks = remarks;

        setDocumentList(updatedDataArray);
        setRefreshFlatList(!refreshFlatlist)
        hideRemarksSheet()
    }

    const getImage = (item) => {
        Common.getNetworkConnection().then(value => {
            if (value.isConnected == true) {
                setLoading(true)
                const baseURL = global.PORT2
                apiInstance(baseURL).get(`/api/documents/document/${item.dmsId}`)
                    .then(async (response) => {
                        setLoading(false)
                        // Handle the response data
                        if (response.status == 200) {
                            console.log("FinalLeadCreationApiResponse::" + JSON.stringify(response.data));
                            setFileName(response.data.fileName)
                            showImageBottomSheet(item)
                            setImageUri('data:image/png;base64,' + response.data.base64Content)
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
                                {item.documentName}
                            </Text>
                        </View>
                        <View style={{ width: '10%', }}>
                            <AntDesign name='down' size={20} color={Colors.black} />
                        </View>
                    </View>
                    <FlatList
                        data={item.nestedData}
                        renderItem={FlatView}
                        extraData={refreshFlatlist}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </View>
        )

    }
    const FlatView = ({ item, index }) => {

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
                        >
                            <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                                <ImageComp imageSrc={require('../../Images/awesomefile.png')} imageStylee={{ width: 20, height: 30 }} />
                            </View>



                        </TouchableOpacity>


                        <View style={{ width: '68%', }}>
                            <Text style={{ color: Colors.dimmText, textAlign: 'left', fontFamily: 'PoppinsRegular' }}>
                                {item.documentName}
                            </Text>
                        </View>
                        <View style={{ width: '10%', }}>

                        </View>

                        <TouchableOpacity style={{ width: '10%', }}
                            onPress={() => {

                                getImage(item)

                            }} activeOpacity={0.8}>
                            <View >
                                <Entypo name='dots-three-vertical' size={20} color={Colors.darkblue} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '95%', alignSelf: 'center', }}>

                        <Text style={{ marginLeft: 5, marginTop: 15, color: Colors.mediumgrey }}>VERIFICATION/RECEIVED STATUS</Text>

                        <View style={{ width: '100%' }}>


                            <Picker
                                selectedValue={item.status}
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

                    <View style={{ alignItems: 'flex-end', marginTop: 15 }}>
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
        ImagePicker.openPicker({
            cropping: true,
        }).then(image => {
            setImageFile(image);

            const lastDotIndex = image.path.lastIndexOf('.');
            var imageName = 'Photo' + '_' + global.LOANAPPLICATIONID;
            if (lastDotIndex !== -1) {
                // Get the substring from the last dot to the end of the string
                const fileExtension = image.path.substring(lastDotIndex);
                imageName = imageName + fileExtension;
                console.log('File extension:', fileExtension);
            }
            console.log('SpecificData:', JSON.stringify(currentPhotoItem));
            //alert(JSON.stringify(currentPhotoItem))
            updateImage(image.path, image.mime, imageName)
            //currentPhotoItem.map
            // setFileType(image.mime)
            // setFileName(imageName)
            // setImageUri(image.path)
            // setVisible(false)
            // setDeleteVisible(false)
        })

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
                const response = await fetch('http://192.168.1.120:8094/api/documents', {
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
                        updateData(dataResponse.docId)
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



    const updateData = (dmsID) => {
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

    const postDocumentVerification = () => {

        const appDetails = {
            "createdBy": global.USERID,
            "id": parentDocId,
            "clientType": global.CLIENTTYPE,
            "pdLevel": global.PDSTAGE,
            "pageId": currentPageId,
            "pdApplicantDocumentVerificationChild": documentList
        }

        const baseURL = global.PORT1;
        setLoading(true)

        apiInstance(baseURL).post(`/api/v1/pd/PDApplicantDocumentVerification/loan-application-number/${global.LOANAPPLICATIONNUM}/clientId/${global.CLIENTID}`, appDetails)
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


    const handleClick = (componentName, textValue) => {
        if (componentName === 'remarks') {
            setRemarks(textValue);
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

        postDocumentVerification();

    }


    const getAllDocuments = () => {

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

            if (currentPageCode == 'PG_PH_DOC_VRF_APPL') {
                appDetails.previousPage = 8;
            } else if (currentPageCode == 'PG_PH_DOC_VRF_CO_APPL') {
                appDetails.previousPage = 20;
            } else if (currentPageCode == 'PG_PH_DOC_VRF_GRNTR') {
                appDetails.previousPage = 32;
            }

        } else if (global.PDSTAGE == 'PD_3') {
            if (currentPageCode == 'PG_PH_DOC_VRF_APPL') {
                appDetails.previousPage = 45;
            } else if (currentPageCode == 'PG_PH_DOC_VRF_CO_APPL') {
                appDetails.previousPage = 57;
            } else if (currentPageCode == 'PG_PH_DOC_VRF_GRNTR') {
                appDetails.previousPage = 69;
            }
        }


        apiInstance(baseURL).post(`/api/v1/pd/PDApplicantDocumentVerification/getByClientid`, appDetails)
            .then((response) => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log("ResponseDataApi::" + JSON.stringify(response.data));

                if (response.status == 200) {
                    setLoading(false)
                    parseDocuments(response.data.pdApplicantDocumentVerificationChild);
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

    const parseDocuments = (filteredDocument) => {

        // const result = Object.values(filteredDocument.reduce((acc, document) => {
        //     const { documentCategory, documentName, ...nestedData } = document;

        //     if (!acc[documentCategory]) {
        //         acc[documentCategory] = {
        //             documentCategory,
        //             documentName,
        //             nestedData: [{ documentCategory, documentName, ...nestedData }]
        //         };
        //     } else {
        //         acc[documentCategory].nestedData.push({ documentCategory, documentName, ...nestedData });
        //     }

        //     return acc;
        // }, {}));


        setDocumentList(filteredDocument)


    };

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

    const onGoBack = () => {
        props.navigation.replace('PDItems', { clientType: global.CLIENTTYPE });
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
            <ImageBottomPreview bottomSheetVisible={bottomSheetVisible} previewImage={previewImage} hideBottomSheet={hideImageBottomSheet} reTakePhoto={false} fileName={fileName} detailHide={true} deleteVisible={deleteVisible} deletePhoto={deletePhoto} onDeleteorCancel={onDeleteorCancel} hideDelete={true} hideRetake={true} />

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
                        Physical Document Verification
                    </Text>
                </View>
            </View>




            <FlatList
                data={documentList}
                renderItem={FlatView}
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
        width: '90%',  // Set width to 90% of the screen width
        aspectRatio: 1.5,
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

export default connect(mapStateToProps, mapDispatchToProps)(PDDocumentUpload);
