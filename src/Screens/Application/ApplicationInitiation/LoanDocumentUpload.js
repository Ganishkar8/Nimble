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
    };
    const hideImageBottomSheet = () => setBottomSheetVisible(false);
    const [imageUri, setImageUri] = useState(null);
    const [imageFile, setImageFile] = useState([]);
    const [hideRetake, setHideRetake] = useState(false);
    const [hideDelete, setHideDelete] = useState(false);

    const iData = [
        {
            "maxSizeAccepted": 5,
            "sizeCompressionRequiredForImages": true,
            "compressionPercentage": 20,
            "genericMasterDtoList": [
                {
                    "id": 1140,
                    "genericName": "Aadhaar Card",
                    "genericType": "LOAN_DOCUMENT_TYPE",
                    "subCode": "AADHAAR_CARD",
                    "isDocumentMandatory": true,
                    "documentformatAccepted": [
                        {
                            "isActive": true,
                            "id": 185,
                            "subCodeId": "PDF",
                            "label": "PDF",
                            "displayOrder": 0,
                            "isDefault": 0
                        },
                        {
                            "isActive": true,
                            "id": 187,
                            "subCodeId": "JPG/JPEG",
                            "label": "JPG/JPEG",
                            "displayOrder": 2,
                            "isDefault": 2
                        }
                    ],
                    "parentId": 442,
                    "documentCategoryName": "INDIVIDUAL KYC DOCUMENTS",
                    "documentCategoryCode": "INDIVIDUAL_KYC_DOCUMENTS",
                    "workflowStageId": 504
                },
                {
                    "id": 1095,
                    "genericName": "Income Tax Return (ITR) ",
                    "genericType": "LOAN_DOCUMENT_TYPE",
                    "subCode": "INCOME_TAX_RETURN_ITR_LAST_TWO_YEARS",
                    "isDocumentMandatory": false,
                    "documentformatAccepted": [
                        {
                            "isActive": true,
                            "id": 185,
                            "subCodeId": "PDF",
                            "label": "PDF",
                            "displayOrder": 0,
                            "isDefault": 0
                        },
                        {
                            "isActive": true,
                            "id": 187,
                            "subCodeId": "JPG/JPEG",
                            "label": "JPG/JPEG",
                            "displayOrder": 2,
                            "isDefault": 2
                        },
                        {
                            "isActive": true,
                            "id": 188,
                            "subCodeId": "DOC",
                            "label": "DOC",
                            "displayOrder": 3,
                            "isDefault": 3
                        },
                        {
                            "isActive": true,
                            "id": 335,
                            "subCodeId": "XLS",
                            "label": "XLS",
                            "displayOrder": 0,
                            "isDefault": 0
                        }
                    ],
                    "parentId": 446,
                    "documentCategoryName": "INDIVIDUAL FINANCIAL DOCUMENT",
                    "documentCategoryCode": "INDIVIDUAL_FINANCIAL_DOCUMENT",
                    "workflowStageId": 504
                }
            ]
        }
    ]

    const [documentList, setDocumentList] = useState(iData[0].genericMasterDtoList);

    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        //getDocuments();
        //alert(JSON.stringify(iData[0].genericMasterDtoList))
        const organizedData = documentList.reduce((acc, installment) => {
            const code = installment.documentCategoryCode;

            // Check if the year is already present in the accumulator
            const existingCode = acc.find(item => item.documentCategoryCode === code);

            if (existingCode) {
                // If the year exists, push the installment to its data array
                const extraJSON = { dmsID: '', isImagePresent: false };
                existingCode.data.push({
                    ...installment, ...extraJSON
                });
            } else {
                // If the year does not exist, create a new entry with the year and data array
                const extraJSON = { dmsID: '', isImagePresent: false };
                acc.push({
                    code,
                    dataNew: [{ ...installment, ...extraJSON }],
                    isSelected: false
                });
            }

            return acc;
        }, []);
        console.log("OrganizedData::" + JSON.stringify(organizedData))
        setDocumentList(organizedData)



        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }
    }, [props.navigation, isScreenVisible]);

    const handleBackButton = () => {
        onGoBack();
        return true; // Prevent default back button behavior
    };

    const pickDocument = (data) => {

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
            hideImageBottomSheet();
        }
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
            <View style={{ marginLeft: 10, marginRight: 10 }}>
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
                        <TouchableOpacity style={{ width: '20%', }}
                            onPress={() => pickDocument(item)} activeOpacity={5}>
                            <View >
                                <ImageComp imageSrc={require('../../../Images/profile_user.png')} imageStylee={{ width: 30, height: 30 }} />
                            </View>
                        </TouchableOpacity>


                        <View style={{ width: '68%', }}>
                            <Text style={{ color: Colors.dimmText, textAlign: 'left', fontFamily: 'PoppinsRegular' }}>
                                {item.genericName}
                            </Text>
                        </View>
                        <View style={{ width: '10%', }}>
                            {item.isDocumentMandatory ?
                                <MaterialIcons name='verified' size={20} color={Colors.green} /> :
                                <Octicons name='unverified' size={20} color={Colors.red} />}

                        </View>

                        <TouchableOpacity style={{ width: '10%', }}
                            onPress={() => showImageBottomSheet(item)} activeOpacity={0.8}>
                            <View >
                                <Entypo name='dots-three-vertical' size={20} color={Colors.black} />
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
        ImagePicker.openPicker({
            width: 300,
            height: 400,
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

    }


    const buttonNext = () => {
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

        documentList.map((item) => {
            const newDataArray = [...item.dataNew];
            for (let i = 0; i < newDataArray.length; i++) {
                if (newDataArray[i].isImagePresent) {
                    const appDetails = {
                        "isActive": true,
                        "loanApplicationId": 331,
                        "clientId": 262,
                        "clientType": "GRNTR",
                        "dmsId": parseInt(newDataArray[i].dmsID),
                        "documentType": newDataArray[i].genericType,
                        "documentName": newDataArray[i].documentCategoryName,
                        "wfStgwiseDocLinkId": newDataArray[i].id,
                        "passwordRequired": false,
                        "documentCategory": newDataArray[i].documentCategoryCode,
                        "workflowStageId": "LN_APP_INITIATION",
                        "workflowSubStageId": "DOC_UPLD_GRNTR"
                    }
                    appDetailsFinal.push(appDetails)
                }
            }

        });

        console.log('FinalResult::' + JSON.stringify(appDetailsFinal))


        const baseURL = '';
        setLoading(true);
        apiInstancelocal(baseURL)
            .post(`/api/v2/applicant-document-detail`, appDetailsFinal)
            .then(async response => {
                // Handle the response data

                if (global.DEBUG_MODE) console.log('UpdateDMSIDResponse::' + JSON.stringify(response.data),);
                setLoading(false);


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

        module = 'NMNE_DTLS';
        page = 'NMN_DTLS';

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

                global.COMPLETEDMODULE = 'NMNE_DTLS';
                global.COMPLETEDPAGE = 'NMN_DTLS';


                props.navigation.replace('LoanApplicationMain', { fromScreen: 'BankList' });


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

    const getDocuments = () => {


        const appDetails = {
            "loanApplicationId": '331',
            "clientType": 'APPL',
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
                setDocumentList(response.data);

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
                    textval={language[0][props.language].str_loannomineedtls}
                    props={props}
                    onGoBack={onGoBack}
                />
            </View>

            <ChildHeadComp
                textval={language[0][props.language].str_nomineeDetails}
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
    return {
        language: language,
        profiledetail: profileDetails,
        mobilecodedetail: mobileCodeDetails
    }
};

const mapDispatchToProps = dispatch => ({
    languageAction: item => dispatch(languageAction(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoanDocumentUpload);
