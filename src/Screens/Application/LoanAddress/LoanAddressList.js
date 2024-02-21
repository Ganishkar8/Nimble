/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable react-native/no-inline-styles */
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    SafeAreaView,
    FlatList, TouchableOpacity, BackHandler
} from 'react-native';
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
import apiInstance from '../../../Utils/apiInstance';
import ErrorModal from '../../../Components/ErrorModal';
import TextComp from '../../../Components/TextComp';
import Common from '../../../Utils/Common';
import ButtonViewComp from '../../../Components/ButtonViewComp';
import DeleteConfirmModel from '../../../Components/DeleteConfirmModel';
import tbl_client from '../../../Database/Table/tbl_client';
import tbl_loanApplication from '../../../Database/Table/tbl_loanApplication';
import ErrorMessageModal from '../../../Components/ErrorMessageModal';
import tbl_loanaddressinfo from '../../../Database/Table/tbl_loanaddressinfo';
import { deleteNestedClientDetails } from '../../../Utils/redux/actions/loanInitiationAction';


const LoanAddressList = (props, { navigation }) => {


    const [urmNumber, setUrmNumber] = useState('');
    // const [urmNumberDisable, setUrmNumberDisable] = useState(false);


    const [loading, setLoading] = useState(false);
    const [addressDetails, setAddressDetails] = useState([]);
    const [addressID, setAddressID] = useState('');
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
    const [onlyView, setOnlyView] = useState(false);

    useEffect(() => {
        props.navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false });
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);

        getAddressData()

        if (global.USERTYPEID == 1163) {
            setOnlyView(true);
        }

        return () => {
            props.navigation.getParent()?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined });
            backHandler.remove();
        }
    }, [props.navigation, isScreenVisible]);

    const handleBackButton = () => {
        onGoBack();
        return true; // Prevent default back button behavior
    };

    const getAddressData = () => {


        const allClientDetail = props.loanInitiationDetails.filter(item => item.id === parseInt(global.LOANAPPLICATIONID))[0].clientDetail;

        allClientDetail.map(item => {
            if (item.udyamRegistrationNumber) {
                setUrmNumber(item.udyamRegistrationNumber);
                // setUrmNumberDisable(true);
                // UrNumberAvailable = true;
                getAllLoanAddressData(item.udyamRegistrationNumber);
            } else {
                getAllLoanAddressData("")
            }
        });

        // tbl_client.getClientBasedOnID(global.LOANAPPLICATIONID, global.CLIENTTYPE).then(value => {
        //     if (value !== undefined && value.length > 0) {

        //         if (value[0].udyamRegistrationNumber !== undefined && value[0].udyamRegistrationNumber !== null) {
        //             if (value[0].udyamRegistrationNumber.length > 0) {
        //                 setUrmNumber(value[0].udyamRegistrationNumber);
        //                 // setUrmNumberDisable(true);
        //                 UrNumberAvailable = true;
        //                 getAllLoanAddressData(value[0].udyamRegistrationNumber);

        //             } else {
        //                 getAllLoanAddressData("")
        //             }
        //         } else {
        //             getAllLoanAddressData("")
        //         }

        //         setKYCManual(value[0].isKycManual)

        //         if (global.USERTYPEID == 1163) {
        //             if (!(value[0].isKycManual == '1')) {

        //             }
        //         }

        //     }
        // })


    }


    const getAllLoanAddressData = (urmNumber) => {

        const clientDetail = props.loanInitiationDetails.filter(item => item.id === parseInt(global.LOANAPPLICATIONID))[0].clientDetail.find(client => client.id === parseInt(global.CLIENTID));
        const filterBusinessAddress = clientDetail.clientAddress.filter(item => item.addressType != 'P' && item.addressType != 'C')

        if (filterBusinessAddress.length > 0) {
            setAddressDetails(filterBusinessAddress)
            const RegisteredOfficeAddress = filterBusinessAddress.find(item => item.addressType === 'ROA');
            if (!RegisteredOfficeAddress) {
                if (urmNumber) {
                    if (urmNumber.length > 0) {
                        getUdyamRAOCheck(urmNumber);
                    }
                }
            }
            setRefreshFlatList(!refreshFlatlist)
        } else {
            if (urmNumber) {
                if (urmNumber.length > 0) {
                    getUdyamRAOCheck(urmNumber);
                }
            }
        }
        // console.log(clientDetail.clientAddress)

        // tbl_loanaddressinfo.getAllLoanAddressDetailsForLoanID(global.LOANAPPLICATIONID, global.CLIENTTYPE)
        //     .then(data => {
        //         if (global.DEBUG_MODE) console.log('Address Detail:', data);
        //         if (data !== undefined && data.length > 0) {
        //             setAddressDetails(data)
        //             const communicationAddress = data.find(item => item.address_type === 'C');
        //             if (communicationAddress) {
        //                 setCommunicationAvailable(true);
        //             }
        //             const RegisteredOfficeAddress = data.find(item => item.address_type === 'ROA');
        //             if (!RegisteredOfficeAddress) {
        //                 if (urmNumber) {
        //                     if (urmNumber.length > 0) {
        //                         getUdyamRAOCheck(urmNumber);
        //                     }
        //                 }
        //             }
        //             setRefreshFlatList(!refreshFlatlist)
        //         } else {
        //             if (urmNumber) {
        //                 if (urmNumber.length > 0) {
        //                     getUdyamRAOCheck(urmNumber);
        //                 }
        //             }
        //         }
        //     })
        //     .catch(error => {
        //         if (global.DEBUG_MODE) console.error('Error fetching bank details:', error);
        //     });

    }

    const insertData = (data) => {
        tbl_loanaddressinfo.insertLoanAddress(
            global.LOANAPPLICATIONID,
            "",
            global.CLIENTID,
            global.CLIENTTYPE,
            "ROA",
            data.clientAddressInfoDto.addressLine1,
            data.clientAddressInfoDto.addressLine2,
            data.clientAddressInfoDto.landmark,
            data.clientAddressInfoDto.pincode,
            data.clientAddressInfoDto.city,
            data.clientAddressInfoDto.district,
            data.clientAddressInfoDto.state,
            "INDIA",
            '',
            data.clientAddressInfoDto.emailId,
            "",
            "",
            "",
            "true",
            "1"
        )
            .then(result => {
                if (global.DEBUG_MODE) console.log('Inserted Loan Address detail:', result);
                getAddressData();

            })
            .catch(error => {
                if (global.DEBUG_MODE) console.error('Error Inserting Loan Address detail:', error);
            });
    }

    const getUdyamRAOCheck = (udyamNum) => {

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

                            setLoading(false);

                            insertData(response.data);


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

    const FlatView = ({ item }) => {

        var bg = '';

        if (global.USERTYPEID == 1163) {
            bg = 'GREY'
        } else {
            if (item.isUdyam) {
                bg = 'GREY'
            }
        }
        return (
            <View style={{ marginLeft: 10, marginRight: 10 }}>
                <View>
                    <Text style={{ fontSize: 14, fontFamily: 'Poppins-SemiBold', marginTop: 5, color: Colors.black }}>
                        {Common.getSystemCodeDescription(props.mobilecodedetail.leadUserCodeDto, 'ADDRESS_TYPE', item.addressType)}
                    </Text>
                    <Text style={{ fontFamily: 'PoppinsRegular', fontSize: 12, color: Colors.mediumgrey }}>{`${item.addressLine1},${item.addressLine2}`}</Text>
                    <Text style={{ fontFamily: 'PoppinsRegular', fontSize: 12, color: Colors.mediumgrey }}>{`${item.district},${item.state}`}</Text>
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
                            if (item.isUdyam) {
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
            props.navigation.navigate('LoanAddressDetails', { addressType: data })
        } else if (value === 'new') {
            props.navigation.navigate('LoanAddressDetails', { addressType: 'new' })
        } else if (value === 'delete') {
            setAddressID(data.id);
            setDeleteModalVisible(true);
        }
    }


    const deleteAddressData = () => {

        const baseURL = global.PORT1;
        setLoading(true);
        apiInstance(baseURL)
            .delete(`/api/v2/profile-short/address-details/${addressID}`)
            .then(async response => {
                // Handle the response data
                if (global.DEBUG_MODE) console.log('DeleteAddressResponse::' + JSON.stringify(response.data),);
                setLoading(false);
                if (response.status == 200) {
                    deletedata(addressID);
                    props.deleteNestedClientDetails(global.LOANAPPLICATIONID, global.CLIENTID, 'clientDetail', 'clientAddress', addressID)
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
                if (global.DEBUG_MODE) console.log('DeleteAddressResponse' + JSON.stringify(error.response));
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

    const deletedata = async (addressID) => {

        const newArray = addressDetails.filter(item => item.id !== addressID);
        setAddressDetails(newArray);
        setRefreshFlatList(!refreshFlatlist);

    }


    const buttonNext = () => {

        if (onlyView) {
            navigatetoGSTDetail();
            return;
        }
        updateLoanStatus();

    }

    const updateLoanStatus = () => {

        var module = ''; var page = '';

        if (global.CLIENTTYPE == 'APPL') {
            module = 'LN_DMGP_APLCT';
            page = 'DMGRC_APPL_BSN_ADDR_DTLS';
        } else if (global.CLIENTTYPE == 'CO-APPL') {
            module = 'LN_DMGP_COAPLCT';
            page = 'DMGRC_COAPPL_BSN_ADDR_DTLS';
        } else if (global.CLIENTTYPE == 'GRNTR') {
            module = 'LN_DMGP_GRNTR';
            page = 'DMGRC_GRNTR_BSN_ADDR_DTLS';
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
                        global.COMPLETEDPAGE = 'DMGRC_APPL_BSN_ADDR_DTLS';
                    } else if (global.CLIENTTYPE == 'CO-APPL') {
                        global.COMPLETEDMODULE = 'LN_DMGP_COAPLCT';
                        global.COMPLETEDPAGE = 'DMGRC_COAPPL_BSN_ADDR_DTLS';
                    } else if (global.CLIENTTYPE == 'GRNTR') {
                        global.COMPLETEDMODULE = 'LN_DMGP_GRNTR';
                        global.COMPLETEDPAGE = 'DMGRC_GRNTR_BSN_ADDR_DTLS';
                    }
                    navigatetoGSTDetail();
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

    const navigatetoGSTDetail = async () => {

        if (global.CLIENTTYPE == 'APPL') {
            var page = '';
            page = 'DMGRC_APPL_GST_DTLS';
        } else {
            var page = '';
            if (global.CLIENTTYPE == 'APPL') {
                page = 'DMGRC_APPL_FNCL_DTLS';
            } else if (global.CLIENTTYPE == 'CO-APPL') {
                page = 'DMGRC_COAPPL_FNCL_DTLS';
            } else if (global.CLIENTTYPE == 'GRNTR') {
                page = 'DMGRC_GRNTR_FNCL_DTLS';
            }
        }
        await Common.getPageID(global.FILTEREDPROCESSMODULE, page)
        if (global.CLIENTTYPE == 'APPL') {
            props.navigation.replace('LoanDemographicsGSTDetails');
        } else {
            props.navigation.replace('LoanDemographicsFinancialDetails');
        }
    }

    const onGoBack = () => {
        props.navigation.replace('LoanApplicationMain', { fromScreen: 'AddressDetail' })
    }

    const closeErrorModal = () => {
        setErrorModalVisible(false);
    };

    const validate = () => {
        var flag = false;
        var i = 1;
        var errorMessage = '';

        // if (!communicationAvailable) {
        //     errorMessage =
        //         errorMessage +
        //         i +
        //         ')' +
        //         ' ' +
        //         "Please Add Communication Address" +
        //         '\n';
        //     i++;
        //     flag = true;
        // }

        setErrMsg(errorMessage);
        return flag;
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

            <View
                style={{
                    width: '100%',
                    height: 56,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <HeadComp
                    textval={language[0][props.language].str_loanDemographics}
                    props={props}
                    onGoBack={onGoBack}
                />
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
                            global.CLIENTTYPE == 'APPL' ? language[0][props.language].str_baddressdetailappl : language[0][props.language].str_baddressdetail
                        }></TextComp>

                    <ProgressComp progressvalue={0.60} textvalue="4 of 6" />
                </View>
            </View>

            <TouchableOpacity activeOpacity={8} onPress={() => handleClick('new')}>
                <View style={{ marginBottom: 10 }}>
                    <IconButtonViewComp
                        icon={'+'}
                        textValue={language[0][
                            props.language
                        ].str_addaddressbutton.toUpperCase()}
                        textStyle={{ color: Colors.skyBlue, fontSize: 13, fontWeight: 500 }}
                        viewStyle={Commonstyles.buttonView}
                        innerStyle={Commonstyles.buttonViewBorderStyle}
                    //handleClick={() => handleClick('new')}
                    />
                </View>
            </TouchableOpacity>

            <FlatList
                data={addressDetails}
                renderItem={FlatView}
                extraData={refreshFlatlist}
                keyExtractor={(item, index) => index.toString()}
            />


            {addressDetails.length > 0 && global.CLIENTTYPE == 'APPL' && <ButtonViewComp
                textValue={language[0][props.language].str_submit.toUpperCase()}
                textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
                viewStyle={[Commonstyles.buttonView, { marginBottom: 20 }]}
                innerStyle={Commonstyles.buttonViewInnerStyle}
                handleClick={buttonNext}
            />
            }

            {global.CLIENTTYPE != 'APPL' && <ButtonViewComp
                textValue={language[0][props.language].str_submit.toUpperCase()}
                textStyle={{ color: Colors.white, fontSize: 13, fontWeight: 500 }}
                viewStyle={[Commonstyles.buttonView, { marginBottom: 20 }]}
                innerStyle={Commonstyles.buttonViewInnerStyle}
                handleClick={buttonNext}
            />
            }

        </SafeAreaView>
    );
};

const mapStateToProps = state => {
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
};

const mapDispatchToProps = dispatch => ({
    languageAction: item => dispatch(languageAction(item)),
    deleteNestedClientDetails: (loanApplicationId, clientId, key, nestedKey, id) => dispatch(deleteNestedClientDetails(loanApplicationId, clientId, key, nestedKey, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoanAddressList);
