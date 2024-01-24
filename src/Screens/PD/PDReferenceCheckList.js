/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    TextInput, TouchableOpacity, BackHandler,
    Image, PermissionsAndroid, FlatList
} from 'react-native';
import Modal from 'react-native-modal';
import React, { useState, useRef, useEffect } from 'react';
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
import TextInputComp from '../../Components/TextInputComp';
import PickerComp from '../../Components/PickerComp';
import { useIsFocused } from '@react-navigation/native';
import TextComp from '../../Components/TextComp';
import ImageComp from '../../Components/ImageComp';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import ButtonViewComp from '../../Components/ButtonViewComp';
import apiInstance from '../../Utils/apiInstance';
import ImageBottomPreview from '../../Components/ImageBottomPreview';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import ErrorModal from '../../Components/ErrorModal';
import ErrorMessageModal from '../../Components/ErrorMessageModal';
import DeleteConfirmModel from '../../Components/DeleteConfirmModel';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { updatePDModule, updatePDSubStage, updatePDSubModule, updatePDPage } from '../../Utils/redux/actions/PDAction';


const PDReferenceCheckList = (props, { navigation }) => {
    const [loading, setLoading] = useState(false);
    const [referenceDetails, setReferenceDetails] = useState([]);
    const [referenceID, setReferenceID] = useState('');
    const isScreenVisible = useIsFocused();
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [apiError, setApiError] = useState('');
    const [refreshFlatlist, setRefreshFlatList] = useState(false);
    const [processModule, setProcessModule] = useState(props.mobilecodedetail.processModule);
    const [processModuleLength, setProcessModuleLength] = useState(0);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [kycManual, setKYCManual] = useState('0');
    const [errMsg, setErrMsg] = useState('');
    const [bottomErrorSheetVisible, setBottomErrorSheetVisible] = useState(false);
    const [communicationAvailable, setCommunicationAvailable] = useState(false);
    const showBottomSheet = () => setBottomErrorSheetVisible(true);
    const hideBottomSheet = () => setBottomErrorSheetVisible(false);
    const showLocationBottomSheet = () => setLocationSheetVisible(true);
    const hideLocationBottomSheet = () => setLocationSheetVisible(false);
    const [locationSheetVisible, setLocationSheetVisible] = useState(false);
    const [currentPageId, setCurrentPageId] = useState(props.route.params.pageId);
    const [currentPageCode, setCurrentPageCode] = useState(props.route.params.pageCode);
    const [currentPageDesc, setCurrentPageDesc] = useState(props.route.params.pageDesc);
    const [currentPageMan, setCurrentPageMan] = useState(props.route.params.pageMandatory);

    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
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
            getReferenceData()
            return () => {
                console.log('Screen is blurred');
            };
        }, [])
    );



    const getReferenceData = () => {

        const baseURL = global.PORT1;
        setLoading(true)

        const appDetails = {
            "clientId": global.CLIENTID,
            "userId": global.USERID,
            "pageId": currentPageId,
            "pdLevel": global.PDSTAGE,
            "loanApplicationNumber": global.LOANAPPLICATIONNUM
        }


        apiInstance(baseURL).post(`/api/v1/pd/PdQAcheck/reffernceByclientId`, appDetails)
            .then((response) => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log("ResponseDataApi::" + JSON.stringify(response.data));

                if (response.status == 200) {
                    if (response.data.personalDiscussionQARefference) {
                        setReferenceDetails(response.data.personalDiscussionQARefference)
                    }
                    setLoading(false)
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

    const getlocationPermission = () => {
        checkPermissions().then(res => {
            if (res == true) {
                showLocationBottomSheet();
                getOneTimeLocation();
                setLoading(false)
            } else {
                setLoading(false)
                setApiError('Permission Not Granted');
                setErrorModalVisible(true)
            }
        });
    }

    const getOneTimeLocation = () => {


        Geolocation.getCurrentPosition(
            //Will give you the current location
            position => {

                //getting the Longitude from the location json
                const currentLongitude = JSON.stringify(position.coords.longitude);

                //getting the Latitude from the location json
                const currentLatitude = JSON.stringify(position.coords.latitude);
                hideLocationBottomSheet();
                props.navigation.navigate('PDReferenceCheck', { referenceDetail: [], 'pageId': currentPageId, 'pageCode': currentPageCode, 'pageDesc': currentPageDesc, 'pageMandatory': currentPageMan })

            },
            error => {
                console.log(error);
            },
            {
                enableHighAccuracy: true,
                timeout: 30000,
                maximumAge: 1000,
            },
        );
    };

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

            // Location permission
            const locationPermission = await PermissionsAndroid.check(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            );
            if (locationPermission !== PermissionsAndroid.RESULTS.GRANTED) {
                permissionsToRequest.push(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
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

            if (locationResult !== RESULTS.GRANTED) {
                permissionsToRequest.push(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
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

    const FlatView = ({ item }) => {

        var bg = '';

        if (global.USERTYPEID == 1163) {
            bg = 'GREY'
        } else {

        }
        return (
            <View style={{ marginLeft: 10, marginRight: 10 }}>
                <View>
                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-SemiBold', marginTop: 5, color: Colors.black }}>
                        {item.name}
                    </Text>
                    <Text style={{ fontFamily: 'PoppinsRegular', fontSize: 12, color: Colors.black }}>{item.addressLine1} {item.addressLine2} {'\n'} {item.district} {item.state}</Text>

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                    <TouchableOpacity activeOpacity={8} onPress={() => handleClick('edit', item)}>
                        <View>
                            <IconButtonViewComp
                                textValue={'Edit'.toUpperCase()}
                                textStyle={{
                                    color: Colors.skyBlue,
                                    fontSize: 13,
                                    fontWeight: 500,
                                }}
                                viewStyle={{
                                    width: '100%',
                                    // height: 50,
                                    marginTop: 10,
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                }}
                                innerStyle={{
                                    width: '100%',
                                    // height: 50,
                                    marginTop: 10,
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                }}

                            />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '20%' }} activeOpacity={0.8} onPress={() => {

                        if (global.USERTYPEID == 1163) {

                        } else {
                            if (item.isKyc != '1') {
                                handleClick('delete', item)
                            }
                        }
                    }
                    }>
                        <View >
                            <IconButtonViewComp
                                textValue={'Delete'.toUpperCase()}
                                textStyle={{
                                    color: bg == 'GREY' ? Colors.lightgrey : Colors.skyBlue,
                                    fontSize: 13,
                                    fontWeight: 500,
                                }}
                                viewStyle={{
                                    width: '100%',
                                    // height: 50,
                                    marginTop: 10,
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                }}
                                innerStyle={{
                                    width: '100%',
                                    // height: 50,
                                    marginTop: 10,
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                }}
                            />
                        </View>
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        borderBottomWidth: 1,
                        borderBottomColor: '#DFE6EA',
                        marginVertical: 10,
                        marginHorizontal: 10,
                        paddingBottom: 10,
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}
                />
            </View>
        )

    }

    const handleClick = (value, data) => {

        if (value === 'edit') {
            props.navigation.navigate('PDReferenceCheck', { referenceDetail: [data], 'pageId': currentPageId, 'pageCode': currentPageCode, 'pageDesc': currentPageDesc, 'pageMandatory': currentPageMan })
        } else if (value === 'new') {
            getlocationPermission();

        } else if (value === 'delete') {
            setReferenceID(data.id);
            setDeleteModalVisible(true);
            //deletedata(data.client_id)
        }
    }


    const deleteReferenceData = () => {

        const baseURL = global.PORT1;
        setLoading(true);
        apiInstance(baseURL)
            .delete(`/api/v1/pd/PdQAcheck/delete/${referenceID}`)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log('DeleteAddressResponse::' + JSON.stringify(response.data),);

                setLoading(false);
                deletedata(referenceID);
            })
            .catch(error => {
                // Handle the error
                if (global.DEBUG_MODE) console.log('DeleteAddressResponse' + JSON.stringify(error.response));
                setLoading(false);
                if (error.response.data != null) {
                    setApiError(error.response.data.message);
                    setErrorModalVisible(true)
                }
            });

    };

    const deletedata = async (referenceID) => {

        const newArray = referenceDetails.filter(item => item.id !== referenceID);
        setReferenceDetails(newArray);
        setRefreshFlatList(!refreshFlatlist);

    }


    const buttonNext = () => {


        updatePdStatus();

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

            // Use the every function to check if all mandatory submodules are completed

            const allMandatorySubmodulesCompleted = filteredModule.personalDiscussionSubModuleLogs.every(subModule => {
                const isPDSubmodule = subModule.subModuleCode === global.PDSUBMODULE.trim();
                let result = true;
                if (!isPDSubmodule) {
                    result = !isPDSubmodule && subModule.isMandatory && subModule.subModuleStatus === 'Completed';
                }
                return result;
            });

            if (allMandatorySubmodulesCompleted) {
                if (Common.DEBUG_MODE) console.log('All mandatory submodules are completed.');
                //props.updatePDSubStage(global.PDSUBSTAGE);
                props.updatePDModule(global.PDSUBSTAGE, global.PDMODULE);
                props.updatePDSubModule(global.PDSUBSTAGE, global.PDMODULE, global.PDSUBMODULE);
                props.updatePDPage(global.PDSUBSTAGE, global.PDMODULE, global.PDSUBMODULE, currentPageCode);
                props.navigation.replace('PDItems', { clientType: global.CLIENTTYPE });
            } else {

                if (Common.DEBUG_MODE) console.log('Not all mandatory submodules are completed.');
                props.updatePDSubModule(global.PDSUBSTAGE, global.PDMODULE, global.PDSUBMODULE);
                props.updatePDPage(global.PDSUBSTAGE, global.PDMODULE, global.PDSUBMODULE, currentPageCode);
                props.navigation.replace('PDItems', { clientType: global.CLIENTTYPE });
            }
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

    const validate = () => {
        var flag = false;
        var i = 1;
        var errorMessage = '';

        if (!communicationAvailable) {
            errorMessage =
                errorMessage +
                i +
                ')' +
                ' ' +
                "Please Add Communication Address" +
                '\n';
            i++;
            flag = true;
        }

        setErrMsg(errorMessage);
        return flag;
    };

    const closeDeleteModal = () => {
        setDeleteModalVisible(false);
    };

    const onDeleteClick = () => {
        setDeleteModalVisible(false);
        deleteReferenceData();
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

            <Modal
                isVisible={locationSheetVisible}
                onBackdropPress={() => { }}
                backdropOpacity={0.5}
                style={styles.modal}
            >
                <View style={styles.modalContent}>
                    <View style={{ alignItems: 'center' }}>

                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                            <TextComp textVal={"Fetching Location......"} textStyle={{ fontSize: 14, color: Colors.black, fontWeight: 600, marginTop: 30, marginBottom: 30 }} Visible={false} />


                        </View>




                    </View>


                </View>
            </Modal>


            {loading ? <Loading /> : null}
            <MyStatusBar backgroundColor={'white'} barStyle="dark-content" />

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
                <Text style={{ fontSize: 15, color: Colors.lightgrey, fontFamily: 'Poppins-Medium', marginTop: 3 }}>
                    {language[0][props.language].str_referencecheck}
                </Text>
            </View>

            <TouchableOpacity activeOpacity={8} onPress={() => handleClick('new')}>
                <View style={{ marginBottom: 10 }}>
                    <IconButtonViewComp
                        icon={'+'}
                        textValue={language[0][
                            props.language
                        ].str_addreferencecheck}
                        textStyle={{ color: Colors.skyBlue, fontSize: 13, fontWeight: 500 }}
                        viewStyle={Commonstyles.buttonView}
                        innerStyle={Commonstyles.buttonViewBorderStyle}
                    //handleClick={() => handleClick('new')}
                    />
                </View>
            </TouchableOpacity>

            <FlatList
                data={referenceDetails}
                renderItem={FlatView}
                extraData={refreshFlatlist}
                keyExtractor={(item, index) => index.toString()}
            />


            {
                (!props.route.params.pageMandatory || (props.route.params.pageMandatory && referenceDetails.length > 0)) && (
                    <ButtonViewComp
                        textValue={language[0][props.language].str_submit.toUpperCase()}
                        textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
                        viewStyle={[Commonstyles.buttonView, { marginBottom: 20 }]}
                        innerStyle={Commonstyles.buttonViewInnerStyle}
                        handleClick={buttonNext}
                    />
                )
            }


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

export default connect(mapStateToProps, mapDispatchToProps)(PDReferenceCheckList);
